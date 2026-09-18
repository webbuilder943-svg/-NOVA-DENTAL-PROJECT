"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    n: "1",
    title: "Consultation & digital scan",
    description:
      "A full exam and digital X-rays so we're working from what's actually going on, not a guess.",
  },
  {
    n: "2",
    title: "A plan you see before you agree to it",
    description:
      "Sequencing, timeline and cost laid out in writing — nothing added once treatment has started.",
  },
  {
    n: "3",
    title: "Treatment, at a pace that works for you",
    description:
      "Numbing, sedation options and breaks on request. We tell you what you'll feel before you feel it.",
  },
  {
    n: "4",
    title: "Aftercare that doesn't end at the door",
    description:
      "Written recovery instructions and a recall reminder, so follow-up isn't left to memory.",
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const rows = container.querySelectorAll<HTMLElement>(".timeline-row");
    const ctx = gsap.context(() => {
      rows.forEach((row, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          row,
          { x: fromLeft ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-4xl px-6 py-24"
    >
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          What treatment actually looks like
        </h2>
        <p className="mt-4 text-slate-500">
          No surprise steps. Here&apos;s the sequence every patient goes
          through.
        </p>
      </div>

      <div className="relative mt-16 space-y-8">
        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-300 via-blue-100 to-transparent" />

        {STEPS.map((step) => (
          <div
            key={step.n}
            className="timeline-row glow-card relative flex gap-5 p-6 pl-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-semibold text-blue-600">
              {step.n}
            </span>
            <div>
              <h3 className="text-base font-medium text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
