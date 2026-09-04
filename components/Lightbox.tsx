"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type TouchEvent,
} from "react";
import type { GalleryMedia } from "@/lib/gallery";

type LightboxProps = {
  images: GalleryMedia[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const touchStartX = useRef<number | null>(null);

  const current = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1);
  }, [hasPrev, index, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1);
  }, [hasNext, index, onNavigate]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), video',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [goNext, goPrev, onClose]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (!current) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/92 p-4"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <p id={titleId} className="sr-only">
        {current.alt}
      </p>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 border border-cream/30 bg-navy px-3 py-2 text-sm tracking-[0.1em] text-cream uppercase transition-colors hover:border-copper hover:text-copper-hover"
        aria-label="Close lightbox"
      >
        Close
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        disabled={!hasPrev}
        className="absolute top-1/2 left-3 z-10 -translate-y-1/2 border border-cream/30 bg-navy px-3 py-3 text-cream disabled:opacity-30 sm:left-6"
        aria-label="Previous media"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        disabled={!hasNext}
        className="absolute top-1/2 right-3 z-10 -translate-y-1/2 border border-cream/30 bg-navy px-3 py-3 text-cream disabled:opacity-30 sm:right-6"
        aria-label="Next media"
      >
        ›
      </button>

      <div
        className="relative max-h-[85vh] w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          key={current.src}
          className="relative mx-auto flex max-h-[75vh] w-full items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          {current.type === "video" ? (
            <video
              src={current.src}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-full bg-navy object-contain"
            >
              Your browser does not support this video.
            </video>
          ) : (
            <div className="relative aspect-[4/3] max-h-[75vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                quality={85}
                priority
              />
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-cream/80">{current.alt}</p>
        <p className="mt-1 text-center text-xs tracking-[0.12em] text-cream/50 uppercase">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
