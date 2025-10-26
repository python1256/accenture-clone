"use client";
import VantaTrunkPanel from "./VantaTrunkPanel";

const COL1 = [
  "Preference Center","Careers","About Us","Contact Us","Locations","Sitemap",
];
const COL2 = [
  "Privacy Statement","Terms & Conditions","Cookie Policy/Settings",
  "Accessibility Statement","Do Not Sell/Share My Personal Information",
];

export default function ChangeFooter() {
  return (
    <section className="change-wrap">
      <div className="change-inner">
        {/* LEFT */}
        <div>
          <h2 className="change-title">Let there be change</h2>

          <div className="change-links">
            <div>{COL1.map((t) => <a key={t} href="#">{t}</a>)}</div>
            <div>{COL2.map((t) => <a key={t} href="#">{t}</a>)}</div>
          </div>

          <p style={{opacity:.65,marginTop:32}}>© 2025 Accenture. All Rights Reserved.</p>
        </div>

        {/* RIGHT (Vanta) */}
        <div className="vanta-shell">
          <VantaTrunkPanel />
        </div>
      </div>
    </section>
  );
}
