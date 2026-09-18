"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TreatmentsShowcase from "@/components/TreatmentsShowcase";
import AboutTeam from "@/components/AboutTeam";
import Stats from "@/components/Stats";
import DoctorSpotlight from "@/components/DoctorSpotlight";
import TechStrip from "@/components/TechStrip";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessTimeline from "@/components/ProcessTimeline";
import PricingTiers from "@/components/PricingTiers";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <main id="top" className="relative">
      <Header onBookClick={openBooking} />
      <Hero onBookClick={openBooking} />
      <TrustBar />
      <TreatmentsShowcase />
      <AboutTeam />
      <Stats />
      <DoctorSpotlight onBookClick={openBooking} />
      <TechStrip />
      <BeforeAfterSlider />
      <ProcessTimeline />
      <PricingTiers />
      <Testimonials />
      <Footer onBookClick={openBooking} />

      <FloatingWhatsApp />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}
