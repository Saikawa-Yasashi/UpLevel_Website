"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import {
  flattenGalleryMedia,
  type GalleryAlbum,
  type GalleryMedia,
} from "@/lib/gallery";

type GalleryProps = {
  albums: GalleryAlbum[];
};

function MediaThumb({
  item,
  onOpen,
}: {
  item: GalleryMedia;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden bg-soft-white text-left shadow-md transition-shadow hover:shadow-lg focus-visible:outline-copper"
      aria-label={
        item.type === "video"
          ? `Play video: ${item.alt}`
          : `View larger: ${item.alt}`
      }
    >
      {item.type === "video" ? (
        <div className="relative">
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            className="h-auto w-full object-cover"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy/25"
            aria-hidden
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/70 bg-navy/70 text-cream">
              ▶
            </span>
          </span>
        </div>
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={900}
          height={1200}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-auto w-full object-cover transition-opacity duration-300 group-hover:opacity-95"
          quality={75}
          loading="lazy"
        />
      )}
    </button>
  );
}

export function Gallery({ albums }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const allMedia = useMemo(() => flattenGalleryMedia(albums), [albums]);

  const indexBySrc = useMemo(() => {
    const map = new Map<string, number>();
    allMedia.forEach((item, index) => map.set(item.src, index));
    return map;
  }, [allMedia]);

  if (albums.length === 0 || allMedia.length === 0) {
    return (
      <div className="bg-soft-white px-6 py-16 text-center shadow-md sm:px-10">
        <p className="font-serif text-2xl text-navy sm:text-3xl">
          Project photographs coming soon
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Add album folders under the gallery directory and redeploy — images
          and MP4 videos appear automatically.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-16 sm:space-y-20">
        {albums.map((album, albumIndex) => (
          <section
            key={album.id}
            aria-label={`Album ${albumIndex + 1}`}
            className={
              albumIndex > 0
                ? "border-t border-navy/10 pt-16 sm:pt-20"
                : undefined
            }
          >
            <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {album.items.map((item) => {
                const globalIndex = indexBySrc.get(item.src) ?? 0;
                return (
                  <li key={item.src} className="mb-5 break-inside-avoid">
                    <MediaThumb
                      item={item}
                      onOpen={() => setActiveIndex(globalIndex)}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          media={allMedia}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
