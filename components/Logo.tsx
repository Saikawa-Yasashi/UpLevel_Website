import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Visual size variant for header vs hero */
  size?: "header" | "hero" | "footer";
};

const sizeClasses = {
  header: "h-14 w-auto sm:h-16",
  hero: "h-44 w-auto sm:h-56 md:h-64",
  footer: "h-20 w-auto sm:h-24",
} as const;

export function Logo({
  className = "",
  priority = false,
  size = "header",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center focus-visible:outline-offset-4 ${className}`}
      aria-label={`${siteConfig.businessName} home`}
    >
      <Image
        src="/brand/uplevel-carpentry-logo.png"
        alt={siteConfig.businessName}
        width={600}
        height={600}
        priority={priority}
        className={`${sizeClasses[size]} object-contain object-left`}
      />
    </Link>
  );
}
