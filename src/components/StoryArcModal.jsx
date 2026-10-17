import React from 'react';
import { X, Activity, BookOpen, Sparkles, TrendingUp, Compass } from 'lucide-react';
import StoryPlotChart from './StoryPlotChart';
import { soundFX } from '../services/soundEffects';

export default function StoryArcModal({
  isOpen,
  onClose,
  currentScene,
  scenes,
  currentSentenceIndex,
  onSelectSentence,
  onSelectScene
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-4 border-amber-400 rounded-3xl p-4 md:p-6 w-full max-w-4xl shadow-2xl relative flex flex-col gap-4 text-white max-h-[92vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-2xl shadow-md">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 flex items-center gap-2">
                <span>Narrative Arc & Emotional Sentiment Chart</span>
                <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  Interactive Analytics
                </span>
              </h2>
              <p className="text-xs font-semibold text-slate-300">
                Live Freytag's Pyramid & Sentiment Curve mapped directly to your active sentence!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Interactive Story Plot Chart */}
        <div className="w-full">
          <StoryPlotChart
            currentScene={currentScene}
            scenes={scenes}
            currentSentenceIndex={currentSentenceIndex}
            onSelectSentence={onSelectSentence}
            onSelectScene={onSelectScene}
          />
        </div>

        {/* Educational Narrative Architecture Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1 text-slate-200">
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col gap-1">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              1. Exposition
            </span>
            <p className="text-[11px] text-slate-300">
              Introducing protagonists and daily routine (Chapters 1–2).
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col gap-1">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              2. Rising Action
            </span>
            <p className="text-[11px] text-slate-300">
              The unexpected problem, separation, or lonely wait (Chapters 3–5).
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col gap-1">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              3. Climax
            </span>
            <p className="text-[11px] text-slate-300">
              The pivotal discovery, reunion, or bold choice (Chapters 6–7).
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 flex flex-col gap-1">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              4. Resolution
            </span>
            <p className="text-[11px] text-slate-300">
              Care, hydration refill, and moral superpower earned (Chapters 8–10).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-4 h-4" />
            <span>Click any node in the plot curve above to jump to that sentence in the story!</span>
          </span>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer transition-all"
          >
            Close Chart
          </button>
        </div>

      </div>
    </div>
  );
}
