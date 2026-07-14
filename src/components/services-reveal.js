"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Mobile/tablet only: desktop (lg+) uses the CSS sticky pin-stack, so the
// pillar cards get a slide-up + fade reveal below lg instead — motion on
// mobile without pinning tall content.
export default function ServicesReveal({ children }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px)", () => {
          gsap.utils.toArray(".stack-card").forEach((card) => {
            gsap.from(card, {
              y: 40,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" },
            });
          });
        }
      );
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
