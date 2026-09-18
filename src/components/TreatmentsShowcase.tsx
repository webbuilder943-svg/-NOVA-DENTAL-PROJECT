"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AlignJustify, Sparkle, Scan } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Touches WebGL directly, so it must never run during SSR.
const TreatmentScene = dynamic(() => import("./TreatmentScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-blue-50" />,
});

const treatments = [
  {
    icon: AlignJustify,
    title: "Clear Aligners",
    description:
      "Custom-milled, near-invisible aligners that quietly straighten your smile without wires or brackets.",
    detail:
      "Progress scans at every visit, average case 6–9 months, removable for eating and brushing.",
    photo: "/images/treatments/clear-aligners.jpg",
  },
  {
    icon: Scan,
    title: "3D Implants",
    description:
      "Implants planned from a full 3D scan of your jaw, placed with sub-millimeter precision in a single visit.",
    detail:
      "Digital surgical guide, titanium fixture, same-day planning from scan to placement.",
    // No static photo — this is the one card where the actual 3D glass
    // molar piece earns its place, since the card is literally about 3D
    // scanning rather than just being decorated with it.
    scene: true,
  },
  {
    icon: Sparkle,
    title: "Laser Whitening",
    description:
      "A gentle laser-activated treatment that lifts years of staining in one session, with zero sensitivity downtime.",
    detail:
      "One in-clinic session, shade guide matched, no take-home trays required.",
    photo: "/images/treatments/laser-whitening.jpg",
  },
];

export default function TreatmentsShowcase() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="treatments" ref={ref} className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          Treatments built around you
        </h2>
        <p className="mt-4 text-slate-500">
          Three of our most requested procedures, each planned with digital
          precision from the first consult.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {treatments.map(({ icon: Icon, title, description, detail, photo, scene }) => (
          <div key={title} className="reveal flip-card h-96">
            <div className="flip-card-inner h-full">
              {/* Front */}
              <div className="flip-face glow-card absolute inset-0 flex flex-col overflow-hidden p-0">
                <div className="photo-frame relative h-44 w-full shrink-0 bg-blue-50">
                  {scene ? (
                    <TreatmentScene />
                  ) : (
                    <Image
                      src={photo!}
                      alt={title}
                      fill
                      className="photo-duo object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="text-blue-600" size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                  <span className="mt-auto pt-4 text-xs text-slate-400">
                    Hover to see what&apos;s included
                  </span>
                </div>
              </div>

              {/* Back */}
              <div className="flip-face flip-face-back glow-card flex flex-col justify-center gap-4 p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Icon className="text-blue-600" size={20} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
