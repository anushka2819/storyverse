import React, { useState } from 'react';
import { Award, CheckCircle2, X, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../services/soundEffects';

const STORY_QUIZZES = {
  'dolly-midnight-adventure': {
    title: "Dolly's Midnight Adventure Quiz",
    questions: [
      {
        question: "What happens when the house falls asleep at midnight?",
        options: [
          { text: "Lily doll comes alive for a magical quest! 🎀", correct: true },
          { text: "Everyone watches television 📺", correct: false },
          { text: "The dolls stay hidden in the closet 🚪", correct: false }
        ]
      },
      {
        question: "Who helps Lily reach the high shelf?",
        options: [
          { text: "A grumpy monster 👹", correct: false },
          { text: "Teacup Rabbit with a gentle boost! 🐰", correct: true },
          { text: "A gust of wind 🍃", correct: false }
        ]
      },
      {
        question: "What is the heart-warming moral of Lily's story?",
        options: [
          { text: "Always take the biggest cookie 🍪", correct: false },
          { text: "True friends always support each other with love! ❤️", correct: true },
          { text: "Dolls should never go outside 🏠", correct: false }
        ]
      }
    ]
  },
  'secret-cave': {
    title: "The Secret Cave Adventure Quiz",
    questions: [
      {
        question: "Who journeyed into the Whispering Forest?",
        options: [
          { text: "Milo the fox and Toby the rabbit 🦊🐰", correct: true },
          { text: "Three sleepy bears 🐻", correct: false },
          { text: "A wandering pirate 🏴‍☠️", correct: false }
        ]
      },
      {
        question: "What was glowing on the ancient archway?",
        options: [
          { text: "Golden runes and sparkling moss ✨", correct: true },
          { text: "Traffic lights 🚦", correct: false },
          { text: "Neon billboards 💡", correct: false }
        ]
      },
      {
        question: "What superpower helped Milo and Toby solve the maze?",
        options: [
          { text: "Running as fast as possible 🏃", correct: false },
          { text: "Working together and listening carefully 🤝", correct: true },
          { text: "Eating snacks 🍎", correct: false }
        ]
      }
    ]
  },
  'bottle-that-waited': {
    title: "The Bottle That Waited Quiz",
    questions: [
      {
        question: "Where did Aarav leave his blue water bottle?",
        options: [
          { text: "Under the classroom desk 🏫", correct: true },
          { text: "On the playground swings 🛝", correct: false },
          { text: "At the supermarket 🛒", correct: false }
        ]
      },
      {
        question: "How did Buddy the water bottle feel during the quiet night?",
        options: [
          { text: "Patient and hopeful that Aarav would return 💧", correct: true },
          { text: "Very angry and noisy 💥", correct: false },
          { text: "He fell asleep forever 💤", correct: false }
        ]
      },
      {
        question: "What life lesson does Buddy teach us?",
        options: [
          { text: "Take care of the things that take care of you! 💖", correct: true },
          { text: "Water bottles don't need cleaning 🚰", correct: false },
          { text: "Leave your backpack behind 🎒", correct: false }
        ]
      }
    ]
  },
  'curious-rocket': {
    title: "The Curious Little Rocket Quiz",
    questions: [
      {
        question: "What was Rocky the Rocket's biggest dream?",
        options: [
          { text: "To explore the sparkling cosmic nebulae 🚀", correct: true },
          { text: "To stay on the launchpad 🛑", correct: false },
          { text: "To become a race car 🏎️", correct: false }
        ]
      },
      {
        question: "Who helped Rocky navigate past the asteroid cluster?",
        options: [
          { text: "Starry the friendly comet with a glowing tail ☄️", correct: true },
          { text: "A giant space alien 👽", correct: false },
          { text: "A flying submarine 🚤", correct: false }
        ]
      },
      {
        question: "What lesson did Rocky learn in outer space?",
        options: [
          { text: "Bravery means taking small steps even when scared! 🌟", correct: true },
          { text: "Stars are too far away 🪐", correct: false },
          { text: "Comets don't talk 🤐", correct: false }
        ]
      }
    ]
  },
  'bear-lost-pencil': {
    title: "Benny Bear's Lost Pencil Quiz",
    questions: [
      {
        question: "What favorite item did Benny Bear misplace?",
        options: [
          { text: "His bright yellow drawing pencil ✏️", correct: true },
          { text: "His honey jar 🍯", correct: false },
          { text: "His winter scarf 🧣", correct: false }
        ]
      },
      {
        question: "How did Benny's friends help him?",
        options: [
          { text: "They helped him search every corner of the meadow 🌼", correct: true },
          { text: "They laughed and walked away 😢", correct: false },
          { text: "They hid his pencil further 🙈", correct: false }
        ]
      },
      {
        question: "What did Benny do once he found his pencil?",
        options: [
          { text: "Drew a big picture of all his helpers to say thank you! 🎨", correct: true },
          { text: "Threw the pencil in the river 🌊", correct: false },
          { text: "Locked it in a safe 🔒", correct: false }
        ]
      }
    ]
  }
};

export default function StoryQuizModal({ isOpen, onClose, storyId = 'dolly-midnight-adventure', onBadgeEarned = () => { } }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const quiz = STORY_QUIZZES[storyId] || STORY_QUIZZES['dolly-midnight-adventure'];
  const questions = quiz.questions;
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (idx, isCorrect) => {
    if (selectedOption !== null) return; // Prevent double click
    setSelectedOption(idx);

    if (isCorrect) {
      soundFX.playSparkle();
      setScore(prev => prev + 1);
    } else {
      soundFX.playBoing();
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        soundFX.playSuccessFanfare();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        onBadgeEarned('kindness-hero');
      }
    }, 1200);
  };

  const handleRestart = () => {
    soundFX.playPop();
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none font-['Fredoka',sans-serif]">
      <div className="bg-white border-4 border-amber-300 rounded-[2.5rem] w-full max-w-lg p-6 shadow-2xl relative animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!showResult ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-tight">{quiz.title}</h3>
                <span className="text-xs font-bold text-amber-600">Question {currentQIndex + 1} of {questions.length}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-gradient-to-r from-amber-400 to-rose-500 h-full transition-all duration-300"
                style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-4 mb-4">
              <p className="text-sm md:text-base font-black text-amber-950 text-center leading-snug">
                "{currentQ.question}"
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = "bg-white border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700";

                if (selectedOption !== null) {
                  if (opt.correct) {
                    btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300 scale-102";
                  } else if (isSelected && !opt.correct) {
                    btnStyle = "bg-rose-100 border-rose-400 text-rose-950";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx, opt.correct)}
                    className={`w-full p-3.5 rounded-2xl border-2 font-bold text-xs md:text-sm text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOption !== null && opt.correct && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center py-4 flex flex-col items-center gap-3">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">Super Story Explorer!</h3>
            <p className="text-sm font-semibold text-slate-600">
              You scored <span className="font-black text-rose-500 text-base">{score}</span> out of <span className="font-black text-slate-800">{questions.length}</span>!
            </p>

            <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-indigo-100 border-2 border-amber-300 rounded-2xl p-4 my-2 w-full">
              <span className="text-xs font-bold text-amber-900 block">
                ✨ Achievement Unlocked: <strong>Story Comprehension Master!</strong>
              </span>
              <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                You’ve paid great attention to the moral and kindness lessons of this tale.
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-rose-500 text-white font-black text-xs shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Awesome! Continue Reading 📖
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
