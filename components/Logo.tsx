import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  /** Visual size variant for header vs footer */
  size?: "header" | "footer";
};

const sizeClasses = {
  header: "h-12 w-auto sm:h-14",
  footer: "h-16 w-auto sm:h-20",
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
        width={1024}
        height={396}
        priority={priority}
        className={`${sizeClasses[size]} object-contain object-left`}
      />
    </Link>
  );
}
