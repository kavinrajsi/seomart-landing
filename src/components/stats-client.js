"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AccentHeading from "./accent-heading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Pins the stats section and reveals each number one-by-one as the user
// scrolls (scrubbed). Server-rendered text is the final value, so no-JS and
// reduced-motion visitors see a plain grid with the real numbers already in.
export default function StatsClient({
  headingBefore,
  headingAccent,
  headingAfter,
  items,
}) {
  const section = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray("[data-stat]", section.current);
        if (!cards.length) return;

        gsap.set(cards, { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${cards.length * 320}`,
            pin: true,
            scrub: true,
          },
        });

        cards.forEach((card, i) => {
          const numEl = card.querySelector("[data-num]");
          const value = parseFloat(numEl.dataset.value);
          const decimals = parseInt(numEl.dataset.decimals || "0", 10);
          const counter = { v: 0 };

          tl.to(card, { opacity: 1, y: 0, duration: 0.4 }, i).to(
            counter,
            {
              v: value,
              duration: 0.6,
              ease: "power2.out",
              onUpdate: () => {
                numEl.textContent = counter.v.toFixed(decimals);
              },
            },
            i
          );
        });
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={headingBefore}
            accent={headingAccent}
            after={headingAfter}
          />
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat) => (
            <div key={stat.id ?? stat.label} data-stat>
              <p className="mb-4 text-6xl font-light lg:text-7xl">
                {stat.prefix}
                <span
                  data-num
                  data-value={stat.value}
                  data-decimals={stat.decimals ?? 0}
                >
                  {stat.value}
                </span>
                <span className="text-3xl lg:text-4xl">{stat.suffix}</span>
              </p>
              <p className="text-base leading-normal text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
