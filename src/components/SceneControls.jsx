import React from 'react';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function SceneControls({
  currentSceneId,
  totalScenes,
  currentSentenceIndex = 0,
  totalSentences = 1,
  isAutoPlayActive = false,
  isPaused = false,
  onNextSentence = () => {},
  onPrevSentence = () => {},
  onNextScene = () => {},
  onPrevScene = () => {},
  onReplayNarration = () => {},
  onToggleAutoPlay = () => {},
  onPauseStory = () => {}
}) {
  const isFirstSentence = currentSentenceIndex === 0;
  const isLastSentence = currentSentenceIndex === totalSentences - 1;
  const isFirstScene = currentSceneId === 1;
  const isLastScene = currentSceneId === totalScenes;

  // Unified Next Handler: steps sentence, or turns page if sentence is at end of scene
  const handleSmartNext = () => {
    soundFX.playPop();
    if (!isLastSentence) {
      onNextSentence();
    } else {
      onNextScene();
    }
  };

  // Unified Prev Handler: steps previous sentence, or goes to previous page
  const handleSmartPrev = () => {
    soundFX.playPop();
    if (!isFirstSentence) {
      onPrevSentence();
    } else {
      onPrevScene();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 select-none w-full font-['Fredoka',sans-serif]">
      {/* 1. Previous Button */}
      <button
        onClick={handleSmartPrev}
        disabled={isFirstScene && isFirstSentence}
        className={`px-3.5 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
          isFirstScene && isFirstSentence
            ? 'bg-orange-50 text-orange-300 border border-orange-200 cursor-not-allowed opacity-50'
            : 'bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 shadow-sm active:scale-95 cursor-pointer'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Prev Line</span>
      </button>

      {/* Center Controls: Play and Dedicated Pause Button Group */}
      <div className="flex items-center gap-2.5">
        {/* Play / Resume Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onToggleAutoPlay();
          }}
          className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${
            isAutoPlayActive && !isPaused
              ? 'bg-emerald-500 text-white border border-emerald-600 ring-2 ring-emerald-300'
              : 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border border-emerald-500'
          }`}
          title="Play / Resume Story Narration"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isAutoPlayActive && !isPaused ? 'Playing...' : isPaused ? 'Resume' : 'Play'}</span>
        </button>

        {/* Dedicated Pause Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onPauseStory();
          }}
          className={`px-4 py-2 rounded-full text-xs md:text-sm font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${
            isPaused
              ? 'bg-amber-400 text-amber-950 border-2 border-amber-600 ring-2 ring-amber-300 shadow-md scale-105'
              : isAutoPlayActive
              ? 'bg-rose-500 hover:bg-rose-600 text-white border-2 border-rose-600 ring-2 ring-rose-300 animate-pulse'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
          }`}
          title="Pause story playback"
        >
          <Pause className="w-4 h-4 fill-current" />
          <span>{isPaused ? 'Paused ⏸' : 'Pause'}</span>
        </button>
      </div>

      {/* 4. Next / Turn Page Button */}
      <button
        onClick={handleSmartNext}
        className="px-4.5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 border border-blue-700 text-xs md:text-sm text-white font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
      >
        <span>{isLastScene && isLastSentence ? 'Finish Story' : isLastSentence ? 'Turn Page' : 'Next Line'}</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
