// "use client";
// import React from "react";
// import VantaBackground from "@/components/VantaBackground";

// export default function Hero() {
//   return (
//     <section id="hero" className="hero-shell">
//       <div className="hero-vanta">
//         <VantaBackground />
//       </div>
//       <div aria-hidden className="hero-fade" />

//       <div className="hero-container">
//         <div className="hero-row">
//           {/* LEFT */}
//           <div className="hero-left">
//             <h1 className="hero-h1">TOGETHER WE</h1>
//             <h2 className="hero-h2">
//               REIN
//               <span
//                 aria-hidden
//                 className="inline-block translate-y-[0.03em] rotate-[12deg] text-accent-purple"
//               >
//                 &gt;
//               </span>
//               ENTED
//             </h2>
//             {/* <div className="hero-quote">"</div> */}
//           </div>

//           {/* RIGHT (readability + a11y bump) */}
//           <div className="hero-right">
//             <div className="hero-rule" />

//             {/* slightly larger than your halved sizes */}
//             <h3 className="text-[clamp(.9rem,1.4vw,1.25rem)] font-semibold">
//               Scaling AI
//             </h3>

//             <p className="mt-3 text-[clamp(.8rem,1.05vw,1.05rem)] leading-relaxed text-white/85">
//               We help clients prioritize business strategy, technology readiness
//               and organizational readiness to get to value faster.
//             </p>

//             <a
//               href="#cards"
//               className="mt-4 inline-flex items-center gap-2 font-semibold text-[clamp(.8rem,1vw,1rem)] text-white/80 hover:text-white transition-colors"
//             >
//               See what we do
//               <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-accent-purple font-bold text-white">
//                 &gt;
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// components/Hero.tsx
"use client";
import React from "react";
import VantaBackground from "@/components/VantaBackground";

export default function Hero() {
  return (
    // FIX: Added pt-[80px] class to push the hero content down 
    // below the 80px tall fixed navbar.
    <section id="hero" className="hero-shell pt-[80px]">
      <div className="hero-vanta">
        <VantaBackground />
      </div>
      <div aria-hidden className="hero-fade" />

      <div className="hero-container">
        <div className="hero-row">
          {/* LEFT */}
          <div className="hero-left">
            <h1 className="hero-h1">TOGETHER WE</h1>
            <h2 className="hero-h2">
              REIN
              <span
                aria-hidden
                className="inline-block translate-y-[0.03em] rotate-[12deg] text-accent-purple"
              >
                &gt;
              </span>
              ENTED
            </h2>
            {/* <div className="hero-quote">"</div> */}
          </div>

          {/* RIGHT (readability + a11y bump) */}
          <div className="hero-right">
            <div className="hero-rule" />

            {/* slightly larger than your halved sizes */}
            <h3 className="text-[clamp(.9rem,1.4vw,1.25rem)] font-semibold">
              Scaling AI
            </h3>

            <p className="mt-3 text-[clamp(.8rem,1.05vw,1.05rem)] leading-relaxed text-white/85">
              We help clients prioritize business strategy, technology readiness
              and organizational readiness to get to value faster.
            </p>

            <a
              href="#cards"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-[clamp(.8rem,1vw,1rem)] text-white/80 hover:text-white transition-colors"
            >
              See what we do
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-accent-purple font-bold text-white">
                &gt;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}