import React from 'react';

export default function RockyRocketSprite({
  mood = 'happy',
  isFlying = false,
  onTapRocket = () => {}
}) {
  return (
    <div
      onClick={onTapRocket}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center select-none group ${
        isFlying ? 'animate-bounce -translate-y-4' : 'animate-gentle-bounce'
      }`}
      title="Tap Rocky the Rocket 🚀"
    >
      {/* ROCKY MOOD BADGE */}
      <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-black text-[11px] shadow-md border-2 border-white animate-pulse whitespace-nowrap z-40">
        {isFlying ? '🚀 Blast Off!' : '🚀 Rocky Rocket'}
      </div>

      {/* ROCKET CONTAINER */}
      <div className="relative w-22 h-28 flex items-center justify-center">
        <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="rocketWindow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="fireFlame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* FLAME BOOSTER */}
          <path
            d="M 38 100 Q 50 130 62 100 Q 50 115 38 100 Z"
            fill="url(#fireFlame)"
            className="animate-pulse origin-top"
          />

          {/* ROCKET SIDE FINS */}
          <polygon points="26,70 8,95 30,90" fill="#991B1B" />
          <polygon points="74,70 92,95 70,90" fill="#991B1B" />

          {/* ROCKET MAIN CONE & BODY */}
          <path
            d="M 50 10 C 25 35 28 85 28 95 L 72 95 C 72 85 75 35 50 10 Z"
            fill="url(#rocketBody)"
            stroke="#991B1B"
            strokeWidth="2"
          />

          {/* WHITE ROCKET CHEVRON STRIPES */}
          <path d="M 32 45 L 50 32 L 68 45 L 68 55 L 50 42 L 32 55 Z" fill="#FFF" opacity="0.9" />

          {/* CIRCULAR PORTHOLE WINDOW */}
          <circle cx="50" cy="65" r="16" fill="url(#rocketWindow)" stroke="#FFF" strokeWidth="3" />

          {/* ROCKY'S CUTE EYES INSIDE WINDOW */}
          <circle cx="44" cy="65" r="3.5" fill="#1E293B" />
          <circle cx="56" cy="65" r="3.5" fill="#1E293B" />
          <circle cx="45" cy="64" r="1.2" fill="#FFF" />
          <circle cx="57" cy="64" r="1.2" fill="#FFF" />

          {/* SMILE */}
          <path d="M 46 72 Q 50 75 54 72" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

          {/* CHEEKS */}
          <circle cx="38" cy="69" r="2.5" fill="#FB7185" opacity="0.6" />
          <circle cx="62" cy="69" r="2.5" fill="#FB7185" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
