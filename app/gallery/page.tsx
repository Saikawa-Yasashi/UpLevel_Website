import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A selection of custom homes, detailed finish work, renovations and one-of-a-kind residential projects by Uplevel Carpentry.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.22em] text-copper uppercase">
          Portfolio
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
          Our Work
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          A selection of custom homes, detailed finish work, renovations and
          one-of-a-kind residential projects.
        </p>
      </header>

      <div className="mt-12 sm:mt-16">
        <Gallery images={images} />
      </div>
    </div>
  );
}
