import React from 'react';
import { X, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORY_BADGES = {
  'dolly-midnight-adventure': [
    { id: 'midnight_magic', name: 'Midnight Magic Explorer', icon: '🎀', desc: 'Discovered Lily the doll coming alive at midnight!' },
    { id: 'golden_key', name: 'Golden Key Finder', icon: '🗝️', desc: 'Found the glowing golden key under the bed.' },
    { id: 'teacup_friend', name: 'Teacup Rabbit Ally', icon: '🐰', desc: 'Team up with Teacup Rabbit to reach high shelves!' },
    { id: 'toy_boat_sailor', name: 'Toy Boat Captain', icon: '⛵', desc: 'Navigated the magical river across the bedroom.' },
    { id: 'castle_hero', name: 'Castle of Lost Toys Hero', icon: '🏰', desc: 'Brought cheer to the lost toys in the castle.' },
    { id: 'kind_friend', name: 'Dollheart Champion 🏆', icon: '🌟', desc: 'Learned that caring for your toys brings magical memories.' }
  ],
  'secret-cave': [
    { id: 'golden_arrow', name: 'Trail Blazer', icon: '🧭', desc: 'Spotted the golden arrow carved into the forest tree!' },
    { id: 'forest_listener', name: 'Whispering Listener', icon: '👂', desc: 'Heard the peaceful melodies of the enchanted woods.' },
    { id: 'loyal_partner', name: 'Loyal Companion', icon: '🤝', desc: 'Milo waited for Toby when the hill got steep.' },
    { id: 'cave_discoverer', name: 'Crystal Cave Pioneer', icon: '💎', desc: 'Discovered the hidden cave behind the waterfall.' },
    { id: 'friendship_anchor', name: 'True Friend Shield', icon: '🦊', desc: 'Proved that friendship is worth more than any treasure.' },
    { id: 'forest_champion', name: 'Woodland Guardian 🏆', icon: '🌟', desc: 'Completed Milo and Toby\'s forest expedition together!' }
  ],
  'bottle-that-waited': [
    { id: 'found_it', name: 'Found It! Explorer', icon: '🔎', desc: 'Found the forgotten water bottle under the desk!' },
    { id: 'empathy', name: 'Empathy Star', icon: '💙', desc: 'Understood how the lonely water bottle felt.' },
    { id: 'listener', name: 'Keen Listener', icon: '👂', desc: 'Listened carefully to the footsteps in the quiet hall.' },
    { id: 'reunion', name: 'Reunion Hero', icon: '✨', desc: 'Helped Aarav locate his bottle under the classroom desk.' },
    { id: 'checklist_master', name: 'Checklist Master', icon: '📋', desc: 'Completed Aarav\'s leaving classroom checklist!' },
    { id: 'care_champion', name: 'Care Champion Badge 🏆', icon: '🌟', desc: 'Chosen an everyday item to care for in real life!' }
  ],
  'curious-rocket': [
    { id: 'space_cadet', name: 'Space Cadet', icon: '🚀', desc: 'Helped Rocky Rocket ignite his starry thrusters!' },
    { id: 'orbit_scout', name: 'Lunar Orbit Scout', icon: '🌙', desc: 'Zoomed past the smiling crescent moon.' },
    { id: 'comet_whisperer', name: 'Comet Whisperer', icon: '☄️', desc: 'Befriended Starry Comet and guided her home.' },
    { id: 'nebula_navigator', name: 'Nebula Navigator', icon: '🪐', desc: 'Steered through the sparkling cosmic cloud cluster.' },
    { id: 'bravery_flame', name: 'Brave Explorer Star', icon: '⭐', desc: 'Discovered that courage means taking one small step.' },
    { id: 'cosmic_master', name: 'Galaxy Champion 🏆', icon: '🌟', desc: 'Explored the wonders of outer space with Rocky!' }
  ],
  'bear-lost-pencil': [
    { id: 'pencil_detective', name: 'Pencil Detective', icon: '✏️', desc: 'Searched the flower meadow for Benny\'s yellow pencil!' },
    { id: 'rainbow_doodler', name: 'Rainbow Doodler', icon: '🌈', desc: 'Sketched bright magical rainbows on parchment.' },
    { id: 'helpful_paw', name: 'Helpful Paw', icon: '🐾', desc: 'Gathered friends to search under the big oak tree.' },
    { id: 'sharing_artist', name: 'Generous Artist', icon: '🎨', desc: 'Shared the golden pencil so all friends could draw.' },
    { id: 'gratitude_badge', name: 'Thankful Heart', icon: '💛', desc: 'Created a thank-you mural for everyone who helped.' },
    { id: 'art_champion', name: 'Meadow Masterpiece 🏆', icon: '🌟', desc: 'Celebrated the joy of creating together!' }
  ]
};

export default function BadgeModal({ isOpen, onClose, earnedBadges = {}, storyId = 'bottle-that-waited' }) {
  if (!isOpen) return null;

  const activeBadges = STORY_BADGES[storyId] || STORY_BADGES['bottle-that-waited'];
  const earnedCount = Object.keys(earnedBadges).length;

  const triggerCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-amber-50 border-4 border-amber-400 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 rounded-full text-amber-900 border-2 border-amber-400 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-300 text-amber-950 px-4 py-1.5 rounded-full text-sm font-black mb-2 shadow-sm">
            <Award className="w-5 h-5 text-amber-900" />
            <span>Explorer Badge Collection</span>
          </div>
          <h3 className="text-3xl font-extrabold text-amber-950">
            {earnedCount} / {activeBadges.length} Badges Unlocked!
          </h3>
          <p className="text-sm font-bold text-amber-800 mt-1">
            Complete story interactions to earn all explorer badges!
          </p>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
          {activeBadges.map((b) => {
            const isUnlocked = Boolean(earnedBadges[b.id]);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border-3 flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-100 to-sky-100 border-amber-400 shadow-md'
                    : 'bg-slate-100 border-slate-300 opacity-50 grayscale'
                }`}
              >
                <span className="text-4xl p-2 bg-white rounded-2xl border border-amber-300 shadow-sm">
                  {b.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-base">{b.name}</h4>
                    {isUnlocked && <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-current" />}
                  </div>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={triggerCelebrate}
            className="btn-game-accent px-6 py-3 rounded-2xl font-black text-amber-950 text-sm flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-900 animate-spin-slow" />
            <span>Celebrate Badges!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
