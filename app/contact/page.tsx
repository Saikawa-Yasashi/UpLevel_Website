import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation about your custom home, renovation, addition, or fine carpentry project with Uplevel Carpentry.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-xs tracking-[0.22em] text-copper uppercase">
          Contact
        </p>
        <h1 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">
          Let&apos;s Talk About Your Project
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          Whether you&apos;re planning a custom home, renovation, addition or
          detailed carpentry project, we&apos;d be glad to hear what you have in
          mind.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <aside className="space-y-8 border border-navy/15 bg-soft-white p-6 sm:p-8">
          <div>
            <h2 className="font-serif text-2xl text-navy">Phone</h2>
            <a
              href={siteConfig.phoneHref}
              className="mt-2 inline-block text-base text-navy transition-colors hover:text-copper"
            >
              {siteConfig.phone}
            </a>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy">Email</h2>
            <a
              href={siteConfig.emailHref}
              className="mt-2 inline-block text-base text-navy transition-colors hover:text-copper"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-navy">Service Area</h2>
            <p className="mt-2 text-base leading-relaxed text-muted">
              {siteConfig.serviceArea}
            </p>
          </div>

          <div className="border-t border-navy/10 pt-6 text-sm leading-relaxed text-muted">
            Prefer not to use the form? Call or email anytime — we respond
            personally.
          </div>
        </aside>

        <div className="border border-navy/15 bg-parchment p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-navy sm:text-3xl">
            Project Inquiry
          </h2>
          <p className="mt-2 mb-8 text-sm text-muted">
            Required fields are marked with an asterisk.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
