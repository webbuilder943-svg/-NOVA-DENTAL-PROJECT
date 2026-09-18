"use client";

import { useCallback, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CASES = [
  {
    title: "Clear Aligners",
    timeframe: "Average case: 6–9 months",
  },
  {
    title: "Laser Whitening",
    timeframe: "Professional in-office session, one visit",
  },
  {
    title: "3D Implants",
    timeframe: "Planned from a full jaw scan, single visit",
  },
];

function SmileGlyph({ tone }: { tone: "before" | "after" }) {
  const stroke = tone === "before" ? "#94a3b8" : "#2563eb";
  const fill = tone === "before" ? "#94a3b833" : "#2563eb1a";
  return (
    <svg width="150" height="56" viewBox="0 0 150 56" fill="none">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          x={4 + i * 18.5}
          y={8}
          width="14"
          height="40"
          rx="6"
          stroke={stroke}
          strokeWidth="1.5"
          fill={fill}
        />
      ))}
    </svg>
  );
}

function CompareSlider({
  title,
  timeframe,
}: {
  title: string;
  timeframe: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  }, []);

  function handlePointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  }
  function handlePointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }
  function handlePointerUp() {
    draggingRef.current = false;
  }

  return (
    <div className="reveal glow-card overflow-hidden p-0">
      <div
        ref={containerRef}
        className="relative h-64 w-full touch-none select-none sm:h-72"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
          <SmileGlyph tone="before" />
          <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs text-slate-500 shadow-sm">
            Before
          </span>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <SmileGlyph tone="after" />
          <span className="absolute right-4 top-4 rounded-full bg-blue-600/10 px-3 py-1 text-xs text-blue-700 shadow-sm">
            After
          </span>
        </div>

        <div
          className="absolute inset-y-0 z-10 flex w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center"
          style={{ left: `${position}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="absolute inset-y-0 w-px bg-blue-400" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
            <GripVertical size={16} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-base font-medium text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{timeframe}</p>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="results" ref={ref} className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          See the difference
        </h2>
        <p className="mt-4 text-slate-500">
          Drag the divider to compare. Three common cases, before treatment
          and after.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {CASES.map((c) => (
          <CompareSlider key={c.title} title={c.title} timeframe={c.timeframe} />
        ))}
      </div>

      <p className="reveal mt-8 text-center text-xs text-slate-400">
        Illustrative concept only, not real patient photos. Real case results
        are added once the clinic confirms and shares actual before/after
        cases.
      </p>
    </section>
  );
}
