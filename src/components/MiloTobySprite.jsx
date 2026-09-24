import React from 'react';

export default function MiloTobySprite({
  miloMood = 'happy',
  tobyMood = 'happy',
  isTrapped = false,
  isRescued = false,
  isClimbing = false,
  onTapMilo = () => {},
  onTapToby = () => {}
}) {
  return (
    <div className="relative flex items-end justify-center gap-4 select-none">
      
      {/* MILO THE LITTLE FOX 🦊 */}
      <div
        onClick={onTapMilo}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center group ${
          isClimbing ? 'animate-bounce -translate-y-4' : ''
        }`}
        title="Tap Milo the Fox 🦊"
      >
        {/* MILO SPEECH/MOOD BADGE */}
        <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[11px] shadow-md border-2 border-white animate-pulse whitespace-nowrap">
          {miloMood === 'determined' ? '💪 Helping!' : miloMood === 'excited' ? '🚀 Let\'s Go!' : '🦊 Milo'}
        </div>

        {/* FOX BODY CONTAINER */}
        <div className="relative w-20 h-24 flex items-center justify-center">
          {/* FOX SVG CARTOON SPRITE */}
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl overflow-visible">
            <defs>
              <linearGradient id="foxFur" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="50%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
              <linearGradient id="foxBelly" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="100%" stopColor="#FFEDD5" />
              </linearGradient>
            </defs>

            {/* FOX TAIL */}
            <path
              d="M 20 85 C 0 80 -10 50 10 40 C 25 35 30 55 25 75 Z"
              fill="url(#foxFur)"
              className="origin-bottom-right animate-wiggle"
            />
            <path d="M -5 50 C -10 45 -5 38 10 40 Z" fill="#FFF7ED" />

            {/* FOX BODY */}
            <ellipse cx="50" cy="82" rx="26" ry="28" fill="url(#foxFur)" />
            <ellipse cx="50" cy="85" rx="16" ry="20" fill="url(#foxBelly)" />

            {/* FOX EARS */}
            <polygon points="26,40 16,10 42,28" fill="url(#foxFur)" />
            <polygon points="30,36 22,16 40,28" fill="#451A03" />
            
            <polygon points="74,40 84,10 58,28" fill="url(#foxFur)" />
            <polygon points="70,36 78,16 60,28" fill="#451A03" />

            {/* FOX HEAD */}
            <polygon points="20,40 80,40 50,80" fill="url(#foxFur)" />
            <polygon points="32,54 68,54 50,80" fill="url(#foxBelly)" />

            {/* EYES */}
            {miloMood === 'determined' ? (
              <>
                <circle cx="38" cy="48" r="4.5" fill="#1E293B" />
                <circle cx="62" cy="48" r="4.5" fill="#1E293B" />
                <line x1="32" y1="42" x2="44" y2="46" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
                <line x1="68" y1="42" x2="56" y2="46" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="38" cy="48" r="5" fill="#1E293B" />
                <circle cx="62" cy="48" r="5" fill="#1E293B" />
                <circle cx="40" cy="46" r="1.8" fill="#FFFFFF" />
                <circle cx="64" cy="46" r="1.8" fill="#FFFFFF" />
              </>
            )}

            {/* NOSE */}
            <ellipse cx="50" cy="74" rx="4.5" ry="3.5" fill="#1E293B" />

            {/* CHEEKS */}
            <circle cx="28" cy="56" r="4" fill="#F43F5E" opacity="0.6" />
            <circle cx="72" cy="56" r="4" fill="#F43F5E" opacity="0.6" />

            {/* SMILE */}
            <path d="M 45 77 Q 50 81 55 77" fill="none" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />

            {/* BACKPACK */}
            <rect x="70" y="65" width="14" height="20" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* TOBY THE LITTLE RABBIT 🐰 */}
      <div
        onClick={onTapToby}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex flex-col items-center group ${
          isTrapped ? 'animate-pulse' : 'animate-gentle-bounce'
        }`}
        title="Tap Toby the Rabbit 🐰"
      >
        {/* TOBY SPEECH/MOOD BADGE */}
        <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-black text-[11px] shadow-md border-2 border-white animate-pulse whitespace-nowrap">
          {isTrapped ? '😟 Trapped!' : isRescued ? '🥹 Rescued!' : '🐰 Toby'}
        </div>

        {/* RABBIT BODY CONTAINER */}
        <div className="relative w-18 h-22 flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl overflow-visible">
            <defs>
              <linearGradient id="tobyFur" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>

            {/* RABBIT LONG EARS */}
            <g className={isTrapped ? 'rotate-[-10deg] origin-bottom' : 'animate-wiggle'}>
              <ellipse cx="36" cy="20" rx="9" ry="24" fill="url(#tobyFur)" stroke="#CBD5E1" strokeWidth="2" />
              <ellipse cx="36" cy="22" rx="5" ry="18" fill="#F472B6" opacity="0.6" />
            </g>
            <g className={isTrapped ? 'rotate-[10deg] origin-bottom' : 'animate-wiggle'}>
              <ellipse cx="64" cy="20" rx="9" ry="24" fill="url(#tobyFur)" stroke="#CBD5E1" strokeWidth="2" />
              <ellipse cx="64" cy="22" rx="5" ry="18" fill="#F472B6" opacity="0.6" />
            </g>

            {/* RABBIT BODY */}
            <ellipse cx="50" cy="85" rx="24" ry="24" fill="url(#tobyFur)" stroke="#CBD5E1" strokeWidth="2" />
            <ellipse cx="50" cy="87" rx="14" ry="16" fill="#FFF" />

            {/* RABBIT HEAD */}
            <circle cx="50" cy="52" r="24" fill="url(#tobyFur)" stroke="#CBD5E1" strokeWidth="2" />

            {/* EYES */}
            {isTrapped ? (
              <>
                <path d="M 38 48 Q 42 44 44 48" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                <path d="M 56 48 Q 58 44 62 48" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                {/* TEARDROP */}
                <circle cx="34" cy="54" r="2.5" fill="#38BDF8" className="animate-ping" />
              </>
            ) : (
              <>
                <circle cx="40" cy="50" r="4.5" fill="#1E293B" />
                <circle cx="60" cy="50" r="4.5" fill="#1E293B" />
                <circle cx="42" cy="48" r="1.5" fill="#FFFFFF" />
                <circle cx="62" cy="48" r="1.5" fill="#FFFFFF" />
              </>
            )}

            {/* NOSE */}
            <polygon points="50,56 46,59 54,59" fill="#F472B6" />

            {/* CHEEKS */}
            <circle cx="32" cy="58" r="4" fill="#FB7185" opacity="0.5" />
            <circle cx="68" cy="58" r="4" fill="#FB7185" opacity="0.5" />

            {/* MOUTH */}
            <path d="M 46 62 Q 50 66 54 62" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

            {/* BACKPACK */}
            <rect x="18" y="70" width="12" height="18" rx="3" fill="#10B981" stroke="#059669" strokeWidth="2" />
          </svg>
        </div>

        {/* TRAPPED ROCKS OVERLAY */}
        {isTrapped && (
          <div className="absolute bottom-0 inset-x-0 flex justify-center gap-1 z-30">
            <span className="text-3xl filter drop-shadow-md animate-bounce">🪨</span>
            <span className="text-3xl filter drop-shadow-md">🪨</span>
          </div>
        )}
      </div>

    </div>
  );
}
