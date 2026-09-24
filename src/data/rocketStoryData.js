// Story Data Model - "The Little Rocket's Big Wish" (Space Curiosity & Dreams Story)

export const ROCKET_STORY_SCENES = [
  {
    id: 1,
    title: "Rocky's Big Wish 🚀⭐",
    badge: null,
    background: "space-launchpad",
    narration: "High up on Space Hill sat Rocky, the bravest little red rocket in the galaxy! 🚀 Rocky looked up at the twinkling night sky every evening with a big dream: 'I want to reach the furthest star and deliver a warm smile across space!'",
    instruction: "🚀 Tap Rocky to test his engine boost!",
    sentences: [
      {
        id: 1,
        text: "High up on Space Hill sat Rocky, the bravest little red rocket in the galaxy! 🚀",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "🚀", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Meet Rocky" }
      },
      {
        id: 2,
        text: "Rocky looked up at the twinkling night sky with a big dream:",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "⭐", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 100, quietnessIndex: 15, storyArcPoint: "The Big Dream" }
      },
      {
        id: 3,
        text: "'I want to reach the furthest star and deliver a warm smile across space!' Rocky cheered.",
        speaker: "ROCKY",
        screenState: { lighting: "twilight", overlayEmoji: "✨", activeFocus: "full", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 20, storyArcPoint: "Space Cheering!" }
      }
    ],
    objects: [
      {
        id: "rocky",
        name: "Rocky Rocket",
        icon: "🚀",
        label: "Rocky Rocket",
        hint: "Tap Rocky!",
        dialogue: "“WHOOSH! Ready for space countdown!” 🚀✨",
        narratorReply: "Rocky's red paint sparkles under the moonlight!",
        soundEffect: "rocket"
      },
      {
        id: "star",
        name: "Friendly Stars",
        icon: "⭐",
        label: "Stars",
        hint: "Tap the stars!",
        dialogue: "Twinkle twinkle! Friendly starlight floating in space!",
        narratorReply: "The stars dance and twinkle for Rocky.",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 2,
    title: "Launching into Starlight 🚀🌌",
    badge: null,
    background: "space-galaxy",
    narration: "3... 2... 1... BLAST OFF! WHOOSH! Golden flames burst from Rocky's boosters as he zoomed past the moon! 🌙 Planets waved hello as Rocky sailed through a sea of sparkling cosmic dust. 'I'm flying!' Rocky cheered happily.",
    instruction: "🌌 Tap the cosmic dust or planets to see them glow!",
    sentences: [
      {
        id: 1,
        text: "3... 2... 1... BLAST OFF! WHOOSH! Golden flames burst from Rocky's boosters!",
        speaker: "SFX",
        screenState: { lighting: "spotlight", overlayEmoji: "🔥", activeFocus: "rocket", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 30, storyArcPoint: "Blast Off!" }
      },
      {
        id: 2,
        text: "He zoomed past the moon and sailed through a sea of sparkling cosmic dust! 🌙✨",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "🌌", activeFocus: "galaxy", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 100, quietnessIndex: 25, storyArcPoint: "Sailing Galaxy" }
      }
    ],
    objects: [
      {
        id: "moon",
        name: "Glowing Moon",
        icon: "🌙",
        label: "Moon",
        hint: "Tap the moon!",
        dialogue: "“Good luck on your space adventure, Rocky!” 🌙",
        narratorReply: "The moon smiles warmly as Rocky zooms by!",
        soundEffect: "sparkle"
      },
      {
        id: "planet",
        name: "Ringed Planet",
        icon: "🪐",
        label: "Planet",
        hint: "Tap the planet!",
        dialogue: "Whoosh! A colorful ringed planet spinning in space!",
        narratorReply: "Rocky does a loop-de-loop around the colorful rings!",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 3,
    title: "The Lost Comet's Sparkle ☄️💎",
    badge: null,
    background: "space-comet",
    narration: "Suddenly, Rocky heard a soft sniffling noise. It was Starry, a tiny lost comet floating in the dark! 'I lost my glowing trail and I can't find my way home,' Starry cried. 😟 What should Rocky do?",
    instruction: "👀 Make a choice! Should Rocky help the lost comet?",
    sentences: [
      {
        id: 1,
        text: "Suddenly, Rocky heard a soft sniffling noise. It was Starry, a tiny lost comet!",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "☄️", activeFocus: "comet", animation: "bounce" },
        plotData: { emotionScore: 70, hydrationLevel: 90, quietnessIndex: 40, storyArcPoint: "Lost Comet" }
      },
      {
        id: 2,
        text: "'I lost my glowing trail and I can't find my way home,' Starry cried.",
        speaker: "COMET",
        screenState: { lighting: "spotlight", overlayEmoji: "😟", activeFocus: "comet", animation: "wiggle" },
        plotData: { emotionScore: 60, hydrationLevel: 90, quietnessIndex: 50, storyArcPoint: "Lost Trail" }
      }
    ],
    quiz: {
      question: "🚀 What should Rocky do?",
      options: [
        { id: "share_light", text: "Share golden starlight! ⭐", isCorrect: true, feedback: "Rocky shares his booster starlight, lighting up Starry's comet trail!" },
        { id: "ignore", text: "Fly away alone 🏃", isCorrect: false, feedback: "Rocky smiles: 'A brave rocket always helps a lost friend in space!'" }
      ]
    },
    objects: [
      {
        id: "starry",
        name: "Starry Comet",
        icon: "☄️",
        label: "Starry Comet",
        hint: "Tap Starry!",
        dialogue: "“Thank you, Rocky! Your starlight is so warm!” ☄️✨",
        narratorReply: "Starry's tail glows bright blue and golden!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 4,
    title: "A Galaxy of Kindness 🌌✨",
    badge: {
      id: "space_explorer_medal",
      name: "Galactic Hero Medal",
      icon: "🏅",
      desc: "Delivered kindness across the stars!"
    },
    background: "space-celebration",
    narration: "Together, Rocky and Starry flew to the highest galaxy! All the stars cheered as Rocky fulfilled his big wish. He had not only reached the furthest star, but also made a lifelong space friend! 💛 Big dreams start with tiny brave steps every single day!",
    instruction: "⭐ Tap the starlight fireworks to celebrate Rocky's galactic victory!",
    sentences: [
      {
        id: 1,
        text: "Together, Rocky and Starry flew to the highest galaxy!",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "🌌", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 95, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Reached Highest Galaxy!" }
      },
      {
        id: 2,
        text: "All the stars cheered! Rocky fulfilled his big wish: Delivering kindness across the galaxy!",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "✨", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 0, storyArcPoint: "Big Wish Fulfilled!" }
      },
      {
        id: 3,
        text: "💛 Big dreams start with tiny brave steps every single day! 🚀⭐",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "🚀", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 0, storyArcPoint: "Moral 1" }
      }
    ],
    objects: [
      {
        id: "rocky-star",
        name: "Rocky & Starry",
        icon: "🚀☄️",
        label: "Space Friends",
        hint: "Tap Rocky & Starry!",
        dialogue: "“Friends forever across the universe!” 🚀🌌",
        narratorReply: "Rocky and Starry loop together around the sparkling stars!",
        soundEffect: "sparkle"
      }
    ]
  }
];
