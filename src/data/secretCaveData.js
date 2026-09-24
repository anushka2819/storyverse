// Story Data Model - "The Secret Cave" (Interactive Adventure Story)

export const SECRET_CAVE_SCENES = [
  {
    id: 1,
    title: "Two Best Friends in the Forest 🌲🦊🐰",
    badge: null,
    background: "forest-sunny",
    narration: "Deep inside a huge green forest lived Milo the little fox and his best friend, Toby the rabbit. 🦊🐰 They did everything together!",
    instruction: "🌲 Tap Milo or Toby to play with them in the sunny forest!",
    sentences: [
      {
        id: 1,
        text: "Deep inside a huge green forest lived Milo the little fox 🦊 and his best friend, Toby the rabbit 🐰.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🌲", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 95, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Best Friends" }
      },
      {
        id: 2,
        text: "They did everything together — playing tag, sharing snacks, and exploring the woods!",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🦊", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 15, storyArcPoint: "Forest Fun" }
      }
    ],
    objects: [
      {
        id: "milo",
        name: "Milo the Fox",
        icon: "🦊",
        label: "Milo the Fox",
        hint: "Tap Milo to hear him whisper!",
        dialogue: "“I love exploring the forest with Toby!” 🌲",
        narratorReply: "Milo is always energetic and ready for an adventure!",
        soundEffect: "pop"
      },
      {
        id: "toby",
        name: "Toby the Rabbit",
        icon: "🐰",
        label: "Toby the Rabbit",
        hint: "Tap Toby to see him hop!",
        dialogue: "“Milo is my best friend in the whole world!” 🐰✨",
        narratorReply: "Toby loves staying close to Milo everywhere they go!",
        soundEffect: "sparkle"
      },
      {
        id: "tree",
        name: "Giant Oak Tree",
        icon: "🌲",
        label: "Giant Tree",
        hint: "Tap to hear the leaves rustle!",
        dialogue: "“Rustle rustle! What a lovely sunny morning in the woods!” 🍃",
        narratorReply: "The ancient forest trees stand tall and strong.",
        soundEffect: "pop"
      },
      {
        id: "flowers",
        name: "Forest Flowers",
        icon: "🌸",
        label: "Forest Flowers",
        hint: "Tap to smell sweet flowers!",
        dialogue: "“Smell the sweet forest flowers!” 🌸",
        narratorReply: "Bright pink and yellow flowers bloom all along the path.",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 2,
    title: "The Golden Arrow 🧭✨",
    badge: null,
    background: "forest-arrow",
    narration: "One morning, Milo found something incredible! A tiny golden arrow was carved into a tree. It pointed deep into the forest. 'Look!' Milo whispered. 'Toby… I think it leads to the Secret Cave!' They grabbed their little backpacks and set off.",
    instruction: "👀 Make a choice! Should they follow the golden arrow?",
    sentences: [
      {
        id: 1,
        text: "One morning, Milo found something incredible! A tiny golden arrow was carved into a tree.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "✨", activeFocus: "tree", animation: "sparkle" },
        plotData: { emotionScore: 90, hydrationLevel: 95, quietnessIndex: 20, storyArcPoint: "Golden Arrow" }
      },
      {
        id: 2,
        text: "It pointed deep into the forest. 'Look!' Milo whispered. 'Toby… I think it leads to the Secret Cave!'",
        speaker: "MILO",
        screenState: { lighting: "bright", overlayEmoji: "🗺️", activeFocus: "arrow", animation: "bounce" },
        plotData: { emotionScore: 95, hydrationLevel: 95, quietnessIndex: 25, storyArcPoint: "Secret Cave Discovery" }
      },
      {
        id: 3,
        text: "They grabbed their little backpacks and set off on their mystery quest!",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎒", activeFocus: "full", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 95, quietnessIndex: 30, storyArcPoint: "Pack Backpacks!" }
      }
    ],
    quiz: {
      question: "👀 Should Milo and Toby follow the golden arrow?",
      options: [
        { id: "yes", text: "Yes! Follow the arrow! 🗺️", isCorrect: true, feedback: "Hooray! An exciting adventure begins into the deep woods!" },
        { id: "home", text: "Go home 🏠", isCorrect: false, feedback: "Toby wiggles: 'Wait for me, Milo! I want to follow the golden arrow with you!'" }
      ]
    },
    objects: [
      {
        id: "arrow",
        name: "Golden Arrow",
        icon: "🧭",
        label: "Golden Arrow",
        hint: "Tap the glowing arrow!",
        dialogue: "✨ The golden arrow sparkles and points toward the Secret Cave!",
        narratorReply: "Who carved this golden arrow? It glows softly in the sunlight!",
        soundEffect: "sparkle"
      },
      {
        id: "backpacks",
        name: "Little Backpacks",
        icon: "🎒",
        label: "Backpacks",
        hint: "Tap to check their gear!",
        dialogue: "Packed with water, forest maps, and sweet berries!",
        narratorReply: "Milo and Toby are fully prepared explorers!",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 3,
    title: "Through the Forest & The Steep Hill 🏞️⛰️",
    badge: null,
    background: "forest-hill",
    narration: "They followed the arrow through tall grass, across a tiny stream, and between enormous trees. Then they reached a steep hill. Milo climbed quickly! But Toby struggled behind. 'Wait for me!' Toby called.",
    instruction: "🏞️ Tap the stream or steep hill to help them explore!",
    sentences: [
      {
        id: 1,
        text: "They followed the arrow through tall grass, across a tiny stream, and between enormous trees.",
        speaker: "NARRATOR",
        screenState: { lighting: "afternoon", overlayEmoji: "🌊", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 85, hydrationLevel: 85, quietnessIndex: 35, storyArcPoint: "Crossing Stream" }
      },
      {
        id: 2,
        text: "Then they reached a steep hill. Milo climbed quickly to the top!",
        speaker: "MILO",
        screenState: { lighting: "afternoon", overlayEmoji: "⛰️", activeFocus: "hill", animation: "rocket" },
        plotData: { emotionScore: 90, hydrationLevel: 80, quietnessIndex: 40, storyArcPoint: "Climbing Hill" }
      },
      {
        id: 3,
        text: "But Toby struggled behind. 'Wait for me!' Toby called out.",
        speaker: "TOBY",
        screenState: { lighting: "afternoon", overlayEmoji: "😟", activeFocus: "toby", animation: "wiggle" },
        plotData: { emotionScore: 65, hydrationLevel: 75, quietnessIndex: 50, storyArcPoint: "Toby Lags Behind" }
      }
    ],
    objects: [
      {
        id: "stream",
        name: "Tiny Stream",
        icon: "💧",
        label: "Forest Stream",
        hint: "Tap to hear water splash!",
        dialogue: "Splash! Cool, fresh water trickling over smooth pebbles!",
        narratorReply: "Milo leaped across with a big jump!",
        soundEffect: "water"
      },
      {
        id: "hill",
        name: "Steep Hill",
        icon: "⛰️",
        label: "Steep Hill",
        hint: "Tap the steep slope!",
        dialogue: "A steep rocky slope leading up toward the golden cave light!",
        narratorReply: "It takes extra effort to climb up this steep path.",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 4,
    title: "Toby in Trouble! 😟🪨",
    badge: null,
    background: "forest-trapped",
    narration: "Milo turned around. The cave entrance was just ahead! He could almost see the golden light inside. But Toby was stuck. His little foot was trapped between two rocks! 😟 What should Milo do?",
    instruction: "😟 Make a choice! Should Milo keep going or help Toby?",
    sentences: [
      {
        id: 1,
        text: "Milo turned around. The cave entrance was just ahead! He could almost see the golden light inside.",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "✨", activeFocus: "cave", animation: "sparkle" },
        plotData: { emotionScore: 80, hydrationLevel: 70, quietnessIndex: 60, storyArcPoint: "Cave Ahead!" }
      },
      {
        id: 2,
        text: "But Toby was stuck! His little foot was trapped between two heavy rocks!",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "😟", activeFocus: "rocks", animation: "wiggle" },
        plotData: { emotionScore: 40, hydrationLevel: 65, quietnessIndex: 75, storyArcPoint: "Foot Trapped!" }
      },
      {
        id: 3,
        text: "Milo looked at the cave. Then he looked at his best friend trapped on the rocks...",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "❤️", activeFocus: "milo", animation: "bounce" },
        plotData: { emotionScore: 50, hydrationLevel: 65, quietnessIndex: 80, storyArcPoint: "The Big Choice" }
      }
    ],
    quiz: {
      question: "😟 What should Milo do?",
      options: [
        { id: "keep_going", text: "Keep going alone 🏃", isCorrect: false, feedback: "Milo stops: 'No way! I can't leave my best friend behind!'" },
        { id: "help_toby", text: "Help Toby ❤️", isCorrect: true, feedback: "Milo runs back without thinking twice! True friends stick together!" }
      ]
    },
    objects: [
      {
        id: "rocks",
        name: "Trapped Rocks",
        icon: "🪨",
        label: "Heavy Rocks",
        hint: "Tap the heavy rocks!",
        dialogue: "Oh no! Heavy grey rocks wedged against Toby's foot!",
        narratorReply: "Toby needs Milo's help right away!",
        soundEffect: "pop"
      },
      {
        id: "cave-light",
        name: "Cave Entrance Light",
        icon: "✨",
        label: "Cave Light",
        hint: "Tap the cave glow!",
        dialogue: "Golden light shimmers from the cave just up ahead.",
        narratorReply: "The secret cave is so close, but friendship comes first!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 5,
    title: "True Friends Stick Together! 💪❤️",
    badge: {
      id: "true_friend",
      name: "True Friend Badge",
      icon: "❤️",
      desc: "Milo stayed with Toby when it mattered most!"
    },
    background: "forest-rescue",
    narration: "Milo looked at the cave. Then he looked at Toby. Without thinking twice, he ran back. 'I'm not leaving you!' He pushed the rocks. Nothing. He pushed again... GRRRR! The rock finally moved! Toby pulled his foot free. 'You came back for me,' he whispered. Milo smiled: 'Of course. What's the point of finding a secret without my best friend?' ❤️",
    instruction: "💪 Tap the rocks to help Milo push them and free Toby!",
    sentences: [
      {
        id: 1,
        text: "Milo looked at the cave. Then he looked at Toby. Without thinking twice, he ran back! 'I'm not leaving you!'",
        speaker: "MILO",
        screenState: { lighting: "reunion", overlayEmoji: "❤️", activeFocus: "milo", animation: "bounce" },
        plotData: { emotionScore: 85, hydrationLevel: 65, quietnessIndex: 50, storyArcPoint: "Ran Back to Help" }
      },
      {
        id: 2,
        text: "He pushed the rocks. Nothing. He pushed again... GRRRR! The rock finally moved!",
        speaker: "SFX",
        screenState: { lighting: "reunion", overlayEmoji: "🪨", activeFocus: "rocks", animation: "rocket" },
        plotData: { emotionScore: 90, hydrationLevel: 65, quietnessIndex: 40, storyArcPoint: "Rocks Move!" }
      },
      {
        id: 3,
        text: "Toby pulled his foot free! 'You came back for me,' he whispered.",
        speaker: "TOBY",
        screenState: { lighting: "reunion", overlayEmoji: "🥹", activeFocus: "toby", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 65, quietnessIndex: 30, storyArcPoint: "Foot Free!" }
      },
      {
        id: 4,
        text: "Milo smiled. 'Of course. What's the point of finding a secret without my best friend?' ❤️",
        speaker: "MILO",
        screenState: { lighting: "reunion", overlayEmoji: "🦊", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 65, quietnessIndex: 20, storyArcPoint: "Best Friends Reunited" }
      }
    ],
    objects: [
      {
        id: "rock-push",
        name: "Rock Push",
        icon: "🪨",
        label: "Push Rock",
        hint: "Tap to help push!",
        dialogue: "GRRRR! Pushing with all their strength!",
        narratorReply: "Together, Milo's push freed Toby's trapped foot!",
        soundEffect: "sparkle"
      },
      {
        id: "hug",
        name: "Toby's Hug",
        icon: "🐰",
        label: "Toby's Hug",
        hint: "Tap Toby!",
        dialogue: "“Thank you, Milo! You are the best friend ever!” 🥹❤️",
        narratorReply: "Toby hugs Milo tightly!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 6,
    title: "Inside the Glowing Secret Cave ✨💎🌌",
    badge: null,
    background: "cave-glowing",
    narration: "Together, they continued. At last, they reached the cave! Inside was the most beautiful thing they had ever seen. Tiny crystals covered the walls. A glowing blue lake sparkled in the darkness. And hundreds of fireflies danced above them like stars! ✨ 'Milo...' 'We found it.' 'No. We found it together.'",
    instruction: "✨ Tap the glowing crystals or fireflies to see them sparkle!",
    sentences: [
      {
        id: 1,
        text: "Together, they continued. At last, they reached the secret cave!",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "⛰️", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 60, quietnessIndex: 30, storyArcPoint: "Reached Cave!" }
      },
      {
        id: 2,
        text: "Inside was the most beautiful thing they had ever seen! Tiny crystals covered the walls.",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "💎", activeFocus: "crystals", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 60, quietnessIndex: 20, storyArcPoint: "Glowing Crystals" }
      },
      {
        id: 3,
        text: "A glowing blue lake sparkled, and hundreds of fireflies danced above them like stars! ✨",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "✨", activeFocus: "lake", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Fireflies & Lake" }
      },
      {
        id: 4,
        text: "Toby stared in amazement. 'Milo… We found it.' 'No,' Toby smiled. 'We found it together.'",
        speaker: "TOBY",
        screenState: { lighting: "twilight", overlayEmoji: "🦊", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Found It Together" }
      }
    ],
    objects: [
      {
        id: "crystals",
        name: "Glowing Crystals",
        icon: "💎",
        label: "Wall Crystals",
        hint: "Tap the crystals!",
        dialogue: "Shimmer shimmer! Magic blue, violet, and golden crystals!",
        narratorReply: "The crystals light up the whole cavern like magic lanterns!",
        soundEffect: "sparkle"
      },
      {
        id: "fireflies",
        name: "Dancing Fireflies",
        icon: "✨",
        label: "Fireflies",
        hint: "Tap the fireflies!",
        dialogue: "Bzz-sparkle! Hundreds of warm golden fireflies floating gently!",
        narratorReply: "They dance around Milo and Toby like tiny flying stars!",
        soundEffect: "sparkle"
      },
      {
        id: "lake",
        name: "Glowing Blue Lake",
        icon: "🌊",
        label: "Glowing Lake",
        hint: "Tap the water!",
        dialogue: "Glisten! A crystal clear underground lake reflecting the glowing stars!",
        narratorReply: "The water is so still and pure.",
        soundEffect: "water"
      }
    ]
  },
  {
    id: 7,
    title: "The Most Precious Treasure 💛🫐✨",
    badge: {
      id: "true_friendship_treasure",
      name: "Golden Friendship Medal",
      icon: "🏅",
      desc: "Learned that friendship is the greatest adventure!"
    },
    background: "cave-lake-night",
    narration: "They sat beside the glowing lake, sharing the last of their berries. For a while, neither said anything. They didn't need to. They had learned something more precious than anything inside the cave: 💛 A real friend doesn't leave you behind just because the adventure is waiting. 🐾 And sometimes, the best part of the journey isn't reaching the destination... It's making sure your friend gets there with you.",
    instruction: "🫐 Tap the berries to feed Milo and Toby as they celebrate!",
    sentences: [
      {
        id: 1,
        text: "They sat beside the glowing lake, sharing the last of their berries.",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "🫐", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Sharing Berries" }
      },
      {
        id: 2,
        text: "They had learned something more precious than anything inside the cave:",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "💛", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Friendship Lesson" }
      },
      {
        id: 3,
        text: "💛 A real friend doesn't leave you behind just because the adventure is waiting.",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "✨", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Moral 1" }
      },
      {
        id: 4,
        text: "🐾 And sometimes, the best part of the journey isn't reaching the destination… It's making sure your friend gets there with you. ❤️",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "🦊", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Moral 2" }
      }
    ],
    objects: [
      {
        id: "berries",
        name: "Forest Berries",
        icon: "🫐",
        label: "Sweet Berries",
        hint: "Tap to share berries!",
        dialogue: "Yum yum! Sweet blueberry treats shared by best friends!",
        narratorReply: "Sharing snacks together makes them taste twice as sweet!",
        soundEffect: "sparkle"
      },
      {
        id: "milo-toby-hug",
        name: "Milo & Toby",
        icon: "🦊🐰",
        label: "Best Friends",
        hint: "Tap Milo and Toby!",
        dialogue: "“Best friends forever and ever!” 💛",
        narratorReply: "Milo and Toby sit shoulder to shoulder by the glowing water.",
        soundEffect: "sparkle"
      }
    ]
  }
];
