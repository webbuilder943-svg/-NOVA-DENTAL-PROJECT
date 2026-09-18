"use client";

import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TIERS = [
  {
    name: "Basic",
    tagline: "Consultation + Checkup",
    price: "₹499",
    features: [
      "Full dental checkup",
      "Digital X-ray (1 unit)",
      "Personalized treatment plan",
      "Home-care guidance",
    ],
    featured: false,
  },
  {
    name: "Complete",
    tagline: "Full Care Package",
    price: "₹1,499",
    features: [
      "Everything in Basic",
      "Professional cleaning",
      "Fluoride treatment",
      "Priority booking",
      "One follow-up visit included",
    ],
    featured: true,
  },
  {
    name: "Premium",
    tagline: "Annual Smile Plan",
    price: "₹9,999",
    features: [
      "Everything in Complete",
      "2 cleanings a year",
      "One whitening session",
      "Emergency visit priority",
      "10% family discount",
    ],
    featured: false,
  },
];

export default function PricingTiers() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="pricing" ref={ref} className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          Transparent pricing
        </h2>
        <p className="mt-4 text-slate-500">
          No hidden charges. Pick the plan that fits how often you need us.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-center">
        {TIERS.map((tier) =>
          tier.featured ? (
            // The featured tier is a genuinely different object — solid
            // blue-900, physically taller — not a white card with a ring
            // and a badge pretending to be different.
            <div
              key={tier.name}
              className="relative flex flex-col rounded-2xl bg-blue-900 p-8 py-12 text-white shadow-[0_30px_60px_rgba(27,34,87,0.35)] sm:scale-[1.06]"
            >
              <span className="text-xs font-medium uppercase tracking-[0.1em] text-blue-300">
                Most popular
              </span>
              <h3 className="font-display mt-2 text-2xl font-semibold">
                {tier.tagline}
              </h3>
              <p className="mt-4 text-4xl font-semibold">{tier.price}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-blue-100">
                    <Check size={16} className="mt-0.5 shrink-0 text-blue-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-8 rounded-full bg-white py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-50">
                Choose {tier.name}
              </button>
            </div>
          ) : (
            <div key={tier.name} className="line-card reveal flex flex-col p-8">
              <h3 className="text-sm font-medium text-slate-500">{tier.name}</h3>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {tier.tagline}
              </p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">
                {tier.price}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={16} className="mt-0.5 shrink-0 text-blue-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-8 rounded-full border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                Choose {tier.name}
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
