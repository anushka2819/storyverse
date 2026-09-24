import React from 'react';
import { Volume2, X, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { narrator } from '../services/narratorService';
import { WORD_MAGIC_DICTIONARY } from '../data/wordMagicData';

export default function WordMagicModal({ wordKey, onClose, onWordLearned = () => {} }) {
  if (!wordKey) return null;

  const data = WORD_MAGIC_DICTIONARY[wordKey.toLowerCase()] || {
    word: wordKey,
    phonics: wordKey,
    emoji: "⭐",
    category: "Story Word",
    definition: "A wonderful new word from your storybook adventure!",
    example: `Look at the word "${wordKey}" in your story!`,
    funFact: "Every new word you learn makes your imagination grow bigger!"
  };

  const handleSpeakWord = () => {
    soundFX.playPop();
    onWordLearned(data.word);
    narrator.speak(`${data.word}. ${data.phonics}. ${data.definition}`, 'NARRATOR');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-amber-50 via-sky-50 to-indigo-50 border-4 border-amber-400 rounded-3xl p-5 md:p-6 w-full max-w-md shadow-2xl relative flex flex-col gap-4 animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onClose();
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 font-black flex items-center justify-center shadow-md border-2 border-white cursor-pointer active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-amber-500 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
            <span>Word Magic Explorer</span>
          </span>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200">
            {data.category}
          </span>
        </div>

        {/* Word Display Card */}
        <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 bg-amber-100 rounded-2xl border border-amber-200 shadow-xs">
              {data.emoji}
            </span>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                {data.word}
              </h3>
              <p className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                🗣️ Phonics: <span className="text-indigo-800 font-extrabold">{data.phonics}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleSpeakWord}
            className="p-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-2xl shadow-md border-2 border-white flex items-center justify-center active:scale-90 transition-all cursor-pointer"
            title="Listen to Word Pronunciation"
          >
            <Volume2 className="w-6 h-6 fill-emerald-950" />
          </button>
        </div>

        {/* Definition Block */}
        <div className="bg-amber-100/70 p-3.5 rounded-2xl border border-amber-300/80 flex items-start gap-2.5">
          <BookOpen className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black text-amber-950 block">Meaning:</span>
            <p className="text-xs md:text-sm font-medium text-amber-900 leading-snug">
              {data.definition}
            </p>
          </div>
        </div>

        {/* Example Sentence */}
        <div className="bg-sky-100/80 p-3.5 rounded-2xl border border-sky-300/80 flex items-start gap-2.5">
          <span className="text-lg shrink-0">📖</span>
          <div>
            <span className="text-xs font-black text-sky-950 block">In the story:</span>
            <p className="text-xs font-medium text-sky-900 italic">
              "{data.example}"
            </p>
          </div>
        </div>

        {/* Fun Did-You-Know Fact */}
        <div className="bg-purple-100/80 p-3 rounded-2xl border border-purple-300/80 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-black text-purple-950 block">Fun Fact:</span>
            <p className="text-[11px] font-medium text-purple-900 leading-snug">
              {data.funFact}
            </p>
          </div>
        </div>

        {/* Got it Button */}
        <button
          onClick={() => {
            soundFX.playSparkle();
            onWordLearned(data.word);
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-md border-2 border-white active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
        >
          <span>✨ Learned It! (Add to My Magic Words)</span>
        </button>
      </div>
    </div>
  );
}
