"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { GalleryAlbum, GalleryMedia } from "@/lib/gallery";

type GalleryProps = {
  albums: GalleryAlbum[];
};

export function Gallery({ albums }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const flatMedia = useMemo(
    () => albums.flatMap((album) => album.media),
    [albums],
  );

  const indexBySrc = useMemo(() => {
    const map = new Map<string, number>();
    flatMedia.forEach((item, index) => map.set(item.src, index));
    return map;
  }, [flatMedia]);

  if (flatMedia.length === 0) {
    return (
      <div className="bg-soft-white px-6 py-16 text-center sm:px-10">
        <p className="font-serif text-2xl text-navy sm:text-3xl">
          Project photographs coming soon
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          When images are added to album folders under the gallery directory
          and the site is redeployed, they will appear here automatically — no
          code changes required.
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
              {album.media.map((item) => (
                <li key={item.src} className="mb-5 break-inside-avoid">
                  <MediaThumb
                    item={item}
                    onOpen={() => {
                      const index = indexBySrc.get(item.src);
                      if (index !== undefined) setActiveIndex(index);
                    }}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={flatMedia}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}

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
            className="h-auto w-full object-cover"
            muted
            playsInline
            preload="metadata"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-navy/25"
            aria-hidden
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/70 bg-navy/70 text-cream">
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
