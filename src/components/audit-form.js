"use client";

import { useEffect, useRef, useState } from "react";
import { validateLead } from "@/lib/validation";
import { captureTracking } from "@/lib/tracking";

const EMPTY = { name: "", email: "", phone: "", message: "", company_website: "" };

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export default function AuditForm({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("form"); // form | submitting | success
  const firstFieldRef = useRef(null);

  // Mount/animate in, animate out then unmount (mirrors case-study-drawer).
  useEffect(() => {
    if (open) {
      setMounted(true);
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    }
    setVisible(false);
    const t = setTimeout(() => {
      setMounted(false);
      // Reset to a fresh form after the close animation.
      setValues(EMPTY);
      setErrors({});
      setStatus("form");
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const setField = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateField = (key) => () => {
    const single = validateLead({ ...values });
    setErrors((prev) => ({ ...prev, [key]: single[key] }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateLead(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          company_website: values.company_website,
          tracking: captureTracking(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("form");
      } else {
        setErrors((prev) => ({ ...prev, form: data.error || "Something went wrong. Please try again." }));
        setStatus("form");
      }
    } catch {
      setErrors((prev) => ({ ...prev, form: "Network error. Please try again." }));
      setStatus("form");
    }
  };

  const inputBase =
    "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-base outline-none transition-colors focus:border-foreground";
  const inputCls = (key) =>
    `${inputBase} ${errors[key] ? "border-red-500 focus:border-red-500" : ""}`;

  return (
    <div className={`fixed inset-0 z-[98] flex lg:items-center lg:justify-center ${visible ? "" : "pointer-events-none"}`}>
      <button
        type="button"
        aria-label="Close form"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-black/50 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book a free audit"
        className={`relative z-[99] mt-auto max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-background p-6 shadow-2xl transition-all duration-300 ease-out sm:p-8 lg:m-0 lg:max-w-lg lg:rounded-2xl ${
          visible
            ? "translate-y-0 opacity-100 lg:scale-100"
            : "translate-y-full opacity-100 lg:translate-y-4 lg:scale-95 lg:opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center py-10 text-center">
            <svg width="72" height="72" viewBox="0 0 52 52" className="mb-6" aria-hidden="true">
              <circle className="tick-circle" cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--primary)" }} />
              <path className="tick-check" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l8 8 16-18" style={{ color: "var(--primary)" }} />
            </svg>
            <h3 className="mb-2 text-2xl font-semibold">Request received</h3>
            <p className="max-w-sm text-muted-foreground">
              Thanks — we&apos;ll review your details and reach out shortly with your free audit.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-1 text-2xl font-semibold">Book a Free Audit</h2>
            <p className="mb-6 text-muted-foreground">
              Tell us where to send it. We&apos;ll get back within one business day.
            </p>
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  ref={firstFieldRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={setField("name")}
                  onBlur={validateField("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputCls("name")}
                />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={setField("email")}
                  onBlur={validateField("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputCls("email")}
                />
              </Field>
              <Field id="phone" label="Phone" error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={setField("phone")}
                  onBlur={validateField("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={inputCls("phone")}
                />
              </Field>
              <Field id="message" label="Message (optional)" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={values.message}
                  onChange={setField("message")}
                  className={`${inputBase} resize-none`}
                />
              </Field>

              {/* Honeypot — visually hidden, off-screen; bots fill it. */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={values.company_website}
                onChange={setField("company_website")}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Get My Free Audit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
