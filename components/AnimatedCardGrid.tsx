// components/AnimatedCardGrid.tsx
"use client";

import Image from "next/image";

const cards = [
  { title: "RESEARCH REPORT", desc: "AI and your operating model: Radically new ways of working", img: "/images/test.jpeg" },
  { title: "CASE STUDY",       desc: "Better, faster, stronger: Reinventing sales at Accenture",   img: "/images/test.jpeg" },
  { title: "RESEARCH REPORT",  desc: "4 critical actions to take now to strengthen your cyber defenses", img: "/images/test.jpeg" },
  { title: "RESEARCH REPORT",  desc: "Trying to scale AI? You're going to need to think big. And act bigger.", img: "/images/test.jpeg" },
  { title: "CASE STUDY",       desc: "Uber hails a new era for advertising", img: "/images/test.jpeg" },
  { title: "RESEARCH REPORT",  desc: "Learning, reinvented: Who’s teaching who?", img: "/images/test.jpeg" },
  { title: "CASE STUDY",       desc: "Noli uses AI to beat the beauty jungle and find your perfect match", img: "/images/test.jpeg" },
  { title: "RESEARCH REPORT",  desc: "AI Reckoning: What’s next for Europe?", img: "/images/test.jpeg" },
];

export default function AnimatedCardGrid() {
  return (
    <section className="cards-shell">
      <div className="cards-container">
        <div className="cards-grid">
          {cards.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
// function Card({ title, desc, img }: { title: string; desc: string; img: string }) {
//   // small radius = subtle curve (almost square)
//   const radius = "rounded-[6px]";

//   return (
//     <a
//       href="#"
//       className={`
//         group relative block w-full overflow-hidden ${radius}
//         no-underline text-white visited:text-white hover:text-white
//         bg-gray-800 shadow-[0_7px_20px_rgba(0,0,0,0.5)]
//         aspect-[4/5]
//         flex items-end p-6
//         transition-transform duration-500 ease-out
//         hover:-translate-y-[20px]
//       `}
//     >
//       {/* IMAGE — always visible */}
//       <Image
//         src={img}
//         alt={title}
//         fill
//         className="absolute inset-0 z-0 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//         sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
//       />

//       {/* OVERLAY — small radius too; fades in on hover */}
//       <div
//         className={`absolute inset-0 z-[1] ${radius} bg-black/60 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100`}
//       />

//       {/* TEXT — white (no purple), fades/flies in on hover */}
//       <div
//         className="
//           relative z-[2]
//           opacity-0 translate-y-[30px]
//           transition-all duration-500
//           group-hover:opacity-100 group-hover:translate-y-0
//         "
//       >
//         <p className="text-[12px] font-semibold tracking-wide uppercase text-white">
//           {title}
//         </p>
//         <h3 className="mt-2 text-[15px] leading-relaxed tracking-wide text-white">
//           {desc}
//         </h3>
//       </div>
//     </a>
//   );
// }

function Card({ title, desc, img }: { title: string; desc: string; img: string }) {
  const radius = "rounded-[6px]"; // subtle curve

  return (
    <a
      href="#"
      className={`
        card-link group relative block w-full overflow-hidden ${radius}
        bg-gray-800 shadow-[0_7px_20px_rgba(0,0,0,0.5)]
        aspect-[4/5]
        flex items-end p-6
        transition-transform duration-500 ease-out
        hover:-translate-y-[20px]
      `}
    >
      {/* image always visible */}
      <Image
        src={img}
        alt={title}
        fill
        className="absolute inset-0 z-0 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
      />

      {/* overlay fades in on hover */}
      <div
        className={`absolute inset-0 z-[1] ${radius} bg-black/60 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100`}
      />

      {/* text: fade-in only (no slide), wraps safely */}
      <div className="relative z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-[12px] font-semibold tracking-wide uppercase text-white whitespace-normal break-words">
          {title}
        </p>
        <h3 className="mt-2 text-[15px] leading-relaxed text-white whitespace-normal break-words">
          {desc}
        </h3>
      </div>
    </a>
  );
}