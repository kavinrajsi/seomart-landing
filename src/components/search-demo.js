"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Query/result groups cycled by the typing loop; the first group is fully
// rendered on the server so the box never pops in empty. Each query surfaces
// several results — the first is the "top result", the rest are related.
const pairs = [
  {
    query: "digital marketing agency for growing brands",
    results: [
      "Search Optimisation — SEO, AEO & GEO",
      "Paid Performance — Google, Meta & More",
      "Design — Brand, Campaign & Content",
    ],
  },
  {
    query: "performance marketing agency that drives roi",
    results: [
      "Paid Performance — Google, Meta & More",
      "Conversion & Tracking — GA4, GTM & Attribution",
      "Landing Page Optimisation",
    ],
  },
  {
    query: "fast conversion-focused website development",
    results: [
      "Web Development — Performance-First Builds",
      "E-commerce Development",
      "UI/UX Design",
    ],
  },
  {
    query: "branding and design studio for standout brands",
    results: [
      "Design — Brand, Campaign & Content",
      "UI/UX Design",
      "Landing Pages",
    ],
  },
  {
    query: "rank higher on google and ai search",
    results: [
      "Search Engine Optimisation (SEO)",
      "Answer Engine Optimisation (AEO)",
      "Generative Engine Optimisation (GEO)",
    ],
  },
  {
    query: "google ads agency to lower cost per lead",
    results: [
      "Google Ads Management",
      "Meta Advertising",
      "Conversion & Tracking",
    ],
  },
  {
    query: "ecommerce website that converts more sales",
    results: [
      "E-commerce Development",
      "Landing Page Optimisation",
      "Conversion & Tracking",
    ],
  },
  {
    query: "social media content and campaign design",
    results: [
      "Design — Brand, Campaign & Content",
      "Meta Advertising",
      "UI/UX Design",
    ],
  },
  {
    query: "show up in featured snippets and voice search",
    results: [
      "Answer Engine Optimisation (AEO)",
      "Technical & Content Excellence",
      "Search Engine Optimisation (SEO)",
    ],
  },
  {
    query: "get cited by chatgpt and ai assistants",
    results: [
      "AI Optimisation (AIO)",
      "Generative Engine Optimisation (GEO)",
      "Answer Engine Optimisation (AEO)",
    ],
  },
  {
    query: "visibility across google ai overviews and gemini",
    results: [
      "Generative Engine Optimisation (GEO)",
      "AI Optimisation (AIO)",
      "Technical & Content Excellence",
    ],
  },
  {
    query: "improve search experience and click-through",
    results: [
      "Search Experience Optimisation (SXO)",
      "Landing Page Optimisation",
      "UI/UX Design",
    ],
  },
];

const TYPE_MS = 55;
const HOLD_MS = 2600;
const RESULT_DELAY_MS = 350;
const MOVE_MS = 550; // fake cursor glide to the X (matches CSS transition)
const PRESS_MS = 160; // X pressed state before the instant clear
const CLEAR_GAP_MS = 450; // empty beat after clear before next query types

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export default function SearchDemo() {
  const [pairIndex, setPairIndex] = useState(0);
  const [text, setText] = useState(pairs[0].query);
  const [phase, setPhase] = useState("hold"); // typing | hold | moving | clearing
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false
  );

  const containerRef = useRef(null);
  const closeRef = useRef(null);
  const [closePos, setClosePos] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [pressing, setPressing] = useState(false);

  // Measure the X icon's center relative to the container so the fake cursor
  // lands on it at any breakpoint (re-measured on resize).
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !closeRef.current) return;
      const c = containerRef.current.getBoundingClientRect();
      const b = closeRef.current.getBoundingClientRect();
      setClosePos({
        x: b.left - c.left + b.width / 2,
        y: b.top - c.top + b.height / 2,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // A fresh random resting point inside the card (below the input row) so the
  // cursor drifts somewhere different after each clear.
  const randomRest = () => {
    const el = containerRef.current;
    if (!el) return { x: 40, y: 120 };
    const r = el.getBoundingClientRect();
    const pad = 24;
    return {
      x: pad + Math.random() * (r.width - pad * 2),
      y: 72 + Math.random() * (r.height - 96),
    };
  };

  // Park the cursor at a random spot once measured.
  useEffect(() => {
    if (closePos && cursor === null) setCursor(randomRest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closePos]);

  useEffect(() => {
    if (reducedMotion) return;
    const query = pairs[pairIndex].query;
    let timer;

    if (phase === "typing") {
      if (text.length < query.length) {
        timer = setTimeout(
          () => setText(query.slice(0, text.length + 1)),
          TYPE_MS
        );
      } else {
        timer = setTimeout(() => setPhase("hold"), RESULT_DELAY_MS);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("moving"), HOLD_MS);
    } else if (phase === "moving") {
      if (closePos) setCursor(closePos);
      timer = setTimeout(() => setPhase("clearing"), MOVE_MS);
    } else if (phase === "clearing") {
      setPressing(true);
      timer = setTimeout(() => {
        setPressing(false);
        setText("");
        setCursor(randomRest());
        timer = setTimeout(() => {
          setPairIndex((i) => (i + 1) % pairs.length);
          setPhase("typing");
        }, CLEAR_GAP_MS);
      }, PRESS_MS);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, text, pairIndex, reducedMotion]);

  const active = pairs[pairIndex];
  const showResult =
    reducedMotion ||
    ((phase === "typing" && text === active.query) ||
      phase === "hold" ||
      phase === "moving");

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl" aria-hidden="true">
      <div className="rounded-lg border-[1px] bg-background p-2 shadow-[0_2px_20px_0_rgba(37,37,33,0.05)]">
        <div className="flex items-center gap-3 rounded-[4px] bg-muted/60 px-4 py-3.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="shrink-0 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="min-w-0 flex-1 truncate text-left font-mono text-base text-foreground">
            {text}
            <span className="search-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-foreground" />
          </span>
          <span
            ref={closeRef}
            className={`flex shrink-0 items-center justify-center rounded transition-all duration-150 ${
              pressing ? "scale-90 bg-foreground/10" : "scale-100"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-muted-foreground"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
        </div>
        <div className="px-2 pt-2 pb-1">
          {active.results.map((result, i) => (
            <div
              key={result}
              style={{ transitionDelay: showResult ? `${i * 140}ms` : "0ms" }}
              className={`flex items-center gap-3 rounded-[4px] px-2 py-2 transition-all duration-300 ${
                showResult ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              {i === 0 ? (
                <span className="shrink-0 rounded bg-primary px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase text-primary-foreground">
                  Top result
                </span>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="shrink-0 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              )}
              <span
                className={`truncate text-base ${
                  i === 0 ? "font-medium" : "text-muted-foreground"
                }`}
              >
                {result}
              </span>
            </div>
          ))}
        </div>
      </div>
      {!reducedMotion && cursor && (
        <span
          className="pointer-events-none absolute left-0 top-0 z-10 transition-transform duration-[550ms] ease-out"
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={`drop-shadow-sm transition-transform duration-150 ${
              pressing ? "scale-90" : "scale-100"
            }`}
          >
            <path
              d="M5 3l14 6.5-5.8 1.4L10.5 17 5 3z"
              fill="currentColor"
              stroke="var(--background)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="text-foreground"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
