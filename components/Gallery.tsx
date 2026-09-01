"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { GalleryImage } from "@/lib/gallery";

type GalleryProps = {
  images: GalleryImage[];
};

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="border border-navy/15 bg-soft-white px-6 py-16 text-center sm:px-10">
        <p className="font-serif text-2xl text-navy sm:text-3xl">
          Project photographs coming soon
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          When images are added to the gallery folder and the site is
          redeployed, they will appear here automatically — no code changes
          required.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <li key={image.src} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full overflow-hidden border border-navy/10 bg-soft-white text-left transition-colors hover:border-copper/50 focus-visible:outline-copper"
              aria-label={`View larger: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={900}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                quality={75}
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
