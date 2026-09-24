import React from 'react';

export default function BennyBearSprite({
  mood = 'happy',
  hasPencil = true,
  onTapBear = () => {}
}) {
  return (
    <div
      onClick={onTapBear}
      className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center select-none group animate-gentle-bounce"
      title="Tap Benny Bear 🐻"
    >
      {/* BENNY BEAR MOOD BADGE */}
      <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[11px] shadow-md border-2 border-white animate-pulse whitespace-nowrap z-40">
        {hasPencil ? '✏️ Magic Pencil!' : '🐻 Benny Bear'}
      </div>

      {/* BEAR CONTAINER */}
      <div className="relative w-22 h-26 flex items-center justify-center">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            <linearGradient id="bearFur" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="50%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="bearSnout" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>

          {/* BEAR EARS */}
          <circle cx="25" cy="30" r="14" fill="url(#bearFur)" />
          <circle cx="25" cy="30" r="8" fill="#FDE68A" opacity="0.8" />

          <circle cx="75" cy="30" r="14" fill="url(#bearFur)" />
          <circle cx="75" cy="30" r="8" fill="#FDE68A" opacity="0.8" />

          {/* BEAR BODY */}
          <ellipse cx="50" cy="85" rx="28" ry="26" fill="url(#bearFur)" />
          <ellipse cx="50" cy="88" rx="16" ry="18" fill="url(#bearSnout)" opacity="0.9" />

          {/* BEAR HEAD */}
          <circle cx="50" cy="48" r="26" fill="url(#bearFur)" />

          {/* BEAR SNOUT */}
          <ellipse cx="50" cy="56" rx="14" ry="10" fill="url(#bearSnout)" />
          <ellipse cx="50" cy="52" rx="5" ry="4" fill="#1E293B" />

          {/* EYES */}
          <circle cx="38" cy="44" r="4.5" fill="#1E293B" />
          <circle cx="62" cy="44" r="4.5" fill="#1E293B" />
          <circle cx="40" cy="42" r="1.5" fill="#FFF" />
          <circle cx="64" cy="42" r="1.5" fill="#FFF" />

          {/* SMILE */}
          <path d="M 45 60 Q 50 64 55 60" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />

          {/* CHEEKS */}
          <circle cx="30" cy="52" r="4" fill="#F43F5E" opacity="0.5" />
          <circle cx="70" cy="52" r="4" fill="#F43F5E" opacity="0.5" />

          {/* GOLDEN PENCIL IN PAW ✏️ */}
          {hasPencil && (
            <g className="animate-bounce">
              <rect x="70" y="70" width="8" height="24" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" transform="rotate(-20 74 82)" />
              <polygon points="73,63 77,63 75,56" fill="#1E293B" transform="rotate(-20 74 82)" />
              <rect x="70" y="90" width="8" height="6" fill="#F43F5E" transform="rotate(-20 74 82)" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
