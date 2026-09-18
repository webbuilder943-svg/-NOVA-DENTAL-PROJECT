"use client";

import { Sparkle, MapPin, Phone, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HOURS = [
  ["Monday", "9:00 AM – 7:00 PM"],
  ["Tuesday", "9:00 AM – 7:00 PM"],
  ["Wednesday", "9:00 AM – 7:00 PM"],
  ["Thursday", "9:00 AM – 7:00 PM"],
  ["Friday", "9:00 AM – 7:00 PM"],
  ["Saturday", "9:00 AM – 5:00 PM"],
  ["Sunday", "Closed"],
];

interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <footer id="contact" ref={ref} className="border-t border-slate-200 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal glow-card flex flex-col items-center gap-6 p-10 text-center sm:p-14">
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Ready to fix that appointment you&apos;ve been putting off?
          </h2>
          <p className="text-sm text-slate-500">
            New patients welcome. Most insurance plans accepted.
          </p>
          <button onClick={onBookClick} className="btn-glow px-7 py-3 text-sm">
            Book Appointment
          </button>
        </div>

        <div className="reveal mt-14 grid grid-cols-1 gap-10 pb-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Sparkle size={16} />
              </span>
              <span className="text-sm font-semibold text-slate-900">
                NOVA DENTAL
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Precision dental care, redefined — advanced imaging, painless
              procedures and a studio designed around your comfort.
            </p>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-400">
              <Clock size={14} className="text-blue-600" />
              Hours
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {HOURS.map(([day, time]) => (
                <li key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span className="text-slate-400">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-400">
              <MapPin size={14} className="text-blue-600" />
              Location
            </h3>
            <p className="text-sm text-slate-600">
              4th Block, 80 Feet Road
              <br />
              Koramangala, Bengaluru 560034
            </p>
            <h3 className="mb-2 mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-400">
              <Phone size={14} className="text-blue-600" />
              Call the clinic
            </h3>
            <p className="text-sm text-slate-600">+91 00000 00000</p>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Nova Dental. Template preview — real
          details swap in on confirmation.
        </div>
      </div>
    </footer>
  );
}
