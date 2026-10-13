import React, { useState, useEffect } from 'react';

interface HeroProps {
  onStartReading: () => void;
  onOpenWriteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartReading, onOpenWriteModal }) => {
  // Shifting literary matrix simulation reminiscent of Medium's iconic animated letter grid
  const [matrixSeed, setMatrixSeed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMatrixSeed((prev) => (prev + 1) % 100);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#FFC017] border-b border-stone-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Proposition & CTA (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-7 z-10">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium tracking-tight text-stone-950 leading-[1.05] text-balance">
              Stay curious.
            </h1>
            <p className="text-xl sm:text-2xl font-serif text-stone-900 max-w-xl leading-relaxed text-pretty">
              Discover stories, thinking, and expertise from writers on any topic. A sanctuary for ideas that deepen your understanding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartReading}
              className="px-8 py-3.5 text-base font-medium text-white bg-stone-950 hover:bg-stone-850 rounded-full transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm hover:shadow-md active:scale-98 cursor-pointer"
            >
              Start reading
            </button>
            <button
              onClick={onOpenWriteModal}
              className="px-6 py-3.5 text-base font-medium text-stone-900 hover:text-stone-950 bg-transparent hover:bg-black/5 rounded-full border border-stone-900/60 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Write your story
            </button>
          </div>

          {/* Quiet claim-to-proof strip (Editorial rigor, zero pills) */}
          <div className="pt-4 flex items-center gap-3 text-xs sm:text-sm font-sans text-stone-850/80">
            <span>Over 100,000 independent writers</span>
            <span aria-hidden="true">·</span>
            <span>Zero ad trackers</span>
            <span aria-hidden="true">·</span>
            <span>Distraction-free typography</span>
          </div>
        </div>

        {/* Right Column: Medium's Iconic Literary Letter Matrix (5 cols on desktop) */}
        <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative min-h-[340px]">
          <div className="grid grid-cols-8 gap-3 font-serif text-2xl font-bold text-stone-950/85">
            {Array.from({ length: 48 }).map((_, idx) => {
              // Dynamic shifting glyph pattern
              const isHighlight = (idx + matrixSeed) % 7 === 0;
              const isAccent = (idx * 3 + matrixSeed) % 11 === 0;
              const char = idx % 3 === 0 ? 'M' : idx % 3 === 1 ? 'm' : '·';

              return (
                <span
                  key={idx}
                  className={`w-7 h-7 flex items-center justify-center transition-all duration-700 ${
                    isHighlight
                      ? 'text-stone-950 scale-125 font-black opacity-100'
                      : isAccent
                      ? 'text-stone-800 scale-95 opacity-60'
                      : 'text-stone-950/25 opacity-30'
                  }`}
                  aria-hidden="true"
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Subtle concentric circles overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            viewBox="0 0 400 340"
            fill="none"
          >
            <circle cx="200" cy="170" r="140" stroke="#000000" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="200" cy="170" r="90" stroke="#000000" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </section>
  );
};
