import Link from "next/link";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-navy/10 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-sm bg-parchment px-3 py-2 inline-block">
            <Logo size="footer" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/80">
            {siteConfig.shortDescription}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-serif text-xl text-cream">Contact</h2>
          <p>
            <a
              href={siteConfig.phoneHref}
              className="transition-colors hover:text-copper-hover"
            >
              {siteConfig.phone}
            </a>
          </p>
          <p>
            <a
              href={siteConfig.emailHref}
              className="transition-colors hover:text-copper-hover"
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="text-cream/75">{siteConfig.serviceArea}</p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-serif text-xl text-cream">Explore</h2>
          <nav className="flex flex-col gap-2" aria-label="Footer">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tracking-[0.08em] uppercase transition-colors hover:text-copper-hover"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
          <p className="text-cream/45">
            Craftsmanship for Michigan&apos;s Upper Peninsula
          </p>
        </div>
      </div>
    </footer>
  );
}
