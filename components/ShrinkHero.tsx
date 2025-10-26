'use client';

import { useEffect, useRef } from 'react';

type Props = {
  imageSrc: string;
  imageAlt?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  ctaText?: string;
  ctaHref?: string;

  /** Completes animation within this fraction of the viewport height (0.4–0.9). */
  finishInVh?: number; // default 0.6
  /** Phase break: first shrink-in-place, then slide/grow (0–1). */
  breakAt?: number;     // default 0.35
  /** Final width of right panel on desktop. */
  panelMax?: string;    // default '46svw'
  /** Section height; after settling, user scrolls into next section. */
  scrollLength?: string;// default '160svh'
  /** Pass your fixed header height (e.g., '72px'). */
  stickyTop?: string;   // default '0px'
};

/* Find nearest scrolling ancestor (or window). */
function getScrollParent(el: HTMLElement | null): HTMLElement | Window {
  let p = el?.parentElement;
  while (p) {
    const style = getComputedStyle(p);
    const oy = style.overflowY;
    const isScrollable = (oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight;
    if (isScrollable) return p;
    p = p.parentElement;
  }
  return window;
}

export default function ShrinkHero({
  imageSrc,
  imageAlt = '',
  eyebrow = 'CAREERS',
  title,
  copy,
  ctaText = 'Join us',
  ctaHref = '#',
  finishInVh = 0.6,
  breakAt = 0.35,
  panelMax = '46svw',
  scrollLength = '160svh',
  stickyTop = '0px',
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    section.style.setProperty('--sh-panel-max', panelMax);
    section.style.setProperty('--sh-scroll-len', scrollLength);
    section.style.setProperty('--sh-sticky-top', stickyTop);

    const scroller = getScrollParent(section);
    const getViewportH = () =>
      scroller === window ? window.innerHeight : (scroller as HTMLElement).clientHeight;

    let raf = 0;

    const readStickyTop = () => {
      const v = getComputedStyle(section).getPropertyValue('--sh-sticky-top').trim();
      const n = parseFloat(v || '0');
      return Number.isFinite(n) ? n : 0;
    };

    const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect(); // relative to viewport (always valid)
        const startPx = readStickyTop();              // when the sticky area meets the top
        const distance = Math.max(1, getViewportH() * finishInVh);

        // overall progress from when the section top reaches sticky top
        const p = clamp01((startPx - rect.top) / distance);

        // two phases
        const a = clamp01(p / breakAt);
        const b = clamp01((p - breakAt) / (1 - breakAt));

        section.style.setProperty('--sh-p', String(p));
        section.style.setProperty('--sh-a', String(a));
        section.style.setProperty('--sh-b', String(b));
      });
    };

    onScroll();
    const scrollTarget: any = scroller;
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      scrollTarget.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [finishInVh, breakAt, panelMax, scrollLength, stickyTop]);

  return (
    <section ref={sectionRef} className="shrink-hero" aria-label="Feature">
      <div className="shrink-hero__sticky">
        <div className="shrink-hero__frame">
          {/* Left — image */}
          <div className="shrink-hero__imageWrap">
            <img className="shrink-hero__image" src={imageSrc} alt={imageAlt} />
            <div className="shrink-hero__imageMask" />
          </div>

          {/* Right — content panel */}
          <aside className="shrink-hero__panel">
            {eyebrow && <div className="shrink-hero__eyebrow">{eyebrow}</div>}
            <h1 className="shrink-hero__title">{title}</h1>
            {copy && <p className="shrink-hero__copy">{copy}</p>}
            {ctaText && <a className="shrink-hero__cta" href={ctaHref}>{ctaText}</a>}
          </aside>
        </div>
      </div>
    </section>
  );
}
