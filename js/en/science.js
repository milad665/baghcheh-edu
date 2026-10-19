/* باغچه — علوم (science and nature) lessons in English, for children learning English as a second language.
   Each entry lays English words over the Persian lesson with the same id (js/lessons/science.js); steps and lists
   are matched by position, {} leaves a step as it is. See js/english-mode.js. */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

(function () {
  var GUESS = { prompt: "Guess first, then try it!" };

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
    ] }
  });
})();
