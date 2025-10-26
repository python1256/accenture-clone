// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedCardGrid from "@/components/AnimatedCardGrid";
import QuoteSplit from "@/components/QuoteSplit";
import ValueBanner from "@/components/ValueBanner";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import ShrinkHero from '@/components/ShrinkHero';
// import GlobalRecognition from "@/components/Awards";
import ChangeFooter from "@/components/ChangeFooter";
import NewsMarquee from "@/components/NewsMarquee";

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
      {/* <GlobalRecognition /> */}
      <div className="h-13 md:h-16 lg:h-16" />
      <ShrinkHero
        imageSrc="/images/cars.jpeg"
        imageAlt="People collaborating"
        eyebrow="CAREERS"
        title="Grow your career at the heart of change"
        copy="It's your time to shine. Bring your ingenuity, curiosity and big ideas."
        ctaText="Join us"
        ctaHref="/careers"
        /* tune to taste */
        finishInVh={0.6}
        breakAt={0.35}
        panelMax="48svw"
        scrollLength="160svh"
        stickyTop="72px"  /* set to your fixed header height; use '0px' if none */
      />
      <div className="h-13 md:h-16 lg:h-16" />
      <div className="h-13 md:h-16 lg:h-16" />
      <NewsMarquee />
      <div className="h-13 md:h-16 lg:h-16" />
      <ChangeFooter />
     

      
    </main>
  );
}
