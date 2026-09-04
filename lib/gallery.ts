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
};

export type GalleryAlbum = {
  /** Folder name under public/gallery, or "root" for loose files */
  id: string;
  items: GalleryMedia[];
};

function filenameToAlt(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const words = base
    .replace(/[-_]+/g, " ")
    .replace(/\s+\d+$/, "")
    .trim();

  if (!words) {
    return "Project photograph";
  }

  return words.charAt(0).toUpperCase() + words.slice(1);
}

function mediaTypeForExtension(ext: string): GalleryMediaType {
  return VIDEO_EXTENSIONS.has(ext) ? "video" : "image";
}

function isSupportedMediaFile(name: string): boolean {
  if (name.startsWith(".")) return false;
  if (name.toLowerCase() === "readme.md") return false;
  if (name.toLowerCase() === ".gitkeep") return false;
  const ext = path.extname(name).toLowerCase();
  return SUPPORTED_EXTENSIONS.has(ext);
}

function toMedia(filename: string, srcPrefix: string): GalleryMedia {
  const ext = path.extname(filename).toLowerCase();
  return {
    src: `${srcPrefix}/${filename}`,
    filename,
    alt: filenameToAlt(filename),
    type: mediaTypeForExtension(ext),
  };
}

function sortFilenames(names: string[]): string[] {
  return names.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base", numeric: true }),
  );
}

/** Flat list of all media across albums (for lightbox navigation). */
export function flattenGalleryMedia(albums: GalleryAlbum[]): GalleryMedia[] {
  return albums.flatMap((album) => album.items);
}

/**
 * Reads public/gallery. Each immediate subdirectory is one untitled album.
 * Loose files in the gallery root are grouped as a miscellaneous album.
 *
 * Supported: .jpg, .jpeg, .png, .webp, .avif, .mp4
 * Convert iPhone .mov files to .mp4 before adding them.
 */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  try {
    const entries = await readdir(galleryDir, { withFileTypes: true });
    const albums: GalleryAlbum[] = [];

    const directories = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map((entry) => entry.name)
      .sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base", numeric: true }),
      );

    for (const dirName of directories) {
      const dirPath = path.join(galleryDir, dirName);
      const files = await readdir(dirPath);
      const mediaNames = sortFilenames(files.filter(isSupportedMediaFile));

      if (mediaNames.length === 0) continue;

      albums.push({
        id: dirName,
        items: mediaNames.map((filename) =>
          toMedia(filename, `/gallery/${dirName}`),
        ),
      });
    }

    const rootFiles = sortFilenames(
      entries
        .filter((entry) => entry.isFile() && isSupportedMediaFile(entry.name))
        .map((entry) => entry.name),
    );

    if (rootFiles.length > 0) {
      albums.push({
        id: "root",
        items: rootFiles.map((filename) => toMedia(filename, "/gallery")),
      });
    }

    return albums;
  } catch {
    return [];
  }
}

/** @deprecated Prefer getGalleryAlbums — kept for any flat consumers */
export async function getGalleryImages(): Promise<GalleryMedia[]> {
  const albums = await getGalleryAlbums();
  return flattenGalleryMedia(albums);
}
