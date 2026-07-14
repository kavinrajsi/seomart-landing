"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./button";
import Logo from "./logo";
import { AUDIT_URL } from "@/lib/constants";

// Anchor links carry a "/" prefix so navigation works from subpages
// (e.g. policy pages) as well as the home page.
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#why", label: "Why Us" },
  { href: "/#faq", label: "FAQ" },
];

const anchorId = (href) => href.split("#")[1];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(anchorId(link.href)))
      .filter(Boolean);

    // Middle-of-viewport band decides which section is "current".
    // Track all intersecting sections so activeId clears to "" when none
    // are in the band (e.g. over the CTA/footer past the FAQ).
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current =
          links.map((l) => anchorId(l.href)).find((id) => visible.has(id)) ??
          "";
        setActiveId(current);
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Hide the nav while the Services section fills the viewport.
  useEffect(() => {
    const services = document.getElementById("services");
    if (!services) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHidden(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { rootMargin: "-15% 0px -15% 0px" }
    );
    observer.observe(services);
    return () => observer.disconnect();
  }, []);

  // Switch to black-glass while the pill sits over the dark tail
  // (FinalCta #contact + the footer, both bg-primary). A trip-line ~72px
  // from the top marks where the pill overlaps a section.
  useEffect(() => {
    const darkEls = [
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].filter(Boolean);
    if (!darkEls.length) return;
    const over = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) over.add(entry.target);
          else over.delete(entry.target);
        }
        setDark(over.size > 0);
      },
      { rootMargin: "-72px 0px -100% 0px" }
    );
    darkEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-[18px] left-0 right-0 z-50 transition-all duration-300 ${
        hidden
          ? "pointer-events-none -translate-y-[200%] opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-4">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-lg border-[4px] border-transparent px-5 py-3 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
            dark
              ? "border-white/15 bg-primary/60 text-primary-foreground shadow-[0_2px_24px_0_rgba(0,0,0,0.35)]"
              : "border-white/40 bg-background/60 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_20px_0_rgba(37,37,33,0.08)]"
          }`}
        >
          <Link
            href="/"
            aria-label="SearchMadarth home"
            className={dark ? "text-primary-foreground" : "text-foreground"}
          >
            <Logo className="h-5 w-auto lg:h-6" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => {
              const active = activeId === anchorId(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-lg border-[4px] px-4 py-2 text-base font-medium transition-colors ${
                    active
                      ? dark
                        ? "bg-primary-foreground text-primary"
                        : "border-[4px] bg-primary text-primary-foreground"
                      : dark
                        ? "text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
                        : "border-[4px] text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant={dark ? "inverted" : "primary"}
            >
              Book a Free Audit
            </Button>
          </div>

          <button
            className={`rounded-lg p-2 lg:hidden ${
              dark ? "hover:bg-white/10" : "hover:bg-muted"
            }`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div
            className={`fixed inset-x-4 top-[84px] bottom-0 z-[60] flex flex-col rounded-lg border-[4px] p-4 shadow-2xl transition-colors duration-300 lg:hidden ${
              dark
                ? "border-white/15 bg-primary text-primary-foreground"
                : "border-black/10 bg-background text-foreground"
            }`}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-1"
              aria-label="Mobile"
            >
              {links.map((l) => {
                const active = activeId === anchorId(l.href);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "true" : undefined}
                    className={`rounded-lg px-4 py-4 text-2xl font-medium ${
                      active
                        ? dark
                          ? "bg-primary-foreground text-primary"
                          : "bg-primary text-primary-foreground"
                        : dark
                          ? "hover:bg-white/10"
                          : "hover:bg-muted"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
            <Button
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant={dark ? "inverted" : "primary"}
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
              >
                Book a Free Audit
              </Button>
          </div>
        )}
      </div>
    </header>
  );
}
