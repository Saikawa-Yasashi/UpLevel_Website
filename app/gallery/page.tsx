import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { getGalleryAlbums } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Portfolio of custom finished carpentry and design by Uplevel Carpentry in Michigan's Copper Country.",
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <h1 className="sr-only">Gallery</h1>
      <Gallery albums={albums} />
    </div>
  );
}
