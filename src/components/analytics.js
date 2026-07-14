"use client";

import { useEffect } from "react";
import { getConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

let scriptLoaded = false;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
}

// Loads Google Analytics only after Performance consent, and keeps Google
// Consent Mode in sync when the visitor changes their choice.
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    ensureGtag();
    // Consent Mode default: analytics denied until the visitor opts in.
    window.gtag("consent", "default", { analytics_storage: "denied" });

    const apply = () => {
      const granted = !!getConsent()?.performance;
      window.gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
      });
      if (granted && !scriptLoaded) {
        const s = document.createElement("script");
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s);
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
        scriptLoaded = true;
      }
    };

    apply();
    window.addEventListener("consent-changed", apply);
    return () => window.removeEventListener("consent-changed", apply);
  }, []);

  return null;
}
