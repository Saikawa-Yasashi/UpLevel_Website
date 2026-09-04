"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-parchment/95 backdrop-blur-sm">
      <div
        className={`overflow-hidden border-b border-navy/10 bg-navy text-cream transition-[max-height,opacity] duration-300 ease-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
        aria-hidden={scrolled}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-2 text-xs tracking-[0.08em] uppercase sm:justify-end sm:gap-8 sm:text-sm sm:normal-case sm:tracking-normal">
          <a
            href={siteConfig.phoneHref}
            className="transition-colors hover:text-copper-hover focus-visible:outline-copper"
          >
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.emailHref}
            className="transition-colors hover:text-copper-hover focus-visible:outline-copper"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Logo priority size="header" />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item) => {
            const pathOnly = item.href.split("#")[0] || "/";
            const isActive =
              pathOnly === "/"
                ? pathname === "/"
                : pathname.startsWith(pathOnly);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-[0.14em] uppercase transition-colors ${
                  isActive
                    ? "text-copper"
                    : "text-navy hover:text-copper"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-navy/20 text-navy md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
          <span aria-hidden className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-navy transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-navy transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-navy transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        ref={menuRef}
        className={`border-t border-navy/10 bg-parchment md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
          aria-label="Mobile"
        >
          {siteConfig.nav.map((item) => {
            const pathOnly = item.href.split("#")[0] || "/";
            const isActive =
              pathOnly === "/"
                ? pathname === "/"
                : pathname.startsWith(pathOnly);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-3 text-sm tracking-[0.14em] uppercase ${
                  isActive ? "text-copper" : "text-navy"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-navy/10 pt-4">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center bg-navy px-4 py-3 text-sm tracking-[0.08em] text-cream uppercase transition-colors hover:bg-navy-secondary"
            >
              Call
            </a>
            <a
              href={siteConfig.emailHref}
              className="inline-flex items-center justify-center border border-copper px-4 py-3 text-sm tracking-[0.08em] text-copper uppercase transition-colors hover:border-copper-hover hover:text-copper-hover"
            >
              Email
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
