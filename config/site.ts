/**
 * Site configuration — edit this file to update business details.
 * Phone, email, and copy used across the site come from here.
 */

export const siteConfig = {
  businessName: "Uplevel Carpentry",
  ownerName: "David VanderZon",
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000",
  email: "uplevelcarpentry@gmail.com",
  emailHref: "mailto:uplevelcarpentry@gmail.com",
  serviceArea: "Michigan's Upper Peninsula and surrounding areas",
  tagline: "Custom Homes. Thoughtful Craftsmanship.",
  description:
    "Fine carpentry and custom home building rooted in craftsmanship, precision, and decades of hands-on experience.",
  shortDescription:
    "Custom homes, renovations, and fine carpentry rooted in craftsmanship and precision.",
  /** Optional address for structured data — update when available */
  address: {
    streetAddress: "",
    addressLocality: "Upper Peninsula",
    addressRegion: "MI",
    postalCode: "",
    addressCountry: "US",
  },
  nav: [
    { label: "About", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ] as const,
  services: [
    "Custom Homes",
    "Renovations & Additions",
    "Finish Carpentry",
    "Custom Built-Ins",
    "Interior Woodwork",
    "Specialty Residential Projects",
  ] as const,
  projectTypes: [
    "Custom Home",
    "Renovation / Addition",
    "Finish Carpentry",
    "Custom Woodwork",
    "Other",
  ] as const,
  seo: {
    title:
      "Uplevel Carpentry | Custom Homes & Fine Carpentry in Michigan's Upper Peninsula",
    description:
      "Uplevel Carpentry builds custom homes and fine carpentry projects across Michigan's Upper Peninsula. Craftsmanship refined through high-end residential work in Jackson, Wyoming.",
    siteUrl: "https://uplevelcarpentry.com",
  },
  about: {
    heading: "Meet David VanderZon",
    image: "/about/david-and-kristyi.jpg",
    imageAlt: "David VanderZon and Kristyi VanderZon outdoors in the mountains",
    paragraphs: [
      "David VanderZon's career has taken him from Michigan to the demanding world of high-end residential construction in Jackson, Wyoming, where he honed his craft working on remarkable custom homes requiring exceptional precision, finish work, and attention to detail.",
      "Now based in Michigan's Upper Peninsula, David brings that same level of craftsmanship to homes, renovations, custom carpentry and one-of-a-kind residential projects closer to home.",
    ],
    ctaPortfolio: "View My Portfolio",
    ctaContact: "Contact Me",
  },
  philosophy: {
    heading: "Built Carefully. Built to Last.",
    paragraphs: [
      "Every project begins with listening. We take the time to understand how you live, what matters in the details, and how the work should respect the home already there — or the one you are ready to build.",
      "We favor craftsmanship over shortcuts, honest communication over guesswork, and custom solutions over one-size-fits-all construction. From structural decisions to the last piece of trim, the goal is work that feels intentional, durable, and true to the place it belongs.",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
