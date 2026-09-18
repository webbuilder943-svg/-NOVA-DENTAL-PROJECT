"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATS = [
  { value: "14,000+", label: "Happy Patients" },
  { value: "15+", label: "Years Experience" },
  { value: "3,200+", label: "Procedures Done" },
  { value: "3", label: "Expert Doctors" },
];

export default function Stats() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-6 sm:grid-cols-4 sm:divide-y-0">
        {STATS.map(({ value, label }) => (
          <div key={label} className="reveal px-6 py-12 text-center">
            <p className="font-display text-4xl font-semibold text-blue-600 sm:text-5xl">
              {value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.1em] text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
