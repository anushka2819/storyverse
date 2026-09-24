// Story Data Model - "Dolly's Midnight Adventure" (Magical Playful Adventure Story)

export const DOLLY_STORY_SCENES = [
  {
    id: 1,
    title: "Lily's Secret Life 🎀✨",
    badge: null,
    background: "bedroom-night",
    narration: "Everyone thought Lily was just an ordinary doll. But Lily had a secret! Every night, when the house went quiet… she came alive! ✨ One night, Lily opened her button eyes. 'Finally!' she whispered. Tonight was Adventure Night! She climbed down from the bed, grabbed her tiny backpack, and tiptoed across the room.",
    instruction: "🎀 Tap Lily or her backpack to help her start her midnight quest!",
    sentences: [
      {
        id: 1,
        text: "Everyone thought Lily was just an ordinary doll. But Lily had a secret!",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "🎀", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Secret Doll" }
      },
      {
        id: 2,
        text: "Every night, when the house went quiet… she came alive! ✨",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "✨", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 100, quietnessIndex: 15, storyArcPoint: "Came Alive!" }
      },
      {
        id: 3,
        text: "One night, Lily opened her button eyes. 'Finally!' she whispered. Tonight was Adventure Night!",
        speaker: "LILY",
        screenState: { lighting: "twilight", overlayEmoji: "🎒", activeFocus: "full", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 20, storyArcPoint: "Adventure Night!" }
      }
    ],
    objects: [
      {
        id: "lily",
        name: "Lily the Doll",
        icon: "🎀",
        label: "Lily Doll",
        hint: "Tap Lily!",
        dialogue: "“Shh! Time for Adventure Night!” ✨",
        narratorReply: "Lily's button eyes shine bright in the dark!",
        soundEffect: "sparkle"
      },
      {
        id: "backpack",
        name: "Tiny Backpack",
        icon: "🎒",
        label: "Backpack",
        hint: "Tap the backpack!",
        dialogue: "Packed with ribbons, buttons, and courage!",
        narratorReply: "Lily never leaves for an adventure without her backpack!",
        soundEffect: "pop"
      },
      {
        id: "bed",
        name: "Moonlit Bed",
        icon: "🛏️",
        label: "Bed",
        hint: "Tap the bed!",
        dialogue: "Cozy bed where Lily rests during the daytime!",
        narratorReply: "Soft pillows and blankets in the quiet bedroom.",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 2,
    title: "The Golden Key & The Mysterious Door 🗝️🚪✨",
    badge: null,
    background: "bedroom-key",
    narration: "Then she heard a strange sound. CLINK! Something sparkled underneath the bed. Lily crawled closer. It was a tiny golden key! 🗝️✨ Lily picked it up. Suddenly— WHOOSH! A tiny glowing door appeared on the wall! Lily's mouth dropped open. 'Where did THAT come from?' She pushed the door. It opened into a magical forest filled with glowing flowers, floating stars, and tiny houses.",
    instruction: "👀 Make a choice! What should Lily do with the golden key?",
    sentences: [
      {
        id: 1,
        text: "CLINK! Something sparkled underneath the bed. Lily crawled closer.",
        speaker: "SFX",
        screenState: { lighting: "twilight", overlayEmoji: "🗝️", activeFocus: "key", animation: "sparkle" },
        plotData: { emotionScore: 85, hydrationLevel: 95, quietnessIndex: 30, storyArcPoint: "Clink!" }
      },
      {
        id: 2,
        text: "It was a tiny golden key! 🗝️✨ What should Lily do?",
        speaker: "NARRATOR",
        screenState: { lighting: "twilight", overlayEmoji: "✨", activeFocus: "key", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 95, quietnessIndex: 35, storyArcPoint: "Golden Key" }
      },
      {
        id: 3,
        text: "WHOOSH! A tiny glowing door appeared on the wall! 'Where did THAT come from?' Lily whispered.",
        speaker: "LILY",
        screenState: { lighting: "twilight", overlayEmoji: "🚪", activeFocus: "door", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 95, quietnessIndex: 40, storyArcPoint: "Glowing Door" }
      }
    ],
    quiz: {
      question: "👀 What should Lily do with the golden key?",
      options: [
        { id: "take_key", text: "Take it 🗝️", isCorrect: true, feedback: "Sparkle! The golden key fits right into Lily's hand, and a glowing door appears!" },
        { id: "leave_key", text: "Leave it 💤", isCorrect: false, feedback: "Lily giggles: 'I'm too curious! Let me pick up the glowing golden key!'" }
      ]
    },
    objects: [
      {
        id: "key",
        name: "Golden Key",
        icon: "🗝️",
        label: "Golden Key",
        hint: "Tap the glowing key!",
        dialogue: "A tiny shiny golden key that sparkles with magic!",
        narratorReply: "It fits perfectly inside Lily's hand!",
        soundEffect: "sparkle"
      },
      {
        id: "door",
        name: "Glowing Door",
        icon: "🚪",
        label: "Glowing Door",
        hint: "Tap the door!",
        dialogue: "A tiny wooden door carved into the wall glowing with starlight!",
        narratorReply: "Warm golden light streams out from behind the door.",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 3,
    title: "The Teacup Rescue 🐰☕💗",
    badge: {
      id: "teacup_hero",
      name: "Teacup Hero Badge",
      icon: "💗",
      desc: "Rescued the cute teacup rabbit with a sneeze tickle!"
    },
    background: "forest-teacup",
    narration: "But before Lily could step inside… 'HELP!' Someone shouted. Lily looked around. A tiny rabbit was trapped inside a giant teacup! 🐰☕ Lily climbed onto the teacup. She pulled. She pushed. She even tried tickling the rabbit! 'ACHOO!' The rabbit sneezed so hard that— POP! It jumped right out! 'Thank you!' the rabbit laughed. Then it pointed toward the forest. 'Your adventure isn't over.'",
    instruction: "💗 Help Lily rescue the trapped teacup rabbit!",
    sentences: [
      {
        id: 1,
        text: "Before Lily could step inside… 'HELP!' Someone shouted.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🐰", activeFocus: "full", animation: "bounce" },
        plotData: { emotionScore: 80, hydrationLevel: 90, quietnessIndex: 50, storyArcPoint: "Help Call!" }
      },
      {
        id: 2,
        text: "A tiny rabbit was trapped inside a giant teacup! 🐰☕",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "☕", activeFocus: "teacup", animation: "wiggle" },
        plotData: { emotionScore: 70, hydrationLevel: 90, quietnessIndex: 55, storyArcPoint: "Trapped Rabbit" }
      },
      {
        id: 3,
        text: "Lily pulled, pushed, and tickled the rabbit! 'ACHOO!' POP! It jumped right out!",
        speaker: "SFX",
        screenState: { lighting: "bright", overlayEmoji: "🎉", activeFocus: "full", animation: "rocket" },
        plotData: { emotionScore: 95, hydrationLevel: 90, quietnessIndex: 40, storyArcPoint: "Sneeze POP!" }
      },
      {
        id: 4,
        text: "'Thank you!' the rabbit laughed. 'Your adventure isn't over yet!'",
        speaker: "RABBIT",
        screenState: { lighting: "bright", overlayEmoji: "💗", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 90, quietnessIndex: 30, storyArcPoint: "Rescued!" }
      }
    ],
    quiz: {
      question: "🐰 Help the tiny teacup rabbit?",
      options: [
        { id: "help_rabbit", text: "Help! 💗", isCorrect: true, feedback: "Lily tickles the rabbit! ACHOO! POP! The rabbit sneezes right out of the cup!" },
        { id: "run_away", text: "Run away! 🏃‍♀️", isCorrect: false, feedback: "Lily says: 'No way! I can't leave this cute little bunny stuck!'" }
      ]
    },
    objects: [
      {
        id: "teacup",
        name: "Giant Teacup",
        icon: "☕",
        label: "Teacup",
        hint: "Tap the teacup!",
        dialogue: "A pretty floral teacup where the rabbit got stuck!",
        narratorReply: "Lily climbed right onto the rim to help!",
        soundEffect: "pop"
      },
      {
        id: "bunny",
        name: "Teacup Bunny",
        icon: "🐰",
        label: "Bunny",
        hint: "Tap the bunny!",
        dialogue: "“ACHOO! Thank you for helping me, Lily!” 💗",
        narratorReply: "The tiny rabbit hops happily beside Lily!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 4,
    title: "The Toy Block Boat ⛵🧸",
    badge: null,
    background: "forest-river",
    narration: "Lily followed the rabbit until they reached a sparkling river. On the other side stood a castle made entirely of toys! 🏰🧸 But there was no bridge. 'I'm a doll,' Lily giggled. 'Of course I can build a boat!' She found a toy block, a spoon, and a ribbon. POP. TIE. PUSH. Her tiny boat was ready. Across the river she sailed!",
    instruction: "⛵ Choose how Lily should cross the sparkling river!",
    sentences: [
      {
        id: 1,
        text: "Lily followed the rabbit until they reached a sparkling river.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🌊", activeFocus: "river", animation: "bounce" },
        plotData: { emotionScore: 85, hydrationLevel: 80, quietnessIndex: 40, storyArcPoint: "Sparkling River" }
      },
      {
        id: 2,
        text: "On the other side stood a castle made entirely of toys! 🏰🧸 But there was no bridge.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🏰", activeFocus: "castle", animation: "sparkle" },
        plotData: { emotionScore: 90, hydrationLevel: 80, quietnessIndex: 35, storyArcPoint: "Toy Castle!" }
      },
      {
        id: 3,
        text: "'I'm a doll,' Lily giggled. 'Of course I can build a boat!' She found a block, a spoon, and a ribbon.",
        speaker: "LILY",
        screenState: { lighting: "bright", overlayEmoji: "⛵", activeFocus: "boat", animation: "rocket" },
        plotData: { emotionScore: 100, hydrationLevel: 80, quietnessIndex: 25, storyArcPoint: "Toy Boat Sailing!" }
      }
    ],
    quiz: {
      question: "⛵ How should Lily cross the sparkling river?",
      options: [
        { id: "build_boat", text: "Build a boat! ⛵", isCorrect: true, feedback: "POP. TIE. PUSH! Her tiny toy block boat sails smoothly across!" },
        { id: "jump", text: "Jump! 🦘", isCorrect: false, feedback: "Lily giggles: 'The river is too wide to jump, let's build a toy block boat!'" }
      ]
    },
    objects: [
      {
        id: "boat",
        name: "Toy Block Boat",
        icon: "⛵",
        label: "Toy Boat",
        hint: "Tap the toy boat!",
        dialogue: "A colorful toy block boat with a spoon paddle and ribbon sail!",
        narratorReply: "It floats like a charm across the glittery water!",
        soundEffect: "water"
      },
      {
        id: "castle",
        name: "Toy Castle",
        icon: "🏰",
        label: "Toy Castle",
        hint: "Tap the castle!",
        dialogue: "A grand castle built from building blocks, teddy bears, and toy trains!",
        narratorReply: "Golden lights shine from every tower!",
        soundEffect: "sparkle"
      }
    ]
  },
  {
    id: 5,
    title: "The Castle of Lost Toys 🏰🧸🪀🎈",
    badge: {
      id: "toy_finder_hero",
      name: "Toy Rescue Champion",
      icon: "🏅",
      desc: "Helped hundreds of lost toys find their way home!"
    },
    background: "toy-castle",
    narration: "When Lily reached the castle, the golden key began to glow. She placed it inside a tiny golden door. CLICK! The castle doors swung open. Inside was a room filled with… HUNDREDS OF LOST TOYS! 🧸🪀🎈 They had been waiting for someone to find them. Lily smiled. 'Looks like I found my adventure.' She helped every toy find its way home.",
    instruction: "🧸 Tap the lost toys to help Lily guide them home!",
    sentences: [
      {
        id: 1,
        text: "When Lily reached the castle, the golden key began to glow. CLICK!",
        speaker: "SFX",
        screenState: { lighting: "spotlight", overlayEmoji: "🗝️", activeFocus: "door", animation: "sparkle" },
        plotData: { emotionScore: 90, hydrationLevel: 80, quietnessIndex: 30, storyArcPoint: "Key Glows!" }
      },
      {
        id: 2,
        text: "Inside was a room filled with… HUNDREDS OF LOST TOYS! 🧸🪀🎈",
        speaker: "NARRATOR",
        screenState: { lighting: "spotlight", overlayEmoji: "🧸", activeFocus: "toys", animation: "bounce" },
        plotData: { emotionScore: 95, hydrationLevel: 80, quietnessIndex: 20, storyArcPoint: "Lost Toys Room" }
      },
      {
        id: 3,
        text: "They had been waiting for someone to find them. Lily smiled: 'Looks like I found my adventure!'",
        speaker: "LILY",
        screenState: { lighting: "spotlight", overlayEmoji: "✨", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 80, quietnessIndex: 10, storyArcPoint: "Guided Toys Home" }
      }
    ],
    objects: [
      {
        id: "teddy",
        name: "Lost Teddy Bear",
        icon: "🧸",
        label: "Teddy Bear",
        hint: "Tap Teddy!",
        dialogue: "“Hooray! Lily found us!” 🧸",
        narratorReply: "Teddy gives Lily a big plush hug!",
        soundEffect: "sparkle"
      },
      {
        id: "yoyo",
        name: "Toy Yo-Yo",
        icon: "🪀",
        label: "Yo-Yo",
        hint: "Tap Yo-Yo!",
        dialogue: "Spin spin! Ready to go home!",
        narratorReply: "The red yo-yo spins happily!",
        soundEffect: "pop"
      },
      {
        id: "balloon",
        name: "Party Balloons",
        icon: "🎈",
        label: "Balloons",
        hint: "Tap Balloons!",
        dialogue: "Float float! Party time!",
        narratorReply: "Bright red and yellow balloons float to the ceiling!",
        soundEffect: "pop"
      }
    ]
  },
  {
    id: 6,
    title: "A Tiny Doll Smile 🎀👀✨",
    badge: {
      id: "button_eyes_magic",
      name: "Magical Secret Medal",
      icon: "🎀",
      desc: "Kept the magical secret of doll adventure night!"
    },
    background: "bedroom-sunrise",
    narration: "And just before sunrise… Lily hurried back to the bedroom. She climbed onto the bed. WHOOSH! The magical door disappeared. Lily became a normal doll again. The bedroom door opened. Her little girl walked in. She picked Lily up. 'Hmm…' Lily's golden key was still in her hand. Her little girl gasped. 'Lily… were you REALLY on an adventure?' 👀✨ Lily couldn't answer. She only smiled her tiny doll smile. But if you look very carefully… You might see her button eyes sparkle. 🎀✨",
    instruction: "🌅 Tap Lily to see her button eyes sparkle in the morning sunlight!",
    sentences: [
      {
        id: 1,
        text: "Just before sunrise, Lily hurried back and climbed onto the bed. WHOOSH! The door disappeared.",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🌅", activeFocus: "bed", animation: "bounce" },
        plotData: { emotionScore: 90, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Returned Home" }
      },
      {
        id: 2,
        text: "Her little girl walked in and picked Lily up. 'Hmm…' The golden key was still in her hand!",
        speaker: "GIRL",
        screenState: { lighting: "bright", overlayEmoji: "🗝️", activeFocus: "key", animation: "sparkle" },
        plotData: { emotionScore: 95, hydrationLevel: 100, quietnessIndex: 10, storyArcPoint: "Golden Key Found!" }
      },
      {
        id: 3,
        text: "Her little girl gasped: 'Lily… were you REALLY on an adventure?' 👀✨",
        speaker: "GIRL",
        screenState: { lighting: "bright", overlayEmoji: "👀", activeFocus: "lily", animation: "bounce" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 5, storyArcPoint: "Secret Gasp!" }
      },
      {
        id: 4,
        text: "Lily couldn't answer. She only smiled her tiny doll smile. But if you look very carefully… You might see her button eyes sparkle. 🎀✨",
        speaker: "NARRATOR",
        screenState: { lighting: "bright", overlayEmoji: "🎀", activeFocus: "full", animation: "sparkle" },
        plotData: { emotionScore: 100, hydrationLevel: 100, quietnessIndex: 0, storyArcPoint: "Button Eyes Sparkle!" }
      }
    ],
    objects: [
      {
        id: "eyes",
        name: "Sparkle Button Eyes",
        icon: "👀",
        label: "Button Eyes",
        hint: "Tap Lily's eyes!",
        dialogue: "✨ Blink blink! Lily's secret button eyes sparkle!",
        narratorReply: "A secret smile that only true believers can see!",
        soundEffect: "sparkle"
      },
      {
        id: "sun",
        name: "Morning Sun",
        icon: "🌅",
        label: "Morning Sun",
        hint: "Tap the sunrise!",
        dialogue: "Golden morning rays stream into the bedroom window.",
        narratorReply: "A brand new day begins for Lily and her little girl!",
        soundEffect: "pop"
      }
    ]
  }
];
