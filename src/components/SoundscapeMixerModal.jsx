import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Sparkles, Sliders, Moon, CloudRain, Trees, Compass } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function SoundscapeMixerModal({ isOpen, onClose, storyId = null, onBadgeEarned }) {
  const [tracks, setTracks] = useState({
    rain: { name: 'Rainy Window', emoji: '🌧️', active: false, volume: 40 },
    forest: { name: 'Enchanted Forest', emoji: '🌲', active: false, volume: 40 },
    cosmic: { name: 'Cosmic Starlight', emoji: '🪐', active: false, volume: 40 },
    musicBox: { name: 'Lullaby Music Box', emoji: '🎵', active: false, volume: 30 }
  });

  const [activePreset, setActivePreset] = useState(null);

  useEffect(() => {
    if (isOpen && storyId) {
      if (storyId === 'curious-rocket') {
        applyPreset('cosmic');
      } else if (storyId === 'secret-cave' || storyId === 'bear-lost-pencil') {
        applyPreset('forest');
      } else if (storyId === 'dolly-midnight-adventure') {
        applyPreset('rain');
      }
    }
  }, [isOpen, storyId]);

  // Sync with audio service when track states change
  const toggleTrack = (key) => {
    soundFX.playPop();
    setTracks(prev => {
      const current = prev[key];
      const nextActive = !current.active;
      const updated = { ...prev, [key]: { ...current, active: nextActive } };

      applyAudioState(key, nextActive, current.volume);
      checkBadge(updated);
      return updated;
    });
  };

  const handleVolumeChange = (key, newVol) => {
    setTracks(prev => {
      const current = prev[key];
      const updated = { ...prev, [key]: { ...current, volume: newVol } };
      if (current.active) {
        applyAudioState(key, true, newVol);
      }
      return updated;
    });
  };

  const applyAudioState = (key, active, volume) => {
    const normVol = volume / 100 * 0.15;
    if (!active) {
      if (key === 'rain') soundFX.stopAmbientRain();
      if (key === 'forest') soundFX.stopForestBreeze();
      if (key === 'cosmic') soundFX.stopCosmicStarlight();
      if (key === 'musicBox') soundFX.stopMusicBox();
    } else {
      if (key === 'rain') soundFX.startAmbientRain(normVol);
      if (key === 'forest') soundFX.startForestBreeze(normVol);
      if (key === 'cosmic') soundFX.startCosmicStarlight(normVol);
      if (key === 'musicBox') soundFX.startMusicBox(normVol);
    }
  };

  const checkBadge = (currentTracks) => {
    const activeCount = Object.values(currentTracks).filter(t => t.active).length;
    if (activeCount >= 2 && onBadgeEarned) {
      onBadgeEarned('soundscape-dj');
    }
  };

  const applyPreset = (presetName) => {
    soundFX.playSparkle();
    setActivePreset(presetName);

    soundFX.stopAllSoundscapes();

    let newStates = {
      rain: { ...tracks.rain, active: false },
      forest: { ...tracks.forest, active: false },
      cosmic: { ...tracks.cosmic, active: false },
      musicBox: { ...tracks.musicBox, active: false }
    };

    if (presetName === 'rain') {
      newStates.rain.active = true;
      newStates.musicBox.active = true;
      soundFX.startAmbientRain(0.08);
      soundFX.startMusicBox(0.04);
    } else if (presetName === 'forest') {
      newStates.forest.active = true;
      soundFX.startForestBreeze(0.08);
    } else if (presetName === 'cosmic') {
      newStates.cosmic.active = true;
      soundFX.startCosmicStarlight(0.07);
    } else if (presetName === 'silence') {
      // all stopped
    }

    setTracks(newStates);
    checkBadge(newStates);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/75 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-100 border-4 border-indigo-400 rounded-3xl p-5 md:p-6 w-full max-w-xl shadow-2xl relative flex flex-col gap-4 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-indigo-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-md">
              <Sliders className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-indigo-950 flex items-center gap-2">
                <span>Story Atmosphere & Soundscape Mixer</span>
                <span className="text-xs bg-indigo-200 text-indigo-900 font-bold px-2 py-0.5 rounded-full border border-indigo-300">
                  Live Synth
                </span>
              </h2>
              <p className="text-xs font-bold text-indigo-700">
                Blend calming ambient sounds synthesized live with the Web Audio API!
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

        {/* Quick Atmosphere Presets */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Quick Atmosphere Presets:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => applyPreset('rain')}
              className={`p-2 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                activePreset === 'rain'
                  ? 'bg-sky-500 text-white border-sky-600 scale-102 shadow-md'
                  : 'bg-white hover:bg-sky-50 border-sky-300 text-sky-800'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <span>Rainy Bedtime</span>
            </button>

            <button
              onClick={() => applyPreset('forest')}
              className={`p-2 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                activePreset === 'forest'
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-102 shadow-md'
                  : 'bg-white hover:bg-emerald-50 border-emerald-300 text-emerald-800'
              }`}
            >
              <Trees className="w-4 h-4" />
              <span>Magic Woods</span>
            </button>

            <button
              onClick={() => applyPreset('cosmic')}
              className={`p-2 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                activePreset === 'cosmic'
                  ? 'bg-purple-500 text-white border-purple-600 scale-102 shadow-md'
                  : 'bg-white hover:bg-purple-50 border-purple-300 text-purple-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Starlight Space</span>
            </button>

            <button
              onClick={() => applyPreset('silence')}
              className="p-2 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-1.5 bg-white hover:bg-rose-50 border-rose-300 text-rose-700 transition-all cursor-pointer shadow-sm"
            >
              <VolumeX className="w-4 h-4" />
              <span>Silence All</span>
            </button>
          </div>
        </div>

        {/* Individual Atmosphere Track Channels */}
        <div className="flex flex-col gap-2.5 bg-white/80 p-3.5 rounded-2xl border-2 border-indigo-200">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Layer Your Soundscape Channels:
          </span>

          {Object.entries(tracks).map(([key, track]) => (
            <div
              key={key}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                track.active
                  ? 'bg-indigo-50/90 border-indigo-400 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{track.emoji}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{track.name}</h4>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {track.active ? '🔊 Playing synth wave' : '⏸️ Paused'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleTrack(key)}
                  className={`px-3 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-2xs ${
                    track.active
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300'
                  }`}
                >
                  {track.active ? 'Turn Off' : 'Turn On'}
                </button>
              </div>

              {/* Volume Slider & Animated Soundwave Bars */}
              {track.active && (
                <div className="flex items-center gap-3 pt-1 border-t border-indigo-100">
                  <Volume2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={track.volume}
                    onChange={(e) => handleVolumeChange(key, Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-indigo-200 rounded-lg"
                  />
                  <span className="text-xs font-bold text-indigo-900 w-8 text-right shrink-0">
                    {track.volume}%
                  </span>

                  {/* Micro Audio Visualizer wave bars */}
                  <div className="flex items-end gap-0.5 h-4 shrink-0">
                    <span className="w-1 bg-indigo-500 rounded-full animate-bounce h-3" />
                    <span className="w-1 bg-indigo-400 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-indigo-600 rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer info note */}
        <div className="flex items-center justify-between text-xs font-bold text-indigo-800 bg-indigo-100/80 p-2.5 rounded-xl border border-indigo-200">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Mix 2 or more sounds to earn the <strong>Soundscape Maestro 🎧</strong> badge!</span>
          </span>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold cursor-pointer transition-all shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
