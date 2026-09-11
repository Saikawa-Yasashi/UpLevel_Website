import { access, readdir, readFile } from "fs/promises";
import path from "path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

const VIDEO_EXTENSIONS = new Set([".mp4"]);

const SUPPORTED_EXTENSIONS = new Set([
  ...IMAGE_EXTENSIONS,
  ...VIDEO_EXTENSIONS,
]);

const MANIFEST_PATH = path.join(
  process.cwd(),
  "content",
  "gallery-order.json",
);

export type GalleryMediaType = "image" | "video";

export type GalleryMedia = {
  src: string;
  filename: string;
  alt: string;
  /** Optional CMS title shown under the photo */
  title?: string;
  type: GalleryMediaType;
  albumId: string;
};

/** @deprecated Prefer GalleryMedia — kept for gradual call-site updates */
export type GalleryImage = GalleryMedia;

export type GalleryAlbum = {
  id: string;
  /** Optional CMS title shown above the album section */
  title?: string;
  media: GalleryMedia[];
};

type ManifestMedia = {
  src?: unknown;
  title?: unknown;
};

type ManifestAlbum = {
  id?: unknown;
  title?: unknown;
  media?: unknown;
};

type GalleryOrderManifest = {
  albums?: unknown;
};

function filenameToAlt(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const words = base
    .replace(/[-_]+/g, " ")
    .replace(/\s+\d+$/, "")
    .trim();

  if (!words) {
    return "Project media";
  }

  return words.charAt(0).toUpperCase() + words.slice(1);
}

function optionalTitle(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function mediaTypeFromExt(ext: string): GalleryMediaType {
  return VIDEO_EXTENSIONS.has(ext) ? "video" : "image";
}

function isSupportedMediaFile(name: string): boolean {
  if (name.startsWith(".")) return false;
  if (name.toLowerCase() === "readme.md") return false;
  const ext = path.extname(name).toLowerCase();
  return SUPPORTED_EXTENSIONS.has(ext);
}

function toMedia(
  filename: string,
  srcPath: string,
  albumId: string,
  title?: string,
): GalleryMedia {
  const ext = path.extname(filename).toLowerCase();
  const fallbackAlt = filenameToAlt(filename);
  return {
    src: srcPath,
    filename,
    title,
    alt: title ?? fallbackAlt,
    type: mediaTypeFromExt(ext),
    albumId,
  };
}

async function fileExists(absolutePath: string): Promise<boolean> {
  try {
    await access(absolutePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse a public gallery src like `/gallery/010/photo.jpg`
 * into folder id + filename. Accepts a missing leading slash (Sveltia
 * sometimes writes `gallery/...`). Returns null if the path is invalid.
 */
function parseGallerySrc(
  src: string,
): { folderId: string; filename: string; publicSrc: string } | null {
  let normalized = src.trim();
  try {
    normalized = decodeURIComponent(normalized);
  } catch {
    // Keep the trimmed original when it is not URI-encoded.
  }

  if (normalized.startsWith("gallery/")) {
    normalized = `/${normalized}`;
  }

  if (!normalized.startsWith("/gallery/")) return null;

  const relative = normalized.slice("/gallery/".length);
  const parts = relative.split("/").filter(Boolean);
  if (parts.length !== 2) return null;

  const [folderId, filename] = parts;
  if (
    !folderId ||
    !filename ||
    folderId.includes("..") ||
    filename.includes("..")
  ) {
    return null;
  }
  if (!isSupportedMediaFile(filename)) return null;

  return {
    folderId,
    filename,
    publicSrc: `/gallery/${folderId}/${filename}`,
  };
}

async function readMediaFromDir(
  absoluteDir: string,
  urlPrefix: string,
  albumId: string,
): Promise<GalleryMedia[]> {
  const entries = await readdir(absoluteDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && isSupportedMediaFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((filename) =>
      toMedia(filename, `${urlPrefix}/${filename}`, albumId),
    );
}

/** Filesystem scan used when the CMS manifest is missing or unusable. */
async function getAlbumsFromFilesystem(): Promise<GalleryAlbum[]> {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  try {
    const entries = await readdir(galleryDir, { withFileTypes: true });
    const albums: GalleryAlbum[] = [];

    const folders = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

    for (const folder of folders) {
      const media = await readMediaFromDir(
        path.join(galleryDir, folder),
        `/gallery/${folder}`,
        folder,
      );
      if (media.length > 0) {
        albums.push({ id: folder, media });
      }
    }

    const rootMedia = await readMediaFromDir(galleryDir, "/gallery", "root");
    if (rootMedia.length > 0) {
      albums.push({ id: "root", media: rootMedia });
    }

    return albums;
  } catch {
    return [];
  }
}

async function loadManifest(): Promise<GalleryOrderManifest | null> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw) as GalleryOrderManifest;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Build albums from `content/gallery-order.json`.
 * Only items listed in the manifest are shown, so CMS add/remove controls
 * what appears on the Gallery page. Missing files are skipped.
 */
async function getAlbumsFromManifest(
  manifest: GalleryOrderManifest,
): Promise<GalleryAlbum[] | null> {
  if (!Array.isArray(manifest.albums)) return null;

  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const albums: GalleryAlbum[] = [];
  const seenAlbumIds = new Set<string>();
  const seenSrcs = new Set<string>();

  for (const rawAlbum of manifest.albums as ManifestAlbum[]) {
    if (!rawAlbum || typeof rawAlbum !== "object") continue;
    if (typeof rawAlbum.id !== "string" || !rawAlbum.id.trim()) continue;
    if (!Array.isArray(rawAlbum.media)) continue;

    const albumId = rawAlbum.id.trim();
    if (seenAlbumIds.has(albumId)) continue;
    seenAlbumIds.add(albumId);

    const albumTitle = optionalTitle(rawAlbum.title);
    const media: GalleryMedia[] = [];

    for (const rawItem of rawAlbum.media as ManifestMedia[]) {
      if (!rawItem || typeof rawItem !== "object") continue;
      if (typeof rawItem.src !== "string") continue;

      const parsed = parseGallerySrc(rawItem.src);
      if (!parsed) continue;
      if (seenSrcs.has(parsed.publicSrc)) continue;

      // Resolve the file from the src folder, not the CMS album id.
      // Sveltia users sometimes change the Album folder ID without
      // moving photos, which used to drop the whole album.
      const absolutePath = path.join(
        galleryDir,
        parsed.folderId,
        parsed.filename,
      );
      if (!(await fileExists(absolutePath))) continue;

      seenSrcs.add(parsed.publicSrc);
      media.push(
        toMedia(
          parsed.filename,
          parsed.publicSrc,
          albumId,
          optionalTitle(rawItem.title),
        ),
      );
    }

    if (media.length > 0) {
      albums.push({ id: albumId, title: albumTitle, media });
    }
  }

  return albums;
}

/**
 * Reads gallery albums for the public site.
 *
 * Preferred order source: `content/gallery-order.json` (edited via /admin).
 * Falls back to scanning `public/gallery/` by folder/filename when needed.
 *
 * Supported: .jpg, .jpeg, .png, .webp, .avif, .mp4
 * Convert iPhone .mov files to .mp4 before placing them in the gallery.
 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const manifest = await loadManifest();
  if (manifest) {
    const fromManifest = await getAlbumsFromManifest(manifest);
    if (fromManifest && fromManifest.length > 0) {
      return fromManifest;
    }
  }

  return getAlbumsFromFilesystem();
}

/** Flat list of all gallery media across albums (lightbox navigation). */
export async function getGalleryImages(): Promise<GalleryMedia[]> {
  const albums = await getGalleryAlbums();
  return albums.flatMap((album) => album.media);
}
