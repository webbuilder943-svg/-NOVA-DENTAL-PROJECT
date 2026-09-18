"use client";

import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote:
      "I used to dread the dentist. The team walked me through every step before touching anything — first time I've felt in control of an appointment.",
    name: "Priya N.",
    context: "Patient since 2022",
  },
  {
    quote:
      "Cracked a molar on a Sunday. They saw me within the hour and there was no drama at checkout with insurance.",
    name: "Arun K.",
    context: "Emergency visit, 2024",
  },
  {
    quote: "My son actually asks to go back. That's the real review.",
    name: "Meera S.",
    context: "Parent of a 7-year-old patient",
  },
];

function TestimonialCard({
  quote,
  name,
  context,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="glow-card mx-3 flex w-[360px] shrink-0 flex-col gap-4 p-7 sm:w-[420px]">
      <Quote className="text-blue-400" size={22} />
      <p className="text-sm leading-relaxed text-slate-700">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-auto pt-2">
        <p className="text-sm font-medium text-slate-900">{name}</p>
        <p className="text-xs text-slate-400">{context}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="testimonials" ref={ref} className="py-24">
      <div className="reveal mx-auto max-w-xl px-6 text-center">
        <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          What patients say
        </h2>
        <p className="mt-4 text-slate-500">Unedited, in their own words.</p>
      </div>

      <div className="reveal mt-16 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div
          className="marquee-track"
          style={{ ["--marquee-duration" as string]: "38s" }}
        >
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name + "-dup"} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
