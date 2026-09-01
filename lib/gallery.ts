import { readdir } from "fs/promises";
import path from "path";

const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

export type GalleryImage = {
  src: string;
  filename: string;
  alt: string;
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

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const galleryDir = path.join(process.cwd(), "public", "gallery");

  try {
    const entries = await readdir(galleryDir, { withFileTypes: true });

    return entries
      .filter((entry) => {
        if (!entry.isFile()) return false;
        if (entry.name.startsWith(".")) return false;
        if (entry.name.toLowerCase() === "readme.md") return false;
        const ext = path.extname(entry.name).toLowerCase();
        return SUPPORTED_EXTENSIONS.has(ext);
      })
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .map((filename) => ({
        src: `/gallery/${filename}`,
        filename,
        alt: filenameToAlt(filename),
      }));
  } catch {
    return [];
  }
}
