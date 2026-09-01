import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline-light";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-cream hover:bg-navy-secondary border border-navy",
  secondary:
    "bg-transparent text-navy border border-copper hover:border-copper-hover hover:text-copper-hover",
  "outline-light":
    "bg-transparent text-cream border border-cream/50 hover:border-copper-hover hover:text-copper-hover",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 text-sm tracking-[0.12em] uppercase transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
