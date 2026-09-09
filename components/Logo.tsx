import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Visual size / mark variant */
  size?: "header" | "hero" | "footer";
};

const sizeClasses = {
  header: "h-12 w-auto object-left sm:h-14",
  hero: "h-auto w-full object-center",
  footer: "h-16 w-auto object-left sm:h-20",
} as const;

const logoAssets = {
  header: {
    src: "/brand/uplevel-carpentry-logo.png",
    width: 1024,
    height: 396,
  },
  footer: {
    src: "/brand/uplevel-carpentry-logo.png",
    width: 1024,
    height: 396,
  },
  hero: {
    src: "/brand/uplevel-carpentry-logo-wide.png",
    width: 1774,
    height: 887,
  },
} as const;

export function Logo({
  className = "",
  priority = false,
  size = "header",
}: LogoProps) {
  const asset = logoAssets[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline-offset-4 ${
        size === "hero" ? "w-full" : ""
      } ${className}`}
      aria-label={`${siteConfig.businessName} home`}
    >
      <Image
        src={asset.src}
        alt={siteConfig.businessName}
        width={asset.width}
        height={asset.height}
        priority={priority}
        sizes={size === "hero" ? "92vw" : undefined}
        className={`${sizeClasses[size]} object-contain`}
      />
    </Link>
  );
}
