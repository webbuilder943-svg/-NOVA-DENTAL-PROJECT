"use client";

import { ShieldCheck, Syringe, Wind, Sparkles, Star } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "Every instrument autoclave-sterilized" },
  { icon: Syringe, label: "Needles opened from sealed pouches, in front of you" },
  { icon: Sparkles, label: "Fresh gloves and a new mask, every procedure" },
  { icon: Wind, label: "HEPA air filtration in every treatment room" },
  { icon: Star, label: "4.9 rated, 14,000+ patient visits" },
];

function BadgeRow() {
  return (
    <div className="flex shrink-0 items-center">
      {BADGES.map(({ icon: Icon, label }, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-8 text-sm text-slate-600"
        >
          <Icon size={16} className="shrink-0 text-blue-600" />
          <span className="whitespace-nowrap">{label}</span>
          <span className="ml-8 h-1 w-1 rounded-full bg-slate-300" />
        </div>
      ))}
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-[var(--bg-alt)] py-5">
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: "32s" }}
      >
        <BadgeRow />
        <BadgeRow />
      </div>
    </section>
  );
}
