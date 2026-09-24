import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Sparkles, Trophy, Star } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

const CARD_ITEMS = [
  { id: 'fox', emoji: '🦊', label: 'Milo Fox' },
  { id: 'rabbit', emoji: '🐰', label: 'Toby Rabbit' },
  { id: 'doll', emoji: '🎀', label: 'Lily Doll' },
  { id: 'rocket', emoji: '🚀', label: 'Rocky Rocket' },
  { id: 'bottle', emoji: '💧', label: 'Buddy Bottle' },
  { id: 'key', emoji: '🗝️', label: 'Magic Key' }
];

export default function MemoryGameModal({ onClose, onGameWon = () => {} }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize deck
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    soundFX.playPop();
    const deck = [...CARD_ITEMS, ...CARD_ITEMS]
      .map((item, index) => ({
        ...item,
        uniqueId: index,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIds.includes(cards[index].id)) {
      return;
    }

    soundFX.playPop();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].id === cards[secondIdx].id) {
        // Match found!
        soundFX.playSparkle();
        const nextMatched = [...matchedIds, cards[firstIdx].id];
        setMatchedIds(nextMatched);
        setFlippedIndices([]);

        if (nextMatched.length === CARD_ITEMS.length) {
          soundFX.playStoryChime();
          setIsWon(true);
          onGameWon();
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/70 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-sky-100 via-indigo-50 to-purple-100 border-4 border-indigo-400 rounded-3xl p-5 md:p-6 w-full max-w-lg shadow-2xl relative flex flex-col gap-4">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-indigo-200 hover:bg-indigo-300 text-indigo-950 font-black flex items-center justify-center shadow-md border-2 border-white cursor-pointer active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-indigo-200 pb-2">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-200 rounded-2xl border border-indigo-300 text-2xl">
              🧩
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-black text-indigo-950 flex items-center gap-1.5">
                <span>Story Character Memory Match</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              </h2>
              <p className="text-xs font-bold text-indigo-800">
                Flip cards to find all twin storybook friends!
              </p>
            </div>
          </div>

          <div className="bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs font-black text-xs text-indigo-950">
            Moves: <span className="text-amber-600">{moves}</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 p-2 bg-white/70 rounded-2xl border-2 border-indigo-200">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx) || matchedIds.includes(card.id);
            const isMatched = matchedIds.includes(card.id);

            return (
              <button
                key={card.uniqueId}
                onClick={() => handleCardClick(idx)}
                className={`h-20 sm:h-24 rounded-2xl border-2 font-black text-3xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-md transform active:scale-95 ${
                  isFlipped
                    ? isMatched
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 scale-102'
                      : 'bg-amber-100 border-amber-400 text-amber-950 rotate-y-180'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-300 text-white hover:bg-indigo-600'
                }`}
              >
                {isFlipped ? (
                  <>
                    <span>{card.emoji}</span>
                    <span className="text-[9px] font-extrabold text-slate-700 mt-1">{card.label}</span>
                  </>
                ) : (
                  <span className="text-xl">🌟</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Win Modal Banner */}
        {isWon && (
          <div className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400 p-4 rounded-2xl border-2 border-amber-500 text-amber-950 text-center flex flex-col items-center gap-2 shadow-lg animate-bounce">
            <Trophy className="w-8 h-8 fill-amber-950" />
            <h3 className="text-lg font-black">Hooray! You Matched All Friends! 🎉</h3>
            <p className="text-xs font-bold">You completed the memory challenge in {moves} moves!</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded-2xl bg-indigo-200 hover:bg-indigo-300 text-indigo-950 font-black text-xs flex items-center gap-1.5 shadow-sm border border-indigo-300 cursor-pointer active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Game</span>
          </button>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-md border-2 border-white cursor-pointer active:scale-95 transition-all"
          >
            Done Playing ✨
          </button>
        </div>

      </div>
    </div>
  );
}
