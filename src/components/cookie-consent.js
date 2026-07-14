"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

function Toggle({ id, checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="mt-3 flex w-fit items-center gap-2.5 text-sm text-foreground"
    >
      <span className="relative flex h-3 w-8 shrink-0 items-center">
        <span className={`h-px w-full ${checked ? "bg-primary" : "bg-foreground"}`} />
        <span
          className={`absolute size-2.5 rounded-full transition-all ${
            checked ? "left-full -translate-x-full bg-primary" : "left-0 bg-foreground"
          }`}
        />
      </span>
      <span>{checked ? "On" : "Off"}</span>
    </button>
  );
}

function Column({ title, children }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="text-sm leading-normal text-muted-foreground">{children}</div>
    </div>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [performance, setPerformance] = useState(false);

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setOpen(true);
    }
    // Reopen with stored prefs when the footer "Cookie Settings" is clicked.
    const reopen = () => {
      const current = getConsent();
      setFunctional(!!current?.functional);
      setPerformance(!!current?.performance);
      setOpen(true);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);

  // No action buttons — toggles persist immediately, X saves current choice.
  const changeFunctional = (v) => {
    setFunctional(v);
    setConsent({ functional: v, performance });
  };
  const changePerformance = (v) => {
    setPerformance(v);
    setConsent({ functional, performance: v });
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[80] max-h-[85vh] overflow-y-auto border-t border-border bg-background shadow-[0_-4px_24px_0_rgba(37,37,33,0.08)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-6 lg:py-8">
        <button
          type="button"
          aria-label="Save cookie preferences and close"
          onClick={() => {
            setConsent({ functional, performance });
            close();
          }}
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 gap-6 pr-8 md:grid-cols-2 lg:grid-cols-4">
          <Column title="Our use of cookies">
            SearchMadarth uses cookies — some are necessary for the site to work,
            others help us improve your experience. For more information,{" "}
            <Link href="/cookie-policy" className="text-primary underline underline-offset-2">
              read our Cookie Policy
            </Link>
            .
          </Column>

          <Column title="Necessary cookies">
            Essential for the site to function and cannot be switched off.
            <p className="mt-3 text-sm font-medium text-foreground">Always on</p>
          </Column>

          <Column title="Functional cookies">
            Let the site remember choices you make to give you better, more
            personal features.
            <Toggle id="functional" checked={functional} onChange={changeFunctional} label="Functional cookies" />
          </Column>

          <Column title="Performance cookies">
            Help us understand how the site is used (e.g. Google Analytics) so we
            can improve it.
            <Toggle id="performance" checked={performance} onChange={changePerformance} label="Performance cookies" />
          </Column>
        </div>
      </div>
    </div>
  );
}
