import React from 'react';

export default function BedtimeCalmOverlay({ isActive }) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden transition-all duration-1000 bg-indigo-950/40 mix-blend-multiply">
      {/* Floating Twinkling Night Stars */}
      <div className="absolute inset-0">
        {[
          { top: '10%', left: '15%', size: 'text-2xl', delay: '0s' },
          { top: '25%', left: '80%', size: 'text-xl', delay: '1s' },
          { top: '45%', left: '10%', size: 'text-3xl', delay: '2s' },
          { top: '65%', left: '88%', size: 'text-2xl', delay: '0.5s' },
          { top: '85%', left: '20%', size: 'text-xl', delay: '1.5s' },
          { top: '15%', left: '50%', size: 'text-4xl', delay: '2.5s' }
        ].map((star, i) => (
          <span
            key={i}
            style={{ top: star.top, left: star.left, animationDelay: star.delay }}
            className={`absolute ${star.size} animate-pulse select-none opacity-80`}
          >
            ✨
          </span>
        ))}

        {/* Crescent Moon */}
        <div className="absolute top-12 right-16 text-5xl animate-bounce duration-1000 opacity-90 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]">
          🌙
        </div>
      </div>
    </div>
  );
}
