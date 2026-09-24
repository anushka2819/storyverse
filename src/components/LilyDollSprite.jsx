import React from 'react';

export default function LilyDollSprite({
  mood = 'happy',
  hasKey = false,
  isSailing = false,
  onTapLily = () => {}
}) {
  return (
    <div
      onClick={onTapLily}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center select-none group ${
        isSailing ? 'animate-float' : 'animate-gentle-bounce'
      }`}
      title="Tap Lily the Doll 🎀"
    >
      {/* LILY SPEECH / MOOD BADGE */}
      <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-pink-500 text-white font-black text-[11px] shadow-md border-2 border-white animate-pulse whitespace-nowrap z-40">
        {hasKey ? '🗝️ Has Key!' : isSailing ? '⛵ Sailing!' : '🎀 Lily'}
      </div>

      {/* DOLL CONTAINER */}
      <div className="relative w-20 h-26 flex items-center justify-center">
        <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            <linearGradient id="dollDress" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="dollHair" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>

          {/* DOLL PONYTAILS / HAIR */}
          <circle cx="22" cy="38" r="14" fill="url(#dollHair)" />
          <circle cx="78" cy="38" r="14" fill="url(#dollHair)" />

          {/* PINK HAIR BOWS 🎀 */}
          <polygon points="12,28 22,34 12,40" fill="#F43F5E" />
          <polygon points="32,28 22,34 32,40" fill="#F43F5E" />
          <circle cx="22" cy="34" r="3.5" fill="#FFF" />

          <polygon points="68,28 78,34 68,40" fill="#F43F5E" />
          <polygon points="88,28 78,34 88,40" fill="#F43F5E" />
          <circle cx="78" cy="34" r="3.5" fill="#FFF" />

          {/* DOLL HEAD */}
          <circle cx="50" cy="42" r="25" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="2" />
          {/* HAIR BANGS */}
          <path d="M 28 32 Q 50 18 72 32 Q 50 26 28 32 Z" fill="url(#dollHair)" />

          {/* BUTTON EYES 🧵 */}
          <circle cx="38" cy="42" r="5.5" fill="#1E293B" />
          <circle cx="62" cy="42" r="5.5" fill="#1E293B" />
          {/* BUTTON CROSS STITCH Thread */}
          <line x1="36" y1="40" x2="40" y2="44" stroke="#FFF" strokeWidth="1.5" />
          <line x1="40" y1="40" x2="36" y2="44" stroke="#FFF" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="64" y2="44" stroke="#FFF" strokeWidth="1.5" />
          <line x1="64" y1="40" x2="60" y2="44" stroke="#FFF" strokeWidth="1.5" />

          {/* CHEEKS */}
          <circle cx="30" cy="48" r="4.5" fill="#FB7185" opacity="0.6" />
          <circle cx="70" cy="48" r="4.5" fill="#FB7185" opacity="0.6" />

          {/* SMILE */}
          <path d="M 44 52 Q 50 56 56 52" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />

          {/* DOLL DRESS */}
          <path d="M 36 65 L 64 65 L 75 100 L 25 100 Z" fill="url(#dollDress)" />
          {/* POLKA DOTS */}
          <circle cx="40" cy="78" r="2.5" fill="#FFF" opacity="0.8" />
          <circle cx="60" cy="84" r="2.5" fill="#FFF" opacity="0.8" />
          <circle cx="50" cy="92" r="2.5" fill="#FFF" opacity="0.8" />

          {/* ARMS */}
          <path d="M 36 68 Q 20 78 26 88" fill="none" stroke="#FFE4E6" strokeWidth="6" strokeLinecap="round" />
          <path d="M 64 68 Q 80 78 74 88" fill="none" stroke="#FFE4E6" strokeWidth="6" strokeLinecap="round" />

          {/* BACKPACK 🎒 */}
          <rect x="70" y="70" width="14" height="20" rx="4" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />

          {/* GOLDEN KEY IN HAND 🗝️ */}
          {hasKey && (
            <g className="animate-bounce">
              <circle cx="80" cy="88" r="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <line x1="80" y1="92" x2="80" y2="104" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="80" y1="98" x2="84" y2="98" stroke="#F59E0B" strokeWidth="2" />
              <line x1="80" y1="102" x2="84" y2="102" stroke="#F59E0B" strokeWidth="2" />
            </g>
          )}

          {/* LEGS & SHOES */}
          <rect x="38" y="100" width="8" height="18" fill="#FFE4E6" />
          <rect x="54" y="100" width="8" height="18" fill="#FFE4E6" />
          <ellipse cx="42" cy="118" rx="6" ry="4" fill="#F43F5E" />
          <ellipse cx="58" cy="118" rx="6" ry="4" fill="#F43F5E" />
        </svg>
      </div>
    </div>
  );
}
