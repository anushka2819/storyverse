import React from 'react';

export default function AaravSprite({ pose = 'happy', className = '' }) {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 260"
        className="w-36 h-56 md:w-44 md:h-64 drop-shadow-xl transition-all duration-500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="80" cy="250" rx="45" ry="8" fill="rgba(0, 0, 0, 0.15)" />

        {/* Backpack Straps & Bag on Back */}
        <rect x="25" y="105" width="22" height="75" rx="10" fill="#7c3aed" stroke="#5b21b6" strokeWidth="3" />
        <rect x="113" y="105" width="22" height="75" rx="10" fill="#7c3aed" stroke="#5b21b6" strokeWidth="3" />

        {/* Legs & Shoes */}
        {pose === 'kneeling' ? (
          <g>
            {/* Kneeling Legs */}
            <path d="M 45 170 Q 30 200 65 210 Q 75 210 80 205" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
            <path d="M 115 170 Q 130 200 95 210 Q 85 210 80 205" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
            {/* Shoes */}
            <rect x="40" y="205" width="30" height="15" rx="7" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <rect x="90" y="205" width="30" height="15" rx="7" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
          </g>
        ) : (
          <g>
            {/* Left Leg */}
            <rect x="52" y="170" width="22" height="60" rx="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
            {/* Right Leg */}
            <rect x="86" y="170" width="22" height="60" rx="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3" />
            {/* Left Shoe */}
            <path d="M 44 225 L 76 225 L 76 242 C 76 247 44 247 44 242 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <rect x="44" y="238" width="32" height="5" fill="#ffffff" />
            {/* Right Shoe */}
            <path d="M 84 225 L 116 225 L 116 242 C 116 247 84 247 84 242 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <rect x="84" y="238" width="32" height="5" fill="#ffffff" />
          </g>
        )}

        {/* Torso / Shirt */}
        <path
          d="M 42 100 Q 80 92 118 100 L 122 172 Q 80 176 38 172 Z"
          fill="#0284c7"
          stroke="#0369a1"
          strokeWidth="4"
        />
        {/* Shirt Stripes & Rocket Motif */}
        <path d="M 40 120 Q 80 115 120 120" stroke="#f59e0b" strokeWidth="6" />
        <path d="M 40 140 Q 80 135 120 140" stroke="#ffffff" strokeWidth="6" />
        <circle cx="80" cy="155" r="7" fill="#ef4444" />

        {/* Arms */}
        {pose === 'waving' ? (
          <g>
            {/* Waving Left Arm */}
            <path d="M 42 105 Q 20 80 15 50" stroke="#f87171" strokeWidth="16" strokeLinecap="round" />
            <circle cx="15" cy="48" r="10" fill="#fbcfe8" />
            {/* Right Arm */}
            <path d="M 118 105 Q 135 130 132 155" stroke="#f87171" strokeWidth="16" strokeLinecap="round" />
            <circle cx="132" cy="158" r="10" fill="#fbcfe8" />
          </g>
        ) : pose === 'searching' ? (
          <g>
            {/* Both arms pointing forward/down */}
            <path d="M 42 110 Q 30 145 60 165" stroke="#f87171" strokeWidth="16" strokeLinecap="round" />
            <circle cx="62" cy="167" r="10" fill="#fbcfe8" />
            <path d="M 118 110 Q 130 145 100 165" stroke="#f87171" strokeWidth="16" strokeLinecap="round" />
            <circle cx="98" cy="167" r="10" fill="#fbcfe8" />
          </g>
        ) : (
          <g>
            {/* Normal Arms */}
            <path d="M 42 105 Q 26 130 28 155" stroke="#f87171" strokeWidth="16" strokeLinecap="round" />
            <circle cx="28" cy="158" r="10" fill="#fbcfe8" />
            <path d="M 118 105 Q 134 130 132 155" stroke="#f87171" strokeWidth="16" strokeLinecap="round" />
            <circle cx="132" cy="158" r="10" fill="#fbcfe8" />
          </g>
        )}

        {/* Head */}
        <circle cx="80" cy="62" r="36" fill="#fbcfe8" stroke="#f472b6" strokeWidth="3" />

        {/* Hair */}
        <path
          d="M 44 60 C 44 25 70 20 80 20 C 95 20 116 25 116 60 C 116 50 110 38 98 38 C 88 38 82 45 74 38 C 65 38 52 48 44 60 Z"
          fill="#334155"
        />

        {/* Eyes */}
        <circle cx="68" cy="60" r="5" fill="#0f172a" />
        <circle cx="92" cy="60" r="5" fill="#0f172a" />
        <circle cx="70" cy="58" r="1.5" fill="#ffffff" />
        <circle cx="94" cy="58" r="1.5" fill="#ffffff" />

        {/* Smile */}
        <path d="M 68 76 Q 80 88 92 76" stroke="#991b1b" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Rosy Cheeks */}
        <circle cx="58" cy="68" r="6" fill="#f43f5e" opacity="0.4" />
        <circle cx="102" cy="68" r="6" fill="#f43f5e" opacity="0.4" />
      </svg>
    </div>
  );
}
