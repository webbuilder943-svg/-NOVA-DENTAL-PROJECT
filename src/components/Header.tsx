"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sparkle, Star } from "lucide-react";

const NAV_LINKS = [
  { href: "#treatments", label: "Treatments" },
  { href: "#about", label: "About" },
  { href: "#technology", label: "Technology" },
  { href: "#results", label: "Results" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Coalesced to one check per animation frame instead of one per native
  // scroll event (mobile touch-scroll can fire dozens of these per second),
  // and only ever calls setState on an actual crossing — this was previously
  // running on every scroll tick regardless, which is real, measurable
  // main-thread cost during a touch-scroll gesture on mobile.
  useEffect(() => {
    const wasScrolled = { current: false };
    let ticking = false;

    function checkScroll() {
      ticking = false;
      const isScrolled = window.scrollY > 24;
      if (isScrolled !== wasScrolled.current) {
        wasScrolled.current = isScrolled;
        setScrolled(isScrolled);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkScroll);
    }

    checkScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[padding,background-color,border-color] duration-300 ${
          scrolled
            ? "border-b border-blue-100 bg-white py-2.5"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Sparkle size={18} />
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-900">
            NOVA DENTAL
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-slate-500 transition hover:text-slate-900"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Dr. Kapoor · Available Now
          </span>
          <a
            href="https://www.google.com/search?q=Nova+Dental+Koramangala+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            <Star size={12} className="fill-blue-500 text-blue-500" />
            4.9 · Google Reviews
          </a>
        </div>

        <div className="hidden lg:block">
          <button
            onClick={onBookClick}
            className="btn-glow px-5 py-2.5 text-sm"
          >
            Book Appointment
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Same trust signals as the desktop pills above, just collapsed into
          one line — these were xl:flex-only before, which meant 99% of
          actual visitors (on phones) never saw them at all. */}
      <div className="flex items-center justify-center gap-4 border-b border-slate-100 bg-white py-1.5 text-[11px] xl:hidden">
        <span className="flex items-center gap-1.5 text-slate-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
          Dr. Kapoor Available Now
        </span>
        <span className="text-slate-300">·</span>
        <a
          href="https://www.google.com/search?q=Nova+Dental+Koramangala+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-medium text-slate-700"
        >
          <Star size={11} className="fill-blue-500 text-blue-500" />
          4.9 Google Reviews
        </a>
      </div>

      {mobileOpen && (
        <div className="glow-card mx-4 mt-2 flex flex-col gap-1 p-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onBookClick();
            }}
            className="btn-glow mt-2 px-5 py-2.5 text-sm"
          >
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}
