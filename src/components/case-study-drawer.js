"use client";

import { useEffect } from "react";
import { PortableText } from "@portabletext/react";

const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-muted-foreground">
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
      <blockquote className="mb-4 border-l-2 pl-4 text-lg font-light leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop — click closes */}
      <button
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={study.client}
        className="relative ml-auto h-full w-[80%] overflow-y-auto bg-background shadow-2xl"
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

        {(study.cover ?? study.image) && (
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={study.cover ?? study.image}
              alt={study.alt ?? study.client}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-14">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
            {study.tag}
          </p>
          <h2 className="mb-8 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {study.client}
          </h2>

          {study.sections?.length ? (
            study.sections.map((s) => (
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
            <p className="text-base leading-relaxed text-muted-foreground">
              {study.summary}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
