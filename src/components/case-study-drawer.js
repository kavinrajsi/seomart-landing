"use client";

import { useEffect, useState } from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";

// Heading levels are downshifted one step (H2→h3, etc.) so the drawer's own
// <h2> title stays the top of the outline, matching the previous Portable Text
// renderer.
const HEADING_STYLES = {
  h2: "mb-4 mt-10 text-2xl font-semibold lg:text-3xl",
  h3: "mb-3 mt-8 text-xl font-semibold",
  h4: "mb-2 mt-6 text-lg font-semibold",
};
const HEADING_TAG = { h2: "h3", h3: "h4", h4: "h5" };

const LIST_STYLES = {
  bullet: "mb-4 list-disc space-y-2 pl-6 text-base leading-normal text-muted-foreground",
  number: "mb-4 list-decimal space-y-2 pl-6 text-base leading-normal text-muted-foreground",
};

const jsxConverters = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <p className="mb-4 text-base leading-normal text-muted-foreground">{children}</p>
    );
  },
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const Tag = HEADING_TAG[node.tag] ?? node.tag;
    const className = HEADING_STYLES[node.tag];
    return <Tag className={className}>{children}</Tag>;
  },
  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="mb-4 border-l-[1px] pl-4 text-lg font-light leading-normal">
        {children}
      </blockquote>
    );
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const Tag = node.tag;
    return <Tag className={LIST_STYLES[node.listType]}>{children}</Tag>;
  },
  link: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <a
        href={node.fields?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-foreground cursor-pointer"
      >
        {children}
      </a>
    );
  },
  upload: ({ node }) => {
    const doc = node.value;
    if (!doc || typeof doc !== "object" || !doc.url) return null;
    const alt = node.fields?.alt || doc.alt || "";
    if (doc.mimeType?.startsWith("video")) {
      return <video src={doc.url} controls className="mb-4 w-full bg-muted" />;
    }
    return (
      <img src={doc.url} alt={alt} loading="lazy" className="mb-4 w-full bg-muted" />
    );
  },
});

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
    <div className={`fixed inset-0 z-[91] flex ${visible ? "" : "pointer-events-none"}`}>
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
          className="fixed right-6 top-6 z-10 flex size-10 items-center justify-center border-[1px] bg-background transition-colors hover:bg-secondary"
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
          <p className="mb-3 font-mono text-xs font-medium uppercase text-muted-foreground">
            {cached.tag}
          </p>
          <h2 className="mb-8 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {cached.client}
          </h2>

          {cached.sections?.length ? (
            cached.sections.map((section) => (
              <section key={section._key}>
                {section.content && (
                  <RichText
                    data={section.content}
                    converters={jsxConverters}
                    disableContainer
                  />
                )}
                {section.media && (
                  <figure className="my-8">
                    <img
                      src={section.media}
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
