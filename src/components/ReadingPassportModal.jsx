import React, { useState, useEffect } from 'react';
import { X, Award, Star, Compass, BookOpen, Printer, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../services/soundEffects';

const PASSPORT_AVATARS = ['🦊', '🐻', '🚀', '👧', '👦', '🐰', '🐲', '🦄'];

const STORY_STAMPS = [
  { id: 'dolly-midnight-adventure', title: "Dolly's Midnight Quest", emoji: '🎀', stampColor: 'border-pink-500 text-pink-700 bg-pink-100', place: 'Dream Bedroom' },
  { id: 'secret-cave', title: 'The Secret Cave', emoji: '💎', stampColor: 'border-indigo-500 text-indigo-700 bg-indigo-100', place: 'Crystal Cavern' },
  { id: 'bottle-that-waited', title: 'The Bottle That Waited', emoji: '💧', stampColor: 'border-sky-500 text-sky-700 bg-sky-100', place: 'Oak Schoolhouse' },
  { id: 'curious-rocket', title: 'The Curious Rocket', emoji: '🚀', stampColor: 'border-purple-500 text-purple-700 bg-purple-100', place: 'Starry Orbit' },
  { id: 'bear-lost-pencil', title: 'Benny & The Lost Pencil', emoji: '🐻', stampColor: 'border-amber-500 text-amber-700 bg-amber-100', place: 'Sunny Woods' }
];

export default function ReadingPassportModal({ isOpen, onClose, unlockedBadgesCount = 1, onBadgeEarned }) {
  const [explorerName, setExplorerName] = useState(() => {
    return localStorage.getItem('storyverse_explorer_name') || 'Captain Story Explorer';
  });
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('storyverse_explorer_avatar') || '🦊';
  });
  const [stampedStories, setStampedStories] = useState(() => {
    const saved = localStorage.getItem('storyverse_stamped_stories');
    return saved ? JSON.parse(saved) : ['dolly-midnight-adventure', 'bottle-that-waited'];
  });
  const [favoriteQuote, setFavoriteQuote] = useState(() => {
    return localStorage.getItem('storyverse_fav_quote') || 'True friendship never forgets! ✨';
  });

  useEffect(() => {
    localStorage.setItem('storyverse_explorer_name', explorerName);
  }, [explorerName]);

  useEffect(() => {
    localStorage.setItem('storyverse_explorer_avatar', selectedAvatar);
  }, [selectedAvatar]);

  useEffect(() => {
    localStorage.setItem('storyverse_stamped_stories', JSON.stringify(stampedStories));
  }, [stampedStories]);

  useEffect(() => {
    localStorage.setItem('storyverse_fav_quote', favoriteQuote);
  }, [favoriteQuote]);

  if (!isOpen) return null;

  const handleToggleStamp = (storyId) => {
    soundFX.playSparkle();
    setStampedStories(prev => {
      let next;
      if (prev.includes(storyId)) {
        next = prev.filter(id => id !== storyId);
      } else {
        next = [...prev, storyId];
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
      if (next.length >= 3 && onBadgeEarned) {
        onBadgeEarned('passport-adventurer');
      }
      return next;
    });
  };

  const handlePrint = () => {
    soundFX.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-5 bg-slate-950/75 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-4 md:p-6 w-full max-w-4xl shadow-2xl relative flex flex-col gap-4 max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl p-1 bg-amber-300 rounded-2xl shadow-xs">📓</span>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-950 flex items-center gap-2">
                <span>Storyverse Official Reading Passport</span>
                <span className="text-xs bg-amber-300 text-amber-900 font-extrabold px-2 py-0.5 rounded-full border border-amber-400">
                  Passport #SV-2026
                </span>
              </h2>
              <p className="text-xs font-bold text-amber-800">
                Your official travel diary across magical story realms! Collect stamps and print your passport!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs flex items-center gap-1.5 shadow-xs border border-amber-500 cursor-pointer transition-all"
              title="Print your Passport"
            >
              <Printer className="w-4 h-4" />
              <span>Print Passport 🖨️</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                onClose();
              }}
              className="p-1.5 rounded-full bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TWO-PAGE AUTHENTIC PASSPORT SPREAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

          {/* LEFT PAGE: OFFICIAL EXPLORER IDENTITY CARD */}
          <div className="bg-white/95 rounded-2xl border-4 border-amber-400 p-4 shadow-md flex flex-col justify-between gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -z-0 opacity-60" />

            {/* Passport Card Header */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-2 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200 px-2 py-0.5 rounded-md">
                Official Explorer Visa
              </span>
              <span className="text-xs font-bold text-slate-400">STORYVERSE CITIZEN</span>
            </div>

            {/* Avatar & Name Input */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="text-5xl p-2.5 bg-amber-100 rounded-2xl border-2 border-amber-400 shadow-inner flex items-center justify-center">
                  {selectedAvatar}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Explorer Name:
                </label>
                <input
                  type="text"
                  value={explorerName}
                  onChange={(e) => setExplorerName(e.target.value)}
                  className="w-full text-base font-black text-amber-950 border-b-2 border-amber-400 focus:outline-none bg-transparent py-0.5"
                  placeholder="Enter your name..."
                />
                <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5">
                  Rank: Grand Story Voyager 🌟
                </span>
              </div>
            </div>

            {/* Choose Avatar selector */}
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-slate-600 block mb-1">Select Explorer Mascot:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {PASSPORT_AVATARS.map(av => (
                  <button
                    key={av}
                    onClick={() => {
                      soundFX.playPop();
                      setSelectedAvatar(av);
                    }}
                    className={`text-xl p-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedAvatar === av
                        ? 'bg-amber-300 border-amber-500 scale-110 shadow-xs'
                        : 'bg-slate-50 hover:bg-amber-100 border-slate-200'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Stats Grid */}
            <div className="grid grid-cols-3 gap-2 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-center relative z-10">
              <div>
                <span className="text-lg font-black text-amber-900 block">{stampedStories.length} / 5</span>
                <span className="text-[10px] font-bold text-slate-600">Stamps Collected</span>
              </div>
              <div>
                <span className="text-lg font-black text-amber-900 block">{unlockedBadgesCount}</span>
                <span className="text-[10px] font-bold text-slate-600">Badges Earned</span>
              </div>
              <div>
                <span className="text-lg font-black text-amber-900 block">100%</span>
                <span className="text-[10px] font-bold text-slate-600">Kindness Score</span>
              </div>
            </div>

            {/* Favorite Quote Input */}
            <div className="relative z-10">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                My Favorite Story Wisdom / Line:
              </label>
              <input
                type="text"
                value={favoriteQuote}
                onChange={(e) => setFavoriteQuote(e.target.value)}
                className="w-full text-xs font-bold text-slate-700 bg-amber-50 p-2 rounded-xl border border-amber-300 focus:outline-none"
                placeholder="Write your favorite line..."
              />
            </div>
          </div>

          {/* RIGHT PAGE: THE 5 ADVENTURE REALM VISAS & STAMPS */}
          <div className="bg-white/95 rounded-2xl border-4 border-amber-400 p-4 shadow-md flex flex-col justify-between gap-3 relative">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200 px-2 py-0.5 rounded-md">
                Visited Story Realms
              </span>
              <span className="text-xs font-bold text-slate-500">Tap to Stamp / Unstamp</span>
            </div>

            {/* The 5 circular Realm Stamps */}
            <div className="flex flex-col gap-2">
              {STORY_STAMPS.map((stamp) => {
                const isStamped = stampedStories.includes(stamp.id);

                return (
                  <div
                    key={stamp.id}
                    onClick={() => handleToggleStamp(stamp.id)}
                    className={`p-2.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      isStamped
                        ? 'bg-amber-50 border-amber-400 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-amber-50/50 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center text-xl shrink-0 ${stamp.stampColor} ${
                        isStamped ? 'rotate-[-6deg] scale-105' : 'grayscale opacity-60'
                      }`}>
                        {stamp.emoji}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{stamp.title}</h4>
                        <span className="text-[10px] font-semibold text-slate-500">
                          Realm: {stamp.place}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {isStamped ? (
                        <span className="text-[10px] font-black text-amber-900 bg-amber-200 border border-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>VISITED</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 border border-slate-300 px-2 py-0.5 rounded-full">
                          + Stamp Visa
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Passport Seal Stamp Footer */}
            <div className="border-t border-amber-200 pt-2 flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Storyverse Seal of Excellence 2026</span>
              </span>
              <span className="text-emerald-700">Validated 🏆</span>
            </div>

          </div>

        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs font-bold text-amber-900 bg-amber-200/80 p-2.5 rounded-xl border border-amber-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Stamp 3 or more stories to unlock the <strong>Passport Adventurer 📓</strong> trophy badge!</span>
          </span>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold cursor-pointer transition-all shadow-xs"
          >
            Close Passport
          </button>
        </div>

      </div>
    </div>
  );
}
