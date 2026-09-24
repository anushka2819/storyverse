import React from 'react';
import { X, Trophy, Sparkles, Star, Award, Lock, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export const BADGES_LIST = [
  {
    id: 'story-explorer',
    title: 'Story Explorer',
    emoji: '🧭',
    description: 'Began your first storybook adventure!',
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 'word-wizard',
    title: 'Word Wizard',
    emoji: '🧙‍♂️',
    description: 'Explored 3 new magic vocabulary words!',
    color: 'from-purple-400 to-indigo-600'
  },
  {
    id: 'kindness-hero',
    title: 'Kindness Hero',
    emoji: '💛',
    description: 'Chose friendship and kindness in story choices!',
    color: 'from-rose-400 to-pink-600'
  },
  {
    id: 'little-artist',
    title: 'Little Artist',
    emoji: '🎨',
    description: 'Created and saved a colorful masterpiece!',
    color: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'space-cadet',
    title: 'Space Cadet',
    emoji: '🚀',
    description: 'Explored the stars with Rocky Rocket!',
    color: 'from-sky-400 to-blue-600'
  },
  {
    id: 'story-master',
    title: 'Story Master',
    emoji: '👑',
    description: 'Completed all 5 interactive storybook books!',
    color: 'from-amber-300 via-yellow-400 to-amber-500'
  }
];

export default function TrophyChestModal({ unlockedBadges = [], onClose }) {
  const totalBadges = BADGES_LIST.length;
  const unlockedCount = unlockedBadges.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/70 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 border-4 border-amber-400 rounded-3xl p-5 md:p-6 w-full max-w-xl shadow-2xl relative flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-amber-300 hover:bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-md border-2 border-white cursor-pointer active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-400 rounded-2xl border-2 border-amber-500 shadow-md text-amber-950">
            <Trophy className="w-8 h-8 fill-amber-950" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-amber-950 flex items-center gap-2">
              <span>My Trophy Chest & Badges</span>
              <Sparkles className="w-5 h-5 text-amber-600 fill-amber-600" />
            </h2>
            <p className="text-xs font-bold text-amber-900">
              Unlocked {unlockedCount} of {totalBadges} Shiny Learning Badges!
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-300 shadow-xs flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-black text-amber-950">
            <span>Badge Collection Progress:</span>
            <span>{Math.round((unlockedCount / totalBadges) * 100)}% Complete</span>
          </div>
          <div className="w-full h-4 bg-amber-100 rounded-full overflow-hidden border border-amber-300 p-0.5">
            <div
              style={{ width: `${(unlockedCount / totalBadges) * 100}%` }}
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700 shadow-sm"
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BADGES_LIST.map((b) => {
            const isUnlocked = unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-center text-center gap-2 transition-all relative ${
                  isUnlocked
                    ? 'bg-white border-amber-400 shadow-md scale-102 hover:scale-105'
                    : 'bg-slate-100/80 border-slate-300 opacity-60 grayscale'
                }`}
              >
                {/* Badge Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border-2 border-white bg-gradient-to-br ${
                    isUnlocked ? b.color : 'from-slate-200 to-slate-300'
                  }`}
                >
                  {isUnlocked ? b.emoji : '🔒'}
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-800 flex items-center justify-center gap-1">
                    <span>{b.title}</span>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-600 leading-tight mt-0.5">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Celebratory Message */}
        <div className="bg-amber-300/80 p-3 rounded-2xl border border-amber-400 text-center text-xs font-black text-amber-950 flex items-center justify-center gap-2">
          <span>🌟 Keep reading and discovering to earn all shiny badges!</span>
        </div>

      </div>
    </div>
  );
}
