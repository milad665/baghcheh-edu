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
  var FRUIT_ROWS = [{ label: "apples" }, { label: "grapes" }, { label: "oranges" }];
  var FARM_ROWS = [{ label: "hens" }, { label: "sheep" }, { label: "cows" }];

  Object.assign(B.EN, {
    // ---------------- Seed ----------------
    "math-seed-1": { title: "Counting to five" },
    "math-seed-2": { title: "Counting to ten" },
    "math-seed-3": { title: "The feeding game", steps: [
      { prompt: "Watch the story and count",
        scenes: [{ caption: "The hen is eating grain in the yard." }, { caption: "A chick came." },
          { caption: "Another chick came." }, { caption: "Another chick came.", wait: { hint: "Now you count the chicks: tap each chick." } }],
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
        scenes: [{ caption: "This is the tree in the yard." }, { caption: "The sparrow came and sat at the top of the tree." },
          { caption: "The cat came and sat at the bottom of the tree." }, { caption: "The ball rolled and stopped next to the tree." }] },
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
        scenes: [{ caption: "One apple. This is the number one." }, { caption: "Two pears. This is the number two." },
          { caption: "Three oranges. This is the number three." }, { caption: "Four strawberries. This is the number four." },
          { caption: "Five eggs. This is the number five." }] },
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
          { caption: "We put the apples together.", wait: { hint: "Now count all the apples: tap each apple." } },
          { caption: "Now there are five apples. Three plus two makes five." }] },
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
        parts: { d1: { art: "day:Saturday" }, d2: { art: "day:Sunday" }, d3: { art: "day:Monday" }, d4: { art: "day:Tuesday" },
          d5: { art: "day:Wednesday" }, d6: { art: "day:Thursday" }, d7: { art: "day:Friday" } },
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
      { prompt: "See what even and odd mean", parts: { even: { art: "tag:6 even" }, odd: { art: "tag:7 odd" } },
        scenes: [{ caption: "We have six shoes.", wait: { hint: "Count them: tap each shoe." } }, { caption: "We put the shoes in pairs." },
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
    ] },
    "math-sapling-13": { title: "Doubles and number families", steps: [
      { prompt: "Grandma put three eggs in each bowl. How many eggs are in the two bowls altogether?",
        say: "Grandma put three eggs in each bowl. How many eggs are in the two bowls altogether?" },
      { prompt: "When we add a number to itself, we call it a double. What is 4 and 4?",
        say: "When we add a number to itself, we call it a double. What is four and four?" },
      { prompt: "Match each double with its answer",
        pairs: [[{ say: "two plus two" }], [{ say: "three plus three" }], [{ say: "five plus five" }], [{ say: "six plus six" }]] },
      { prompt: "6 and 6 make 12. 7 is one more than 6. So what is 6 and 7?",
        say: "Six and six make twelve. Seven is one more than six. So what is six and seven?" },
      { prompt: "First work out 8 and 8, then add one. What is the answer?",
        say: "First work out eight and eight, then add one. What is the answer?" },
      { prompt: "Put the doubles in one basket and the near doubles in the other.",
        baskets: [{ label: "double" }, { label: "near double" }],
        items: [{ say: "five plus five" }, { say: "five plus six" }, { say: "seven plus seven" }, { say: "seven plus eight" },
          { say: "nine plus nine" }, { say: "three plus four" }] },
      { prompt: "3, 4 and 7 are a family: 3 and 4 make 7. So what is 7 take away 4?",
        say: "Three, four and seven are a family: three and four make seven. So what is seven take away four?" },
      { prompt: "We know that 4 and 5 make 9. So what is 9 take away 5?",
        say: "We know that four and five make nine. So what is nine take away five?" },
      { prompt: "Put each sum in the basket of its family.",
        baskets: [{ label: "family 3, 5, 8" }, { label: "family 2, 7, 9" }],
        items: [{ say: "three plus five" }, { say: "eight take away five" }, { say: "two plus seven" }, { say: "eight take away three" },
          { say: "nine take away seven" }, { say: "nine take away two" }] }
    ] },
    "math-sapling-14": { title: "Story problems", steps: [
      { prompt: "Listen to the story",
        scenes: [{ caption: "Mina had 24 cards." }, { caption: "Grandma brought 13 cards." },
          { caption: "Grandma gave the cards to Mina." }],
        question: "To find all the cards, do we add or take away?", options: ["add", "take away"], answer: "add" },
      { prompt: "How many cards does Mina have altogether?", say: "How many cards does Mina have altogether?" },
      { prompt: "Listen to the story",
        scenes: [{ caption: "The neighbourhood baker has 45 sangak breads." },
          { caption: "Two customers came." }, { caption: "The baker gave the customers 20 breads." },
          { caption: "The customers took the breads away. The rest of the bread stayed with the baker." }],
        question: "How many breads does the baker have left?" },
      { prompt: "There are 18 girls and 15 boys in the class. To find all the children in the class, do we add or take away?",
        say: "There are eighteen girls and fifteen boys in the class. To find all the children in the class, do we add or take away?",
        options: ["add", "take away"], answer: "add" },
      { prompt: "How many children are in the class altogether?", say: "How many children are in the class altogether?" },
      { prompt: "Arman had 50 thousand toman and bought a storybook for 35 thousand toman. To find the money he has left, do we add or take away?",
        say: "Arman had fifty thousand toman and bought a storybook for thirty-five thousand toman. To find the money he has left, do we add or take away?",
        options: ["add", "take away"], answer: "take away" },
      { prompt: "How many thousand toman does Arman have left?", say: "How many thousand toman does Arman have left?" },
      { prompt: "In Gelareh's grandfather's orchard there are 32 apple trees and 26 pear trees. How many more apple trees are there than pear trees?",
        say: "In Gelareh's grandfather's orchard there are thirty-two apple trees and twenty-six pear trees. How many more apple trees are there than pear trees?" }
    ] },
    "math-sapling-15": { title: "The clock", steps: [
      { prompt: "A clock has two hands. The short hand shows the hour and the long hand shows the minutes. The long hand is on 12 and the short hand is on 3. So it is 3 o'clock.",
        say: "A clock has two hands. The short hand shows the hour and the long hand shows the minutes. The long hand is on twelve and the short hand is on three. So it is three o'clock." },
      { prompt: "Watch: the long hand goes half way round, to 6. The short hand moves on a little too and stops between 3 and 4. Now it is half past 3.",
        say: "Watch: the long hand goes half way round, to six. The short hand moves on a little too and stops between three and four. Now it is half past three." },
      { prompt: "Now turn the hands yourself and see what time it is.", say: "Now turn the hands yourself and see what time it is." },
      { prompt: "Arash gets up at this time every morning. What time is it?" },
      {},
      { prompt: "Zahra goes to her painting class at 4 o'clock. Put the hands on 4 o'clock." },
      { prompt: "Lunch is ready. What time is it?" },
      { prompt: "Kaveh goes to school at half past 7. Put the hands on half past 7." },
      { prompt: "Niloufar goes to bed at 9 o'clock. Put the hands on 9 o'clock." }
    ] },
    "math-sapling-16": { title: "Heavy and light", steps: [
      { prompt: "At the fruit shop, we put a watermelon and an apple on the balance. Which side is heavier? Tap that pan.",
        left: [{ say: "watermelon" }], right: [{ say: "apple" }] },
      { prompt: "The balloon is bigger than the key. But which one is lighter? Tap that pan.",
        left: [{ say: "balloon" }], right: [{ say: "key" }] },
      { prompt: "Put things on the two pans of the balance. Which one is the heaviest?",
        tray: [{ say: "watermelon" }, { say: "apple" }, { say: "melon" }, { say: "carrot" }, { say: "books" }] },
      { prompt: "Raha and her mother bought a melon. Put the one-kilogram weights on the right pan until the balance is level.",
        left: [{ say: "melon" }], question: "How many kilograms is the melon?" },
      { prompt: "Omid wants to weigh the watermelon. Put weights on until the balance is level.",
        left: [{ say: "watermelon" }], question: "How many kilograms is the watermelon?" },
      { prompt: "The shopkeeper's hand is holding the balance still. Add up the weights on each side. Which side is heavier?" },
      { prompt: "How much is the right pan missing? Put weights on until the balance is level." }
    ] },
    "math-sapling-17": { title: "Three-digit numbers", steps: [
      { prompt: "Ten bundles of ten. How many sticks altogether?" },
      { prompt: "Put ten bundles of ten and see what happens." },
      {}, {}, {},
      { prompt: "How many packs of a hundred are in this number?" },
      {}, {},
      { prompt: "Which number comes after 999?" }
    ] },
    "math-sapling-18": { title: "Equal groups", steps: [
      { prompt: "Listen to the story and count",
        scenes: [{ caption: "Mum has three plates and six biscuits." }, { caption: "She put two biscuits on each plate." },
          { caption: "We have three groups of two: two, and two, and two." }],
        question: "How many biscuits are there altogether?" },
      { prompt: "The squirrel wants two groups of three acorns. Give them to it." },
      { prompt: "The rabbit wants two groups of five carrots. Give them to it." },
      { prompt: "We have four plates. There are three dates on each plate. How many dates are there altogether?",
        say: "We have four plates. There are three dates on each plate. How many dates are there altogether?" },
      { prompt: "Which one is three groups of five?" },
      { prompt: "How many are three groups of five altogether?" },
      { prompt: "Grandma gave four walnuts to each of her three grandchildren. How many walnuts did she give altogether?",
        say: "Grandma gave four walnuts to each of her three grandchildren. How many walnuts did she give altogether?" },
      { prompt: "Yasaman and Kaveh have seven marbles each. How many marbles do they have altogether?",
        say: "Yasaman and Kaveh have seven marbles each. How many marbles do they have altogether?" }
    ] },
    "math-sapling-19": { title: "Halves and quarters", steps: [
      { prompt: "See what a half and a quarter are",
        parts: { t1: { art: "tag:half" }, t2: { art: "tag:half" }, t3: { art: "tag:a quarter" } },
        scenes: [{ caption: "Mum has eight biscuits. Sara and Reza both want some." },
          { caption: "Mum shared the biscuits between Sara and Reza." },
          { caption: "They both have the same amount. We call each share half of the biscuits." },
          { caption: "Dad and Grandma came too. We put the biscuits back in the middle." },
          { caption: "Mum shared the biscuits equally between four people. Each person got two." },
          { caption: "We call each share a quarter of the biscuits." }],
        question: "We shared eight biscuits equally between four people. What do we call each share?",
        options: ["a half", "a quarter", "all the biscuits"], answer: "a quarter" },
      { prompt: "Which bread is cut exactly in half?" },
      { prompt: "Cut the sangak bread into two equal parts. Tap the dotted lines." },
      { prompt: "The cake is cut into four equal parts. Colour a quarter of it." },
      { prompt: "How much of the cake is coloured?", options: ["a half", "a quarter", "all the cake"], answer: "a half" },
      { prompt: "Cut this cake into four equal parts. Tap the dotted lines." },
      { prompt: "Share the eight sweets equally between Arash and Nazanin.", result: "Half of 8 is 4." },
      { prompt: "Share the eight biscuits equally between four friends.", result: "A quarter of 8 is 2." }
    ] },
    "math-sapling-20": { title: "Picture graphs", steps: [
      { title: "The fruit the children in the class like", rows: FRUIT_ROWS, question: "How many children like grapes?" },
      { title: "The fruit the children in the class like", rows: FRUIT_ROWS, question: "Which fruit do the fewest children like?",
        options: FRUIT_ROWS },
      { title: "The fruit the children in the class like", rows: FRUIT_ROWS, question: "How many more children like grapes than oranges?" },
      { title: "The animals on Grandpa's farm", prompt: "Count the animals on the farm: put each one in its own column.",
        rows: FARM_ROWS, question: "Which animal is there most of?", options: FARM_ROWS },
      { title: "This week's weather", prompt: "Two more days were sunny and one more day was cloudy. Add them to the graph.",
        rows: [{ label: "sunny" }, { label: "cloudy" }, { label: "rainy" }], question: "How many days were sunny this week?" },
      { title: "How do the children come to school?", rows: [{ label: "walk" }, { label: "school bus" }, { label: "car" }, { label: "bike" }],
        question: "How many children walk or come by bike altogether?" }
    ] },
    "math-sapling-21": { title: "The market game", steps: [
      { prompt: "Match each price with the money that makes it." },
      { prompt: "Yasaman bought pistachios and honey. How much was it altogether?", items: [{ name: "pistachios" }, { name: "honey" }] },
      { prompt: "Araz has 30 thousand toman. What can he buy?", baskets: [{ label: "He can buy it" }, { label: "Not enough money" }] },
      { prompt: "Pay for the pears.", items: [{ name: "pears" }] },
      { prompt: "You gave 50 thousand toman. How much change do you get?", items: [{ name: "watermelon" }] },
      { prompt: "Match each take-away with its answer." },
      { prompt: "Mahsa bought tomatoes, cucumbers and onions. How much was it altogether?",
        items: [{ name: "tomatoes" }, { name: "cucumbers" }, { name: "onions" }] }
    ] }
  });

  // ---------------- Seed, math-seed-11 to math-seed-50 ----------------
  var FLASH = { prompt: "Look carefully! It only shows for a moment. Don't count, just look." };
  var NUMS = function (list) { return list.map(function (w) { return { say: w }; }); };
  Object.assign(B.EN, {
    "math-seed-11": { title: "How many at a glance?", steps: [
      FLASH, FLASH,
      { prompt: "Look quickly! Which group has three?", say: "Look quickly! Which group has three?" },
      { prompt: "This is a die. Look carefully! It only shows for a moment." },
      { prompt: "How many fingers is this hand holding up? Look carefully!", ask: "How many fingers did you see?" },
      FLASH,
      { prompt: "Match each group of dots with a hand that has the same number of fingers", say: "Match each group of dots with a hand that has the same number of fingers." },
      { prompt: "The chicks only show for a moment. Don't count, just look!", ask: "How many chicks did you see?" }
    ] },
    "math-seed-12": { title: "The last number tells how many", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Let's count the apples: one, two, three, four, five." }, { caption: "The last number was five. So we have five apples." },
          { caption: "Now we have put the apples in a circle." }, { caption: "Let's count again: one, two, three, four, five. Five again!" },
          { caption: "This time we put the apples here and there." }, { caption: "Let's count: one, two, three, four, five. They moved, but there are still five apples." }],
        question: "How many apples are on the cloth?" },
      { ask: "So how many oranges are there?" },
      { prompt: "The flowers are in a circle. Tap each one and count.", ask: "So how many flowers are there?" },
      { prompt: "Mina counted the flowers: one, two, three, four, five, six. How many flowers does she have?", say: "Mina counted the flowers: one, two, three, four, five, six. How many flowers does she have?" },
      { prompt: "The ladybirds are all over the place. Tap each one and count.", ask: "So how many ladybirds are there?" },
      { prompt: "We counted these stars: there were five. If we count again, how many will there be?", say: "We counted these stars: there were five. If we count again, how many will there be?" },
      { prompt: "Count the fish.", ask: "So how many fish are there?" }
    ] },
    "math-seed-13": { title: "My fingers", steps: [
      { prompt: "How many fingers is this hand holding up? Look quickly!", ask: "How many fingers did you see?" },
      { prompt: "Now look at this hand!", ask: "How many fingers did you see?" },
      { prompt: "How many fingers are on one hand?", say: "Count your fingers. How many fingers are on one hand?" },
      { prompt: "One hand has five fingers. If three fingers are up, how many are down?", say: "One hand has five fingers. If three fingers are up, how many are down? Try it with your own hand." },
      { prompt: "A whole hand and some more fingers. Look carefully!", ask: "How many fingers altogether?" },
      { prompt: "A whole hand and some more fingers. Look carefully!", ask: "How many fingers altogether?" },
      { prompt: "This time look at two hands!", ask: "How many fingers altogether?" },
      { text: "Show numbers with your fingers:", list: ["Hold up three fingers.", "Show a whole hand: five.", "A whole hand and two more fingers: seven.",
        "Ask your mother or father to say a number, and you show it with your fingers."] }
    ] },
    "math-seed-14": { title: "Counting things that are scattered", steps: [
      { prompt: "The hazelnuts are scattered. Tap each one so it moves aside. That way you never count one twice.", ask: "How many hazelnuts were there?" },
      { prompt: "Count the ladybirds. Move each one aside when you count it.", ask: "How many ladybirds were there?" },
      { prompt: "How many times does the drum beat? Listen and count.", ask: "How many times did the drum beat?" },
      { prompt: "How many times does the frog jump? Watch and count.", ask: "How many times did the frog jump?" },
      { prompt: "The sheep wants six bunches of grass. Give it six." },
      { prompt: "Count the stars. Move each one aside when you count it.", ask: "How many stars were there?" },
      { prompt: "The hen wants eight ears of corn. Give it eight." },
      { text: "Count together:", list: ["Clap a few times. Your mother or father counts. Then swap.", "Jump five times and count out loud.",
        "Take seven chickpeas from a bowl. Count each one as you take it."] }
    ] },
    "math-seed-15": { title: "More, fewer, the same", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "On the table there are four glasses of tea, and three saucers." }, { caption: "We put a saucer under each glass." },
          { caption: "This glass has no saucer!" }, { caption: "So there are more glasses. There are fewer saucers." }],
        question: "Which are there more of?", options: [{ label: "glasses" }, { label: "saucers" }] },
      { prompt: "Put a chair for each child: tap the chairs.", say: "Put a chair for each child. Tap the chairs.", names: ["the children", "the chairs"] },
      { prompt: "Put a spoon by each plate: tap the spoons.", say: "Put a spoon by each plate. Tap the spoons.", names: ["the plates", "the spoons"] },
      { prompt: "Put a cherry under each watermelon: tap the cherries.", say: "Put a cherry under each watermelon. Tap the cherries.", names: ["the watermelons", "the cherries"] },
      { prompt: "The elephants are big and the mice are small. But which are there more of?", say: "The elephants are big and the mice are small. But which are there more of?" },
      { prompt: "Give each rabbit a carrot: tap the carrots.", say: "Give each rabbit a carrot. Tap the carrots.", names: ["the rabbits", "the carrots"] },
      { prompt: "Four children and four balloons. Each child got a balloon and no balloons were left. Which are there more of?",
        say: "Four children and four balloons. Each child got a balloon and no balloons were left. Which are there more of?",
        options: [{ label: "the children" }, { label: "the balloons" }, { label: "the same" }] }
    ] },
    "math-seed-16": { title: "Long and short", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "There are two pencils on the table." }, { caption: "The yellow pencil looks longer. But the ends of the pencils are not side by side." },
          { caption: "We put the end of each pencil against this line." }, { caption: "Now we can see it: the blue pencil is longer. The yellow pencil is shorter." }] },
      { prompt: "Watch and answer",
        scenes: [{ caption: "This is a rope, and this is a stick." }, { caption: "The rope is wavy. It looks shorter than the stick." },
          { caption: "We pull the rope straight." }, { caption: "The straight rope is longer than the stick!" }],
        question: "Which one is longer?" },
      {}, {},
      { prompt: "Which one is longer?", say: "Which one is longer? The train or the bicycle?" },
      {},
      { prompt: "Which one is shorter?", say: "Which one is shorter? The pencil or the ruler?" }
    ] },
    "math-seed-17": { title: "Heavy and light", steps: [
      { prompt: "If you hold these two in your hands, which one is heavier?", say: "If you hold a watermelon and a strawberry in your hands, which one is heavier?" },
      { prompt: "Which one is lighter?", say: "A feather and a book. Which one is lighter?" },
      { prompt: "This is a balance. The heavier thing goes down. Which side is heavier? Tap that pan.", left: [{ say: "watermelon" }], right: [{ say: "cherries" }] },
      { prompt: "On a balance, is the pan that went down heavier or lighter?", say: "On a balance, is the pan that went down heavier or lighter?" },
      { prompt: "The balloon is big and the stone is small. But which one is heavier? Tap that pan.", left: [{ say: "big balloon" }], right: [{ say: "small stone" }] },
      { prompt: "Which side is lighter? Tap that pan.", left: [{ say: "apple" }], right: [{ say: "feather" }] },
      { prompt: "Put things on the balance and see which side goes down.",
        tray: [{ say: "watermelon" }, { say: "balloon" }, { say: "stone" }, { say: "feather" }, { say: "apple" }] },
      { text: "Pick up two things at home, one in each hand:", list: ["A pillow and a glass of water. Which one is heavier?", "A book and a spoon. Which one is lighter?", "Find something big that is light."] }
    ] },
    "math-seed-18": { title: "Full and empty", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "There are three glasses on the table. All three are empty." }, { caption: "We poured water into the first glass, right to the top. The glass is full." },
          { caption: "We poured water into the third glass, up to the middle. It is half full." },
          { caption: "The middle glass stayed empty. It has no water.", wait: { hint: "Tap the empty glass." } }] },
      { prompt: "Watch and answer",
        scenes: [{ caption: "This thin glass is full of water. This bowl is empty." }, { caption: "We pour the water from the glass into the bowl." },
          { caption: "All the water from the glass went into the bowl, but the bowl is not full!" }, { caption: "So the bowl holds more than the glass." }],
        question: "Which one holds more?" },
      { prompt: "Which one holds more water?", say: "Which one holds more water? A spoon or a bucket?" },
      { prompt: "Which one holds less water?", say: "Which one holds less water? A bathtub, a tea glass or a kettle?" },
      { text: "Play with water and a few cups (by the sink or in the bathroom):", list: ["Fill one cup, fill one half way, and leave one empty.",
        "Pour a cup of water into a bowl. Is the bowl full?", "Guess which one holds more. Then try it with water."] }
    ] },
    "math-seed-19": { title: "From small to big", steps: [
      { prompt: "Put the bowls in order, from small to big", say: "Put the bowls in order, from small to big.", items: [{ say: "small bowl" }, { say: "middle bowl" }, { say: "big bowl" }] },
      { prompt: "Put the ribbons in order, from short to long", say: "Put the ribbons in order, from short to long.", items: [{ say: "short ribbon" }, { say: "middle ribbon" }, { say: "long ribbon" }] },
      { prompt: "Put the animals in order, from small to big", say: "Put the animals in order, from small to big: ant, mouse, cat, horse, elephant." },
      { prompt: "The children are standing in a line: put them in order, from short to tall", say: "Put the children in order, from short to tall.", items: [{ say: "the shortest" }, {}, {}, {}, { say: "the tallest" }] },
      { prompt: "Put the pencils in order, from short to long", say: "Put the pencils in order, from short to long." },
      { prompt: "Put the fruit in order, from big to small", say: "Put the fruit in order, from big to small: watermelon, melon, apple, cherries." }
    ] },
    "math-seed-20": { title: "Which one doesn't belong?", steps: [
      { prompt: "Which one doesn't belong?", say: "Apple, banana, grapes, car. Which one doesn't belong? Why? Tell your mother or father." },
      { prompt: "Which one doesn't belong?", say: "Dog, cat, tree, cow. Which one doesn't belong? Why?" },
      { prompt: "Which one doesn't belong?", say: "Look at the colours. Which one doesn't belong?" },
      { prompt: "Which one doesn't belong?", say: "Look at the shapes, not their size. Which one doesn't belong?" },
      { prompt: "First sort them by colour", say: "Put the red things in one basket and the yellow things in the other.",
        baskets: [{ label: "red" }, { label: "yellow" }], items: [{ say: "apple" }, { say: "fire engine" }, { say: "strawberry" }, { say: "banana" }, { say: "taxi" }, { say: "chick" }] },
      { prompt: "Now sort the same things another way: things we eat and things we don't", say: "Now sort the same things another way: things we eat, and things we don't eat.",
        baskets: [{ label: "we eat it" }, { label: "we don't eat it" }], items: [{ say: "apple" }, { say: "fire engine" }, { say: "strawberry" }, { say: "banana" }, { say: "taxi" }, { say: "chick" }] },
      { prompt: "How were these sorted?", say: "These animals were sorted into two groups. How? By colour? By size? Or by where they live: in the water or in the air?" }
    ] },
    "math-seed-21": { title: "Between, on, under", steps: [
      { prompt: "Look at this room. Tap each thing to hear where it is." },
      { say: "Find it in the room.", tasks: [{ prompt: "What is on the table? Tap it." }, { prompt: "What is under the table? Tap it." }] },
      { say: "Find it in the room.", tasks: [{ prompt: "What is between the two chairs? Tap it." }, { prompt: "What is in the box? Tap it." }, { prompt: "What is outside the box? Tap it." }] },
      { prompt: "In which one is the apple between two bananas?", say: "In which one is the apple between two bananas?" },
      { prompt: "The book was on the table. We put it under the table. Is the book higher now, or lower?", say: "The book was on the table. We put it under the table. Is the book higher now, or lower?" },
      { text: "Hide-and-seek with a toy:", list: ["Your mother or father hide a toy and say where it is: “under the table”, “on the wardrobe”, “between two cushions”.",
        "You find it. Then swap: you hide it and say where it is."] }
    ] },
    "math-seed-22": { title: "Find the way", steps: [
      { prompt: "This is a map of a park, from above. Tap each place to hear its name." },
      { say: "Walk with Sara.", tasks: [{ prompt: "Sara starts at the park gate. Go straight on to the fountain. Then turn and go to the tree. Tap the places in order." }] },
      { say: "Walk with Arman.", tasks: [{ prompt: "Arman is by the tree. Go down to the fountain. Then turn and go straight on to the bench." }] },
      { say: "Walk with Grandma.", tasks: [{ prompt: "Grandma wants to watch you on the slide. Go from the park gate to the fountain, then go to the slide." }] },
      { say: "Walk with Dad.", tasks: [{ prompt: "Dad is on the bench. Go to the fountain. Then turn and go to the tree. From there, go to the flower bed." }] },
      { text: "Tell someone the way:", list: ["Tell your mother or father the way from your room to the kitchen: how many steps forward, where to turn, how far to go.",
        "They walk the way you said. Did they get to the kitchen?", "Now swap."] }
    ] },
    "math-seed-23": { title: "Rectangles, and shapes that are turned", steps: [
      { prompt: "This is a rectangle and this is a square. Both have four sides and four corners. A rectangle is long." },
      { prompt: "Which one is the rectangle?" },
      { prompt: "Which one is the triangle?", say: "Which one is the triangle? The shapes are turned." },
      { prompt: "Which one is the square?", say: "Which one is the square? The shapes are turned." },
      { prompt: "Which one is the triangle?", say: "A triangle has three straight sides, and its sides are joined. Which one is the triangle?" },
      { prompt: "Triangles on one side, other shapes on the other", say: "Put the triangles in one basket and the other shapes in the other. Big or small, turned or not, it doesn't matter.",
        baskets: [{ label: "triangle" }, { label: "not a triangle" }],
        items: [{ say: "small triangle" }, { say: "turned triangle" }, { say: "thin triangle" }, { say: "a shape with a curved side" }, { say: "an open shape" }, { say: "turned square" }] },
      { prompt: "Rectangles on one side, squares on the other", say: "Rectangles are long. All the sides of a square are the same length. Put each one in its basket.",
        baskets: [{ label: "rectangle" }, { label: "square" }],
        items: [{ say: "standing rectangle" }, { say: "thin rectangle" }, { say: "small square" }, { say: "turned square" }, { say: "rectangle" }, { say: "square" }] },
      { prompt: "Which one looks like a rectangle?", say: "Which one looks like a rectangle? A door, a ball or a slice of watermelon?" }
    ] },
    "math-seed-24": { title: "Build with shapes", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "This is a square, and this is a triangle." }, { caption: "We put the square at the bottom, and the triangle on top." },
          { caption: "We added a little door too. We built a house!" }, { caption: "Now a circle and a triangle." },
          { caption: "We put the circle on the upside-down triangle: an ice cream!" }] },
      { prompt: "Build a house: put each shape in its place.", say: "Build a house. Tap a shape, then tap its place.", made: "You built a house!" },
      { prompt: "Build a tree. You need to turn the trunk.", say: "Build a tree. You need to turn the trunk: tap the turn button.", made: "You built a tree!" },
      { prompt: "Build a boat. The bottom of the boat is upside down.", say: "Build a boat. Turn the half circle so it becomes the bottom of the boat.", made: "You built a boat!" },
      { prompt: "Build a fish. Turn the shapes so they fit.", say: "Build a fish. Turn the shapes so they fit.", made: "You built a fish!" },
      { text: "Make a picture with shapes:", list: ["Cut some squares, triangles and circles from coloured paper (or use jar lids and spoons).",
        "Make a house, a person or a flower with them.", "Say how many triangles and circles are in your picture."] }
    ] },
    "math-seed-25": { title: "Ball, box, can", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We put a ball at the top of the board. The ball rolled down." }, { caption: "We put a box there. The box did not roll. It slid down." },
          { caption: "We laid a can on its side. The can rolled too!" }, { caption: "We put two boxes on top of each other. They stand nicely." },
          { caption: "We put a ball on the boxes. The ball rolled and fell off!" }],
        question: "Which one does not roll?" },
      { prompt: "Which ones roll? Which ones don't?", say: "Put the things that roll in one basket and the things that don't roll in the other.",
        baskets: [{ label: "it rolls" }, { label: "it doesn't roll" }], items: [{ say: "orange" }, { say: "present box" }, { say: "ball" }, { say: "books" }, { say: "die" }, { say: "watermelon" }] },
      { prompt: "Like a ball, like a box, or like a can?", say: "What does each thing look like? A ball, a box or a can? Put it in its basket.",
        baskets: [{ label: "ball" }, { label: "box" }, { label: "can" }], items: [{ say: "orange" }, { say: "die" }, { say: "candle" }, { say: "globe" }, { say: "present box" }, { say: "kitchen roll" }] },
      { prompt: "Which ones can you stack up high?", say: "Which ones can you stack up high? Boxes or balls?" },
      { text: "Look around the kitchen (ask your mother or father first):", list: ["Find something like a ball, like an orange.", "Something like a box, like a box of tea.",
        "Something like a can, like a can of tomato paste.", "Try them on the floor: which ones roll? Which ones can you stack?"] }
    ] },
    "math-seed-26": { title: "Patterns with sounds and moves", steps: [
      { prompt: "Clap, stamp, clap, stamp…", say: "Clap, stamp, clap, stamp. Clap and stamp with me. What comes next?" },
      { prompt: "Clap, clap, stamp…", say: "Clap, clap, stamp. Clap, clap, stamp. Do it with me, then fill in the gaps." },
      { prompt: "Drum, bell, bell…", say: "Boom, ding, ding. Boom, ding, ding. What comes next?" },
      { prompt: "The same clap and stamp pattern, this time with colours: red for clap, blue for stamp", say: "Clap, stamp, clap, stamp. Make the same pattern with colours: red for clap, blue for stamp." },
      { prompt: "The same clap, clap, stamp pattern, this time with shapes", say: "Clap, clap, stamp. The same pattern with shapes: triangle, triangle, circle." },
      { prompt: "Hands up, clap, stamp…", say: "Hands up, clap, stamp. Hands up, clap, stamp. Do it with me. What comes next?" },
      { text: "Make a pattern with your body:", list: ["Your mother or father make a pattern, like “clap, clap, stamp”. You carry it on.", "Now you make a pattern and they carry it on.",
        "Lay out the same pattern with spoons and forks on the table."] }
    ] },
    "math-seed-27": { title: "Make your own pattern", steps: [
      { prompt: "Which row has a mistake?", say: "These rows have patterns. But one of them has a mistake. Which one?" },
      { prompt: "This rug was woven wrong in one place. We pulled the thread out. Fill it with the right colour.", say: "This rug was woven wrong in one place. Fill it with the right colour." },
      { prompt: "Which row has a mistake?", say: "One of these rows has a mistake. Which one?" },
      { prompt: "Finish the tiles of the pool", say: "These tiles have a pattern: blue, white, blue, white. You put the rest." },
      { prompt: "Look at the carpet: red, green, yellow… Carry it on", say: "Red, green, yellow. Red, green, yellow. You weave the rest of the carpet." },
      { prompt: "A necklace of beads: yellow, red, red…", say: "Yellow bead, red bead, red bead. Carry it on." },
      { text: "Make your own pattern:", list: ["Lay out a pattern with things at home: spoon, fork, spoon, fork… or coloured buttons, or beans and chickpeas.",
        "Show your pattern to your mother or father. They carry it on.", "Find patterns in the carpets, tiles or curtains at home."] }
    ] },
    "math-seed-28": { title: "The numbers 6 to 10", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We put eggs in the egg tray. Five in the top row, and one below: six. This is the number six." },
          { caption: "One more: seven. Five and two. This is the number seven." }, { caption: "One more: eight. Five and three. This is the number eight." },
          { caption: "One more: nine. Five and four. This is the number nine." }, { caption: "One more: ten. Two rows of five, full! This is the number ten." }] },
      { prompt: "The strawberries are in two rows. Count them.", ask: "How many strawberries are there?" },
      { prompt: "Match each number with its dots", say: "Tap a number to hear its name. Match each number with its dots.", pairs: [[{ say: "six" }, null], [{ say: "eight" }, null], [{ say: "seven" }, null]] },
      { prompt: "A row of five and some more. Look quickly!", ask: "How many altogether?" },
      { prompt: "This is the number nine. Nine is five and how many more?", say: "This is the number nine. Nine is five and how many more?" },
      { prompt: "Match each number with its fingers", say: "Tap a number to hear its name. Match each number with hands that hold up that many fingers.", pairs: [[{ say: "ten" }, null], [{ say: "six" }, null], [{ say: "nine" }, null]] },
      { prompt: "This is the number ten. Which group has ten?", say: "This is the number ten. Which group has ten?" }
    ] },
    "math-seed-29": { title: "Zero means none", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Five sparrows are sitting on the wire." }, { caption: "A sparrow flew away. Four are left." }, { caption: "Another one flew away. Three are left." },
          { caption: "Another one flew away. Two are left." }, { caption: "Another one flew away. One is left." },
          { caption: "The last one flew away too. No sparrows are left: zero sparrows." }, { caption: "This is the number zero. Zero means none." }],
        question: "How many sparrows are on the wire now?" },
      { prompt: "This is the number zero. Which plate has zero apples?", say: "This is the number zero. Which plate has zero apples?" },
      { prompt: "There was one fish in the bowl. It jumped into the pond! How many fish are in the bowl now?", say: "There was one fish in the bowl. It jumped into the pond! How many fish are in the bowl now?" },
      { prompt: "The cat is full. Give it zero fish: don't give it any. Just press the button." },
      { prompt: "The squirrel is hungry. Give it three hazelnuts." },
      { prompt: "Which number means none?", say: "Which number means none?" }
    ] },
    "math-seed-30": { title: "One more, one less", steps: [
      { prompt: "The frog is on 4. It jumps one square forward. Where does it land?", say: "The frog is on four. It jumps one square forward. Press the button and see where it lands." },
      { prompt: "We have three apples. One more comes. How many are there now?", say: "We have three apples. One more comes. How many are there now?" },
      { prompt: "The frog is on 7. It jumps one square back. Where does it land?", say: "The frog is on seven. It jumps one square back. Press the button and see where it lands." },
      { prompt: "Six sparrows were on the wire. One flew away. How many are left?", say: "Six sparrows were on the wire. One flew away. How many are left?" },
      { prompt: "Yesterday the rabbit ate five carrots. Today it wants one more. Give them to it." },
      { prompt: "What is one more than 9? The frog is on 9 and jumps one forward.", say: "What is one more than nine? The frog is on nine and jumps one forward." },
      { prompt: "What is one less than 8?", say: "What is one less than eight?" },
      { prompt: "The hen wanted four ears of corn. Now it wants one less. Give them to it." }
    ] }
  });
  Object.assign(B.EN, {
    "math-seed-31": { title: "The board game", steps: [
      { prompt: "The ladybird wants to reach the flower. Roll the die, then tap the squares one by one and say their numbers out loud.",
        say: "The ladybird wants to reach the flower. Roll the die. Then tap the squares one by one and say their numbers out loud." },
      { prompt: "The ladybird is on 6. The die shows 2. Which square does it reach?", say: "The ladybird is on six. The die shows two. Which square does it reach?" },
      { prompt: "The tortoise is looking for lettuce. Roll the die and move. Say the numbers out loud." },
      { prompt: "The tortoise is on 3. The die shows 3. Which square does it reach?", say: "The tortoise is on three. The die shows three. Which square does it reach?" },
      { prompt: "This time the board goes up to 20. The rabbit starts on 10. Roll the die and move.",
        say: "This time the board goes up to twenty. The rabbit starts on ten. Roll the die and move. Say the numbers out loud." },
      { text: "Make a game board:", list: ["On a long piece of paper, draw 10 squares in a row and write the numbers 1 to 10 in them.",
        "Take turns with a die (or two pieces of paper with 1 and 2 on them).", "Each time your counter moves, say the number of each square out loud."] }
    ] },
    "math-seed-32": { title: "Numbers in order", steps: [
      { prompt: "Put the numbers in order from 1 to 5", say: "Put the numbers in order from one to five.", items: NUMS(["one", "two", "three", "four", "five"]) },
      { prompt: "Put the numbers in order from 6 to 10", say: "Put the numbers in order from six to ten.", items: NUMS(["six", "seven", "eight", "nine", "ten"]) },
      { prompt: "Which number is missing?", say: "Four, what, six. Which number is missing?" },
      { prompt: "Sara's house is number 5. What is the number of the next house?", say: "Sara's house is number five. What is the number of the next house?" },
      { prompt: "Kaveh's house is number 9. What is the number of the house before it?", say: "Kaveh's house is number nine. What is the number of the house before it?" },
      { prompt: "The frog is on 5. It jumps three squares forward. Count: six, seven, … Where does it land?", say: "The frog is on five. It jumps three squares forward. Count with me. Where does it land?" },
      { prompt: "Which number is missing?", say: "Seven, eight, what, ten. Which number is missing?" },
      { prompt: "Count back from 10 and put them in order", say: "Count back from ten: ten, nine, eight, seven, six.", items: NUMS(["ten", "nine", "eight", "seven", "six"]) }
    ] },
    "math-seed-33": { title: "Five in two hands", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "There are five counters in this cup. Each counter is red on one side and yellow on the other." },
          { caption: "We shook the cup and tipped the counters out: three red and two yellow. Three and two make five." },
          { caption: "We threw the counters up: four red and one yellow. Four and one, five again." },
          { caption: "Once more: one red and four yellow. One and four, five again!" }],
        question: "Three red counters and two yellow counters. How many altogether?" },
      {},
      { prompt: "We have five counters. Three are red. The rest are yellow. How many are yellow?", say: "We have five counters. Three are red. The rest are yellow. How many are yellow?" },
      { prompt: "I put four beans in my two hands. One hand has one. How many are in the other hand?", say: "I put four beans in my two hands. One hand has one. How many are in the other hand?" },
      { prompt: "Three apples are on two plates. One plate has two apples. How many are on the other plate?", say: "Three apples are on two plates. One plate has two apples. How many are on the other plate?" },
      { prompt: "Which two groups make five together?", say: "Which two groups make five together?",
        options: [{ label: "🔴🔴 and 🟡🟡" }, { label: "🔴🔴🔴🔴 and 🟡" }, { label: "🔴🔴🔴🔴 and 🟡🟡" }] },
      { text: "The “which hand?” game:", list: ["Your mother or father split five beans between their two hands and open one hand.",
        "You say how many beans are in the closed hand. Then open it and see.", "Try all the ways: five and zero, four and one, three and two…"] }
    ] },
    "math-seed-34": { title: "How many are hiding?", steps: [
      { prompt: "Watch and answer",
        scenes: [{ caption: "There are five apples on the table. Let's count: one, two, three, four, five." }, { caption: "A bowl came down and covered some of the apples." },
          { caption: "Now three apples show: one, two, three. The rest are hiding under the bowl." }],
        question: "How many apples are hiding under the bowl?" },
      { prompt: "We had six apples. Four show. How many are under the bowl?", say: "We had six apples. Four show. How many are under the bowl?" },
      { prompt: "We had five apples. Only one shows. How many are under the bowl?", say: "We had five apples. Only one shows. How many are under the bowl?" },
      { prompt: "We had seven hazelnuts. Five show. How many are under the bowl?", say: "We had seven hazelnuts. Five show. How many are under the bowl?" },
      { prompt: "We had four strawberries. None of them show! How many are under the bowl?", say: "We had four strawberries. None of them show! How many are under the bowl?" },
      { text: "The “how many are hiding?” game:", list: ["Count five chickpeas or buttons.", "Close your eyes. Your mother or father hide some under a bowl.",
        "Open your eyes and count the ones you can see. How many are under the bowl? Lift the bowl and see.", "Then play with six and seven."] }
    ] },
    "math-seed-35": { title: "Stories where more come", steps: [
      { prompt: "Listen to the story", scenes: [{ caption: "Two sparrows were sitting in the tree." }, { caption: "Another sparrow flew over to them." }],
        question: "How many sparrows are in the tree now?" },
      { prompt: "Listen to the story", scenes: [{ caption: "Three guests were in the house." }, { caption: "Two more guests came." }],
        question: "How many guests are in the house now?" },
      { prompt: "Listen to the story", scenes: [{ caption: "There were two eggs in the hen's nest." }, { caption: "The next day, the hen laid another egg." }],
        question: "How many eggs are in the nest now?" },
      { prompt: "Hold up two fingers. Now hold up two more. How many fingers are up?", say: "Hold up two fingers. Now hold up two more. How many fingers are up?" },
      { prompt: "Two children came, then three more children came. Put a biscuit for each child." },
      { prompt: "Arman had one ball. Dad bought him another one. How many balls does he have now?", say: "Arman had one ball. Dad bought him another one. How many balls does he have now?" }
    ] },
    "math-seed-36": { title: "Stories where some go", steps: [
      { prompt: "Listen to the story", scenes: [{ caption: "Four chicks were by the hen." }, { caption: "A butterfly came. One chick ran after it." }],
        question: "How many chicks are by the hen now?" },
      { prompt: "Listen to the story", scenes: [{ caption: "Three cars were standing in the street." }, { caption: "Two cars drove away." }],
        question: "How many cars are left?" },
      { prompt: "Listen to the story", scenes: [{ caption: "There were five apples on the table." }, { caption: "Narges took two apples and ate them." }],
        question: "How many apples are left on the table?" },
      { prompt: "Hold up five fingers. Now put two down. How many fingers are still up?", say: "Hold up five fingers. Now put two down. How many fingers are still up?" },
      { prompt: "We had four balloons. One popped. How many are left?", say: "We had four balloons. One popped. How many are left?" }
    ] },
    "math-seed-37": { title: "Stories to ten", steps: [
      { prompt: "Listen to the story", scenes: [{ caption: "Seven sparrows were sitting on the wire." }, { caption: "Two more sparrows came." }],
        question: "How many sparrows are on the wire now?" },
      { prompt: "Listen to the story", scenes: [{ caption: "Mahtab had ten balloons." }, { caption: "The wind came and took three balloons away." }],
        question: "How many balloons does Mahtab have left?" },
      { prompt: "Hold up six fingers. Now hold up two more. How many fingers are up?", say: "Hold up six fingers: a whole hand and one more. Now hold up two more. How many fingers are up?" },
      { prompt: "There were ten biscuits on the plate. The children ate four. How many are left?", say: "There were ten biscuits on the plate. The children ate four. How many are left?" },
      { prompt: "There were five fish in the pond. Three baby fish were born. How many fish are in the pond now?", say: "There were five fish in the pond. Three baby fish were born. How many fish are in the pond now?" },
      { caption: "Tell a number story: how many chicks were there? How many came or went?",
        tips: ["Count the chicks together.", "Ask your child to tell a story: “… chicks were with the hen, … went off to find seeds.”",
          "Ask: “How many are left now?” and show it with fingers or chickpeas.", "You tell a story too, and your child finds the answer."] }
    ] },
    "math-seed-38": { title: "The number story game", steps: [
      { prompt: "The rabbit wanted five carrots. It has eaten two. Give it the rest." },
      { prompt: "Match each group with the group that has one more", say: "Match each group with the group that has one more." },
      { prompt: "Put them in order, from fewest to most", say: "Put them in order, from fewest to most." },
      { prompt: "The hen ate three ears of corn. It wants one more. Put all the corn it eats on the plate." },
      { prompt: "Match each number with the group that has one less", say: "Turn the cards over two at a time. Match each number with the group that has one less.",
        pairs: [[{ say: "four" }, null], [{ say: "six" }, null], [{ say: "two" }, null]] },
      { prompt: "The squirrel had five hazelnuts. It hid three under the ground. Give it the rest." },
      { prompt: "Count back from 5 and put them in order", say: "Count back from five: five, four, three, two, one, zero.", items: NUMS(["five", "four", "three", "two", "one", "zero"]) }
    ] },
    "math-seed-39": { title: "First, second, third", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "It is early morning. The bakery is open." }, { caption: "Grandma came first of all. She is first in the queue." },
          { caption: "Then Arash came. He is second." }, { caption: "Then Ms Rezaei came. She is third." }, { caption: "Then Mr Karimi came. He is fourth." },
          { caption: "Last of all Sara came. She is fifth, at the end of the queue." }],
        question: "Who is third?" },
      { prompt: "A race! Put them in the order they finished: first, second, third", say: "The animals had a race. The rabbit came first, the dog second, the tortoise third. Put them in that order.",
        items: [{ say: "rabbit" }, { say: "dog" }, { say: "tortoise" }] },
      { prompt: "In the bakery queue, you are fourth. How many people are in front of you?", say: "In the bakery queue, you are fourth. How many people are in front of you?" },
      { prompt: "The insects came out of their nest. Put them in order", say: "First the ant came out, second the ladybird, third the bee, fourth the butterfly, and fifth the worm. Put them in that order.",
        items: [{ say: "ant" }, { say: "ladybird" }, { say: "bee" }, { say: "butterfly" }, { say: "worm" }] },
      { prompt: "Count from the left. Which one is third?", say: "Count from the left: first, second, third. Which one is third?" }
    ] },
    "math-seed-40": { title: "First, next, last", steps: [
      { prompt: "What happened first? What happened next? What happened last? Put them in order", say: "We planted a seed. Put it in order: what happened first, next, and last?",
        items: [{ say: "we planted the seed in the soil" }, { say: "we watered it" }, { say: "it sprouted" }, { say: "it flowered" }] },
      { prompt: "Making tea: put it in order", say: "Grandma made tea. Put it in order.",
        items: [{ say: "she filled the kettle" }, { say: "the water boiled" }, { say: "she brewed the tea" }, { say: "she poured the tea into a glass" }] },
      { prompt: "Getting dressed: what comes first? What comes last?", say: "You want to go out. What do you do first? Next? Last?",
        items: [{ say: "I put on my socks" }, { say: "I put on my shoes" }, { say: "I go out of the door" }] },
      { prompt: "From egg to hen: put it in order", say: "From an egg to a hen. Put it in order.",
        items: [{ say: "an egg" }, { say: "the chick came out of the egg" }, { say: "a chick" }, { say: "a hen" }] },
      { caption: "What did you do this morning? First…, next…, last…",
        tips: ["Ask your child what they did first this morning, what next, and what last.", "Use the words “first”, “next” and “last” yourself too.",
          "Ask: “What happens if you put your shoes on first and then your socks?” and laugh together."] },
      { prompt: "Drawing a picture: put it in order", say: "Delaram drew a picture. Put it in order.",
        items: [{ say: "she took some paper" }, { say: "she drew with a pencil" }, { say: "she coloured it" }, { say: "she put it on the wall" }] }
    ] },
    "math-seed-41": { title: "Morning to night", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "It is morning. The sun is coming up." }, { caption: "It is noon. The sun is high in the sky." },
          { caption: "It is evening. The sun is going down." }, { caption: "It is night. The sun has gone. The moon and the stars have come out." }] },
      { prompt: "When do we eat breakfast?", say: "When do we eat breakfast? In the morning, at noon or at night?" },
      { prompt: "When do we sleep?", say: "When do we sleep? In the morning, at noon or at night?" },
      { prompt: "When do we eat lunch?", say: "When do we eat lunch? In the morning, at noon or at night?" },
      { prompt: "Morning, noon, evening, night: put them in order", say: "One day, from morning to night. Put them in order: morning, noon, evening, night.",
        items: [{ say: "morning" }, { say: "noon" }, { say: "evening" }, { say: "night" }] }
    ] },
    "math-seed-42": { title: "Which is more?", steps: [
      { title: "Fruit in the basket", prompt: "Take the fruit from the basket and put each one in its column.", rows: [{ label: "apples" }, { label: "bananas" }, { label: "oranges" }],
        question: "Which fruit is there most of?", options: [{ label: "apples" }, { label: "bananas" }, { label: "oranges" }] },
      { title: "Fruit in the basket", rows: [{ label: "apples" }, { label: "bananas" }, { label: "oranges" }], question: "How many bananas are there?" },
      { title: "Animals in the yard", prompt: "Count the animals in the yard: put each one in its column.", rows: [{ label: "hens" }, { label: "cats" }, { label: "chicks" }],
        question: "Which animal is there fewest of?", options: [{ label: "hens" }, { label: "cats" }, { label: "chicks" }] },
      { title: "Animals in the yard", rows: [{ label: "hens" }, { label: "cats" }, { label: "chicks" }], question: "How many chicks are there?" },
      { title: "Flowers in the garden", prompt: "Sort the flowers: each colour in its own column.", rows: [{ label: "red" }, { label: "yellow" }, { label: "purple" }],
        question: "Which two flowers are there the same number of?", options: [{ label: "red and yellow" }, { label: "yellow and purple" }, { label: "red and purple" }] }
    ] },
    "math-seed-43": { title: "Guess how many", steps: [
      { prompt: "Which jar has lots of beads?", say: "Which jar has lots of beads? Don't count, just look." },
      { prompt: "How many sparrows are on the wire? Don't count, guess: about three or about ten?", say: "How many sparrows are on the wire? Don't count, guess: about three, or about ten?" },
      { prompt: "Now count and see if your guess was close.", ask: "How many sparrows were there?" },
      { prompt: "How many strawberries are in the bowl? Guess: about two or about ten?", say: "How many strawberries are in the bowl? Guess: about two, or about ten?" },
      { prompt: "Guess: are there a few hazelnuts or lots? About three, six or ten?", say: "Guess, don't count: about three, six or ten?" },
      { prompt: "Now count. Was your guess right?", ask: "How many hazelnuts were there?" },
      { text: "A guessing game:", list: ["Put a handful of chickpeas or pasta in a bowl.", "Each of you guesses how many there are.", "Count them together. Whose guess was closest?"] }
    ] },
    "math-seed-44": { title: "Measure with your hand", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "How long is this bench? We measure it with hand spans." },
          { caption: "One span, two, three, four, five. Each span starts exactly where the last one ended." },
          { caption: "The bench is five spans long." }, { caption: "If we leave gaps between the spans, we only get three. That is not right!" }],
        question: "How many spans long is the bench really?" },
      { prompt: "Measure the bed with hand spans. Tap each span and count." },
      { prompt: "How many steps long is this rug? Tap each step and count." },
      { prompt: "How many spoons long is this bread? Tap each spoon and count." },
      { prompt: "Dad and Narges measured the room in steps. Who counted more steps?", say: "Dad and Narges measured the same room in steps. Dad's steps are big and Narges's steps are small. Who counted more steps?" },
      { text: "Measure at home:", list: ["Measure the table with hand spans. Put each span right after the last one.", "Measure your room in steps: put your heel in front of your toes.",
        "Your mother or father measure the same things. Why are their numbers different?"] }
    ] },
    "math-seed-45": { title: "The measuring game", steps: [
      { prompt: "Heavy things on one side, light things on the other", say: "Put the heavy things in one basket and the light things in the other.",
        baskets: [{ label: "heavy" }, { label: "light" }], items: [{ say: "watermelon" }, { say: "balloon" }, { say: "brick" }, { say: "leaf" }, { say: "books" }, { say: "tissues" }] },
      { prompt: "Put the bowls in order, from small to big", say: "Put the bowls in order, from small to big." },
      { prompt: "Match each thing with something just as long", say: "Match each thing with something just as long." },
      { prompt: "Which ones hold a lot? Which ones hold a little?", say: "Containers that hold a lot of water in one basket, and the ones that hold a little in the other.",
        baskets: [{ label: "holds a lot" }, { label: "holds a little" }], items: [{ say: "bathtub" }, { say: "tea glass" }, { say: "kettle" }, { say: "eggshell" }, { say: "bucket" }, { say: "spoon" }] },
      { prompt: "Put them in order, from long to short", say: "Put the ribbons in order, from long to short." },
      { prompt: "Put them in order, from short to tall", say: "Put them in order, from short to tall." }
    ] },
    "math-seed-46": { title: "The shapes game", steps: [
      { say: "Turn the cards over two at a time. Match each shape with something that looks like it." },
      { prompt: "Match each shape with the same shape, turned or small", say: "Match each shape with the same shape, even if it is turned or small." },
      { prompt: "Put each shape in its basket", say: "Circles, triangles and squares. Put each shape in its basket.",
        baskets: [{ label: "circle" }, { label: "triangle" }, { label: "square" }],
        items: [{ say: "thin triangle" }, { say: "turned square" }, { say: "circle" }, { say: "small triangle" }, { say: "small square" }, { say: "round biscuit" }] },
      { prompt: "Like a ball, like a box, or like a can?", say: "What does each thing look like? A ball, a box or a can?",
        baskets: [{ label: "ball" }, { label: "box" }, { label: "can" }], items: [{ say: "orange" }, { say: "ice cube" }, { say: "can of tomato paste" }, { say: "basketball" }, { say: "die" }, { say: "candle" }] },
      { prompt: "Triangles on one side, other shapes on the other", say: "Put the triangles in one basket and the other shapes in the other.",
        baskets: [{ label: "triangle" }, { label: "not a triangle" }],
        items: [{ say: "turned triangle" }, { say: "an open shape" }, { say: "upside-down triangle" }, { say: "a shape with a curved side" }, { say: "rectangle" }] }
    ] },
    "math-seed-47": { title: "Counting to twenty", steps: [
      { prompt: "Watch and count together",
        scenes: [{ caption: "The rocket is ready. Let's count back from ten together." }, { caption: "Ten, nine, eight, seven, six, five, four, three, two, one, zero!" },
          { caption: "The rocket went up into the sky!" }] },
      { prompt: "Count the stars. After ten: eleven, twelve…", ask: "How many stars are there?" },
      { prompt: "The frog is on 10. It jumps four squares forward. Count together: eleven, twelve, … Where does it land?", say: "The frog is on ten. It jumps four squares forward. Count together: eleven, twelve, thirteen, fourteen." },
      { prompt: "Count the fish.", ask: "How many fish are there?" },
      { prompt: "Which number comes after 15?", say: "Thirteen, fourteen, fifteen, … Which number comes after fifteen?" },
      { prompt: "The frog is on 18. It jumps two squares forward. Where does it land?", say: "The frog is on eighteen. It jumps two squares forward. Where does it land?" },
      { prompt: "The frog is on 10. It jumps three squares back. Count back: nine, eight, …", say: "The frog is on ten. It jumps three squares back. Count back: nine, eight, seven." }
    ] },
    "math-seed-48": { title: "The numbers to ten game", steps: [
      { say: "Turn the cards over two at a time. Match each number with its dots.", pairs: [[{ say: "seven" }, null], [{ say: "zero" }, { say: "empty plate" }], [{ say: "nine" }, null], [{ say: "six" }, null]] },
      { prompt: "Put the numbers in order, from smallest to biggest", say: "Put the numbers in order, from smallest to biggest.", items: NUMS(["zero", "three", "five", "eight", "ten"]) },
      { prompt: "A row of five and some more. Look quickly!", ask: "How many did you see?" },
      { prompt: "The sheep wants one more than eight bunches of grass. Give them to it." },
      { prompt: "Match each number with its fingers", say: "Tap a number to hear its name. Match each number with hands that hold up that many fingers.", pairs: [[{ say: "eight" }, null], [{ say: "five" }, null], [{ say: "seven" }, null]] },
      { prompt: "Look at the number. Give the squirrel that many hazelnuts." },
      { prompt: "Put them in order from 10 down to 0", say: "Count back from ten: ten, eight, six, four, two, zero. Put them in order from most to least.", items: NUMS(["ten", "eight", "six", "four", "two", "zero"]) }
    ] },
    "math-seed-49": { title: "The where-is-it game", steps: [
      { prompt: "Tidy the room: put each thing where the voice says", say: "Toys in the box, books on the shelf, and shoes under the bed.",
        baskets: [{ label: "in the box" }, { label: "on the shelf" }, { label: "under the bed" }],
        items: [{ say: "teddy bear: in the box" }, { say: "books: on the shelf" }, { say: "shoe: under the bed" }, { say: "car: in the box" }, { say: "plant pot: on the shelf" }, { say: "slipper: under the bed" }] },
      { say: "Find it in the room.", tasks: [{ prompt: "What is under the table? Tap it." }, { prompt: "What is between the two chairs? Tap it." },
        { prompt: "What is outside the box? Tap it." }, { prompt: "What is on the table? Tap it." }] },
      { say: "Walk with Reza.", tasks: [{ prompt: "Reza is by the slide. Go to the fountain, then turn and go to the park gate." }] },
      { say: "Walk with Mum.", tasks: [{ prompt: "Go from the park gate to the fountain. Then turn and go to the tree. From there, go to the ducks." }] },
      { prompt: "Which cat is between?", say: "In which one is the cat between the dog and the rabbit?" }
    ] },
    "math-seed-50": { title: "The number party", steps: [
      { prompt: "It's the rabbit's party! Put seven carrots on its plate." },
      { prompt: "We gave each child a balloon. There were balloons left over. Which were there more of?", say: "We gave each child a balloon and there were balloons left over. Which were there more of? Children or balloons?" },
      { prompt: "We had five sweets. Three show. How many are under the bowl?", say: "We had five sweets. Three show. How many are under the bowl?" },
      { prompt: "Four guests had come. One more guest came. How many guests do we have now?", say: "Four guests had come. One more guest came. How many guests do we have now?" },
      { prompt: "Finish the party flags", say: "Red, yellow, green. Red, yellow, green. You put the rest." },
      { prompt: "Match each number with its group", say: "Tap a number to hear its name. Count, and match each number with its group.",
        pairs: [[{ say: "three" }, null], [{ say: "five" }, null], [{ say: "eight" }, null], [{ say: "two" }, null]] },
      { prompt: "There were five candles on the cake. You blew out two. How many candles are still lit?", say: "There were five candles on the cake. You blew out two. How many candles are still lit?" },
      { prompt: "The hen wanted six ears of corn. It has eaten two. Give it the rest." }
    ] }
  });

  // ---------------- Sprout, new lessons ----------------
  Object.assign(B.EN, {
    "math-sprout-14": { title: "Five and some more", steps: [
      { prompt: "A full row means five. How many counters are there altogether?" },
      { prompt: "A whole hand and some more fingers. Look quickly!", ask: "How many fingers altogether?" },
      { prompt: "The ten-frame only shows for a moment. Don't count, look!", ask: "How many counters did you see?" },
      { prompt: "Eight is five and how many more?", say: "Eight is five and how many more?" },
      { prompt: "Nine is one less than ten. How many spaces are empty?" },
      { prompt: "Look at the two hands. Only one finger is down!", ask: "How many fingers are up?" },
      { prompt: "A full row and how many more? Look quickly!", ask: "How many counters did you see?" },
      { prompt: "There are seven counters in the frame. How many fewer than ten is that?", say: "There are seven counters in the frame. Seven is how many fewer than ten?" }
    ] },
    "math-sprout-15": { title: "All the ways to make it", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We have six counters, all red: six red and zero yellow." }, { caption: "We turned one over: five and one. Still six." },
          { caption: "We turned one over: four and two. Still six." }, { caption: "We turned one over: three and three. Still six." },
          { caption: "We turned one over: two and four. Still six." }, { caption: "We turned one over: one and five. Still six." },
          { caption: "We turned one over: zero and six. Still six." }],
        question: "How many ways did we make six?" },
      {},
      { prompt: "Seven is four and how many more?", say: "Seven is four and how many more?" },
      { prompt: "Which one makes eight?", say: "Which one makes eight?" },
      { prompt: "There are nine beans in two hands. One hand has two. How many are in the other hand?", say: "There are nine beans in two hands. One hand has two. How many are in the other hand?" },
      { prompt: "Put the ways to make five in order", say: "Put the ways to make five in order: five and zero, four and one, three and two, two and three, one and four, zero and five." },
      { prompt: "Six is three and how many more?", say: "Six is three and how many more?" }
    ] },
    "math-sprout-16": { title: "The make-ten game", steps: [
      { prompt: "Match each number with the number that makes ten with it", say: "Match each number with the number that makes ten with it." },
      { prompt: "The squirrel has six hazelnuts and wants ten. How many more does it need? Give it that many." },
      { say: "Turn the cards over two at a time. Find two numbers that make ten together." },
      { prompt: "The rabbit has eaten three carrots and wants ten. Give it the rest." },
      { prompt: "Match each frame with the number that fills it", say: "Match each ten-frame with the number that fills its empty spaces." },
      { prompt: "The hen has five ears of corn and wants ten. Give it the rest." }
    ] },
    "math-sprout-17": { title: "Number sentences", steps: [
      { prompt: "There were three chicks. Two more chicks came. Which sentence is right?", say: "There were three chicks. Two more chicks came. Which sentence is right?" },
      { prompt: "There were six apples. The children ate two. Which sentence is right?", say: "There were six apples. The children ate two. Which sentence is right?" },
      { prompt: "Which story goes with this sentence?", say: "Four plus three equals seven. Which story goes with this sentence?",
        options: [{ label: "There were four sparrows. Three flew away." }, { label: "There were four sparrows. Three more came." }, { label: "There were seven sparrows. Four flew away." }] },
      { prompt: "Match each sentence with its answer", say: "Match each sentence with its answer." },
      { prompt: "Which story goes with this sentence?", say: "Nine minus four equals five. Which story goes with this sentence?",
        options: [{ label: "There were nine balloons. Four popped." }, { label: "There were five balloons. We bought four." }, { label: "There were nine balloons. We bought four." }] },
      { prompt: "Match each picture with its sentence", say: "Match each picture with its sentence." },
      { prompt: "Read this sentence and find the answer.", say: "Ten minus three equals what?" }
    ] },
    "math-sprout-18": { title: "Part, part, whole", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "One small box has three red counters, the other has four yellow counters." },
          { caption: "We put them all in the big box: three and four, seven. Three plus four equals seven." },
          { caption: "Now we take the yellow ones back: four went from seven, three are left. Seven minus four equals three." }],
        question: "If we take the red ones back, how many are left in the big box?" },
      {},
      { prompt: "Two and six make eight. So what is eight minus six?", say: "Two and six make eight. So what is eight minus six?" },
      { show: "whole: 9, part: 5, part: ?", prompt: "The whole is nine. One part is five. What is the other part?", say: "The whole is nine. One part is five. What is the other part?" },
      { prompt: "Which sentences tell the same picture?", say: "Five red and one yellow. Which sentences tell the same picture?",
        options: ["5 + 1 = 6 and 6 − 1 = 5", "5 + 1 = 6 and 6 + 1 = 7", "5 − 1 = 4 and 4 + 1 = 5"], answer: "5 + 1 = 6 and 6 − 1 = 5" },
      {},
      { prompt: "Six and three make nine. So what is nine minus three?", say: "Six and three make nine. So what is nine minus three?" }
    ] },
    "math-sprout-19": { title: "Sides and corners", steps: [
      { prompt: "The straight lines around a shape are its sides. Where two sides meet is a corner. A triangle has three sides and three corners. A square has four sides and four corners." },
      { prompt: "How many sides does this shape have?" },
      { prompt: "How many corners does this shape have?" },
      { prompt: "How many corners does a circle have?", say: "How many corners does a circle have? Follow its edge with your finger." },
      { prompt: "Sort the shapes by their sides", say: "Shapes with three sides in one basket, four sides in another, and shapes with no sides in the third.",
        baskets: [{ label: "3 sides" }, { label: "4 sides" }, { label: "no sides" }],
        items: [{ say: "thin triangle" }, { say: "rectangle" }, { say: "turned square" }, { say: "upside-down triangle" }, { say: "circle" }, { say: "thin rectangle" }] },
      { prompt: "I have four sides and all my sides are the same length. Which one am I?" },
      { prompt: "I have three corners. Which one am I?" },
      { prompt: "I have four sides. Two of my sides are long and two are short. Which one am I?" }
    ] },
    "math-sprout-20": { title: "Solid shapes", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "This is a cube. All its faces are flat squares, like a die." }, { caption: "This is a cuboid, like a shoe box. Its faces are flat." },
          { caption: "This is a sphere, like a ball. It is curved all over and it rolls." }, { caption: "This is a cylinder, like a can. It has two flat faces and one curved face." },
          { caption: "This is a cone, like an ice-cream cone. It has one flat face and a point." }],
        question: "Which one rolls?" },
      { prompt: "Match each solid with something that looks like it", say: "Tap a name to hear it. Match each solid with something that looks like it.",
        pairs: [[{ label: "cube", say: "cube" }, null], [{ label: "sphere", say: "sphere" }, null], [{ label: "cylinder", say: "cylinder" }, null], [{ label: "cone", say: "cone" }, null], [{ label: "cuboid", say: "cuboid" }, null]] },
      { prompt: "Are all its faces flat, or does it have a curved face?", say: "Things with only flat faces in one basket, and things with a curved face in the other.",
        baskets: [{ label: "all flat" }, { label: "has a curved face" }], items: [{ say: "die" }, { say: "orange" }, { say: "present box" }, { say: "candle" }, { say: "ice cube" }, { say: "ice-cream cone" }] },
      { say: "Turn the cards over two at a time. Match each solid with something that looks like it.",
        pairs: [[{ label: "cylinder", say: "cylinder" }, null], [{ label: "sphere", say: "sphere" }, null], [{ label: "cube", say: "cube" }, null]] },
      { text: "Find solid shapes at home:", list: ["Find a cube, a cuboid, a sphere and a cylinder.", "Which ones roll? Which ones can you stack?", "Run your finger over the flat and curved faces."] }
    ] },
    "math-sprout-21": { title: "Halves and quarters", steps: [
      { prompt: "The bread was cut in half for two people. Which half is right? The shares must be equal." },
      { prompt: "Cut this sangak bread in half: into two equal pieces. Tap the dotted line." },
      { prompt: "Colour half of this square cake." },
      { prompt: "Which one is cut into four equal pieces?" },
      { prompt: "Cut this square piece of paper into four equal pieces." },
      { prompt: "Which one is cut unequally? Those shares are not fair." },
      { prompt: "Colour one of the four pieces of this cake: a quarter." },
      { prompt: "We cut an apple in half for two people. How many pieces does each person get?", say: "We cut an apple in half for two people. How many pieces does each person get?" }
    ] },
    "math-sprout-22": { title: "The take-away game", steps: [
      { prompt: "The rabbit had eight carrots. It ate three in the morning. Put the rest on its plate for the evening." },
      { prompt: "Match each take-away with its answer", say: "Match each take-away with its answer." },
      { prompt: "Which ones make 3? Which ones make 5?", say: "Put each take-away in the basket of its answer: three or five." },
      { prompt: "The hen wanted seven ears of corn. It has eaten three. How many are left? Give it that many." },
      { say: "Turn the cards over two at a time. Match each take-away with its answer." },
      { prompt: "There were ten bunches of grass. The little goat ate four. Give the rest to the sheep." }
    ] }
  });
  var TF = [{ label: "✅", value: "درست" }, { label: "❌", value: "نادرست" }];
  Object.assign(B.EN, {
    "math-sprout-24": { title: "Counting on", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "There are eight apples in the bag. Three more apples are on the table." },
          { caption: "We don't need to count from one. We keep eight in our head and count on: eight… nine, ten, eleven." },
          { caption: "Eight plus three makes eleven." }],
        question: "How many apples are in the bag now?" },
      {}, {},
      { prompt: "To add, which number should we start from to get there faster?", say: "Two plus nine. Which number should we start from to get there faster?" },
      { prompt: "Count on from nine: ten, eleven, … What is the answer?", say: "Count on from nine: ten, eleven, twelve, thirteen. What is the answer?" },
      {},
      { prompt: "Count on from the bigger number. What is the answer?", say: "Three plus fifteen. Count on from the bigger number. What is the answer?" }
    ] },
    "math-sprout-25": { title: "Counting back", steps: [
      {},
      { prompt: "Count back from fifteen: fourteen, thirteen. What is the answer?", say: "Count back two from fifteen: fourteen, thirteen. What is the answer?" },
      {},
      { prompt: "9 is close to 12. Count on from 9 to 12: ten, eleven, twelve. How many steps is that?", say: "Nine is close to twelve. Count on from nine to twelve: ten, eleven, twelve. How many steps is that?" },
      { prompt: "The frog is on 9 and jumps three squares forward. Where does it land? So from 9 to there is three squares.", say: "The frog is on nine and jumps three squares forward. Where does it land?" },
      { prompt: "Count on from eleven to fourteen. What is the answer?", say: "Fourteen minus eleven. Count on from eleven to fourteen. What is the answer?" },
      { prompt: "Count back two. What is the answer?", say: "Eleven minus two. Count back two: ten, nine. What is the answer?" }
    ] },
    "math-sprout-26": { title: "Doubles to twenty", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "A butterfly has two wings. Each wing has three spots: three and three, six." },
          { caption: "One more spot on each wing: four and four, eight. When the two numbers are the same, we call it a double." }],
        question: "What is four and four?" },
      {},
      { prompt: "Match each double with its answer", say: "Match each double with its answer." },
      {},
      { prompt: "Six and six is twelve. So what is six and seven?", say: "Six and six is twelve. Six and seven is one more. What is it?" },
      { prompt: "Your ten fingers and Mum's ten fingers: how many altogether?", say: "Your ten fingers and Mum's ten fingers. How many altogether?" },
      { prompt: "Eight and eight is sixteen. What is eight and nine?", say: "Eight and eight is sixteen. What is eight and nine?" }
    ] },
    "math-sprout-27": { title: "Swap them, it's the same", steps: [
      { prompt: "Two apples and seven pears, or seven pears and two apples: is the total different?", say: "Two apples and seven pears, or seven pears and two apples. How many altogether?" },
      { prompt: "We swapped the numbers. What number goes in the “?”?", say: "Two plus seven equals seven plus what?" },
      { prompt: "Start from ten and count on three. What is the answer?", say: "Three plus ten. Start from ten and count on three." },
      { prompt: "Six and four make ten. A full frame!" },
      { prompt: "First add the two numbers that make ten: 7 and 3. Then add the 5.", say: "Seven and five and three. First add seven and three, that makes ten. Then add five." },
      { prompt: "Which two numbers make ten? Start with them.", say: "Four and eight and six. Which two numbers make ten? Start with them." },
      { prompt: "Is this sentence true or false?", say: "Five plus four equals four plus five. True or false?", options: TF }
    ] },
    "math-sprout-28": { title: "The adding to twenty game", steps: [
      { prompt: "Match each sum with its answer", say: "Match each sum with its answer. Count on from the bigger number." },
      { prompt: "Doubles on one side, the rest on the other", say: "Put the sums with two numbers the same in one basket, and the rest in the other.",
        baskets: [{ label: "double" }, { label: "not a double" }] },
      { prompt: "The squirrel ate nine hazelnuts and wants three more. Put all the hazelnuts it eats on the plate: nine and three." },
      { say: "Turn the cards over two at a time. Match each sum with a sum that has the same answer." },
      { prompt: "Which ones make 12? Which ones make 15?", say: "Put each sum in the basket of its answer: twelve or fifteen." },
      { prompt: "The hen eats seven ears of corn in the morning and seven in the evening. Put them all on the plate: seven and seven." }
    ] },
    "math-sprout-29": { title: "A balance that is level", steps: [
      { prompt: "One pan has 5 and the other has 2. Put weights on until both pans are the same.", question: "So 5 equals 2 plus what?" },
      { prompt: "“=” means both sides are the same. Is this sentence true or false?", say: "Five equals two plus three. True or false?", options: TF },
      { prompt: "One pan has 4 and 1. The other has 3. Put weights on until they are the same.", question: "4 + 1 equals 3 plus what?" },
      { prompt: "Is this sentence true or false?", say: "Five plus two equals eight. True or false?", options: TF },
      { prompt: "Is this sentence true or false?", say: "Six equals six. True or false?", options: TF },
      { prompt: "Is this sentence true or false?", say: "Four plus one equals three plus two. True or false?", options: TF }
    ] },
    "math-sprout-30": { title: "The missing number", steps: [
      { prompt: "One pan has 3 and a box. We don't know how heavy the box is. Put weights on until the balance is level.", left: [null, { say: "box" }],
        question: "Altogether it made 7. So how much is the box?" },
      { prompt: "Three and what make seven?", say: "Three and what make seven?" },
      { prompt: "6 + ? = 10 : how many more fill the frame?" },
      { prompt: "We took two away from a number and five were left. How many were there at first?", say: "We took two away from a number and five were left. How many were there at first?" },
      { prompt: "There were eight apples. Five show. How many are under the bowl? 5 + ? = 8", say: "There were eight apples. Five show. Five and what make eight?" },
      { prompt: "A box and 2. Put weights on until the balance is level.", left: [{ say: "box" }, null], question: "Altogether it made 8. So how much is the box?" },
      { prompt: "What and four make nine?", say: "What and four make nine?" }
    ] },
    "math-sprout-31": { title: "Quick and right to ten", steps: [
      { prompt: "Zero adds nothing. What is the answer?", say: "Seven plus zero." },
      { prompt: "Plus one means the next number. What is the answer?", say: "Six plus one. The number after six." },
      { prompt: "Plus two means two numbers on. What is the answer?", say: "Five plus two. Six, seven." },
      { prompt: "Which ones make ten?", say: "Sums that make ten in one basket, and the rest in the other.", baskets: [{ label: "makes ten" }, { label: "doesn't make ten" }] },
      { prompt: "Match each sum with its answer, quickly and right", say: "Match each sum with its answer." },
      { prompt: "Two back: seven, six. What is the answer?", say: "Eight minus two." },
      { prompt: "Four and what make ten?", say: "Ten minus four. Four and what make ten?" },
      { say: "Turn the cards over two at a time. Match each sum with its answer." }
    ] },
    "math-sprout-32": { title: "Taking away by thinking of adding", steps: [
      { prompt: "Instead of taking away, think: six and what make nine?", say: "Nine minus six. Think: six and what make nine?" },
      { prompt: "10 − 7 = ? : seven and what make ten?" },
      { prompt: "Five and what make eight?", say: "Eight minus five. Five and what make eight?" },
      { prompt: "These three numbers are a family: 3, 4 and 7. Which sentence is not in this family?", say: "Three, four and seven are a family. Which sentence is not in this family?" },
      { prompt: "10 − 4 = ? : four and what make ten?" },
      { prompt: "Which take-away can we tell from this sum?", say: "Two plus six equals eight. Which take-away is right?" },
      { prompt: "Nine and what make thirteen? (Nine and one, ten; ten and three, thirteen)", say: "Thirteen minus nine. Nine and what make thirteen?" }
    ] }
  });
  Object.assign(B.EN, {
    "math-sprout-33": { title: "How many more?", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Here there are blue marbles and red marbles. Which are more? How many more?" },
          { caption: "We put the marbles in two rows: a red marble under each blue one." },
          { caption: "Three blue marbles are on their own. So there are three more blue ones: seven minus four, three." }],
        question: "How many fewer red marbles are there?" },
      { prompt: "Give each child an apple: tap the apples.", say: "Give each child an apple. Tap the apples.", names: ["the children", "the apples"] },
      { prompt: "Eight children and five apples. How many children have no apple?", say: "Eight children and five apples. How many children have no apple?" },
      { prompt: "Give each dog a bone: tap the bones.", say: "Give each dog a bone. Tap the bones.", names: ["the dogs", "the bones"] },
      { prompt: "Four dogs and nine bones. How many bones are left over?", say: "Four dogs and nine bones. How many bones are left over?" },
      { prompt: "Nima has 12 cards and Mina has 9 cards. How many fewer does Mina have?", say: "Nima has twelve cards and Mina has nine cards. How many fewer does Mina have?" },
      { prompt: "Which sentence tells “how many more”? Arash has 10 walnuts and Raha has 6.", say: "Arash has ten walnuts and Raha has six. How many more does Arash have? Which sentence is right?" }
    ] },
    "math-sprout-34": { title: "Stories to twenty", steps: [
      { prompt: "Listen to the story and answer",
        scenes: [{ caption: "Twelve ducks were in the garden: two rows of six." }, { caption: "Two more ducks came." }],
        question: "How many ducks are in the garden now?" },
      { prompt: "There were 15 books on the shelf. Maryam took 6. How many are left? First draw a picture: 15 circles, cross out 6.", say: "There were fifteen books on the shelf. Maryam took six. How many books are left?" },
      { prompt: "7 girls and 8 boys are playing in the yard. How many children altogether?", say: "Seven girls and eight boys are playing in the yard. How many children altogether?" },
      { prompt: "Saman has 13 marbles and his brother has 9. How many more does Saman have?", say: "Saman has thirteen marbles and his brother has nine. How many more does Saman have?" },
      { prompt: "There were some cherries in the bowl. We ate 5 and 11 were left. How many were there at first?", say: "There were some cherries in the bowl. We ate five and eleven were left. How many were there at first?" },
      { prompt: "Hasti had 8 coloured pencils. Dad bought her some more. Now she has 12. How many did Dad buy?", say: "Hasti had eight coloured pencils. Dad bought her some more. Now she has twelve. How many did Dad buy?" }
    ] },
    "math-sprout-35": { title: "One sentence, many stories", steps: [
      { prompt: "Which story goes with this sentence?", say: "Six plus three equals nine. Which story goes with it?",
        options: [{ label: "There were six hens. Three more hens came." }, { label: "There were six hens. Three hens left." }, { label: "There were nine hens. Six hens left." }] },
      { prompt: "Does this story go with the same sentence too? “We have six red pencils and three blue pencils.”", say: "We have six red pencils and three blue pencils. Does this story go with six plus three too?" },
      { prompt: "Which story goes with this sentence?", say: "Ten minus four equals six. Which story goes with it?",
        options: [{ label: "There were ten biscuits. We ate four." }, { label: "There were ten biscuits. We bought four." }, { label: "There were four biscuits. We bought six." }] },
      { prompt: "“There are 5 red fish and 7 black fish in the pond.” Which question do we answer by adding?", say: "There are five red fish and seven black fish in the pond. Which question do we answer by adding?",
        options: [{ label: "How many fish are in the pond altogether?" }, { label: "How many more black fish are there?" }] },
      { prompt: "The same pond: which question do we answer by taking away?", say: "The same pond. Which question do we answer by taking away?",
        options: [{ label: "How many fish are in the pond altogether?" }, { label: "How many more black fish are there?" }] },
      { caption: "Tell a story for the sentence “5 + 3 = 8”. Then for “8 − 3 = 5”.",
        tips: ["Read the sentence together and ask: “What story goes with this?”", "Tell stories about your own home and street: bread, fruit, the neighbours' children.",
          "You tell a story that doesn't go with the sentence. Your child finds out why."] }
    ] },
    "math-sprout-36": { title: "Draw it and solve it", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "There are thirteen hens in the yard. Five hens go into the henhouse. How many are left? We solve it on paper." },
          { caption: "We draw a circle for each hen: thirteen circles." }, { caption: "Five hens went: we cross out five circles." },
          { caption: "We count the circles that are not crossed out: eight. Thirteen minus five, eight. We check by adding: eight and five, thirteen. It's right!" }],
        question: "How many hens are left in the yard?" },
      { prompt: "The cloth has 12 plates, one for each person. 9 people are sitting down. How many plates are empty? Count the circles.", say: "The cloth has twelve plates. Nine people are sitting down. How many plates are empty?" },
      { prompt: "Draw a picture in your head: there are 6 red and 8 yellow flowers in the vase. How many flowers altogether?", say: "There are six red flowers and eight yellow flowers in the vase. How many flowers altogether?" },
      { prompt: "Check your answer: “11 − 4 = 7”. Which sum can check it?", say: "Eleven minus four equals seven. Which sum can check it?" },
      { text: "Solve this story by drawing: “There were 14 balloons in the street. 6 popped. How many are left?” Draw a circle for each balloon and cross out the popped ones.",
        check: ["Drew 14 circles?", "Crossed out 6?", "Counted the answer right (8)?", "Checked by adding: 8 + 6 = 14?"] }
    ] },
    "math-sprout-37": { title: "The story game", steps: [
      { prompt: "Match each story with its sentence", say: "Tap each story to hear it. Match each story with its sentence.",
        pairs: [[{ label: "5 birds, 2 came", say: "There were five birds. Two came." }, null], [{ label: "5 birds, 2 left", say: "There were five birds. Two left." }, null],
          [{ label: "9 apples, we ate 4", say: "There were nine apples. We ate four." }, null]] },
      { prompt: "Which story is adding? Which is taking away?", say: "Stories where something is added in one basket, and stories where something is taken away in the other.",
        baskets: [{ label: "adding" }, { label: "taking away" }],
        items: [{ label: "3 more guests came", say: "Three more guests came." }, { label: "2 balloons popped", say: "Two balloons popped." },
          { label: "the hen laid 4 more eggs", say: "The hen laid four more eggs." }, { label: "5 sparrows flew off", say: "Five sparrows flew off." },
          { label: "Dad bought 6 more loaves", say: "Dad bought six more loaves." }, { label: "we ate 3 biscuits", say: "We ate three biscuits." }] },
      { say: "Turn the cards over two at a time. Match each sentence with its answer." },
      { prompt: "Is the answer to these stories 8 or 10?", say: "Put each story in the basket of its answer: eight or ten.",
        items: [{ label: "5 boys and 3 girls", say: "Five boys and three girls. How many altogether?" }, { label: "12 loaves, we ate 2", say: "There were twelve loaves. We ate two." },
          { label: "Ali 11 and Sara 3: how many more?", say: "Ali has eleven marbles and Sara has three. How many more does Ali have?" }, { label: "6 fish and 4 more", say: "There were six fish and four more came." }] },
      { prompt: "Match each story with its sentence", say: "Match each story with its sentence.",
        pairs: [[{ label: "7 pencils and 3 more", say: "There were seven pencils and we bought three more." }, null], [{ label: "7 pencils, 3 got lost", say: "There were seven pencils. Three got lost." }, null]] }
    ] },
    "math-sprout-38": { title: "Bundles of ten, up to a hundred", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Counting lots of sticks one by one is hard. We tie ten together with a band: a bundle of ten." },
          { caption: "We have two more bundles of ten. Now we count the bundles: ten, twenty, thirty." }, { caption: "Three bundles of ten means thirty sticks." }],
        question: "How many sticks are five bundles of ten?" },
      {}, {},
      { prompt: "Count the eggs. The trays hold ten.", ask: "How many eggs are there?" },
      { prompt: "Make thirty sticks: when there are ten, they become a bundle." },
      {}, {}
    ] },
    "math-sprout-39": { title: "Twos and fives", steps: [
      { prompt: "Socks come in pairs. Count in twos: two, four, six, … How many are there?", say: "Socks come in pairs. Count in twos: two, four, six, eight. How many are there?" },
      { prompt: "Count in twos. Fill in the gaps", say: "Two, four, six, … Fill in the gaps." },
      { prompt: "Go on in twos: the frog is on 6 and jumps two squares. Where does it land?", say: "The frog is on six and jumps two squares. Where does it land?" },
      { prompt: "Each hand has five fingers. Count in fives: five, ten, … How many fingers?", say: "Each hand has five fingers. Count in fives: five, ten, fifteen, twenty. How many fingers?" },
      { prompt: "Count in fives", say: "Five, ten, fifteen, … Fill in the gaps." },
      { prompt: "There are four of us at home. Each of us has ten fingers. Count in tens: ten, twenty, … How many fingers?", say: "There are four of us at home. Each of us has ten fingers. Count in tens: ten, twenty, thirty, forty. How many fingers?" },
      { prompt: "Count in tens", say: "Ten, twenty, thirty, … Fill in the gaps." }
    ] },
    "math-sprout-40": { title: "Counting to a hundred", steps: [
      { prompt: "Count on three from 18: nineteen, twenty, … Where do you get to?", say: "Count on three from eighteen: nineteen, twenty, twenty-one." },
      { prompt: "What comes after 29? Put them in order", say: "Twenty-seven, twenty-eight, twenty-nine, … Put them in order.", items: NUMS(["twenty-seven", "twenty-eight", "twenty-nine", "thirty", "thirty-one"]) },
      { prompt: "Put the tens in order: ten, twenty, thirty…", say: "Ten, twenty, thirty, forty, fifty, sixty. Put them in order.", items: NUMS(["ten", "twenty", "thirty", "forty", "fifty", "sixty"]) },
      { prompt: "68, 69, … what comes next?", say: "Sixty-eight, sixty-nine, … what next? Put them in order.", items: NUMS(["sixty-seven", "sixty-eight", "sixty-nine", "seventy", "seventy-one"]) },
      { prompt: "Count back from 45 and put them in order", say: "Count back from forty-five: forty-five, forty-four, … Put them in order.", items: NUMS(["forty-five", "forty-four", "forty-three", "forty-two", "forty-one", "forty"]) },
      { prompt: "Count back five from 14. Where do you get to?", say: "Count back five from fourteen." },
      { text: "Count a big pile:", list: ["Bring a big handful of chickpeas, buttons or pasta.", "Make groups of ten and put each ten in a bowl or on a napkin.",
        "Count the tens: ten, twenty, thirty… and then the ones left over. How many altogether?"] }
    ] },
    "math-sprout-42": { title: "The hundred chart", steps: [
      { prompt: "This is a row of the hundred chart. Along a row, each number is one more. Fill in the gaps", say: "Along each row of the hundred chart, the numbers go up by one. Fill in the gaps." },
      { prompt: "This is a column of the hundred chart, lying down. Down a column, each number is ten more. Fill it in", say: "Down each column of the hundred chart, the numbers go up by ten. Fill in the gaps." },
      { prompt: "On the hundred chart, which number is under 34?", say: "On the hundred chart, which number is under thirty-four? Ten more." },
      { prompt: "Which number is above 67?", say: "On the hundred chart, which number is above sixty-seven? Ten less." },
      { prompt: "A number is hidden under a card. Which one is it?", say: "Twenty-nine, what, thirty-one. Which number is hidden?" },
      { prompt: "A piece of the chart: 55, 56, 57 … fill it in", say: "Fifty-five, fifty-six, fifty-seven. Fill in the gaps." },
      { prompt: "Which number is next to 78 in the same row?", say: "On the hundred chart, which number comes after seventy-eight in the same row?" }
    ] },
    "math-sprout-43": { title: "Ten more, ten less", steps: [
      { prompt: "We have 24 sticks. We add another bundle of ten. How many now?" },
      { prompt: "We have 56 sticks. We take away a bundle of ten. How many are left?" },
      { prompt: "Ten more: only the tens digit goes up by one. What is the answer?", say: "Thirty-seven plus ten." },
      { prompt: "Ten less: the tens digit goes down by one. What is the answer?", say: "Eighty-two minus ten." },
      {},
      { prompt: "Which number is ten more than 45 and ten less than 65?", say: "Which number is ten more than forty-five and ten less than sixty-five?" },
      { prompt: "What is ninety and ten?", say: "Ninety plus ten." }
    ] },
    "math-sprout-44": { title: "The numbers to a hundred game", steps: [
      { prompt: "In tens: put them in order from smallest to biggest", say: "Ten, twenty, thirty, … Put them in order from smallest to biggest.", items: NUMS(["thirty", "forty", "fifty", "sixty", "seventy"]) },
      { prompt: "Match each number with its name", say: "Tap a name to hear it. Match each number with its name.",
        pairs: [[{ label: "eighty-four", say: "eighty-four" }, null], [{ label: "forty-eight", say: "forty-eight" }, null], [{ label: "ninety-nine", say: "ninety-nine" }, null]] },
      { prompt: "Find the missing piece of the hundred chart", say: "This is a column of the hundred chart. Fill in the gaps." },
      { say: "Turn the cards over two at a time. Match each number with the number that is ten more." },
      { prompt: "Put them in order from smallest to biggest", say: "Put these numbers in order from smallest to biggest." },
      { prompt: "In fives: fill it in", say: "Count in fives and fill in the gaps." }
    ] }
  });
  var SEASONS = [{ label: "spring" }, { label: "summer" }, { label: "autumn" }, { label: "winter" }];
  var DAYS = function (list) { return list.map(function (d) { return { label: d, say: d }; }); };
  Object.assign(B.EN, {
    "math-sprout-45": { title: "Measuring with units", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "How long is this pencil? We put cubes next to it, one after another, with no gaps and no overlaps." },
          { caption: "The pencil is four cubes long." }, { caption: "Now we measure the same pencil with paper clips. The clips are smaller." },
          { caption: "The pencil is eight clips long. A smaller unit, a bigger number!" }],
        question: "Why is the number of clips bigger?", options: [{ label: "📎" }, { label: "✏️" }] },
      { prompt: "How many cubes long is the spoon? Tap each cube and count." },
      { prompt: "How many clips long is the crayon? Tap each clip and count." },
      { prompt: "How many cubes long is the book?" },
      { prompt: "Sara measured the table with cubes and Kaveh with clips. Who said the bigger number?", say: "Sara measured the table with cubes and Kaveh with clips. The clips are smaller. Who said the bigger number?" },
      { prompt: "Nima put the cubes with gaps between them. Is his number right?", say: "Nima put the cubes next to the pencil with gaps between them. Is his number right?" }
    ] },
    "math-sprout-46": { title: "Which is longer?", steps: [
      { prompt: "We can't carry the table to the door. We measured the table with a piece of string. The string was shorter than the door. Which is longer?", say: "We can't carry the table to the door. We measured the table with a piece of string. The string was shorter than the door. Which is longer, the table or the door?" },
      { prompt: "The pencil is longer than the eraser. The ruler is longer than the pencil. Which is the longest?", say: "The pencil is longer than the eraser. The ruler is longer than the pencil. Which is the longest?" },
      { prompt: "Put them in order, from short to long", say: "Put these three strips in order, from short to long." },
      {},
      { prompt: "How many steps long is the sofa? Tap each step." },
      { prompt: "Put them in order, from long to short", say: "Put them in order, from long to short." },
      { text: "Measure and compare at home:", list: ["Measure the width of a table with a piece of string. Take the string to the door: which is longer?", "Measure the window frame with a spoon.",
        "Measure the hallway in steps. Your mother or father measure it too. Are the numbers different?"] }
    ] },
    "math-sprout-47": { title: "Heavier, holds more", steps: [
      { prompt: "Weigh the apple with cubes: put cubes on until the balance is level.", left: [{ say: "apple" }], question: "How many cubes is the apple?" },
      { prompt: "Now weigh the orange.", left: [{ say: "orange" }], question: "How many cubes is the orange?" },
      { prompt: "The apple was 3 cubes and the orange 4 cubes. Which is heavier?", say: "The apple was three cubes and the orange four cubes. Which is heavier?" },
      { prompt: "Which one is lighter? Tap that pan.", left: [{ say: "potato" }], right: [{ say: "onion" }] },
      { prompt: "We poured the water from the teapot into tea glasses. Five glasses were filled. How many glasses of water does the teapot hold?", say: "We poured the water from the teapot into tea glasses. Five glasses were filled. How many glasses of water does the teapot hold?" },
      { prompt: "The jug holds 7 glasses of water and the bottle 4. Which holds more?", say: "The jug holds seven glasses of water and the bottle four. Which holds more?" },
      { prompt: "The jug holds 7 glasses and the bottle 4. How many more glasses does the jug hold?", say: "The jug holds seven glasses and the bottle four. How many more glasses does the jug hold?" }
    ] },
    "math-sprout-48": { title: "O'clock", steps: [
      { prompt: "The short hand tells the hour. At o'clock, the long hand points straight up at 12. Look: now it is 3 o'clock.",
        say: "The short hand tells the hour. At o'clock, the long hand points straight up at twelve. Look: now it is three o'clock." },
      { prompt: "Mahsa wakes up at this time in the morning. What time is it?" },
      { prompt: "Lunch is at this time. What time is it?" },
      { prompt: "Arman plays football at 5 o'clock. Put the short hand on 5." },
      { prompt: "We go to sleep at this time at night. What time is it?" },
      { prompt: "At o'clock, where is the long hand?", say: "At o'clock, where is the long hand?" },
      { prompt: "Break time at school is at 10 o'clock. Set the hands to 10 o'clock." }
    ] },
    "math-sprout-49": { title: "Seasons and months", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "It's spring: Farvardin, Ordibehesht, Khordad. The tree is in blossom." },
          { caption: "Summer comes: Tir, Mordad, Shahrivar. The leaves are green and thick." },
          { caption: "It's autumn: Mehr, Aban, Azar. The leaves turn orange and fall." },
          { caption: "It's winter: Dey, Bahman, Esfand. The tree has no leaves and it has snowed." }],
        question: "Which season comes after winter?" },
      { prompt: "Put the seasons in order, starting with spring", say: "Put the seasons in order: spring, summer, autumn, winter.",
        items: [{ label: "spring", say: "spring" }, { label: "summer", say: "summer" }, { label: "autumn", say: "autumn" }, { label: "winter", say: "winter" }] },
      { prompt: "Put each month in its season", say: "Put each month in its season. Tap a month to hear its name.", baskets: SEASONS,
        items: DAYS(["Farvardin", "Tir", "Mehr", "Dey", "Khordad", "Shahrivar", "Azar", "Esfand"]) },
      { prompt: "Put the months of spring in order", say: "The months of spring: Farvardin, Ordibehesht, Khordad. Put them in order.", items: DAYS(["Farvardin", "Ordibehesht", "Khordad"]) },
      { prompt: "Put the days of the week in order, starting with Saturday", say: "The days of the week: Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday. Put them in order.",
        items: DAYS(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"]) },
      { prompt: "Which season do these belong to?", say: "Put each thing in its season.", baskets: [{ label: "summer" }, { label: "winter" }],
        items: [{ say: "watermelon" }, { say: "snowman" }, { say: "swimsuit" }, { say: "gloves" }] }
    ] },
    "math-sprout-50": { title: "Our money", steps: [
      { prompt: "These are our banknotes, in thousands of tomans. How much is this money altogether?" },
      { prompt: "Which banknote is worth more?", say: "The five thousand toman note or the two thousand toman note? Which is worth more?", options: [{ label: "5 thousand" }, { label: "2 thousand" }] },
      { prompt: "How much is this money altogether?" },
      { prompt: "Pay for the bread.", items: [{ name: "sangak bread" }] },
      { prompt: "A bag of apples and a cucumber. How much is that altogether?", items: [{ name: "apples" }, { name: "cucumber" }] },
      { prompt: "One ten thousand toman note is the same as how many five thousand toman notes?", say: "One ten thousand toman note is the same as how many five thousand toman notes?" },
      { prompt: "Pay for the pears with two notes.", items: [{ name: "pears" }] }
    ] },
    "math-sprout-51": { title: "The measuring and time game", steps: [
      { prompt: "Put them in order, from short to long", say: "Put these strips in order, from short to long." },
      { prompt: "Match each thing we do with its time", say: "Match each thing with its time: morning, noon or night.",
        pairs: [[{ say: "breakfast" }, { say: "morning" }], [{ say: "lunch" }, { say: "noon" }], [{ say: "sleep" }, { say: "night" }]] },
      { prompt: "Put the days of the week in order", say: "Start from Tuesday and put them in order: Tuesday, Wednesday, Thursday, Friday.", items: DAYS(["Tuesday", "Wednesday", "Thursday", "Friday"]) },
      { prompt: "Put each month in its season", say: "Put each month in its season.", baskets: [{ label: "spring" }, { label: "autumn" }], items: DAYS(["Ordibehesht", "Aban", "Farvardin", "Mehr"]) },
      { prompt: "Put the seasons in order, starting with summer", say: "Start from summer: summer, autumn, winter, spring.", items: [{ say: "summer" }, { say: "autumn" }, { say: "winter" }, { say: "spring" }] },
      { say: "Turn the cards over two at a time. Match each day with the day after it.",
        pairs: [[{ label: "Saturday", say: "Saturday" }, { label: "Sunday", say: "Sunday" }], [{ label: "Monday", say: "Monday" }, { label: "Tuesday", say: "Tuesday" }], [{ label: "Thursday", say: "Thursday" }, { label: "Friday", say: "Friday" }]] }
    ] },
    "math-sprout-52": { title: "Tally marks", steps: [
      { prompt: "These are tally marks. We draw a line for each thing. The fifth goes across the four before it: a group of five.", ask: "How many were counted?" },
      { prompt: "A group of five and some more lines.", ask: "How many altogether?" },
      { prompt: "Count the groups in fives, then the single lines.", ask: "How many altogether?" },
      { title: "Fruit the children like", prompt: "We asked the children what fruit they like. Put each answer in its column.", rows: [{ label: "apples" }, { label: "grapes" }, { label: "bananas" }],
        question: "How many children like grapes?" },
      { title: "Fruit the children like", rows: [{ label: "apples" }, { label: "grapes" }, { label: "bananas" }], question: "Which fruit do they like most?",
        options: [{ label: "apples" }, { label: "grapes" }, { label: "bananas" }] },
      { prompt: "How many children answered altogether? 3 and 5 and 2", say: "Three children said apples, five grapes, two bananas. How many children answered altogether?" },
      { text: "A survey at home:", list: ["Ask everyone at home (or relatives on the phone): “Which do you like best: tea, milk or juice?”",
        "Draw a line in that drink's column for each answer. Draw the fifth one across.", "Count the lines. Which one had the most?"] }
    ] },
    "math-sprout-53": { title: "Reading a picture graph", steps: [
      { title: "Birds we saw in the yard", rows: [{ label: "sparrows" }, { label: "pigeons" }, { label: "crows" }], question: "How many sparrows did we see?" },
      { title: "Birds we saw in the yard", rows: [{ label: "sparrows" }, { label: "pigeons" }, { label: "crows" }], question: "Which bird did we see the fewest of?",
        options: [{ label: "sparrows" }, { label: "pigeons" }, { label: "crows" }] },
      { title: "Birds we saw in the yard", rows: [{ label: "sparrows" }, { label: "pigeons" }, { label: "crows" }], question: "How many more sparrows than pigeons were there?" },
      { title: "The class's favourite games", rows: [{ label: "ball" }, { label: "skipping" }, { label: "hide-and-seek" }, { label: "hopscotch" }], question: "Which game do they like best?",
        options: [{ label: "ball" }, { label: "hide-and-seek" }, { label: "hopscotch" }] },
      { title: "The class's favourite games", rows: [{ label: "ball" }, { label: "skipping" }, { label: "hide-and-seek" }, { label: "hopscotch" }], question: "How many children like ball or skipping?" },
      { title: "The class's favourite games", rows: [{ label: "ball" }, { label: "skipping" }, { label: "hide-and-seek" }, { label: "hopscotch" }], question: "How many fewer is hopscotch than hide-and-seek?" }
    ] },
    "math-sprout-54": { title: "Left and right", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "From where we are looking, this side is left and that side is right." }, { caption: "The ball rolled to the left of the tree." },
          { caption: "An apple fell from the tree, on the right of the tree." }, { caption: "The cat came from the right and went next to the ball, on the left." }],
        question: "Which side of the tree is the ball on?" },
      { prompt: "Put your right hand up. Which arrow points to the side of your right hand?", say: "Put your right hand up. Which arrow points to the side of your right hand?" },
      { prompt: "Which side of the tree is the apple on?", say: "Look at the picture. Which side of the tree is the apple on?", answer: "چپ" },
      { prompt: "Sara is standing facing you and has put up her right hand. Which side of you is her hand?", say: "Sara is standing facing you and has put up her right hand. From where you are, which side is her hand?" },
      { text: "The left and right game:", list: ["Put your right hand up. Wiggle your left foot.", "Stand facing your mother or father and both put up your right hands. Are your hands opposite each other?",
        "In the room, say: “What is on my left? What is on my right?”"] }
    ] },
    "math-sprout-55": { title: "The way from home to school", steps: [
      { prompt: "This is a map of the neighbourhood. Tap each place to hear its name." },
      { say: "Go to school with Nastaran.", tasks: [{ prompt: "Nastaran sets off from home. Go straight on, past the clinic, and on to the school. Tap the places in order." }] },
      { say: "Buy bread with Grandpa.", tasks: [{ prompt: "Go up from home to the park. Then turn and go to the fruit shop. The bakery is next to the fruit shop: go to the bakery." }] },
      { say: "Where is it?", tasks: [{ prompt: "Which shop is next to the fruit shop? Tap it." }, { prompt: "Which place is between home and school? Tap it." }] },
      { say: "The top of this picture is north, like a map.", tasks: [{ prompt: "Turn to face north." }, { prompt: "Now turn right: face east." }, { prompt: "Turn right again: face south." }] },
      { say: "Go to the park with Kamran.", tasks: [{ prompt: "Kamran is at school. Go to the clinic, then home, then turn and go up to the park." }] }
    ] },
    "math-sprout-56": { title: "Growing patterns", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "First step: one cube." }, { caption: "Next step: two cubes: one more." }, { caption: "Next step: three cubes: one more again." },
          { caption: "Next step: four cubes. Each step is one more than the one before." }],
        question: "How many cubes does the next step have?" },
      { prompt: "What comes next?", say: "One, two, three, four. One more each time. What comes next?" },
      { prompt: "We make triangles with matches. One triangle needs 3 matches, two need 5, three need 7. How many do four triangles need?",
        say: "One triangle three matches, two triangles five, three triangles seven. Two more each time. How many matches do four triangles need?" },
      { prompt: "Two more each time. Fill it in", say: "Two, four, six, … two more each time." },
      { prompt: "How does this pattern grow? 1, 3, 5, 7", say: "One, three, five, seven. How does this pattern grow?",
        options: [{ label: "one more each time" }, { label: "two more each time" }, { label: "ten more each time" }] },
      { prompt: "The towers get taller. What comes next?", say: "One floor, two floors, three floors. What next?" }
    ] },
    "math-sprout-57": { title: "Number patterns", steps: [
      { prompt: "2, 4, 6 … fill in the gaps", say: "Two, four, six, … fill in the gaps." },
      { prompt: "5, 10, 15 … fill it in", say: "Five, ten, fifteen, … fill it in." },
      { prompt: "20, 18, 16 … this time the numbers go down. Fill it in", say: "Twenty, eighteen, sixteen, … the numbers go down in twos." },
      { prompt: "The “in twos” pattern: the frog is on 10 and jumps two squares. Where does it land?", say: "The frog is on ten and jumps two squares. Where does it land?" },
      { prompt: "What is the rule of this pattern?", say: "Three, six, nine, twelve. What is its rule?",
        options: [{ label: "3 more each time" }, { label: "2 more each time" }, { label: "3 less each time" }] },
      { prompt: "What comes next?", say: "Thirty, forty, fifty, what next?" },
      { prompt: "1, 3, 5 … odd numbers. Fill it in", say: "One, three, five, … fill it in." }
    ] },
    "math-sprout-58": { title: "First to tenth", steps: [
      { prompt: "The train has an engine and five carriages. Count the carriages from the engine: first, second, … Which is the last carriage?", say: "The train has five carriages. Count from the engine: first, second, third, fourth, fifth. Which is the last carriage?",
        options: [{ label: "fourth" }, { label: "fifth" }, { label: "sixth" }] },
      { prompt: "Put the floors of the building in order from the bottom: first, second, third…", say: "First floor, second floor, third floor, fourth floor, fifth floor, sixth floor. Put them in order.",
        items: DAYS(["first", "second", "third", "fourth", "fifth", "sixth"]) },
      { prompt: "Reyhaneh lives on the seventh floor. The lift is on the fifth floor. How many more floors up?", say: "Reyhaneh lives on the seventh floor. The lift is on the fifth floor. How many more floors does it go up?" },
      { prompt: "Seventh, eighth, ninth, tenth: put them in order", say: "Seventh, eighth, ninth, tenth. Put them in order.", items: DAYS(["seventh", "eighth", "ninth", "tenth"]) },
      { prompt: "Ten children are in a line. You are at the end. Which place are you?", say: "Ten children are in a line. You are at the end. Which place are you?", options: [{ label: "ninth" }, { label: "tenth" }, { label: "first" }] },
      { prompt: "Count from the left. What colour is the fifth one?", say: "Count from the left. What colour is the fifth one?" }
    ] },
    "math-sprout-59": { title: "The shapes game", steps: [
      { prompt: "Sort the shapes by their corners", say: "Shapes with three corners in one basket, four corners in the other.", baskets: [{ label: "3 corners" }, { label: "4 corners" }] },
      { say: "Turn the cards over two at a time. Match each solid with something that looks like it.",
        pairs: [[{ label: "sphere", say: "sphere" }, null], [{ label: "cylinder", say: "cylinder" }, null], [{ label: "cone", say: "cone" }, null], [{ label: "cube", say: "cube" }, null]] },
      { prompt: "Which one is cut in half properly? The two pieces must be equal." },
      { say: "Turn the cards over two at a time. Match each shape with the same shape, even if it is turned." },
      { prompt: "Flat shape or solid?", say: "Flat shapes, like paper, in one basket, and solids, like a ball, in the other.", baskets: [{ label: "flat" }, { label: "solid" }],
        items: [{}, { say: "die" }, {}, { say: "can" }, { say: "orange" }] }
    ] },
    "math-sprout-60": { title: "The Sprout party", steps: [
      { prompt: "Match each sum with its answer", say: "Match each sum with its answer." },
      { prompt: "Put them in order from smallest to biggest", say: "Put these numbers in order from smallest to biggest." },
      { prompt: "There were 14 balloons at the party. 5 popped. How many are left?", say: "There were fourteen balloons at the party. Five popped. How many are left?" },
      { prompt: "The party flags: what comes next?", say: "Red, yellow, yellow, red, yellow, yellow. What comes next?" },
      { prompt: "I have four equal sides. Which one am I?" },
      { prompt: "The birthday party starts at this time. What time is it?" },
      { prompt: "Count on from nine. What is the answer?", say: "Nine plus eight." },
      { prompt: "In tens to a hundred", say: "Count in tens up to a hundred." }
    ] }
  });

  // ---------------- Sapling, new lessons ----------------
  var ABOVE = [{ label: "more than 50" }, { label: "less than 50" }];
  Object.assign(B.EN, {
    "math-sapling-22": { title: "Taking away to twenty through ten", steps: [
      { prompt: "13 − 5: first take away 3 so that ten is left, then 2 more." },
      { prompt: "Split 6: first 4 (down to ten), then how many more?", say: "Fourteen minus six. First take away four so that ten is left. Then how many more?" },
      { prompt: "Go back seven from 15: first to 10, then the rest. Where do you get to?", say: "Go back seven from fifteen. First to ten, then the rest." },
      { prompt: "First 2 to get to ten, then 6 more. The answer?", say: "Twelve minus eight." },
      { prompt: "16 − 9: six to get to ten, then three more." },
      { prompt: "One to get to ten, then two more. The answer?", say: "Eleven minus three." },
      { prompt: "Work it out any way you like.", say: "Seventeen minus nine." }
    ] },
    "math-sapling-23": { title: "The number facts game", steps: [
      { prompt: "Match each sum with its answer", say: "Match each sum with its answer." },
      { prompt: "Which ones make 11? Which make 14?", say: "Put each one in the basket of its answer." },
      { say: "Turn the cards over two at a time. Match each one with its answer." },
      { prompt: "Which is easy by making ten? Which is a double?", say: "Sums with two numbers the same go in the doubles basket, the rest in the make-ten basket.", baskets: [{ label: "double" }, { label: "make ten" }] },
      { prompt: "Match each sum with the take-away from the same family", say: "Match each sum with the take-away from the same family." }
    ] },
    "math-sapling-24": { title: "Ten more, ten less", steps: [
      { prompt: "35 and another bundle of ten. How many is that?" },
      { prompt: "We take a bundle of ten away from 72. How many are left?" },
      { prompt: "The frog is on 7 and jumps ten squares forward. Where does it land?", say: "The frog is on seven and jumps ten squares forward." },
      { prompt: "Add three tens: 56, 66, 76. The answer?", say: "Forty-six plus thirty. Go on in tens." },
      { prompt: "Take away four tens. The answer?", say: "Ninety-three minus forty." },
      { prompt: "Which number becomes 68 with ten more?", say: "What number plus ten makes sixty-eight?" },
      { prompt: "Ten more each time. What's next?", say: "Twenty-five, thirty-five, forty-five, what next?" }
    ] },
    "math-sapling-25": { title: "Adding on an empty number line", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We work out 38 + 25 on an empty line. We only write 38." }, { caption: "25 is 20 and 5. First a big jump of 20: 38, 58." },
          { caption: "Then a small jump of 5: 58, 63." }, { caption: "So 38 + 25 = 63." }],
        question: "What is 45 + 30? (one jump of 30)" },
      { prompt: "One jump of 40 from 27. Where do you get to?", say: "Twenty-seven plus forty." },
      { prompt: "First jump 20, then 3. The answer?", say: "Fifty-four plus twenty-three. First twenty, then three." },
      { prompt: "On the number line: 8 + 7. First to 10, then the rest.", say: "Eight plus seven. First two to get to ten, then five more." },
      { prompt: "Jump 20, then 8 (first 4 to 60, then 4). The answer?", say: "Thirty-six plus twenty-eight." },
      { prompt: "One way: two from 68 to 70, then 13 more. The answer?", say: "Sixty-eight plus fifteen." }
    ] },
    "math-sapling-26": { title: "Taking away by counting up", steps: [
      { prompt: "47 is close to 52. Count up from 47: 3 to 50, 2 to 52. How many altogether?", say: "Fifty-two minus forty-seven. From forty-seven, three to fifty, two to fifty-two." },
      { prompt: "Count up from 17 to 20: how many jumps? (20 − 17)", say: "Go three jumps forward from seventeen. Do you get to twenty?" },
      { prompt: "Count up from 58 to 61. How many?", say: "Sixty-one minus fifty-eight." },
      { prompt: "How many from 64 to 70?", say: "Seventy minus sixty-four." },
      { prompt: "Which take-away is easier by counting up?", say: "Which take-away is easier by counting up? When the two numbers are close." },
      { prompt: "From 35: 5 to 40, 2 to 42. The answer?", say: "Forty-two minus thirty-five." },
      { prompt: "How many from 96 to 100?", say: "A hundred minus ninety-six." }
    ] },
    "math-sapling-27": { title: "Adding and taking away in columns", steps: [
      { prompt: "First with sticks: 47 + 35. When the ones make ten, they become a bundle." },
      { prompt: "Now write it in columns: start with the ones. 7 + 5 = 12: write 2 and carry 1 ten over the tens." },
      { prompt: "Add in columns. Start with the ones." },
      { prompt: "With sticks: 62 − 28. There aren't enough ones, so we open a bundle." },
      { prompt: "Now in columns: 2 − 8 doesn't work. We borrow a ten: 12 − 8." },
      { prompt: "Take away in columns." },
      { prompt: "Another sum: work it out in columns." }
    ] },
    "math-sapling-28": { title: "Guess, work it out, check", steps: [
      { prompt: "First guess: 48 is close to 50 and 31 is close to 30. About how much is the answer?", say: "Forty-eight plus thirty-one. About how much is it?" },
      { prompt: "Now work it out exactly. Is it close to your guess?", say: "Now work it out exactly." },
      { prompt: "Check: if 48 + 31 = 79 is right, what is 79 − 31?", say: "Check: what is seventy-nine minus thirty-one?" },
      { prompt: "Shirin wrote this answer. Guess: 60 − 20 = 40. Does her answer look right?", say: "Shirin wrote sixty-two minus nineteen equals fifty-three. Guess: sixty minus twenty is forty. Is her answer right?", options: TF },
      { prompt: "What is the right answer?", say: "Sixty-two minus nineteen." },
      { prompt: "Work out 9 + 6. Then check by taking away: 15 − 6 = 9.", say: "Nine plus six." },
      { prompt: "Find the missing number and check by adding.", say: "What number plus twenty-seven makes fifty?" }
    ] },
    "math-sapling-29": { title: "The two-digit adding and taking away game", steps: [
      { prompt: "Match each one with its answer", say: "Match each one with its answer." },
      { prompt: "Which answers are more than 50?", say: "Ones whose answer is more than fifty in one basket, the rest in the other. Guess first.", baskets: ABOVE },
      { say: "Turn the cards over two at a time. Match each one with its answer." },
      { prompt: "Is the answer even or odd?", say: "Put each one in the even or odd basket.", baskets: [{ label: "even" }, { label: "odd" }] },
      { prompt: "Match each sum with the take-away that checks it", say: "Match each sum with the take-away that checks it." }
    ] },
    "math-sapling-30": { title: "Centimetres and the ruler", steps: [
      { prompt: "Each square is one centimetre. How many centimetres long is the pencil? Tap each square." },
      { prompt: "When we measure with a ruler, where do we put the end of the thing?", say: "When we measure with a ruler, where do we put the end of the thing?",
        options: [{ label: "on zero" }, { label: "on one" }, { label: "anywhere" }] },
      { prompt: "The tip of the pencil is on 2 and its end is on 9. How many centimetres long is the pencil?", say: "The tip of the pencil is on two and its end is on nine. How many centimetres long is the pencil?" },
      { prompt: "How many centimetres long is the crayon?" },
      { prompt: "Which one is about one centimetre wide?", say: "Which one is about one centimetre wide?" },
      { prompt: "The spoon is 12 centimetres and the fork 15. Which is longer?" },
      { text: "Measure with a ruler:", list: ["Measure a pencil, an eraser and your fingers. Put the end of each on zero.", "First guess, then measure. How close was your guess?", "Draw a 10 centimetre line on paper."] }
    ] },
    "math-sapling-31": { title: "Metres", steps: [
      { prompt: "How many centimetres are in a metre?", say: "How many centimetres are in a metre?" },
      { prompt: "Which do we measure in metres and which in centimetres? The length of the yard in…", say: "Do we measure the length of the yard in metres or centimetres?", options: [{ label: "metres" }, { label: "centimetres" }] },
      { prompt: "The length of a pencil in…", say: "Do we measure the length of a pencil in metres or centimetres?", options: [{ label: "metres" }, { label: "centimetres" }] },
      { prompt: "Each of Dad's big steps is about one metre. How many steps long is the bed? So about how many metres?" },
      { prompt: "About how tall are you?", say: "About how tall is a child?", options: [{ label: "120 centimetres" }, { label: "12 centimetres" }, { label: "12 metres" }] },
      { prompt: "The bus is 10 metres, the car 4 metres and the bicycle 2 metres. Which is longest?" },
      { text: "Make a metre:", list: ["Use a ruler to cut a piece of string 100 centimetres (one metre) long.", "Measure with the string: how many metres long are the table and the bed?", "Guess which things are longer than a metre, then try."] }
    ] },
    "math-sapling-32": { title: "The bar model: parts and whole", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Narges has 45 beads. We draw one bar for all the beads: 45." }, { caption: "18 are red. We mark off a piece of the bar for the red ones." },
          { caption: "The rest are blue. How many? We don't know this piece: a question mark." }, { caption: "Whole minus part: 45 − 18 = 27. Twenty-seven beads are blue." }],
        question: "If we know the whole and one part, how do we find the other part?", options: [{ label: "whole minus part" }, { label: "whole plus part" }] },
      { prompt: "There are 32 children in the class. 15 are girls. How many are boys?", bars: [{ label: "children" }] },
      { prompt: "Maryam has 24 stamps and Arash has 19. How many do they have altogether?", bars: [{ label: "stamps" }] },
      { prompt: "A bag has 50 walnuts. We cracked 23. How many are not cracked? First put the numbers in their places.", bars: [{ label: "walnuts" }] },
      { prompt: "A shelf has 36 storybooks and 28 science books. How many books altogether?", bars: [{ label: "books" }] }
    ] },
    "math-sapling-33": { title: "The bar model: comparing", steps: [
      { prompt: "Ali has 35 marbles and Sara has 23. How many more does Ali have?", bars: [{ label: "Ali" }, { label: "Sara" }] },
      { prompt: "The walnut tree gave 42 walnuts and the almond tree 17 fewer almonds. How many did the almond tree give?", bars: [{ label: "walnuts" }, { label: "almonds" }] },
      { prompt: "In a “how many more?” problem, what do we do?", say: "In a how many more problem, what do we do?", options: [{ label: "the big number minus the small number" }, { label: "add the two numbers" }] },
      { prompt: "Kian has 28 cards. His sister has 15 more. How many does his sister have?", bars: [{ label: "Kian" }, { label: "sister" }] },
      { prompt: "One hen laid 60 eggs and another 45. How many more did the first lay?", say: "One hen laid sixty eggs and another forty-five. How many more did the first lay?" },
      { prompt: "Ali has 30 tomans and Reza 18. How much more does Ali have? Which model fits the problem?",
        models: [{ bars: [{ label: "Ali" }, { label: "Reza" }] }, { bars: [{ label: "all" }] }] }
    ] },
    "math-sapling-34": { title: "The unknown number", steps: [
      { prompt: "□ + 18 = 45 : one pan has a box and 18. Put weights on until the balance is level and makes 45.", left: [{ say: "box" }, null], question: "How much is the box?" },
      { prompt: "Find it by taking away: 45 − 18. Then check by adding.", say: "What number plus eighteen makes forty-five?" },
      { prompt: "52 − □ = 20 : how many did we take from 52 to leave 20?" },
      { prompt: "We took 15 from a number and 30 were left. What was the number?", say: "What number minus fifteen makes thirty?" },
      { prompt: "□ + 26 = 60 : what is the other part?" },
      { prompt: "What number goes in the □?", say: "Seventy equals what number plus forty-five?" }
    ] },
    "math-sapling-35": { title: "Two-step problems", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Mum had 50 thousand tomans. This bar is all her money." }, { caption: "She bought bread for 15 thousand tomans and fruit for 20 thousand." },
          { caption: "Step one: how much did she spend? 15 + 20 = 35." }, { caption: "Step two: how much is left? 50 − 35 = 15." }],
        question: "How much money does Mum have left? (thousand tomans)" },
      { prompt: "Reza had 80 thousand tomans. He bought a book for 35 thousand and a notebook for 15 thousand. How much is left?", bars: [{ label: "money" }], result: "35 + 15 = 50; 80 − 50 = 30" },
      { prompt: "There were 25 people on the bus. At the stop 8 got off and 12 got on. How many are there now?", say: "There were twenty-five people on the bus. At the stop eight got off and twelve got on. How many are there now?" },
      { prompt: "Sima had 42 sheets of paper and Mina 18 fewer. How many sheets do they have altogether? (First find Mina's)", bars: [{ label: "Sima" }, { label: "Mina" }], result: "42 − 18 = 24; 42 + 24 = 66" },
      { prompt: "Grandpa had 60 walnuts. He gave 20 to his grandchildren and cracked 15. How many are left?", say: "Grandpa had sixty walnuts. He gave twenty to his grandchildren and cracked fifteen. How many are left?" }
    ] },
    "math-sapling-36": { title: "Quarters and five minutes", steps: [
      { prompt: "Each number the long hand passes is five minutes. Look: 5, 10, 15. It is quarter past 4.", say: "Each number the long hand passes is five minutes. Five, ten, fifteen. It is quarter past four." },
      { prompt: "What time is it? (quarter to 8)" },
      {},
      { prompt: "The school bus comes at 9:20. Put the long hand on 4." },
      { prompt: "When the long hand is on 6, how many minutes past the hour is it?", say: "When the long hand is on six, how many minutes past the hour is it?" },
      { prompt: "The bakery is busy at this time. What time is it?" },
      { prompt: "Show 6:35." }
    ] },
    "math-sapling-37": { title: "The calendar", steps: [
      { prompt: "How many months does our year have?", say: "How many months does the year have?" },
      { prompt: "Put the months of summer and autumn in order", say: "Tir, Mordad, Shahrivar, Mehr, Aban, Azar. Put them in order.",
        items: [{ label: "Tir" }, { label: "Mordad" }, { label: "Shahrivar" }, { label: "Mehr" }, { label: "Aban" }, { label: "Azar" }] },
      { prompt: "How many days do the first six months of the year have?", say: "From Farvardin to Shahrivar, how many days does each month have?" },
      { prompt: "Today is Tuesday 5 Mehr. What day is it one week later?", say: "Today is Tuesday the fifth of Mehr. What day is it one week later?",
        options: [{ label: "Tuesday 12 Mehr" }, { label: "Wednesday 6 Mehr" }, { label: "Tuesday 10 Mehr" }] },
      { prompt: "Nowruz is the first day of which month?", say: "Nowruz is the first day of which month?", options: [{ label: "Farvardin" }, { label: "Mehr" }, { label: "Dey" }] },
      { prompt: "Houman's birthday is 18 Aban and today is 10 Aban. How many days are left?", say: "Houman's birthday is the eighteenth of Aban and today is the tenth of Aban. How many days are left?" },
      { text: "With the calendar at home:", list: ["Find today's date: the day, the month and the year.", "Find your birthday and a family member's on the calendar. How many days are left?", "Count how many Fridays this month has."] }
    ] },
    "math-sapling-38": { title: "Kilograms and grams", steps: [
      { prompt: "How many grams are in a kilogram?", say: "How many grams are in a kilogram?" },
      { prompt: "Weigh the watermelon with kilogram weights.", left: [{ say: "watermelon" }], question: "How many kilograms is the watermelon?" },
      { prompt: "Weigh the butter with gram weights.", left: [{ say: "butter" }], question: "How many grams is the butter?" },
      { prompt: "Which do we weigh in grams?", say: "Which do we weigh in grams? A bag of rice, a packet of saffron, or a sheep?" },
      { prompt: "A 2 kilogram box and a 1500 gram bag. Which is heavier? (2 kilograms is 2000 grams)",
        left: [{ label: "2 kg", say: "two kilogram box" }], right: [{ label: "1500 g", say: "fifteen hundred gram bag" }] },
      { prompt: "How many grams is half a kilo of tomatoes?", say: "How many grams is half a kilo of tomatoes?" },
      { prompt: "A 3 kilogram bag of rice and a 2 kilogram bag. How many kilograms altogether?", say: "A three kilogram bag of rice and a two kilogram bag. How many kilograms altogether?" }
    ] },
    "math-sapling-39": { title: "Litres", steps: [
      { prompt: "About how much does a big bottle of water hold?", say: "About how much does a big bottle of water hold?", options: [{ label: "1 litre" }, { label: "100 litres" }, { label: "1 spoon" }] },
      { prompt: "Which holds more than a litre?", say: "Which holds more than a litre? A tea glass, a bucket or a spoon?" },
      { prompt: "How many millilitres are in a litre?", say: "How many millilitres are in a litre?" },
      { prompt: "A jug holds 2 litres of water. How many half-litre glasses does it fill?", say: "A jug holds two litres of water. How many half-litre glasses does it fill?" },
      { prompt: "A kettle has 3 litres of water. We used 1 litre for tea. How many litres are left?", say: "A kettle has three litres of water. We used one litre for tea. How many litres are left?" },
      { prompt: "About how much water does a bathtub hold?", say: "About how much water does a bathtub hold?", options: [{ label: "2 litres" }, { label: "200 litres" }, { label: "20000 litres" }] },
      { text: "See a litre:", list: ["Find a one-litre bottle of water (it says so on the label).", "Pour it into glasses. How many glasses is a litre?", "Guess how many litres the kettle or a pot holds, then try with the bottle."] }
    ] },
    "math-sapling-40": { title: "Place value to a thousand", steps: [
      { prompt: "What number is this? 3 packs of a hundred, 4 bundles of ten and 5 ones." },
      { prompt: "What number goes in the ?", say: "Three hundred and forty-five equals three hundred plus forty plus what?" },
      { prompt: "Make 208: two packs of a hundred, no bundles of ten, and eight ones." },
      { prompt: "What does the 0 in 607 tell us?", say: "What does the zero in six hundred and seven tell us?", options: [{ label: "it has no tens" }, { label: "it has no hundreds" }, { label: "the number is zero" }] },
      { prompt: "How do we write “four hundred and ninety-two”?", say: "How do we write four hundred and ninety-two?" },
      { prompt: "560 and another pack of a hundred. How many is that?" },
      { prompt: "What is one more than 899?", say: "Eight hundred and ninety-nine plus one." },
      { prompt: "The frog is on 10 and jumps ten squares forward. Where does it land?", say: "The frog is on ten and jumps ten squares forward." }
    ] },
    "math-sapling-41": { title: "Adding three-digit numbers", steps: [
      { prompt: "With packs: 245 + 132. Hundreds with hundreds, tens with tens, ones with ones." },
      { prompt: "Now write it in columns. Start with the ones." },
      { prompt: "368 + 254: the ones make ten and make a bundle; the tens make ten too and make a pack of a hundred." },
      { prompt: "Add in columns. One goes to the tens, one to the hundreds." },
      { prompt: "First guess: 500 and 200. About how much is the answer?", say: "Four hundred and ninety-eight plus two hundred and three. About how much is it?" },
      { prompt: "Now work it out exactly. Is it close to your guess?" },
      { prompt: "Another sum: work it out in columns." }
    ] },
    "math-sapling-42": { title: "Taking away three-digit numbers", steps: [
      { prompt: "With packs: 465 − 132." },
      { prompt: "Take away in columns. Start with the ones." },
      { prompt: "352 − 128: there aren't enough ones, so we open a bundle of ten." },
      { prompt: "In columns: borrow a ten." },
      { prompt: "403 − 178: there are no tens! First we open a pack of a hundred, then a bundle of ten." },
      { prompt: "In columns: you can't borrow from zero, so we borrow from the hundreds." },
      { prompt: "Work it out and check by adding.", say: "Six hundred minus two hundred and forty-five." }
    ] },
    "math-sapling-43": { title: "The three-digit numbers game", steps: [
      { prompt: "Put them in order from smallest to biggest", say: "Put these numbers in order from smallest to biggest." },
      { prompt: "Match each number with its expanded form", say: "Match each number with its expanded form." },
      { prompt: "Which answers are more than 500?", say: "Ones whose answer is more than five hundred in one basket, the rest in the other. Guess first.", baskets: [{ label: "more than 500" }, { label: "less than 500" }] },
      { say: "Turn the cards over two at a time. Match each one with its answer." },
      { prompt: "Put them in order from biggest to smallest", say: "Put these numbers in order from biggest to smallest." }
    ] }
  });
  var YN = [{ label: "yes" }, { label: "no" }];
  Object.assign(B.EN, {
    "math-sapling-44": { title: "Polygons", steps: [
      { prompt: "A shape closed in by straight sides is a polygon. Its name comes from its number of sides: three sides (a triangle), four sides, a pentagon, a hexagon." },
      { prompt: "How many sides does this shape have?" },
      { prompt: "How many corners (vertices) does this shape have?" },
      { prompt: "Which one is the hexagon?", say: "Which one is the hexagon? Count the sides." },
      { prompt: "Sort the shapes by their number of sides", say: "Separate the pentagons, hexagons and octagons.", baskets: [{ label: "5 sides" }, { label: "6 sides" }, { label: "8 sides" }], items: [{}, {}, {}, { say: "stop sign" }] },
      { prompt: "What shape are the cells of a honeycomb?", say: "What shape are the cells of a honeycomb?", options: [{ label: "hexagon" }, { label: "circle" }, { label: "triangle" }] },
      { prompt: "Which one is not a polygon?", say: "Which one is not a polygon? Remember: the sides must be straight and the shape closed." }
    ] },
    "math-sapling-45": { title: "Right angles", steps: [
      { prompt: "The corners of a square are “right angles”, like the corner of a book or a sheet of paper. How many right angles does a square have?" },
      { prompt: "How many right angles does a rectangle have?" },
      { prompt: "Does this triangle have a right angle?", options: YN },
      { prompt: "Which one has a right angle?", say: "Which one has a right angle? A book, a ball or the moon?" },
      { prompt: "Which shape has no right angles at all?" },
      { prompt: "A corner sharper than a right angle. What do we call it?", say: "A corner that is sharper and narrower than a right angle: what do we call it?", options: [{ label: "acute" }, { label: "obtuse" }] },
      { text: "Make a right-angle checker:", list: ["Fold a sheet of paper twice (in half, then in half again). The folded corner is a right angle.", "Use it to find right angles at home: a table, a door, a tile.", "Find a corner sharper than a right angle, and one wider."] }
    ] },
    "math-sapling-46": { title: "Quadrilaterals", steps: [
      { prompt: "These are all quadrilaterals: a square, a rectangle, a rhombus, a parallelogram and a trapezium." },
      { prompt: "Which one is the rhombus? (four equal sides, but the corners are not right angles)" },
      { prompt: "Which one is the trapezium? (only two sides are parallel)" },
      { prompt: "Which one is the parallelogram? (opposite sides parallel, slanted corners)" },
      { prompt: "Four right angles or not?", say: "Quadrilaterals with four right angles in one basket, the rest in the other.", baskets: [{ label: "4 right angles" }, { label: "has a slanted corner" }] },
      { prompt: "Is a square a rectangle too? (it has four right angles)", options: YN }
    ] },
    "math-sapling-47": { title: "Faces, edges, vertices", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "This is a cube. We call its flat surfaces “faces”. We can see three faces: the front, the top and the side." },
          { caption: "Three more faces are at the back of the cube. So a cube has six faces." },
          { caption: "Where two faces meet is an “edge”. A cube has twelve edges. The edges at the back are dashed." },
          { caption: "The corners are “vertices”. A cube has eight vertices; one is at the back and can't be seen." }],
        question: "How many faces does a cube have?" },
      { prompt: "How many vertices does a cube have?", say: "How many vertices does a cube have?" },
      { prompt: "How many edges does a cube have?", say: "How many edges does a cube have?" },
      { prompt: "How many faces does a shoe box (a cuboid) have?", say: "How many faces does a shoe box have?" },
      { prompt: "Which solid has no vertices at all?", say: "Which solid has no vertices at all?" },
      { prompt: "A pyramid with a square base: 1 face at the bottom and 4 triangle faces around it. How many faces altogether?", say: "A pyramid with a square base. One face at the bottom and four triangle faces around it. How many faces altogether?" },
      { text: "With a box:", list: ["Take a box. Count its faces and stick a piece of paper on each one.", "Run your finger along the edges and count them.", "Count the vertices. Are the numbers the same as a cube's?"] }
    ] },
    "math-sapling-48": { title: "Symmetry", steps: [
      { prompt: "If we fold this shape along a line and the two halves fit exactly, that line is a “line of symmetry”. Find the butterfly's line of symmetry." },
      { prompt: "How many lines of symmetry does a rectangle have? Find them all." },
      { prompt: "Colour the other half of this tile pattern so that both sides of the line are the same." },
      { prompt: "Find the heart's line of symmetry." },
      { prompt: "How many lines of symmetry does a circle have?", say: "Fold a circle along any line through its middle and the two halves fit. How many lines of symmetry does a circle have?", options: [{ label: "2" }, { label: "4" }, { label: "endless" }] },
      { prompt: "How many lines of symmetry does a square have? Find them all." },
      { prompt: "A carpet flower: colour its other half." }
    ] },
    "math-sapling-49": { title: "Squares on a grid", steps: [
      { prompt: "Each square is found by its column and row: first the column (from the left), then the row (from the bottom). Find the square in column 3, row 2." },
      { prompt: "Find the square in column 5, row 4." },
      { prompt: "Which square is the apple in?", options: [{ label: "column 2, row 4" }, { label: "column 4, row 2" }] },
      { prompt: "Take the tortoise to the lettuce: three squares right and two up." },
      { prompt: "The car faces up. Turn it a quarter turn so it faces right." },
      { say: "Walk with Negar.", tasks: [{ prompt: "Go straight on from the park gate to the fountain, then turn and go to the slide." }] }
    ] },
    "math-sapling-50": { title: "The rule of a pattern", steps: [
      { prompt: "The rule: 3 more each time. Fill it in", say: "Start at four, three more each time." },
      { prompt: "What is the rule of this pattern?", say: "Five, ten, twenty, forty. What is the rule of this pattern?", options: [{ label: "5 more each time" }, { label: "double each time" }, { label: "10 more each time" }] },
      { prompt: "The rule: 4 less each time. Fill it in", say: "Thirty, twenty-six, … four less each time." },
      { prompt: "What comes next?", say: "A hundred, ninety, eighty, what next?" },
      { prompt: "These numbers go even, odd in turn. Is the next number even or odd?", say: "Two, five, eight, eleven. The next number is fourteen. Is it even or odd?", options: [{ label: "even" }, { label: "odd" }] },
      { prompt: "Find the rule yourself and fill it in", say: "Find the rule and fill in the gaps." }
    ] },
    "math-sapling-51": { title: "Shape patterns", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "One square with 4 matches." }, { caption: "Two squares: 3 more matches. 7 matches altogether." }, { caption: "Three squares: 3 more again. 10 matches." }, { caption: "Four squares: 13 matches. Each new square needs 3 matches." }],
        question: "How many matches do five squares need?" },
      { prompt: "Number of matches: 4, 7, 10, … fill it in", say: "Four, seven, ten, … three more each time." },
      { prompt: "If we want to make 10 squares, which way is right?", say: "If we want to make ten squares, how do we find the number of matches?",
        options: [{ label: "4 and 9 lots of 3: 31" }, { label: "10 lots of 4: 40" }, { label: "10 lots of 3: 30" }] },
      { prompt: "The shape pattern: what comes next?", say: "Triangle, square, pentagon, … one more side each time. What next?" },
      { prompt: "2 triangles are added each time. How many triangles does the fifth shape have?", say: "One, three, five triangles. Two more each time. How many triangles does the fifth shape have?" },
      { prompt: "Towers of cubes: 1, 3, 6, 10, … (one more is added each time than the time before)", say: "One, three, six, ten. First two were added, then three, then four. What next?" }
    ] },
    "math-sapling-52": { title: "Four-digit numbers", steps: [
      { prompt: "Ten packs of a hundred make a box of a thousand. What is this?" },
      { prompt: "2 boxes of a thousand, 3 packs of a hundred, 4 bundles of ten and 5 ones. What is it?" },
      { prompt: "What number goes in the ?", say: "Four thousand and sixty-eight. How many hundreds?" },
      { prompt: "How do we write “three thousand five hundred and seven”?", say: "How do we write three thousand five hundred and seven?" },
      { prompt: "Make 1203: one box of a thousand, two packs of a hundred, no bundles of ten, and three ones." },
      { prompt: "One more than 5999?", say: "Five thousand nine hundred and ninety-nine plus one." },
      { prompt: "What is the 7 in this number worth?", say: "What is the seven in seven thousand two hundred and thirty-eight worth?" }
    ] },
    "math-sapling-53": { title: "Comparing and ordering to ten thousand", steps: [
      {}, {}, {},
      { prompt: "On the number line, the bigger number is to the right. Two squares right from 18: which number?", say: "The frog is on eighteen and jumps two squares to the right." },
      { prompt: "Put them in order from smallest to biggest", say: "Put these numbers in order from smallest to biggest. Compare the thousands first." },
      { prompt: "Put them in order from biggest to smallest", say: "Put them in order from biggest to smallest." },
      {}
    ] },
    "math-sapling-54": { title: "Rounding", steps: [
      { prompt: "14 is between 10 and 20. Look: 15 is exactly in the middle. The frog jumps one square from 14: does it reach the middle?", say: "Fourteen is between ten and twenty. Fifteen is exactly in the middle." },
      { show: "14 ← 10 or 20?", prompt: "Which ten is 14 closer to?", say: "Is fourteen closer to ten or twenty?" },
      { prompt: "Round 67 to the nearest ten.", say: "Round sixty-seven to the nearest ten." },
      { prompt: "35 is exactly between 30 and 40. The rule: we round the middle ones up.", say: "Thirty-five is exactly in the middle. We round the middle ones up. What does it make?" },
      { prompt: "Round 428 to the nearest hundred.", say: "Round four hundred and twenty-eight to the nearest hundred." },
      { prompt: "Round 3680 to the nearest thousand.", say: "Round three thousand six hundred and eighty to the nearest thousand." },
      { prompt: "Guess by rounding: about how much?", say: "Three hundred and ninety-eight plus two hundred and ten. Guess by rounding." }
    ] },
    "math-sapling-55": { title: "Adding and taking away four-digit numbers", steps: [
      { prompt: "First guess: 2500 and 1300.", say: "Two thousand four hundred and eighty plus one thousand three hundred and fifteen. About how much?" },
      { prompt: "Now add in columns, from the ones." },
      { prompt: "Add in columns. Watch the carries." },
      { prompt: "Take away in columns." },
      { prompt: "7005 − 2368: zeros! Borrow from the thousands." },
      { prompt: "Check: which sum checks the answer?", say: "Check: which sum checks this take-away?" }
    ] },
    "math-sapling-56": { title: "Equal parts", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We have one sangak bread and three plates, for three children." }, { caption: "We cut the bread into three equal pieces." },
          { caption: "One piece on each plate: each plate has one third of the bread." }],
        question: "If the pieces are not equal, are the shares fair?", options: YN },
      { prompt: "Which one is cut into three equal pieces?" },
      { prompt: "Cut this chocolate bar into three equal pieces." },
      { prompt: "This cake is cut into six equal pieces. Colour one sixth of it." },
      { prompt: "Which one is cut into eight equal pieces?" },
      { prompt: "Cut the sangak into equal pieces for four people." }
    ] },
    "math-sapling-57": { title: "Numerator and denominator", steps: [
      { prompt: "A fraction has two numbers: the bottom one (the denominator) says how many equal pieces the whole is cut into; the top one (the numerator) says how many pieces we take. What fraction is coloured?" },
      { prompt: "What fraction is coloured?" },
      { prompt: "Colour five eighths: the whole is eight pieces, colour five." },
      { prompt: "In the fraction “three quarters”, what is the denominator?", say: "In the fraction three quarters, what is the denominator?" },
      { prompt: "What fraction is coloured?" },
      { prompt: "We cut a pizza into 8 pieces and ate 3. What fraction of the pizza did we eat?", say: "We cut a pizza into eight pieces and ate three. What fraction did we eat?",
        options: [{ label: "three eighths" }, { label: "eight thirds" }, { label: "five eighths" }] },
      { prompt: "All the pieces are coloured. What fraction? (four quarters means one whole)" }
    ] },
    "math-sapling-58": { title: "A fraction of a group", steps: [
      { prompt: "Share eight sweets equally between two people. How many is half of eight?", result: "Half of 8 is 4." },
      { prompt: "Twelve hazelnuts between three people. How many is a third of twelve?", result: "A third of 12 is 4." },
      { prompt: "What is a quarter of 20 tomans?", say: "Split twenty tomans into four equal parts. How much is one part?" },
      { prompt: "Ten biscuits between five people. How many is a fifth of ten?", result: "A fifth of 10 is 2." },
      { prompt: "We have six sheep. Half of them are black. How many sheep are black?", say: "We have six sheep. Half of them are black. How many sheep are black?" },
      { prompt: "What is three quarters of 12? (first find a quarter)", say: "What is three quarters of twelve? First find a quarter: three. Then three of them." }
    ] },
    "math-sapling-59": { title: "Fractions on the number line", steps: [
      { prompt: "We have cut the space from zero to one into two equal parts. Find one half on the line." },
      { prompt: "This time four equal parts. Find three quarters." },
      { prompt: "What fraction is this point?" },
      { prompt: "Cut the space from zero to one into three equal parts." },
      { prompt: "Now we go up to 2. Find four thirds (one and one third)." },
      { prompt: "Where is one half on the line?", say: "Where is one half on the line?", options: [{ label: "exactly in the middle" }, { label: "near zero" }, { label: "after one" }] }
    ] },
    "math-sapling-60": { title: "Which fraction is bigger?", steps: [
      { prompt: "Name this fraction. Then we compare it with a quarter." },
      { prompt: "Is one half bigger or one quarter? (the more pieces, the smaller each piece)", say: "Is one half of a bread bigger, or one quarter of the same bread?", options: [{ label: "one half" }, { label: "one quarter" }] },
      { prompt: "Three eighths or five eighths? Which is bigger? (the pieces are the same size)", say: "Three eighths or five eighths? Which is bigger?", options: [{ label: "three eighths" }, { label: "five eighths" }] },
      { prompt: "Colour two thirds. Then say if it is more or less than a half." },
      { prompt: "Is two thirds more or less than a half?", say: "Is two thirds more or less than a half?", options: [{ label: "more" }, { label: "less" }] },
      { prompt: "One sixth or one third? Which is smaller?", say: "One sixth or one third? Which is smaller?", options: [{ label: "one sixth" }, { label: "one third" }] }
    ] },
    "math-sapling-61": { title: "Equal fractions", steps: [
      { prompt: "Look at the fraction strips: one half is the same size as two quarters. Find two quarters on the line." },
      { prompt: "Colour two quarters. Look: it is the same as a half." },
      { prompt: "Which one equals one half?", say: "Which one equals one half?", options: [{ label: "two quarters" }, { label: "one quarter" }, { label: "two thirds" }] },
      { prompt: "One third is the same size as two sixths. Find two sixths." },
      { prompt: "Colour four eighths. Is it equal to a half?" },
      { prompt: "Which one equals two thirds?", say: "Which one equals two thirds?", options: [{ label: "four sixths" }, { label: "two sixths" }, { label: "three thirds" }] }
    ] },
    "math-sapling-62": { title: "The fractions game", steps: [
      { say: "Turn the cards over two at a time. Match the equal fractions.",
        pairs: [[{ label: "one half", say: "one half" }, { label: "two quarters", say: "two quarters" }], [{ label: "one third", say: "one third" }, { label: "two sixths", say: "two sixths" }], [{ label: "four quarters", say: "four quarters" }, { label: "one whole", say: "one whole" }]] },
      { prompt: "Put them in order from smallest to biggest", say: "One eighth, one quarter, one half, one whole. Put them in order from smallest to biggest.",
        items: [{ label: "one eighth", say: "one eighth" }, { label: "one quarter", say: "one quarter" }, { label: "one half", say: "one half" }, { label: "one whole", say: "one whole" }] },
      { prompt: "Less than a half or more than a half?", say: "Fractions less than a half in one basket, more than a half in the other.", baskets: [{ label: "less than a half" }, { label: "more than a half" }],
        items: [{ label: "one quarter" }, { label: "three quarters" }, { label: "one sixth" }, { label: "two thirds" }, { label: "two eighths" }, { label: "five eighths" }] },
      { prompt: "Match each fraction with its meaning", say: "Match each fraction with its meaning.",
        pairs: [[{ label: "three quarters" }, "3 of 4 pieces"], [{ label: "two fifths" }, "2 of 5 pieces"], [{ label: "one eighth" }, "1 of 8 pieces"]] },
      { prompt: "Put them in order from smallest to biggest (eighths)", say: "One eighth, three eighths, five eighths, seven eighths. Put them in order from smallest to biggest.",
        items: [{ label: "one eighth" }, { label: "three eighths" }, { label: "five eighths" }, { label: "seven eighths" }] }
    ] }
  });
  var PA = [{ label: "perimeter" }, { label: "area" }];
  var CPI = [{ label: "certain" }, { label: "possible" }, { label: "impossible" }];
  Object.assign(B.EN, {
    "math-sapling-63": { title: "Arrays", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We set out chairs for the school show: row by row, four chairs in each row." },
          { caption: "Three rows of four: four, eight, twelve. We call this an array: 3 × 4 = 12." }],
        question: "If we put out one more row, how many chairs will there be?" },
      { prompt: "Two rows of five apples. How many altogether?" },
      { prompt: "Turn the array: is 3 × 4 the same as 4 × 3? Then say how many." },
      { prompt: "Make an array of four rows of three." },
      { prompt: "We write repeated adding as multiplying. Is this right?", say: "Five plus five plus five equals three times five. Is it right?", options: TF },
      { prompt: "Arrange six counters as an array. Any array that works." }
    ] },
    "math-sapling-64": { title: "Times 2, 5 and 10", steps: [
      { prompt: "Four pairs of socks. Count in twos: 4 × 2 = ?" },
      { prompt: "In twos: 2, 4, … the frog jumps two squares from 4. What is 3 × 2?", say: "The frog is on four and jumps two squares. What is three times two?" },
      { prompt: "Three hands, five fingers each: 3 × 5 = ?" },
      { prompt: "Fives seven times: 5, 10, 15, … The answer?", say: "Seven times five." },
      { prompt: "How many are six bundles of ten?", say: "Six times ten." },
      { prompt: "What is double nine?", say: "Nine times two." },
      { prompt: "It is half of 8 × 10. The answer?", say: "Eight times five. It is half of eight times ten." }
    ] },
    "math-sapling-65": { title: "Times 4, 3 and 6", steps: [
      { prompt: "Times 4 means double, then double again: 2 × 6 = 12, so 4 × 6 = 24. Count and see." },
      { prompt: "2 × 7 = 14. Double it?", say: "Four times seven. Two times seven is fourteen. What is double that?" },
      { prompt: "Times 3: three rows of six. How many?" },
      { prompt: "Split 6 × 4 into two pieces: 5 × 4 and 1 × 4. Tap the line between the fifth and sixth rows.", question: "What is 6 × 4?" },
      { prompt: "3 × 7 = 21. Six is double three. The answer?", say: "Six times seven. Three times seven is twenty-one. Double it?" },
      { prompt: "The answer?", say: "Three times eight." },
      { prompt: "The answer?", say: "Six times six." }
    ] },
    "math-sapling-66": { title: "Times 9, 8 and 7", steps: [
      { prompt: "9 × 6 = 10 × 6 minus one row. Or: 5 × 6 and 4 × 6. Tap between the fifth and sixth rows.", question: "What is 9 × 6?" },
      { prompt: "10 × 7 = 70. Take away one seven. The answer?", say: "Nine times seven. Ten sevens are seventy. Take away one seven." },
      { prompt: "4 × 6 = 24. Double it?", say: "Eight times six. Four times six is twenty-four. Double it?" },
      { prompt: "7 × 8 = 5 × 8 + 2 × 8. Tap between the fifth and sixth rows.", question: "What is 7 × 8?" },
      { prompt: "The answer?", say: "Nine times nine." },
      { prompt: "The answer?", say: "Seven times seven." },
      { prompt: "The answer?", say: "Eight times eight." }
    ] },
    "math-sapling-67": { title: "Times zero and one", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Four plates, one apple on each plate: 4 × 1 = 4. Times one gives the number itself." },
          { caption: "The children ate the apples. Now four plates with zero apples each: 4 × 0 = 0." }],
        question: "What is 7 × 0?" },
      { prompt: "The answer?", say: "Nine times one." },
      { prompt: "Zero lots of five: the answer?", say: "Zero times five." },
      { prompt: "One lot of eight. The answer?", say: "One times eight." },
      { prompt: "We have three bags and none has any apples. How many apples altogether?", say: "We have three bags and none of them has any apples. How many apples altogether?" },
      { prompt: "Even for a big number: the answer?", say: "A hundred and twenty-three times one." }
    ] },
    "math-sapling-68": { title: "The times table", steps: [
      { prompt: "The 3 column of the times table: fill it in", say: "Three, six, nine, … fill in the gaps." },
      { prompt: "Find 4 × 6 and 6 × 4 in the times table. What do you see?", say: "Four times six and six times four. Are they the same?", options: [{ label: "both 24" }, { label: "they are different" }] },
      { prompt: "The 9 column: the tens digit goes up by one, the ones down by one. Fill it in", say: "Nine, eighteen, twenty-seven, … fill it in." },
      { prompt: "What digit do the answers in the 5 column always end in?", say: "What digit do the answers of times five always end in?", options: [{ label: "0 or 5" }, { label: "2 or 4" }, { label: "any digit" }] },
      { prompt: "The 6 column: fill it in", say: "Six, twelve, eighteen, … fill it in." },
      { prompt: "Is the 2 column even or odd?", say: "Are the answers of times two even or odd?", options: [{ label: "all even" }, { label: "all odd" }] },
      { prompt: "Remember it from the table.", say: "Seven times six." }
    ] },
    "math-sapling-69": { title: "The times table game", steps: [
      { say: "Turn the cards over two at a time. Match each multiplication with its answer." },
      { prompt: "Which make 24? Which make 36?", say: "Put each multiplication in the basket of its answer." },
      { prompt: "The 8 column: fill it in", say: "Eight, sixteen, … fill it in." },
      { say: "Turn the cards over two at a time. Match each multiplication with its answer." },
      { prompt: "Is the answer even or odd?", say: "Put each multiplication in the even or odd basket.", baskets: [{ label: "even" }, { label: "odd" }] },
      { prompt: "The 7 column: fill it in", say: "Seven, fourteen, … fill it in." }
    ] },
    "math-sapling-70": { title: "Dividing: equal shares", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We share twelve sweets equally between three people: one to this one, one to that one, one to the third, and round again." },
          { caption: "Each plate has four sweets. Twelve divided by three is four: 12 ÷ 3 = 4." }],
        question: "If we share the same 12 sweets between 4 people, how many does each get?" },
      { prompt: "Share fifteen biscuits equally between three people." },
      { prompt: "Share eighteen apples between six people. How many does each get?", say: "Eighteen divided by six." },
      { prompt: "Twenty carrots between four rabbits." },
      { prompt: "The answer?", say: "Twenty-four divided by four." },
      { prompt: "The answer?", say: "Thirty-five divided by five." }
    ] },
    "math-sapling-71": { title: "Dividing: how many groups?", steps: [
      { prompt: "We put 20 eggs into boxes of five. How many boxes are filled? (20 ÷ 5)", question: "How many rows of five are there?" },
      { prompt: "From zero we jump in threes: 3, 6, 9, 12. 12 ÷ 3 means how many jumps? (first watch one jump of three)", say: "The frog jumps three squares from zero." },
      { prompt: "12 ÷ 3: how many jumps of three from zero to 12?", say: "Twelve divided by three. Three, six, nine, twelve. How many jumps?" },
      { prompt: "Arrange 18 counters in rows of six. How many rows?", question: "What is 18 ÷ 6?" },
      { prompt: "We put 30 loaves in bags of ten. How many bags?", say: "Thirty divided by ten." },
      { prompt: "How many sevens are in 28?", say: "Twenty-eight divided by seven." }
    ] },
    "math-sapling-72": { title: "Multiplying and dividing, one family", steps: [
      { prompt: "Which division can we tell from this multiplication?", say: "Four times six, twenty-four. Which division is right?" },
      { prompt: "What number goes in the □?", say: "Three times what number makes twenty-one?" },
      { prompt: "Which are from the family of 5, 8 and 40?", say: "Sentences from the family of five, eight and forty in one basket, the rest in the other.", baskets: [{ label: "in the family" }, { label: "no" }] },
      { prompt: "What number goes in the □? (check by multiplying)", say: "What number divided by four makes nine?" },
      { prompt: "Think of multiplying: six times what makes 54?", say: "Fifty-four divided by six. Six times what makes fifty-four?" },
      { prompt: "Which make 6? Which make 8?", say: "Put each division in the basket of its answer." }
    ] },
    "math-sapling-73": { title: "Remainders", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We share fourteen walnuts equally between three people. Each one got four." },
          { caption: "Two walnuts are left. There aren't enough for everyone, so we put them in the bowl: remainder two." },
          { caption: "14 ÷ 3 = 4, remainder 2. The remainder is always less than the number of people." }],
        question: "If we share 16 walnuts between 3 people, how many are left over?" },
      { prompt: "Eleven biscuits between two people. How many are left over?" },
      { prompt: "How many does each get and how many are left over?", say: "Seventeen divided by five.", options: ["3, remainder 2", "2, remainder 7", "4, remainder 3"], answer: "3, remainder 2" },
      { prompt: "Twenty-two carrots between four rabbits." },
      { prompt: "25 people want to go on a trip in cars for 4. How many cars are needed?", say: "Twenty-five people want to go in cars for four. How many cars are needed? Think about the remainder." }
    ] },
    "math-sapling-74": { title: "Multiplying and dividing problems", steps: [
      { prompt: "Watch and listen", parts: { rl: { art: "tag:Reza" }, nl: { art: "tag:Narges" } },
        scenes: [{ caption: "Reza has 8 stamps. The blue bar is Reza's stamps." }, { caption: "Narges has three times as many stamps as Reza: three bars the size of Reza's." },
          { caption: "Three eights: 3 × 8 = 24. Narges has 24 stamps." }],
        question: "How many stamps do they have altogether? (8 + 24)" },
      { prompt: "A book costs 6 thousand tomans. How much do 4 books cost?", bars: [{ label: "4 books" }] },
      { prompt: "We put 20 pencils into 5 boxes equally. How many pencils are in each box?", bars: [{ label: "pencils" }] },
      { prompt: "Sara has 5 flowers and Mina 4 times as many. How many flowers does Mina have?", bars: [{ label: "Sara" }, { label: "Mina" }] },
      { prompt: "32 people sit in 4 equal rows. How many are in each row?", bars: [{ label: "32 people" }] }
    ] },
    "math-sapling-75": { title: "The multiplying and dividing game", steps: [
      { prompt: "Match each multiplication with the division from its family", say: "Match each multiplication with the division from the same family." },
      { prompt: "Multiplying or dividing?", say: "Put each story in the multiplying or dividing basket.", baskets: [{ label: "multiply" }, { label: "divide" }],
        items: [{ label: "5 bags, 6 apples each", say: "Five bags, six apples in each. How many altogether?" }, { label: "18 pencils between 3", say: "Eighteen pencils between three people. How many each?" },
          { label: "4 rows of 7", say: "Four rows of seven. How many?" }, { label: "30 eggs in trays of 10", say: "Thirty eggs in trays of ten. How many trays?" }] },
      { say: "Turn the cards over two at a time. Match each one with its answer." },
      { prompt: "Remainder or not?", say: "Divisions with a remainder in one basket, the rest in the other.", baskets: [{ label: "no remainder" }, { label: "has a remainder" }] },
      { prompt: "Match each multiplication with its answer", say: "Match each multiplication with its answer." }
    ] },
    "math-sapling-76": { title: "Perimeter", steps: [
      { prompt: "Watch and listen", parts: { w1: { art: "tag:6 m" }, w2: { art: "tag:6 m" }, h1: { art: "tag:3 m" }, h2: { art: "tag:3 m" }, tot: { art: "tag:18 m" } },
        scenes: [{ caption: "This flower bed is six metres long and three metres wide." },
          { caption: "We put a fence round the flower bed. The opposite side is the same: six and three, then six and three again." },
          { caption: "6 + 3 + 6 + 3 = 18. The distance round a shape is its “perimeter”. The perimeter of the flower bed is 18 metres." }],
        question: "If a flower bed is 5 metres long and 2 metres wide, what is its perimeter?" },
      { prompt: "How many centimetres is one side of this square tile? Count." },
      { prompt: "A 4 centimetre square tile. Its perimeter? (four equal sides)", say: "A square with sides of four centimetres. What is its perimeter?" },
      { prompt: "A triangle with three 7 centimetre sides. Its perimeter?", say: "A triangle with all three sides seven centimetres. What is its perimeter?" },
      { prompt: "We measured one side of the yard in steps. How many steps is it?" },
      { prompt: "The yard is a rectangle: 6 steps and 4 steps. How many steps round the yard?", say: "The yard is a rectangle: six steps and four steps. How many steps round the yard?" }
    ] },
    "math-sapling-77": { title: "Area with squares", steps: [
      { prompt: "Area means how much space it covers. Count the squares in this shape: tap each one." },
      { prompt: "What is the area of this shape in squares?" },
      { prompt: "One rug is 4 squares and another 6 squares. Which covers more space?", say: "One rug is four squares and another is six squares. Which covers more space?", options: [{ label: "4 squares" }, { label: "6 squares" }] },
      { prompt: "Draw a shape with an area of 8 squares. Any shape you like." },
      { prompt: "What is the area of this frame in squares? (the middle is empty)" },
      { prompt: "Two shapes each have 6 squares but different shapes. Their areas?", say: "Two shapes each have six squares but they are different shapes. Are their areas equal?", options: [{ label: "they are equal" }, { label: "they are different" }] }
    ] },
    "math-sapling-78": { title: "The area of a rectangle", steps: [
      { prompt: "A rectangle of 3 rows and 5 columns. You don't need to count one by one: 3 × 5." },
      { prompt: "Draw a 4 by 3 rectangle. Its area is 4 × 3." },
      { prompt: "A rug is 6 metres by 4 metres. What is its area in square metres?", say: "A rug is six metres by four metres. What is its area in square metres?" },
      { prompt: "Area? (rows × columns)" },
      { prompt: "Draw a rectangle with an area of 12 that has 2 rows." },
      { prompt: "The kitchen floor tiles are 5 rows of 8. How many tiles?", say: "The kitchen floor tiles are five rows of eight. How many tiles?" }
    ] },
    "math-sapling-79": { title: "Perimeter or area?", steps: [
      { prompt: "We want to put a fence round the yard. Do we work out the perimeter or the area?", say: "We want to put a fence round the yard. Do we need the perimeter or the area?", options: PA },
      { prompt: "We want to put a rug on the floor. Perimeter or area?", say: "We want to cover the floor with a rug. Do we need the perimeter or the area?", options: PA },
      { prompt: "Count the perimeter of this rectangle: tap each small side around it." },
      { prompt: "Now count the area of the same rectangle." },
      { prompt: "We stick ribbon round a picture frame. Which do we measure?", say: "We stick ribbon round a picture frame. Perimeter or area?", options: PA },
      { prompt: "Draw a 3 by 3 square. See its perimeter and area." },
      { prompt: "The 3 by 3 square: its perimeter is 12 and its area?", say: "A three by three square. Its perimeter is twelve. What is its area?" }
    ] },
    "math-sapling-80": { title: "Adding and taking away in problems", steps: [
      { prompt: "The school library has 425 storybooks and 238 science books. How many books altogether?", bars: [{ label: "books" }] },
      { prompt: "Now work it out in columns and check your answer." },
      { prompt: "A farmer had 800 saplings. He planted 345. How many are left?", bars: [{ label: "saplings" }] },
      { prompt: "Work it out in columns." },
      { prompt: "A train had 612 passengers. At the station 158 got off and 90 got on. How many are there now?", say: "A train had six hundred and twelve passengers. At the station a hundred and fifty-eight got off and ninety got on. How many are there now?" },
      { prompt: "Damavand is about 5610 metres high and Sabalan about 4811 metres. How much higher is Damavand?", bars: [{ label: "Damavand" }, { label: "Sabalan" }] }
    ] },
    "math-sapling-81": { title: "Mental maths", steps: [
      { prompt: "49 is close to 50. 50 + 26, then take one away.", say: "Forty-nine plus twenty-six. Fifty plus twenty-six, then take one away." },
      { prompt: "Add hundreds like ones: 3 and 5.", say: "Three hundred plus five hundred." },
      { prompt: "9 + 9: a double! See it on the line.", say: "Nine plus nine." },
      { prompt: "19 is close to 20. 72 − 20, then give one back.", say: "Seventy-two minus nineteen. Seventy-two minus twenty, then add one." },
      { prompt: "Five and five make ten. The answer?", say: "Sixty-five plus thirty-five." },
      { prompt: "The answer?", say: "Two hundred and fifty plus two hundred and fifty." },
      { prompt: "99 is one less than 100. The answer?", say: "Ninety-nine plus forty-seven." }
    ] },
    "math-sapling-82": { title: "Tables and tally marks", steps: [
      { prompt: "In a tally chart, each group is five. How many does this tally show?", ask: "How many?" },
      { title: "Colours of the cars that went down our street", prompt: "We counted the cars from the window. Put each car in the column of its colour.", rows: [{ label: "white" }, { label: "red" }, { label: "yellow" }],
        question: "How many cars were white?" },
      { title: "Colours of the cars that went down our street", rows: [{ label: "white" }, { label: "red" }, { label: "yellow" }], question: "How many cars did we count altogether?" },
      { prompt: "How many does this tally show? Count in fives: 5, 10, 15, …", ask: "How many?" },
      { prompt: "To show 8, how many groups of five and how many single lines do we draw?", say: "To show eight with tally marks, how many groups of five and how many single lines?",
        options: [{ label: "1 group and 3 lines" }, { label: "8 single lines" }, { label: "2 groups" }] },
      { text: "Make a tally chart:", list: ["Ask ten relatives or neighbours: “Which season do you like best?”", "Draw a table with four columns (spring, summer, autumn, winter) and draw a line for each answer.",
        "Count. Which season was most popular? How many more than the least?"] }
    ] },
    "math-sapling-83": { title: "Bar charts", steps: [
      { title: "Books the children read in a month", rows: [{ label: "Arian" }, { label: "Sogand" }, { label: "Parham" }, { label: "Taraneh" }], question: "How many books did Sogand read?" },
      { title: "Books the children read in a month", rows: [{ label: "Arian" }, { label: "Sogand" }, { label: "Parham" }, { label: "Taraneh" }], question: "How many more books did Sogand read than Taraneh?" },
      { title: "The weather this week", prompt: "Two more days were sunny and one more was rainy. Fix the chart.", rows: [{ label: "sunny" }, { label: "cloudy" }, { label: "rainy" }], question: "How many days were sunny?" },
      { title: "Fruit sold (kilos)", rows: [{ label: "apples" }, { label: "oranges" }, { label: "pomegranates" }, { label: "bananas" }], question: "Which fruit sold most?",
        options: [{ label: "apples" }, { label: "pomegranates" }, { label: "oranges" }] },
      { title: "Fruit sold (kilos)", rows: [{ label: "apples" }, { label: "oranges" }, { label: "pomegranates" }, { label: "bananas" }], question: "How many kilos of apples and oranges were sold altogether?" }
    ] },
    "math-sapling-99": { title: "Line plots", steps: [
      { prompt: "How many centimetres long is the first pencil?" },
      { prompt: "How many centimetres long is the second pencil?" },
      { title: "Lengths of the class's pencils (centimetres)", prompt: "We measured ten pencils: 6, 8, 7, 8, 9, 8, 6, 10, 8, 9. Put an ✖ above the length of each pencil.",
        say: "We measured ten pencils: six, eight, seven, eight, nine, eight, six, ten, eight, nine. Put a cross above the length of each pencil.", question: "How long were most of the pencils?" },
      { title: "Lengths of the class's pencils (centimetres)", question: "How many pencils did we measure altogether?" },
      { title: "Lengths of the class's pencils (centimetres)", question: "How many centimetres longer is the longest pencil than the shortest?" }
    ] },
    "math-sapling-84": { title: "Certain, possible, impossible", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We put four red marbles in the bag." }, { caption: "If we take a marble without looking, it is certain to be red. Blue? Impossible, because there is no blue in the bag." },
          { caption: "Now we put in a blue marble too. Now blue is possible, but red is more likely." }],
        question: "Which is more likely now?" },
      { prompt: "Certain, possible or impossible?", say: "Put each sentence in its basket: certain, possible or impossible.", baskets: CPI,
        items: [{ label: "the sun will rise tomorrow", say: "The sun will rise tomorrow." }, { label: "it will rain today", say: "It will rain today." }, { label: "a cat will fly", say: "A cat will fly." },
          { label: "the die will show 6", say: "The die will show six." }, { label: "the die will show 7", say: "The die will show seven." }, { label: "Sunday comes after Saturday", say: "Sunday comes after Saturday." }] },
      { prompt: "The bag has 3 green marbles and 1 yellow. Which is more likely?", say: "The bag has three green marbles and one yellow. Which is more likely?" },
      { prompt: "We toss a coin. Getting heads is…", say: "We toss a coin. Is getting heads certain, possible or impossible?", options: CPI },
      { prompt: "Half of a spinner is red and half is blue. Which comes up more?", say: "Half the spinner is red and half is blue. Which comes up more?",
        options: [{ label: "red" }, { label: "blue" }, { label: "they have the same chance" }] }
    ] },
    "math-sapling-85": { title: "A chance experiment", steps: [
      { prompt: "The spinner has three red parts and one blue part. Spin it 12 times and draw a line each time.", question: "Which came up most?", spinner: [{ label: "red" }, { label: "blue" }] },
      { prompt: "The bag has 2 red and 2 blue marbles. Take one, look and put it back. 10 times.", question: "Which came up least?" },
      { title: "Throwing a die 30 times", question: "Each number on a die has the same chance. Did they come up about the same?", options: [{ label: "yes, about the same" }, { label: "no, very different" }] },
      { prompt: "Toss a coin 10 times. Heads or tails?" },
      { prompt: "If a spinner has 3 red parts and 1 blue part, about how many times will red come up in 40 spins?", say: "If a spinner has three red parts and one blue part, about how many times will red come up in forty spins?" }
    ] },
    "math-sapling-86": { title: "Multiplying tens", steps: [
      { prompt: "3 × 40: three lots of four bundles of ten, that is 12 bundles of ten. What is it?" },
      { prompt: "If 3 × 4 = 12, then 3 × 40?", say: "If three times four is twelve, what is three times forty?" },
      { prompt: "5 × 6 = 30. So 5 × 60?", say: "Five times sixty." },
      { prompt: "8 × 2 = 16. So 8 × 200?", say: "Eight times two hundred." },
      { prompt: "4 × 50 = 20 bundles of ten. What is it?" },
      { prompt: "A notebook has 90 pages. How many pages do 7 notebooks have?", say: "A notebook has ninety pages. How many pages do seven notebooks have?" }
    ] },
    "math-sapling-87": { title: "Multiplying with a rectangle", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "We work out 6 × 23 with a rectangle: 6 rows and 23 columns. We split 23 into two pieces: 20 and 3." },
          { caption: "The big piece: 6 × 20 = 120." }, { caption: "The small piece: 6 × 3 = 18." }, { caption: "We add the two pieces: 120 + 18 = 138." }],
        question: "Work out 4 × 12 the same way: 4 × 10 and 4 × 2. The answer?" },
      { prompt: "Work out 4 × 13 with a rectangle: write each piece, then add." },
      { prompt: "Work out 5 × 24 with a rectangle." },
      { prompt: "Work out 3 × 125 with a rectangle: hundreds, tens and ones." },
      { prompt: "Work out 7 × 36." }
    ] },
    "math-sapling-88": { title: "Written multiplication", steps: [
      { prompt: "First with a rectangle: 3 × 24." },
      { prompt: "Now written: start with the ones. 3 × 4 = 12: write 2, and 1 goes to the tens." },
      { prompt: "Work out 36 × 4 in writing." },
      { prompt: "Work out 125 × 3 in writing." },
      { prompt: "Check with a rectangle: 6 × 47." },
      { prompt: "Now work out 47 × 6 in writing. Is your answer the same as with the rectangle?" }
    ] },
    "math-sapling-89": { title: "Multiplication problems", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "The gardener puts apples in boxes. Each box holds 24 apples. How many apples are in 4 boxes?" },
          { caption: "For each box we draw a bar of 24: four bars the same size." }, { caption: "We want them all: 4 × 24 = 96 apples." }],
        question: "What is 4 × 24?" },
      { prompt: "A cinema ticket is 35 thousand tomans. How much are 3 tickets?", bars: [{ label: "3 tickets" }] },
      { prompt: "Mahan has 15 cards. His brother has 4 times as many. How many cards does his brother have?", bars: [{ label: "Mahan" }, { label: "brother" }] },
      { prompt: "A book has 128 pages. How many pages are 2 copies of it altogether?" },
      { prompt: "A bus has 45 seats. 6 buses for a school trip. How many seats altogether?", say: "A bus has forty-five seats. How many seats do six buses have altogether?" }
    ] },
    "math-sapling-90": { title: "Draw it, make a table", steps: [
      { prompt: "Watch and listen",
        scenes: [{ caption: "Each bicycle has two wheels. How many wheels do four bicycles have? We make a table: one column for bicycles, one for wheels." },
          { caption: "One bicycle, two wheels." }, { caption: "Two bicycles, four wheels." }, { caption: "Three bicycles, six wheels." },
          { caption: "Four bicycles, eight wheels. The table shows that two are added each time." }],
        question: "How many wheels do five bicycles have?" },
      { prompt: "Draw a picture: 3 rows of trees, 5 trees in each row. How many trees?", say: "Draw it in your head or on paper: three rows of trees, five trees in each row. How many trees?" },
      { prompt: "Carry on the table: I read 4 pages a day. Day 1: 4, day 2: 8, day 3: 12. Day 5?", say: "I read four pages a day. Day one four, day two eight, day three twelve. How many pages by day five?" },
      { prompt: "Solve it by drawing: a frog is in a 10 metre well. Each day it climbs 3 metres. After how many days does it reach the top?", say: "A frog is in a ten metre well. Each day it climbs three metres. How many days until it reaches the top? Draw it: three, six, nine, twelve." },
      { text: "Solve this problem with a table: “A hen has 2 legs. How many legs do 7 hens have?” Draw a table with two columns: hens and legs.",
        example: "hens: 1 2 3 … 7\nlegs: 2 4 6 … ?", check: ["Does the table have two columns?", "Does each row go up by 2?", "Is the answer 14?"] }
    ] },
    "math-sapling-91": { title: "Guess and check", steps: [
      { prompt: "Two numbers that add up to 12, one 2 more than the other. Guess and check.", say: "Two numbers that add up to twelve, and one is two more than the other. Which are they?", options: ["6 and 6", "7 and 5", "8 and 4"], answer: "7 and 5" },
      { prompt: "There are hens and sheep in the yard. 5 heads and 14 legs. How many sheep? (guess: 2 sheep = 8 legs, 3 hens = 6 legs)", say: "There are hens and sheep in the yard. Five heads and fourteen legs altogether. How many sheep? Guess and count the legs." },
      { prompt: "Which number, times 3 plus 4, makes 25?", say: "We multiplied a number by three and added four, and got twenty-five. What was the number? Guess and check." },
      { prompt: "With 30 thousand tomans, which two things can you buy and have 5 thousand left? (book 15, notebook 10, pencil 5, bag 20)", say: "You have thirty thousand tomans. Which two things do you buy to have five thousand left?",
        options: [{ label: "book and notebook" }, { label: "bag and notebook" }, { label: "book and pencil" }] },
      { prompt: "A two-digit number: its digits add up to 9 and its tens digit is 3 more than its ones. Which is it?", say: "A two-digit number. Its digits add up to nine and the tens digit is three more than the ones digit. Which is it?" },
      { text: "Guess and check: “Three numbers in a row that add up to 21.” Write your guesses, check them and find the right one.",
        example: "Guess: 5, 6, 7 → 18 (too small)\nGuess: 6, 7, 8 → 21 ✓", check: ["Wrote down the guesses?", "Checked each guess?", "Found the answer 6, 7, 8?"] }
    ] },
    "math-sapling-92": { title: "Find a pattern", steps: [
      { prompt: "When people shake hands: 2 people, 1 handshake; 3 people, 3; 4 people, 6. Find the pattern. 5 people?", say: "Two people one handshake, three people three, four people six. One more is added each time. How many handshakes for five people?" },
      { prompt: "Find the pattern and fill it in: 1, 2, 4, 8, …", say: "One, two, four, eight, … double each time." },
      { prompt: "On the steps: the first step has 1 pot, the second 3, the third 5. The sixth step?", say: "The first step has one pot, the second three, the third five. How many pots on the sixth step?" },
      { prompt: "The shape pattern: fill it in", say: "Circle, square, square, circle, square, square, … fill it in." },
      { prompt: "In the pattern “red, blue, blue”, what colour is the twentieth? (it repeats every 3)", say: "Red, blue, blue, red, blue, blue… what colour is the twentieth?" },
      { prompt: "100, 95, 90, … fill it in", say: "A hundred, ninety-five, ninety, … fill it in." }
    ] },
    "math-sapling-93": { title: "How long did it take?", steps: [
      { prompt: "The art class started at 3 o'clock and finished at 3:40. See how far the long hand went: 40 minutes.", say: "The art class started at three o'clock and finished at three forty. It took forty minutes." },
      { prompt: "The film started at 5 o'clock and finished at 7. How many hours did it take?", say: "The film started at five o'clock and finished at seven. How many hours did it take?" },
      { prompt: "From quarter past 8 to 9 o'clock: the long hand goes from 3 to 12.", say: "From quarter past eight to nine o'clock. Forty-five minutes." },
      { prompt: "How many minutes from quarter past 8 to 9?", say: "How many minutes is it from quarter past eight to nine o'clock?" },
      { prompt: "We put the milk on the stove at 4 o'clock. It's ready half an hour later. Set the hands to that time." },
      { prompt: "How many minutes are in an hour?", say: "How many minutes are in an hour?" },
      { prompt: "How long is it from 10:50 to 11:10?", say: "How many minutes is it from ten fifty to eleven ten?" }
    ] },
    "math-sapling-94": { title: "Millimetres and kilometres", steps: [
      { prompt: "How many millimetres are in a centimetre?", say: "How many millimetres are in a centimetre? On the ruler, count the small lines between two numbers." },
      { prompt: "Each square is one millimetre. How many millimetres long is the ant?" },
      { prompt: "How many metres are in a kilometre?", say: "How many metres are in a kilometre?" },
      { prompt: "Which do we measure in kilometres?", say: "Which do we measure in kilometres? The length of a pencil, a child's height, or the road from Tehran to Qom?",
        options: [{ label: "the length of a pencil" }, { label: "a child's height" }, { label: "the road from Tehran to Qom" }] },
      { prompt: "About how thick is a coin?", say: "About how thick is a coin?", options: [{ label: "2 millimetres" }, { label: "2 centimetres" }, { label: "2 metres" }] },
      { prompt: "Sara walked 3 kilometres and Arash cycled 8 kilometres. Whose way was longer?" },
      { prompt: "How many millimetres is 4 centimetres?", say: "How many millimetres is four centimetres?" }
    ] },
    "math-sapling-95": { title: "The measuring game", steps: [
      { prompt: "Match each unit with something we measure with it", say: "Match each unit with something we measure with it.",
        pairs: [[{ label: "kilogram", say: "kilogram" }, null], [{ label: "litre", say: "litre" }, null], [{ label: "metre", say: "metre" }, null], [{ label: "minute", say: "minute" }, null]] },
      { prompt: "Length, mass or capacity?", say: "Put each unit in its basket.", baskets: [{ label: "length" }, { label: "mass" }, { label: "capacity" }],
        items: [{ label: "centimetre" }, { label: "gram" }, { label: "litre" }, { label: "kilometre" }, { label: "kilogram" }, { label: "millilitre" }] },
      { prompt: "Put them in order from smallest to biggest", say: "Put these lengths in order from smallest to biggest.", items: [{ label: "1 millimetre" }, { label: "1 centimetre" }, { label: "1 metre" }, { label: "1 kilometre" }] },
      { say: "Turn the cards over two at a time. Match the equal amounts.", pairs: [[{ label: "1 metre" }, { label: "100 centimetres" }], [{ label: "1 kilogram" }, { label: "1000 grams" }], [{ label: "1 hour" }, { label: "60 minutes" }]] },
      { prompt: "Perimeter or area?", say: "Put each job in the perimeter or area basket.", baskets: PA,
        items: [{ label: "a fence round the flower bed" }, { label: "a rug for the floor" }, { label: "ribbon round a frame" }, { label: "tiles for the bathroom floor" }] },
      { prompt: "Put them in order from shortest to longest", say: "Put these times in order from shortest to longest.", items: [{ label: "1 second" }, { label: "1 minute" }, { label: "1 hour" }, { label: "1 day" }] }
    ] },
    "math-sapling-96": { title: "The shapes and patterns game", steps: [
      { prompt: "Sort the polygons by their sides", say: "Put each shape in the basket of its number of sides.", baskets: [{ label: "4 sides" }, { label: "5 sides" }, { label: "6 sides" }] },
      { say: "Turn the cards over two at a time. Match each shape with its name.",
        pairs: [[null, { label: "rhombus" }], [null, { label: "trapezium" }], [null, { label: "hexagon" }]] },
      { prompt: "Find the rule of the pattern and fill it in", say: "Four more each time. Fill it in." },
      { prompt: "Right angle or not?", say: "Shapes with a right angle in one basket, the rest in the other.", baskets: [{ label: "has a right angle" }, { label: "doesn't" }] },
      { prompt: "The shape pattern: fill it in", say: "Hexagon, triangle, hexagon, triangle… fill it in." }
    ] },
    "math-sapling-97": { title: "The problems game", steps: [
      { prompt: "Match each problem with its sentence", say: "Tap each problem to hear it. Match each problem with its sentence.",
        pairs: [[{ label: "4 boxes, 6 pencils each", say: "Four boxes, six pencils in each. How many altogether?" }, null], [{ label: "24 pencils between 4", say: "Twenty-four pencils between four people. How many each?" }, null],
          [{ label: "24 pencils, 4 got lost", say: "There were twenty-four pencils and four got lost. How many are left?" }, null], [{ label: "24 pencils and 4 more", say: "There were twenty-four pencils and we bought four more." }, null]] },
      { prompt: "Which operation solves this problem?", say: "Put each problem in the basket of the operation that solves it.", baskets: [{ label: "add" }, { label: "take away" }, { label: "multiply" }, { label: "divide" }],
        items: [{ label: "how many more?", say: "How many more does Ali have than Sara?" }, { label: "how many altogether?", say: "How many apples and pears altogether?" },
          { label: "5 times as many", say: "Mina has five times as many cards as Nima." }, { label: "how many each?", say: "Thirty walnuts between six people. How many each?" }] },
      { say: "Turn the cards over two at a time. Match each problem with its answer.",
        pairs: [[{ label: "3 bags, 8 apples each", say: "Three bags, eight apples in each." }, null], [{ label: "40 ÷ 5", say: "forty divided by five" }, null], [{ label: "60 − 25", say: "sixty minus twenty-five" }, null]] },
      { prompt: "One step or two steps?", say: "Problems solved with one sum in one basket, and those that need two in the other.", baskets: [{ label: "one step" }, { label: "two steps" }],
        items: [{ label: "15 apples and 8 pears: altogether?" }, { label: "50 tomans, spent 12 and 18: how much is left?" }, { label: "3 groups of 7: how many?" }, { label: "20 people, 5 got off, 8 got on: how many?" }] }
    ] },
    "math-sapling-98": { title: "The Sapling party", steps: [
      { prompt: "Put them in order from smallest to biggest", say: "Put these numbers in order from smallest to biggest." },
      { prompt: "Match each one with its answer", say: "Match each one with its answer." },
      { prompt: "Which fraction is bigger?", say: "Three quarters or one half? Which is bigger?", options: [{ label: "three quarters" }, { label: "one half" }] },
      { prompt: "A 5 by 4 rectangle: its area?", say: "A five by four rectangle. What is its area in squares?" },
      { prompt: "The 5 by 4 rectangle: its perimeter?", say: "The same five by four rectangle. What is its perimeter?" },
      { prompt: "We put out 6 tables for the party. Each table has 8 chairs. How many people can sit down?", say: "We put out six tables for the party. Each table has eight chairs around it. How many people can sit down?" },
      { say: "Turn the cards over two at a time. Match each rounded number with its number.",
        pairs: [[null, { label: "468 (to the nearest ten)" }], [null, { label: "2950 (to the nearest thousand)" }], [null, { label: "623 (to the nearest hundred)" }]] }
    ] }
  });
})();

// Practice generators (js/practice/math.js): the generator's title and its words, by key (README.md, "Practice generators").
B.EN["math-seed-p1"] = {
  title: "Count them: how many?",
  words: {
    ask: "So how many {name} are there?",
    names: { "🍎": "apples", "🐟": "fish", "🐥": "chicks", "🌸": "flowers", "⚽": "balls", "🍊": "oranges", "🐞": "ladybirds", "🥕": "carrots", "🧸": "teddy bears", "🍐": "pears" },
    circle: "These are in a circle. Start with one, tap each one and count.",
    scatter: "These are all over the place. Tap each one and count; each one you count moves aside."
  }
};

B.EN["math-seed-p2"] = {
  title: "One look: how many?",
  words: {
    dice: "This is a die. Look carefully! It shows for just a moment.",
    fingers: "How many fingers are these hands holding up? Look carefully!",
    askFingers: "How many fingers did you see?",
    frame: "The ten-frame shows for just a moment. Don't count, just look!",
    askFrame: "How many counters did you see?",
    thing: "They show for just a moment. Don't count, just look!",
    askThing: "How many {name} did you see?",
    names: { "🐥": "chicks", "🐞": "ladybirds", "⭐": "stars", "🍓": "strawberries", "🦋": "butterflies", "🍪": "biscuits" }
  }
};

B.EN["math-seed-p3"] = {
  title: "Numbers and how many",
  words: {
    pairs: "Match each number with the same amount",
    memory: "Turn the cards over two at a time. Match each number with the same amount.",
    feed: "Look at the number. Give the {animal} that many {food}.",
    group: "Which group has as many as this number?",
    zero: "How many {thing} are in the {place}?",
    animals: { "🐰": "rabbit", "🐈": "cat", "🐔": "hen", "🐿️": "squirrel", "🐒": "monkey", "🐦": "sparrow" },
    foods: { "🥕": "carrots", "🐟": "fish", "🌽": "corn cobs", "🌰": "hazelnuts", "🍌": "bananas", "🍒": "cherries" },
    places: { "🪹": "nest", "🍽️": "plate", "🧺": "basket" },
    things: { "🥚": "eggs", "🍪": "biscuits", "🍎": "apples" }
  }
};

B.EN["math-seed-p4"] = {
  title: "Number path game",
  words: {
    themes: [
      "The ladybird goes along the garden path to the flower. Roll the die and move.",
      "The duck swims down the river to the water lily. Roll the die and move.",
      "The rabbit goes across the farm to the carrot. Roll the die and move.",
      "The tortoise goes slowly to the strawberry. Roll the die and move.",
      "The ant goes across the yard to the watermelon. Roll the die and move.",
      "The snail goes over the stones to the leaf. Roll the die and move."
    ],
    from: "This time we start on square {n}. "
  }
};

B.EN["math-seed-p5"] = {
  title: "How many are hiding?",
  words: {
    hidden: "We had {all} {name}. {seen} can be seen. How many are under the bowl?",
    all: "{seen} {name} can be seen and {hid} are under the bowl. How many {name} are there in all?",
    names: { "🍎": "apples", "🥚": "eggs", "🌰": "hazelnuts", "🍓": "strawberries", "🍪": "biscuits", "🍊": "tangerines" }
  }
};

B.EN["math-seed-p6"] = {
  title: "Number stories",
  words: {
    come: "{a} {name} were {place}. {b} more {name} came. How many {name} are {place} now?",
    go: "{a} {name} were {place}. {b} went away. How many {name} are left {place}?",
    comeOne: "{a} {name} were {place}. One more came. How many {name} are {place} now?",
    goOne: "{a} {name} were {place}. One went away. How many {name} are left {place}?",
    names: { "🐦": "sparrows", "🦆": "ducks", "🐞": "ladybirds", "🐑": "lambs", "🐥": "chicks", "🦋": "butterflies" },
    places: { "🐦": "in the tree", "🦆": "in the pool", "🐞": "on the leaf", "🐑": "in the meadow", "🐥": "in the yard", "🦋": "on the flowers" }
  }
};

B.EN["math-seed-p7"] = {
  title: "Compare",
  words: {
    match: "Put a {b} under each {a}: tap the {bs}.",
    plural: { "🧒": "children", "🪑": "chairs", "🐰": "rabbits", "🥕": "carrots", "🐝": "bees", "🌸": "flowers", "🍽️": "plates", "🥄": "spoons", "🐶": "dogs", "🦴": "bones", "☕": "glasses", "🍪": "biscuits" },
    one: { "🧒": "child", "🪑": "chair", "🐰": "rabbit", "🥕": "carrot", "🐝": "bee", "🌸": "flower", "🍽️": "plate", "🥄": "spoon", "🐶": "dog", "🦴": "bone", "☕": "glass", "🍪": "biscuit" },
    longer: "Which is longer? Tap it.",
    shorter: "Which is shorter? Tap it.",
    heavier: "Which side is heavier? Tap that pan.",
    lighter: "Which side is lighter? Tap that pan.",
    things: { "🍉": "watermelon", "🎃": "pumpkin", "🍍": "pineapple", "🪨": "stone", "🍎": "apple", "📕": "book", "🍒": "cherry", "🪶": "feather", "🎈": "balloon" }
  }
};

B.EN["math-seed-p8"] = {
  title: "Make a pattern",
  words: { next: "What comes next?", gap: "One is missing. Fill the gap." }
};

B.EN["math-seed-p9"] = {
  title: "Sort them",
  words: {
    color: "{a} things on one side, {b} things on the other",
    kind: "Put each thing in its basket: {a} or {b}?",
    odd: "Which one doesn't belong?",
    colors: { red: "Red", green: "Green", yellow: "Yellow" },
    kinds: { fruit: "fruit", animal: "animal", vehicle: "vehicle", clothes: "clothes" },
    names: {
      "🍎": "apple", "🍓": "strawberry", "🍒": "cherries", "🚒": "fire engine", "🌹": "rose", "🍅": "tomato",
      "🥒": "cucumber", "🍏": "green apple", "🥬": "lettuce", "🐸": "frog", "🌵": "cactus", "🥦": "broccoli",
      "🍌": "banana", "🍋": "lemon", "🐥": "chick", "🌻": "sunflower", "🚕": "taxi", "🧀": "cheese",
      "🍇": "grapes", "🍊": "orange", "🍐": "pear", "🍉": "watermelon", "🐶": "dog", "🐱": "cat", "🐰": "rabbit",
      "🐄": "cow", "🐑": "sheep", "🐟": "fish", "🚗": "car", "🚌": "bus", "🚲": "bicycle", "✈️": "aeroplane",
      "🚂": "train", "👕": "shirt", "👗": "dress", "🧦": "socks", "🧢": "cap", "👟": "shoe", "🧤": "gloves"
    }
  }
};

B.EN["math-seed-p10"] = {
  title: "Find the shapes",
  words: {
    find: "Which one is the {name}?",
    odd: "Look at the shapes, not their size. Which one doesn't belong?",
    sort: "Triangles on one side, other shapes on the other. Big or small, turned or not, it doesn't matter.",
    tri: "Triangle", notTri: "Not a triangle",
    names: { circle: "circle", square: "square", triangle: "triangle", rectangle: "rectangle" }
  }
};

B.EN["math-sprout-p1"] = {
  title: "Adding and taking away to 10",
  words: { ask: "What is the answer?", ten: "How many more make ten?", tenSum: "What goes with {a} to make ten?" }
};

B.EN["math-sprout-p2"] = {
  title: "Adding and taking away to 20",
  words: {
    ask: "What is the answer?",
    on: "The frog is on {a} and hops {b} forward. Where does it land?",
    back: "The frog is on {a} and hops {b} back. Where does it land?",
    double: "Doubles: what is the answer?",
    near: "One more than a double: what is the answer?"
  }
};

B.EN["math-sprout-p3"] = {
  title: "Part and whole",
  words: {
    hidden: "We have {all} counters. {seen} are outside. How many are under the bowl?",
    ten: "How many more make ten?",
    bonds: "Match the two numbers that make {all} together"
  }
};

B.EN["math-sprout-p4"] = {
  title: "Missing number",
  words: { missing: "Which number goes where the \"?\" is?", tf: "\"=\" means both sides are the same amount. Is this sentence true or false?", yes: "true", no: "false" }
};

B.EN["math-sprout-p5"] = {
  title: "Adding and taking away stories",
  words: {
    add: "{p} had {a} {t}. {q} gave {p} {b} more {t}. How many {t} does {p} have now?",
    take: "{p} had {a} {t} and gave {b} to {q}. How many {t} are left?",
    tog: "{p} has {a} {t} and {q} has {b} {t}. How many {t} do they have together?",
    cmp: "{p} has {a} {t} and {q} has {b} {t}. How many more does {p} have than {q}?",
    chg: "{p} had {a} {t}. {q} gave {p} some more. Now {p} has {c} {t}. How many did {q} give?",
    start: "{p} had some {t} and bought {b} more. Now {p} has {c} {t}. How many did {p} have at first?",
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza", "Yasaman", "Kaveh", "Taraneh", "Parham", "Shirin", "Babak", "Delaram", "Omid"],
    things: { "🍬": "sweets", "📕": "books", "✏️": "pencils", "🎈": "balloons", "🍪": "biscuits", "🌰": "walnuts", "🥚": "painted eggs", "🐟": "goldfish" }
  }
};

B.EN["math-sprout-p6"] = {
  title: "Ten-frame: one look",
  words: {
    frame: "The ten-frame shows for just a moment. Don't count, just look!", askFrame: "How many counters did you see?",
    hands: "Look at the two hands quickly. A whole hand and a few more fingers!", askHands: "How many fingers in all?",
    two: "A full frame means ten. How many counters are in the frames altogether?"
  }
};

B.EN["math-sprout-p7"] = {
  title: "Before, after, between",
  words: {
    after: "Which number comes just after {a}?", before: "Which number comes just before {a}?",
    between: "Which number is between {a} and {b}?", run: "The numbers are in order. Fill the gaps.",
    below: "On the hundred chart, which number is below {a}?", above: "On the hundred chart, which number is above {a}?"
  }
};

B.EN["math-sprout-p8"] = {
  title: "Hear it, find it",
  words: {
    hear: "Tap 🔊 and listen. Which number did you hear?",
    read: "How do we say this number?",
    ones: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
    tens: ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    hundred: "one hundred", join: "-"
  }
};

B.EN["math-sprout-p9"] = {
  title: "Count in twos and fives",
  words: {
    f: "Count on {by}. Fill the gaps.",
    b: "Count back {by}. Fill the gaps.",
    by: { 2: "in twos", 5: "in fives", 10: "in tens" }
  }
};

B.EN["math-sprout-p10"] = {
  title: "Shapes and patterns",
  words: {
    name: "Which one is the {name}?",
    desc: { triangle: "Which shape has three sides and three corners?", square: "Which shape has four equal sides and four corners?", rectangle: "Which shape has four sides, two long and two short?", circle: "Which shape has no sides and no corners?" },
    solid: "Which one looks like a {name}?",
    names: { circle: "circle", square: "square", triangle: "triangle", rectangle: "rectangle" },
    solids: { cube: "cube", sphere: "sphere", cylinder: "cylinder", cone: "cone", cuboid: "cuboid" },
    next: "What comes next?", grow: "This pattern gets bigger each time. What comes next?"
  }
};

B.EN["math-sprout-p11"] = {
  title: "Clock and calendar",
  words: {
    after: "What day comes after {day}?", before: "What day came before {day}?",
    read: "What time is it?", set: "Set the hands to {h} o'clock.",
    month: "Which season is {month} in?",
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    months: ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"],
    seasons: { spring: "spring", summer: "summer", autumn: "autumn", winter: "winter" }
  }
};

B.EN["math-sapling-p1"] = {
  title: "Adding and taking away to 20",
  words: { ask: "What is the answer?", ten: "Fill the ten first. What is {a} + {b}?" }
};

B.EN["math-sapling-p2"] = {
  title: "Place value",
  words: {
    read: "What number is this?", build: "Make the number {n} with bundles and sticks.",
    more: "{n} and {b} more. What does it make?", less: "{n} and {b} fewer. What does it make?",
    expand: "What number do these make together?",
    round: "Round {n} to the nearest {to}.", to: { 10: "ten", 100: "hundred", 1000: "thousand" }
  }
};

B.EN["math-sapling-p3"] = {
  title: "Mental maths",
  words: {
    ask: "Work it out in your head. What is the answer?",
    less: "{b} is {c}, one less. Work it out in your head.", more: "{b} is {c} and one more. Work it out in your head.",
    up: "Count up from {b} to {a}. How far is it?"
  }
};

B.EN["math-sapling-p4"] = {
  title: "Column adding and taking away",
  words: { column: "Work it out in columns: start with the ones.", estimate: "Estimate first: which is the answer closest to?" }
};

B.EN["math-sapling-p5"] = {
  title: "Times tables",
  words: { ask: "What is the answer?", array: "{a} rows, {b} in each row: {a} × {b} = ?", div: "Put {a} into groups of {b}. How many groups?" }
};

B.EN["math-sapling-p6"] = {
  title: "Multiplying and sharing",
  words: {
    share: "Share {n} {t} equally between {p} children.",
    rem: "Share {n} {t} equally between {p} children. How many does each one get, and how many are left over?",
    remLabel: "{q} remainder {r}",
    tens: "If {a} × {b} = {c}, then {a} × {d}?",
    area: "First with a rectangle: {a} × {b}. Work out each part on its own.",
    column: "Written multiplication: start with the ones.",
    things: { "🍪": "biscuits", "🍬": "sweets", "🍎": "apples", "✏️": "pencils", "🌰": "walnuts" }
  }
};

B.EN["math-sapling-p7"] = {
  title: "Missing numbers",
  words: { ask: "Which number goes where the \"?\" is?" }
};

B.EN["math-sapling-p8"] = {
  title: "Word problems",
  words: {
    pw: "{p} has {a} {t} and {q} has {b} {t}. How many {t} do they have together?",
    part: "There are {c} children in the class. {a} are girls. How many are boys?",
    off: "There were {a} people on the bus. At the stop {b} got off. How many are still on the bus?",
    on: "There were {a} people on the bus. At the stop {b} got on. How many are there now?",
    cmp: "{p} has {a} {t} and {q} has {b} {t}. How many more does {p} have?",
    two: "{p} had {c} thousand toman. {p} bought bread for {a} thousand at the bakery and fruit for {b} thousand at the greengrocer's. How much is left?",
    groups: "We have {g} boxes. There are {k} {t} in each box. How many {t} do we have in all?",
    timesAs: "A notebook costs {a} thousand toman. A book costs {k} times as much as the notebook. How many thousand toman is the book?",
    kids: "children", money: "money", boxes: "{g} boxes",
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza", "Yasaman", "Kaveh", "Taraneh", "Parham", "Shirin", "Babak", "Delaram", "Omid"],
    things: { "🔵": "marbles", "📕": "books", "✏️": "pencils", "🌰": "walnuts", "🍬": "sweets", "🖍️": "crayons" }
  }
};

B.EN["math-sapling-p9"] = {
  title: "Fractions",
  words: {
    name: "What fraction is coloured?", colour: "Colour {f}.", equal: "Which one is cut into {p} equal parts?",
    cut: "Cut this into {p} equal parts. Tap the dotted lines.",
    set: "Share {n} {t} equally between {p} children. What is {f} of {n}?", result: "{f} of {n} is {k}.",
    place: "Find {f} on the number line.", lineName: "What fraction is this point?", bigger: "Which is bigger?",
    eq: "Which number goes where the \"?\" is, so the two fractions are equal?",
    parts: { 2: "two", 3: "three", 4: "four" },
    things: { "🍬": "sweets", "🍓": "strawberries", "🌰": "walnuts", "🍪": "biscuits" },
    nums: ["", "one", "two", "three", "four", "five", "six", "seven", "eight"],
    dens: { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["quarter", "quarters"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 8: ["eighth", "eighths"] },
    frac: "{n} {d}"
  }
};

B.EN["math-sapling-p10"] = {
  title: "Clock and calendar",
  words: {
    read: "What time is it?", set: "Set the hands to this time.",
    hours: "The film started at {a} o'clock and ended at {b} o'clock. How many hours did it last?",
    minutes: "The art class started at {a} minutes past {h} and ended at {b} minutes past {h}. How many minutes did it last?",
    after: "Which month comes after {m}?", before: "Which month comes before {m}?", days: "How many days does {m} have?",
    week: "Today is {d} {m}. A week later, what date in {m} is it?",
    months: ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"]
  }
};

B.EN["math-sapling-p11"] = {
  title: "Measuring",
  words: {
    count: "Each square is one centimetre. How many centimetres long is the {t}? Tap each square.",
    ruler: "How many centimetres long is the {t}?",
    unit: "Which unit do we use to measure the {t}?",
    convert: "How many {to} are {n} {from}?",
    scale: "Weigh the {t} with kilogram weights.", scaleQ: "How many kilograms is the {t}?", kilo: "kg",
    weighed: { "🍉": "watermelon", "🎃": "pumpkin", "🍍": "pineapple" },
    things: { "✏️": "pencil", "🖍️": "crayon", "🥕": "carrot", "🍃": "leaf", "🚪": "height of a door", "🏫": "length of the school yard", "📱": "phone", "🍉": "weight of a watermelon", "🍎": "weight of an apple", "🧈": "weight of a piece of butter", "🧳": "weight of a suitcase", "🍼": "water in a big bottle", "🪣": "water in a bucket", "🐜": "length of an ant", "🛣️": "road from Tehran to Qom" },
    units: { mm: "millimetres", cm: "centimetres", m: "metres", km: "kilometres", g: "grams", kg: "kilograms", l: "litres" }
  }
};

B.EN["math-sapling-p12"] = {
  title: "Money",
  words: {
    bills: "How many thousand toman is this money altogether?", sum: "We bought {a} and {b}. How much is that altogether?", pay: "Pay exactly for the {a}.",
    change: "{p} paid with a {m} thousand toman note and bought {a} that cost {c} thousand toman. How much change did {p} get?",
    goods: { "🍞": "sangak bread", "🥛": "milk", "🧀": "cheese", "🍎": "apples", "🍊": "oranges", "📒": "a notebook", "✏️": "a pencil", "🍯": "honey", "🥜": "pistachios", "🥚": "eggs" },
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza", "Yasaman", "Kaveh", "Taraneh", "Parham", "Shirin", "Babak", "Delaram", "Omid"]
  }
};

B.EN["math-sapling-p13"] = {
  title: "Perimeter and area",
  words: {
    perSides: "A rectangle is {w} centimetres by {h} centimetres. What is its perimeter in centimetres?",
    areaCount: "What is the area of this shape in squares? Tap each square.",
    draw: "Draw a shape with an area of {n} squares. Any shape you like.",
    rows: "A carpet has {h} rows with {w} squares in each row. What is its area in squares?",
    perCount: "Count the perimeter of this rectangle: tap each small side around it."
  }
};

B.EN["math-sapling-p14"] = {
  title: "Graphs",
  words: {
    make: "Put each picture in its column.",
    most: "Which is the most?",
    themes: {
      fruit: { title: "Favourite fruit in our class", labels: ["apple", "banana", "grapes", "orange"], n: "How many children like {a}?", more: "How many more children like {a} than {b}?" },
      school: { title: "How children come to school", labels: ["on foot", "by bus", "by car", "by bike"], n: "How many children come {a}?", more: "How many more children come {a} than {b}?" },
      weather: { title: "The weather over a month", labels: ["sunny", "rainy", "cloudy", "snowy"], n: "How many days were {a}?", more: "How many more {a} days were there than {b} days?" }
    }
  }
};

B.EN["math-sapling-p15"] = {
  title: "Patterns",
  words: {
    fill: "Find the pattern and fill the gaps.",
    oe: "Is {n} even or odd?", even: "even", odd: "odd",
    rule: "What is the rule of this pattern?", plus: "{d} more each time", minus: "{d} fewer each time", double: "double each time",
    sticks: "We make {shape}s with matchsticks: one {shape} takes {a} sticks, two take {b}, three take {c}. How many sticks do {k} {shape}s take?",
    shapes: { sq: "square", tri: "triangle", hex: "hexagon" }, count: { 4: "four", 5: "five" }
  }
};

B.EN["math-seed-p11"] = {
  title: "Give and count",
  words: {
    group: "Which group has {n}? Count and tap it.",
    feed: "The {animal} wants {n} {food}. Give them to it.",
    sum: "Look at the sign: {a} and {b}. Give them all to the {animal}.",
    drum: "Listen and count. How many times did the drum beat?", frog: "Watch and count. How many times did the frog hop?",
    animals: { "🐰": "rabbit", "🐈": "cat", "🐔": "hen", "🐿️": "squirrel", "🐒": "monkey", "🐦": "sparrow" },
    foods: { "🥕": "carrots", "🐟": "fish", "🌽": "corn cobs", "🌰": "hazelnuts", "🍌": "bananas", "🍒": "cherries" }
  }
};

B.EN["math-seed-p12"] = {
  title: "Numbers in order",
  words: {
    dots: "Put them in order from fewest to most.", nums: "Put the numbers in order from smallest to biggest.", next: "Which number comes next?",
    more: "The frog is on {a}. It hops one square forward. Where does it land?", less: "The frog is on {a}. It hops one square back. Where does it land?",
    back: "Count back from {a} and put them in order."
  }
};

B.EN["math-seed-p13"] = {
  title: "Two hands, ten fingers",
  words: {
    hands: "How many fingers are up?", down: "You have {all} fingers. Hold up {up}. How many are still down?",
    pairs: "Match each group of dots with the hand that has the same number of fingers", make: "Make {n} on the frame."
  }
};

B.EN["math-seed-p14"] = {
  title: "Big and small",
  words: {
    biggest: "Which one is the biggest?", smallest: "Which one is the smallest?", holds: "Which one holds more water?",
    order: "Put them in order from smallest to biggest.", bars: "Put the strips in order from shortest to longest.",
    names: { "🐘": "elephant", "🐎": "horse", "🐕": "dog", "🐈": "cat", "🐭": "mouse", "🐜": "ant", "🪣": "bucket", "☕": "glass", "🛁": "bathtub", "🥣": "bowl", "🫖": "teapot", "🥄": "spoon", "🧺": "basket", "👜": "bag", "🚌": "bus", "🚗": "car" }
  }
};

B.EN["math-seed-p15"] = {
  title: "Where is it?",
  words: {
    where: { teddy: "What is on the bed? Tap it.", ball: "What is under the table? Tap it.", cat: "Who is next to the box? Tap it.",
      book: "What is on the shelf? Tap it.", shoes: "What is under the bed? Tap it.", car: "What is in front of the box? Tap it.", plant: "What is on the table? Tap it." },
    route: "Start at the park gate. First go to the {a}, then go to the {b}.",
    park: { tree: "big tree", pond: "pond", slide: "slide", bench: "bench", flowers: "flower bed" }
  }
};

B.EN["math-seed-p16"] = {
  title: "First, next, last",
  words: {
    race: "The animals had a race. The {a} came first, the {b} second and the {c} third. Put them in that order.",
    line: "The animals are lined up behind the flag. Count from the flag. Which one is {nth}?",
    nth: ["", "first", "second", "third", "fourth", "fifth"],
    story: ["We planted a seed. Put it in order: what happened first, next and last?", "The hen laid an egg. Put it in order: what happened first, next and last?",
      "A school morning. Put it in order: what do we do first, next and last?", "A day from morning to night. Put it in order."],
    says: { "🌰": "we planted the seed", "💧": "we watered it", "🌱": "it sprouted", "🌻": "it flowered", "🥚": "the egg", "🐣": "the chick hatched", "🐥": "the chick grew", "🐔": "it became a hen",
      "🛏️": "we woke up", "🪥": "we brushed our teeth", "🥣": "we had breakfast", "🎒": "we went to school", "🌅": "morning", "☀️": "noon", "🌇": "afternoon", "🌙": "night" },
    when: { "🥣": "When do we have breakfast?", "🛏️": "When do we sleep?", "🍲": "When do we have lunch?", "🪥": "When do we brush our teeth and go to bed?" },
    animals: { "🐇": "rabbit", "🐕": "dog", "🐢": "tortoise", "🐈": "cat", "🐿️": "squirrel", "🦆": "duck" },
    parts: ["morning", "noon", "afternoon", "night"]
  }
};

B.EN["math-seed-p17"] = {
  title: "Picture graph",
  words: {
    make: "Put each picture in its column.", most: "Which is the most?", fewest: "Which is the fewest?", howMany: "How many {name} are there?",
    titles: { fruit: "Fruit in the basket", pets: "Pets at the children's homes", toys: "Toys in the box" },
    names: { "🍎": "apples", "🍌": "bananas", "🍇": "bunches of grapes", "🐈": "cats", "🐕": "dogs", "🐟": "fish", "⚽": "balls", "🧸": "teddies", "🚗": "cars" }
  }
};

B.EN["math-seed-p18"] = {
  title: "Guess how many",
  words: { many: "Which jar has lots of beads? Don't count, just look.", few: "Which jar has only a few beads? Don't count, just look.", about: "Don't count, just look. About how many are there?", aboutN: "about {n}" }
};

B.EN["math-seed-p19"] = {
  title: "Hand spans and footsteps",
  words: {
    unit: { "✋": "Measure the {t} in hand spans. Tap each span and count.", "👣": "Measure the {t} in footsteps. Tap each step and count.", "📎": "Measure the {t} in paper clips. Tap each clip and count." },
    things: { "🛏️": "bed", "🚪": "door", "🪑": "chair", "🛋️": "sofa", "✏️": "pencil", "📕": "book", "🥄": "spoon" },
    who: "{a} and {b} measured the same room in footsteps. {a} takes big steps and {b} takes small ones. Who counted more steps?",
    grown: ["Dad", "Mum", "Uncle"], kid: ["Narges", "Arian", "Sara"]
  }
};

B.EN["math-seed-p20"] = {
  title: "Build with shapes",
  words: {
    build: "Make a {name}: put each shape in its place. Turn it if you need to.", made: "You made a {name}!",
    names: { "🏠": "house", "🌲": "tree", "⛵": "boat", "🐟": "fish" },
    roll: "Which things roll? Which don't?", rolls: "Rolls", noRoll: "Doesn't roll",
    like: "Which one looks like a {name}?", likes: { ball: "ball", box: "box", can: "can" },
    says: { "🍊": "orange", "⚽": "ball", "🥫": "can", "🏀": "basketball", "🎁": "gift box", "📚": "books", "🧊": "ice cube", "🎲": "die", "🍉": "watermelon", "📦": "box" }
  }
};

B.EN["math-sprout-p12"] = {
  title: "Ten and some more",
  words: { make: "Make {n} on the frames.", read: "How many counters are on the frames?", teen: "Ten and {k} make what?", bundle: "A bundle of ten and some sticks. How many in all?" }
};

B.EN["math-sprout-p13"] = {
  title: "Which is more?",
  words: { big: "Which number is the biggest?", small: "Which number is the smallest?", order: "Put the numbers in order from smallest to biggest." }
};

B.EN["math-sprout-p14"] = {
  title: "Number sentences",
  words: { pic: "Which sentence tells this picture?", sort: "Is the answer {a} or {b}? Put each one in its answer's basket.", pairs: "Match each sentence with its answer" }
};

B.EN["math-sprout-p15"] = {
  title: "Number balance",
  words: {
    bal: "One pan has {a} and {b}, the other has {c}. Put weights on until the pans are level.", balQ: "So {a} + {b} = {c} + what?",
    hv: "Which pan goes down? First add the numbers on each pan. Tap that pan."
  }
};

B.EN["math-sprout-p16"] = {
  title: "Halves and quarters",
  words: {
    eq: { 2: "Which one is cut exactly in half?", 4: "Which one is cut into four equal parts?" },
    cut: { 2: "Cut this exactly in half. Tap the dotted line.", 4: "Cut this into four equal parts. Tap the dotted lines." },
    name: "How much is coloured?", half: "a half", quarter: "a quarter", whole: "all of it",
    set: "Share {n} {t} in half between two children.", result: "Half of {n} is {k}.",
    things: { "🍪": "biscuits", "🍓": "strawberries", "🍬": "sweets" }
  }
};

B.EN["math-sprout-p17"] = {
  title: "Measure the length",
  words: {
    unit: { "📎": "How many clips long is the {t}? Tap each clip and count.", "🟫": "How many cubes long is the {t}? Tap each cube and count." },
    things: { "✏️": "pencil", "🥄": "spoon", "🖍️": "crayon", "📕": "book", "🥕": "carrot", "🍌": "banana" },
    longer: "Which one is the longest? Tap it.", shorter: "Which one is the shortest? Tap it.",
    why: "We measured the table once with pencils and once with paper clips. Which gave the bigger number?", pencils: "with pencils", clips: "with clips"
  }
};

B.EN["math-sprout-p18"] = {
  title: "Heavier and holds more",
  words: {
    heavier: "Which side is heavier? Tap that pan.", lighter: "Which side is lighter? Tap that pan.",
    cubes: "Weigh the {t} with cubes: put cubes on until the pans are level.", cubesQ: "The {t} weighs the same as how many cubes?",
    holds: "Which one holds more water?",
    things: { "🍉": "watermelon", "🎃": "pumpkin", "🍍": "pineapple", "🪨": "stone", "🍎": "apple", "📕": "book", "🍒": "cherry", "🪶": "feather", "🎈": "balloon", "🍐": "pear", "📱": "phone", "🧸": "teddy", "🥚": "egg" }
  }
};

B.EN["math-sprout-p19"] = {
  title: "Our money",
  words: {
    bills: "How many thousand toman is this money altogether?", pay: "Pay exactly for the {a}.",
    enough: "{p} has {m} thousand toman. The {a} costs {c} thousand toman. Is that enough money?", yes: "Yes, it's enough", no: "No, it's too little",
    goods: { "🍞": "bread", "🥛": "milk", "✏️": "pencil", "🍎": "apples", "📒": "notebook", "🍬": "sweets", "🥚": "eggs" },
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza", "Yasaman", "Kaveh"]
  }
};

B.EN["math-sprout-p20"] = {
  title: "Tally and picture graph",
  words: {
    tally: "Each bundle is five. How many were counted?", make: "Put each picture in its column.",
    n: "How many {a} are there?", more: "How many more {a} than {b}?", all: "How many are there altogether?",
    titles: { fruit: "The children's favourite fruit", weather: "The weather this month", pets: "Pets at the children's homes" },
    names: { "🍎": "apples", "🍌": "bananas", "🍇": "grapes", "🍊": "oranges", "☀️": "sunny days", "🌧️": "rainy days", "☁️": "cloudy days", "🐈": "cats", "🐕": "dogs", "🐟": "fish", "🐦": "birds" }
  }
};

B.EN["math-sprout-p21"] = {
  title: "Left, right, up, down",
  words: {
    arrow: { r: "Which arrow points right?", l: "Which arrow points left?", u: "Which arrow points up?", d: "Which arrow points down?" },
    move: "Get the tortoise to the strawberry with the arrows: {x} squares right and {y} squares up.",
    route: "Start at home. First go to the {a}, then go to the {b}.",
    street: { bakery: "bakery", fruit: "fruit shop", park: "park", school: "school", clinic: "clinic" },
    face: { n: "Turn to face north.", e: "Turn to face east.", s: "Turn to face south.", w: "Turn to face west." },
    turn: { r: "Now turn once to the right.", l: "Now turn once to the left." }
  }
};

B.EN["math-sprout-p22"] = {
  title: "First to tenth",
  words: {
    which: "The animals are lined up behind the flag. Count from the flag. Which one is {nth}?",
    place: "Count from the flag. What place is the {a} in?", floors: "Put the floors of the building in order from the bottom: first, second, third…",
    nth: ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"],
    animals: { "🐇": "rabbit", "🐕": "dog", "🐢": "tortoise", "🐈": "cat", "🐿️": "squirrel", "🦆": "duck", "🐑": "sheep", "🐄": "cow", "🐓": "rooster", "🐖": "pig" }
  }
};

B.EN["math-sprout-p23"] = {
  title: "Day, week, season",
  words: {
    ev: "Put a day's doings in order, from morning to night.",
    says: { "🛏️": "sleep", "🪥": "brushing teeth", "🥣": "breakfast", "🎒": "going to school", "🏫": "class", "🍲": "lunch", "⚽": "playing", "🌅": "morning", "☀️": "noon", "🌇": "afternoon", "🌙": "night" },
    dur: { "🪥": "How long does brushing your teeth take?", "🎬": "How long does watching a film take?", "🌱": "How long does a seed take to sprout?", "🥚": "How long does boiling an egg take?", "🚌": "How long does a bus trip to another city take?", "🏖️": "How long does a holiday trip last?" },
    units: { m: "a few minutes", h: "a few hours", d: "a few days" },
    seasons: "Put the seasons in order, starting with {a}.", months: "Put these months in order, starting with {a}.",
    seasonNames: ["spring", "summer", "autumn", "winter"],
    monthNames: ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"]
  }
};

B.EN["math-sprout-p24"] = {
  title: "Tens to 100",
  words: { read: "The bundles are tens. How many sticks are there altogether?", tu: "{t} bundles of ten and {u} single sticks. What number is that?", more: "{n} and one more bundle of ten. What does it make?", less: "{n} take away one bundle of ten. What does it make?" }
};

B.EN["math-sprout-p25"] = {
  title: "Sides and corners",
  words: {
    sides: "How many sides does this shape have?", corners: "How many corners does this shape have?",
    sort: "Three-sided shapes on one side, four-sided on the other.", three: "3 sides", four: "4 sides",
    pairs: "Match each solid with something that looks like it",
    solids: { cube: "cube", sphere: "sphere", cylinder: "cylinder", cone: "cone", cuboid: "cuboid" }
  }
};

B.EN["math-sprout-p26"] = {
  title: "Pattern detective",
  words: { unit: "Which part of this pattern repeats?", rule: "What is the rule of this pattern?", plus: "{d} more each time", fill: "Find the pattern and fill the gaps." }
};

B.EN["math-sapling-p16"] = {
  title: "Fact families",
  words: { sort: "Is the answer {a} or {b}? Put each one in its answer's basket.", fam: "Match each sum with the subtraction from the same family", wrong: "One of these sentences is wrong. Which one?" }
};

B.EN["math-sapling-p17"] = {
  title: "Number line jumps",
  words: {
    nl: "On the number line: jump to ten first, then the rest.", jumps: "The frog is on {a} and makes {k} jumps of ten. Where does it land?",
    run: "The numbers go {dir} in tens. Fill the gaps.", up: "up", down: "down",
    n9: "{a} + 9: jump ten forward, then one back. What is the answer?"
  }
};

B.EN["math-sapling-p18"] = {
  title: "Add and take with bundles",
  words: { read: "How many bundles of ten and how many single sticks? What number is it?", add: "Add {a} and {b} with bundles. What does it make?", take: "Take {b} from {a}. Open a bundle if you need to. How many are left?" }
};

B.EN["math-sapling-p19"] = {
  title: "Estimate and check",
  words: { est: "Estimate: which is the answer closest to?", ok: "Arash worked this out. Is it right?", yes: "It's right", no: "It's wrong", sense: "Without working it out exactly: which answer is right?" }
};

B.EN["math-sapling-p20"] = {
  title: "Ordering big numbers",
  words: { order: "Put them in order from smallest to biggest.", digits: "Using these three digits, what is the biggest number? {d}", between: "Which two hundreds is {n} between?", and: "and" }
};

B.EN["math-sapling-p21"] = {
  title: "Equal groups",
  words: {
    share: "Share {n} {t} equally on {p} plates.", rep: "Write this sum as a multiplication:", count: "How many rows, and how many in each row? How many altogether?",
    build: "Build a {r} by {c} array: {r} rows with {c} in each row.", things: { "🍪": "biscuits", "🍎": "apples", "🍬": "sweets", "🥚": "eggs" }
  }
};

B.EN["math-sapling-p22"] = {
  title: "Times-table games",
  words: { mem: "Turn the cards over two at a time. Match each multiplication with its answer.", inT: "Which numbers are in the {k} times table?", yes: "In the {k} table", no: "Not in the {k} table", dv: "If {a} × {b} = {c}, what is {c} ÷ {b}?" }
};

B.EN["math-sapling-p23"] = {
  title: "Multiplying and sharing stories",
  words: {
    g: "We have {a} plates with {b} {t} on each plate. How many {t} do we have altogether?",
    sh: "{p} shared {a} {t} equally between {b} friends. How many did each one get?",
    gr: "We have {a} {t}. Each box holds {b}. How many boxes do we need?",
    rm: "We pack {a} {t} into boxes of {b}. How many boxes are full, and how many are left out?", remLabel: "{q} boxes, {r} left out",
    big: "A train ticket costs {b} thousand toman. How many thousand toman do {a} tickets cost?",
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza", "Yasaman", "Kaveh"],
    things: { "🍪": "biscuits", "🍎": "apples", "✏️": "pencils", "🥚": "eggs", "🍊": "oranges" }
  }
};

B.EN["math-sapling-p24"] = {
  title: "How many is a fraction?",
  words: {
    of: "What is {f} of {n} {t}?", order: "Put them in order from smallest to biggest.", half: "Less than a half or more than a half?", less: "less than a half", more: "more than a half",
    things: { "🍬": "sweets", "🍓": "strawberries", "🌰": "walnuts", "🍪": "biscuits" },
    nums: ["", "one", "two", "three", "four", "five", "six", "seven", "eight"],
    dens: { 2: ["half", "halves"], 3: ["third", "thirds"], 4: ["quarter", "quarters"], 5: ["fifth", "fifths"], 6: ["sixth", "sixths"], 8: ["eighth", "eighths"] },
    frac: "{n} {d}"
  }
};

B.EN["math-sapling-p25"] = {
  title: "Telling the time in words",
  words: {
    words: "How do we say {t}?", oclock: "{h} o'clock", half: "half past {h}", quarter: "quarter past {h}", toQ: "quarter to {h}",
    facts: ["How many minutes are in an hour?", "How many minutes are in half an hour?", "How many minutes are in a quarter of an hour?", "How many hours are in a day?"],
    later: "It is {t}. What time will it be {m} minutes later?"
  }
};

B.EN["math-sapling-p26"] = {
  title: "Calendar and units of time",
  words: {
    units: ["How many days are in a week?", "How many months are in a year?", "How many months are in a season?", "How many days are in two weeks?"],
    week: "Put the days of the week in order, starting with {d}.", months: "Put these months in order, starting with {m}.",
    date: "Today is {d} {m}. What date in {m} is it {k} days later?",
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    monthNames: ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"]
  }
};

B.EN["math-sapling-p27"] = {
  title: "Measuring problems",
  words: {
    add: "One piece of string is {a} centimetres long and another is {b} centimetres. If we tie them together, how many centimetres long is it?",
    diff: "The pencil is {a} centimetres long and the rubber is {b} centimetres. How many centimetres longer is the pencil?",
    longer: "Which is longer?", heavier: "Which is heavier?", same: "They are the same",
    units: { mm: "millimetres", cm: "centimetres", m: "metres", km: "kilometres", g: "grams", kg: "kilograms" }
  }
};

B.EN["math-sapling-p28"] = {
  title: "Shopping problems",
  words: {
    enough: "{p} has {m} thousand toman. The {a} costs {c} thousand toman. Is that enough money?", yes: "Yes, it's enough", no: "No, it's too little",
    two: "{p} bought {a} and {b} and paid with a {m} thousand toman note. How much change did {p} get?",
    many: "Each {a} costs {c} thousand toman. How many can you buy with {m} thousand toman?",
    goods: { "🍞": "sangak bread", "🥛": "milk", "🧀": "cheese", "🍎": "apples", "🍊": "oranges", "📒": "notebook", "✏️": "pencil", "🍯": "honey", "🥜": "pistachios", "🥚": "eggs" },
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza", "Yasaman", "Kaveh"]
  }
};

B.EN["math-sapling-p29"] = {
  title: "Polygons",
  words: {
    find: "Which one is the {name}?", sides: "How many sides does this shape have?", right: "How many right angles does this shape have?",
    quad: "Quadrilaterals on one side, the rest on the other.", isQuad: "Quadrilateral", notQuad: "Not a quadrilateral",
    names: { triangle: "triangle", square: "square", rectangle: "rectangle", pentagon: "pentagon", hexagon: "hexagon", octagon: "octagon" }
  }
};

B.EN["math-sapling-p30"] = {
  title: "Solids",
  words: {
    pairs: "Match each solid with something that looks like it",
    fev: "How many {what} does a {name} have?", what: { f: "faces", e: "edges", v: "vertices" },
    solids: { cube: "cube", sphere: "sphere", cylinder: "cylinder", cone: "cone", cuboid: "cuboid", pyramid: "pyramid" },
    curved: "Which ones have a curved face?", flat: "All faces flat", round: "Has a curved face",
    says: { "🎲": "die", "📦": "box", "🧊": "ice cube", "⚽": "ball", "🥫": "can", "🍦": "ice-cream cone", "🕯️": "candle", "🍊": "orange", "🎁": "gift box" }
  }
};

B.EN["math-sapling-p31"] = {
  title: "Symmetry",
  words: {
    lines: "Find every line of symmetry of this shape. If it has none, tap \"none\".",
    mirror: "Colour the other half of this pattern so both sides of the line match.",
    count: "How many lines of symmetry does a {name} have?", many: "Countless", names: { square: "square", rectangle: "rectangle", circle: "circle" }
  }
};

B.EN["math-sapling-p32"] = {
  title: "Grid squares",
  words: { find: "Find the square in column {c}, row {r}. Column first (from the left), then row (from the bottom).", move: "Take the robot to the square in column {c}, row {r}." }
};

B.EN["math-sapling-p33"] = {
  title: "Certain, possible, impossible",
  words: {
    sort: "Put each sentence in its basket: certain, possible or impossible.", c: "certain", p: "possible", i: "impossible",
    says: { sun: "The sun will rise tomorrow", rain: "It will rain today", catfly: "A cat flies", dice7: "A die rolls a 7", dice6: "A die rolls a 6",
      night: "After day comes night", snowSummer: "Heavy snow falls in Tehran in the middle of summer", coin: "A coin lands heads", fish: "A fish climbs a tree", week: "Saturday comes after Friday" },
    bag: "A bag has {a} {x} marbles and {b} {y} marbles. We take one without looking. Which is more likely?",
    colors: { "🔴": "red", "🔵": "blue", "🟢": "green", "🟡": "yellow" },
    spin: "The spinner has {a} {x} parts and one {y} part. Spin it 12 times and make a tally mark each time.", spinQ: "Which came up most?"
  }
};

B.EN["math-sapling-p34"] = {
  title: "Tables and line plots",
  words: {
    tally: "Each bundle is five. How many were counted?",
    books: "Books the children read in a month", booksQ: "How many more books did {a} read than {b}?",
    people: ["Arian", "Sogand", "Parham", "Taraneh", "Kaveh"],
    plot: "Lengths of the class's pencils (centimetres)", plotP: "We measured the pencils: {list}. Put an ✖ above the length of each pencil.", plotQ: "How long were most of the pencils, in centimetres?"
  }
};

B.EN["math-sapling-p35"] = {
  title: "Find a way to solve it",
  words: {
    gc: "Two numbers add up to {s}, and one is {d} more than the other. What are they? Guess and check.", and: "and",
    tb: "Each {t} has {k} {part}. Make a table: 1 {t}, 2 {t}s, … How many {part} do {n} {t}s have?",
    things: { 2: ["hen", "legs"], 3: ["tricycle", "wheels"], 4: ["cat", "legs"], 6: ["ant", "legs"] },
    bk: "{p} had some marbles. {p} won {a}, then gave {b} to a friend. Now {p} has {c}. How many did {p} have at first? Think from the end back to the start.",
    people: ["Sara", "Ali", "Mina", "Arash", "Negar", "Reza"]
  }
};

B.EN["math-sapling-p36"] = {
  title: "Perimeter or area?",
  words: {
    sq: "Each side of a square tile is {s} centimetres. What is its perimeter in centimetres?",
    fl: "We covered the floor with square tiles: {r} rows with {c} tiles in each row. How many tiles did we need?",
    which: { fence: "We want to put a fence around the flower bed.", carpet: "We want to carpet the floor of the room.", frame: "We want to put a frame around the photo.", paint: "We want to paint the wall.", ribbon: "We want to stick ribbon around the gift box.", tiles: "We want to tile the bathroom floor." },
    ask: "Do we need the perimeter or the area?", p: "perimeter", a: "area"
  }
};
