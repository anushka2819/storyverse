import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Play, Pause, Home, Trophy, Palette, Gamepad2, Moon, Sun, Globe, RotateCw, ChevronDown, Sparkles } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function Navbar({
  currentSceneId,
  totalScenes,
  soundMuted,
  onToggleSound,
  narratorEnabled,
  onToggleNarrator,
  isAutoPlayActive = false,
  onToggleAutoPlay = () => { },
  onPauseStory = () => { },
  onGoHome = () => { },
  activeStoryTitle = "The Bottle That Waited",
  onOpenBadges = () => { },
  onOpenEasel = () => { },
  onOpenMemoryGame = () => { },
  onOpenStoryMaker = () => { },
  onOpenQuiz = () => { },
  onOpenCareCertificate = () => { },
  onOpenPuppetTheater = () => { },
  onOpenPassport = () => { },
  onOpenSoundscape = () => { },
  isBedtimeMode = false,
  onToggleBedtimeMode = () => { },
  activeLanguage = 'en',
  onChangeLanguage = () => { },
  unlockedBadgesCount = 0
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullScreen = () => {
    soundFX.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const LANGUAGES = [
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'fr', flag: '🇫🇷', label: 'Français' },
    { code: 'hi', flag: '🇮🇳', label: 'Hindi' }
  ];

  return (
    <header 
      className="sticky top-0 z-40 w-full h-[54px] md:h-[60px] flex items-center px-2 md:px-5 select-none font-['Fredoka',sans-serif] bg-gradient-to-r from-[#c9803b] via-[#eed1a4] to-[#c9803b] shadow-md border-b-4 border-[#8b5a2b]"
    >
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-2 h-full py-1.5">

        {/* --- LEFT GROUP --- */}
        <div className="flex items-center gap-2.5 h-full">
          
          {/* Library Button - Wood 3D */}
          <button
            onClick={() => {
              soundFX.playPop();
              onGoHome();
            }}
            className="h-full px-3 md:px-4 rounded-xl flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#6b421a] bg-gradient-to-b from-[#e39c4d] to-[#b36e26] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_3px_5px_rgba(0,0,0,0.25)] shrink-0"
            title="Return to Storyverse Library"
          >
            <Home className="w-4 h-4 md:w-5 md:h-5 text-[#4a2e12]" strokeWidth={2.5} />
            <span className="text-[#4a2e12] font-black text-xs md:text-sm tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">Library</span>
            <span className="text-sm hidden sm:inline drop-shadow-sm">📚</span>
          </button>

          {/* Story Title - Parchment 3D: Story Name is BIGGEST */}
          <div className="flex items-center h-full px-3 md:px-4 rounded-xl border-[2.5px] border-[#cbb389] bg-gradient-to-b from-[#fffbf0] to-[#f4e4c4] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_3px_5px_rgba(0,0,0,0.15)] relative">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl drop-shadow-md shrink-0">
                {activeStoryTitle.includes('Dolly') ? '🎀' :
                 activeStoryTitle.includes('Cave') ? '🦊' :
                 activeStoryTitle.includes('Rocket') ? '🚀' :
                 activeStoryTitle.includes('Bear') ? '🐻' : '💧'}
              </span>
              <div className="flex flex-col justify-center">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-[#0f4c81] leading-none tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] max-w-[200px] sm:max-w-[320px] md:max-w-[420px] truncate">
                  {activeStoryTitle}
                </h1>
                <p className="text-[9px] md:text-[10px] font-bold text-amber-900/80 uppercase tracking-wider mt-0.5">
                  Interactive Storybook
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- MIDDLE GROUP 1 (Features: Badges, Color, Game, Maker) --- */}
        <div className="flex items-center justify-center gap-2 md:gap-2.5 h-full">
          
          {/* Badges Button - Gold 3D */}
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenBadges();
            }}
            className="h-full px-3 md:px-4 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#b57317] bg-gradient-to-b from-[#ffd65e] to-[#ffaa1c] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_3px_5px_rgba(0,0,0,0.2)]"
          >
            <Trophy className="w-4 h-4 text-[#7a4e10]" strokeWidth={2.5} />
            <span className="text-[#7a4e10] font-black text-xs md:text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">Badges</span>
          </button>

          {/* Color Button - Pink 3D */}
          <button
            onClick={() => {
              soundFX.playPop();
              onOpenEasel();
            }}
            className="h-full px-3 md:px-4 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#942753] bg-gradient-to-b from-[#ff8fc3] to-[#e84d8d] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_3px_5px_rgba(0,0,0,0.2)]"
          >
            <Palette className="w-4 h-4 text-[#6b1638]" strokeWidth={2.5} />
            <span className="text-[#6b1638] font-black text-xs md:text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">Color</span>
          </button>

          {/* Game Button - Green 3D */}
          <button
            onClick={() => {
              soundFX.playPop();
              onOpenMemoryGame();
            }}
            className="h-full px-3 md:px-3.5 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#197554] bg-gradient-to-b from-[#7cf5c8] to-[#2bc08e] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_3px_5px_rgba(0,0,0,0.2)]"
          >
            <Gamepad2 className="w-4 h-4 text-[#11543b]" strokeWidth={2.5} />
            <span className="text-[#11543b] font-black text-xs md:text-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">Game</span>
          </button>

          {/* Story Maker Button - Royal Indigo 3D */}
          <button
            onClick={() => {
              soundFX.playMagicChime();
              onOpenStoryMaker();
            }}
            className="h-full px-3 md:px-3.5 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#312e81] bg-gradient-to-b from-[#818cf8] to-[#4f46e5] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_3px_5px_rgba(0,0,0,0.2)]"
            title="Create your own custom story!"
          >
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="text-white font-black text-xs md:text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">Maker</span>
          </button>

          {/* Reading Passport Button - Teal 3D */}
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenPassport();
            }}
            className="hidden md:flex h-full px-3 md:px-3.5 rounded-full items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#0f766e] bg-gradient-to-b from-[#2dd4bf] to-[#0d9488] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_3px_5px_rgba(0,0,0,0.2)]"
            title="Open your Storyverse Reading Passport!"
          >
            <span className="text-xs">📓</span>
            <span className="text-white font-black text-xs md:text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">Passport</span>
          </button>

          {/* Atmosphere Mixer Button - Cyan/Blue 3D */}
          <button
            onClick={() => {
              soundFX.playSparkle();
              onOpenSoundscape();
            }}
            className="hidden xl:flex h-full px-3 md:px-3.5 rounded-full items-center gap-1.5 active:scale-95 transition-transform cursor-pointer border-[2.5px] border-[#0369a1] bg-gradient-to-b from-[#38bdf8] to-[#0284c7] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_3px_5px_rgba(0,0,0,0.2)]"
            title="Blend calming ambient soundscapes!"
          >
            <span className="text-xs">🎧</span>
            <span className="text-white font-black text-xs md:text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">Mixer</span>
          </button>
        </div>

        {/* --- MIDDLE GROUP 2 (Settings) --- */}
        <div className="flex items-center justify-center gap-3 h-full">
          {/* Daytime Toggle - Parchment 3D */}
          <div className="hidden xl:flex items-center h-full px-4 rounded-2xl border-[3px] border-[#cbb389] bg-gradient-to-b from-[#fffbf0] to-[#f4e4c4] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_6px_rgba(0,0,0,0.2)] gap-2">
            <Sun className="w-5 h-5 text-[#ed8924] fill-[#ed8924] drop-shadow-sm" />
            <span className="text-[#5c4a3d] font-black text-sm md:text-base">Daytime</span>
            <button 
              onClick={() => {
                soundFX.playPop();
                onToggleBedtimeMode();
              }}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 border-2 border-transparent ${!isBedtimeMode ? 'bg-[#4396f6]' : 'bg-slate-400'} shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]`}
            >
              <div className={`absolute top-[2px] w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${!isBedtimeMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Language Toggle - Parchment 3D */}
          <div className="hidden xl:flex items-center h-full px-4 rounded-2xl border-[3px] border-[#cbb389] bg-gradient-to-b from-[#fffbf0] to-[#f4e4c4] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_6px_rgba(0,0,0,0.2)] gap-1 cursor-pointer">
            <Globe className="w-5 h-5 text-[#5c4a3d]" strokeWidth={2.5} />
            <select
              value={activeLanguage}
              onChange={(e) => {
                soundFX.playPop();
                onChangeLanguage(e.target.value);
              }}
              className="bg-transparent text-[#5c4a3d] font-black text-sm outline-none cursor-pointer appearance-none pr-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  GB {l.code.toUpperCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#5c4a3d] pointer-events-none" strokeWidth={3} />
          </div>
        </div>

        {/* --- RIGHT GROUP (Controls) --- */}
        <div className="flex items-center justify-end gap-3 h-full">
          
          {/* Auto-Play & Pause Toggle Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              if (isAutoPlayActive) {
                onPauseStory();
              } else {
                onToggleAutoPlay();
              }
            }}
            className={`h-full px-4 sm:px-5 rounded-full flex items-center gap-2 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_4px_6px_rgba(0,0,0,0.3)] active:scale-95 transition-transform cursor-pointer border-[3px] ${
              isAutoPlayActive 
                ? 'bg-gradient-to-b from-[#f87171] to-[#dc2626] border-[#991b1b] ring-2 ring-rose-400 animate-pulse' 
                : 'bg-gradient-to-b from-[#4bc1ff] to-[#0d74e8] border-[#094794]'
            }`}
            title={isAutoPlayActive ? "Pause Story Playback" : "Start Auto-Play Story"}
          >
            {isAutoPlayActive ? (
               <Pause className="w-5 h-5 text-white fill-white drop-shadow-md" />
            ) : (
               <Play className="w-5 h-5 text-white fill-white drop-shadow-md" />
            )}
            <span className="text-white font-black text-sm md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {isAutoPlayActive ? 'Pause' : 'Play Story'}
            </span>
          </button>

          {/* Refresh/Fullscreen Button - Wood Circle 3D */}
          <button
            onClick={toggleFullScreen}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-[#8c5d2c] bg-gradient-to-b from-[#eed4aa] to-[#d4ab75] shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.2)] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
               <Minimize2 className="w-5 h-5 md:w-6 md:h-6 text-[#6b421a]" strokeWidth={2.5} />
            ) : (
               <RotateCw className="w-5 h-5 md:w-6 md:h-6 text-[#6b421a]" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
