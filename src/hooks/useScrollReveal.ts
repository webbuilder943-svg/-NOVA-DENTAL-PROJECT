"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Attach to a section wrapper. Any descendant with the `.reveal` class
 * (see globals.css) fades + slides up into place once it enters the
 * viewport. Elements are batched so a grid of cards staggers in together
 * instead of animating one by one.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(".reveal");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return ref;
}
