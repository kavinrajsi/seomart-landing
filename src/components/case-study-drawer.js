"use client";

import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";

const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-normal text-muted-foreground">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h3 className="mb-4 mt-10 text-2xl font-semibold lg:text-3xl">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mb-3 mt-8 text-xl font-semibold">{children}</h4>
    ),
    h4: ({ children }) => (
      <h5 className="mb-2 mt-6 text-lg font-semibold">{children}</h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 pl-4 text-lg font-light leading-normal">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-normal text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-base leading-normal text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    sup: ({ children }) => <sup>{children}</sup>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-foreground"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <img
          src={value.url}
          alt={value.alt ?? ""}
          loading="lazy"
          className="mb-4 w-full bg-muted"
        />
      ) : null,
    video: ({ value }) =>
      value?.url ? (
        <video src={value.url} controls className="mb-4 w-full bg-muted" />
      ) : null,
  },
};

export default function CaseStudyDrawer({ study, onClose }) {
  const open = Boolean(study);
  const [cached, setCached] = useState(study);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (study) {
      setCached(study);
      setMounted(true);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(t);
  }, [study]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 z-50 flex ${visible ? "" : "pointer-events-none"}`}>
      {/* Backdrop — click closes */}
      <button
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-black/50 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={cached.client}
        className={`fixed inset-x-0 bottom-0 z-10 h-[90vh] w-full overflow-y-auto bg-background shadow-2xl transition-transform duration-300 ease-out lg:inset-y-0 lg:right-0 lg:left-auto lg:top-0 lg:bottom-auto lg:h-screen lg:w-full lg:max-w-[768px] ${
          visible
            ? "translate-y-0 lg:translate-x-0"
            : "translate-y-full lg:translate-y-0 lg:translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="fixed right-6 top-6 z-10 flex size-10 items-center justify-center border bg-background transition-colors hover:bg-secondary"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {(cached.cover ?? cached.image) && (
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={cached.cover ?? cached.image}
              alt={cached.alt ?? cached.client}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-14">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
            {cached.tag}
          </p>
          <h2 className="mb-8 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {cached.client}
          </h2>

          {cached.sections?.length ? (
            cached.sections.map((s) => (
              <section key={s._key}>
                {s.content && (
                  <PortableText value={s.content} components={components} />
                )}
                {s.media && (
                  <figure className="my-8">
                    <img
                      src={s.media}
                      alt=""
                      loading="lazy"
                      className="w-full bg-muted"
                    />
                  </figure>
                )}
              </section>
            ))
          ) : (
            <p className="text-base leading-normal text-muted-foreground">
              {cached.summary}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
