"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormErrors = Partial<
  Record<"name" | "email" | "message" | "projectType", string>
>;

const initialValues = {
  name: "",
  email: "",
  phone: "",
  projectLocation: "",
  projectType: "",
  message: "",
};

export function ContactForm() {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isConfigured = useMemo(
    () => Boolean(endpoint && endpoint.startsWith("http")),
    [endpoint],
  );

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.projectType) {
      next.projectType = "Please select a project type.";
    }
    if (!values.message.trim()) {
      next.message = "Please tell us a little about your project.";
    }
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!isConfigured || !endpoint) {
      setStatus("error");
      setErrorMessage(
        "The contact form endpoint is not configured yet. Please email or call us directly, or set NEXT_PUBLIC_FORMSPREE_ENDPOINT.",
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          projectLocation: values.projectLocation.trim(),
          projectType: values.projectType,
          message: values.message.trim(),
          _subject: `Project inquiry from ${values.name.trim()}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your inquiry. Please try again, or reach us by phone or email.",
      );
    }
  }

  const fieldClass =
    "mt-2 w-full border border-navy/20 bg-soft-white px-3 py-3 text-navy outline-none transition-colors focus:border-copper";

  if (status === "success") {
    return (
      <div
        className="border border-forest/30 bg-soft-white px-6 py-10"
        role="status"
      >
        <h3 className="font-serif text-2xl text-navy">Thank you</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Your project inquiry has been sent. We will be in touch soon.
        </p>
        <button
          type="button"
          className="mt-6 text-sm tracking-[0.1em] text-copper uppercase transition-colors hover:text-copper-hover"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {!isConfigured && (
        <div
          className="border border-copper/40 bg-cream/60 px-4 py-3 text-sm text-navy"
          role="status"
        >
          Development note: set{" "}
          <code className="text-copper">NEXT_PUBLIC_FORMSPREE_ENDPOINT</code>{" "}
          in your environment to enable form submissions. Visitors can still
          call or email using the contact details on this page.
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-sm tracking-[0.06em] uppercase">
          Name <span className="text-copper">*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          className={fieldClass}
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-copper">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm tracking-[0.06em] uppercase">
          Email <span className="text-copper">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-copper">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="text-sm tracking-[0.06em] uppercase">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          value={values.phone}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
        />
      </div>

      <div>
        <label
          htmlFor="projectLocation"
          className="text-sm tracking-[0.06em] uppercase"
        >
          Project Location
        </label>
        <input
          id="projectLocation"
          name="projectLocation"
          className={fieldClass}
          value={values.projectLocation}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              projectLocation: event.target.value,
            }))
          }
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="text-sm tracking-[0.06em] uppercase"
        >
          Project Type <span className="text-copper">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          className={fieldClass}
          value={values.projectType}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, projectType: event.target.value }))
          }
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
        >
          <option value="">Select a project type</option>
          {siteConfig.projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="projectType-error" className="mt-1 text-sm text-copper">
            {errors.projectType}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-sm tracking-[0.06em] uppercase"
        >
          Message <span className="text-copper">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${fieldClass} resize-y`}
          value={values.message}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, message: event.target.value }))
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-copper">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          className="border border-copper/50 bg-cream/70 px-4 py-3 text-sm text-navy"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center bg-navy px-6 py-3.5 text-sm tracking-[0.12em] text-cream uppercase transition-colors hover:bg-navy-secondary disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Project Inquiry"}
      </button>
    </form>
  );
}
