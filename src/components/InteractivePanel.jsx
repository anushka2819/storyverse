import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, Search, Heart, Award, ShieldCheck, X } from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { narrator } from '../services/narratorService';

export default function InteractivePanel({
  scene,
  activeStoryId = 'bottle-that-waited',
  selectedQuizAnswer = null,
  waterStep = 0,
  checklistState = {},
  onQuizSelect = () => { },
  onPlayFootstepAudio = () => { },
  onObjectTap = () => { },
  onChecklistToggle = () => { }
}) {
  const [inspectedObject, setInspectedObject] = useState(null);
  const [popupObject, setPopupObject] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  if (!scene) return null;

  const handleItemClick = (obj) => {
    setInspectedObject(obj.id);
    setPopupObject(obj);
    if (obj.soundEffect === 'sparkle') {
      soundFX.playSparkle();
    } else {
      soundFX.playPop();
    }
    onObjectTap(obj.id);
  };

  const handleDeskItemClick = (objId) => {
    const found = scene.objects?.find(o => o.id === objId);
    if (found) {
      handleItemClick(found);
    } else {
      setInspectedObject(objId);
      onObjectTap(objId);
    }
  };

  const getStoryGearTitle = () => {
    switch (activeStoryId) {
      case 'dolly-midnight-adventure':
        return "DOLLY'S MAGICAL GEAR ✨";
      case 'secret-cave':
        return "FOREST EXPLORER GEAR 🌲";
      case 'curious-rocket':
        return "ROCKY'S SPACE GEAR 🚀";
      case 'bear-lost-pencil':
        return "BENNY'S ART GEAR 🎨";
      default:
        return "CLASSROOM DESK EXPLORER 🏫";
    }
  };

  return (
    <div className="w-full my-1 select-none font-['Fredoka',sans-serif]">

      {/* SCENE 1: Explore Classroom Desk Grid */}
      {scene.id === 1 && (
        <div className="flex flex-col gap-3">
          
          {/* Explorer Header */}
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-800 text-emerald-50 p-1.5 rounded-full">
                <Search className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <p className="text-[13px] font-bold text-emerald-900 leading-tight">
                  {getStoryGearTitle()}
                </p>
                <p className="text-[10px] font-semibold text-emerald-700">
                  {scene.instruction || "Tap any item to see it pop up!"}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Tap to Inspect ✨
            </span>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {(scene.objects || []).map((obj, idx) => {
              const bgColors = ['bg-sky-100 border-sky-200', 'bg-pink-100 border-pink-200', 'bg-amber-100 border-amber-200', 'bg-indigo-100 border-indigo-200'];
              const hoverColors = ['hover:bg-sky-200', 'hover:bg-pink-200', 'hover:bg-amber-200', 'hover:bg-indigo-200'];
              const textColors = ['text-sky-900', 'text-pink-900', 'text-amber-900', 'text-indigo-900'];
              
              return (
                <button
                  key={obj.id}
                  onClick={() => handleItemClick(obj)}
                  className={`p-3 border-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 group cursor-pointer ${bgColors[idx % 4]} ${hoverColors[idx % 4]} ${
                    inspectedObject === obj.id ? 'ring-2 ring-slate-400 scale-105' : ''
                  }`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform mb-1">{obj.icon}</span>
                  <span className={`text-[10px] font-black uppercase tracking-wide text-center leading-tight ${textColors[idx % 4]}`}>{obj.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* BOTTLE-THAT-WAITED SPECIFIC CHAPTER QUESTS (Never shown for other stories) */}
      {activeStoryId === 'bottle-that-waited' && (
        <>
          {/* SCENE 2: Search Quest — Find the Forgotten Item */}
          {scene.id === 2 && (
        <div className="bg-gradient-to-r from-amber-100/90 to-orange-100/80 border-2 border-amber-300 p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-md">
          <p className="text-xs md:text-sm font-bold text-amber-950 flex items-center gap-1.5 font-cinzel">
            <span>🔎 Explorer Quest:</span>
            <span className="font-semibold text-amber-900 font-reading">What was left behind on the classroom desk?</span>
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'pencil', label: '✏️ Pencil', isCorrect: false },
              { id: 'lunchbox', label: '🍱 Lunchbox', isCorrect: false },
              { id: 'bottle', label: '💧 Blue Bottle', isCorrect: true }
            ].map((ans) => {
              const isSelected = selectedQuizAnswer === ans.id;
              return (
                <button
                  key={ans.id}
                  onClick={() => onQuizSelect(ans)}
                  className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all active:scale-95 flex flex-col items-center gap-1 ${isSelected
                      ? ans.isCorrect
                        ? 'bg-emerald-200 border-emerald-600 text-emerald-950 shadow-md scale-105'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-[#fffdf8] border-amber-300 hover:bg-amber-200/60 text-amber-950 shadow-sm'
                    }`}
                >
                  <span className="text-sm font-serif">{ans.label}</span>
                </button>
              );
            })}
          </div>

          {selectedQuizAnswer && (
            <div className="bg-amber-200/90 border border-amber-400 p-2 rounded-xl text-center text-xs font-bold text-amber-950">
              {selectedQuizAnswer === 'bottle'
                ? '✨ Sparkle! You found it! The little blue bottle was left behind on the desk!'
                : 'Not that item! Look closely at the desk.'}
            </div>
          )}
        </div>
      )}

      {/* SCENE 3: Quiet Room Inspection */}
      {scene.id === 3 && (
        <div className="bg-gradient-to-r from-amber-100/80 to-indigo-100/70 border-2 border-amber-300 p-3.5 rounded-2xl flex flex-col gap-2 shadow-md">
          <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5 font-cinzel">
            <span>🕒 Quiet Moments: Tap objects to listen to the quiet classroom</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'chair', icon: '🪑', label: 'Empty Chair' },
              { id: 'clock', icon: '🕒', label: 'Ticking Clock' },
              { id: 'door', icon: '🚪', label: 'Quiet Door' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onObjectTap(item.id)}
                className="p-2 bg-[#fffdf8] hover:bg-indigo-100 border-2 border-indigo-200/80 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-bold text-amber-950 font-cinzel">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SCENE 4: Emotion Reflection Quiz */}
      {scene.id === 4 && (
        <div className="bg-gradient-to-r from-amber-100/90 to-yellow-100/80 border-2 border-amber-300 p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-md">
          <p className="text-xs md:text-sm font-bold text-amber-950 flex items-center gap-1.5 font-cinzel">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
            <span>Story Reflection: How does Buddy Bottle feel sitting alone on the desk?</span>
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'lonely', label: '😢 Lonely', isCorrect: true },
              { id: 'sleepy', label: '😴 Sleepy', isCorrect: false },
              { id: 'excited', label: '🚀 Excited', isCorrect: false }
            ].map((ans) => {
              const isSelected = selectedQuizAnswer === ans.id;
              return (
                <button
                  key={ans.id}
                  onClick={() => onQuizSelect(ans)}
                  className={`p-2 rounded-xl border-2 font-bold text-xs transition-all active:scale-95 flex flex-col items-center gap-1 ${isSelected
                      ? ans.isCorrect
                        ? 'bg-emerald-200 border-emerald-600 text-emerald-950 shadow-md scale-105'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-[#fffdf8] border-amber-300 hover:bg-amber-200/60 text-amber-950 shadow-sm'
                    }`}
                >
                  <span className="text-sm font-serif">{ans.label}</span>
                </button>
              );
            })}
          </div>

          {selectedQuizAnswer && (
            <div className="bg-amber-200/90 border border-amber-400 p-2 rounded-xl text-center text-xs font-bold text-amber-950">
              {selectedQuizAnswer === 'lonely'
                ? '✨ Correct! Buddy Bottle missed Aarav so much.'
                : 'Try again! Think about how you feel when left behind.'}
            </div>
          )}
        </div>
      )}

      {/* SCENE 5: Listen to Footsteps Button */}
      {scene.id === 5 && (
        <div className="bg-gradient-to-r from-purple-100/90 to-indigo-100/80 border-2 border-purple-300 p-3.5 rounded-2xl flex flex-col items-center gap-2 text-center shadow-md">
          <p className="text-xs font-bold text-purple-950 font-reading">
            👂 Can you hear someone walking down the quiet school hallway?
          </p>
          <button
            onClick={onPlayFootstepAudio}
            className="bg-purple-200 hover:bg-purple-300 border-2 border-purple-400 px-5 py-2 rounded-xl text-xs font-bold text-purple-950 flex items-center gap-2 shadow-md active:scale-95 font-cinzel"
          >
            <Volume2 className="w-4.5 h-4.5 text-purple-900 animate-pulse" />
            <span>Listen to Approaching Footsteps 👣</span>
          </button>
        </div>
      )}

      {/* SCENE 6: Warm Memory Collector */}
      {scene.id === 6 && (
        <div className="bg-gradient-to-r from-amber-100/90 to-sky-100/80 border-2 border-amber-300 p-3.5 rounded-2xl flex flex-col gap-2 shadow-md">
          <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5 font-cinzel">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Memory Collector: Tap to recall happy memories while waiting!</span>
          </p>

          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'memory', icon: '💙', label: 'Thank-You' },
              { id: 'sunlight', icon: '🌞', label: 'Warm Sun' },
              { id: 'chair', icon: '🪑', label: 'Peaceful' },
              { id: 'rocket', icon: '🚀', label: 'Rocket Hope' }
            ].map((mem) => (
              <button
                key={mem.id}
                onClick={() => onObjectTap(mem.id)}
                className="p-2 bg-[#fffdf8] hover:bg-sky-100 border-2 border-sky-300/80 rounded-xl flex flex-col items-center gap-1 shadow-sm active:scale-95"
              >
                <span className="text-xl">{mem.icon}</span>
                <span className="text-[10px] font-bold text-amber-950 font-cinzel">{mem.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SCENE 7: Reunion Quest */}
      {scene.id === 7 && (
        <div className="bg-gradient-to-r from-amber-100/90 to-emerald-100/80 border-2 border-amber-300 p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-md">
          <p className="text-xs md:text-sm font-bold text-amber-950 flex items-center gap-1.5 font-cinzel">
            <span>🔎 Story Quest:</span>
            <span className="font-semibold text-amber-900 font-reading">Where did Aarav find his little blue bottle?</span>
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'desk', label: '📦 Under Desk', isCorrect: true },
              { id: 'shelf', label: '📚 On Shelf', isCorrect: false },
              { id: 'bag', label: '🎒 In Backpack', isCorrect: false }
            ].map((ans) => {
              const isSelected = selectedQuizAnswer === ans.id;
              return (
                <button
                  key={ans.id}
                  onClick={() => onQuizSelect(ans)}
                  className={`p-2 rounded-xl border-2 font-bold text-xs transition-all active:scale-95 flex flex-col items-center gap-1 ${isSelected
                      ? ans.isCorrect
                        ? 'bg-emerald-200 border-emerald-600 text-emerald-950 shadow-md scale-105'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-[#fffdf8] border-amber-300 hover:bg-amber-200/60 text-amber-950 shadow-sm'
                    }`}
                >
                  <span className="text-sm font-serif">{ans.label}</span>
                </button>
              );
            })}
          </div>

          {selectedQuizAnswer && (
            <div className="bg-amber-200/90 border border-amber-400 p-2 rounded-xl text-center text-xs font-bold text-amber-950">
              {selectedQuizAnswer === 'desk'
                ? '🎉 Hurray! Aarav found Buddy Bottle resting inside his desk cubby!'
                : 'Not quite! Check under Aarav\'s desk.'}
            </div>
          )}
        </div>
      )}

      {/* SCENE 8: Interactive Water Station Guide */}
      {scene.id === 8 && (
        <div className="bg-gradient-to-r from-sky-100 to-teal-100 border-2 border-sky-300 p-3.5 rounded-2xl flex flex-col gap-2 shadow-md">
          <p className="text-xs font-bold text-sky-950 flex items-center gap-1.5 font-cinzel">
            <span>🚰 Water Refill Challenge:</span>
            <span className="font-semibold text-sky-900 font-reading">Tap the tap, fill the bottle, then close the cap!</span>
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { step: 1, label: '1. Tap Water Tap 🚰' },
              { step: 2, label: '2. Fill Bottle 💧' },
              { step: 3, label: '3. Close Cap 🧢' }
            ].map((st) => {
              const isDone = waterStep >= st.step;
              return (
                <div
                  key={st.step}
                  className={`p-2 rounded-xl border-2 text-center text-xs font-bold transition-all ${isDone
                      ? 'bg-sky-200 border-sky-500 text-sky-950 shadow-sm scale-105'
                      : 'bg-white border-slate-200 text-slate-500 opacity-60'
                    }`}
                >
                  <span className="font-serif">{st.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SCENE 9: Leaving Classroom Checklist */}
      {scene.id === 9 && (
        <div className="bg-gradient-to-r from-emerald-100/90 to-teal-100/80 border-2 border-emerald-300 p-3.5 rounded-2xl flex flex-col gap-2 shadow-md">
          <p className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 font-cinzel">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-700" />
            <span>Leaving Classroom Checklist: Check off items before heading home!</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'books', label: '📚 Books in Schoolbag' },
              { id: 'pencil', label: '✏️ Pencil in Pencil Case' },
              { id: 'lunchbox', label: '🍱 Lunchbox Packed' },
              { id: 'bottle', label: '💧 Water Bottle Packed!' }
            ].map((chk) => {
              const isChecked = checklistState[chk.id];
              return (
                <button
                  key={chk.id}
                  onClick={() => onChecklistToggle(chk.id)}
                  className={`p-2 rounded-xl border-2 text-xs font-bold flex items-center gap-2 transition-all ${isChecked
                      ? 'bg-emerald-200 border-emerald-600 text-emerald-950 shadow-sm'
                      : 'bg-[#fffdf8] border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                    }`}
                >
                  <span className="text-sm">{isChecked ? '✅' : '⬜'}</span>
                  <span className="font-serif">{chk.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SCENE 10: Care Reflection Quiz */}
      {scene.id === 10 && (
        <div className="bg-gradient-to-r from-amber-100/90 to-yellow-100/80 border-2 border-amber-300 p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-md">
          <p className="text-xs md:text-sm font-bold text-amber-950 flex items-center gap-1.5 font-cinzel">
            <Award className="w-4.5 h-4.5 text-amber-700" />
            <span>💙 Care Champion Promise: Choose one thing you will take care of today!</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'bottle', label: '💧 Water Bottle (Clean & Refill)' },
              { id: 'books', label: '📚 Books (Turn Pages Gently)' },
              { id: 'toy', label: '🧸 Favorite Toy (Put Away Safely)' },
              { id: 'bag', label: '🎒 Schoolbag (Keep Organized)' }
            ].map((ans) => {
              const isSelected = selectedQuizAnswer === ans.id;
              return (
                <button
                  key={ans.id}
                  onClick={() => onQuizSelect(ans)}
                  className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 ${isSelected
                      ? 'bg-emerald-200 border-emerald-600 text-emerald-950 shadow-md scale-105'
                      : 'bg-[#fffdf8] border-amber-300 hover:bg-amber-200/60 text-amber-950 shadow-sm'
                    }`}
                >
                  <span className="text-xs font-serif">{ans.label}</span>
                </button>
              );
            })}
          </div>

          {selectedQuizAnswer && (
            <div className="bg-emerald-100 border border-emerald-400 p-2 rounded-xl text-center text-xs font-bold text-emerald-950 flex items-center justify-center gap-1.5 font-reading">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Great choice! 💛 One small act of care makes a big difference! 🚀💙</span>
            </div>
          )}
        </div>
      )}
      </>
      )}

      {/* GENERIC CHOICE / QUIZ CARD (Works for each story!) */}
      {scene.quiz && (
        <div className="bg-gradient-to-r from-amber-100/95 via-orange-100/90 to-amber-100/95 border-3 border-amber-400 p-3.5 rounded-2xl flex flex-col gap-2.5 shadow-lg my-1">
          <p className="text-xs md:text-sm font-bold text-amber-950 flex items-center gap-1.5 font-['Fredoka',sans-serif]">
            <Sparkles className="w-4.5 h-4.5 text-amber-700 animate-spin" />
            <span>{scene.quiz.question}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scene.quiz.options.map((opt) => {
              const isSelected = selectedQuizAnswer === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onQuizSelect(opt)}
                  className={`p-3 rounded-xl border-2 font-bold text-xs md:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm ${isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-200 border-emerald-600 text-emerald-950 shadow-md scale-105 ring-2 ring-emerald-400'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-[#fffdf8] hover:bg-amber-200/80 border-amber-300 text-amber-950'
                    }`}
                >
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {selectedQuizAnswer && (
            <div className="bg-white/90 border border-amber-400 p-2.5 rounded-xl text-center text-xs font-bold text-amber-950 shadow-inner">
              {scene.quiz.options.find(o => o.id === selectedQuizAnswer)?.feedback || '✨ Great choice!'}
            </div>
          )}
        </div>
      )}

      {/* OBJECT EXPLORER (For scenes with clickable items belonging to this story) */}
      {scene.objects && scene.id !== 1 && activeStoryId !== 'bottle-that-waited' && (
        <div className="bg-gradient-to-r from-amber-100/90 to-sky-100/80 border-2 border-amber-300 p-2.5 rounded-2xl flex flex-col gap-2 shadow-md my-1">
          <p className="text-xs font-bold text-amber-950 flex items-center gap-1.5 font-['Fredoka',sans-serif]">
            <Search className="w-4 h-4 text-amber-700 animate-bounce" />
            <span>{scene.instruction || 'Tap an item to inspect!'}</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scene.objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => handleItemClick(obj)}
                className={`p-2 border-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 group cursor-pointer ${inspectedObject === obj.id
                    ? 'bg-amber-200 border-amber-500 scale-105 ring-2 ring-amber-400/50'
                    : 'bg-[#fffdf8] hover:bg-amber-200/80 border-amber-300/80'
                  }`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{obj.icon}</span>
                <span className="text-xs font-bold text-amber-950 font-['Fredoka',sans-serif]">{obj.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAGICAL ITEM POPUP MODAL */}
      {popupObject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => {
            soundFX.playPop();
            setPopupObject(null);
          }}
        >
          <div 
            className="bg-gradient-to-b from-amber-50 via-white to-sky-50 border-4 border-amber-400 rounded-3xl p-5 md:p-6 max-w-sm w-full shadow-2xl relative flex flex-col items-center text-center gap-3 animate-scaleUp text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                soundFX.playPop();
                setPopupObject(null);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 text-amber-950 flex items-center justify-center font-bold border border-amber-300 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Big Animated Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-200 via-pink-100 to-sky-200 flex items-center justify-center text-5xl shadow-md border-2 border-amber-300 animate-bounce mt-1">
              {popupObject.icon}
            </div>

            {/* Title / Name */}
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                {popupObject.name}
              </h3>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200 mt-1 inline-block">
                ✨ Story Item Discovered!
              </span>
            </div>

            {/* Character Dialogue Speech Bubble */}
            {popupObject.dialogue && (
              <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-3 w-full shadow-xs relative text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block mb-0.5 flex items-center gap-1">
                  <span>💬</span>
                  <span>{popupObject.name} says:</span>
                </span>
                <p className="text-xs md:text-sm font-black text-amber-950 leading-snug">
                  {popupObject.dialogue}
                </p>
              </div>
            )}

            {/* Narrator Explanation */}
            {popupObject.narratorReply && (
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-2.5 w-full text-slate-700 text-xs font-semibold leading-relaxed text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 block mb-0.5">
                  📖 Story Note:
                </span>
                <p>{popupObject.narratorReply}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full pt-1">
              <button
                onClick={() => {
                  soundFX.playPop();
                  const speakText = `${popupObject.name}. ${popupObject.dialogue ? popupObject.dialogue.replace(/["“”]/g, '') : ''} ${popupObject.narratorReply || ''}`;
                  narrator.speak(speakText, 'NARRATOR');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Read Aloud 🔊</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playSparkle();
                  setPopupObject(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-black text-xs flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <span>Awesome! ✨</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

