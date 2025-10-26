"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  title: string;
  body: string;
  href?: string;
  img: string;
};

const slides: Slide[] = [
  {
    title: "Belden unlocks real-time insights with AI",
    body:
      "The global networking and connectivity solutions leader is helping customers stay competitive with Belden Horizon, an AI-powered platform that analyzes facility-wide data to deliver instant visibility into manufacturing operations and performance.",
    href: "#",
    img: "/images/cars.jpeg",
  },
  {
    title: "Vodafone dials up its digital edge",
    body:
      "By pivoting to a cloud-native, digital-first model, the global telecom leader is accelerating product launches, streamlining operations and delivering faster, more intuitive experiences to millions of customers.",
    href: "#",
    img: "/images/cars.jpeg",
  },
  {
    title: "Microsoft scales cloud at the speed of AI",
    body:
      "The cloud services leader is reinventing its supply chain to meet surging AI demand—doubling data center capacity while boosting speed, resilience and sustainability. Centralized data and digital twin-powered control towers enable smarter decisions and unlock $100M+ in savings.",
    href: "#",
    img: "/images/cars.jpeg",
  },
  {
    title: "HP reimagines global learning",
    body:
      "The global tech leader is transforming training with a bold new strategy—empowering people with personalized, scalable learning to build a future-ready, high-performing sales force.",
    href: "#",
    img: "/images/cars.jpeg",
  },
  {
    title: "Generali transforms learning with AI",
    body:
      "The global insurer is upskilling 87,000 employees, advancing continuous learning, future-ready skills and talent mobility.",
    href: "#",
    img: "/images/cars.jpeg",
  },
];

export default function ShowcaseCarousel() {
  const N = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // simple autoplay
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % N), 6000);
    return () => window.clearInterval(id);
  }, [paused, N]);

  // snap transform to the active index
  const snap = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translateX(${-index * 100}%)`;
  };
  useEffect(() => { snap(i); }, [i]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((p) => (p + 1) % N);
      if (e.key === "ArrowLeft") setI((p) => (p - 1 + N) % N);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [N]);

  // pointer drag (mouse/touch)
  const dragging = useRef(false);
  const startX = useRef(0);
  const lastDX = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = e.clientX;
    lastDX.current = 0;
    setPaused(true);
    trackRef.current?.classList.add("is-dragging");
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !trackRef.current || !stageRef.current) return;
    const dx = e.clientX - startX.current;
    lastDX.current = dx;
    const w = stageRef.current.clientWidth || 1;
    const pct = (dx / w) * 100;
    trackRef.current.style.transform = `translateX(${-(i * 100) + pct}%)`;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    trackRef.current?.classList.remove("is-dragging");

    if (!stageRef.current) { snap(i); return; }
    const w = stageRef.current.clientWidth || 1;
    const dx = lastDX.current;

    // 15% width threshold to change slide
    const thresh = w * 0.15;
    if (dx < -thresh) setI((p) => (p + 1) % N);
    else if (dx > thresh) setI((p) => (p - 1 + N) % N);
    else snap(i);

    lastDX.current = 0;
  };

  const next = () => setI((p) => (p + 1) % N);
  const prev = () => setI((p) => (p - 1 + N) % N);

  return (
    <section className="stories-shell" aria-label="Customer stories">
      <div className="stories-container">
        <div
          ref={stageRef}
          className="story-stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onMouseEnter={() => setPaused(true)}
        //   onMouseLeave={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Stories"
        >
          <div ref={trackRef} className="story-track">
            {slides.map((s, idx) => (
              <article className="story-slide" key={idx}>
                <div className="story-media">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    priority={idx === 0}
                    sizes="(min-width:1024px) 55vw, 100vw"
                  />
                </div>
                <div>
                  <h3 className="story-title">{s.title}</h3>
                  <p className="story-body">{s.body}</p>
                  <a className="story-cta" href={s.href || "#"}>
                    Read more
                    <span className="sq" aria-hidden>
                      <ArrowRight />
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controls row */}
        <div className="story-chrome" aria-hidden>
          <div className="story-left">
            <button
              className="story-btn"
              aria-label={paused ? "Play" : "Pause"}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          </div>
          <div className="story-right">
            <button className="story-btn" aria-label="Previous slide" onClick={prev}>
              <ArrowLeft />
            </button>
            <span className="story-count">{i + 1}/{N}</span>
            <button className="story-btn" aria-label="Next slide" onClick={next}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* mini icons */
function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
