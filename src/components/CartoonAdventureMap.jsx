import React from 'react';
import { Compass, Heart, Droplet, Sparkles, MapPin } from 'lucide-react';
import { STORY_SCENES } from '../data/storyData';

export default function CartoonAdventureMap({
  currentScene,
  currentSentenceIndex = 0,
  onSelectScene = () => {}
}) {
  const currentSentence = currentScene?.sentences?.[currentSentenceIndex] || currentScene?.sentences?.[0];
  const plotData = currentSentence?.plotData || { emotionScore: 70, hydrationLevel: 70 };

  const mapStops = [
    { id: 1, name: "Meet Buddy", icon: "🎒" },
    { id: 2, name: "Home Bell", icon: "🔔" },
    { id: 3, name: "Quiet Room", icon: "🪑" },
    { id: 4, name: "Lonely Wait", icon: "💙" },
    { id: 5, name: "Footsteps", icon: "👣" },
    { id: 6, name: "Time Passes", icon: "🕒" },
    { id: 7, name: "Reunion", icon: "✨" },
    { id: 8, name: "Water Refill", icon: "🚰" },
    { id: 9, name: "The Lesson", icon: "🌱" },
    { id: 10, name: "Explorer Choice", icon: "🌟" }
  ];

  // Calculate hearts based on emotion score
  const heartCount = Math.max(1, Math.min(5, Math.ceil(plotData.emotionScore / 20)));

  return (
    <div className="bg-amber-100/90 border-4 border-amber-500 rounded-3xl p-4 md:p-5 text-amber-950 shadow-xl relative overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-2 border-amber-300/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">🎒</span>
          <h3 className="text-lg md:text-xl font-black text-amber-950 flex items-center gap-1.5">
            <span>Dora Explorer Adventure Trail</span>
            <span className="text-xs bg-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400">
              Map Progress
            </span>
          </h3>
        </div>

        {/* Live Cartoon Energy Hearts & Hydration Meter */}
        <div className="flex items-center gap-4 bg-white/90 px-3.5 py-1.5 rounded-2xl border-2 border-amber-400 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="text-xs font-black text-amber-900 mr-1">Buddy Energy:</span>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-4 h-4 transition-all ${
                  idx < heartCount ? 'text-red-500 fill-red-500 scale-110' : 'text-slate-300 fill-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 border-l-2 border-amber-200 pl-3">
            <Droplet className="w-4 h-4 text-sky-500 fill-sky-500" />
            <span className="text-xs font-black text-sky-900">{plotData.hydrationLevel}% Water</span>
          </div>
        </div>
      </div>

      {/* CARTOON TRAIL NODES (DORA MAP STOPS) */}
      <div className="relative w-full overflow-x-auto py-2 scrollbar-none">
        <div className="flex items-center justify-between min-w-[640px] px-4 relative">
          
          {/* Connecting Path Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-3 bg-amber-300 rounded-full border-2 border-amber-400 -z-0" />

          {mapStops.map((stop) => {
            const isActive = stop.id === currentScene.id;
            const isCompleted = stop.id < currentScene.id;

            return (
              <div
                key={stop.id}
                onClick={() => onSelectScene(stop.id)}
                className="relative z-10 flex flex-col items-center cursor-pointer group"
              >
                {/* Active Traveler Avatar Marker */}
                {isActive && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-600 shadow-md animate-bounce flex items-center gap-0.5">
                    <span>💧 HERE!</span>
                  </div>
                )}

                {/* Map Stop Node */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border-4 flex items-center justify-center text-2xl transition-all ${
                    isActive
                      ? 'bg-amber-300 border-amber-600 ring-4 ring-amber-400 scale-110 shadow-lg'
                      : isCompleted
                      ? 'bg-emerald-200 border-emerald-500 shadow-sm'
                      : 'bg-white border-amber-300 group-hover:border-amber-400 group-hover:scale-105'
                  }`}
                >
                  <span>{stop.icon}</span>
                </div>

                {/* Stop Label */}
                <span
                  className={`text-[11px] font-black mt-1.5 text-center max-w-[70px] leading-tight ${
                    isActive ? 'text-amber-950 font-black scale-105' : 'text-amber-900/80 font-bold'
                  }`}
                >
                  {stop.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
