"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Counts from 0 to `value` whenever the element enters the viewport.
// Server-rendered text is the final value, so no-JS and reduced-motion
// visitors always see the real number.
export default function CountUp({ value, decimals = 0 }) {
  const ref = useRef(null);

  useGSAP(() => {
    const counter = { v: 0 };
    gsap.to(counter, {
      v: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => {
        ref.current.textContent = counter.v.toFixed(decimals);
      },
      scrollTrigger: {
        // Trigger on the whole stats section so all numbers start
        // together when it enters the viewport.
        trigger: ref.current.closest("section") ?? ref.current,
        start: "top 85%",
        toggleActions: "restart reset restart reset",
      },
    });
  });

  return <span ref={ref}>{value}</span>;
}
