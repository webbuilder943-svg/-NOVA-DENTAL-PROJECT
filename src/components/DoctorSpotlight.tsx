"use client";

import Image from "next/image";
import { GraduationCap, Award, Users2, BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CREDENTIALS = [
  { icon: GraduationCap, text: "BDS, MDS (Prosthodontics)" },
  { icon: Award, text: "15+ years of clinical excellence" },
  { icon: Users2, text: "5,000+ patients treated" },
  { icon: BookOpen, text: "Trained 40+ junior dentists" },
];

interface DoctorSpotlightProps {
  onBookClick: () => void;
}

export default function DoctorSpotlight({ onBookClick }: DoctorSpotlightProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-24">
      <div className="reveal glow-card grid grid-cols-1 gap-10 overflow-hidden p-8 sm:p-12 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="photo-frame relative mx-auto h-72 w-56 shrink-0 rounded-2xl sm:h-80 sm:w-64">
          <Image
            src="/images/team/dr-lead.jpg"
            alt="Dr. Aarav Kapoor"
            fill
            className="photo-duo rounded-2xl object-cover"
            sizes="256px"
          />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-blue-600">
            Meet your dentist
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Dr. Aarav Kapoor
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Prosthodontist &amp; Implantologist, Lead Dentist &amp; Founder
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            With over 15 years of clinical experience, Dr. Kapoor combines
            precision with a gentle, patient-first approach — specializing in
            painless procedures, digital implants and full-mouth
            rehabilitation.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CREDENTIALS.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-sm text-slate-600"
              >
                <Icon size={16} className="shrink-0 text-blue-600" />
                {text}
              </div>
            ))}
          </div>

          <button
            onClick={onBookClick}
            className="btn-glow mt-8 px-6 py-2.5 text-sm"
          >
            Book With Dr. Kapoor
          </button>
        </div>
      </div>
    </section>
  );
}
