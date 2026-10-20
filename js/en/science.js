/* باغچه — علوم (science and nature) lessons in English, for children learning English as a second language.
   Each entry lays English words over the Persian lesson with the same id (js/lessons/science.js); steps and lists
   are matched by position, {} leaves a step as it is. See js/english-mode.js. */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};
(function () {
  var GUESS = { prompt: "Guess first, then try it!" };
  // English names for the guess-and-see practice things (science-seed-p3 and science-sprout-p3).
  var GUESS_EN = { ball: "ball", orange: "orange", apple: "apple", tin: "tin on its side", marble: "marble", book: "book", block: "brick", box: "box", eraser: "eraser",
    spoon: "spoon", wood: "piece of wood", leaf: "leaf", duck: "plastic duck", cork: "cork", stone: "stone", key: "key", coin: "coin", clip: "paper clip", nail: "iron screw",
    pin: "safety pin", paper: "paper", pencil: "pencil", cup: "plastic cup", raincoat: "raincoat", umbrella: "umbrella", bag: "plastic bag", foil: "foil", tissue: "tissue",
    towel: "towel", sock: "cotton sock" };

  Object.assign(B.EN, {
    // ---------------- Seed ----------------
    "science-seed-1": { title: "Alive or not alive?", steps: [
      { prompt: "Watch what happens",
        scenes: [
          { caption: "This is a kitten." },
          { caption: "The kitten drinks milk." },
          { caption: "Days go by and the kitten grows big." },
          { caption: "This is a ball. A ball does not eat and does not grow." },
          { caption: "This plant drinks water and grows." },
          { caption: "The plant has a flower!" },
          { caption: "The cat and the flower are alive. The ball is not alive.", wait: { hint: "Now you find them: tap the living things!" } }
        ],
        question: "Which one is alive?",
        options: [{ value: "doll" }, { value: "fish" }, { value: "shoe" }], answer: "fish" },
      { prompt: "Living things on one side, non-living things on the other",
        say: "Put the living things in one basket and the non-living things in the other basket.",
        baskets: [{ label: "alive" }, { label: "not alive" }],
        items: [{ say: "tree" }, { say: "ladybug" }, { say: "sparrow" }, { say: "spoon" }, { say: "car" }, { say: "pencil" }] },
      { prompt: "A car moves. Is it alive?", say: "A car moves. Is a car alive?",
        options: ["It is alive", "It is not alive"], answer: "It is not alive" },
      { text: "Look for living things in the yard or on the street.",
        need: ["a small basket or bag", "paper and crayons"],
        steps: [
          "Walk with your child in the yard, the park or the street.",
          "Name everything you see and ask: “Is this alive? How do you know?”",
          "Collect a few non-living things, like a stone and a button, in the basket. Do not touch animals or plants you do not know.",
          "At home, your child draws one living thing and one non-living thing."
        ],
        ask: "A cloud moves. Is it alive? Why?" }
    ] },
    "science-seed-2": { title: "The five senses", steps: [
      { prompt: "Our senses",
        scenes: [
          { caption: "We see with our eyes: a rainbow!" },
          { caption: "We hear with our ears: a sparrow sings!" },
          { caption: "We smell with our nose: a red rose!" },
          { caption: "We taste with our tongue: sweet watermelon!" },
          { caption: "We touch with our hand: the sheep's soft wool!", wait: { hint: "You stroke the sheep's wool too: move left and right over the sheep!" } },
          { caption: "Our eyes, ears, nose, tongue and skin help us know the world." }
        ] },
      { prompt: "Find the pairs",
        say: "We smell a flower with our nose. We hear a bell with our ears. Now find the pairs.",
        pairs: [
          [{ say: "nose" }, { say: "flower" }],
          [{ say: "ear" }, { say: "bell" }],
          [{ say: "eye" }, { say: "rainbow" }],
          [{ say: "tongue" }, { say: "lemon" }]
        ] },
      { prompt: "What do we hear the rain with?", say: "What do we hear the rain with?",
        options: [{ value: "eyes" }, { value: "ears" }, { value: "tongue" }], answer: "ears" },
      { prompt: "What do we taste the sweet date with?", say: "What do we taste the sweet date with?",
        options: [{ value: "hand" }, { value: "ears" }, { value: "tongue" }], answer: "tongue" },
      { text: "Don't look. Guess with only your hand!",
        need: ["a cloth bag or a big sock", "a few things you know that are not too small: a spoon, an apple, a sock, a pencil, a comb"],
        steps: [
          "Out of your child's sight, put a few things in the bag.",
          "Your child puts a hand in the bag and guesses each thing only by touching it.",
          "Ask: “Is it hard or soft? Smooth or rough? Cold or warm?”",
          "With eyes closed, also guess the smell of mint, cinnamon and orange peel.",
          "Swap places: this time your child puts something in the bag for you."
        ],
        ask: "Which sense helped you?" }
    ] },
    "science-seed-3": { title: "How does a seed grow?", steps: [
      { prompt: "Watch how a seed grows",
        scenes: [
          { caption: "Leila plants a seed in the soil." },
          { caption: "She gives it water." },
          { caption: "The sun gives it light." },
          { caption: "A few days go by. The seed sprouts!" },
          { caption: "The sprout grows bigger." },
          { caption: "The plant has a flower!" }
        ],
        question: "What does a plant need to grow?",
        options: [{ value: "candy" }, { value: "water and light" }, { value: "toys" }], answer: "water and light" },
      { prompt: "Put them in order, from start to end", say: "First there was a seed. What happens next? Put them in order.",
        items: [{ say: "seed" }, { say: "sprout" }, { say: "plant" }, { say: "flower" }] },
      { prompt: "This flower is drooping. What should we give it?", say: "This flower is drooping. What should we give it?",
        options: [{ value: "bread" }, { value: "sock" }, { value: "water" }], answer: "water" },
      { text: "Grow seeds, like the Nowruz sabzeh!",
        need: ["a handful of lentils or mung beans", "two plates", "cotton wool or paper towels", "water"],
        steps: [
          "Soak half of the lentils in a bowl of water overnight. Keep the other half dry.",
          "Spread cotton wool or a paper towel on each plate. Put the wet lentils on one plate and the dry lentils on the other.",
          "Every day, sprinkle a little water on the first plate. Keep the second plate dry.",
          "Put both plates by the window. Your child looks every day to see what has happened."
        ],
        ask: "Which plate turned green? Why?" }
    ] },
    "science-seed-4": { title: "Animal homes and food", steps: [
      { prompt: "What does each animal eat?", say: "What does each animal eat? Find its pair.",
        pairs: [
          [{ say: "rabbit" }, { say: "carrot" }],
          [{ say: "squirrel" }, { say: "hazelnut" }],
          [{ say: "bee" }, { say: "flower" }],
          [{ say: "cow" }, { say: "grass" }]
        ] },
      { prompt: "Where does the sparrow live?",
        scenes: [
          { caption: "The sparrow builds a nest in the tree." },
          { caption: "She lays an egg in the nest." },
          { caption: "A chick comes out of the egg!" },
          { caption: "Mother brings food for the chick." },
          { caption: "The chick was hungry. Yum!" }
        ],
        question: "Where does the baby sparrow live?",
        options: [{ value: "in the water" }, { value: "in a nest in a tree" }, { value: "in the desert" }], answer: "in a nest in a tree" },
      { prompt: "In the water or on land?", say: "Which animals live in the water and which live on land?",
        baskets: [{ label: "water" }, { label: "land" }],
        items: [{ say: "fish" }, { say: "dolphin" }, { say: "octopus" }, { say: "camel" }, { say: "sheep" }, { say: "cat" }] },
      { text: "Let's put out seeds for the birds and watch them.",
        need: ["a small dish for seeds", "a little millet, raw rice or wheat", "a shallow dish of water"],
        steps: [
          "Put the dish of seeds and the water on a windowsill, a balcony or a corner of the yard.",
          "Watch quietly from behind the window. Do not touch the birds.",
          "Count how many birds come and say what colors they are.",
          "If you see an ant, follow it together: where is it going? Where is its home?"
        ],
        ask: "What does a bird pick up the seed with?" }
    ] },
    "science-seed-7": { title: "Little ones grow up", steps: [
      { prompt: "See who grows",
        scenes: [
          { caption: "This kitten is small." },
          { caption: "This young tree is small." },
          { caption: "This is Arash when he was little." },
          { caption: "Days and months went by. The cat, the young tree and Arash grew big!" },
          { caption: "But the ball stayed the same. A ball does not grow." },
          { caption: "The cat, the tree and Arash are alive. Living things grow.", wait: { hint: "Tap the ones that grew!" } }
        ],
        question: "Which one grows?",
        options: [{ value: "chair" }, { value: "chick" }, { value: "ball" }], answer: "chick" },
      { prompt: "Put them in order from small to big", say: "First there was an egg, then a chick, then a hen. Put them in order.",
        items: [{ say: "egg" }, { say: "chick" }, { say: "hen" }] },
      { prompt: "Put them in order from small to big", say: "A seed is small. A tree is big. Put them in order from small to big.",
        items: [{ say: "seed" }, { say: "young tree" }, { say: "tree" }] },
      { prompt: "Does it grow or not?", say: "Which ones grow and which ones do not grow?",
        baskets: [{ label: "grows" }, { label: "does not grow" }],
        items: [{ say: "chick" }, { say: "sunflower" }, { say: "caterpillar" }, { say: "teddy bear" }, { say: "stone" }, { say: "bicycle" }] },
      { text: "You are growing too! Let's mark how tall you are.",
        need: ["a pencil or a piece of tape", "a book", "baby photos and a small old piece of your child's clothing, if you have them"],
        steps: [
          "Your child stands barefoot with their back to a door frame. Lay the book flat on their head and make a mark under it.",
          "Write today's date next to the mark.",
          "Look at your child's baby photos together, or hold a small old piece of their clothing up against them.",
          "Measure again in a few months and compare the two marks."
        ],
        ask: "Does your teddy bear grow too? Why not?" }
    ] },
    "science-seed-8": { title: "What does my body do?", steps: [
      { prompt: "See what Sara does with her body",
        scenes: [
          { caption: "Sara walks with her legs." },
          { caption: "She picks an apple from the tree with her hand." },
          { caption: "She bites the apple with her mouth. Yum!" },
          { caption: "Now Sara hops like a rabbit!" },
          { caption: "She moves her arms up and down like a sparrow!" },
          { caption: "Legs are for walking, hands are for holding, a mouth is for eating." }
        ],
        question: "What do we walk with?",
        options: [{ value: "ears" }, { value: "legs" }, { value: "nose" }], answer: "legs" },
      { prompt: "What does each one do?", say: "We see a book with our eyes. We put shoes on our feet. Now find the pairs.",
        pairs: [
          [{ say: "eyes" }, { say: "book" }],
          [{ say: "ears" }, { say: "bell" }],
          [{ say: "hand" }, { say: "ball" }],
          [{ say: "foot" }, { say: "shoe" }],
          [{ say: "mouth" }, { say: "apple" }]
        ] },
      { prompt: "What do we hold a pencil with?", say: "What do we hold a pencil with?",
        options: [{ value: "hand" }, { value: "ears" }, { value: "eyes" }], answer: "hand" },
      { prompt: "What do we smell fresh bread with?", say: "What do we smell fresh bread with?",
        options: [{ value: "legs" }, { value: "nose" }, { value: "hand" }], answer: "nose" },
      { text: "Move like the animals!",
        list: ["Hop like a rabbit.", "Walk like a duck.", "Flap like a sparrow.", "Crawl on your hands and knees like a cat.", "Walk very slowly like a tortoise."],
        say: "Move like the animals! Hop like a rabbit. Walk like a duck. Flap like a sparrow. Crawl on your hands and knees like a cat. Walk very slowly like a tortoise. Which part of your body did you use?" }
    ] },
    "science-seed-9": { title: "Soft or hard?", steps: [
      { prompt: "Which one is soft?", say: "We touch things with our hands to find out if they are soft or hard. Which one is soft?",
        options: [{ value: "stone" }, { value: "teddy bear" }, { value: "key" }], answer: "teddy bear" },
      { prompt: "Soft or hard?", say: "If you squeeze it, does it go in? Soft things on one side, hard things on the other.",
        baskets: [{ label: "soft" }, { label: "hard" }],
        items: [{ say: "teddy bear" }, { say: "sponge" }, { say: "sock" }, { say: "stone" }, { say: "spoon" }, { say: "wooden chair" }] },
      { prompt: "If you rub your hand on a brick, how does it feel?", say: "If you rub your hand on a brick, how does it feel? Rough or smooth?",
        options: ["rough", "smooth"], answer: "rough" },
      { prompt: "If you rub your hand on a mirror, how does it feel?", say: "If you rub your hand on a mirror, how does it feel? Rough or smooth?",
        options: ["rough", "smooth"], answer: "smooth" },
      { prompt: "Which one is cold?", say: "Which one feels cold when you touch it?",
        options: [{ value: "tea" }, { value: "ice" }, { value: "fresh bread" }], answer: "ice" },
      { text: "Close your eyes, touch, and say: soft or hard? Rough or smooth?",
        need: ["a few things from home: a pillow, a metal spoon, a wooden spoon, a dish sponge, a stone, a piece of cloth, a bowl", "a scarf to cover the eyes, if your child likes"],
        steps: [
          "Your child closes their eyes. Put each thing in their hand and ask: “Is it soft or hard? Rough or smooth?”",
          "Make two piles: soft things and hard things. Then sort them again: rough things and smooth things.",
          "Turn the dish sponge over: one side is rough and the other side is soft.",
          "Touch a metal spoon and a wooden spoon that have been in the same room. Which one feels colder?"
        ],
        ask: "Which sense did you use? How did you know without looking?" }
    ] },
    "science-seed-10": { title: "Senses game", steps: [
      { prompt: "What do we notice each one with?", say: "We smell bread with our nose. Now find the pairs.",
        pairs: [
          [{ say: "nose" }, { say: "the smell of bread" }],
          [{ say: "eyes" }, { say: "a star" }],
          [{ say: "ears" }, { say: "a song" }],
          [{ say: "tongue" }, { say: "the taste of watermelon" }],
          [{ say: "hand" }, { say: "soft yarn" }]
        ] },
      { prompt: "Which part of the body?", say: "We kick a ball with our leg. Find the pairs.",
        pairs: [
          [{ say: "leg" }, { say: "kicking" }],
          [{ say: "hand" }, { say: "writing" }],
          [{ say: "eyes" }, { say: "looking at a book" }],
          [{ say: "ears" }, { say: "hearing the phone" }]
        ] },
      { prompt: "Red or yellow?", say: "Red things on one side, yellow things on the other.",
        baskets: [{ label: "red" }, { label: "yellow" }],
        items: [{ say: "tomato" }, { say: "strawberry" }, { say: "sour cherry" }, { say: "banana" }, { say: "lemon" }, { say: "sunflower" }] },
      { prompt: "Soft or hard?", say: "Soft things on one side, hard things on the other.",
        baskets: [{ label: "soft" }, { label: "hard" }],
        items: [{ say: "sheep's wool" }, { say: "scarf" }, { say: "mattress" }, { say: "screw" }, { say: "pencil" }, { say: "eggshell" }] },
      { text: "Play “I spy”",
        need: ["nothing at all! Just eyes, ears, a nose and hands"],
        steps: [
          "Play at home or in the park. One person says: “I spy something red.” The other one guesses.",
          "Play with the other senses too: “I'm touching something soft”, “I hear something loud”, “I smell something nice”.",
          "Take turns, so your child asks too.",
          "At the end ask: “Which sense did we play with most today?”"
        ],
        ask: "Which sense helped you most in this game?" }
    ] },
    "science-seed-11": { title: "Plants around us", steps: [
      { prompt: "Let's look at the plants in the garden",
        scenes: [
          { caption: "There are lots of plants in the garden: trees, grass and flowers." },
          { caption: "This is a plane tree. Its leaves are wide, like a hand." },
          { caption: "This is a pomegranate tree. Its leaves are small and narrow. It has pomegranates too!" },
          { caption: "This is a date tree. It is called a palm. Its leaves are very long." },
          { caption: "The wind blew and a leaf fell from each tree." },
          { caption: "Three leaves with three shapes!", wait: { hint: "Tap each leaf!" } }
        ],
        question: "What does a plane tree leaf look like?",
        options: [{ value: "a carrot" }, { value: "a hand" }, { value: "a ball" }], answer: "a hand" },
      { prompt: "Which tree has very long leaves?", say: "Which tree has very long leaves?",
        options: [{ value: "plane tree" }, { value: "palm" }, { value: "pine" }], answer: "palm" },
      { prompt: "Tree or flower?", say: "Trees on one side, flowers on the other.",
        baskets: [{ label: "tree" }, { label: "flower" }],
        items: [{ say: "palm" }, { say: "pine" }, { say: "plane tree" }, { say: "sunflower" }, { say: "red rose" }, { say: "daisy" }] },
      { prompt: "Is it a plant or not?", say: "Which ones are plants and which ones are not?",
        baskets: [{ label: "plant" }, { label: "not a plant" }],
        items: [{ say: "wheat" }, { say: "potted plant" }, { say: "cactus" }, { say: "butterfly" }, { say: "caterpillar" }, { say: "stone" }] },
      { text: "Let's go and collect leaves!",
        need: ["a bag", "thin white paper", "crayons"],
        steps: [
          "Walk in the street or the park and collect only leaves that have fallen on the ground. Don't pull leaves off the trees.",
          "Lay the leaves side by side: which one is big, which one is small? Which is wide, which is narrow? Which one has a jagged edge?",
          "Put a leaf under the paper and rub over it with the side of a crayon, so the leaf's shape and veins appear.",
          "If you know them, name the tree of each leaf: plane tree, mulberry, pomegranate, willow…"
        ],
        ask: "Which leaf did you like most? What was its shape?" }
    ] },
    "science-seed-12": { title: "Mothers and babies", steps: [
      { prompt: "See who each animal's baby is",
        scenes: [
          { caption: "The hen is sitting on her eggs." },
          { caption: "The hen got up. A chick came out of the egg!" },
          { caption: "The chick walks after its mother." },
          { caption: "This is a sheep and this is her lamb. The lamb runs to its mother and drinks milk." },
          { caption: "This is a frog. Her babies swim in the water. A baby frog does not look like its mother!" }
        ],
        question: "Who is the chick's mother?",
        options: [{ value: "sheep" }, { value: "hen" }, { value: "frog" }], answer: "hen" },
      { prompt: "Find the mother and the baby", say: "A chick is a hen's baby. Find each mother's baby.",
        pairs: [
          [{ say: "hen" }, { say: "chick" }],
          [{ say: "butterfly" }, { say: "caterpillar" }],
          [{ say: "dog" }, { say: "puppy" }],
          [{ say: "cat" }, { say: "kitten" }]
        ] },
      { prompt: "Where does a baby frog live?", say: "Where does a baby frog live?",
        options: [{ value: "in a tree" }, { value: "in the water" }, { value: "in the desert" }], answer: "in the water" },
      { prompt: "Which one comes out of an egg?", say: "Which baby comes out of an egg?",
        options: [{ value: "puppy" }, { value: "kitten" }, { value: "chick" }], answer: "chick" },
      { text: "Let's find mothers and their babies!",
        need: ["paper and crayons"],
        steps: [
          "In the street, the park or a village, look for animals with their babies: a cat and her kittens, a pigeon and its chick, a hen and her chicks.",
          "Watch from far away and don't go near them: mothers look after their babies and may get scared.",
          "Ask: “Does the baby look like its mother? How are they different? What does the mother do for it?”",
          "At home, your child draws a mother and her baby."
        ],
        ask: "What do babies get from their mothers?" }
    ] },
    "science-seed-13": { title: "Caring for plants and animals", steps: [
      { prompt: "See how the children take care",
        scenes: [
          { caption: "The pot plant is thirsty. Its leaves are hanging down." },
          { caption: "Reza waters the plant. The leaves stand up again." },
          { caption: "Sara pours water into a dish so the sparrows can drink." },
          { caption: "A sparrow came and drank the water." },
          { caption: "An ant is carrying a bread crumb. The children only watch it and don't touch it." },
          { caption: "The plant, the sparrow and the ant are alive. We take care of them.", wait: { hint: "Tap the living things!" } }
        ],
        question: "The plant was wilted. What did Reza do?",
        options: [{ value: "He watered it" }, { value: "He threw it away" }, { value: "He gave it candy" }], answer: "He watered it" },
      { prompt: "You see an ant. What do you do?", say: "You see an ant. What do you do?",
        options: [{ value: "I watch it quietly" }, { value: "I step on it" }], answer: "I watch it quietly" },
      { prompt: "It is summer and it is hot. What shall we put out for the sparrows?", say: "It is summer and it is hot. What shall we put out for the sparrows?",
        options: [{ value: "a teddy bear" }, { value: "water" }, { value: "candy" }], answer: "water" },
      { prompt: "You see pretty flowers in the park. What shall we do?", say: "You see pretty flowers in the park. What shall we do?",
        options: [{ value: "Pick the flowers" }, { value: "Look at the flowers" }], answer: "Look at the flowers" },
      { text: "Take care of a plant for a week!",
        need: ["a potted plant", "a glass of water", "a sheet of paper for a week chart", "a shallow dish for the birds' water"],
        steps: [
          "Choose a plant with your child that belongs to them.",
          "Every day, touch the soil together with a finger: if it is dry, your child gives it a little water and draws a drop in the week chart.",
          "If a leaf hangs down or turns yellow, think together: does it need more water? More light?",
          "On hot days, put the shallow dish of water on a windowsill or balcony and change the water every day."
        ],
        ask: "How did your plant change this week?" }
    ] },
    "science-seed-14": { title: "Garden game", steps: [
      { prompt: "Alive or not alive?", say: "Living things on one side, non-living things on the other.",
        baskets: [{ label: "alive" }, { label: "not alive" }],
        items: [{ say: "tortoise" }, { say: "cactus" }, { say: "bee" }, { say: "clock" }, { say: "balloon" }, { say: "chair" }] },
      { prompt: "Where does each animal live?", say: "A fish lives in water. Find each animal's home.",
        pairs: [
          [{ say: "fish" }, { say: "water" }],
          [{ say: "camel" }, { say: "desert" }],
          [{ say: "sparrow" }, { say: "a nest in a tree" }],
          [{ say: "penguin" }, { say: "ice" }]
        ] },
      { prompt: "What does each animal eat?", say: "A hen eats corn. Find each animal's food.",
        pairs: [
          [{ say: "hen" }, { say: "corn" }],
          [{ say: "mouse" }, { say: "cheese" }],
          [{ say: "sheep" }, { say: "grass" }],
          [{ say: "bear" }, { say: "honey" }]
        ] },
      { prompt: "Mother and baby", say: "Find each mother's baby.",
        pairs: [
          [{ say: "hen" }, { say: "chick" }],
          [{ say: "butterfly" }, { say: "caterpillar" }],
          [{ say: "dog" }, { say: "puppy" }]
        ] },
      { prompt: "Put them in order from seed to flower", say: "First there was a seed. What happened next? Put them in order.",
        items: [{ say: "seed" }, { say: "sprout" }, { say: "plant" }, { say: "sunflower" }] },
      { text: "A finding game in the yard or the park!",
        need: ["a sheet of paper with these pictures: 🌱 🐜 🐦 🌸 🍂 🪨"],
        steps: [
          "Draw the pictures on the paper and go out to the yard, the park or the street with your child.",
          "Each time you find one, your child ticks its picture: a sprout, an ant, a bird, a flower, a dry leaf, a stone.",
          "For each one ask: “Is it alive? Where is its home? What does it eat?”",
          "Only look, and don't touch the animals."
        ],
        ask: "Which one did you find first? Which one was hardest?" }
    ] },
    "science-seed-15": { title: "Sun, moon and stars", steps: [
      { prompt: "Day and night in the sky",
        scenes: [
          { caption: "It is day. The sun shines in the sky and everything is bright." },
          { caption: "In the day Sara plays ball in the yard." },
          { caption: "The sun went behind the mountain. Little by little it got dark." },
          { caption: "It is night. The moon and the stars came out in the sky." },
          { caption: "The light in the house came on. Sara goes home to sleep." },
          { caption: "But the owl is awake at night and flies!" }
        ],
        question: "When is it dark?",
        options: ["day", "night"], answer: "night" },
      { prompt: "Day or night?", say: "Do we see these in the day or at night?",
        baskets: [{ label: "day" }, { label: "night" }],
        items: [{ say: "the sun" }, { say: "a rainbow" }, { say: "the slide in the park" }, { say: "the moon" }, { say: "a star" }, { say: "an owl awake" }] },
      { prompt: "At night, what do we turn on to light up the house?", say: "At night it is dark. What do we turn on to light up the house?",
        options: [{ value: "a sock" }, { value: "a lamp" }, { value: "an apple" }], answer: "a lamp" },
      { prompt: "When is the sun in the sky?", say: "When is the sun in the sky?",
        options: ["day", "night"], answer: "day" },
      { text: "This evening, let's watch the sky together.",
        need: ["paper and crayons", "a flashlight"],
        steps: [
          "In the evening, from a window or in the yard, watch together how it slowly gets dark. Never look straight at the sun.",
          "When it is dark, find the moon and the stars. How many stars can you see?",
          "Turn off the light in the room and play with the flashlight: what can't we see without light?",
          "Your child folds a sheet of paper in half and draws the day on one side and the night on the other."
        ],
        ask: "What do we see in the day that we don't see at night?" }
    ] },
    "science-seed-16": { title: "Where does water go?", steps: [
      { prompt: "See where water goes",
        scenes: [
          { caption: "We turned on the tap. The water falls down and the glass fills up." },
          { caption: "Rain falls on the mountain. The water comes down the mountain and goes to the sea." },
          { caption: "This shirt is wet. Water is dripping from it." },
          { caption: "The sun shone and the wind blew. Little by little the shirt got dry." },
          { caption: "After the rain, a puddle is left in the yard." },
          { caption: "The sun shines on the puddle. It gets smaller and smaller until it is dry." }
        ],
        question: "What happened to the puddle in the sun?",
        options: [{ value: "It got bigger" }, { value: "It dried up" }, { value: "It froze" }], answer: "It dried up" },
      { prompt: "If we pour water on a slide, where does it go?", say: "If we pour water from the top of a slide, where does it go? Up or down?",
        options: ["up", "down"], answer: "down" },
      { prompt: "Where should we put a wet shirt so it dries faster?", say: "Where should we put a wet shirt so it dries faster?",
        options: [{ value: "in the sun" }, { value: "in a basket, rolled up" }], answer: "in the sun" },
      { prompt: "Where does rainwater go from the mountain?", say: "Where does rainwater go from the mountain?",
        options: [{ value: "up into the sky" }, { value: "down, to the river and the sea" }], answer: "down, to the river and the sea" },
      { text: "Two wet cloths: which one dries first?",
        need: ["two cloths or socks of the same size", "water", "two clothes pegs"],
        steps: [
          "Wet both cloths and squeeze them a little.",
          "Hang one flat on a line or the back of a chair in the sun, and put the other one rolled up in the shade.",
          "Before you start, your child guesses which one will dry first.",
          "Every half hour, feel them and see which one is dry.",
          "In the yard or on the balcony, make a wet patch on the ground with a glass of water and draw round it with chalk. A few hours later, see where the patch went."
        ],
        ask: "Where did the water in the cloth go?" }
    ] },
    "science-seed-17": { title: "Warm and cold", steps: [
      { prompt: "Warm and cold change things",
        scenes: [
          { caption: "This is an ice cube. Guess: what happens if we hold it in a warm hand?" },
          { caption: "We held the ice in our hand. Our hand is warm." },
          { caption: "Little by little the ice melted. Now there is water in the hand!" },
          { caption: "The butter is cold and hard. The spoon does not go in." },
          { caption: "The sun warmed the butter. It got soft and the spoon went in." },
          { caption: "We put water in the freezer. It got cold and froze!" }
        ],
        question: "What happened to the ice in the warm hand?",
        options: [{ value: "It melted" }, { value: "It got bigger" }, { value: "It got hot" }], answer: "It melted" },
      { prompt: "What happens if we leave ice cream in the sun?", say: "What happens if we leave ice cream in the sun?",
        options: [{ value: "It stays the same" }, { value: "It melts" }], answer: "It melts" },
      { prompt: "What happens if we put water in the freezer?", say: "What happens if we put water in the freezer?",
        options: [{ value: "It freezes" }, { value: "It gets hot" }], answer: "It freezes" },
      { prompt: "How can we make hard butter soft?", say: "Cold butter is hard. How can we make it soft?",
        options: [{ value: "Put it in the freezer" }, { value: "Warm it a little" }], answer: "Warm it a little" },
      { text: "Guess first, then try it: where does ice melt fastest?",
        need: ["three ice cubes of the same size", "a plate", "a small bowl", "a cloth"],
        steps: [
          "Before you start, ask: “Will the ice melt fastest in your hand, on a plate, or in a bowl covered with a cloth?” Write down your child's guess.",
          "Your child holds one ice cube in their hand (if it is too cold, put it on a cloth in their hand). Put one on the plate and one in the bowl under the cloth.",
          "Look together every few minutes. Which one melted first?",
          "Take a piece of butter out of the fridge and test it with a spoon every ten minutes: when does it get soft?"
        ],
        ask: "Was your guess right? Why did the ice in your hand melt faster?" }
    ] },
    "science-seed-18": { title: "Big and small, heavy and light", steps: [
      { prompt: "Which one is bigger?", say: "Which one is bigger?",
        options: [{ value: "mouse" }, { value: "elephant" }], answer: "elephant" },
      { prompt: "Put them in order from small to big", say: "Put them in order from the smallest to the biggest.",
        items: [{ say: "sour cherry" }, { say: "apple" }, { say: "watermelon" }] },
      { prompt: "Put them in order from small to big", say: "Put these animals in order from the smallest to the biggest.",
        items: [{ say: "ant" }, { say: "cat" }, { say: "cow" }, { say: "elephant" }] },
      { prompt: "Which one is heavier?", say: "Hold one in this hand and one in that hand. Which one is heavier?",
        options: [{ value: "leaf" }, { value: "watermelon" }], answer: "watermelon" },
      { prompt: "Heavy or light?", say: "Heavy things on one side, light things on the other.",
        baskets: [{ label: "heavy" }, { label: "light" }],
        items: [{ say: "brick" }, { say: "big stone" }, { say: "a pile of books" }, { say: "balloon" }, { say: "dry leaf" }, { say: "sock" }] },
      { prompt: "The balloon is big and the stone is small. Which one is heavier?", say: "The balloon is big and the stone is small. Which one is heavier?",
        options: [{ value: "balloon" }, { value: "stone" }], answer: "stone" },
      { text: "Your hands become a balance!",
        need: ["a few things from home: an apple, a spoon, a book, a small pillow, an orange, a sponge", "a coat hanger and two plastic bags, if you have them"],
        steps: [
          "Your child holds out both hands. Put one thing in each hand and ask: “Which one is heavier?”",
          "Try something big and light (the pillow) and something small and heavy (the apple): is the bigger one always heavier?",
          "Put the things in order: from small to big, then from light to heavy.",
          "If you have a coat hanger, hang the two bags from its ends and put one thing in each bag: the heavier bag goes down."
        ],
        ask: "Was the biggest thing also the heaviest?" }
    ] },
    "science-seed-19": { title: "Will it roll?", steps: [
      { prompt: "Guess first, then try it! We put these at the top of a slope.",
        items: [{ say: "ball" }, { say: "box" }, { say: "orange" }, { say: "book" }, { say: "a can lying on its side" }, { say: "sponge" }] },
      { prompt: "Why does the ball roll?", say: "The ball rolled and the box slid. Why does the ball roll?",
        options: ["Because it is round", "Because it is red"], answer: "Because it is round" },
      { prompt: "Does it roll or slide?", say: "Round things roll and flat things slide. Put each one in its basket.",
        baskets: [{ label: "rolls" }, { label: "slides" }],
        items: [{ say: "apple" }, { say: "ball of yarn" }, { say: "watermelon" }, { say: "book" }, { say: "brick" }, { say: "plate" }] },
      { prompt: "Should we push the ball gently or hard, so it goes farther?", say: "If we want the ball to go farther, should we push it gently or hard?",
        options: ["gently", "hard"], answer: "hard" },
      { text: "Make a slope and try it!",
        need: ["a tray or a flat board", "a few books", "round and flat things: a small ball, an orange, a can, a pencil, a small book, an eraser, a bottle cap"],
        steps: [
          "Put one end of the tray on two or three books to make a slope.",
          "Before letting go of each thing, your child guesses: “Will it roll, slide or stay where it is?”",
          "Put the thing at the top of the slope and let go. Watch together what happens.",
          "Put more books under the tray so the slope is steeper. What happens now?",
          "Put the pencil down once on its side and once on its end. Was there a difference?"
        ],
        ask: "Which ones rolled? What shape were they?" }
    ] },
    "science-seed-20": { title: "Push and pull", steps: [
      { prompt: "Pushing and pulling",
        scenes: [
          { caption: "Reza pushes the cart. The cart starts to move." },
          { caption: "Sara puts her hand out in front of the cart. The cart stops." },
          { caption: "Sara pulls the rope. The little wagon follows her." },
          { caption: "If we push the ball gently, it goes a little way." },
          { caption: "If we push it hard, it goes farther. It hit the wall and bounced back!" }
        ],
        question: "What should we do so the ball goes farther?",
        options: ["Push it more gently", "Push it harder"], answer: "Push it harder" },
      { prompt: "Do we push or pull?", say: "Are these pushing or pulling?",
        baskets: [{ label: "push" }, { label: "pull" }],
        items: [{ say: "pushing your friend on the swing" }, { say: "kicking a ball" }, { say: "pushing a cart in the bazaar" },
          { say: "pulling a kite string" }, { say: "pulling on a sock" }, { say: "pulling a bucket up from a well" }] },
      { prompt: "The cart is rolling. How can we stop it?", say: "The cart is rolling. How can we stop it?",
        options: ["We put our hand out in front of it", "We clap for it"], answer: "We put our hand out in front of it" },
      { prompt: "Which one do we pull with a string?", say: "Which one do we pull along behind us with a string?",
        options: [{ value: "a football" }, { value: "a kite" }], answer: "a kite" },
      { text: "You push and pull too!",
        list: ["Push a pillow along the floor.", "Pull a box behind you with a rope or a scarf.", "Push a ball gently, then hard. Which one went farther?", "Stop a rolling ball with your hand."],
        say: "You push and pull too! Push a pillow along the floor. Pull a box behind you with a rope or a scarf. Push a ball gently, then hard. Which one went farther? Stop a rolling ball with your hand." }
    ] },
    "science-seed-21": { title: "Sounds around us", steps: [
      { prompt: "Listen! What is that sound?",
        scenes: [
          { caption: "Listen! A sparrow is singing on the branch: cheep, cheep!" },
          { caption: "The rain is hitting the window: tap, tap, tap." },
          { caption: "The door slammed shut: bang! This sound is loud." },
          { caption: "The water in the kettle is boiling. The kettle is whistling!" },
          { caption: "Sara talks softly to her mother: whisper, whisper. This sound is quiet." },
          { caption: "Reza calls loudly from the other side of the room: “Sara!” This sound is loud." }
        ],
        question: "Which sound is louder?",
        options: [{ value: "a whisper" }, { value: "a fire engine's siren" }], answer: "a fire engine's siren" },
      { prompt: "Whose sound is it?", say: "Tap the cards and listen. Match each sound to who makes it.",
        pairs: [
          [{ say: "sparrow" }, { label: "cheep cheep", say: "cheep cheep" }],
          [{ say: "cat" }, { label: "meow", say: "meow meow" }],
          [{ say: "sheep" }, { label: "baa", say: "baa baa" }],
          [{ say: "rooster" }, { label: "cock-a-doodle-doo", say: "cock-a-doodle-doo" }]
        ] },
      { prompt: "What makes this sound?", say: "Match each sound to the thing that makes it.",
        pairs: [
          [{ say: "rain" }, { label: "pitter-patter", say: "pitter-patter" }],
          [{ say: "bell" }, { label: "ding dong", say: "ding dong" }],
          [{ say: "door" }, { label: "knock knock", say: "knock knock" }]
        ] },
      { prompt: "Which sound is quiet?", say: "Which sound is quiet?",
        options: [{ value: "a siren" }, { value: "a whisper" }, { value: "a dog barking" }], answer: "a whisper" },
      { text: "Close your eyes and listen!",
        need: ["two small plastic bottles with lids", "a little rice and a few chickpeas or beans"],
        steps: [
          "Sit together for one minute in a room or the yard, close your eyes and just listen.",
          "Then say which sounds you heard: which one was loud? Which was quiet? Which came from far away?",
          "Put a little rice in one bottle and a few chickpeas in the other, and close the lids tightly.",
          "Shake the bottles: which one is louder? Shake once gently and once hard.",
          "Keep the bottles away from very small children."
        ],
        ask: "What was the loudest sound you heard today?" }
    ] },
    "science-seed-22": { title: "Build a tall tower", steps: [
      { prompt: "Arash builds a tower",
        scenes: [
          { caption: "Arash puts the blocks one on top of another and builds a tall tower." },
          { caption: "The tower is tall and thin. It is wobbling…" },
          { caption: "And it fell! That's OK." },
          { caption: "Arash tries again. This time he makes the bottom of the tower wide." },
          { caption: "The wide tower stands strong!" }
        ],
        question: "Which tower stands better?",
        options: ["A tower with a thin bottom", "A tower with a wide bottom"], answer: "A tower with a wide bottom" },
      { prompt: "Your tower fell. What do you do now?", say: "Your tower fell. What do you do now?",
        options: ["I build it again", "I never build again"], answer: "I build it again" },
      { prompt: "You want to build a tower with stones. Which stone goes at the bottom?", say: "You want to build a tower with stones. Which stone should go at the very bottom?",
        options: ["a big flat stone", "a small round stone"], answer: "a big flat stone" },
      { prompt: "How can we make a tall tower stronger?", say: "What can we do so a tall tower doesn't fall?",
        options: ["Make its bottom wider", "Make its top heavier"], answer: "Make its bottom wider" },
      { text: "Build a tower! How many will stand on top of each other?",
        need: ["light things to build with: empty cans, small cardboard boxes, paper cups or toy blocks"],
        steps: [
          "Before building, ask: “How many do you think will stand on top of each other?”",
          "First build a thin tower: one on top of one. Count how many stood up.",
          "Then build a tower with a wide bottom: three at the bottom, two on them, one on top. Which one was stronger?",
          "If the tower falls, laugh and build it again. Ask: “What shall we change this time?”",
          "Use only light things that won't hurt anyone if they fall."
        ],
        ask: "How many floors was your tallest tower? What did you do so it wouldn't fall?" }
    ] },
    "science-seed-23": { title: "Things game", steps: [
      { prompt: "Does it roll or slide?", say: "Round things roll and flat things slide. Put each one in its basket.",
        baskets: [{ label: "rolls" }, { label: "slides" }],
        items: [{ say: "orange" }, { say: "a can on its side" }, { say: "ball of yarn" }, { say: "box" }, { say: "book" }, { say: "sponge" }] },
      { prompt: "Do we push or pull?", say: "Are these pushing or pulling?",
        baskets: [{ label: "push" }, { label: "pull" }],
        items: [{ say: "pushing a swing" }, { say: "pushing a cart" }, { say: "kicking a ball" }, { say: "pulling a kite string" }, { say: "pulling up a bucket" }, { say: "pulling a sled on the snow" }] },
      { prompt: "Heavy or light?", say: "Heavy things on one side, light things on the other.",
        baskets: [{ label: "heavy" }, { label: "light" }],
        items: [{ say: "watermelon" }, { say: "big stone" }, { say: "sofa" }, { say: "feather" }, { say: "leaf" }, { say: "tissue" }] },
      { prompt: "Whose sound is it?", say: "Tap the cards and listen. Match each sound to who makes it.",
        pairs: [
          [{ say: "dog" }, { label: "woof woof", say: "woof woof" }],
          [{ say: "cow" }, { label: "moo", say: "moo" }],
          [{ say: "bee" }, { label: "buzz", say: "buzz buzz" }],
          [{ say: "bell" }, { label: "ding dong", say: "ding dong" }]
        ] },
      { prompt: "Loud or quiet?", say: "Loud sounds on one side, quiet sounds on the other.",
        baskets: [{ label: "loud" }, { label: "quiet" }],
        items: [{ say: "a fire engine's siren" }, { say: "thunder" }, { say: "a rooster" }, { say: "a cat purring" }, { say: "leaves rustling" }, { say: "someone breathing in their sleep" }] },
      { text: "Look for these at home!",
        need: ["nothing at all! Just your home"],
        steps: [
          "Look around the house together and find: something that rolls and something that slides.",
          "Something we push (like a drawer) and something we pull (like a zip).",
          "Something heavy and something light. Hold them in two hands and compare.",
          "Something with a loud sound and something with a quiet sound."
        ],
        ask: "Which one did you find first?" }
    ] },
    "science-seed-24": { title: "A little scientist in the yard", steps: [
      { prompt: "Look like a scientist",
        scenes: [
          { caption: "Sara came into the yard with a magnifying glass to look at things up close." },
          { caption: "She looks up close: there is a ladybird on the leaf! She counts its spots." },
          { caption: "The ladybird flew away. Sara guesses: “Is there something under this leaf?”" },
          { caption: "She gently lifts the leaf. There is a little caterpillar under it! Her guess was right." },
          { caption: "Sara goes to Grandma and tells her what she saw." },
          { caption: "Look, guess, try it and tell. Just like a scientist!" }
        ],
        question: "What did Sara bring to see the ladybird up close?",
        options: [{ value: "a sock" }, { value: "a magnifying glass" }, { value: "a spoon" }], answer: "a magnifying glass" },
      { prompt: "You see a little caterpillar under a leaf. What do you do?", say: "You see a little caterpillar under a leaf. What do you do?",
        options: ["I look at it and tell a grown-up", "I squash it"], answer: "I look at it and tell a grown-up" },
      { prompt: "You want to find out if a stone is rough or smooth. What do you do?", say: "You want to find out if a stone is rough or smooth. What do you do?",
        options: [{ value: "I touch it" }, { value: "I listen to it" }], answer: "I touch it" },
      { prompt: "What does a little scientist do before trying something?", say: "What does a little scientist do before trying something?",
        options: ["Makes a guess", "Goes to sleep"], answer: "Makes a guess" },
      { text: "Today you are the yard scientist!",
        need: ["a magnifying glass, if you have one", "a small bag", "paper and crayons"],
        steps: [
          "Walk slowly with your child in the yard, the park or the street and look up close: leaves, stones, tree bark, insects.",
          "Before looking under a leaf or beside a flowerpot, ask: “What do you think is there?” Then look together.",
          "Pick up a fallen leaf and a small stone and feel them: rough or smooth? What color are they?",
          "Only look at insects and animals; don't touch them. Wash hands after playing.",
          "At home, your child draws one of the things they saw and tells the family about it."
        ],
        ask: "What new thing did you see today? Was your guess right?" }
    ] },

    // ---------------- Sprout ----------------
    "science-sprout-1": { title: "Parts of a plant", steps: [
      { prompt: "What does each part of a plant do?",
        cast: { root: "root", stem: "stem", leaf: "leaf", flower: "flower", seeds: "seeds" },
        scenes: [
          { caption: "This is a sunflower." },
          { caption: "The root is under the soil. The root drinks water from the soil." },
          { caption: "The stem carries the water up." },
          { caption: "The leaves catch sunlight and make food for the plant." },
          { caption: "The flower makes seeds. Sunflower seeds come from this flower!" }
        ],
        question: "Which part of the plant drinks water from the soil?",
        options: ["leaf", "root", "flower"], answer: "root" },
      { prompt: "Which part of the plant do we eat?",
        say: "A carrot is the root of a plant. Which part of the plant do we eat? Find the pairs.",
        pairs: [
          [{ say: "carrot" }, "root"],
          [{ say: "lettuce" }, "leaf"],
          [{ say: "apple" }, "fruit"],
          [{ say: "corn" }, "seed"]
        ] },
      { prompt: "What happens if a plant gets no water?", say: "What happens if a plant gets no water for a few days?",
        options: [{ value: "it stays fresh" }, { value: "it droops" }], answer: "it droops" },
      { text: "See how the stem carries water up.",
        need: ["a celery stalk with leaves, or a white flower", "a glass of water", "a little beetroot juice or food coloring"],
        steps: [
          "Put the beetroot juice or food coloring in the glass of water.",
          "Put the celery or the white flower in the glass.",
          "Ask your child: “What do you think will happen?” Write the guess on paper.",
          "Tomorrow, look at the leaves or petals together and compare with your child's guess."
        ],
        ask: "Where did the color go up to?" }
    ] },
    "science-sprout-2": { title: "Ice, water, steam", steps: [
      { prompt: "What happens to ice?",
        cast: {},
        scenes: [
          { caption: "This is a piece of ice. Ice is hard and cold." },
          { caption: "The sun warms the ice…" },
          { caption: "and the ice turns into water!" },
          { caption: "If we put the water in the freezer, it freezes again." },
          { caption: "Steam rises from hot tea. Steam is water too!" },
          { caption: "The steam goes up." }
        ],
        question: "What happens to ice in the sun?",
        options: [{ value: "it gets bigger" }, { value: "it turns into water" }, { value: "it becomes a snowman" }], answer: "it turns into water" },
      { prompt: "Ice in the sun: put them in order", say: "We put ice in the sun. What was first? What happened next?",
        items: [{ say: "ice" }, { say: "ice is melting" }, { say: "water" }] },
      { prompt: "Cold or hot?", say: "Which things are cold and which are hot?",
        baskets: [{ label: "cold" }, { label: "hot" }],
        items: [{ say: "ice" }, { say: "snowman" }, { say: "ice cream" }, { say: "hot tea" }, { say: "hot soup" }, { say: "fresh hot bread" }] },
      { text: "Guess: does ice melt faster in the sun or in the shade?",
        need: ["two pieces of ice of the same size", "two plates"],
        steps: [
          "Put one plate in the sun and one in the shade, with a piece of ice on each.",
          "Before you start, ask your child which will melt faster.",
          "Every few minutes, check and look together.",
          "Put the water from the plate in the freezer and see tomorrow what happened."
        ],
        ask: "Why did the ice in the sun melt faster?" }
    ] },
    "science-sprout-3": { title: "Float or sink?", steps: [
      { prompt: "Guess first, then try it!",
        items: [{ say: "apple" }, { say: "key" }, { say: "leaf" }, { say: "spoon" }, { say: "sponge" }, { say: "egg" }] },
      { prompt: "Which things stay on top of the water?", say: "Now you tell me: which things float and which things sink?",
        baskets: [{ label: "floats" }, { label: "sinks" }],
        items: [{ say: "ball" }, { say: "wooden pencil" }, { say: "orange" }, { say: "iron screw" }, { say: "brick" }] },
      { text: "Try it at home too: which things float?",
        need: ["a tub or a big bowl of water", "things that can get wet: a spoon, a bottle cap, an apple, a pencil, a sponge, a stone", "a piece of aluminum foil"],
        steps: [
          "Before you drop each thing, your child guesses: “Will it float or sink?”",
          "Put it gently on the water and watch together.",
          "Make two groups: things that floated, things that sank.",
          "Crush one piece of foil into a ball and drop it in the water. Make a little boat from another piece. What happens this time?",
          "Never leave your child alone next to a tub of water, not even for a moment."
        ],
        ask: "Why did the boat float but the ball sink?" }
    ] },
    "science-sprout-4": { title: "Day and night", steps: [
      { prompt: "Where does the sun go in the sky?",
        scenes: [
          { caption: "In the morning the sun comes up from behind the mountain." },
          { caption: "At noon the sun is high in the sky." },
          { caption: "In the afternoon the sun goes down." },
          { caption: "Night comes. The moon and the stars come out." },
          { caption: "On the other side of the Earth it is day now, and the children are awake!" }
        ],
        question: "What do we see in the sky at night?",
        options: [{ value: "the sun and a rainbow" }, { value: "the moon and stars" }], answer: "the moon and stars" },
      { prompt: "One day, from morning to night", say: "Put the parts of a day in order, from morning to night.",
        items: [{ say: "morning" }, { say: "noon" }, { say: "afternoon" }, { say: "night" }] },
      { prompt: "Day or night?", say: "Do these happen in the day or at night?",
        baskets: [{ label: "day" }, { label: "night" }],
        items: [{ say: "the rooster crows" }, { say: "going to school" }, { say: "the sunflower faces the sun" },
          { say: "the owl is awake" }, { say: "the stars" }, { say: "sleeping" }] },
      { text: "Find the moon every night and draw its shape.",
        need: ["paper and a pencil"],
        steps: [
          "In the morning and in the afternoon, look at the sky from the same window: where is the sun? Never look straight at the sun.",
          "Draw a table with seven boxes on a paper.",
          "For a few nights in a row, find the moon in the sky together before bed.",
          "Each night, your child draws the shape of the moon in one box. If you cannot see the moon or it is cloudy, leave the box empty."
        ],
        ask: "Did the shape of the moon change? How?" }
    ] },
    "science-sprout-5": { title: "The four seasons", steps: [
      { prompt: "What does a tree look like in each season?",
        scenes: [
          { caption: "It is spring. The tree has blossoms. Nowruz is the first day of spring." },
          { caption: "It is summer. The weather is hot and the fruit is ripe." },
          { caption: "It is autumn. The leaves turn yellow and fall." },
          { caption: "It is winter. The weather is cold and it snows." }
        ],
        question: "In which season do the leaves fall?",
        options: [{ value: "spring" }, { value: "autumn" }, { value: "summer" }], answer: "autumn" },
      { prompt: "Put the seasons in order, starting with spring", say: "Put the seasons in order, starting with spring.",
        items: [{ label: "spring" }, { label: "summer" }, { label: "autumn" }, { label: "winter" }] },
      { prompt: "Which season comes after winter?", say: "Which season comes again after winter?" },
      { prompt: "Iran is big",
        cast: { tabriz: "⛄ Tabriz", rasht: "🌧️ Rasht", bandar: "☀️ Bandar Abbas" },
        scenes: [
          { caption: "It is winter. It is snowing in Tabriz." },
          { caption: "On the same day, it is raining in Rasht." },
          { caption: "And in Bandar Abbas it is warm and sunny!" }
        ],
        question: "What is the weather like in Bandar Abbas in winter?",
        options: [{ value: "snowy" }, { value: "warm and sunny" }], answer: "warm and sunny" },
      { text: "What is the weather like today? Let's draw the weather.",
        need: ["paper and crayons"],
        steps: [
          "Every morning, look at the weather together from the window or in the yard: sunny, cloudy, rainy or snowy?",
          "For each day, your child draws a little sign: ☀️ ☁️ 🌧️ ❄️",
          "Choose a tree near your home and draw it once a month.",
          "Ask a grandparent what winter was like in the city or village where they were children."
        ],
        ask: "What was the weather like on most days this week?" }
    ] },
    "science-sprout-6": { title: "What is it made of?", steps: [
      { prompt: "Everything is made of something",
        cast: { wood: "wood", metal: "metal", plastic: "plastic", glass: "glass", cloth: "cloth" },
        scenes: [
          { caption: "This chair is made of wood. Wood comes from trees." },
          { caption: "This spoon is made of metal. Metal is hard and shiny." },
          { caption: "This bottle is made of plastic. Plastic is light." },
          { caption: "This cup is made of glass. You can see through glass." },
          { caption: "This shirt is made of cloth. Cloth is soft.", wait: { hint: "You press the cloth too: move left and right over the shirt!" } }
        ],
        question: "What is a window made of?",
        options: ["cloth", "glass", "wood"], answer: "glass" },
      { prompt: "Wood, metal or cloth?", say: "Put each thing in the basket of what it is made of: wood, metal or cloth.",
        baskets: [{ label: "wood" }, { label: "metal" }, { label: "cloth" }],
        items: [{ label: "chair" }, { label: "chopsticks" }, { label: "key" }, { label: "spoon" }, { label: "sock" }, { label: "scarf" }] },
      { prompt: "Plastic or glass?", say: "Which ones are plastic and which ones are glass?",
        baskets: [{ label: "plastic" }, { label: "glass" }],
        items: [{ label: "shampoo bottle" }, { label: "plastic cup" }, { label: "glass cup" }, { label: "glasses" }] },
      { prompt: "Wood, metal or plastic: which one floats? Guess first!",
        items: [{ say: "wooden pencil" }, { say: "metal spoon" }, { say: "empty plastic bottle" }, { say: "metal key" }, { say: "chopsticks" }] },
      { text: "Look around your home: what is made of wood, metal, plastic, glass or cloth?",
        need: ["a basket", "things at home made of different materials"],
        steps: [
          "Look around your home with your child and find one thing of each material. Pick up glass things yourself and do not hand them to your child.",
          "Lay the things on the floor and sort them together: wood, metal, plastic, glass, cloth.",
          "Your child touches each thing and says: “Is it cold or warm? Hard or soft? Light or heavy?”",
          "Tap each thing gently with a finger: how do wood, metal and plastic sound different?"
        ],
        ask: "What things in our kitchen are made of metal?" }
    ] },
    "science-sprout-7": { title: "Science time: look and ask", steps: [
      { prompt: "How does a scientist work?",
        scenes: [
          { caption: "Arash saw an ant going home. He asked himself: “What do ants eat?”" },
          { caption: "He looked closely and guessed: “Maybe they like sweet things.”" },
          { caption: "To test it, he put a sugar cube on the wall." },
          { caption: "A little later, the ants came to the sugar!" },
          { caption: "Arash drew what he saw on paper." }
        ],
        question: "What did Arash do first?",
        options: ["He asked a question", "He ate sugar", "He went to sleep"], answer: "He asked a question" },
      { prompt: "Put a scientist's work in order", say: "First we ask, then we look, then we guess, we try it, and last we draw. Put them in order.",
        items: [{ say: "we ask" }, { say: "we look" }, { say: "we guess" }, { say: "we try it" }, { say: "we draw and tell" }] },
      { prompt: "What if your guess was not right?", say: "What if your guess was not right?",
        options: ["That's OK, I learned something new", "Guessing is bad"], answer: "That's OK, I learned something new" },
      { prompt: "What do we use to see very small things?", say: "What do we use to see very small things?",
        options: [{ value: "a magnifying glass" }, { value: "a sock" }, { value: "a spoon" }], answer: "a magnifying glass" },
      { text: "Ask a question about the things around you. Guess, try it, and draw what you saw on paper.",
        check: ["Did they say their question out loud?", "Did they guess before trying?", "Did they draw what they saw and tell you about it?"],
        note: "Simple questions are good: “Which one dries first?”, “Where does the cat sleep?”. The right answer doesn't matter; asking, guessing and trying do." }
    ] },
    "science-sprout-10": { title: "How do animals move?", steps: [
      { prompt: "How does each animal move?",
        scenes: [
          { caption: "The rabbit hops on its legs." },
          { caption: "The sparrow flaps its wings and flies." },
          { caption: "A snake has no legs. It crawls on the ground." },
          { caption: "The horse walks on its four legs." },
          { caption: "The fish swims in the water with its tail and fins." }
        ],
        question: "How does a snake move?",
        options: ["It flies", "It crawls on the ground", "It hops on its legs"], answer: "It crawls on the ground" },
      { prompt: "Fly, swim or walk?", say: "Which one flies, which one swims, and which one walks on land?",
        baskets: [{ label: "fly" }, { label: "swim" }, { label: "walk" }],
        items: [{ say: "butterfly" }, { say: "owl" }, { say: "dolphin" }, { say: "octopus" }, { say: "camel" }, { say: "cow" }] },
      { prompt: "What does a bird fly with?", say: "What does a bird fly with?",
        options: ["wings", "fins", "a tail"], answer: "wings" },
      { prompt: "Which one has no legs?", say: "Which animal has no legs?",
        options: [{ value: "snake" }, { value: "cat" }, { value: "hen" }], answer: "snake" },
      { text: "Play “Guess which animal I am!”",
        list: ["Move like an animal: hop, crawl, flap, swim or walk on your hands and knees.", "Your mother or father guesses which animal you are.", "Swap: now they move and you guess."],
        say: "Play guess which animal I am! Move like an animal: hop, crawl, flap, swim or walk on your hands and knees. Your mother or father guesses which animal you are. Then swap." }
    ] },
    "science-sprout-11": { title: "Feathers, fur, scales", steps: [
      { prompt: "What covers an animal's body?",
        scenes: [
          { caption: "A sparrow has feathers. A feather fell from its wing." },
          { caption: "A cat has fur. Its fur is soft.", wait: { hint: "You stroke the cat too: move left and right over the cat!" } },
          { caption: "A fish has scales. The scales lie on top of each other like tiles." },
          { caption: "A tortoise has a hard shell. A frog has smooth, wet skin." }
        ],
        question: "What covers a fish's body?",
        options: ["feathers", "scales", "fur"], answer: "scales" },
      { prompt: "Feathers, fur or scales?", say: "What covers each animal's body? Feathers, fur or scales?",
        baskets: [{ label: "feathers" }, { label: "fur" }, { label: "scales" }],
        items: [{ say: "duck" }, { say: "owl" }, { say: "dog" }, { say: "rabbit" }, { say: "snake" }, { say: "lizard" }] },
      { prompt: "Which ones are covered in the same way?", say: "A hen and a duck both have feathers. Find the pairs that are covered the same way.",
        pairs: [
          [{ say: "hen" }, { say: "duck" }],
          [{ say: "fish" }, { say: "snake" }],
          [{ say: "cat" }, { say: "bear" }],
          [{ say: "tortoise" }, { say: "snail" }]
        ] },
      { prompt: "What covers a bird's body?", say: "What covers a bird's body?",
        options: ["feathers", "scales", "fur"], answer: "feathers" },
      { text: "Look closely at what covers animals.",
        need: ["a feather (if you find one)", "a piece of yarn or wool", "the fish stall at the market, only for looking"],
        steps: [
          "If you see a fallen feather in the park, look at it closely together: see its tiny lines.",
          "Touch the yarn or wool: it is like a sheep's fur.",
          "At the market, look at the fish from a little way off: the scales shine. Don't touch the fish.",
          "If there is a cat or dog you know and its owner says yes, gently stroke its fur. Wash your hands afterwards."
        ],
        ask: "How are feathers, fur and scales different?" }
    ] },
    "science-sprout-12": { title: "Plant eaters and meat eaters", steps: [
      { prompt: "What does each animal eat?",
        scenes: [
          { caption: "The sheep eats grass. A sheep is a plant eater." },
          { caption: "The sparrow picks up seeds with its beak and eats them." },
          { caption: "The cat eats fish. A cat is a meat eater." },
          { caption: "The camel lives in the desert. It eats camelthorn, which grows there." }
        ],
        question: "What does the cat eat?",
        options: [{ value: "grass" }, { value: "fish" }, { value: "seeds" }], answer: "fish" },
      { prompt: "Plant eater or meat eater?", say: "Which ones eat plants and which ones eat meat?",
        baskets: [{ label: "plant eater" }, { label: "meat eater" }],
        items: [{ say: "cow" }, { say: "rabbit" }, { say: "camel" }, { say: "lion" }, { say: "cheetah" }, { say: "owl" }] },
      { prompt: "What do all animals need to stay alive?", say: "What do all animals need to stay alive?",
        options: [{ value: "water and food" }, { value: "toys" }], answer: "water and food" },
      { prompt: "An owl eats mice. Is an owl a plant eater or a meat eater?", say: "An owl eats mice. Is an owl a plant eater or a meat eater?",
        options: ["a plant eater", "a meat eater"], answer: "a meat eater" },
      { text: "Look at your teeth in the mirror!",
        need: ["a mirror", "an apple or a carrot"],
        steps: [
          "Your child opens their mouth in front of the mirror. The front teeth are sharp and thin, the back teeth are wide.",
          "Take a bite of the apple: which teeth cut it? Then chew: which teeth chewed it?",
          "Say: “We eat plants and meat, so we have both kinds of teeth.”",
          "If there is a cat, a hen or a bird near you, watch from a little way off what it eats."
        ],
        ask: "What teeth does a sheep have to chew grass?" }
    ] },
    "science-sprout-13": { title: "Animals game", steps: [
      { prompt: "Fly, swim or walk?", say: "How does each animal move?",
        baskets: [{ label: "fly" }, { label: "swim" }, { label: "walk" }],
        items: [{ say: "pigeon" }, { say: "bee" }, { say: "whale" }, { say: "fish" }, { say: "giraffe" }, { say: "goat" }] },
      { prompt: "Feathers, fur or scales?", say: "What covers each animal's body?",
        baskets: [{ label: "feathers" }, { label: "fur" }, { label: "scales" }],
        items: [{ say: "parrot" }, { say: "rooster" }, { say: "bear" }, { say: "goat" }, { say: "snake" }, { say: "fish" }] },
      { prompt: "What does each animal eat?", say: "Find each animal's food.",
        pairs: [
          [{ say: "cow" }, { say: "grass" }],
          [{ say: "cat" }, { say: "fish" }],
          [{ say: "squirrel" }, { say: "hazelnut" }],
          [{ say: "bee" }, { say: "flower nectar" }]
        ] },
      { prompt: "What does each animal move with?", say: "A bird flies with wings. Find the pairs.",
        pairs: [
          [{ say: "bird" }, { label: "wings", say: "wings" }],
          [{ say: "fish" }, { label: "fins", say: "fins" }],
          [{ say: "horse" }, { label: "legs", say: "legs" }]
        ] },
      { prompt: "Plant eater or meat eater?", say: "Which ones eat plants and which ones eat meat?",
        baskets: [{ label: "plant eater" }, { label: "meat eater" }],
        items: [{ say: "sheep" }, { say: "giraffe" }, { say: "tiger" }, { say: "fox" }] },
      { text: "Sort animals together!",
        need: ["a few pictures of animals from a book or magazine, or toy animals"],
        steps: [
          "Lay the pictures or toys out on the rug.",
          "First sort them by how they move: birds, swimmers, walkers.",
          "Then by what covers them: feathers, fur, scales, shell.",
          "Then by food: plant eaters and meat eaters. Let your child suggest a new way to sort them."
        ],
        ask: "Which animal fitted in more than one group?" }
    ] },
    "science-sprout-14": { title: "What does a plant need?", steps: [
      { prompt: "An experiment with two pots",
        scenes: [
          { caption: "We have two pots of beans. Both have just sprouted. We watered them both." },
          { caption: "We put one by the window and one in a dark cupboard." },
          { caption: "Guess: which plant will grow better?" },
          { caption: "A few days and nights went by." },
          { caption: "We opened the cupboard. The plant by the window is green and strong. The plant in the cupboard is yellow and weak." },
          { caption: "To grow, a plant needs both water and light." }
        ],
        question: "Which plant became green and strong?",
        options: ["the plant by the window", "the plant in the dark cupboard"], answer: "the plant by the window" },
      { prompt: "Put the experiment in order", say: "First we planted the seed, then we watered it, then we waited, and last we looked. Put them in order.",
        items: [{ say: "we planted" }, { say: "we watered" }, { say: "we waited" }, { say: "we looked" }] },
      { prompt: "What happens if we don't water a plant?", say: "What happens if we don't water a plant?",
        options: [{ value: "It wilts" }, { value: "It gets bigger" }], answer: "It wilts" },
      { prompt: "Why did the plant in the cupboard turn yellow?", say: "The plant in the dark cupboard turned yellow and weak. Why?",
        options: ["Because it had no light", "Because it drank too much water"], answer: "Because it had no light" },
      { text: "Do this experiment too!",
        need: ["two cups or small pots", "soil or wet cotton wool", "a few beans or lentils", "a dark box or cupboard"],
        steps: [
          "Plant a few seeds in each cup and water them. Wait until they sprout.",
          "Put one by the window and one in the dark box or cupboard.",
          "Ask your child which one will grow better, and write down their guess.",
          "Give both a little water every day. After a week, compare them together: color, height, leaves.",
          "Then put the yellow plant by the window and see what happens a few days later."
        ],
        ask: "Was your guess right? What happened to the yellow plant in the light?" }
    ] },
    "science-sprout-15": { title: "Fruits and seeds", steps: [
      { prompt: "What is inside fruits?",
        scenes: [
          { caption: "This is a pomegranate. Let's see what is inside." },
          { caption: "We cut the pomegranate in half. It is full of red seeds!" },
          { caption: "A melon has seeds inside too, right in the middle." },
          { caption: "A date has only one stone." },
          { caption: "If we plant the stone in soil and water it, a new plant grows from it." }
        ],
        question: "What is inside a pomegranate?",
        options: [{ value: "only water" }, { value: "lots of seeds" }, { value: "a stone" }], answer: "lots of seeds" },
      { prompt: "What do we eat from each plant?", say: "We make bread from wheat. Find the pairs.",
        pairs: [
          [{ say: "wheat" }, { say: "bread" }],
          [{ say: "apple tree" }, { say: "apple" }],
          [{ say: "sunflower" }, { label: "seeds", say: "sunflower seeds" }],
          [{ say: "palm" }, { label: "dates", say: "dates" }]
        ] },
      { prompt: "Which part of the plant do we eat?", say: "From a carrot we eat the root, from lettuce the leaves, and from an apple the fruit. Put each one in its basket.",
        baskets: [{ label: "fruit" }, { label: "leaf" }, { label: "root" }],
        items: [{ say: "pear" }, { say: "tomato" }, { say: "lettuce" }, { say: "fresh herbs" }, { say: "carrot" }] },
      { prompt: "If we plant a pomegranate seed, what grows?", say: "If we plant a pomegranate seed, what tree grows?",
        options: ["a pomegranate tree", "an apple tree"], answer: "a pomegranate tree" },
      { text: "Let's find the seeds in fruits and plant them.",
        need: ["a few fruits: an orange, an apple, a date, a lemon", "a plate", "cotton wool or soil in a cup"],
        steps: [
          "A grown-up cuts the fruits in half with a knife. Your child does not touch the knife.",
          "Find the seeds of each fruit together and count them: which one had the most?",
          "Wash the seeds and plant them in wet cotton wool or soil. Give them a little water every day.",
          "Look every few days: which one sprouted?"
        ],
        ask: "Which fruit had the most seeds?" }
    ] },
    "science-sprout-16": { title: "Plants game", steps: [
      { prompt: "What does each part of a plant do?", say: "The root takes water from the soil. Find the pairs.",
        pairs: [
          [{ label: "root", say: "root" }, { say: "takes water from the soil" }],
          [{ label: "leaf", say: "leaf" }, { say: "takes in sunlight" }],
          [{ label: "flower", say: "flower" }, { say: "calls the bees" }],
          [{ label: "fruit", say: "fruit" }, { say: "keeps the seeds" }]
        ] },
      { prompt: "Put them in order from seed to fruit", say: "First there is a seed. What happens next? Put them in order.",
        items: [{ say: "seed" }, { say: "sprout" }, { say: "plant" }, { say: "flower" }, { say: "fruit" }] },
      { prompt: "Does a plant need this or not?", say: "Which of these does a plant need to grow?",
        baskets: [{ label: "needs it" }, { label: "doesn't need it" }],
        items: [{ say: "water" }, { say: "sunlight" }, { say: "soil" }, { say: "candy" }, { say: "a teddy bear" }, { say: "a television" }] },
      { prompt: "Which part of the plant do we eat?", say: "Put each one in its basket.",
        baskets: [{ label: "fruit" }, { label: "leaf" }, { label: "seed" }],
        items: [{ say: "grapes" }, { say: "watermelon" }, { say: "lettuce" }, { say: "corn" }, { say: "beans" }] },
      { text: "Find plant parts at the table!",
        need: ["lunch or dinner"],
        steps: [
          "At the table ask: “Which part of a plant is this? Root, stem, leaf, flower, fruit or seed?”",
          "For example: a carrot is a root, herbs are leaves, rice and beans are seeds, a tomato is a fruit.",
          "Your child picks one and draws what that plant looks like in the ground."
        ],
        ask: "Which plant parts did you eat today?" }
    ] },
    "science-sprout-40": { title: "Write down today's weather", steps: [
      { prompt: "Sara's weather chart",
        scenes: [
          { caption: "Every morning Sara looks at the weather out of the window." },
          { caption: "Today it is sunny. Sara sticks a sun on her chart." },
          { caption: "The next day it was cloudy. She stuck a cloud on." },
          { caption: "The day after, it rained. She stuck on a rain picture." },
          { caption: "Two weeks went by and the chart filled up." },
          { caption: "The sun's column is the tallest. Most days were sunny!" }
        ],
        question: "Which weather came most often?",
        options: [{ value: "sunny" }, { value: "rainy" }, { value: "windy" }], answer: "sunny" },
      { title: "Two weeks of weather", prompt: "Put each day in its weather's column.", say: "Each picture is one day. Put each one in its weather's column.",
        rows: [{ label: "sunny" }, { label: "cloudy" }, { label: "rainy" }, { label: "windy" }],
        question: "Which weather came least often?", options: [{ label: "sunny" }, { label: "cloudy" }, { label: "windy" }] },
      { title: "Two weeks of weather",
        rows: [{ label: "sunny" }, { label: "cloudy" }, { label: "rainy" }, { label: "windy" }],
        question: "How many days were rainy?" },
      { prompt: "How can we find out tomorrow's weather?", say: "We want to know what the weather will be like tomorrow. What can we do?",
        options: ["Watch the weather forecast", "Guess and never look"], answer: "Watch the weather forecast" },
      { text: "For two weeks, look at the weather every morning and draw a picture in your chart: a sun, a cloud, rain or wind.",
        check: ["Did they draw a picture every day?", "At the end, did they count which weather came most?", "Did they say what the weather will be like tomorrow?"],
        note: "Divide a sheet of paper into four columns and draw a shape at the top of each: ☀️ ☁️ 🌧️ 🌬️. Every day your child draws a small shape in that day's column. Count them together at the end of the week." }
    ] },
    "science-sprout-41": { title: "The weather forecast", steps: [
      { prompt: "What will the weather be like tomorrow?",
        scenes: [
          { caption: "The weather forecast on television says: “Tomorrow it will rain.”" },
          { caption: "Mother puts the umbrella by the door so they are ready for tomorrow." },
          { caption: "The next day it rained. Sara went out with her umbrella and didn't get wet." },
          { caption: "The forecast tells us when rain, snow or strong wind is coming, so we can get ready." }
        ],
        question: "The forecast said it will rain tomorrow. What should we take?",
        options: [{ value: "an umbrella" }, { value: "sunglasses" }], answer: "an umbrella" },
      { prompt: "The forecast said it will snow tomorrow. What should we get ready?", say: "The forecast said it will snow tomorrow. What should we get ready?",
        options: [{ value: "gloves and a scarf" }, { value: "a sun hat" }], answer: "gloves and a scarf" },
      { prompt: "The forecast said a strong wind is coming. What should we do with the plant pot on the balcony?", say: "The forecast said a strong wind is coming. What should we do with the plant pot on the balcony?",
        options: [{ value: "Bring it inside" }, { value: "Put it on the edge of the balcony" }], answer: "Bring it inside" },
      { prompt: "How does the weather forecast help us?", say: "How does the weather forecast help us?",
        options: ["It helps us get ready", "It stops the rain"], answer: "It helps us get ready" },
      { text: "Let's watch the forecast together and check it tomorrow!",
        need: ["a television, radio or phone to see the forecast", "paper and a pencil"],
        steps: [
          "In the evening, watch or listen to tomorrow's forecast together. Your child draws it: sun, cloud, rain, snow or wind.",
          "Ask: “What should we get ready for tomorrow?” and get it ready together.",
          "Tomorrow, look out of the window: was the forecast right?",
          "If your child is afraid of storms or strong wind, calmly say that we know about it in advance and we are ready for it."
        ],
        ask: "Was the forecast right?" }
    ] },
    "science-sprout-28": { title: "Fast and slow", steps: [
      { prompt: "What does a push do?",
        scenes: [
          { caption: "If we push the ball gently, it goes slowly and soon stops." },
          { caption: "If we push it hard, it goes fast and much farther." },
          { caption: "Now we look from above. The ball is rolling on the rug." },
          { caption: "We hit the ball from the side. It changed direction!" },
          { caption: "We put our hand in front of the ball. The ball stopped." }
        ],
        question: "What should we do so the ball goes faster?",
        options: ["Push it harder", "Push it more gently"], answer: "Push it harder" },
      { prompt: "Fast or slow?", say: "Which ones go fast and which ones go slowly?",
        baskets: [{ label: "fast" }, { label: "slow" }],
        items: [{ say: "Asiatic cheetah" }, { say: "train" }, { say: "a child running" }, { say: "snail" }, { say: "tortoise" }, { say: "a child walking slowly" }] },
      { prompt: "The ball is rolling towards the yard door. How can we stop it?", say: "The ball is rolling towards the yard door. How can we stop it?",
        options: ["Put a hand or a foot in front of it", "Shout"], answer: "Put a hand or a foot in front of it" },
      { prompt: "What happens if a ball is hit from the side?", say: "What happens if we hit a rolling ball from the side?",
        options: ["It changes direction", "It goes the same way"], answer: "It changes direction" },
      { text: "Gently and hard: how far does the ball go?",
        need: ["a small ball or a marble", "a few pieces of paper or odd socks to mark the place"],
        steps: [
          "In a hallway or the yard, push the ball once gently and once hard. Each time, mark where it stopped with a piece of paper.",
          "Before each push, your child guesses how far the ball will go.",
          "Now one person rolls the ball and the other gently hits it from the side: where did it go?",
          "Only play in a safe place, away from stairs and the street."
        ],
        ask: "Which push made the ball go farther?" }
    ] },
    "science-sprout-29": { title: "Rolling, sliding, swinging", steps: [
      { prompt: "How do things move in the park?",
        scenes: [
          { caption: "The ball rolls on the grass: it turns round and round and moves forward." },
          { caption: "Sara slides down the slide." },
          { caption: "The swing goes forward and back." },
          { caption: "The wind blew and the pinwheel spins round." },
          { caption: "Rolling, sliding, swinging and spinning!" }
        ],
        question: "How does the pinwheel move?",
        options: ["It spins", "It slides", "It jumps"], answer: "It spins" },
      { prompt: "Does it roll or slide?", say: "Which ones roll and which ones slide?",
        baskets: [{ label: "rolls" }, { label: "slides" }],
        items: [{ say: "a bicycle wheel" }, { say: "orange" }, { say: "yo-yo" }, { say: "a sled on the snow" }, { say: "a child on a slide" }, { say: "ice on the ground" }] },
      { prompt: "How does each one move?", say: "Match each thing to the way it moves.",
        pairs: [
          [{ say: "ball" }, { label: "rolls", say: "rolls" }],
          [{ say: "slide" }, { label: "slides", say: "slides" }],
          [{ label: "swing", say: "swing" }, { label: "goes forward and back", say: "goes forward and back" }],
          [{ say: "pinwheel" }, { label: "spins", say: "spins" }]
        ] },
      { prompt: "How does a swing move?", say: "How does a swing move?",
        options: ["forward and back", "it rolls"], answer: "forward and back" },
      { text: "You move too!",
        list: ["Roll like a ball on a soft floor.", "Open your arms and slowly turn round, then stop.", "Swing forward and back like a swing.", "Go down the slide in the park and say: I slid!"],
        say: "You move too! Roll like a ball on a soft floor. Open your arms and slowly turn round, then stop. Swing forward and back like a swing. Go down the slide in the park." }
    ] },
    "science-sprout-33": { title: "The sun warms things", steps: [
      { prompt: "What does the sun do?",
        scenes: [
          { caption: "We have two stones: one is in the sun and one is in the shade of the tree." },
          { caption: "The stone in the sun has got warm." },
          { caption: "The stone in the shade has stayed cool." },
          { caption: "Water is the same: the water in the sunny dish got warm and the water in the shady dish stayed cool." },
          { caption: "The teddy bear has got hot in the sun. Let's make a shade for it!" }
        ],
        question: "Which stone was warmer?",
        options: ["the stone in the sun", "the stone in the shade"], answer: "the stone in the sun" },
      { prompt: "It is summer. Where is it cooler?", say: "It is summer and it is hot. Where is it cooler?",
        options: [{ value: "in the shade of a tree" }, { value: "in the sun" }], answer: "in the shade of a tree" },
      { prompt: "The car has been parked in the sun. How does its steering wheel feel?", say: "The car stayed in the sun for hours. How does its steering wheel feel?",
        options: ["warm", "cold"], answer: "warm" },
      { prompt: "Where should we eat an ice cream so it melts more slowly?", say: "Where should we eat an ice cream so it melts more slowly?",
        options: [{ value: "in the shade" }, { value: "in the sun" }], answer: "in the shade" },
      { text: "Test sun and shade with your hand.",
        need: ["two stones or two dishes of water of the same size", "a small toy", "two lolly sticks or pencils, a cloth and a little play dough or tape"],
        steps: [
          "In the morning put one stone or dish of water in the sun and one in the shade.",
          "At noon touch them together: which one is warmer? (On very hot days, touch them yourself first.)",
          "Make a shade for the toy with two sticks and a cloth: stand the sticks in play dough and tie the cloth across them.",
          "Did the shade make shade? If not, fix it together and try again."
        ],
        ask: "Why did the sunny stone get warmer?" }
    ] },
    "science-sprout-35": { title: "Living things change their homes", steps: [
      { prompt: "How do living things change the place they live?",
        scenes: [
          { caption: "Ants dig tunnels under the ground and carry the soil out." },
          { caption: "A sparrow builds a nest with little twigs." },
          { caption: "A tree's root grows into the crack of a rock and pushes the rock open." },
          { caption: "People put bricks on top of each other and build houses." }
        ],
        question: "Where do ants make their home?",
        options: [{ value: "in the sky" }, { value: "under the ground" }, { value: "in the sea" }], answer: "under the ground" },
      { prompt: "Who makes what?", say: "An ant digs tunnels under the ground. Find the pairs.",
        pairs: [
          [{ say: "ant" }, { label: "tunnels underground", say: "tunnels under the ground" }],
          [{ say: "sparrow" }, { label: "nest", say: "a nest in a tree" }],
          [{ say: "a plant's root" }, { label: "a crack in a rock", say: "it pushes the rock open" }],
          [{ say: "people" }, { label: "house", say: "a house" }]
        ] },
      { prompt: "Who made this?", say: "Match each thing to its maker.",
        pairs: [
          [{ say: "web" }, { say: "spider" }],
          [{ say: "honeycomb" }, { say: "bee" }],
          [{ say: "school" }, { say: "people" }]
        ] },
      { prompt: "Where does a bee make its home?", say: "What does a honeybee build for its home?",
        options: ["a hive", "a nest under water"], answer: "a hive" },
      { text: "Look for the work of living things!",
        need: ["sharp eyes", "paper and a pencil"],
        steps: [
          "In the yard, the park or the street, look for signs that living things have made: an ants' nest, a bird's nest, a spider's web, a root lifting the asphalt or a wall.",
          "Only look; don't touch the nests.",
          "Ask: “How has this animal or plant changed its place?”",
          "Your child draws one thing they saw."
        ],
        ask: "Which work of living things did you see?" }
    ] },
    "science-sprout-18": { title: "Let's not waste water", steps: [
      { prompt: "Every drop of water counts",
        scenes: [
          { caption: "Iran is a dry land. In most places only a little rain falls." },
          { caption: "If the tap is left running while we brush our teeth, a lot of water is wasted." },
          { caption: "Reza turns the tap off. He takes just one cup of water to rinse his mouth." },
          { caption: "This way we save a few glasses of water every time!" }
        ],
        question: "What should we do with the tap while we brush our teeth?",
        options: ["Turn it off", "Leave it running"], answer: "Turn it off" },
      { prompt: "To wash a car or the yard, which wastes less water?", say: "To wash a car or the yard, which wastes less water?",
        options: [{ value: "a bucket of water" }, { value: "a hose that is always running" }], answer: "a bucket of water" },
      { prompt: "The tap is dripping. What should we do?", say: "The tap is dripping. What should we do?",
        options: ["Tell a grown-up so they can fix it", "Do nothing"], answer: "Tell a grown-up so they can fix it" },
      { prompt: "There is some water left in the glass. What shall we do with it?", say: "There is a little water left in your glass. What shall we do with it?",
        options: [{ value: "Give it to a plant" }, { value: "Pour it away" }], answer: "Give it to a plant" },
      { text: "Count how many glasses of water you saved!",
        need: ["a glass", "a bowl or basin"],
        steps: [
          "Once, while brushing teeth, put the basin under the tap and leave the tap running. Measure the water in the basin with the glass.",
          "Next time turn the tap off and take just one glass of water.",
          "Work out the difference: how many glasses did you save? Give the basin water to the plants.",
          "Look for dripping taps at home together."
        ],
        ask: "How can you avoid wasting water?" }
    ] },
    "science-sprout-36": { title: "Let's sort our rubbish", steps: [
      { prompt: "Each piece of rubbish in its own bin",
        scenes: [
          { caption: "We don't mix our rubbish. We have four bins: paper, plastic, glass and food." },
          { caption: "Paper in the paper bin, the plastic bottle in the plastic bin." },
          { caption: "The glass bottle in the glass bin, the apple core in the food bin." },
          { caption: "We don't throw the jam jar away. Now it holds pencils!" }
        ],
        question: "Which bin does a plastic bottle go in?",
        options: ["the plastic bin", "the food bin", "the paper bin"], answer: "the plastic bin" },
      { prompt: "Each piece of rubbish in its own bin", say: "Put each piece of rubbish in its own bin.",
        baskets: [{ label: "paper" }, { label: "plastic" }, { label: "glass" }, { label: "food" }],
        items: [{ say: "newspaper" }, { say: "cardboard box" }, { say: "shampoo bottle" }, { say: "plastic bag" }, { say: "empty jar" }, { say: "banana peel" }, { say: "eggshell" }] },
      { prompt: "What shall we do with an empty shoebox?", say: "We have an empty shoebox. What shall we do with it?",
        options: [{ value: "Make a doll's house" }, { value: "Throw it in with the food waste" }], answer: "Make a doll's house" },
      { prompt: "What shall we do with an empty jam jar?", say: "What shall we do with an empty jam jar?",
        options: ["Use it again, or put it in the glass bin", "Mix it in with the food waste"], answer: "Use it again, or put it in the glass bin" },
      { text: "Sort the rubbish at home, and use something old again!",
        need: ["a few bags or boxes for sorting", "a clean empty box or jar"],
        steps: [
          "Draw a picture on each bag: paper, plastic, glass, food.",
          "For a week, your child helps put the rubbish in the right bag. Grown-ups move the glass.",
          "Make something new from an empty box or jar together: a pencil holder, a doll's house, a flowerpot.",
          "Ask: “What good does it do if we sort our rubbish?”"
        ],
        ask: "What new thing did you make from something old?" }
    ] },
    "science-sprout-30": { title: "What shall I build?", steps: [
      { prompt: "Let's make a foil boat",
        scenes: [
          { caption: "We want to make a foil boat that carries lots of pebbles. First we draw a plan." },
          { caption: "We made the boat and put it on the water. It floated!" },
          { caption: "We put in pebbles one by one. The boat went down, water came in and it sank!" },
          { caption: "We made the boat better: a wider bottom and higher sides." },
          { caption: "The new boat carried ten pebbles and didn't sink!" }
        ],
        question: "Why did the first boat sink?",
        options: ["Its sides were low and water got in", "Its color wasn't pretty"], answer: "Its sides were low and water got in" },
      { prompt: "Put a builder's work in order", say: "First we draw a plan, then we build, then we test it, and last we make it better.",
        items: [{ say: "we draw a plan" }, { say: "we build" }, { say: "we test it" }, { say: "we make it better" }] },
      { prompt: "Your boat sank. What now?", say: "Your boat sank. What do you do now?",
        options: ["I think about why, and make it better", "I stop building"], answer: "I think about why, and make it better" },
      { prompt: "What do builders do first?", say: "Before building the boat, what did we do first?",
        options: ["We drew a plan", "We sank the boat"], answer: "We drew a plan" },
      { text: "Foil boat contest: how many pebbles can your boat carry?",
        need: ["a few pieces of aluminium foil of the same size", "a basin of water", "pebbles, buttons or small coins"],
        steps: [
          "First your child draws a plan of the boat on paper.",
          "Make a boat from foil and put it on the water.",
          "Put pebbles in the boat one by one and count until it sinks.",
          "Think about how to make it better: a wider bottom? Higher sides? Make a new boat and count again.",
          "Never leave your child alone next to the basin of water."
        ],
        ask: "How many pebbles did the better boat carry? What did you change?" }
    ] },
    "science-sprout-24": { title: "A world of hot and cold", steps: [
      { prompt: "Where does the warmth go?",
        scenes: [
          { caption: "This tea is freshly made. It is very hot." },
          { caption: "We left the tea on the table. Time went by and the tea slowly cooled down." },
          { caption: "The hot tea we poured into the thermos is still hot a few hours later!" },
          { caption: "It is winter. Reza is cold. A coat, a woollen scarf and gloves keep his body warm." }
        ],
        question: "What happens to hot tea left on the table?",
        options: ["It slowly cools down", "It gets hotter"], answer: "It slowly cools down" },
      { prompt: "Hot or cold?", say: "Which ones are hot and which ones are cold?",
        baskets: [{ label: "hot" }, { label: "cold" }],
        items: [{ say: "hot soup" }, { say: "a teapot" }, { say: "a stone in the summer sun" }, { say: "snow" }, { say: "ice cream" }, { say: "ice" }] },
      { prompt: "Which ones keep us warm?", say: "Which ones keep us warm in winter?",
        baskets: [{ label: "keeps us warm" }, { label: "for summer" }],
        items: [{ say: "coat" }, { say: "woollen gloves" }, { say: "scarf" }, { say: "shorts" }, { say: "flip-flops" }, { say: "sun hat" }] },
      { prompt: "We want the tea to stay hot until evening. Where shall we pour it?", say: "We want the tea to stay hot until evening. Where shall we pour it?",
        options: ["into a thermos", "into a glass on the table"], answer: "into a thermos" },
      { text: "Which glass cools down more slowly?",
        need: ["two glasses of the same size", "warm water (not hot; a grown-up prepares it)", "a woollen scarf or sock"],
        steps: [
          "A grown-up pours warm water into both glasses. Wrap the woollen scarf around one and leave the other as it is.",
          "Your child guesses which one will cool down more slowly.",
          "Twenty minutes later, test the water in both with a finger. Which one stayed warmer?",
          "Say: “Wool keeps warmth in; that's why we wear woollen clothes in winter.”"
        ],
        ask: "Why did the water in the wrapped glass stay warmer?" }
    ] },
    "science-sprout-25": { title: "Solids and liquids", steps: [
      { prompt: "Solid or liquid?",
        scenes: [
          { caption: "This block is a solid. Wherever we put it, its shape doesn't change." },
          { caption: "Water is a liquid. In the glass, it has the shape of the glass." },
          { caption: "We poured the water into a bowl. Now it has the shape of the bowl!" },
          { caption: "Sand pours like water too." },
          { caption: "But if we look closely, each grain of sand is tiny and solid." }
        ],
        question: "What shape did the water take in the bowl?",
        options: ["the shape of the bowl", "the shape of a block", "the shape of the glass"], answer: "the shape of the bowl" },
      { prompt: "Solid or liquid?", say: "Solids keep their shape. Liquids pour. Put each one in its basket.",
        baskets: [{ label: "solid" }, { label: "liquid" }],
        items: [{ say: "stone" }, { say: "ice" }, { say: "spoon" }, { say: "milk" }, { say: "honey" }, { say: "fruit juice" }] },
      { prompt: "If we pour milk into a tall glass, what shape does it take?", say: "If we pour milk into a tall glass, what shape does the milk take?",
        options: ["the shape of the glass", "the shape of a ball"], answer: "the shape of the glass" },
      { prompt: "Ice is a solid. If it melts, what is it?", say: "Ice is a solid. If it melts, is it a solid or a liquid?",
        options: ["a liquid", "a solid"], answer: "a liquid" },
      { text: "Play with water and rice: which one changes shape?",
        need: ["a few containers of different shapes: a glass, a bowl, a bottle", "water", "a bowl of rice or lentils", "a spoon"],
        steps: [
          "Pour the water from the glass into the bowl and from the bowl into the bottle. Each time ask: “What shape is the water now?”",
          "Put the spoon in different containers: did its shape change?",
          "Pour the rice from one container to another too. It pours like water! Now pick up one grain and look: it is hard and solid.",
          "Do this on a tray or in the bathroom so spills don't matter."
        ],
        ask: "Is rice a solid or a liquid? Why does it pour like water?" }
    ] },
    "science-sprout-17": { title: "Earth, our watery home", steps: [
      { prompt: "Where is water?",
        scenes: [
          { caption: "Spring water comes out from inside the mountain." },
          { caption: "Springs become a river. The river runs down and reaches the sea." },
          { caption: "Sea water is salty. Spring water and river water are fresh." },
          { caption: "In dry places, people have built qanats. Water from under the mountain slowly reaches the village through a tunnel." },
          { caption: "Water comes from the lake behind the dam, through pipes, to our house and out of the tap." }
        ],
        question: "Which water is salty?",
        options: [{ value: "the sea" }, { value: "a river" }, { value: "a spring" }], answer: "the sea" },
      { prompt: "Salty water or fresh water?", say: "Which ones have salty water and which ones have fresh water?",
        baskets: [{ label: "salty" }, { label: "fresh" }],
        items: [{ say: "the Caspian Sea" }, { say: "the Persian Gulf" }, { say: "the Karun river" }, { say: "a spring" }, { say: "tap water at home" }] },
      { prompt: "Where does a qanat bring water to the village from?", say: "Where does a qanat bring water to the village from?",
        options: ["from under the ground", "from the clouds", "from the sea"], answer: "from under the ground" },
      { prompt: "Where does the water from the tap at home come from?", say: "Where has the water that comes out of the tap at home come from?",
        options: ["from a dam or a well, through pipes", "it is made inside the wall"], answer: "from a dam or a well, through pipes" },
      { text: "Taste and see salty water and fresh water.",
        need: ["two glasses of drinking water", "a spoonful of salt", "a black or dark plate"],
        steps: [
          "Stir a little salt into one of the glasses: it is salty like sea water.",
          "Your child tastes one drop of each from a fingertip. Which one is salty? Don't drink the salty water.",
          "Pour a few spoonfuls of the salty water onto the dark plate and leave it in the sun. Tomorrow, see what is left: salt!",
          "Ask the grown-ups where the water in your town or village comes from: a dam, a river, a well or a qanat?"
        ],
        ask: "When the water on the plate dried up, what was left?" }
    ] },
    "science-sprout-19": { title: "Air is everywhere", steps: [
      { prompt: "We can't see air, but it is everywhere!",
        scenes: [
          { caption: "Sara blows into a balloon. Air fills the balloon." },
          { caption: "We swept the bag through the air and closed it. The bag is full of air!" },
          { caption: "We put a tissue in the bottom of a glass and pushed the glass upside down into the water." },
          { caption: "We took the glass out. The tissue stayed dry! The air in the glass didn't let the water come up." },
          { caption: "Air moves things. Sara blows and the feather flies!" }
        ],
        question: "What is inside the balloon?",
        options: ["air", "water", "nothing"], answer: "air" },
      { prompt: "What is wind?", say: "What is wind?",
        options: ["air that moves", "water that moves"], answer: "air that moves" },
      { prompt: "We have an empty bottle. What is inside it?", say: "There is an empty bottle on the table. Is it really empty inside?",
        options: ["It is full of air", "There is nothing at all"], answer: "It is full of air" },
      { prompt: "Which one is filled with air?", say: "Which one is filled with air?",
        options: [{ value: "a balloon" }, { value: "a brick" }, { value: "an apple" }], answer: "a balloon" },
      { text: "Do the dry tissue experiment yourself!",
        need: ["a clear glass", "a paper tissue", "a bowl or basin of water", "a balloon"],
        steps: [
          "Scrunch up the tissue and push it into the bottom of the glass so it doesn't fall out.",
          "Before you start, ask: “If we push the glass upside down into the water, will the tissue get wet?”",
          "Push the glass straight down into the water, upside down; don't tip it. Then lift it straight out and touch the tissue.",
          "Now tip the glass: bubbles of air come out and the water goes up.",
          "Blow up a balloon and let its air out onto your child's face: can they feel the air?"
        ],
        ask: "Why didn't the tissue get wet?" }
    ] },
    "science-sprout-20": { title: "Wind", steps: [
      { prompt: "What does the wind do?",
        scenes: [
          { caption: "Wind is air that moves. We can't see air, but we can see what it does." },
          { caption: "The wind spins the pinwheel." },
          { caption: "The wind shakes the wet shirt and dries it." },
          { caption: "The wind carries the dandelion seeds away. Each seed grows somewhere else." }
        ],
        question: "What is wind?",
        options: ["air that moves", "smoke that goes up"], answer: "air that moves" },
      { prompt: "Can the wind move it?", say: "Which ones can the wind move, and which ones can't it move?",
        baskets: [{ label: "it moves it" }, { label: "it can't" }],
        items: [{ say: "kite" }, { say: "dry leaf" }, { say: "sailboat" }, { say: "house" }, { say: "big stone" }, { say: "brick wall" }] },
      { prompt: "It is a windy day. Which game is good?", say: "It is windy today. Which game is good for a windy day?",
        options: [{ value: "flying a kite" }, { value: "a jigsaw puzzle" }], answer: "flying a kite" },
      { prompt: "What does the wind do to the wet shirt on the line?", say: "What does the wind do to the wet shirt on the line?",
        options: ["It dries it", "It makes it wetter"], answer: "It dries it" },
      { text: "Make a pinwheel and test it in the wind!",
        need: ["a square of paper", "a pencil with an eraser on the end", "a pin (only a grown-up handles it)", "scissors (only a grown-up)"],
        steps: [
          "A grown-up cuts in from the four corners of the paper almost to the middle.",
          "Your child brings every other corner to the middle, and a grown-up pins them to the pencil's eraser.",
          "Take the pinwheel outside or to a window. Where does it spin fastest?",
          "Blow on it, gently and hard. How was the pinwheel different?"
        ],
        ask: "Did you see the wind? How did you know the wind was blowing?" }
    ] },
    "science-sprout-21": { title: "Earth, our rocky home", steps: [
      { prompt: "Let's look closely at rocks",
        scenes: [
          { caption: "Rocks come in many colors and sizes: big and small, white and red and black." },
          { caption: "We rub a hard rock on a soft rock. It leaves a scratch on the soft rock!" },
          { caption: "People build houses and bridges from stone. This is an old stone bridge." },
          { caption: "This is turquoise from Neyshabur, a beautiful blue stone that is made into jewelry." }
        ],
        question: "When we rubbed the hard rock on the soft rock, what happened?",
        options: ["It left a scratch on the soft rock", "The soft rock melted"], answer: "It left a scratch on the soft rock" },
      { prompt: "Big or small?", say: "Big rocks on one side, small rocks on the other.",
        baskets: [{ label: "big" }, { label: "small" }],
        items: [{ say: "a mountain boulder" }, { say: "a big cliff" }, { say: "a building stone" }, { label: "pebble", say: "a pebble" }, { say: "the turquoise in a ring" }, { label: "a grain of sand", say: "a grain of sand" }] },
      { prompt: "Is it made of stone or not?", say: "Which ones are made of stone and which ones are not?",
        baskets: [{ label: "stone" }, { label: "not stone" }],
        items: [{ say: "a stone bridge" }, { say: "a turquoise stone" }, { say: "a mountain" }, { say: "a teddy bear" }, { say: "bread" }, { say: "a tree" }] },
      { prompt: "Which stone is softer?", say: "When we rub two stones together, which one gets a scratch?",
        options: ["the softer stone", "the harder stone"], answer: "the softer stone" },
      { text: "Collect some rocks!",
        need: ["an egg box or a bag", "a coin", "a piece of tile or paving stone", "a magnifying glass, if you have one"],
        steps: [
          "Collect a few small stones in the yard, the park or by a river.",
          "Wash the stones and look closely: what color are they? Do they have spots or lines? Are they rough or smooth?",
          "Rub each stone on the tile or paving stone: which one leaves a colored line? Try with the coin too: which one does it scratch?",
          "Line the stones up from big to small and put them in the box."
        ],
        ask: "Which was your softest stone? How did you know?" }
    ] },
    "science-sprout-22": { title: "Earth, our soil home", steps: [
      { prompt: "What is in soil?",
        scenes: [
          { caption: "We look at soil up close: there are grains of sand, little pebbles and bits of leaves and roots in it." },
          { caption: "An earthworm moves through the soil. It makes the soil soft and is good for plants." },
          { caption: "We put soil and water in a jar and shook it. It all went brown." },
          { caption: "We waited. The soil settled in layers at the bottom of the jar: pebbles at the bottom, then sand, then fine soil, and bits of leaves on the water." }
        ],
        question: "What is in soil?",
        options: ["sand, pebbles and bits of plants", "only water", "candy"], answer: "sand, pebbles and bits of plants" },
      { prompt: "Is it found in soil?", say: "Which of these do we find in garden soil?",
        baskets: [{ label: "in soil" }, { label: "not in soil" }],
        items: [{ say: "ant" }, { say: "rotting leaf" }, { say: "pebble" }, { say: "fish" }, { say: "ice cream" }, { say: "star" }] },
      { prompt: "Is an earthworm good or bad for soil?", say: "An earthworm makes tunnels in the soil. Is it good or bad for the soil?",
        options: ["Good, it makes the soil soft", "Bad"], answer: "Good, it makes the soil soft" },
      { prompt: "In the jar, what settled at the very bottom?", say: "When the soil settled in the jar of water, what was at the very bottom?",
        options: ["pebbles", "bits of leaves"], answer: "pebbles" },
      { text: "The soil jar experiment: soil makes layers!",
        need: ["a clear jar with a lid", "two or three spoonfuls of garden soil", "water"],
        steps: [
          "Fill the jar halfway with soil and top it up with water. Close the lid tightly.",
          "Your child shakes the jar well. Ask: “What do you think will happen if we wait?”",
          "Leave the jar for a day without shaking it.",
          "Tomorrow, look at the layers together: which layer is at the bottom? What is floating on the water? Wash hands after playing with soil."
        ],
        ask: "Why did the pebbles settle at the bottom?" }
    ] },
    "science-sprout-23": { title: "Earth game", steps: [
      { prompt: "Salty or fresh water?", say: "Which water is salty and which is fresh?",
        baskets: [{ label: "salty" }, { label: "fresh" }],
        items: [{ say: "the sea" }, { say: "the ocean" }, { say: "a spring" }, { say: "a river" }, { say: "tap water" }] },
      { prompt: "What does each one do?", say: "Find the pairs.",
        pairs: [
          [{ say: "balloon" }, { label: "full of air", say: "full of air" }],
          [{ say: "pinwheel" }, { say: "wind" }],
          [{ label: "qanat", say: "qanat" }, { label: "water under the ground", say: "water under the ground" }],
          [{ say: "the stone in a ring" }, { label: "turquoise", say: "turquoise" }]
        ] },
      { prompt: "Rock, soil or water?", say: "Put each one in its basket: rock, soil or water.",
        baskets: [{ label: "rock" }, { label: "soil" }, { label: "water" }],
        items: [{ say: "a cliff" }, { say: "turquoise" }, { say: "potting soil" }, { say: "garden soil" }, { say: "the sea" }, { say: "rain" }] },
      { prompt: "What does air do?", say: "What does the wind move? Find the pairs.",
        pairs: [
          [{ say: "sailboat" }, { label: "moves forward", say: "moves forward" }],
          [{ say: "kite" }, { label: "goes up", say: "goes up" }],
          [{ say: "wet shirt" }, { label: "gets dry", say: "gets dry" }]
        ] },
      { text: "On a walk, find water, air, rock and soil!",
        need: ["a small bag", "paper and a pencil"],
        steps: [
          "Look around the park or the street together: where is there water? Where is there rock? Where is there soil? How can we tell there is air?",
          "Collect a small stone and a little soil in the bag.",
          "At home, your child draws a picture of each.",
          "Wash hands after playing with soil."
        ],
        ask: "How did you know the air was there?" }
    ] },
    "science-sprout-32": { title: "What shape is the moon?", steps: [
      { prompt: "The moon's shape over a month",
        scenes: [
          { caption: "One night the moon is a thin crescent. We draw its shape in the moon diary." },
          { caption: "On the next nights the moon gets a little fuller each night: a half moon." },
          { caption: "Until the moon is round and full: a full moon!" },
          { caption: "Then night by night the moon gets thinner." },
          { caption: "One night we can't see the moon at all. Then a thin crescent appears again and it all starts over." }
        ],
        question: "What do we call the round, full moon?",
        options: ["a full moon", "a crescent", "a half moon"], answer: "a full moon" },
      { prompt: "Put them in order from crescent to full moon", say: "First a thin crescent, then a half moon, then a full moon. Put them in order.",
        items: [{ say: "crescent" }, { say: "half moon" }, { say: "more than half" }, { say: "full moon" }] },
      { prompt: "What comes after the full moon?", say: "The moon gets fuller and then thinner again. Which shape comes after the full moon?" },
      { prompt: "Is the moon the same shape every night?", say: "Is the moon the same shape every night?",
        options: ["No, its shape slowly changes", "Yes, it is always round"], answer: "No, its shape slowly changes" },
      { text: "Moon diary: for a few nights, draw the moon's shape in a box of your chart.",
        check: ["How many nights in a row did they find the moon?", "Did they draw the shapes in the boxes?", "Did they see the moon getting fuller or thinner?"],
        note: "Divide a sheet of paper into eight boxes. Every night before bed, find the moon from the window (sometimes the moon is in the sky in the evening or the morning). If it is cloudy or you can't see the moon, leave the box empty. Never look straight at the sun." }
    ] },
    "science-sprout-34": { title: "Sky and seasons game", steps: [
      { prompt: "The sun in one day: put them in order", say: "In the morning the sun comes up, at noon it is high in the sky, in the evening it goes down. Put them in order.",
        items: [{ say: "morning" }, { say: "noon" }, { say: "evening" }, { say: "night" }] },
      { prompt: "The moon gets fuller: put them in order", say: "Put them in order from a thin crescent to a full moon.",
        items: [{ say: "crescent" }, { say: "half moon" }, { say: "full moon" }] },
      { prompt: "Which season comes after autumn?", say: "Spring, summer, autumn… which season comes next?" },
      { prompt: "Day and night: what comes next?", say: "Day, night, day, night… what comes next?" },
      { prompt: "Summer or winter?", say: "Do these belong to summer or winter?",
        baskets: [{ label: "summer" }, { label: "winter" }],
        items: [{ say: "watermelon" }, { say: "the seaside" }, { say: "sun hat" }, { say: "snowman" }, { say: "scarf" }, { say: "snow" }] },
      { text: "Compare today's sky with tonight's sky.",
        need: ["paper and crayons"],
        steps: [
          "In the morning, at noon and in the evening, look from the same window: where is the sun in the sky? Never look straight at the sun.",
          "At night find the moon and draw its shape.",
          "Ask: “What season is it now? How can you tell?” (the trees, the weather, our clothes)",
          "Your child draws a picture of today's season."
        ],
        ask: "What season is it now? How did you know?" }
    ] },
    "science-sprout-37": { title: "Light and dark", steps: [
      { prompt: "Can we see without light?",
        scenes: [
          { caption: "The room is completely dark. We can't see anything." },
          { caption: "We turned on the flashlight. Its light fell on the teddy bear and now we can see it!" },
          { caption: "Behind the teddy a shadow fell on the wall. A shadow is where the light can't reach." },
          { caption: "We shone the flashlight at glass, paper and wood. Light goes through glass, a little through paper, and not at all through wood!" }
        ],
        question: "In a completely dark room, can we see things?",
        options: ["No, we need light to see", "Yes, we can see well"], answer: "No, we need light to see" },
      { prompt: "Does light go through it?", say: "Which ones does light go through, and which ones doesn't it go through?",
        baskets: [{ label: "goes through" }, { label: "doesn't go through" }],
        items: [{ say: "window glass" }, { say: "glasses" }, { say: "clear water" }, { say: "book" }, { say: "wall" }, { say: "wooden door" }] },
      { prompt: "Where does a shadow fall?", say: "When light hits something, where does its shadow fall?",
        options: ["Behind it, where the light can't reach", "In front of the flashlight"], answer: "Behind it, where the light can't reach" },
      { prompt: "What do we need to see?", say: "What do we need to be able to see things?",
        options: ["light", "sound"], answer: "light" },
      { text: "At night, play shadow games with a flashlight!",
        need: ["a flashlight", "a light-colored wall", "a piece of glass or a glass, a sheet of paper, a board or a book"],
        steps: [
          "Darken the room and shine the flashlight on the wall. Make animal shapes with your hands: their shadow falls on the wall.",
          "Move your hand closer to the light and farther away: what happens to the shadow?",
          "Hold the flashlight behind the glass, the paper and the book: which does the light go through?",
          "Don't shine the flashlight into anyone's eyes."
        ],
        ask: "When did your hand's shadow get bigger?" }
    ] },
    "science-sprout-38": { title: "Vibration and sound", steps: [
      { prompt: "Sound comes from vibration",
        scenes: [
          { caption: "We held one end of a ruler on the table and pushed the other end down." },
          { caption: "The ruler shook back and forth fast and made a sound: bzzz!" },
          { caption: "We put a rubber band round a box. We pulled the band and let go: it shook and made a sound." },
          { caption: "We put our hand on the band. The shaking stopped and the sound stopped too." }
        ],
        question: "When something makes a sound, what does it do?",
        options: ["It vibrates", "It changes color", "It gets cold"], answer: "It vibrates" },
      { prompt: "Is it vibrating and making a sound?", say: "Which ones are vibrating and making a sound right now, and which ones are quiet?",
        baskets: [{ label: "vibrates and makes a sound" }, { label: "quiet" }],
        items: [{ say: "a bell that is ringing" }, { say: "a buzzing bee's wings" }, { say: "a string of an instrument being played" }, { say: "a book on the table" }, { say: "a stone" }, { say: "a sleeping teddy" }] },
      { prompt: "How can we make the bell quiet?", say: "The bell is ringing. What can we do to make it quiet?",
        options: ["Put our hand on it so it doesn't shake", "Hit it harder"], answer: "Put our hand on it so it doesn't shake" },
      { prompt: "Put your hand on your throat and sing. What do you feel?", say: "Gently put your hand on your throat and sing a song. What do you feel?",
        options: ["My throat is vibrating", "My throat is getting cold"], answer: "My throat is vibrating" },
      { text: "See and hear vibration!",
        need: ["a ruler", "a bowl, a little plastic wrap and a rubber band", "a few grains of rice"],
        steps: [
          "Put the ruler at the edge of the table and hold one end down with your hand. Gently push the other end down: did it shake? Did it make a sound?",
          "Let more or less of the ruler stick out: how does the sound change?",
          "Stretch the plastic over the bowl and fix it with the rubber band. Put a few grains of rice on top and clap near the bowl or bang a pot: the rice jumps!",
          "Put a hand on your throat and sing: feel the vibration."
        ],
        ask: "When the ruler stopped, what happened to the sound?" }
    ] },
    "science-sprout-39": { title: "Messages with light and sound", steps: [
      { prompt: "Sending messages from far away",
        scenes: [
          { caption: "It is night. We send light three times from a window with a flashlight." },
          { caption: "In the house across the street they saw the light and answered with a flashlight!" },
          { caption: "In the day, Arash plays the tonbak. The sound reaches Sara." },
          { caption: "Now we make a telephone with two paper cups and a string. The string must be tight." },
          { caption: "Arash talks into his cup. The sound shakes along the string and reaches Sara's ear!" }
        ],
        question: "At night, what can we send a message with from far away?",
        options: [{ value: "a flashlight" }, { value: "a sock" }], answer: "a flashlight" },
      { prompt: "In a cup telephone, where does the sound travel?", say: "In a cup telephone, how does the sound reach the other cup?",
        options: ["Along the tight string", "It flies through the air"], answer: "Along the tight string" },
      { prompt: "In the day, what can you call a friend from far away with?", say: "In the park, your friend is far away. What can you call them with?",
        options: [{ value: "a drum" }, { value: "a closed book" }], answer: "a drum" },
      { prompt: "What happens if the telephone string is loose?", say: "If the string of the cup telephone is loose and hanging, does the sound come through well?",
        options: ["No, the string must be tight", "Yes, even better"], answer: "No, the string must be tight" },
      { text: "Make a cup telephone!",
        need: ["two paper or disposable cups", "a long string, a few meters", "a pencil", "a flashlight"],
        steps: [
          "A grown-up makes a small hole in the bottom of each cup with the tip of a pencil.",
          "Push the end of the string through the hole and knot it inside the cup. Tie the other end to the second cup.",
          "Each of you takes a cup and moves apart until the string is tight. One talks quietly into the cup and the other holds their cup to their ear.",
          "At night, make a code with the flashlight: one flash means “hello”, two flashes mean “come”. Don't shine the light into anyone's eyes."
        ],
        ask: "When the string went loose, could you hear the sound?" }
    ] },
    "science-sprout-45": { title: "Light and sound game", steps: [
      { prompt: "Light or dark?", say: "Which ones give light and which ones don't?",
        baskets: [{ label: "gives light" }, { label: "doesn't give light" }],
        items: [{ say: "the sun" }, { say: "a flashlight that is on" }, { say: "a lamp that is on" }, { say: "a stone" }, { say: "a book" }, { say: "a doll" }] },
      { prompt: "Does light go through it?", say: "Which ones does light go through?",
        baskets: [{ label: "goes through" }, { label: "doesn't go through" }],
        items: [{ say: "a glass" }, { say: "a window" }, { say: "a wooden chair" }, { say: "a brick" }] },
      { prompt: "Which part vibrates to make the sound?", say: "Match each thing to the part that vibrates and makes the sound.",
        pairs: [
          [{ say: "tonbak" }, { label: "the drum skin", say: "the drum skin" }],
          [{ say: "string instrument" }, { label: "the string", say: "the string" }],
          [{ say: "bee" }, { label: "the bee's wings", say: "the bee's wings" }],
          [{ say: "a person talking" }, { label: "the throat", say: "the throat" }]
        ] },
      { prompt: "Messages with light or sound", say: "Match each message to what it is sent with.",
        pairs: [
          [{ say: "flashlight" }, { label: "a message with light", say: "a message with light" }],
          [{ say: "school bell" }, { label: "a message with sound", say: "a message with sound" }],
          [{ say: "traffic light" }, { label: "the color of the light", say: "the color of the light" }]
        ] },
      { text: "The secret message game!",
        need: ["a flashlight", "a spoon and a pot, or a small bell"],
        steps: [
          "Make up a code together: one flash of light means “come”, two mean “sit down”. One tap on the pot means “clap”.",
          "One person sends a message and the other does it. Then swap.",
          "Send light messages in a dark room and sound messages in a bright room.",
          "Keep the sounds gentle and don't shine the light into anyone's eyes."
        ],
        ask: "Which message reached farther: light or sound?" }
    ] },
    "science-sprout-8": { title: "Hello, look at me!", steps: [
      { prompt: "What is in our body?",
        scenes: [
          { caption: "Hello! This is Arash: head, body, arms and legs." },
          { caption: "Under our skin are bones. Bones hold our body up firmly." },
          { caption: "Where two bones meet is a joint. Elbows and knees bend." },
          { caption: "Our lungs take in air. They fill and empty with every breath." },
          { caption: "The heart pumps blood around the body. When we jump, the heart beats faster!" }
        ],
        question: "What do bones do?",
        options: ["They hold the body up firmly", "They digest food"], answer: "They hold the body up firmly" },
      { prompt: "What does each part do?", say: "The heart pumps blood around the body. Find the pairs.",
        pairs: [
          [{ label: "heart", say: "heart" }, { label: "pumps blood", say: "pumps blood around the body" }],
          [{ label: "lungs", say: "lungs" }, { label: "take in air", say: "take in air" }],
          [{ label: "bones", say: "bones" }, { label: "hold the body up", say: "hold the body up firmly" }],
          [{ say: "eyes" }, { label: "see", say: "see" }]
        ] },
      { prompt: "After running, how does your heart beat?", say: "After running, how does your heart beat?",
        options: ["faster", "slower"], answer: "faster" },
      { prompt: "Which one bends?", say: "Which part of the body bends?",
        options: ["the knee", "the middle of the thigh bone"], answer: "the knee" },
      { text: "Feel your heart and bend your joints!",
        list: ["Put your hand on your chest and sit quietly. Can you feel your heart?", "Now jump ten times.", "Put your hand on your chest again: is your heart beating faster?", "Bend and straighten your knees, elbows and fingers.", "Take a deep breath: does your chest rise?"],
        say: "Feel your heart! Put your hand on your chest and sit quietly. Now jump ten times. Put your hand on your chest again: is your heart beating faster? Bend and straighten your knees, elbows and fingers. Take a deep breath." }
    ] },
    "science-sprout-9": { title: "I am growing up", steps: [
      { prompt: "How do we grow up?",
        scenes: [
          { caption: "When Arash was little, he was this big." },
          { caption: "Now he is bigger and goes to school." },
          { caption: "Later he will be a grown man, like his father." },
          { caption: "And one day he will be a grandfather." },
          { caption: "Arash's hand when he was little, and his hand now. How much it has grown!" }
        ],
        question: "When we grow up, what changes?",
        options: ["We get taller", "Our name changes"], answer: "We get taller" },
      { prompt: "Put them in order from small to big", say: "First we are babies, then children, then grown-ups, and last grandparents. Put them in order.",
        items: [{ say: "baby" }, { say: "child" }, { say: "grown-up" }, { say: "grandfather" }] },
      { prompt: "What does a baby need help with that you now do yourself?", say: "Other people feed a baby. What do you do now?",
        options: ["I eat by myself", "I still can't eat"], answer: "I eat by myself" },
      { prompt: "Which one is bigger?", say: "Which one is bigger: a baby's shoe or your shoe?",
        options: ["my shoe", "the baby's shoe"], answer: "my shoe" },
      { text: "Draw round your hand on paper and compare it with your baby photo!",
        need: ["paper and a pencil", "your child's baby photo or baby clothes, if you have them", "a grown-up's hand and a grandparent's"],
        steps: [
          "Your child puts a hand on the paper and you draw round it. Write the date next to it.",
          "Draw round a grown-up's hand too and compare.",
          "Look at the baby photo or clothes together. Ask: “What have you learned since then?”",
          "If a grandparent is there, ask what they looked like when they were children."
        ],
        ask: "What can you do now that you couldn't do as a baby?" }
    ] },
    "science-sprout-42": { title: "Like their parents", steps: [
      { prompt: "Do young look like their parents?",
        scenes: [
          { caption: "This is the mother cat." },
          { caption: "Her kittens look like her: they have ears, tails and whiskers, and they meow." },
          { caption: "But each kitten is a little different: one is orange, one is grey and one is white." },
          { caption: "The seeds of one sunflower grow into sunflowers too, but they are not all the same height." },
          { caption: "Sara looks like her mother and father too, but not exactly like them." }
        ],
        question: "Are the kittens exactly like their mother?",
        options: ["They look alike, but are a little different", "They are exactly the same"], answer: "They look alike, but are a little different" },
      { prompt: "Find each one's baby", say: "Match each baby to its mother or father.",
        pairs: [
          [{ say: "dog" }, { say: "puppy" }],
          [{ say: "hen" }, { say: "chick" }],
          [{ say: "sunflower" }, { label: "sunflower sprout", say: "sunflower sprout" }],
          [{ say: "cow" }, { label: "calf", say: "calf" }]
        ] },
      { prompt: "Are a hen's chicks all the same?", say: "Are a hen's chicks all exactly the same?",
        options: ["No, they look alike but are a little different", "Yes, they are exactly the same"], answer: "No, they look alike but are a little different" },
      { prompt: "If we plant an apple seed, what grows?", say: "If we plant an apple seed, what tree grows?",
        options: [{ value: "an apple tree" }, { value: "an orange tree" }], answer: "an apple tree" },
      { text: "Find what is alike and what is different!",
        need: ["family photos", "a few beans from one packet, planted in one pot"],
        steps: [
          "Look at photos of your child, their parents and grandparents together: eyes, hair, smile. Where are they alike? Where are they different?",
          "Plant beans from one packet. When they sprout, look: are they all alike? Are they all the same height?",
          "If you see a cat or a dog with its young, count the likenesses and differences from a little way off.",
          "Tell your child that everyone looks like their family and is also one of a kind."
        ],
        ask: "In what way do you look like your mother or father?" }
    ] },
    "science-sprout-43": { title: "Parents take care", steps: [
      { prompt: "What do parents do?",
        scenes: [
          { caption: "The baby sparrow opens its beak wide and cheeps: that means “I'm hungry!”" },
          { caption: "Its mother brings it a worm and puts it in its mouth." },
          { caption: "The hen calls her chicks and keeps them warm under her wing." },
          { caption: "The lamb bleats and its mother comes to it." },
          { caption: "When we need help, we call our mother or father too. Sara calls her mother and her mother comes." }
        ],
        question: "How does the hen keep her chicks warm?",
        options: ["under her wing", "in the water", "up in a tree"], answer: "under her wing" },
      { prompt: "What do parents do?", say: "Match each job to the animal that does it.",
        pairs: [
          [{ say: "sparrow" }, { label: "gives the chick a worm", say: "gives the chick a worm" }],
          [{ say: "hen" }, { label: "warms the chicks under her wing", say: "warms the chicks under her wing" }],
          [{ say: "sheep" }, { label: "gives the lamb milk", say: "gives the lamb milk" }],
          [{ say: "cat" }, { label: "carries her kitten in her mouth", say: "gently carries her kitten in her mouth" }]
        ] },
      { prompt: "How do young ask for help?", say: "Match each baby to the sound it makes to ask for help.",
        pairs: [
          [{ say: "chick" }, { label: "cheep cheep", say: "cheep cheep" }],
          [{ say: "lamb" }, { label: "baa", say: "baa baa" }],
          [{ say: "kitten" }, { label: "meow", say: "meow" }]
        ] },
      { prompt: "What does a hungry chick do?", say: "What does a chick do when it is hungry?",
        options: ["It cheeps and opens its beak", "It sleeps quietly"], answer: "It cheeps and opens its beak" },
      { text: "Ask: how did you take care of me when I was little?",
        need: ["a little time to talk", "baby photos, if you have them"],
        steps: [
          "Talk with your child about when they were a baby: how you fed them, kept them warm and calmed them.",
          "If a grandparent is there, ask them too.",
          "In the park, see how birds or cats look after their young. Watch from a little way off.",
          "Remind your child that whenever they need help, they can call you."
        ],
        ask: "When you need help, who do you call?" }
    ] },
    "science-sprout-44": { title: "Learn from nature", steps: [
      { prompt: "What have people learned from nature?",
        scenes: [
          { caption: "A tortoise has a hard shell. A pebble hit its shell, but the tortoise wasn't hurt." },
          { caption: "From the shell, people made safety helmets to protect their heads." },
          { caption: "Burrs have tiny hooks and stick to a sheep's wool." },
          { caption: "From them, people made hook-and-loop fasteners. We close shoes with them." },
          { caption: "When it rains, a cactus keeps the water in its stem, like a water tank." }
        ],
        question: "What gave people the idea for a safety helmet?",
        options: [{ value: "a tortoise's shell" }, { value: "a flower" }], answer: "a tortoise's shell" },
      { prompt: "Where did this idea come from?", say: "Match each thing people made to the animal or plant they learned it from.",
        pairs: [
          [{ say: "tortoise" }, { label: "safety helmet", say: "safety helmet" }],
          [{ label: "burr", say: "burr" }, { label: "hook-and-loop fastener", say: "hook-and-loop fastener" }],
          [{ say: "cactus" }, { label: "water tank", say: "water tank" }],
          [{ say: "bird" }, { label: "airplane", say: "airplane" }]
        ] },
      { prompt: "What gave people the idea for hook-and-loop fasteners?", say: "What gave people the idea for hook-and-loop fasteners?",
        options: ["burrs", "stones"], answer: "burrs" },
      { prompt: "Where does a cactus keep water?", say: "Where does a cactus keep rainwater?",
        options: ["in its stem", "in its flower"], answer: "in its stem" },
      { text: "Take an idea from nature and make something!",
        need: ["things from nature: a leaf, a feather, a walnut shell, seeds", "paper, card and glue"],
        steps: [
          "In the park, look closely at things from nature together: a feather is light, a walnut shell is hard, a lotus leaf sheds water.",
          "Ask: “If we wanted to make something like this, what would we make?”",
          "Your child draws an idea, for example a hat like a shell or an umbrella like a leaf.",
          "If you can, make it with card and paper and test it."
        ],
        ask: "Which animal or plant gave you your idea?" }
    ] },
    "science-sprout-26": { title: "Which material for which job?", steps: [
      { prompt: "Guess first, then try it: we pour water on each one.",
        items: [{ say: "paper" }, { say: "plastic bag" }, { say: "cotton cloth" }, { say: "umbrella cloth" }, { say: "sponge" }] },
      { prompt: "Does it bend or not?", say: "If we press it with our hands, which ones bend or stretch, and which ones stay stiff?",
        baskets: [{ label: "bends or stretches" }, { label: "stays stiff" }],
        items: [{ say: "paper" }, { say: "balloon" }, { say: "yarn" }, { say: "stone" }, { say: "brick" }, { say: "china plate" }] },
      { prompt: "What material shall we make a raincoat from?", say: "We want to make a raincoat that keeps us dry. What material shall we make it from?",
        options: [{ value: "plastic" }, { value: "paper" }], answer: "plastic" },
      { prompt: "What shall we make a window from so light comes through?", say: "What shall we make a window from so light comes through and the wind stays out?",
        options: [{ value: "glass" }, { value: "wood" }], answer: "glass" },
      { prompt: "Which material is better for a spoon?", say: "A spoon must be strong and not spoil in water. Which material is better?",
        options: [{ value: "metal" }, { value: "paper" }], answer: "metal" },
      { text: "Which material keeps water out? Try it!",
        need: ["small pieces of: paper, tissue, plastic bag, cloth, foil", "a small glass of water and a spoon", "a bowl"],
        steps: [
          "Lay each piece over the top of the bowl.",
          "Before each one, your child guesses: “Will water go through?” Write down the guess.",
          "Pour a spoonful of water on it. Did the water go through and drip into the bowl?",
          "Also bend, twist and stretch each piece: which one stretches? Which one tears?",
          "At the end ask: “Which is best for a raincoat? Which for a shopping bag?”"
        ],
        ask: "Which material kept the water out? What job is it good for?" }
    ] },
    "science-sprout-27": { title: "Materials game", steps: [
      { prompt: "What is it made of?", say: "Put each thing in the basket of its material: wood, metal or plastic.",
        baskets: [{ label: "wood" }, { label: "metal" }, { label: "plastic" }],
        items: [{ say: "wooden chair" }, { say: "pencil" }, { say: "metal spoon" }, { say: "key" }, { say: "plastic bucket" }, { say: "plastic bag" }] },
      { prompt: "What is each material like?", say: "Match each material to what it is like.",
        pairs: [
          [{ label: "glass", say: "glass" }, { label: "light goes through it", say: "light goes through it" }],
          [{ label: "plastic", say: "plastic" }, { label: "keeps water out", say: "keeps water out" }],
          [{ label: "wool", say: "wool" }, { label: "keeps us warm", say: "keeps us warm" }],
          [{ label: "stone", say: "stone" }, { label: "is hard", say: "is hard" }]
        ] },
      { prompt: "Solid or liquid?", say: "Solids on one side, liquids on the other.",
        baskets: [{ label: "solid" }, { label: "liquid" }],
        items: [{ say: "key" }, { say: "apple" }, { say: "milk" }, { say: "tea" }] },
      { prompt: "Hot or cold?", say: "Hot things on one side, cold things on the other.",
        baskets: [{ label: "hot" }, { label: "cold" }],
        items: [{ say: "hot soup" }, { say: "hot tea" }, { say: "ice cream" }, { say: "snowman" }] },
      { text: "Find what things at home are made of!",
        need: ["things at home"],
        steps: [
          "Look around the house together: find something wooden, something metal, something plastic, something glass and something made of cloth.",
          "For each one ask: “Why is it made of this material?”",
          "Find a solid and a liquid in the kitchen.",
          "Don't touch hot or sharp things."
        ],
        ask: "Why are glasses made of glass?" }
    ] },
    "science-sprout-31": { title: "From the past to the future", steps: [
      { prompt: "How have tools changed?",
        scenes: [
          { caption: "In the past, people lit their homes at night with an oil lamp. Its light was dim." },
          { caption: "Now we have electric lights. With one switch, the room is bright." },
          { caption: "In the past, people traveled by horse and cart. It went slowly." },
          { caption: "Now we have cars that go much faster." },
          { caption: "In the past, clothes were washed by hand. Now a washing machine washes them." }
        ],
        question: "In the past, what did people light their homes with?",
        options: ["an oil lamp", "a light bulb"], answer: "an oil lamp" },
      { prompt: "Put them in order from the past to now", say: "First people walked, then they went by horse and cart, and now by car. Put them in order.",
        items: [{ say: "walking" }, { say: "by horse and cart" }, { say: "by car" }] },
      { prompt: "Then and now", say: "Match each old thing to the thing we use today.",
        pairs: [
          [{ say: "candle" }, { say: "light bulb" }],
          [{ say: "horse cart" }, { say: "car" }],
          [{ label: "washing by hand", say: "washing by hand" }, { label: "washing machine", say: "washing machine" }],
          [{ say: "letter" }, { say: "mobile phone" }]
        ] },
      { prompt: "How were clothes washed in the past?", say: "How were clothes washed in the past?",
        options: ["by hand", "with a washing machine"], answer: "by hand" },
      { text: "Ask a grandparent: what was it like then?",
        need: ["an older family member to talk to", "paper and a pencil"],
        steps: [
          "Ask a grandparent or an older person: “When you were a child, what did you light the house with? How did you travel? How did you wash clothes?”",
          "If you have an old object at home, like a lamp, a radio or an iron, look at it together.",
          "Your child draws an old object and the same object today side by side.",
          "Ask: “What do you think it will look like in the future?”"
        ],
        ask: "Which thing has changed most from the past to now?" }
    ] },

    // ---------------- Sapling ----------------
    "science-sapling-1": { title: "The water cycle", steps: [
      { prompt: "Where does rain come from?",
        scenes: [
          { caption: "The sun warms the water in the sea." },
          { caption: "The water turns into vapor and rises. We cannot see vapor." },
          { caption: "High in the sky it is cold. The vapor becomes tiny drops and makes a cloud." },
          { caption: "A cloud is made!" },
          { caption: "The wind carries the cloud towards the mountain." },
          { caption: "Rain falls from the cloud. On the high mountains, snow falls." },
          { caption: "The rain water gathers in a river and goes back to the sea." },
          { caption: "And the cycle starts again!" }
        ],
        question: "What is a cloud made of?",
        options: ["smoke", "tiny drops of water", "cotton"], answer: "tiny drops of water" },
      { prompt: "Put the water cycle in order",
        items: [{ label: "sea" }, { label: "vapor" }, { label: "cloud" }, { label: "rain" }] },
      { prompt: "Why does a wet shirt dry in the sun?",
        options: ["its water freezes", "its water turns into vapor and goes into the air", "its water hides in the shirt"],
        answer: "its water turns into vapor and goes into the air" },
      { prompt: "There are drops of water on a glass of cold doogh. Where did the water come from?",
        options: ["the doogh came out of the glass", "someone sprinkled water on the glass", "water vapor in the air turned into drops on the cold glass"],
        answer: "water vapor in the air turned into drops on the cold glass" },
      { text: "Make a tiny water cycle!",
        need: ["a big bowl", "a small glass", "plastic wrap", "warm tap water", "a piece of ice"],
        steps: [
          "Pour a little warm tap water into the bowl and put the empty glass in the middle of the bowl.",
          "Cover the bowl tightly with plastic wrap.",
          "Put a piece of ice on the plastic wrap, right above the glass.",
          "Put the bowl in the sun and look half an hour later: drops have gathered under the plastic wrap, and maybe a few drops have fallen into the glass."
        ],
        ask: "Which part was like the sea? Which was like a cloud? Which was like rain?" }
    ] },
    "science-sapling-2": { title: "Magnets", steps: [
      { prompt: "Guess first, then try it!",
        items: [{ say: "paper clip" }, { say: "pencil" }, { say: "iron screw" }, { say: "sock" }, { say: "safety pin" }, { say: "apple" }] },
      { prompt: "Does a magnet pull through paper?",
        cast: {},
        scenes: [
          { caption: "The paper clip is on the paper. The magnet is under the paper." },
          { caption: "We move the magnet under the paper…" },
          { caption: "and the paper clip follows it!" },
          { caption: "A magnet pulls iron things even through paper.", wait: { hint: "Now you move the magnet under the paper: move left and right!" } }
        ],
        question: "What does a magnet pull?",
        options: ["all heavy things", "iron things", "all shiny things"], answer: "iron things" },
      { prompt: "What does the magnet pull?",
        baskets: [{ label: "pulls" }, { label: "doesn't pull" }],
        items: [{ label: "iron screw" }, { label: "tin can" }, { label: "paper clip" }, { label: "leaf" }, { label: "doll" }, { label: "glass cup" }] },
      { text: "Take the fridge magnet and try it!",
        need: ["a big fridge magnet", "things from home: a paper clip, a pot lid, a spoon, a coin, an eraser, a bottle cap", "a piece of cardboard or a tray"],
        steps: [
          "Before each try, your child guesses: “Will the magnet pull this?”",
          "Bring the magnet close to each thing and sort the things into two groups.",
          "Put a paper clip on the cardboard and move the magnet under the cardboard.",
          "Do not use small magnets or magnetic balls; swallowing them is very dangerous. Keep magnets away from phones and bank cards."
        ],
        ask: "Did the magnet pull all the metal things? Which ones did it not pull?" }
    ] },
    "science-sapling-3": { title: "Light and shadow", steps: [
      { tasks: [
          { prompt: "Move the sun to make the tree's shadow very short." },
          { prompt: "Now make the shadow long and make it fall on the left of the tree." },
          { prompt: "Now make the long shadow fall on the right of the tree." }
        ],
        question: "When is the tree's shadow the shortest?",
        options: ["early morning", "noon", "afternoon"], answer: "noon" },
      { prompt: "The sun is on the right of the tree. Which way does the tree's shadow fall?",
        options: ["to the right", "to the left", "on top of the tree"], answer: "to the left" },
      { prompt: "What does light go through?",
        baskets: [{ label: "light goes through" }, { label: "light doesn't go through" }],
        items: [{ label: "window glass" }, { label: "clear water" }, { label: "clear plastic bag" }, { label: "wall" }, { label: "book" }, { label: "wooden board" }] },
      { text: "Measure your shadow in the morning and at noon!",
        need: ["chalk or a few small stones", "a long stick or pencil", "a flowerpot of soil, or some soil in the yard"],
        steps: [
          "On a sunny day, push the stick straight into the soil.",
          "In the morning, mark the tip of the stick's shadow with chalk or a stone.",
          "Mark it again at noon and in the afternoon.",
          "Your child stands still and you draw around their shadow with chalk. A few hours later, your child stands in the same place again. What happened to the shadow?",
          "Never look straight at the sun."
        ],
        ask: "When was the shadow the shortest? Why?" }
    ] },
    "science-sapling-4": { title: "Nature in Iran", steps: [
      { prompt: "A trip through Iran's nature",
        cast: { caspian: "🌊 Caspian Sea", forest: "🌲 northern forests", mount: "🏔️ Zagros", desert: "🏜️ desert", gulf: "🌊 Persian Gulf" },
        scenes: [
          { caption: "Iran is a big land with many kinds of nature." },
          { caption: "In the north, by the Caspian Sea, there are green forests with lots of rain." },
          { caption: "The Caspian red deer lives in the northern forests." },
          { caption: "The high Zagros mountains are full of snow in winter. The wild goat walks on the rocks." },
          { caption: "In the middle of Iran there is a desert: hot, dry and full of sand. The Iranian cheetah lives there." },
          { caption: "In the south is the Persian Gulf. Its water is warm and dolphins swim in it." }
        ],
        question: "Where does the Iranian cheetah live?",
        options: ["by the Caspian Sea", "in the desert", "in the Persian Gulf"], answer: "in the desert" },
      { prompt: "Match each animal with the place where it lives",
        pairs: [
          [{ label: "desert" }, { say: "camel" }],
          [{ label: "forest" }, { say: "red deer" }],
          [{ label: "mountain" }, { say: "wild goat" }],
          [{ label: "sea" }, { say: "dolphin" }]
        ] },
      { prompt: "Which city gets more rain?", options: ["Yazd", "Rasht", "Kerman"], answer: "Rasht" },
      { prompt: "Which city is warmer in winter?", options: ["Tabriz", "Hamadan", "Bandar Abbas"], answer: "Bandar Abbas" },
      { text: "What is the nature like in our city or village?",
        need: ["paper and crayons", "a map of Iran, if you have one"],
        steps: [
          "Ask your child: “Are there mountains around our city? A sea? A forest? A desert?”",
          "Find a plant or an animal from your area together and talk about it.",
          "If a relative lives in another city, ask them what the weather is like there and which trees grow there.",
          "Your child draws the nature of your area: sky, land, plants and animals."
        ],
        ask: "If you went to the desert one day, what would you take with you? Why?" }
    ] },
    "science-sapling-5": { title: "Push and pull", steps: [
      { prompt: "How do things move?",
        scenes: [
          { caption: "Omid pushes the cart. The cart moves away from him." },
          { caption: "The cart goes forward." },
          { caption: "Maryam pulls the sled. The sled follows her." },
          { caption: "Maryam and the sled go away." },
          { caption: "If we push the ball gently, it goes a little way." },
          { caption: "If we push it hard, it goes much farther!" }
        ],
        question: "What can we do to make the ball go farther?",
        options: ["push it more gently", "push it harder", "not touch it"], answer: "push it harder" },
      { prompt: "Push or pull?",
        baskets: [{ label: "push" }, { label: "pull" }],
        items: [{ label: "a cart" }, { label: "kicking a ball" }, { label: "ringing a doorbell" },
          { label: "a kite string" }, { label: "pulling a carrot out of the soil" }, { label: "zipping a bag" }] },
      { prompt: "We push a toy car with the same push each time. On which floor does it go the farthest?",
        options: ["on the carpet", "on the smooth tiles", "on the blanket"], answer: "on the smooth tiles" },
      { text: "On which floor does the toy car go the farthest?",
        need: ["a toy car or a small ball", "a big book or a board for a slide", "different places in the house: carpet, tiles, blanket"],
        steps: [
          "Put one end of the book on a few other books to make a little slide.",
          "Let the car go from the top of the slide: once on the tiles, once on the carpet and once on the blanket.",
          "Before each go, your child guesses where the car will go the farthest.",
          "Mark the place where the car stopped with a button, and measure the distance in hand spans."
        ],
        ask: "On which floor did it go the farthest? Why do you think so?" }
    ] },
    "science-sapling-6": { title: "Life cycles", steps: [
      { prompt: "Where do sunflower seeds come from?",
        scenes: [
          { caption: "This is a sunflower seed, like the ones you crack and eat." },
          { caption: "We plant the seed in the soil and water it. The seed sprouts." },
          { caption: "With sunlight and water, the sprout grows and gets leaves." },
          { caption: "In summer the big sunflower opens. A bee visits the flower." },
          { caption: "The middle of the flower fills with new seeds: hundreds of seeds!" },
          { caption: "The seeds fall to the ground and the life cycle starts again." }
        ],
        question: "How many new seeds does one sunflower make?",
        options: ["none", "only one", "lots and lots"], answer: "lots and lots" },
      { prompt: "Put the sunflower's life cycle in order",
        items: [{ label: "seed" }, { label: "sprout" }, { label: "plant" }, { label: "flower" }] },
      { prompt: "Frogs in the rice fields",
        scenes: [
          { caption: "In the rice fields of Gilan, a frog lays eggs in the water. The eggs look like little jelly bubbles." },
          { caption: "A tadpole comes out of each egg. It has a tail, no legs, and swims in the water like a fish." },
          { caption: "Little by little its legs grow and its tail gets shorter." },
          { caption: "Now it is a little frog. It comes out of the water and hops on land too." },
          { caption: "The frog grows up, and it lays eggs in the water too." }
        ],
        question: "Where does a tadpole with a tail live?",
        options: ["in the water", "in a tree", "under the ground"], answer: "in the water" },
      { prompt: "Put the frog's life cycle in order",
        items: [{ label: "eggs" }, { label: "tadpole with a tail" }, { label: "tadpole with legs" }, { label: "frog" }] },
      { prompt: "What did a butterfly look like at first?",
        scenes: [
          { caption: "A butterfly lays very tiny eggs on a leaf." },
          { caption: "A little caterpillar comes out of an egg. It eats leaf after leaf and grows big." },
          { caption: "Then it makes a cocoon around itself and stays still. Inside, the caterpillar slowly changes." },
          { caption: "One day the cocoon opens and a butterfly comes out!" },
          { caption: "The silkworm does the same. In Gilan, people make silk thread from silkworm cocoons." }
        ],
        question: "What does the caterpillar become inside the cocoon?",
        options: ["a butterfly", "a leaf", "a frog"], answer: "a butterfly" },
      { prompt: "Put the butterfly's life cycle in order",
        items: [{ label: "egg" }, { label: "caterpillar" }, { label: "cocoon" }, { label: "butterfly" }] },
      { prompt: "Put the hen's life cycle in order",
        items: [{ label: "egg" }, { label: "chick hatching" }, { label: "chick" }, { label: "hen" }] },
      { text: "Plant a bean in a jar and watch it grow!",
        need: ["a clear jam jar or glass", "paper towels or cotton", "a few beans", "water", "paper and a pencil"],
        steps: [
          "Wet the paper towel and press it against the inside of the jar.",
          "Put the beans between the paper towel and the glass, so you can see them from outside.",
          "Put the jar by the window and add a little water every day to keep the paper towel wet.",
          "Every few days your child draws the bean: first the root, then the stem, then the leaves.",
          "Look at family photos together too: babies, children, grown-ups, grandmas and grandpas. We have a life cycle too."
        ],
        ask: "What came first, the root or the leaves? If we plant the bean in soil and it grows big, what will it make in the end?" }
    ] },
    "science-sapling-7": { title: "Who eats what?", steps: [
      { prompt: "Who eats what in the Zagros mountains?",
        scenes: [
          { caption: "The sun shines on the Zagros mountains." },
          { caption: "Grass makes its own food from sunlight, water and air." },
          { caption: "The wild goat eats the grass." },
          { caption: "The Persian leopard hunts the wild goat." },
          { caption: "Grass, wild goat, leopard: we call this a food chain. Each one is food for the next." }
        ],
        question: "Where does grass get its food?",
        options: ["it eats other grass", "it makes its own food with sunlight", "the wild goat feeds it"], answer: "it makes its own food with sunlight" },
      { prompt: "Make the farm's food chain: first the food, then who eats it",
        items: [{ label: "wheat" }, { label: "mouse" }, { label: "snake" }, { label: "eagle" }] },
      { prompt: "Match each animal with its food",
        pairs: [
          [{ say: "Persian squirrel" }, { label: "acorns" }],
          [{ say: "honeybee" }, { label: "flower nectar" }],
          [{ say: "camel" }, { label: "camelthorn" }],
          [{ say: "owl" }, { label: "mouse" }]
        ] },
      { prompt: "The owl is the farmer's friend",
        scenes: [
          { caption: "In the wheat field, mice eat the wheat grains." },
          { caption: "At night the owl hunts mice. So there are never too many mice." },
          { caption: "If the owls leave the field, there will be lots and lots of mice…" },
          { caption: "…and little wheat will be left for the farmer." },
          { caption: "Every animal has its own place in the food chain. When they are all there, nature stays healthy." }
        ],
        question: "What happens if the owls leave the field?",
        options: ["there are lots and lots of mice", "there is more wheat", "nothing happens"], answer: "there are lots and lots of mice" },
      { prompt: "Make the Persian Gulf's food chain: first the food, then who eats it",
        items: [{ label: "seaweed" }, { label: "shrimp" }, { label: "fish" }, { label: "dolphin" }] },
      { text: "Where did today's food come from?",
        need: ["a few small pieces of paper", "crayons", "string or glue"],
        steps: [
          "After lunch, your child says what you ate: for example bread, yogurt, rice or herbs.",
          "For each food, ask: “Where did this come from?” Bread comes from wheat; yogurt comes from cow's milk, and the cow eats grass.",
          "Draw each link on a piece of paper and join the papers in a row with string or glue. The first link is always the sun.",
          "In the yard or the park, quietly watch birds and insects: What does a sparrow eat? What are the ants carrying? Do not touch them."
        ],
        ask: "Where is the sun in our food chain? What would happen if there were no sun?" }
    ] },
    "science-sapling-8": { title: "Where does sound come from?", steps: [
      { prompt: "Where does sound come from?",
        scenes: [
          { caption: "Sara is playing the tonbak drum. Listen!" },
          { caption: "When her hand hits the drum skin, the skin shakes very fast." },
          { caption: "This shaking makes sound." },
          { caption: "Sara plays gently: the skin shakes a little and the sound is soft." },
          { caption: "She plays hard: the skin shakes a lot and the sound is loud!" }
        ],
        question: "When the drum makes a sound, what does its skin do?",
        options: ["it shakes", "it gets warm", "it changes colour"], answer: "it shakes" },
      { prompt: "Put your hand on your throat",
        scenes: [
          { caption: "Arash gently puts his hand on his throat." },
          { caption: "Now he says “Aaaah”. His throat shakes under his hand!" },
          { caption: "He stops. The shaking stops too." },
          { caption: "You try it too: put your hand on your throat and sing." }
        ],
        question: "When we talk, which part of our body shakes?",
        options: ["the throat", "the knees", "the hair"], answer: "the throat" },
      { prompt: "How does sound get to our ears?",
        scenes: [
          { caption: "The school bell rings. The bell shakes." },
          { caption: "The shaking bell makes the air next to it shake." },
          { caption: "The air passes the shaking along, from hand to hand…" },
          { caption: "…until it reaches our ears. Now we hear the sound!" },
          { caption: "The farther away we are, the softer the sound is when it gets to us." }
        ],
        question: "How does the sound of the bell get to our ears?",
        options: ["through the air", "through light", "through electric wires"], answer: "through the air" },
      { prompt: "Can sound go through water and wood?",
        scenes: [
          { caption: "Dolphins in the Persian Gulf call each other with sounds under the water." },
          { caption: "Sound travels in water too. The other dolphin hears it and answers." },
          { caption: "Sound goes through wood too. Put your ear on a table and ask someone to knock gently on the other side." },
          { caption: "You can hear the knock-knock really well!" }
        ],
        question: "Does sound travel under water?",
        options: ["Yes, sound travels in water too", "No, there is no sound under water"], answer: "Yes, sound travels in water too" },
      { prompt: "High sounds and low sounds",
        scenes: [
          { caption: "This is a setar. When its strings shake, they make sound." },
          { caption: "The thin string shakes very fast and makes a high sound." },
          { caption: "The thick string shakes more slowly and makes a low sound." },
          { caption: "A sparrow's tweet is a high sound. A cow's moo is a low sound." }
        ],
        question: "What sound does the thin string make?",
        options: ["a high sound", "a low sound", "no sound"], answer: "a high sound" },
      { text: "See sound vibrations with your own eyes!",
        need: ["a bowl", "kitchen plastic wrap", "a few grains of rice or a little salt", "a pot and a wooden spoon", "a rubber band and an open plastic box"],
        steps: [
          "Cover the bowl tightly and smoothly with plastic wrap, and put a few grains of rice on the wrap.",
          "Hold the pot near the bowl and hit it hard with the wooden spoon. The rice jumps on the wrap!",
          "Hit it once gently and once hard. Before each go, your child guesses how much the rice will jump.",
          "Put the rubber band around the plastic box, pull it with a finger and let go. The band shakes and makes a sound. Then put it around the box more tightly: its sound gets higher."
        ],
        ask: "Why did the rice jump? What was different when you hit harder?" }
    ] },
    "science-sapling-9": { title: "Science time: change only one thing", steps: [
      { prompt: "A fair test",
        scenes: [
          { caption: "The question: which soaks up more water, a cloth towel or a paper towel?" },
          { caption: "To make the test fair, we keep everything the same: the glasses and their water, the size of the strips and the time. Only the towel's material is different." },
          { caption: "We put both in the water at the same time and counted to ten." },
          { caption: "We took the strips out. The glass the cloth towel was in lost more water: the cloth towel soaked up more!" }
        ],
        question: "In this test, what did we change?",
        options: ["only the towel's material", "the size of the glasses", "the amount of water"], answer: "only the towel's material" },
      { prompt: "Put a scientist's work in order", say: "First we ask, then we guess, then we keep everything the same except one thing, we test it and we write down the result.",
        items: [{ label: "question", say: "we ask a question" }, { label: "guess", say: "we guess" }, { label: "keep the same", say: "we keep everything the same except one thing" }, { label: "test", say: "we test it" }, { label: "result", say: "we write down the result" }] },
      { prompt: "Which test is fair?", say: "We want to see which ball bounces higher. Which test is fair?",
        options: ["Drop both balls from the same height", "Drop one from the table and one from the floor"], answer: "Drop both balls from the same height" },
      { prompt: "What if one of the strips was bigger?", say: "If the cloth strip was twice as big, would the test be fair?",
        options: ["No, because two things were different", "Yes, it doesn't matter"], answer: "No, because two things were different" },
      { text: "Do a fair test yourself!",
        need: ["two glasses of the same size", "water", "a piece of towel and a piece of paper towel of the same size", "scissors (only for a grown-up)"],
        steps: [
          "A grown-up cuts two pieces of the same size from a towel and a paper towel.",
          "Pour the same amount of water into each glass. Your child guesses which will soak up more.",
          "Put both pieces into the water together, count to ten and take them out together.",
          "See which glass has lost more water. Write down the result.",
          "Ask: “What did we keep the same? What did we change?”"
        ],
        ask: "If we had left one in the water longer, would the test be fair?" }
    ] },
    "science-sapling-10": { title: "Measure it: length and mass", steps: [
      { prompt: "How many centimeters long is this pencil?", say: "We put the pencil next to the ruler. Start from zero. How many centimeters long is the pencil?" },
      { prompt: "How many centimeters long is this leaf?", say: "How many centimeters long is this leaf?" },
      { prompt: "Make a strip 9 centimeters long.", say: "Make the strip long enough to be 9 centimeters. Then tap Done." },
      { prompt: "Which one is heavier? Tap the heavier pan.", unit: "g", left: [{ say: "apple" }], right: [{ say: "strawberry" }] },
      { prompt: "Put weights on the other pan until the balance is level.", unit: "g", left: [{ say: "pear" }], question: "How many grams is the pear?" },
      { prompt: "Why do we measure twice?", say: "Scientists usually measure twice. Why?",
        options: ["To be sure we measured correctly", "Because the first measurement is always wrong"], answer: "To be sure we measured correctly" },
      { text: "Measure things at home!",
        need: ["a ruler or a tape measure", "kitchen scales, if you have them", "paper and a pencil"],
        steps: [
          "Measure a pencil, a spoon, a book and your child's palm with the ruler. Remind them to start from the zero on the ruler.",
          "Measure each one twice: was it the same number both times?",
          "If you have kitchen scales, weigh an apple, an orange and a book. Guess first which one is heaviest.",
          "Write the numbers in a table."
        ],
        ask: "How many centimeters long was the longest thing you measured?" }
    ] },
    "science-sapling-11": { title: "Volume and temperature", steps: [
      { prompt: "How many milliliters of water are in the jug?", say: "Look at the top of the water. Which line is next to it? How many milliliters of water are there?" },
      { prompt: "Pour 250 milliliters of water into the jug.", say: "Raise the water until it reaches 250 milliliters. Then tap Done." },
      { prompt: "How many degrees does the thermometer show?", say: "Where is the top of the red line? How many degrees does the thermometer show?" },
      { prompt: "Set the thermometer to 35 degrees: a hot summer day.", say: "On a hot summer day the air is 35 degrees. Put the red line on 35." },
      { prompt: "Which is warmer?", say: "Which is warmer: air at 30 degrees or air at 5 degrees?",
        options: ["30 degrees", "5 degrees"], answer: "30 degrees" },
      { prompt: "At how many degrees does water freeze?", say: "At how many degrees does water freeze?",
        options: ["zero degrees", "50 degrees"], answer: "zero degrees" },
      { text: "Try the measuring jug and the thermometer at home!",
        need: ["a kitchen measuring jug or marked cup", "water", "a room thermometer or one outside the window, if you have one"],
        steps: [
          "Measure 200 milliliters of water with the jug and pour it into a glass. Is the glass full? How many glasses make one liter?",
          "Your child reads the number on the jug. Their eyes should be level with the water.",
          "If you have a thermometer, read the air temperature in the morning and at noon and write it down.",
          "Don't give a fever thermometer as a toy; if it is glass, only a grown-up uses it."
        ],
        ask: "Was the air warmer at noon or in the morning?" }
    ] },
    "science-sapling-12": { title: "Write down the result", steps: [
      { title: "How many spoonfuls of water did it soak up?", prompt: "Put each spoonful of water that was soaked up into its column.", say: "The towel soaked up five spoonfuls of water, the paper towel three, and the plastic none. Put each spoonful in its column.",
        rows: [{ label: "towel" }, { label: "paper towel" }, { label: "plastic" }],
        question: "Which one soaked up the most water?", options: [{ label: "towel" }, { label: "paper towel" }, { label: "plastic" }] },
      { title: "Bean height (cm)", say: "This graph shows the height of a bean plant over four weeks.",
        rows: [{ label: "week 1" }, { label: "week 2" }, { label: "week 3" }, { label: "week 4" }],
        question: "In week 3, how many centimeters tall was the bean?" },
      { title: "Bean height (cm)",
        rows: [{ label: "week 1" }, { label: "week 2" }, { label: "week 3" }, { label: "week 4" }],
        question: "What happened to the plant week by week?", options: ["It got taller", "It got shorter", "It stayed the same"], answer: "It got taller" },
      { prompt: "Why do we write down the result?", say: "Why do we write the result of an experiment in a table?",
        options: ["So we don't forget and can compare", "Because writing is pretty"], answer: "So we don't forget and can compare" },
      { text: "Write the result of an experiment in a table and draw a picture graph.",
        check: ["Does the table have two columns: what and how much?", "Did they write the numbers correctly?", "Did they draw as many shapes as each number?", "Did they say what the graph shows?"],
        note: "Use the towel experiment (the lesson “Change only one thing”) or another one. For example: how many spoonfuls of water did each towel soak up? Your child draws one drop for each spoonful." }
    ] },
    "science-sapling-41": { title: "Solid, liquid, gas", steps: [
      { prompt: "Three states of matter",
        scenes: [
          { caption: "A spoon is a solid. Wherever we put it, it keeps its own shape." },
          { caption: "Water is a liquid. In the glass it has the glass's shape. In the bowl it takes the bowl's shape." },
          { caption: "Air is a gas. A gas fills all of its container: however much we blow up the balloon, the air fills all of it." },
          { caption: "The smell of fresh bread is a gas too. It spreads through the whole room and reaches the other side." }
        ],
        question: "Which one fills all of its container?",
        options: ["a gas", "a solid", "a liquid"], answer: "a gas" },
      { prompt: "Solid, liquid or gas?", say: "Put each one in its basket: solid, liquid or gas.",
        baskets: [{ label: "solid" }, { label: "liquid" }, { label: "gas" }],
        items: [{ say: "stone" }, { say: "key" }, { say: "milk" }, { say: "honey" }, { say: "the air in a balloon" }, { say: "the smell of a flower" }] },
      { prompt: "What shape is a liquid?", say: "If we pour water into a bottle, what shape does it take?",
        options: ["the shape of the bottle", "it keeps its own shape"], answer: "the shape of the bottle" },
      { prompt: "How does the smell of food reach another room?", say: "Mother is cooking in the kitchen and the smell reaches your room. How?",
        options: ["Smell is a gas and spreads through the air", "Someone carries the smell"], answer: "Smell is a gas and spreads through the air" },
      { text: "How long does a smell take to reach you?",
        need: ["something that smells nice: orange peel, rose water or mint", "a clock, or someone to count"],
        steps: [
          "Your child stands on the other side of the room and closes their eyes.",
          "A grown-up on this side breaks the orange peel or opens the rose water and starts counting.",
          "Your child raises a hand as soon as they smell it. What number did you reach?",
          "Swap places. Ask: “How did the smell get from that side of the room to this side?”"
        ],
        ask: "Is a smell a solid, a liquid or a gas?" }
    ] },
    "science-sapling-42": { title: "What is each material like?", steps: [
      { prompt: "Guess first, then try it: we put each one on spilled water.",
        items: [{ say: "sponge" }, { say: "plastic bag" }, { say: "paper towel" }, { say: "metal spoon" }, { say: "cotton sock" }] },
      { prompt: "See-through or not?", say: "Which ones can you see through, and which ones not?",
        baskets: [{ label: "see-through" }, { label: "not see-through" }],
        items: [{ say: "window glass" }, { say: "an empty glass" }, { say: "glasses" }, { say: "book" }, { say: "a board" }, { say: "brick" }] },
      { prompt: "Bendy or hard?", say: "Which ones bend and which ones are hard?",
        baskets: [{ label: "bends" }, { label: "hard" }],
        items: [{ say: "paper" }, { say: "scarf" }, { say: "rope" }, { say: "stone" }, { say: "iron screw" }, { say: "brick" }] },
      { prompt: "What shall we make a towel from?", say: "A towel must soak up water well. What material shall we make it from?",
        options: [{ value: "cotton cloth" }, { value: "plastic" }], answer: "cotton cloth" },
      { prompt: "What are roofs made of?", say: "A roof must be hard and keep water out. What is it made of?",
        options: ["brick, cement or tiles", "paper"], answer: "brick, cement or tiles" },
      { text: "Test the materials at home!",
        need: ["small pieces of: sponge, cloth, paper, plastic, foil, a little wood", "a little water and a plate"],
        steps: [
          "Do four tests on each piece: is it hard or does it bend? Is it see-through or not? Does it soak up water? Does it stretch?",
          "Before each test your child guesses.",
          "Write the results in a table with ✓ and ✗.",
          "Ask: “Which is best for a shopping bag? For a roof? For a towel?”"
        ],
        ask: "Which material soaked up the most water?" }
    ] },
    "science-sapling-43": { title: "Does it come back or not?", steps: [
      { prompt: "Some changes come back",
        scenes: [
          { caption: "Ice melts in the warmth." },
          { caption: "If we put the water in the freezer, it turns back into ice. This change comes back!" },
          { caption: "We fried an egg in the pan. We can't make it a raw egg again." },
          { caption: "Cooked rice can't become raw rice again either. These changes don't come back." }
        ],
        question: "Which change comes back?",
        options: ["ice melting", "an egg being fried", "bread being baked"], answer: "ice melting" },
      { prompt: "Does it come back or not?", say: "Which changes can be undone and which can't?",
        baskets: [{ label: "comes back" }, { label: "doesn't come back" }],
        items: [{ say: "ice that melted" }, { say: "a candle that melted and went hard again" }, { say: "butter that went soft and hardened again in the fridge" }, { say: "dough that became bread" }, { say: "an egg that was cooked" }, { say: "rice that was cooked" }] },
      { prompt: "The chocolate melted in the sun. What happens in the fridge?", say: "The chocolate melted in the sun. If we put it in the fridge, what happens?",
        options: ["It goes hard again", "It never goes hard again"], answer: "It goes hard again" },
      { prompt: "The ice melted. Can it become ice again?", say: "The ice melted. If we put the water in the freezer, does it become ice again?",
        options: ["Yes, it becomes ice again", "No, never"], answer: "Yes, it becomes ice again" },
      { text: "Watch the changes in the kitchen!",
        need: ["an ice cube", "a piece of bread and a little dough, or flour and water", "a grown-up for anything with heat"],
        steps: [
          "Put an ice cube on a plate to melt. Then put the water in the freezer. Look tomorrow: did it come back?",
          "Mix a little flour and water into dough. Put it next to a piece of bread and compare.",
          "Ask: “Can we turn bread back into dough? Cooked rice back into raw rice?”",
          "Only a grown-up cooks and fries; your child watches from a distance."
        ],
        ask: "Which change can be undone?" }
    ] },
    "science-sapling-44": { title: "Pieces and back again", steps: [
      { prompt: "Build something new from small pieces",
        scenes: [
          { caption: "This little house is made of six blocks." },
          { caption: "We took it apart. The blocks didn't break." },
          { caption: "We built a bridge with the same blocks!" },
          { caption: "In Yazd and Kashan, old houses were built with mud bricks: the bricks are put one on top of another to make a wall." }
        ],
        question: "What did we build with the blocks from the house?",
        options: ["a bridge", "nothing, the blocks broke"], answer: "a bridge" },
      { prompt: "Something made of small pieces can be…", say: "Can something made of small pieces be taken apart and built into something new with the same pieces?",
        options: ["Yes, taken apart and built again", "No, never"], answer: "Yes, taken apart and built again" },
      { prompt: "What are the walls of old houses in Yazd made of?", say: "What are the walls of old houses in Yazd made of?",
        options: [{ value: "mud bricks" }, { value: "ice" }], answer: "mud bricks" },
      { prompt: "How can we put the puzzle together again?", say: "We took the puzzle apart. How can we put it together again?",
        options: [{ value: "Put the pieces back together" }, { value: "Throw it away" }], answer: "Put the pieces back together" },
      { text: "Build something, take it apart and build something new!",
        need: ["toy blocks, small boxes or cans", "if you have a yard: a little soil, water and an ice-cube tray"],
        steps: [
          "Build a house with the blocks. Count how many pieces it has.",
          "Take the house apart and build something else with the same pieces: a bridge, a car, a tower.",
          "If you have a yard: mix soil with a little water into mud, press it into the ice-cube tray and leave it in the sun for a few days until small bricks dry. Then build a little wall with them.",
          "Wash hands after playing with mud."
        ],
        ask: "What did you build with the same pieces?" }
    ] },
    "science-sapling-45": { title: "Materials game", steps: [
      { prompt: "Solid, liquid or gas?", say: "Put each one in its basket.",
        baskets: [{ label: "solid" }, { label: "liquid" }, { label: "gas" }],
        items: [{ say: "spoon" }, { say: "ice" }, { say: "fruit juice" }, { say: "rainwater" }, { say: "the air in a balloon" }, { say: "the smell of fresh bread" }] },
      { prompt: "The best material for each job", say: "Match each job to the best material for it.",
        pairs: [
          [{ label: "window", say: "window" }, { label: "glass", say: "glass" }],
          [{ label: "towel", say: "towel" }, { label: "cotton cloth", say: "cotton cloth" }],
          [{ label: "raincoat", say: "raincoat" }, { label: "plastic", say: "plastic" }],
          [{ label: "pot", say: "cooking pot" }, { label: "metal", say: "metal" }]
        ] },
      { prompt: "Does it come back or not?", say: "Which changes come back and which don't?",
        baskets: [{ label: "comes back" }, { label: "doesn't come back" }],
        items: [{ say: "water that froze" }, { say: "ice cream that melted and froze again in the freezer" }, { say: "a cooked egg" }, { say: "baked bread" }] },
      { prompt: "What each material is like", say: "Match each material to what it is like.",
        pairs: [
          [{ say: "sponge" }, { label: "soaks up water", say: "soaks up water" }],
          [{ say: "glass" }, { label: "is see-through", say: "is see-through" }],
          [{ say: "stone" }, { label: "is hard", say: "is hard" }]
        ] },
      { text: "Find the three states of matter at home!",
        need: ["the kitchen and a grown-up"],
        steps: [
          "In the kitchen, find a solid, a liquid and a gas (gas: the air in an empty bottle, or the smell of food).",
          "Look together at a change that comes back (ice) and one that doesn't (cooking).",
          "For three things at home ask: “Why is it made of this material?”"
        ],
        ask: "Where did you find a gas at home?" }
    ] },
    "science-sapling-29": { title: "The story of a seed", steps: [
      { prompt: "What is inside a seed?",
        scenes: [
          { caption: "This is a bean seed. It is hard and dry. What is inside it?" },
          { caption: "We left the bean in water overnight. It drank water and got bigger. Its skin went soft and we took it off." },
          { caption: "We opened the seed: there is a tiny plant inside, and two pieces of food for it to grow with." },
          { caption: "We tested three seeds: one on dry cotton wool, one on wet cotton wool in the cold fridge, one on wet cotton wool in a warm room." },
          { caption: "A few days later, only the seed that had water, warmth and air sprouted: a root went down and a shoot came up." }
        ],
        question: "What does a seed need to sprout?",
        options: ["water, warmth and air", "only darkness", "milk"], answer: "water, warmth and air" },
      { prompt: "Put the seed's story in order", say: "First the seed is dry, then it drinks water and swells, then it grows a root, and then a stem and leaves.",
        items: [{ label: "dry seed", say: "a dry seed" }, { label: "drank water", say: "the seed drank water and swelled" }, { label: "root and sprout", say: "a root and a sprout came out" }, { label: "plant", say: "a plant with leaves" }] },
      { prompt: "Where does the tiny plant inside the seed get food from first?", say: "Before it has leaves, where does the tiny plant inside the seed get its food?",
        options: ["from the food inside the seed", "from moonlight"], answer: "from the food inside the seed" },
      { prompt: "Why didn't the seed on dry cotton wool sprout?", say: "The seed on dry cotton wool didn't sprout. Why?",
        options: ["Because it had no water", "Because it had too much water"], answer: "Because it had no water" },
      { text: "Look inside a bean and test how seeds sprout!",
        need: ["a few beans", "a bowl of water", "three small jars or glasses", "cotton wool"],
        steps: [
          "Leave a bean in water overnight. In the morning peel off its skin and gently split it in half. Find the tiny plant inside with a magnifying glass.",
          "Put cotton wool in three jars and a bean against the glass of each. Leave one cotton wool dry and wet the other two.",
          "Put one wet jar in the fridge and the other two in the room. Before you start, guess which will sprout.",
          "Look every day and draw what you see. Keep the cotton wool wet."
        ],
        ask: "Which seed sprouted first? Why?" }
    ] },
    "science-sapling-30": { title: "Plant it and see", steps: [
      { prompt: "What does a plant need? A fair test",
        scenes: [
          { caption: "We have three bean pots that are the same: the same soil, the same size. We change only one thing in each." },
          { caption: "The first pot has light and water. The second pot has light but no water. The third pot has water but no light." },
          { caption: "Three weeks went by. Every week we measured the plants with a ruler and wrote it down." },
          { caption: "The plant with light and water grew tall and green. The plant without water wilted. The plant without light stayed yellow and thin." }
        ],
        question: "Which plant grew best?",
        options: ["the plant with light and water", "the plant without water", "the plant without light"], answer: "the plant with light and water" },
      { title: "Plant heights after three weeks (cm)", say: "This graph shows the height of three plants after three weeks.",
        rows: [{ label: "light and water" }, { label: "no water" }, { label: "no light" }],
        question: "How many centimeters tall was the plant without light?" },
      { title: "Plant heights after three weeks (cm)",
        rows: [{ label: "light and water" }, { label: "no water" }, { label: "no light" }],
        question: "How many centimeters taller was the plant with light and water than the plant without water?" },
      { prompt: "Why did we keep all three pots the same?", say: "Why did we use the same soil and the same size for all three pots?",
        options: ["So only one thing was different and the test was fair", "Because we had no other pots"], answer: "So only one thing was different and the test was fair" },
      { text: "Plant diary: measure your plant's height every week and write it down.",
        check: ["Did they measure with a ruler every week?", "Did they write the numbers in the table?", "Did they draw the plant?", "Did they say what the plant needed?"],
        note: "Plant three cups of beans or lentils and change only one thing: one with light and water, one without water, one in a dark box. Write the height every week and draw a bar chart at the end." }
    ] },
    "science-sapling-36": { title: "Bees and flowers", steps: [
      { prompt: "Who do plants need help from?",
        scenes: [
          { caption: "A bee lands on a flower to drink its nectar. The flower's yellow pollen sticks to its legs." },
          { caption: "The bee goes to another flower and leaves the pollen there." },
          { caption: "Now the flower can make fruit and seeds." },
          { caption: "Seeds travel too: the wind carries dandelion seeds, and a winged seed spins as it comes down." },
          { caption: "A burr sticks to a sheep's wool and goes somewhere else with it." }
        ],
        question: "What does a bee do for a flower?",
        options: ["It carries pollen from one flower to another", "It eats its leaves"], answer: "It carries pollen from one flower to another" },
      { prompt: "How does each seed travel?", say: "Match each seed to the way it travels.",
        pairs: [
          [{ label: "dandelion", say: "dandelion seed" }, { label: "by wind", say: "by wind" }],
          [{ label: "burr", say: "burr" }, { label: "on animal fur", say: "it sticks to animals' fur" }],
          [{ label: "coconut", say: "coconut" }, { label: "on water", say: "it floats on water" }],
          [{ label: "cherry stone", say: "sour cherry stone" }, { label: "a bird eats it and drops it somewhere else", say: "a bird eats the fruit and drops the seed somewhere else" }]
        ] },
      { prompt: "Who moves pollen around?", say: "Which animals move pollen between flowers?",
        pairs: [
          [{ say: "bee" }, { say: "flower" }],
          [{ say: "butterfly" }, { say: "sunflower" }],
          [{ say: "ladybird" }, { say: "daisy" }]
        ] },
      { prompt: "What would happen if there were no bees?", say: "If there were no bees, what would happen to many plants?",
        options: ["They would make less fruit and fewer seeds", "They would get bigger"], answer: "They would make less fruit and fewer seeds" },
      { text: "Design a paper seed that falls more slowly!",
        need: ["paper", "a paper clip", "scissors (only for a grown-up)"],
        steps: [
          "A grown-up cuts a strip of paper and splits one end into two. Fold the two flaps opposite ways and weight the bottom with the clip: a “winged seed”.",
          "Drop a scrunched-up ball of paper and the winged seed from the same height together. Which one comes down more slowly?",
          "Make the wings longer or shorter and try again. Which one goes farther?",
          "In the park, see which flowers the bees land on. Watch from a little way off."
        ],
        ask: "Which of your seed designs came down most slowly?" }
    ] },
    "science-sapling-13": { title: "Water, a precious material", steps: [
      { prompt: "What is water like?",
        scenes: [
          { caption: "We have three glasses of water. Let's see what dissolves in water and what doesn't." },
          { caption: "We stirred a spoonful of salt into the water. The salt disappeared: it dissolved in the water!" },
          { caption: "We stirred a spoonful of sand into the water. The sand didn't dissolve; it settled at the bottom of the glass." },
          { caption: "We poured in a little oil. The oil didn't dissolve either: it stayed on top of the water and made a yellow layer." }
        ],
        question: "Which one dissolved in the water?",
        options: ["salt", "sand", "oil"], answer: "salt" },
      { prompt: "Guess first, then try it: we put each one in water and stir.",
        items: [{ say: "salt" }, { say: "pebble" }, { say: "a sweet" }, { say: "sand" }, { say: "honey" }] },
      { prompt: "Does it dissolve in water or not?", say: "Which ones dissolve in water and which ones don't?",
        baskets: [{ label: "dissolves" }, { label: "doesn't dissolve" }],
        items: [{ say: "salt" }, { say: "sugar" }, { say: "sand" }, { say: "olive oil" }, { say: "rice" }] },
      { prompt: "Why is water a precious material?", say: "Why is water so precious to us?",
        options: ["All living things need it to stay alive", "Because it has a pretty color"], answer: "All living things need it to stay alive" },
      { text: "Do the dissolving experiment in the kitchen!",
        need: ["five glasses of water", "a spoonful of each: salt, sugar, sand or soil, oil, rice", "a spoon for stirring"],
        steps: [
          "Before each one, your child guesses: “Will it dissolve or not?”",
          "Put a spoonful of each in a glass and stir for a minute.",
          "Look: did it disappear? Settle at the bottom? Stay on top? Write the results in a table.",
          "Don't taste any of them, except water that has only salt or sugar in it."
        ],
        ask: "Where did the oil stay in the glass? Why?" }
    ] },
    "science-sapling-14": { title: "Which dissolves faster?", steps: [
      { prompt: "Guess, then see: we put a spoonful of sugar in each glass.", ask: "Will it dissolve fast or slowly?",
        yesLabel: "⚡ It dissolves fast", noLabel: "🐢 It dissolves slowly", yesSaw: "It dissolved fast", noSaw: "It dissolved slowly",
        items: [{ say: "sugar in warm water" }, { say: "sugar in ice-cold water" }, { say: "sugar in water, stirred" }, { say: "sugar in water, not stirred" }] },
      { prompt: "Put them in order from faster to slower", say: "In which glass does sugar dissolve faster? Put them in order from faster to slower.",
        items: [{ label: "warm and stirred", say: "warm water, stirred" }, { label: "normal and stirred", say: "normal water, stirred" }, { label: "cold, not stirred", say: "cold water, not stirred" }] },
      { prompt: "Which test is fair?", say: "We want to see what the water's warmth does. Which test is fair?",
        options: ["Both glasses get one spoonful of sugar and the same stirring; only the water's warmth is different", "Two spoonfuls of sugar in the warm glass and one in the cold glass"], answer: "Both glasses get one spoonful of sugar and the same stirring; only the water's warmth is different" },
      { prompt: "Sweet tea is ready sooner if…", say: "Does a sugar lump dissolve faster in hot tea or in cold tea?",
        options: ["hot tea", "cold tea"], answer: "hot tea" },
      { text: "A fair sugar test: warm water or cold water?",
        need: ["two clear glasses", "lukewarm water (not hot; a grown-up prepares it) and cold water", "sugar and a spoon", "a clock, or counting"],
        steps: [
          "Pour the same amount of water into each glass: one lukewarm, one cold.",
          "Put a spoonful of sugar in each and start stirring both together. Stir them both the same way.",
          "Count until the sugar in each glass disappears. Which was faster?",
          "Try once more without stirring.",
          "Ask: “What did we keep the same? What did we change?”"
        ],
        ask: "In which glass did the sugar dissolve faster?" }
    ] },
    "science-sapling-15": { title: "Where does our water come from?", steps: [
      { prompt: "Where does the water in our towns and villages come from?",
        scenes: [
          { caption: "Rivers come down from the mountains. Many towns get their water from a river." },
          { caption: "In a village, people take water from a well: the water is under the ground." },
          { caption: "In the desert, a qanat brings water from under the mountain to the village in a quiet tunnel." },
          { caption: "Behind a dam, river water collects and reaches homes through pipes." },
          { caption: "Most of Iran gets little rain. So we must use water with care." }
        ],
        question: "Where does a qanat bring water from?",
        options: ["from under the ground, inside the mountain", "from the sea", "from the clouds"], answer: "from under the ground, inside the mountain" },
      { prompt: "Put water's journey home in order", say: "First rain falls on the mountain, then the water becomes a river, collects behind a dam and reaches the home through a pipe. Put them in order.",
        items: [{ label: "rain", say: "rain on the mountain" }, { label: "river", say: "river" }, { label: "dam", say: "the lake behind the dam" }, { label: "home tap", say: "the tap at home" }] },
      { prompt: "Why must we use water with care in Iran?", say: "Why must we use water with care in Iran?",
        options: ["Because most of it gets little rain", "Because water never runs out"], answer: "Because most of it gets little rain" },
      { prompt: "Which one saves water?", say: "Which one doesn't waste water?",
        options: ["a short shower", "leaving the tap running"], answer: "a short shower" },
      { text: "Water diary: what did we use water for today?",
        need: ["paper and a pencil"],
        steps: [
          "Draw a table: drinking, washing hands, brushing teeth, dishes, bath, watering a plant.",
          "During the day, each time you use water, the child draws a drop in that column.",
          "In the evening, count: what was most of the water for?",
          "Ask a grown-up where your home's water comes from: a river, a well, a qanat or a dam? Together, find one way to use less water."
        ],
        ask: "Where could we use less water?" }
    ] },
    "science-sapling-16": { title: "Clean air, clean water", steps: [
      { prompt: "What makes air and water dirty?",
        scenes: [
          { caption: "Smoke from cars and factories makes the air dirty." },
          { caption: "Trees catch dust from the air and make the air cleaner." },
          { caption: "Rubbish thrown into a river makes the water dirty. We take it out and put it in a bin." },
          { caption: "We poured muddy water through a filter of pebbles, sand and cotton. The water that came out was clearer. But we don't drink this water!" }
        ],
        question: "Which one makes the air cleaner?",
        options: ["planting trees", "burning rubbish", "leaving the car running"], answer: "planting trees" },
      { prompt: "Keeps it clean or makes it dirty?", say: "Which ones keep the air or water clean, and which ones make it dirty?",
        baskets: [{ label: "keeps it clean" }, { label: "makes it dirty" }],
        items: [{ say: "planting a tree" }, { say: "cycling instead of driving" }, { say: "putting rubbish in the bin" }, { say: "leaving the car running" }, { say: "throwing a plastic bag in the river" }, { say: "factory smoke" }] },
      { prompt: "Can we drink filtered water?", say: "Can we drink the water that went through the pebbles and sand?",
        options: ["No, it may still have germs", "Yes, it's completely clean"], answer: "No, it may still have germs" },
      { prompt: "Why do we plant trees by the road?", say: "Why do we plant trees beside roads?",
        options: ["Because they catch dust from the air", "Because they make more car smoke"], answer: "Because they catch dust from the air" },
      { text: "Make a water filter and see what happens (just for looking)!",
        need: ["a plastic bottle, cut in half by a grown-up", "cotton wool, washed sand and pebbles", "a little muddy water (water and soil)", "a glass"],
        steps: [
          "A grown-up cuts the bottle in half. Put the top half upside down on the glass.",
          "Put in cotton wool, then sand, then pebbles.",
          "Slowly pour the muddy water on top and see what colour the water coming out is.",
          "Don't drink this water; give it to a plant. Then wash your hands."
        ],
        ask: "Was the water at the bottom clearer or muddier? Why?" }
    ] },
    "science-sapling-17": { title: "Water game", steps: [
      { prompt: "Put the water cycle in order", say: "Water warms up and rises, makes clouds, rain falls and goes back to rivers and the sea. Put them in order.",
        items: [{ label: "water warms", say: "the sun warms the water" }, { label: "cloud", say: "a cloud forms" }, { label: "rain", say: "rain falls" }, { label: "rivers and sea", say: "water goes back to rivers and the sea" }] },
      { prompt: "Does it dissolve or not?", say: "Which ones dissolve in water and which ones don't?",
        baskets: [{ label: "dissolves" }, { label: "doesn't dissolve" }],
        items: [{ say: "salt" }, { say: "sugar" }, { say: "sand" }, { say: "pebbles" }] },
      { prompt: "Where does water come from?", say: "Match each way water reaches us to its place.",
        pairs: [
          [{ label: "qanat", say: "qanat" }, { label: "water under a mountain, in a tunnel", say: "water under a mountain, in a tunnel" }],
          [{ label: "well", say: "well" }, { label: "water under a village", say: "water under a village" }],
          [{ label: "dam", say: "dam" }, { label: "a lake and pipes", say: "the lake behind a dam, and pipes" }]
        ] },
      { prompt: "Keeps water clean or makes it dirty?", say: "Which ones keep water clean and which ones make it dirty?",
        baskets: [{ label: "clean" }, { label: "dirty" }],
        items: [{ say: "putting rubbish in the bin" }, { say: "turning off the tap" }, { say: "throwing a bag in the river" }, { say: "pouring oil into the gutter" }] },
      { text: "Follow the water in your neighbourhood!",
        need: ["a short walk around the neighbourhood"],
        steps: [
          "In the street, find a water channel, a tap, a cooler or a drainpipe: where does the water come from and where does it go?",
          "See whether the channel is clean or has rubbish. If the child sees rubbish, they tell a grown-up; they don't touch it with their hands.",
          "At home, choose one way to use less water together and do it for a week."
        ],
        ask: "Where does the water in your street's channel go?" }
    ] },
    "science-sapling-18": { title: "Poles and the compass", steps: [
      { prompt: "How are a magnet's two ends different?",
        scenes: [
          { caption: "Every magnet has two ends: a north pole (red) and a south pole (blue). North and south pull each other." },
          { caption: "We turned one round. Now two north poles face each other: they push each other away!" },
          { caption: "We stroked a paper clip with the magnet a few times, always in one direction. The clip became a little magnet too." },
          { caption: "We put the clip on a leaf in a bowl of water. The leaf turned and stopped: the clip's end pointed north!" },
          { caption: "A compass has a little magnet too. Whichever way we turn it, the needle's red end keeps pointing north." },
          { caption: "Grandma's pin got lost in the rug. We moved the magnet slowly over the rug: the pin jumped up and stuck to it!" }
        ],
        question: "What happens when two north poles come close?",
        options: ["They push each other away", "They pull each other", "Nothing happens"], answer: "They push each other away" },
      { prompt: "Pull or push?", say: "Red is the north pole and blue is the south pole. Do these two ends pull or push each other?",
        baskets: [{ label: "pull" }, { label: "push" }],
        items: [{ say: "north pole next to south pole" }, { say: "south pole next to north pole" }, { say: "two north poles" }, { say: "two south poles" }] },
      { prompt: "Which way does the red end of a compass needle point?", say: "Which way does the red end of a compass needle always point?",
        options: ["north", "south"], answer: "north" },
      { prompt: "A pin is lost in the rug. What should we do?", say: "A pin is lost in the rug. What's the best way to find it?",
        options: ["Move a magnet slowly over the rug", "Walk on the rug barefoot"], answer: "Move a magnet slowly over the rug" },
      { text: "Make a compass with a paper clip and a leaf!",
        need: ["a bar or horseshoe magnet", "a paper clip", "a leaf or a plastic bottle cap", "a bowl of water"],
        steps: [
          "A grown-up straightens the paper clip.",
          "Stroke the clip 20 times with one end of the magnet, always from one end to the other.",
          "Float the leaf on the water and gently put the clip on it.",
          "Wait until the leaf stops. Check with a grown-up's phone compass: does one end of the clip point north?",
          "Turn the leaf a little and let go. Does it turn back the same way?"
        ],
        ask: "Which way did the clip point?" }
    ] },
    "science-sapling-19": { title: "How do we see?", steps: [
      { prompt: "How do our eyes see things?",
        scenes: [
          { caption: "The sun, a lamp and a firefly have their own light. We call them “light sources”." },
          { caption: "The moon has no light of its own. Sunlight hits the moon and from there reaches our eyes." },
          { caption: "In the room, the lamp's light hits the apple and goes from the apple to our eyes. That's how we see the apple." },
          { caption: "We turned off the lamp. No light hits the apple or reaches our eyes, so we can't see the apple." }
        ],
        question: "Which one has no light of its own?",
        options: ["the moon", "the sun", "a firefly"], answer: "the moon" },
      { prompt: "Its own light or not?", say: "Which ones give their own light, and which ones only send light back?",
        baskets: [{ label: "has its own light" }, { label: "no light of its own" }],
        items: [{ say: "the sun" }, { say: "a lit candle" }, { say: "a torch, switched on" }, { say: "the moon" }, { say: "a mirror" }, { say: "an apple" }] },
      { prompt: "How do we see the apple?", say: "How do we see the apple?",
        options: ["Light hits the apple and goes from the apple to our eyes", "Light comes out of our eyes"], answer: "Light hits the apple and goes from the apple to our eyes" },
      { prompt: "What do we see in a completely dark room?", say: "In a room with no light at all, what do we see?",
        options: ["nothing", "only white things"], answer: "nothing" },
      { text: "Dark box: what do we see without light?",
        need: ["a shoebox with a lid", "a small toy", "a torch"],
        steps: [
          "A grown-up makes a small peephole at one end of the box.",
          "Put the toy in the box and close the lid. Look through the hole: what do you see?",
          "Now open the lid a little, or shine the torch in from a corner of the lid. Look again.",
          "Say together: light went from the torch to the toy, and then to our eyes."
        ],
        ask: "When did you see the toy? Why?" }
    ] },
    "science-sapling-20": { title: "The Earth spins", steps: [
      { prompt: "Why do day and night happen?",
        scenes: [
          { caption: "The sun lights only one side of the Earth. That side has day, and this side has night." },
          { caption: "The Earth spins around itself like a top. Our house slowly comes round into the light: it's morning." },
          { caption: "The Earth keeps spinning and our house goes into the dark: it's night. Each full turn of the Earth is one day and one night." },
          { caption: "From the ground it looks as if the sun walks across the sky; but the sun stays where it is, and it's we who turn with the Earth." }
        ],
        question: "Why do day and night happen?",
        options: ["Because the Earth spins around itself", "Because the sun switches off at night", "Because clouds cover the sun"], answer: "Because the Earth spins around itself" },
      { prompt: "When our house faces the sun, what time is it?", say: "When our house faces the sun, is it day or night?",
        options: ["day", "night"], answer: "day" },
      { prompt: "When it's night here, what's happening on the other side of the Earth?", say: "When it's night here, is it day or night on the other side of the Earth?",
        options: ["It's day and children are awake", "It's night there too"], answer: "It's day and children are awake" },
      { prompt: "Does the sun really walk across the sky?", say: "Does the sun really walk across the sky, or do we turn with the Earth?",
        options: ["No, we turn with the Earth", "Yes, the sun goes round our house"], answer: "No, we turn with the Earth" },
      { text: "Make day and night with a torch and an orange!",
        need: ["a torch", "an orange or a ball", "a small sticker or a broken toothpick (our house)"],
        steps: [
          "Stick the sticker on the orange: this is our house.",
          "Make the room dark. Someone holds the torch on and shines it at the orange: this is the sun.",
          "Slowly turn the orange around. When is our house in the light? When is it in the dark?",
          "Say “Morning!” when the house reaches the light, and “Night!” when it goes into the dark."
        ],
        ask: "Did the torch move, or did the orange turn?" }
    ] },
    "science-sapling-21": { title: "The sundial", steps: [
      { prompt: "Move the sun across the sky and watch the flagpole's shadow.",
        tasks: [
          { prompt: "It's morning: bring the sun low in the east (on the right). The long shadow falls to the left." },
          { prompt: "Now make it noon: make the shadow the shortest it can be." },
          { prompt: "Now make it evening: make a long shadow fall to the right." }
        ],
        question: "If the stick's shadow is very short, what time of day is it?",
        options: ["noon", "early morning", "late evening"], answer: "noon" },
      { prompt: "Let's make a clock with a stick's shadow",
        scenes: [
          { caption: "We pushed a stick into the soil of the yard. At 9 in the morning the sun is in the east and the stick's shadow is long. We put a stone at the tip of the shadow." },
          { caption: "At noon the sun is in the south, high in the sky. The shadow is at its shortest. We put down a second stone." },
          { caption: "At 3 in the afternoon the sun has gone west and the shadow is long again, this time on the other side. We put down a third stone." },
          { caption: "The next day at 9 in the morning, the shadow fell on the first stone again! Now the stick's shadow tells us the time." }
        ],
        question: "What is the stick's shadow like at noon?",
        options: ["the shortest", "the longest", "it has no shadow at all"], answer: "the shortest" },
      { prompt: "Put the shadows in order from morning to evening", say: "In the morning the shadow is long, at noon short, in the evening long again. Put them in order from morning to evening.",
        items: [{ label: "morning: long shadow", say: "morning, long shadow" }, { label: "noon: short shadow", say: "noon, short shadow" }, { label: "evening: long shadow", say: "evening, long shadow" }] },
      { prompt: "Does a sundial work on a cloudy day?", say: "On a very cloudy day, does a sundial work?",
        options: ["No, because no clear shadow falls", "Yes, better than ever"], answer: "No, because no clear shadow falls" },
      { text: "Make a sundial!",
        need: ["a straight stick, or a pencil in a pot of soil", "a few small stones or pieces of paper", "a sunny day", "a clock at home"],
        steps: [
          "Push the stick straight into the soil somewhere that gets sun all day.",
          "At 9 in the morning, put a stone at the tip of the stick's shadow. With a grown-up, write the time on a paper next to the stone.",
          "Do the same at 12 and at 3.",
          "The next day, look at the same times: which stone does the shadow fall on?",
          "Never look straight at the sun; only look at the shadow."
        ],
        ask: "When was the shadow shortest?" }
    ] },
    "science-sapling-22": { title: "Light and shadow game", steps: [
      { prompt: "Its own light or not?", say: "Which ones are light sources that give their own light? Which ones have no light?",
        baskets: [{ label: "light source" }, { label: "no light of its own" }],
        items: [{ say: "the sun" }, { say: "a lamp that is on" }, { say: "a lit candle" }, { say: "the moon" }, { say: "a teddy bear" }, { say: "a mirror" }] },
      { prompt: "Does light go through it?", say: "Which ones does light go right through, which ones a little, and which ones not at all?",
        baskets: [{ label: "goes right through" }, { label: "goes through a little" }, { label: "doesn't go through" }],
        items: [{ say: "window glass" }, { say: "a glass of clear water" }, { say: "thin paper" }, { say: "a tissue" }, { say: "a wooden board" }, { say: "a book" }] },
      { prompt: "Put the sun in order from morning to evening", say: "In the morning the sun is in the east, at noon high in the sky, in the evening in the west. Put them in order.",
        items: [{ label: "morning, east", say: "morning, the sun in the east" }, { label: "noon, high", say: "noon, the sun high in the sky" }, { label: "evening, west", say: "evening, the sun in the west" }] },
      { prompt: "When is each shadow?", say: "Match each time of day to its shadow.",
        pairs: [
          [{ say: "noon" }, { label: "a short shadow", say: "a short shadow" }],
          [{ say: "morning" }, { label: "a long shadow to the west", say: "a long shadow to the west" }],
          [{ say: "evening" }, { label: "a long shadow to the east", say: "a long shadow to the east" }]
        ] },
      { text: "A hand shadow show!",
        need: ["a torch", "a light-coloured wall", "your hands"],
        steps: [
          "Make the room a little dark. Someone shines the torch at the wall.",
          "Hold your hands between the torch and the wall and make a bird, a dog or a rabbit.",
          "Move your hand close to the torch, then far away: what happens to the shadow?",
          "Hold a thin paper in front of the torch: does light still reach the wall?"
        ],
        ask: "When did the shadow get bigger?" }
    ] },
    "science-sapling-23": { title: "Mountains, valleys, rivers, deserts", steps: [
      { prompt: "What shapes does Iran's land have?",
        scenes: [
          { caption: "Iran has mountains, valleys, plains, rivers, lakes and deserts." },
          { caption: "Damavand is Iran's highest mountain. There is snow and ice on its top: water as a solid." },
          { caption: "The Zagros mountains have deep valleys. Snow melts and the Karun river sets off down the valley: water as a liquid." },
          { caption: "A plain is flat and wide, and farmers grow wheat on it. Lake Urmia has salty water, white with salt all around." },
          { caption: "The Lut desert is very dry and hot. There is lots of sand, and the wind has carved tall hills of earth called “kaluts”." }
        ],
        question: "Where is water a solid?",
        options: ["the snow on Damavand's top", "the water of the Karun", "the water of Lake Urmia"], answer: "the snow on Damavand's top" },
      { prompt: "Match each place to its name", say: "Match each landform to a place in Iran.",
        pairs: [
          [{ say: "a high mountain" }, { label: "Damavand", say: "Damavand" }],
          [{ say: "a river" }, { label: "Karun", say: "Karun" }],
          [{ say: "a lake" }, { label: "Urmia", say: "Lake Urmia" }],
          [{ say: "a desert" }, { label: "Lut", say: "the Lut desert" }]
        ] },
      { prompt: "Is the water solid or liquid?", say: "In which ones is water solid, and in which liquid?",
        baskets: [{ label: "solid" }, { label: "liquid" }],
        items: [{ say: "snow on a mountain top" }, { say: "ice on a river in winter" }, { say: "river water" }, { say: "lake water" }, { say: "rain" }] },
      { prompt: "Where is there the least water?", say: "Which place has the least water?",
        options: ["the Lut desert", "Lake Urmia", "the Karun river"], answer: "the Lut desert" },
      { text: "Make a snowy mountain and see how a river starts!",
        need: ["a tray", "damp soil or sand", "a few ice cubes"],
        steps: [
          "Build a mountain of damp soil on the tray and draw a valley down it with your finger.",
          "Put a few ice cubes on the top: this is the mountain's snow.",
          "Wait and watch: the ice melts. Which way does the water go down?",
          "Make a hollow at the foot of the mountain so the water collects and becomes a lake. Then wash your hands."
        ],
        ask: "Did the water go down the valley or over the mountain?" }
    ] },
    "science-sapling-24": { title: "Water and wind change the land", steps: [
      { prompt: "How does the land change its shape?",
        scenes: [
          { caption: "Every day a river carries away a little soil and stone. Over thousands of years, a deep valley forms." },
          { caption: "In the Lut desert, the wind brings sand and slowly wears the earth away. The wind made these kaluts." },
          { caption: "But a flood comes fast! After very heavy rain, muddy water bursts out of the river in a few hours." },
          { caption: "Tree roots hold the soil. On the bare hill, the rain washes the soil away and carries it off." }
        ],
        question: "Which change happens very fast?",
        options: ["a flood", "a valley getting deeper", "kaluts forming"], answer: "a flood" },
      { prompt: "Slow or fast?", say: "Which changes take thousands of years, and which happen fast?",
        baskets: [{ label: "very slow" }, { label: "very fast" }],
        items: [{ say: "a river deepens a valley" }, { say: "wind makes kaluts" }, { say: "mountain rock slowly breaks up" }, { say: "a flood" }, { say: "a rockfall after an earthquake" }] },
      { prompt: "On which hill is less soil washed away?", say: "Heavy rain is falling. On which hill is less soil washed away?",
        options: ["the hill with trees", "the bare hill"], answer: "the hill with trees" },
      { prompt: "What should we do so floods don't carry the soil away?", say: "What's a good thing to do so rain and floods don't carry away a mountain's soil?",
        options: ["plant trees", "cut down the trees"], answer: "plant trees" },
      { text: "Do roots hold the soil? Try it!",
        need: ["two trays or two plastic container lids", "soil", "a little grass or weeds with their roots and soil (from the garden, with permission)", "a glass of water"],
        steps: [
          "Put only soil on one tray and the rooted grass with its soil on the other.",
          "Tilt both trays a little, like a hill. Put a dish under them.",
          "Slowly pour water over both from the top, like rain.",
          "See which water coming down is muddier. Then wash your hands."
        ],
        ask: "Which tray lost more soil? Why?" }
    ] },
    "science-sapling-57": { title: "When a habitat changes", steps: [
      { prompt: "What happens if animals' home changes?",
        scenes: [
          { caption: "Lake Urmia has salty water. Very tiny shrimp called “artemia” live in it, and flamingos eat them." },
          { caption: "For a few years little rain fell, and the rivers' water was taken for farming. The lake got smaller, and white salt was left where the water had been." },
          { caption: "Flamingos can fly away to another lake. But the tiny artemia can't leave, and there were fewer of them." },
          { caption: "People help: they waste less water so more water reaches the lake. The lake filled up a little and the flamingos came back." }
        ],
        question: "When the lake got smaller, why were there fewer artemia?",
        options: ["Because they couldn't go anywhere else", "Because they flew away", "Because the water became fresh"], answer: "Because they couldn't go anywhere else" },
      { prompt: "Which animal can change its habitat?", say: "If its home is spoiled, which animal can more easily move somewhere else?",
        options: ["the flamingo, because it flies", "the artemia, because it's very small"], answer: "the flamingo, because it flies" },
      { prompt: "If a forest is cut down, who is harmed most?", say: "If a forest's trees are cut down, which is harmed most?",
        options: ["the trees and plants, because they can't walk away", "the birds, because they fly"], answer: "the trees and plants, because they can't walk away" },
      { prompt: "How can we help?", say: "What can we do so more water reaches lakes and rivers?",
        options: ["not waste water", "leave the tap running"], answer: "not waste water" },
      { text: "When water dries up, what is left?",
        need: ["a deep plate", "warm water (a grown-up prepares it)", "two spoonfuls of salt", "a spoon"],
        steps: [
          "Put the salt in the warm water and stir until it dissolves. This salty water is like Lake Urmia.",
          "Pour the water onto the plate and put it somewhere sunny.",
          "Look every day: is there less water? What appears at the edge of the plate?",
          "When the water is gone, look at the white salt. Think: where could an animal that lived in this water go?"
        ],
        ask: "When the water went, what was left on the plate?" }
    ] },
    "science-sapling-25": { title: "Forces everywhere", steps: [
      { prompt: "What can a push or a pull do?",
        scenes: [
          { caption: "Forces start things moving and stop them: Omid kicked the ball and it started rolling. Maryam stopped it with her foot." },
          { caption: "A force can change direction too: Maryam kicked the ball the other way and it came back." },
          { caption: "A force can change a thing's shape too. We pressed the dough gently and it got a little flatter. We pressed hard, and it got very flat!" },
          { caption: "Tug-of-war! The two sides are equally strong: both sides pull, but the rope doesn't move." },
          { caption: "Someone else joined the left side. Now that side is stronger, and the rope and everyone move to the left." }
        ],
        question: "In tug-of-war, when does the rope not move?",
        options: ["when the two sides are equally strong", "when one side is stronger", "when nobody pulls"], answer: "when the two sides are equally strong" },
      { prompt: "What did the force do?", say: "In each one, did the force get something moving, or change its shape?",
        baskets: [{ label: "moved it or changed its direction" }, { label: "changed its shape" }],
        items: [{ say: "kicking a ball" }, { say: "pushing a trolley" }, { say: "hitting a ball back with a bat" }, { say: "crushing an empty can" }, { say: "squeezing a balloon" }, { say: "rolling out bread dough" }] },
      { prompt: "Which push sends the ball farther?", say: "Which push sends the ball farther: a gentle one or a hard one?",
        options: ["a hard push", "a gentle push"], answer: "a hard push" },
      { prompt: "Three children pull against two. Which way does the rope go?", say: "Three children of the same size play tug-of-war against two. Which way does the rope go?",
        options: ["towards the three", "towards the two", "neither way"], answer: "towards the three" },
      { text: "Try forces with dough and a sock ball!",
        need: ["some play dough or bread dough", "a soft ball or a rolled-up sock"],
        steps: [
          "Roll the dough into a ball. Press it once gently and once hard: which one got flatter?",
          "Push the soft ball gently along the floor, then a little harder. Which went farther?",
          "When the ball comes towards you, stop it with your hand: the force of your hand stopped it.",
          "Push the ball that is coming the other way: its direction changed!"
        ],
        ask: "What did the force do to the dough? And to the ball?" }
    ] },
    "science-sapling-26": { title: "Forces without touching", steps: [
      { prompt: "Do forces work without touching?",
        scenes: [
          { caption: "The apple fell from the tree. Nobody pushed it: the Earth pulls everything towards itself." },
          { caption: "Omid threw the ball up. It went up a little, and then the Earth pulled it back down." },
          { caption: "We tied a paper clip to the table with a thread and held a magnet above it: the magnet pulled the clip up from a distance, without touching it!" },
          { caption: "Maryam rubbed the balloon on her hair. Now the balloon pulls the bits of paper towards itself from a distance!" }
        ],
        question: "Why did the apple fall from the tree?",
        options: ["Because the Earth pulls it towards itself", "Because the wind pushed it", "Because the apple got tired"], answer: "Because the Earth pulls it towards itself" },
      { prompt: "Touching or not touching?", say: "Which forces work by touching, and which work without touching?",
        baskets: [{ label: "touching" }, { label: "without touching" }],
        items: [{ say: "pushing a trolley" }, { say: "kicking a ball" }, { say: "an apple falling" }, { say: "a magnet pulls a clip from a distance" }, { say: "a rubbed balloon pulls paper" }] },
      { prompt: "If we throw a ball up, what happens?", say: "If we throw a ball up, what happens?",
        options: ["it comes back down", "it stays up for ever"], answer: "it comes back down" },
      { prompt: "Does a magnet pull a clip through paper too?", say: "If there's a sheet of paper between the magnet and the clip, does the magnet still pull the clip?",
        options: ["Yes, it pulls through paper too", "No, not at all"], answer: "Yes, it pulls through paper too" },
      { text: "The magic balloon!",
        need: ["a blown-up balloon", "some very small bits of paper", "dry hair"],
        steps: [
          "Scatter the bits of paper on the table.",
          "Rub the balloon on dry hair a few times.",
          "Hold the balloon gently above the paper; don't touch it. What happens?",
          "Hold the balloon near your own hair: does your hair rise towards it?",
          "Drop a ball or a pencil too: does it always fall down?"
        ],
        ask: "What did the balloon pull without touching?" }
    ] },
    "science-sapling-27": { title: "The seesaw and the lever", steps: [
      { prompt: "When does a seesaw stay level?",
        scenes: [
          { caption: "Omid and Maryam weigh the same, and each sits on one end of the seesaw. The seesaw rocks and comes to rest level." },
          { caption: "Dad took Omid's place. Dad is heavier, so his side went down and Maryam went up." },
          { caption: "Dad sat near the middle. The seesaw was level again! A heavy thing near the middle balances a light thing far from the middle." },
          { caption: "The tin's lid was tight. A grown-up put the tip of a spoon under the lid and pushed its long handle down: the lid opened easily! We call this a “lever”." }
        ],
        question: "Where should Dad sit to balance Maryam?",
        options: ["near the middle of the seesaw", "right at the end of the seesaw", "on the ground"], answer: "near the middle of the seesaw" },
      { prompt: "Where should Maryam sit?", say: "Dad is sitting near the middle. Put Maryam on one of the seats so the seesaw is level.",
        left: [{ say: "Dad" }], tray: [{ say: "Maryam" }] },
      { prompt: "Make the seesaw level", say: "The heavy basket is far from the middle. Put the stone and the teddy bear where the seesaw will be level.",
        left: [{ say: "basket" }], tray: [{ say: "stone" }, { say: "teddy bear" }] },
      { prompt: "Which spoon opens the tin more easily?", say: "To open a tight tin lid, which spoon makes the job easier?",
        options: ["a spoon with a long handle", "a spoon with a very short handle"], answer: "a spoon with a long handle" },
      { text: "Make a little seesaw!",
        need: ["a ruler", "a six-sided pencil", "a few coins or erasers"],
        steps: [
          "Put the pencil on the table and lay the ruler across it at its middle.",
          "Put a coin at each end: does the ruler stay level?",
          "Now stack two coins on one side. Where should the single coin on the other side go so it's level?",
          "Move the coins around and see: heavy near the middle, light far from the middle."
        ],
        ask: "Where did you put the two coins to balance one coin?" }
    ] },
    "science-sapling-28": { title: "Forces game", steps: [
      { prompt: "Push or pull?", say: "In which ones do we push something, and in which do we pull?",
        baskets: [{ label: "pushing" }, { label: "pulling" }],
        items: [{ say: "pushing a trolley" }, { say: "shutting a door with your hand" }, { say: "kicking a ball" }, { say: "pulling a kite's string" }, { say: "pulling out a drawer" }, { say: "pulling a sled" }] },
      { prompt: "Touching or not touching?", say: "Which forces work by touching, and which work from a distance?",
        baskets: [{ label: "touching" }, { label: "without touching" }],
        items: [{ say: "sweeping with a broom" }, { say: "tug-of-war" }, { say: "a leaf falling to the ground" }, { say: "a magnet and a clip" }, { say: "a rubbed balloon and hair" }] },
      { prompt: "What happens?", say: "Match each action to what happens.",
        pairs: [
          [{ label: "two equal sides", say: "tug-of-war, two equally strong sides" }, { label: "the rope stays still", say: "the rope doesn't move" }],
          [{ label: "one side stronger", say: "tug-of-war, one side stronger" }, { label: "the rope moves to them", say: "the rope moves towards the stronger side" }],
          [{ label: "heavy near the middle", say: "heavy near the middle of the seesaw" }, { label: "the seesaw is level", say: "the seesaw is level" }],
          [{ label: "a hard push", say: "a hard push on a ball" }, { label: "the ball goes far", say: "the ball goes far" }]
        ] },
      { prompt: "Make the seesaw level", say: "A heavy box is on one side. Where should the boxes go on the other side so it's level?",
        left: [{ say: "heavy box" }], tray: [{ say: "light box" }, { say: "light box" }] },
      { text: "Car race: which push sends it farther?",
        need: ["a toy car or an empty matchbox", "a strip of tape for the start line", "a few bits of paper as markers"],
        steps: [
          "Stick a start line on the floor.",
          "Push the car gently and mark where it stops with a bit of paper.",
          "Now push a little harder and mark it again.",
          "Put a book in its way: the book stopped the car!"
        ],
        ask: "Which push sent the car farther?" }
    ] },
    "science-sapling-31": { title: "Where do traits come from?", steps: [
      { prompt: "Why do children look like their parents but not exactly the same?",
        scenes: [
          { caption: "These kittens' mother is orange and their father is grey. The kittens got their colour and shape from their parents." },
          { caption: "But no two kittens are exactly the same: one is orange, one grey, one cream. We are different from our brothers and sisters too." },
          { caption: "Where we live changes us too. We planted two of the same seeds: one in the sun grew short, bushy and green; one in the shade grew tall, thin and pale." },
          { caption: "Sometimes differences help living things survive. The goat ate the twigs of the bush with few thorns, but didn't go near the bush with long thorns." }
        ],
        question: "Where did the kittens' colour come from?",
        options: ["from their parents", "from the food they ate", "from where they sleep"], answer: "from their parents" },
      { prompt: "Match each young one to its parent", say: "Young ones look like their parents. Match each young one to its parent.",
        pairs: [
          [{ say: "chick" }, { say: "hen" }],
          [{ say: "little frog" }, { say: "big frog" }],
          [{ say: "apple seedling" }, { say: "apple tree" }],
          [{ say: "lamb" }, { say: "sheep" }]
        ] },
      { prompt: "What does the plant grown in the shade look like?", say: "We planted two of the same seeds. What did the one grown in the shade look like?",
        options: ["tall, thin and pale", "short, bushy and green"], answer: "tall, thin and pale" },
      { prompt: "Which bush is safe from the goat?", say: "Which bush is safer from the goat?",
        options: ["the bush with long thorns", "the bush with no thorns"], answer: "the bush with long thorns" },
      { text: "Find your family's likenesses!",
        need: ["a few family photos (if you have them)", "a mirror"],
        steps: [
          "In the mirror, look at your eyes, hair colour and the shape of your ears.",
          "Then look at your dad, mum, brothers or sisters: in what ways are you alike?",
          "In what ways are you different?",
          "If you have old photos, see which child your parents looked like when they were little."
        ],
        ask: "In what way are you like your mum or dad?" }
    ] },
    "science-sapling-32": { title: "Each in its place: fish and amphibians", steps: [
      { prompt: "How are fish and amphibians different?",
        scenes: [
          { caption: "All animals need food, water, air and a safe place to live." },
          { caption: "This is a picture of a fish's bones. A fish has a backbone: a row of bones along its back. A worm has no backbone." },
          { caption: "Fish live in water, have scales and breathe with gills. The sturgeon lives in the Caspian Sea." },
          { caption: "The green toad is an amphibian: its egg hatches in water and its young one swims in the water. When it's grown, it lives mostly on land. Its skin is soft and damp." }
        ],
        question: "What does a fish breathe with?",
        options: ["gills", "its nose", "its skin"], answer: "gills" },
      { prompt: "Fish or amphibian?", say: "Which is a fish and which is an amphibian?",
        baskets: [{ label: "fish" }, { label: "amphibian" }],
        items: [{ say: "sturgeon" }, { say: "trout" }, { say: "shark" }, { say: "frog" }, { say: "salamander" }, { say: "green toad" }] },
      { prompt: "Which one has a backbone?", say: "Which animal has a backbone?",
        options: ["a fish", "an earthworm"], answer: "a fish" },
      { prompt: "Where does a baby frog live?", say: "Where does a baby frog, its young one, live?",
        options: ["in water", "up a tree"], answer: "in water" },
      { text: "Find your own backbone!",
        need: ["a grown-up", "thin clothes"],
        steps: [
          "The child bends forward a little.",
          "The grown-up gently runs a hand from the child's neck down to the lower back: can you feel the little bumps? These are the vertebrae.",
          "Count together how many you can feel.",
          "Say: we have a backbone too, like fish and frogs!"
        ],
        ask: "Which other animals have a backbone?" }
    ] },
    "science-sapling-33": { title: "Reptiles, birds, mammals", steps: [
      { prompt: "How are reptiles, birds and mammals different?",
        scenes: [
          { caption: "Reptiles have dry skin with scales, and most of them lay eggs. Tortoises and lizards are reptiles." },
          { caption: "Birds have feathers and lay eggs. They sit on their eggs to keep them warm until the chicks hatch." },
          { caption: "Mammals have hair or wool. Most of them give birth to live young and feed them milk. Sheep and we humans are mammals." },
          { caption: "A bat flies, but it isn't a bird! It has no feathers; it has fur, gives birth to live young and feeds its baby milk. A bat is a mammal." }
        ],
        question: "Why is a bat a mammal?",
        options: ["Because it has fur and feeds its baby milk", "Because it flies", "Because it lays eggs"], answer: "Because it has fur and feeds its baby milk" },
      { prompt: "Reptile, bird or mammal?", say: "Which group is each animal in?",
        baskets: [{ label: "reptile" }, { label: "bird" }, { label: "mammal" }],
        items: [{ say: "tortoise" }, { say: "snake" }, { say: "owl" }, { say: "pigeon" }, { say: "camel" }, { label: "bat", say: "bat" }] },
      { prompt: "What covers a bird's body?", say: "What covers a bird's body?",
        options: ["feathers", "scales", "wool"], answer: "feathers" },
      { prompt: "Which one feeds its baby milk?", say: "Which animal feeds its baby milk?",
        options: ["a cow", "a lizard", "a hen"], answer: "a cow" },
      { text: "Touch animals' coverings!",
        need: ["a feather (if you can find one)", "a little wool or a woolly jumper", "a piece of leather or a leather bag", "animal pictures in a book"],
        steps: [
          "Touch the feather, the wool and the leather, and with your eyes shut guess which is which.",
          "Say what animal covering each is like: a bird's feathers, a sheep's wool, a reptile's skin.",
          "In a book or outside, find an animal and say: does it have fur, feathers or scales?",
          "If you picked a feather up from the ground, wash your hands afterwards."
        ],
        ask: "Which was softer: the feather or the wool?" }
    ] },
    "science-sapling-35": { title: "Vertebrates game", steps: [
      { prompt: "Backbone or not?", say: "Which animals have a backbone and which don't?",
        baskets: [{ label: "vertebrate" }, { label: "invertebrate" }],
        items: [{ say: "fish" }, { say: "frog" }, { say: "cat" }, { say: "silkworm" }, { say: "snail" }, { say: "bee" }] },
      { prompt: "Which group is it in?", say: "Put each animal in its group.",
        baskets: [{ label: "fish" }, { label: "amphibian" }, { label: "reptile" }],
        items: [{ say: "sturgeon" }, { say: "shark" }, { say: "frog" }, { label: "salamander", say: "salamander" }, { say: "snake" }, { say: "lizard" }] },
      { prompt: "Bird or mammal?", say: "Which is a bird and which is a mammal?",
        baskets: [{ label: "bird" }, { label: "mammal" }],
        items: [{ say: "owl" }, { say: "parrot" }, { say: "rooster" }, { say: "camel" }, { say: "cheetah" }, { label: "bat", say: "bat" }] },
      { prompt: "Each group and its covering", say: "Match each group to what covers its body.",
        pairs: [
          [{ say: "bird" }, { label: "feathers", say: "feathers" }],
          [{ say: "mammal" }, { label: "hair or wool", say: "hair or wool" }],
          [{ say: "reptile" }, { label: "dry scales", say: "dry scales" }],
          [{ say: "amphibian" }, { label: "soft, damp skin", say: "soft, damp skin" }]
        ] },
      { text: "An animal groups notebook",
        need: ["paper and coloured pencils", "or animal pictures from old magazines, and glue"],
        steps: [
          "Divide the paper into five columns: fish, amphibians, reptiles, birds, mammals.",
          "In each column, draw at least one animal or stick on its picture.",
          "For each animal, say: where does it live, and what covers its body?",
          "Draw yourself in the right column too!"
        ],
        ask: "Which column did you draw yourself in?" }
    ] },
    "science-sapling-34": { title: "Inside nests and dens", steps: [
      { prompt: "Where do animals build their homes?",
        scenes: [
          { caption: "The stork builds its big nest of sticks on top of the minaret. Every spring it comes back to the same nest." },
          { caption: "The bee-eater digs a tunnel in the earth wall by the river, and lays its eggs at the end of the tunnel." },
          { caption: "Lower down, a fox has had her cubs in her underground den, and she looks after them." },
          { caption: "Parents look after their young: they feed them and keep them warm." }
        ],
        question: "Where does the bee-eater lay its eggs?",
        options: ["at the end of a tunnel in an earth wall", "on top of a minaret", "on the water"], answer: "at the end of a tunnel in an earth wall" },
      { prompt: "Each animal and its home", say: "Match each animal to its home.",
        pairs: [
          [{ label: "stork", say: "stork" }, { label: "a nest on a minaret", say: "a nest on top of a minaret" }],
          [{ label: "bee-eater", say: "bee-eater" }, { label: "a tunnel in an earth wall", say: "a tunnel in an earth wall" }],
          [{ say: "fox" }, { label: "an underground den", say: "an underground den" }],
          [{ say: "honeybee" }, { label: "a hive", say: "a hive" }]
        ] },
      { prompt: "Why do birds sit on their eggs?", say: "Why do birds sit on their eggs?",
        options: ["To keep the eggs warm so the chicks hatch", "Because they're tired"], answer: "To keep the eggs warm so the chicks hatch" },
      { prompt: "If we see a bird's nest, what should we do?", say: "If we see a bird's nest in the park, what should we do?",
        options: ["Look at it from far away and not touch it", "Take the eggs"], answer: "Look at it from far away and not touch it" },
      { text: "Neighbourhood nest finder!",
        need: ["a short walk with a grown-up", "paper and a pencil"],
        steps: [
          "Look for nests in trees, under the edges of roofs and on poles.",
          "Look from far away: what is the nest made of? Twigs, mud or grass?",
          "Draw the nest and write where it was.",
          "Never touch a nest or its eggs; the parents may get scared and not come back."
        ],
        ask: "What was the nest you found made of?" }
    ] },
    "science-sapling-56": { title: "Together we survive", steps: [
      { prompt: "How does living in a group help animals?",
        scenes: [
          { caption: "Wild goats live in groups. While the others graze, one stands on a rock and keeps watch." },
          { caption: "The lookout saw a leopard far away and warned the others. They all ran up the mountain together!" },
          { caption: "Cranes fly across the sky in a V shape. This way each crane flies more easily, and nobody gets lost." },
          { caption: "In a hive every bee has a job: one brings nectar from flowers, one guards the door, one feeds the young bees." }
        ],
        question: "Why do wild goats have a lookout?",
        options: ["To see danger early and warn the others", "To eat alone", "To scare the others"], answer: "To see danger early and warn the others" },
      { prompt: "Each group and how it helps", say: "Match each group of animals to what they do together.",
        pairs: [
          [{ say: "a herd of wild goats" }, { label: "keeping watch", say: "one keeps watch" }],
          [{ label: "cranes", say: "cranes" }, { label: "flying in a V", say: "flying in a V" }],
          [{ say: "honeybees" }, { label: "sharing work in the hive", say: "each has a job in the hive" }],
          [{ say: "ants" }, { label: "carrying seeds together", say: "they carry seeds together" }]
        ] },
      { prompt: "Why do cranes fly together?", say: "Why do cranes fly together in a V?",
        options: ["To fly more easily and not get lost", "To fight each other"], answer: "To fly more easily and not get lost" },
      { prompt: "Where do we humans work together?", say: "We humans work together too. Which example is right?",
        options: ["A family cleans the house together", "Everyone only works for themselves"], answer: "A family cleans the house together" },
      { text: "How do ants work together?",
        need: ["a crumb of bread or a little sugar", "a small spot outside where there are ants"],
        steps: [
          "Put a crumb of bread or a little sugar near the ants' nest.",
          "Wait and watch closely, without touching: when does the first ant appear?",
          "Watch: do the ants tell the others? How many carry one piece together?",
          "At home, do a group job together, like laying the table: everyone does one thing."
        ],
        ask: "How many ants worked together?" }
    ] },
    "science-sapling-55": { title: "Rocks and fossils", steps: [
      { prompt: "What do rocks tell us about the Earth's past?",
        scenes: [
          { caption: "Rocks are different from each other: one is rough and speckled, one is smooth and round, one is in layers." },
          { caption: "Long, long ago, a shellfish died in the sea and fell onto the mud at the bottom. Slowly, mud and sand covered it." },
          { caption: "Millions of years passed. The sea went away, the mud hardened and became rock. The shell's print stayed in the rock: we call this a “fossil”." },
          { caption: "In the Zagros and Alborz mountains, fossils of shells and sea animals are found. That means there was once a sea there!" }
        ],
        question: "What does a shell fossil on a mountain tell us?",
        options: ["There was once a sea there", "Shells climbed up the mountain", "It rained there yesterday"], answer: "There was once a sea there" },
      { prompt: "Rough or smooth?", say: "Feel them and see: which rock is rough and which is smooth?",
        baskets: [{ label: "rough" }, { label: "smooth" }],
        items: [{ label: "pumice", say: "pumice" }, { label: "broken mountain rock", say: "broken mountain rock" }, { label: "sandstone", say: "sandstone" },
          { label: "river pebble", say: "river pebble" }, { label: "polished marble", say: "polished marble" }] },
      { prompt: "How does a fossil form?", say: "A shell fell on the mud, mud covered it, the mud became rock, and now we find the fossil on a mountain. Put them in order.",
        items: [{ label: "shell on the mud", say: "a shell fell on the mud at the bottom of the sea" }, { label: "mud covered it", say: "mud and sand covered it" },
          { label: "the mud became rock", say: "the mud hardened and became rock" }, { label: "a fossil on a mountain", say: "we find the fossil on a mountain" }] },
      { prompt: "How long does a fossil take to form?", say: "How long does it take for a fossil to form?",
        options: ["millions of years", "one day"], answer: "millions of years" },
      { text: "Make a dough fossil!",
        need: ["some play dough or salt dough", "a shell, a leaf or a small toy", "a few different stones from the yard"],
        steps: [
          "Flatten the dough. Press the shell or leaf firmly into it and lift it off: its print stays!",
          "Let the dough dry for a day. It's like a fossil: the print of something that is no longer there.",
          "Feel the stones from the yard and line them up: rough ones on one side, smooth ones on the other.",
          "Look closely: which stone has speckles or layers? Then wash your hands."
        ],
        ask: "Which thing left its print in the dough?" }
    ] },
    "science-sapling-37": { title: "I grow", steps: [
      { prompt: "How does our body get bigger?",
        scenes: [
          { caption: "Our body grows. Every year we get a little taller. Our hair and nails grow longer too." },
          { caption: "Food gives us energy to run, play and think." },
          { caption: "Food also gives the body building materials, like bricks that make a wall taller. That's how our bones and muscles get bigger." }
        ],
        question: "What does food give our body?",
        options: ["energy and materials to grow", "only taste", "nothing"], answer: "energy and materials to grow" },
      { prompt: "Put them in order from small to big", say: "First we were babies, then children, then teenagers, and then we become grown-ups. Put them in order.",
        items: [{ label: "baby", say: "baby" }, { label: "child", say: "child" }, { label: "teenager", say: "teenager" }, { label: "grown-up", say: "grown-up" }] },
      { prompt: "Does it grow or not?", say: "Which things get bigger or longer over time, and which don't?",
        baskets: [{ label: "grows" }, { label: "doesn't grow" }],
        items: [{ label: "my height", say: "my height" }, { label: "my hair", say: "my hair" }, { label: "my nails", say: "my nails" }, { say: "my shoe" }, { say: "a teddy bear" }, { say: "a stone" }] },
      { prompt: "Why do shoes get tight as we grow?", say: "Why are last year's shoes tight now?",
        options: ["Because our feet have grown", "Because the shoes have shrunk"], answer: "Because our feet have grown" },
      { text: "Mark your height!",
        need: ["a door frame or a long paper on the wall", "a pencil", "a book"],
        steps: [
          "The child stands straight against the door, without shoes.",
          "A grown-up lays a book flat on the child's head and draws a line under it. Write the date next to it.",
          "Measure again every month or every season.",
          "Draw round the child's hand on paper and keep it; next year draw it again and compare."
        ],
        ask: "How much taller have you grown so far?" }
    ] },
    "science-sapling-38": { title: "Chains game", steps: [
      { prompt: "Put the food chain in order", say: "A food chain starts with a plant. Grass, grasshopper, sparrow, owl. Put them in order from the start.",
        items: [{ label: "grass", say: "grass" }, { label: "grasshopper", say: "grasshopper" }, { label: "sparrow", say: "sparrow" }, { label: "owl", say: "owl" }] },
      { prompt: "Put this chain in order too", say: "There are chains in the sea too: tiny sea plants, a small fish, a big fish, a dolphin. Put them in order from the start.",
        items: [{ label: "tiny sea plants", say: "tiny sea plants" }, { label: "small fish", say: "small fish" }, { label: "big fish", say: "big fish" }, { label: "dolphin", say: "dolphin" }] },
      { prompt: "Each animal and its habitat", say: "Match each animal to the place in Iran where it lives.",
        pairs: [
          [{ say: "maral deer" }, { label: "the northern forests", say: "the northern forests" }],
          [{ say: "wild goat" }, { label: "the Zagros mountains", say: "the Zagros mountains" }],
          [{ say: "cheetah" }, { label: "the desert", say: "the desert" }],
          [{ say: "dolphin" }, { label: "the Persian Gulf", say: "the Persian Gulf" }]
        ] },
      { prompt: "Who helps whom?", say: "Plants need animals. Match each animal to how it helps plants.",
        pairs: [
          [{ say: "bee" }, { label: "carries pollen from flower to flower", say: "carries pollen from flower to flower" }],
          [{ say: "squirrel" }, { label: "buries seeds in the soil", say: "buries seeds in the soil" }],
          [{ say: "bird" }, { label: "carries fruit seeds somewhere else", say: "carries fruit seeds somewhere else" }]
        ] },
      { text: "Flower detective: who visits the flowers?",
        need: ["a garden or park with flowers", "paper and a pencil"],
        steps: [
          "Stand near some flowers, but not too close.",
          "Watch quietly for a few minutes: do bees, butterflies or flies land on the flowers?",
          "Each time one comes, draw a line on the paper.",
          "Don't touch the bees, and stay calm; they're busy with their work."
        ],
        ask: "Which animal visited the flowers most?" }
    ] },
    "science-sapling-39": { title: "Loud and quiet, high and low", steps: [
      { prompt: "How can we make a sound high or low, loud or quiet?",
        scenes: [
          { caption: "We plucked the thin band: it shook very fast and made a high sound. The thick band shook more slowly and made a low sound." },
          { caption: "If we pluck the band hard, it shakes a lot and the sound is loud. If we pluck it gently, it shakes a little and the sound is quiet." },
          { caption: "We poured water into the jars, a little more in each. We tapped them gently with a wooden spoon: the jar with more water makes a lower sound." }
        ],
        question: "Which band makes a higher sound?",
        options: ["the thin band", "the thick band"], answer: "the thin band" },
      { prompt: "High or low?", say: "Which sound is high and which is low?",
        baskets: [{ label: "high" }, { label: "low" }],
        items: [{ say: "a sparrow cheeping" }, { say: "a little bell" }, { say: "a mouse squeaking" }, { say: "a big drum" }, { say: "a cow mooing" }, { say: "a ship's horn" }] },
      { prompt: "Loud or quiet?", say: "Which sound is loud and which is quiet?",
        baskets: [{ label: "loud" }, { label: "quiet" }],
        items: [{ say: "a fire engine's siren" }, { say: "thunder" }, { say: "whispering" }, { say: "leaves rustling" }] },
      { prompt: "Which jar makes a lower sound?", say: "We tap two jars gently. Which one makes a lower sound?",
        options: ["the jar with more water", "the jar with less water"], answer: "the jar with more water" },
      { text: "Make a home-made instrument!",
        need: ["a shoebox without a lid", "two rubber bands: one thin, one thick", "a few glass jars or glasses of the same size", "water and a wooden spoon"],
        steps: [
          "Stretch the bands round the box, then pluck each one and let go. Which sounds higher?",
          "Pluck once gently and once hard: which sound was louder?",
          "Pour water into the jars: a little in one, more in another, lots in another.",
          "Tap the jars gently with the wooden spoon (not hard). Line them up from low to high and play a tune."
        ],
        ask: "Which jar had a lower sound?" }
    ] },
    "science-sapling-51": { title: "Little weather reporter", steps: [
      { prompt: "Early in the morning, how many degrees does the yard thermometer show?", say: "Early in the morning we looked at the yard thermometer. Where is the top of the red line? How many degrees is it?" },
      { prompt: "At noon it got warmer: 20 degrees. Move the thermometer to 20.", say: "At noon the sun rose high and it got warmer: twenty degrees. Raise the thermometer's red line to twenty, then press done." },
      { title: "This week's weather", prompt: "Put each day of the week in its weather's column.", say: "This week there were four sunny days, two cloudy days and one rainy day. Put each day in its weather's column.",
        rows: [{ label: "sunny" }, { label: "cloudy" }, { label: "rainy" }],
        question: "What were most days like this week?", options: [{ label: "sunny" }, { label: "cloudy" }, { label: "rainy" }] },
      { title: "Noon temperature this week (degrees)", say: "Every noon we read the temperature on the thermometer and drew this chart.",
        rows: [{ label: "Sat" }, { label: "Sun" }, { label: "Mon" }, { label: "Tue" }, { label: "Wed" }, { label: "Thu" }, { label: "Fri" }],
        question: "Which day was the coldest?", options: [{ label: "Tuesday" }, { label: "Friday" }, { label: "Saturday" }] },
      { prompt: "How can we tell there's wind?", say: "We can't see the wind. How can we tell it's windy?",
        options: ["Leaves and flags move", "The thermometer goes up"], answer: "Leaves and flags move" },
      { lang: "en", text: "Be a weather reporter for a week! Every day draw a box in your weather notebook: the temperature (from a thermometer at home or the forecast), and a picture for sun, cloud, rain or wind. At the end of the week, draw a bar chart of the temperatures.",
        example: "Saturday: 16 degrees ☀️ no wind\nSunday: 18 degrees ☀️ a little wind\nMonday: 14 degrees ☁️\nTuesday: 11 degrees 🌧️",
        check: ["Did they write the temperature every day?", "Did they draw the weather each day?", "Did they draw a bar chart at the end of the week?"],
        note: "Read the temperature at the same time every day, for example at noon. If you don't have a thermometer, read it from the forecast. At the end of the week ask: which was the warmest and the coldest day?" }
    ] },
    "science-sapling-52": { title: "Climates of Iran", steps: [
      { prompt: "How is weather different from climate?",
        scenes: [
          { caption: "Today it's raining and tomorrow it may be sunny: that's the “weather”. But “climate” is what a place is usually like, year after year." },
          { caption: "Rasht in Gilan is very rainy. Most days of the year are cloudy and rainy, and its forests are green." },
          { caption: "Ardabil has very cold, snowy winters." },
          { caption: "Yazd is dry with little rain. Its summers are very hot, and the sky is clear most of the time." },
          { caption: "Bandar Abbas is by the sea. Its air is hot and humid: hot and full of moisture." }
        ],
        question: "Which city is very rainy?",
        options: ["Rasht", "Yazd", "Bandar Abbas"], answer: "Rasht" },
      { prompt: "Each city and its climate", say: "Match each city to its usual climate.",
        pairs: [
          [{ label: "Rasht", say: "Rasht" }, { say: "very rainy" }],
          [{ label: "Ardabil", say: "Ardabil" }, { say: "cold, snowy winters" }],
          [{ label: "Yazd", say: "Yazd" }, { say: "dry, with little rain" }],
          [{ label: "Bandar Abbas", say: "Bandar Abbas" }, { say: "hot and humid" }]
        ] },
      { prompt: "Which sentence is about climate?", say: "Which sentence is about a place's climate, not today's weather?",
        options: ["Yazd has hot, dry summers every year", "This morning it was windy in Yazd"], answer: "Yazd has hot, dry summers every year" },
      { prompt: "What should we take on a winter trip to Ardabil?", say: "We're travelling to Ardabil in winter. What clothes should we take?",
        options: ["A warm coat, a hat and gloves", "Only thin summer clothes"], answer: "A warm coat, a hat and gloves" },
      { text: "Water is hiding in the air!",
        need: ["a glass", "very cold water or a few ice cubes"],
        steps: [
          "Dry the outside of the glass.",
          "Pour ice-cold water into the glass and wait a few minutes.",
          "Run your finger down the outside of the glass: is it wet? This water came from the air in the room!",
          "In humid air, like in Bandar Abbas, the air holds much more water. If you travel, try it again."
        ],
        ask: "Which side of the glass did the drops appear on: outside or inside?" }
    ] },
    "science-sapling-53": { title: "When the weather gets rough", steps: [
      { prompt: "When the weather gets rough, how do we stay safe?",
        scenes: [
          { caption: "The weather forecast said there will be hail tomorrow. Now we know, and we're ready." },
          { caption: "Hail is little balls of ice falling from a cloud. We stay under a roof until it's over; the roof protects us." },
          { caption: "In a dust storm, we close the windows and stay indoors. Rows of trees hold back the wind and dust." },
          { caption: "If the river's water rises, we move away from the river and go to high ground. Grown-ups know the way." }
        ],
        question: "When it's hailing, where should we stay?",
        options: ["under a roof, indoors", "in the middle of the yard", "under a lone tree"], answer: "under a roof, indoors" },
      { prompt: "What should we do in a dust storm?", say: "A dust storm has come. What should we do?",
        options: ["Close the windows and stay indoors", "Go outside and play"], answer: "Close the windows and stay indoors" },
      { prompt: "If the river rises, where should we go?", say: "It has rained a lot and the river's water has risen. Where should we go?",
        options: ["away from the river, to high ground", "next to the river, to watch"], answer: "away from the river, to high ground" },
      { prompt: "How can we know the weather will be rough tomorrow?", say: "How can we find out whether tomorrow will be stormy or hailing?",
        options: ["from the weather forecast", "there's no way"], answer: "from the weather forecast" },
      { text: "Our family's rough-weather plan",
        need: ["paper and a pencil", "a grown-up"],
        steps: [
          "Watch tomorrow's weather forecast together on TV, radio or a phone.",
          "Think together: if there's hail, what will we do? If there's a dust storm?",
          "Write or draw three simple things on the paper, like: stay under a roof, close the windows, keep away from the river.",
          "Stick the paper where everyone can see it."
        ],
        ask: "What will the weather be like tomorrow?" }
    ] },
    "science-sapling-46": { title: "If it runs out…", steps: [
      { prompt: "Where do water, gas, oil and electricity come from?",
        scenes: [
          { caption: "Oil and gas are deep inside the Earth. They took millions of years to form. If they run out, they won't form again any time soon." },
          { caption: "Gas reaches homes through pipes. We use it to heat the house and cook food." },
          { caption: "Electricity is made in power stations and brought to homes by wires. Many power stations burn gas or oil to make electricity." },
          { caption: "So we save: when we leave a room, we turn off the light. And we turn off the tap when we've finished." }
        ],
        question: "Why do we turn off the light when we leave a room?",
        options: ["So electricity, gas and oil don't run out fast", "Because the light gets tired"], answer: "So electricity, gas and oil don't run out fast" },
      { prompt: "Saving or wasting?", say: "Which is saving and which is wasting?",
        baskets: [{ label: "saving" }, { label: "wasting" }],
        items: [{ say: "turning off the light in an empty room" }, { say: "turning off the tap while brushing your teeth" }, { say: "putting on a jumper instead of turning up the heater" },
          { say: "leaving the TV on when nobody is watching" }, { say: "leaving the window open when the heater is on" }, { say: "a very long shower" }] },
      { prompt: "Where do gas and oil come from?", say: "Where do gas and oil come from?",
        options: ["from deep inside the Earth", "from the clouds"], answer: "from deep inside the Earth" },
      { prompt: "If oil and gas run out, do they form again quickly?", say: "If oil and gas run out, do they form again quickly?",
        options: ["No, it takes millions of years", "Yes, by tomorrow"], answer: "No, it takes millions of years" },
      { text: "Be your home's energy guard!",
        need: ["paper and a pencil", "a day at home"],
        steps: [
          "Draw a table: a light on in an empty room, a tap running, a TV on with nobody watching.",
          "For one day, each time you see one, draw a line in its column and switch it off or turn it off (with a grown-up's help if needed).",
          "Don't touch sockets or wires; only press the light switch.",
          "In the evening, count: how many times did you save energy?"
        ],
        ask: "Which one was left on most?" }
    ] },
    "science-sapling-47": { title: "After the party", steps: [
      { prompt: "What shall we do with the party rubbish?",
        scenes: [
          { caption: "The birthday party is over. The table is full of plastic cups, paper plates, a bottle and fruit peel!" },
          { caption: "Reduce: next time we'll use washable cups instead of throwaway ones. Reuse: the glass bottle became a flower pot!" },
          { caption: "Recycle: the paper plate goes in the paper bin and the plastic cup in the plastic bin. New things are made from them." },
          { caption: "We put the fruit peel on the compost heap in a corner of the garden. Slowly it becomes good soil and feeds the plants." }
        ],
        question: "What shall we do with fruit peel?",
        options: ["Put it on the compost heap to turn into soil", "Put it in the glass bin", "Throw it in the river"], answer: "Put it on the compost heap to turn into soil" },
      { prompt: "Where does each one go?", say: "Sort the party rubbish. Where does each one go?",
        baskets: [{ label: "paper" }, { label: "plastic" }, { label: "compost" }],
        items: [{ say: "a paper plate" }, { say: "wrapping paper" }, { say: "a plastic cup" }, { say: "a juice carton" }, { say: "banana peel" }, { say: "orange peel" }] },
      { prompt: "Reduce, reuse or recycle?", say: "Which is each one: reducing, reusing or recycling?",
        baskets: [{ label: "reduce" }, { label: "reuse" }, { label: "recycle" }],
        items: [{ label: "a washable cup instead of a throwaway one", say: "a washable cup instead of a throwaway one" }, { label: "a cloth bag for shopping", say: "a cloth bag for shopping" },
          { label: "a jam jar for pencils", say: "a jam jar for pencils" }, { label: "a bottle as a flower pot", say: "a bottle as a flower pot" },
          { label: "newspaper in the paper bin", say: "newspaper in the paper bin" }] },
      { prompt: "Why is a washable cup better?", say: "Why is a washable cup better than a throwaway one for a party?",
        options: ["Because it makes less rubbish", "Because it breaks sooner"], answer: "Because it makes less rubbish" },
      { text: "A week with less rubbish!",
        need: ["a few boxes or bags for sorting", "paper and a pencil for labels"],
        steps: [
          "Write or draw on the boxes: paper, plastic, glass, food waste.",
          "For a week, sort the home's rubbish together. Grown-ups pick up any broken glass.",
          "Reuse one thing, for example turn a tin into a pencil pot.",
          "If you have a garden or a plant pot, bury a little fruit peel and see what happens a few weeks later."
        ],
        ask: "Which box filled up first?" }
    ] },
    "science-sapling-48": { title: "Let's find out and build", steps: [
      { prompt: "Let's build a paper bridge that holds coins",
        scenes: [
          { caption: "The problem: we want a paper bridge that reaches from these books to those books and holds coins." },
          { caption: "First we think and draw a few ideas on paper: a flat sheet, or a sheet folded like a fan." },
          { caption: "We build it and test it: we laid the flat sheet across. With two coins it bent and the coins fell!" },
          { caption: "We make it better: we folded the paper like a fan. Now it holds even six coins!" }
        ],
        question: "When the first bridge bent, what did we do?",
        options: ["We thought and built it better", "We gave up and left", "We threw the coins away"], answer: "We thought and built it better" },
      { prompt: "Put the building steps in order", say: "Builders first ask what is needed, then sketch, then build, test and improve it. Put them in order.",
        items: [{ label: "What do we need?", say: "we ask what the bridge must do" }, { label: "We sketch", say: "we sketch" }, { label: "We build", say: "we build" },
          { label: "We test", say: "we test it with coins" }, { label: "We improve", say: "we make it better" }] },
      { prompt: "To make the test fair…", say: "We want to compare two bridges. What must be the same?",
        options: ["the same kind of paper and the same gap between the books", "one with thick paper, one with thin"], answer: "the same kind of paper and the same gap between the books" },
      { prompt: "Which bridge was stronger?", say: "Which bridge held more coins?",
        options: ["the paper folded like a fan", "the flat paper"], answer: "the paper folded like a fan" },
      { text: "Paper bridge contest!",
        need: ["a few sheets of paper of the same size", "two piles of books of the same height", "coins or erasers of the same weight", "sticky tape (if needed)"],
        steps: [
          "Put the two piles of books with a gap between them, the same each time.",
          "Lay a flat sheet across and add coins one by one. How many coins did it hold?",
          "Now make a new design with another sheet: fold it, roll it, or turn up its edges.",
          "Test again and count. Which design won? Why?"
        ],
        ask: "How many coins did your best bridge hold?" }
    ] },
    "science-sapling-49": { title: "Two solutions", steps: [
      { prompt: "How can we make ice melt more slowly?",
        scenes: [
          { caption: "We have two ice cubes of the same size. We want one of them to melt more slowly. We'll try two ways." },
          { caption: "Way one: we wrapped the ice in a woolly sock. Way two: we put the ice in a metal cup. Everything else is the same." },
          { caption: "We waited half an hour." },
          { caption: "We took off the sock: its ice is still big! In the metal cup only a small piece is left. Wool stops the room's warmth from reaching the ice quickly." }
        ],
        question: "Which ice melted more slowly?",
        options: ["the ice in the woolly sock", "the ice in the metal cup"], answer: "the ice in the woolly sock" },
      { title: "How many minutes did the ice take to melt completely?", say: "We timed it: how many minutes did each ice cube take to melt completely? A taller bar means it melted more slowly.",
        rows: [{ label: "woolly sock" }, { label: "metal cup" }, { label: "plain plate" }],
        question: "Which way was best?", options: [{ label: "woolly sock" }, { label: "metal cup" }, { label: "plain plate" }] },
      { prompt: "What must be the same for a fair test?", say: "For the comparison to be fair, what must be the same?",
        options: ["the size of the ice cubes and where they are put", "the colour of the sock"], answer: "the size of the ice cubes and where they are put" },
      { prompt: "Why was wool better?", say: "Why did the ice in the wool melt more slowly?",
        options: ["Because wool lets heat through slowly", "Because wool is cold"], answer: "Because wool lets heat through slowly" },
      { text: "Ice race: which way is best?",
        need: ["three ice cubes of the same size", "three plates", "a woolly sock and a cloth", "a clock"],
        steps: [
          "Put one ice cube in the sock, one in the cloth, and one uncovered on a plate.",
          "Put all three next to each other in the same room.",
          "Look every ten minutes and write down which ones still have ice.",
          "Draw a bar chart: how many minutes did each one take to melt?"
        ],
        ask: "Which way kept the ice longest? Why?" }
    ] },
    "science-sapling-50": { title: "From the past to the future: bread", steps: [
      { prompt: "How has bread been made, from the past until today?",
        scenes: [
          { caption: "When the wheat was ripe, farmers long ago cut it with a sickle. It was hard, slow work." },
          { caption: "In Nashtifan in Khorasan there are very old windmills: the wind turns their wooden blades and the millstone grinds the wheat into flour." },
          { caption: "In other places there were water mills: the force of the river's water turned the wheel and the wheat became flour." },
          { caption: "Today in the bakery, a machine kneads the dough and sangak bread bakes in the tanoor. But the flour still comes from the same wheat!" }
        ],
        question: "What turns a windmill?",
        options: ["the force of the wind", "the force of water", "hands"], answer: "the force of the wind" },
      { prompt: "Put wheat to bread in order", say: "First we cut the wheat, then grind it into flour in a mill, then make dough and bake it in the tanoor. Put them in order.",
        items: [{ label: "cutting the wheat", say: "cutting the wheat" }, { label: "grinding", say: "grinding it into flour" }, { label: "making dough", say: "making the dough" }, { label: "baking bread", say: "baking the bread in the tanoor" }] },
      { prompt: "Put the mills in order from long ago to today", say: "Long ago people ground wheat by hand with stones, then they built windmills and water mills, and today there are flour factories. Put them in order.",
        items: [{ label: "hand stone", say: "a stone hand mill" }, { label: "windmill and water mill", say: "the windmill and the water mill" }, { label: "flour factory", say: "today's flour factory" }] },
      { prompt: "Where are Iran's old windmills?", say: "Where are Iran's very old windmills?",
        options: ["Nashtifan in Khorasan", "by the Caspian Sea"], answer: "Nashtifan in Khorasan" },
      { text: "Be a miller yourself!",
        need: ["a handful of wheat or rice", "two metal spoons or two clean, smooth stones", "a plate", "a little flour and water"],
        steps: [
          "Put a few grains of wheat on the plate and press and grind them with the back of a spoon or a smooth stone. What happens?",
          "Put the ground grain next to some flour from home and compare: which is finer? Mills did hard work!",
          "Knead a little flour and water into dough and press sangak dimples into it with your fingertips. (No need to bake it.)",
          "If you can, go to a bakery with a grown-up and watch from a distance how the bread is baked."
        ],
        ask: "Was grinding the grains easy or hard?" }
    ] },
    "science-sapling-54": { title: "The big Sapling game", steps: [
      { prompt: "Put a fair test in order", say: "Scientists first ask a question, then guess, then do a fair test, and last they say what they found. Put them in order.",
        items: [{ label: "question", say: "we ask a question" }, { label: "guess", say: "we guess" }, { label: "fair test", say: "we do a fair test" }, { label: "result", say: "we say what we found" }] },
      { prompt: "Touching or not touching?", say: "Which forces work by touching, and which without touching?",
        baskets: [{ label: "touching" }, { label: "without touching" }],
        items: [{ say: "kicking a ball" }, { say: "tug-of-war" }, { say: "an apple falling from a tree" }, { say: "a magnet and a nail" }] },
      { prompt: "From parents or from surroundings?", say: "Which traits do we get from our parents, and which do our surroundings change?",
        baskets: [{ label: "from parents" }, { label: "from surroundings" }],
        items: [{ label: "eye colour", say: "eye colour" }, { label: "a kitten's fur colour", say: "a kitten's fur colour" }, { label: "a pale plant in the shade", say: "a plant that grew pale in the shade" }, { label: "suntanned skin", say: "skin that got darker in the sun" }] },
      { prompt: "Weather or climate?", say: "Match each city to its usual climate.",
        pairs: [
          [{ label: "Rasht", say: "Rasht" }, { say: "rainy" }],
          [{ label: "Yazd", say: "Yazd" }, { say: "dry" }],
          [{ label: "Ardabil", say: "Ardabil" }, { say: "snowy" }],
          [{ label: "Bandar Abbas", say: "Bandar Abbas" }, { say: "hot and humid" }]
        ] },
      { prompt: "Which test is fair?", say: "We want to see which ball bounces higher. Which test is fair?",
        options: ["Drop both from the same height", "Drop one from the top of the table and one from the floor"], answer: "Drop both from the same height" },
      { text: "A fair ball test!",
        need: ["two or three different balls (plastic, cloth, rubber)", "a wall and a pencil or sticky notes for marking"],
        steps: [
          "Guess which ball will bounce highest.",
          "Drop each ball next to the wall from the same height (for example a grown-up's shoulder height); don't throw it.",
          "Someone marks the highest bounce with a sticky note.",
          "Try each ball three times. Which won? Was your guess right?"
        ],
        ask: "Which ball bounced highest? What did we keep the same?" }
    ] },
    // ---- Practice (js/practice/science.js): the same keys as each generator's words ----
    "science-seed-p1": { title: "This way or that way?", words: {
      ask: { living: "Which are alive and which are not?", hardsoft: "Which are hard and which are soft?", weather: "Which are for a sunny day and which for a rainy day?",
        daynight: "Which belong to the day and which to the night?", hotcold: "Which are for hot weather and which for cold weather?", heavylight: "Which are heavy and which are light?" },
      b: { alive: "alive", notalive: "not alive", hard: "hard", soft: "soft", sunny: "sunny", rainy: "rainy", day: "day", night: "night", hot: "hot", cold: "cold", heavy: "heavy", light: "light" },
      n: { cat: "cat", tree: "tree", fish: "fish", bird: "bird", flower: "flower", ant: "ant", cow: "cow", stone: "stone", ball: "ball", chair: "chair", car: "car",
        teddy: "teddy bear", spoon: "spoon", book: "book", key: "key", block: "brick", walnut: "walnut", sponge: "sponge", wool: "ball of wool", scarf: "scarf", bread: "bread",
        sunhat: "sun hat", sunglasses: "sunglasses", sun: "sun", shorts: "shorts", umbrella: "umbrella", boots: "boots", cloud: "rain cloud", puddle: "puddle",
        rainbow: "rainbow", rooster: "rooster", butterfly: "butterfly", moon: "moon", star: "star", owl: "owl", bed: "bed", icecream: "ice cream", fan: "hand fan",
        gloves: "gloves", snowman: "snowman", coat: "coat", watermelon: "watermelon", elephant: "elephant", table: "table", feather: "feather", leaf: "leaf", balloon: "balloon", paper: "paper" } } },
    "science-seed-p2": { title: "Each with its pair", words: {
      ask: { home: "Match each animal to its home.", food: "Match each animal to its food.", young: "Match each animal to its young.", sound: "Match each animal to its sound." },
      n: { bee: "bee", bird: "bird", fish: "fish", rabbit: "rabbit", cow: "cow", squirrel: "squirrel", hen: "hen", sheep: "sheep", cat: "cat", frog: "frog", dog: "dog", horse: "horse",
        hive: "hive", nest: "nest in a tree", water: "water", burrow: "burrow", stable: "barn", treehole: "hole in a tree trunk",
        flower: "flower", seeds: "seeds", carrot: "carrot", grass: "grass", nut: "nut", hay: "hay",
        calf: "calf", chick: "chick", lamb: "lamb", kitten: "kitten", tadpole: "tadpole", puppy: "puppy", foal: "foal",
        tweet: "tweet tweet", moo: "moo", cluck: "cluck cluck", baa: "baa", meow: "meow", croak: "croak", woof: "woof woof" } } },
    "science-seed-p3": { title: "Guess and see", words: { guess: "Guess first, then see what happens.", n: GUESS_EN } },
    "science-seed-p4": { title: "Science words", words: {
      ask: "Which picture is “{w}”?",
      w: { living: "alive", see: "seeing", hear: "hearing", smell: "smelling", taste: "tasting", touch: "touching", seed: "seed", sprout: "sprout", flower: "flower", leaf: "leaf",
        fruit: "fruit", sunny: "sunny", rainy: "rainy", snowy: "snowy", cloudy: "cloudy", moon: "moon", star: "star" } } },
    "science-sprout-p1": { title: "Animals and plants of Iran", words: {
      ask: { move: "How does each animal get around?", cover: "What covers each animal's body?", food: "Which is a plant-eater and which is a meat-eater?",
        eat: "Which part of each plant do we eat?", young: "Which is young and which is grown?" },
      b: { walk: "walks", fly: "flies", swim: "swims", crawl: "crawls", fur: "fur", feather: "feathers", scale: "scales", plant: "plant-eater", meat: "meat-eater",
        root: "root", leaf: "leaf", fruit: "fruit", young: "young", grown: "grown" },
      n: { cheetah: "cheetah", maral: "maral deer", wildgoat: "wild goat", wolf: "wolf", fox: "fox", rabbit: "rabbit", squirrel: "squirrel", camel: "camel", horse: "horse",
        cow: "cow", sheep: "sheep", cat: "cat", bear: "bear", mouse: "mouse", owl: "owl", pigeon: "pigeon", sparrow: "sparrow", parrot: "parrot", rooster: "rooster",
        duck: "duck", butterfly: "butterfly", bee: "bee", fish: "fish", sturgeon: "sturgeon", shark: "shark", dolphin: "dolphin", snake: "snake", lizard: "lizard",
        turtle: "tortoise", frog: "frog", snail: "snail", worm: "earthworm",
        carrot: "carrot", radish: "radish", beet: "beetroot", lettuce: "lettuce", spinach: "spinach", herbs: "fresh herbs", apple: "apple", pomegranate: "pomegranate", grapes: "grapes",
        melon: "melon", cucumber: "cucumber", tomato: "tomato", chick: "chick", lamb: "lamb", kitten: "kitten", calf: "calf", tadpole: "tadpole",
        seedling: "seedling", hen: "hen", tree: "tree" } } },
    "science-sprout-p2": { title: "Materials and properties", words: {
      ask: { material: "What is each thing made of?", seethrough: "Which can you see through and which can't you?", shake: "Which shakes and makes a sound, and which doesn't?", state: "Which is solid and which is liquid?" },
      b: { wood: "wood", metal: "metal", plastic: "plastic", glass: "glass", cloth: "cloth", clear: "see-through", notclear: "not see-through",
        shakes: "shakes and makes a sound", still: "makes no sound", solid: "solid", liquid: "liquid" },
      n: { spoonwood: "wooden spoon", chair: "wooden chair", pencil: "pencil", key: "key", coin: "coin", pot: "cooking pot", bottle: "plastic bottle", bucket: "plastic bucket",
        cup: "plastic cup", window: "window glass", jar: "jam jar", glasses: "glasses", shirt: "shirt", sock: "sock", scarf: "scarf", water: "water", book: "book",
        door: "wooden door", block: "brick", drum: "a drum being hit", bell: "a ringing bell", guitar: "a plucked guitar string", whistle: "a whistle being blown", pillow: "pillow",
        stone: "stone", sleepcat: "sleeping cat", ice: "ice", milk: "milk", juice: "juice", oil: "oil" } } },
    "science-sprout-p3": { title: "Guess and see", words: { guess: "Guess first, then see what happens.", n: GUESS_EN } },
    "science-sprout-p4": { title: "Sky, weather and seasons", words: {
      day: "Put the day in order, from morning to night.", moon: "Put the moon's shapes in order, from new moon to full moon.", seasons: "Put the seasons in order, starting with {first}.",
      pattern: "The seasons come one after another. Which season goes in the gap?", week: "A week of weather", weekAsk: "How many days were {w} this week?",
      n: { morning: "morning", noon: "noon", evening: "evening", night: "night", new: "new moon", crescent: "crescent", half: "half moon", gibbous: "almost full", full: "full moon",
        spring: "spring", summer: "summer", autumn: "autumn", winter: "winter", sunny: "sunny", cloudy: "cloudy", rainy: "rainy" } } },
    "science-sprout-p5": { title: "Science words", words: {
      ask: { root: "Which one is a “root”?", leaf: "Which one is a “leaf”?", flower: "Which one is a “flower”?", seed: "Which one is a “seed”?", fur: "Which one has “fur”?", feather: "Which one has “feathers”?",
        scale: "Which one has “scales”?", ice: "Which one is “ice”?", liquid: "Which one is a “liquid”?", shake: "Which one “shakes” and makes a sound?", light: "Which one gives “light”?",
        forecast: "Where do we see the “weather forecast”?", wind: "Which one is “wind”?" } } },
    "science-sapling-p1": { title: "Sort it", words: {
      ask: { vert1: "Fish or amphibian?", vert2: "Reptile, bird or mammal?", states: "Solid, liquid or gas?", undo: "Can this change be undone or not?",
        light: "Does light go right through it, a little, or not at all?", force: "Is this force touching or not touching?", source: "Does it have its own light or not?", fossil: "Plain rock or fossil?" },
      b: { fish: "fish", amph: "amphibian", rep: "reptile", bird: "bird", mam: "mammal", solid: "solid", liquid: "liquid", gas: "gas", back: "can be undone", noback: "can't be undone",
        all: "goes right through", some: "goes through a little", none: "doesn't go through", touch: "touching", far: "not touching", yes: "has its own light", no: "no light of its own",
        rock: "rock", fossil: "fossil" },
      n: { sturgeon: "sturgeon", shark: "shark", trout: "trout", frog: "frog", toad: "green toad", salamander: "salamander", snake: "snake", lizard: "lizard", turtle: "tortoise",
        owl: "owl", pigeon: "pigeon", parrot: "parrot", camel: "camel", cheetah: "cheetah", bat: "bat", dolphin: "dolphin", ice: "ice", stone: "stone", coin: "coin", water: "water",
        milk: "milk", oil: "oil", steam: "steam", air: "the air in a balloon", smoke: "smoke", melt: "ice that melted", freeze: "water that froze", chocolate: "chocolate that melted",
        candlewax: "candle wax that went soft", egg: "a cooked egg", bread: "baked bread", rice: "cooked rice", burnt: "burnt paper", window: "window glass", clearwater: "clear water",
        glasses: "glasses", thinpaper: "thin paper", tissue: "tissue", curtain: "a thin curtain", board: "wooden board", book: "book", wall: "brick wall",
        kick: "kicking a ball", push: "pushing a trolley", tug: "tug-of-war", broom: "sweeping", fall: "an apple falling", magnet: "a magnet pulling a clip",
        balloon: "a rubbed balloon pulling paper", leaffall: "a leaf falling", sun: "the sun", candle: "a lit candle", torch: "a torch that's on", lamp: "a lamp that's on",
        firefly: "firefly", moon: "the moon", mirror: "mirror", apple: "apple", teddy: "teddy bear", pebble: "river pebble", granite: "speckled mountain rock",
        sandstone: "sandstone", marble: "marble", shellfossil: "a shell's print in rock", leaffossil: "a leaf's print in rock", fishfossil: "a fish's print in rock", bonefossil: "bone turned to stone" } } },
    "science-sapling-p2": { title: "Change just one thing", words: {
      q: {
        plantlight: ["We want to see whether a plant needs light. Which test is fair?", "Two same pots with the same water: one in the light, one in the dark",
          "One in the light with lots of water, one in the dark with none", "A big pot in the light, a small pot in the dark"],
        plantwater: ["We want to see whether more water makes a plant taller. Which is fair?", "Two same pots by the window: one with a little water, one with more",
          "One by the window with lots of water, one in a cupboard with a little", "A bean and a wheat seed, with different amounts of water"],
        ramp: ["We want to see whether a higher ramp sends a car farther. Which is fair?", "The same car, once down a high ramp and once down a low ramp",
          "A big car down the high ramp, a small car down the low ramp", "Push it once, let go once, down two ramps"],
        magnet: ["We want to see which magnet is stronger. Which is fair?", "Hold both magnets near the same kind of clips and count how many each picks up",
          "Try one with clips and the other with a big nail", "Try one close up and the other from far away"],
        sugar: ["We want to see whether sugar dissolves faster in warm water or cold. Which is fair?", "One spoonful in each glass and the same stirring; only the water's warmth is different",
          "One spoonful in the warm water, two in the cold", "Stir the warm water, don't stir the cold"],
        ice: ["We want to see whether ice melts more slowly in wool or in foil. Which is fair?", "Two same-sized ice cubes side by side in one room: one in wool, one in foil",
          "A big ice cube in wool, a small one in foil", "The ice in wool in the fridge, the ice in foil by the heater"],
        bridge: ["We want to see whether a folded bridge is stronger than a flat one. Which is fair?", "Two same sheets over the same gap, with the same kind of coins",
          "The folded bridge with thick paper, the flat one with thin paper", "The folded bridge over a short gap, the flat one over a long gap"]
      } } },
    "science-sapling-p3": { title: "Guess and see", words: {
      guess: "Guess first, then see what happens.",
      n: { clipcard: "a clip behind a card", nailpaper: "an iron screw under paper", pinbook: "a pin on a thin book's cover", pencil: "pencil", coinplastic: "plastic button", eraser: "eraser",
        towel: "towel", sponge: "sponge", tissue: "tissue", bag: "plastic bag", foil: "foil", spoon: "metal spoon", salt: "salt", sugar: "sugar", sand: "sand",
        pebble: "pebble", rice: "rice" },
      q: {
        shadow: ["Guess: when is a tree's shadow longer?", "early morning", "noon"],
        noonshadow: ["Guess: at noon, when the sun is high in the sky, what is our shadow like?", "short", "very long"],
        tug: ["Guess: three children of the same size play tug-of-war against two. Which way does the rope go?", "towards the three", "towards the two"],
        seesaw: ["Guess: Dad sits at one end of the seesaw and a child at the other. Which side goes down?", "Dad's side", "the child's side"]
      } } },
    "science-sapling-p4": { title: "Read and measure", words: {
      ruler: "How many centimetres long is this pencil?", jug: "How many millilitres of water are in the jug?", jugSet: "Pour {v} millilitres of water into the jug.",
      therm: "How many degrees does the thermometer show?", thermSet: "Set the thermometer to {v} degrees.", heavier: "Which side is heavier?" } },
    "science-sapling-p5": { title: "Cycles and traits", words: {
      order: "Put the life cycle of the {name} in order from the start.", pairs: "Match each young one to its parent.",
      name: { frog: "frog", butterfly: "butterfly", hen: "hen", bean: "bean", tree: "apple tree" },
      n: { frogegg: "frog eggs", tadpole: "tadpole", froglet: "little frog", frog: "frog", butteregg: "butterfly egg", caterpillar: "caterpillar", chrysalis: "chrysalis",
        butterfly: "butterfly", hegg: "egg", hatch: "the chick hatches", chick: "chick", hen: "hen", seed: "bean seed", sprout: "sprout", plant: "bean plant", pod: "bean pod",
        pip: "apple pip", seedling: "seedling", blossom: "blossom", fruit: "apple", kitten: "kitten", cat: "cat", lamb: "lamb", sheep: "sheep", calf: "calf", cow: "cow",
        fawn: "maral fawn", maral: "maral deer", puppy: "puppy", dog: "dog", tree: "tree" } } },
    "science-sapling-p6": { title: "Iran's weather in charts", words: {
      title: { temp: "Average temperature in {month} (degrees)", rain: "Average rain in {month} (centimetres)" },
      most: { temp: "In {month}, which city is warmest?", rain: "In {month}, which city gets the most rain?" },
      least: { temp: "In {month}, which city is coldest?", rain: "In {month}, which city gets the least rain?" },
      read: { temp: "In {month}, what is the temperature in {city}?", rain: "In {month}, how many centimetres of rain fall in {city}?" },
      city: { tehran: "Tehran", rasht: "Rasht", bandar: "Bandar Abbas", shiraz: "Shiraz", tabriz: "Tabriz", yazd: "Yazd" },
      month: { far: "Farvardin", tir: "Tir", mehr: "Mehr", aban: "Aban", dey: "Dey" } } },
    "science-sapling-p7": { title: "Science words", words: {
      ask: { vertebrate: "“Vertebrate”: which one has a backbone?", amphibian: "Which one is an “amphibian”?", reptile: "Which one is a “reptile”?", mammal: "Which one is a “mammal”?",
        transparent: "“Transparent”: which one does light go right through?", source: "“Light source”: which one gives its own light?", compass: "Which one is a “compass”?",
        magnet: "Which one is a “magnet”?", habitat: "A “habitat” is where animals live. Which one is a habitat?", fossil: "“Fossil”: which one can become a fossil?",
        climate: "Where do we see the “climate” of cities?", gas: "“Gas”: which one is full of gas?", thermometer: "We measure temperature with a “thermometer”. Which one is it?",
        lever: "“Lever”: which one helps open a tight tin lid?" } } }
  });

  // ---- Practice: the sentence banks of science-seed-p5–p7, science-sprout-p6–p8, science-sapling-p8–p10 ----
  var FACTS_EN = {
    seed: {
      "seed-1": { t: ["A cat is alive; it eats and grows.", "A stone is not alive."], f: ["A ball is alive because it rolls."],
        p: [["A tree is alive,", "because it drinks water and grows."], ["A doll is not alive,", "because it doesn't eat or grow."]] },
      "seed-7": { t: ["A kitten grows into a cat.", "A small sapling slowly becomes a tree."], f: ["A ball grows bigger, like children do."],
        p: [["A baby", "grows and becomes a child."], ["When we plant a seed,", "it slowly becomes a plant."]] },
      "seed-2": { t: ["We hear sounds with our ears.", "We smell a flower with our nose."], f: ["We see colours with our tongue."],
        p: [["With our eyes", "we see the rainbow."], ["With our tongue", "we taste a lemon."]] },
      "seed-8": { t: ["We walk and run with our legs.", "We pick things up with our hands."], f: ["We eat food with our ears."],
        p: [["With our mouth", "we eat and talk."], ["Like a rabbit,", "we jump with our legs."]] },
      "seed-9": { t: ["A stone is hard and a pillow is soft.", "With our hands we can tell if something is rough or smooth."], f: ["Cotton wool is hard and rough."],
        p: [["We put a hand in the bag and", "guessed what it was just by touch."], ["A cup of hot tea", "is warm; ice is cold."]] },
      "seed-10": { t: ["Ears and sounds go together.", "Eyes and colours go together."], f: ["Nose and music go together."],
        p: [["The nose", "smells."], ["The hand", "feels soft and hard."]] },
      "seed-3": { t: ["A seed needs water to sprout.", "A plant needs light to grow."], f: ["A plant grows well without water."],
        p: [["We planted the seed and watered it,", "and it sprouted."], ["The root goes down into the soil and", "the stem comes up."]] },
      "seed-11": { t: ["Tree leaves come in many shapes.", "A plane-tree leaf is wide and a palm leaf is long and thin."], f: ["All leaves are the same shape."],
        p: [["A pomegranate tree", "gives pomegranates."], ["Grass, flowers and trees", "are all plants."]] },
      "seed-4": { t: ["A bee lives in a hive.", "A rabbit eats carrots and grass."], f: ["A fish builds a nest in a tree."],
        p: [["A bird", "builds a nest in a tree."], ["A cow", "eats grass."]] },
      "seed-12": { t: ["A hen's young is a chick.", "A sheep's young is a lamb."], f: ["A frog's young is a chick."],
        p: [["A frog", "has a tadpole that swims in water."], ["Mothers", "look after their young."]] },
      "seed-13": { t: ["We water the pot so it doesn't dry out.", "We watch an ant, but we don't hurt it."], f: ["Pulling off leaves helps a plant."],
        p: [["In summer, for the birds,", "we put out a dish of water."], ["If we don't water a flower,", "it wilts."]] },
      "seed-14": { t: ["A chick is a hen's young.", "A seed slowly becomes a flower."], f: ["A chair is alive."],
        p: [["A bee", "drinks nectar from flowers."], ["A rabbit", "lives in a burrow under the ground."]] },
      "seed-5": { t: ["On a rainy day we take an umbrella.", "On a snowy day we wear a hat and gloves."], f: ["On a very hot day we wear a thick coat."],
        p: [["The sky is cloudy and", "it might rain."], ["The wind blows and", "the leaves move."]] },
      "seed-15": { t: ["In the day the sun is in the sky.", "At night the moon and stars appear."], f: ["At night the sun is in the middle of the sky."],
        p: [["When it gets dark at night,", "we go to sleep."], ["In the morning the sun comes up and", "it gets light."]] },
      "seed-16": { t: ["Water pours from high to low.", "Wet clothes dry in the sun."], f: ["Water goes up a slide by itself."],
        p: [["A puddle in the sun", "slowly gets smaller."], ["If we tip a glass of water,", "the water pours out."]] },
      "seed-6": { t: ["Mix yellow and blue and you get green.", "Mix red and yellow and you get orange."], f: ["Mix red and blue and you get yellow."],
        p: [["Red and blue", "make purple."], ["First we guess,", "then we mix the colours."]] },
      "seed-17": { t: ["Ice melts in a warm hand.", "Water in the freezer turns to ice."], f: ["Butter gets harder in the sun."],
        p: [["If we leave ice cream out,", "it melts."], ["We put water in the freezer and", "it became ice."]] },
      "seed-18": { t: ["A watermelon is heavier than an apple.", "A feather is very light."], f: ["Big things are always heavy; a big balloon is heavy too."],
        p: [["We held two things in two hands and", "felt which was heavier."], ["An elephant", "is much bigger than a mouse."]] },
      "seed-19": { t: ["A ball is round and rolls.", "A book is flat and slides."], f: ["A brick rolls down a slope."],
        p: [["A round orange", "rolls down a slope."], ["First we guessed,", "then we tried it."]] },
      "seed-20": { t: ["We push a swing to move it.", "We pull a drawer to open it."], f: ["A gentle push sends a ball farther than a hard push."],
        p: [["If we throw a ball hard at a wall,", "it bounces back."], ["If we push a trolley,", "it starts to move."]] },
      "seed-21": { t: ["Thunder is loud.", "A whisper is a quiet sound."], f: ["An ant's footsteps are very loud."],
        p: [["Cheep cheep", "is a sparrow's sound."], ["The kettle's whistle", "says the water is boiling."]] },
      "seed-22": { t: ["A tower with a wide bottom stands better.", "If the tower falls, we build it again."], f: ["A tower with a narrow bottom is stronger."],
        p: [["We put the big blocks at the bottom and", "the tower was steady."], ["The tower leaned too far and", "fell over."]] },
      "seed-23": { t: ["A ball rolls; a book slides.", "We shut a door by pushing it."], f: ["A feather is heavier than a stone."],
        p: [["A drum", "makes a loud sound."], ["We pull", "a sled with a rope."]] },
      "seed-24": { t: ["A scientist looks carefully.", "First we guess, then we look."], f: ["A scientist never asks questions."],
        p: [["We looked at a leaf up close and", "saw its veins."], ["What we saw,", "we told a grown-up."]] }
    },
    sprout: {
      "sprout-7": { t: ["A magnifying glass makes small things look big.", "A scientist asks “why?” and tries things out."], f: ["A scientist never draws what they saw."],
        p: [["With a magnifying glass", "we saw an ant's legs."], ["First we guessed,", "then we tested whether we were right."]] },
      "sprout-10": { t: ["A bird flies with its wings.", "A fish swims with its fins."], f: ["A snake walks on its legs."],
        p: [["A frog, with its long legs,", "jumps."], ["An earthworm", "crawls along the ground."]] },
      "sprout-11": { t: ["A bird's body has feathers.", "A fish's body has scales."], f: ["A cat's body has scales."],
        p: [["A tortoise", "has a hard shell."], ["A sheep", "has wool and stays warm."]] },
      "sprout-12": { t: ["A rabbit is a plant-eater.", "A cheetah is a meat-eater and has sharp teeth."], f: ["A cow is a meat-eater."],
        p: [["An eagle's sharp beak", "is for tearing meat."], ["All animals", "need water and food."]] },
      "sprout-13": { t: ["A duck can swim and walk.", "A lizard's body has scales."], f: ["A pigeon swims and has scales."],
        p: [["A bee", "flies and drinks nectar from flowers."], ["A wolf", "is a meat-eater."]] },
      "sprout-1": { t: ["A plant's root is under the soil.", "A plant's flower later makes fruit and seeds."], f: ["A plant's root is above its leaves."],
        p: [["The root", "takes water from the soil."], ["The stem", "carries water to the leaves."]] },
      "sprout-14": { t: ["The bean in the dark pot grew pale and weak.", "A plant needs light to stay green."], f: ["A plant gets greener in the dark."],
        p: [["The pot that got no water", "wilted."], ["First we guessed,", "then we waited and looked."]] },
      "sprout-15": { t: ["A pomegranate has lots of seeds.", "A date has just one stone."], f: ["An apple has no seeds at all."],
        p: [["Of a carrot", "we eat the root."], ["If we plant a seed in soil,", "a new plant grows."]] },
      "sprout-16": { t: ["Lettuce is a plant's leaf.", "A plant needs water and light."], f: ["Seeds are not in fruit, they're in the root."],
        p: [["The flower", "makes fruit."], ["The leaf", "catches the sunlight."]] },
      "sprout-40": { t: ["Every day we write the weather in a chart.", "The chart tells us which weather came most often."], f: ["A weather chart shows only one day."],
        p: [["The taller column", "means more days."], ["We counted the sunny days and", "drew them in the chart."]] },
      "sprout-41": { t: ["The forecast tells us what tomorrow will be like.", "If the forecast says snow, we get warm clothes ready."], f: ["The forecast is only given after the rain."],
        p: [["The forecast said strong wind is coming,", "so we brought in the light things from the balcony."], ["The forecast said rain is coming,", "so we took an umbrella."]] },
      "sprout-28": { t: ["A harder push sends a ball faster and farther.", "A push from the side changes the ball's direction."], f: ["A rolling ball never stops."],
        p: [["We put a hand in front of the ball and", "it stopped."], ["We pushed the car gently,", "and it went a little way."]] },
      "sprout-29": { t: ["A swing goes forward and back.", "A spinning top turns round and round."], f: ["A slide spins round and round."],
        p: [["A ball down a slope", "rolls."], ["A child on a slide", "slides down."]] },
      "sprout-33": { t: ["A stone in the sun is warmer than one in the shade.", "The sun warms water."], f: ["The shade is warmer than the sun."],
        p: [["We made shade for the toy,", "so it wouldn't get hot."], ["A dish of water in the sun", "got warm."]] },
      "sprout-35": { t: ["Ants dig nests under the soil.", "A tree root can crack a stone."], f: ["Animals never change the places they live."],
        p: [["With twigs, a bird", "builds a nest."], ["People", "build houses and dams."]] },
      "sprout-18": { t: ["Iran is dry, so we must save water.", "We turn off the tap while brushing our teeth."], f: ["A running hose uses less water than a bucket."],
        p: [["We washed the car with a bucket,", "and used less water."], ["The tap was dripping,", "so we turned it off tight."]] },
      "sprout-36": { t: ["A plastic bottle goes in the plastic bin.", "A jam jar can be used again."], f: ["Fruit peel goes in the glass bin."],
        p: [["Newspaper", "goes in the paper bin."], ["The empty box", "became a toy box."]] },
      "sprout-30": { t: ["Before building, we draw a plan.", "We test the boat and make it better."], f: ["Builders never test anything."],
        p: [["A foil boat with sides", "held more pebbles."], ["The boat sank,", "so we built it again."]] },
      "sprout-2": { t: ["Water freezes into ice in the cold.", "Ice melts in the warmth."], f: ["Ice gets harder in the sun."],
        p: [["If we heat water,", "it turns into vapour."], ["If we put water in the freezer,", "it becomes ice."]] },
      "sprout-24": { t: ["Hot tea slowly cools down.", "A flask keeps tea warm."], f: ["A blanket makes us cold."],
        p: [["In winter", "woolly clothes keep us warm."], ["A glass of hot milk on the table", "slowly cooled."]] },
      "sprout-25": { t: ["A stone is a solid and keeps its shape.", "Water is a liquid and takes the shape of the glass."], f: ["Water keeps its own shape in any container."],
        p: [["Sand can be poured,", "but each grain is a solid."], ["We poured milk into a bowl and", "it took the bowl's shape."]] },
      "sprout-3": { t: ["A piece of wood floats on water.", "A stone sinks in water."], f: ["A key floats on water."],
        p: [["A leaf", "floats on water."], ["A coin", "sinks to the bottom."]] },
      "sprout-17": { t: ["Sea water is salty.", "River and spring water is fresh."], f: ["We can drink sea water just as it is."],
        p: [["A qanat", "brings underground water to the village."], ["River water", "reaches the tap at home through pipes."]] },
      "sprout-19": { t: ["Air fills a balloon.", "We can't see air, but it's everywhere."], f: ["An empty bag has no air in it."],
        p: [["We pushed a cup upside down into water,", "and the inside stayed dry."], ["We let the air out of the balloon and", "it shot away."]] },
      "sprout-20": { t: ["Wind is moving air.", "The wind turns a pinwheel."], f: ["The wind makes wet washing wetter."],
        p: [["The wind", "carries dandelion seeds far away."], ["On a windy day", "the washing dries faster."]] },
      "sprout-21": { t: ["Rocks come in many colours and sizes.", "Turquoise from Neyshabur is a beautiful blue stone."], f: ["All rocks are the same colour."],
        p: [["The harder stone", "scratches the softer one."], ["With stone, people", "build houses and bridges."]] },
      "sprout-22": { t: ["Soil has tiny bits of rock and pieces of leaves.", "Earthworms help the soil."], f: ["Soil is made only of water."],
        p: [["We shook soil and water in a jar and", "it settled in layers."], ["The heavy pebbles", "settled first, at the bottom."]] },
      "sprout-23": { t: ["Sea water is salty.", "Wind is just moving air."], f: ["Soil is alive and walks."],
        p: [["A balloon", "is full of air."], ["An earthworm", "lives in the soil."]] },
      "sprout-4": { t: ["In the morning the sun rises on one side of the sky.", "At noon the sun is high in the sky."], f: ["At night the sun is in the middle of the sky."],
        p: [["In the evening the sun", "goes down."], ["When it's day on the other side of the Earth,", "it's night here."]] },
      "sprout-32": { t: ["The moon's shape slowly changes over a month.", "After a full moon, the moon gets thin again."], f: ["The moon is the same shape every night."],
        p: [["The thin crescent", "slowly fills out."], ["In the moon diary", "we drew the moon's shape every night."]] },
      "sprout-5": { t: ["In autumn leaves turn yellow and fall.", "In spring trees blossom."], f: ["Winter is warmer than summer."],
        p: [["After winter", "comes spring."], ["In summer", "the days are longer and warmer."]] },
      "sprout-34": { t: ["The seasons come one after another and repeat.", "A full moon is round."], f: ["After spring comes winter."],
        p: [["After summer", "comes autumn."], ["The new moon", "slowly becomes a crescent."]] },
      "sprout-37": { t: ["In a completely dark room we see nothing.", "Light passes through glass."], f: ["Light passes through a wooden board."],
        p: [["We held a hand in front of the torch and", "a shadow fell."], ["Through thin paper", "a little light passes."]] },
      "sprout-38": { t: ["A drum shakes when it makes a sound.", "Vibration makes sound."], f: ["Things that make a sound never vibrate."],
        p: [["We put rice on the drum and hit it,", "and the rice jumped."], ["We twanged a ruler on the table and", "it made a sound."]] },
      "sprout-39": { t: ["We can send a message far away with a torch.", "Sound travels along the string of a cup telephone."], f: ["A cup telephone works better with a loose string."],
        p: [["We kept the string tight and", "heard the voice."], ["Two drumbeats", "mean “come!”"]] },
      "sprout-45": { t: ["Light passes through window glass.", "A guitar string vibrates when it makes a sound."], f: ["In complete darkness we see everything well."],
        p: [["We rang the bell and", "it shook and made a sound."], ["A wall doesn't let light through,", "so behind it is shadow."]] },
      "sprout-8": { t: ["Our heart pumps blood round the body.", "We breathe with our lungs."], f: ["Knees never bend."],
        p: [["After jumping,", "our heart beats faster."], ["Bones", "hold our body up."]] },
      "sprout-9": { t: ["First we were babies, then we became children.", "Our hand is bigger now than when we were babies."], f: ["Grandparents were never children."],
        p: [["A child", "grows into a teenager."], ["As we grow,", "we get taller."]] },
      "sprout-42": { t: ["A kitten looks like its parents.", "Kittens of one cat are not exactly the same."], f: ["A kitten looks like a hen."],
        p: [["Seeds from one plant", "grow into plants that look alike."], ["A lamb", "looks like its mother sheep."]] },
      "sprout-43": { t: ["A bird feeds its chicks.", "A hungry chick cheeps and opens its beak."], f: ["Parents never look after their young."],
        p: [["A hen", "keeps her chicks warm under her wing."], ["The lamb was scared and", "called for its mother."]] },
      "sprout-44": { t: ["Bike helmets copy a tortoise's shell.", "A cactus stores water in its stem."], f: ["Hook-and-loop fasteners were copied from stones."],
        p: [["Burrs", "stick to animals' fur."], ["People, from nature,", "get ideas."]] },
      "sprout-6": { t: ["A wooden spoon is made of wood.", "A key is made of metal."], f: ["A window is made of cloth."],
        p: [["A shirt", "is made of cloth."], ["A water bottle", "is made of plastic."]] },
      "sprout-26": { t: ["Plastic keeps water out.", "Glass is good for a window because light passes through."], f: ["Paper is the best material for a raincoat."],
        p: [["We poured water on a tissue and", "the water went through."], ["We stretched the rubber band and", "it got longer."]] },
      "sprout-27": { t: ["Milk is a liquid.", "A flask keeps tea warm."], f: ["Ice is a liquid."],
        p: [["A metal coin", "sinks in water."], ["A plastic bag", "holds water in."]] },
      "sprout-31": { t: ["Long ago people lit rooms with oil lamps.", "Today a washing machine washes clothes."], f: ["Long ago everyone travelled by car."],
        p: [["The old horse cart", "has given way to the car."], ["The oil lamp", "was replaced by the light bulb."]] }
    },
    sapling: {
      "sapling-9": { t: ["In a fair test we change only one thing.", "Everything else must stay the same."], f: ["In a fair test we change everything at once."],
        p: [["We gave each towel one spoonful of water,", "so the comparison was fair."], ["The towel that soaked up more water", "is better for drying."]] },
      "sapling-10": { t: ["We measure length with a ruler, in centimetres.", "We measure mass with a balance, in grams."], f: ["We start measuring from the middle of the ruler."],
        p: [["We measured twice", "to be sure."], ["The heavier pan of the balance", "goes down."]] },
      "sapling-11": { t: ["We measure how much water there is with a measuring jug.", "A thermometer shows how hot or cold it is."], f: ["A thermometer measures how long a table is."],
        p: [["The thermometer's red line went up,", "so it got warmer."], ["We read the water level", "from the front, at eye level."]] },
      "sapling-12": { t: ["We write the test results in a table.", "A graph shows which was more."], f: ["We don't write results down, so we can forget them."],
        p: [["The taller bar in a graph", "means a bigger number."], ["We wrote the result down", "to compare later."]] },
      "sapling-41": { t: ["Matter has three states: solid, liquid and gas.", "A gas fills all of its container."], f: ["The air inside a balloon is a solid."],
        p: [["The smell of fresh bread", "spread through the whole room."], ["Ice is a solid;", "water is a liquid."]] },
      "sapling-42": { t: ["A sponge soaks up water.", "Glass is see-through; light passes through it."], f: ["A plastic bag soaks up water like a towel."],
        p: [["For a roof", "we want a material that keeps water out."], ["A towel", "must soak up water well."]] },
      "sapling-43": { t: ["Ice melts and can be frozen again.", "A cooked egg can't become raw again."], f: ["Baked bread turns back into dough."],
        p: [["We put melted chocolate in the fridge and", "it went hard again."], ["We cooked the rice and", "it never became raw again."]] },
      "sapling-44": { t: ["A mud-brick wall is made of small pieces.", "Pieces can be taken apart and built into something new."], f: ["Something made of pieces can never be taken apart."],
        p: [["We took the toy-brick house apart and", "built a car."], ["With many mud bricks", "people build a tall wall."]] },
      "sapling-45": { t: ["Ice melting can be undone.", "A sponge soaks up water."], f: ["Steam is a solid."],
        p: [["Milk", "is a liquid."], ["Paper burning", "can't be undone."]] },
      "sapling-29": { t: ["Inside a bean seed there's a tiny plant.", "A seed needs water, warmth and air to sprout."], f: ["A seed sprouts faster in the fridge."],
        p: [["The seed coat", "protects the seed."], ["The seed's food store", "feeds the tiny plant."]] },
      "sapling-30": { t: ["Each week we measure the plant's height with a ruler.", "In the plant test we changed only the light."], f: ["For a fair comparison, we didn't water one pot and put the other in a cupboard."],
        p: [["The sunny pot", "grew taller and greener."], ["We wrote the plant's height", "in a table every week."]] },
      "sapling-36": { t: ["A bee carries pollen from flower to flower.", "The wind carries dandelion seeds far away."], f: ["Seeds never travel anywhere."],
        p: [["A bird ate the fruit and", "dropped its seed somewhere else."], ["A maple's winged seed", "spins far away."]] },
      "sapling-13": { t: ["Sugar dissolves in water.", "Oil stays on top of water."], f: ["Sand dissolves in water and disappears."],
        p: [["We stirred salt into water and", "it disappeared."], ["Water is scarce,", "so we must not waste it."]] },
      "sapling-14": { t: ["Sugar dissolves faster in warm water.", "Stirring helps sugar dissolve."], f: ["Sugar dissolves faster in ice-cold water than in warm."],
        p: [["We put one spoonful of sugar in each glass,", "so the test was fair."], ["We stirred the hot tea and", "the sugar lump dissolved quickly."]] },
      "sapling-1": { t: ["The sun warms water and it evaporates.", "Clouds are made of tiny drops of water."], f: ["Rain falls from the sun."],
        p: [["The cloud got heavy and", "it rained."], ["Rainwater", "goes back to rivers and the sea."]] },
      "sapling-15": { t: ["A qanat brings underground water to the village.", "River water collects behind a dam."], f: ["Most of Iran gets lots of rain."],
        p: [["In a village", "people take water from a well."], ["The dam's water", "reaches homes through pipes."]] },
      "sapling-16": { t: ["Trees catch dust from the air.", "Car fumes make the air dirty."], f: ["Water that went through a sand filter is safe to drink."],
        p: [["Rubbish was thrown in the river and", "the water got dirty."], ["Muddy water went through the filter and", "came out clearer."]] },
      "sapling-17": { t: ["Salt dissolves in water.", "Water warms, rises and becomes clouds."], f: ["Pouring oil into a gutter keeps water clean."],
        p: [["A cloud", "brings rain."], ["We put the rubbish in the bin", "to keep the water clean."]] },
      "sapling-2": { t: ["A magnet pulls a metal paper clip.", "A magnet doesn't pull a wooden pencil."], f: ["A magnet pulls an eraser."],
        p: [["Even through a card, a magnet", "pulls the clip."], ["An iron nail", "sticks to a magnet."]] },
      "sapling-18": { t: ["A north pole and a south pole pull each other.", "A compass needle points north."], f: ["Two north poles pull each other."],
        p: [["We stroked the clip with a magnet and", "the clip became a magnet too."], ["We moved a magnet over the rug and", "found the lost pin."]] },
      "sapling-3": { t: ["A shadow falls on the side away from the sun.", "At noon shadows are short."], f: ["Early in the morning shadows are shortest."],
        p: [["When the sun is low in the sky,", "the shadow is long."], ["Something blocked the light,", "so a shadow fell."]] },
      "sapling-19": { t: ["The sun and a lamp give their own light.", "The moon has no light of its own; it sends back sunlight."], f: ["Light comes out of our eyes and lights things up."],
        p: [["Light hit the apple and", "reached our eyes."], ["We switched off the lamp and", "couldn't see anything."]] },
      "sapling-20": { t: ["The Earth spins around itself.", "The side of the Earth facing the sun has day."], f: ["Night comes because the sun switches off."],
        p: [["The Earth turned and our house", "faced the sun: morning came."], ["The sun only seems to move;", "really, we turn with the Earth."]] },
      "sapling-21": { t: ["A stick's shadow can tell us the time.", "A shadow moves during the day."], f: ["A sundial works better on a cloudy day."],
        p: [["The next day at 9 in the morning", "the shadow fell on the first stone again."], ["At noon", "the stick's shadow was shortest."]] },
      "sapling-22": { t: ["A lit candle is a light source.", "A little light passes through thin paper."], f: ["A mirror makes its own light."],
        p: [["We moved our hand closer to the torch and", "the shadow got bigger."], ["In the evening the sun is in the west and", "shadows fall to the east."]] },
      "sapling-4": { t: ["The maral deer lives in the northern forests.", "The Iranian cheetah lives in the desert."], f: ["Dolphins live in the Lut desert."],
        p: [["The wild goat", "climbs the Zagros mountains."], ["Dolphins", "swim in the Persian Gulf."]] },
      "sapling-23": { t: ["Damavand is Iran's highest mountain.", "Snow is water as a solid."], f: ["The Lut desert is full of water and lakes."],
        p: [["The snow on the peak melted and", "a river began."], ["Lake Urmia", "has salty water."]] },
      "sapling-24": { t: ["Over thousands of years a river deepens a valley.", "Tree roots hold the soil."], f: ["A flood comes very slowly, over thousands of years."],
        p: [["The wind brought sand and", "slowly carved the kaluts."], ["On the bare hill", "the rain washed the soil away."]] },
      "sapling-57": { t: ["When Lake Urmia shrank, there were fewer brine shrimp.", "A flamingo can fly away to somewhere else."], f: ["Plants can walk away from danger."],
        p: [["The rivers' water was taken and", "the lake shrank."], ["People stopped wasting water and", "the lake filled up a little."]] },
      "sapling-5": { t: ["A push moves something away from us.", "A pull brings something towards us."], f: ["Pulling a sled moves it away from us."],
        p: [["We pushed the ball hard and", "it went a long way."], ["We pulled the drawer and", "it opened."]] },
      "sapling-25": { t: ["A bigger force makes a bigger change.", "A force can change a thing's shape."], f: ["When both tug-of-war sides are equally strong, the rope moves fast."],
        p: [["We pressed the dough hard and", "it got very flat."], ["Maryam kicked the ball the other way and", "it changed direction."]] },
      "sapling-26": { t: ["An apple falls because the Earth pulls it.", "A magnet can pull a clip without touching it."], f: ["A ball thrown up stays up for ever."],
        p: [["We rubbed the balloon on our hair and", "it pulled up bits of paper."], ["We threw the ball up and", "the Earth pulled it back down."]] },
      "sapling-27": { t: ["Heavy near the middle balances light far from the middle.", "A long handle makes lifting easier."], f: ["A short-handled spoon opens a tin more easily."],
        p: [["Dad sat near the middle of the seesaw and", "it was level."], ["We pushed the spoon handle down and", "the tin lid opened."]] },
      "sapling-28": { t: ["Pushing a trolley is a touching force.", "A leaf falling is a non-touching force."], f: ["Three against two pulls the rope towards the two."],
        p: [["One side got stronger and", "the rope moved towards it."], ["A magnet", "pulled the nail from a distance."]] },
      "sapling-6": { t: ["A frog starts as an egg, then becomes a tadpole.", "A caterpillar makes a chrysalis and becomes a butterfly."], f: ["A chick is first a hen, then becomes an egg."],
        p: [["The seed sprouted and", "the plant grew and flowered."], ["From the egg", "a chick hatched."]] },
      "sapling-31": { t: ["Young get their traits from their parents.", "A plant in the shade grows tall and pale."], f: ["All of one cat's kittens are exactly the same."],
        p: [["The bush had long thorns,", "so the goat didn't eat it."], ["The mother was orange and the father grey,", "so the kittens came in different colours."]] },
      "sapling-32": { t: ["A fish breathes with gills.", "A frog is an amphibian."], f: ["An earthworm has a backbone."],
        p: [["A toad lays its eggs in water and", "its young swims in the water."], ["The sturgeon", "lives in the Caspian Sea."]] },
      "sapling-33": { t: ["A bird has feathers and lays eggs.", "A bat is a mammal and feeds its baby milk."], f: ["A bat is a bird because it flies."],
        p: [["A lizard", "has dry, scaly skin."], ["A lamb", "drinks milk from its mother."]] },
      "sapling-35": { t: ["A snake is a reptile.", "A camel is a mammal."], f: ["A shark is a mammal because it swims."],
        p: [["An amphibian", "has soft, damp skin."], ["A bird", "is covered in feathers."]] },
      "sapling-34": { t: ["A stork builds its nest on top of a minaret.", "A bee-eater digs a tunnel in an earth wall."], f: ["A fox builds its den in a tree."],
        p: [["The bird sat on the eggs", "to keep them warm."], ["We saw a bird's nest and", "watched it from far away."]] },
      "sapling-56": { t: ["Wild goats have a lookout.", "In a hive every bee has a job."], f: ["Cranes fly alone, far apart from each other."],
        p: [["The lookout saw a leopard and", "the herd ran away."], ["Together, ants", "carried the big seed."]] },
      "sapling-55": { t: ["A fossil is the print of an animal or plant left in rock.", "Shell fossils are found in Iran's mountains."], f: ["A fossil forms in one day."],
        p: [["The mud over the shell hardened and", "turned to rock."], ["We found a shell fossil on a mountain,", "so there was once a sea there."]] },
      "sapling-7": { t: ["A food chain starts with a plant.", "A grasshopper eats grass."], f: ["A food chain starts with an owl."],
        p: [["A sparrow eats the grasshopper and", "an owl eats the sparrow."], ["A plant", "makes its food with sunlight."]] },
      "sapling-37": { t: ["Food gives us energy.", "Food gives the body materials to grow."], f: ["Our shoes grow with us."],
        p: [["Our feet grew,", "so last year's shoes got tight."], ["We ate breakfast and", "had energy to play."]] },
      "sapling-38": { t: ["A bee moves pollen around.", "Dolphins live in the Persian Gulf."], f: ["The sea food chain starts with the dolphin."],
        p: [["A squirrel buried a seed and", "a new tree grew."], ["A small fish eats tiny sea plants and", "a big fish eats the small fish."]] },
      "sapling-8": { t: ["Sound is made by vibrating.", "Sound travels through air, water and solids."], f: ["Sound only travels through air, never through a wall."],
        p: [["We put an ear to the table and", "heard the knock better."], ["We touched the string and", "it stopped shaking and the sound stopped."]] },
      "sapling-39": { t: ["A thin rubber band makes a high sound.", "A jar with more water makes a lower sound."], f: ["Pluck a band gently and the sound gets louder."],
        p: [["We plucked the band hard and", "the sound was loud."], ["The thick band shook slowly and", "made a low sound."]] },
      "sapling-51": { t: ["A thermometer shows the air temperature.", "Leaves moving tell us it's windy."], f: ["Noon is usually colder than early morning."],
        p: [["We wrote the temperature every day and", "drew a chart at the end of the week."], ["Tuesday's bar was the shortest,", "so that day was coldest."]] },
      "sapling-52": { t: ["Rasht is very rainy.", "Yazd is dry, with little rain."], f: ["Bandar Abbas has very cold, snowy winters."],
        p: [["Weather is what today is like;", "climate is what it's usually like each year."], ["We're going to Ardabil in winter,", "so we take warm clothes."]] },
      "sapling-53": { t: ["In hail we stay under a roof.", "Rows of trees hold back wind and dust."], f: ["When the river rises, we go next to it to watch."],
        p: [["The forecast said hail was coming,", "so we got ready."], ["A dust storm came,", "so we closed the windows."]] },
      "sapling-46": { t: ["Oil and gas come from deep in the Earth.", "Turning off the light in an empty room saves energy."], f: ["If oil runs out, more will form by tomorrow."],
        p: [["Gas comes through pipes", "to the heater at home."], ["We put on a jumper", "instead of turning up the heater."]] },
      "sapling-47": { t: ["Fruit peel on a compost heap becomes good soil.", "A washable cup makes less rubbish."], f: ["A paper plate goes in the glass bin."],
        p: [["We didn't throw away the glass bottle;", "we made it a flower pot."], ["A cloth shopping bag", "means fewer plastic bags."]] },
      "sapling-48": { t: ["Builders first ask what is needed.", "The folded paper bridge held more coins."], f: ["When the first bridge fell, we gave up."],
        p: [["We sketched the design on paper,", "then built it."], ["The bridge bent,", "so we improved it."]] },
      "sapling-49": { t: ["The ice in the woolly sock melted more slowly.", "Wool lets heat through slowly."], f: ["For a fair comparison we use one big and one small ice cube."],
        p: [["We tried two ways and", "timed how long the ice took to melt."], ["The ice in the metal cup", "melted sooner."]] },
      "sapling-50": { t: ["Long ago people cut wheat with a sickle.", "There are very old windmills in Nashtifan."], f: ["A water mill is turned by the wind."],
        p: [["They ground the wheat and", "it became flour."], ["The river's water", "turns the mill wheel."]] },
      "sapling-54": { t: ["In a fair test only one thing is different.", "We get our eye colour from our parents."], f: ["An apple falling is a touching force."],
        p: [["Rasht is rainy every year:", "that's Rasht's climate."], ["We dropped both balls from the same height", "so the test was fair."]] }
    }
  };
  [["seed", "science-seed-p5", "science-seed-p6", "science-seed-p7"], ["sprout", "science-sprout-p6", "science-sprout-p7", "science-sprout-p8"],
    ["sapling", "science-sapling-p8", "science-sapling-p9", "science-sapling-p10"]].forEach(function (g) {
    B.EN[g[1]] = { title: "True or false?", words: { ask: "Listen to each sentence. Is it true or false?", yes: "true", no: "false", f: FACTS_EN[g[0]] } };
    B.EN[g[2]] = { title: "Find the mistake", words: { ask: "One of these sentences is wrong. Which one?", f: FACTS_EN[g[0]] } };
    B.EN[g[3]] = { title: "Start and end", words: { ask: "Match the start of each sentence to its end.", f: FACTS_EN[g[0]] } };
  });
})();
