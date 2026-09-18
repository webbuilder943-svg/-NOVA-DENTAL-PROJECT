"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TEAM = [
  {
    name: "Dr. Aarav Kapoor",
    role: "Lead Dentist & Founder",
    credentials: "BDS, MDS (Prosthodontics)",
    photo: "/images/team/dr-lead.jpg",
  },
  {
    name: "Dr. Kabir Shah",
    role: "Associate Dentist",
    credentials: "BDS, Certified in Clear Aligner Therapy",
    photo: "/images/team/dr-associate.jpg",
  },
  {
    name: "Dr. Naina Iyer",
    role: "Oral Hygienist",
    credentials: "BDS, RDH",
    photo: "/images/team/dr-hygienist.jpg",
  },
];

export default function AboutTeam() {
  const ref = useScrollReveal<HTMLDivElement>();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".float-card");
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -10,
          duration: 2.6 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24">
      {/* Full-bleed duotone clinic photo backdrop */}
      <div className="photo-frame photo-frame-wash absolute inset-0 -z-10">
        <Image
          src="/images/about/clinic-interior.jpg"
          alt="Inside the clinic"
          fill
          className="photo-duo object-cover opacity-60"
          sizes="100vw"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-blue-600">
            Care led by someone who explains it
          </span>
          <h2 className="font-display mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
            Three people, one patient chart
          </h2>
          <p className="mt-4 text-slate-500">
            Everyone on your case sees the same notes — no treatment starts
            until you understand it, monitor turned toward you, plain
            language instead of jargon.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="reveal float-card glow-card overflow-hidden"
            >
              <div className="photo-frame relative h-64 w-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="photo-duo object-cover"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-medium text-slate-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-blue-600">{member.role}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {member.credentials}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
