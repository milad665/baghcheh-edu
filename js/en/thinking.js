/* باغچه — فکر و برنامه‌نویسی (think) lessons in English, for children learning English as a second language.
   Each entry lays English words over the Persian lesson with the same id (js/lessons/thinking.js); steps are matched
   by position, {} leaves a step as it is. See js/english-mode.js. The last step of every lesson is the parent's
   screen-free game (`unplugged`). */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

(function () {
  var WHICH_NOT = { prompt: "Which one doesn't belong?", say: "Which one doesn't belong?" };
  var NEXT = { prompt: "What comes next?", say: "What comes next?" };
  var TURTLE = { prompt: "Get the turtle to the strawberry" };
  var BUNNY = { prompt: "Get the rabbit to the carrot" };
  var FIX = { prompt: "This program has a bug. Fix it." };
  var STAR = { prompt: "Get the robot to the star" };
  var CONTINUE = { prompt: "Carry on with the numbers" };

  Object.assign(B.EN, {
    // ---------------- Seed ----------------
    "think-seed-1": { title: "Patterns", steps: [
      NEXT, NEXT,
      { prompt: "Fill in the gap", say: "Fill in the gap" },
      { prompt: "Look carefully: one, two. What comes next?", say: "Look carefully. What comes next?" },
      { prompt: "There are two gaps. Fill them in", say: "There are two gaps. Fill them in" },
      { text: "Make a pattern with your hands and feet: clap, stamp, clap, stamp… and let your child carry it on. Then swap: your child makes a pattern and you carry on. Sometimes make a mistake on purpose, so your child can find it." }
    ] },
    "think-seed-2": { title: "Sorting", steps: [
      { prompt: "Put each one in the basket with its colour" },
      { prompt: "Find the partner of each one", say: "Find the partner of each one" },
      { prompt: "Animals in one basket, fruit in the other",
        baskets: [{ label: "Animal" }, { label: "Fruit" }] },
      { prompt: "Put them in order, from fewest to most", say: "Put them in order, from fewest to most" },
      { text: "When you fold the clean washing, ask your child to match up the socks. Then ask: “How should we sort these clothes?” Your child might say by colour, by size, or by whose they are. Any way they suggest is good, as long as they can tell you why." }
    ] },
    "think-seed-3": { title: "Step by step", steps: [
      { prompt: "Watch how the flower grows",
        scenes: [{ caption: "First we plant the seed in the soil." }, { caption: "Then we give it water." },
          { caption: "Slowly, a sprout appears." }, { caption: "At the end, it flowers." }] },
      { prompt: "Put them in order: what came first?", say: "Put them in order. What came first?",
        items: [{ label: "Seed", say: "seed" }, { label: "Water", say: "water" }, { label: "Sprout", say: "sprout" }, { label: "Flower", say: "flower" }] },
      { prompt: "What came first, and what happened next?", say: "What came first, and what happened next?",
        items: [{ say: "egg" }, { say: "the chick comes out of the egg" }, { say: "chick" }, { say: "hen" }] },
      { prompt: "How do you wash your hands? Put the steps in order", say: "How do you wash your hands? Put the steps in order",
        items: [{ label: "Wet", say: "Wet your hands" }, { label: "Soap", say: "Put on soap" }, { label: "Rinse", say: "Rinse" }, { label: "Dry", say: "Dry your hands" }] },
      { text: "Make a bread-and-cheese wrap together, but your child tells you the steps one at a time and you do exactly what they say, no more. If they say “Put the cheese on” and you have not opened the bread yet, ask: “Where do I put it?” so they see that the order of the steps matters. Coding is just this: saying the steps exactly, in order." }
    ] },
    "think-seed-4": { title: "The turtle's way", steps: [
      { prompt: "Get the turtle to the strawberry. Put the arrows in order and press “Run”." },
      TURTLE, TURTLE,
      { prompt: "There is a rock in the way! Go around it" },
      { text: "Robot game: you are the robot and your child is the programmer. Put a doll or a piece of fruit on the other side of the room. Move only when your child gives a command: “One step forward”, “One step back”, “One step left”, “One step right”. Follow every command exactly, even a wrong one, so your child fixes the program by themselves. Then swap places." }
    ] },

    // ---------------- Sprout ----------------
    "think-sprout-1": { title: "Which one doesn't belong?", steps: [
      WHICH_NOT, WHICH_NOT, WHICH_NOT,
      { prompt: "You can draw with three of these. Which one doesn't belong?", say: "You can draw with three of these. Which one doesn't belong?" },
      { prompt: "Which lives in the water, and which flies?",
        baskets: [{ label: "In the water" }, { label: "In the sky" }] },
      { text: "Put four things on the table, where three go together, for example three spoons and a sock. Ask: “Which one doesn't belong? Why?” Then it is your child's turn to test you. Sometimes there is more than one right answer; if your child gives a good reason, accept it." }
    ] },
    "think-sprout-2": { title: "If… then…", steps: [
      { prompt: "If it rains, which one do we take?", say: "If it rains, which one do we take?" },
      { prompt: "If it is cold, what do we wear?", say: "If it is cold, what do we wear?" },
      { prompt: "If a plant is thirsty, what do we give it?", say: "If a plant is thirsty, what do we give it?" },
      { prompt: "The game rule: if the bell rings, we jump. The bell rang! What do we do?", say: "The game rule: if the bell rings, we jump. The bell rang! What do we do?",
        options: [{ label: "🧍 We stand" }, { label: "🦘 We jump" }, { label: "🪑 We sit" }] },
      { prompt: "The rule: if it is red, it goes in the basket; if it is not red, it goes on the plate.",
        baskets: [{ label: "Red" }, { label: "Not red" }] },
      { text: "The “If… then…” game: make a rule, for example “If I clap, you jump. If I stamp, you sit.” Then clap sometimes and stamp sometimes. Slowly change the rules, or let your child make the rules while you follow them. “If” does the same job in coding." }
    ] },
    "think-sprout-3": { title: "Harder patterns", steps: [
      { prompt: "What comes next?", say: "What comes next?" },
      { prompt: "Fill in the gaps", say: "Fill in the gaps" },
      CONTINUE,
      { prompt: "Each time there is one more. What comes next?", say: "Each time there is one more. What comes next?" },
      CONTINUE,
      { text: "Make a pattern necklace with pasta, buttons or beads: two red, one blue, two red, one blue… Ask: “What comes next? How did you know?” Then let your child make a new pattern and ask you." }
    ] },
    "think-sprout-4": { title: "A program with arrows", steps: [
      { prompt: "Get the rabbit to the carrot. Put the arrows in order and press “Run”." },
      { prompt: "Get the rabbit to the carrot. Go around the trees." },
      BUNNY,
      TURTLE,
      { text: "Draw a 4-by-4 grid with chalk in the yard, or with tape on the carpet, and put a toy in one of the squares. Your child writes a program on paper with arrows: up, down, left and right. Then one of you stands on the grid and follows the program step by step. Did you reach the toy?" }
    ] },
    "think-sprout-5": { title: "Find the bug", steps: [
      { prompt: "This program has a bug. First press “Run” and see what happens. Then fix it." },
      FIX, FIX, FIX,
      { text: "Sometimes give a wrong command on purpose, for example “To get to the door, go three steps left” when the door is on the right. Let your child find the bug and fix it. Tell them that programmers find and fix bugs every day; mistakes are part of the work." }
    ] },

    // ---------------- Sapling ----------------
    "think-sapling-1": { title: "Turn left, turn right", steps: [
      { prompt: "The robot is facing up. If it turns right, which way does it face?", say: "The robot is facing up. If it turns right, which way does it face?" },
      { prompt: "The robot is facing right. If it turns right, which way does it face?", say: "The robot is facing right. If it turns right, which way does it face?" },
      { prompt: "The robot is facing down. If it turns right, which way does it face? (Imagine you are the robot.)", say: "The robot is facing down. If it turns right, which way does it face?" },
      { prompt: "The robot is facing left. If it turns left twice, which way does it face?", say: "The robot is facing left. If it turns left twice, which way does it face?" },
      { prompt: "The triangle on the robot shows which way it is facing. Get the robot to the star." },
      { text: "The “Robot, turn” game: your child stands up. Say “Turn right”, “Turn left”, “Walk two steps forward”, then ask: “Which way are you facing now? The window? The door?” Then swap. If your child mixes up left and right, tie a band or a ribbon round their right wrist." }
    ] },
    "think-sapling-2": { title: "Go forward, turn", steps: [
      STAR,
      { prompt: "The robot has to turn first. Get it to the star." },
      STAR,
      { prompt: "Get the robot to the star, between the rocks" },
      { text: "Now you are the robot and you only understand three commands: “One step forward”, “Turn right” and “Turn left”. Your child has to guide you from this room to the kitchen. Follow every command exactly. If a wall or a sofa is in front of you, stop and say “Beep! The way is blocked.”" }
    ] },
    "think-sapling-3": { title: "Repeat", steps: [
      // In English the coding game's program reads left to right, so the scene's board does too: the blocks, the
      // ring that shows the running block and the repeat block are laid out mirrored (tracks matched by position).
      { prompt: "See how the robot reaches the flag",
        parts: { f1: { at: [32, 18] }, f2: { at: [52, 18] }, f3: { at: [72, 18] }, f4: { at: [92, 18] },
          loop: { art: "block-repeat-ltr", at: [60, 18] }, body: { at: [60, 18] }, now: { at: [32, 18] } },
        scenes: [{ caption: "The robot wants to reach the flag." },
          { caption: "Forward, forward, forward, forward. Four blocks, all the same!",
            do: [{}, {}, {}, {}, {}, {}, { to: { x: 52 } }, {}, { to: { x: 72 } }, {}, { to: { x: 92 } }] },
          { caption: "Instead, we can say: “Repeat 4 times: forward.”",
            do: [{}, {}, {}, {}, { to: { x: 60 } }, { to: { x: 60 } }, { to: { x: 60 } }, { to: { x: 60 } }] },
          { caption: "The robot repeats the same “forward” 4 times: 1, 2, 3, 4!", do: [{ to: { x: 60 } }] },
          { caption: "This is the “repeat” block. The program got shorter!",
            do: [{}, {}, { to: { x: 32 } }, { to: { x: 52 } }, { to: { x: 72 } }, { to: { x: 92 } }] }],
        question: "With “repeat”, did the program get shorter or longer?", options: ["Shorter", "Longer"], answer: "Shorter" },
      { prompt: "You only have two blocks! Use “repeat”, put “forward” inside it, and set the number so it is right." },
      { prompt: "This program has a bug. Fix the number of repeats." },
      { prompt: "Climb the steps! Reach the star with five blocks." },
      { text: "Make a “repeat dance”: “Repeat 3 times: clap, jump.” Your child says the program and you do it, then swap. Ask: “If we want to clap 10 times, which is shorter: saying ‘clap’ ten times, or saying once ‘Repeat 10 times: clap’?”" }
    ] },
    "think-sapling-4": { title: "Putting in order", steps: [
      { prompt: "Put them in order, from smallest to biggest" },
      { prompt: "See how we can put numbers in order two at a time",
        scenes: [
          { caption: "We want to put these numbers in order, from smallest to biggest." },
          { caption: "We compare the first two: 5 is bigger than 2, so we swap them." },
          { caption: "Now 5 and 8: they are in the right order. We don't swap them." },
          { caption: "8 and 3: 8 is bigger, so we swap them." },
          { caption: "Another go from the start: 2 and 5 are fine. We swap 5 and 3." },
          { caption: "They are all in order: 2, 3, 5, 8." }
        ],
        question: "In this way, how many numbers do we compare each time?" },
      { prompt: "Put the days of the week in order. The week starts with Saturday.", say: "Put the days of the week in order. The week starts with Saturday.",
        items: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"] },
      { prompt: "Put them in order, from smallest to biggest" },
      { prompt: "Which can we eat, and which can't we?",
        baskets: [{ label: "Food" }, { label: "Not food" }] },
      { text: "Mix up some number cards, or some spoons and cups of different sizes, on the table. The rule is: each time, compare only two that are next to each other, and swap them if needed. Keep going until everything is in order. Computers sort in ways like this too." }
    ] },
    "think-sapling-5": { title: "Bigger programs", steps: [
      { prompt: "Go down the steps! This program has a bug. Fix it." },
      { prompt: "Go around the wall and reach the star. You have at most eight blocks." },
      { prompt: "Get the robot to the apple. You have at most five blocks." },
      { text: "Write a program on paper for a family member, who is the robot, to walk round the table; for example “Repeat 4 times: 3 steps forward, turn right”. First your child guesses where the robot will end up, then you run it. If it does not get there, look for the bug together and fix the program." }
    ] }
  });
})();
