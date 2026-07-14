"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AccentHeading from "./accent-heading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProcessClient({ headingBefore, headingAccent, headingAfter, steps }) {
  const grid = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-process-item]", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: grid.current, start: "top 80%" },
        });
      });
    },
    { scope: grid }
  );

  return (
    <section id="process" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading before={headingBefore} accent={headingAccent} after={headingAfter} />
        </h2>
        <div
          ref={grid}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
        >
          {steps.map((step, i) => (
            <div key={step.id ?? step.title} data-process-item>
              <p className="mb-6 font-mono text-base text-muted-foreground">
                0{i + 1}
              </p>
              <h3 className="mb-2 text-2xl font-semibold">{step.title}</h3>
              <p className="text-base text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
