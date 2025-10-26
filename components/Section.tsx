"use client";

import Image from "next/image";

interface SectionProps {
  title?: string;
  description?: string;
  image?: string;
}

const Section = ({ title, description, image }: SectionProps) => {
  return (
    <section className="px-6 py-20 text-white bg-black">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-white/10">
          <Image
            src={image || "/images/cars.jpeg"}
            alt={title || "section image"}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">{title || "Section title"}</h2>
          <p className="text-white/80 leading-relaxed mb-6">
            {description ||
              "Section body text placeholder. We'll replace with real copy later."}
          </p>
          <button className="flex items-center gap-2 text-white font-semibold text-sm hover:text-accent transition-colors">
            <span>Read more</span>
            <span className="bg-accent text-black font-bold px-2 py-1 leading-none rounded-sm">
              &gt;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section;
