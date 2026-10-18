/* باغچه — ریاضی (math) lessons in English, for children learning English as a second language.
   Each entry lays English words over the Persian lesson with the same id (js/lessons/math.js); steps are matched
   by position, {} leaves a step as it is. See js/english-mode.js. */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

(function () {
  var ANSWER = { prompt: "What is the answer?" };
  var BREAD = { name: "sangak bread" };
  var SMALL_TO_BIG = { prompt: "Put the numbers in order, from smallest to biggest" };

  Object.assign(B.EN, {
    // ---------------- Seed ----------------
    "math-seed-1": { title: "Counting to five" },
    "math-seed-2": { title: "Counting to ten" },
    "math-seed-3": { title: "The feeding game", steps: [
      { prompt: "Watch the story and count",
        scenes: [{ caption: "The hen is eating grain in the yard." }, { caption: "A chick came." },
          { caption: "Another chick came." }, { caption: "Another chick came." }],
        question: "How many chicks came to the hen?" },
      { prompt: "The rabbit is hungry. Give it three carrots." },
      { prompt: "Count, and match each group with a group of the same number" },
      { prompt: "The squirrel is hungry. Give it five." },
      { prompt: "What comes next?" },
      { prompt: "Put them in order, from fewest to most" }
    ] },
    "math-seed-4": { title: "Big and small", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Maryam has gone to the bazaar with her mother." }, { caption: "This watermelon is big." },
          { caption: "This apple is small." }, { caption: "The watermelon is bigger than the apple. The apple is smaller than the watermelon." }],
        question: "Which one is smaller?" },
      { prompt: "Which one is bigger?", say: "Which one is bigger? The elephant or the mouse?" },
      { prompt: "Which one is the smallest?", say: "Which one is the smallest? The cow, the ant or the horse?" },
      {}, {}, {},
      { prompt: "Watch and listen",
        scenes: [{ caption: "Narges and her brother Arash are in the yard." }, { caption: "Narges is taller." },
          { caption: "Arash is shorter." }, { caption: "The tree in the yard is taller than both of them!" }],
        question: "Which one is the tallest?" }
    ] },
    "math-seed-5": { title: "Sort them", steps: [
      { prompt: "Red ones on one side, green ones on the other",
        say: "Put the red fruit and vegetables in one basket and the green ones in the other.",
        baskets: [{ label: "red" }, { label: "green" }],
        items: [{ say: "apple" }, { say: "tomato" }, { say: "strawberry" }, { say: "cucumber" }, { say: "green apple" }, { say: "lettuce" }] },
      { prompt: "Tidy up the toys",
        say: "Put the red toys in one box and the blue ones in the other.",
        baskets: [{ label: "red" }, { label: "blue" }],
        items: [{ say: "red car" }, { say: "blue car" }, { say: "red balloon" }, { say: "blue cap" }, { say: "fire engine" }, { say: "blue whale" }] },
      { prompt: "Put each thing in the basket of its colour",
        say: "Red, yellow and blue. Put each thing in the basket of its colour.",
        baskets: [{ label: "red" }, { label: "yellow" }, { label: "blue" }],
        items: [{ say: "cherries" }, { say: "lemon" }, { say: "a drop of water" }, { say: "rose" }, { say: "sunflower" }, { say: "trousers" }] },
      { prompt: "Round ones on one side, four-cornered ones on the other",
        say: "Look at the shape, not the colour. Put the round ones in one basket and the four-cornered ones in the other.",
        baskets: [{ label: "round" }, { label: "four corners" }],
        items: [{ say: "red and round" }, { say: "red with four corners" }, { say: "blue and round" }, { say: "blue with four corners" },
          { say: "yellow and round" }, { say: "yellow with four corners" }] },
      { prompt: "Big things on one side, small things on the other",
        say: "Put the big things in one basket and the small things in the other.",
        baskets: [{ label: "big" }, { label: "small" }],
        items: [{ say: "bus" }, { say: "key" }, { say: "tree" }, { say: "ladybird" }, { say: "house" }, { say: "cherries" }] }
    ] },
    "math-seed-6": { title: "Where is it?", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "This is the tree in the yard." }, { caption: "The sparrow is at the top of the tree." },
          { caption: "The cat is at the bottom of the tree." }, { caption: "The ball is next to the tree." }] },
      { prompt: "Watch and listen",
        scenes: [{ caption: "Sara and Kamran are playing hide-and-seek." }, { caption: "Kamran hid behind the tree." },
          { caption: "Sara came in front of the tree." }, { caption: "Found you!" }],
        question: "Who hid behind the tree?" },
      { prompt: "Look and answer",
        scenes: [{ caption: "A house, the sun and a dog. Which one is above the house?" }],
        question: "Which one is above the house?" },
      { prompt: "Look and answer",
        scenes: [{ caption: "Grandma has bought fruit at the bazaar." }, { caption: "She put the apple in the basket. The pear is next to the basket." }],
        question: "What is in the basket?" },
      { prompt: "Put your hand up! Which way is up?", say: "Put your hand up! Which way is up?" },
      { prompt: "Now put your hand down. Which way is down?", say: "Now put your hand down. Which way is down?" },
      { prompt: "Look and answer",
        scenes: [{ caption: "The sparrow was sitting next to the cat. It flew up to the top of the tree." }, { caption: "Where is the sparrow now?" }],
        question: "Where is the sparrow?" }
    ] },
    "math-seed-7": { title: "Shapes all around us", steps: [
      { prompt: "This is a circle, this is a square and this is a triangle." },
      { prompt: "Which one is the circle?" },
      { prompt: "Which one is the triangle?" },
      { prompt: "Which one is the square?" },
      { prompt: "Which one looks like a circle?", say: "Which one looks like a circle? The ball, the book or the banana?" },
      { prompt: "Which one looks like a square?", say: "Which one looks like a square? The moon, the present box or the banana?" },
      { prompt: "Which one looks like a triangle?", say: "Which one looks like a triangle? The nomads' tent, the ball or the box?" },
      { text: "Look around your home and find these shapes:",
        list: ["Something round, like a plate or taftoon bread", "Something square, like a tile or a handkerchief", "Something like a triangle, like a slice of watermelon"] }
    ] },
    "math-seed-8": { title: "Make a pattern", steps: [
      { prompt: "What comes next?", say: "Red, blue, red, blue. What comes next?" },
      { prompt: "Shirazi salad! Cucumber, tomato, cucumber, tomato…", say: "Cucumber, tomato, cucumber, tomato. Fill in the gaps." },
      { prompt: "What comes next?", say: "Flower, flower, leaf. Flower, flower, leaf. What comes next?" },
      { prompt: "Clap, clap, stamp!", say: "Clap, clap, stamp. Clap, clap, stamp. Clap and stamp with me, then fill in the gaps." },
      { prompt: "What comes next?", say: "Red, yellow, blue. Red, yellow, blue. What comes next?" },
      { prompt: "Hen, chick, egg…", say: "Hen, chick, egg. Hen, chick, egg. Fill in the gaps." },
      { prompt: "Finish the carpet", say: "This carpet has a pattern: red, yellow, red, yellow. You weave the rest." }
    ] },
    "math-seed-9": { title: "Getting to know numbers", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "This is the number one. One apple." }, { caption: "This is the number two. Two pears." },
          { caption: "This is the number three. Three oranges." }, { caption: "This is the number four. Four strawberries." },
          { caption: "This is the number five. Five eggs." }] },
      { prompt: "Match each number with its dots", say: "Tap a number to hear its name. Match each number with its dots.",
        pairs: [[{ say: "one" }, null], [{ say: "two" }, null], [{ say: "three" }, null]] },
      { prompt: "Look at this number. Which group has this many?", say: "Look at this number. Which group has this many?" },
      { prompt: "Match each number with its group", say: "Tap a number to hear its name. Count, and match each number with its group.",
        pairs: [[{ say: "two" }, null], [{ say: "four" }, null], [{ say: "one" }, null], [{ say: "five" }, null]] },
      { prompt: "Look at this number. Which group has this many?", say: "Look at this number. Which group has this many?" },
      { prompt: "Look at the number. Give the sparrow that many seeds." },
      { prompt: "Match each number with its dots", say: "Tap a number to hear its name. Match each number with its dots.",
        pairs: [[{ say: "three" }, null], [{ say: "five" }, null], [{ say: "four" }, null], [{ say: "two" }, null]] },
      { prompt: "Put the numbers in order, from one to five", say: "Put the numbers in order, from one to five: one, two, three, four, five.",
        items: [{ say: "one" }, { say: "two" }, { say: "three" }, { say: "four" }, { say: "five" }] }
    ] },
    "math-seed-10": { title: "The counting game", steps: [
      { prompt: "The hen is hungry. Give it three ears of corn." },
      { say: "Turn the cards over two at a time. Match each number with its dots.",
        pairs: [[{ say: "two" }, null], [{ say: "four" }, null], [{ say: "one" }, null]] },
      { prompt: "Put them in order, from fewest to most" },
      { prompt: "The little goat is hungry. Give it five bunches of grass." },
      { say: "Turn the cards over two at a time. Match each number with its group.",
        pairs: [[{ say: "three" }, null], [{ say: "five" }, null], [{ say: "one" }, null], [{ say: "four" }, null]] },
      { prompt: "Look at the number. Give the cat that many fish." },
      { prompt: "Count back from five to one and put them in order", say: "Count back from five to one: five, four, three, two, one.",
        items: [{ say: "five" }, { say: "four" }, { say: "three" }, { say: "two" }, { say: "one" }] }
    ] },

    // ---------------- Sprout ----------------
    "math-sprout-1": { title: "The ten-frame", steps: [
      {}, { prompt: "How many counters are in the frame?" }, { prompt: "How many counters are in the frame?" },
      {}, {}, { prompt: "How many counters are in the frame?" }
    ] },
    "math-sprout-2": { title: "How many more make ten?", steps: [
      { prompt: "How many more do you need to make ten?" }, { prompt: "How many more do you need to make ten?" },
      { prompt: "How many more do you need to make ten?" }, { prompt: "How many more do you need to make ten?" },
      { prompt: "How many more do you need to make ten?" }
    ] },
    "math-sprout-3": { title: "Numbers 11 to 20", steps: [
      {}, { prompt: "One full frame means ten. How many counters are there altogether?" },
      { prompt: "How many counters are there altogether?" }, {},
      { prompt: "How many counters are there altogether?" }, {},
      { prompt: "Ten and seven make how many?", say: "Ten and seven make how many?" }
    ] },
    "math-sprout-4": { title: "More or less?" },
    "math-sprout-5": { title: "Adding to ten", steps: [{}, {}, {}, {}, {}, ANSWER, ANSWER] },
    "math-sprout-6": { title: "Taking away to ten", steps: [{}, {}, {}, {}, ANSWER, ANSWER] },
    "math-sprout-7": { title: "Shapes", steps: [
      { prompt: "These are a circle, a square, a triangle and a rectangle." },
      { prompt: "Which one is the circle?" }, { prompt: "Which one is the triangle?" },
      { prompt: "Which one is the square?" }, { prompt: "Which one is the rectangle?" },
      { prompt: "How many sides does a triangle have?" }, { prompt: "How many sides does a rectangle have?" },
      { prompt: "Which one looks like this shape?", options: [{ value: "door" }, { value: "biscuit" }, { value: "pizza" }], answer: "biscuit" },
      { prompt: "Which one looks like this shape?", options: [{ value: "pizza" }, { value: "ball" }, { value: "door" }], answer: "pizza" }
    ] },
    "math-sprout-8": { title: "The adding game", steps: [
      { prompt: "Watch what happens to the apples",
        scenes: [{ caption: "Here are three red apples." }, { caption: "There are two green apples." },
          { caption: "We put the apples together." }, { caption: "Now there are five apples. Three plus two makes five." }] },
      { prompt: "Work out this sum and give the rabbit that many carrots." },
      { prompt: "Work out this sum and give the squirrel that many." },
      { prompt: "Match each number with its dots" },
      { prompt: "Work out this sum and give the hen that much corn." },
      SMALL_TO_BIG,
      { prompt: "Count in twos. Fill the gap." }
    ] },
    "math-sprout-10": { title: "Before and after", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "In our alley, every house has a number." }, { caption: "Zahra's house is number seven." },
          { caption: "Before seven comes six." }, { caption: "After seven comes eight." }, { caption: "Seven is between six and eight." }],
        question: "Which number comes after seven?" },
      {}, {},
      { prompt: "Which number comes after 12?", say: "Which number comes after twelve?" },
      { prompt: "Which number comes before 10?", say: "Which number comes before ten?" },
      { prompt: "Which number is between 16 and 18?", say: "Which number is between sixteen and eighteen?" },
      SMALL_TO_BIG,
      { prompt: "Put them in order, from 15 to 20", say: "Put them in order, from fifteen to twenty." }
    ] },
    "math-sprout-11": { title: "Adding and taking away stories", steps: [
      { prompt: "Listen to the story and count",
        scenes: [{ caption: "Nazanin picked three tulips." }, { caption: "Her brother Arash brought two more." },
          { caption: "They put the flowers together." }],
        question: "How many flowers do they have now?" },
      { prompt: "Listen to the story and count",
        scenes: [{ caption: "Six sparrows were sitting in the tree in the yard." }, { caption: "Two sparrows flew away." },
          { caption: "The others stayed in the tree." }],
        question: "How many sparrows stayed in the tree?" },
      { prompt: "Listen to the story and count",
        scenes: [{ caption: "Grandma had four apples." }, { caption: "She bought three more apples at the bazaar." },
          { caption: "She put all the apples in the basket." }],
        question: "How many apples does Grandma have now?" },
      { prompt: "Ailin had eight sweets. She gave three to her friend. How many does she have left?",
        say: "Ailin had eight sweets. She gave three to her friend. How many does she have left?" },
      { prompt: "Four people were on the bus. At the bus stop, five more got on. How many people are on the bus now?",
        say: "Four people were on the bus. At the bus stop, five more got on. How many people are on the bus now?" },
      { prompt: "Hazhar had ten marbles. He gave four to his brother in a game. How many marbles does he have left?",
        say: "Hazhar had ten marbles. He gave four to his brother in a game. How many marbles does he have left?" }
    ] },
    "math-sprout-12": { title: "Morning, noon and night", steps: [
      { prompt: "Watch Omid's day",
        scenes: [{ caption: "It is morning. Omid wakes up and eats bread and cheese with his family." },
          { caption: "It is noon. Omid comes home from school and eats lunch." },
          { caption: "It is late afternoon. Omid plays in the park with his sister." },
          { caption: "It is night. Omid brushes his teeth and goes to sleep." }],
        question: "When did Omid eat lunch?",
        options: [{ value: "morning" }, { value: "noon" }, { value: "night" }], answer: "noon" },
      { prompt: "Put Omid's day in order, from morning to night", say: "Put Omid's day in order, from morning to night.",
        items: [{ label: "breakfast" }, { label: "lunch" }, { label: "play" }, { label: "sleep" }] },
      { prompt: "When do we brush our teeth and go to sleep?", say: "When do we brush our teeth and go to sleep?",
        options: [{ value: "noon" }, { value: "night" }, { value: "morning" }], answer: "night" },
      { prompt: "The days of the week",
        cast: { d1: "Saturday", d2: "Sunday", d3: "Monday", d4: "Tuesday", d5: "Wednesday", d6: "Thursday", d7: "Friday" },
        scenes: [{ caption: "A week has seven days. In Iran, the week starts on Saturday." },
          { caption: "Then come Sunday, Monday and Tuesday." }, { caption: "Then Wednesday and Thursday." },
          { caption: "The last day of the week is Friday. Schools are closed on Friday." }] },
      { prompt: "Put the days of the week in order, starting from Saturday", say: "Put the days of the week in order, starting from Saturday.",
        items: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"] },
      { prompt: "What day comes after Monday?", say: "What day comes after Monday?",
        options: ["Sunday", "Tuesday", "Friday"], answer: "Tuesday" },
      { prompt: "What day comes before Friday?", say: "What day comes before Friday?",
        options: ["Thursday", "Saturday", "Wednesday"], answer: "Thursday" }
    ] },
    "math-sprout-13": { title: "The numbers-to-twenty game", steps: [
      { prompt: "The sheep is hungry. Give it twelve bunches of grass." },
      { prompt: "Two hands make ten fingers. Match each number with its hands and dots.",
        pairs: [[null, { say: "ten and three" }], [null, { say: "ten and six" }], [null, { say: "ten and one" }], [null, { say: "ten and eight" }]] },
      { prompt: "Count in ones. Fill the gap." },
      { prompt: "Work out this sum and give the horse that many carrots." },
      { prompt: "Count back from twenty. Fill the gaps." },
      { say: "Turn the cards over two at a time. Match each number with its hands and dots.",
        pairs: [[{ say: "twelve" }, { say: "ten and two" }], [{ say: "fifteen" }, { say: "ten and five" }], [{ say: "seventeen" }, { say: "ten and seven" }]] },
      { prompt: "Count in twos up to twenty. Fill the gaps." }
    ] },

    // ---------------- Sapling ----------------
    "math-sapling-3": { title: "Adding by making ten", steps: [
      {}, {}, {}, {}, { prompt: "Make ten first. What is the answer?" }, { prompt: "Make ten first. What is the answer?" }
    ] },
    "math-sapling-1": { title: "Adding with frog jumps" },
    "math-sapling-2": { title: "Taking away with rabbit jumps" },
    "math-sapling-4": { title: "Bundles of ten" },
    "math-sapling-5": { title: "Numbers to 100", steps: [
      {}, {}, { prompt: "3 bundles of ten and 8 sticks. How many altogether?" },
      { prompt: "How many tens are in this number?" }, { prompt: "Which number comes after 39?" },
      { prompt: "Which number comes before 70?" }, {}
    ] },
    "math-sapling-6": { title: "Comparing numbers" },
    "math-sapling-12": { title: "Even and odd, number patterns", steps: [
      { prompt: "See what even and odd mean", cast: { even: "6 even", odd: "7 odd" },
        scenes: [{ caption: "We have six shoes." }, { caption: "We put the shoes in pairs." },
          { caption: "Every shoe has a partner and none is left alone. So six is even." },
          { caption: "Now one more shoe comes." },
          { caption: "This one has no partner and is left alone. So seven is odd." }] },
      { prompt: "Put the even numbers in one basket and the odd numbers in the other.",
        baskets: [{ label: "even" }, { label: "odd" }] },
      { prompt: "Count in tens. Fill the gap." },
      { prompt: "Count in fives. Fill the gaps." },
      SMALL_TO_BIG
    ] },
    "math-sapling-7": { title: "Adding two-digit numbers", steps: [{}, {}, {}, {}, ANSWER, ANSWER] },
    "math-sapling-8": { title: "Taking away two-digit numbers", steps: [{}, {}, {}, {}, ANSWER, ANSWER] },
    "math-sapling-9": { title: "Measuring", steps: [
      {}, {}, {},
      { prompt: "How many paper clips long is the pencil?" },
      { prompt: "How many paper clips long is the spoon?" },
      { prompt: "How many hand spans long is the scarf?" }
    ] },
    "math-sapling-10": { title: "Buying bread", steps: [
      { prompt: "How much money is this altogether?" },
      { prompt: "How much money is this altogether?" },
      { prompt: "Pay for the bread.", items: [BREAD] },
      { prompt: "How much do two sangak breads cost altogether?", items: [BREAD, BREAD] },
      { prompt: "Pay for the two breads.", items: [BREAD, BREAD] },
      { prompt: "You gave 10 thousand toman. How much change do you get?", items: [BREAD] }
    ] },
    "math-sapling-11": { title: "Shopping at the market", steps: [
      { prompt: "How much is it altogether?", items: [{ name: "apples" }, { name: "oranges" }] },
      { prompt: "Pay for the cucumbers.", items: [{ name: "cucumbers" }] },
      { prompt: "How much is it altogether?", items: [{ name: "cheese" }, { name: "milk" }] },
      { prompt: "You gave 50 thousand toman. How much change do you get?", items: [{ name: "watermelon" }] },
      { prompt: "Pay for the grapes.", items: [{ name: "grapes" }] },
      { prompt: "How much is it altogether?", items: [{ name: "tomatoes" }, { name: "potatoes" }] }
    ] }
  });
})();
