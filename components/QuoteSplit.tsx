"use client";

import Image from "next/image";

export default function QuoteSplit() {
  return (
    <section className="split-shell">
      <div className="split-container">
        <div className="split-grid">
          {/* Left: image */}
          <div>
            <div className="split-image">
              <Image
                src="/images/cars.jpeg"     // make sure this exists
                alt="Interview still"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Right: quote */}
          <div>
            <blockquote className="split-quote">
              “AI is only a technology. The value comes from reinvention of how we work, our
              workforces and the tools we use… We are making sure that we are leading the way with
              our own reinvention.”
            </blockquote>

            <p className="split-cite">
              Julie Sweet, quoted in <em>Fortune</em>, August/September 2025
            </p>

            <a href="#" className="link-cta">
              <span className="underline underline-offset-4">Read more</span>
              <span className="link-square">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                  <path d="M8 5l8 7-8 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
