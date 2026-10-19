/* باغچه — ایران و جهان (people, places and the past) lessons in English, for children learning English as a second
   language. Each entry lays English words over the Persian lesson with the same id (js/lessons/world.js); steps and
   lists are matched by position, {} leaves a step as it is. See js/english-mode.js. Iranian names and places stay as
   they are (sangak bread stays sangak bread); place names on maps come from each place's `en`. */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

(function () {
  var HOME = { title: "🏠 At home (for parents)", note: "Something simple to do together, away from the screen." };
  function home(s) { s.title = HOME.title; s.note = HOME.note; return s; }

  Object.assign(B.EN, {
    // ---------------- Seed ----------------
    "world-seed-1": { title: "Me and my family", steps: [
      { prompt: "Kian's family",
        scenes: [
          { caption: "This is Kian. He lives in Shiraz." },
          { caption: "These are Kian's mum and dad." },
          { caption: "This is Nazanin, Kian's little sister. Grandma lives with them too." },
          { caption: "In the morning, Dad makes breakfast." },
          { caption: "Nazanin drinks her milk." },
          { caption: "In the afternoon, Mum plays ball with Kian." },
          { caption: "At night, Grandma tells the children a story." },
          { caption: "Everyone eats dinner together. Enjoy!" }
        ] },
      { prompt: "Who did what?", say: "In Kian's family, who did what? Find the pairs.",
        pairs: [
          [{ say: "Dad" }, { say: "made breakfast" }],
          [{ say: "Mum" }, { say: "played ball" }],
          [{ say: "Grandma" }, { say: "told a story" }],
          [{ say: "Nazanin" }, { say: "drank milk" }]
        ] },
      { prompt: "Every family is different",
        scenes: [
          { caption: "This is Murad. He lives in Gonbad with his mum, dad, grandpa and grandma." },
          { caption: "This is Delaram. She lives in Rasht with her mum." },
          { caption: "This is Hamid. He lives in Ahvaz. He has two brothers and two sisters!" },
          { caption: "Families are different: small and big. But they all love each other." }
        ] },
      { caption: "Who is in your family? What do you do together?" },
      home({ text: "Draw your family!",
        need: ["paper", "crayons"],
        steps: [
          "Ask your child to draw everyone they think of as their family. Every family is different, and all of them are right.",
          "Next to each person, write their name, and your child says what they do with them: “I cook with Dad.”",
          "If you have a family photo, look at it together and ask: “Who is this? What did we do that day?”"
        ],
        ask: "What do you do at home for your family?" })
    ] },

    "world-seed-2": { title: "Our home from above", steps: [
      { prompt: "Let's look from above",
        scenes: [
          { caption: "This is Delaram's room. Look at the bed, the window, the wardrobe, the desk, the rug, the ball and the teddy." },
          { caption: "Delaram's cat jumped onto the desk first, then up onto the wardrobe." },
          { caption: "From up there, the cat looks down. It sees the bed, the ball and the teddy." },
          { caption: "Now we look from above too, like the cat. This is what the room looks like from above." },
          { caption: "From above, a ball looks like a circle and a rug looks like a rectangle." },
          { caption: "Delaram drew her room from above on paper. This is a map of the room!" }
        ] },
      { prompt: "This is a map of Delaram's room. Tap each thing to hear its name." },
      { say: "Find it on the map of Delaram's room.",
        tasks: [
          { prompt: "Where is the bed?" },
          { prompt: "Where is the ball?" },
          { prompt: "Where is the cat?" },
          { prompt: "Where do we come into the room?", say: "Where do we come into the room? Where is the door?" }
        ] },
      { say: "This is a map of Delaram's whole home, from above.",
        tasks: [
          { prompt: "Where do we cook food?", say: "Where do we cook food? Where is the kitchen?" },
          { prompt: "Where is the bathroom?" },
          { prompt: "Where is the yard?", say: "Where is the yard with the pool and the tree?" }
        ] },
      { prompt: "From above, what shape is a ball?", say: "If we look at a ball from above, what shape is it?",
        options: [{ value: "triangle" }, { value: "circle" }, { value: "square" }], answer: "circle" },
      home({ text: "Draw a map of your room!",
        need: ["a big sheet of paper", "crayons"],
        steps: [
          "Stand on a chair with your child (carefully) or look in from the door, and ask: “From above, what shape is the bed?”",
          "Help them draw the shape of the room on paper, then the bed, the door, the window and the rug, from above.",
          "Hide a toy in the room and mark its place on the map with a cross. Your child finds it with the map.",
          "Swap: your child hides it and marks the map."
        ],
        ask: "On your map, where is the door of the room?" })
    ] },

    "world-seed-3": { title: "Our neighbourhood", steps: [
      { prompt: "Around the neighbourhood with Hamid and Grandma",
        scenes: [
          { caption: "Hamid and Grandma came out of the house." },
          { caption: "First they went to the bakery." },
          { caption: "The baker bakes fresh bread." },
          { caption: "At the corner, Hamid took Grandma's hand." },
          { caption: "They crossed the street together." },
          { caption: "They walked past the school. The teacher said hello to Hamid." },
          { caption: "In the park, the gardener was watering the flowers." },
          { caption: "This is the clinic. The doctor helps people who are ill." },
          { caption: "This is Hamid's neighbourhood. What places are in your neighbourhood?",
            wait: { hint: "Tap the places in the neighbourhood!" } }
        ] },
      { prompt: "This is a map of a neighbourhood. Tap each place to hear its name." },
      { prompt: "Who works where?", say: "Who works where? Find the pair.",
        pairs: [
          [{ say: "baker" }, { say: "bakery" }],
          [{ say: "teacher" }, { say: "school" }],
          [{ say: "doctor" }, { say: "clinic" }],
          [{ say: "gardener" }, { say: "park" }]
        ] },
      { prompt: "Where do we go for each thing?",
        say: "Where do we go for each thing? The bakery, the clinic or the park?",
        baskets: [{ label: "bakery" }, { label: "clinic" }, { label: "park" }],
        items: [
          { say: "to buy barbari bread" },
          { say: "to buy sangak bread" },
          { say: "we have a fever" },
          { say: "to get a vaccine" },
          { say: "to go on the slide" },
          { say: "to fly a kite" }
        ] },
      { prompt: "Who did Hamid cross the street with?", say: "When we cross the street, whose hand do we hold?",
        options: [{ value: "a cat" }, { value: "a grown-up" }, { value: "a doll" }], answer: "a grown-up" },
      home({ text: "Walk around your neighbourhood and name the places.",
        need: ["comfortable shoes", "if you like: paper and a pencil for drawing"],
        steps: [
          "Walk with your child in your street and neighbourhood. Name every place you see: the bakery, the school, the park, the corner shop, the pharmacy, the bus stop.",
          "In a village, do the same: the spring, the farm, the school, the neighbour's house.",
          "Ask: “Who works here? Why do we come here?”",
          "Stop at the corner of the street and practise crossing carefully together: “First we look, and we hold a grown-up's hand.”"
        ],
        ask: "Which place in your neighbourhood do you like best? Why?" })
    ] },

    "world-seed-4": { title: "The way from home to the bakery", steps: [
      { prompt: "Pariya and Grandpa buy bread",
        scenes: [
          { caption: "Pariya and Grandpa want to buy bread." },
          { caption: "First they walk past the park." },
          { caption: "They stop at the corner. Pariya holds Grandpa's hand." },
          { caption: "Is a car coming? Now they cross." },
          { caption: "They buy apples at the fruit shop." },
          { caption: "They have reached the bakery. Hot bread!" },
          { caption: "The bakery is far from Pariya's home. The park is near." }
        ] },
      { say: "Walk with Pariya.",
        tasks: [{ prompt: "From home go to the park, then the fruit shop, then the bakery.",
          say: "Start at home. First go to the park, then the fruit shop, then the bakery." }] },
      { prompt: "Which places did Pariya pass, in order?", say: "Where was Pariya first? Where did she go next? Put them in order.",
        items: [{ say: "home" }, { say: "park" }, { say: "fruit shop" }, { say: "bakery" }] },
      { tasks: [{ prompt: "Go from home to school. Pass the clinic on the way.",
        say: "Start at home. Walk past the clinic and go to school." }] },
      { say: "Near and far.",
        tasks: [
          { prompt: "Which is nearer to home: the clinic or the bakery?", say: "Which is nearer to home? The clinic or the bakery? Tap it." },
          { prompt: "Which is farther from home: the park or the school?", say: "Which is farther from home? The park or the school? Tap it." }
        ] },
      home({ text: "Walk the way from home to the bakery together, then draw it.",
        need: ["paper", "crayons"],
        steps: [
          "When you go to the bakery, the shop or school, ask your child: “Where are we passing now? What will we see next?”",
          "At home, your child draws the way on paper: home on one side, the bakery on the other, and the things they saw in between.",
          "Ask: “Which is nearer, the bakery or the school? How do you know?”"
        ],
        ask: "What do we do when we cross the street?" })
    ] },

    "world-seed-5": { title: "Nowruz", steps: [
      { prompt: "Shilan's Nowruz",
        scenes: [
          { caption: "Winter is over. Spring has come and the trees are in blossom." },
          { caption: "Nowruz is near. Shilan and her mum and dad are cleaning the house: spring cleaning!",
            wait: { hint: "Now you help: rub the window left and right to clean it!" } },
          { caption: "Two weeks ago Shilan soaked some lentils. Now the sabzeh has grown green." },
          { caption: "They laid the haft-sin table: sabzeh, apples, garlic, a coin, hyacinths… and a mirror." },
          { caption: "The new year has begun! Everyone says: “Happy Nowruz!”" },
          { caption: "They visited Grandma and Grandpa. Grandpa gave Shilan a Nowruz present." },
          { caption: "In Iran and the countries around it, many people celebrate Nowruz." }
        ] },
      { prompt: "Find the matching haft-sin cards",
        pairs: [
          [{ say: "sabzeh" }, { say: "sabzeh" }],
          [{ say: "apple" }, { say: "apple" }],
          [{ say: "garlic" }, { say: "garlic" }],
          [{ say: "coin" }, { say: "coin" }]
        ] },
      { prompt: "Which ones go on the haft-sin table?",
        say: "Which ones go on the haft-sin table? In Persian, their names start with the sound “s”: sib, sir, sonbol.",
        baskets: [{ label: "haft-sin" }, { label: "somewhere else" }],
        items: [{ say: "apple (sib)" }, { say: "garlic (sir)" }, { say: "hyacinth (sonbol)" }, { say: "ball" }, { say: "shoe" }, { say: "carrot" }] },
      { prompt: "Which season is Nowruz in?", say: "Which season is Nowruz in?",
        options: [{ value: "winter" }, { value: "spring" }, { value: "autumn" }], answer: "spring" },
      { caption: "What is Nowruz like in your family? Who do you visit?" },
      home({ text: "Help your family get ready for Nowruz.",
        need: ["a drawer or a toy shelf", "if Nowruz is near: a plate of lentils or wheat for sabzeh"],
        steps: [
          "Tidy a drawer or a toy shelf with your child: their own little spring clean.",
          "If Nowruz is near, grow sabzeh together and water it every day.",
          "Ask Grandpa and Grandma (or call them) what Nowruz was like when they were children: where they went and what they played."
        ],
        ask: "What do you love about Nowruz?" })
    ] },

    "world-seed-6": { title: "Games of Iran's children", steps: [
      { prompt: "Children play everywhere in Iran",
        scenes: [
          { caption: "Sara plays hopscotch (lay-lay) in her street in Tehran. She hops on one foot!" },
          { caption: "Aydin and his friend play haft-sang in Tabriz. They stack seven flat stones…" },
          { caption: "…and knock them down with a ball! Then they quickly stack them again." },
          { caption: "Golpari in Khorramabad plays yeh-ghol-do-ghol with five pebbles." },
          { caption: "Yusuf and his friends play hide-and-seek by the sea in Chabahar. One closes their eyes and counts to ten." },
          { caption: "These games may have different names in each city and language. But children everywhere love to play!" }
        ],
        question: "In haft-sang, what do they knock the stones down with?",
        options: [{ value: "a kite" }, { value: "a ball" }, { value: "a doll" }], answer: "a ball" },
      {},
      { text: "Let's play hopscotch!",
        list: ["Draw a few squares in a row on the ground with chalk or tape.", "Throw a small stone or a button into the first square.", "Hop over the squares on one foot and come back.", "Play where the floor is not slippery."] },
      { text: "Play hide-and-seek!",
        list: ["One person closes their eyes and counts to ten.", "Everyone else hides.", "Never hide in a cupboard, a chest, a fridge or a car.", "Found you!"] },
      { text: "Haft-sang at home!",
        list: ["Stack seven paper cups or empty tins.", "From a little way off, knock them down with a soft ball.", "Now stack them again. How many times did you do it?"] }
    ] },

    "world-seed-7": { title: "Children of the world", steps: [
      { prompt: "Four friends from four places in the world",
        scenes: [
          { caption: "This is Aylar. She lives in Tabriz, in Iran." },
          { caption: "This is Haruto, from Japan. This is Wanjiru, from Kenya. This is Pedro, from Brazil." },
          { caption: "They all eat with their families." },
          { caption: "They all go to school and have friends." },
          { caption: "They all love to play: ball games, hopscotch, hide-and-seek!" },
          { caption: "They all laugh." },
          { caption: "Sometimes they cry too." },
          { caption: "At night they get sleepy. Many things about them are the same." }
        ] },
      { prompt: "Some things are different",
        parts: { t1: { art: "Salaam!" }, t2: { art: "Konnichiwa!" }, t3: { art: "Habari!" }, t4: { art: "Olá!" } },
        scenes: [
          { caption: "Aylar's breakfast is bread and cheese." },
          { caption: "Haruto's breakfast is rice and soup." },
          { caption: "Pedro's breakfast is bread and bananas." },
          { caption: "Haruto walks to school with the children from his street. Wanjiru goes by school bus." },
          { caption: "In Pedro's city, Rio, it is warm most of the time. In Tabriz, it snows in winter!" },
          { caption: "Each one says hello in their own language: “Salaam!”, “Konnichiwa!”, “Habari!”, “Olá!”" }
        ],
        question: "What was Haruto's breakfast?",
        options: [{ value: "bread and cheese" }, { value: "rice and soup" }, { value: "bread and bananas" }], answer: "rice and soup" },
      { prompt: "The same or different?",
        say: "Is this the same for all the children in the world, or is it different in each place?",
        baskets: [{ label: "all children" }, { label: "different in each place" }],
        items: [{ say: "sleeping" }, { say: "laughing" }, { say: "loving to play" }, { say: "the language they speak" }, { say: "what they eat for breakfast" }, { say: "the weather in their city" }] },
      { prompt: "Who? What?", say: "Do you remember? Match each child with something from the story.",
        pairs: [
          [{ say: "Aylar, from Tabriz" }, { say: "winter snow" }],
          [{ say: "Haruto, from Japan" }, { say: "rice for breakfast" }],
          [{ say: "Wanjiru, from Kenya" }, { say: "the school bus" }],
          [{ say: "Pedro, from Brazil" }, { say: "warm weather" }]
        ] },
      { caption: "If you had a friend on the other side of the world, what would you ask them? What would you tell them about yourself?" }
    ] },

    "world-seed-8": { title: "Home and neighbourhood game", steps: [
      { prompt: "Who works where? Turn the cards over",
        say: "Turn the cards over. Match each person with the place where they work.",
        pairs: [
          [{ say: "baker" }, { say: "bakery" }],
          [{ say: "teacher" }, { say: "school" }],
          [{ say: "doctor" }, { say: "clinic" }],
          [{ say: "gardener" }, { say: "park" }]
        ] },
      { prompt: "Which room is each thing in?",
        say: "Take each thing to its room: the kitchen, the bedroom or the bathroom.",
        baskets: [{ label: "kitchen" }, { label: "bedroom" }, { label: "bathroom" }],
        items: [{ say: "spoon" }, { say: "plate" }, { say: "doll" }, { say: "pillow and blanket" }, { say: "toothbrush" }, { say: "soap" }] },
      { prompt: "A day with the family", say: "A day with the family: what do we do first? What next? Put them in order.",
        items: [{ say: "breakfast" }, { say: "school" }, { say: "play" }, { say: "sleep" }] },
      { prompt: "Nowruz in order", say: "What do we do first for Nowruz? Put them in order: spring cleaning, the haft-sin table, then visiting family.",
        items: [{ say: "spring cleaning" }, { say: "the haft-sin table" }, { say: "visiting family" }] },
      { prompt: "Where do we go for each thing?",
        say: "Where do we go for each thing? The fruit shop, the school or the park?",
        baskets: [{ label: "fruit shop" }, { label: "school" }, { label: "park" }],
        items: [{ say: "to buy oranges" }, { say: "to buy a watermelon" }, { say: "to study" }, { say: "to learn to write" }, { say: "to go on the slide" }, { say: "to see the ducks" }] }
    ] },

    // ---------------- Sprout ----------------
    "world-sprout-1": { title: "City and village", steps: [
      { prompt: "Niloofar lives in a city",
        scenes: [
          { caption: "This is Niloofar. She lives in the city of Mashhad." },
          { caption: "Niloofar's home is in a tall building. The city has lots of tall buildings." },
          { caption: "Niloofar's mum drives a metro train. Her dad is a bus driver." },
          { caption: "There are lots of shops in the city. The cars are waiting at the red light." },
          { caption: "In the morning, Niloofar walks to school." },
          { caption: "In the afternoon, Niloofar plays ball in the park." }
        ] },
      { prompt: "Zhiyar lives in a village",
        scenes: [
          { caption: "This is Zhiyar. He lives in a village in Kurdistan. The village is next to a mountain." },
          { caption: "This is Zhiyar's house. Its yard has trees and flowers." },
          { caption: "Zhiyar's grandpa is a farmer. He has a wheat field and a tractor." },
          { caption: "Grandma has baked fresh bread. They have sheep and a cow too." },
          { caption: "Zhiyar walks to the village school. Their school is small." },
          { caption: "Niloofar is in the city and Zhiyar is in a village. They both go to school and they both love playing ball." }
        ],
        question: "What does Zhiyar's grandpa do?",
        options: [{ value: "bus driver" }, { value: "farmer" }, { value: "shopkeeper" }], answer: "farmer" },
      { prompt: "City, village or both?",
        say: "Where do we usually see these? In a city, in a village, or in both?",
        baskets: [{ label: "city" }, { label: "village" }, { label: "both" }],
        items: [{ say: "the metro" }, { say: "a very tall building" }, { say: "a wheat field" }, { say: "a flock of sheep" }, { say: "a school" }, { say: "fresh bread" }] },
      { prompt: "Who works with what?", say: "Who works with what? Find the pair.",
        pairs: [
          [{ say: "farmer" }, { say: "tractor" }],
          [{ say: "bus driver" }, { say: "bus" }],
          [{ say: "baker" }, { say: "bread" }],
          [{ say: "shepherd" }, { say: "sheep" }]
        ] },
      { caption: "Do you live in a city or a village? What do you like about where you live? Where would you like to go one day?" }
    ] },

    "world-sprout-2": { title: "What is a map?", steps: [
      { prompt: "From a picture to a map",
        scenes: [
          { caption: "This is Setareh. She lives in a village." },
          { caption: "In Setareh's village there are houses, an orchard, a school and a spring." },
          { caption: "If we look from above, like a bird, the village looks like this." },
          { caption: "Drawing a picture of every house on a map is hard. So on a map, instead of a house, we draw a red square." },
          { caption: "For a tree, a green circle. For the school, a star. For water, a blue circle. We call these “symbols”." },
          { caption: "Next to the map is the “map key”. The key tells us what each symbol means." },
          { caption: "Setareh reads the map with the key: “This star is the school!”" }
        ] },
      { prompt: "This is a picture of Setareh's village from above. Tap each place to hear its name." },
      { say: "This map is the same village, with symbols. Look at the map key.",
        tasks: [
          { prompt: "Where is the school? Look in the key to see the symbol for school.", say: "Where is the school? The symbol for school is a star." },
          { prompt: "Where is the spring?", say: "Where is the spring? The symbol for water is a blue circle." },
          { prompt: "Where is the bakery?", say: "Where is the bakery? Look in the map key for the bakery's symbol." },
          { prompt: "Where is the health house?", say: "Where is the health house? Look at the map key." }
        ] },
      { prompt: "Each thing and its symbol", say: "Match each thing with its symbol on the map.",
        pairs: [
          [{ say: "house" }, { say: "red square" }],
          [{ say: "tree" }, { say: "green circle" }],
          [{ say: "school" }, { say: "star" }],
          [{ say: "spring" }, { say: "blue circle" }]
        ] },
      { prompt: "On Setareh's map, what does ➕ mean?", say: "On Setareh's map, what does the plus symbol mean?",
        options: [{ value: "school" }, { value: "health house" }, { value: "bakery" }], answer: "health house" },
      home({ text: "Draw a map of your street with symbols!",
        need: ["paper", "crayons"],
        steps: [
          "Walk with your child in your street or yard and see what is there: houses, trees, shops, lamp posts.",
          "At home, your child chooses a simple symbol for each thing: for example, a green circle for a tree.",
          "They draw the map, and in the corner you write a “map key”: each symbol and what it means.",
          "Ask someone else at home to read the map with the key and say where the trees are."
        ],
        ask: "Why do we draw symbols on a map instead of pictures?" })
    ] },

    "world-sprout-3": { title: "North, south, east, west", steps: [
      { prompt: "Which side does the sun come up on?",
        parts: { tE: { art: "east" }, tW: { art: "west" }, tN2: { art: "north" }, tS2: { art: "south" }, tE2: { art: "east" }, tW2: { art: "west" } },
        scenes: [
          { caption: "It is early morning. Arash is standing in the yard. The sun is still low." },
          { caption: "The sun comes up on this side. We call this side “east”." },
          { caption: "At noon, the sun is high in the sky." },
          { caption: "In the evening, the sun goes down on that side. We call that side “west”." },
          { caption: "It is night. The sun has gone and the moon has come out." },
          { caption: "On a map, north is at the top and south at the bottom. East is on the right and west on the left." },
          { caption: "A compass needle always points north." }
        ] },
      { say: "The top of this picture is north, like a map.",
        tasks: [
          { prompt: "Turn to face north." },
          { prompt: "Now turn to face east." },
          { prompt: "Turn to face south." },
          { prompt: "Turn to face west." }
        ] },
      { tasks: [
        { prompt: "It is morning and the sun is coming up. Turn to face the sun!", say: "It is morning and the sun is coming up. Turn to face the sun!" },
        { prompt: "It is noon. Where is the sun? Turn to face it." },
        { prompt: "It is evening and the sun is going down. Turn to face the sun." }
      ] },
      { prompt: "Which side does the sun come up on?", say: "In the morning, which side does the sun come up on?",
        options: ["north", "east", "west"], answer: "east" },
      { say: "Like a compass: we only know where north is.",
        tasks: [
          { prompt: "North is at the top. Where is east? Turn to face east.", say: "North is at the top. Where is east? Remember? Facing north, east is on your right hand." },
          { prompt: "Now turn to face west." },
          { prompt: "Where is south? Turn to face south." }
        ] },
      { prompt: "If you stand facing north, which side is east?", say: "If you stand facing north, which side is east?",
        options: [{ value: "left hand" }, { value: "right hand" }, { value: "behind you" }], answer: "right hand" },
      home({ text: "Find north, south, east and west at home!",
        need: ["four sheets of paper", "a pencil", "sticky tape"],
        steps: [
          "In the morning, look with your child from a window or in the yard to see where the sun has come up: that side is east.",
          "Write north, south, east and west on four sheets. Your child sticks “east” on the wall on the sun's side.",
          "Stand facing north (east is on the right) and stick up the others together.",
          "Play: “Turn to face west!”, “Which side is the window on?” If you have a compass or a phone, try its compass too."
        ],
        ask: "In the evening, which window of your home can you see the sun from?" })
    ] },

    "world-sprout-4": { title: "Iran on the map", steps: [
      { prompt: "This is a map of Iran. Look at its shape: some people say it looks like a sitting cat! Tap Iran and the seas." },
      { say: "Iran has seas: in the north and in the south.",
        tasks: [
          { prompt: "The Caspian Sea is in the north of Iran. Find it." },
          { prompt: "The Persian Gulf is in the south of Iran. Find it." },
          { prompt: "The Sea of Oman is in the south too, next to the Persian Gulf, towards the east. Find it." }
        ] },
      { say: "These red dots are some of Iran's big cities.",
        tasks: [
          { prompt: "Where is Tehran, the capital of Iran?", say: "Where is Tehran, the capital of Iran? It is a little below the Caspian Sea." },
          { prompt: "Rasht is by the Caspian Sea. Find it." },
          { prompt: "Ahvaz is in the south-west of Iran, near the Persian Gulf. Find it." },
          { prompt: "Mashhad is in the north-east of Iran. Find it." }
        ] },
      { prompt: "Iran has 31 provinces. Tap a few provinces to hear their names." },
      { tasks: [
        { prompt: "Find your own province and tap it.",
          say: "Which province do you live in? Find it and tap it. If you don't know, ask your mum or dad. If you don't live in Iran, find the province your family comes from." }
      ] },
      home({ text: "Find Iran on a globe or in an atlas!",
        need: ["a globe, an atlas or a wall map (or a map on a phone)"],
        steps: [
          "Find Iran on the globe or map with your child. First show the Caspian Sea and the Persian Gulf; Iran is between them.",
          "Find your own city or village. If it is too small to be on the map, say which city it is near.",
          "If you live in another country, find that country too and trace the way from there to Iran with a finger.",
          "Ask: “Which side of Iran is the Caspian Sea on? North or south?”"
        ],
        ask: "What does the shape of Iran on the map remind you of?" })
    ] },

    "world-sprout-5": { title: "Festivals of the year", steps: [
      { prompt: "One year, five festivals",
        scenes: [
          { caption: "The new year begins on the first day of spring: Nowruz!" },
          { caption: "The thirteenth day of Farvardin is Sizdah Bedar, a day out in the fields and orchards. The children play ball by the picnic." },
          { caption: "In autumn, in the month of Mehr, comes Mehregan: a festival of kindness and autumn fruit." },
          { caption: "The last night of autumn is Yalda night: the longest night of the year. The family sits together. There is watermelon and a book of poems." },
          { caption: "The last Tuesday night of the year is Chaharshanbe Suri. The grown-ups have lit a small fire. The children bang spoons on bowls: ghashogh-zani!" },
          { caption: "Firecrackers are dangerous. Children stay with grown-ups and away from the fire." },
          { caption: "Then spring comes again, and Nowruz. The year goes round!" }
        ] },
      { prompt: "The festivals in the order of the year", say: "Start with Nowruz. Put the festivals in the order they come in the year.",
        items: [{ say: "Nowruz" }, { say: "Sizdah Bedar" }, { say: "Mehregan" }, { say: "Yalda night" }, { say: "Chaharshanbe Suri" }] },
      { prompt: "Each festival and what we do", say: "What do we do at each festival? Find the pair.",
        pairs: [
          [{ say: "Nowruz" }, { say: "the haft-sin table" }],
          [{ say: "Sizdah Bedar" }, { say: "going out to the fields and orchards" }],
          [{ say: "Yalda night" }, { say: "poems and stories on the longest night" }],
          [{ say: "Chaharshanbe Suri" }, { say: "spoon-banging" }]
        ] },
      { prompt: "At Chaharshanbe Suri, what is the right thing to do?", say: "At Chaharshanbe Suri, what is the right thing to do?",
        options: [{ value: "playing with firecrackers" }, { value: "staying with grown-ups" }, { value: "lighting a fire alone" }], answer: "staying with grown-ups" },
      { prompt: "What kind of night is Yalda night?", say: "What kind of night is Yalda night?",
        options: ["the shortest night of the year", "the longest night of the year", "the first night of spring"], answer: "the longest night of the year" },
      { caption: "Which festival do you like best? How does your family celebrate?" }
    ] },

    "world-sprout-6": { title: "Hello in the languages of Iran", steps: [
      { prompt: "Salaam! Sagh ol! Supas!",
        scenes: [
          { caption: "In Iran, people speak many languages. Meet these friends!" },
          { caption: "Aylar in Tabriz speaks Azerbaijani Turkish. She says hello: «سلام» (salaam) and thank you: «ساغ اول» (sagh ol).",
            say: "Aylar in Tabriz speaks Azerbaijani Turkish. See how she says hello and thank you." },
          { caption: "Zhiyar in Sanandaj speaks Kurdish. He says hello: «سڵاو» (slaw) and thank you: «سوپاس» (supas).",
            say: "Zhiyar in Sanandaj speaks Kurdish. See how he says hello and thank you." },
          { caption: "Reem in Ahvaz speaks Arabic. She says hello: «مرحبا» (marhaba) and thank you: «شکراً» (shukran).",
            say: "Reem in Ahvaz speaks Arabic. See how she says hello and thank you." },
          { caption: "Murad in Gonbad speaks Turkmen. He says hello: «سلام» (salaam) and thank you: «ساغ بول» (sagh bol).",
            say: "Murad in Gonbad speaks Turkmen. See how he says hello and thank you." },
          { caption: "Mahgol in Chabahar speaks Balochi. She says hello: «سلام» (salaam) and thank you: «منّت‌وار» (minnatwar).",
            say: "Mahgol in Chabahar speaks Balochi. See how she says hello and thank you." },
          { caption: "Ani in Isfahan speaks Armenian too. Armenian has its own alphabet. Hello: «Բարև» (barev), thank you: «Շնորհակալություն» (shnorhakalutyun).",
            say: "Ani in Isfahan speaks Armenian too. Armenian has its own alphabet. See how she says hello and thank you." },
          { caption: "All these children speak Persian too. Every language is valuable, because a family talks and tells stories in it." }
        ] },
      { prompt: "How does each friend say thank you?", say: "Match each friend with their thank-you word. Tap each card to hear it.",
        pairs: [
          [{ say: "Aylar, from Tabriz" }, { say: "thank you in Azerbaijani Turkish" }],
          [{ say: "Zhiyar, from Sanandaj" }, { say: "thank you in Kurdish" }],
          [{ say: "Reem, from Ahvaz" }, { say: "thank you in Arabic" }],
          [{ say: "Mahgol, from Chabahar" }, { say: "thank you in Balochi" }]
        ] },
      { caption: "What languages do you speak at home? In how many languages can you say hello?" },
      home({ text: "Ask Grandpa and Grandma how they say hello.",
        need: ["a phone call or a visit"],
        steps: [
          "Ask a grandparent, or a neighbour who speaks another language, how they say hello and thank you in their language.",
          "If your family speaks a language besides Persian, teach your child a few words of it and be proud of it.",
          "Write the words on paper with the name of the language next to them.",
          "When someone speaks another language, we listen with respect and never laugh at anyone's accent."
        ],
        ask: "What new word did you learn today from another language?" })
    ] },

    "world-sprout-7": { title: "Tables of Iran", steps: [
      { prompt: "Where does our food come from?",
        scenes: [
          { caption: "Every food comes from somewhere. Why does a plant grow well in one place and not in another?" },
          { caption: "In Gilan and Mazandaran it rains a lot. Rice needs lots of water, so it grows well there." },
          { caption: "In Bushehr and Hormozgan the summer is very hot. Date palms love the heat." },
          { caption: "In Khorasan there are fields of saffron flowers. Saffron does not need much water." },
          { caption: "This fisher by the sea has caught a fish. Ghalieh mahi, a dish from Bushehr, is made with fish." },
          { caption: "Every part of Iran has its own table. What is on the table in your city?" }
        ] },
      { say: "Let's see on the map where each food comes from.",
        tasks: [
          { prompt: "Rice grows well in Gilan. Gilan is by the Caspian Sea, towards the west. Find it.", say: "Rice grows well in Gilan. Gilan is in the north, by the Caspian Sea, towards the west. Find it." },
          { prompt: "Dates grow well in Bushehr. Bushehr is by the Persian Gulf. Find it." },
          { prompt: "Kerman pistachios are famous. Kerman is in the south-east, a big province far from the sea. Find it." },
          { prompt: "Saffron grows in Razavi Khorasan, in the north-east of Iran. Find it." }
        ] },
      { prompt: "Why does it grow there?", say: "Match each food with the place where it grows well.",
        pairs: [
          [{ say: "rice" }, { say: "a place where it rains a lot" }],
          [{ say: "dates" }, { say: "a place where it is very hot" }],
          [{ say: "fish" }, { say: "by the sea" }],
          [{ say: "saffron" }, { say: "a place with little water" }]
        ] },
      { caption: "What is the special food of your city or village? Where do its ingredients come from?" },
      home({ text: "Cook a local dish together!",
        need: ["the ingredients of a simple local dish, for example mirza ghasemi: aubergine, tomato, garlic, eggs"],
        steps: [
          "Choose a local dish: from your own city, or from the city the grown-ups come from.",
          "With your child, look at where each ingredient came from: “This rice is from Gilan, these dates are from the south.”",
          "Give your child the safe jobs: washing herbs, stirring, laying the table. The stove and knives stay with grown-ups.",
          "At the table, ask: “Which province is this dish from? Where is it on the map?”"
        ],
        ask: "If you travelled to another city, which of its foods would you like to taste?" })
    ] },

    "world-sprout-8": { title: "Map game", steps: [
      { tasks: [
        { prompt: "Where is the Persian Gulf?" },
        { prompt: "Where is the Caspian Sea?" },
        { prompt: "Where is the Sea of Oman?" }
      ] },
      { tasks: [
        { prompt: "The sun is coming up. Turn to face east." },
        { prompt: "Now turn to face west." },
        { prompt: "Turn to face south." }
      ] },
      { say: "Find it with the map key.",
        tasks: [
          { prompt: "Where is the orchard?" },
          { prompt: "Where is Setareh's home?" }
        ] },
      { prompt: "City, village or both?",
        say: "Where do we usually see these? In a city, in a village, or in both?",
        baskets: [{ label: "city" }, { label: "village" }, { label: "both" }],
        items: [{ say: "traffic lights" }, { say: "a city bus" }, { say: "cows and sheep" }, { say: "a tractor in a field" }, { say: "a family" }, { say: "a school" }] },
      { prompt: "Match the festivals", say: "Turn the cards over. Match each festival with what we do.",
        pairs: [
          [{ say: "Nowruz" }, { say: "the haft-sin table" }],
          [{ say: "Sizdah Bedar" }, { say: "going out to the fields and orchards" }],
          [{ say: "Yalda night" }, { say: "poems and stories" }],
          [{ say: "Chaharshanbe Suri" }, { say: "spoon-banging" }]
        ] },
      { say: "Where do the foods come from?",
        tasks: [
          { prompt: "Where does rice grow well? In Gilan, by the Caspian Sea.", say: "Where does rice grow well? Find Gilan, by the Caspian Sea." },
          { prompt: "Where do dates grow well? In Bushehr, by the Persian Gulf.", say: "Where do dates grow well? Find Bushehr, by the Persian Gulf." }
        ] }
    ] }
  });
})();
