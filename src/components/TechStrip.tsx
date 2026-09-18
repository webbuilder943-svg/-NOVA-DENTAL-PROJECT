"use client";

import { Scan, Radiation, Zap, FlaskConical } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TECH = [
  {
    icon: Scan,
    title: "3D Intraoral Scanner",
    description: "Digital impressions in minutes — no trays, no putty.",
  },
  {
    icon: Radiation,
    title: "Digital X-Ray",
    description: "Up to 80% less radiation than traditional film X-rays.",
  },
  {
    icon: Zap,
    title: "Soft-Tissue Laser",
    description: "Faster healing for gum treatments, often without stitches.",
  },
  {
    icon: FlaskConical,
    title: "Class B Autoclave",
    description: "Hospital-grade sterilization for every instrument, every time.",
  },
];

export default function TechStrip() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="technology"
      ref={ref}
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="reveal mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          Technology in the room
        </h2>
        <p className="mt-4 text-slate-500">
          The same digital precision behind every treatment on this page,
          available in the chair with you.
        </p>
      </div>

      <div className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {TECH.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="reveal glow-card min-w-[80%] shrink-0 snap-start p-7 sm:min-w-0 sm:shrink"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Icon className="text-blue-600" size={20} />
            </div>
            <h3 className="mt-5 text-base font-medium text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
