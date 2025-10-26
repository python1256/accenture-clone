// components/MegaPanel.tsx
"use client";

import { useEffect, useRef } from "react";

type MenuKey = "whatWeDo" | "whatWeThink" | "whoWeAre" | "careers" | null;

export default function MegaPanel({
  openKey,
  onClose,
}: {
  openKey: MenuKey;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const p = panelRef.current;
      if (!p) return;
      // Close if mouse leaves the header+panel region
      const to = e.relatedTarget as Node | null;
      if (openKey && to && p.contains(to)) return;
    };
    // not strictly required; kept for symmetry.
    return () => {
      document.removeEventListener("mouseleave", handle);
    };
  }, [openKey]);

  if (!openKey) return null;

  return (
    <div
      ref={panelRef}
      onMouseLeave={onClose}
      // Changed bg color for a slight depth effect and used bg-[#131313] 
      // which is a common shade for dark backgrounds on dark sites.
      className="absolute top-[80px] left-0 right-0 bg-[#131313] text-white/90 border-t border-white/10"
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-10">
        {openKey === "whatWeDo" && <WhatWeDo />}
        {openKey === "whatWeThink" && <SimpleTitle title="What we think" />}
        {openKey === "whoWeAre" && <SimpleTitle title="Who we are" />}
        {openKey === "careers" && <SimpleTitle title="Careers" />}
      </div>
    </div>
  );
}

function SimpleTitle({ title }: { title: string }) {
  // Added a placeholder purple rule to the simple titles for consistency
  return (
    <div className="py-6">
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <div className="h-1 w-12 bg-accent-purple" />
      </div>
      <p className="text-white/70 mt-3 max-w-[800px]">
        Placeholder content. Add your links/sections here exactly like the site
        does. This panel is full-width and sits below the header.
      </p>
    </div>
  );
}

function WhatWeDo() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-[32px] md:text-[36px] font-semibold">
          What we do
        </h3>
        {/* Changed hardcoded hex to the utility class bg-accent-purple */}
        <div className="h-1 w-12 bg-accent-purple" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 text-[17px]">
        <div>
          <SectionTitle>Capabilities</SectionTitle>
          <List
            items={[
              "Cloud",
              "Customer Service",
              "Cybersecurity",
              "Data and Artificial Intelligence",
              "Digital Engineering and Manufacturing",
              "Ecosystem Partners",
              "Emerging Technology",
              "Finance and Risk Management",
              "Infrastructure and Capital Projects",
              "Learning",
            ]}
          />
        </div>

        <div>
          <div className="h-6 md:h-8" />
          <List
            items={[
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
        </div>

        <div>
          <SectionTitle>Industries</SectionTitle>
          <List
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
              "Industrial",
            ]}
          />
        </div>

        <div>
          <div className="h-6 md:h-8" />
          <List
            items={[
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
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-white/60 uppercase tracking-wide mb-4">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t}>
          <a
            href="#"
            // Changed hover color to text-accent-purple for brand consistency
            className="hover:text-accent-purple transition-colors inline-flex items-center"
          >
            {t}
          </a>
        </li>
      ))}
    </ul>
  );
}