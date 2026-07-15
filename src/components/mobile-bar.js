"use client";

import { useEffect, useState } from "react";
import { PHONE } from "@/lib/constants";

export default function MobileBar() {
  const [show, setShow] = useState(false);

  // Reveal the bar only after the visitor scrolls past the logo marquee,
  // then keep it visible. Slides up from the bottom.
  useEffect(() => {
    const el = document.getElementById("trusted");
    if (!el) return;
    const update = () => {
      // Past the marquee once its bottom edge is above the viewport top.
      if (el.getBoundingClientRect().bottom < 0) setShow(true);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 flex w-full rounded-t-lg bg-primary text-primary-foreground shadow-lg transition-transform duration-700 ease-out sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={`tel:${PHONE}`}
        className="flex-1 whitespace-nowrap px-3 py-4 text-center text-sm font-semibold"
      >
        Call Us
      </a>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("open-audit"))}
        className="flex-1 whitespace-nowrap border-l border-primary-foreground/20 px-3 py-4 text-center text-sm font-semibold"
      >
        Book a Free Audit
      </button>
    </div>
  );
}
