"use client";

export default function ValueBanner() {
  return (
    <section className="value-shell">
      <div className="value-container">
        <h2 className="value-title">360° Value</h2>

        <p className="value-sub">
          Every day, we embrace change and create value for all our stakeholders
          around the world.
        </p>

        <a href="#" className="value-cta">
          <span className="underline underline-offset-4">See the report</span>
          <span className="link-square">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="3">
              <path d="M8 5l8 7-8 7" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
