"use client";

const Awards = () => {
  return (
    <section className="px-6 py-24 bg-black text-white text-center">
      <h2 className="text-4xl md:text-6xl font-extrabold mb-10 leading-[1.15]">
        Global recognition and awards
      </h2>

      <div className="bg-red-600 text-left max-w-3xl mx-auto p-8 md:p-10 rounded-md">
        <h3 className="font-semibold text-xl md:text-2xl mb-4 leading-snug">
          Ranked No. 6 on the Great Place To Work® World’s Best Workplaces™ list.
        </h3>

        <p className="text-white/90 text-base md:text-lg leading-relaxed">
          This recognition is based on feedback from our people — measuring
          their level of trust, pride and camaraderie at work.
        </p>

        <button className="flex items-center gap-2 mt-8 font-semibold text-sm hover:text-black">
          <span>See related awards</span>
          <span className="bg-white text-black font-bold px-2 py-1 leading-none rounded-sm">
            &gt;
          </span>
        </button>
      </div>
    </section>
  );
};

export default Awards;
