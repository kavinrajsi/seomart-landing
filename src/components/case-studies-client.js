"use client";

import { useState } from "react";
import CaseStudyDrawer from "./case-study-drawer";

export default function CaseStudiesClient({ cases }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="mx-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseStudy) => (
            <button
              key={caseStudy.slug ?? caseStudy.client}
              type="button"
              onClick={() => setActive(caseStudy)}
              className="group text-left"
            >
              <div className="mb-5 aspect-video overflow-hidden bg-muted">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.alt ?? caseStudy.client}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mb-2 font-mono text-[11px] font-medium uppercase text-muted-foreground">
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
        </div>
      </div>
      <CaseStudyDrawer study={active} onClose={() => setActive(null)} />
    </>
  );
}
