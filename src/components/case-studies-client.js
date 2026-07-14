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
      // Pinned horizontal scroll: the card track translates left as the page
      // scrolls down, so the viewer traverses the cases left → right. Runs on
      // every device regardless of the reduce-motion setting (by request).
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
          {cases.map((caseStudy) => (
            <button
              key={caseStudy.slug ?? caseStudy.client}
              type="button"
              onClick={() => setActive(caseStudy)}
              className="group w-[80vw] shrink-0 text-left sm:w-[24rem] lg:w-[28rem]"
            >
              <div className="mb-5 aspect-video overflow-hidden bg-muted">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.alt ?? caseStudy.client}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {caseStudy.tag}
              </p>
              <h3 className="mb-2 text-xl font-semibold">{caseStudy.client}</h3>
              {caseStudy.summary && (
                <p className="line-clamp-3 text-base leading-normal text-muted-foreground">
                  {caseStudy.summary}
                </p>
              )}
            </button>
          ))}
          <div aria-hidden className="w-[40px] shrink-0 md:w-[200px]" />
        </div>
      </div>
      <CaseStudyDrawer study={active} onClose={() => setActive(null)} />
    </>
  );
}
