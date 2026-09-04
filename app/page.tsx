import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.seo.title,
  },
  description: siteConfig.seo.description,
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.businessName,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: siteConfig.serviceArea,
    founder: {
      "@type": "Person",
      name: siteConfig.ownerName,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
      ...(siteConfig.address.streetAddress
        ? { streetAddress: siteConfig.address.streetAddress }
        : {}),
      ...(siteConfig.address.postalCode
        ? { postalCode: siteConfig.address.postalCode }
        : {}),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />

      <section className="relative overflow-hidden border-b border-navy/10 bg-parchment">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-forest/40"
          aria-hidden
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <div className="mb-10 rounded-sm bg-parchment px-2">
            <Logo size="footer" priority className="justify-center" />
          </div>

          <div className="copper-rule mb-8 text-[0.7rem] tracking-[0.28em] text-copper uppercase">
            Proudly Serving the Copper Country
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-tight font-medium text-navy sm:text-5xl md:text-6xl">
            {siteConfig.tagline}
          </h1>
        </div>
        <div className="h-2 bg-navy" aria-hidden />
      </section>

      <section id="about" className="scroll-mt-28 bg-soft-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-2 md:items-start md:gap-16">
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden border border-navy/10 bg-parchment shadow-md">
              <Image
                src={siteConfig.about.image}
                alt={siteConfig.about.imageAlt}
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-navy sm:text-4xl">
              {siteConfig.about.heading}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/90 sm:text-[1.05rem]">
              {siteConfig.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href="/gallery">
                {siteConfig.about.ctaPortfolio}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-28 border-t border-navy/10 bg-parchment"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 className="font-serif text-3xl text-navy sm:text-4xl">
            {siteConfig.about.ctaContact}
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center border border-navy bg-navy px-6 py-3 text-sm tracking-[0.12em] text-cream uppercase transition-colors hover:bg-navy-secondary"
            >
              Call {siteConfig.phone}
            </a>
            <a
              href={siteConfig.emailHref}
              className="inline-flex items-center justify-center border border-copper bg-transparent px-6 py-3 text-sm tracking-[0.12em] text-navy uppercase transition-colors hover:border-copper-hover hover:text-copper-hover"
            >
              Email {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
