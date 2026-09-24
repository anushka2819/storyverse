import React from 'react';
import { BookOpen, Heart, Sparkles, Droplet } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';

export default function StoryChapterMap({
  currentScene,
  scenes = STORY_SCENES,
  currentSentenceIndex = 0,
  onSelectScene = () => {}
}) {
  const currentSentence = currentScene?.sentences?.[currentSentenceIndex] || currentScene?.sentences?.[0];
  const plotData = currentSentence?.plotData || { emotionScore: 70, hydrationLevel: 70 };

  const chapterStops = scenes.map((s) => {
    const rawIcon = s.objects?.[0]?.icon || s.sentences?.[0]?.screenState?.overlayEmoji || '📖';
    const cleanTitle = s.title.replace(/[^\w\s]/gi, '').trim();
    const shortName = cleanTitle.split(' ').slice(0, 2).join(' ') || `Chapter ${s.id}`;
    return {
      id: s.id,
      name: shortName,
      icon: rawIcon
    };
  });

  const heartCount = Math.max(1, Math.min(5, Math.ceil((plotData.emotionScore || 80) / 20)));

  return (
    <div className="bg-white/95 border-4 border-sky-300 rounded-3xl p-4 md:p-5 text-slate-800 shadow-xl relative overflow-hidden select-none font-['Fredoka',sans-serif]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-2 border-amber-200 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-700 animate-pulse" />
          <h3 className="text-lg md:text-xl font-bold text-amber-950 flex items-center gap-1.5 font-sans">
            <span>Storybook Chapter Trail</span>
            <span className="text-xs bg-amber-200 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
              Chapter {currentScene.id} of {scenes.length}
            </span>
          </h3>
        </div>

        {/* Storybook Hearts & Hydration Meter */}
        <div className="flex items-center gap-4 bg-white/90 px-3.5 py-1.5 rounded-2xl border border-amber-300 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-amber-900 mr-1">Happiness:</span>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-4 h-4 transition-all ${
                  idx < heartCount ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-300 fill-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 border-l-2 border-amber-200 pl-3">
            <Droplet className="w-4 h-4 text-sky-500 fill-sky-500" />
            <span className="text-xs font-bold text-sky-900">{plotData.hydrationLevel}% Water</span>
          </div>
        </div>
      </div>

      {/* CHAPTER TRAIL NODES */}
      <div className="relative w-full overflow-x-auto py-2 scrollbar-none">
        <div className="flex items-center justify-between min-w-[640px] px-4 relative">
          
          {/* Connecting Ribbon Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-2.5 bg-amber-200 rounded-full border border-amber-300 -z-0" />

          {chapterStops.map((stop) => {
            const isActive = stop.id === currentScene.id;
            const isCompleted = stop.id < currentScene.id;

            return (
              <div
                key={stop.id}
                onClick={() => onSelectScene(stop.id)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                {/* Active Bookmark Ribbon Marker */}
                {isActive && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-600 shadow-md animate-bounce flex items-center gap-0.5">
                    <span>📖 HERE</span>
                  </div>
                )}

                {/* Chapter Node */}
                <div
                  className={`w-12 h-12 md:w-13 md:h-13 rounded-2xl border-3 flex items-center justify-center text-2xl transition-all ${
                    isActive
                      ? 'bg-amber-300 border-amber-600 ring-4 ring-amber-300 scale-110 shadow-md'
                      : isCompleted
                      ? 'bg-amber-100 border-amber-400 shadow-sm'
                      : 'bg-white border-amber-200 group-hover:border-amber-400 group-hover:scale-105'
                  }`}
                >
                  <span>{stop.icon}</span>
                </div>

                {/* Chapter Name */}
                <span
                  className={`text-[11px] font-bold mt-1.5 text-center max-w-[70px] leading-tight ${
                    isActive ? 'text-amber-950 font-black scale-105' : 'text-amber-900/80'
                  }`}
                >
                  {stop.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
