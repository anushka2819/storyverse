import React, { useState, useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';
import Navbar from './components/Navbar';
import StorybookFrame from './components/StorybookFrame';
import SceneControls from './components/SceneControls';
import InteractivePanel from './components/InteractivePanel';
import StoryChapterMap from './components/StoryChapterMap';
import HomePage from './components/HomePage';
import CuteStoryChatbot from './components/CuteStoryChatbot';
import WordMagicModal from './components/WordMagicModal';
import ColoringEaselModal from './components/ColoringEaselModal';
import TrophyChestModal, { BADGES_LIST } from './components/TrophyChestModal';
import MemoryGameModal from './components/MemoryGameModal';
import BedtimeCalmOverlay from './components/BedtimeCalmOverlay';
import StoryMakerModal from './components/StoryMakerModal';
import StoryQuizModal from './components/StoryQuizModal';
import CareCertificateModal from './components/CareCertificateModal';
import SoundscapeMixerModal from './components/SoundscapeMixerModal';
import StickerStageModal from './components/StickerStageModal';
import ReadingPassportModal from './components/ReadingPassportModal';
import StoryArcModal from './components/StoryArcModal';
import { WORD_MAGIC_DICTIONARY } from './data/wordMagicData';

import { STORY_SCENES } from './data/storyData';
import { SECRET_CAVE_SCENES } from './data/secretCaveData';
import { DOLLY_STORY_SCENES } from './data/dollyStoryData';
import { ROCKET_STORY_SCENES } from './data/rocketStoryData';
import { BEAR_STORY_SCENES } from './data/bearStoryData';
import { STORY_LIBRARY } from './data/storyLibraryData';
import { soundFX } from './services/soundEffects';
import { narrator } from './services/narratorService';

const ALL_STORY_SCENES = {
  'dolly-midnight-adventure': DOLLY_STORY_SCENES,
  'secret-cave': SECRET_CAVE_SCENES,
  'bottle-that-waited': STORY_SCENES,
  'curious-rocket': ROCKET_STORY_SCENES,
  'bear-lost-pencil': BEAR_STORY_SCENES
};

export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'reader'
  const [activeStoryId, setActiveStoryId] = useState('dolly-midnight-adventure');
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(false);

  const activeStoryObj = STORY_LIBRARY.find(s => s.id === activeStoryId) || STORY_LIBRARY[0];
  const currentStoryScenes = ALL_STORY_SCENES[activeStoryId] || STORY_SCENES;

  const [soundMuted, setSoundMuted] = useState(false);
  const [narratorEnabled, setNarratorEnabled] = useState(true);

  // Educational Learning Feature States
  const [isBedtimeMode, setIsBedtimeMode] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [unlockedBadges, setUnlockedBadges] = useState(['story-explorer']);
  const [learnedWords, setLearnedWords] = useState([]);
  const [completedStories, setCompletedStories] = useState(() => {
    try {
      const saved = localStorage.getItem('storyverse_completed_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isPaused, setIsPaused] = useState(false);

  const markStoryCompleted = (storyId) => {
    setCompletedStories(prev => {
      if (prev.includes(storyId)) return prev;
      const updated = [...prev, storyId];
      try {
        localStorage.setItem('storyverse_completed_stories', JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage error:', e);
      }
      return updated;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeView]);

  // Modals
  const [activeWordMagic, setActiveWordMagic] = useState(null);
  const [showEaselModal, setShowEaselModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showMemoryGameModal, setShowMemoryGameModal] = useState(false);
  const [showStoryMakerModal, setShowStoryMakerModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showCareCertificateModal, setShowCareCertificateModal] = useState(false);
  const [showSoundscapeModal, setShowSoundscapeModal] = useState(false);
  const [showPuppetStageModal, setShowPuppetStageModal] = useState(false);
  const [showReadingPassportModal, setShowReadingPassportModal] = useState(false);
  const [showStoryArcModal, setShowStoryArcModal] = useState(false);

  // FX & Animation States
  const [bottleState, setBottleState] = useState('happy');
  const [showSparkle, setShowSparkle] = useState(false);
  const [showRocketLaunch, setShowRocketLaunch] = useState(false);
  const [waterStep, setWaterStep] = useState(0);

  const autoPlayTimeoutRef = useRef(null);
  const isPausedRef = useRef(false);
  const isAutoPlayActiveRef = useRef(false);

  const currentScene = currentStoryScenes.find(s => s.id === currentSceneId) || currentStoryScenes[0];
  const currentSentences = currentScene.sentences || [];

  // Safely clamp sentence index within bounds
  const safeSentenceIndex = Math.min(currentSentenceIndex, Math.max(0, currentSentences.length - 1));
  const currentSentence = currentSentences[safeSentenceIndex] || currentSentences[0];

  // Unlock badge helper
  const unlockBadge = (badgeId) => {
    setUnlockedBadges(prev => {
      if (prev.includes(badgeId)) return prev;
      soundFX.playStoryChime();
      return [...prev, badgeId];
    });
  };

  // Track word learning for Word Wizard badge
  const handleWordLearned = (word) => {
    setLearnedWords(prev => {
      if (prev.includes(word)) return prev;
      const updated = [...prev, word];
      if (updated.length >= 3) {
        unlockBadge('word-wizard');
      }
      return updated;
    });
  };

  // Handle sentence speech narration & auto-play progression on scene/sentence changes
  useEffect(() => {
    if (!currentSentence) return;

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }

    // Apply mood from sentence screenState
    if (currentSentence.screenState?.bottleMood) {
      setBottleState(currentSentence.screenState.bottleMood);
    }

    // Trigger special sound FX for sentence
    if (currentSentence.screenState?.overlayEmoji === '🔔' || currentSentence.text?.includes('🔔')) {
      soundFX.playSchoolBell();
    } else if (currentSentence.speaker === 'SFX') {
      soundFX.playPop();
    } else if (currentSentence.screenState?.animation === 'rocket') {
      soundFX.playRocketWhoosh();
      setShowRocketLaunch(true);
      setTimeout(() => setShowRocketLaunch(false), 600);
      if (activeStoryId === 'curious-rocket') {
        unlockBadge('space-cadet');
      }
    } else if (currentSentence.screenState?.animation === 'sparkle') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
    }

    // If currently paused, cancel narration and do not auto-advance
    if (isPausedRef.current) {
      narrator.cancel();
      return;
    }

    // Speak sentence with fallback safety callback for Auto-Play Mode
    if (narratorEnabled) {
      narrator.speakSentence(currentSentence, () => {
        if (isAutoPlayActiveRef.current && !isPausedRef.current) {
          autoPlayTimeoutRef.current = setTimeout(() => {
            handleNextSentenceAuto();
          }, 1200);
        }
      });
    } else if (isAutoPlayActiveRef.current) {
      const timerMs = Math.max(2500, currentSentence.text.length * 80);
      autoPlayTimeoutRef.current = setTimeout(() => {
        handleNextSentenceAuto();
      }, timerMs);
    }
  }, [currentSceneId, safeSentenceIndex]);

  const handleNextSentenceAuto = () => {
    if (isPausedRef.current || !isAutoPlayActiveRef.current) return;
    if (safeSentenceIndex < currentSentences.length - 1) {
      setCurrentSentenceIndex(safeSentenceIndex + 1);
    } else if (currentSceneId < currentStoryScenes.length) {
      setCurrentSceneId(prev => prev + 1);
      setCurrentSentenceIndex(0);
    } else {
      markStoryCompleted(activeStoryId);
      unlockBadge('story-master');
      soundFX.playSuccessFanfare();
      setShowCareCertificateModal(true);
    }
  };

  const handleNextSentence = () => {
    isPausedRef.current = false;
    setIsPaused(false);
    narrator.cancel();
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    if (safeSentenceIndex < currentSentences.length - 1) {
      setCurrentSentenceIndex(safeSentenceIndex + 1);
    } else {
      handleNextScene();
    }
  };

  const handlePrevSentence = () => {
    isPausedRef.current = false;
    setIsPaused(false);
    narrator.cancel();
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    if (safeSentenceIndex > 0) {
      setCurrentSentenceIndex(safeSentenceIndex - 1);
    } else if (currentSceneId > 1) {
      setCurrentSceneId(prev => prev - 1);
      const prevSceneSentences = (currentStoryScenes.find(s => s.id === currentSceneId - 1) || {}).sentences || [];
      setCurrentSentenceIndex(Math.max(0, prevSceneSentences.length - 1));
    }
  };

  const handleToggleSound = () => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    soundFX.setMuted(nextMuted);
  };

  const handleToggleNarrator = () => {
    const enabled = narrator.toggleEnabled();
    setNarratorEnabled(enabled);
    if (!enabled) {
      narrator.cancel();
    } else if (currentSentence && !isPausedRef.current) {
      narrator.speakSentence(currentSentence);
    }
  };

  const handlePauseStory = () => {
    soundFX.playPop();
    isPausedRef.current = true;
    isAutoPlayActiveRef.current = false;
    setIsPaused(true);
    setIsAutoPlayActive(false);

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    narrator.pause();
  };

  const handlePlayStory = () => {
    soundFX.playStoryChime();
    isPausedRef.current = false;
    isAutoPlayActiveRef.current = true;
    setIsPaused(false);
    setIsAutoPlayActive(true);

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }

    if (currentSentence && narratorEnabled) {
      narrator.resume();
      narrator.speakSentence(currentSentence, () => {
        if (isAutoPlayActiveRef.current && !isPausedRef.current) {
          autoPlayTimeoutRef.current = setTimeout(() => {
            handleNextSentenceAuto();
          }, 1200);
        }
      });
    }
  };

  const handleToggleAutoPlay = () => {
    if (isAutoPlayActive && !isPaused) {
      handlePauseStory();
    } else {
      handlePlayStory();
    }
  };

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [checklistState, setChecklistState] = useState({
    books: false,
    pencil: false,
    lunchbox: false,
    bottle: false
  });

  const handleChecklistToggle = (itemKey) => {
    soundFX.playPop();
    setChecklistState(prev => {
      const next = { ...prev, [itemKey]: !prev[itemKey] };
      if (Object.values(next).every(Boolean)) {
        soundFX.playSparkle();
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 500);
        if (narratorEnabled) {
          narrator.speak("Awesome! Everything is packed and ready!", 'NARRATOR');
        }
      }
      return next;
    });
  };

  // Reset quiz state when scene changes
  useEffect(() => {
    setWaterStep(0);
  }, [currentSceneId]);

  const handleQuizSelect = (quizOption) => {
    soundFX.playPop();
    setSelectedQuizAnswers(prev => ({ ...prev, [currentSceneId]: quizOption.id }));

    // Kindness badge tracking for caring options
    if (quizOption.text?.toLowerCase().includes('stay') || quizOption.text?.toLowerCase().includes('help')) {
      unlockBadge('kindness-hero');
    }

    if (quizOption.isCorrect) {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Great job! You answered correctly!", 'NARRATOR');
      }
    }
  };

  // Direct click interaction on stage objects
  const handleCanvasObjectClick = (objectType) => {
    if (objectType === 'bottle') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      const moods = ['happy', 'excited', 'hopeful', 'refilled'];
      const nextMood = moods[(moods.indexOf(bottleState) + 1) % moods.length];
      setBottleState(nextMood);
      if (narratorEnabled && currentSentence) {
        narrator.speakSentence(currentSentence);
      }
    } else if (objectType === 'aarav') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Hi there! Ready to turn the page?", 'AARAV');
      }
    } else if (objectType === 'lily') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Shh! Time for our magical midnight adventure!", 'LILY');
      }
    } else if (objectType === 'rocky') {
      soundFX.playRocketWhoosh();
      setShowRocketLaunch(true);
      setTimeout(() => setShowRocketLaunch(false), 600);
      if (narratorEnabled) {
        narrator.speak("WHOOSH! 3, 2, 1, countdown to starlight!", 'ROCKY');
      }
    } else if (objectType === 'benny') {
      soundFX.playPop();
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Wiggle wiggle! Let's draw something wonderful together!", 'BENNY');
      }
    } else if (objectType === 'milo') {
      soundFX.playPop();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("True friends never leave each other behind! Let's explore!", 'MILO');
      }
    } else if (objectType === 'toby') {
      soundFX.playPop();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
      if (narratorEnabled) {
        narrator.speak("Hop hop! Best friends stick together forever!", 'TOBY');
      }
    } else if (objectType === 'clock') {
      soundFX.playSchoolBell();
    } else if (objectType === 'window') {
      soundFX.playSparkle();
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
    } else if (activeStoryId === 'bottle-that-waited' && currentSceneId === 8) {
      if (objectType === 'tap' && waterStep === 0) {
        setWaterStep(1);
        soundFX.playWaterGlug();
      } else if (objectType === 'bottle' && waterStep === 1) {
        setWaterStep(2);
        soundFX.playWaterGlug();
      } else if (objectType === 'cap' && waterStep === 2) {
        setWaterStep(3);
        soundFX.playSparkle();
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 600);
      }
    }
  };

  const handleNextScene = () => {
    setIsPaused(false);
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (currentSceneId < currentStoryScenes.length) {
      setCurrentSceneId(prev => prev + 1);
      setCurrentSentenceIndex(0);
    } else {
      markStoryCompleted(activeStoryId);
      unlockBadge('story-master');
      soundFX.playSuccessFanfare();
      setShowCareCertificateModal(true);
    }
  };

  const handlePrevScene = () => {
    setIsPaused(false);
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    if (currentSceneId > 1) {
      setCurrentSceneId(prev => prev - 1);
      setCurrentSentenceIndex(0);
    }
  };

  const handleSelectStory = (storyId) => {
    setIsPaused(false);
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    setActiveStoryId(storyId);
    setCurrentSceneId(1);
    setCurrentSentenceIndex(0);
    setIsAutoPlayActive(false);
    setActiveView('reader');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    soundFX.playSparkle();
    unlockBadge('story-explorer');
  };

  const handleGoHome = () => {
    narrator.cancel();
    if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    setIsAutoPlayActive(false);
    setActiveView('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Render text with interactive Word Magic Explorer sparkler buttons
  const renderInteractiveText = (text) => {
    if (!text) return null;
    const words = text.split(/(\s+)/);

    return words.map((w, idx) => {
      const cleanWord = w.toLowerCase().replace(/[^a-z]/g, '');
      const isMagicWord = !!WORD_MAGIC_DICTIONARY[cleanWord];

      if (isMagicWord) {
        return (
          <span key={idx} className="inline-flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playSparkle();
                setActiveWordMagic(cleanWord);
              }}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded-lg bg-amber-300 hover:bg-amber-400 text-amber-950 font-black border border-amber-400/80 shadow-2xs hover:scale-105 transition-all cursor-pointer"
              title={`Click to explore word magic for "${cleanWord}"!`}
            >
              <span>{w}</span>
              <span className="text-xs">✨</span>
            </button>
          </span>
        );
      }

      return <span key={idx}>{w}</span>;
    });
  };

  if (activeView === 'home') {
    return (
      <div className="flex flex-col min-h-screen relative">
        <BedtimeCalmOverlay isActive={isBedtimeMode} />
        <HomePage
          onSelectStory={handleSelectStory}
          completedStories={completedStories}
          onOpenBadges={() => setShowBadgesModal(true)}
          onOpenEasel={() => setShowEaselModal(true)}
          onOpenMemoryGame={() => setShowMemoryGameModal(true)}
          onOpenStoryMaker={() => setShowStoryMakerModal(true)}
          onOpenQuiz={() => setShowQuizModal(true)}
          onOpenCareCertificate={() => setShowCareCertificateModal(true)}
          onOpenPuppetTheater={() => setShowPuppetStageModal(true)}
          onOpenPassport={() => setShowReadingPassportModal(true)}
          onOpenSoundscape={() => setShowSoundscapeModal(true)}
          isBedtimeMode={isBedtimeMode}
          onToggleBedtimeMode={() => setIsBedtimeMode(prev => !prev)}
        />
        <CuteStoryChatbot onSelectStory={handleSelectStory} />

        {/* Floating Educational Feature Modals */}
        {activeWordMagic && (
          <WordMagicModal
            wordKey={activeWordMagic}
            onClose={() => setActiveWordMagic(null)}
            onWordLearned={handleWordLearned}
          />
        )}
        {showEaselModal && (
          <ColoringEaselModal
            storyId={activeStoryId}
            onClose={() => setShowEaselModal(false)}
            onDrawingSaved={() => unlockBadge('little-artist')}
          />
        )}
        {showBadgesModal && (
          <TrophyChestModal
            unlockedBadges={unlockedBadges}
            onClose={() => setShowBadgesModal(false)}
          />
        )}
        {showMemoryGameModal && (
          <MemoryGameModal
            storyId={activeStoryId}
            onClose={() => setShowMemoryGameModal(false)}
            onGameWon={() => unlockBadge('word-wizard')}
          />
        )}
        {showStoryMakerModal && (
          <StoryMakerModal
            isOpen={showStoryMakerModal}
            onClose={() => setShowStoryMakerModal(false)}
          />
        )}
        {showQuizModal && (
          <StoryQuizModal
            isOpen={showQuizModal}
            onClose={() => setShowQuizModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showCareCertificateModal && (
          <CareCertificateModal
            isOpen={showCareCertificateModal}
            onClose={() => setShowCareCertificateModal(false)}
            storyId={activeStoryId}
            storyTitle={activeStoryObj.title}
            isCompleted={completedStories.includes(activeStoryId)}
            completedStories={completedStories}
            onSelectStory={(sId) => handleSelectStory(sId)}
            onContinueReading={(sId) => handleSelectStory(sId || activeStoryId)}
          />
        )}
        {showSoundscapeModal && (
          <SoundscapeMixerModal
            isOpen={showSoundscapeModal}
            onClose={() => setShowSoundscapeModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showPuppetStageModal && (
          <StickerStageModal
            isOpen={showPuppetStageModal}
            onClose={() => setShowPuppetStageModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showReadingPassportModal && (
          <ReadingPassportModal
            isOpen={showReadingPassportModal}
            onClose={() => setShowReadingPassportModal(false)}
            unlockedBadgesCount={unlockedBadges.length}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showStoryArcModal && (
          <StoryArcModal
            isOpen={showStoryArcModal}
            onClose={() => setShowStoryArcModal(false)}
            currentScene={currentScene}
            scenes={currentStoryScenes}
            activeStoryId={activeStoryId}
            currentSentenceIndex={safeSentenceIndex}
            onSelectSentence={setCurrentSentenceIndex}
            onSelectScene={(sId) => {
              setCurrentSceneId(sId);
              setCurrentSentenceIndex(0);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between relative text-slate-800 font-['Fredoka',sans-serif] selection:bg-amber-300 overflow-x-hidden pb-6 transition-colors duration-1000 ${isBedtimeMode
        ? 'bg-gradient-to-b from-indigo-950 via-slate-900 via-60% to-purple-950 text-slate-100'
        : 'bg-gradient-to-b from-sky-200 via-amber-50 via-60% to-sky-100'
        }`}
      style={!isBedtimeMode ? {
        backgroundImage: `
          radial-gradient(circle at 12% 18%, rgba(254, 240, 138, 0.45) 0%, transparent 25%),
          radial-gradient(circle at 88% 16%, rgba(244, 114, 182, 0.35) 0%, transparent 25%),
          radial-gradient(circle at 75% 80%, rgba(147, 197, 253, 0.4) 0%, transparent 30%),
          radial-gradient(#f472b6 1.8px, transparent 1.8px),
          radial-gradient(#38bdf8 1.8px, transparent 1.8px),
          radial-gradient(#facc15 1.8px, transparent 1.8px),
          linear-gradient(135deg, #e0f2fe 0%, #fffbeb 50%, #fdf2f8 100%)
        `,
        backgroundSize: 'auto, auto, auto, 52px 52px, 52px 52px, 52px 52px, 100% 100%',
        backgroundPosition: '0 0, 0 0, 0 0, 0 0, 26px 26px, 13px 39px, 0 0'
      } : undefined}
    >

      {/* Bedtime Atmosphere Overlay */}
      <BedtimeCalmOverlay isActive={isBedtimeMode} />

      <Navbar
        currentSceneId={currentSceneId}
        totalScenes={currentStoryScenes.length}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        narratorEnabled={narratorEnabled}
        onToggleNarrator={handleToggleNarrator}
        isAutoPlayActive={isAutoPlayActive}
        onToggleAutoPlay={handleToggleAutoPlay}
        onPauseStory={handlePauseStory}
        onGoHome={handleGoHome}
        activeStoryTitle={activeStoryObj.title}
        onOpenBadges={() => setShowBadgesModal(true)}
        onOpenEasel={() => setShowEaselModal(true)}
        onOpenMemoryGame={() => setShowMemoryGameModal(true)}
        onOpenStoryMaker={() => setShowStoryMakerModal(true)}
        onOpenQuiz={() => setShowQuizModal(true)}
        onOpenCareCertificate={() => setShowCareCertificateModal(true)}
        onOpenPuppetTheater={() => setShowPuppetStageModal(true)}
        onOpenPassport={() => setShowReadingPassportModal(true)}
        onOpenSoundscape={() => setShowSoundscapeModal(true)}
        isBedtimeMode={isBedtimeMode}
        onToggleBedtimeMode={() => setIsBedtimeMode(prev => !prev)}
        activeLanguage={activeLanguage}
        onChangeLanguage={setActiveLanguage}
        unlockedBadgesCount={unlockedBadges.length}
      />

      <main className="w-full max-w-7xl mx-auto flex-1 p-1.5 md:p-2.5 flex flex-col gap-2 items-stretch z-10">

        {/* DELUXE OPEN STORYBOOK HARDCOVER CASING */}
        <div className={`p-2 md:p-2.5 w-full rounded-[1.8rem] md:rounded-[2.2rem] relative flex flex-col real-book-cover shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.2)] border-3 md:border-4 ${
          isBedtimeMode ? 'border-indigo-600' : 'border-[#78350f]'
        }`}>

          {/* 4 Antique Gold Fleur-de-lis Corner Ornaments */}
          <div className="absolute top-1.5 left-1.5 text-xl md:text-2xl text-amber-400 pointer-events-none select-none drop-shadow-md">⚜️</div>
          <div className="absolute top-1.5 right-1.5 text-xl md:text-2xl text-amber-400 pointer-events-none select-none drop-shadow-md scale-x-[-1]">⚜️</div>
          <div className="absolute bottom-1.5 left-1.5 text-xl md:text-2xl text-amber-400 pointer-events-none select-none drop-shadow-md scale-y-[-1]">⚜️</div>
          <div className="absolute bottom-1.5 right-1.5 text-xl md:text-2xl text-amber-400 pointer-events-none select-none drop-shadow-md scale-[-1]">⚜️</div>

          {/* Stitched Gold Foil Perimeter Line */}
          <div className="absolute inset-1.5 md:inset-2 rounded-[1.5rem] md:rounded-[1.9rem] border border-amber-400/30 pointer-events-none border-dashed" />

          {/* Hanging Silk Ribbon Bookmark (Top Center Spine) */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none drop-shadow-2xl">
            <div className="w-6 md:w-8 h-12 md:h-14 bg-rose-700 ribbon-bookmark border-x border-amber-300/40 relative flex items-center justify-center">
              <span className="text-xs md:text-sm mb-1.5 drop-shadow-md">🔖</span>
            </div>
          </div>

          {/* ALWAYS SIDE-BY-SIDE 2-PAGE OPEN STORYBOOK SPREAD */}
          <div className="grid grid-cols-12 gap-0 items-stretch w-full flex-1 min-h-[430px] md:min-h-[470px] lg:min-h-[500px] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#fffdf7] border-2 border-amber-900/30">

            {/* LEFT PAGE: PICTURE STORYBOOK ILLUSTRATION */}
            <div className="col-span-6 h-full min-h-0 flex flex-col justify-center relative overflow-hidden parchment-page book-page-curve-left book-paper-stack-left rounded-l-2xl md:rounded-l-3xl border-y-4 border-l-6 border-r-0 border-amber-800/80">
              <StorybookFrame
                scene={currentScene}
                activeStoryId={activeStoryId}
                currentSentence={currentSentence}
                bottleState={bottleState}
                showSparkle={showSparkle}
                showRocketLaunch={showRocketLaunch}
                waterStationStep={waterStep}
                onTapObject={handleCanvasObjectClick}
              />
            </div>

            {/* REALISTIC SUNKEN BOOK SPINE / GUTTER */}
            <div className="block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-30 pointer-events-none book-spine-gutter shadow-2xl" />

            {/* RIGHT PAGE: AUTHENTIC PRINTED STORY READING PAGE */}
            <div className="col-span-6 parchment-page book-page-curve-right book-paper-stack-right rounded-r-2xl md:rounded-r-3xl rounded-l-none border-y-4 border-r-6 border-l-0 border-amber-800/80 p-2.5 md:p-3.5 shadow-2xl flex flex-col justify-between gap-2 relative select-none overflow-y-auto">

              {/* STORY HEADER: Story Name is BIGGEST */}
              <div className="sticky top-0 z-20 bg-[#fffdf7]/95 backdrop-blur-xs border-b-2 border-amber-300/80 pb-2 mb-1.5 font-['Fredoka',sans-serif] -mx-2.5 md:-mx-3.5 px-2.5 md:px-3.5 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {/* 🌟 STORY TITLE: Dominant, Largest Header */}
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#5c2800] tracking-tight leading-tight flex items-center gap-2 drop-shadow-2xs">
                      <span className="shrink-0 text-xl sm:text-2xl drop-shadow-sm">
                        {activeStoryId === 'dolly-midnight-adventure' ? '🎀' :
                         activeStoryId === 'secret-cave' ? '🦊' :
                         activeStoryId === 'curious-rocket' ? '🚀' :
                         activeStoryId === 'bear-lost-pencil' ? '🐻' : '💧'}
                      </span>
                      <span className="truncate">
                        {activeStoryObj?.title || "The Bottle That Waited"}
                      </span>
                    </h1>

                    {/* Sub-header row: Chapter info + Speaker badge */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300/80 shadow-2xs">
                        Chapter {currentSceneId}: {currentScene.title}
                      </span>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-200/90 px-2.5 py-0.5 rounded-full shadow-2xs border border-amber-300/60 flex items-center gap-1">
                        {currentSentence?.speaker === 'LILY' ? '🎀 Lily Doll' : currentSentence?.speaker === 'GIRL' ? '👧 Little Girl' : currentSentence?.speaker === 'RABBIT' ? '🐰 Teacup Rabbit' : currentSentence?.speaker === 'MILO' ? '🦊 Milo' : currentSentence?.speaker === 'TOBY' ? '🐰 Toby' : currentSentence?.speaker === 'ROCKY' ? '🚀 Rocky' : currentSentence?.speaker === 'COMET' ? '☄️ Starry' : currentSentence?.speaker === 'BENNY' ? '🐻 Benny Bear' : currentSentence?.speaker === 'BOTTLE' ? '💧 Buddy' : currentSentence?.speaker === 'AARAV' ? '👦 Aarav' : '📖 Narrator'}
                      </span>
                    </div>
                  </div>

                  {/* Reading Tools Group */}
                  <div className="flex items-center gap-2 shrink-0 pt-0.5 flex-wrap justify-end">
                    <button
                      onClick={() => {
                        soundFX.playPop();
                        setShowStoryArcModal(true);
                      }}
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold border border-indigo-200 flex items-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
                      title="View Dynamic Emotional Narrative Arc"
                    >
                      <span>📈 Arc</span>
                    </button>
                    <span className="text-[10px] md:text-xs font-bold text-amber-950 shrink-0 bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-200/80 shadow-2xs">
                      Line {safeSentenceIndex + 1}/{currentSentences.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* FULL PRINTED STORYBOOK CHAPTER TEXT BLOCK */}
              <div className="flex flex-col gap-1.5 font-['Fredoka',sans-serif] px-1">
                {currentSentences.map((sent, idx) => {
                  const isCurrent = idx === safeSentenceIndex;
                  return (
                    <p
                      key={sent.id || idx}
                      onClick={() => setCurrentSentenceIndex(idx)}
                      className={`cursor-pointer transition-all leading-snug ${isCurrent
                          ? 'text-sm md:text-base font-bold text-slate-900 bg-amber-50/60 rounded-lg px-2 py-1 border border-amber-200/50'
                          : 'text-xs md:text-sm font-semibold text-slate-500 hover:text-slate-700 px-2 py-0.5'
                        }`}
                    >
                      "{renderInteractiveText(sent.text)}"
                    </p>
                  );
                })}
              </div>

              {/* SELECTIVE INTERACTIVE REFLECTION PANEL FOR CURRENT SCENE */}
              <InteractivePanel
                scene={currentScene}
                activeStoryId={activeStoryId}
                selectedQuizAnswer={selectedQuizAnswers[currentSceneId]}
                waterStep={waterStep}
                checklistState={checklistState}
                onQuizSelect={handleQuizSelect}
                onPlayFootstepAudio={() => soundFX.playFootsteps()}
                onObjectTap={handleCanvasObjectClick}
                onChecklistToggle={handleChecklistToggle}
              />

              {/* INTEGRATED PAGE TURN NAVIGATION CONTROLS */}
              <div className="sticky bottom-0 z-20 bg-[#fffdf7]/95 backdrop-blur-xs pt-1.5 -mx-2.5 md:-mx-3.5 px-2.5 md:px-3.5 pb-1 mt-auto font-['Fredoka',sans-serif] border-t border-amber-200/60">
                <SceneControls
                  currentSceneId={currentSceneId}
                  totalScenes={currentStoryScenes.length}
                  currentSentence={currentSentence}
                  currentSentenceIndex={safeSentenceIndex}
                  totalSentences={currentSentences.length}
                  isAutoPlayActive={isAutoPlayActive}
                  isPaused={isPaused}
                  onNextSentence={handleNextSentence}
                  onPrevSentence={handlePrevSentence}
                  onNextScene={handleNextScene}
                  onPrevScene={handlePrevScene}
                  onToggleAutoPlay={handleToggleAutoPlay}
                  onPauseStory={handlePauseStory}
                  onReplayNarration={() => {
                    if (currentSentence && narratorEnabled) {
                      narrator.speakSentence(currentSentence);
                    }
                  }}
                />
                {/* PAGE NUMBER AT BOTTOM OUTER CORNER */}
                <div className="flex justify-between items-center text-[10px] font-black text-amber-900/80 mt-1.5 px-1 pb-1">
                  <span>❖ STORY READING PAGE</span>
                  <span>PAGE {currentSceneId * 2} OF {currentStoryScenes.length * 2}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* SIDE-BY-SIDE STORYLINE CHAPTER TRAIL MAP */}
        <div className="w-full mt-1 shrink-0">
          <StoryChapterMap
            currentScene={currentScene}
            scenes={currentStoryScenes}
            activeStoryId={activeStoryId}
            currentSentenceIndex={safeSentenceIndex}
            onSelectScene={(sceneId) => {
              narrator.cancel();
              if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
              setCurrentSceneId(sceneId);
              setCurrentSentenceIndex(0);
            }}
          />
        </div>

        {/* CUTE STORYBUDDY CHATBOT FOR KIDS */}
        <CuteStoryChatbot onSelectStory={handleSelectStory} />

        {/* Floating Educational Feature Modals */}
        {activeWordMagic && (
          <WordMagicModal
            wordKey={activeWordMagic}
            onClose={() => setActiveWordMagic(null)}
            onWordLearned={handleWordLearned}
          />
        )}
        {showEaselModal && (
          <ColoringEaselModal
            storyId={activeStoryId}
            onClose={() => setShowEaselModal(false)}
            onDrawingSaved={() => unlockBadge('little-artist')}
          />
        )}
        {showBadgesModal && (
          <TrophyChestModal
            unlockedBadges={unlockedBadges}
            onClose={() => setShowBadgesModal(false)}
          />
        )}
        {showMemoryGameModal && (
          <MemoryGameModal
            storyId={activeStoryId}
            onClose={() => setShowMemoryGameModal(false)}
            onGameWon={() => unlockBadge('word-wizard')}
          />
        )}
        {showStoryMakerModal && (
          <StoryMakerModal
            isOpen={showStoryMakerModal}
            onClose={() => setShowStoryMakerModal(false)}
          />
        )}
        {showQuizModal && (
          <StoryQuizModal
            isOpen={showQuizModal}
            onClose={() => setShowQuizModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showCareCertificateModal && (
          <CareCertificateModal
            isOpen={showCareCertificateModal}
            onClose={() => setShowCareCertificateModal(false)}
            storyId={activeStoryId}
            storyTitle={activeStoryObj.title}
            isCompleted={completedStories.includes(activeStoryId)}
            completedStories={completedStories}
            onSelectStory={(sId) => handleSelectStory(sId)}
            onContinueReading={(sId) => {
              if (sId && sId !== activeStoryId) {
                handleSelectStory(sId);
              }
            }}
          />
        )}
        {showSoundscapeModal && (
          <SoundscapeMixerModal
            isOpen={showSoundscapeModal}
            onClose={() => setShowSoundscapeModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showPuppetStageModal && (
          <StickerStageModal
            isOpen={showPuppetStageModal}
            onClose={() => setShowPuppetStageModal(false)}
            storyId={activeStoryId}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showReadingPassportModal && (
          <ReadingPassportModal
            isOpen={showReadingPassportModal}
            onClose={() => setShowReadingPassportModal(false)}
            unlockedBadgesCount={unlockedBadges.length}
            onBadgeEarned={unlockBadge}
          />
        )}
        {showStoryArcModal && (
          <StoryArcModal
            isOpen={showStoryArcModal}
            onClose={() => setShowStoryArcModal(false)}
            currentScene={currentScene}
            scenes={currentStoryScenes}
            activeStoryId={activeStoryId}
            currentSentenceIndex={safeSentenceIndex}
            onSelectSentence={setCurrentSentenceIndex}
            onSelectScene={(sId) => {
              setCurrentSceneId(sId);
              setCurrentSentenceIndex(0);
            }}
          />
        )}
      </main>
    </div>
  );
}
