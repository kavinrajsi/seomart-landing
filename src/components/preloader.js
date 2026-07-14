"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const VIDEO_SRC = "https://development.searchmadarth.com/video/video.webm";
const MARGIN = 24; // matches the top-6 / left-6 start inset (24px)
const END_W = 180; // floated (collapsed) video size, bottom-right
const END_H = 130;
const BIG_W = 778; // expanded video size, anchored bottom-right (grows up-left)
const BIG_H = 466;
const BAR_H = 34; // solid strip below the video (DEMO REEL / EXPAND)

// Bottom-right anchored translate (relative to the left-6/top-6 start) for a
// given video size, so the card (video + bar) keeps 24px clearance from the
// right/bottom edges.
const anchorX = (w) => () => window.innerWidth - w - MARGIN * 2;
const anchorY = (h) => () => window.innerHeight - (h + BAR_H) - MARGIN * 2;

// Intro overlay: a video autoplays top-left over a white panel while a lime
// fill + 0→100% counter rise. At 100% the panel fades out (revealing the page)
// and the video docks bottom-right as a demo-reel widget. EXPAND grows the same
// video up-left to a large player (with sound); COLLAPSE docks it back.
export default function Preloader() {
  const overlay = useRef(null);
  const bg = useRef(null);
  const fill = useRef(null);
  const counter = useRef(null);
  const card = useRef(null);
  const videoBox = useRef(null);
  const video = useRef(null);
  const bar = useRef(null);

  const [expanded, setExpanded] = useState(false);

  useGSAP(() => {
    document.body.style.overflow = "hidden";
    const c = { v: 0 };
    const tl = gsap.timeline();

    tl.to(c, {
      v: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.current.textContent =
          String(Math.round(c.v)).padStart(3, "0") + "%";
        fill.current.style.height = c.v + "%";
      },
    });

    tl.add(() => {
      document.body.style.overflow = "";
      overlay.current.style.pointerEvents = "none"; // card keeps its own
    });
    tl.to(bg.current, { opacity: 0, duration: 0.6, ease: "power2.out" }, ">");
    tl.to(counter.current, { opacity: 0, duration: 0.4 }, "<");
    tl.to(
      videoBox.current,
      { width: END_W, height: END_H, duration: 0.9, ease: "power4.inOut" },
      "<"
    );
    tl.to(
      card.current,
      {
        x: anchorX(END_W),
        y: anchorY(END_H),
        duration: 0.9,
        ease: "power4.inOut",
      },
      "<"
    );
    tl.set(bg.current, { display: "none" });
    tl.to(bar.current, { opacity: 1, duration: 0.3 }, ">-0.1");
  });

  // Once the "Work that moves the numbers" section (#work) reaches the
  // viewport, hide the widget and keep it hidden for everything below; reverse
  // the same tween to bring it back when scrolled above #work again.
  useEffect(() => {
    const el = document.getElementById("work");
    if (!el) return;
    const hideTween = gsap.to(card.current, {
      autoAlpha: 0,
      duration: 0.3,
      paused: true,
    });
    let reached = false;
    const update = () => {
      const now = el.getBoundingClientRect().top <= window.innerHeight;
      if (now === reached) return;
      reached = now;
      if (now) hideTween.play();
      else hideTween.reverse();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      hideTween.kill();
    };
  }, []);

  const expand = () => {
    setExpanded(true);
    if (video.current) {
      video.current.muted = false;
      video.current.volume = 1;
    }
    gsap.to(videoBox.current, {
      width: BIG_W,
      height: BIG_H,
      duration: 0.6,
      ease: "power4.inOut",
    });
    gsap.to(card.current, {
      x: anchorX(BIG_W),
      y: anchorY(BIG_H),
      duration: 0.6,
      ease: "power4.inOut",
    });
  };

  const collapse = () => {
    if (video.current) video.current.muted = true;
    gsap.to(videoBox.current, {
      width: END_W,
      height: END_H,
      duration: 0.6,
      ease: "power4.inOut",
    });
    gsap.to(card.current, {
      x: anchorX(END_W),
      y: anchorY(END_H),
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => setExpanded(false),
    });
  };

  const setVolume = (e) => {
    if (video.current) {
      video.current.muted = false;
      video.current.volume = Number(e.target.value);
    }
  };

  return (
    <div ref={overlay} className="fixed inset-0 z-[100]">
      <div ref={bg} className="absolute inset-0 bg-white">
        <div ref={fill} className="absolute inset-x-0 bottom-0 h-0 bg-primary" />
      </div>
      <span
        ref={counter}
        className="absolute bottom-6 right-6 font-mono text-7xl font-light tabular-nums text-primary-foreground lg:bottom-10 lg:right-10 lg:text-9xl"
      >
        000%
      </span>

      <div ref={card} className="pointer-events-auto absolute left-6 top-6">
        <div
          ref={videoBox}
          onClick={expanded ? collapse : expand}
          className="relative h-[89px] w-[134px] cursor-pointer overflow-hidden rounded-t-[4px] bg-foreground shadow-2xl"
        >
          <video
            ref={video}
            className="h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {expanded && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                collapse();
              }}
              aria-label="Close"
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-[4px] bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>

        {/* solid strip below the video */}
        <div
          ref={bar}
          style={{ height: BAR_H }}
          className="flex items-center justify-between gap-2 rounded-b-[4px] bg-foreground px-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white opacity-0 shadow-2xl"
        >
          <span>Show Reel</span>
          {expanded ? (
            <div className="flex items-center gap-3">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                defaultValue="1"
                onChange={setVolume}
                aria-label="Volume"
                className="h-1 w-24 cursor-pointer accent-primary"
              />
              <button
                type="button"
                onClick={collapse}
                className="uppercase transition-colors hover:text-white/70"
              >
                Collapse
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={expand}
              className="uppercase transition-colors hover:text-white/70"
            >
              Expand
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
