import React, { useState } from 'react';
import { Award, X, Sparkles, Lock, BookOpen, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORY_LIBRARY } from '../data/storyLibraryData';
import { soundFX } from '../services/soundEffects';

export default function CareCertificateModal({
  isOpen,
  onClose,
  storyId = 'bottle-that-waited',
  storyTitle = "Storyverse Reading Adventure",
  isCompleted = false,
  completedStories = [],
  onSelectStory = () => {},
  onContinueReading = () => {}
}) {
  const [selectedStoryId, setSelectedStoryId] = useState(storyId);
  const [explorerName, setExplorerName] = useState('Super Story Explorer');

  if (!isOpen) return null;

  // Use currently selected story id in modal, or fallback to passed storyId
  const currentStoryId = selectedStoryId || storyId;
  const isCurrentStoryCompleted = (completedStories && completedStories.includes(currentStoryId)) || isCompleted;

  const getStoryCertificateDetails = (sId) => {
    switch (sId) {
      case 'dolly-midnight-adventure':
        return {
          certTitle: "Magical Kindness Certificate",
          subtitle: "Official Award for Caring & Helping Friends",
          badgeIcon: "🎀",
          pledgeIcon: "🧸",
          label: "Lost Toys & Lonely Friends",
          tip: "I promise to include everyone in playtime, share my toys, and bring joy wherever I go!",
          moral: "“A small act of kindness can bring light and joy to lost friends everywhere.” ✨"
        };
      case 'secret-cave':
        return {
          certTitle: "True Friendship Certificate",
          subtitle: "Official Award for Loyalty, Empathy & Courage",
          badgeIcon: "🦊🐰",
          pledgeIcon: "🤝",
          label: "Loyal Best Friends & Forest Pals",
          tip: "I promise to stick by my friends, listen with patience, and never leave anyone behind!",
          moral: "“A real friend doesn't leave you behind just because the adventure is waiting.” ❤️"
        };
      case 'curious-rocket':
        return {
          certTitle: "Galactic Hero Certificate",
          subtitle: "Official Award for Bravery & Reaching for the Stars",
          badgeIcon: "🚀",
          pledgeIcon: "⭐",
          label: "Big Dreams & Lost Space Comets",
          tip: "I promise to dream big, help friends who lost their sparkle, and take brave steps every day!",
          moral: "“Big dreams start with tiny brave steps every single day!” 🌌"
        };
      case 'bear-lost-pencil':
        return {
          certTitle: "Creative Sharing Certificate",
          subtitle: "Official Award for Generosity & Artistic Friendship",
          badgeIcon: "🎨",
          pledgeIcon: "✏️",
          label: "Sharing Magic Pencils & Crayons",
          tip: "I promise to share my art supplies, draw rainbow doodles, and create beautiful memories together!",
          moral: "“Creativity grows much brighter when shared with good friends.” 🌈"
        };
      default:
        return {
          certTitle: "Care Champion Certificate",
          subtitle: "Official Explorer Badge of Care & Empathy",
          badgeIcon: "🏆",
          pledgeIcon: "💧",
          label: "Everyday Helpers & Water Bottle",
          tip: "I promise to keep my water bottle clean, stay hydrated, and take care of everyday helpers!",
          moral: "“Take care of the little things that care for you every day.” 💙"
        };
    }
  };

  const details = getStoryCertificateDetails(currentStoryId);
  const activeStoryObj = STORY_LIBRARY.find(s => s.id === currentStoryId) || { title: storyTitle };

  // LOCKED STATE: If the story has not been completed yet
  if (!isCurrentStoryCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
        <div className="bg-amber-50 border-8 border-amber-400 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative text-center flex flex-col items-center">
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 rounded-full text-amber-900 border-2 border-amber-400 cursor-pointer active:scale-95 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-20 h-20 bg-amber-100 rounded-3xl border-4 border-amber-300 flex items-center justify-center text-4xl mb-3 shadow-inner">
            🔒
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-amber-950">
            Certificate Locked!
          </h3>

          <div className="bg-white/90 border-2 border-amber-300 rounded-2xl p-4 my-4 text-slate-700 w-full shadow-sm">
            <p className="text-sm font-bold text-slate-800 leading-snug">
              Official certificates are awarded only after you properly read and complete the entire story!
            </p>
            <div className="mt-3 py-2 px-3 bg-amber-100 rounded-xl text-xs font-black text-amber-950 flex items-center justify-center gap-2 border border-amber-300">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>Story: {activeStoryObj.title}</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-2">
              Finish all the chapters and sentences to the very end to earn your {details.certTitle}! 🌟
            </p>
          </div>

          {completedStories && completedStories.length > 0 && (
            <div className="w-full bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 mb-4 text-left">
              <span className="text-xs font-black text-emerald-900 block mb-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>View Certificates for Completed Stories:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {completedStories.map(id => {
                  const s = STORY_LIBRARY.find(item => item.id === id);
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        soundFX.playPop();
                        setSelectedStoryId(id);
                      }}
                      className="px-3 py-1 bg-emerald-200 hover:bg-emerald-300 text-emerald-950 rounded-xl text-xs font-black border border-emerald-400 cursor-pointer transition-all active:scale-95"
                    >
                      {s?.title || id} 🏆
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              soundFX.playSparkle();
              onClose();
              if (onContinueReading) onContinueReading(currentStoryId);
            }}
            className="btn-game-primary px-8 py-3 rounded-2xl text-sm font-black text-white flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-white" />
            <span>Read & Finish Story Now 📖</span>
          </button>
        </div>
      </div>
    );
  }

  // UNLOCKED STATE: When story has been properly read & completed
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-amber-50 border-8 border-amber-400 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative text-center">
        <button
          onClick={() => {
            soundFX.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 rounded-full text-amber-900 border-2 border-amber-400 cursor-pointer active:scale-95 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Completed Stories Switcher (if user completed more than 1) */}
        {completedStories && completedStories.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mb-3 flex-wrap">
            <span className="text-[11px] font-black text-amber-900 mr-1">Completed Awards:</span>
            {completedStories.map(id => {
              const s = STORY_LIBRARY.find(item => item.id === id);
              const isSelected = id === currentStoryId;
              return (
                <button
                  key={id}
                  onClick={() => {
                    soundFX.playPop();
                    setSelectedStoryId(id);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-black border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 border-amber-600 shadow-sm'
                      : 'bg-white/80 hover:bg-amber-100 text-slate-700 border-amber-300'
                  }`}
                >
                  {s?.title || id} ✨
                </button>
              );
            })}
          </div>
        )}

        {/* Certificate Border Frame */}
        <div className="border-4 border-dashed border-amber-500 rounded-2xl p-6 bg-gradient-to-b from-white via-amber-50 to-sky-50 shadow-inner">
          <div className="text-4xl mb-1 animate-bounce">{details.badgeIcon}</div>
          <h2 className="text-2xl md:text-3xl font-black text-amber-950 uppercase tracking-widest">
            {details.certTitle}
          </h2>
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">
            {details.subtitle}
          </p>

          <div className="my-5">
            <p className="text-sm font-extrabold text-slate-700">This certificate is proudly awarded to:</p>
            <input
              type="text"
              value={explorerName}
              onChange={(e) => setExplorerName(e.target.value)}
              className="mt-2 text-center text-xl md:text-2xl font-black text-sky-900 bg-amber-100/80 border-b-4 border-sky-500 rounded-xl px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter Your Name..."
            />
          </div>

          <div className="bg-sky-100 border-2 border-sky-300 rounded-2xl p-4 my-4 flex items-center justify-center gap-3 text-left">
            <span className="text-5xl shrink-0">{details.pledgeIcon}</span>
            <div>
              <h4 className="font-extrabold text-sky-950 text-base">Pledge to Care For: {details.label}</h4>
              <p className="text-xs font-bold text-sky-800">{details.tip}</p>
            </div>
          </div>

          <p className="text-xs font-extrabold text-amber-900 italic mt-3">
            {details.moral}
          </p>
        </div>

        {/* Bottom Action: Confetti Celebration (Print option completely removed) */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              soundFX.playSparkle();
              confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
              onClose();
            }}
            className="btn-game-primary px-8 py-3 rounded-2xl text-sm font-black text-white flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>Celebrate & Keep Reading! ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
}
