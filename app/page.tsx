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
            Upper Peninsula Craftsmanship
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-tight font-medium text-navy sm:text-5xl md:text-6xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/gallery">
              {siteConfig.about.ctaPortfolio}
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {siteConfig.about.ctaContact}
            </ButtonLink>
          </div>
        </div>
        <div className="h-2 bg-navy" aria-hidden />
      </section>

      <section className="bg-soft-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-2 md:items-start md:gap-16">
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden border border-navy/10 bg-parchment">
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
            <p className="text-xs tracking-[0.22em] text-copper uppercase">
              About
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy sm:text-4xl">
              {siteConfig.about.heading}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/90 sm:text-[1.05rem]">
              {siteConfig.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/gallery">
                {siteConfig.about.ctaPortfolio}
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                {siteConfig.about.ctaContact}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy/10 bg-parchment">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <div className="mx-auto mb-6 h-px w-16 bg-forest/50" aria-hidden />
          <h2 className="font-serif text-3xl text-navy sm:text-4xl">
            {siteConfig.philosophy.heading}
          </h2>
          <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-charcoal/90 sm:text-center sm:text-[1.05rem]">
            {siteConfig.philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] text-copper uppercase">
              Services
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy sm:text-4xl">
              What We Build
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Representative work until final services are confirmed — each
              project is scoped to the home and the details that matter.
            </p>
          </div>

          <ul className="mt-10 grid gap-px border border-navy/15 bg-navy/15 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service) => (
              <li
                key={service}
                className="bg-parchment px-6 py-7 text-sm tracking-[0.08em] text-navy uppercase"
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <ButtonLink href="/contact">Discuss Your Project</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
