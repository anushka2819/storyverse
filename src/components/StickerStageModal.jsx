import React, { useState, useRef } from 'react';
import { X, Play, RotateCw, Trash2, Plus, Sparkles, Download, MessageSquare, FlipHorizontal, Maximize2, Minimize2, Move } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../services/soundEffects';

const STAGE_BACKDROPS = [
  { id: 'bedroom', name: 'Midnight Bedroom 🛏️', bg: 'bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 border-indigo-500' },
  { id: 'forest', name: 'Whispering Woods 🌲', bg: 'bg-gradient-to-b from-emerald-900 via-teal-950 to-emerald-950 border-emerald-500' },
  { id: 'space', name: 'Cosmic Galaxy 🚀', bg: 'bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 border-purple-500' },
  { id: 'classroom', name: 'Classroom & Board 🏫', bg: 'bg-gradient-to-b from-amber-900 via-amber-950 to-yellow-950 border-amber-600' },
  { id: 'cloud', name: 'Rainbow Cloud Castle 🏰', bg: 'bg-gradient-to-b from-sky-400 via-pink-300 to-amber-200 border-sky-400' },
  { id: 'ocean', name: 'Coral Ocean Cove 🌊', bg: 'bg-gradient-to-b from-cyan-600 via-teal-800 to-blue-950 border-cyan-400' }
];

const PUPPET_CATALOG = [
  { id: 'dolly', name: 'Dolly Doll', emoji: '🎀', type: 'character' },
  { id: 'benny', name: 'Benny Bear', emoji: '🐻', type: 'character' },
  { id: 'bottle', name: 'Buddy Bottle', emoji: '💧', type: 'character' },
  { id: 'aarav', name: 'Explorer Aarav', emoji: '👦', type: 'character' },
  { id: 'toby', name: 'Toby Rabbit', emoji: '🐰', type: 'character' },
  { id: 'milo', name: 'Milo Fox', emoji: '🦊', type: 'character' },
  { id: 'rocky', name: 'Rocky Rocket', emoji: '🚀', type: 'character' },
  { id: 'dragon', name: 'Sparky Dragon', emoji: '🐲', type: 'character' },
  { id: 'star', name: 'Lucky Star', emoji: '⭐', type: 'prop' },
  { id: 'flower', name: 'Magic Flower', emoji: '🌸', type: 'prop' },
  { id: 'rainbow', name: 'Rainbow Arc', emoji: '🌈', type: 'prop' },
  { id: 'balloon', name: 'Party Balloon', emoji: '🎈', type: 'prop' },
  { id: 'speech', name: 'Speech Bubble', emoji: '💬', type: 'bubble', defaultText: 'Hello Friends! ✨' }
];

export default function StickerStageModal({ isOpen, onClose, storyId = null, onBadgeEarned }) {
  const getInitialSetup = (sId) => {
    switch (sId) {
      case 'dolly-midnight-adventure':
        return {
          backdrop: STAGE_BACKDROPS.find(b => b.id === 'bedroom') || STAGE_BACKDROPS[0],
          puppets: [
            { instanceId: 1, id: 'dolly', emoji: '🎀', name: 'Lily Doll', x: 30, y: 55, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 2, id: 'toby', emoji: '🐰', name: 'Teacup Bunny', x: 65, y: 58, scale: 1.1, flipped: true, isDancing: false },
            { instanceId: 3, id: 'speech', emoji: '💬', name: 'Speech', x: 40, y: 22, scale: 1, flipped: false, isDancing: false, text: "Time for Adventure Night! ✨" }
          ]
        };
      case 'secret-cave':
        return {
          backdrop: STAGE_BACKDROPS.find(b => b.id === 'forest') || STAGE_BACKDROPS[1],
          puppets: [
            { instanceId: 1, id: 'milo', emoji: '🦊', name: 'Milo Fox', x: 30, y: 55, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 2, id: 'toby', emoji: '🐰', name: 'Toby Rabbit', x: 65, y: 58, scale: 1.1, flipped: true, isDancing: false },
            { instanceId: 3, id: 'speech', emoji: '💬', name: 'Speech', x: 42, y: 22, scale: 1, flipped: false, isDancing: false, text: "True friends explore together! 🌲" }
          ]
        };
      case 'curious-rocket':
        return {
          backdrop: STAGE_BACKDROPS.find(b => b.id === 'space') || STAGE_BACKDROPS[2],
          puppets: [
            { instanceId: 1, id: 'rocky', emoji: '🚀', name: 'Rocky Rocket', x: 32, y: 52, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 2, id: 'star', emoji: '⭐', name: 'Lucky Star', x: 68, y: 45, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 3, id: 'speech', emoji: '💬', name: 'Speech', x: 40, y: 22, scale: 1, flipped: false, isDancing: false, text: "3, 2, 1... Blast off! 🚀⭐" }
          ]
        };
      case 'bear-lost-pencil':
        return {
          backdrop: STAGE_BACKDROPS.find(b => b.id === 'forest') || STAGE_BACKDROPS[1],
          puppets: [
            { instanceId: 1, id: 'benny', emoji: '🐻', name: 'Benny Bear', x: 32, y: 55, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 2, id: 'rainbow', emoji: '🌈', name: 'Rainbow Arc', x: 68, y: 48, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 3, id: 'speech', emoji: '💬', name: 'Speech', x: 40, y: 22, scale: 1, flipped: false, isDancing: false, text: "Let's draw rainbow doodles! 🎨" }
          ]
        };
      default:
        return {
          backdrop: STAGE_BACKDROPS.find(b => b.id === 'classroom') || STAGE_BACKDROPS[3],
          puppets: [
            { instanceId: 1, id: 'bottle', emoji: '💧', name: 'Buddy Bottle', x: 32, y: 55, scale: 1.2, flipped: false, isDancing: false },
            { instanceId: 2, id: 'aarav', emoji: '👦', name: 'Aarav', x: 65, y: 58, scale: 1.2, flipped: true, isDancing: false },
            { instanceId: 3, id: 'speech', emoji: '💬', name: 'Speech', x: 42, y: 22, scale: 1, flipped: false, isDancing: false, text: "Take care of everyday helpers! 💧" }
          ]
        };
    }
  };

  const initialSetup = getInitialSetup(storyId);
  const [selectedBackdrop, setSelectedBackdrop] = useState(initialSetup.backdrop);
  const [stagePuppets, setStagePuppets] = useState(initialSetup.puppets);
  const [selectedPuppetId, setSelectedPuppetId] = useState(1);
  const [isPlayingShow, setIsPlayingShow] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    const setup = getInitialSetup(storyId);
    setSelectedBackdrop(setup.backdrop);
    setStagePuppets(setup.puppets);
    setSelectedPuppetId(1);
  }, [storyId]);

  if (!isOpen) return null;

  const handleAddPuppet = (puppet) => {
    soundFX.playPop();
    const newPuppet = {
      instanceId: Date.now(),
      id: puppet.id,
      emoji: puppet.emoji,
      name: puppet.name,
      x: 35 + Math.random() * 25,
      y: 45 + Math.random() * 20,
      scale: 1.1,
      flipped: false,
      isDancing: false,
      text: puppet.defaultText || undefined
    };
    setStagePuppets(prev => [...prev, newPuppet]);
    setSelectedPuppetId(newPuppet.instanceId);
  };

  const selectedPuppet = stagePuppets.find(p => p.instanceId === selectedPuppetId);

  const updateSelectedPuppet = (updater) => {
    setStagePuppets(prev => prev.map(p => {
      if (p.instanceId === selectedPuppetId) {
        return updater(p);
      }
      return p;
    }));
  };

  const handleActionShow = () => {
    soundFX.playSuccessFanfare();
    setIsPlayingShow(true);

    // Make all puppets dance
    setStagePuppets(prev => prev.map(p => ({ ...p, isDancing: true })));

    // Fire confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (onBadgeEarned) {
      onBadgeEarned('puppet-master');
    }

    setTimeout(() => {
      setIsPlayingShow(false);
      setStagePuppets(prev => prev.map(p => ({ ...p, isDancing: false })));
    }, 3500);
  };

  const handleStageClick = (e) => {
    if (!stageRef.current || !selectedPuppet) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Reposition selected puppet to clicked spot
    updateSelectedPuppet(p => ({ ...p, x: Math.max(10, Math.min(90, clickX)), y: Math.max(10, Math.min(85, clickY)) }));
    soundFX.playPop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100 border-4 border-amber-500 rounded-3xl p-4 md:p-6 w-full max-w-5xl shadow-2xl relative flex flex-col gap-3.5 max-h-[95vh] overflow-y-auto">

        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-amber-300 pb-2">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl p-1.5 bg-amber-400 rounded-2xl shadow-sm">🎭</span>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-950 flex items-center gap-2">
                <span>Story Puppet Theater & Sticker Studio</span>
                <span className="text-xs bg-amber-300 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400">
                  Interactive Stage
                </span>
              </h2>
              <p className="text-xs font-bold text-amber-800">
                Direct your own story scene! Click to position puppets, type dialogue, and hit Action!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Backdrop Picker Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-black text-amber-900 shrink-0">Stage Backdrop:</span>
          {STAGE_BACKDROPS.map(bd => (
            <button
              key={bd.id}
              onClick={() => {
                soundFX.playPop();
                setSelectedBackdrop(bd);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black shrink-0 border-2 transition-all cursor-pointer shadow-xs ${
                selectedBackdrop.id === bd.id
                  ? 'bg-amber-500 text-white border-amber-600 scale-105 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-amber-100 border-amber-300'
              }`}
            >
              {bd.name}
            </button>
          ))}
        </div>

        {/* THE MAIN INTERACTIVE STAGE */}
        <div
          ref={stageRef}
          onClick={handleStageClick}
          className={`w-full h-72 md:h-96 rounded-2xl border-4 relative overflow-hidden shadow-inner cursor-crosshair select-none transition-all ${selectedBackdrop.bg}`}
        >
          {/* Subtle Stage Lighting Spotlight */}
          <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/30 pointer-events-none" />

          {/* Realistic Wooden Stage Floor Base */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700/80 border-t-2 border-amber-500 shadow-lg pointer-events-none" />

          {/* Interactive Puppets on Stage */}
          {stagePuppets.map((puppet) => {
            const isSelected = puppet.instanceId === selectedPuppetId;

            return (
              <div
                key={puppet.instanceId}
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playPop();
                  setSelectedPuppetId(puppet.instanceId);
                }}
                style={{
                  left: `${puppet.x}%`,
                  top: `${puppet.y}%`,
                  transform: `translate(-50%, -50%) scale(${puppet.scale}) ${puppet.flipped ? 'scaleX(-1)' : ''}`,
                }}
                className={`absolute cursor-pointer transition-transform duration-200 group ${
                  puppet.isDancing || isPlayingShow ? 'animate-bounce' : ''
                }`}
              >
                {/* Speech Bubble variant */}
                {puppet.text !== undefined ? (
                  <div
                    className={`bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-xl border-2 font-bold text-xs relative max-w-48 text-center flex items-center justify-center ${
                      isSelected ? 'border-amber-500 ring-4 ring-amber-300' : 'border-slate-300'
                    }`}
                  >
                    <span>{puppet.text}</span>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-white" />
                  </div>
                ) : (
                  /* Emoji Puppet Character */
                  <div
                    className={`text-5xl md:text-6xl filter drop-shadow-lg transition-all ${
                      isSelected ? 'ring-4 ring-amber-400 rounded-full p-1 bg-white/20' : ''
                    }`}
                  >
                    {puppet.emoji}
                  </div>
                )}

                {/* Selected Indicator Badge */}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider shrink-0 pointer-events-none">
                    Selected
                  </div>
                )}
              </div>
            );
          })}

          {/* Hint Overlay when stage is empty */}
          {stagePuppets.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 font-bold pointer-events-none">
              <span className="text-4xl mb-2">🎭</span>
              <p className="text-sm">Tap any puppet below to add them to your stage!</p>
            </div>
          )}
        </div>

        {/* Selected Puppet Controls Toolbar */}
        {selectedPuppet ? (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-100 p-2.5 rounded-2xl border-2 border-amber-300">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedPuppet.emoji}</span>
              <span className="text-xs font-black text-amber-950">
                {selectedPuppet.name} Controls:
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Text Edit for speech bubble */}
              {selectedPuppet.text !== undefined && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={selectedPuppet.text}
                    onChange={(e) => updateSelectedPuppet(p => ({ ...p, text: e.target.value }))}
                    placeholder="Type dialogue..."
                    className="px-2.5 py-1 text-xs rounded-xl border border-amber-300 bg-white font-bold text-slate-800 w-44"
                  />
                </div>
              )}

              {/* Flip */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  updateSelectedPuppet(p => ({ ...p, flipped: !p.flipped }));
                }}
                className="px-2 py-1 bg-white hover:bg-amber-200 border border-amber-400 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1 cursor-pointer"
                title="Flip Puppet"
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Flip</span>
              </button>

              {/* Grow */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  updateSelectedPuppet(p => ({ ...p, scale: Math.min(2.0, p.scale + 0.15) }));
                }}
                className="px-2 py-1 bg-white hover:bg-amber-200 border border-amber-400 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1 cursor-pointer"
                title="Enlarge"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Bigger</span>
              </button>

              {/* Shrink */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  updateSelectedPuppet(p => ({ ...p, scale: Math.max(0.6, p.scale - 0.15) }));
                }}
                className="px-2 py-1 bg-white hover:bg-amber-200 border border-amber-400 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1 cursor-pointer"
                title="Shrink"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Smaller</span>
              </button>

              {/* Dance */}
              <button
                onClick={() => {
                  soundFX.playBoing();
                  updateSelectedPuppet(p => ({ ...p, isDancing: !p.isDancing }));
                }}
                className="px-2 py-1 bg-white hover:bg-amber-200 border border-amber-400 rounded-xl text-xs font-bold text-amber-950 flex items-center gap-1 cursor-pointer"
                title="Make Puppet Dance"
              >
                <span>🕺 Dance</span>
              </button>

              {/* Delete */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  setStagePuppets(prev => prev.filter(p => p.instanceId !== selectedPuppetId));
                  setSelectedPuppetId(null);
                }}
                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-1 cursor-pointer"
                title="Remove from Stage"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-xs font-bold text-amber-800 bg-amber-100/60 p-2 rounded-xl">
            💡 Click on any puppet on the stage to resize, flip, or make them speak!
          </div>
        )}

        {/* Puppet Character & Prop Picker Drawer */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
            Add Cast & Props to Stage:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PUPPET_CATALOG.map(item => (
              <button
                key={item.id}
                onClick={() => handleAddPuppet(item)}
                className="p-2 bg-white hover:bg-amber-100 border-2 border-amber-300 rounded-2xl flex flex-col items-center gap-1 min-w-[70px] shadow-xs active:scale-95 transition-all cursor-pointer"
                title={`Add ${item.name} to stage`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[10px] font-bold text-amber-950 truncate max-w-[65px]">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage Global Master Actions */}
        <div className="flex items-center justify-between pt-1 border-t-2 border-amber-200">
          <button
            onClick={() => {
              soundFX.playPop();
              setStagePuppets([]);
              setSelectedPuppetId(null);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
          >
            Clear Stage
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleActionShow}
              disabled={isPlayingShow}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>🎬 ACTION! Play Show</span>
            </button>

            <button
              onClick={() => {
                soundFX.playSparkle();
                alert("✨ Snapshot Captured! Show this awesome puppet scene to your professor tomorrow!");
                if (onBadgeEarned) onBadgeEarned('puppet-master');
              }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-sm shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>📸 Snapshot</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
