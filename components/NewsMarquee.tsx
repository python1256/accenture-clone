"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Accenture News – auto-scrolling marquee with 5 identical headlines.
 * - Auto scrolls left in a loop
 * - Pauses on hover
 * - Left/Right arrows step one item at a time
 * - Keyboard arrows work when the nav buttons are focused
 */

type NewsItem = { id: number; date: string; title: string; href?: string };

const HEADLINE =
  "Bank of England and Accenture Announce Renewal of the Real-Time Gross Settlement Service";

const BASE_ITEMS: NewsItem[] = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  date: "September 1, 2025",
  title: HEADLINE,
  href: "#",
}));

export default function NewsMarquee({
  items = BASE_ITEMS,
  speed = 60, // pixels per second
  gapPx = 56, // MUST match --news-gap in CSS
}: {
  items?: NewsItem[];
  speed?: number;
  gapPx?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sampleItemRef = useRef<HTMLAnchorElement | null>(null);

  // internal animation state
  const xRef = useRef(0); // current translateX in px
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const steppingRef = useRef(false); // when arrow-animating to a snap

  // duplicated set for seamless loop (we reset x when one full set is gone)
  const DUP_FACTOR = 2; // render 2x the items, loop when 1 set has scrolled

  const getItemSpan = useCallback(() => {
    const el = sampleItemRef.current;
    if (!el) return 600 + gapPx; // fallback
    return el.offsetWidth + gapPx;
  }, [gapPx]);

  const getSetWidth = useCallback(() => {
    return getItemSpan() * items.length;
  }, [getItemSpan, items.length]);

  // autoplay loop
  const tick = useCallback(
    (ts: number) => {
      const track = trackRef.current;
      if (!track) return;

      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!pausedRef.current) {
        // normal continuous motion
        xRef.current -= speed * dt;
      }

      // wrap after one full set width
      const setW = getSetWidth();
      if (xRef.current <= -setW) {
        xRef.current += setW; // snap back seamlessly
      }

      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    },
    [getSetWidth, speed]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  // pause/resume on hover
  const onEnter = () => (pausedRef.current = true);
  const onLeave = () => (pausedRef.current = false);

  // step by 1 item width (left = next, right = prev)
  const stepBy = useCallback(
    (dir: 1 | -1) => {
      if (steppingRef.current) return;
      const track = trackRef.current;
      if (!track) return;

      const span = getItemSpan() * dir; // positive for right, negative for left
      const start = xRef.current;
      const target = start - span; // moving left for next item, right for prev
      const duration = 260; // ms

      pausedRef.current = true; // pause autoplay during step
      steppingRef.current = true;

      const startAt = performance.now();
      const animate = (now: number) => {
        const t = Math.min(1, (now - startAt) / duration);
        // ease-out
        const eased = 1 - Math.pow(1 - t, 3);
        xRef.current = start + (target - start) * eased;

        // wrap if needed during step
        const setW = getSetWidth();
        if (xRef.current <= -setW) xRef.current += setW;
        if (xRef.current > 0) xRef.current -= setW;

        if (track) track.style.transform = `translateX(${xRef.current}px)`;
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          steppingRef.current = false;
          pausedRef.current = false; // resume autoplay
        }
      };
      requestAnimationFrame(animate);
    },
    [getItemSpan, getSetWidth]
  );

  return (
    <section className="newsMarquee" aria-label="Accenture news">
      <div className="newsMarquee__bar">
        <h2 className="newsMarquee__title">Accenture news</h2>

        <div className="newsMarquee__nav" role="toolbar" aria-label="News controls">
          <button
            type="button"
            className="newsMarquee__btn"
            aria-label="Previous"
            onClick={() => stepBy(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="newsMarquee__btn"
            aria-label="Next"
            onClick={() => stepBy(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="newsMarquee__viewport"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="newsMarquee__track" ref={trackRef}>
          {Array.from({ length: DUP_FACTOR }).map((_, dup) =>
            items.map((n, i) => {
              const key = `${dup}-${n.id}`;
              const common = (
                <>
                  <div className="newsItem__date">{n.date}</div>
                  <div className="newsItem__title">{n.title}</div>
                </>
              );

              // The very first item gets a ref so we can measure width
              const needsRef = dup === 0 && i === 0;

              return n.href ? (
                <a
                  key={key}
                  href={n.href}
                  className="newsItem"
                  ref={needsRef ? (sampleItemRef as any) : undefined}
                >
                  {common}
                </a>
                ) : (
                <div
                  key={key}
                  className="newsItem"
                  ref={needsRef ? (sampleItemRef as any) : undefined}
                >
                  {common}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
