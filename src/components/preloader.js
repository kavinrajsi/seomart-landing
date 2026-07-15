"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
export default function Preloader() {
  const overlay = useRef(null);
  const bg = useRef(null);
  const fill = useRef(null);
  const counter = useRef(null);

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
      overlay.current.style.pointerEvents = "none";
      overlay.current.style.zIndex = "95";
    });
    tl.to(bg.current, { opacity: 0, duration: 0.6, ease: "power2.out" }, ">");
    tl.to(counter.current, { opacity: 0, duration: 0.4 }, "<");
    tl.set(bg.current, { display: "none" });
  });


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

    </div>
  );
}
