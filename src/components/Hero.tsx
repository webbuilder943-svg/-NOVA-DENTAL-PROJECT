"use client";

import Image from "next/image";
import { Sparkles, ArrowRight, Star, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-12 overflow-hidden px-6 pt-32 pb-20 lg:flex-row lg:gap-8 lg:pt-24"
    >
      {/* A crisp, solid shape standing in for the generic blurred gradient
          blob — bleeds off the top-right edge, with a hairline ring
          picking up the circular frame of the photo it sits behind. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 -z-10 h-[620px] w-[620px] rounded-full bg-blue-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[340px] w-[340px] rounded-full border border-blue-200"
      />

      {/* Left: copy */}
      <div className="reveal flex-1 text-center lg:text-left">
        <span className="glow-card inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-600">
          <Sparkles size={14} className="text-blue-500" />
          Next-Gen Dentistry
        </span>

        <h1 className="font-display text-glow mt-6 text-5xl font-semibold text-slate-900 sm:text-6xl lg:text-7xl">
          Precision Dental Care,
          <br />
          Redefined
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base text-slate-500 lg:mx-0">
          Advanced imaging, painless procedures and a studio designed around
          your comfort — dentistry built for people who expect more.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
          <button
            onClick={onBookClick}
            className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-sm"
          >
            Book Appointment
            <ArrowRight size={16} />
          </button>
          <a
            href="#treatments"
            className="text-sm font-medium text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline"
          >
            Explore treatments
          </a>
        </div>
      </div>

      {/* Right: patient photo in a circular frame, DentCare-style, with
          small floating trust chrome instead of an abstract 3D piece. */}
      <div className="reveal relative mx-auto h-[320px] w-[320px] shrink-0 sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]">
        <div className="photo-frame absolute inset-0 overflow-hidden rounded-full border-[6px] border-white shadow-[0_30px_60px_rgba(20,22,26,0.18)]">
          <Image
            src="/images/hero/patient.jpg"
            alt="Patient smiling during a checkup"
            fill
            priority
            className="photo-duo object-cover"
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 320px"
          />
        </div>

        <div
          className="float-badge absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_12px_30px_rgba(20,22,26,0.12)] sm:left-0 sm:translate-x-0"
          style={{ animationDelay: "0.2s" }}
        >
          <Star size={16} className="fill-blue-500 text-blue-500" />
          <span className="text-sm font-semibold text-slate-900">4.9</span>
          <span className="text-xs text-slate-400">14,000+ patients</span>
        </div>

        <div
          className="float-badge absolute right-2 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(20,22,26,0.12)] sm:-right-4"
          style={{ animationDelay: "0.6s" }}
        >
          <ShieldCheck size={20} className="text-blue-600" />
        </div>
      </div>
    </section>
  );
}
