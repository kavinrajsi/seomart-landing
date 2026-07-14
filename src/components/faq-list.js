"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FaqList({ faqs }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-faq-item]", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: scope.current, start: "top 80%" },
        });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="flex flex-col">
      {faqs.map((f) => (
        <details
          key={f.q}
          name="faq"
          data-faq-item
          className="group border-t last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium sm:text-lg [&::-webkit-details-marker]:hidden">
            {f.q}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="shrink-0 transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <p className="max-w-3xl pb-6 text-base leading-normal text-muted-foreground">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
