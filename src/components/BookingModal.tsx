"use client";

import { useEffect, useState } from "react";
import { X, CalendarCheck } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset for next time it opens — handled at the close action itself
  // rather than as a state sync in an effect, so there's no render
  // triggered by an effect body on every open/close cycle.
  function handleClose() {
    onClose();
    setSubmitted(false);
  }

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        setSubmitted(false);
      }
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to your booking API / email service.
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop */}
      <button
        aria-label="Close booking dialog"
        onClick={handleClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <div className="glow-card relative w-full max-w-md p-8">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-slate-400 transition hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <h2
              id="booking-modal-title"
              className="text-2xl font-semibold text-slate-900"
            >
              Book your appointment
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tell us a little about you and we&apos;ll confirm a slot within
              one business hour.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs uppercase tracking-wide text-slate-400"
                >
                  Full name
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  placeholder="Ananya Rao"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-xs uppercase tracking-wide text-slate-400"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="treatment"
                  className="mb-1 block text-xs uppercase tracking-wide text-slate-400"
                >
                  Treatment
                </label>
                <select
                  id="treatment"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  defaultValue="Clear Aligners"
                >
                  <option>Clear Aligners</option>
                  <option>3D Implants</option>
                  <option>Laser Whitening</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <button type="submit" className="btn-glow w-full py-3 text-sm">
                Confirm request
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <CalendarCheck className="mb-4 text-blue-600" size={40} />
            <h2 className="text-xl font-semibold text-slate-900">
              Request received
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We&apos;ll reach out shortly to confirm your appointment time.
            </p>
            <button
              onClick={handleClose}
              className="btn-glow mt-6 px-6 py-2.5 text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
