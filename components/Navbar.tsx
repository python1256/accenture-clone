// components/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

type PanelKey = "whatWeDo" | "whoWeAre" | "careers" | null;

export default function Navbar() {
  const [panel, setPanel] = useState<PanelKey>(null);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);

  /* Hide header on scroll down, show on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY.current;
      const down = delta > 6;
      const up = delta < -6;

      if (!panel && !localeOpen) {
        if (y > 80 && down) setHidden(true);
        if (up || y <= 10) setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [panel, localeOpen]);

  /* Close menus with ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setLocaleOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const togglePanel = (k: PanelKey) => {
    setLocaleOpen(false);
    setPanel((p) => (p === k ? null : k));
  };

  const closeAll = () => {
    setPanel(null);
    setLocaleOpen(false);
  };

  return (
    <header className={`nav-shell ${hidden ? "nav-hide" : ""}`}>
      <div className="nav-container">
        {/* Left: Logo */}
        <a href="/" className="inline-flex items-center h-full">
          <Logo />
          <span className="sr-only">Home</span>
        </a>

        {/* Center: primary nav (perfect center regardless of sides) */}
        <nav className="center-nav" aria-label="Primary">
          <NavButton
            label="What we do"
            isOpen={panel === "whatWeDo"}
            onToggle={() => togglePanel("whatWeDo")}
          />

          {/* “What we think” has NO panel/chevron/underline */}
          <a href="#" className="nav-item nav-link">
            What we think
          </a>

          <NavButton
            label="Who we are"
            isOpen={panel === "whoWeAre"}
            onToggle={() => togglePanel("whoWeAre")}
          />
          <NavButton
            label="Careers"
            isOpen={panel === "careers"}
            onToggle={() => togglePanel("careers")}
          />
        </nav>

        {/* Right: Search + USA (tight spacing) */}
        <div className="flex items-center gap-4 ml-auto relative">
          <button aria-label="Search" className="nav-item btn-reset">
            <SearchIcon />
          </button>

          {/* add a little left margin on the USA wrapper */}
          <div className="relative ml-[12px]">   {/* <-- was just 'relative' */}
            <button
              className="nav-item btn-reset"
              aria-haspopup="menu"
              aria-expanded={localeOpen}
              onClick={() => {
                setPanel(null);
                setLocaleOpen((s) => !s);
              }}
            >
              <GlobeIcon />
              <span className="font-normal">USA</span>
              <ChevronDown active={localeOpen} />
            </button>

             {localeOpen && (
              <>
                <button
                  aria-label="Close country list"
                  className="mega-backdrop"
                  onClick={() => setLocaleOpen(false)}
                />
                <div className="locale-pop">
                  <div className="locale-heading">Default (English)</div>
                  <div className="locale-heading" style={{ paddingTop: 0 }}>
                    ALL COUNTRIES &amp; LANGUAGES
                  </div>
                  {[
                    "Argentina (Spanish)",
                    "Australia (English)",
                    "Austria (German)",
                    "Belgium (English)",
                    "Brazil (Portuguese)",
                    "Canada (English)",
                    "Canada (French)",
                    "France (French)",
                    "Germany (German)",
                    "India (English)",
                    "Japan (Japanese)",
                  ].map((c) => (
                    <div key={c} className="locale-item">
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mega panel */}
      <MegaPanel openKey={panel} onClose={closeAll} />
    </header>
  );
}

/* ========= Nav items ========= */

/** Center nav button that toggles a mega panel */
function NavButton({
  label,
  isOpen,
  onToggle,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) onToggle();
    }
  };
  return (
    <button
      className="nav-item btn-reset"
      aria-expanded={isOpen}
      aria-haspopup="true"
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      {label}
      <ChevronDown active={isOpen} />
      <span className="nav-underline" />
    </button>
  );
}

/* ========= Mega Panel ========= */

function MegaPanel({
  openKey,
  onClose,
}: {
  openKey: PanelKey;
  onClose: () => void;
}) {
  if (!openKey) return null;

  return (
    <>
      <button aria-label="Close menu" className="mega-backdrop" onClick={onClose} />
      <div className="mega-panel">
        <div className="mega-surface">
          <div className="mega-container">
            {openKey === "whatWeDo" && <WhatWeDoSection />}
            {openKey === "whoWeAre" && <WhoWeAreSection />}
            {openKey === "careers" && <CareersSection />}
          </div>
        </div>
      </div>
    </>
  );
}

/* ========= Panel Sections ========= */

function SectionShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mega-title">
        {title}
        <span className="inline-block w-6 h-[12px] bg-accent-purple rounded-sm" />
      </h3>
      {children}
    </div>
  );
}

function WhatWeDoSection() {
  return (
    <SectionShell title="What we do">
      <div className="mega-grid-4">
        {/* Capabilities (left 2 columns, split list) */}
        <MenuColumn
          heading="Capabilities"
          items={[
            "Cloud",
            "Customer Service",
            "Cybersecurity",
            "Data and Artificial Intelligence",
            "Digital Engineering and Manufacturing",
            "Ecosystem Partners",
          ]}
        />
        <MenuColumn
          /* intentionally no heading for the second capabilities column (matches ref) */
          items={[
            "Emerging Technology",
            "Finance and Risk Management",
            "Infrastructure and Capital Projects",
            "Learning",
            "Managed Services",
            "Marketing and Experience",
            "Metaverse",
            "Sales and Commerce",
            "Strategy",
            "Supply Chain",
            "Sustainability",
            "Talent and Organization",
            "Technology Transformation",
          ]}
        />

        {/* Industries (right 2 columns, split list) */}
        <MenuColumn
          heading="Industries"
          items={[
            "Aerospace and Defense",
            "Automotive",
            "Banking",
            "Capital Markets",
            "Chemicals",
            "Communications and Media",
            "Consumer Goods and Services",
            "Energy",
            "Health",
            "High Tech",
          ]}
        />
        <MenuColumn
          /* second industries column (no repeated heading like the reference) */
          items={[
            "Industrial",
            "Insurance",
            "Life Sciences",
            "Natural Resources",
            "Public Service",
            "Private Equity",
            "Retail",
            "Software and Platforms",
            "Travel",
            "US Federal Government",
            "Utilities",
          ]}
        />
      </div>
    </SectionShell>
  );
}

function WhoWeAreSection() {
  return (
    <SectionShell title="About Accenture">
      <div className="mega-grid-3">
        <MenuColumn
          heading="Our organization"
          items={[
            "Awards and Recognition",
            "Corporate Sustainability",
            "Industry Analyst Recognition",
            "Leaders",
            "Locations",
            "360° Value Report",
          ]}
        />
        <MenuColumn
          heading="Media & Investors"
          items={["Media Relations", "Investor Relations", "Board of Directors"]}
        />
        <MenuColumn
          heading="How we serve"
          items={["Strategy and Consulting", "Technology", "Operations", "Industry X", "Song"]}
        />
      </div>
    </SectionShell>
  );
}
function CareersSection() {
  return (
    <SectionShell title="Careers homepage">
      <div className="mega-grid-3">
        <MenuColumn heading="Find a job" items={["Search for jobs", "Career areas"]} />
        <MenuColumn
          heading="Life at Accenture"
          items={["Working here", "Benefits", "Work environment", "Careers blog"]}
        />
        <MenuColumn heading="How we hire" items={["Using AI", "Hiring journey", "Pro tips"]} />
      </div>
    </SectionShell>
  );
}

function MenuColumn({ heading, items }: { heading?: string; items: string[] }) {
  return (
    <div>
      {heading && <h4 className="mega-col-title">{heading}</h4>}
      <ul className="mega-list">
        {items.map((t) => (
          <li key={t}>
            <a href="#" className="mega-link">{t}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========= Icons ========= */
function ChevronDown({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="chev"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      style={{ transform: active ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  );
}
