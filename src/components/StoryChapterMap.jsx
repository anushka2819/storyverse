import React from 'react';
import { BookOpen, Heart, Sparkles, Droplet } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';

export default function StoryChapterMap({
  currentScene,
  scenes = STORY_SCENES,
  activeStoryId = 'bottle-that-waited',
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

  const renderStoryMetric = () => {
    switch (activeStoryId) {
      case 'dolly-midnight-adventure':
        return (
          <>
            <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span className="text-[10px] font-bold text-pink-900">{plotData.emotionScore || 95}% Magic</span>
          </>
        );
      case 'secret-cave':
        return (
          <>
            <span className="text-xs">🤝</span>
            <span className="text-[10px] font-bold text-emerald-900">{plotData.emotionScore || 95}% Bond</span>
          </>
        );
      case 'curious-rocket':
        return (
          <>
            <span className="text-xs">🚀</span>
            <span className="text-[10px] font-bold text-rose-900">{plotData.emotionScore || 95}% Power</span>
          </>
        );
      case 'bear-lost-pencil':
        return (
          <>
            <span className="text-xs">🎨</span>
            <span className="text-[10px] font-bold text-amber-900">{plotData.emotionScore || 95}% Art</span>
          </>
        );
      default:
        return (
          <>
            <Droplet className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
            <span className="text-[10px] font-bold text-sky-900">{plotData.hydrationLevel || 80}% Water</span>
          </>
        );
    }
  };

  return (
    <div className="bg-white/95 border-3 border-sky-300 rounded-2xl p-2 md:p-3 text-slate-800 shadow-md relative overflow-hidden select-none font-['Fredoka',sans-serif]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5 border-b border-amber-200 pb-1.5">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-amber-700 animate-pulse" />
          <h3 className="text-xs md:text-sm font-bold text-amber-950 flex items-center gap-1.5 font-sans">
            <span>Storybook Chapter Trail</span>
            <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
              Chapter {currentScene.id} of {scenes.length}
            </span>
          </h3>
        </div>

        {/* Storybook Hearts & Story Specific Metric Meter */}
        <div className="flex items-center gap-3 bg-white/90 px-2.5 py-1 rounded-xl border border-amber-300 shadow-xs">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-amber-900 mr-1">Happiness:</span>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-3.5 h-3.5 transition-all ${
                  idx < heartCount ? 'text-rose-500 fill-rose-500 scale-110' : 'text-slate-300 fill-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 border-l border-amber-200 pl-2.5">
            {renderStoryMetric()}
          </div>
        </div>
      </div>

      {/* CHAPTER TRAIL NODES */}
      <div className="relative w-full overflow-x-auto py-1 scrollbar-none">
        <div className="flex items-center justify-between min-w-[580px] px-3 relative">
          
          {/* Connecting Ribbon Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-amber-200 rounded-full border border-amber-300 -z-0" />

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
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-[9px] px-1.5 py-0.2 rounded-full border border-amber-600 shadow-sm animate-bounce flex items-center gap-0.5">
                    <span>📖 HERE</span>
                  </div>
                )}

                {/* Chapter Node */}
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-xl border-2 flex items-center justify-center text-lg md:text-xl transition-all ${
                    isActive
                      ? 'bg-amber-300 border-amber-600 ring-3 ring-amber-300 scale-110 shadow-sm'
                      : isCompleted
                      ? 'bg-amber-100 border-amber-400 shadow-xs'
                      : 'bg-white border-amber-200 group-hover:border-amber-400 group-hover:scale-105'
                  }`}
                >
                  <span>{stop.icon}</span>
                </div>

                {/* Chapter Name */}
                <span
                  className={`text-[10px] font-bold mt-1 text-center max-w-[65px] leading-tight ${
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
