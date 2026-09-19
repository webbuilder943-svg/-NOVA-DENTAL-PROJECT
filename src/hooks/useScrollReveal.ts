"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let globalRefreshBound = false;
function bindGlobalRefresh() {
  if (globalRefreshBound || typeof window === "undefined") return;
  globalRefreshBound = true;
  // Trigger positions are calculated at mount time, before images and
  // fonts finish loading. On a slow mobile connection the page keeps
  // growing taller well after that — and the further down the page a
  // section sits, the more accumulated layout shift throws its trigger
  // off — so a position calculated early can end up pointing at the
  // wrong place and simply never fire. Recalculate once everything has
  // actually finished loading, not just on mount.
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
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

    bindGlobalRefresh();

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

    // Safety net: content must never stay permanently invisible just
    // because a scroll trigger didn't fire (flaky network, a layout
    // edge case ScrollTrigger.refresh() didn't catch). Force it visible
    // outright after a few seconds regardless — harmless no-op if the
    // real animation already ran.
    const fallback = window.setTimeout(() => {
      gsap.set(targets, { opacity: 1, y: 0 });
    }, 4000);

    return () => {
      ctx.revert();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}
