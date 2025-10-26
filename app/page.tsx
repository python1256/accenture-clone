// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedCardGrid from "@/components/AnimatedCardGrid";
import QuoteSplit from "@/components/QuoteSplit";
import ValueBanner from "@/components/ValueBanner";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import React from "react";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />

      {/* Spacer between hero and cards */}
      <div className="h-13 md:h-16 lg:h-16" />

      {/* Cards */}
      <AnimatedCardGrid />
      {/* two static sections */}
      <QuoteSplit />
      <ValueBanner />
      <ShowcaseCarousel />
    </main>
  );
}
