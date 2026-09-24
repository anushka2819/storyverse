// Story Data Model - "Benny Bear & The Magic Pencil" (Sharing & Creativity Story)

export const BEAR_STORY_SCENES = [
  {
    id: 1,
    title: "The Golden Pencil ✏️✨",
    badge: null,
    background: "forest-sunny",
    narration: "Deep inside Cozy Forest lived Benny Bear! 🐻 Benny loved drawing beautiful rainbow doodles with his favorite golden magic pencil. ✏️ Wherever Benny drew, golden sparkles danced in the air!",
    instruction: "✏️ Tap Benny Bear or his golden pencil to draw rainbow doodles!",
    sentences: [
      {
        id: 1,
        text: "Deep inside Cozy Forest lived Benny Bear! 🐻",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🐻", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Meet Benny Bear" }
      },
      {
        id: 2,
        text: "Benny loved drawing beautiful rainbow doodles with his favorite golden magic pencil! ✏️🌈",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎨", activeFocus: "pencil", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 15, storyArcPoint: "Magic Pencil" }
      }
    ],
    objects: [
      {
        id: "benny",
        name: "Benny Bear",
        icon: "🐻",
        label: "Benny Bear",
        hint: "Tap Benny!",
        dialogue: "“Wiggle wiggle! Let's draw something wonderful!” 🎨",
        narratorReply: "Benny wiggles his cozy bear ears with joy!",
        soundEffect: "pop"
      },
      {
        id: "pencil",
        name: "Golden Pencil",
        icon: "✏️",
        label: "Golden Pencil",
        hint: "Tap the pencil!",
        dialogue: "Sparkle sparkle! Leaving a trail of rainbow doodles!",
        narratorReply: "The magic pencil leaves golden starry dust wherever it moves.",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 2,
    title: "The Forest Art Decision 🐻✏️",
    badge: null,
    background: "forest-hill",
    narration: "One afternoon, Benny met his forest friends: Penny the squirrel and Oliver the owl. 🐿️🦉 They were trying to build a colorful sign for the forest library, but they ran out of crayons! 😟 What should Benny do?",
    instruction: "👀 Make a choice! Should Benny share his magic pencil?",
    sentences: [
      {
        id: 1,
        text: "One afternoon, Benny met his forest friends: Penny the squirrel and Oliver the owl.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🐿️", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 80, hydrationLevel: 90, quietnessIndex: 25, storyArcPoint: "Forest Friends" }
      },
      {
        id: 2,
        text: "They were trying to build a colorful sign for the forest library, but ran out of crayons!",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎨", activeFocus: "crayons", animation: "wiggle" },
        plotData: { emotionScore: 70, hydrationLevel: 90, quietnessIndex: 35, storyArcPoint: "Ran Out of Crayons" }
      }
    ],
    quiz: {
      question: "✏️ Should Benny share his golden magic pencil?",
      options: [
        { id: "share_pencil", text: "Share the pencil! 🎨", isCorrect: true, feedback: "Hooray! Sharing the pencil makes rainbow doodles appear everywhere in the forest!" },
        { id: "keep_pencil", text: "Keep it hidden 🤫", isCorrect: false, feedback: "Benny smiles: 'Art is so much more fun when shared with good friends!'" }
      ]
    },
    objects: [
      {
        id: "friends",
        name: "Forest Friends",
        icon: "🐿️🦉",
        label: "Friends",
        hint: "Tap the friends!",
        dialogue: "“Thank you, Benny! You are so kind!” 💖",
        narratorReply: "Penny and Oliver cheer happily!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 3,
    title: "The Masterpiece of Friendship 🎨🐻🌈",
    badge: {
      id: "masterpiece_creator",
      name: "Rainbow Art Medal",
      icon: "🎨",
      desc: "Created a magical forest masterpiece together!"
    },
    background: "forest-rescue",
    narration: "Together, Benny and his friends drew a magnificent rainbow bridge connecting all the forest trees! 🌈✨ Everyone cheered and shared sweet honey berries under the glowing artwork. 💛 Creativity grows much brighter when shared with good friends!",
    instruction: "🎨 Tap the rainbow bridge to see magic sparkles fill the forest!",
    sentences: [
      {
        id: 1,
        text: "Together, Benny and his friends drew a magnificent rainbow bridge connecting all the forest trees! 🌈✨",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🌈", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Rainbow Masterpiece!" }
      },
      {
        id: 2,
        text: "Everyone cheered and shared sweet honey berries under the glowing artwork! 🍯🐻",
        speaker: "BENNY",
        screenState: { lighting: "bright", overlayEmoji: "🐻", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Honey Berries Feast" }
      },
      {
        id: 3,
        text: "💛 Creativity grows much brighter when shared with good friends! 🎨🐻🌈",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎨", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 0, storyArcPoint: "Moral 1" }
      }
    ],
    objects: [
      {
        id: "rainbow",
        name: "Rainbow Bridge",
        icon: "🌈",
        label: "Rainbow Bridge",
        hint: "Tap the rainbow!",
        dialogue: "Glow glow! A magical rainbow glowing in Cozy Forest!",
        narratorReply: "The rainbow artwork fills the forest with happiness!",
        soundEffect: "sparkle"
      }
    ]
  }
];
