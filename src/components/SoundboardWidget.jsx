import React, { useState } from 'react';
import { Music, Volume2, Sparkles, X } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function SoundboardWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const sounds = [
    { label: 'Rocket Whoosh', icon: '🚀', action: () => soundFX.playRocketWhoosh() },
    { label: 'Sparkle Chime', icon: '✨', action: () => soundFX.playSparkle() },
    { label: 'School Bell', icon: '🔔', action: () => soundFX.playBell() },
    { label: 'Footsteps', icon: '👣', action: () => soundFX.playFootsteps() },
    { label: 'Water Glug', icon: '💧', action: () => soundFX.playWaterGlug() },
    { label: 'Click Pop', icon: '🎈', action: () => soundFX.playPop() },
    { label: 'Victory Fanfare', icon: '🏆', action: () => soundFX.playSuccessFanfare() },
    { label: 'Door Clack', icon: '🚪', action: () => soundFX.playDoorClack() }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-game-accent px-4 py-3 rounded-full text-xs font-black text-amber-950 flex items-center gap-2 shadow-2xl animate-bounce"
        >
          <Music className="w-5 h-5 text-amber-900" />
          <span>Explorer Soundboard 🎶</span>
        </button>
      ) : (
        <div className="bg-amber-100 border-4 border-amber-400 p-4 rounded-3xl shadow-2xl max-w-xs w-full animate-gentle-bounce">
          <div className="flex items-center justify-between mb-3 border-b-2 border-amber-300 pb-2">
            <div className="flex items-center gap-1.5 font-extrabold text-amber-950 text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Explorer Soundboard</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {sounds.map((snd, idx) => (
              <button
                key={idx}
                onClick={snd.action}
                className="p-2.5 rounded-2xl bg-white hover:bg-amber-200 border-2 border-amber-300 flex items-center gap-2 text-xs font-extrabold text-slate-800 shadow-sm transition-transform active:scale-95"
              >
                <span className="text-xl">{snd.icon}</span>
                <span className="truncate">{snd.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
