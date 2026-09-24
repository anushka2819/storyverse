import React from 'react';
import { X, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const ALL_BADGES = [
  { id: 'found_it', name: 'Found It! Explorer', icon: '🔎', desc: 'Found the forgotten water bottle under the desk!' },
  { id: 'empathy', name: 'Empathy Star', icon: '💙', desc: 'Understood how the lonely water bottle felt.' },
  { id: 'listener', name: 'Keen Listener', icon: '👂', desc: 'Listened carefully to the footsteps in the quiet hall.' },
  { id: 'reunion', name: 'Reunion Hero', icon: '✨', desc: 'Helped Aarav locate his bottle under the classroom desk.' },
  { id: 'checklist_master', name: 'Checklist Master', icon: '📋', desc: 'Completed Aarav\'s leaving classroom checklist!' },
  { id: 'care_champion', name: 'Care Champion Badge 🏆', icon: '🌟', desc: 'Chosen an everyday item to care for in real life!' }
];

export default function BadgeModal({ isOpen, onClose, earnedBadges }) {
  if (!isOpen) return null;

  const earnedCount = Object.keys(earnedBadges).length;

  const triggerCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-amber-50 border-4 border-amber-400 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 rounded-full text-amber-900 border-2 border-amber-400 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-300 text-amber-950 px-4 py-1.5 rounded-full text-sm font-black mb-2 shadow-sm">
            <Award className="w-5 h-5 text-amber-900" />
            <span>Explorer Badge Collection</span>
          </div>
          <h3 className="text-3xl font-extrabold text-amber-950">
            {earnedCount} / {ALL_BADGES.length} Badges Unlocked!
          </h3>
          <p className="text-sm font-bold text-amber-800 mt-1">
            Complete story interactions to earn all explorer badges!
          </p>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
          {ALL_BADGES.map((b) => {
            const isUnlocked = Boolean(earnedBadges[b.id]);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border-3 flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-100 to-sky-100 border-amber-400 shadow-md'
                    : 'bg-slate-100 border-slate-300 opacity-50 grayscale'
                }`}
              >
                <span className="text-4xl p-2 bg-white rounded-2xl border border-amber-300 shadow-sm">
                  {b.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-base">{b.name}</h4>
                    {isUnlocked && <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-current" />}
                  </div>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={triggerCelebrate}
            className="btn-game-accent px-6 py-3 rounded-2xl font-black text-amber-950 text-sm flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-900 animate-spin-slow" />
            <span>Celebrate Badges!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
