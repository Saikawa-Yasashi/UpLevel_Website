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
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <div className="mb-10 rounded-sm bg-parchment px-2">
            <Logo size="footer" priority className="justify-center" />
          </div>

          <div className="copper-rule mb-8 text-[0.8rem] tracking-[0.28em] text-copper uppercase sm:text-[0.85rem]">
            Proudly Serving the Copper Country
          </div>

          <h1 className="w-full whitespace-nowrap font-serif text-[clamp(1.35rem,4.2vw,3.75rem)] leading-tight font-medium text-navy">
            {siteConfig.tagline}
          </h1>
        </div>
        <div className="h-2 bg-navy" aria-hidden />
      </section>

      <section id="about" className="scroll-mt-28 bg-soft-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-2 md:items-start md:gap-16">
          <div className="flex justify-center md:self-start">
            <div className="w-2/3 overflow-hidden border border-navy/10 bg-parchment shadow-md">
              <Image
                src={siteConfig.about.image}
                alt={siteConfig.about.imageAlt}
                width={316}
                height={600}
                sizes="(max-width: 768px) 60vw, 22vw"
                className="h-auto w-full"
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

            <div id="contact" className="mt-10 scroll-mt-28">
              <h3 className="font-serif text-2xl text-navy sm:text-3xl">
                {siteConfig.about.ctaContact}
              </h3>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex flex-col items-center justify-center border border-navy bg-navy px-6 py-3 text-cream transition-colors hover:bg-navy-secondary"
                >
                  <span className="text-sm tracking-[0.12em] uppercase">
                    Call
                  </span>
                  <span className="mt-1 text-sm tracking-normal normal-case">
                    {siteConfig.phone}
                  </span>
                </a>
                <a
                  href={siteConfig.emailHref}
                  className="inline-flex flex-col items-center justify-center border border-copper bg-transparent px-6 py-3 text-navy transition-colors hover:border-copper-hover hover:text-copper-hover"
                >
                  <span className="text-sm tracking-[0.12em] uppercase">
                    Email
                  </span>
                  <span className="mt-1 text-sm tracking-normal normal-case">
                    {siteConfig.email}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
