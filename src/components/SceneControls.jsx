import React from 'react';
import { ArrowLeft, ArrowRight, Volume2, Play, Pause } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function SceneControls({
  currentSceneId,
  totalScenes,
  currentSentenceIndex = 0,
  totalSentences = 1,
  isAutoPlayActive = false,
  onNextSentence = () => {},
  onPrevSentence = () => {},
  onNextScene = () => {},
  onPrevScene = () => {},
  onReplayNarration = () => {},
  onToggleAutoPlay = () => {}
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
    <div className="flex items-center justify-between gap-2.5 pt-2 border-t-2 border-amber-300/60 select-none w-full font-['Fredoka',sans-serif]">
      {/* 1. Previous Button */}
      <button
        onClick={handleSmartPrev}
        disabled={isFirstScene && isFirstSentence}
        className={`px-3.5 py-2.5 rounded-2xl text-xs md:text-sm font-black flex items-center gap-1.5 transition-all ${
          isFirstScene && isFirstSentence
            ? 'bg-amber-100/40 text-amber-400 border border-amber-200/50 cursor-not-allowed opacity-50'
            : 'bg-white hover:bg-amber-100 text-amber-950 border-2 border-amber-300 shadow-md active:scale-95 cursor-pointer'
        }`}
      >
        <ArrowLeft className="w-4 h-4 text-amber-800" />
        <span>Prev Line</span>
      </button>

      {/* 2. Read Aloud Button */}
      <button
        onClick={() => {
          soundFX.playPop();
          onReplayNarration();
        }}
        className="px-3 py-2.5 rounded-2xl bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 text-sky-950 font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        title="Read Out Loud"
      >
        <Volume2 className="w-4 h-4 text-sky-700" />
        <span className="hidden sm:inline">Read Aloud</span>
      </button>

      {/* 3. Storyteller Auto-Play Mode Button */}
      <button
        onClick={() => {
          soundFX.playPop();
          onToggleAutoPlay();
        }}
        className={`px-3 py-2.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer ${
          isAutoPlayActive
            ? 'bg-amber-400 text-amber-950 border-2 border-amber-600 ring-2 ring-amber-300 animate-pulse'
            : 'bg-amber-200 hover:bg-amber-300 text-amber-950 border-2 border-amber-400'
        }`}
        title="Toggle Hands-Free Storyteller Mode"
      >
        {isAutoPlayActive ? <Pause className="w-4 h-4 text-amber-950 fill-amber-950" /> : <Play className="w-4 h-4 text-amber-950 fill-amber-950" />}
        <span>{isAutoPlayActive ? 'Playing...' : '▶ Auto-Play'}</span>
      </button>

      {/* 4. Next / Turn Page Button */}
      <button
        onClick={handleSmartNext}
        className="btn-game-emerald px-5 py-2.5 rounded-2xl text-xs md:text-sm text-white font-black flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
      >
        <span>{isLastScene && isLastSentence ? 'Finish Story 🚀' : isLastSentence ? 'Turn Page 📖' : 'Next Line ➔'}</span>
        <ArrowRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}

