"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CaseStudyDrawer from "./case-study-drawer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CaseStudiesClient({ cases }) {
  const [active, setActive] = useState(null);
  const panelRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Pinned horizontal scroll: the card track translates left as the
      // page scrolls down, so the viewer traverses the cases left → right.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const dist = () => track.scrollWidth - panelRef.current.clientWidth;
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 18%",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Reduced motion: no animation — keep the row reachable by manual scroll.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const panel = panelRef.current;
        panel.classList.add("overflow-x-auto");
        return () => panel.classList.remove("overflow-x-auto");
      });
    },
    { scope: panelRef }
  );

  return (
    <>
      <div ref={panelRef} className="overflow-x-hidden">
        <div
          ref={trackRef}
          className="flex flex-row gap-6 px-4 lg:px-[max(1rem,calc((100vw-72rem)/2))]"
        >
          {cases.map((c) => (
            <button
              key={c.slug ?? c.client}
              type="button"
              onClick={() => setActive(c)}
              className="group w-[80vw] shrink-0 text-left sm:w-[24rem] lg:w-[28rem]"
            >
              <div className="mb-5 aspect-video overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={c.alt ?? c.client}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {c.tag}
              </p>
              <h3 className="mb-2 text-xl font-semibold">{c.client}</h3>
              {c.summary && (
                <p className="line-clamp-3 text-base leading-normal text-muted-foreground">
                  {c.summary}
                </p>
              )}
            </button>
          ))}
          <div aria-hidden className="w-screen shrink-0 motion-reduce:hidden" />
        </div>
      </div>
      <CaseStudyDrawer study={active} onClose={() => setActive(null)} />
    </>
  );
}
