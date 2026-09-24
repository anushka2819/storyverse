import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, Play, Star, PlusCircle } from 'lucide-react';
import { STORY_LIBRARY } from '../data/storyLibraryData';
import { soundFX } from '../services/soundEffects';

export default function HomePage({ onSelectStory = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [buddyTalking, setBuddyTalking] = useState(false);

  const categories = ['All', 'Care & Empathy', 'Adventure & Science', 'Friendship & Honesty'];

  const filteredStories = selectedCategory === 'All'
    ? STORY_LIBRARY
    : STORY_LIBRARY.filter(s => s.category === selectedCategory);

  const handleBuddyClick = () => {
    soundFX.playSparkle();
    setBuddyTalking(true);
    setTimeout(() => setBuddyTalking(false), 3500);
  };

  const handleStartStory = (story) => {
    if (story.isAvailable) {
      soundFX.playStoryChime();
      onSelectStory(story.id);
    } else {
      soundFX.playPop();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-200 via-pink-50 via-50% to-amber-100 text-slate-800 font-['Fredoka',sans-serif] selection:bg-pink-300 selection:text-pink-950 pb-28 overflow-x-hidden relative">

      {/* FLOATING PLAYFUL DECORATIONS (SUN, RAINBOW, CLOUDS, BALLOONS, STARS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-amber-300/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-6 right-10 text-6xl opacity-90 animate-float">☀️</div>
        <div className="absolute top-12 left-10 text-5xl opacity-80 animate-float">🌈</div>

        {/* Floating Clouds */}
        <div className="absolute top-8 left-8 text-5xl opacity-75 animate-float" style={{ animationDelay: '0s' }}>☁️</div>
        <div className="absolute top-20 right-1/4 text-4xl opacity-65 animate-float" style={{ animationDelay: '1.5s' }}>☁️</div>
        <div className="absolute top-36 left-1/3 text-3xl opacity-55 animate-float" style={{ animationDelay: '2.5s' }}>☁️</div>

        {/* Twinkling Stars & Playful Balloons */}
        <div className="absolute top-14 left-1/4 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>⭐</div>
        <div className="absolute top-24 right-12 text-3xl animate-bounce" style={{ animationDuration: '2.5s' }}>✨</div>
        <div className="absolute top-64 left-6 text-4xl animate-float" style={{ animationDelay: '3s' }}>🎈</div>
        <div className="absolute top-96 right-8 text-4xl animate-float" style={{ animationDelay: '1s' }}>🚀</div>
        <div className="absolute top-[32rem] left-12 text-3xl animate-bounce" style={{ animationDuration: '3.5s' }}>💧</div>
      </div>

      {/* TOP HEADER & BRANDING */}
      <header className="relative z-10 pt-6 pb-2 px-4 text-center select-none">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2.5">
          
          {/* TOP ANNOUNCEMENT BADGE */}
          <div 
            onClick={() => soundFX.playPop()}
            className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border-3 border-sky-300 shadow-md px-5 py-2 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
            <span className="text-xs md:text-sm font-black tracking-wide text-sky-800 uppercase">
              ✨ Interactive Picture Storybooks ✨
            </span>
            <span className="bg-pink-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
              Ages 3-9
            </span>
          </div>

          {/* MAIN APP TITLE */}
          <h1 className="text-4xl md:text-6xl font-black tracking-wide text-sky-900 drop-shadow-sm flex items-center justify-center gap-2 flex-wrap">
            <span className="animate-bounce" style={{ animationDuration: '2s' }}>📖</span>
            <span className="bg-gradient-to-r from-sky-600 via-amber-500 to-pink-500 bg-clip-text text-transparent">
              STORYVERSE
            </span>
            <span className="animate-bounce" style={{ animationDuration: '2.2s' }}>🎈</span>
          </h1>

          <p className="text-xs md:text-base text-slate-700 font-bold max-w-lg leading-relaxed">
            Pick your favorite story card below to start reading, listening, and exploring warm adventures! 🌟
          </p>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-black transition-all cursor-pointer border-3 ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-105 ring-2 ring-amber-300'
                    : 'bg-white/95 text-slate-700 hover:bg-white border-sky-200 shadow-xs'
                }`}
              >
                {cat === 'All' ? '📚 All Stories' : cat}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* MAIN STORY GRID */}
      <main className="max-w-6xl mx-auto px-4 pt-4 flex flex-col items-center gap-8 relative z-10">

        {/* 3-COLUMN COMPACT STORY CARDS GRID */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className={`toy-card-3d p-4 flex flex-col justify-between relative group overflow-hidden ${
                story.isAvailable
                  ? 'border-sky-300 hover:border-amber-400'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Card background ambient glow */}
              <div className={`absolute -right-10 -top-10 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 bg-gradient-to-br ${story.color}`} />

              <div>
                {/* Badge Tag & Age */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border-2 shadow-2xs ${
                    story.isAvailable
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {story.badge}
                  </span>
                  <span className="text-[11px] font-black text-slate-700 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                    👦 {story.ageGroup}
                  </span>
                </div>

                {/* COMPACT 3D STORY COVER ART (PROPORTIONAL 200px HEIGHT) */}
                <div
                  onClick={() => handleStartStory(story)}
                  className={`w-full h-44 md:h-48 bg-gradient-to-br ${story.color} rounded-2xl border-4 border-white shadow-md p-3 flex flex-col items-center justify-center relative cursor-pointer group-hover:scale-[1.03] transition-transform select-none my-1`}
                >
                  <span className="text-5xl md:text-6xl drop-shadow-md animate-gentle-bounce">
                    {story.coverEmoji}
                  </span>
                  <div className="mt-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-white text-xs font-black border border-white/40 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-white" />
                    <span>{story.chaptersCount} Chapters</span>
                  </div>
                </div>

                {/* Story Info Header */}
                <div className="mt-2.5">
                  <span className="text-[11px] font-extrabold text-sky-600 uppercase tracking-wider block">
                    {story.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-800 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                {/* Moral Quote Card */}
                <div className="mt-2.5 bg-amber-50 border-2 border-amber-200 p-2 rounded-xl flex items-start gap-1.5 shadow-2xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-black text-amber-950 italic leading-tight">
                    "{story.moral}"
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-4 pt-2.5 border-t-2 border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-black text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  {story.readingTime}
                </span>

                {story.isAvailable ? (
                  <button
                    onClick={() => handleStartStory(story)}
                    className="toy-btn-sky px-4 py-2 rounded-2xl text-white font-black text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Read Story 📖</span>
                  </button>
                ) : (
                  <button
                    onClick={() => soundFX.playPop()}
                    className="toy-btn-yellow px-3 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    <span>Coming Soon ✨</span>
                  </button>
                )}
              </div>

            </div>
          ))}

          {/* "+ ADD NEW STORY" SLOT CARD */}
          <div className="bg-white/80 border-4 border-dashed border-sky-300 rounded-3xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-2.5 hover:bg-white/95 hover:border-sky-400 transition-all cursor-pointer group min-h-[340px]">
            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border-2 border-sky-200 shadow-xs">
              <PlusCircle className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-base font-black text-sky-900">
              Add Your Next Story Here!
            </h3>
            <p className="text-xs text-slate-600 font-semibold max-w-xs leading-relaxed">
              Ready to write new adventures? Easily add story objects inside <code className="bg-sky-100 px-1 py-0.5 rounded text-sky-800 font-bold">storyLibraryData.js</code>!
            </p>
            <div className="bg-sky-100 text-sky-800 text-[11px] font-black px-3.5 py-1 rounded-full border border-sky-300">
              ✨ Multi-Story Shelf Ready
            </div>
          </div>
        </section>

        {/* CUTE FEATURE HIGHLIGHTS FOR KIDS */}
        <section className="w-full bg-white/95 backdrop-blur-md border-4 border-sky-300 p-5 md:p-6 rounded-3xl shadow-lg text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-sky-100 text-sky-800 px-3.5 py-1 rounded-full font-bold text-xs uppercase border border-sky-300">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Storyverse Features for Kids</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>

          <h2 className="text-xl md:text-2xl font-black text-slate-800">
            Everything Little Readers Love! 🎈
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <div 
              onClick={() => soundFX.playPop()}
              className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-300 flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-xs"
            >
              <span className="text-3xl">🎨</span>
              <h4 className="font-black text-amber-950 text-xs">Tap & Explore</h4>
              <p className="text-[11px] font-medium text-slate-600">Touch objects in picture pages to trigger sounds & animations!</p>
            </div>

            <div 
              onClick={() => soundFX.playPop()}
              className="bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-300 flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-xs"
            >
              <span className="text-3xl">🎙️</span>
              <h4 className="font-black text-sky-950 text-xs">Read-Aloud Voice</h4>
              <p className="text-[11px] font-medium text-slate-600">Clear narrator voice reading every story sentence word by word!</p>
            </div>

            <div 
              onClick={() => soundFX.playPop()}
              className="bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-300 flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-xs"
            >
              <span className="text-3xl">🔊</span>
              <h4 className="font-black text-emerald-950 text-xs">Real Sound FX</h4>
              <p className="text-[11px] font-medium text-slate-600">School bells, water glugs, footsteps, and rocket whooshes!</p>
            </div>

            <div 
              onClick={() => soundFX.playPop()}
              className="bg-pink-50 p-3.5 rounded-2xl border-2 border-pink-300 flex flex-col items-center text-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shadow-xs"
            >
              <span className="text-3xl">🏆</span>
              <h4 className="font-black text-pink-950 text-xs">Care Certificate</h4>
              <p className="text-[11px] font-medium text-slate-600">Finish any story adventure to unlock your printable certificate!</p>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}




