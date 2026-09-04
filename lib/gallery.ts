import { readdir } from "fs/promises";
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

export type GalleryMediaType = "image" | "video";

export type GalleryMedia = {
  src: string;
  filename: string;
  alt: string;
  type: GalleryMediaType;
  albumId: string;
};

/** @deprecated Prefer GalleryMedia — kept for gradual call-site updates */
export type GalleryImage = GalleryMedia;

export type GalleryAlbum = {
  id: string;
  media: GalleryMedia[];
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
): GalleryMedia {
  const ext = path.extname(filename).toLowerCase();
  return {
    src: srcPath,
    filename,
    alt: filenameToAlt(filename),
    type: mediaTypeFromExt(ext),
    albumId,
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

/**
 * Reads `public/gallery` as untitled albums:
 * - each immediate subfolder is one album (sorted by folder name)
 * - root-level files (if any) become a miscellaneous album
 *
 * Supported: .jpg, .jpeg, .png, .webp, .avif, .mp4
 * Convert iPhone .mov files to .mp4 before placing them in the gallery.
 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
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

/** Flat list of all gallery media across albums (lightbox navigation). */
export async function getGalleryImages(): Promise<GalleryMedia[]> {
  const albums = await getGalleryAlbums();
  return albums.flatMap((album) => album.media);
}
