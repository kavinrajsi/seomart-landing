"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./button";
import Logo from "./logo";

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

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(anchorId(l.href)))
      .filter(Boolean);

    // Middle-of-viewport band decides which section is "current"
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-[18px] left-0 right-0 z-50">
      <div className="mx-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/40 bg-background/60 px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_20px_0_rgba(37,37,33,0.08)] backdrop-blur-xl backdrop-saturate-150">
          <Link
            href="/"
            aria-label="SearchMadarth home"
            className="text-foreground"
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
                  className={`rounded-full px-4 py-2 text-base font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="https://superengine.vercel.app/?utm_source=searchmadarth&utm_medium=website&utm_campaign=free_audit" target="_blank" rel="noopener noreferrer">Book a Free Audit</Button>
          </div>

          <button
            className="rounded-md p-2 hover:bg-muted lg:hidden"
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
          <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/40 bg-background/70 p-4 shadow-lg backdrop-blur-xl backdrop-saturate-150 lg:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l) => {
                const active = activeId === anchorId(l.href);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "true" : undefined}
                    className={`rounded-md px-3 py-3 text-base font-medium ${
                      active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                );
              })}
              <Button
                href="https://superengine.vercel.app/?utm_source=searchmadarth&utm_medium=website&utm_campaign=free_audit"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                Book a Free Audit
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
