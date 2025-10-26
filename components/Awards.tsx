"use client";

import React, { useEffect, useRef } from "react";

type Theme = "blue" | "red" | "purple";
interface Card {
  id: number;
  theme: Theme;
  title: string;        // title for both faces
  teaser: string;       // short front line
  description: string;  // detailed back text
  link?: string;
}

const CARDS: Card[] = [
  {
    id: 1,
    theme: "blue",
    title: "A Leader in Reinvention",
    teaser: "Recognition for leadership and impact.",
    description:
      "Our Chair and CEO, Julie Sweet, is No. 1 on Fortune’s 2023 Most Powerful People in Business; included in the TIME100 Most Influential People of 2024; and received the ADL Courage Against Hate Award.",
    link: "#",
  },
  {
    id: 2,
    theme: "red",
    title: "A Great Place to Work®",
    teaser: "Celebrating our people and culture.",
    description:
      "Ranked No. 6 on the Great Place To Work® World’s Best Workplaces™ list—based on employee feedback about trust, pride and camaraderie.",
    link: "#",
  },
  {
    id: 3,
    theme: "purple",
    title: "A Top Consulting Firm",
    teaser: "Trusted by clients worldwide.",
    description:
      "Forbes named Accenture among the World’s Best Management Consulting Firms, recommended by clients and consultants across industries.",
    link: "#",
  },
];

export default function GlobalRecognitionPinned() {
  const stepsRef = useRef<HTMLDivElement | null>(null);

  // reveal each card when its step enters the viewport
  useEffect(() => {
    const root = stepsRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".grx-card"));
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.35 }
    );

    cards.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="grx-section">
      {/* Pinned background headline — remains during all three steps */}
      <div className="grx-sticky">
        <h2 className="grx-title">Global recognition and awards</h2>
      </div>

      {/* Three steps: Right → Left → Right */}
      <div ref={stepsRef} className="grx-steps">
        {/* Step 1 (RIGHT) */}
        <div className="grx-step grx-step--right">
          <div className="grx-inner">
            <article
              className={`grx-card ${CARDS[0].theme}`}
              style={{ ["--tilt" as any]: "6deg" }}
              tabIndex={0}
              aria-label={CARDS[0].title}
            >
              <div className="grx-innerFaces">
                <div className="grx-face grx-front">
                  <div>
                    <h3 className="grx-h3">{CARDS[0].title}</h3>
                    <p className="grx-teaser">{CARDS[0].teaser}</p>
                  </div>
                </div>
                <div className="grx-face grx-back">
                  <div>
                    <h3 className="grx-h3">{CARDS[0].title}</h3>
                    <p className="grx-desc">{CARDS[0].description}</p>
                    {CARDS[0].link && (
                      <a className="grx-link" href={CARDS[0].link}>
                        See related awards &gt;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Step 2 (LEFT) */}
        <div className="grx-step grx-step--left">
          <div className="grx-inner">
            <article
              className={`grx-card ${CARDS[1].theme}`}
              style={{ ["--tilt" as any]: "-6deg" }}
              tabIndex={0}
              aria-label={CARDS[1].title}
            >
              <div className="grx-innerFaces">
                <div className="grx-face grx-front">
                  <div>
                    <h3 className="grx-h3">{CARDS[1].title}</h3>
                    <p className="grx-teaser">{CARDS[1].teaser}</p>
                  </div>
                </div>
                <div className="grx-face grx-back">
                  <div>
                    <h3 className="grx-h3">{CARDS[1].title}</h3>
                    <p className="grx-desc">{CARDS[1].description}</p>
                    {CARDS[1].link && (
                      <a className="grx-link" href={CARDS[1].link}>
                        See related awards &gt;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Step 3 (RIGHT) */}
        <div className="grx-step grx-step--right">
          <div className="grx-inner">
            <article
              className={`grx-card ${CARDS[2].theme}`}
              style={{ ["--tilt" as any ]: "6deg" }}
              tabIndex={0}
              aria-label={CARDS[2].title}
            >
              <div className="grx-innerFaces">
                <div className="grx-face grx-front">
                  <div>
                    <h3 className="grx-h3">{CARDS[2].title}</h3>
                    <p className="grx-teaser">{CARDS[2].teaser}</p>
                  </div>
                </div>
                <div className="grx-face grx-back">
                  <div>
                    <h3 className="grx-h3">{CARDS[2].title}</h3>
                    <p className="grx-desc">{CARDS[2].description}</p>
                    {CARDS[2].link && (
                      <a className="grx-link" href={CARDS[2].link}>
                        See related awards &gt;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      {/* after step 3, sticky headline releases and next section appears */}
    </section>
  );
}
