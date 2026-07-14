"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// Query/result pairs cycled by the typing loop; the first pair is fully
// rendered on the server so the box never pops in empty.
const pairs = [
  {
    query: "digital marketing agency for growing brands",
    result: "Search Optimisation — SEO, AEO & GEO",
  },
  {
    query: "performance marketing agency that drives roi",
    result: "Paid Performance — Google, Meta & More",
  },
  {
    query: "fast conversion-focused website development",
    result: "Web Development — Performance-First Builds",
  },
  {
    query: "branding and design studio for standout brands",
    result: "Design — Brand, Campaign & Content",
  },
];

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 2600;
const RESULT_DELAY_MS = 350;

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export default function SearchDemo() {
  const [pairIndex, setPairIndex] = useState(0);
  const [text, setText] = useState(pairs[0].query);
  const [phase, setPhase] = useState("hold"); // typing | hold | deleting
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false
  );

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
      timer = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      } else {
        timer = setTimeout(() => {
          setPairIndex((i) => (i + 1) % pairs.length);
          setPhase("typing");
        }, DELETE_MS);
      }
    }

    return () => clearTimeout(timer);
  }, [phase, text, pairIndex, reducedMotion]);

  const active = pairs[pairIndex];
  const showResult =
    reducedMotion || (phase !== "deleting" && text === active.query);

  return (
    <div className="mx-auto w-full max-w-2xl" aria-hidden="true">
      <div className="rounded-xl border bg-background p-2 shadow-[0_2px_20px_0_rgba(37,37,33,0.05)]">
        <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3.5">
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
          <span className="truncate font-mono text-base text-foreground">
            {text}
            <span className="search-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-foreground" />
          </span>
        </div>
        <div
          className={`flex items-center gap-3 px-4 pt-3 pb-2 transition-opacity duration-300 ${
            showResult ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="rounded bg-primary px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
            Top result
          </span>
          <span className="truncate text-base font-medium">
            {active.result}
          </span>
        </div>
      </div>
    </div>
  );
}
