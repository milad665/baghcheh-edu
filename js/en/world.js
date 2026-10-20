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

    "world-seed-9": { title: "When I was little", steps: [
      { prompt: "Taraneh grows up",
        scenes: [
          { caption: "This is Taraneh when she was a baby. She was very small and only drank milk." },
          { caption: "When she was a bit bigger, she learned to walk. Step by step, all the way to her mum!" },
          { caption: "Now Taraneh is big. She runs and catches the ball." },
          { caption: "Every year, Mum marked Taraneh's height on the wall. Taraneh got taller every year!" },
          { caption: "All people grow up: first they are babies, then children, then grown-ups, and then they get old, like Grandpa." },
          { caption: "Grandma was a baby once too! She and Taraneh look at old photos. This photo is Grandma when she was a baby." }
        ],
        question: "What did Taraneh drink when she was a baby?",
        options: [{ value: "watermelon" }, { value: "milk" }, { value: "soup" }], answer: "milk" },
      { prompt: "How do people grow up?", say: "First we are babies. Then what? Put them in order.",
        items: [{ say: "baby" }, { say: "child" }, { say: "grown-up" }, { say: "grandpa" }] },
      { prompt: "How did Taraneh grow up?", say: "What did Taraneh do first? What did she learn next? Put them in order.",
        items: [{ say: "only drank milk" }, { say: "walked step by step" }, { say: "ran and caught a ball" }] },
      { caption: "What did you look like when you were a baby? What can you do now that you couldn't do then?" },
      home({ text: "Look at your baby photos together.",
        need: ["a few photos of your child as a baby (or clothes or a small toy from that time)"],
        steps: [
          "Look at the photos together and ask: “Who is this? What could you do then? And now?”",
          "If you have no photos, that's fine: tell your child about their baby days, or draw them together.",
          "Mark your child's height on a door frame or a wall with a pencil and write the date next to it. Measure again in a few months."
        ],
        ask: "What do you do by yourself now that you couldn't do when you were little?" })
    ] },

    "world-seed-10": { title: "Morning, noon and night", steps: [
      { prompt: "Omid's day",
        parts: { t1: { art: "Yesterday" }, t2: { art: "Today" }, t3: { art: "Tomorrow" } },
        scenes: [
          { caption: "It's morning. The sun slowly came up. Omid woke up." },
          { caption: "Omid had breakfast with his mum and dad." },
          { caption: "Then Omid played ball in the yard." },
          { caption: "It's noon. Look out of the window: the sun is high up. Time for lunch!" },
          { caption: "It's night. The moon and the stars came out. Omid went to sleep." },
          { caption: "Yesterday, Omid went to Grandma's house." },
          { caption: "Today, Omid is playing ball in the yard." },
          { caption: "Tomorrow, Omid is going to the park with his dad." }
        ] },
      { prompt: "Omid's day", say: "What did Omid do first? Then what? Put them in order.",
        items: [{ say: "woke up" }, { say: "had breakfast" }, { say: "played ball" }, { say: "had lunch" }, { say: "went to sleep" }] },
      { prompt: "When did Omid have lunch?", say: "When did Omid have lunch? In the morning, at noon or at night?",
        options: [{ value: "morning" }, { value: "noon" }, { value: "night" }], answer: "noon" },
      { prompt: "When do we see the moon and the stars?", say: "When do we see the moon and the stars in the sky?",
        options: [{ value: "night" }, { value: "noon" }, { value: "morning" }], answer: "night" },
      { prompt: "Where did Omid go yesterday?", say: "Where did Omid go yesterday?",
        options: [{ value: "the park" }, { value: "Grandma's house" }, { value: "school" }], answer: "Grandma's house" },
      { prompt: "Where is Omid going tomorrow?", say: "Where is Omid going tomorrow?",
        options: [{ value: "Grandma's house" }, { value: "school" }, { value: "the park" }], answer: "the park" }
    ] },

    "world-seed-11": { title: "We take turns", steps: [
      { prompt: "Playing together",
        parts: { word: { art: "Sorry!" } },
        scenes: [
          { caption: "The children are playing on the slide in the park. One at a time, taking turns." },
          { caption: "Kaveh wanted to go first. But he waited for his turn." },
          { caption: "Now it's Kaveh's turn!" },
          { caption: "At home, Raha and her brother Sina are drawing. They have one box of crayons, and they share it." },
          { caption: "Sina knocked over a glass of water by mistake, and the water spilt on the drawings. Sina said: “Sorry!”" },
          { caption: "They cleaned up the water together.", wait: { hint: "You help too: rub left and right over the water to wipe it up!" } },
          { caption: "After playing, everyone tidied up the toys together.", wait: { hint: "Tap each toy to put it in the box!" } },
          { caption: "When we take turns, share and help each other, everyone has fun." }
        ] },
      { prompt: "Does it help or not?", say: "Which things help us play together? Which don't?",
        baskets: [{ label: "helps" }, { label: "doesn't help" }],
        items: [
          { say: "waiting for my turn" },
          { say: "sharing the crayons" },
          { say: "helping to tidy up" },
          { say: "pushing in front in the queue" },
          { say: "shouting at my friend" },
          { say: "grabbing a toy from my friend" }
        ] },
      { caption: "What rules do you have at home? When someone does something by mistake, what do we say? How do you help at home?" },
      home({ text: "Play a game where you take turns.",
        need: ["a simple game like snakes and ladders, or a ball"],
        steps: [
          "Play a game where you take turns, and say the turns out loud: “Now it's my turn, now it's your turn.”",
          "If your child gets impatient, help them wait: “Let's count to three, then it's your turn.”",
          "Choose one simple house rule together (for example tidying up the toys after playing) and do it together for a week."
        ],
        ask: "When your friend wants your toy, what do you do?" })
    ] },

    "world-seed-12": { title: "On, under, next to", steps: [
      { prompt: "Nima's playful cat",
        scenes: [
          { caption: "This is Nima's cat. This is a box, and this is a table." },
          { caption: "The cat jumped onto the box." },
          { caption: "Now the cat jumped down and went under the table." },
          { caption: "The cat came out from under the table and sat next to the box." },
          { caption: "The ball rolled and stopped in front of the box." },
          { caption: "The cat hid behind the box. You can only see its ears!" }
        ] },
      { say: "Find it in Nima's room.",
        tasks: [
          { prompt: "What is on the bed? Tap it.", say: "What is on the bed? Tap it." },
          { prompt: "What is under the table?", say: "What is under the table? Tap it." },
          { prompt: "Who is sitting next to the box?", say: "Who is sitting next to the box? Tap it." },
          { prompt: "What is on the shelf?", say: "Look up. What is on the shelf?" },
          { prompt: "What is under the bed?", say: "Look down. What is under the bed?" },
          { prompt: "What is in front of the box?", say: "What is in front of the box? Tap it." }
        ] },
      { prompt: "What did the cat jump onto first?", say: "Do you remember? What did Nima's cat jump onto first?",
        options: [{ value: "teddy" }, { value: "box" }, { value: "bed" }], answer: "box" },
      { prompt: "What stopped in front of the box?", say: "What rolled and stopped in front of the box?",
        options: [{ value: "ball" }, { value: "cat" }, { value: "teddy" }], answer: "ball" },
      home({ text: "Hide a toy and say where it is!",
        need: ["a small toy"],
        steps: [
          "Hide the toy and give clues with place words: “It's under something soft”, “It isn't behind the door.”",
          "When your child finds it, ask: “Where was it?” and help them say the whole sentence: “It was under the pillow.”",
          "Swap: your child hides it and tells you where to look.",
          "Practise on, under, next to, in front of, behind, up and down in everyday jobs too: “Put your shoes next to the door.”"
        ],
        ask: "Where is your ball now? Is it on something or under something?" })
    ] },

    "world-seed-13": { title: "I need it, I like it", steps: [
      { prompt: "Mina and her dad go shopping",
        scenes: [
          { caption: "To live, we need some things: food, water, a home and clothes." },
          { caption: "There are also things we like, but we can live without them: toys, lollipops, balloons." },
          { caption: "Mina and her dad went to the corner shop." },
          { caption: "Dad took bread, milk and rice. They need these." },
          { caption: "Mina saw a doll and liked it very much. But today they are only buying the things they need." },
          { caption: "Dad gave the shopkeeper money. The shopkeeper put the things in a bag." },
          { caption: "Mina's dad is a carpenter. He works, and he gets paid for his work." },
          { caption: "Mina puts her Nowruz money in her piggy bank, so one day she can buy the doll herself." }
        ],
        question: "Which one do we need to live?",
        options: [{ value: "a balloon" }, { value: "water" }, { value: "a lollipop" }], answer: "water" },
      { prompt: "Need it or like it?", say: "Which ones do we need to live? Which ones do we just like?",
        baskets: [{ label: "we need it" }, { label: "we like it" }],
        items: [{ say: "bread" }, { say: "water" }, { say: "warm clothes" }, { say: "a doll" }, { say: "a lollipop" }, { say: "a balloon" }] },
      { prompt: "At the shop, what do we give to buy things?", say: "At the shop, what do we give the shopkeeper to buy things?",
        options: [{ value: "flowers" }, { value: "money" }, { value: "toys" }], answer: "money" },
      { prompt: "Where does Mina's dad get money from?", say: "Where does Mina's dad get money from?",
        options: [{ value: "he picks it from a tree" }, { value: "he works" }, { value: "it falls from the sky" }], answer: "he works" },
      home({ text: "At the shop, find one thing you need and one thing you like.",
        need: ["an ordinary shopping trip with your child"],
        steps: [
          "At the grocer's or the fruit shop, ask your child: “Which ones do we need? Which ones do we just like?”",
          "Let your child give the money to the shopkeeper and see what the shopkeeper gives you.",
          "Tell them about your own work: “I work, and with the money we buy bread and fruit.”",
          "If they have a piggy bank, save together for something they would like."
        ],
        ask: "Name one thing we need, and one thing you just like." })
    ] },

    "world-seed-14": { title: "The park belongs to everyone", steps: [
      { prompt: "Yasaman in the park",
        scenes: [
          { caption: "This park belongs to everyone: children, grown-ups, birds and flowers." },
          { caption: "Yasaman ate a banana. Then she threw the peel in the bin." },
          { caption: "A bottle was lying on the ground. Yasaman's dad was wearing gloves. He picked it up and threw it in the bin." },
          { caption: "Yasaman doesn't pick the flowers. She only looks at them and smells them." },
          { caption: "The birds are eating seeds. Yasaman walks past them quietly and doesn't bother them." },
          { caption: "There is room on the bench for everyone. Arash moved over a little so Grandma could sit down too." },
          { caption: "The park stayed clean and pretty. Tomorrow everyone can play here too." }
        ] },
      { prompt: "Let's clean the park",
        scenes: [
          { caption: "After a busy day, there is some litter on the ground. Yasaman is wearing gloves and helping. You help too!", wait: { hint: "Tap each piece of litter to put it in the bin!" } },
          { caption: "Well done! Now the park is clean." }
        ] },
      { prompt: "Good for the park or not?", say: "Which things are good for the park? Which are not?",
        baskets: [{ label: "good" }, { label: "not good" }],
        items: [{ say: "putting litter in the bin" }, { say: "being quiet near the birds" }, { say: "smelling a flower" }, { say: "picking the flowers" }, { say: "dropping a sweet wrapper on the ground" }, { say: "writing on the bench" }] },
      { prompt: "In the street and on the bus", say: "In the street and on the bus, which things are good? Which are not?",
        baskets: [{ label: "good" }, { label: "not good" }],
        items: [{ say: "giving your seat to a grandma on the bus" }, { say: "keeping your fruit peel until you find a bin" }, { say: "shouting on the bus" }, { say: "drawing on the wall of the street" }] },
      home({ text: "With a grown-up, clean a little bit of the park or your street.",
        need: ["gloves for everyone", "a bag"],
        steps: [
          "Wearing gloves, pick up paper, bottles and cans and put them in the bag or a bin.",
          "Broken glass, sharp things, needles or anything you don't know are picked up by the grown-up, not the child. If needed, tell the park staff.",
          "Then wash your hands with soap and water.",
          "Ask: “What does it look like now? Who will be happy with this clean place?”"
        ],
        ask: "What do you do in the park so it stays clean and pretty for everyone?" })
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

    "world-seed-15": { title: "Yalda night", steps: [
      { prompt: "Shiva's Yalda night",
        scenes: [
          { caption: "Tonight is Yalda night: the last night of autumn and the longest night of the year. The sun set early, and night came." },
          { caption: "Shiva and her mum and dad went to Grandma and Grandpa's house." },
          { caption: "Everyone sat around the sofreh. Watermelon, pomegranate and nuts are ready." },
          { caption: "Grandma took the seeds out of the pomegranate. She put the red seeds in a bowl." },
          { caption: "Dad cut the watermelon into slices." },
          { caption: "Grandpa opened the poetry book. He read poems and told stories to everyone." },
          { caption: "They stayed up late, ate and laughed together." }
        ] },
      { prompt: "Who did what?", say: "On Yalda night, who did what? Find the pairs.",
        pairs: [
          [{ say: "Grandma" }, { say: "took out the pomegranate seeds" }],
          [{ say: "Dad" }, { say: "cut the watermelon" }],
          [{ say: "Grandpa" }, { say: "read poems and told stories" }]
        ] },
      { prompt: "Find the Yalda pairs",
        pairs: [
          [{ say: "watermelon" }, { say: "watermelon" }],
          [{ say: "nuts" }, { say: "nuts" }],
          [{ say: "poetry book" }, { say: "poetry book" }],
          [{ say: "long night" }, { say: "long night" }]
        ] },
      { caption: "Where does your family get together on Yalda night? What do you eat? Which story or poem do you like?" },
      home({ text: "Lay a little Yalda sofreh together.",
        need: ["a plate of fruit (any fruit you have)", "a storybook or a book of poems"],
        steps: [
          "If you have a pomegranate, take out the seeds together (wear an apron: the juice stains!).",
          "Ask a grandparent (or call them) what Yalda was like when they were children, and what stories they told.",
          "Read a story or a few lines of poetry together. If Yalda isn't near, any long winter night is fine too."
        ],
        ask: "Why do we call Yalda “the longest night”?" })
    ] },

    "world-seed-16": { title: "Clothes and music of Iran", steps: [
      { prompt: "Three families, three places in Iran",
        parts: { tt1: { art: "Kurdish" }, tt2: { art: "Turkmen" }, tt3: { art: "Balochi" } },
        scenes: [
          { caption: "Many peoples live in Iran. Let's visit three families." },
          { caption: "Zhina and her dad live in Kurdistan. Today is a celebration: they are wearing Kurdish clothes, and Zhina's dad is playing the daf." },
          { caption: "Aynaz and her grandpa are Turkmen and live in Gonbad. Grandpa is playing the dutar. A horse is running across the plain." },
          { caption: "Davood and his mum and dad are Baluch and live in Chabahar, by the sea. Davood's dad is playing the qeychak. His mum's dress has Baluch embroidery." },
          { caption: "At home, each family also speaks its own language: Kurdish, Turkmen, Balochi." }
        ] },
      { prompt: "Which instrument, where?", say: "Match each instrument with the place where you heard it.",
        pairs: [
          [{ say: "daf" }, { say: "Kurdistan, the mountains" }],
          [{ say: "dutar" }, { say: "Gonbad, the plain and the horse" }],
          [{ say: "qeychak" }, { say: "Chabahar, by the sea" }]
        ] },
      { prompt: "Three more families",
        scenes: [
          { caption: "Let's visit three more families." },
          { caption: "Negar and her grandpa are Gilak and live in Gilan, next to the rice fields. Grandpa is playing the laleva, and Negar is dancing." },
          { caption: "Bahador and his mum are Qashqai. In summer they go up to the mountains with their flock and live in a tent. Bahador's uncle is playing the karna." },
          { caption: "Adel and his dad are Arab and live in Ahvaz, by the Karun river. Adel's dad is playing the drum, and Adel is clapping." },
          { caption: "Our clothes, our music and our languages are different. But we are all Iranian, and Iran is home to all of us." }
        ] },
      { prompt: "Which instrument, where?", say: "Match each instrument with the place where you heard it.",
        pairs: [
          [{ say: "laleva" }, { say: "Gilan, the rice fields" }],
          [{ say: "karna" }, { say: "the Qashqai, a tent in the mountains" }],
          [{ say: "drum" }, { say: "Ahvaz, the bridges over the Karun" }]
        ] },
      { caption: "What language does your family speak at home? What clothes do you wear at celebrations, and what music do you listen to?" }
    ] },

    "world-seed-17": { title: "Homes around the world", steps: [
      { prompt: "Why are homes different?",
        scenes: [
          { caption: "Homes don't look the same everywhere in the world. Why? Let's see!" },
          { caption: "In big cities there are lots of people and not much land. So homes are built on top of each other: flats!" },
          { caption: "Yazd is hot and dry. The houses are made of mud bricks and have windcatchers. A windcatcher sends cool wind down into the house." },
          { caption: "Nomads move from place to place with their flocks. They take their tent with them and put it up wherever they stop." },
          { caption: "By a river whose water sometimes rises, people build houses on tall posts. The water rises, but the house stays dry." },
          { caption: "In the very cold north of Canada, the Inuit long ago built homes out of snow on hunting trips: snow houses!" },
          { caption: "Every home is built for the weather and the way of life of its own place." }
        ],
        question: "Why do houses in Yazd have windcatchers?",
        options: [{ value: "because it's cold there" }, { value: "because it's hot there" }, { value: "because it rains a lot" }], answer: "because it's hot there" },
      { prompt: "Where is each home?", say: "Match each home with its place. Tap the cards to hear their names.",
        pairs: [
          [{ say: "flats" }, { say: "a big, busy city" }],
          [{ say: "a mud-brick house with a windcatcher" }, { say: "a hot, dry place, like Yazd" }],
          [{ say: "a nomad tent" }, { say: "moving with the flock" }],
          [{ say: "a house on tall posts" }, { say: "by a river whose water rises" }],
          [{ say: "a snow house" }, { say: "a very cold place" }]
        ] },
      { prompt: "What is each home made of? Turn the cards over", say: "Turn the cards over. Match each home with what it is made of.",
        pairs: [
          [{ say: "a Yazd house" }, { say: "mud bricks" }],
          [{ say: "a snow house" }, { say: "snow" }],
          [{ say: "a nomad tent" }, { say: "goat hair" }],
          [{ say: "a house on posts" }, { say: "wood" }]
        ] },
      { caption: "What does your home look like? What is it made of? If you lived somewhere very cold or very hot, what home would you build?" },
      home({ text: "Build a little house together.",
        need: ["a cardboard box, paper, glue and scissors (scissors for the grown-up)", "or pillows and a blanket"],
        steps: [
          "Build a little house with a box, or with pillows and a blanket.",
          "Ask: “If it was very hot here, how would we keep it cool? What if it rained a lot?”",
          "In your street or in pictures, look at different houses together: “Is the roof flat or sloping? What is it made of?”"
        ],
        ask: "What is your home made of?" })
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
    "world-seed-18": { title: "Where do I live?", steps: [
      { prompt: "Where does Mahan live?",
        scenes: [
          { caption: "This is Mahan. This is Mahan's home." },
          { caption: "Mahan's home is on a street. The homes and shops around it make a neighbourhood." },
          { caption: "Mahan's neighbourhood is in the city of Kerman. Kerman is a big city, with lots of streets and neighbourhoods." },
          { caption: "Kerman is in Iran. Iran is our country." },
          { caption: "Some children live in cities and some live in villages. Cities and villages are both in Iran." },
          { caption: "Where do you live? Say the name of your city or village!" }
        ] },
      { say: "This is a map.",
        tasks: [{ prompt: "Where is our country, Iran? Tap it.", say: "This is a map. Where is our country, Iran? Tap it." }] },
      { say: "Mahan's city.",
        tasks: [{ prompt: "Kerman, Mahan's city, is a red dot. Find it.", say: "Kerman, Mahan's city, is a red dot on the map. Find it." }] },
      { prompt: "Is Kerman a city or a country?", say: "Is Kerman a city or a country?",
        options: [{ value: "a city" }, { value: "a country" }], answer: "a city" },
      { prompt: "A home is in a neighbourhood, a neighbourhood is in a city, and a city is in…?", say: "Mahan's home is in a neighbourhood, the neighbourhood is in a city, and where is the city?",
        options: [{ value: "a home" }, { value: "Iran" }, { value: "a park" }], answer: "Iran" },
      home({ text: "Learn the name of your city or village.",
        need: ["paper and crayons"],
        steps: [
          "Say with your child: “Our street is called … We live in the city (or village) of … Our country is Iran.”",
          "Draw three circles, one inside the other: the smallest is your home, the bigger one your city or village, the biggest your country. Your child draws in each one.",
          "If you live outside Iran, say your own city and country, and which city in Iran your family comes from."
        ],
        ask: "Which city or village do you live in?" })
    ] },

    "world-seed-19": { title: "Old and new", steps: [
      { prompt: "Grandpa's box of old things",
        scenes: [
          { caption: "Ava has come to Grandpa's house. Grandpa has a box full of old things." },
          { caption: "This is a lantern. Long ago, there was no electricity in Grandpa's village. At night, people lit lanterns." },
          { caption: "Now homes have electricity. With one switch, the lamp comes on!" },
          { caption: "This is Grandma's samovar. They still boil water in it. The electric kettle is newer." },
          { caption: "Long ago, people wrote letters to someone far away. A letter took several days to arrive." },
          { caption: "Now, with a phone, we hear each other right away." },
          { caption: "This is an old photo of Grandpa when he was a child. Old photos are black and white." }
        ] },
      { prompt: "Old and new, for the same job", say: "These do the same job: one is old, one is new. Find the pairs.",
        pairs: [
          [{ say: "candle and lantern, old" }, { say: "lamp, new" }],
          [{ say: "letter, old" }, { say: "mobile phone, new" }],
          [{ say: "carrying water from the spring in a bucket, old" }, { say: "a tap at home, new" }]
        ] },
      { prompt: "Old or new?", say: "Which ones are old? Which ones are new?",
        baskets: [{ label: "old" }, { label: "new" }],
        items: [{ say: "an old phone with a cord" }, { say: "a candle to light the house" }, { say: "a letter that takes days to arrive" }, { say: "a mobile phone" }, { say: "a lamp" }, { say: "a computer" }] },
      { caption: "Ask your grandparents: when you were children, what things didn't you have? What games did you play?" },
      home({ text: "Find something old at home.",
        need: ["something old at home or at your grandparents' (a photo, a dish, a tool, a toy)"],
        steps: [
          "Find something old with your child and ask: “What do you think this is? What was it for?”",
          "If you can, ask its owner to tell you about it: when it was bought, what they did with it.",
          "Ask: “What do we use instead of this now?”"
        ],
        ask: "What old thing did you find? What do we use instead now?" })
    ] },

    "world-seed-20": { title: "Treasure map", steps: [
      { prompt: "This is a map of a park, from above. Tap places in the park to hear their names." },
      { say: "Walk with the map.",
        tasks: [{ prompt: "Start at the park gate. First go to the slide, then the pond, then the big tree.",
          say: "Start at the park gate. First go to the slide, then the pond, then the big tree." }] },
      { say: "Find the treasures. Each treasure is next to something.",
        tasks: [
          { prompt: "The first treasure is next to the pond. Tap the X next to the pond." },
          { prompt: "The next treasure is next to the slide." },
          { prompt: "The next treasure is under the big tree, in its shade." },
          { prompt: "The last treasure is next to the flower bed." }
        ] },
      { prompt: "On the map, what colour is the pond water?", say: "On the map, what colour is the pond water?",
        options: [{ value: "green" }, { value: "blue" }, { value: "yellow" }], answer: "blue" },
      { prompt: "From above, what shape is a tree?", say: "If we look at a tree from above, what shape is it?",
        options: [{ value: "triangle" }, { value: "square" }, { value: "green circle" }], answer: "green circle" },
      home({ text: "Play with a treasure map!",
        need: ["paper and a pencil", "a little “treasure” (a snack or a toy)"],
        steps: [
          "Draw a simple map of the room or the yard from above: the door, the window, the rug, the bed or a tree.",
          "Hide the treasure and mark its place on the map with an X.",
          "Your child finds the treasure with the map and says where it was: “next to the door”, “under the pillow”.",
          "Swap: your child hides it and draws the map."
        ],
        ask: "Where was your treasure? Next to what?" })
    ] },

    "world-seed-21": { title: "Everyone has a job", steps: [
      { prompt: "Jobs that help us",
        scenes: [
          { caption: "The farmer has planted wheat. She waters the wheat, and the wheat grows." },
          { caption: "The baker makes bread with flour from the wheat." },
          { caption: "The driver takes people to work and to school by bus." },
          { caption: "The builder puts brick on brick and builds a wall." },
          { caption: "Arian has scraped his knee. The nurse puts a plaster on it." },
          { caption: "Everyone works and helps each other. The bread we eat comes from many people's work!" }
        ],
        question: "Who bakes bread?",
        options: [{ value: "the farmer" }, { value: "the baker" }, { value: "the builder" }], answer: "the baker" },
      { prompt: "What does each person work with?", say: "What does each person work with? Find the pairs.",
        pairs: [
          [{ say: "farmer" }, { say: "wheat" }],
          [{ say: "baker" }, { say: "bread" }],
          [{ say: "builder" }, { say: "bricks" }],
          [{ say: "nurse" }, { say: "plaster" }]
        ] },
      { prompt: "Find the pairs", say: "Turn the cards over and find the pairs.",
        pairs: [
          [{ say: "wheat" }, { say: "wheat" }],
          [{ say: "bread" }, { say: "bread" }],
          [{ say: "bus" }, { say: "bus" }],
          [{ say: "bricks" }, { say: "bricks" }]
        ] },
      { caption: "What do the grown-ups in your home do? Who does their work help? What would you like to be?" }
    ] },

    "world-seed-22": { title: "Hello, children of the world", steps: [
      { prompt: "Four new friends",
        scenes: [
          { caption: "This is Ananya. She lives in the city of Chennai, in India." },
          { caption: "This is Karim, from Cairo in Egypt. This is Chloe, from Canada. This is Wei, from Beijing in China." },
          { caption: "All four have a home and a family." },
          { caption: "They all have breakfast in the morning." },
          { caption: "They all go to school." },
          { caption: "They all like to play and laugh with their friends." }
        ] },
      { prompt: "Some things are different",
        parts: { t1: { art: "Namaste!" }, t2: { art: "Ahlan!" }, t3: { art: "Hello!" }, t4: { art: "Nǐ hǎo!" } },
        scenes: [
          { caption: "Ananya's breakfast is idli: little rice cakes cooked in steam." },
          { caption: "Karim's breakfast is ful: cooked beans with bread." },
          { caption: "Chloe's breakfast is pancakes. Wei's breakfast is steamed buns." },
          { caption: "Ananya goes to school in a rickshaw. Karim walks." },
          { caption: "Chloe goes to school on a yellow school bus. Wei walks with his grandpa." },
          { caption: "In Canada, lots of snow falls in winter. The roof of Chloe's house is steep, so the snow slides off." },
          { caption: "Each of them says hello in their own language: “Namaste!”, “Ahlan!”, “Hello!”, “Nǐ hǎo!”" }
        ],
        question: "What was Chloe's breakfast?",
        options: [{ value: "pancakes" }, { value: "rice cakes" }, { value: "beans with bread" }], answer: "pancakes" },
      { prompt: "The same or different?", say: "Is this the same for all four friends, or different?",
        baskets: [{ label: "the same" }, { label: "different" }],
        items: [{ say: "having a home and a family" }, { say: "going to school" }, { say: "liking to play" }, { say: "what they eat for breakfast" }, { say: "how they get to school" }, { say: "the word they say hello with" }] },
      { prompt: "Who? What?", say: "Do you remember? Match each child with something from the story.",
        pairs: [
          [{ say: "Ananya, from India" }, { say: "rickshaw" }],
          [{ say: "Karim, from Egypt" }, { say: "ful with bread" }],
          [{ say: "Chloe, from Canada" }, { say: "lots of snow" }],
          [{ say: "Wei, from China" }, { say: "grandpa" }]
        ] },
      { caption: "What do you eat in the morning? How do you get to school or nursery? If Ananya came to visit, what would you show her?" }
    ] },

    "world-seed-23": { title: "We build it together", steps: [
      { prompt: "The sandcastle",
        scenes: [
          { caption: "Four friends at the seaside want to build a big sandcastle." },
          { caption: "Parisa fills the bucket with sand." },
          { caption: "Babak brings water in a bucket to make the sand wet." },
          { caption: "Arian and Negin build the towers." },
          { caption: "Parisa and Babak decorate it with shells." },
          { caption: "Nobody could have done it alone. They built it together!" },
          { caption: "At home we do jobs together too. Dad spreads the sofreh. The children bring the plates and the bread." },
          { caption: "Everyone helped. Now they eat together. Enjoy!" }
        ] },
      { prompt: "How did they build the castle?", say: "What did the friends do first? Then what? Put them in order.",
        items: [{ say: "filled the bucket with sand" }, { say: "brought water to make the sand wet" }, { say: "built the towers" }, { say: "decorated it with shells" }] },
      { prompt: "How did they lay the sofreh?", say: "To eat together, what do we do first? Then what? Put them in order.",
        items: [{ say: "we spread the sofreh" }, { say: "we put out the plates" }, { say: "we bring the bread and the food" }, { say: "we eat together" }] },
      { text: "Lay the sofreh together today!",
        list: ["One person spreads the sofreh.", "One brings the plates and spoons.", "One brings the bread and water.", "After eating, clear it away together."] },
      { text: "Tidy the room together!",
        list: ["Share out the jobs: one does the books, one the toys, one the clothes.", "Everyone does their own job.", "At the end, look: together it was done so quickly!"] }
    ] },

    "world-seed-24": { title: "My town game", steps: [
      { say: "Find it in Nima's room.",
        tasks: [
          { prompt: "What is under the bed?", say: "What is under the bed? Tap it." },
          { prompt: "What is on the table?", say: "What is on the table? Tap it." },
          { prompt: "What is in front of the box?", say: "What is in front of the box? Tap it." },
          { prompt: "Who is sitting next to the box?", say: "Who is sitting next to the box? Tap it." }
        ] },
      { say: "This is a room from above.",
        tasks: [{ prompt: "From above, where is the ball?" }, { prompt: "From above, where is the bed?" }] },
      { prompt: "Old or new?", say: "Which ones are old? Which ones are new?",
        baskets: [{ label: "old" }, { label: "new" }],
        items: [{ say: "a letter that takes days to arrive" }, { say: "an old phone with a cord" }, { say: "a candle to light the house" }, { say: "a lamp" }, { say: "a mobile phone" }] },
      { prompt: "Need it or like it?", say: "Which ones do we need to live? Which ones do we just like?",
        baskets: [{ label: "we need it" }, { label: "we like it" }],
        items: [{ say: "food" }, { say: "water" }, { say: "warm clothes" }, { say: "a kite" }, { say: "chocolate" }] },
      { prompt: "Match old and new", say: "Turn the cards over. Match each old thing with the new thing that does the same job.",
        pairs: [
          [{ say: "candle" }, { say: "lamp" }],
          [{ say: "letter" }, { say: "mobile phone" }],
          [{ say: "a bucket of water from the spring" }, { say: "a tap" }]
        ] },
      { tasks: [{ prompt: "Where is our country? Tap it.", say: "Where is our country, Iran, on the map? Tap it." }] }
    ] },

    "world-sprout-9": { title: "My life story", steps: [
      { prompt: "Bardia's life line",
        parts: { word: { art: "Dada!" } },
        scenes: [
          { caption: "This is Bardia. He wants to tell his life story from the beginning." },
          { caption: "First, Bardia was born. He was a tiny baby." },
          { caption: "Next, he took his first steps." },
          { caption: "Next, he said his first word: “Dada!”" },
          { caption: "Next, he went to nursery." },
          { caption: "Now Bardia is big, and he plays ball with his friends." },
          { caption: "Before, after, now: this is Bardia's life line. From the right, when he was a baby, to now." }
        ] },
      { prompt: "Bardia's life line", say: "What happened first? Then what? Put them in order, from baby to now.",
        items: [{ say: "was born" }, { say: "first steps" }, { say: "first word" }, { say: "going to nursery" }, { say: "now: playing ball with friends" }] },
      { prompt: "Before and after", say: "Put these in order: which did you learn first? Which later?",
        items: [{ say: "drinking from a bottle" }, { say: "eating with a spoon by myself" }, { say: "putting on my shoes by myself" }, { say: "riding a bike" }] },
      home({ text: "Make your own life line!",
        need: ["a long strip of paper", "a few photos or drawings (from baby to now)", "glue"],
        steps: [
          "Draw a line on the strip. On the right write “I was born” and on the left “now”.",
          "Stick the photos or drawings on the line in order: baby, first steps, nursery, now.",
          "Next to each picture, write one sentence with your child: “This was when…”"
        ],
        ask: "Name something you couldn't do before and can do now." }),
      { guideLabel: "Learning away from the screen, in the parents' guide",
        tips: [
          "Use time words in everyday talk: “before”, “after”, “first”, “last”, “now”.",
          "If you have no baby photos, that's fine: telling stories and drawing do the same job.",
          "Share happy memories; talk about hard times in the family only if your child asks, and calmly."
        ] }
    ] },

    "world-sprout-10": { title: "The week and the year", steps: [
      { prompt: "Days, seasons and months",
        parts: {
          dt0: { art: "Sat" }, dt1: { art: "Sun" }, dt2: { art: "Mon" }, dt3: { art: "Tue" }, dt4: { art: "Wed" }, dt5: { art: "Thu" }, dt6: { art: "Fri" },
          mt00: { art: "Farvardin" }, mt01: { art: "Ordibehesht" }, mt02: { art: "Khordad" }, mt10: { art: "Tir" }, mt11: { art: "Mordad" }, mt12: { art: "Shahrivar" },
          mt20: { art: "Mehr" }, mt21: { art: "Aban" }, mt22: { art: "Azar" }, mt30: { art: "Dey" }, mt31: { art: "Bahman" }, mt32: { art: "Esfand" }
        },
        scenes: [
          { caption: "A week has seven days: Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday and Friday." },
          { caption: "In Iran, Friday is the day off. Many families go out together. Then it's Saturday again." },
          { caption: "A year has four seasons: spring, summer, autumn and winter." },
          { caption: "Each season has three months. The months of spring: Farvardin, Ordibehesht, Khordad. Nowruz is the first day of Farvardin." },
          { caption: "The months of summer: Tir, Mordad, Shahrivar." },
          { caption: "The months of autumn: Mehr, Aban, Azar." },
          { caption: "The months of winter: Dey, Bahman, Esfand. After Esfand, Farvardin comes again." },
          { caption: "Which month is your birthday in? Ask your mum or dad!" }
        ] },
      { prompt: "Days of the week", say: "Put the days of the week in order, starting with Saturday. Tap each one to hear it.",
        items: [{ label: "Saturday", say: "Saturday" }, { label: "Sunday", say: "Sunday" }, { label: "Monday", say: "Monday" }, { label: "Tuesday", say: "Tuesday" },
          { label: "Wednesday", say: "Wednesday" }, { label: "Thursday", say: "Thursday" }, { label: "Friday", say: "Friday" }] },
      { prompt: "The seasons", say: "Start with spring. Put the seasons in order.",
        items: [{ say: "spring" }, { say: "summer" }, { say: "autumn" }, { say: "winter" }] },
      { prompt: "The months of spring and summer", say: "Put the months of spring and summer in order, starting with Farvardin.",
        items: [{ label: "Farvardin", say: "Farvardin" }, { label: "Ordibehesht", say: "Ordibehesht" }, { label: "Khordad", say: "Khordad" },
          { label: "Tir", say: "Tir" }, { label: "Mordad", say: "Mordad" }, { label: "Shahrivar", say: "Shahrivar" }] },
      { prompt: "What day comes after Tuesday?", say: "What day comes after Tuesday?",
        options: ["Monday", "Wednesday", "Friday"], answer: "Wednesday" },
      { prompt: "Which season is Mehr in?", say: "Which season is the month of Mehr in?",
        options: [{ value: "spring" }, { value: "autumn" }, { value: "winter" }], answer: "autumn" }
    ] },

    "world-sprout-11": { title: "Families change", steps: [
      { prompt: "Families",
        scenes: [
          { caption: "Families are not all the same. Nila's family is two people: Nila and her mum." },
          { caption: "Reza's family is four people: Dad, Mum, Reza and his brother." },
          { caption: "Sara's family has a grandpa too." },
          { caption: "Families change, too. Nila's family has a new baby!" },
          { caption: "Reza's family is moving to a new home. They have put all their things in boxes." },
          { caption: "Sara's grandma lives with them now." }
        ] },
      { prompt: "Thank you!",
        parts: { word: { art: "Thank you!" } },
        scenes: [
          { caption: "Nila's mum has made dinner. It smells lovely." },
          { caption: "Nila has made a drawing for her mum and gives it to her. She says: “Thank you!”" }
        ] },
      { prompt: "All families or some?", say: "Is this in all families, or only some?",
        baskets: [{ label: "all families" }, { label: "some families" }],
        items: [{ say: "they love each other" }, { say: "they help each other" }, { say: "they eat together" }, { say: "they have a baby" }, { say: "Grandma lives with them" }, { say: "they have a cat" }] },
      { prompt: "Saying thank you", say: "Which ones are ways of saying thank you?",
        baskets: [{ label: "it's a thank-you" }, { label: "it isn't" }],
        items: [{ say: "saying “thank you”" }, { say: "making a drawing for someone" }, { say: "helping to clear the sofreh" }, { say: "turning away" }, { say: "grumbling" }] },
      { caption: "How many people are in your family? What has changed since you can remember? Who will you thank today?" }
    ] },

    "world-sprout-12": { title: "My story game", steps: [
      { prompt: "From baby to now", say: "What comes first? Then what? Put them in order.",
        items: [{ say: "baby" }, { say: "first steps" }, { say: "nursery and school" }, { say: "riding a bike" }] },
      { prompt: "Days of the week", say: "Put the days of the week in order, starting with Saturday.",
        items: [{ label: "Saturday", say: "Saturday" }, { label: "Sunday", say: "Sunday" }, { label: "Monday", say: "Monday" }, { label: "Tuesday", say: "Tuesday" },
          { label: "Wednesday", say: "Wednesday" }, { label: "Thursday", say: "Thursday" }, { label: "Friday", say: "Friday" }] },
      { prompt: "The months of autumn and winter", say: "Put the months of autumn and winter in order, starting with Mehr.",
        items: [{ label: "Mehr", say: "Mehr" }, { label: "Aban", say: "Aban" }, { label: "Azar", say: "Azar" }, { label: "Dey", say: "Dey" }, { label: "Bahman", say: "Bahman" }, { label: "Esfand", say: "Esfand" }] },
      { prompt: "Each season and its first month", say: "Turn the cards over. Match each season with its first month.",
        pairs: [
          [{ say: "spring" }, { label: "Farvardin", say: "Farvardin" }],
          [{ say: "summer" }, { label: "Tir", say: "Tir" }],
          [{ say: "autumn" }, { label: "Mehr", say: "Mehr" }],
          [{ say: "winter" }, { label: "Dey", say: "Dey" }]
        ] },
      { prompt: "All families or some?", say: "Is this in all families, or only some?",
        baskets: [{ label: "all families" }, { label: "some families" }],
        items: [{ say: "they love each other" }, { say: "they help each other" }, { say: "they live in a flat" }, { say: "Grandpa lives with them" }, { say: "they have twins" }] }
    ] },

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

    "world-sprout-13": { title: "Nomad life", steps: [
      { prompt: "Armand's family moves",
        scenes: [
          { caption: "Some families in Iran are nomads. They move with their flocks: the Qashqai, the Bakhtiari, the Shahsavan and many others." },
          { caption: "In summer, the mountains are cool and full of grass. Armand's family has put up their tent there." },
          { caption: "In autumn, when it gets cold, they fold the tent, load the mule and move to warmer plains." },
          { caption: "On the plain, they put up the black tent again. The tent is woven from goat hair." },
          { caption: "Armand's mum weaves a gabbeh: a thick, colourful rug." },
          { caption: "Nomad children have school too. Sometimes their classroom is a tent!" }
        ],
        question: "Why do nomads move?",
        options: [{ value: "so the flocks always have grass and good weather" }, { value: "to go to school" }, { value: "to go shopping" }],
        answer: "so the flocks always have grass and good weather" },
      { prompt: "City, village or nomads?", say: "Where do you mostly find this: in a city, in a village, or with nomads?",
        baskets: [{ label: "city" }, { label: "village" }, { label: "nomads" }],
        items: [{ say: "tall blocks of flats" }, { say: "the metro" }, { say: "a farm next to the house" }, { say: "the village spring" }, { say: "moving with the flock" }, { say: "a black tent" }] },
      { prompt: "Summer or winter pastures?", say: "Summer pastures are where nomads live in summer, in the cool mountains. Winter pastures are where they live in winter, on the warm plains. Which is which?",
        baskets: [{ label: "summer pastures" }, { label: "winter pastures" }],
        items: [{ say: "summer" }, { say: "cool mountains" }, { say: "winter" }, { say: "warm plains" }] },
      { caption: "If you moved with the nomads, what would you take with you? How is life in a tent different from your home?" },
      home({ text: "Weave a paper gabbeh!",
        need: ["two sheets of coloured paper", "scissors (for the grown-up)", "glue"],
        steps: [
          "Fold one sheet and cut a few parallel slits across the middle (don't cut the edges). This is your loom.",
          "Cut the other sheet into strips.",
          "Weave the strips through the slits: over one, under one. At the end, glue the ends down.",
          "Ask: “What do nomads weave a gabbeh from?” (sheep's wool)"
        ],
        ask: "What colours does your gabbeh have?" })
    ] },

    "world-sprout-14": { title: "Homes are different", steps: [
      { prompt: "Homes of Iran",
        scenes: [
          { caption: "In Yazd, the weather is hot and dry. Houses are made of mud bricks, with thick walls and a windcatcher. The windcatcher brings cool air into the house." },
          { caption: "In Gilan, it rains a lot. The roofs slope steeply so the rain runs off quickly." },
          { caption: "In Masuleh, houses are built in steps up the mountain. The roof of each house is the yard of the house above!" },
          { caption: "In Kandovan, near Tabriz, homes are dug into the rock. These rocks come from Mount Sahand, an old volcano." },
          { caption: "Every home is built for the weather and the land of its own place." }
        ],
        question: "Why do roofs in Gilan slope?",
        options: [{ value: "because it is very sunny" }, { value: "because it rains a lot" }, { value: "for the windcatcher" }], answer: "because it rains a lot" },
      { prompt: "Where is each home?", say: "Match each home with its place. Tap the cards to hear them.",
        pairs: [
          [{ say: "a mud-brick house with a windcatcher" }, { say: "Yazd, hot and dry" }],
          [{ say: "a house with a sloping roof" }, { say: "Gilan, lots of rain" }],
          [{ say: "houses in steps" }, { say: "Masuleh, on a mountain" }],
          [{ say: "a home inside the rock" }, { say: "Kandovan, next to Mount Sahand" }]
        ] },
      { prompt: "Find the pairs", say: "Turn the cards over and find the pairs.",
        pairs: [
          [{ say: "Yazd house" }, { say: "Yazd house" }],
          [{ say: "Gilan house" }, { say: "Gilan house" }],
          [{ say: "Masuleh" }, { say: "Masuleh" }],
          [{ say: "Kandovan" }, { say: "Kandovan" }]
        ] },
      home({ text: "Draw your home!",
        need: ["paper and crayons"],
        steps: [
          "Your child draws the house or building you live in: the roof, the windows, the door.",
          "Ask: “Is our roof flat or sloping? Why?”, “What is our home made of?”",
          "If you come from another city or have travelled, talk about the homes there."
        ],
        ask: "If you lived in Gilan, what would your roof look like?" })
    ] },

    "world-sprout-15": { title: "Our school", steps: [
      { prompt: "Darya looks around the school",
        scenes: [
          { caption: "It's the first day of school. Darya and her mum have reached the school gate. The school guard said hello." },
          { caption: "This is the school office. The head teacher works here." },
          { caption: "This is Darya's classroom. The teacher is writing on the board." },
          { caption: "This is the library. The librarian tidies the books. Children can borrow books." },
          { caption: "This is the health room. If someone feels ill, the health worker helps them." },
          { caption: "This is the schoolyard. At break time, the children play with the PE teacher." }
        ] },
      { prompt: "This is a plan of Darya's school, from above. Tap each place to hear its name." },
      { say: "Find it on the school plan.",
        tasks: [
          { prompt: "Where is Darya's classroom?" },
          { prompt: "Where does the head teacher work?" },
          { prompt: "Where do we go to borrow a book?" },
          { prompt: "If we feel ill, where do we go?" },
          { prompt: "Where do we play at break time?" }
        ] },
      { prompt: "Where does each person work?", say: "Where does each person work at school? Find the pairs.",
        pairs: [
          [{ say: "teacher" }, { say: "classroom" }],
          [{ say: "librarian" }, { say: "library" }],
          [{ say: "health worker" }, { say: "health room" }],
          [{ say: "PE teacher" }, { say: "schoolyard" }]
        ] },
      home({ text: "Draw a map of your school or nursery.",
        need: ["paper and crayons"],
        steps: [
          "Ask your child to name the places at their school or nursery: classroom, yard, office, library.",
          "Draw a simple map from above together and give each place a symbol.",
          "Ask: “Who works there? If you needed help, who would you go to?”"
        ],
        ask: "Which place at school or nursery do you like best?" })
    ] },

    "world-sprout-16": { title: "Our address", steps: [
      { prompt: "Grandpa's letter to Hasti",
        parts: { st1: { art: "Golestan Street" }, st2: { art: "Yas Alley" }, num: { art: "12" } },
        scenes: [
          { caption: "Hasti's grandpa lives in Shiraz. He wrote Hasti a letter and wrote her address on the envelope." },
          { caption: "We write an address from big to small. First the country: Iran." },
          { caption: "Then the province and the city: East Azerbaijan province, the city of Tabriz." },
          { caption: "Then the street and the alley: Golestan Street, Yas Alley." },
          { caption: "Last of all, the house number: number 12." },
          { caption: "With this address, the postman found the house. Hasti got Grandpa's letter!" }
        ] },
      { prompt: "An address, from big to small", say: "Put Hasti's address in order from big to small: country, province, city, street, alley, number.",
        items: [{ label: "Iran", say: "country: Iran" }, { label: "East Azerbaijan", say: "province: East Azerbaijan" }, { label: "Tabriz", say: "city: Tabriz" },
          { label: "Golestan Street", say: "street: Golestan" }, { label: "Yas Alley", say: "alley: Yas" }, { label: "number 12", say: "number 12" }] },
      { prompt: "From small to big", say: "Now the other way round: put them in order from small to big. Home, street, city, country.",
        items: [{ say: "home" }, { say: "alley and street" }, { say: "city" }, { say: "country" }] },
      { say: "The way from home to school.",
        tasks: [{ prompt: "Start at Setareh's home. Go past the bakery to the school.", say: "Start at Setareh's home. Go past the bakery to the school." }] },
      home({ text: "Learn your home address.",
        need: ["an envelope or a card (if you like)"],
        steps: [
          "Repeat your home address with your child, slowly and in small pieces, from big to small: country, province, city, street, alley, number.",
          "This address is just for you and your child: don't type it into any app or website. Tell your child to say it only to a parent, a teacher or the police.",
          "If you like, write a card to a relative together and write the address on the envelope."
        ],
        ask: "Say the address from big to small: first the country, then…?" })
    ] },

    "world-sprout-35": { title: "My neighbourhood map", steps: [
      { prompt: "This is a map of Nima's neighbourhood, with symbols. Look at the map key under the map. Tap the places." },
      { say: "Find them with the map key.",
        tasks: [
          { prompt: "In the key, the bakery is a yellow circle. Where is the bakery?" },
          { prompt: "A star is the symbol for the school. Where is the school?" },
          { prompt: "A plus sign is the symbol for the clinic. Find it." },
          { prompt: "A blue diamond is the bus stop. Where is it?" }
        ] },
      { say: "Walk the way on the map.",
        tasks: [{ prompt: "Start at Nima's home. Go to the bus stop, then to school.", say: "Start at Nima's home. First go to the bus stop, then to school." }] },
      home({ text: "Walk around your neighbourhood and draw a map of it.",
        need: ["paper and crayons", "a board or a book to lean on"],
        steps: [
          "Walk around your street and neighbourhood with your child. Note every place you see: the bakery, the school, the park, the bus stop, a big tree.",
          "At home, draw the streets with two lines. Give each place a symbol: a circle, a star, a square.",
          "At the bottom of the map, draw a map key: each symbol and what it means.",
          "Draw the way from home to one place in the neighbourhood in red."
        ],
        ask: "In your map key, what does the star stand for?" }),
      { guideLabel: "Learning away from the screen, in the parents' guide",
        tips: [
          "Drawing maps is a skill: let your child draw it their way first, then help with questions: “Is the bakery next to the park or across from it?”",
          "When you walk, use words for direction and place: “across from”, “next to”, “on the right”.",
          "Keep your address and your home map on paper only, and don't share them online."
        ] }
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

    "world-sprout-17": { title: "Planet Earth", steps: [
      { prompt: "The Earth is round",
        scenes: [
          { caption: "Our Earth is round, like a very big ball. This is how it looks from space." },
          { caption: "A globe is a little Earth. Sohrab is spinning it." },
          { caption: "Most of the Earth is covered with water. The blue parts are seas and oceans. The green parts are land." },
          { caption: "Big pieces of land are called continents. The Earth has seven continents." },
          { caption: "Our Iran is in the continent of Asia." }
        ] },
      { prompt: "This is a map of the world. Tap the continents and oceans to hear their names." },
      { say: "Find it on the world map.",
        tasks: [
          { prompt: "Where is Asia, our continent?", say: "Where is Asia, our continent? It is the biggest continent." },
          { prompt: "Where is Africa? It is below Europe, next to Asia.", say: "Where is Africa? It is below Europe, next to Asia." },
          { prompt: "Where is the Pacific Ocean, the biggest ocean?" },
          { prompt: "Where is Antarctica, the icy continent at the bottom of the map?" }
        ] },
      { prompt: "Which continent is Iran in?", say: "Which continent is Iran in?", options: ["Africa", "Asia", "Europe"], answer: "Asia" },
      { prompt: "On Earth, is there more water or more land?", say: "On Earth, is there more water or more land?",
        options: [{ value: "water" }, { value: "land" }], answer: "water" },
      home({ text: "Find Iran on a globe.",
        need: ["a globe, or a ball and a marker"],
        steps: [
          "If you have a globe, find Iran, the Caspian Sea and the Persian Gulf together. Then find an ocean.",
          "If you don't have a globe, draw a few pieces of land on a ball with a marker and colour the rest blue: “Look how much water there is!”",
          "With eyes closed, spin the globe (or the ball) and put a finger on it: water or land? Try ten times and count."
        ],
        ask: "Did your finger land on water or on land more often?" })
    ] },

    "world-sprout-18": { title: "Hot places, cold places", steps: [
      { prompt: "Hot and cold",
        scenes: [
          { caption: "We draw an imaginary line round the middle of the Earth: the equator." },
          { caption: "At the top and the bottom of the Earth are the North Pole and the South Pole. They are full of ice." },
          { caption: "Near the equator, the sun is high overhead and it is always hot. Big, rainy forests grow there." },
          { caption: "The South Pole is very cold and always icy. Penguins live there." },
          { caption: "In hot places, people wear thin clothes. In cold places, warm clothes, a hat and a coat." },
          { caption: "Iran is not very close to the equator, and not very far. That's why most places in Iran have hot summers and cold winters." }
        ],
        question: "Where do penguins live?",
        options: [{ value: "near the equator" }, { value: "at the South Pole" }, { value: "in the desert" }], answer: "at the South Pole" },
      { prompt: "A hot place or a cold place?", say: "Does each thing belong in a hot place or a cold place?",
        baskets: [{ label: "hot place" }, { label: "cold place" }],
        items: [{ say: "shorts and thin clothes" }, { say: "a palm tree" }, { say: "a rainforest parrot" }, { say: "gloves and a woolly hat" }, { say: "a penguin" }, { say: "a snowman" }] },
      { say: "Find it on the world map.",
        tasks: [
          { prompt: "Where is the equator? Tap it.", say: "Where is the equator? The red line across the middle of the map. Tap it." },
          { prompt: "Where is the coldest continent, Antarctica?" },
          { prompt: "Where is Africa? The equator goes through its middle." }
        ] },
      { caption: "Is your city mostly hot or cold? If you went to the South Pole, what would you wear?" }
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

    "world-sprout-36": { title: "Instruments of Iran", steps: [
      { prompt: "Instruments of Iran",
        scenes: [
          { caption: "People play the tar and the ney all over Iran. They play old Iranian tunes on them." },
          { caption: "The kamancheh is played with a bow. People play it in Azerbaijan and in many other parts of Iran." },
          { caption: "The dutar has two strings. People play it in Khorasan and Turkmen Sahra." },
          { caption: "The qeychak is the Baluch instrument, from Sistan and Baluchestan." },
          { caption: "At weddings in Lorestan and among the Bakhtiari, people play the sorna and the dohol drum, and everyone dances with colourful handkerchiefs." }
        ] },
      { prompt: "Which instrument, where?", say: "Match each instrument with the place where it is played most.",
        pairs: [
          [{ say: "dutar" }, { label: "Khorasan", say: "Khorasan and Turkmen Sahra" }],
          [{ say: "qeychak" }, { label: "Baluchestan", say: "Sistan and Baluchestan" }],
          [{ say: "dohol drum" }, { label: "Lorestan", say: "Lorestan and the Bakhtiari" }],
          [{ say: "ney" }, { label: "all over Iran", say: "all over Iran" }]
        ] },
      { prompt: "How is each instrument played?", say: "How is each instrument played? Find the pairs.",
        pairs: [
          [{ say: "dutar" }, { say: "with fingers on the strings" }],
          [{ say: "qeychak and kamancheh" }, { say: "with a bow" }],
          [{ say: "dohol drum" }, { say: "with sticks" }],
          [{ say: "ney" }, { say: "by blowing" }]
        ] },
      { caption: "What music do you listen to at home? Which instrument would you like to play?" },
      home({ text: "Listen to the sounds of Iran's instruments together.",
        need: ["a radio, a player or a phone for listening"],
        steps: [
          "Listen together to a short piece on the dutar, the kamancheh, the ney, or the sorna and dohol. Ask: “Is it fast or slow? Happy or sad?”",
          "Ask your grandparents which instruments were played at celebrations where they grew up.",
          "Make a “kitchen orchestra” with pots, spoons and cups, and play a rhythm together."
        ],
        ask: "Which instrument's sound did you like best?" })
    ] },

    "world-sprout-19": { title: "Why do we have rules?", steps: [
      { prompt: "Dodgeball",
        scenes: [
          { caption: "The children want to play dodgeball." },
          { caption: "But they haven't made any rules. Everyone runs after the ball at once. Nobody knows who should go out. They started to quarrel!" },
          { caption: "Together they made rules: two children throw the ball from the two sides. Whoever the ball hits goes out." },
          { caption: "Now the game is fair and everyone has fun. The ball hit Reza, so he went out." },
          { caption: "At home we have rules too: after playing, we tidy up the toys." },
          { caption: "In class we have rules too: to speak, we put up our hand and wait." }
        ],
        question: "Without rules, what happened in the game?",
        options: [{ value: "they quarrelled" }, { value: "they had lots of fun" }, { value: "everyone fell asleep" }], answer: "they quarrelled" },
      { prompt: "Fair or not?", say: "Is this fair, or not fair?",
        baskets: [{ label: "fair" }, { label: "not fair" }],
        items: [{ say: "everyone plays in turn" }, { say: "the rule is the same for everyone" }, { say: "before making a rule, we listen to everyone" }, { say: "one person is always first" }, { say: "in the middle of the game I change the rule to help myself" }, { say: "we don't let the little ones play" }] },
      { prompt: "Where is this rule?", say: "Is this a rule for home, school or a game?",
        baskets: [{ label: "home" }, { label: "school" }, { label: "game" }],
        items: [{ say: "tidy up the toys" }, { say: "brush your teeth before bed" }, { say: "put up your hand to speak" }, { say: "go back to class when the bell rings" }, { say: "throw the ball in turn" }, { say: "don't go over the line" }] },
      { caption: "What rules do you have at home? If you made a new rule for a game, what would it be? Is it fair for everyone?" },
      home({ text: "Write your family's rules together.",
        need: ["a big sheet of paper and crayons"],
        steps: [
          "Sit down with the whole family and find three or four simple rules for your home (for example: “We tidy up after playing”, “When someone is talking, we listen”).",
          "Ask your child: “Is this rule for everyone? For grown-ups too?” A good rule is the same for everyone.",
          "Write the rules down, let your child draw pictures next to them, and put them on the wall."
        ],
        ask: "Which home rule do you like best? Why?" })
    ] },

    "world-sprout-20": { title: "We work together", steps: [
      { prompt: "Helping in the orchard",
        scenes: [
          { caption: "The apples in Grandpa's orchard are ripe. There is a lot of work, and Grandpa is alone." },
          { caption: "The neighbours came to help. This is called hamyari, helping each other." },
          { caption: "Everyone has a job: one climbs the ladder and picks apples, one puts the apples in a box." },
          { caption: "Reza and Grandpa pick the apples from the other tree and put them in a box." },
          { caption: "Negin brought water for everyone." },
          { caption: "Together they finished quickly! Then everyone had lunch around the sofreh. Next week, they will all help another neighbour's orchard." }
        ] },
      { prompt: "Helping in the orchard", say: "What happened first? Then what? Put them in order.",
        items: [{ say: "the apples were ripe" }, { say: "the neighbours came to help" }, { say: "they picked the apples and put them in boxes" }, { say: "they had lunch together" }] },
      { prompt: "Group work", say: "For a group job, what do we do first? Then what? Put them in order.",
        items: [{ say: "we listen to everyone" }, { say: "we share out the jobs" }, { say: "everyone does their own part" }, { say: "we look at what we made together" }] },
      { text: "Do a home job together!",
        list: ["Choose a big job: tidying a cupboard, washing herbs, watering the plants.", "Share it out: everyone does one piece.", "At the end, look: together it was done so quickly!"] },
      { text: "Help a neighbour or a relative together.",
        list: ["With a grown-up, ask: does anyone need help? (carrying shopping, watering plants)", "Help together.", "Afterwards ask: “How did helping feel?”"] }
    ] },

    "world-sprout-21": { title: "Helping the neighbourhood", steps: [
      { prompt: "Mahsa and her neighbourhood",
        parts: { word: { art: "Thank you for your work!" } },
        scenes: [
          { caption: "Early in the morning, the street sweeper sweeps the alley." },
          { caption: "Mahsa and her dad said hello and thanked him for his work." },
          { caption: "The lady next door had heavy shopping. Mahsa and her dad helped her and carried the bags to her house." },
          { caption: "The children of the alley watered the tree in the alley." },
          { caption: "When everyone helps each other, the neighbourhood is a better place to live." }
        ],
        question: "What do we say to someone who is working?",
        options: ["Thank you for your work!", "Get out of the way!", "Nothing"], answer: "Thank you for your work!" },
      { prompt: "Does it help the neighbourhood?", say: "Does this help the neighbourhood, or not?",
        baskets: [{ label: "it helps" }, { label: "it doesn't help" }],
        items: [{ say: "saying hello to the neighbours" }, { say: "watering the tree in the alley" }, { say: "helping a neighbour carry shopping" }, { say: "putting rubbish in the bin" }, { say: "making a lot of noise when people are resting" }, { say: "dropping a sweet wrapper in the alley" }] },
      { prompt: "Who helps the neighbourhood?", say: "What does each of these do for the neighbourhood? Put each one with its job.",
        baskets: [{ label: "keeps it clean" }, { label: "gives food" }, { label: "health" }],
        items: [{ say: "street sweeper" }, { say: "rubbish truck" }, { say: "baker" }, { say: "greengrocer" }, { say: "clinic doctor" }, { say: "pharmacy" }] },
      { caption: "Who works in your neighbourhood? How can you help your neighbourhood?" },
      home({ text: "Do something good for the neighbourhood together.",
        need: ["a grown-up with you"],
        steps: [
          "With your child, thank one of the people who work in the neighbourhood (the street sweeper, the baker, the guard) for their work.",
          "If there is a tree or a plant by your door, water it together.",
          "If you have an elderly neighbour, ask together whether they need any help."
        ],
        ask: "How did you help the neighbourhood today?" })
    ] },

    "world-sprout-22": { title: "Together game", steps: [
      { prompt: "Fair or not?", say: "Is this fair, or not fair?",
        baskets: [{ label: "fair" }, { label: "not fair" }],
        items: [{ say: "playing in turn" }, { say: "throwing a die to see who goes first" }, { say: "me always going first" }, { say: "changing the rule in the middle of the game" }] },
      { prompt: "How does each one help?", say: "How does each one help the neighbourhood? Find the pairs.",
        pairs: [
          [{ label: "street sweeper", say: "street sweeper" }, { say: "keeps the alley clean" }],
          [{ say: "baker" }, { say: "bakes bread" }],
          [{ say: "doctor" }, { say: "treats people who are ill" }],
          [{ say: "children" }, { say: "water the tree in the alley" }]
        ] },
      { prompt: "Group work", say: "For a group job, what do we do first? Then what? Put them in order.",
        items: [{ say: "we listen to everyone" }, { say: "we share out the jobs" }, { say: "everyone does their own part" }, { say: "we look at what we made together" }] },
      { prompt: "Does it help the neighbourhood?", say: "Does this help the neighbourhood, or not?",
        baskets: [{ label: "it helps" }, { label: "it doesn't help" }],
        items: [{ say: "thanking the street sweeper" }, { say: "helping a neighbour carry shopping" }, { say: "dropping rubbish in the alley" }, { say: "honking and shouting at night" }] },
      { prompt: "Find the pairs", say: "Turn the cards over and find the pairs.",
        pairs: [
          [{ say: "rule" }, { say: "rule" }],
          [{ say: "helping each other" }, { say: "helping each other" }],
          [{ say: "apple" }, { say: "apple" }],
          [{ say: "broom" }, { say: "broom" }]
        ] }
    ] },

    "world-sprout-23": { title: "Needs and wants", steps: [
      { prompt: "Avin's family",
        scenes: [
          { caption: "Avin's family needs lots of things: food, a home, clothes, medicine and school books." },
          { caption: "Avin's mum and dad work. Dad is a baker and Mum is a doctor. They get paid for their work." },
          { caption: "With this money, they first buy the things they need: food, a home, clothes, medicine, books." },
          { caption: "If there is money left, they spend a little on something they like, such as ice cream. And they save a little." },
          { caption: "Avin understood: we can't buy everything we like. Needs first, then wants." }
        ] },
      { prompt: "Need or want?", say: "Which ones are needs, things we need to live? Which ones are just wants?",
        baskets: [{ label: "need" }, { label: "want" }],
        items: [{ say: "food" }, { say: "medicine when we are ill" }, { say: "school books" }, { say: "a coat in winter" }, { say: "a new computer game" }, { say: "ice cream" }, { say: "a tenth doll" }] },
      { prompt: "What does Avin's family spend money on first?", say: "What does Avin's family spend money on first?",
        options: [{ value: "ice cream" }, { value: "food and things they need" }, { value: "games" }], answer: "food and things they need" },
      { prompt: "Where do families get money from?", say: "Where do families get money from?",
        options: [{ value: "from working" }, { value: "from a tree" }, { value: "from a balloon" }], answer: "from working" }
    ] },

    "world-sprout-24": { title: "Where does money come from?", steps: [
      { prompt: "Sara goes shopping",
        parts: { p1: { art: "5" }, p2: { art: "20" } },
        scenes: [
          { caption: "Sara's mum works in a carpet workshop. At the end of the month, she gets paid for her work." },
          { caption: "Sara has ten thousand toman of pocket money. She goes to the shop." },
          { caption: "A pencil costs five thousand toman. A ball costs twenty thousand toman." },
          { caption: "Sara doesn't have enough money for the ball. She chooses the pencil and pays for it." },
          { caption: "She has five thousand toman left. She puts it in her money box, so in a few weeks she can buy the ball." }
        ] },
      { prompt: "Buy the pencil: give the right money.", say: "The pencil costs five thousand toman. Pay for it.", items: [{ name: "pencil" }] },
      { prompt: "Sara had ten thousand toman and bought a pencil for five thousand. How much does she have left?" },
      { prompt: "What shall we do with the money?", say: "What should Sara do with her money? Is this spending or saving?",
        baskets: [{ label: "spending" }, { label: "saving" }],
        items: [{ say: "buying a pencil" }, { say: "buying an ice cream" }, { say: "putting money in the money box" }, { say: "collecting money for a ball" }] },
      home({ text: "Make a money box for saving.",
        need: ["a tin or a box with a lid", "scissors (for the grown-up) and crayons"],
        steps: [
          "Cut a slot in the top for coins or notes, and let your child decorate it.",
          "Choose something together for your child to save for, and stick a picture or drawing of it on the money box.",
          "Each time your child gets some money, ask: “Shall we spend it all, or put some in the money box?”"
        ],
        ask: "What are you saving for?" })
    ] },

    "world-sprout-25": { title: "From the farm to the table", steps: [
      { prompt: "Bread's journey",
        scenes: [
          { caption: "The farmer plants wheat. In summer, the wheat grows tall and golden, and she harvests it." },
          { caption: "They take the wheat to the mill. The mill grinds the wheat into flour." },
          { caption: "A lorry takes the sacks of flour to the bakery." },
          { caption: "The baker makes dough with the flour and bakes bread." },
          { caption: "We buy the bread and eat it at the sofreh. Our bread is the work of many people!" }
        ] },
      { prompt: "Bread's journey", say: "How does bread get to our sofreh? Put it in order.",
        items: [{ say: "the farmer grows wheat" }, { say: "the mill makes flour" }, { say: "a lorry takes the flour" }, { say: "the baker bakes bread" }, { say: "we eat bread at the sofreh" }] },
      { prompt: "Milk's journey",
        scenes: [
          { caption: "The dairy farm has fresh milk." },
          { caption: "At the dairy factory, they heat the milk so it stays safe, and pour it into bottles." },
          { caption: "A refrigerated lorry takes the milk to the shops. We buy the milk at the shop." }
        ] },
      { prompt: "Milk's journey", say: "How does milk get to our home? Put it in order.",
        items: [{ say: "the dairy farm" }, { say: "the dairy factory" }, { say: "the lorry" }, { say: "the shop" }, { say: "our home" }] },
      { prompt: "Where does each thing come from?", say: "Match each thing with where it comes from.",
        pairs: [
          [{ say: "bread" }, { say: "wheat" }],
          [{ say: "milk" }, { say: "cow" }],
          [{ say: "apple" }, { say: "tree" }],
          [{ say: "egg" }, { say: "hen" }]
        ] }
    ] },

    "world-sprout-26": { title: "Using things carefully", steps: [
      { prompt: "Kian uses things carefully",
        scenes: [
          { caption: "Kian is brushing his teeth, but the tap is still on and water is running for nothing." },
          { caption: "Kian turns off the tap. Now no water is wasted.", wait: { hint: "You help: tap the tap to turn it off!" } },
          { caption: "The light is on in a room where nobody is. Kian turns off the light.", wait: { hint: "Tap the switch to turn off the light!" } },
          { caption: "At the sofreh, we take just enough bread. We put the extra bread in a bag so it doesn't dry out, and eat it later." },
          { caption: "Water, bread and electricity reach us through many people's work. We use them carefully so there is enough for everyone." }
        ] },
      { prompt: "Careful or wasteful?", say: "Is this using things carefully, or wasting them?",
        baskets: [{ label: "careful" }, { label: "wasteful" }],
        items: [{ say: "turning off the tap while brushing your teeth" }, { say: "turning off the light in an empty room" }, { say: "putting extra bread in a bag" }, { say: "a very long shower" }, { say: "the TV on when nobody is watching" }, { say: "throwing bread away" }] },
      { text: "Be your home's water and electricity guard for a week!",
        list: ["Every evening, check that no light is on in an empty room.", "Turn off the tap while you brush your teeth.", "Put extra bread in a bag.", "At the end of the week, tell your family what you did."] }
    ] },

    "world-sprout-27": { title: "Recycling", steps: [
      { prompt: "Let's sort the rubbish",
        scenes: [
          { caption: "After lunch, there's a lot of rubbish: paper, a plastic bottle, a glass jam jar and fruit peel." },
          { caption: "Avin puts each one in its own bin: paper, plastic, glass, and food waste.", wait: { hint: "Tap the rubbish in order, so each goes into its own bin!" } },
          { caption: "Paper, plastic and glass are recycled: old paper is made into new paper." },
          { caption: "Fruit and vegetable peel becomes compost. Compost helps plants grow." },
          { caption: "We use some things again. Avin made a toy car from a box!" }
        ] },
      { prompt: "Which bin for each?", say: "Put each piece of rubbish in its bin: paper, plastic, glass, or food waste.",
        baskets: [{ label: "paper" }, { label: "plastic" }, { label: "glass" }, { label: "food waste" }],
        items: [{ say: "old newspaper" }, { say: "a cardboard box" }, { say: "a shampoo bottle" }, { say: "a plastic cup" }, { say: "a glass bottle" }, { say: "apple peel" }, { say: "potato peel" }] },
      home({ text: "Sort the rubbish at home and make a toy.",
        need: ["two bags or bins: dry and wet", "an empty, clean box or bottle", "glue and crayons"],
        steps: [
          "Make two bins with your child: dry rubbish (paper, plastic, glass) and wet rubbish (food waste). Sort together for a week.",
          "Only a grown-up moves broken glass.",
          "Make a toy together from a clean box or bottle: a car, a house, a plant pot."
        ],
        ask: "What can you make from an old box?" })
    ] },

    "world-sprout-28": { title: "Market game", steps: [
      { prompt: "Buy an apple at the market: give the right money.", say: "An apple costs three thousand toman. Pay for it.", items: [{ name: "apple" }] },
      { prompt: "Buy bread and milk: how much is it altogether?", items: [{ name: "bread" }, { name: "milk" }] },
      { prompt: "Need or want?", say: "At the market, which ones are needs? Which ones are wants?",
        baskets: [{ label: "need" }, { label: "want" }],
        items: [{ say: "bread" }, { say: "milk" }, { say: "warm socks" }, { say: "a lollipop" }, { say: "a balloon" }] },
      { prompt: "Bread's journey", say: "How does bread get to the market? Put it in order.",
        items: [{ say: "the wheat field" }, { say: "the mill" }, { say: "the bakery" }, { say: "the market" }] },
      { prompt: "Where does each thing come from?", say: "Match each thing with where it comes from.",
        pairs: [
          [{ say: "cheese" }, { say: "cow's milk" }],
          [{ say: "honey" }, { say: "bees" }],
          [{ say: "orange" }, { say: "tree" }],
          [{ say: "bread" }, { say: "wheat" }]
        ] },
      { prompt: "Market rubbish", say: "Sort the market's rubbish: dry or wet?",
        baskets: [{ label: "dry: paper, plastic, glass" }, { label: "wet: food waste" }],
        items: [{ say: "a cardboard box" }, { say: "a plastic bottle" }, { say: "a banana peel" }, { say: "a lettuce leaf" }] }
    ] },

    "world-sprout-29": { title: "Travel long ago and today", steps: [
      { prompt: "From Tehran to Mashhad",
        scenes: [
          { caption: "Long ago, people travelled on foot, and camels and mules carried their loads. This group was called a caravan." },
          { caption: "At night they stayed in a caravanserai to rest." },
          { caption: "With a caravan, the journey from Tehran to Mashhad took about a month!" },
          { caption: "Then the train came. The train was much faster and carried lots of people and goods." },
          { caption: "Today it takes about a day by bus, and less than two hours by plane." }
        ],
        question: "Long ago, where did caravans stay at night?",
        options: [{ value: "a hotel" }, { value: "a caravanserai" }, { value: "a train station" }], answer: "a caravanserai" },
      { prompt: "Long ago or today?", say: "Is this way of travelling from long ago or today?",
        baskets: [{ label: "long ago" }, { label: "today" }],
        items: [{ say: "a camel caravan" }, { say: "mules and horses for travelling" }, { say: "staying in a caravanserai" }, { say: "a plane" }, { say: "the metro" }, { say: "a car" }] },
      { prompt: "From slow to fast", say: "Which is slower? Put them in order from the slowest to the fastest.",
        items: [{ say: "on foot" }, { say: "a camel caravan" }, { say: "a train" }, { say: "a plane" }] }
    ] },

    "world-sprout-30": { title: "From chapar to message", steps: [
      { prompt: "Messages from far away",
        scenes: [
          { caption: "Long, long ago in Iran, the chapar riders carried letters. A chapar rode a horse very fast." },
          { caption: "At every chapar station, a fresh horse was ready. The chapar got on the fresh horse and rode on." },
          { caption: "Later, we posted letters in a postbox. The postman took them. It took a few days." },
          { caption: "Then the telephone came. Now you could hear someone's voice from far away." },
          { caption: "Today, with a message, we send our photo and voice to Grandma right away." }
        ] },
      { prompt: "Messages, long ago to today", say: "How were messages sent? Put them in order from long ago to today.",
        items: [{ say: "a chapar on a horse" }, { say: "a letter and a postbox" }, { say: "a telephone" }, { say: "a message on a mobile phone" }] },
      { prompt: "Which arrives sooner?", say: "Does this message arrive right away, or does it take a few days?",
        baskets: [{ label: "right away" }, { label: "a few days" }],
        items: [{ say: "a message on a mobile phone" }, { say: "a telephone call" }, { say: "a letter by post" }, { say: "a letter by chapar" }] },
      home({ text: "Write a card to a relative.",
        need: ["a sheet of paper or card", "crayons", "if you like: an envelope and a stamp"],
        steps: [
          "Your child draws a card for a grandparent or a relative. You write a short sentence for them.",
          "If you can, post the card and count how many days it takes. Or take it yourselves.",
          "Ask the grandparents: “When you were children, how did you send a message to someone far away?”"
        ],
        ask: "Who did you send your card to?" })
    ] },

    "world-sprout-31": { title: "Grandma and Grandpa's games", steps: [
      { caption: "When Grandma and Grandpa were children, what games did they play? What was their school like? Ask them today!" },
      { prompt: "Long ago, a bit long ago, today", say: "Put each thing in its place on the timeline: long, long ago, when Grandma and Grandpa were children, or today.",
        items: [{ say: "a chapar on a horse" }, { say: "a camel caravan" }, { say: "stories on the radio" }, { say: "a phone with a cord" }, { say: "a mobile phone" }, { say: "a computer" }] },
      { prompt: "Games: long ago, today, or both?", say: "Did children long ago play this game, children today, or both?",
        baskets: [{ label: "long ago" }, { label: "today" }, { label: "both" }],
        items: [{ say: "alak-dolak, a stick game" }, { say: "listening to a story on the radio" }, { say: "computer games" }, { say: "games on a tablet" }, { say: "skipping rope" }, { say: "haft-sang" }] },
      { prompt: "School: long ago or today?", say: "Is this from schools long ago, or today?",
        baskets: [{ label: "long ago" }, { label: "today" }],
        items: [{ say: "a pen and ink pot for writing" }, { say: "a long wooden bench for several children" }, { say: "a computer in the classroom" }, { say: "a ballpoint pen" }] },
      home({ text: "Talk with Grandma or Grandpa.",
        need: ["a quiet time with a grandparent (or on the phone)", "if you like: a phone to record their voice"],
        steps: [
          "Your child asks: “What did you play when you were children?”, “What was your school like?”, “What was your favourite food?”, “What was your home like?”",
          "If they agree, record their voice for the family.",
          "Play one of the old games they told you about together."
        ],
        ask: "What game did your grandma or grandpa play as a child?" }),
      { guideLabel: "Learning away from the screen, in the parents' guide",
        tips: [
          "This is your child's first “oral history”: listening to people and asking questions.",
          "Keep the talk to everyday life: games, school, food, home, the neighbourhood. Don't ask about politics or hard times.",
          "If grandparents aren't around, any other older person is fine."
        ] }
    ] },

    "world-sprout-32": { title: "People who made the world better", steps: [
      { prompt: "Gifts from the past",
        scenes: [
          { caption: "A thousand years ago, Ibn Sina was a doctor. He treated sick people and wrote a big book about medicine. Doctors learned from that book for hundreds of years." },
          { caption: "Ferdowsi wrote the Shahnameh: a book full of old stories of Iran, like the story of Zal and the Simorgh." },
          { caption: "Parvin E'tesami was a poet. Her poems are full of kindness, for children and grown-ups." },
          { caption: "About two hundred years ago, a man called Drais built the first bicycle. It had no pedals: the rider pushed along the ground with their feet!" },
          { caption: "We still use what they gave us: a medicine book, stories, poems and the bicycle." }
        ] },
      { prompt: "What gift did each person give us?", say: "Match each person with what they gave us. Tap the cards to hear them.",
        pairs: [
          [{ label: "Ibn Sina", say: "Ibn Sina" }, { say: "a medicine book" }],
          [{ label: "Ferdowsi", say: "Ferdowsi" }, { say: "the Shahnameh, stories of Iran" }],
          [{ label: "Parvin E'tesami", say: "Parvin E'tesami" }, { say: "kind poems" }],
          [{ label: "Drais", say: "Drais" }, { say: "the first bicycle" }]
        ] },
      { prompt: "Which is older?", say: "Put each person in their place on the timeline: a thousand years ago, two hundred years ago, or a hundred years ago.",
        items: [{ say: "Ibn Sina" }, { say: "Ferdowsi" }, { say: "Drais and the first bicycle" }, { say: "Parvin E'tesami" }] },
      home({ text: "Read a Shahnameh story or a short poem together.",
        need: ["a children's book of Shahnameh stories, or a poem by Parvin E'tesami"],
        steps: [
          "Read or tell the story of Zal and the Simorgh, or a short poem by Parvin, together.",
          "Ask: “How long ago was this written? Why do we still read it?”",
          "Your child draws a picture from the story."
        ],
        ask: "If you made something for the people of the future, what would it be?" })
    ] },

    "world-sprout-33": { title: "A day with a child around the world", steps: [
      { prompt: "A day in four places in the world",
        parts: { t1: { art: "Tokyo" }, t2: { art: "Cairo" }, t3: { art: "Mexico City" }, t4: { art: "a village in India" } },
        scenes: [
          { caption: "These are Yuki from Tokyo, Nour from Cairo, Mateo from Mexico City and Raju from a village in India." },
          { caption: "In the morning, everyone has breakfast. Yuki has rice, Nour has falafel and ful, Mateo has tortillas and eggs, and Raju has flatbread and lentils." },
          { caption: "Yuki walks to school with the children of her neighbourhood. Nour goes by bus, Mateo by metro, and Raju walks past the fields." },
          { caption: "After school they play: Yuki skips with a rope, Nour and Mateo play football, and Raju plays cricket." },
          { caption: "When it is night and Yuki is sleeping in Tokyo, Mateo has just woken up in Mexico City! The Earth turns, and it is a different time of day in each place." }
        ],
        question: "How does Yuki go to school?",
        options: [{ value: "on foot with the neighbourhood children" }, { value: "by metro" }, { value: "by bus" }], answer: "on foot with the neighbourhood children" },
      { prompt: "Like my day, or different?", say: "Compare your day with these children's days: is this like your day, or different?",
        baskets: [{ label: "the same" }, { label: "different" }],
        items: [{ say: "having breakfast" }, { say: "going to school or nursery" }, { say: "sleeping at night" }, { say: "eating tortillas" }, { say: "playing cricket" }, { say: "a yellow school hat" }] },
      { prompt: "Each child, each country", say: "Match each child with their country's flag.",
        pairs: [
          [{ say: "Yuki, from Tokyo" }, {}],
          [{ say: "Nour, from Cairo" }, {}],
          [{ say: "Mateo, from Mexico City" }, {}],
          [{ say: "Raju, from a village in India" }, {}]
        ] },
      { prompt: "My day", say: "Put your own day in order: what do you do first? Then what?",
        items: [{ say: "waking up" }, { say: "breakfast" }, { say: "school or nursery" }, { say: "playing" }, { say: "sleeping" }] },
      { caption: "What is the same in your day and Yuki's, Nour's, Mateo's and Raju's days? What is different? Which of them would you like to spend a day with?" }
    ] },

    "world-sprout-34": { title: "Around the world game", steps: [
      { say: "Find the continents.",
        tasks: [
          { prompt: "Where is our continent, Asia?" },
          { prompt: "Where is Europe? It is above Africa." },
          { prompt: "Where is South America?" },
          { prompt: "Where is the Indian Ocean, below Iran?" }
        ] },
      { say: "Hot and cold on the map.",
        tasks: [{ prompt: "Where is the equator, where the hottest places are?" }, { prompt: "Where is the coldest continent?" }] },
      { prompt: "A hot place or a cold place?", say: "Does each thing belong in a hot place or a cold place?",
        baskets: [{ label: "hot place" }, { label: "cold place" }],
        items: [{ say: "a palm tree" }, { say: "thin clothes" }, { say: "a penguin" }, { say: "woolly gloves" }] },
      { prompt: "Long ago or today?", say: "Is this from long ago or today?",
        baskets: [{ label: "long ago" }, { label: "today" }],
        items: [{ say: "travelling by caravan" }, { say: "a letter by chapar" }, { say: "travelling by plane" }, { say: "a message on a mobile phone" }] },
      { prompt: "Match long ago and today", say: "Turn the cards over. Match each old thing with the thing today that does the same job.",
        pairs: [
          [{ say: "a camel caravan" }, { say: "a lorry" }],
          [{ say: "a chapar" }, { say: "a message" }],
          [{ say: "travelling by horse" }, { say: "travelling by car" }]
        ] },
      { prompt: "Children of the world", say: "Match each child with their country's flag.",
        pairs: [
          [{ say: "Haruto and Yuki, from Japan" }, {}],
          [{ say: "Wanjiru, from Kenya" }, {}],
          [{ say: "Pedro, from Brazil" }, {}],
          [{ say: "Raju, from India" }, {}]
        ] }
    ] },

    "world-sapling-10": { title: "Eight directions", steps: [
      { prompt: "Eight directions",
        parts: { n: { art: "north" }, s: { art: "south" }, e: { art: "east" }, w: { art: "west" }, ne: { art: "north-east" }, se: { art: "south-east" }, sw: { art: "south-west" }, nw: { art: "north-west" },
          l1: { art: "Tabriz" }, l2: { art: "Mashhad" }, l3: { art: "Zahedan" }, l4: { art: "Ahvaz" }, lt: { art: "Tehran" } },
        scenes: [
          { caption: "We know the four main directions: north, south, east and west." },
          { caption: "Between them there are four more: north-east, south-east, south-west and north-west." },
          { caption: "On a map, north is at the top. From Tehran, Tabriz is to the north-west." },
          { caption: "Mashhad is to the north-east of Tehran." },
          { caption: "Zahedan is to the south-east of Tehran, and Ahvaz to the south-west." }
        ] },
      { say: "First, let's practise the main directions.",
        tasks: [{ prompt: "Face north." }, { prompt: "Now face west." }, { prompt: "Which way does the morning sun come up? Face that way." }] },
      { say: "Find each city by its direction from Tehran.",
        tasks: [
          { prompt: "Go north-west from Tehran. Which big city is there?" },
          { prompt: "Go north-east from Tehran. Which city?" },
          { prompt: "Go south-east from Tehran, near the border. Which city?" },
          { prompt: "Go south-west from Tehran, near the Persian Gulf. Which city?" }
        ] },
      { prompt: "Bandar Abbas, on the Persian Gulf: which direction is it from Tehran?", say: "Bandar Abbas, on the Persian Gulf: which direction is it from Tehran?",
        options: ["north-west", "south-east", "north"], answer: "south-east" }
    ] },

    "world-sapling-11": { title: "Map squares", steps: [
      { prompt: "A map in squares",
        parts: { c1: { art: "A" }, c2: { art: "B" }, c3: { art: "C" }, c4: { art: "D" } },
        scenes: [
          { caption: "We draw lines over the park map and divide it into squares." },
          { caption: "Above each column we write a letter, and next to each row a number." },
          { caption: "The pond is in column C and row 1. We say: the pond is in square C1." },
          { caption: "Now if someone says “the slide is in square D3”, we find it quickly!" }
        ] },
      { say: "Map squares.",
        tasks: [{ prompt: "Tap square A1." }, { prompt: "Tap square D3." }, { prompt: "Which square is the pond in?" }, { prompt: "Which square is the slide in?" }] },
      { prompt: "Do the letters at the top show the columns or the rows?", say: "Do the letters at the top of the map show the columns or the rows?",
        options: ["the columns", "the rows"], answer: "the columns" },
      { prompt: "If we say “square B2”, where do we look first?", say: "If we say square B2, where do we look first?",
        options: ["column B, then row 2", "only row 2", "the corner of the map"], answer: "column B, then row 2" }
    ] },

    "world-sapling-12": { title: "A small map, a big land", steps: [
      { prompt: "Scale",
        parts: { b10: { art: "10 m" } },
        scenes: [
          { caption: "This is a park from above. On the ground, the park is very big. It takes children a few minutes to run from one end to the other." },
          { caption: "But a map draws the same park much smaller." },
          { caption: "Under the map there is a little ruler: each piece of it is 10 metres on the ground." },
          { caption: "We measure from the big tree to the pond with the map's ruler: it is four pieces, so 40 metres." }
        ] },
      { say: "Measure with the map's ruler.",
        tasks: [{ prompt: "About how many metres is it from the park gate to the pond?" }, { prompt: "About how many metres is it from the park gate to the slide?" }] },
      { prompt: "Which is bigger: the park on the ground, or the map of the park?", say: "Which is bigger: the park itself, or the map of the park on paper?",
        options: [{ value: "the park itself" }, { value: "the map of the park" }], answer: "the park itself" },
      { prompt: "If each piece of the ruler is 10 metres, how many metres are four pieces?", say: "If each piece of the map's ruler is ten metres, how many metres are four pieces?",
        options: ["14 metres", "40 metres", "4 metres"], answer: "40 metres" }
    ] },

    "world-sapling-13": { title: "Made by nature, made by people", steps: [
      { prompt: "Nature and people",
        scenes: [
          { caption: "Nature made these: mountains, a river, the sea and a forest." },
          { caption: "People have made things too: a farm and a road." },
          { caption: "They built a bridge over the river, a town by the sea and a factory near the mountains." }
        ],
        question: "Which one did people make?",
        options: [{ value: "a mountain" }, { value: "a bridge" }, { value: "the sea" }], answer: "a bridge" },
      { prompt: "Made by nature or by people?", say: "Did nature make this, or people?",
        baskets: [{ label: "made by nature" }, { label: "made by people" }],
        items: [{ say: "a mountain" }, { say: "a river" }, { say: "a desert" }, { say: "the sea" }, { say: "a road" }, { say: "a bridge" }, { say: "a factory" }, { say: "a farm" }] },
      { say: "Find it on the village map.",
        tasks: [{ prompt: "On the map, what did nature make? Find the spring." }, { prompt: "What did people make? Find the school." }, { prompt: "The bakery was made by people too. Find it." }] }
    ] },

    "world-sapling-14": { title: "Map reader game", steps: [
      { say: "Find the directions.",
        tasks: [{ prompt: "Face south." }, { prompt: "Face east." }, { prompt: "Where does the evening sun set?" }] },
      { say: "Map squares.",
        tasks: [{ prompt: "Tap square B2." }, { prompt: "Which square is the big tree in?" }, { prompt: "Which square is the park gate in?" }] },
      { prompt: "Made by nature or by people?", say: "Did nature make this, or people?",
        baskets: [{ label: "made by nature" }, { label: "made by people" }],
        items: [{ say: "a volcano" }, { say: "a forest" }, { say: "a railway station" }, { say: "a town" }] },
      { prompt: "Match the directions", say: "Match each direction with the opposite direction.",
        pairs: [
          [{ label: "north", say: "north" }, { label: "south", say: "south" }],
          [{ label: "east", say: "east" }, { label: "west", say: "west" }],
          [{ label: "north-east", say: "north-east" }, { label: "south-west", say: "south-west" }],
          [{ label: "north-west", say: "north-west" }, { label: "south-east", say: "south-east" }]
        ] },
      { say: "Measure with the map's ruler.",
        tasks: [{ prompt: "About how many metres is it from the big tree to the pond?" }] }
    ] },

    "world-sapling-1": { title: "Mountains, plains, deserts, seas", steps: [
      { prompt: "A trip from the Caspian Sea to the Persian Gulf",
        scenes: [
          { caption: "We start our trip by the Caspian Sea. Here the air is damp and the forests are green." },
          { caption: "We cross the Alborz mountains. Damavand, the highest mountain in Iran, is here. Its top always has snow." },
          { caption: "Below the mountains the plain is flat. Tehran is built on this plain." },
          { caption: "We reach the edge of the Dasht-e Kavir desert: dry, with little rain, and covered with salt in places." },
          { caption: "We cross the Zagros mountains: long, high mountains with oak trees." },
          { caption: "And now we have reached the warm coast of the Persian Gulf!" }
        ] },
      { prompt: "This is a map of Iran's high and low land. Tap the mountains, the deserts and the seas." },
      { say: "Find it on the map.",
        tasks: [
          { prompt: "Where are the Alborz mountains, in the north of Iran?" },
          { prompt: "Where is Mount Damavand, the highest mountain in Iran?" },
          { prompt: "Where are the Zagros mountains, in the west and south-west?" },
          { prompt: "Where is the Dasht-e Kavir desert?" },
          { prompt: "Where is the Lut desert, one of the hottest places on Earth?" }
        ] }
    ] },

    "world-sapling-40": { title: "High and low on the map", steps: [
      { prompt: "The colours of height",
        scenes: [
          { caption: "Look at this mountain from the side. The bottom is green: low land, like the plains by the sea." },
          { caption: "The higher we go, the colour changes: yellow, then brown. The highest part is white: the snow on the top." },
          { caption: "Now we look from above. The same colours look like rings. In the middle, the white is the top." },
          { caption: "The map of Iran has the same colours: green by the seas, brown and white on the mountains." }
        ] },
      { say: "Read the colours of the map.",
        tasks: [
          { prompt: "The highest place is white. Find the top of Damavand." },
          { prompt: "Next to which sea is the land low and green? Find that sea.", say: "In the north, next to which sea is the land low and green? Find that sea." },
          { prompt: "Where is Mount Sabalan, in the north-west?" }
        ] },
      { prompt: "On a relief map, what does white mean?", say: "On a relief map, what does white mean?", options: ["the highest peaks", "the sea", "the plain by the sea"], answer: "the highest peaks" },
      { prompt: "On a relief map, what does green mean?", say: "On a relief map, what does green mean?", options: ["low places", "forest", "a mountain top"], answer: "low places" }
    ] },

    "world-sapling-15": { title: "Iran's rivers and lakes", steps: [
      { prompt: "Where does a river come from?",
        scenes: [
          { caption: "Rivers start in the mountains. Snow and rain fall on the mountains." },
          { caption: "In spring the snow melts. The water runs down the mountain and makes a river." },
          { caption: "The river flows past towns and farms, and at the end it flows into a sea or a lake." }
        ] },
      { say: "Iran's rivers and lake.",
        tasks: [
          { prompt: "The Karun, Iran's fullest river, flows past Ahvaz into the Persian Gulf. Find it." },
          { prompt: "The Zayandeh Rud flows through the middle of Isfahan. Find it." },
          { prompt: "The Sefidrud flows into the Caspian Sea. Find it." },
          { prompt: "The Aras river is on Iran's northern border. Find it." },
          { prompt: "Where is Lake Urmia, a salt lake in the north-west?" }
        ] },
      { prompt: "Each river, each city", say: "Match each river with a city it flows past.",
        pairs: [
          [{ label: "Karun", say: "the Karun river" }, { label: "Ahvaz", say: "Ahvaz" }],
          [{ label: "Zayandeh Rud", say: "the Zayandeh Rud" }, { label: "Isfahan", say: "Isfahan, with its old bridges" }],
          [{ label: "Sefidrud", say: "the Sefidrud" }, { label: "Gilan", say: "Gilan, by the Caspian Sea" }],
          [{ label: "Aras", say: "the Aras river" }, { label: "Jolfa", say: "Jolfa, on the northern border" }]
        ] }
    ] },

    "world-sapling-2": { title: "Four seasons in one day", steps: [
      { prompt: "One winter day, four cities",
        parts: { aT: { art: "Ardabil" }, rT: { art: "Rasht" }, yT: { art: "Yazd" }, cT: { art: "Chabahar" } },
        scenes: [
          { caption: "Today is a winter day. In Ardabil it is snowing. Arman is wearing a coat and a hat." },
          { caption: "On the same day, it is raining in Rasht." },
          { caption: "In Yazd it is sunny and dry, but the air is cold." },
          { caption: "And in Chabahar, by the sea, it is warm. Kian is playing in a T-shirt!" },
          { caption: "Today's weather is different in each place. The usual weather of a place, over many years, is called its climate." },
          { caption: "Why? Mountains are colder. By the Caspian Sea the air is damp. The south of Iran is warmer." }
        ] },
      { prompt: "Each city's climate", say: "Put each city with its climate.",
        baskets: [{ label: "cold, in the mountains" }, { label: "mild and rainy" }, { label: "hot and dry" }, { label: "hot and humid by the sea" }],
        items: [{ label: "Ardabil", say: "Ardabil" }, { label: "Hamadan", say: "Hamadan" }, { label: "Rasht", say: "Rasht" }, { label: "Sari", say: "Sari" },
          { label: "Yazd", say: "Yazd" }, { label: "Kerman", say: "Kerman" }, { label: "Bandar Abbas", say: "Bandar Abbas" }, { label: "Bushehr", say: "Bushehr" }] },
      { say: "Find the cities.",
        tasks: [{ prompt: "Which city is in the mountains and gets lots of snow in winter? Find Ardabil." }, { prompt: "Which city is warm even in winter? Chabahar, by the Sea of Oman." }] }
    ] },

    "world-sapling-41": { title: "Today's weather", steps: [
      { prompt: "The weather forecast",
        scenes: [
          { caption: "The weather presenter puts symbols on the map. A sun means sunny. A cloud with drops means rainy." },
          { caption: "A snowflake means snowy. A sun behind a cloud means partly cloudy." },
          { caption: "Tomorrow it will snow in Tabriz. Ali, who lives in Tabriz, will wear a coat and a hat tomorrow." }
        ] },
      { say: "Today's weather map. Look at the key under the map.",
        tasks: [
          { prompt: "Where is it snowing today? Find one of the snowy cities: Tabriz." },
          { prompt: "Which city by the Caspian Sea is rainy? Find Rasht." },
          { prompt: "Is Bandar Abbas sunny or snowy? Find it." }
        ] },
      { prompt: "It is snowy. What shall we wear?", say: "It is snowy. What shall we wear?", options: [{ value: "shorts" }, { value: "a coat and a hat" }, { value: "flip-flops" }], answer: "a coat and a hat" },
      { prompt: "What does this symbol mean: 🌧️", say: "What does this symbol mean on a weather map?", options: ["sunny", "rainy", "snowy"], answer: "rainy" }
    ] },

    "world-sapling-42": { title: "Where were towns built?", steps: [
      { prompt: "Where do towns grow?",
        scenes: [
          { caption: "People built homes by water, because water is needed for drinking and farming. Ahvaz is by the Karun river." },
          { caption: "A flat plain is good for farms and homes. Isfahan grew on a plain by the Zayandeh Rud." },
          { caption: "Where roads meet, travellers and traders stop. Tabriz was where several old roads met." },
          { caption: "By the sea a port is built, and ships bring and take goods. Bandar Abbas is a big port." }
        ] },
      { say: "Cities and why they were built there.",
        tasks: [
          { prompt: "Which city is by the Karun river?" },
          { prompt: "Which city is on a plain by the Zayandeh Rud?" },
          { prompt: "Which city is a port on the Persian Gulf?" },
          { prompt: "Which city in the north-west was on old trade roads?" }
        ] },
      { prompt: "Why did people build towns by rivers?", say: "Long ago, why did people build towns by rivers?",
        options: ["because water is needed for drinking and farming", "because rivers sound nice", "because there are no mountains by rivers"], answer: "because water is needed for drinking and farming" },
      { prompt: "Where is a port built?", say: "Where is a port built?", options: [{ value: "on a mountain" }, { value: "by the sea" }, { value: "in the middle of the desert" }], answer: "by the sea" }
    ] },

    "world-sapling-3": { title: "Iran's provinces", steps: [
      { say: "Iran has 31 provinces. Each province has towns and villages, and one city that is its centre.",
        tasks: [
          { prompt: "Fars province is in the south of Iran. Find it." },
          { prompt: "Gilan province is by the Caspian Sea. Find it." },
          { prompt: "Khuzestan province is in the south-west, by the Persian Gulf. Find it." },
          { prompt: "Razavi Khorasan province is in the north-east. Find it." },
          { prompt: "East Azerbaijan province is in the north-west. Find it." }
        ] },
      { say: "Each red dot is the centre of a province.",
        tasks: [
          { prompt: "The centre of Fars province is Shiraz. Find Shiraz." },
          { prompt: "The centre of Gilan province is Rasht. Find Rasht." },
          { prompt: "The centre of Khuzestan province is Ahvaz. Find Ahvaz." },
          { prompt: "The centre of Razavi Khorasan province is Mashhad. Find Mashhad." },
          { prompt: "The centre of East Azerbaijan province is Tabriz. Find Tabriz." }
        ] },
      { prompt: "Which city is the centre of Isfahan province?", say: "Which city is the centre of Isfahan province? Many provinces have the same name as their centre.",
        options: ["Isfahan", "Shiraz", "Rasht"], answer: "Isfahan" },
      { prompt: "Each province, its centre", say: "Match each province with its centre city.",
        pairs: [
          [{ label: "Fars", say: "Fars province" }, { label: "Shiraz", say: "Shiraz" }],
          [{ label: "Gilan", say: "Gilan province" }, { label: "Rasht", say: "Rasht" }],
          [{ label: "Khuzestan", say: "Khuzestan province" }, { label: "Ahvaz", say: "Ahvaz" }],
          [{ label: "Razavi Khorasan", say: "Razavi Khorasan province" }, { label: "Mashhad", say: "Mashhad" }]
        ] },
      { prompt: "Turn the cards: each province and its centre", say: "Turn the cards over and find each province with its centre.",
        pairs: [
          [{ label: "Mazandaran", say: "Mazandaran province" }, { label: "Sari", say: "Sari" }],
          [{ label: "Kurdistan", say: "Kurdistan province" }, { label: "Sanandaj", say: "Sanandaj" }],
          [{ label: "Hormozgan", say: "Hormozgan province" }, { label: "Bandar Abbas", say: "Bandar Abbas" }],
          [{ label: "Sistan and Baluchestan", say: "Sistan and Baluchestan province" }, { label: "Zahedan", say: "Zahedan" }]
        ] },
      { tasks: [{ prompt: "Find your own province and tap it.",
        say: "Which province do you live in? Find it and tap it. If you don't live in Iran, find the province your family comes from." }] }
    ] },

    "world-sapling-16": { title: "My province and its neighbours", steps: [
      { tasks: [{ prompt: "Where is your province? Tap it.", say: "Find your own province and tap it. If you don't know, ask a grown-up." }] },
      { caption: "Which city is the centre of your province? Is its land mostly mountains, plains, or by the sea?" },
      { say: "The provinces around a province are its neighbours. Yazd province has six neighbours.",
        tasks: [
          { prompt: "First find Yazd province, in the middle of Iran." },
          { prompt: "Yazd's neighbour to the west: Isfahan province. Find it." },
          { prompt: "Yazd's neighbour to the south-east: Kerman province. Find it." },
          { prompt: "Yazd's neighbour to the south-west: Fars province. Find it." },
          { prompt: "Yazd's neighbour to the east: South Khorasan province. Find it." },
          { prompt: "Yazd's neighbour to the north: Semnan province. Find it." },
          { prompt: "Yazd's neighbour to the north-east: Razavi Khorasan province. Find it." }
        ] },
      { tasks: [
          { prompt: "Gilan province is by the Caspian Sea. Find it." },
          { prompt: "Gilan's neighbour to the east, by the same sea: Mazandaran. Find it." },
          { prompt: "Gilan's neighbour to the north-west: Ardabil. Find it." }
        ] },
      { prompt: "What is each province known for?", say: "Match each province with something it is known for.",
        pairs: [
          [{ label: "Gilan", say: "Gilan province" }, { label: "rice and tea", say: "rice and tea" }],
          [{ label: "Kerman", say: "Kerman province" }, { label: "pistachios", say: "pistachios" }],
          [{ label: "Khuzestan", say: "Khuzestan province" }, { label: "date palms", say: "date palms" }],
          [{ label: "Hormozgan", say: "Hormozgan province" }, { label: "ports and fishing", say: "ports and fishing" }]
        ] },
      { caption: "What is your province known for? Name a food, a place or a handicraft from there." },
      home({ text: "What is our province known for?",
        need: ["A map of Iran (a book, a wall map or a phone)"],
        steps: [
          "Find your province (or the province your family comes from) on the map with your child, and show its centre.",
          "Count the neighbouring provinces with your finger and read their names.",
          "Ask an older relative what your province is known for: a food, a place to see, a handicraft.",
          "Your child draws one of them, and you write the province's name under it."
        ],
        ask: "If a guest came from another province, what would you show them first in ours?" })
    ] },

    "world-sapling-17": { title: "Travel across Iran", steps: [
      { tasks: [{ prompt: "Travel from Tabriz to Bandar Abbas: Tabriz, Tehran, Isfahan, Shiraz, Bandar Abbas.",
        say: "A big trip! Start in Tabriz. Then go to Tehran, then Isfahan, then Shiraz, and last Bandar Abbas, by the Persian Gulf." }] },
      { prompt: "Mountain, desert or sea?", say: "Put each place in its basket: mountain, desert or sea.",
        baskets: [{ label: "mountain" }, { label: "desert" }, { label: "sea" }],
        items: [{ label: "Damavand", say: "Damavand" }, { label: "Zagros", say: "the Zagros" }, { label: "Alborz", say: "the Alborz" },
          { label: "Dasht-e Kavir", say: "Dasht-e Kavir" }, { label: "Lut desert", say: "the Lut desert" },
          { label: "Persian Gulf", say: "the Persian Gulf" }, { label: "Caspian Sea", say: "the Caspian Sea" }] },
      { say: "On the way you see mountains and deserts.",
        tasks: [
          { prompt: "From Tehran you can see Mount Damavand. Find Damavand." },
          { prompt: "Where is Dasht-e Kavir, east of Tehran?" },
          { prompt: "From Isfahan to Shiraz we go along the Zagros mountains. Find them." }
        ] },
      { prompt: "Turn the cards: each river, each city", say: "Turn the cards over and find each river with its city.",
        pairs: [
          [{ label: "Zayandeh Rud", say: "the Zayandeh Rud" }, { label: "Isfahan", say: "Isfahan" }],
          [{ label: "Karun", say: "the Karun river" }, { label: "Ahvaz", say: "Ahvaz" }],
          [{ label: "Aras", say: "the Aras river" }, { label: "Jolfa", say: "Jolfa" }]
        ] },
      { prompt: "Which city's weather?", say: "Put each city with its climate: cold, in the mountains, or hot, by the sea.",
        baskets: [{ label: "cold, in the mountains" }, { label: "hot, by the sea" }],
        items: [{ label: "Tabriz", say: "Tabriz" }, { label: "Ardabil", say: "Ardabil" }, { label: "Hamadan", say: "Hamadan" },
          { label: "Bandar Abbas", say: "Bandar Abbas" }, { label: "Bushehr", say: "Bushehr" }, { label: "Chabahar", say: "Chabahar" }] },
      { say: "Which provinces are the cities of your trip the centres of?",
        tasks: [
          { prompt: "Tabriz is the centre of which province? Tap it: East Azerbaijan." },
          { prompt: "Shiraz is the centre of which province? Tap it: Fars." },
          { prompt: "Bandar Abbas is the centre of which province? Tap it: Hormozgan." }
        ] },
      { prompt: "Turn the cards: each province and its centre", say: "Turn the cards over and find each province with its centre.",
        pairs: [
          [{ label: "East Azerbaijan", say: "East Azerbaijan province" }, { label: "Tabriz", say: "Tabriz" }],
          [{ label: "Fars", say: "Fars province" }, { label: "Shiraz", say: "Shiraz" }],
          [{ label: "Hormozgan", say: "Hormozgan province" }, { label: "Bandar Abbas", say: "Bandar Abbas" }],
          [{ label: "Razavi Khorasan", say: "Razavi Khorasan province" }, { label: "Mashhad", say: "Mashhad" }]
        ] }
    ] },

    "world-sapling-4": { title: "Qanats and windcatchers", steps: [
      { prompt: "Living with little water",
        scenes: [
          { caption: "Yazd is at the edge of the desert. Little rain falls and summer is very hot. What did people long ago do for water and coolness?" },
          { caption: "A qanat: a waterway under the ground. Water comes slowly from under the mountain to the village, in a gently sloping tunnel." },
          { caption: "Above the qanat there is a row of wells. Qanat diggers went down these wells to dig the tunnel and keep it clean." },
          { caption: "A windcatcher: a tall tower on a house. It catches the wind and sends it down into the rooms. The rooms get cool." },
          { caption: "An ab-anbar: a big pool under the ground, under a dome. The water stays cool and clean. Its windcatchers keep the air cool." },
          { caption: "An old ice house: on winter nights, water froze by its tall wall. People kept the ice in this dome until summer." },
          { caption: "With thinking and knowledge, people lived well in a dry, hot place. In Yazd we still see windcatchers, ab-anbars and old ice houses." }
        ] },
      { prompt: "Where does qanat water go?", say: "Where is the qanat's water first? Where does it go next? Put them in order.",
        items: [{ label: "snow on the mountain", say: "snow and rain on the mountain" }, { label: "water under the mountain", say: "the water goes under the ground of the mountain" },
          { label: "the qanat tunnel", say: "the water flows in the qanat tunnel" }, { label: "the village", say: "the water reaches the village" }, { label: "the farm", say: "the farm drinks the water" }] },
      { prompt: "Why did people in Yazd build windcatchers?", say: "Why did people in Yazd build windcatchers on their houses?",
        options: ["to keep the house cool in summer", "to make more rain fall", "to make the house look taller"], answer: "to keep the house cool in summer" },
      { prompt: "Why is a qanat under the ground?", say: "Why does qanat water flow under the ground, not on top of it?",
        options: ["so the water doesn't dry up in the hot sun", "because water is afraid of the sun", "so nobody sees the water"], answer: "so the water doesn't dry up in the hot sun" },
      { prompt: "Each building, its job", say: "Match each building with its job.",
        pairs: [
          [{ label: "qanat", say: "a qanat" }, { label: "brings water", say: "brings water from under the mountain" }],
          [{ label: "windcatcher", say: "a windcatcher" }, { label: "cools the house", say: "sends the wind into the house" }],
          [{ label: "ab-anbar", say: "an ab-anbar" }, { label: "keeps water", say: "keeps water cool" }],
          [{ label: "ice house", say: "an old ice house" }, { label: "keeps ice", say: "keeps ice until summer" }]
        ] },
      home({ text: "Make a little windcatcher!",
        need: ["a small cardboard box or tissue box", "scissors and glue", "a piece of tissue or thin paper"],
        steps: [
          "Glue a small cardboard tower, open at the top, onto the box: this is the windcatcher.",
          "Hang a piece of thin tissue inside the box, under the tower.",
          "Put it by a window or in front of a fan and watch: the wind comes down the tower and the tissue moves.",
          "Ask: “How did people long ago keep their homes cool without electricity or air conditioners?”"
        ],
        ask: "If you lived in a very hot, dry place, what would you build for water and coolness?" })
    ] },

    "world-sapling-18": { title: "Where does our town's water come from?", steps: [
      { prompt: "From the dam to the tap",
        scenes: [
          { caption: "Little rain and snow fall in Iran. The water of many towns comes from the lake behind a dam." },
          { caption: "Big pipes take the dam's water to a treatment works. There the water is made clean and safe." },
          { caption: "Then the water goes through pipes under the streets to the houses and comes out of the tap." },
          { caption: "Sara's home: the tap is dripping. A dripping tap can waste two or three buckets of water in a day!" },
          { caption: "Sara tells her dad. Dad changes the tap's washer. Now the water doesn't drip any more." }
        ] },
      { prompt: "How does water get to the tap at home?", say: "Where is the water first? Where does it go next? Put them in order.",
        items: [{ label: "the dam lake", say: "the lake behind the dam" }, { label: "treatment works", say: "the treatment works, which cleans the water" },
          { label: "pipes under the street", say: "the pipes under the street" }, { label: "the tap at home", say: "the tap at home" }] },
      { prompt: "Why must we take care of water in Iran?", say: "Why must we take good care of water in Iran?",
        options: ["because little rain falls", "because water is expensive", "because water is coloured"], answer: "because little rain falls" },
      { prompt: "Does it save water or waste it?", say: "Put each thing in its basket: it saves water, or it wastes water.",
        baskets: [{ label: "saves water" }, { label: "wastes water" }],
        items: [
          { label: "turning off the tap while brushing", say: "we turn off the tap while brushing our teeth" },
          { label: "a short shower", say: "we take a short shower" },
          { label: "vegetable-washing water for plants", say: "we give the water from washing vegetables to the plants" },
          { label: "a dripping tap", say: "the tap is dripping" },
          { label: "washing the car with a hose", say: "we wash the car with the hose running" },
          { label: "tap running while washing dishes", say: "the tap keeps running while we wash the dishes" }
        ] },
      home({ text: "How much water does a dripping tap waste?",
        need: ["a glass or a kitchen measuring jug", "a clock or a phone to time it"],
        steps: [
          "Open the tap just a tiny bit so it only drips, and put the glass under it.",
          "Wait ten minutes. Then look at how much water is in the glass.",
          "Say: a day has 144 lots of ten minutes! If the tap dripped all day, how many glasses would that be? (Work it out or guess together.)",
          "Don't pour the water away: give it to a plant. If a tap drips at home, fix it together or tell someone."
        ],
        ask: "Where can you save water today?" })
    ] },

    "world-sapling-19": { title: "The water game", steps: [
      { prompt: "Long ago or today?", say: "Put each thing in its basket: is it from long ago, or today?",
        baskets: [{ label: "long ago" }, { label: "today" }],
        items: [{ label: "qanat", say: "a qanat" }, { label: "ab-anbar", say: "an ab-anbar" }, { label: "water jug", say: "a clay water jug" },
          { label: "dome ice house", say: "an old dome ice house" }, { label: "dam", say: "a dam" }, { label: "water pipes", say: "water pipes" },
          { label: "fridge", say: "an electric fridge" }, { label: "air cooler", say: "an air cooler" }] },
      { prompt: "Long ago and today: the same job", say: "Match each old thing with the thing that does the same job today.",
        pairs: [
          [{ label: "windcatcher", say: "a windcatcher" }, { label: "air cooler", say: "an air cooler" }],
          [{ label: "dome ice house", say: "an old dome ice house" }, { label: "fridge", say: "an electric fridge" }],
          [{ label: "ab-anbar", say: "an ab-anbar" }, { label: "water tank", say: "a water tank on the roof" }],
          [{ label: "qanat", say: "a qanat" }, { label: "water pipes", say: "water pipes" }]
        ] },
      { prompt: "Qanat water", say: "Where is the qanat's water first? Put them in order.",
        items: [{ label: "under the mountain", say: "the water under the mountain" }, { label: "the qanat tunnel", say: "the qanat tunnel" },
          { label: "the village", say: "the village" }, { label: "the farm", say: "the farm" }] },
      { prompt: "Tap water", say: "Where is the town's water first? Put them in order.",
        items: [{ label: "the dam lake", say: "the dam lake" }, { label: "treatment works", say: "the treatment works" },
          { label: "pipes under the street", say: "the pipes under the street" }, { label: "the tap at home", say: "the tap at home" }] },
      { prompt: "Saving water", say: "Which saves water, and which wastes it?",
        baskets: [{ label: "saves" }, { label: "wastes" }],
        items: [{ label: "collecting rain for the garden", say: "we collect rainwater for the garden" }, { label: "fixing a dripping tap", say: "we fix a dripping tap" },
          { label: "a glass of water for brushing", say: "we use one glass of water for brushing our teeth" }, { label: "a full bath every time", say: "we fill the bath every time" },
          { label: "watering grass at noon in summer", say: "we water the grass at noon in summer, in the hot sun" }] }
    ] },

    "world-sapling-20": { title: "People of the provinces", steps: [
      { prompt: "A day in five provinces",
        scenes: [
          { caption: "Let's meet children from five provinces of Iran and see what they eat and how they live." },
          { caption: "Aylar lives in Tabriz. Winters are cold. For lunch they eat kufteh tabrizi. She says thank you in Azerbaijani Turkish: “Sagh ol!”" },
          { caption: "Zhiyar lives in Sanandaj, in Kurdistan. For breakfast they eat kalaneh bread: bread with greens. He says thank you in Kurdish: “Supas!”" },
          { caption: "Negar lives in Rasht, in Gilan. It rains a lot there. They eat mirza ghasemi with rice." },
          { caption: "Reem lives in Ahvaz, in Khuzestan. It is hot, and there are many date palms. Ahvazi falafel is famous. She says thank you in Arabic: “Shukran!”" },
          { caption: "Mahgol lives in Chabahar, in Sistan and Baluchestan. Mangoes and bananas grow there. Her dress has needlework. She says thank you in Balochi: “Minnatwar!”" },
          { caption: "Our foods and languages are different. But at Nowruz we all lay the haft-sin, and we welcome guests with tea." }
        ] },
      { prompt: "Each province, a food", say: "Match each province with a food it is known for.",
        pairs: [
          [{ label: "Azerbaijan", say: "Azerbaijan, Tabriz" }, { label: "kufteh tabrizi", say: "kufteh tabrizi" }],
          [{ label: "Kurdistan", say: "Kurdistan, Sanandaj" }, { label: "kalaneh bread", say: "kalaneh bread" }],
          [{ label: "Gilan", say: "Gilan, Rasht" }, { label: "mirza ghasemi", say: "mirza ghasemi" }],
          [{ label: "Khuzestan", say: "Khuzestan, Ahvaz" }, { label: "Ahvazi falafel", say: "Ahvazi falafel" }],
          [{ label: "Sistan and Baluchestan", say: "Sistan and Baluchestan, Chabahar" }, { label: "mango", say: "mango" }]
        ] },
      { prompt: "Each friend, where?", say: "Match each friend with their city.",
        pairs: [
          [{ label: "Aylar", say: "Aylar" }, { label: "Tabriz", say: "Tabriz" }],
          [{ label: "Zhiyar", say: "Zhiyar" }, { label: "Sanandaj", say: "Sanandaj" }],
          [{ label: "Negar", say: "Negar" }, { label: "Rasht", say: "Rasht" }],
          [{ label: "Reem", say: "Reem" }, { label: "Ahvaz", say: "Ahvaz" }],
          [{ label: "Mahgol", say: "Mahgol" }, { label: "Chabahar", say: "Chabahar" }]
        ] },
      { prompt: "At Nowruz, what do they all lay out?", say: "Aylar, Zhiyar, Negar, Reem and Mahgol: at Nowruz, what do they all lay out?",
        options: [{ value: "the haft-sin" }, { value: "a birthday cake" }, { value: "balloons" }], answer: "the haft-sin" },
      { caption: "What is your family's favourite food? Which city or province is it from? What do you do when guests come?" }
    ] },

    "world-sapling-43": { title: "Languages and scripts of Iran", steps: [
      { prompt: "One word, many scripts",
        scenes: [
          { caption: "Kian, Aylar, Zhiyar, Reem and Mahgol each write the word “water” in their own language." },
          { caption: "Persian, Azerbaijani Turkish, Kurdish, Arabic and Balochi are written with letters that look alike. Look how alike Persian «آب» and Balochi «آپ» are!" },
          { caption: "Ani is Armenian and lives in Isfahan. Armenian has its own alphabet. This is “water” in Armenian.",
            say: "Ani is Armenian and lives in Isfahan. Armenian has its own alphabet. Look how “water” is written in Armenian." },
          { caption: "Shamiram is Assyrian and lives in Urmia. Assyrian has its own alphabet too. This is “water” in Assyrian.",
            say: "Shamiram is Assyrian and lives in Urmia. Assyrian has its own alphabet too. Look how “water” is written in Assyrian." },
          { caption: "Seven friends, seven ways of writing. But they all say the same thing: water! Every language and every script is precious." }
        ] },
      { prompt: "Each friend, “water” in their language", say: "Match each friend with the word for water in their language.",
        pairs: [
          [{ label: "Aylar, Azerbaijani", say: "Aylar, Azerbaijani Turkish" }, { say: "water, in Azerbaijani Turkish" }],
          [{ label: "Zhiyar, Kurdish", say: "Zhiyar, Kurdish" }, { say: "water, in Kurdish" }],
          [{ label: "Reem, Arabic", say: "Reem, Arabic" }, { say: "water, in Arabic" }],
          [{ label: "Ani, Armenian", say: "Ani, Armenian" }, { say: "water, in Armenian" }]
        ] },
      { prompt: "Which one is written in a different script?", say: "One of these words is written with completely different letters. Which one?",
        options: ["آب", "آپ", "ջուր"], answer: "ջուր" },
      { caption: "Does someone in your family or class speak another language too? Ask them to say and write “water” in their language." }
    ] },

    "world-sapling-21": { title: "Tales of the people of Iran", steps: [
      { prompt: "Eat, my coat, eat!",
        parts: { b1w: { art: "Eat, coat, eat!" }, b2w: { art: "You honoured my coat!" } },
        scenes: [
          { caption: "Mulla Nasreddin's stories are told all over Iran: in Persian, Turkish, Kurdish and Arabic. One day the Mulla was invited to a party." },
          { caption: "The Mulla went in his old clothes. Nobody said hello to him, and nobody gave him a place by the sofreh. The Mulla was sad." },
          { caption: "The Mulla went home, put on a fine new coat and came back." },
          { caption: "This time the host came up to him, said hello and took the Mulla to the sofreh." },
          { caption: "The Mulla held his sleeve over the bowl of soup and said: “Eat, my coat, eat!”" },
          { caption: "Everyone was surprised. The Mulla said: “You honoured my coat, not me!” Love people for who they are, not for their clothes." }
        ] },
      { prompt: "The Mulla's story in order", say: "What happened first? What next? Put the story in order.",
        items: [{ label: "went in old clothes", say: "the Mulla went to the party in old clothes" }, { label: "nobody said hello", say: "nobody said hello to him" },
          { label: "put on a new coat", say: "the Mulla put on a new coat and came back" }, { label: "Eat, coat!", say: "the Mulla said: Eat, my coat, eat!" }] },
      { prompt: "What does this story teach us?", say: "What does the story of the Mulla and the coat teach us?",
        options: ["to respect people for who they are, not their clothes", "to always wear a new coat", "to eat soup with our sleeves"], answer: "to respect people for who they are, not their clothes" },
      { prompt: "Read the story “The elephant in the dark”. Rumi told this story in the Masnavi.",
        text: "Some people had never seen an elephant. An elephant was brought into a dark room. One touched its trunk and said: “An elephant is like a pipe.” One felt its ear and said: “An elephant is like a fan.” One held its leg and said: “An elephant is like a pillar.” If they had had a candle, they would all have seen the elephant together.",
        question: "Why did each person say something different?",
        options: ["because each one touched only one part of the elephant", "because the elephant changed shape", "because they were arguing"], answer: "because each one touched only one part of the elephant" },
      { prompt: "What does “The elephant in the dark” teach us?", say: "What does the story of the elephant in the dark teach us?",
        options: ["to listen to others too, because each one knows a part", "not to go into dark rooms", "that an elephant is like a fan"], answer: "to listen to others too, because each one knows a part" },
      { caption: "Do you know a story from your town, or from your grandparents? Tell it. What does that story teach you?" }
    ] },

    "world-sapling-6": { title: "Skilful hands", steps: [
      { prompt: "Craft workshops",
        scenes: [
          { caption: "In Tabriz they weave carpets. The weaver ties the threads knot by knot, and the carpet's pattern slowly appears." },
          { caption: "In Isfahan they make blue tiles and cover the walls of old buildings with them." },
          { caption: "Qalamkar is from Isfahan too: with wooden stamps, they print the patterns on cloth one by one." },
          { caption: "In Shiraz they make khatam: they set tiny pieces of wood and metal side by side to make a star pattern." },
          { caption: "In Lalejin, near Hamadan, the potter spins the clay on a wheel and makes a turquoise jug." },
          { caption: "Every handicraft takes patience and skill. Carpets, tiles, qalamkar, khatam and pottery: each from a corner of Iran." }
        ] },
      { prompt: "Each craft, which city?", say: "Match each handicraft with its city.",
        pairs: [
          [{ label: "carpet", say: "a carpet" }, { label: "Tabriz", say: "Tabriz" }],
          [{ label: "tiles", say: "blue tiles" }, { label: "Isfahan", say: "Isfahan" }],
          [{ label: "khatam", say: "khatam" }, { label: "Shiraz", say: "Shiraz" }],
          [{ label: "turquoise pottery", say: "turquoise pottery" }, { label: "Lalejin, Hamadan", say: "Lalejin, near Hamadan" }]
        ] },
      { prompt: "Each craft, what is it made of?", say: "Match each handicraft with what it is made of.",
        pairs: [
          [{ label: "carpet", say: "a carpet" }, { label: "thread and wool", say: "thread and wool" }],
          [{ label: "pottery", say: "pottery" }, { label: "clay", say: "clay" }],
          [{ label: "qalamkar", say: "qalamkar" }, { label: "cloth", say: "cloth" }],
          [{ label: "khatam", say: "khatam" }, { label: "tiny pieces of wood", say: "tiny pieces of wood and metal" }]
        ] },
      { prompt: "How does a weaver make a carpet?", say: "How does a weaver make a carpet?",
        options: ["knot by knot, patiently", "with one stamp, in a moment", "on a potter's wheel"], answer: "knot by knot, patiently" },
      home({ text: "Find an Iranian handicraft!",
        need: ["a carpet, kilim, tile, clay dish, qalamkar tablecloth or khatam box at home (or a photo of one)", "paper and coloured pencils"],
        steps: [
          "Look for a handicraft at home with your child. If you don't have one, look at a photo together.",
          "Look at it closely: what colours and patterns does it have? Do the patterns repeat?",
          "Ask: “How long do you think it took to make? What is it made of?”",
          "Your child draws a simple pattern from it, or glues bits of coloured paper side by side, like khatam."
        ],
        ask: "If you were a craftsperson, which handicraft would you learn?" })
    ] },

    "world-sapling-22": { title: "The people of Iran game", steps: [
      { say: "Which province do our friends live in?",
        tasks: [
          { prompt: "Aylar lives in Tabriz. Find her province: East Azerbaijan." },
          { prompt: "Zhiyar lives in Sanandaj. Find his province: Kurdistan." },
          { prompt: "Negar lives in Rasht. Find her province: Gilan." },
          { prompt: "Reem lives in Ahvaz. Find her province: Khuzestan." },
          { prompt: "Mahgol lives in Chabahar. Find her province: Sistan and Baluchestan." }
        ] },
      { prompt: "Turn the cards: each friend, their thank-you", say: "Turn the cards over and find each friend with their word for thank you.",
        pairs: [
          [{ label: "Aylar", say: "Aylar, from Tabriz" }, { say: "thank you, in Azerbaijani Turkish" }],
          [{ label: "Zhiyar", say: "Zhiyar, from Sanandaj" }, { say: "thank you, in Kurdish" }],
          [{ label: "Reem", say: "Reem, from Ahvaz" }, { say: "thank you, in Arabic" }],
          [{ label: "Mahgol", say: "Mahgol, from Chabahar" }, { say: "thank you, in Balochi" }]
        ] },
      { prompt: "Handicraft or food?", say: "Put each one in its basket: a handicraft, or a food.",
        baskets: [{ label: "handicraft" }, { label: "food" }],
        items: [{ label: "carpet", say: "a carpet" }, { label: "khatam", say: "khatam" }, { label: "qalamkar", say: "qalamkar" }, { label: "pottery", say: "pottery" },
          { label: "kufteh tabrizi", say: "kufteh tabrizi" }, { label: "kalaneh bread", say: "kalaneh bread" }, { label: "mirza ghasemi", say: "mirza ghasemi" }, { label: "Ahvazi falafel", say: "Ahvazi falafel" }] },
      { prompt: "Turn the cards: each craft, its city", say: "Turn the cards over and find each handicraft with its city.",
        pairs: [
          [{ label: "carpet", say: "a carpet" }, { label: "Tabriz", say: "Tabriz" }],
          [{ label: "tiles", say: "tiles" }, { label: "Isfahan", say: "Isfahan" }],
          [{ label: "khatam", say: "khatam" }, { label: "Shiraz", say: "Shiraz" }],
          [{ label: "pottery", say: "turquoise pottery" }, { label: "Hamadan", say: "Lalejin, near Hamadan" }]
        ] },
      { say: "Find the cities of the handicrafts.",
        tasks: [
          { prompt: "Tabriz carpets are famous. Find Tabriz." },
          { prompt: "Which city makes tiles and qalamkar? Find Isfahan." },
          { prompt: "Khatam is made in Shiraz. Find Shiraz." },
          { prompt: "Lalejin is near Hamadan. Find Hamadan." }
        ] },
      { prompt: "The same letters, or another script?", say: "Put each word for water in its basket: written with letters like Persian, or in another script.",
        baskets: [{ label: "letters like Persian" }, { label: "another script" }],
        items: [{ say: "water, in Persian" }, { say: "water, in Azerbaijani Turkish" }, { say: "water, in Kurdish" }, { say: "water, in Arabic" },
          { say: "water, in Armenian" }, { say: "water, in Assyrian" }] },
      { prompt: "The Mulla told his coat “Eat!”. Why?", say: "In the story, the Mulla told his coat: Eat! Why?",
        options: ["because the guests honoured the coat, not him", "because the coat was hungry", "because the soup was cold"], answer: "because the guests honoured the coat, not him" }
    ] },

    "world-sapling-23": { title: "How does our town work?", steps: [
      { prompt: "A morning in town",
        parts: { fireT: { art: "Fire station" }, libT: { art: "Library" }, postT: { art: "Post" } },
        scenes: [
          { caption: "It is morning. Hasti and her dad are walking in town. The street sweeper sweeps the street, and the rubbish lorry takes the rubbish away." },
          { caption: "This is a power pole. Electricity reaches the houses along these wires. The electrician makes sure the wires are safe." },
          { caption: "This is the fire station. Fire fighters are always ready to help people." },
          { caption: "At the library, the librarian helps Hasti find a book she likes." },
          { caption: "The postman takes parcels and letters from the post office to the houses." },
          { caption: "These people work for all of us every day. We help too: we put rubbish in the bin, and we don't waste water or electricity." }
        ] },
      { prompt: "Each job, which person?", say: "Match each town job with the person who does it.",
        pairs: [
          [{ label: "a clean street", say: "cleaning the street" }, { label: "street sweeper", say: "the street sweeper" }],
          [{ label: "electricity", say: "electricity" }, { label: "electrician", say: "the electrician" }],
          [{ label: "fire station", say: "the fire station" }, { label: "fire fighter", say: "the fire fighter" }],
          [{ label: "library", say: "the library" }, { label: "librarian", say: "the librarian" }],
          [{ label: "post", say: "the post" }, { label: "postman", say: "the postman" }]
        ] },
      { prompt: "How do you help your town?", say: "How can you help the people who work for the town?",
        options: [{ value: "I put rubbish in the bin" }, { value: "I leave the lights on" }, { value: "I leave the tap running" }], answer: "I put rubbish in the bin" },
      { prompt: "Where do you go to borrow a book?", say: "If you want to borrow a book and read it, where do you go?",
        options: [{ value: "the library" }, { value: "the post office" }, { value: "the fire station" }], answer: "the library" }
    ] },

    "world-sapling-24": { title: "We decide together", steps: [
      { prompt: "What game should the class play?",
        scenes: [
          { caption: "It's PE time. The children in the class must decide together what to play." },
          { caption: "Nima says his idea: “Let's play ball!” Sara says: “Skipping is better!”" },
          { caption: "The others listen. Everyone says their idea, and nobody interrupts." },
          { caption: "The teacher says: “Let's vote. Everyone who wants to play ball, put your hand up.” Three hands go up." },
          { caption: "“Who wants to skip?” Two hands go up. Three is more than two, so today they play ball." },
          { caption: "In the playground, Sara plays happily too, even though she voted for something else. The teacher says: “Tomorrow it's skipping's turn!”" }
        ] },
      { prompt: "Deciding together, in order", say: "To decide together, what do we do first? What next? Put them in order.",
        items: [{ label: "say your idea", say: "say your idea" }, { label: "listen to the others", say: "listen to what the others say" },
          { label: "vote", say: "vote together" }, { label: "accept the choice", say: "accept the group's choice" }] },
      { prompt: "If your idea gets fewer votes, what do you do?", say: "If what you wanted gets fewer votes, what do you do?",
        options: ["I play with the others; next time it may be my idea's turn", "I sulk and don't play", "I shout until everyone picks my idea"],
        answer: "I play with the others; next time it may be my idea's turn" },
      { prompt: "When your friend is saying their idea, what do you do?", say: "When your friend is saying their idea, what do you do?",
        options: ["I listen and don't interrupt", "I talk over them", "I turn away"], answer: "I listen and don't interrupt" },
      { caption: "How do you decide things together at home? For example, where to go on Friday or what to cook for dinner. Have a vote together once!" }
    ] },

    "world-sapling-25": { title: "Our town game", steps: [
      { prompt: "Each person, their tool", say: "Match each person who works for the town with their tool.",
        pairs: [
          [{ label: "street sweeper", say: "the street sweeper" }, { label: "broom", say: "a broom" }],
          [{ label: "fire fighter", say: "the fire fighter" }, { label: "fire engine", say: "a fire engine" }],
          [{ label: "postman", say: "the postman" }, { label: "parcel", say: "a parcel" }],
          [{ label: "librarian", say: "the librarian" }, { label: "books", say: "books" }],
          [{ label: "electrician", say: "the electrician" }, { label: "power wire", say: "a power wire" }]
        ] },
      { prompt: "Turn the cards: each place, what do we do?", say: "Turn the cards over and find each place in town with what we do there.",
        pairs: [
          [{ label: "library", say: "the library" }, { label: "we borrow books", say: "we borrow books" }],
          [{ label: "post office", say: "the post office" }, { label: "we send letters", say: "we send letters and parcels" }],
          [{ label: "rubbish bin", say: "the rubbish bin" }, { label: "we put rubbish in", say: "we put rubbish in it" }],
          [{ label: "tap", say: "the tap" }, { label: "we get water", say: "we get clean water" }]
        ] },
      { prompt: "Does it help the town?", say: "Put each thing in its basket: it helps the town and its people, or it makes their work harder.",
        baskets: [{ label: "helps" }, { label: "makes work harder" }],
        items: [{ label: "rubbish in the bin", say: "we put rubbish in the bin" }, { label: "turning off extra lights", say: "we turn off extra lights" },
          { label: "returning library books", say: "we return library books on time" }, { label: "sweet wrappers in the street", say: "we drop sweet wrappers in the street" },
          { label: "leaving the tap running", say: "we leave the tap running" }, { label: "drawing on walls", say: "we draw on the street walls" }] },
      { prompt: "Deciding together: good or not?", say: "Which is good for deciding together, and which is not?",
        baskets: [{ label: "good" }, { label: "not good" }],
        items: [{ label: "listening", say: "we listen to the others" }, { label: "voting", say: "we vote together" }, { label: "taking turns", say: "we take turns choosing" },
          { label: "shouting", say: "we shout" }, { label: "interrupting", say: "we interrupt the others" }, { label: "sulking", say: "we sulk" }] },
      { prompt: "Let's decide together", say: "To decide together, what do we do, in order?",
        items: [{ label: "say your idea", say: "say your idea" }, { label: "listen", say: "listen to the others" },
          { label: "vote", say: "vote" }, { label: "accept the choice", say: "accept the choice" }] }
    ] },

    "world-sapling-29": { title: "Long ago, very long ago", steps: [
      { prompt: "A trip along the timeline",
        parts: { t0: { art: "today" }, t1: { art: "Mum and Dad small" }, t2: { art: "Grandpa small" }, t3: { art: "long ago" }, t4: { art: "very long ago" } },
        scenes: [
          { caption: "This is Arman. Today we travel back in time along the timeline. Here is “today”: we have mobile phones." },
          { caption: "Years ago, Arman's mum and dad were children. There were no mobile phones then; telephones had wires." },
          { caption: "Many years before that, Grandma and Grandpa were children. Then, families sat round the radio and listened to stories." },
          { caption: "Long ago there were no cars. People travelled on horses and with camel caravans." },
          { caption: "Very, very long ago, thousands of years ago, people lived in caves. They made tools from stone and lit fires." },
          { caption: "The further along the timeline we go, the older things get. Now Arman goes back to today!" }
        ] },
      { prompt: "Each thing, when?", say: "Put each picture in its place on the timeline.",
        items: [{ say: "lighting a fire in a cave" }, { say: "travelling on a horse" }, { say: "an old radio" }, { say: "a telephone with a wire" }, { say: "a mobile phone" }] },
      { prompt: "From the oldest to today", say: "Put these in order: the oldest first, today last.",
        items: [{ label: "stone tool", say: "a stone tool in a cave" }, { label: "camel caravan", say: "a camel caravan" },
          { label: "radio", say: "an old radio" }, { label: "mobile phone", say: "a mobile phone" }] },
      { prompt: "Which is older?", say: "Which is older: when Grandpa was a child, or when Dad was a child?",
        options: ["when Grandpa was a child", "when Dad was a child"], answer: "when Grandpa was a child" },
      { caption: "Ask Grandpa or Grandma: “When you were a child, what didn't you have that we have now?”" }
    ] },

    "world-sapling-46": { title: "Little archaeologist", steps: [
      { prompt: "What is under the ground?",
        parts: { older: { art: "older" }, l1: { art: "today" }, l2: { art: "long ago" }, l3: { art: "very long ago" } },
        scenes: [
          { caption: "This is Mina. She is an archaeologist: she looks for things that people long ago left behind." },
          { caption: "The ground is in layers, like a layer cake. The soil of each time has built up on top of the soil of the time before." },
          { caption: "So the deeper we go, the older the layer is." },
          { caption: "Mina gently moves the soil away. In the top layer she finds a bottle cap: from just a few years ago." },
          { caption: "Deeper down, she finds a piece of a clay pot: from long ago." },
          { caption: "Deepest of all, she finds a stone tool: the oldest thing, from thousands of years ago!" },
          { caption: "Mina looks at each thing carefully, takes a photo and asks: “What is it? Who made it? What for?”" }
        ] },
      { caption: "A piece of an old clay pot, painted", say: "This is a piece of a very old clay pot. Look at it carefully.",
        look: [{ say: "Look at these zigzag lines. What do they look like?" }, { say: "Look at this animal: it has long horns. What animal is it?" }],
        ask: { see: ["the colour of the pot and the lines on it", "an animal with horns, maybe a mountain goat", "the broken edges"],
          think: ["the pot was for water or food", "the person who made it liked painting", "the pot fell and broke"],
          wonder: ["how many years ago was it made?", "where is the rest of the pot?", "why did they paint a goat on it?"] } },
      { prompt: "From top to bottom", say: "Mina found these from the top of the soil to the bottom. Put them in order: the top one first, the deepest last.",
        items: [{ label: "bottle cap", say: "a bottle cap, the top layer" }, { label: "piece of pot", say: "a piece of pot, the middle layer" },
          { label: "stone tool", say: "a stone tool, the deepest layer" }] },
      { prompt: "Which is the oldest of all?", say: "Which is the oldest of all? Remember: deeper means older.",
        options: [{ value: "stone tool, the deepest layer" }, { value: "piece of pot, the middle layer" }, { value: "bottle cap, the top layer" }],
        answer: "stone tool, the deepest layer" },
      { prompt: "When an archaeologist finds something, what does she do?", say: "When an archaeologist finds something, what does she do?",
        options: ["looks at it carefully and asks: what is this?", "throws it away quickly", "breaks it to see inside"], answer: "looks at it carefully and asks: what is this?" }
    ] },

    "world-sapling-30": { title: "Hunters and gatherers", steps: [
      { prompt: "Living in a cave",
        scenes: [
          { caption: "Very, very long ago, thousands of years ago, people lived in caves in the Zagros mountains. Near Khorramabad, these caves are still there." },
          { caption: "They had no houses and no farms. They gathered fruit and seeds, and they hunted animals." },
          { caption: "Their tools were made of stone. They knocked one stone against another to make its edge sharp." },
          { caption: "They lit fires too: to keep warm, to cook food and to keep animals away." },
          { caption: "At night the family gathered round the fire. Maybe they told each other stories too." }
        ] },
      { caption: "A stone tool, like the tools found in the caves of the Zagros", say: "This is a stone tool, like the tools found in the caves of the Zagros. Look at it carefully.",
        look: [{ say: "Look at the top of the tool: is it sharp or round?" }, { say: "Look at these flat places. How do you think they were made?" }],
        ask: { see: ["a grey stone", "one sharp end and one wide end", "pieces chipped off its sides"],
          think: ["they cut wood or meat with it", "they shaped the stone with another stone", "it fitted in a hand"],
          wonder: ["how long did it take to make?", "who made it?", "how did it end up under the ground?"] } },
      { prompt: "Did the cave people have it?", say: "The people who lived in caves thousands of years ago: did they have this, or not?",
        baskets: [{ label: "they had it" }, { label: "they didn't" }],
        items: [{ label: "fire", say: "fire" }, { label: "stone tools", say: "stone tools" }, { label: "wild berries", say: "wild berries" },
          { label: "a brick house", say: "a brick house" }, { label: "a wheat field", say: "a wheat field" }, { label: "a car", say: "a car" }] },
      { prompt: "How did fire help the cave people?", say: "How did fire help the cave people?",
        options: [{ value: "they kept warm and cooked food" }, { value: "they watched television" }, { value: "they travelled" }], answer: "they kept warm and cooked food" }
    ] },

    "world-sapling-31": { title: "The first farmers", steps: [
      { prompt: "The first villages",
        scenes: [
          { caption: "About ten thousand years ago, the people of the Zagros learned something new: they sowed wild wheat seeds in the soil." },
          { caption: "The wheat came up green and grew. Now, every year, they had bread and food right by their home." },
          { caption: "They tamed mountain goats and kept them. The goats gave them milk and wool." },
          { caption: "They no longer had to keep moving. They built mud houses by their fields. The first villages were made!" },
          { caption: "One of the oldest villages is Ganj Dareh, near Kermanshah. Archaeologists have found mud houses and goat bones there." }
        ] },
      { prompt: "From caves to villages", say: "How did people's lives change? Put them in order.",
        items: [{ label: "living in caves", say: "living in caves and hunting" }, { label: "sowing wheat", say: "sowing wheat seeds" },
          { label: "keeping goats", say: "taming and keeping goats" }, { label: "a mud village", say: "building a village of mud houses" }] },
      { prompt: "When?", say: "Put each thing in its place on the timeline.",
        items: [{ say: "a fire in a cave" }, { say: "the first wheat fields" }, { say: "the first goats people kept" }, { say: "a camel caravan" }, { say: "a tractor" }] },
      { prompt: "Why did people stay in the village?", say: "Why did people stop moving and stay in the village?",
        options: ["because they had food from their fields and goats", "because the caves were full", "because they couldn't walk"], answer: "because they had food from their fields and goats" }
    ] },

    "world-sapling-32": { title: "From pottery to metal", steps: [
      { prompt: "From clay to iron",
        scenes: [
          { caption: "Village people made jugs and bowls from clay and baked them in a kiln to make them strong." },
          { caption: "At Tepe Sialk, near Kashan, painted pots have been found, with pictures of mountain goats." },
          { caption: "Then people learned to heat copper stone in a furnace until the metal came out of it. First copper, then bronze." },
          { caption: "At Marlik, in Gilan, gold cups have been found. The craftspeople made pictures of animals on the cups." },
          { caption: "Then came iron. With an iron sickle, cutting the wheat got easier." },
          { caption: "Pottery, copper, bronze, iron: each new thing made people's lives a little easier." }
        ] },
      { caption: "A painted clay pot, in the style of the pots of Tepe Sialk", say: "This is a painted clay pot, like the pots of Tepe Sialk. Look at it carefully.",
        look: [{ say: "Look at the top of the pot: birds and a zigzag line." }, { say: "Look at this mountain goat. What shape are its horns?" }],
        ask: { see: ["a zigzag line and birds", "a mountain goat with big, curved horns", "the colour of the pot and the black pictures"],
          think: ["the maker had seen many mountain goats", "the pot was for water or grain", "they painted the pictures with a brush"],
          wonder: ["what did they make the black paint from?", "why a mountain goat?", "how many people have seen this pot?"] } },
      { prompt: "Which came first?", say: "In what order did people learn these? Start with the oldest.",
        items: [{ label: "pottery", say: "pottery" }, { label: "copper", say: "copper" }, { label: "bronze", say: "bronze" }, { label: "iron", say: "iron" }] },
      { prompt: "Each thing, where was it found?", say: "Match each thing with the place where it was found.",
        pairs: [
          [{ label: "painted pot", say: "a painted pot with a mountain goat" }, { label: "Sialk, Kashan", say: "Tepe Sialk, near Kashan" }],
          [{ label: "gold cup", say: "a gold cup" }, { label: "Marlik, Gilan", say: "Marlik, in Gilan" }],
          [{ label: "goat bones", say: "the bones of tame goats" }, { label: "Ganj Dareh, Kermanshah", say: "Ganj Dareh, near Kermanshah" }]
        ] },
      { prompt: "Why did they bake pots in a kiln?", say: "Why did they bake clay pots in a kiln?",
        options: ["to make them strong and hold water", "to make them blue", "to keep them warm"], answer: "to make them strong and hold water" }
    ] },

    "world-sapling-33": { title: "The timeline game", steps: [
      { prompt: "From caves to today", say: "Put each thing in its place on the timeline.",
        items: [{ say: "a fire in a cave" }, { say: "the first tame goats" }, { say: "a painted pot from Sialk" }, { say: "a gold cup from Marlik" }, { say: "a mobile phone" }] },
      { prompt: "From the deepest layer", say: "The archaeologist found these in the layers of soil. Start from the deepest layer, the oldest.",
        items: [{ label: "stone tool", say: "a stone tool" }, { label: "piece of pot", say: "a piece of pot" }, { label: "bottle cap", say: "a bottle cap" }] },
      { prompt: "Turn the cards: each thing, where?", say: "Turn the cards over and find each thing with the place where it was found.",
        pairs: [
          [{ label: "stone tool", say: "a stone tool" }, { label: "Khorramabad caves", say: "the caves of the Khorramabad valley" }],
          [{ label: "tame goat", say: "the bones of tame goats" }, { label: "Ganj Dareh", say: "Ganj Dareh, near Kermanshah" }],
          [{ label: "painted pot", say: "a painted pot" }, { label: "Sialk", say: "Tepe Sialk, near Kashan" }],
          [{ label: "gold cup", say: "a gold cup" }, { label: "Marlik", say: "Marlik, in Gilan" }]
        ] },
      { prompt: "Each thing, what is it made of?", say: "Match each thing with what it is made of.",
        pairs: [
          [{ label: "an old cave tool", say: "an old cave tool" }, { label: "stone", say: "stone" }],
          [{ label: "a pot", say: "a pot" }, { label: "clay", say: "clay" }],
          [{ label: "the Marlik cup", say: "the Marlik cup" }, { label: "gold", say: "gold" }],
          [{ label: "a sickle", say: "a sickle" }, { label: "iron", say: "iron" }]
        ] },
      { prompt: "How did life change?", say: "How did people's lives change? Start with the oldest.",
        items: [{ label: "living in caves", say: "living in caves" }, { label: "villages and fields", say: "villages and fields" },
          { label: "clay pots", say: "clay pots" }, { label: "iron tools", say: "iron tools" }] }
    ] },

    "world-sapling-34": { title: "My town long ago", steps: [
      { prompt: "Grandma's neighbourhood",
        parts: { signT: { art: "Pomegranate Garden Lane" } },
        scenes: [
          { caption: "Nila and her grandma are walking in the neighbourhood. Grandma says: “When I was a child, it was very different here.”" },
          { caption: "Grandma shows an old photo: this same lane, years ago. Then there were no tall buildings, and a bicycle stood by the door." },
          { caption: "This old house is still here. Its wooden door has two knockers that sound different." },
          { caption: "This lane is called “Pomegranate Garden”. Grandma says: “Because long ago there was a big pomegranate garden here!”" },
          { caption: "Old photos, old buildings, street names and older people's memories tell the story of the neighbourhood's past." }
        ] },
      { caption: "An old photo of a lane", say: "This is an old photo of a lane. Look at it carefully.",
        look: [{ say: "Look at this: it's a bicycle. Does it look like today's bicycles?" }, { say: "Look at the door of the house. What shape is it?" }],
        ask: { see: ["an old house with an arched door", "a tree", "a bicycle"],
          think: ["the photo is black and white, so it's old", "the lane was quiet and had no cars", "someone came home on a bicycle"],
          wonder: ["what does this lane look like now?", "whose bicycle was it?", "who took this photo?"] } },
      { prompt: "How can we find out about the neighbourhood's past?", say: "How can we find out about the past of our own neighbourhood?",
        options: ["ask older people and look at old photos", "just guess", "watch cartoons"], answer: "ask older people and look at old photos" },
      { prompt: "A source about the past, or not?", say: "Which of these can tell us something about the neighbourhood's past?",
        baskets: [{ label: "tells the past" }, { label: "tells nothing" }],
        items: [{ label: "an old photo", say: "an old photo" }, { label: "an old door", say: "the door of an old house" }, { label: "Grandma's memory", say: "Grandma's memory" },
          { label: "a street name", say: "the name of a lane" }, { label: "a new balloon", say: "a new balloon" }] },
      home({ text: "Find an old place in your town!",
        need: ["a walk around the neighbourhood or town", "a phone for photos, if you can"],
        steps: [
          "Walk around the neighbourhood or town with your child and find an old place: a house, a bathhouse, a little bazaar, an ab-anbar or a very old tree.",
          "Look at it closely: what is it made of? How is it different from today's buildings?",
          "Read the name of the lane or street together and guess why it has that name.",
          "Ask an older person: “What was it like here long ago?” If they have an old photo, look at it together."
        ],
        ask: "If a child saw a photo of your neighbourhood today, a hundred years from now, what would seem strange to them?" }),
      { guideLabel: "Learning away from the screen, in the parents' guide",
        tips: [
          "Look at old family or town photos with your child and ask: “What's different from today? What's the same?”",
          "The names of lanes and neighbourhoods often have a story (a garden, an ab-anbar, a well-known person). Look for the story of your lane's name together.",
          "If an older person talks about hard times in the past, answer your child's questions calmly and briefly."
        ] }
    ] },

    "world-sapling-47": { title: "Old houses", steps: [
      { prompt: "A tour of a courtyard house",
        scenes: [
          { caption: "Grandpa takes the children to the family's old house: a house with a courtyard. First they go in through the wooden door." },
          { caption: "This is the hashti: a small room behind the door. Guests sat on these benches and waited here." },
          { caption: "In the middle of the house is the courtyard, with a pool, garden beds and a pomegranate tree. The windows of all the rooms open onto the courtyard." },
          { caption: "This is the eyvan: a shady place facing the courtyard. On summer evenings the family drank tea here." },
          { caption: "These stairs go down to the basement. The basement is cool in summer. Food was kept here, in jars." },
          { caption: "This house is built around its courtyard: the hashti, the courtyard and pool, the eyvan and the basement. Which ones does your home have?" }
        ] },
      { prompt: "Each part of the house, its job", say: "Match each part of the old house with its job.",
        pairs: [
          [{ label: "hashti", say: "the hashti" }, { label: "guests wait", say: "guests waited here" }],
          [{ label: "pool", say: "the pool" }, { label: "water and coolness", say: "water and coolness for the courtyard" }],
          [{ label: "eyvan", say: "the eyvan" }, { label: "tea in the shade", say: "drinking tea in the shade" }],
          [{ label: "basement", say: "the basement" }, { label: "keeping food cool", say: "keeping food cool" }]
        ] },
      { prompt: "Old courtyard house or today's flat?", say: "Put each thing in its basket: was it more in an old courtyard house, or in a flat today?",
        baskets: [{ label: "old courtyard house" }, { label: "flat today" }],
        items: [{ label: "pool", say: "a pool in the middle of the courtyard" }, { label: "hashti", say: "a hashti" }, { label: "cool basement", say: "a cool basement" },
          { label: "lift", say: "a lift" }, { label: "car park", say: "a car park" }, { label: "fridge", say: "an electric fridge" }] },
      { prompt: "Why is the basement cool in summer?", say: "Why is the basement cool in summer?",
        options: ["because it is under the ground and the sun can't reach it", "because it has an air cooler", "because it snows there"], answer: "because it is under the ground and the sun can't reach it" }
    ] },

    "world-sapling-35": { title: "The first train, the first printing house", steps: [
      { prompt: "From handwritten books to the smoke train",
        scenes: [
          { caption: "Long ago, books were written by hand. A scribe wrote letter by letter, and writing one book took months." },
          { caption: "About two hundred years ago, the first printing house in Iran was set up in Tabriz." },
          { caption: "With printing, a page could be printed hundreds of times, fast. There were more books, and more people read them." },
          { caption: "In 1888, Iran's first train started running: from Tehran to Shahr-e Rey. People called it the “smoke machine”." },
          { caption: "How do we know all this? From old photos, newspapers and books printed at that time." }
        ] },
      { caption: "An old photo of the “smoke machine”, drawn for this lesson, like the photos of that time", say: "This is an old photo of the smoke machine. Look at it carefully.",
        look: [{ say: "Look at the chimney and the smoke. What made the train go?" }, { say: "Look at these people. How do you think they felt?" }],
        ask: { see: ["a little train with a tall chimney", "a carriage with windows", "some people watching"],
          think: ["the photo is black and white, so it's old", "the train worked with fire and steam", "people were seeing a train for the first time"],
          wonder: ["how long was the ride?", "how much was a ticket?", "who took this photo?"] } },
      { prompt: "Which came first?", say: "Put these in order: the oldest first, today last.",
        items: [{ label: "handwritten book", say: "a book written by hand by a scribe" }, { label: "first printing house", say: "the first printing house, in Tabriz" },
          { label: "smoke machine", say: "the smoke machine, the first train" }, { label: "metro", say: "the metro, today" }] },
      { prompt: "What did the printing house change?", say: "What did the printing house change?",
        options: ["there were more books, and more people read them", "people stopped reading books", "books got more expensive"], answer: "there were more books, and more people read them" },
      { prompt: "How do we know what the smoke machine looked like?", say: "How do we know what the smoke machine looked like?",
        options: [{ value: "from old photos" }, { value: "from computer games" }, { value: "from our dreams" }], answer: "from old photos" }
    ] },

    "world-sapling-48": { title: "My town in the past game", steps: [
      { prompt: "Long ago or today?", say: "Put each thing in its basket: long ago, or today.",
        baskets: [{ label: "long ago" }, { label: "today" }],
        items: [{ label: "smoke train", say: "the smoke train" }, { label: "handwritten book", say: "a handwritten book" }, { label: "courtyard pool", say: "a pool in the courtyard" },
          { label: "metro", say: "the metro" }, { label: "lift", say: "a lift" }, { label: "mobile phone", say: "a mobile phone" }] },
      { prompt: "When?", say: "Put each thing in its place on the timeline.",
        items: [{ say: "the first printing house, in Tabriz" }, { say: "the first train, to Shahr-e Rey" }, { say: "a radio in people's homes" }, { say: "the metro" }] },
      { prompt: "Turn the cards: each part of the house, its job", say: "Turn the cards over and find each part of the old house with its job.",
        pairs: [
          [{ label: "hashti", say: "the hashti" }, { label: "guests wait", say: "guests waited" }],
          [{ label: "eyvan", say: "the eyvan" }, { label: "tea in the shade", say: "tea in the shade" }],
          [{ label: "basement", say: "the basement" }, { label: "cool food", say: "food stayed cool" }],
          [{ label: "pool", say: "the pool" }, { label: "water in the courtyard", say: "water in the middle of the courtyard" }]
        ] },
      { prompt: "A source about the past, or not?", say: "Which tells us something about the past?",
        baskets: [{ label: "tells the past" }, { label: "tells nothing" }],
        items: [{ label: "an old photo", say: "an old photo" }, { label: "an old newspaper", say: "an old newspaper" }, { label: "a buried pot", say: "a pot found under the ground" },
          { label: "Grandpa's memory", say: "Grandpa's memory" }, { label: "today's juice", say: "a juice we bought today" }] },
      { prompt: "From the oldest to today", say: "Put them in order: the oldest first, today last.",
        items: [{ label: "stone tool", say: "a stone tool in a cave" }, { label: "first printing house", say: "the first printing house" },
          { label: "smoke train", say: "the smoke train" }, { label: "metro", say: "the metro" }] }
    ] },

    "world-sapling-26": { title: "Goods and services", steps: [
      { prompt: "A day with Kian",
        parts: { goodsT: { art: "goods" }, servT: { art: "service" } },
        scenes: [
          { caption: "Kian and his mum buy bread. The baker baked the bread. Bread is “goods”: something you can buy and take with you." },
          { caption: "The fruit seller sells apples and oranges. Fruit is goods too." },
          { caption: "Kian has a cold. The doctor examines him. This is a “service”: work someone does for us." },
          { caption: "At school, the teacher teaches. Teaching is a service too." },
          { caption: "The baker produces bread; the doctor and the teacher give services: they are “producers”. Kian and his mum are “consumers”: they use goods and services." }
        ] },
      { prompt: "Goods or a service?", say: "Put each one in its basket: goods, something you can take with you; or a service, work someone does for us.",
        baskets: [{ label: "goods" }, { label: "service" }],
        items: [{ label: "bread", say: "bread" }, { label: "shoes", say: "shoes" }, { label: "an apple", say: "an apple" },
          { label: "a haircut", say: "a haircut at the hairdresser's" }, { label: "a doctor's check-up", say: "a doctor's check-up" }, { label: "driving the bus", say: "a driver who takes us by bus" }] },
      { prompt: "What does each producer produce?", say: "Match each producer with their goods or service.",
        pairs: [
          [{ label: "baker", say: "the baker" }, { label: "bread", say: "bread" }],
          [{ label: "farmer", say: "the farmer" }, { label: "apples", say: "apples" }],
          [{ label: "doctor", say: "the doctor" }, { label: "treatment", say: "treating the sick" }],
          [{ label: "teacher", say: "the teacher" }, { label: "lessons", say: "teaching" }]
        ] },
      { prompt: "When you buy bread, what are you?", say: "When you buy bread and eat it, are you a producer or a consumer?",
        options: ["a consumer", "a producer"], answer: "a consumer" }
    ] },

    "world-sapling-44": { title: "Work in the village, work in the city", steps: [
      { prompt: "From the village to the city",
        scenes: [
          { caption: "In the village by the sea, the fisherman catches fish from his boat." },
          { caption: "In the field, the farmer sows wheat. The shepherd takes the sheep out to graze." },
          { caption: "In the city, in the carpentry workshop, the carpenter makes tables and chairs." },
          { caption: "A lorry takes the village's tomatoes to the factory. In the factory they make tomato paste from them." },
          { caption: "People work in shops and offices too: the shopkeeper sells, and the clerk helps people with their business." },
          { caption: "The village and the city help each other: the village sends food, and the city sends tools and goods." }
        ] },
      { prompt: "Village or city?", say: "Is this work done more in the village or in the city?",
        baskets: [{ label: "village" }, { label: "city" }],
        items: [{ label: "farming", say: "farming" }, { label: "keeping animals", say: "keeping sheep and cows" }, { label: "fishing", say: "fishing" },
          { label: "factory", say: "working in a factory" }, { label: "office", say: "working in an office" }, { label: "big shop", say: "working in a big shop" }] },
      { say: "In Iran, every place has its own work.",
        tasks: [
          { prompt: "In Bushehr, by the Persian Gulf, people fish. Find Bushehr." },
          { prompt: "In Gilan, people grow rice. Find Rasht." },
          { prompt: "Arak has big factories. Find Arak." },
          { prompt: "Isfahan has a big steel works. Find Isfahan." }
        ] },
      { prompt: "From the village to the city", say: "Match each thing from the village with what the city makes from it.",
        pairs: [
          [{ label: "tomatoes", say: "tomatoes" }, { label: "tomato paste", say: "tomato paste" }],
          [{ label: "wheat", say: "wheat" }, { label: "bread", say: "bread" }],
          [{ label: "wool", say: "sheep's wool" }, { label: "carpet", say: "a carpet" }],
          [{ label: "milk", say: "milk" }, { label: "cheese", say: "cheese" }]
        ] }
    ] },

    "world-sapling-5": { title: "Bazaar and caravanserai", steps: [
      { prompt: "How did goods get to the bazaar?",
        scenes: [
          { caption: "Long ago, merchants travelled from town to town with camel caravans, carrying goods: carpets, silk, spices." },
          { caption: "At night they stayed at a caravanserai: a big, strong building by the road, for travellers and their camels." },
          { caption: "The goods reached the bazaar. The covered bazaar was full of shops: carpet sellers, spice sellers, coppersmiths, cloth sellers." },
          { caption: "Today goods arrive on big ships at ports like Bandar Abbas, and go to the cities by lorry." },
          { caption: "But the old bazaars are still alive. The Tabriz bazaar is one of the biggest covered bazaars in the world, and people still shop there." }
        ] },
      { prompt: "Long ago or today?", say: "Put each thing in its basket: trade long ago, or today.",
        baskets: [{ label: "long ago" }, { label: "today" }],
        items: [{ label: "camel caravan", say: "a camel caravan" }, { label: "caravanserai", say: "a caravanserai" }, { label: "big cargo ship", say: "a big cargo ship" },
          { label: "lorry", say: "a lorry" }, { label: "supermarket", say: "a supermarket" }, { label: "shopping by phone", say: "shopping by phone" }] },
      { prompt: "A carpet's journey", say: "Long ago, how did a carpet get to the bazaar? Put them in order.",
        items: [{ label: "weaving the carpet", say: "the carpet was woven in a village" }, { label: "caravan", say: "the carpet was loaded on a camel" },
          { label: "caravanserai", say: "they stayed the night at a caravanserai" }, { label: "bazaar", say: "the carpet reached the bazaar" }] },
      { say: "Find the bazaars and the port.",
        tasks: [
          { prompt: "The Tabriz bazaar is one of the biggest covered bazaars in the world. Find Tabriz." },
          { prompt: "Today big ships come to Bandar Abbas. Find Bandar Abbas." },
          { prompt: "Isfahan has a big old bazaar too. Find Isfahan." }
        ] }
    ] },

    "world-sapling-45": { title: "Money long ago", steps: [
      { prompt: "What did people do before money?",
        scenes: [
          { caption: "Very long ago there was no money. People swapped goods for goods: the farmer gave wheat and got wool from the shepherd." },
          { caption: "But sometimes it was hard: the farmer wanted shoes, but the shoemaker didn't want wheat!" },
          { caption: "So people made coins: small pieces of gold and silver that everyone accepted. Now everyone could buy whatever they wanted." },
          { caption: "Later came paper money: it was lighter and easier to carry." },
          { caption: "Today we also buy things with a bank card or a phone. Money made trading easy." }
        ] },
      { prompt: "The story of money", say: "How did people buy things? Start with the oldest.",
        items: [{ label: "goods for goods", say: "swapping goods for goods" }, { label: "coins", say: "gold and silver coins" },
          { label: "paper money", say: "paper money" }, { label: "bank card", say: "a bank card" }] },
      { prompt: "Why did money make trading easy?", say: "Why did money make trading easy?",
        options: ["because everyone accepts it and you can buy anything with it", "because money is tasty", "because you can plant money"], answer: "because everyone accepts it and you can buy anything with it" },
      { prompt: "The farmer wants shoes, but the shoemaker doesn't want wheat. How does money help?", say: "The farmer wants shoes, but the shoemaker doesn't want wheat. How does money help?",
        options: ["the farmer sells the wheat and buys shoes with the money", "the farmer takes the shoes and leaves", "the farmer doesn't want shoes any more"], answer: "the farmer sells the wheat and buys shoes with the money" }
    ] },

    "world-sapling-27": { title: "This or that?", steps: [
      { prompt: "What should Nima buy?",
        parts: { tag1T: { art: "10 thousand toman" }, tag2T: { art: "10 thousand toman" } },
        scenes: [
          { caption: "Nima has ten thousand toman. In the shop there is a ball and a storybook. Each one costs ten thousand toman." },
          { caption: "His money is only enough for one. Nima thinks: which one does he want more?" },
          { caption: "Nima buys the ball. He doesn't get the book. The thing you didn't get instead is “the cost of your choice”." },
          { caption: "Nima would also like a bike, but it's expensive. Every week he puts some of his money in his piggy bank." },
          { caption: "A few weeks later he had enough! By saving, you can buy something bigger." }
        ] },
      { prompt: "Pay for the ball.", say: "The ball costs ten thousand toman. Pay for it.", items: [{ name: "ball" }] },
      { prompt: "Nima bought the ball. What did he give up?", say: "Nima bought the ball. What did he not get instead?",
        options: [{ value: "the storybook" }, { value: "the ball" }, { value: "the bike" }], answer: "the storybook" },
      { prompt: "To buy something expensive, what do we do?", say: "If we want something expensive, what do we do?",
        options: [{ value: "save up little by little" }, { value: "cry" }, { value: "spend all the money on sweets" }], answer: "save up little by little" },
      home({ text: "Have a saving goal!",
        need: ["a piggy bank or a tin", "paper and a pencil"],
        steps: [
          "Choose something small with your child that they want to save for (a book, a ball, a present for someone).",
          "They draw it on paper and you write its price next to it. Stick the paper on the piggy bank.",
          "Every week they put a little of their pocket money in the piggy bank and draw a line on the paper.",
          "When there is enough money, go and buy it together. Ask: “How did waiting feel?”"
        ],
        ask: "If you had ten thousand toman today, would you spend it or save it? Why?" })
    ] },

    "world-sapling-28": { title: "The market game", steps: [
      { prompt: "Goods or a service?", say: "Put each one in its basket: goods or a service.",
        baskets: [{ label: "goods" }, { label: "service" }],
        items: [{ label: "cheese", say: "cheese" }, { label: "carpet", say: "a carpet" }, { label: "chair", say: "a chair" },
          { label: "a taxi ride", say: "a driver who takes us by taxi" }, { label: "teaching", say: "a teacher's teaching" }, { label: "cleaning the street", say: "cleaning the street" }] },
      { prompt: "What does each producer produce?", say: "Match each producer with what they produce.",
        pairs: [
          [{ label: "fisherman", say: "the fisherman" }, { label: "fish", say: "fish" }],
          [{ label: "carpenter", say: "the carpenter" }, { label: "chair", say: "a chair" }],
          [{ label: "shepherd", say: "the shepherd" }, { label: "wool", say: "wool" }],
          [{ label: "doctor", say: "the doctor" }, { label: "treatment", say: "treatment" }]
        ] },
      { prompt: "Buy bread and cheese: pay the right money.", say: "The bread costs five thousand toman and the cheese ten thousand. Pay for them.",
        items: [{ name: "bread" }, { name: "cheese" }] },
      { prompt: "Nima had twenty thousand toman and bought a ball for ten thousand. How much does he have left?" },
      { prompt: "The story of money", say: "How did people buy things? Start with the oldest.",
        items: [{ label: "goods for goods", say: "swapping goods for goods" }, { label: "coins", say: "coins" },
          { label: "paper money", say: "paper money" }, { label: "bank card", say: "a bank card" }] },
      { prompt: "Spend or save?", say: "Put each one in its basket: spending, or saving.",
        baskets: [{ label: "spending" }, { label: "saving" }],
        items: [{ label: "buying an ice cream", say: "buying an ice cream" }, { label: "buying a ball", say: "buying a ball" },
          { label: "money in the piggy bank", say: "putting money in the piggy bank" }, { label: "saving for a bike", say: "saving up for a bike" }] }
    ] },

    "world-sapling-7": { title: "Continents and oceans", steps: [
      { prompt: "From the globe to the map",
        parts: { o1: { art: "Pacific Ocean" }, o2: { art: "Atlantic Ocean" }, o3: { art: "Indian Ocean" }, o4: { art: "Arctic Ocean" }, o5: { art: "Southern Ocean" } },
        scenes: [
          { caption: "Sohrab spins the globe. On the globe, the continents and oceans have exactly the shapes they have on the Earth." },
          { caption: "But you can't put a globe inside a book. So we draw a flat map of the world, like when we lay an orange peel flat." },
          { caption: "A peel laid flat tears and stretches a little. The world map is stretched a little too: Antarctica, for example, looks very wide on the map." },
          { caption: "There are seven continents on the map. We live in Asia; Asia is the biggest continent." },
          { caption: "The others: Europe, Africa, North America, South America, Oceania, and Antarctica, which is covered in ice." },
          { caption: "And five oceans: the Pacific, the Atlantic, the Indian, the Arctic and the Southern Ocean. The Pacific is the biggest of all." }
        ] },
      { say: "Find the continents on the world map.",
        tasks: [
          { prompt: "Which continent are we in? Find Asia." },
          { prompt: "Find Africa, south of Europe." },
          { prompt: "Find South America." },
          { prompt: "Find Oceania, south-east of Asia." },
          { prompt: "Where is Antarctica, the icy continent?" }
        ] },
      { say: "Find the oceans.",
        tasks: [
          { prompt: "Where is the biggest ocean, the Pacific?" },
          { prompt: "Where is the Atlantic Ocean, between America, Europe and Africa?" },
          { prompt: "Where is the Indian Ocean, south of Asia? The Sea of Oman opens into it." }
        ] },
      { prompt: "Why is a flat world map a little stretched?", say: "Why is a flat world map a little stretched?",
        options: ["because the Earth is round, and you can't flatten something round without stretching it", "because the artist made a mistake", "because the continents move about"],
        answer: "because the Earth is round, and you can't flatten something round without stretching it" },
      { prompt: "Turn the cards: each continent, an animal", say: "Turn the cards over and find each continent with an animal that lives only there.",
        pairs: [
          [{ label: "Oceania", say: "Oceania" }, { say: "a kangaroo" }],
          [{ label: "Antarctica", say: "Antarctica" }, { say: "an emperor penguin" }],
          [{ label: "Africa", say: "Africa" }, { say: "a giraffe" }],
          [{ label: "South America", say: "South America" }, { say: "a llama" }]
        ] }
    ] },

    "world-sapling-36": { title: "The equator and the hemispheres", steps: [
      { prompt: "Above and below the equator",
        parts: { eqT: { art: "equator" }, irT: { art: "Iran" }, auT: { art: "Australia" } },
        scenes: [
          { caption: "The equator is an imaginary line drawn round the middle of the Earth. On the map, it's this red line." },
          { caption: "Above the equator is the northern hemisphere. Iran is in the northern hemisphere." },
          { caption: "Below the equator is the southern hemisphere. Australia is in the southern hemisphere." },
          { caption: "When it's summer in Iran, it's winter in Australia! And when it's winter in Iran, it's summer there." },
          { caption: "Near the equator it is warm almost all the time; there are warm rainforests there." }
        ] },
      { say: "Find it on the world map.",
        tasks: [
          { prompt: "Find the equator." },
          { prompt: "Which hemisphere is Europe in? Find it: above the equator." },
          { prompt: "Australia is in Oceania, below the equator. Find Oceania." },
          { prompt: "Where is Antarctica, the continent in the southern hemisphere furthest from Iran?" }
        ] },
      { prompt: "Is Iran above the equator or below it?", say: "Is Iran above the equator or below it?",
        options: ["above the equator, in the northern hemisphere", "below the equator, in the southern hemisphere"], answer: "above the equator, in the northern hemisphere" },
      { prompt: "It's summer in Iran. What season is it in Australia?", say: "Now it's summer in Iran. What season is it in Australia?",
        options: [{ value: "winter" }, { value: "summer" }, { value: "spring" }], answer: "winter" },
      { prompt: "North or south?", say: "Is this country above the equator or below it? Put it in its basket.",
        baskets: [{ label: "northern hemisphere" }, { label: "southern hemisphere" }],
        items: [{ label: "Iran", say: "Iran" }, { label: "Japan", say: "Japan" }, { label: "Egypt", say: "Egypt" },
          { label: "Australia", say: "Australia" }, { label: "Argentina", say: "Argentina" }, { label: "South Africa", say: "South Africa" }] }
    ] },

    "world-sapling-8": { title: "Iran's neighbours", steps: [
      { say: "These countries are Iran's neighbours. Find the neighbours by land.",
        tasks: [
          { prompt: "Where is Turkey, north-west of Iran?" },
          { prompt: "Where is Iraq, west of Iran?" },
          { prompt: "Where is Afghanistan, east of Iran?" },
          { prompt: "Where is Pakistan, south-east of Iran?" },
          { prompt: "Where is Turkmenistan, north-east of Iran?" },
          { prompt: "Where is Armenia, the small neighbour in the north-west?" }
        ] },
      { say: "Find the neighbours by water: across the sea.",
        tasks: [
          { prompt: "Where is Saudi Arabia, across the Persian Gulf?" },
          { prompt: "Where are the United Arab Emirates, across the Persian Gulf?" },
          { prompt: "Where is Kazakhstan, across the Caspian Sea?" }
        ] },
      { say: "Find the capitals.",
        tasks: [
          { prompt: "Where is Baghdad, the capital of Iraq?" },
          { prompt: "Where is Yerevan, the capital of Armenia?" },
          { prompt: "Where is Ashgabat, the capital of Turkmenistan?" },
          { prompt: "Where is Baku, the capital of Azerbaijan, by the Caspian Sea?" }
        ] },
      { prompt: "Each country, its capital", say: "Match each country with its capital.",
        pairs: [
          [{ label: "Iraq", say: "Iraq" }, { label: "Baghdad", say: "Baghdad" }],
          [{ label: "Armenia", say: "Armenia" }, { label: "Yerevan", say: "Yerevan" }],
          [{ label: "Turkmenistan", say: "Turkmenistan" }, { label: "Ashgabat", say: "Ashgabat" }],
          [{ label: "Pakistan", say: "Pakistan" }, { label: "Islamabad", say: "Islamabad" }],
          [{ label: "Azerbaijan", say: "Azerbaijan" }, { label: "Baku", say: "Baku" }]
        ] },
      { prompt: "Turn the cards: each country, its language", say: "Turn the cards over and find each country with its main language.",
        pairs: [
          [{ label: "Turkey", say: "Turkey" }, { label: "Turkish", say: "Turkish" }],
          [{ label: "Armenia", say: "Armenia" }, { label: "Armenian", say: "Armenian" }],
          [{ label: "Pakistan", say: "Pakistan" }, { label: "Urdu", say: "Urdu" }],
          [{ label: "Afghanistan", say: "Afghanistan" }, { label: "Dari Persian and Pashto", say: "Dari Persian and Pashto" }]
        ] },
      { prompt: "Which neighbours celebrate Nowruz too?", say: "Which neighbours celebrate Nowruz, like us?",
        options: ["Afghanistan, Tajikistan and Azerbaijan", "no other country", "only countries far away"], answer: "Afghanistan, Tajikistan and Azerbaijan" }
    ] },

    "world-sapling-37": { title: "Two cities, two countries", steps: [
      { prompt: "Bandar Abbas and Mombasa",
        parts: { tR: { art: "Bandar Abbas, Iran" }, tL: { art: "Mombasa, Kenya" }, bRT: { art: "Salaam!" } },
        scenes: [
          { caption: "This is Parisa, in Bandar Abbas, by the Persian Gulf. And this is Amani, in Mombasa, in Kenya, by the Indian Ocean." },
          { caption: "Both cities are by the sea, and their weather is hot and humid. There are palm trees in both places." },
          { caption: "Both cities are ports. Ships come and go, and many people are fishermen." },
          { caption: "But they are different too. Parisa says hello in Persian: “Salaam!” Amani says it in Swahili: “Jambo!”",
            say: "But they are different too. Parisa says hello in Persian. Amani says hello in Swahili." },
          { caption: "Mombasa is near the equator and has rainy seasons. Bandar Abbas has a very hot, dry summer." },
          { caption: "Two cities, two countries: many things alike and some things different. Parisa and Amani wave to each other!" }
        ] },
      { say: "Find the two countries on the world map.",
        tasks: [
          { prompt: "Find Iran. Bandar Abbas is by the Persian Gulf." },
          { prompt: "Find Kenya in Africa. Mombasa is by the Indian Ocean." },
          { prompt: "Where is the Indian Ocean, which reaches both countries?" }
        ] },
      { prompt: "Alike or different?", say: "Bandar Abbas and Mombasa: are they alike in this, or different?",
        baskets: [{ label: "alike" }, { label: "different" }],
        items: [{ label: "by the sea", say: "being by the sea" }, { label: "palm trees", say: "palm trees" }, { label: "port and ships", say: "a port and ships" },
          { label: "language", say: "the language people speak" }, { label: "rainy season", say: "rainy seasons" }, { label: "continent", say: "the continent they are in" }] },
      { prompt: "Amani said hello in Swahili. What do you answer?", say: "Amani said hello in Swahili. What do you answer in Persian?",
        options: ["Salaam!", "Goodbye!", "Good night!"], answer: "Salaam!" },
      { caption: "Compare your own town or village with a faraway town, for example Rasht and a small town in Japan. How are the weather, the homes and people's work different? What is alike?" }
    ] },

    "world-sapling-38": { title: "The world game", steps: [
      { say: "Find it on the world map.",
        tasks: [{ prompt: "Find Europe." }, { prompt: "Find the equator." }, { prompt: "Where is the biggest ocean?" }, { prompt: "Find North America." }] },
      { say: "Find Iran's neighbours.",
        tasks: [{ prompt: "Where is Iraq?" }, { prompt: "Where is Turkmenistan?" }, { prompt: "Where is Pakistan?" }] },
      { prompt: "Turn the cards: each flag, which country?", say: "Turn the cards over and find each flag with its country.",
        pairs: [
          [{ say: "the flag of Iran" }, { label: "Iran", say: "Iran" }],
          [{ say: "the flag of Turkey" }, { label: "Turkey", say: "Turkey" }],
          [{ say: "the flag of Armenia" }, { label: "Armenia", say: "Armenia" }],
          [{ say: "the flag of Pakistan" }, { label: "Pakistan", say: "Pakistan" }]
        ] },
      { prompt: "Turn the cards: each country, its capital", say: "Turn the cards over and find each country with its capital.",
        pairs: [
          [{ label: "Iran", say: "Iran" }, { label: "Tehran", say: "Tehran" }],
          [{ label: "Iraq", say: "Iraq" }, { label: "Baghdad", say: "Baghdad" }],
          [{ label: "Azerbaijan", say: "Azerbaijan" }, { label: "Baku", say: "Baku" }],
          [{ label: "Turkmenistan", say: "Turkmenistan" }, { label: "Ashgabat", say: "Ashgabat" }]
        ] },
      { prompt: "Which continent?", say: "Put each country in its continent.",
        baskets: [{ label: "Asia" }, { label: "Africa" }, { label: "Europe" }],
        items: [{ label: "Japan", say: "Japan" }, { label: "China", say: "China" }, { label: "Kenya", say: "Kenya" }, { label: "Egypt", say: "Egypt" },
          { label: "France", say: "France" }, { label: "Italy", say: "Italy" }] },
      { prompt: "It's winter in Iran. What season is it in Australia?", say: "It's winter in Iran. What season is it in Australia, on the other side of the equator?",
        options: [{ value: "summer" }, { value: "winter" }, { value: "autumn" }], answer: "summer" }
    ] },

    "world-sapling-39": { title: "What is World Heritage?", steps: [
      { prompt: "Places that belong to the whole world",
        parts: { pathT: { art: "Stay on the path" } },
        scenes: [
          { caption: "Some places are so precious and beautiful that they count as belonging to everyone in the world. We call them “World Heritage”." },
          { caption: "The countries of the world keep a list of these places together. Iran has more than twenty World Heritage sites. One of them is Eram Garden in Shiraz, which people made." },
          { caption: "Some are natural, like the Lut desert, with strange hills the wind has carved." },
          { caption: "We look after these places so that children a hundred years from now can see them too. Hasti doesn't pick the flowers; she just looks at them." },
          { caption: "Hasti puts her sweet wrapper in the bin and doesn't leave the garden path." }
        ] },
      { prompt: "Caring or harming?", say: "At a World Heritage site, is this caring or harming?",
        baskets: [{ label: "caring" }, { label: "harming" }],
        items: [{ label: "staying on the path", say: "we stay on the path" }, { label: "taking rubbish away", say: "we take our rubbish with us or put it in a bin" },
          { label: "taking photos", say: "we take photos and only look" }, { label: "writing on walls", say: "we write our names on an old wall" },
          { label: "taking a stone", say: "we take a stone or a tile" }, { label: "picking flowers", say: "we pick the garden's flowers" }] },
      { prompt: "Made by people or natural?", say: "Put each of Iran's World Heritage sites in its basket: made by people, or natural.",
        baskets: [{ label: "made by people" }, { label: "natural" }],
        items: [{ label: "Eram Garden", say: "Eram Garden in Shiraz" }, { label: "Tabriz bazaar", say: "the Tabriz bazaar" }, { label: "Iran's qanats", say: "Iran's qanats" },
          { label: "Lut desert", say: "the Lut desert" }, { label: "Hyrcanian forests", say: "the Hyrcanian forests, by the Caspian Sea" }] },
      { prompt: "Why do we look after World Heritage?", say: "Why do we look after World Heritage sites?",
        options: ["so people in the future can see them too", "because nobody likes them", "so nobody goes to see them"], answer: "so people in the future can see them too" },
      { prompt: "Which one is natural?", say: "Which World Heritage site is natural, not made by people?",
        options: [{ value: "the Lut desert" }, { value: "Eram Garden" }, { value: "the Tabriz bazaar" }], answer: "the Lut desert" }
    ] },

    "world-sapling-9": { title: "Touring Iran", steps: [
      { prompt: "A trip to Iran's World Heritage",
        scenes: [
          { caption: "Our trip starts in Tabriz: the covered bazaar of Tabriz, one of the biggest bazaars in the world." },
          { caption: "Then we go to Gilan: the Hyrcanian forests, very old forests by the Caspian Sea." },
          { caption: "In Shushtar there are waterfalls and mills that people built long ago to use the water." },
          { caption: "In Shiraz, Eram Garden: cypress trees, flowers and a long pool." },
          { caption: "In Yazd, the old mud-brick city with its tall windcatchers." },
          { caption: "And last, the Lut desert, one of the hottest places on Earth." },
          { caption: "These are all World Heritage: they belong to us, and to everyone in the world." }
        ] },
      { tasks: [{ prompt: "Travel again: Tabriz, Rasht, Ahvaz (near Shushtar), Shiraz, Yazd and Kerman (near the Lut).",
        say: "Travel again! Start in Tabriz, then Rasht, then Ahvaz, which is near Shushtar, then Shiraz, then Yazd, and last Kerman, which is near the Lut desert." }] },
      { prompt: "Turn the cards: each place, which city?", say: "Turn the cards over and find each World Heritage site with its city or province.",
        pairs: [
          [{ label: "covered bazaar", say: "the covered bazaar" }, { label: "Tabriz", say: "Tabriz" }],
          [{ label: "Eram Garden", say: "Eram Garden" }, { label: "Shiraz", say: "Shiraz" }],
          [{ label: "mud-brick city and windcatchers", say: "a mud-brick city with windcatchers" }, { label: "Yazd", say: "Yazd" }],
          [{ label: "Hyrcanian forests", say: "the Hyrcanian forests" }, { label: "Gilan and Mazandaran", say: "Gilan and Mazandaran" }]
        ] },
      { prompt: "Our trip in order", say: "Which places did our trip go to? Put them in order.",
        items: [{ label: "Tabriz bazaar", say: "the Tabriz bazaar" }, { label: "Hyrcanian forests", say: "the Hyrcanian forests" },
          { label: "Eram Garden", say: "Eram Garden" }, { label: "Lut desert", say: "the Lut desert" }] },
      { prompt: "Made by people or natural?", say: "Put each place on our trip in its basket: made by people, or natural.",
        baskets: [{ label: "made by people" }, { label: "natural" }],
        items: [{ label: "Tabriz bazaar", say: "the Tabriz bazaar" }, { label: "Shushtar waterfalls", say: "the waterfalls and mills of Shushtar" },
          { label: "Yazd", say: "the old city of Yazd" }, { label: "Lut desert", say: "the Lut desert" }, { label: "Hyrcanian forests", say: "the Hyrcanian forests" }] },
      { caption: "If you could travel to one of these places, which would you choose? What would you do there?" }
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

/* ---------- Practice generators (js/practice/world.js): the same word keys in English ---------- */
B.EN["world-seed-p1"] = { title: "Find it on the map", words: {
  find: "Find the {name} on the map.",
  roomSay: "Look at the room from above. Where is the {name}? Tap it.",
  sideAsk: "What is {pos}? Tap it.",
  toys: { ball: "ball", teddy: "teddy bear", car: "car", book: "book", shoe: "shoe", drum: "drum", blocks: "blocks", kite: "kite" },
  pos: { onBed: "on the bed", underTable: "under the table", nextBox: "next to the box", onShelf: "on the shelf", underBed: "under the bed", frontBox: "in front of the box", onTable: "on the table" },
  places: { yard: "yard", kitchen: "kitchen", bedroom: "bedroom", hall: "living room", bath: "bathroom", door: "front door",
    bakery: "bakery", fruit: "fruit shop", park: "park", school: "school", clinic: "clinic", home: "our home",
    gate: "park gate", tree: "big tree", pond: "pond", slide: "slide", bench: "bench", flowers: "flower bed" } } };

B.EN["world-seed-p2"] = { title: "Find the way", words: {
  route: "Start from home. First go to the {a}, then to the {b}.",
  near: "Which is nearer to our home?",
  nearSay: "Which is nearer to our home: the {a} or the {b}? Look at the map.",
  places: { bakery: "bakery", fruit: "fruit shop", park: "park", school: "school", clinic: "clinic" } } };

B.EN["world-seed-p3"] = { title: "Match and sort", words: {
  helpsPrompt: "Does it help or not?", helpsSay: "Does this help others or not? Put it in its basket.",
  helpsBaskets: { yes: "helps", no: "doesn't help" },
  helpsItems: { turn: "taking turns", share: "sharing toys", tidy: "tidying the room", sorry: "saying sorry", help: "helping lay the sofreh",
    grab: "grabbing a toy", push: "pushing in the queue", shout: "shouting", mess: "making a mess" },
  workersPrompt: "Where does each person work?", workersSay: "Match each person with the place where they work.",
  workersA: { baker: "baker", doctor: "doctor", teacher: "teacher", farmer: "farmer", fruit: "fruit seller", post: "postman" },
  workersB: { baker: "bakery", doctor: "clinic", teacher: "school", farmer: "farm", fruit: "fruit shop", post: "post office" },
  needsPrompt: "Do we need it or want it?", needsSay: "Do we need this, or would we just like to have it?",
  needsBaskets: { need: "we need it", want: "we want it" },
  needsItems: { water: "water", bread: "bread", coat: "warm clothes", home: "a home", toy: "a new toy", sweets: "chocolate", balloon: "a balloon", icecream: "ice cream" },
  oldnewPrompt: "Old or new?", oldnewSay: "Is this old or new? Put it in its basket.",
  oldnewBaskets: { old: "old", "new": "new" },
  oldnewItems: { lamp: "oil lamp", radio: "old radio", phoneOld: "phone with a wire", jug: "clay jug", mobile: "mobile phone", tablet: "computer", car: "car", bulb: "light bulb" },
  homesPrompt: "Each home, where?", homesSay: "Match each home with the place where it is built.",
  homesA: { igloo: "ice house", tent: "nomads' tent", stilts: "house on stilts", yazd: "mud house with a windcatcher" },
  homesB: { igloo: "a very cold place", tent: "moving with the sheep", stilts: "by the water", yazd: "a hot desert" } } };

B.EN["world-seed-p4"] = { title: "What first, what next?", words: {
  dayPrompt: "A day: what first, what next? Put them in order.",
  nowruzPrompt: "Nowruz: what first, what next? Put them in order.",
  yaldaPrompt: "Yalda night: what first, what next? Put them in order.",
  day: { wake: "waking up", breakfast: "breakfast", school: "going to school", lunch: "lunch", play: "playing in the afternoon", dinner: "dinner", sleep: "going to sleep" },
  nowruz: { clean: "spring cleaning", sabzeh: "growing sabzeh", haftsin: "laying the haft-sin", "new": "the new year arrives", visit: "visiting family", picnic: "Sizdah Bedar picnic" },
  yalda: { sunset: "the sun sets early", gather: "the family gathers", fruit: "we eat watermelon and pomegranate", story: "the grown-ups tell stories", sleep: "we go to bed late" } } };

B.EN["world-sprout-p1"] = { title: "North, south, east, west", words: {
  face: "Turn to face {dir}.",
  sun: { rise: "It's morning and the sun is coming up. Turn to face the sun.", noon: "It's noon. Turn to face the sun.", set: "It's evening and the sun is going down. Turn to face the sun." },
  dirs: { n: "north", s: "south", e: "east", w: "west" },
  go: "On the map, north is at the top. From {from}, go {dir}. Where do you get to first?",
  places: { home: "Nima's home", bakery: "the bakery", school: "the school", clinic: "the clinic", park: "the park", bus: "the bus stop" } } };

B.EN["world-sprout-p2"] = { title: "Symbols and the key", words: {
  find: "Look at the key under the map. Where is the {name}?",
  school: "On the school plan, find the {name}.",
  places: { home: "home", bakery: "bakery", school: "school", clinic: "clinic", park: "park", bus: "bus stop", library: "library", shop: "shop" },
  schoolRooms: { office: "school office", class: "Darya's classroom", library: "library", health: "health room", yard: "schoolyard", gate: "school gate" } } };

B.EN["world-sprout-p3"] = { title: "Iran on the map", words: {
  ask: {
    caspian: "Where is the Caspian Sea, in the north of Iran?", "persian-gulf": "Where is the Persian Gulf, in the south of Iran?", "oman-sea": "Where is the Sea of Oman, in the south-east?",
    tehran: "Where is Tehran, the capital of Iran?", mashhad: "A big city in the north-east of Iran: Mashhad. Find it.", tabriz: "A big city in the north-west of Iran: Tabriz. Find it.",
    ahvaz: "A city in the south-west, near the Persian Gulf: Ahvaz. Find it.", shiraz: "A city in the south of Iran: Shiraz. Find it.",
    rasht: "A city by the Caspian Sea: Rasht. Find it.", zahedan: "A city in the south-east of Iran: Zahedan. Find it.",
    mine: "Find your own province and tap it. If you don't know, ask a grown-up."
  } } };

B.EN["world-sprout-p4"] = { title: "The year wheel", words: {
  prompt: "Start with “{first}” and put them in order.",
  names: { sat: "Saturday", sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday",
    far: "Farvardin", ord: "Ordibehesht", kho: "Khordad", tir: "Tir", mor: "Mordad", sha: "Shahrivar", meh: "Mehr", aba: "Aban", aza: "Azar", dey: "Dey", bah: "Bahman", esf: "Esfand",
    spring: "spring", summer: "summer", autumn: "autumn", winter: "winter",
    nowruz: "Nowruz", sizdah: "Sizdah Bedar", mehregan: "Mehregan", yalda: "Yalda night", chahar: "Chaharshanbe Suri" } } };

B.EN["world-sprout-p5"] = { title: "On the globe", words: {
  find: "Find {name} on the world map.",
  names: { asia: "Asia", europe: "Europe", africa: "Africa", "north-america": "North America", "south-america": "South America", oceania: "Oceania", antarctica: "Antarctica",
    pacific: "the Pacific Ocean", atlantic: "the Atlantic Ocean", indian: "the Indian Ocean", arctic: "the Arctic Ocean", southern: "the Southern Ocean" },
  hotPrompt: "Hot or cold?", hotSay: "Is this place hot or cold? Put it in its basket.",
  hotBaskets: { hot: "hot", cold: "cold" },
  hotItems: { rainforest: "a rainforest", sahara: "the Sahara", equator: "near the equator", lut: "the Lut desert", antarctica: "Antarctica", north: "the North Pole", mountain: "a high mountain top", igloo: "where ice houses are" } } };

B.EN["world-sprout-p6"] = { title: "Then and now", words: {
  lifePrompt: "How does a child grow up? Put them in order.",
  life: { baby: "was a baby", crawl: "crawled", walk: "started walking", talk: "started talking", school: "went to school" },
  thenPrompt: "Long ago or today?", thenSay: "Did we see this more long ago, or today? Put it in its basket.",
  thenBaskets: { then: "long ago", now: "today" },
  thenItems: { caravan: "camel caravan", horse: "travelling by horse", plane: "plane", metro: "metro", chapar: "chapar rider", letter: "a letter by post",
    message: "a message on a phone", video: "a video call", alak: "alak-dolak", hopscotch: "hopscotch", tablet: "a computer game" } } };

B.EN["world-sprout-p7"] = { title: "Shop and choose", words: {
  pay: "Buy the {name}: pay the right money.",
  paySay: "The {name} costs {price} thousand toman. Pay for it.",
  can: "You have {money} thousand toman. Which one can you buy?",
  opt: "{name}, {price} thousand toman",
  left: "You had {money} thousand toman and bought the {name} for {price} thousand toman. How much is left for your piggy bank?",
  names: { pencil: "pencil", bread: "bread", apple: "apple", book: "book", ball: "ball", notebook: "notebook", juice: "juice" } } };

B.EN["world-sprout-p8"] = { title: "Sort them", words: {
  placesPrompt: "City, village or nomads?", placesSay: "Do we see this more in the city, in a village, or with nomads?",
  placesBaskets: { city: "city", village: "village", nomad: "nomads" },
  placesItems: { tower: "a tall building", metro: "the metro", traffic: "traffic lights", farm: "a farm", cow: "a cow in a barn", orchard: "a fruit orchard", tent: "a black tent", flock: "a flock on the move", move: "moving on horseback" },
  fairPrompt: "Is the rule fair?", fairSay: "Is this game rule fair or not?",
  fairBaskets: { fair: "fair", unfair: "not fair" },
  fairItems: { turns: "everyone takes turns", same: "the rule is the same for all", listen: "we listen to everyone", always: "the same one always wins", change: "the rule changes mid-game", leave: "the little ones can't play" },
  needPrompt: "Need or want?", needSay: "Is this a need or a want?",
  needBaskets: { need: "need", want: "want" },
  needItems: { food: "food", home: "a home", doctor: "a doctor when we're ill", clothes: "clothes", game: "a computer game", sweets: "a lollipop", toy: "a new doll" },
  binsPrompt: "Which bin?", binsSay: "Put each thing in its own recycling bin.",
  binsBaskets: { paper: "paper", plastic: "plastic", glass: "glass", food: "food waste" },
  binsItems: { paper: "newspaper", box: "cardboard box", bottle: "plastic bottle", bag: "plastic bag", jar: "jam jar", glassb: "glass bottle", peel: "banana peel", bread: "stale bread" } } };

B.EN["world-sapling-p1"] = { title: "Provinces", words: {
  find: "Find {name} province.",
  neigh: "One of {a} province's neighbours is {b} province. Find {b}.",
  centresPrompt: "Each province, its centre", centresSay: "Match each province with its centre city.",
  prov: { ardabil: "Ardabil", "east-azerbaijan": "East Azerbaijan", "north-khorasan": "North Khorasan", golestan: "Golestan", gilan: "Gilan", "west-azerbaijan": "West Azerbaijan",
    zanjan: "Zanjan", mazandaran: "Mazandaran", qazvin: "Qazvin", alborz: "Alborz", kurdistan: "Kurdistan", "razavi-khorasan": "Razavi Khorasan", tehran: "Tehran", semnan: "Semnan",
    hamadan: "Hamadan", kermanshah: "Kermanshah", qom: "Qom", markazi: "Markazi", lorestan: "Lorestan", ilam: "Ilam", isfahan: "Isfahan", yazd: "Yazd", "south-khorasan": "South Khorasan",
    "chaharmahal-bakhtiari": "Chaharmahal and Bakhtiari", khuzestan: "Khuzestan", "kohgiluyeh-boyerahmad": "Kohgiluyeh and Boyer-Ahmad", kerman: "Kerman", bushehr: "Bushehr", fars: "Fars",
    hormozgan: "Hormozgan", "sistan-baluchestan": "Sistan and Baluchestan" },
  centre: { ardabil: "Ardabil", "east-azerbaijan": "Tabriz", "north-khorasan": "Bojnurd", golestan: "Gorgan", gilan: "Rasht", "west-azerbaijan": "Urmia", zanjan: "Zanjan",
    mazandaran: "Sari", qazvin: "Qazvin", alborz: "Karaj", kurdistan: "Sanandaj", "razavi-khorasan": "Mashhad", tehran: "Tehran", semnan: "Semnan", hamadan: "Hamadan",
    kermanshah: "Kermanshah", qom: "Qom", markazi: "Arak", lorestan: "Khorramabad", ilam: "Ilam", isfahan: "Isfahan", yazd: "Yazd", "south-khorasan": "Birjand",
    "chaharmahal-bakhtiari": "Shahrekord", khuzestan: "Ahvaz", "kohgiluyeh-boyerahmad": "Yasuj", kerman: "Kerman", bushehr: "Bushehr", fars: "Shiraz",
    hormozgan: "Bandar Abbas", "sistan-baluchestan": "Zahedan" } } };

B.EN["world-sapling-p2"] = { title: "The land of Iran", words: {
  find: "Find {name} on the map.",
  climate: "What is the climate of {city} like, mostly?",
  names: { alborz: "the Alborz mountains", zagros: "the Zagros mountains", kavir: "Dasht-e Kavir", lut: "the Lut desert", damavand: "Mount Damavand", sabalan: "Mount Sabalan",
    karun: "the Karun river", zayandeh: "the Zayandeh Rud", sefid: "the Sefidrud", aras: "the Aras river", urmia: "Lake Urmia",
    caspian: "the Caspian Sea", "persian-gulf": "the Persian Gulf", "oman-sea": "the Sea of Oman" },
  cities: { ardabil: "Ardabil", hamadan: "Hamadan", tabriz: "Tabriz", rasht: "Rasht", sari: "Sari", yazd: "Yazd", kerman: "Kerman", "bandar-abbas": "Bandar Abbas", bushehr: "Bushehr", chabahar: "Chabahar" },
  climates: { cold: "cold, in the mountains", wet: "mild and rainy", dry: "hot and dry", humid: "hot and humid by the sea" } } };

B.EN["world-sapling-p3"] = { title: "Map squares", words: {
  tap: "Tap square “{cell}”.",
  which: "Which square is the {name} in?",
  go: "North is at the top of the map. From the {name}, go one square {dir}. What is there? Tap it.",
  things: { tree: "tree", pond: "pond", slide: "slide", bench: "bench", flowers: "flower bed", swing: "merry-go-round", kiosk: "ice-cream stand", ball: "ball" },
  dirs: { n: "north", s: "south", e: "east", w: "west", ne: "north-east", nw: "north-west", se: "south-east", sw: "south-west" } } };

B.EN["world-sapling-p4"] = { title: "Scale", words: {
  how: "About how many metres is it from the {a} to the {b}?",
  far: "Which is further from the {a}: the {b} or the {c}? Measure with the map's ruler and tap it.",
  metre: "metres",
  places: { gate: "park gate", tree: "big tree", pond: "pond", slide: "slide", bench: "bench", flowers: "flower bed" } } };

B.EN["world-sapling-p5"] = { title: "The world and our neighbours", words: {
  find: "Find {name} on the map.",
  equator: "Find the equator.",
  nb: "Where is {name}, Iran's neighbour?",
  capsPrompt: "Each country, its capital", capsSay: "Match each country with its capital.",
  flagsPrompt: "Each flag, which country?", flagsSay: "Match each flag with its country.",
  iran: "Iran", flagOf: "the flag of {name}",
  world: { asia: "Asia", europe: "Europe", africa: "Africa", "north-america": "North America", "south-america": "South America", oceania: "Oceania", antarctica: "Antarctica",
    pacific: "the Pacific Ocean", atlantic: "the Atlantic Ocean", indian: "the Indian Ocean", arctic: "the Arctic Ocean", southern: "the Southern Ocean" },
  countries: { tr: "Turkey", iq: "Iraq", af: "Afghanistan", pk: "Pakistan", tm: "Turkmenistan", am: "Armenia", az: "Azerbaijan", kw: "Kuwait", sa: "Saudi Arabia",
    ae: "the United Arab Emirates", qa: "Qatar", bh: "Bahrain", om: "Oman", kz: "Kazakhstan", ru: "Russia" },
  capitals: { iq: "Baghdad", am: "Yerevan", az: "Baku", tm: "Ashgabat", pk: "Islamabad", kw: "Kuwait City", qa: "Doha", bh: "Manama", sa: "Riyadh", ae: "Abu Dhabi" } } };

B.EN["world-sapling-p6"] = { title: "Timeline", words: {
  prompt: "Put each picture in its place on the timeline.",
  bands: ["very, very long ago", "long ago", "when Grandma and Grandpa were children", "today"],
  items: { phone: "mobile phone", metro: "metro", laptop: "computer", radio: "old radio", phoneOld: "phone with a wire", bw: "black-and-white television",
    caravan: "camel caravan", train: "the smoke train", scribe: "a handwritten book", chapar: "chapar rider",
    cave: "a fire in a cave", stone: "a stone tool", wheat: "the first wheat fields", goat: "the first tame goats" } } };

B.EN["world-sapling-p7"] = { title: "Heritage and crafts", words: {
  craftsPrompt: "Each craft, which city?", craftsSay: "Match each handicraft with its city.",
  craftsA: { carpet: "carpet", tile: "blue tiles", qalamkar: "qalamkar", khatam: "khatam", pottery: "turquoise pottery" },
  craftsB: { carpet: "Tabriz", tile: "Isfahan", qalamkar: "Isfahan", khatam: "Shiraz", pottery: "Lalejin, Hamadan" },
  sitesPrompt: "Each World Heritage site, where?", sitesSay: "Match each World Heritage site with its city or province.",
  sitesA: { bazaar: "covered bazaar", eram: "Eram Garden", yazd: "mud-brick city with windcatchers", lut: "the Lut desert", shushtar: "old waterfalls and mills", hyrcanian: "the Hyrcanian forests" },
  sitesB: { bazaar: "Tabriz", eram: "Shiraz", yazd: "Yazd", lut: "Kerman", shushtar: "Shushtar", hyrcanian: "Gilan and Mazandaran" } } };

B.EN["world-sapling-p8"] = { title: "The market", words: {
  gsPrompt: "Goods or a service?", gsSay: "Put each one in its basket: goods, or a service.",
  gsBaskets: { goods: "goods", service: "service" },
  gsItems: { bread: "bread", shoes: "shoes", carpet: "a carpet", cheese: "cheese", haircut: "a haircut", doctor: "a doctor's check-up", taxi: "a taxi ride", teach: "teaching" },
  role: "{who}: a producer or a consumer?",
  roles: { producer: "producer", consumer: "consumer" },
  who: { baker: "a baker who bakes bread", farmer: "a farmer who sows wheat", carpenter: "a carpenter who makes chairs",
    buyer: "Kian, who buys bread", eater: "Sara, who eats an apple", reader: "Nima, who borrows a book" },
  budget: "You have {money} thousand toman. Which two can you buy together?",
  two: "{a} and {b} ({sum} thousand toman)",
  shop: { pencil: "pencil", notebook: "notebook", ball: "ball", book: "book", juice: "juice", kite: "kite" } } };

/* Lesson review generators (js/practice/world.js): the same questions in English; the items are the lessons' own
   English words. */
(function () {
  var W = {
    sort: "Sort again: put each one in its basket.",
    which: "Which basket does “{name}” go in?",
    odd: "Which one is different from the others?",
    pairs: "Find the pairs.",
    pairsHidden: "Turn the cards over and find the pairs.",
    goes: "What goes with “{name}”?",
    thisFlag: "this flag",
    order: "Put them in order again.",
    timeline: "Put each thing in its place on the timeline."
  };
  var T = ["Sort again", "Which basket?", "Which one is different?", "Find the pairs", "What goes with it?", "In order again", "On the map again", "Answer again"];
  [["seed", 5], ["sprout", 9], ["sapling", 9]].forEach(function (g) {
    T.forEach(function (t, k) { B.EN["world-" + g[0] + "-p" + (g[1] + k)] = { title: t, words: W }; });
  });
})();

B.EN["world-seed-p13"] = { title: "Who is this?", words: { q: {
  dad: { q: "Who is this in Kian's family?", o: ["Dad", "Grandma", "little sister"] },
  mum: { q: "Who is this in Kian's family?", o: ["Mum", "Grandpa", "brother"] },
  gran: { q: "Who told the children a story at night?", o: ["Grandma", "Nazanin", "Kian"] },
  grandpa: { q: "Morad lives with his mum and dad and who else?", o: ["his grandpa and grandma", "only his brother", "his friends"] },
  baby: { q: "What does Nazanin, Kian's little sister, drink?", o: ["milk", "kebab", "coffee"] },
  family: { q: "Families are different: small and big. What do they all have?", o: ["they love each other", "they all have five people", "they all live in Shiraz"] } } } };
B.EN["world-seed-p14"] = { title: "When I was a baby", words: { prompt: "A baby, or now?", say: "Did I do this when I was a baby, or can I do it now? Put it in its basket.",
  baskets: { baby: "when I was a baby", now: "now" },
  items: { milk: "milk from a bottle", cry: "crying for food", crawl: "crawling", sleepAll: "sleeping a lot", run: "running", ball: "catching a ball", spoon: "eating with a spoon", talk: "talking" } } };
B.EN["world-seed-p15"] = { title: "Growing up in order", words: { agesPrompt: "How do people grow up? Put them in order.", stepsPrompt: "How did Taraneh grow up? Put them in order.",
  ages: { baby: "baby", child: "child", adult: "grown-up", old: "old, like Grandpa" }, steps: { milk: "only drank milk", walk: "took her first steps", run: "ran and caught the ball" } } };
B.EN["world-seed-p16"] = { title: "Each game, what does it need?", words: { prompt: "Each game, what does it need?", say: "Match each game with what you need for it.",
  a: { hop: "hopscotch", haftsang: "haft sang", yeqol: "yeqol-doqol", hide: "hide-and-seek", rope: "skipping" },
  b: { hop: "squares on the ground", haftsang: "seven stones and a ball", yeqol: "five little stones", hide: "someone counts to ten", rope: "a rope" } } };
B.EN["world-seed-p17"] = { title: "Count and play", words: { stones: "Count the haft sang stones. How many?", cups: "Count the cups for haft sang at home. How many?", squares: "Count the hopscotch squares. How many?", small: "Count the yeqol-doqol stones. How many?" } };
B.EN["world-seed-p18"] = { title: "Which game?", words: { q: {
  hide: { q: "In which game does one child close their eyes while the others hide?", o: ["hide-and-seek", "hopscotch", "haft sang"] },
  hop: { q: "In which game do we hop on one foot over the squares?", o: ["hopscotch", "hide-and-seek", "yeqol-doqol"] },
  haft: { q: "In which game do we stack stones and knock them down with a ball?", o: ["haft sang", "hopscotch", "hide-and-seek"] },
  safe: { q: "In hide-and-seek, where must we never hide?", o: ["in a fridge or a chest", "behind a tree", "behind a curtain"] } } } };
B.EN["world-seed-p19"] = { title: "Which instrument?", words: { q: {
  daf: { q: "Which instrument does Zhina's dad play in Kurdistan?", o: ["daf", "karna", "laleva"] },
  dutar: { q: "Which instrument does Aynaz's grandpa play in Gonbad?", o: ["dutar", "drum", "daf"] },
  laleva: { q: "Which instrument does Negar's grandpa play in Gilan?", o: ["laleva", "dutar", "qeychak"] },
  karna: { q: "Which instrument does Bahador's uncle play?", o: ["karna", "daf", "laleva"] },
  drum: { q: "Which instrument does Adel's dad play in Ahvaz?", o: ["drum", "dutar", "karna"] },
  same: { q: "The clothes, music and languages of Iran's people are different. But we are all…", o: ["Iranian", "playing one instrument", "wearing the same clothes"] } } } };
B.EN["world-seed-p20"] = { title: "Better together", words: { q: {
  slide: { q: "Everyone wants to go on the slide. What do we do?", o: ["take turns", "push", "sulk"] },
  spill: { q: "You spilt water on your friend's drawing by mistake. What do you say?", o: ["Sorry!", "Not my problem!", "nothing"] },
  pencils: { q: "There is one box of crayons and two of you. What do you do?", o: ["share them", "one takes them all", "hide the crayons"] },
  tidy: { q: "The game is over. What about the toys?", o: ["we all tidy them up together", "they stay where they are", "only one person tidies"] },
  castle: { q: "How did the four friends build the big sandcastle?", o: ["together, each doing a job", "one of them alone", "they didn't build it"] },
  sofreh: { q: "How do the children help lay the sofreh?", o: ["they bring the plates and bread", "they watch", "they hide"] } } } };
B.EN["world-seed-p21"] = { title: "City or country?", words: { sortPrompt: "City or country?", sortSay: "Is this a city or a country? Put it in its basket.", baskets: { city: "city", country: "country" },
  items: { kerman: "Kerman", shiraz: "Shiraz", tabriz: "Tabriz", rasht: "Rasht", yazd: "Yazd", iran: "Iran", turkey: "Turkey", japan: "Japan", kenya: "Kenya" },
  nestPrompt: "Put them from small to big: a home is in a street, a street in a city, a city in a country.",
  nest: { home: "home", street: "street", city: "city", country: "the country of Iran" } } };
B.EN["world-sprout-p17"] = { title: "Before, after, now", words: { q: {
  walkWord: { q: "Did Bardia walk first, or say his first word first?", o: ["he walked first", "he talked first", "both together"] },
  wordSchool: { q: "After his first word, where did Bardia go?", o: ["nursery school", "university", "work"] },
  first: { q: "What is at the start of everyone's life line?", o: ["being born", "going to school", "playing ball"] },
  now: { q: "What does Bardia do “now”?", o: ["plays ball with his friends", "only drinks milk", "takes his first steps"] },
  spoon: { q: "Which did you learn first: eating with a spoon or riding a bike?", o: ["eating with a spoon", "riding a bike", "both together"] } } } };
B.EN["world-sprout-p18"] = { title: "Why is the house like this?", words: { q: {
  roof: { q: "Why do houses in Gilan have sloping roofs?", o: ["so the rain runs off fast", "so the snow stays on", "to look nicer"] },
  wind: { q: "What does a windcatcher on a Yazd house do?", o: ["brings cool wind into the house", "collects rain", "heats the house"] },
  masuleh: { q: "In Masuleh, what is the roof of each house?", o: ["the yard of the house above", "a little rice field", "a pool"] },
  kandovan: { q: "Where were the homes of Kandovan made?", o: ["inside the rock", "on the water", "in the trees"] } } } };
B.EN["world-sprout-p19"] = { title: "The sun and directions", words: { q: {
  rise: { q: "Which way does the sun come up in the morning?", o: ["east", "west", "north"] },
  set: { q: "Which way does the sun go down in the evening?", o: ["west", "east", "south"] },
  noon: { q: "In Iran, at noon, which part of the sky is the sun in?", o: ["south", "north", "east"] },
  right: { q: "If you face north, which side is east?", o: ["your right hand", "your left hand", "behind you"] },
  back: { q: "If you face north, which direction is behind you?", o: ["south", "east", "west"] },
  map: { q: "On a map, where is north usually?", o: ["at the top", "at the bottom", "on the right"] } } } };
B.EN["world-sprout-p20"] = { title: "An address in order", words: { prompt: "Put the address from big to small: the country first.",
  country: "the country of Iran", province: { fars: "Fars province", gilan: "Gilan province", isfahan: "Isfahan province", kerman: "Kerman province" },
  city: { fars: "the city of Shiraz", gilan: "the city of Rasht", isfahan: "the city of Isfahan", kerman: "the city of Kerman" },
  street: ["Bahar Street", "Laleh Street", "Bagh Street"], alley: ["Narges Alley", "Aghagia Alley", "Sarv Alley"], number: "number {n}" } };
B.EN["world-sprout-p21"] = { title: "Iran: which one?", words: { q: {
  north: { q: "Which sea is in the north of Iran?", o: ["the Caspian Sea", "the Persian Gulf", "the Sea of Oman"] },
  south: { q: "Which sea is in the south of Iran?", o: ["the Persian Gulf", "the Caspian Sea", "Lake Urmia"] },
  capital: { q: "Which city is the capital of Iran?", o: ["Tehran", "Shiraz", "Tabriz"] },
  count: { q: "How many provinces does Iran have?", o: ["31", "7", "100"] },
  rasht: { q: "Which sea is Rasht next to?", o: ["the Caspian Sea", "the Persian Gulf", "the Sea of Oman"] },
  mashhad: { q: "Which part of Iran is Mashhad in?", o: ["the north-east", "the south-west", "the north-west"] } } } };
B.EN["world-sprout-p22"] = { title: "Languages and instruments", words: { q: {
  sagh: { q: "Aylar in Tabriz says “Sagh ol!”. What does it mean?", o: ["thank you", "goodbye", "good night"] },
  supas: { q: "Zhiyar in Sanandaj says thank you in Kurdish. What does he say?", o: ["Supas", "Marhaba", "Sagh bol"] },
  shukran: { q: "Reem in Ahvaz says thank you in Arabic. What does she say?", o: ["Shukran", "Supas", "Minnatwar"] },
  many: { q: "How many languages do people speak in Iran?", o: ["many languages", "only one language", "no language"] },
  value: { q: "Which language is precious?", o: ["every language", "only Persian", "only English"] },
  tar: { q: "Which instrument is played with a pick and strings, with a body like two hearts?", o: ["tar", "ney", "dohol"] },
  kamancheh: { q: "Which instrument is played with a bow?", o: ["kamancheh", "dohol", "ney"] },
  ney: { q: "Which instrument do we blow into?", o: ["ney", "tar", "dohol"] } } } };
B.EN["world-sprout-p23"] = { title: "Rules and teamwork", words: { q: {
  noRules: { q: "What happens if a game has no rules at all?", o: ["everyone argues and the game is spoilt", "the game gets better", "everyone wins"] },
  fair: { q: "Which rule is fair?", o: ["the rule is the same for everyone", "only the big ones play", "the rule changes in the middle"] },
  "class": { q: "Why do we put our hand up to talk in class?", o: ["so everyone can be heard", "to get tired", "so the teacher doesn't see"] },
  apples: { q: "In the village, neighbours picked Grandpa's apples together. What is this called?", o: ["hamyari, helping each other", "sulking", "a game"] },
  listen: { q: "When we work together, what do we do when others talk?", o: ["listen", "laugh", "give up"] },
  part: { q: "In teamwork, everyone…", o: ["does part of the job", "does the whole job alone", "just watches"] } } } };
B.EN["world-sapling-p17"] = { title: "Eight directions", words: { q: "North is at the top. Which way does this arrow point?",
  dirs: { n: "north", ne: "north-east", e: "east", se: "south-east", s: "south", sw: "south-west", w: "west", nw: "north-west" },
  between: "Which direction is between {a} and {b}?" } };
B.EN["world-sapling-p18"] = { title: "What land is this?", words: { q: {
  mountain: { q: "What kind of land is this?", o: ["mountain", "desert", "plain"] },
  desert: { q: "What kind of land is this?", o: ["desert", "sea", "forest"] },
  sea: { q: "What is this?", o: ["sea", "mountain", "plain"] },
  plain: { q: "What do we call flat, level land for farms?", o: ["a plain", "a peak", "a desert"] },
  damavand: { q: "Which is the highest mountain in Iran?", o: ["Damavand", "Sabalan", "Dena"] },
  white: { q: "On a relief map, what does white mean?", o: ["the highest peaks", "the sea", "a plain"] },
  green: { q: "On a relief map, what does green mean?", o: ["low places", "peaks", "desert"] } } } };
B.EN["world-sapling-p19"] = { title: "Why a town here?", words: { q: {
  river: { q: "Why did people build towns by rivers?", o: ["because water is needed for drinking and farming", "because rivers sound nice", "because there are no mountains by rivers"] },
  plain: { q: "Why is a flat plain good for a town?", o: ["for farms and building homes", "because it always has snow", "because nobody goes there"] },
  roads: { q: "Who stops where several roads meet?", o: ["travellers and traders", "only birds", "nobody"] },
  port: { q: "Where is a port built?", o: ["by the sea", "on a mountain", "in the middle of the desert"] },
  ahvaz: { q: "Which river is Ahvaz on?", o: ["the Karun", "the Zayandeh Rud", "the Aras"] },
  tabriz: { q: "Why did Tabriz grow big long ago?", o: ["it was where several old roads met", "it was by the sea", "it was in the middle of the desert"] } } } };
B.EN["world-sapling-p20"] = { title: "What the tales say", words: { q: {
  coat: { q: "What did the Mulla wear to the party the second time?", o: ["a new coat", "his old clothes", "his work clothes"] },
  why: { q: "The Mulla said: “Eat, my coat, eat!”. Why?", o: ["because they honoured the coat, not him", "because the coat was hungry", "because the soup was cold"] },
  elephant: { q: "In “The elephant in the dark”, the one who touched the trunk said the elephant was like…", o: ["a pipe", "a pillar", "a fan"] },
  dark: { q: "If there had been a candle in the elephant's room, what would have happened?", o: ["they would all have seen the elephant together", "the elephant would have run away", "nothing different"] },
  lesson: { q: "What does “The elephant in the dark” teach us?", o: ["to listen to others too", "not to go into dark rooms", "that an elephant is like a fan"] } } } };
B.EN["world-sapling-p21"] = { title: "Deciding together", words: { q: {
  first: { q: "To decide together, what do we do first?", o: ["everyone says their idea", "vote straight away", "sulk"] },
  vote: { q: "Three children want ball and two want skipping. After the vote, what do they play?", o: ["ball", "skipping", "nothing"] },
  lose: { q: "If your idea gets fewer votes, what do you do?", o: ["play with the others; next time it may be my idea's turn", "sulk", "shout"] },
  count: { q: "In a vote with hands up, what do we do?", o: ["count the hands", "measure how tall people are", "toss a coin"] },
  interrupt: { q: "When your friend is saying their idea, what do you do?", o: ["listen and don't interrupt", "talk over them", "turn away"] } } } };
B.EN["world-sapling-p22"] = { title: "Which came first?", words: { q: "Which came first?", names: { cave: "living in caves", village: "the first villages", pot: "the pots of Sialk",
  scribe: "handwritten books", print: "the first printing house", train: "the smoke train", radio: "radios in homes", mobile: "mobile phones", caravan: "camel caravans" } } };
B.EN["world-sapling-p23"] = { title: "Saving", words: {
  weeks: "The {thing} costs {price} thousand toman. If you save {save} thousand toman every week, how many weeks will it take?",
  cost: "You have {money} thousand toman. If you buy the {a}, you can't buy the {b} too. What is the cost of your choice?",
  things: { ball: "ball", book: "book", bike: "little bike", kite: "kite" } } };
