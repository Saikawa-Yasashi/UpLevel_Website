/**
 * Site configuration — edit this file to update business details.
 * Phone, email, and copy used across the site come from here.
 */

export const siteConfig = {
  businessName: "Uplevel Carpentry",
  ownerName: "David VanderZon",
  phone: "(906) 319-1678",
  phoneHref: "tel:+19063191678",
  email: "uplevelcarpentry@gmail.com",
  emailHref: "mailto:uplevelcarpentry@gmail.com",
  serviceArea: "Proudly Serving the Copper Country",
  tagline: "Custom Finished Carpentry and Design",
  description:
    "Custom finished carpentry and design serving Michigan's Copper Country.",
  shortDescription:
    "Custom finished carpentry and design serving the Copper Country.",
  /** Optional address for structured data — update when available */
  address: {
    streetAddress: "",
    addressLocality: "Copper Country",
    addressRegion: "MI",
    postalCode: "",
    addressCountry: "US",
  },
  nav: [
    { label: "About", href: "/#about" },
    { label: "Gallery", href: "/gallery" },
  ] as const,
  seo: {
    title:
      "Uplevel Carpentry | Custom Finished Carpentry and Design in the Copper Country",
    description:
      "Uplevel Carpentry provides custom finished carpentry and design serving Michigan's Copper Country. Craftsmanship refined through high-end residential work in Jackson, Wyoming.",
    siteUrl: "https://uplevelcarpentry.com",
  },
  about: {
    heading: "Meet David VanderZon",
    image: "/about/david-vanderzon.jpg",
    imageAlt: "David VanderZon at work in finished carpentry",
    paragraphs: [
      "David's career has taken him from Michigan to the demanding world of high-end residential construction in Jackson, Wyoming, where he honed his craft working on remarkable custom homes requiring exceptional precision, finish work, and attention to detail.",
      "Now based in Michigan's Upper Peninsula, David brings that same level of craftsmanship to homes, renovations, custom carpentry and one-of-a-kind residential projects closer to home.",
    ],
    ctaPortfolio: "View My Portfolio",
    ctaContact: "Contact Me",
  },
} as const;

export type SiteConfig = typeof siteConfig;
