/* باغچه — سلامت و ایمنی (health) lessons in English, for children learning English as a second language.
   Each entry lays English words over the Persian lesson with the same id (js/lessons/health.js); steps are matched
   by position, {} leaves a step as it is. See js/english-mode.js. The body-safety lessons (health-sapling-3,
   health-all-1) follow the Persian lesson and the Underwear Rule exactly: keep them calm and plain. */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

(function () {
  var LOOK = { prompt: "Look at the story" };

  Object.assign(B.EN, {
    // ---------------- Seed ----------------
    "health-seed-1": { title: "I wash my hands", steps: [
      { prompt: "See how we wash our hands",
        scenes: [
          { caption: "We turn on the tap and wet our hands under the water." },
          { caption: "We turn the tap off so no water is wasted, and we put soap on our hands." },
          { caption: "We rub our palms together until they make foam.",
            wait: { hint: "Now it's your turn: move your finger or the mouse left and right over the hands!" } },
          { caption: "We rub the backs of our hands too." },
          { caption: "We wash between our fingers too. We count slowly to twenty." },
          { caption: "We turn the tap on and hold our hands under the water, so the foam and the germs go away." },
          { caption: "We turn the tap off and dry our hands with a clean towel." },
          { caption: "Our hands are clean!" }
        ] },
      { prompt: "Put the hand-washing steps in order",
        items: [{ label: "Wet" }, { label: "Soap" }, { label: "Rub" }, { label: "Rinse" }] },
      { prompt: "What do we do before we eat?", say: "What do we do before we eat?",
        options: ["🧼 We wash our hands", "😴 We sleep", "🎈 We blow up a balloon"], answer: "🧼 We wash our hands" },
      { text: "Now go with a grown-up and wash your hands with water and soap. Count slowly to twenty." },
      { tips: [
        "Wash hands with soap and water at these times: before eating and cooking, after using the toilet, after playing outside, after touching an animal, and after blowing the nose, sneezing or coughing.",
        "Washing should take at least 20 seconds. Count slowly to 20 together, or sing a short rhyme.",
        "Warm water is not needed; cold water and soap clean well too. If there is no running water, one person pours water from a jug while the other washes.",
        "Children learn more from watching you than from listening to you. Wash your hands together."
      ] }
    ] },
    "health-seed-2": { title: "I brush my teeth", steps: [
      { prompt: "See how we brush our teeth",
        scenes: [
          { caption: "In the morning, we brush our teeth." },
          { caption: "At night, before bed, we brush our teeth too." },
          { caption: "A little toothpaste, the size of a pea, is enough." },
          { caption: "We brush the front of our teeth gently, in small circles.",
            wait: { hint: "Now it's your turn: brush the bottom teeth! Move your finger or the mouse left and right over the teeth." } },
          { caption: "Now we see the bottom teeth from above. We brush the backs of the teeth in small circles too." },
          { caption: "We brush the tops of the teeth too, back and forth." },
          { caption: "We spit out the toothpaste." },
          { caption: "Our teeth are clean!" }
        ] },
      { prompt: "How many times a day do we brush our teeth?",
        options: [{ label: "Once" }, { label: "Twice" }, { label: "Five times" }] },
      { prompt: "At night, what comes first? Put them in order",
        items: [{ label: "Dinner" }, { label: "Brush teeth" }, { label: "Sleep" }] },
      { prompt: "Match each thing with the part of the body it is for",
        pairs: [[{ say: "toothbrush" }, { say: "tooth" }], [{ say: "soap" }, { say: "hand" }], [{ say: "shoe" }, { say: "foot" }]] },
      { tips: [
        "Brush twice a day: in the morning, and as the last thing before bed. After brushing at night, have nothing but water.",
        "Use toothpaste with fluoride. For a child who cannot spit yet, use a smear the size of a grain of rice; after that, the size of a pea.",
        "After brushing, spit out the toothpaste and do not rinse much, so the fluoride stays on the teeth.",
        "Until your child brushes well alone, help them or brush again after them. Keep sweet food and drinks to mealtimes, not between meals.",
        "If you can, visit a dentist or your local health centre once or twice a year."
      ] }
    ] },
    "health-seed-3": { title: "My body", steps: [
      { prompt: "What does our body do?",
        scenes: [
          { caption: "This is an eye. We see with our eyes." },
          { caption: "This is an ear. We hear with our ears." },
          { caption: "This is a nose. We smell with our nose." },
          { caption: "This is a mouth. We eat and talk with our mouth." },
          { caption: "We hold things with our hands." },
          { caption: "We walk and run with our legs and feet." }
        ] },
      { prompt: "What do we hear with?", say: "What do we hear with?",
        options: [{ value: "eye" }, { value: "ear" }, { value: "foot" }], answer: "ear" },
      { prompt: "What do we smell with?", say: "What do we smell with?",
        options: [{ value: "hand" }, { value: "mouth" }, { value: "nose" }], answer: "nose" },
      { prompt: "Match each one with what we sense with it",
        pairs: [[{ say: "eye" }, { say: "rainbow" }], [{ say: "ear" }, { say: "bell" }], [{ say: "nose" }, { say: "flower" }]] },
      { text: "The “Touch your…” game! A grown-up says it and you touch:",
        list: ["your nose", "your ears", "your knees", "your elbow", "now clap and stamp your feet!"] },
      { tips: [
        "When you dress, bathe and eat, say the names of the body parts: “Let's wash your hands”, “Put your sock on your foot.”",
        "Keep playing “Touch your…” with new body parts: elbow, wrist, shoulder, heel.",
        "Say the names of the private parts of the body in the same calm, ordinary voice you use for nose and elbow. The lesson “My body is mine” in this section is about this.",
        "Do not talk about your child's body or other people's bodies with words like fat, thin, ugly or short. Say what good things our bodies do for us."
      ] }
    ] },
    "health-seed-4": { title: "Water and food", steps: [
      { prompt: "Look at the breakfast table",
        scenes: [
          { caption: "The breakfast table is full of colours: bread, cheese and walnuts, cucumber and tomato, an egg." },
          { caption: "Colourful food gives our bodies energy to play." },
          { caption: "Food helps us grow." },
          { caption: "When we are thirsty, the best drink is water." }
        ] },
      { prompt: "Which do we eat every day, and which only sometimes, and just a little?",
        baskets: [{ label: "Every day" }, { label: "Sometimes, a little" }],
        items: [{ say: "bread" }, { say: "apple" }, { say: "cucumber" }, { say: "cheese" }, { say: "candy" }, { say: "fizzy drink" }, { say: "cake" }] },
      { prompt: "You are thirsty after playing. What is better to drink?", say: "You are thirsty after playing. What is better to drink?",
        options: ["💧 Water", "🥤 A fizzy drink"], answer: "💧 Water" },
      { text: "Go and drink a glass of water. Enjoy!" },
      { tips: [
        "Do not call foods “good” and “bad”; say “every day” and “sometimes”. Do not use sweets as a prize, and do not use food as a punishment.",
        "A simple Iranian table is very good: bread, cheese, walnuts, yoghurt, lentils, beans, eggs, rice, and fruit and vegetables in season. Have fruit and vegetables every day.",
        "Water is the best drink. Cut down on fizzy drinks, packaged juice, and very sweet or very salty foods.",
        "If you are not sure about your tap water, boil it and keep it in a clean, covered container.",
        "Do not talk about your child's weight, or anyone else's, in front of them. Ask your child to listen to their own hunger and fullness, and do not make them finish the plate."
      ] }
    ] },

    "health-seed-5": { title: "Toilet and bath", steps: [
      { prompt: "See how we keep our body clean",
        scenes: [
          { caption: "After using the toilet, we flush it." },
          { caption: "Then we wash our hands with water and soap." },
          { caption: "In the bath, we wash our hair and our body with water and soap. A grown-up is always with us." },
          { caption: "When our nails grow long, dirt gets under them. We cut them short with nail clippers." },
          { caption: "We wipe our runny nose with a tissue." },
          { caption: "We throw the tissue in the bin and wash our hands." },
          { caption: "Clean and comfy!" }
        ] },
      { prompt: "What do we do after using the toilet? Put it in order",
        items: [{ label: "We flush" }, { label: "We wash our hands with soap" }, { label: "We rinse" }, { label: "We dry them" }] },
      { prompt: "Your nose is runny. What do you do?", say: "Your nose is runny. What do you do?",
        options: ["🧻 I wipe it with a tissue and throw the tissue in the bin", "👕 I wipe it on my sleeve", "🛋️ I leave the tissue on the sofa"],
        answer: "🧻 I wipe it with a tissue and throw the tissue in the bin" },
      { prompt: "When do we have a bath?", say: "When do we have a bath?",
        options: ["🛁 With a grown-up right next to us", "🙈 Alone, when nobody is at home"], answer: "🛁 With a grown-up right next to us" },
      { text: "Look at your nails. Are they long? Is there dirt under them? If so, ask your grown-up to cut them. Then wash your hands with water and soap." },
      { tips: [
        "Help your child, little by little, to use the toilet on their own: flushing, washing hands with soap and water, and drying them. Teach girls to wash or wipe from front to back.",
        "Never leave a young child alone in a bath or a tub of water, not even for a moment. Drowning in shallow water is silent and quick.",
        "At bath time, let your child wash their own body with soap while you help. Name every part of the body in the same ordinary voice.",
        "Cut finger and toe nails every week; after a bath is best, when they are soft. Short nails hold fewer germs.",
        "Keep tissues within your child's reach and have a bin with a lid. Wash hands after blowing the nose."
      ] }
    ] },
    "health-seed-6": { title: "The clean game", steps: [
      { prompt: "When do we wash our hands with soap and water?",
        baskets: [{ label: "We wash our hands" }, { label: "No need" }],
        items: [
          { label: "Before eating", say: "Before eating" }, { label: "After the toilet", say: "After using the toilet" },
          { label: "After playing outside", say: "After playing outside" }, { label: "After stroking an animal", say: "After stroking an animal" },
          { label: "After blowing our nose", say: "After blowing our nose" }, { label: "When we look at a book", say: "When we look at a book" },
          { label: "When we sing", say: "When we sing" }
        ] },
      { prompt: "Put the hand-washing steps in order",
        items: [{ label: "Wet" }, { label: "Soap" }, { label: "Rub" }, { label: "Rinse" }, { label: "Dry" }] },
      { prompt: "Put the tooth-brushing steps in order",
        items: [{ label: "Toothpaste, the size of a pea" }, { label: "Brush the front and back of the teeth" }, { label: "Spit" }] },
      { text: "Today, every time you wash your hands, count slowly to twenty. Tonight, tell your grown-up how many times you washed your hands." },
      { tips: [
        "Play this game at home too: ask “Shall we wash our hands now, or is there no need?” before meals, after the toilet, after playing outside, after stroking an animal and after blowing the nose.",
        "Put a step by the basin so your child can reach the tap and the soap, and hang their towel where they can reach it.",
        "Brush teeth together at night and finish the job after your child. Most children still need help until they are seven or eight."
      ] }
    ] },
    "health-seed-7": { title: "Like the animals", steps: [
      { prompt: "Watch, and move like the animals",
        scenes: [
          { caption: "We find an empty space on the rug. Let's move like the animals!" },
          { caption: "We walk like a bear: hands and feet on the floor." },
          { caption: "Like a rabbit, we make small, gentle hops with our feet together." },
          { caption: "Like a frog, we crouch down low and jump up high." },
          { caption: "Like a crab, tummy up, we walk on our hands and feet." },
          { caption: "Like a stork, we stand on one leg and count to five." },
          { caption: "Well done! Now it's your turn." }
        ] },
      { text: "Now you! On a rug or an empty space, away from tables and edges, do each one a few times:",
        list: ["Walk like a bear: hands and feet on the floor.", "Make small hops like a rabbit.", "Crouch down like a frog and jump up high.", "Walk like a crab, tummy up.", "Stand on one leg like a stork and count to five. Now the other leg!"] },
      { prompt: "Match each animal with its move",
        pairs: [[{ say: "bear" }, { label: "Hands and feet on the floor", say: "Hands and feet on the floor" }],
          [{ say: "rabbit" }, { label: "A small hop", say: "A small hop" }],
          [{ say: "frog" }, { label: "A big jump", say: "A big jump" }],
          [{ say: "crab" }, { label: "Tummy up", say: "Tummy up" }]] },
      { text: "Play “Animal says”: your grown-up names an animal and you move like it. Then swap! Invent a new animal too: a snake, a penguin or a horse." },
      { tips: [
        "Young children need about three hours of play and movement a day in all, with at least one hour of it lively (World Health Organization). Animal moves are an easy way to get there.",
        "Get a clear space ready: a rug or a blanket, away from table corners, glass and stairs. Take socks off so your child doesn't slip.",
        "Don't make your child repeat moves. Play along: “Now I'm a bear, you be a rabbit!” or invent a new animal together: a snake, a penguin, a horse.",
        "Practise standing on one leg with both legs. At first, your child can hold on to a wall if they need to."
      ] }
    ] },
    "health-seed-8": { title: "Run and stop!", steps: [
      { prompt: "Watch, and let's play together",
        scenes: [
          { caption: "We run and run. The grown-up says “Stop!” and we stop right there, without moving." },
          { caption: "We jump with our feet together and land softly: knees bent." },
          { caption: "We walk along a line: one foot in front of the other." },
          { caption: "We stand on one foot and count to five." },
          { caption: "Well done! Now let's play “Stop!” together." }
        ] },
      { prompt: "Your grown-up says: “Stop!” What do you do?", say: "Your grown-up says: Stop! What do you do?",
        options: ["🧍 I stop right there", "🏃 I run faster"], answer: "🧍 I stop right there" },
      { prompt: "When we jump, how do we land?", say: "When we jump, how do we land?",
        options: ["🦵 Softly, with bent knees", "🪵 Hard, with straight legs"], answer: "🦵 Softly, with bent knees" },
      { text: "Play “Stop!” with your grown-up: you run or walk, they say “Stop!” and you freeze like a statue. Then do these too:",
        list: ["Jump with both feet and land softly: knees bent.", "Walk along a line: one foot in front of the other.", "Stand on one foot and count to five. Now the other foot!"] },
      { tips: [
        "The “Stop!” (statues) game teaches your child to control their body and listen for a signal. Change the signal: a clap, a raised scarf, the music stopping.",
        "Choose a safe place to run: a yard, a park or an empty hallway, away from the street, stairs and glass.",
        "Draw a line on the floor with chalk, masking tape or a rope for your child to walk along. Then try it backwards or on tiptoe.",
        "Practise jumping and landing softly together a few times; it matters for the joints and for not falling. If your child can't stand on one foot yet, hold their hand."
      ] }
    ] },
    "health-seed-9": { title: "The soft ball", steps: [
      { prompt: "See how we play with a soft ball",
        scenes: [
          { caption: "We roll up some socks and make a soft ball." },
          { caption: "We find an empty space, away from the window and things that can break." },
          { caption: "We roll the ball to each other along the floor." },
          { caption: "We throw the ball to each other, gently and from below." },
          { caption: "We catch the ball with two hands." },
          { caption: "We put the ball on the floor and kick it gently." },
          { caption: "What a good game! You play with a grown-up too." }
        ] },
      { text: "Make a sock ball with a grown-up: roll up a few socks and push them into another sock. Now play together in an empty space, away from the window:",
        list: ["Roll the ball to each other along the floor.", "Throw it to each other, gently and from below.", "Catch it with two hands.", "Kick it gently."] },
      { prompt: "Which ball do we play with indoors?", say: "Which ball do we play with indoors?",
        options: ["🧦 A soft sock ball", "🏀 A hard, heavy ball"], answer: "🧦 A soft sock ball" },
      { prompt: "Where shall we play ball?", say: "Where shall we play ball?",
        options: ["🫧 An empty space, away from the window", "🪟 Next to the window and the television"], answer: "🫧 An empty space, away from the window" },
      { tips: [
        "Indoors, only soft balls: rolled-up socks, a cloth ball or a balloon. Clear the space together first, and stay away from windows, glass, the television and plant pots.",
        "Start close (one or two steps) and move further apart little by little. First rolling, then throwing from below, then catching.",
        "Catching is hard for young children. Throw the ball gently, right into their hands, and praise every try, not only the catches.",
        "Practise with both hands and both feet: “Now with your other foot!”"
      ] }
    ] },
    "health-seed-10": { title: "My little workout", steps: [
      { prompt: "Watch, and let's exercise together",
        scenes: [
          { caption: "First a big stretch: we reach our arms up and stand tall." },
          { caption: "We march: knees up, arms swinging." },
          { caption: "We jump on the spot." },
          { caption: "We wiggle our whole body." },
          { caption: "We put a hand on our chest. Our heart is beating fast! When we move, the heart beats faster." },
          { caption: "Now we calm down: we breathe slowly, and the heart beats more slowly too." }
        ] },
      { text: "Now do your own little workout, with your grown-up:",
        list: ["Stretch: arms up, stand tall. Three times.", "March: knees up. Count to ten.", "Jump on the spot. Ten times.", "Wiggle your body.", "Put your hand on your chest. Can you feel your heart?"] },
      {},
      { prompt: "When we move fast, how does our heart beat?", say: "When we move fast, how does our heart beat?",
        options: ["💓 Faster", "😴 More slowly"], answer: "💓 Faster" },
      { tips: [
        "Do this little workout together every day, in the morning or the afternoon; five minutes is enough. Change the moves to keep it fresh.",
        "The World Health Organization says young children need about three hours of physical activity a day, at least one hour of it lively (running, jumping, energetic play). From age five, at least one hour of lively activity every day.",
        "Don't keep your child sitting for more than an hour at a time: in the car, in front of a screen or at a table. After a long sit, move a little together.",
        "After the workout, put your child's hand on their chest so they feel their heart beating fast, and then, after a few slow breaths, slowing down. Always finish by calming down."
      ] }
    ] },
    "health-seed-22": { title: "High, low, fast, slow", steps: [
      { prompt: "See how we move in our own space",
        scenes: [
          { caption: "Each of us has a bubble around us: our own space. We move inside our own bubble." },
          { caption: "We go high: on tiptoe, arms up." },
          { caption: "We go low: we crouch down and make ourselves small." },
          { caption: "We walk fast." },
          { caption: "We walk slowly, like a tortoise." },
          { caption: "We walk forwards, and we walk backwards." },
          { caption: "We go sideways too." },
          { caption: "We come close to each other and stop before our bubbles bump." }
        ] },
      { prompt: "Your friend is in front of you and you are running fast. What do you do?", say: "Your friend is in front of you and you are running fast. What do you do?",
        options: ["🧍 I slow down and stop before I reach them", "💥 I keep running fast"], answer: "🧍 I slow down and stop before I reach them" },
      { prompt: "Which one is “low”?", say: "Which one is low?" },
      { text: "Open your arms and turn around: that's your bubble! Now, in your bubble, your grown-up says and you do:",
        list: ["High: on tiptoe, arms up.", "Low: crouch down and make yourself small.", "Walk fast… walk slowly.", "Go forwards, backwards, sideways.", "“Stop!”"] },
      { tips: [
        "“My bubble” means your child's own space. When they open their arms and turn around, they feel how big it is. It helps them not bump into others in group games, in a queue and in class.",
        "Play “Grown-up says”: say one word (high, low, fast, slow, forwards, backwards, sideways, stop) and your child does it. Then swap, and let your child give the orders.",
        "Play in an open, quiet space first. Your child should be able to go fast and stop without bumping into anything; this skill matters in the street and the school yard too."
      ] }
    ] },
    "health-seed-23": { title: "To the beat", steps: [
      { prompt: "Listen, and move to the beat",
        scenes: [
          { caption: "Dad plays the tonbak: boom, boom, boom. We clap to the beat." },
          { caption: "We march to the beat: knees up." },
          { caption: "The beat is fast now: we take quick steps too." },
          { caption: "The beat is slow now: we sway slowly too." },
          { caption: "The sound has stopped: we freeze!" }
        ] },
      { text: "Ask your grown-up to make a beat with a pot and a spoon or by clapping, or to put on a children's song. Move to the beat:",
        list: ["Clap.", "March.", "A fast beat: take quick steps. A slow beat: sway slowly.", "The sound stops: freeze like a statue!"] },
      { prompt: "The beat is fast now. How do we move?", say: "The beat is fast now. How do we move?",
        options: ["🏃 Fast", "🐢 Slowly"], answer: "🏃 Fast" },
      { prompt: "The sound has stopped! What do we do?", say: "The sound has stopped! What do we do?",
        options: ["🧍 We freeze like a statue", "🤸 We jump even more"], answer: "🧍 We freeze like a statue" },
      { tips: [
        "Moving to a beat helps body coordination and listening, and later reading and maths too. You need no instrument: clapping, a pot and a spoon, or tapping on a table is enough.",
        "Make the beat fast, then slow, then stop suddenly so your child becomes a “statue”. Then swap: let your child keep the beat while you move.",
        "Sing your own children's songs and rhymes, the ones your family and your region know."
      ] }
    ] },
    "health-seed-11": { title: "Colours of the sofreh", steps: [
      { prompt: "Look at the colours on the sofreh",
        scenes: [
          { caption: "Fruit and vegetables come in every colour: red, orange, yellow, green and purple." },
          { caption: "We put a little of each colour on our plate." },
          { caption: "We sit together at the sofreh and chew slowly, taking our time." },
          { caption: "We try a new taste: just one small bite!" }
        ] },
      { prompt: "Put each one in the basket of its colour",
        baskets: [{ label: "Red" }, { label: "Green" }, { label: "Yellow" }],
        items: [{ say: "tomato" }, { say: "apple" }, { say: "strawberry" }, { say: "cucumber" }, { say: "lettuce" }, { say: "banana" }, { say: "lemon" }] },
      { prompt: "Now the orange ones and the purple ones",
        baskets: [{ label: "Orange" }, { label: "Purple" }],
        items: [{ say: "carrot" }, { say: "orange" }, { say: "grapes" }, { say: "aubergine" }, { say: "barberries" }] },
      { text: "At today's meal, count how many colours of fruit and vegetables you have. Try one small bite of a food you have never eaten before. Chew slowly!" },
      { tips: [
        "Put fruit and vegetables of different colours on the table every day; fruit and vegetables in season are cheaper and tastier. Fresh herbs, cucumber and tomato next to a meal count too.",
        "Children sometimes need to see and taste a new food ten times or more before they like it. Don't force it; offer one small bite, and if they don't want it, try again another day.",
        "Don't call any food “bad”, and don't use food as a reward or a punishment. Say “we eat this every day” and “we eat this sometimes”.",
        "Sit together at meals, without the television or phones. Eating slowly and talking at the table helps your child notice when they are full."
      ] }
    ] },
    "health-seed-12": { title: "Good night, body", steps: [
      { prompt: "See what we do in the evening",
        scenes: [
          { caption: "It's night-time. First we eat dinner together." },
          { caption: "Then we brush our teeth." },
          { caption: "We use the toilet, and then we wash our hands." },
          { caption: "In bed, a grown-up reads us a story. The light is low and everything is quiet." },
          { caption: "We turn off the light and go to sleep. While we sleep, the body rests and grows." },
          { caption: "In the morning, we wake up fresh!" }
        ] },
      { prompt: "Put the evening things in order",
        items: [{ label: "Dinner" }, { label: "Brush teeth" }, { label: "Toilet" }, { label: "Story" }, { label: "Sleep" }] },
      { prompt: "Which is better before bed?", say: "Which is better before bed?",
        options: ["📖 A story with the light low", "📱 Playing on a phone"], answer: "📖 A story with the light low" },
      { prompt: "When we sleep well, what happens to our body?", say: "When we sleep well, what happens to our body?",
        options: ["💪 It rests and grows", "😩 It gets more tired"], answer: "💪 It rests and grows" },
      { tips: [
        "Children aged three to five need 10 to 13 hours of sleep in 24 hours (including a nap). Put them to bed at the same time every night and wake them at the same time every morning, even at weekends.",
        "Do the bedtime things in the same order every night: dinner, teeth, toilet, story, sleep. A fixed order calms children.",
        "Turn screens (television, phone, tablet) off an hour before bed and dim the lights at home. The bedroom should be dark, quiet and cool.",
        "If your child is afraid of the dark, leave a dim night light on and talk calmly about the fear. The “My feelings” lesson on calming down before sleep helps too."
      ] }
    ] },
    "health-seed-13": { title: "I don't feel well", steps: [
      { prompt: "See what we do when we don't feel well",
        scenes: [
          { caption: "When we don't feel well or something hurts, we tell our grown-up." },
          { caption: "We rest on the sofa and drink water." },
          { caption: "If we need to, we go to the doctor. The doctor helps us get better." },
          { caption: "Only a grown-up gives us medicine, just the amount the doctor said." },
          { caption: "Little by little we feel better, and we play again!" }
        ] },
      { prompt: "Your tummy hurts. What do you do?", say: "Your tummy hurts. What do you do?",
        options: ["🗣️ I tell my grown-up", "🤐 I don't tell anyone", "💊 I take medicine myself"], answer: "🗣️ I tell my grown-up" },
      { prompt: "When we are ill, what helps us?", say: "When we are ill, what helps us?",
        options: ["🛋️ Rest and water", "🏃 Lots of running"], answer: "🛋️ Rest and water" },
      { prompt: "Who gives us medicine?", say: "Who gives us medicine?",
        options: ["👩 The grown-up who looks after us", "🧒 Me", "👦 My friend"], answer: "👩 The grown-up who looks after us" },
      { tips: [
        "Tell your child to come to you whenever they feel unwell or something hurts, and when they do, listen calmly and patiently. A child who is listened to speaks up sooner.",
        "Never call medicines, vitamins or pills “sweets”. Keep all medicines high up, in a closed cupboard, out of your child's reach.",
        "Give medicine only in the amount the doctor or pharmacist said, with its own measure, not a kitchen spoon. If your child swallows medicine by mistake, call the emergency number 115 straight away.",
        "Take these signs seriously and see a doctor or call for help quickly: a high fever in a baby, difficulty breathing, being very drowsy, passing little urine or a dry mouth, or anything that worries you."
      ] }
    ] },
    "health-seed-14": { title: "It's hot! It's sharp!", steps: [
      { prompt: "See which things are hot or sharp",
        scenes: [
          { caption: "Tea and the samovar are hot. We don't touch them." },
          { caption: "The stove, the heater and the iron are hot too." },
          { caption: "Knives, scissors and broken glass are sharp." },
          { caption: "If we see something hot or sharp, we stop and tell a grown-up." },
          { caption: "The grown-up sweeps up the glass while we stand back." }
        ] },
      { prompt: "There is a glass of hot tea on the table. What do you do?", say: "There is a glass of hot tea on the table. What do you do?",
        options: ["✋ I don't touch it and I tell a grown-up", "🤲 I pick it up"], answer: "✋ I don't touch it and I tell a grown-up" },
      { prompt: "A glass has fallen and broken. What do you do?", say: "A glass has fallen and broken. What do you do?",
        options: ["🧍 I stay where I am and call a grown-up", "🖐️ I pick up the pieces"], answer: "🧍 I stay where I am and call a grown-up" },
      { prompt: "Which is hot and which is sharp?",
        baskets: [{ label: "Hot" }, { label: "Sharp" }],
        items: [{ say: "teapot" }, { say: "food on the stove" }, { say: "hot tea" }, { say: "knife" }, { say: "scissors" }, { say: "saw" }] },
      { tips: [
        "Burns from hot liquids (tea, boiling water, food) are among the most common injuries in young children. Keep tea glasses and teapots away from the table edge, don't use a hanging tablecloth, and turn pan handles inwards on the stove.",
        "Keep the samovar, the heater and the iron away from where your child plays, and put a guard in front of the heater. After ironing, let the iron cool out of reach and don't leave its cable hanging.",
        "Keep knives, sharp scissors, blades and glass in a drawer or up high. If something breaks, move your child away and clear it up yourself.",
        "Teach your child: “If you see something hot or sharp, stop and tell a grown-up.” Thank them every time they do."
      ] }
    ] },
    "health-seed-15": { title: "Looks like food, but no!", steps: [
      { prompt: "Look carefully: which one is food?",
        scenes: [
          { caption: "These are sweets and these are pills. They look very alike!" },
          { caption: "This is juice and this is a cleaning liquid. It looks like a drink too!" },
          { caption: "Small round batteries and magnets look like sweets too." },
          { caption: "We never taste something when we don't know what it is. We don't touch it, and we tell a grown-up." },
          { caption: "The grown-up picks them up and puts them in a high cupboard with a lock." }
        ] },
      { prompt: "You have found some coloured pills on the floor. What do you do?", say: "You have found some coloured pills on the floor. What do you do?",
        options: ["🗣️ I don't touch them and I tell a grown-up", "😋 I taste one", "🎒 I put them in my pocket"], answer: "🗣️ I don't touch them and I tell a grown-up" },
      { prompt: "There is a coloured bottle on the floor. It looks like juice. What do you do?", say: "There is a coloured bottle on the floor. It looks like juice. What do you do?",
        options: ["🙅 I don't drink it and I show it to a grown-up", "🥤 I drink a little"], answer: "🙅 I don't drink it and I show it to a grown-up" },
      { prompt: "Which one can we eat?", say: "Which one can we eat?" },
      { tips: [
        "Keep all medicines, vitamins, cleaning products, bleach, poisons and kerosene up high in a locked cupboard, not under the sink. Never pour them into water or soft-drink bottles.",
        "Button batteries (in remote controls, watches and toys) and small magnets are very dangerous if swallowed. Fasten battery covers with a screw or tape, and throw old batteries away out of reach.",
        "If your child eats or drinks something they shouldn't: stay calm, don't make them vomit, and call the emergency number 115 straight away. Keep the container or packet and take it with you.",
        "Don't call medicine “sweets” in front of your child, and don't take pills in front of them; children copy grown-ups."
      ] }
    ] },
    "health-seed-16": { title: "The safe-or-ask game", steps: [
      { prompt: "At home: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "teddy bear" }, { say: "storybook" }, { say: "puzzle" }, { say: "pills" }, { say: "knife" }, { say: "plug socket" }, { say: "hot tea" }] },
      { prompt: "Near water: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "washing hands at the basin" }, { say: "drinking a glass of water" }, { say: "going to the sea" }, { say: "going to the pool" }, { say: "playing with a bucket full of water" }, { say: "getting into the bath" }] },
      { prompt: "Near the road: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "the slide in the park" }, { say: "holding a grown-up's hand" }, { say: "crossing the street" }, { say: "running after a ball into the street" }, { say: "riding a bike next to cars" }] },
      { text: "Look around your home with your grown-up: find three things that are safe to play with, and three things you should ask a grown-up about." },
      { tips: [
        "The simple rule of this unit: “If you're not sure, stop and ask a grown-up.” Repeat it at home, near water and near the street.",
        "After the home hunt, look at your home from your child's eye level yourself: sockets, medicines and cleaning products, knives, the iron's cable, windows and the balcony.",
        "Thank your child for asking, even when the answer is “yes, it's safe”. A child who enjoys asking asks more often."
      ] }
    ] },
    "health-seed-17": { title: "Water play with a grown-up", steps: [
      { prompt: "See how we play with water",
        scenes: [
          { caption: "Playing with water is great fun! But only when a grown-up is with us, watching us." },
          { caption: "If the grown-up goes away, we move away from the water too and wait." },
          { caption: "At the sea or a river, only with a grown-up, hand in hand, at the edge." },
          { caption: "The same goes for a bucket full of water and the bath: only when a grown-up is with us." }
        ] },
      { prompt: "Which do we do only with a grown-up?",
        baskets: [{ label: "Only with a grown-up" }, { label: "I can do it myself" }],
        items: [{ say: "going to the sea" }, { say: "going to the pool" }, { say: "a bath in the tub" }, { say: "playing with a bucket of water" }, { say: "washing my hands" }, { say: "drinking water" }] },
      { prompt: "You are playing by the pool in the yard and your grown-up has gone inside. What do you do?", say: "You are playing by the pool in the yard and your grown-up has gone inside. What do you do?",
        options: ["🚶 I move away from the water and wait, or go with them", "💦 I play in the water on my own"], answer: "🚶 I move away from the water and wait, or go with them" },
      { prompt: "Your ball has fallen into the water. What do you do?", say: "Your ball has fallen into the water. What do you do?",
        options: ["🙋 I tell a grown-up so they can get it", "🤸 I lean over and get it myself"], answer: "🙋 I tell a grown-up so they can get it" },
      { tips: [
        "Drowning is silent and very quick, even in a few centimetres of water: in a bath, a tub, a bucket, a garden pool or a paddling pool. Never leave a young child alone near water, not even for a moment, and keep your eyes on them.",
        "Near water, one grown-up should watch only the children, with no phone and nothing else to do. If you have to go, take your child with you.",
        "Cover garden pools, water tanks, wells and swimming pools with a lid, a net or a fence. Empty tubs and buckets after use and turn them upside down.",
        "At the sea or a river, swim only where there is a lifeguard. Rivers and dams have strong currents even near the bank. It is best for children to learn to swim with a teacher from about five."
      ] }
    ] },
    "health-seed-18": { title: "Friends with animals", steps: [
      { prompt: "See how we behave with animals",
        scenes: [
          { caption: "Before we stroke an animal, we ask its owner: “May I stroke it?”" },
          { caption: "We don't stroke an animal that is eating or sleeping. We let it be." },
          { caption: "We stay away from stray dogs: we turn back calmly and we don't run." },
          { caption: "After playing with an animal, we wash our hands with water and soap." },
          { caption: "If an animal scratches or bites us, we tell a grown-up straight away." }
        ] },
      { prompt: "A cat is asleep under a tree. What do you do?", say: "A cat is asleep under a tree. What do you do?",
        options: ["😴 I let it sleep", "✋ I wake it up and stroke it"], answer: "😴 I let it sleep" },
      { prompt: "You see a dog you don't know in the alley. What do you do?", say: "You see a dog you don't know in the alley. What do you do?",
        options: ["🚶 I walk calmly away and tell my grown-up", "🏃 I scream and run", "🖐️ I go up to it and stroke it"], answer: "🚶 I walk calmly away and tell my grown-up" },
      { prompt: "What do we do after playing with a cat?", say: "What do we do after playing with a cat?" },
      { tips: [
        "Teach your child to ask the owner before stroking any animal, to come close slowly and to let the animal sniff their hand first. Never go to an animal that is eating, sleeping or has young.",
        "Near stray dogs, children shouldn't run or scream; they should stand still or walk calmly away, without staring into the dog's eyes. Never leave a young child alone with any dog, even one you know.",
        "If an animal bites or scratches your child, even a little: wash the wound with plenty of soap and water for 15 minutes and see a health centre or a doctor the same day. Rabies is dangerous, and a vaccine in time prevents it.",
        "After touching an animal, wash hands with soap and water, especially before eating."
      ] }
    ] },
    "health-seed-19": { title: "My hand in yours", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Near the street, we hold a grown-up's hand tightly." },
          { caption: "When we reach the edge of the pavement, we stop. We don't put our feet in the street." },
          { caption: "Cars are big and fast. We wait next to our grown-up until they have gone by." },
          { caption: "In the car, every time, we sit in the back in a child seat and fasten the belt, even for a short trip." }
        ] },
      { prompt: "You are walking by the street with your grown-up. What do you do?", say: "You are walking by the street with your grown-up. What do you do?",
        options: ["🤝 I hold their hand tightly", "🏃 I run ahead"], answer: "🤝 I hold their hand tightly" },
      { prompt: "Your ball has gone into the street. What do you do?", say: "Your ball has gone into the street. What do you do?",
        options: ["🧍 I stop at the edge of the pavement and tell a grown-up", "⚽ I run and get it"], answer: "🧍 I stop at the edge of the pavement and tell a grown-up" },
      { prompt: "You get into the car. What do you do first?", say: "You get into the car. What do you do first?",
        options: ["🪢 I sit in my seat and fasten the belt", "🪟 I put my head out of the window"], answer: "🪢 I sit in my seat and fasten the belt" },
      { text: "When you go out today, hold your grown-up's hand and stop at the edge of every pavement. In the car, remind everyone yourself: “Seat belts!”" },
      { tips: [
        "Young children can't judge how fast or how far away a car is, and drivers can't see them behind parked cars. Near the street, always hold your child's hand and walk on the street side yourself.",
        "Play “the edge of the pavement is where we stop”: each time you reach the edge, both stop and say “Stop, look, listen”.",
        "On every trip, even a short one, put your child in a child seat that fits their age and weight, in the back seat; not on a lap and not in the front. A child seat saves children's lives in a crash.",
        "Never leave a child alone in the car, not even for a moment, especially in hot weather."
      ] }
    ] },
    "health-seed-20": { title: "My kind grown-ups", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "These are my kind grown-ups at home: my mother, my father and my grandmother." },
          { caption: "At nursery or school we have a kind grown-up too: the teacher." },
          { caption: "I know my own name, and I know my mother's or father's name too." },
          { caption: "If we can't see our grown-up, we stay right where we are and call them loudly." },
          { caption: "If they don't come, we ask a mother who has her children with her for help." },
          { caption: "His mother has come! They hug each other." }
        ] },
      { prompt: "You are in the park and you can't see your mother. What do you do first?", say: "You are in the park and you can't see your mother. What do you do first?",
        options: ["🧍 I stay where I am and call her loudly", "🏃 I run and look everywhere", "🚗 I go with a stranger"], answer: "🧍 I stay where I am and call her loudly" },
      { prompt: "Who do you ask for help?", say: "Who do you ask for help?",
        options: ["👩‍👧 A mother who has her children with her, or a shop seller", "🚙 Someone sitting in a car"], answer: "👩‍👧 A mother who has her children with her, or a shop seller" },
      { text: "Practise with your grown-up: say your full name, and your mother's or father's name. Then count your kind grown-ups: at home, and at nursery or school." },
      { tips: [
        "Make a list of “kind grown-ups” with your child: a few people at home, at nursery or school and among the neighbours whom they can tell things to. A safe grown-up listens to your child and never asks them to keep a secret from you.",
        "Practise your child's full name and the full name of one parent. From about four, practise your phone number like a rhyme too, or put it on a card in their pocket.",
        "In busy places, agree: “If we lose each other, stay right there and call me. I will come back.” Tell them to ask a mother with children or a shop seller for help, and never to go anywhere with anyone.",
        "If your child gets lost and is found, don't scold them. Hug them and praise the right things they did."
      ] }
    ] },
    "health-seed-21": { title: "A little screen, lots of play", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Sometimes we watch a few cartoons with a grown-up." },
          { caption: "When the time we agreed on is over, we turn the screen off." },
          { caption: "And off we go to play!" },
          { caption: "If something on the screen scares or upsets us, we tell our grown-up." }
        ] },
      { prompt: "Which games use a screen and which don't? Which should we spend most of the day on?",
        baskets: [{ label: "No screen" }, { label: "With a screen" }],
        items: [{ say: "building blocks" }, { say: "drawing" }, { say: "a book with a grown-up" }, { say: "the slide" }, { say: "a game on a phone" }, { say: "television" }] },
      { prompt: "Cartoon time is over. What do you do?", say: "Cartoon time is over. What do you do?",
        options: ["⚽ I turn it off and go and play", "😠 I cry to watch more"], answer: "⚽ I turn it off and go and play" },
      { prompt: "You saw something on the phone that upset you. What do you do?", say: "You saw something on the phone that upset you. What do you do?",
        options: ["🗣️ I tell my grown-up", "🤐 I don't tell anyone"], answer: "🗣️ I tell my grown-up" },
      { tips: [
        "World Health Organization: no screens under two (except video calls with family), and for two to five years at most one hour a day; less is better. Sit with your child and talk about what you watch.",
        "Agree on the time before switching on: “Until the long hand reaches six.” Give a one-minute warning, then suggest the next game. Don't use screens as a reward or a punishment.",
        "No screens at meals, in the hour before bed or in the bedroom. Use your own phone less in front of your child, too.",
        "Tell your child that if something on a screen scares or upsets them, they can tell you and won't be in trouble. When they do, hug them calmly, turn the screen off and talk with them."
      ] }
    ] },
    // ---------------- Sprout ----------------
    "health-sprout-1": { title: "Sneezes and coughs", steps: [
      { prompt: "Look at what we do",
        scenes: [
          { caption: "Aida feels a sneeze coming." },
          { caption: "Aida holds a tissue over the mouth and nose, and sneezes." },
          { caption: "Aida throws the tissue in the bin." },
          { caption: "If there is no tissue, Aida sneezes or coughs into the elbow." },
          { caption: "Then Aida washes the hands with soap and water." },
          { caption: "Now the germs will not reach other people." }
        ] },
      { prompt: "If we have no tissue, where do we sneeze?",
        options: ["💪 Into our elbow", "✋ Into our hand", "🌬️ Into the air"], answer: "💪 Into our elbow" },
      { prompt: "Put them in order",
        items: [{ label: "Sneeze into a tissue" }, { label: "Tissue in the bin" }, { label: "Wash hands" }] },
      { prompt: "When should we wash our hands?",
        baskets: [{ label: "We wash our hands" }, { label: "No need" }],
        items: [{ label: "Before eating" }, { label: "After the toilet" }, { label: "After playing", say: "After playing in the yard" },
          { label: "After petting a cat" }, { label: "After hearing a story" }, { label: "After singing" }] },
      { tips: [
        "Teach your child to hold a tissue over the mouth and nose when sneezing or coughing, or to sneeze into the elbow, to throw the tissue away and to wash their hands.",
        "If your child forgets, do not blame them. Do the same yourself so they can see.",
        "When your child is ill, let them rest at home and keep their cup and spoon separate.",
        "If your child has a high fever, has trouble breathing, is very weak or will not drink, go to a doctor or your local health centre. In an emergency, call 115."
      ] }
    ] },
    "health-sprout-2": { title: "I stay safe at home", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Grandma pours tea. The teapot and the tea glass are hot." },
          { caption: "Kian sits a little way off and waits for the tea to cool." },
          { caption: "Knives and scissors are sharp. We do not play with them." },
          { caption: "Medicine is not food, even if it looks like candy." },
          { caption: "Grown-ups put medicine up high, out of our reach." },
          { caption: "If we see something hot, sharp or medicine, we do not touch it. We tell a grown-up." }
        ] },
      { prompt: "Which can we play with? Which do we not touch?",
        baskets: [{ label: "I play with it" }, { label: "I don't touch it", say: "I don't touch it. I tell a grown-up" }],
        items: [{ label: "Ball" }, { label: "Book" }, { label: "Crayon" }, { label: "Knife" }, { label: "Medicine" },
          { label: "Hot teapot" }, { label: "Socket" }, { label: "Cleaning liquid" }] },
      { prompt: "You see a colourful pill on the table. It looks like candy. What do you do?",
        options: ["✋ I don't touch it and I tell a grown-up", "😋 I eat it", "🎁 I give it to my friend"],
        answer: "✋ I don't touch it and I tell a grown-up" },
      { tips: [
        "Keep medicine, cleaning liquid, bleach and kerosene up high and out of your child's reach, and in a locked cupboard if you can. Never pour them into a fizzy drink bottle or a cup.",
        "Do not call medicine “candy”. If your child swallows medicine or a cleaning product, do not make them vomit, and call 115 straight away.",
        "Keep the teapot, samovar, kettle and tea glasses away from the edge of the table or the floor spread, and turn pot handles in towards the stove.",
        "If a part of your child's body gets burned, hold it under cool (not ice) water for 20 minutes. Do not put yoghurt, toothpaste, butter or oil on it. If the burn is large, or on the face, hands or feet, go to a doctor.",
        "Gas heaters and water heaters must have a safe chimney. Fasten windows and balconies so your child cannot climb up."
      ] }
    ] },
    "health-sprout-3": { title: "On the street", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Nazanin and her mum want to cross the street. Nazanin holds her mum's hand." },
          { caption: "They stop at the side of the street. They look left and right, and they listen." },
          { caption: "Cars and motorbikes go past. They wait." },
          { caption: "The street is empty and the walking light is green. They cross at the zebra crossing." },
          { caption: "In a car, we sit in the back and put on a seat belt." }
        ] },
      { prompt: "Put crossing the street in order",
        items: [{ label: "Stop" }, { label: "Look and listen" }, { label: "Cross, holding hands" }] },
      { prompt: "Where is a place to play?",
        baskets: [{ label: "A place to play" }, { label: "Not a place to play" }],
        items: [{ label: "Park" }, { label: "Garden at home" }, { label: "School playground" }, { label: "Beside the road" },
          { label: "Between cars", say: "Between parked cars" }] },
      { prompt: "What colour should the walking light be for us to cross?",
        options: ["🟢 Green", "🔴 Red"], answer: "🟢 Green" },
      { tips: [
        "Children cannot yet judge a car's speed and distance, and drivers see them later. Always hold your child's hand near the road.",
        "Each time you cross together, say out loud: “Stop, look, listen.” Cross at the zebra crossing or the crossroads, not between parked cars. Your child learns from what you do.",
        "In a car, your child should sit in the back with a seat belt or a child seat. If you carry your child on a motorbike, they need a helmet that fits their head.",
        "Choose safe places for play: a yard, a park, or an alley with no cars."
      ] }
    ] },
    "health-sprout-4": { title: "If I am lost", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Shirin and her dad have gone to the bazaar." },
          { caption: "Shirin looks at the kites. When Shirin looks up, Dad is not there." },
          { caption: "Shirin stays right there. Shirin breathes slowly. Shirin does not go anywhere else." },
          { caption: "Shirin tells the shopkeeper: “I'm lost. My dad's name is Reza. This is his number.”" },
          { caption: "The shopkeeper phones Shirin's dad. Dad was looking for Shirin too." },
          { caption: "Dad comes quickly and gives Shirin a hug." }
        ] },
      { prompt: "If you lose your grown-up in the bazaar, what do you do first?",
        options: ["🧍 I stay where I am", "🚶 I walk home alone", "🙈 I hide somewhere"], answer: "🧍 I stay where I am" },
      { prompt: "Who do you ask for help?",
        options: ["🏪 A shopkeeper in a shop", "🚗 Someone in a car who calls me", "🚶 Nobody; I look for them myself"],
        answer: "🏪 A shopkeeper in a shop" },
      { text: "Practise with your grown-up. Say out loud:",
        list: ["your full name", "your mum's or dad's name", "your mum's or dad's phone number"] },
      { tips: [
        "Repeat a simple rule many times: “If you get lost, stay where you are. We will find you.”",
        "Tell your child who to ask for help: a shopkeeper in a shop, a police officer, or a woman with children. They should not go anywhere with anyone, even if that person says “Come, I'll take you to your mum.”",
        "Teach your child your phone number with a tune or a rhyme. You can also put it on a card in your child's pocket, not somewhere on their clothes where everyone can see it.",
        "In a crowded place, choose a meeting spot from the start: “If we lose each other, we meet by this big door.”",
        "When you find your child again, do not scold them. Hug them and tell them what they did right."
      ] }
    ] },

    "health-sprout-5": { title: "I keep myself clean", steps: [
      { prompt: "See how we keep ourselves clean",
        scenes: [
          { caption: "Now we do most things ourselves. Morning and night, we brush our teeth for two minutes." },
          { caption: "We brush every side of our teeth: the front, the back and the top. We gently brush our tongue too." },
          { caption: "In the bath, we wash our hair with shampoo and rinse it ourselves. A grown-up is close by." },
          { caption: "We keep our nails short and clean." },
          { caption: "We put dirty clothes in the laundry basket and take clean ones." }
        ] },
      { prompt: "Put tooth-brushing in order",
        items: [{ label: "Toothpaste, the size of a pea" }, { label: "The front of the teeth" }, { label: "The back and top of the teeth" }, { label: "The tongue" }, { label: "Spit" }] },
      { prompt: "Put bath time in order",
        items: [{ label: "Get wet" }, { label: "Shampoo and soap" }, { label: "Rub" }, { label: "Rinse" }, { label: "Dry and put on clean clothes" }] },
      { text: "Tonight, brush your teeth yourself and count slowly to 120, or sing a two-minute song. Then let your grown-up look and help if needed." },
      { tips: [
        "At this age children can do a lot themselves, but still need checking. After they brush, brush once more yourself or check, until about eight.",
        "Brushing should last two minutes, morning and night, with fluoride toothpaste the size of a pea. A sand timer or a short song helps.",
        "Put the laundry basket and the clothes drawer where your child can reach them. Change underwear and socks every day.",
        "If your child washes on their own in the bath, stay outside the door and within reach, and set the hot water yourself."
      ] }
    ] },
    "health-sprout-6": { title: "Doctor, dentist, vaccine", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "At a check-up, they measure how tall we are." },
          { caption: "They check our eyes with a chart: we cover one eye and name the shapes." },
          { caption: "The dentist looks at our teeth. We keep our mouth open." },
          { caption: "A vaccine pinches for a moment and is soon over. We hold a grown-up's hand and breathe slowly." },
          { caption: "A vaccine helps the body not to get ill. We can ask any question we have." }
        ] },
      { prompt: "The doctor wants to listen to your heart with a stethoscope. What do you do?", say: "The doctor wants to listen to your heart with a stethoscope. What do you do?",
        options: ["🧍 I stand still and breathe calmly", "🏃 I run away"], answer: "🧍 I stand still and breathe calmly" },
      { prompt: "What does a vaccine do?", say: "What does a vaccine do?",
        options: ["🛡️ It helps the body not to get ill", "🍬 It tastes nice"], answer: "🛡️ It helps the body not to get ill" },
      {},
      { tips: [
        "Before you go, say simply and truthfully what will happen: “They'll measure you and check your eyes. The vaccine pinches for a moment.” Don't say “it won't hurt at all”, and never use doctors or injections to frighten your child.",
        "Give your child's vaccines on time, following the vaccination card and the health centre's schedule, and don't miss the health check before primary school (sight, hearing, teeth).",
        "Visit a dentist or the health centre once or twice a year. During a vaccine, hold your child, take their hand and breathe slowly together.",
        "After the visit, praise their courage and let them talk about how they felt."
      ] }
    ] },
    "health-sprout-7": { title: "The germ game", steps: [
      { prompt: "Which spreads germs, and which stops them?",
        baskets: [{ label: "Spreads them" }, { label: "Stops them" }],
        items: [{ say: "washing hands with soap and water" }, { say: "sneezing into the elbow" }, { say: "a tissue in the bin" }, { say: "sneezing into the air" }, { say: "fingers in the nose" }, { say: "sharing a spoon when we're ill" }] },
      { prompt: "When do we wash our hands?",
        baskets: [{ label: "We wash our hands" }, { label: "No need" }],
        items: [{ say: "before eating" }, { say: "after the toilet" }, { say: "after blowing our nose" }, { say: "after stroking a cat" }, { say: "before reading a book" }, { say: "while we sleep" }] },
      { prompt: "A sneeze is coming! Put it in order",
        items: [{ label: "A tissue over the mouth and nose" }, { label: "Sneeze" }, { label: "The tissue in the bin" }, { label: "Wash hands" }] },
      { prompt: "Put the morning things in order",
        items: [{ label: "Toilet" }, { label: "Wash hands and face" }, { label: "Put on clean clothes" }, { label: "Breakfast" }, { label: "Brush teeth" }] },
      { tips: [
        "Washing hands with soap and water is the most important way to prevent diarrhoea and colds. Praise your child every time they remember.",
        "Teach your child to sneeze or cough into their elbow when there is no tissue, not into their hand. When someone is ill, use separate spoons, glasses and towels.",
        "A child with a fever or diarrhoea should rest at home until they are well; this also looks after their friends."
      ] }
    ] },
    "health-sprout-8": { title: "My plate", steps: [
      { prompt: "Look at the table",
        scenes: [
          { caption: "The Iranian table has food groups. Bread and rice give our body energy." },
          { caption: "Fruit and vegetables are colourful and on the table every day." },
          { caption: "Eggs, fish and lentil soup make our body strong." },
          { caption: "Milk and cheese help our bones and teeth." },
          { caption: "On our plate we put a little from each group. No food is “bad”." }
        ] },
      { prompt: "Put each food in its group",
        baskets: [{ label: "Bread and rice" }, { label: "Fruit and vegetables" }, { label: "Eggs, beans, meat" }, { label: "Milk and dairy" }],
        items: [{ say: "rice" }, { say: "bread" }, { say: "pear" }, { say: "lettuce" }, { say: "fish" }, { say: "lentil soup" }, { say: "cheese" }, { say: "milk" }] },
      { prompt: "Which plate has a little from every group?", say: "Which plate has a little from every group?",
        options: ["🍚🥕🐟🧀 Rice, carrot, fish and cheese", "🍚🍞🥖 Rice, bread and bread", "🍰🍬 Cake and sweets"], answer: "🍚🥕🐟🧀 Rice, carrot, fish and cheese" },
      { prompt: "Which group are lentils and beans in?", say: "Which group are lentils and beans in?",
        options: ["🥚 The same group as eggs and meat", "🥛 The milk group"], answer: "🥚 The same group as eggs and meat" },
      { tips: [
        "The Iranian table is varied by itself: bread or rice, herbs and fruit, beans and eggs or meat, and yoghurt and cheese. Try to have something from several groups at each meal.",
        "Don't call foods “good”, “bad” or “fattening”. Don't talk about your child's or anyone's weight or body shape.",
        "A child's plate is smaller than a grown-up's. Let your child say when they are full and don't make them finish the plate.",
        "Let your child help set the table and fill the plate: “Shall we add something from the fruit and vegetable group?”"
      ] }
    ] },
    "health-sprout-9": { title: "Breakfast and snacks", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "In the morning we eat breakfast, so we have energy to play and learn." },
          { caption: "With the energy from breakfast, we play and learn until lunchtime!" },
          { caption: "In the middle of the day we have a small snack: fruit, walnuts, or bread and cheese." },
          { caption: "And we drink water through the day." }
        ] },
      { prompt: "Why do we eat breakfast?", say: "Why do we eat breakfast?",
        options: ["💪 So we have energy to play and learn", "😴 So we can go back to sleep"], answer: "💪 So we have energy to play and learn" },
      { prompt: "Which one is a good snack?", say: "Which one is a good snack?",
        options: ["🍎 An apple", "🍬 A handful of sweets", "🥤 A fizzy drink"], answer: "🍎 An apple" },
      { text: "Get tomorrow's snack ready with your grown-up: a piece of fruit, a few walnuts or a bite of bread and cheese. Put a bottle of water next to it too." },
      { tips: [
        "Have breakfast, even a simple one: bread, cheese and walnuts, an egg, or bread and dates with a glass of milk. A child who has had breakfast learns and plays better.",
        "Keep snacks small: fruit, cucumber, walnuts and almonds (chopped for young children), bread and cheese, yoghurt. Keep sweet things to mealtimes.",
        "Let your child always have their water bottle with them and drink several times a day, more in hot weather and after play.",
        "Whole nuts, popcorn and whole grapes are a choking risk for young children; chop them."
      ] }
    ] },
    "health-sprout-10": { title: "The table game", steps: [
      { prompt: "Set the table: put each food in its group",
        baskets: [{ label: "Bread and rice" }, { label: "Fruit and vegetables" }, { label: "Eggs, beans, meat" }, { label: "Milk and dairy" }],
        items: [{ say: "lavash bread" }, { say: "pasta" }, { say: "orange" }, { say: "tomato" }, { say: "fried egg" }, { say: "fish" }, { say: "milk" }, { say: "yoghurt" }] },
      { prompt: "Which do we eat and drink every day, and which only sometimes?",
        baskets: [{ label: "Every day" }, { label: "Sometimes, a little" }],
        items: [{ say: "water" }, { say: "apple" }, { say: "walnuts" }, { say: "milk" }, { say: "fizzy drink" }, { say: "lollipop" }, { say: "chocolate biscuit" }] },
      { prompt: "Match each food with its group",
        pairs: [[{ say: "rice" }, { label: "Bread and rice", say: "Bread and rice" }], [{ say: "pear" }, { label: "Fruit and vegetables", say: "Fruit and vegetables" }],
          [{ say: "egg" }, { label: "Eggs and beans", say: "Eggs and beans" }], [{ say: "cheese" }, { label: "Milk and dairy", say: "Milk and dairy" }]] },
      { prompt: "Match each meal with its food",
        pairs: [[{ say: "breakfast" }, { say: "fried egg and bread" }], [{ say: "snack" }, { say: "walnuts" }], [{ say: "dinner" }, { say: "soup" }]] },
      { tips: [
        "Carry on the table game at real meals: “Which groups did we eat from today? Which one is missing?”",
        "Most days, drink water and milk. Keep fizzy drinks, packaged juice and sweet drinks for sometimes.",
        "Shop for and prepare food with your child; a child who has helped to cook tries new food more easily."
      ] }
    ] },
    "health-sprout-11": { title: "Hopping and skipping rope", steps: [
      { prompt: "Watch, and you try too",
        scenes: [
          { caption: "Hopping: we jump on one foot. Then on the other foot." },
          { caption: "We gallop like a horse: one foot goes in front and the other follows." },
          { caption: "Skipping rope: we turn the rope and jump over it with both feet together." },
          { caption: "We count each jump: one, two, three, four, five!" }
        ] },
      { text: "Hop: jump five times on your right foot, then five times on your left foot. If it's hard, hold on to the wall." },
      { text: "If you have a rope, skip with your grown-up and count each jump. If you don't have one, draw a line on the ground and jump over it.",
        list: ["One, two, three, four, five!", "Now up to ten!", "Now gallop like a horse."] },
      { prompt: "Hopping means…", say: "What does hopping mean?",
        options: ["🦶 Jumping on one foot", "🛌 Lying down", "🚶 Walking slowly"], answer: "🦶 Jumping on one foot" },
      { tips: [
        "Hopping, galloping and skipping rope build balance, leg strength and coordination. Practise with both feet; most children find one foot easier.",
        "Skip rope on flat, soft ground, with shoes on, where the rope can't hit anyone. Start by laying the rope on the ground in front of your child's feet for them to jump over.",
        "Teach your child the skipping and hopping rhymes you sang as a child.",
        "Children of this age need at least an hour of lively play every day; these games are part of that hour."
      ] }
    ] },
    "health-sprout-12": { title: "Throw and catch", steps: [
      { prompt: "Watch and learn",
        scenes: [
          { caption: "To throw overarm, we stand side on and take the ball up and back behind our shoulder." },
          { caption: "We step forward with the opposite foot and throw the ball hard." },
          { caption: "To catch, we bring our hands forward, catch softly and pull the ball in to our chest." },
          { caption: "To kick, we hit the ball with the inside of our foot so it goes straight." }
        ] },
      { text: "Practise with a soft ball and your grown-up:", list: ["Stand side on, take the ball up above your shoulder, take a step and throw.", "Bring your hands forward and catch the ball softly.", "Kick the ball with the inside of your foot so it reaches your grown-up."] },
      { prompt: "When we throw the ball, which foot do we put forward?", say: "When we throw the ball, which foot do we put forward?",
        options: ["🦶 The foot opposite the throwing hand", "🦶 The foot on the same side as the hand"], answer: "🦶 The foot opposite the throwing hand" },
      { prompt: "To catch a ball, how should our hands be?", say: "To catch a ball, how should our hands be?",
        options: ["👐 Forward and soft", "✊ Fists behind our head"], answer: "👐 Forward and soft" },
      { tips: [
        "Throwing, catching and kicking are the basic skills of every sport. Start with a soft ball from close up and move further apart little by little.",
        "To throw overarm: stand side on, step with the opposite foot and turn the body. To catch: eyes on the ball, hands forward and soft.",
        "To kick, use the inside of the foot so the ball goes straight. Practise with both feet.",
        "Play these games outside or in a safe, empty space, away from windows and the street."
      ] }
    ] },
    "health-sprout-13": { title: "My heart beats fast", steps: [
      { prompt: "See what the body does when we move",
        scenes: [
          { caption: "Before playing, we warm up: we walk on the spot and circle our arms." },
          { caption: "We put a hand on our chest: our heart is beating slowly." },
          { caption: "Now we jump and swing our arms up and down!" },
          { caption: "Our heart beats fast, we breathe fast, we get warm and sweat a little. That's good!" },
          { caption: "Then we calm down: we stretch and breathe slowly. The heart beats more slowly." },
          { caption: "Every day we play actively for at least an hour: running, jumping, playing ball." }
        ] },
      { text: "The heart experiment:", list: ["Put your hand on your chest. How is your heart beating?", "Now jump on the spot twenty times.", "Put your hand on your chest again. Is your heart beating faster?", "Now take three slow breaths and feel it again."] },
      { prompt: "After running, how does our heart beat?", say: "After running, how does our heart beat?",
        options: ["💓 Faster", "😴 More slowly"], answer: "💓 Faster" },
      { prompt: "What do we do before active play?", say: "What do we do before active play?",
        options: ["🔥 We warm up our body", "🛌 We go to sleep"], answer: "🔥 We warm up our body" },
      { tips: [
        "World Health Organization: children aged 5 to 17 need an average of at least 60 minutes of moderate to vigorous activity every day (running, jumping, cycling, street games), and on a few days a week games that strengthen bones and muscles.",
        "A fast heartbeat, puffing, getting warm and sweating a little show the body working well. But if your child has chest pain, dizziness or unusual breathlessness, stop and talk to a doctor.",
        "Start play with a warm-up and finish with calming down (stretches and slow breaths). Drink enough water in hot weather.",
        "Spread lively play through the day: morning, afternoon, with the family. It doesn't have to be all at once."
      ] }
    ] },
    "health-sprout-14": { title: "Street games", steps: [
      { prompt: "Watch the children play",
        scenes: [
          { caption: "Haft-sang: we stack the stones and knock them down with a ball." },
          { caption: "Gorgam be hava: one child is the “wolf” and runs after the others." },
          { caption: "Amu zanjirbaf: we hold hands and make a chain." },
          { caption: "We take turns and let everyone join in. Come on, you play too!" },
          { caption: "Whether we win or lose, at the end of the game we shake hands kindly." }
        ] },
      { caption: "Which game do you like best? If someone was standing alone watching the game, what would you say to them? What do you do when you lose?" },
      { text: "Play one of the street games with your family or friends: haft-sang, hopscotch, gorgam be hava or amu zanjirbaf. Take turns!" },
      { text: "At the end of the game, shake hands with everyone and say: “Good game!”" },
      { tips: [
        "Alley and yard games (haft-sang, hopscotch, gorgam be hava, amu zanjirbaf, hide-and-seek) are active, and they also teach taking turns, keeping to rules and coping with losing.",
        "Teach your child the games you played as a child in your town or village.",
        "Help everyone play: invite a child who is on their own, and make the rules simpler for younger ones.",
        "Make losing normal: “We lost; next time we'll try again.” Encourage the winner to be kind too."
      ] }
    ] },
    "health-sprout-15": { title: "Morning exercises", steps: [
      { prompt: "First we warm up our body",
        moves: [
          { name: "Marching on the spot", say: "Bring your knees up and swing your arms.", easier: { say: "Walk slowly and bring your knees up a little." } },
          { name: "Arm circles", say: "Open your arms and move them up and down, slowly and big." }
        ] },
      { prompt: "Now the lively moves",
        moves: [
          { name: "Hopping", say: "Jump on one foot. Then on the other foot.", easier: { say: "Stand on one foot and count to five. Then the other foot." } },
          { name: "Galloping", say: "One foot in front, the other follows, with a little jump." },
          { name: "Frog jumps", say: "Crouch down, hands on the floor, then jump up high.", easier: { say: "Crouch down and stand up, without jumping." }, harder: { say: "Jump higher and land softly." } },
          { name: "Star jumps", say: "With each jump, arms up and legs apart; then back together.", easier: { say: "No jumping: one foot out to the side and arms up, then back." }, harder: { say: "Faster and more!" } }
        ] },
      { prompt: "At the end, we calm down",
        moves: [
          { name: "Big stretch", say: "Reach your arms up, stand tall and bring them down slowly." },
          { name: "Slow breaths", say: "Breathing in, open your arms; breathing out, bring them down slowly." }
        ] },
      { text: "Do these exercises every morning. Draw a chart with your grown-up and draw a star on each day you exercise." },
      { tips: [
        "Do this seven-minute routine together in the mornings; start with the warm-up and finish by calming down. The moves are for a small room with no equipment.",
        "Choose “Easier” or “Harder” to suit how your child feels and what they can do. The aim is to enjoy moving, not to compete.",
        "Get a clear space ready: away from table corners and glass, on a rug, with socks off or proper shoes on.",
        "These ten minutes are part of your child's hour of lively play each day, not all of it."
      ] }
    ] },
    "health-sprout-26": { title: "Shapes and balance", steps: [
      { prompt: "Watch, and make the shapes",
        scenes: [
          { caption: "Star shape: we open our arms and legs wide." },
          { caption: "Pencil shape: straight and tall, arms above our head." },
          { caption: "Ball shape: we curl up and hug our knees." },
          { caption: "Bridge shape: tummy up, hands and feet on the floor." },
          { caption: "Balance: we stand on one foot, arms out." },
          { caption: "Now on one knee and one hand: we stretch out the other leg and the other arm." },
          { caption: "Log roll: on the rug, straight like a pencil, we roll slowly sideways." },
          { caption: "We jump and land softly: knees bent." }
        ] },
      { prompt: "Match each shape with its name",
        pairs: [[{ say: "star" }, { label: "Arms and legs wide", say: "Arms and legs wide" }], [{ say: "pencil" }, { label: "Straight and tall", say: "Straight and tall" }],
          [{ say: "ball" }, { label: "Curled up and round", say: "Curled up and round" }], [{ say: "bridge" }, { label: "Tummy up", say: "Tummy up" }]] },
      { text: "Make these shapes on the rug and hold each one for a count of three:", list: ["Star", "Pencil", "Ball", "Bridge", "On one foot, then the other foot"] },
      { text: "Log roll: lie on a rug or a mattress, straight like a pencil, and roll slowly sideways. Your grown-up makes sure there is space." },
      { tips: [
        "Shapes and balances are the basis of gymnastics and every sport. Only safe home moves: no handstands, back flips or somersaults.",
        "Practise on a rug or soft mattress, away from table corners. Your child holds each shape for three or five, then lets go slowly.",
        "Do the log roll on a soft, flat surface, with arms above the head and the body straight. A little dizziness is normal; a few rolls are enough.",
        "Practise on both feet and both sides, and ask your child to invent a new shape."
      ] }
    ] },
    "health-sprout-27": { title: "Moving to music", steps: [
      { prompt: "See how we make a little dance",
        scenes: [
          { caption: "We choose four moves: clapping, jumping, turning and the star shape." },
          { caption: "We put them in order: one, two, three, four." },
          { caption: "With the music, we do the moves one after another." },
          { caption: "Again and again! Dad comes too, and we dance together." }
        ] },
      { prompt: "Put this dance in order: clap, jump, turn, star",
        items: [{ label: "Clap" }, { label: "Jump" }, { label: "Turn" }, { label: "Star" }] },
      { prompt: "Another dance: stamp, sway, jump",
        items: [{ label: "Stamp" }, { label: "Sway" }, { label: "Jump" }] },
      { text: "Make your own dance: choose four moves, put them in order and repeat them a few times to a song. Then teach your family so you can do it together." },
      { tips: [
        "Making up and repeating a sequence of moves helps memory, focus and coordination. Let your child choose the moves and give them names.",
        "You can draw the moves on paper and lay them out in order on the floor, like a “dance map”.",
        "Put on cheerful family or local songs and move together. Change one move every so often.",
        "Dancing and moving to music are part of the hour of lively play each day too."
      ] }
    ] },
    "health-sprout-16": { title: "Bedtime", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "An hour before bed, we turn screens off and read a book or play quietly." },
          { caption: "Every night we go to bed at the same time." },
          { caption: "The light is off and we sleep. A night's sleep is long: about ten hours or more." },
          { caption: "In the morning we wake up fresh, at the same time every day!" }
        ] },
      { prompt: "Put the things before bed in order",
        items: [{ label: "Screens off" }, { label: "Brush teeth" }, { label: "Toilet" }, { label: "Story" }, { label: "Sleep" }] },
      { prompt: "Which is better for good sleep?", say: "Which is better for good sleep?",
        options: ["⏰ Going to bed at the same time every night", "🎲 A different time every night"], answer: "⏰ Going to bed at the same time every night" },
      { prompt: "What shall we do in the hour before bed?", say: "What shall we do in the hour before bed?",
        options: ["📖 Read a book or play quietly", "📱 Play on a phone"], answer: "📖 Read a book or play quietly" },
      { tips: [
        "Children aged three to five need 10 to 13 hours of sleep in 24 hours, and children aged six to twelve need 9 to 12 hours (American Academy of Sleep Medicine). Keep bedtime and waking time the same every day, even on holidays.",
        "Turn screens off an hour before bed; screen light delays sleep. No television or phone in your child's bedroom.",
        "Do the bedtime things in the same order every night and keep the room dark, quiet and cool.",
        "If your child snores, wakes a lot at night or is very sleepy in the daytime, talk to a doctor."
      ] }
    ] },
    "health-sprout-17": { title: "Screens and play", steps: [
      { prompt: "Look at a day",
        scenes: [
          { caption: "We spend most of the day playing: we run outside and play ball." },
          { caption: "We also play a little with a screen, when a grown-up has said yes." },
          { caption: "If we see a new game or app, we ask a grown-up first." },
          { caption: "Time's up: we put the screen down and go and play." }
        ] },
      { prompt: "A good day: which games have no screen, and which use one?",
        baskets: [{ label: "No screen" }, { label: "With a screen" }],
        items: [{ say: "kite" }, { say: "puzzle" }, { say: "bike" }, { say: "drawing" }, { say: "a game on a tablet" }, { say: "cartoons" }] },
      { prompt: "You saw a new game on the tablet. What do you do?", say: "You saw a new game on the tablet. What do you do?",
        options: ["🙋 I ask my grown-up first", "👆 I install it myself"], answer: "🙋 I ask my grown-up first" },
      { prompt: "Screen time is over. What do you do?", say: "Screen time is over. What do you do?",
        options: ["🧱 I put it down and play something else", "😠 I keep going secretly"], answer: "🧱 I put it down and play something else" },
      { tips: [
        "For children of this age, keep recreational screen time short (about an hour a day or less) and always on a plan you have agreed together. Play, sleep, meals and family come first.",
        "Make an “ask first” rule: no new game, app or video is installed or opened without asking you. Look at apps and games yourself.",
        "Give a warning before the time is up, then suggest another game. Praise your child when they put the screen down themselves.",
        "No screens at meals, in the bedroom or in the hour before bed. Be an example yourself of using the phone little."
      ] }
    ] },
    "health-sprout-18": { title: "Windows, balconies, heaters", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Is the window open? We don't lean out or climb up. We look out from behind it." },
          { caption: "On the balcony, we play by the wall and don't climb the railing." },
          { caption: "We keep away from the heater: we sit further off and don't put anything on it." },
          { caption: "If we smell gas, we leave the kitchen and tell a grown-up straight away." }
        ] },
      { prompt: "Your bedroom window is open. What do you do?", say: "Your bedroom window is open. What do you do?",
        options: ["👀 I look out from behind it", "🪑 I put a chair there and climb up"], answer: "👀 I look out from behind it" },
      { prompt: "Your ball has gone next to the balcony railing. What do you do?", say: "Your ball has gone next to the balcony railing. What do you do?",
        options: ["🙋 I tell a grown-up", "🧗 I climb the railing"], answer: "🙋 I tell a grown-up" },
      { prompt: "There is a bad smell of gas in the kitchen. What do you do?", say: "There is a bad smell of gas in the kitchen. What do you do?",
        options: ["🏃 I go out and tell a grown-up", "💡 I switch on the light to see", "🙈 I do nothing"], answer: "🏃 I go out and tell a grown-up" },
      { tips: [
        "Falls from windows and balconies are among the serious injuries of children in flats. Fit window guards or restrictors (opening no more than 10 cm) and move sofas, chairs and plant pots away from windows and railings.",
        "Fix cupboards, shelves and the television to the wall so they don't fall if your child climbs them.",
        "Put a guard in front of the heater and have its flue checked every year before winter. Never use a gas heater without a flue, or a charcoal brazier, in a closed room; carbon monoxide has no smell and is dangerous. Fit a carbon monoxide alarm.",
        "If you smell gas: don't touch light switches or light a flame, turn off the gas valve, open the windows, get everyone out and call the gas emergency number 194 from outside."
      ] }
    ] },
    "health-sprout-19": { title: "In the car and on a motorbike", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "In the car, every time, we sit in the back, in a child seat or on a booster seat, and fasten the belt." },
          { caption: "The window is open, but we don't put our head or hands out." },
          { caption: "When the car stops, we get out on the pavement side." },
          { caption: "On a bike, we always wear a helmet." }
        ] },
      { prompt: "You get into the car. Where do you sit?", say: "You get into the car. Where do you sit?",
        options: ["🪑 In the back, with a seat belt", "🧑‍✈️ In the front, next to the driver", "🛋️ In the back, without a seat belt"], answer: "🪑 In the back, with a seat belt" },
      { prompt: "You want to get on a bike or a motorbike. What do you do first?", say: "You want to get on a bike or a motorbike. What do you do first?",
        options: ["⛑️ I put my helmet on", "🏃 I set off straight away"], answer: "⛑️ I put my helmet on" },
      { prompt: "Which car door do you get out of?", say: "Which car door do you get out of?",
        options: ["🚶 The door on the pavement side", "🚗 The door on the street side"], answer: "🚶 The door on the pavement side" },
      { tips: [
        "Until your child is about 145 cm tall, they should sit in a child seat or a booster seat suited to their weight, in the back seat, on every trip, even a short one. Don't sit your child on your lap.",
        "Turn on the child locks on the back doors and open the window only a little. Never leave your child alone in the car.",
        "On a motorbike, a child needs a helmet that fits their head; many countries forbid taking young children on motorbikes at all. On a bike, always a helmet too, and away from the street.",
        "Teach your child to get out on the pavement side and not to play behind parked cars; drivers can't see them."
      ] }
    ] },
    "health-sprout-20": { title: "The safe-or-ask game", steps: [
      { prompt: "At home: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "reading a book on the rug" }, { say: "a puzzle" }, { say: "a glass of milk" }, { say: "a plug socket" }, { say: "a bottle of cleaning liquid" }, { say: "pills on the table" }] },
      { prompt: "Windows, balconies and heaters: which is safe, and which do we ask about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "looking out from behind the window" }, { say: "playing by the balcony wall" }, { say: "climbing on a chair by an open window" }, { say: "touching the heater" }, { say: "a smell of gas" }] },
      { prompt: "In the street: which is safe, and which do we ask about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "holding a grown-up's hand" }, { say: "waiting behind the crossing line" }, { say: "running after a ball into the street" }, { say: "crossing between parked cars" }] },
      { prompt: "In the car and on a bike: which is right, and which isn't?",
        baskets: [{ label: "That's right" }, { label: "No, it's dangerous" }],
        items: [{ say: "fastening the seat belt" }, { say: "a helmet on a bike" }, { say: "getting out on the pavement side" }, { say: "putting my head out of the car window" }, { say: "sitting in the front seat" }] },
      { tips: [
        "Carry on this game in daily life: at home, in the street or in the car ask “Is this safe, or should we ask?” and let your child explain why.",
        "The main rule: “If you're not sure, stop and ask a grown-up.” Thank your child for asking.",
        "Once, go round your home with your child at their eye level: sockets, medicines, cleaning products, windows, the balcony, the heater. Make safer whatever you can."
      ] }
    ] },
    "health-sprout-21": { title: "My body rules", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Our body has rules. The parts our underwear covers are the private parts of the body." },
          { caption: "Every part of the body has a name. We know the names of the private parts too, and we can talk about them with our parents." },
          { caption: "A safe touch makes us feel good: a hug from Grandma when we want one, a handshake, a high five." },
          { caption: "If someone wants to touch our private parts, or a touch makes us feel bad, we say “No!” firmly, move away and tell our grown-up." },
          { caption: "A doctor examines us only for our health, when our mother or father is with us." },
          { caption: "If someone says “Don't tell anyone”, we still tell our mother or father. It is never our fault." }
        ] },
      { prompt: "Which touch is safe, and for which do we say “No” and tell a grown-up?",
        baskets: [{ label: "It's safe" }, { label: "I say “No” and tell" }],
        items: [{ say: "a hug from Mum, when I want one" }, { say: "a handshake" }, { say: "a high five" }, { say: "a doctor's check while Mum is with me" }, { say: "someone wants to touch my private parts" }, { say: "someone says: don't tell anyone this secret" }] },
      { prompt: "If someone did something that made you feel bad and said “Don't tell anyone”, what do you do?", say: "If someone did something that made you feel bad and said don't tell anyone, what do you do?",
        options: ["🗣️ I tell my mother or father or a kind grown-up", "🤐 I don't tell anyone"], answer: "🗣️ I tell my mother or father or a kind grown-up" },
      { prompt: "Whose fault is it?", say: "If someone touched you in an unsafe way, whose fault is it?",
        options: ["💛 It is never my fault", "😔 It's my fault"], answer: "💛 It is never my fault" },
      { text: "Practise with your grown-up:", list: ["Put your hand up and say firmly: “No! I don't like that.”", "Move a few steps away.", "Go to your grown-up and say what happened.", "Name three kind grown-ups you can tell."] },
      { text: "Your body belongs to you. Whatever you tell us, we will help you.",
        tips: [
        "This lesson follows “My body belongs to me”. Watch it with your child and talk calmly and normally, as you would about brushing teeth.",
        "Tell your child the correct names for the private parts of the body (for example penis, vulva, bottom, chest), or a clear word your family uses. A child who has words for their body can more easily say what happened.",
        "Explain the difference between a “good secret” (a birthday present, which is soon told and makes everyone happy) and a “bad secret” (one that feels bad, which someone says never to tell). A secret about touching is never kept.",
        "If your child tells you something: stay calm, believe them, thank them and tell them it is not their fault. Don't ask lots of questions and don't confront the person in front of them. Call the social emergency line 123."
      ] }
    ] },
    "health-sprout-22": { title: "When someone is unkind to me", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "If children laugh at someone or leave them out again and again, that is called bullying." },
          { caption: "It is never the fault of the one who is bullied." },
          { caption: "We put our hand up and say firmly: “Stop it!” Then we walk away." },
          { caption: "And we tell a grown-up: the teacher, or our mother or father." },
          { caption: "We are kind too: we invite a child who is on their own to play." }
        ] },
      { prompt: "A child laughs at you every day. What do you do?", say: "A child laughs at you every day. What do you do?",
        options: ["✋ I say “Stop it”, walk away and tell a grown-up", "🤐 I don't tell anyone", "👊 I hit them"], answer: "✋ I say “Stop it”, walk away and tell a grown-up" },
      { prompt: "A child is standing alone and nobody plays with them. What do you do?", say: "A child is standing alone and nobody plays with them. What do you do?",
        options: ["🤝 I invite them to play", "😄 I laugh at them"], answer: "🤝 I invite them to play" },
      { caption: "If someone is unkind to you, who do you tell? What do you do so that others feel good?" },
      { tips: [
        "Bullying means being unkind again and again on purpose, by someone with more power: laughing at someone, pushing, leaving them out of games, spreading nasty words. Tell your child it is never their fault.",
        "If your child says they are being bullied: listen calmly, thank them and ask what help they want. Talk to the teacher or the head teacher. Don't tell your child “hit back”.",
        "Play and practise together: saying “Stop it” in a firm voice, walking away and telling.",
        "Encourage kindness: inviting someone who is alone, and standing by someone who is being picked on. If you hear your own child has been unkind to someone, talk calmly and help them make it right."
      ] }
    ] },
    "health-sprout-23": { title: "The internet with a grown-up", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "The internet helps us learn and see family who live far away." },
          { caption: "We use the internet only with a grown-up sitting next to us." },
          { caption: "Our name, our home address and our photo are private. We don't give them to anyone on the internet." },
          { caption: "If something on the internet makes us feel bad or scares us, we tell our grown-up straight away." }
        ] },
      { prompt: "Which can we say on the internet, and which is private?",
        baskets: [{ label: "We can say it" }, { label: "It's private" }],
        items: [{ say: "my favourite colour" }, { say: "my favourite animal" }, { say: "my favourite fruit" }, { say: "my home address" }, { say: "a photo of me" }, { say: "my school's name" }, { say: "a phone number" }] },
      { prompt: "In an online game, someone asked where you live. What do you do?", say: "In an online game, someone asked where you live. What do you do?",
        options: ["🙋 I don't say, and I tell my grown-up", "🏠 I type my address"], answer: "🙋 I don't say, and I tell my grown-up" },
      { prompt: "You saw something on the phone that scared you. What do you do?", say: "You saw something on the phone that scared you. What do you do?",
        options: ["🗣️ I tell my grown-up", "🤐 I keep watching it alone"], answer: "🗣️ I tell my grown-up" },
      { tips: [
        "At this age, your child should use the internet only with you there. Keep devices in a shared room, not the bedroom, and choose apps and games yourself.",
        "Turn on parental controls and the device's privacy settings, and switch off chat with strangers in games.",
        "Tell your child that their full name, address, school, phone number and photo are private. Think before posting your child's photos on social media too.",
        "If your child says they saw something that upset them, don't scold them or take the device away; thank them and talk together. That way they will tell you next time too."
      ] }
    ] },
    "health-sprout-24": { title: "Small grazes and nosebleeds", steps: [
      { prompt: "See how we look after a small graze",
        scenes: [
          { caption: "If we fall and graze our knee, we tell a grown-up." },
          { caption: "We wash the graze with clean water." },
          { caption: "Then we put a plaster on it." },
          { caption: "A nosebleed? We sit down, lean forward a little and pinch the soft part of the nose. A grown-up is with us." },
          { caption: "Bumped our head? We hold a cool cloth on it and tell a grown-up." }
        ] },
      { prompt: "A small graze: put it in order",
        items: [{ label: "We tell a grown-up" }, { label: "We wash it with clean water" }, { label: "We put a plaster on" }] },
      { prompt: "A nosebleed: put it in order",
        items: [{ label: "We sit down" }, { label: "We lean forward a little" }, { label: "We pinch the soft part of the nose" }, { label: "We count slowly to ten and wait" }] },
      { prompt: "When we have a nosebleed, how do we hold our head?", say: "When we have a nosebleed, how do we hold our head?",
        options: ["🙇 A little forward", "🙆 Back, looking up"], answer: "🙇 A little forward" },
      { tips: [
        "A small graze: wash your hands, rinse the graze under clean running water, pat it dry gently and cover it with a plaster or clean gauze. If it is deep, won't stop bleeding, or becomes red, hot and painful, see a doctor.",
        "A nosebleed: your child sits, leans a little forward (not back) and pinches the soft part of the nose steadily for 10 to 15 minutes, breathing through the mouth. If it hasn't stopped after 20 minutes or came after a blow to the head, call a doctor or 115.",
        "Bumps and swelling: hold a cool cloth, or ice wrapped in cloth (never ice directly), on it for a few minutes. If after a blow to the head your child becomes drowsy, vomits or seems confused, call 115 straight away.",
        "Tell your child to tell a grown-up about every cut and bump. Stay calm yourself; your calm calms your child."
      ] }
    ] },
    "health-sprout-25": { title: "Sun and heat", steps: [
      { prompt: "Look at a hot day",
        scenes: [
          { caption: "On hot days, we put on a hat." },
          { caption: "We drink lots of water, even before we feel thirsty." },
          { caption: "We play in the shade, not in the hot sun." },
          { caption: "At midday, when the sun is very hot, we rest in the shade." }
        ] },
      { prompt: "It's a hot summer day and you want to play outside. What do you take with you?", say: "It's a hot summer day and you want to play outside. What do you take with you?",
        options: ["🧢💧 A hat and a water bottle", "🧣🧤 A scarf and gloves"], answer: "🧢💧 A hat and a water bottle" },
      { prompt: "It's very hot at midday. Where shall we play?", say: "It's very hot at midday. Where shall we play?",
        options: ["🌳 In the shade or indoors", "☀️ In the sun"], answer: "🌳 In the shade or indoors" },
      { prompt: "When do we drink water?", say: "When do we drink water?",
        options: ["💧 Several times a day, even before we're thirsty", "🥤 Only when we're very thirsty"], answer: "💧 Several times a day, even before we're thirsty" },
      { tips: [
        "On hot days, your child should wear a brimmed hat and light, loose clothes and play in the shade. Avoid long play in the sun between 11 am and 4 pm.",
        "Children get dehydrated faster than grown-ups in the heat. Offer water every half hour, even if they don't ask. Fizzy and very sweet drinks don't replace water.",
        "Never leave a child in a parked car, not even for a minute.",
        "If your child becomes weak, red and hot, or has a headache or feels sick, take them somewhere cool, give water and cool them with a wet cloth. If they are confused or don't get better, call 115."
      ] }
    ] },
    // ---------------- Sapling ----------------
    "health-sapling-1": { title: "Sleep, play and exercise", steps: [
      { prompt: "A good day",
        scenes: [
          { caption: "Our bodies need to play and move every day: running, jumping, playing ball." },
          { caption: "After playing, our bodies need a little rest too." },
          { caption: "At night, we sleep well. While we sleep, our body rests and remembers what we learned today." },
          { caption: "We go to sleep at the same time every night, and wake up fresh in the morning." }
        ] },
      { prompt: "Which is moving and which is resting? Our bodies need both.",
        baskets: [{ label: "Moving" }, { label: "Resting" }],
        items: [{ label: "Cycling" }, { label: "Playing ball" }, { label: "Skipping rope" }, { label: "Sleeping" },
          { label: "Listening to a story" }, { label: "Slow breathing" }] },
      { prompt: "Put the night-time jobs in order",
        items: [{ label: "Dinner" }, { label: "Brush teeth" }, { label: "Story" }, { label: "Sleep" }] },
      { prompt: "What is better before bed?", options: ["📖 Listening to a story", "📱 Playing on a phone"], answer: "📖 Listening to a story" },
      { text: "Let's move a little!", list: ["Jump five times like a rabbit", "Stand on one leg like a tree", "Stretch like a cat", "Sit quietly and breathe"] },
      { tips: [
        "Children need at least an hour of active play every day, enough to make them breathe a little faster: running, skipping, cycling, hopping, working in the yard.",
        "Children need more sleep than grown-ups; most need about 10 hours a night. Keep bedtime and wake-up time almost the same every day, even on days off.",
        "Turn off phones and the TV an hour before bed. Keep the room dark and quiet. A story or a lullaby helps.",
        "After hard events, waking in the night or being afraid to sleep alone is normal. Stay close to your child and keep the evening routine the same. If it lasts several weeks, talk to a doctor or a counsellor."
      ] }
    ] },
    "health-sapling-2": { title: "Feelings in my body", steps: [
      { prompt: "What does our body do with feelings?",
        scenes: [
          { caption: "When we are scared, our heart beats fast." },
          { caption: "When we are angry, our face gets hot and our hands turn into fists." },
          { caption: "When we are sad, our throat feels heavy and we may cry." },
          { caption: "When we are happy, our body feels light." },
          { caption: "Every feeling we have is normal." },
          { caption: "When a feeling is very big, we breathe slowly." },
          { caption: "And we tell someone we love." }
        ] },
      { prompt: "Like in the story, match each feeling with the sign in the body",
        pairs: [[{ say: "scared" }, { say: "my heart beats fast" }], [{ say: "angry" }, { say: "my hands turn into fists" }],
          [{ say: "sad" }, { say: "I start to cry" }], [{ say: "happy" }, { say: "my body feels light" }]] },
      {},
      { prompt: "When a feeling is very big, what helps our body?",
        options: ["🌷 I breathe slowly and deeply", "😤 I hold my breath", "💨 I breathe very fast"], answer: "🌷 I breathe slowly and deeply" },
      { text: "Put your hand on your heart. Can you feel it? Now breathe slowly and see what your heart does." },
      { tips: [
        "Help your child find the name of their feeling: “It looks like you were scared. Is your heart beating fast?” Feelings are never right or wrong; it is behaviour that sometimes has to change.",
        "After hard experiences such as war, an earthquake or losing someone dear, stomach aches, headaches, nightmares, bedwetting and clinging to parents are common in children. They usually ease with calm, a steady daily routine and your closeness.",
        "If these signs last several weeks, or upset your child's daily life (sleep, eating, play), talk to a doctor, a health centre or a child psychologist.",
        "The “My feelings” lessons on the home page have a slow-breathing exercise. Do them together whenever you need."
      ] }
    ] },
    "health-sapling-3": { title: "Good touch, good secret", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Remember? The parts of your body that underwear covers are your private parts." },
          { caption: "Nobody should touch your private parts, and nobody should ask you to touch their private parts." },
          { caption: "Some secrets are good: like Mum's birthday present that we will give her tomorrow. A good secret is told soon and makes everyone happy." },
          { caption: "Some secrets are not good: a secret that worries you, when someone says never tell anyone. A secret like that must be told." },
          { caption: "Tell a grown-up you trust. If they do not listen, tell another grown-up, until someone helps you." },
          { caption: "It is not your fault. It is never too late to tell." }
        ] },
      { prompt: "Which touch is good? Which one do we say “No!” to?",
        baskets: [{ label: "Good touch" }, { label: "No!", say: "No! I tell a grown-up" }],
        items: [
          { label: "A hug I like", say: "A hug from Grandma, when I want one" },
          { label: "A high five", say: "A high five with my friend" },
          { label: "A doctor's check-up", say: "A doctor's check-up, when Mum or Dad is beside me" },
          { label: "Touching private parts", say: "Someone wants to touch my private parts" },
          { label: "A touch that feels bad", say: "A touch that hurts me or makes me feel bad" },
          { label: "A touch that must stay secret", say: "Someone says this touch must stay a secret" }
        ] },
      { prompt: "Which secret is good and which is not?",
        baskets: [{ label: "Good secret" }, { label: "Not a good secret", say: "Not a good secret. I must tell it" }],
        items: [
          { label: "A surprise party", say: "A birthday party we are planning as a surprise for Grandpa" },
          { label: "My sister's present", say: "A picture I drew for my sister's birthday, to give her tomorrow" },
          { label: "A secret that worries me", say: "Someone says: this is our secret, don't tell your mum, and I am worried" },
          { label: "A secret photo of my body", say: "Someone wants to take a photo of my body and says don't tell anyone" }
        ] },
      { prompt: "You told a grown-up, but they did not listen. What do you do now?",
        options: ["🗣️ I tell another grown-up", "🤐 I don't tell anyone again"], answer: "🗣️ I tell another grown-up" },
      { text: "The trust hand: with your grown-up, count five people on your five fingers who you can tell anything to." },
      { text: "You can tell us anything. We will always listen.",
        tips: [
          "Watch this lesson with your child, then say it again in your own words. A calm, ordinary voice is better than a warning or a scare.",
          "Most harm does not come from strangers; it comes from someone the child knows. So instead of “be afraid of strangers”, teach the rule: nobody, whoever they are.",
          "Practise the difference between good and bad secrets with everyday examples. At home, use “surprise” instead of “secret” for presents and parties; a surprise is told soon.",
          "Write your child's “trust hand” together: five grown-ups your child can turn to, at least one outside the home (for example, a teacher).",
          "If your child tells you something: stay calm, believe them, thank them, tell them it is not their fault, and do not promise to tell no one. The “Body safety” part of the parents' guide says where to get help."
        ] }
    ] },
    "health-sapling-4": { title: "Fire and heat", steps: [
      { prompt: "Look at the story",
        cast: { n125: "125", one: "1. Stop", two: "2. Drop", three: "3. Roll" },
        scenes: [
          { caption: "Mum is cooking dinner. The stove, the pot, the samovar and the teapot are hot." },
          { caption: "Taraneh stands a big step away from the stove and the samovar, and does not touch them." },
          { caption: "Matches and lighters are for grown-ups, not for playing. If we find one, we do not touch it and we tell a grown-up." },
          { caption: "If we see smoke or smell smoke, we bend down and stay low. The air down low is cleaner." },
          { caption: "We go out of the house quickly. We do not hide, and we do not go back for a toy." },
          { caption: "Outside, we tell the grown-ups. They phone the fire brigade: 125." },
          { caption: "If our clothes catch fire, we do not run. Let's practise. One: we stop right where we are." },
          { caption: "Two: we lie down on the ground and cover our face with our hands." },
          { caption: "Three: we roll and roll until the fire is out." },
          { caption: "Then we get up and tell the grown-ups." }
        ] },
      { prompt: "If you see smoke, what do you do? Put it in order",
        items: [{ label: "Stay low" }, { label: "Go out" }, { label: "Tell", say: "Tell a grown-up" }, { label: "125", say: "Phone one two five" }] },
      { prompt: "If your clothes catch fire, what do you do? Put it in order",
        items: [{ label: "Stop" }, { label: "Drop" }, { label: "Roll" }] },
      { text: "Now practise with your grown-up on a rug or a mattress:",
        list: ["Stop", "Drop and cover your face with your hands", "Roll, roll, roll"] },
      { text: "Walk around your home with your grown-up: which doors lead outside? Outside the home, where do we meet each other?" },
      { tips: [
        "In the kitchen, make a one-metre “safe zone” for your child, away from the stove, the samovar and the heater. Keep the samovar and teapot away from the edge of the table or sofreh, and keep the cord out of your child's reach.",
        "Keep matches and lighters up high, out of your child's reach. Never leave a candle, a lit stove or a heater unattended. Keep curtains, clothes and bedding at least one metre from the heater, and do not dry clothes on it.",
        "Fit a smoke alarm and test it every month. Gas heaters and water heaters need a sound flue; a carbon monoxide alarm also saves lives.",
        "Draw a family escape plan: two ways out of every room and a meeting place outside the home. Practise it together twice a year. Once you are out, stay out, and phone 125 from there.",
        "“Stop, drop and roll” is only for when clothes catch fire. Afterwards, hold the burn under cool (not icy) water for 20 minutes and see a doctor.",
        "Practise this lesson like a calm game, in the daytime, without scary stories. If your child has seen a fire before or gets worried, do not insist; hug them and tell them the grown-ups look after the home."
      ] }
    ] },

    "health-sapling-5": { title: "Germs travel", steps: [
      { prompt: "See how germs travel",
        scenes: [
          { caption: "Germs are so small we can't see them. They go from one person to another on our hands." },
          { caption: "Sneezes and coughs spread them through the air too." },
          { caption: "They also get into the body from dirty water and unwashed fruit and vegetables." },
          { caption: "Four ways to stop them: washing hands, sneezing into the elbow, safe water, and washing fruit and vegetables." }
        ] },
      { prompt: "How do germs go from one person to another?", say: "How do germs go from one person to another?",
        options: ["🤝 Hands, sneezes and coughs, water and food", "🌈 Rainbows", "📚 Reading books"], answer: "🤝 Hands, sneezes and coughs, water and food" },
      { prompt: "You have no tissue and you're about to sneeze. What do you do?", say: "You have no tissue and you're about to sneeze. What do you do?",
        options: ["💪 I sneeze into my elbow", "✋ I sneeze into my hand", "🤧 I sneeze into the air"], answer: "💪 I sneeze into my elbow" },
      { text: "The glitter test with your grown-up: put a little glitter or flour on your palm; these are the “germs”!", list: ["Shake hands with someone: did the “germs” go onto their hand too?", "Touch the door handle: did they go there too?", "Now wash with water only. Have they all gone?", "Now wash with soap and water and rub for twenty seconds."] },
      { tips: [
        "Germs spread in four main ways: hands, sneezes and coughs, dirty water and dirty food. Four simple things stop them: washing hands with soap, covering sneezes and coughs, safe water, and washing and cooking food well.",
        "The glitter or flour test shows how invisible things move on our hands and why soap is needed. Clean up together afterwards.",
        "Tell your child that not all germs are bad and that our body defends itself too. The aim is not to frighten but to build simple habits."
      ] }
    ] },
    "health-sapling-6": { title: "Safe water, clean food", steps: [
      { prompt: "Look at the kitchen",
        scenes: [
          { caption: "We wash fruit and vegetables with clean water before we eat them." },
          { caption: "We cover food so dust and insects don't land on it." },
          { caption: "We put leftover food in the fridge quickly so it stays cold and doesn't go off." },
          { caption: "We drink safe water: safe tap water, or water that has been boiled and cooled." }
        ] },
      { prompt: "Which keeps food and water safe, and which doesn't?",
        baskets: [{ label: "Keeps it safe" }, { label: "It's risky" }],
        items: [{ say: "washing fruit with clean water" }, { say: "covering food" }, { say: "leftovers in the fridge" }, { say: "eating unwashed fruit" }, { say: "leftovers outside, in the sun" }, { say: "drinking river water" }] },
      { prompt: "On an outing you are thirsty and next to a stream. What do you do?", say: "On an outing you are thirsty and next to a stream. What do you do?",
        options: ["🧴 I drink from the bottle of safe water we brought", "🏞️ I drink the stream water"], answer: "🧴 I drink from the bottle of safe water we brought" },
      { prompt: "There is food left from lunch. Where shall we put it?", say: "There is food left from lunch. Where shall we put it?",
        options: ["🧊 In the fridge, quickly", "🪟 By the window until dinner"], answer: "🧊 In the fridge, quickly" },
      { tips: [
        "Wash fruit and vegetables under running water; soak fresh herbs in water with a suitable disinfectant as the packet says, then rinse again.",
        "Don't leave cooked food out for more than two hours (less in hot weather). Put leftovers in the fridge quickly and reheat them only once.",
        "If you are not sure about tap water, boil it for at least a minute and keep it in a clean, closed container. Take safe water on outings.",
        "Wash hands before preparing food and keep the board and knife for raw meat separate."
      ] }
    ] },
    "health-sapling-7": { title: "New teeth", steps: [
      { prompt: "Look at the teeth",
        scenes: [
          { caption: "Milk teeth slowly get loose and fall out, and a new tooth grows in their place." },
          { caption: "New teeth stay with us for life. So we look after them well." },
          { caption: "We brush every side of each tooth: outside, inside and on top." },
          { caption: "We also floss between our teeth." },
          { caption: "Sweet food and drinks between meals harm our teeth. Afterwards we drink water and rinse our mouth." },
          { caption: "Once or twice a year we go to the dentist so they can look at our teeth." }
        ] },
      { prompt: "Put night-time brushing in order",
        items: [{ label: "Toothpaste, the size of a pea" }, { label: "The outside of the teeth" }, { label: "The back and top of the teeth" }, { label: "Floss with a grown-up's help" }, { label: "Spit" }] },
      { prompt: "Your milk tooth is loose. What do you do?", say: "Your milk tooth is loose. What do you do?",
        options: ["🙂 I tell my grown-up; it will fall out by itself", "😨 I'm scared and I stop brushing"], answer: "🙂 I tell my grown-up; it will fall out by itself" },
      { prompt: "Which is better for our teeth?", say: "Which is better for our teeth?",
        options: ["💧 Drinking water between meals", "🍭 Sucking sweets all afternoon"], answer: "💧 Drinking water between meals" },
      { text: "Open your mouth in front of the mirror and count your teeth. Which ones are new? Tonight, brush every side of your teeth with your grown-up." },
      { tips: [
        "Milk teeth start to fall out at about six, and permanent teeth take their place. The first permanent molar (at about six) comes in behind the milk teeth, and many people don't notice it; look after it well.",
        "Brush twice a day with fluoride toothpaste, and check after your child until about eight. Help with flossing.",
        "How often your child eats sweet things matters more than how much. Keep sweet food and drinks to mealtimes and give water between meals.",
        "Visit a dentist or the health centre once or twice a year; fluoride varnish and fissure sealants protect new teeth."
      ] }
    ] },
    "health-sapling-8": { title: "When I'm ill", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "When we don't feel well, we tell our grown-up." },
          { caption: "We rest, drink water and other drinks, and stay at home until we're better." },
          { caption: "Only a grown-up gives medicine: with its own measuring cup, and the amount the doctor said." },
          { caption: "Some friends are allergic to a food. When they say “No, thank you”, we don't give them our food." }
        ] },
      { prompt: "You have a fever and a headache. What do you do?", say: "You have a fever and a headache. What do you do?",
        options: ["🛌 I tell my grown-up, rest and drink water", "⚽ I go out and play football"], answer: "🛌 I tell my grown-up, rest and drink water" },
      { prompt: "Your friend's pills are on the table. What do you do?", say: "Your friend's pills are on the table. What do you do?",
        options: ["🙋 I don't touch them and I tell a grown-up", "💊 I take one because I'm ill too"], answer: "🙋 I don't touch them and I tell a grown-up" },
      { prompt: "Your friend is allergic to peanuts. You have a peanut snack. What do you do?", say: "Your friend is allergic to peanuts. You have a peanut snack. What do you do?",
        options: ["🚫 I don't offer it to them", "🥜 I give them a little"], answer: "🚫 I don't offer it to them" },
      { tips: [
        "Teach your child to say whenever they feel unwell. A sick child (fever, diarrhoea, vomiting) should rest at home until better; this protects others too.",
        "Only a grown-up gives medicine, with the medicine's own measuring cup or syringe, in the amount the doctor or pharmacist said. Never give your child adult medicine or another child's medicine. Keep all medicines up high and locked.",
        "If your child has a food allergy or asthma, tell the teacher and the school and have a written plan. Teach all children not to share food with an allergic friend without a grown-up's permission.",
        "Take warning signs seriously: difficulty breathing, swelling of the lips and face after food, extreme drowsiness, a seizure. Call 115 at once."
      ] }
    ] },
    "health-sapling-9": { title: "The clean game", steps: [
      { prompt: "Which stops germs, and which spreads them?",
        baskets: [{ label: "Stops them" }, { label: "Spreads them" }],
        items: [{ say: "washing hands with soap" }, { say: "coughing into the elbow" }, { say: "a tissue in the bin" }, { say: "drinking from a sick friend's glass" }, { say: "sneezing towards other people" }, { say: "a finger in the nose, then a snack" }] },
      { prompt: "Which food and water are safe, and which are not?",
        baskets: [{ label: "Safe" }, { label: "Not safe" }],
        items: [{ say: "a washed apple" }, { say: "leftovers in the fridge" }, { say: "boiled and cooled water" }, { say: "river water" }, { say: "food left out since yesterday" }] },
      { prompt: "Put tooth-brushing in order",
        items: [{ label: "Toothpaste, the size of a pea" }, { label: "The outside of the teeth" }, { label: "The inside and top of the teeth" }, { label: "The tongue" }, { label: "Spit" }] },
      { prompt: "Put washing fruit in order",
        items: [{ label: "Wash hands" }, { label: "Wash the fruit under the tap" }, { label: "Put it in a clean basket" }, { label: "Eat" }] },
      { tips: [
        "Carry these games on with real moments at home: “Is it time to wash hands now or not?”, “Can we drink this water?”",
        "Let your child help wash the fruit and set the table so they do the clean habits themselves.",
        "Ask your child to teach a younger brother or sister; teaching is the best way to learn."
      ] }
    ] },
    "health-sapling-10": { title: "A good day of food", steps: [
      { prompt: "A day at the sofreh",
        scenes: [
          { caption: "Breakfast: bread, cheese and walnuts, with a glass of milk." },
          { caption: "Snack: a piece of fruit." },
          { caption: "Lunch: rice, a stew with beans or meat, herbs and yoghurt. Food from several groups." },
          { caption: "Dinner is lighter. We sit at the sofreh with the family and eat together." }
        ] },
      { prompt: "Put each food in the meal where we usually eat it",
        baskets: [{ label: "Breakfast" }, { label: "Lunch" }, { label: "Snack" }],
        items: [{ say: "bread and cheese" }, { say: "milk" }, { say: "rice and stew" }, { say: "salad" }, { say: "orange" }, { say: "walnuts" }] },
      { prompt: "Which groups are in today's lunch? Put each in its group",
        baskets: [{ label: "Bread and rice" }, { label: "Fruit and vegetables" }, { label: "Beans and meat" }, { label: "Dairy" }],
        items: [{ say: "rice" }, { say: "herbs" }, { say: "bean stew" }, { say: "yoghurt" }] },
      { text: "Today, with your grown-up, write or draw a good day of food: breakfast, snack, lunch and dinner. How many food groups does each meal have?" },
      { tips: [
        "Three main meals and one or two small snacks give your child steady energy. Try to have something from at least three food groups at each meal.",
        "The Iranian table is full of good examples: lentil soup, ash, bean stews, herb kuku, bread with cheese and herbs. Don't call foods “good” or “bad” and don't talk about weight.",
        "Eat at least one meal a day together, without screens. Let your child help prepare food.",
        "If your child won't eat a food, don't insist; put it on the table a few more times, next to foods they like."
      ] }
    ] },
    "health-sapling-11": { title: "Drinks and sugar", steps: [
      { prompt: "How many sugar cubes are hidden in each drink?",
        scenes: [
          { caption: "Water is the best drink. It has no sugar at all." },
          { caption: "Milk is a good drink too, with no added sugar." },
          { caption: "A can of fizzy drink hides about eight sugar cubes!" },
          { caption: "A small carton of packaged juice has about six sugar cubes too." },
          { caption: "So most of the time we drink water and milk. They have no added sugar." }
        ] },
      { prompt: "Which do we drink every day, and which only sometimes?",
        baskets: [{ label: "Every day" }, { label: "Sometimes, a little" }],
        items: [{ say: "water" }, { say: "milk" }, { say: "doogh with little salt" }, { say: "fizzy drink" }, { say: "packaged juice" }, { say: "a sweet drink" }] },
      { prompt: "You're very thirsty after playing. Which is the best drink?", say: "You're very thirsty after playing. Which is the best drink?",
        options: ["💧 Water", "🥤 A fizzy drink", "🧃 Packaged juice"], answer: "💧 Water" },
      { prompt: "Which one hides more sugar?", say: "Which one hides more sugar?",
        options: ["🥤 A can of fizzy drink", "💧 A glass of water"], answer: "🥤 A can of fizzy drink" },
      { tips: [
        "The World Health Organization advises keeping added sugar under 10% of daily energy, and preferably under 5%. For a child, one sweet drink can use up the whole day's share.",
        "A can of fizzy drink has about 35 g of sugar (about 8 to 9 cubes) and a small carton of packaged juice about 20 to 25 g. Whole fruit is better than juice.",
        "Make water and milk the everyday drinks. Keep sweet drinks for sometimes, preferably with a meal, and drink water afterwards so the teeth suffer less.",
        "Read drink labels with your child and show the sugar with sugar cubes; seeing the cubes works better than talking."
      ] }
    ] },
    "health-sapling-12": { title: "The day-of-meals game", steps: [
      { prompt: "Make a good day: put each food in a good meal for it",
        baskets: [{ label: "Breakfast" }, { label: "Lunch" }, { label: "Dinner" }],
        items: [{ say: "bread, cheese and walnuts" }, { say: "egg" }, { say: "rice and stew" }, { say: "salad" }, { say: "ash soup" }, { say: "yoghurt" }] },
      { prompt: "Which drinks have little sugar, and which a lot?",
        baskets: [{ label: "Little or no sugar" }, { label: "A lot of sugar" }],
        items: [{ say: "water" }, { say: "milk" }, { say: "tea without sugar" }, { say: "fizzy drink" }, { say: "packaged juice" }, { say: "chocolate milk" }] },
      { prompt: "Match each food with its group",
        pairs: [[{ say: "bread" }, { label: "Bread and rice", say: "Bread and rice" }], [{ say: "carrot" }, { label: "Fruit and vegetables", say: "Fruit and vegetables" }],
          [{ say: "lentil soup" }, { label: "Beans and meat", say: "Beans and meat" }], [{ say: "yoghurt" }, { label: "Dairy", say: "Dairy" }]] },
      { prompt: "Match each meal with its time",
        pairs: [[{ say: "morning" }, { label: "Breakfast", say: "Breakfast" }], [{ say: "midday" }, { label: "Lunch", say: "Lunch" }], [{ say: "night" }, { label: "Dinner", say: "Dinner" }]] },
      { tips: [
        "Ask your child to plan a day's family menu with you: food from several groups at each meal, and water or milk to drink.",
        "Read drink and packaged food labels together. Show your child the traffic-light labels on packets (red for lots of sugar, fat and salt).",
        "Don't forbid any food or call it “bad”; say “every day” and “sometimes”."
      ] }
    ] },
    "health-sapling-13": { title: "Heart, muscles, stretch, balance", steps: [
      { prompt: "The four parts of being fit",
        scenes: [
          { caption: "Heart and lungs: running makes the heart and lungs strong." },
          { caption: "Strength: push-ups against a wall make the muscles of the arms and shoulders strong." },
          { caption: "Stretch: the cat move. We round our back, then dip it. The body stays soft and long." },
          { caption: "Balance: we stand on one foot and count to ten. Then the other foot." }
        ] },
      { prompt: "Match each part of being fit with its move",
        pairs: [[{ say: "heart and lungs" }, { label: "Running", say: "Running" }], [{ say: "strength" }, { label: "Wall push-ups", say: "Wall push-ups" }],
          [{ say: "stretch" }, { label: "The cat move", say: "The cat move" }], [{ say: "balance" }, { label: "On one foot", say: "On one foot" }]] },
      { text: "Do all four moves with your grown-up:", list: ["Run or jump on the spot: count to twenty.", "Wall push-ups: ten times.", "The cat move: five times, slowly.", "On one foot: count to ten, then the other foot."] },
      { text: "Name a game or sport you like. Which part of being fit does it help? Heart, strength, stretch or balance? Maybe several!" },
      { tips: [
        "Fitness has several parts: heart and lungs (running, skipping, cycling), muscle and bone strength (wall push-ups, climbing, jumping), flexibility (stretches) and balance. Varied play builds them all together.",
        "World Health Organization: an average of 60 minutes a day of moderate to vigorous activity, and on three days a week, activities that strengthen muscles and bones.",
        "Strength moves for children use their own body weight (not heavy weights): wall push-ups, squats, jumping, hanging from swings and bars.",
        "Moves should be slow and painless. If something hurts, the child should stop."
      ] }
    ] },
    "health-sapling-14": { title: "Warm up, calm down", steps: [
      { prompt: "Warming up and calming down the body",
        scenes: [
          { caption: "Before playing, we warm up the body: we march on the spot and lift our knees." },
          { caption: "We swing our arms in big, slow circles and do a few small jumps." },
          { caption: "Now the body is ready to play!" },
          { caption: "After playing, we calm the body down: we walk slowly until our breathing is calm." },
          { caption: "We lift our arms and stretch up tall. Then a deep breath in, and slowly out." }
        ] },
      { prompt: "Put these in order: from before playing to after",
        items: [{ label: "Marching on the spot" }, { label: "Arm circles" }, { label: "Playing" }, { label: "Walking slowly" }, { label: "Stretching and a slow breath" }] },
      { prompt: "Put the warm-up in order: from slow to fast",
        items: [{ label: "Walking" }, { label: "Marching with knees up" }, { label: "Small jumps" }] },
      { text: "Before your next game, warm up with your grown-up:", list: ["March on the spot: count to twenty.", "Arm circles: five forwards, five backwards.", "Ten small jumps."] },
      { text: "After playing, calm your body down:", list: ["Walk slowly for a minute.", "Lift your arms and stretch up tall.", "Take three slow breaths."] },
      { tips: [
        "Warming up (five minutes of light movement that slowly gets faster) gets the muscles and the heart ready to play. Calming down (slow walking, gentle stretches and slow breathing) slowly brings the body back to rest.",
        "Do stretches slowly and without bouncing. A stretch should never hurt.",
        "Drink water before and after play and sport.",
        "Do this habit yourself too: children learn more from seeing than from hearing."
      ] }
    ] },
    "health-sapling-15": { title: "Rope and target", steps: [
      { prompt: "Watch, then try it too",
        scenes: [
          { caption: "Long rope: two people turn the rope. Each time the rope comes under our feet, we jump." },
          { caption: "Throwing at a target: we look at the middle of the target and throw the soft ball." },
          { caption: "Dodging: a soft ball comes towards us. With one big step to the side, we dodge it." },
          { caption: "We bounce the ball on the ground with one hand and walk along with it." }
        ] },
      { text: "Long rope: two grown-ups turn the rope slowly, and each time it comes under your feet, you jump. Count each jump." },
      { text: "A target game at home: put down a basket and, from three steps away, throw a sock ball into it.", list: ["Throw five times. How many went in?", "Take one step back and try again."] },
      { text: "In the yard or the park, play with your grown-up:", list: ["Bounce the ball with one hand and catch it: ten times.", "Now walk along with the ball.", "Dodging: your grown-up rolls a soft ball along the ground towards you, and you jump to the side."] },
      { tips: [
        "Rope, throwing at a target, dodging and dribbling combine several skills: eye and hand, balance and timing. They are the base of most games and team sports.",
        "For dodging and throwing, use only a soft ball (foam, cloth, or a rolled-up sock), and never throw at anyone's head.",
        "With a long rope, first swing it gently back and forth like a swing, then turn it all the way round.",
        "Practise every move with both hands and both feet."
      ] }
    ] },
    "health-sapling-16": { title: "Playing fair", steps: [
      { prompt: "A fair game",
        scenes: [
          { caption: "Before the game, we say the rules together and everyone agrees." },
          { caption: "Someone is standing alone. We call out: “Come and play with us!”" },
          { caption: "Goal! When someone plays well, we cheer for them: “Well done!”" },
          { caption: "If someone breaks a rule, we don't shout. We say calmly: “Not with your hands! Let's start again.”" },
          { caption: "At the end of the game, win or lose, we shake hands and say: “Good game!”" }
        ] },
      { prompt: "In a game, one of your teammates cheats. What do you do?", say: "In a game, one of your teammates cheats. What do you do?",
        options: ["🗣️ I calmly say that's not the rule, and if they go on, I tell a grown-up", "😠 I shout and push them", "🙈 I cheat too"],
        answer: "🗣️ I calmly say that's not the rule, and if they go on, I tell a grown-up" },
      { prompt: "Your team lost. What do you do?", say: "Your team lost. What do you do?",
        options: ["🤝 I shake hands with the winning team and say: “Good game!”", "😤 I take the ball and leave", "🗯️ I say they cheated"],
        answer: "🤝 I shake hands with the winning team and say: “Good game!”" },
      { prompt: "A new child is standing by the pitch, watching the game. What do you do?", say: "A new child is standing by the pitch, watching the game. What do you do?",
        options: ["👋 I call them over and tell them the rules of the game", "🙅 I say there's no room", "😶 I don't even look at them"],
        answer: "👋 I call them over and tell them the rules of the game" },
      { caption: "Which team game do you like? What are its rules? Think of a time someone cheered for you, or you cheered for someone. How did it feel?" },
      { tips: [
        "Playing fair means keeping the rules, letting everyone play, cheering on teammates and the other team, and shaking hands after the game, win or lose.",
        "When your child loses, accept the feeling (“You're sad that you lost”), then point to the effort and the teamwork, not only the result.",
        "If someone cheats, your child can learn to say so calmly and, if it goes on, to ask a grown-up for help; no fighting, no cheating back.",
        "When you watch sport, notice fair play by players and fans with your child and talk about it."
      ] }
    ] },
    "health-sapling-17": { title: "Backpack and chair", steps: [
      { prompt: "A light bag, sitting well",
        scenes: [
          { caption: "On one shoulder, the bag hangs crooked and makes the body crooked too." },
          { caption: "So we put the bag on both shoulders. The body stays straight." },
          { caption: "We put only the things we need that day in the bag, so it stays light." },
          { caption: "We sit up straight: feet on the floor and our back against the chair." },
          { caption: "After sitting for a while, we get up and stretch." },
          { caption: "When we work on a screen, now and then we take our eyes off it and look far away, out of the window." }
        ] },
      { prompt: "Which child is carrying their bag the right way?", say: "Which child is carrying their bag the right way?",
        options: ["🎒 The bag on both shoulders, with the straps tight", "👜 The bag on one shoulder", "🧳 A bag full of toys"], answer: "🎒 The bag on both shoulders, with the straps tight" },
      { prompt: "You have been sitting and playing for an hour. What do you do now?", say: "You have been sitting and playing for an hour. What do you do now?",
        options: ["🙆 I get up, stretch and walk around a little", "🛋️ I sit there for another hour", "📱 I bring the screen closer"], answer: "🙆 I get up, stretch and walk around a little" },
      { text: "Tonight, pack tomorrow's bag with your grown-up:", list: ["Put in only tomorrow's books and notebooks.", "Take the toys out.", "Adjust the straps so the bag sits high on your back."] },
      { text: "When you do homework, sit up straight: feet on the floor, back against the chair. Each time you finish a page, get up and stretch." },
      { tips: [
        "A school bag should weigh no more than about a tenth of the child's weight. Pack only that day's things each day, with the heaviest close to the back.",
        "Put both straps over the shoulders and shorten them so the bag sits high on the back, not on the bottom.",
        "Homework desk and chair: feet on the floor (or on a box), knees at about a right angle, and the screen or book at a good distance from the eyes.",
        "After every half hour to an hour of sitting, a few minutes of movement. On screens, every twenty minutes look far away for about twenty seconds."
      ] }
    ] },
    "health-sapling-18": { title: "Ten-minute workout", steps: [
      { prompt: "1. Warming up",
        moves: [
          { name: "Marching on the spot", say: "Bring your knees up and swing your arms.", easier: { say: "Walk slowly and bring your knees up a little." } },
          { name: "Arm circles", say: "Open your arms and move them up and down, big and slow." },
          { name: "Small jumps", say: "On your toes, jump small and soft.", easier: { say: "No jumping: rise up on your toes and come down." } }
        ] },
      { prompt: "2. Moves for the heart",
        moves: [
          { name: "Star jumps", say: "With each jump, arms up and legs apart; then back together.", easier: { say: "No jumping: one foot out to the side and arms up, then back." }, harder: { say: "Faster and more!" } },
          { name: "Running on the spot", say: "Run on the spot and swing your arms.", easier: { say: "March fast, without jumping." }, harder: { say: "Knees higher!" } },
          { name: "Frog jumps", say: "Crouch down, hands on the floor, then jump up and land softly.", easier: { say: "Crouch down and stand up, without jumping." } }
        ] },
      { prompt: "3. Strength",
        moves: [
          { name: "Wall push-ups", say: "Hands on the wall, body straight. Bend your elbows and straighten them again.", easier: { say: "Stand closer to the wall and bend only a little." } },
          { name: "Squats", say: "Feet apart, arms in front. Go down as if sitting on a chair, and stand up.", easier: { say: "Go down a little, only as far as is comfortable." } },
          { name: "Plank on the knees", say: "On your knees and hands, your body straight like a line. Hold it and count.", easier: { say: "Hold it for five." }, harder: { say: "Hold it for twenty." } }
        ] },
      { prompt: "4. Stretching",
        moves: [
          { name: "Stretching tall", say: "Reach your arms up, stretch tall and bring them down slowly." },
          { name: "Bending forward", say: "Knees a little soft. Bend forward slowly and reach your hands towards your feet. Only as far as it doesn't hurt." },
          { name: "The cat move", say: "On your hands and knees: round your back, then slowly dip it." }
        ] },
      { prompt: "5. Calming down",
        moves: [
          { name: "Slow walking", say: "Walk slowly and calmly on the spot." },
          { name: "Slow breaths", say: "Breathing in, open your arms; breathing out, bring them down slowly." }
        ] },
      { tips: [
        "With short rests, this workout takes about ten minutes. If you have more time, do the “moves for the heart” part twice.",
        "Choose “easier” and “harder” together. Every move should be painless; if something hurts, stop.",
        "You need enough space, a flat non-slip floor, and shoes or bare feet (not socks on tiles). Do the jumps away from the edges of tables and sofas.",
        "The World Health Organization suggests an average of 60 minutes a day of moderate to vigorous movement for children; this workout is part of it, not all of it. Do it together."
      ] }
    ] },
    "health-sapling-30": { title: "A movement chain", steps: [
      { prompt: "See how a movement chain is made",
        scenes: [
          { caption: "Start: we stand straight and still, like a pencil." },
          { caption: "Then a balance: on one foot, arms out. We count to three." },
          { caption: "A jump: arms up and legs apart, and we land softly." },
          { caption: "A travelling move: we take a few steps sideways." },
          { caption: "Finish: one last still shape, like a star. Done!" },
          { caption: "With a friend: one person moves and the other does the same, like a mirror." }
        ] },
      { prompt: "Put the chain in order",
        items: [{ label: "Start: pencil" }, { label: "Balance on one foot" }, { label: "Jump" }, { label: "Step sideways" }, { label: "Finish: star" }] },
      { text: "Make your own chain and do it three times, once with music and once in silence:", list: ["A start shape", "A balance", "A jump", "A travelling move (steps, hops or a roll)", "A finish shape"] },
      { text: "The mirror game: stand facing your grown-up or a friend. One moves slowly and the other does the same, like a mirror. Then swap." },
      { tips: [
        "A movement chain is the basis of gymnastics and dance: your child links several moves, learns to have a clear start and finish, and remembers the moves.",
        "Only safe home moves: no handstands, back flips or somersaults. Do rolls only on a soft mattress, with someone watching.",
        "Ask your child to perform the chain for the family and note it down with a word or a simple drawing.",
        "The mirror game builds focus, coordination and taking turns; move slowly yourself first."
      ] }
    ] },
    "health-sapling-19": { title: "Every body is different", steps: [
      { prompt: "Look at the children",
        scenes: [
          { caption: "Children grow at different speeds. One is taller and one is shorter." },
          { caption: "One wears glasses and one has freckles." },
          { caption: "One gets around in a wheelchair." },
          { caption: "All bodies are good. We never make fun of anyone's body, and we play with everyone." }
        ] },
      { prompt: "A child laughs at your friend for being short. What do you do?", say: "A child laughs at your friend for being short. What do you do?",
        options: ["🙋 I say that's not right, I stand by my friend, and if it goes on I tell a grown-up", "😂 I laugh too", "🙈 I pretend I didn't see"],
        answer: "🙋 I say that's not right, I stand by my friend, and if it goes on I tell a grown-up" },
      { prompt: "A new child in a wheelchair has joined the class. What is a kind thing to do?", say: "A new child in a wheelchair has joined the class. What is a kind thing to do?",
        options: ["👋 I say hello and ask what they would like to play together", "👀 I stare at them from far away", "🚫 I think they can't play"],
        answer: "👋 I say hello and ask what they would like to play together" },
      { prompt: "Which sentence is true?", say: "Which sentence is true?",
        options: ["🌈 Bodies are all different, and all are good", "📏 Only a tall body is good", "🙅 Anyone with glasses shouldn't play"], answer: "🌈 Bodies are all different, and all are good" },
      { caption: "How are you and your friends alike, and how are you different? What good things does your body do for you?" },
      { tips: [
        "Children grow at different speeds; height, weight and the timing of body changes vary a lot between children of the same age, and that is normal. If you are worried, talk to the child's doctor, not in front of your child.",
        "Don't speak negatively in front of your child about your own or others' bodies (weight, height, skin colour). Notice what the body does, not only how it looks.",
        "If your child asks about someone's disability or appearance, answer simply and respectfully, and encourage friendship and playing together.",
        "Teasing someone about their body is a kind of bullying. Teach your child to stand by their friend and tell a grown-up."
      ] }
    ] },
    "health-sapling-20": { title: "No to bullying!", steps: [
      { prompt: "See what we do",
        scenes: [
          { caption: "Bullying is when someone hurts another person on purpose, again and again: for example, saying nasty things or taking their things." },
          { caption: "It is never the fault of the one who is being bullied." },
          { caption: "If we see someone being bullied, we go over and stand next to them." },
          { caption: "Together, firmly and calmly, we say: “Stop it!”" },
          { caption: "Then together we tell a grown-up. This isn't telling tales; it's asking for help." }
        ] },
      { prompt: "Which one is bullying?", say: "Which one is bullying?",
        options: ["🔁 Someone says nasty things to a child on purpose every day", "⚽ Two friends argue once about whose turn it is, and make up", "😄 You and your friend joke together and both laugh"],
        answer: "🔁 Someone says nasty things to a child on purpose every day" },
      { prompt: "You see some children leaving a child out and making fun of them. What do you do?", say: "You see some children leaving a child out and making fun of them. What do you do?",
        options: ["🤝 I stand next to them, we walk away together and tell a grown-up", "😂 I laugh with them too", "👊 I fight them"],
        answer: "🤝 I stand next to them, we walk away together and tell a grown-up" },
      { prompt: "Someone bothers you on the way to school every day. Whose fault is it?", say: "Someone bothers you on the way to school every day. Whose fault is it?",
        options: ["💛 It's not my fault. I tell a grown-up so they can help me", "😔 It must be my fault", "🤐 I don't tell anyone"], answer: "💛 It's not my fault. I tell a grown-up so they can help me" },
      { caption: "If you see someone left alone or being bullied, what can you do? Which grown-ups can you tell?" },
      { tips: [
        "Bullying is behaviour that is on purpose, repeated, and where one side has more strength or power: hitting, nasty words and name-calling, leaving someone out, taking things, or harassment in messages and online games. A one-off fight is not bullying.",
        "If your child says they are being bullied, listen calmly, thank them for telling you, and say it isn't their fault. Talk to the teacher and the head of the school; don't ask your child to “hit back” or fight.",
        "Signs your child may not mention: not wanting to go to school, things lost or broken, stomach aches and headaches in the morning, loneliness, or a sudden change of mood.",
        "Teach your child not to just watch: to stand by the one being bullied, walk away with them and tell a grown-up. Telling a grown-up is helping, not telling tales.",
        "If your child is the one bullying others, don't humiliate them; find out why, say clearly that this behaviour is not acceptable, and practise making amends and empathy."
      ] }
    ] },
    "health-sapling-21": { title: "On the way to school", steps: [
      { prompt: "The safe way to school",
        scenes: [
          { caption: "With a grown-up, we walk to school on the pavement. The grown-up walks on the road side." },
          { caption: "To cross a wide road, we use the footbridge." },
          { caption: "Waiting for the school bus, we stand on the pavement, away from the kerb, until the bus has fully stopped." },
          { caption: "In the school bus too, we sit in the back and fasten our seat belt." },
          { caption: "We ride our bikes in the park or a quiet lane, with a helmet." }
        ] },
      { prompt: "To cross a wide, busy road, which way is safer?", say: "To cross a wide, busy road, which way is safer?",
        options: ["🌉 The footbridge, or the zebra crossing on a green light with a grown-up", "🏃 Running between the cars", "🚧 Climbing over the railing in the middle of the road"], answer: "🌉 The footbridge, or the zebra crossing on a green light with a grown-up" },
      { prompt: "Your ball went into the middle of the road. What do you do?", say: "Your ball went into the middle of the road. What do you do?",
        options: ["🙋 I stay right there on the pavement and tell a grown-up", "🏃 I run fast and get it", "👀 I look first, then go myself"], answer: "🙋 I stay right there on the pavement and tell a grown-up" },
      { prompt: "Where do we ride our bikes?", say: "Where do we ride our bikes?",
        options: ["🌳 In the park or a quiet lane, with a helmet", "🚗 On a busy road, next to the cars", "🌙 At night in the dark, without lights"], answer: "🌳 In the park or a quiet lane, with a helmet" },
      { tips: [
        "Children under about ten cannot yet judge the speed and distance of cars properly, and their field of view is smaller. On the street, always be with them and hold their hand.",
        "Walk the way to school together and point out the safe places: the footbridge, the crossing with lights, and dangerous places such as behind parked cars and car-park entrances.",
        "School bus: your child waits on the pavement away from the kerb, gets on and off only when the bus has fully stopped, fastens the seat belt, and never crosses in front of or behind the bus.",
        "Cycling only in the park, a quiet lane or a cycle path, with a helmet fastened properly, and in bright clothes.",
        "Be a role model: use the footbridge and don't cross in the middle of the road."
      ] }
    ] },
    "health-sapling-22": { title: "Water and swimming", steps: [
      { prompt: "See how we stay safe in the water",
        scenes: [
          { caption: "We swim only where a grown-up or a lifeguard is watching us." },
          { caption: "River water looks calm, but it pulls hard: see how fast the ball went! We don't swim in rivers." },
          { caption: "We learn to float: we lie on our back on the water, arms open, and breathe slowly." },
          { caption: "If someone in the water needs help, we don't jump in ourselves. We call a grown-up and throw them a ring." }
        ] },
      { prompt: "It's a hot day and you're by a river. The other children say: let's swim! What do you do?", say: "It's a hot day and you're by a river. The other children say: let's swim! What do you do?",
        options: ["🙅 I don't go in; river water pulls hard. We only play by the water with a grown-up", "🏊 I jump into the water", "👀 First I look to see if it's deep, then I go in"], answer: "🙅 I don't go in; river water pulls hard. We only play by the water with a grown-up" },
      { prompt: "Your friend is tired in the pool and needs help. What do you do?", say: "Your friend is tired in the pool and needs help. What do you do?",
        options: ["📣 I shout for the lifeguard and throw them a ring or something that floats", "🤽 I jump into the water myself", "🏃 I run away"], answer: "📣 I shout for the lifeguard and throw them a ring or something that floats" },
      { prompt: "Where can we swim?", say: "Where can we swim?",
        options: ["🏊 A pool or an approved beach, while a lifeguard or grown-up watches us", "🌊 Behind a dam or in a water channel", "🏞️ In a river, alone"], answer: "🏊 A pool or an approved beach, while a lifeguard or grown-up watches us" },
      { tips: [
        "Drowning is silent and happens in seconds. When your child is in or near water, one grown-up watches only them, without a phone.",
        "Rivers, channels, reservoirs behind dams and seas without lifeguards are dangerous even for swimmers: currents under the water, cold water and sudden depth. Swim only in pools and approved beaches with lifeguards.",
        "If you can, enrol your child in swimming lessons with a coach. Learning to float on the back and to get out of the water are life-saving skills.",
        "Teach your child not to jump in to help someone in the water: call a grown-up and throw them a ring, a ball or a closed empty bottle.",
        "Keep the courtyard pool, bath, buckets and water barrels empty or covered too; a small child can drown even in shallow water."
      ] }
    ] },
    "health-sapling-23": { title: "Heat, cold, bad air", steps: [
      { prompt: "Each kind of weather has its own way",
        scenes: [
          { caption: "Hot days: we drink lots of water, wear a hat and play in the shade." },
          { caption: "Cold days: we wear warm clothes in layers and put on a hat." },
          { caption: "On days when the air is polluted or full of dust, we stay at home and shut the window." },
          { caption: "At home we play quietly; for example, we read a book." }
        ] },
      { prompt: "Put each thing in the basket for its weather",
        baskets: [{ label: "Hot day" }, { label: "Cold day" }, { label: "Polluted air" }],
        items: [{ say: "lots of water" }, { say: "playing in the shade" }, { say: "a coat" }, { say: "a scarf and gloves" }, { say: "a closed window" }, { say: "quiet play at home" }] },
      { prompt: "Which are right, and which are not?",
        baskets: [{ label: "Right" }, { label: "No!" }],
        items: [{ say: "a hat in the sun" }, { say: "gloves in the snow" }, { say: "staying at home when the air is polluted" }, { say: "running in the midday summer sun" }, { say: "thin clothes in the snow" }, { say: "football outside in polluted air" }] },
      { prompt: "It's summer and very hot. When should we play outside?", say: "It's summer and very hot. When should we play outside?",
        options: ["🌅 Early in the morning or in the evening, in the shade, with a water bottle", "☀️ At midday, in the sun", "🚗 Wait in a closed car"], answer: "🌅 Early in the morning or in the evening, in the shade, with a water bottle" },
      { tips: [
        "Heat: on hot days, move outdoor play to early morning and evening; plenty of water, light loose clothes, a hat and sunscreen. Never leave a child alone in a closed car, even for a few minutes.",
        "Signs of heat illness: headache, dizziness, nausea, great tiredness, or hot red skin. Take the child to the shade or somewhere cool, give water, and if they don't get better or are confused, call 115.",
        "Cold: several thin layers are better than one thick one; a hat, gloves and warm socks. Never leave a heater on in a closed bedroom (carbon monoxide).",
        "Polluted air and dust: check the air quality index in the news or weather apps. On unhealthy days, cut down outdoor activity, close the windows and swap in quiet play at home. An ordinary cloth mask doesn't help much against fine particles.",
        "Children with asthma need extra care in polluted and cold air; follow their doctor's plan."
      ] }
    ] },
    "health-sapling-24": { title: "Safe online", steps: [
      { prompt: "Safe online",
        scenes: [
          { caption: "These are private: our full name, home address, school, photos and passwords. We don't tell them to anyone online." },
          { caption: "In an online game, someone we don't know sends a message and asks where we live." },
          { caption: "We don't answer. We close the screen and tell a grown-up straight away." },
          { caption: "Online, we are kind too: we send nice messages and never make fun of anyone." }
        ] },
      { prompt: "Which can we say online, and which is private?",
        baskets: [{ label: "Can say" }, { label: "Private" }],
        items: [{ say: "my favourite colour" }, { say: "my favourite animal" }, { say: "a game I like" }, { say: "my home address" }, { say: "the name of my school" }, { say: "a password" }, { say: "a photo of me" }] },
      { prompt: "In a game, someone says: “Let's be friends. Send me your photo.” What do you do?", say: "In a game, someone says: Let's be friends. Send me your photo. What do you do?",
        options: ["🙋 I don't send a photo, and I show a grown-up straight away", "📷 I send my photo", "🤐 I send it but don't tell anyone"], answer: "🙋 I don't send a photo, and I show a grown-up straight away" },
      { prompt: "You want to install a new game or app. What do you do first?", say: "You want to install a new game or app. What do you do first?",
        options: ["👨‍👩‍👧 First I ask a grown-up", "⬇️ I install it myself", "🔑 I guess Mum's password"], answer: "👨‍👩‍👧 First I ask a grown-up" },
      { prompt: "In the class group, children have posted someone's photo and are making fun of them. What do you do?", say: "In the class group, children have posted someone's photo and are making fun of them. What do you do?",
        options: ["💛 I don't make fun, and I tell a grown-up", "😂 I send a laughing face too", "🔁 I send the photo on to others"], answer: "💛 I don't make fun, and I tell a grown-up" },
      { tips: [
        "List private information with your child: full name, address, school, phone number, photos and passwords. House rule: “I ask a grown-up first” before installing, buying or sending anything.",
        "Turn off chat in online games where possible, or limit it to known friends, and set up privacy settings and parental controls together.",
        "Bad people may pretend to be children, offer gifts or game points, and ask children to keep secrets or send photos. Tell your child that no good grown-up asks a child to keep a secret from their parents.",
        "If your child sees something upsetting or someone bothers them, stay calm, thank them for telling you, and don't take the device away as a punishment, or next time they won't tell. Keep the messages and report them.",
        "Use devices in shared family spaces, not in a closed room."
      ] }
    ] },
    "health-sapling-25": { title: "Safe or ask: outside", steps: [
      { prompt: "On the way: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "crossing on the footbridge with a grown-up" }, { say: "a bike in the park with a helmet" }, { say: "waiting on the pavement" }, { say: "fetching a ball from the middle of the road" }, { say: "getting into a stranger's car" }, { say: "taking a new way to school" }] },
      { prompt: "In the water: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "swimming in the pool while a lifeguard watches" }, { say: "floating on my back in a swimming lesson" }, { say: "swimming in a river" }, { say: "going into the sea" }, { say: "jumping into the water to help a friend" }] },
      { prompt: "In heat, cold and polluted air: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "drinking water on a hot day" }, { say: "wearing a coat on a cold day" }, { say: "playing at home when the air is polluted" }, { say: "playing outside at midday in summer" }, { say: "turning on the heater" }, { say: "running outside in dust" }] },
      { prompt: "Online: which is safe, and which do we ask a grown-up about?",
        baskets: [{ label: "It's safe" }, { label: "I ask a grown-up" }],
        items: [{ say: "a video call with Grandma, next to a grown-up" }, { say: "sending a kind message to my friend" }, { say: "installing a new game" }, { say: "sending a photo of myself" }, { say: "answering a message from a stranger" }, { say: "opening a strange link" }] },
      { tips: [
        "The rule of this unit is the same as always: “If you're not sure, stop and ask a grown-up.” On the way, near water, in bad weather and online.",
        "After the game, look again at a few of the cards with your child and ask why we should ask about them. Take their answers seriously.",
        "Play this game in real life too: before going to the park, the pool or on a trip, ask “What should we ask about first here?”",
        "When your child asks, praise them, even if the answer is “Yes, that's fine”. Asking should always be a good thing to do."
      ] }
    ] },
    "health-sapling-26": { title: "Hello, emergency?", steps: [
      { prompt: "Phoning for help",
        scenes: [
          { caption: "Three important numbers: 115 for an ambulance, for illness and injury; 125 for the fire service; 110 for the police." },
          { caption: "If Grandma feels very unwell and there is no other grown-up at home, we phone 115." },
          { caption: "Calmly and clearly we say: who I am, what has happened, and where we are." },
          { caption: "We don't hang up. We listen and do what they tell us." },
          { caption: "We practise with our grown-up: one plays the emergency service and one makes the call." }
        ] },
      { prompt: "On an emergency call, what do we say, in order?",
        items: [{ label: "Who I am" }, { label: "What has happened" }, { label: "Where we are: the address" }, { label: "I listen and don't hang up" }] },
      { prompt: "Match each trouble with its number",
        pairs: [[{ say: "someone is very ill or hurt" }, { label: "115", say: "one one five" }], [{ say: "fire" }, { label: "125", say: "one two five" }],
          [{ say: "a thief, or being lost" }, { label: "110", say: "one one oh" }]] },
      { text: "Practise a pretend call with your grown-up, without really dialling the number:", list: ["Your grown-up plays the emergency service.", "Say who you are, what has happened and where you are.", "Listen and don't hang up."] },
      { text: "Learn your home address and your mum's or dad's phone number by heart, and say them to your grown-up." },
      { tips: [
        "Numbers in Iran: ambulance 115, fire service 125, police 110, and the gas emergency 194. Stick them next to the phone or on the fridge.",
        "Teach your child to call only in a real emergency and that prank calls to these numbers are wrong; practise without dialling.",
        "Help your child know the full home address, a landmark near home, and their parents' phone numbers by heart.",
        "If the phone is locked, show your child how to make an emergency call from the lock screen.",
        "Tell your child to speak calmly on the phone, not hang up, and answer the questions; and, if told to, open the door for the rescuers."
      ] }
    ] },
    "health-sapling-27": { title: "Our family emergency bag", steps: [
      { prompt: "Our family plan",
        scenes: [
          { caption: "With our family, we get an emergency bag ready." },
          { caption: "In it we put: water, a torch, a whistle, a list of phone numbers, plasters and a little food." },
          { caption: "We choose a meeting place outside the house; for example, under the big tree in the park." },
          { caption: "We draw the plan on paper and tick off each thing when it's ready: the bag, the meeting place, the numbers." }
        ] },
      { prompt: "What goes in the emergency bag?",
        baskets: [{ label: "In the bag" }, { label: "Not needed" }],
        items: [{ say: "water" }, { say: "a torch" }, { say: "a list of phone numbers" }, { say: "plasters" }, { say: "a computer game" }, { say: "all my toys" }, { say: "a flower pot" }] },
      { text: "With your family, draw and write your home emergency plan on a sheet of paper: the meeting place outside the house, the numbers to call, and the things in the bag. Tick each thing when it's ready.",
        example: "Meeting place: under the big tree in the park.\nNumbers: 115, 125, 110, Mum's and Dad's numbers.\nIn the bag: water ✓ torch ✓ whistle ✓",
        check: ["Did they draw or write the meeting place?", "Did they write at least three numbers?", "Did they list the things in the bag and tick them?"],
        note: "Stick the plan by the door or on the fridge and go over it together every few months." },
      { text: "Walk to the meeting place with your family and practise once: everyone comes out of the house and waits there for the others." },
      { tips: [
        "A family plan has three parts: a meeting place (one near home and one further away), who calls whom (a contact outside the city helps too), and the emergency bag.",
        "Emergency bag: water, compact food, a torch and batteries, a whistle, a first-aid kit, the family's essential medicines, copies of documents, a little money, warm clothes and the list of numbers. Check the dates every few months.",
        "Let your child help pack the bag; something they have a part in scares them less and stays in their memory better.",
        "Link this with the school earthquake drill (in Azar) and explain the plan calmly: “Being ready means we know what to do.”"
      ] }
    ] },
    "health-sapling-28": { title: "Cuts, burns and stings", steps: [
      { prompt: "First aid for small injuries",
        scenes: [
          { caption: "A small cut: we press on it with a clean cloth for a few minutes." },
          { caption: "Then we wash the cut with clean water." },
          { caption: "And we put a plaster on it." },
          { caption: "A small burn: we hold it under cool running water for a long time. No ice, butter or toothpaste." },
          { caption: "A bee sting: the bee has gone. We put a cool cloth on the sting." },
          { caption: "If a cut or burn is big, or anything worries us, we call a grown-up straight away." }
        ] },
      { prompt: "A small cut: put the steps in order",
        items: [{ label: "Press with a clean cloth" }, { label: "Wash with clean water" }, { label: "A plaster" }] },
      { prompt: "Your hand touched a hot teapot and got a little burnt. What do you do?", say: "Your hand touched a hot teapot and got a little burnt. What do you do?",
        options: ["🚰 I hold it under cool running water for a long time and tell a grown-up", "🧊 I put ice on it", "🧈 I put butter or toothpaste on it"], answer: "🚰 I hold it under cool running water for a long time and tell a grown-up" },
      { prompt: "A bee stung your friend, and now their face is swollen and they find it hard to breathe. What do you do?", say: "A bee stung your friend, and now their face is swollen and they find it hard to breathe. What do you do?",
        options: ["📣 I call a grown-up straight away to phone 115", "🧻 I just put a cool cloth on it", "⏳ I wait for it to get better by itself"], answer: "📣 I call a grown-up straight away to phone 115" },
      { prompt: "Which one can we look after ourselves with first aid?", say: "Which one can we look after ourselves with first aid?",
        options: ["🩹 A small scrape or cut", "🩸 A big cut that won't stop bleeding", "🔥 A big burn"], answer: "🩹 A small scrape or cut" },
      { tips: [
        "Keep a first-aid box at home and in the car and show your child where it is: sterile gauze, plasters, bandages, gloves, scissors, wound-cleaning solution, and the emergency numbers.",
        "Cuts: press with a clean cloth or gauze for a few minutes, then wash with clean water and cover. If the bleeding doesn't stop, the cut is deep or large, or something is stuck in it, see a doctor or call 115.",
        "Burns: about 20 minutes under cool (not ice-cold) water, take off rings and bracelets, and cover with a clean non-stick dressing. No ice, butter, toothpaste, oil or egg. Large burns, burns on the face, hands, feet or genitals, or big blisters: a doctor or 115.",
        "Bee stings: if the sting is still in, scrape it out sideways with the edge of a card (don't squeeze), wash and cool. Swelling of the face or lips, difficulty breathing or feeling unwell: 115 straight away.",
        "Nosebleeds and bumps to the head are in the Sprout lesson “Small grazes and nosebleeds”. Whenever in doubt, ask a doctor or call 115."
      ] }
    ] },
    "health-sapling-29": { title: "The first-aid game", steps: [
      { prompt: "A small cut: put the steps in order", items: [{ label: "Press with a clean cloth" }, { label: "Wash with clean water" }, { label: "A plaster" }] },
      { prompt: "A small burn: put the steps in order", items: [{ label: "I tell a grown-up" }, { label: "A long time under cool water" }, { label: "Cover with a clean cloth" }] },
      { prompt: "Phoning the ambulance: put it in order", items: [{ label: "I dial 115" }, { label: "I say who I am" }, { label: "I say what has happened" }, { label: "I say where we are" }, { label: "I listen and don't hang up" }] },
      { prompt: "Match each trouble with its number",
        pairs: [[{ say: "someone is very ill" }, { label: "115", say: "one one five" }], [{ say: "fire" }, { label: "125", say: "one two five" }],
          [{ say: "a thief" }, { label: "110", say: "one one oh" }], [{ say: "a smell of gas" }, { label: "194", say: "one nine four" }]] },
      { prompt: "Match each trouble with its first aid",
        pairs: [[{ say: "a small burn" }, { label: "Cool water", say: "cool water" }], [{ say: "a small cut" }, { label: "Press with a clean cloth", say: "press with a clean cloth" }],
          [{ say: "a bee sting" }, { label: "A cool cloth", say: "a cool cloth" }], [{ say: "a nosebleed" }, { label: "Pinch the soft part of the nose", say: "pinch the soft part of the nose" }]] },
      { tips: [
        "After the game, open the home first-aid box with your child and name each thing. Let them put a plaster on a doll themselves.",
        "Stick the emergency numbers (115, 125, 110, 194) by the phone and go over them together now and then.",
        "Children of this age can do simple first aid, but should always tell a grown-up first. Tell them that staying calm and getting help is itself the biggest help.",
        "If you can, take a first-aid course yourself (for example with the Red Crescent)."
      ] }
    ] },
    // ---------------- For every garden ----------------
    "health-all-1": { title: "My body is mine", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "This is your body. Your body belongs to you." },
          { caption: "If you do not want a hug or a kiss, you can say kindly: “No, thank you.” You can shake hands or give a high five instead." },
          { caption: "The parts of your body that underwear covers are your private parts." },
          { caption: "Nobody should touch your private parts or ask to see them." },
          { caption: "Only when it is needed, Mum or Dad helps you in the bath." },
          { caption: "Or a doctor, when Mum or Dad is with you." },
          { caption: "If something makes you feel bad or confused, tell a grown-up you trust. They will help you." }
        ] },
      { prompt: "Where are the private parts of the body?",
        options: ["🩲 The parts that underwear covers", "👃 The nose", "🦶 The sole of the foot"], answer: "🩲 The parts that underwear covers" },
      { prompt: "If someone does something that makes you feel bad, what do you do?",
        options: ["🗣️ I tell a grown-up I trust", "🤐 I tell nobody", "⏳ I wait until I forget"],
        answer: "🗣️ I tell a grown-up I trust" },
      { text: "Say in a strong voice: “No! I don't like it.” Then go to your grown-up and tell them what happened. Practise together." },
      { text: "Your body is yours. Whenever something worries you, you can tell us.",
        tips: [
          "Watch this lesson with your child. Keep your voice calm and ordinary, as when you talk about brushing teeth. The aim is not to frighten; it is for your child to know they can tell you.",
          "The Underwear Rule: the parts that underwear covers are private. Nobody should touch them, look at them, or ask your child to touch their private parts. The only exceptions are washing, or a doctor's check-up with you present.",
          "Choose a correct word for the private parts of the body, without embarrassment, and always use that word. A child who has words for their body can tell you more easily what happened.",
          "If your child does not want to hug or kiss someone, do not force them. Suggest a handshake or a warm hello instead. This does not make them less respectful of their elders.",
          "Tell your child: “Whatever you tell me, I won't be upset with you.” If one day they tell you something, stay calm, listen, thank them, and tell them it is not their fault. Read the “Body safety” part of the parents' guide."
        ] }
    ] },
    "health-all-2": { title: "Earthquake drill", steps: [
      { prompt: "We practise together",
        cast: { one: "1. Drop", two: "2. Cover", three: "3. Hold on" },
        scenes: [
          { caption: "Sometimes the ground shakes. This is called an earthquake. Today we practise so we know what to do." },
          { caption: "One: we drop onto our knees." },
          { caption: "Two: we go under a strong table and cover our head and neck with our hands." },
          { caption: "Three: we hold on tight to the table leg until the shaking stops." },
          { caption: "If there is no table, we sit by a wall, away from windows, and cover our head and neck." },
          { caption: "When the shaking stops, we go outside calmly with the grown-ups. We take the stairs, not the lift." },
          { caption: "We practised well! Now we know what to do." }
        ] },
      { prompt: "Put the earthquake drill in order",
        items: [{ label: "Drop" }, { label: "Cover" }, { label: "Hold on" }] },
      { prompt: "When the ground shakes, where is it better to be?",
        options: ["┬─┬ Under a strong table", "🪟 Next to a window", "🚪 In the middle of the stairs"], answer: "┬─┬ Under a strong table" },
      { text: "Now practise with your family. One person says: “Earthquake drill!” and everyone does these three things:",
        list: ["Drop", "Cover", "Hold on"] },
      { tips: [
        "Iran has many earthquakes, and practising helps your child know what to do at the real moment. Do the drill like a calm game, in the daytime, with a smile, and repeat it every few months.",
        "If your child has lived through an earthquake or a war and this lesson upsets them, do not insist. Hug them, tell them they are safe now, and leave the drill for another time.",
        "At home, find safe places together: under a strong table, by an inside wall, away from windows and shelves. Fasten tall cupboards and shelves to the wall, and do not put anything heavy above a bed.",
        "If your child is in bed, they should stay there and cover their head with a pillow. Outside, they should stand away from buildings, walls, power poles and trees.",
        "Choose a meeting place outside the home for your family, and keep a bag ready: water, a torch, a first-aid kit, any medicines you need, a whistle and copies of your papers."
      ] }
    ] },
    "health-all-3": { title: "Numbers for help", steps: [
      { prompt: "See who helps us",
        scenes: [
          { caption: "When someone suddenly feels very ill or something happens, grown-ups phone for help." },
          { caption: "Ambulance: 115. For when someone is very ill.", say: "Ambulance: one one five. For when someone is very ill." },
          { caption: "Fire brigade: 125. For when something is on fire.", say: "Fire brigade: one two five. For when something is on fire." },
          { caption: "Police: 110. For when someone is in danger or is lost.", say: "Police: one one zero. For when someone is in danger or is lost." },
          { caption: "If no grown-up is near, you can phone too. Say calmly what has happened and where your home is. Do not hang up until they tell you to." },
          { caption: "These numbers are for real help, not for playing." }
        ] },
      { prompt: "Match each one with its number",
        pairs: [[{ say: "ambulance" }], [{ say: "fire brigade" }], [{ say: "police" }]] },
      { prompt: "Grandma has fallen and her leg hurts a lot. She cannot get up. Who do we phone?" },
      { prompt: "Smoke is coming out of the kitchen. What do you do first?",
        options: ["🏃 I go outside and tell the grown-ups", "🙈 I hide under the bed", "👀 I go to see what is happening"],
        answer: "🏃 I go outside and tell the grown-ups" },
      { text: "Practise with your grown-up and say your home address: the city, the neighbourhood, the street or alley, and the house number." },
      { tips: [
        "The numbers: ambulance 115, fire brigade 125, police 110. Calls to them are free. Write these numbers big on the fridge or next to the phone.",
        "Play “practice calls” with your child, with the phone switched off: “Hello, my name is … My grandma has fallen. Our home is in …” Repeat your home address until your child knows it by heart.",
        "Explain that phoning for a joke keeps the line busy for someone who really needs help.",
        "In a fire, everyone should get out of the house first and stay out; then phone. Nobody should go back for anything.",
        "Do this lesson calmly, without scary examples. If your child has seen an accident before, let them ask questions and tell them help is always close."
      ] }
    ] },
    "health-all-4": { title: "Don't touch, tell", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Sometimes we see something strange on the ground: a syringe, a battery, a firework that didn't go off, a piece of metal or a bag." },
          { caption: "If we see something we don't know, we don't touch it." },
          { caption: "We take a few steps back." },
          { caption: "And we tell a grown-up." },
          { caption: "The grown-up knows what to do. We stay away from it." },
          { caption: "In the alley it's the same: we don't touch, we step back and we tell." }
        ] },
      { prompt: "In the park, there is a syringe lying next to the bench. What do you do?", say: "In the park, there is a syringe lying next to the bench. What do you do?",
        options: ["✋ I don't touch it, I step back and I tell a grown-up", "🖐️ I pick it up and put it in the bin", "🦶 I push it with my foot"], answer: "✋ I don't touch it, I step back and I tell a grown-up" },
      { prompt: "In the alley you see a metal thing you don't know. What do you do?", say: "In the alley you see a metal thing you don't know. What do you do?",
        options: ["🚶 I step back and tell a grown-up", "🪨 I hit it with a stone", "🎒 I pick it up and take it home"], answer: "🚶 I step back and tell a grown-up" },
      { prompt: "Which ones do we not touch, and tell a grown-up about?",
        baskets: [{ label: "I don't touch it, I tell" }, { label: "It's mine, I play with it" }],
        items: [{ say: "a syringe on the ground" }, { say: "a battery on the ground" }, { say: "a firework that didn't go off" }, { say: "a strange piece of metal" }, { say: "a bag someone left behind" }, { say: "my own ball" }, { say: "my own doll" }] },
      { tips: [
        "The rule of this lesson is the same for every strange object: “Don't touch, step back, tell a grown-up.” Repeat it calmly, as an everyday rule, like washing hands.",
        "Syringes and needles: don't pick them up with your hands either. Move your child away and tell the municipality or the local health centre. If your child touched a needle, wash the spot with soap and water and see a doctor the same day.",
        "Fireworks and firecrackers that did not go off, especially after Chaharshanbe Suri, are dangerous. Children should not touch them and nobody should light them again. Young children should not pick up batteries or small magnets either.",
        "If you see an unknown metal object or a suspicious bag or package, don't touch it, keep others away and call the police on 110.",
        "Teach this lesson without talking about war and without frightening examples. If your child asks questions or is worried, answer briefly and calmly and say that grown-ups are taking care."
      ] }
    ] },
    "health-all-5": { title: "Our family plan", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "Our family has a plan. We talk about it together." },
          { caption: "Our ready bag is by the door: water, a torch and a first-aid box are in it." },
          { caption: "The numbers we need to phone are written on the fridge." },
          { caption: "The grown-up says “Now!”. We go out calmly and together. We don't run, and we don't look for things." },
          { caption: "Our meeting place is near our home: under this tree. We all meet here." }
        ] },
      { prompt: "Your grown-up says: “We need to go out now!” What do you do?", say: "Your grown-up says: We need to go out now! What do you do?",
        options: ["🚶 I go with them, calmly", "🧸 First I go and get my toy", "🙈 I hide under the bed"], answer: "🚶 I go with them, calmly" },
      { prompt: "Outside the home, where do we find each other?", say: "Outside the home, where do we find each other?",
        options: ["🌳 At our meeting place", "🏪 Wherever I like"], answer: "🌳 At our meeting place" },
      { text: "Practise the plan with your family:",
        list: ["Where is your meeting place near home? Go and see it together.", "Where is the ready bag? Touch it.", "Where are the numbers written? Show them.", "Someone says “Now!” and you all walk calmly together to the meeting place."] },
      { tips: [
        "Have a “family plan”: a meeting place near home (a tree, the school gate or a neighbour's house) and one further away, the numbers you need (parents, a relative in another city, 115, 125, 110) and who collects your child from school.",
        "A ready bag: water, dry food, a torch and batteries, a first-aid kit, the family's medicines, a whistle, warm clothes, copies of documents and a little money. Keep it by the door and check it every few months.",
        "Twice a year, on a calm day, practise the plan like a game. What matters is going “calmly and together”, not fast.",
        "Talk to your child calmly and simply, and don't show them frightening pictures or news. If your child is worried, tell them that having a plan means we all know what to do."
      ] }
    ] }
  });
})();

/* English words for the health practice generators (js/practice/health.js): B.EN["<id>"] = { title, words }, the
   same keys as the generator's words. */
(function () {
  var MOVES = {
    march: { name: "Marching on the spot", say: "Bring your knees up and swing your arms.", easier: "Walk slowly and bring your knees up a little." },
    arms: { name: "Arm circles", say: "Open your arms and move them up and down, big and slow." },
    hops: { name: "Small jumps", say: "On your toes, jump small and soft.", easier: "No jumping: rise up on your toes and come down." },
    frog: { name: "Frog jumps", say: "Crouch down, hands on the floor, then jump up and land softly.", easier: "Crouch down and stand up, without jumping.", harder: "More, and softer!" },
    bunny: { name: "Bunny hops", say: "Hands above your head like bunny ears, and jump small.", easier: "Jump slowly and very small." },
    stork: { name: "The stork", say: "Stand on one foot, arms out, and count to five. Then the other foot.", harder: "Count to ten!" },
    runstop: { name: "Run and stop!", say: "Run on the spot… and stop, like a statue! Again." },
    ball: { name: "Ball up", say: "Throw a soft ball gently up and catch it with both hands." },
    star: { name: "Star jumps", say: "With each jump, arms up and legs apart; then back together.", easier: "No jumping: one foot out to the side and arms up, then back.", harder: "Faster and more!" },
    run: { name: "Running on the spot", say: "Run on the spot and swing your arms.", easier: "March fast, without jumping." },
    hop1: { name: "Hopping", say: "Jump on one foot. Then on the other foot.", easier: "Stand on one foot and count to five. Then the other foot." },
    gallop: { name: "Galloping", say: "One foot in front, the other follows, with a little jump." },
    rope: { name: "Skipping", say: "Turn your arms as if you had a rope, and jump with both feet together.", easier: "Jump slowly and small." },
    throw: { name: "Throwing over the shoulder", say: "Take your arm back and up, and throw a soft ball at a target." },
    wall: { name: "Wall push-ups", say: "Hands on the wall, body straight. Bend your elbows and straighten them again.", easier: "Stand closer to the wall and bend only a little.", harder: "Fifteen times!" },
    squat: { name: "Squats", say: "Feet apart, arms in front. Go down as if sitting on a chair, and stand up.", easier: "Go down a little, only as far as is comfortable.", harder: "Fifteen times!" },
    plank: { name: "Plank on the knees", say: "On your knees and hands, your body straight like a line. Hold it and count.", easier: "Hold it for five.", harder: "Hold it for twenty." },
    tall: { name: "Stretching tall", say: "Reach your arms up, stretch tall and bring them down slowly." },
    fold: { name: "Bending forward", say: "Knees a little soft. Bend forward slowly and reach your hands towards your feet. Only as far as it doesn't hurt." },
    cat: { name: "The cat move", say: "On your hands and knees: round your back, then slowly dip it." },
    walk: { name: "Slow walking", say: "Walk slowly and calmly on the spot." },
    breath: { name: "Slow breaths", say: "Breathing in, open your arms; breathing out, bring them down slowly." }
  };

  Object.assign(B.EN, {
    "health-seed-p1": { title: "Moving every day", words: { prompt: "Today's moves: with your grown-up, away from the screen", moves: MOVES } },
    "health-seed-p2": { title: "Safe, or do I ask a grown-up?", words: {
      prompt: "Which is safe, and which do we ask a grown-up about?",
      baskets: { ok: "It's safe", ask: "I ask a grown-up" },
      t: { teddy: "a teddy bear", book: "a story book", puzzle: "a puzzle", blocks: "blocks", crayons: "crayons", apple: "an apple", water: "a glass of water", sand: "sand play with a bucket",
        tea: "hot tea", stove: "the stove", knife: "a knife", scissors: "big scissors", socket: "a socket", iron: "an iron", pills: "pills", bleach: "bleach",
        juice: "a coloured bottle that looks like juice", candy: "coloured pills that look like sweets", pool: "going to the pool", sea: "going to the sea", bucket: "a bucket full of water",
        dog: "a dog we don't know", cat: "a street cat", street: "crossing the road", car: "running near cars" } } },
    "health-seed-p3": { title: "Put it in order", words: {
      asks: { hands: "Put the handwashing steps in order", teeth: "Put the toothbrushing steps in order", toilet: "What do we do after the toilet? Put it in order",
        bath: "Put bath time in order", night: "Put the evening in order", food: "Before and after eating: put it in order" },
      t: { wet: "Wet", soap: "Soap", rub: "Rub", rinse: "Rinse", dry: "Dry", paste: "Toothpaste, the size of a pea", brush: "Brush the front and back of the teeth", spit: "Spit",
        flush: "We flush", wash: "We wash our hands with soap", towel: "We dry them", shower: "Get wet", shampoo: "Shampoo and soap", clean: "Dry off and clean clothes",
        dinner: "Dinner", teethN: "Brush teeth", story: "A story", sleep: "Sleep", washF: "Wash hands", eat: "Eat", teethF: "Brush teeth" } } },
    "health-seed-p4": { title: "Every day or sometimes?", words: {
      prompt: "Which do we eat and drink every day, and which only sometimes, a little?",
      baskets: { often: "Every day", sometimes: "Sometimes, a little" },
      t: { bread: "bread", apple: "an apple", cucumber: "cucumber", cheese: "cheese", water: "water", milk: "milk", rice: "rice", yoghurt: "yoghurt", carrot: "a carrot", egg: "an egg",
        lentils: "lentil soup", orange: "an orange", tomato: "a tomato", walnut: "walnuts", grapes: "grapes", dates: "dates",
        candy: "sweets", soda: "fizzy drink", cake: "cake", chips: "crisps", lolly: "jelly sweets", chocolate: "chocolate", icecream: "ice cream", juicebox: "packaged juice" } } },
    "health-seed-p5": { title: "My body", words: {
      prompt: "Match each one with what it does",
      t: { eye: "eye", ear: "ear", nose: "nose", mouth: "mouth", hand: "hand", foot: "foot", teeth: "teeth", tongue: "tongue" },
      r: { eye: "sees the rainbow", ear: "hears the bell", nose: "smells the flower", mouth: "talks and eats", hand: "catches the ball",
        foot: "walks and runs", teeth: "bite the apple", tongue: "tastes the ice cream" } } },

    "health-sprout-p1": { title: "Moving every day", words: { prompt: "Today's moves: warm up first, calm down last", moves: MOVES } },
    "health-sprout-p2": { title: "This week's game", words: {
      ask: "This week's game: “{game}”. Play it with your family or friends:",
      games: {
        haftsang: { name: "Seven stones", rules: ["🪨 Pile up seven flat stones.", "⚽ Make two teams. One team knocks the stones down with a soft ball.", "🏃 That team piles them up again, while the other team tries to hit their legs with the ball, never the head."] },
        lili: { name: "Hopscotch", rules: ["✏️ Draw the hopscotch squares on the ground with chalk.", "🪨 Throw a stone into the first square.", "🦶 Hop and move the stone forward square by square, without stepping on a line."] },
        gorgam: { name: "Wolf in the air", rules: ["🐺 One person is the wolf.", "🏃 Everyone else runs. Anyone standing somewhere high (a step or a ledge) can't be caught.", "🔁 Whoever the wolf catches is the next wolf."] },
        amoo: { name: "Uncle chain-maker", rules: ["🤝 Hold hands and make a long chain.", "🎵 Sing the Uncle chain-maker song together.", "🌀 With the song, the chain winds up and unwinds again."] },
        hide: { name: "Hide and seek", rules: ["🙈 One person closes their eyes and counts to twenty.", "🏠 The others hide somewhere safe: never in a wardrobe, fridge or car.", "🔎 They find everyone. The first one found counts next time."] },
        statue: { name: "Statues", rules: ["🎵 One person sings or claps and the others dance.", "🛑 When the music stops, everyone freezes like a statue.", "😄 Whoever moves sings next round."] },
        rope: { name: "Group skipping", rules: ["🪢 Two people slowly turn a long rope.", "🦘 Go in one by one and jump; count each jump.", "🔁 Whoever touches the rope swaps with a turner."] },
        ball: { name: "Piggy in the middle", rules: ["⚽ Two people stand at each end and the rest in the middle.", "🎯 They throw a soft ball at the legs of the children in the middle, never the head.", "🔁 Whoever is hit goes to the side and becomes a thrower."] }
      },
      include: "🤝 Remember: let everyone play, take turns, and at the end say: “Good game!”" } },
    "health-sprout-p3": { title: "Safe, or do I ask a grown-up?", words: {
      prompt: "At home and outside: which is safe, and which do we ask a grown-up about?",
      baskets: { ok: "It's safe", ask: "I ask a grown-up" },
      t: { book: "reading a book", draw: "drawing", blocks: "playing with blocks", fruit: "eating washed fruit", water: "drinking water", toothbrush: "brushing my teeth", tidy: "tidying away toys",
        pills: "pills in the cupboard", cleaner: "cleaning liquid", tea: "hot tea", knife: "a kitchen knife", socket: "a socket", window: "leaning out of an open window",
        balcony: "climbing the balcony railing", shelf: "climbing a shelf", gas: "a smell of gas", heater: "playing next to the heater", crosswalk: "crossing at the zebra with a grown-up",
        cars: "crossing behind parked cars", ball: "running after a ball into the road", belt: "fastening the seat belt in the car", backseat: "sitting in the back seat",
        front: "sitting in front, on a grown-up's lap", helmet: "riding a motorbike without a helmet" } } },
    "health-sprout-p4": { title: "Germs and care", words: {
      prompt: "Which stops germs, and which spreads them?",
      baskets: { stop: "Stops germs", spread: "Spreads germs" },
      asks: { sneeze: "A sneeze is coming! Put it in order", morning: "Put the morning in order", teeth: "Put toothbrushing in order", bath: "Put bath time in order" },
      t: { wash: "washing hands with soap", tissue: "sneezing into a tissue", elbow: "coughing into the elbow", bin: "putting the tissue in the bin", home: "staying home when ill",
        ownCup: "my own cup", nails: "short, clean nails", hands: "sneezing into the hand and shaking hands", air: "coughing without covering the mouth", shareCup: "drinking from other people's cups",
        noWash: "eating with unwashed hands", nose: "touching the nose and then food", school: "going to school with a fever",
        cover: "Tissue over mouth and nose", sneeze: "Sneeze", throw: "Tissue in the bin", washH: "Wash hands", toilet: "Toilet", face: "Wash hands and face",
        clothes: "Put on clean clothes", breakfast: "Breakfast", teeth: "Brush teeth", paste: "Toothpaste, the size of a pea", front: "Front of the teeth", back: "Back and top of the teeth",
        tongue: "Tongue", spit: "Spit", wet: "Get wet", shampoo: "Shampoo and soap", rub: "Rub", rinse: "Rinse", dry: "Dry off and clean clothes" } } },
    "health-sprout-p5": { title: "My plate", words: {
      prompt: "Put each food in its group",
      baskets: { grain: "Bread and rice", fruit: "Fruit and vegetables", protein: "Eggs, beans, meat", dairy: "Milk and dairy" },
      t: { rice: "rice", bread: "bread", lavash: "lavash bread", potato: "potato", pear: "a pear", lettuce: "lettuce", carrot: "a carrot", orange: "an orange", cucumber: "cucumber",
        fish: "fish", lentils: "lentil soup", egg: "an egg", chicken: "chicken", beans: "beans", cheese: "cheese", milk: "milk", yoghurt: "yoghurt" },
      q: { lunch1: "Lunch plate: 🍚 rice and 🍗 chicken. What shall we add to make it complete?", lunch2: "Lunch plate: 🍲 bean stew and 🥗 salad. What shall we add?",
        breakfast1: "Breakfast: 🫓 bread and 🧀 cheese. What shall we add?", dinner1: "Dinner: 🍳 an egg and 🥖 bread. What shall we add?",
        snack1: "A snack for break time. Which is better?", snack2: "In the afternoon, after playing, you're hungry. Which snack is better?",
        drink1: "You're thirsty. What is better to drink?", breakfast2: "You're late this morning. What do you do about breakfast?" },
      o: { lunch1: ["🥗 salad and a bowl of yoghurt", "🍬 sweets", "🥤 a fizzy drink"], lunch2: ["🍚 rice or 🥖 bread", "🍰 cake", "🍟 crisps"],
        breakfast1: ["🥒 cucumber and 🌰 walnuts", "🍫 chocolate", "🥤 a fizzy drink"], dinner1: ["🍅 tomato and 🥒 cucumber", "🍭 jelly sweets", "🍦 ice cream"],
        snack1: ["🍎 an apple and a few walnuts", "🍬 a handful of sweets", "🍟 a packet of crisps"], snack2: ["🥪 bread and cheese", "🍫 chocolate", "🥤 a fizzy drink"],
        drink1: ["💧 water", "🥤 a fizzy drink", "🧃 packaged juice"], breakfast2: ["🥛 a glass of milk and a bread-and-cheese bite, quick and simple", "🚫 I go without breakfast", "🍬 I eat a sweet"] } } },
    "health-sprout-p6": { title: "Private or OK to say?", words: {
      prompt: "Which can we say online, and which do we ask a grown-up about?",
      baskets: { ok: "OK to say", ask: "I ask a grown-up" },
      t: { colour: "my favourite colour", animal: "my favourite animal", game: "a game I like", food: "my favourite food", sport: "a sport I like", book: "a book I read",
        address: "my home address", photo: "a photo of me", school: "the name of my school", phone: "a phone number", fullname: "my full name", password: "a password" } } },

    "health-sapling-p1": { title: "A ten-minute workout every day", words: { prompt: "Today's workout: warm-up, heart, strength or balance, stretching, calming down", moves: MOVES } },
    "health-sapling-p2": { title: "What do you do?", words: {
      q: { medicine: "💊 Your friend offers you a coloured pill and says: “It tastes like a sweet!” What do you do?",
        fever: "🤒 You have a fever and a headache. What do you do?",
        allergy: "🥜 Your friend is allergic to peanuts and you have a peanut snack. What do you do?",
        tease: "😢 One of the children says nasty things to you every day. What do you do?",
        bystander: "👀 You see some children leaving a child out and making fun of them. What do you do?",
        smoke: "💨 There's a smell of smoke at home and smoke under the ceiling. What do you do?",
        matches: "🔥 You found a box of matches under the sofa. What do you do?",
        teapot: "🫖 The kettle is boiling on the stove. What do you do?",
        stranger: "🎮 In an online game, someone you don't know asks where you live. What do you do?",
        photo: "📷 In a game, someone says: “Send me your photo and don't tell anyone.” What do you do?",
        app: "⬇️ You want to install a new game. What do you do first?",
        hot: "☀️ It's a very hot day and you want to play outside. What do you do?" },
      o: { medicine: ["🙅 I don't take it and I tell a grown-up; only grown-ups give medicine", "😋 I take it, it tastes like a sweet", "🤐 I hide it for later"],
        fever: ["🗣️ I tell a grown-up, rest and drink water", "🏃 I go out and run", "💊 I take pills from the cupboard myself"],
        allergy: ["🙅 I don't give them my snack", "🎁 I offer it to them", "🤫 I secretly put it in their food"],
        tease: ["🛑 I say firmly “Stop it!”, walk away and tell a grown-up", "🤐 I don't tell anyone", "😔 I think it's my fault"],
        bystander: ["🤝 I stand next to them, we walk away together and tell a grown-up", "😂 I laugh too", "👊 I fight them"],
        smoke: ["🧎 Low down, under the smoke, I go out of the house and tell a grown-up", "🛏️ I hide under the bed", "🧸 First I pick up my toys"],
        matches: ["🙋 I don't touch them and I tell a grown-up", "🔥 I light one to see what happens", "🎒 I put them in my bag"],
        teapot: ["↩️ I stand a big step away and don't touch it", "🤲 I pick it up myself", "👀 I go close and watch the steam"],
        stranger: ["🙅 I don't answer, I close the screen and tell a grown-up", "🏠 I type my address", "🤫 I answer but don't tell anyone"],
        photo: ["🙋 I don't send a photo and I show a grown-up straight away", "📷 I send my photo", "🤐 I send it and keep it a secret"],
        app: ["👨‍👩‍👧 First I ask a grown-up", "⬇️ I install it myself", "🔑 I guess the grown-ups' password"],
        hot: ["🧢 A hat, a water bottle, and playing in the shade, early or in the evening", "☀️ I run in the midday sun", "🚗 I wait in a closed car"] } } },
    "health-sapling-p3": { title: "First aid in order", words: {
      asks: { call: "Phoning the ambulance: put it in order", nosebleed: "A nosebleed: put it in order", cut: "A small cut: put it in order", burn: "A small burn: put it in order",
        sting: "A bee sting: put it in order" },
      t: { dial: "I dial 115", who: "I say who I am", what: "I say what has happened", where: "I say where we are", listen: "I listen and don't hang up",
        sit: "I sit down", lean: "I lean forward a little", pinch: "I pinch the soft part of my nose", count: "I count to ten", tell: "I tell a grown-up",
        press: "Press with a clean cloth", wash: "Wash with clean water", plaster: "A plaster", cool: "A long time under cool water", cover: "Cover with a clean cloth",
        away: "I move away from the bee", washS: "We wash the sting", cloth: "I put a cool cloth on it" } } },
    "health-sapling-p4": { title: "A good day of food", words: {
      prompt: "Which drink has little sugar, and which has a lot?",
      baskets: { little: "Little or no sugar", lots: "A lot of sugar" },
      t: { water: "water", milk: "milk", tea: "tea without sugar", doogh: "doogh", fruit: "an apple instead of juice", soda: "a fizzy drink", juicebox: "packaged juice", chocmilk: "chocolate milk",
        sharbat: "sharbat syrup drink", energy: "an energy drink" },
      q: { breakfast: "Today's breakfast: 🍞 bread and 🧀 cheese. What shall we add for a good start to the day?", lunch: "Today's lunch: 🍚 rice and 🍲 stew. What shall we add?",
        dinner: "Today's light dinner: 🥣 ash soup. What shall we add?", snack: "Which afternoon snack is better?",
        drink: "What is better to drink with lunch?", label: "A drink has a red “high sugar” label. What does it mean?" },
      o: { breakfast: ["🥒 cucumber, 🌰 walnuts and a glass of milk", "🍰 cake and a fizzy drink", "🚫 nothing, we stay hungry"], lunch: ["🥗 salad and yoghurt", "🍟 crisps", "🍫 chocolate"],
        dinner: ["🍞 bread and 🥬 herbs", "🍬 sweets", "🥤 a fizzy drink"], snack: ["🍊 an orange or 🥪 bread and cheese", "🍭 jelly sweets", "🍟 a packet of crisps"],
        drink: ["💧 water or lightly salted doogh", "🥤 a fizzy drink", "🧃 packaged juice"], label: ["🔴 only sometimes, a little", "✅ lots, every day", "🎁 as a prize"] } } },
    "health-sapling-p5": { title: "Private or OK to say?", words: {
      prompt: "Which can we say online, and which is private?",
      baskets: { ok: "OK to say", private: "Private" },
      t: { colour: "my favourite colour", animal: "my favourite animal", game: "a game I like", book: "a book I like", sport: "my favourite sport", kind: "a kind message",
        address: "my home address", school: "the name of my school", password: "a password", photo: "a photo of me", phone: "a phone number", fullname: "my full name",
        where: "where I am right now", birthday: "my full date of birth" } } },
    "health-sapling-p6": { title: "Safe outside", words: {
      prompt: "Outside: which is safe, and which do we ask a grown-up about?",
      baskets: { ok: "It's safe", ask: "I ask a grown-up" },
      t: { bridge: "crossing the footbridge with a grown-up", helmet: "a bike in the park with a helmet", wait: "waiting on the pavement", belt: "fastening the seat belt in the school bus",
        green: "crossing at the zebra on a green light with a grown-up", ball: "fetching a ball from the middle of the road", stranger: "getting into a stranger's car", newway: "taking a new way to school",
        roadbike: "cycling on a busy road", rail: "climbing over the railing in the middle of the road",
        pool: "swimming in the pool while a lifeguard watches", float: "floating in a swimming lesson", river: "swimming in a river", dam: "swimming behind a dam", jump: "jumping into the water to help a friend",
        water: "drinking water on a hot day", coat: "wearing a coat on a cold day", indoor: "playing at home when the air is polluted",
        noon: "playing outside at midday in summer", dust: "running outside in dust", heater: "turning on the heater" } } }
  });
})();

/* English for the every-lesson generators (js/practice/health.js, B.healthEveryLesson): the same tables, same shape. */
B.healthEveryLessonEn = function (garden, num, data) {
  B.EN["health-" + garden + "-p" + num] = { title: "What do you do?", words: { data: data } };
  B.EN["health-" + garden + "-p" + (num + 1)] = { title: "True or not?", words: { data: data, ask: "“{s}” Is it true or not?", say: "Is it true or not?", yes: "✅ True", no: "❌ Not true" } };
  B.EN["health-" + garden + "-p" + (num + 2)] = { title: "Right thing, wrong thing", words: { data: data, prompt: "Which is the right thing to do, and which is wrong?", good: "Right thing", bad: "Wrong thing" } };
};

B.healthEveryLessonEn("seed", 6, {
  "health-seed-1": {
    sc: [["🍲 It's lunchtime. What do you do first?", "🧼 I wash my hands with soap and water", "🍲 I eat with unwashed hands", "🧸 I go and play"],
      ["🐕 You played with a dog. What do you do now?", "🧼 I wash my hands", "🍪 I eat a biscuit", "👃 I touch my nose"]],
    tf: [["We wash our hands with soap and water.", 1], ["We don't need to wash our hands before eating.", 0], ["We wash our hands after the toilet.", 1]],
    dd: [["🧼", "soaping your hands", 1], ["🫧", "rubbing between your fingers", 1], ["🍪", "eating with dirty hands", 0], ["🚰", "washing with just a little water, no soap", 0]] },
  "health-seed-2": {
    sc: [["🌙 It's night and you want to sleep. What do you do first?", "🪥 I brush my teeth", "🍬 I eat a sweet", "😴 I sleep without brushing"],
      ["🪥 How much toothpaste goes on the brush?", "🫛 The size of a pea", "🐍 All along the brush", "🚫 None"]],
    tf: [["We brush our teeth morning and night.", 1], ["We swallow the toothpaste.", 0], ["We brush the front and back of our teeth.", 1]],
    dd: [["🪥", "brushing in the morning", 1], ["🌙", "brushing at night", 1], ["🍬", "eating a sweet before bed", 0], ["😝", "swallowing toothpaste", 0]] },
  "health-seed-5": {
    sc: [["🚽 You've finished on the toilet. What do you do next?", "🧼 I flush and wash my hands", "🏃 I run off to play", "🙈 Nothing"],
      ["🛁 It's bath time. Who do you go with?", "👩 With a grown-up", "🧸 Alone, with my doll", "🚫 I don't have a bath"]],
    tf: [["We flush after using the toilet.", 1], ["We stay alone in the bath with no grown-up.", 0], ["After a bath, we put on clean clothes.", 1]],
    dd: [["🚽", "flushing the toilet", 1], ["👕", "clean clothes after the bath", 1], ["🏃", "leaving the toilet without washing our hands", 0], ["🛁", "staying alone in the bath", 0]] },
  "health-seed-6": {
    sc: [["🍎 You want to eat an apple. What do we do first?", "💧 We wash the apple", "🍎 We eat it as it is", "🧹 We put it on the floor"],
      ["😁 You've just woken up. Which is a morning job?", "🪥 Brushing teeth and washing hands and face", "🍬 Eating a sweet", "😴 Going back to sleep"]],
    tf: [["Clean hands mean fewer germs.", 1], ["We give our toothbrush to a friend.", 0], ["Everyone has their own toothbrush.", 1]],
    dd: [["🧼", "washing hands before eating", 1], ["🪥", "brushing with my own toothbrush", 1], ["👫", "one toothbrush for two people", 0], ["🍪", "eating food that fell on the floor", 0]] },
  "health-seed-3": {
    sc: [["🔔 What do you hear the bell with?", "👂 Ears", "👁️ Eyes", "👃 Nose"],
      ["🌹 What do you smell the flower with?", "👃 Nose", "✋ Hand", "👂 Ear"]],
    tf: [["We see with our eyes.", 1], ["We taste with our ears.", 0], ["We taste with our tongue.", 1]],
    dd: [["🙌", "washing hands and face", 1], ["😴", "enough sleep for the body", 1], ["✏️", "putting a pencil in your ear", 0], ["🫘", "putting something small in your nose", 0]] },
  "health-seed-7": {
    sc: [["🐸 How does a frog move?", "🐸 It crouches down and jumps up high", "🐢 It walks slowly", "🐍 It slides along the ground"],
      ["🦩 How does a stork stand?", "🦩 On one leg", "🐻 On hands and feet", "🐸 Crouched down low"]],
    tf: [["A bear walks on its hands and feet.", 1], ["A rabbit walks slowly without jumping.", 0], ["Moving makes the body strong.", 1]],
    dd: [["🏃", "playing and moving every day", 1], ["🧸", "an empty, soft space to jump in", 1], ["🛋️", "jumping on the sofa and the table", 0], ["🪑", "climbing a high chair", 0]] },
  "health-seed-8": {
    sc: [["🛑 In “Run and stop!”, the grown-up says “Stop!” What do you do?", "🗿 I freeze like a statue", "🏃 I keep running", "🦘 I jump"],
      ["🏃 Where is it better to run?", "🌳 In the park or the yard, an open space", "🚗 In the street", "🔪 In the kitchen"]],
    tf: [["Running in an open space is safer.", 1], ["When we hear “Stop!” we run faster.", 0], ["After running, we breathe fast.", 1]],
    dd: [["🌳", "running in the park", 1], ["🗿", "freezing like a statue at “Stop!”", 1], ["🚗", "running in the street", 0], ["🪜", "running on the stairs", 0]] },
  "health-seed-9": {
    sc: [["⚽ What shall we play ball with?", "🧦 A soft ball", "🪨 A stone", "🍶 A glass bottle"],
      ["⚽ Where do you throw the ball?", "🙌 Gently, to my friend's hands", "🙂 At my friend's face", "💥 Hard, at their head"]],
    tf: [["We throw the ball gently to our friend's hands.", 1], ["We throw a heavy ball at someone's head.", 0], ["To catch a ball, we open our hands.", 1]],
    dd: [["🧦", "playing with a soft sock ball", 1], ["🙌", "catching with both hands", 1], ["🪟", "playing ball next to a window", 0], ["🎯", "throwing the ball at a face", 0]] },
  "health-seed-10": {
    sc: [["🌅 How do we finish our exercises?", "😮‍💨 With a few slow breaths", "🏃 With the fastest run", "📺 With the TV"],
      ["🙆 What do we do at the start?", "🚶 We move gently and warm up", "🤸 The biggest jump", "😴 We go to sleep"]],
    tf: [["We finish our exercises with slow breaths.", 1], ["Exercise is only on a screen.", 0], ["A little exercise every day is good.", 1]],
    dd: [["🙆", "stretching", 1], ["😮‍💨", "slow breathing", 1], ["😖", "carrying on when something hurts", 0], ["🛋️", "exercising on a high sofa", 0]] },
  "health-seed-22": {
    sc: [["🐢 The grown-up says “Like a tortoise!” How do you move?", "🐢 Slowly, slowly", "🐇 Fast, fast", "🗿 I don't move at all"],
      ["🎈 What does “Really high!” mean?", "🙌 Arms up and on tiptoe", "🐛 We lie down on the floor", "🦆 We crouch down low"]],
    tf: [["A tortoise walks slowly.", 1], ["“Low” means standing on tiptoe.", 0], ["A rabbit jumps fast.", 1]],
    dd: [["🐢", "moving slowly when they say “slowly”", 1], ["🙌", "going on tiptoe when they say “high”", 1], ["🛋️", "climbing the sofa", 0], ["💥", "pushing others in the game", 0]] },
  "health-seed-23": {
    sc: [["🥁 The drum gets slow. How do you move?", "🐢 Slowly", "🐇 Faster", "🗿 Not at all"],
      ["🥁 The drum stops. What do you do?", "🗿 I stop", "🏃 I run", "🦘 I jump"]],
    tf: [["With a fast beat, we move fast.", 1], ["When the beat stops, we run.", 0], ["With a slow beat, we move slowly.", 1]],
    dd: [["👏", "clapping to the beat", 1], ["🦶", "stamping to the beat", 1], ["🔊", "shouting in someone's ear", 0], ["💥", "running fast in a crowded room", 0]] },
  "health-seed-4": {
    sc: [["🥤 You're thirsty after playing. What do you drink?", "💧 Water", "🥤 A fizzy drink", "🍬 A sweet"],
      ["🍎 What shall we have for a snack?", "🍎 A piece of fruit", "🍫 Lots of chocolate", "🍟 Crisps"]],
    tf: [["Water is the best drink.", 1], ["We drink lots of fizzy drinks every day.", 0], ["Fruit is a good snack.", 1]],
    dd: [["💧", "drinking water", 1], ["🍎", "fruit for a snack", 1], ["🥤", "a fizzy drink every day", 0], ["🍬", "lots of sweets", 0]] },
  "health-seed-11": {
    sc: [["🌈 Which plate is more colourful?", "🥗 Tomato, cucumber, carrot and bread", "🍞 Just bread", "🍬 Just sweets"],
      ["🥕 What colour is a carrot?", "🟠 Orange", "🔵 Blue", "⚫ Black"]],
    tf: [["Fruit and vegetables come in many colours.", 1], ["A carrot is blue.", 0], ["Every day we eat fruit and vegetables of several colours.", 1]],
    dd: [["🍅", "eating a red tomato", 1], ["🥒", "eating a green cucumber", 1], ["🍭", "eating lots of coloured jelly sweets", 0], ["🥤", "drinking a coloured fizzy drink", 0]] },
  "health-seed-12": {
    sc: [["🌙 It's bedtime. What do you do?", "😴 Brush teeth, toilet, a story and sleep", "📺 Cartoons until late", "🍫 I eat chocolate"],
      ["🛏️ What do we do with screens before bed?", "📴 We turn them off", "📱 We take them to bed", "🔊 We turn the sound up"]],
    tf: [["Enough sleep makes the body strong.", 1], ["Before bed we watch fast cartoons.", 0], ["We go to sleep at the same time every night.", 1]],
    dd: [["📖", "a story before bed", 1], ["🪥", "brushing at night", 1], ["📱", "a tablet in bed", 0], ["🍬", "a sweet before bed", 0]] },
  "health-seed-13": {
    sc: [["🤒 Your head hurts. What do you do?", "🗣️ I tell a grown-up", "🤐 I don't tell anyone", "💊 I take a pill myself"],
      ["💊 Who gives us medicine?", "👩 Only a grown-up", "🧒 Me", "👫 My friend"]],
    tf: [["Only a grown-up gives us medicine.", 1], ["When we're ill, we don't tell anyone.", 0], ["When we're ill, we rest.", 1]],
    dd: [["🗣️", "telling a grown-up", 1], ["🛌", "resting", 1], ["💊", "taking pills from the cupboard", 0], ["🤐", "hiding that something hurts", 0]] },
  "health-seed-14": {
    sc: [["☕ There's hot tea on the table. What do you do?", "↩️ I stand away and don't touch it", "✋ I pick it up", "👅 I taste it"],
      ["🔪 There's a knife on the table. What do you do?", "🙋 I don't touch it and I tell a grown-up", "🤲 I play with it", "🏃 I pick it up and run"]],
    tf: [["The stove and hot tea can burn.", 1], ["We play with knives.", 0], ["We stand away from hot things.", 1]],
    dd: [["↩️", "standing away from the stove", 1], ["🙋", "telling a grown-up about something sharp", 1], ["🔌", "touching a socket", 0], ["✂️", "playing with big scissors", 0]] },
  "health-seed-15": {
    sc: [["🍹 You found a coloured bottle that looks like juice. What do you do?", "🙋 I don't drink it and I tell a grown-up", "😋 I drink it", "👃 I smell and taste it"],
      ["🍬 There are coloured pills that look like sweets on the table. What do you do?", "🙋 I don't touch them and I tell a grown-up", "😋 I eat one", "🎁 I give them to my friend"]],
    tf: [["Not everything that looks like food is food.", 1], ["Coloured pills are sweets.", 0], ["Before eating something new, we ask a grown-up.", 1]],
    dd: [["🙋", "asking before eating", 1], ["🍎", "eating food a grown-up gave us", 1], ["🧴", "drinking from a bottle of cleaning liquid", 0], ["💊", "eating coloured pills", 0]] },
  "health-seed-16": {
    sc: [["🤔 You're not sure if something is safe. What do you do?", "🙋 I stop and ask a grown-up", "🤲 I try it", "🙈 I hide it"],
      ["🧩 Is a puzzle safe, or do we ask?", "👍 It's safe", "🙋 We ask", "🚫 It's dangerous"]],
    tf: [["If we're not sure, we ask a grown-up.", 1], ["Pills are toys.", 0], ["A story book is safe to play with.", 1]],
    dd: [["🙋", "asking a grown-up", 1], ["🧸", "playing with a doll", 1], ["🔌", "playing with an electric cable", 0], ["💊", "opening a medicine box", 0]] },
  "health-seed-17": {
    sc: [["💦 You want to play by the courtyard pool. Who should be there?", "👵 A grown-up watching you", "🧸 Nobody", "🐈 The cat"],
      ["🌊 The grown-up left the water's edge. What do you do?", "↩️ I move away from the water and wait", "💦 I play on my own", "🏊 I go into the water"]],
    tf: [["Water play only while a grown-up watches us.", 1], ["We play alone by the sea.", 0], ["A bucket full of water is dangerous too.", 1]],
    dd: [["👵", "water play next to a grown-up", 1], ["🤝", "holding a grown-up's hand by the sea", 1], ["🪣", "playing alone with a full bucket", 0], ["🌊", "going into the water alone", 0]] },
  "health-seed-18": {
    sc: [["🐕 A dog you don't know comes up. What do you do?", "🗿 I stand still and call a grown-up", "🏃 I scream and run", "✋ I stroke it"],
      ["🐈 You want to stroke your friend's cat. What do you do first?", "🙋 I ask the owner", "✋ I pull its tail", "🏃 I run up to it"]],
    tf: [["Before stroking an animal, we ask its owner.", 1], ["We pull a cat's tail.", 0], ["After playing with an animal, we wash our hands.", 1]],
    dd: [["🙋", "asking the animal's owner", 1], ["🧼", "washing hands after stroking", 1], ["🐕", "touching a strange dog", 0], ["🦴", "taking food from an animal's mouth", 0]] },
  "health-seed-19": {
    sc: [["🚸 You want to cross the road. What do you do?", "🤝 I hold a grown-up's hand", "🏃 I run ahead fast", "⚽ I run after my ball"],
      ["🚗 Where do you stand by the road?", "🤝 On the pavement, holding a grown-up's hand", "🚧 At the edge of the road", "🚙 Behind a parked car"]],
    tf: [["In the street we hold a grown-up's hand.", 1], ["We cross the road alone.", 0], ["Before crossing, we stop and look.", 1]],
    dd: [["🤝", "holding a grown-up's hand", 1], ["👀", "stopping and looking", 1], ["⚽", "running after a ball in the street", 0], ["🏃", "running ahead alone", 0]] },
  "health-seed-20": {
    sc: [["🛒 You lost your grown-up in a shop. What do you do?", "🧍 I stay where I am and ask a shopkeeper for help", "🚪 I go outside alone", "🚗 I go with a stranger"],
      ["🎁 A stranger says: “Come, I've got a treat for you.” What do you do?", "🙅 I don't go, and I tell my grown-up", "😋 I go", "🤫 I go and don't tell anyone"]],
    tf: [["If we're lost, we stay where we are.", 1], ["We go with anyone who gives us a treat.", 0], ["We know our kind grown-ups.", 1]],
    dd: [["🧍", "staying where we are when lost", 1], ["🏪", "asking a shopkeeper for help", 1], ["🚗", "getting into a stranger's car", 0], ["🎁", "going with a stranger for a treat", 0]] },
  "health-seed-21": {
    sc: [["📺 The cartoon has finished. What do you do now?", "⚽ We turn it off and play", "📺 Another one, and another", "😠 I cry"],
      ["📱 Who do you watch cartoons with?", "👩 With a grown-up", "🧒 Alone in my room", "🌙 At night in bed"]],
    tf: [["A little screen, lots of play.", 1], ["We watch cartoons all day.", 0], ["We turn screens off at mealtimes.", 1]],
    dd: [["⚽", "playing outside", 1], ["📖", "reading with a grown-up", 1], ["📱", "a tablet at the table", 0], ["🌙", "cartoons in bed", 0]] }
});

B.healthEveryLessonEn("sprout", 7, {
  "health-sprout-1": {
    sc: [["🤧 You're about to sneeze and you have no tissue. What do you do?", "💪 I sneeze into my elbow", "🤲 I sneeze into my hand", "👫 I sneeze towards my friend"],
      ["🤒 You have a fever. Tomorrow is a school day. What do we do?", "🛌 I stay at home and rest", "🏫 I go to school with a fever", "⚽ I go and play football"]],
    tf: [["We sneeze into a tissue or our elbow.", 1], ["After sneezing, we keep the tissue in our pocket.", 0], ["When we're ill, we stay at home.", 1]],
    dd: [["🧻", "sneezing into a tissue", 1], ["🗑️", "putting the tissue in the bin", 1], ["🤲", "coughing into your hand, then shaking hands", 0], ["🏫", "going to school with a fever", 0]] },
  "health-sprout-5": {
    sc: [["🪥 How long do we brush our teeth for?", "⏱️ Two minutes", "⚡ Two seconds", "🚫 Not at all"],
      ["💅 Your nails are long and dirty. What do you do?", "✂️ I ask a grown-up to cut them", "😬 I bite them", "🙈 I leave them"]],
    tf: [["After a bath we put on clean clothes.", 1], ["Long, dirty nails have no germs.", 0], ["We brush for two minutes.", 1]],
    dd: [["🛁", "having a bath", 1], ["✂️", "short nails", 1], ["👕", "putting dirty clothes back on", 0], ["😬", "biting your nails", 0]] },
  "health-sprout-6": {
    sc: [["💉 You're having a vaccine today. What do you do?", "🤝 I hold a grown-up's hand and breathe slowly", "🏃 I run away", "😱 I scream and wriggle"],
      ["🦷 The dentist wants to look at your teeth. What do you do?", "😮 I keep my mouth open", "🤐 I close my mouth", "🙈 I hide"]],
    tf: [["A vaccine helps the body not to get ill.", 1], ["At a check-up we don't ask questions.", 0], ["The doctor checks our eyes with a chart.", 1]],
    dd: [["🙋", "asking the doctor a question", 1], ["😮‍💨", "breathing slowly during a vaccine", 1], ["🏃", "running away from a check-up", 0], ["🤥", "hiding a toothache", 0]] },
  "health-sprout-7": {
    sc: [["🍪 Your friend wants to drink from your cup. What do you do?", "🥛 I give them another cup", "🥤 I give them my cup", "😠 I start a fight"],
      ["🦠 How do germs spread easily?", "🤧 Sneezing without covering your mouth", "🧼 Washed hands", "🧻 A tissue in the bin"]],
    tf: [["Washing hands stops germs spreading.", 1], ["We can see germs with our eyes.", 0], ["Everyone has their own cup.", 1]],
    dd: [["🧼", "washing hands with soap", 1], ["🥛", "drinking from my own cup", 1], ["🥤", "drinking from other people's cups", 0], ["👃", "touching your nose and then food", 0]] },
  "health-sprout-8": {
    sc: [["🍽️ Your plate has rice and chicken. What shall we add?", "🥗 Salad and yoghurt", "🍬 Sweets", "🥤 A fizzy drink"],
      ["🧀 Which group is cheese in?", "🥛 Milk and dairy", "🍞 Bread and rice", "🍎 Fruit and vegetables"]],
    tf: [["A good plate has several food groups.", 1], ["Lentils and beans are in the fruit group.", 0], ["Bread and rice give us energy.", 1]],
    dd: [["🥗", "vegetables with your meal", 1], ["🍲", "eating lentils and beans", 1], ["🍟", "only crisps for lunch", 0], ["🍰", "only cake for dinner", 0]] },
  "health-sprout-9": {
    sc: [["🌅 It's morning and you're going to school. What do you do?", "🍞 I have breakfast", "🚫 I go without breakfast", "🍬 I just eat a sweet"],
      ["🎒 What snack shall we take for break time?", "🍎 Fruit or bread and cheese", "🍟 Crisps", "🥤 A fizzy drink"]],
    tf: [["Breakfast gives us energy.", 1], ["We don't drink any water during the day.", 0], ["Walnuts and fruit are a good snack.", 1]],
    dd: [["🍞", "eating breakfast", 1], ["💧", "drinking water during the day", 1], ["🍫", "chocolate instead of breakfast", 0], ["🥤", "a fizzy drink when thirsty", 0]] },
  "health-sprout-10": {
    sc: [["🍽️ You're laying the table. Which meal is more complete?", "🍚 Rice, stew, herbs and yoghurt", "🍟 Just crisps", "🍰 Just cake"],
      ["🥛 Which group is a glass of milk in?", "🥛 Milk and dairy", "🍞 Bread and rice", "🥚 Eggs and meat"]],
    tf: [["Fresh herbs are in the fruit and vegetables group.", 1], ["Yoghurt is in the bread group.", 0], ["It's good to eat from several groups at a meal.", 1]],
    dd: [["🥗", "herbs on the table", 1], ["🥛", "a bowl of yoghurt", 1], ["🥤", "a fizzy drink with the meal", 0], ["🍬", "sweets instead of food", 0]] },
  "health-sprout-11": {
    sc: [["🦶 What does hopping mean?", "🦶 Jumping on one foot", "🛌 Lying down", "🚶 Walking slowly"],
      ["🪢 Where is best for skipping?", "🌳 Flat ground, with shoes, in an open space", "🪟 By the window", "🍽️ On the table"]],
    tf: [["We practise hopping on both feet.", 1], ["We skip next to a glass table.", 0], ["Galloping means one foot in front and the other follows.", 1]],
    dd: [["🦶", "hopping on both feet", 1], ["🌳", "skipping in an open space", 1], ["🧦", "skipping in socks on tiles", 0], ["🪢", "wrapping the rope round your neck", 0]] },
  "health-sprout-12": {
    sc: [["⚽ To throw over your shoulder, how do you move your arm?", "💪 Back and up, then forward", "👇 Down and behind you", "🙈 I don't move it at all"],
      ["🥅 A ball is coming towards you. How do you catch it?", "🙌 I open my hands and watch the ball", "🙈 I close my eyes", "🏃 I run away"]],
    tf: [["When catching, we watch the ball.", 1], ["We hit our friend's head with the ball.", 0], ["We practise with both hands and both feet.", 1]],
    dd: [["🙌", "catching with both hands", 1], ["🧦", "throwing a soft ball", 1], ["🪨", "throwing a stone", 0], ["🪟", "kicking towards a window", 0]] },
  "health-sprout-13": {
    sc: [["❤️ You ran fast. What does your heart do?", "💓 It beats faster", "🛑 It stops", "🧊 It gets cold"],
      ["🥵 After playing you're hot and sweaty. What do you do?", "💧 I drink water and walk slowly for a bit", "🥤 I drink a fizzy drink", "😴 I lie down straight away"]],
    tf: [["When we run, our heart beats faster.", 1], ["Sweating means we're ill.", 0], ["Active play every day is good for the body.", 1]],
    dd: [["🏃", "active play every day", 1], ["💧", "drinking water after playing", 1], ["🛋️", "sitting all day", 0], ["😖", "carrying on when we feel unwell", 0]] },
  "health-sprout-14": {
    sc: [["🧒 A child is standing alone, watching the game. What do you do?", "👋 I call them to come and play", "🙅 We don't let them play", "😶 I don't look at them"],
      ["🎲 You lost the game. What do you do?", "🤝 I say: “Good game!”", "😤 I sulk", "🗯️ I shout"]],
    tf: [["In a game, we take turns.", 1], ["We don't let younger children play.", 0], ["Losing is part of the game too.", 1]],
    dd: [["⏳", "waiting for your turn", 1], ["👋", "inviting a child who is alone", 1], ["😤", "sulking after losing", 0], ["🙈", "cheating in the game", 0]] },
  "health-sprout-15": {
    sc: [["🌅 What do we start morning exercises with?", "🚶 Marching on the spot to warm up", "🦘 The biggest jump", "😴 Sleep"],
      ["😮‍💨 What do we do at the end?", "🙆 Stretching and slow breaths", "🏃 The fastest run", "📺 TV"]],
    tf: [["At the start, we warm up the body.", 1], ["We finish exercises with a fast run.", 0], ["Morning exercises wake us up.", 1]],
    dd: [["🚶", "warming up first", 1], ["😮‍💨", "slow breaths at the end", 1], ["🪑", "jumping off a chair", 0], ["😖", "carrying on when it hurts", 0]] },
  "health-sprout-26": {
    sc: [["⭐ What is the star shape?", "⭐ Arms and legs wide", "⚽ Curled up, hugging your knees", "✏️ Straight and tall"],
      ["🤸 Where do we do a log roll?", "🛏️ On a rug or a soft mattress", "🪨 On a stone floor", "🪜 On the stairs"]],
    tf: [["The pencil shape is straight and tall.", 1], ["We do back flips and handstands alone at home.", 0], ["To land softly, we bend our knees.", 1]],
    dd: [["🛏️", "rolling on a soft mattress", 1], ["🦵", "landing with bent knees", 1], ["🤸", "doing a back flip alone", 0], ["🪑", "jumping off the table", 0]] },
  "health-sprout-27": {
    sc: [["🎵 You're making a little dance. What do you do first?", "🔢 I choose some moves and put them in order", "😶 I stand still", "🏃 I run fast"],
      ["👏 The music gets faster. What do you do?", "🐇 I move faster", "🐢 I slow down", "🗿 I stop"]],
    tf: [["With the music, we do the moves one after another.", 1], ["A dance has only one move.", 0], ["We can dance together with our family.", 1]],
    dd: [["👏", "clapping to the music", 1], ["🔢", "doing the moves in order", 1], ["💥", "pushing others while dancing", 0], ["🛋️", "dancing on the sofa", 0]] },
  "health-sprout-16": {
    sc: [["🌙 It's bedtime, but your cartoon hasn't finished. What do you do?", "📴 I turn it off and get ready for bed", "📺 I watch to the end", "📱 I take the phone to bed"],
      ["😴 What is calm to do before bed?", "📖 Listening to a story", "🎮 A computer game", "🍫 Eating chocolate"]],
    tf: [["We go to bed at the same time every night.", 1], ["An exciting computer game is good before bed.", 0], ["Before bed we turn the screens off.", 1]],
    dd: [["📴", "turning screens off before bed", 1], ["📖", "a calm story", 1], ["📱", "a phone under the pillow", 0], ["🥤", "a fizzy drink at night", 0]] },
  "health-sprout-17": {
    sc: [["🎮 You want to install a new game. What do you do?", "🙋 First I ask a grown-up", "⬇️ I install it myself", "🤫 I install it secretly"],
      ["📱 You've played on the tablet for an hour. What now?", "⚽ I turn it off and play outside", "📱 Another hour", "😠 I sulk"]],
    tf: [["We share our time between screens and playing outside.", 1], ["We don't need to ask before installing a new game.", 0], ["Playing outside makes the body strong.", 1]],
    dd: [["🙋", "asking before installing a game", 1], ["⚽", "playing outside after screen time", 1], ["🌙", "playing on the tablet until midnight", 0], ["🍽️", "a tablet at the table", 0]] },
  "health-sprout-2": {
    sc: [["🧴 There's a bottle of cleaning liquid on the floor. What do you do?", "🙋 I don't touch it and I tell a grown-up", "😋 I smell and taste it", "🧸 I play with it"],
      ["🔌 There's a socket in front of you. What do you do?", "↩️ I don't touch it", "📎 I put something in it", "💧 I touch it with wet hands"]],
    tf: [["Medicines and cleaning products are for grown-ups.", 1], ["We play with the kitchen knife.", 0], ["We keep away from hot tea and the stove.", 1]],
    dd: [["↩️", "keeping away from the stove", 1], ["🙋", "telling a grown-up about medicine", 1], ["🔌", "touching a socket", 0], ["🧴", "opening a bottle of cleaner", 0]] },
  "health-sprout-18": {
    sc: [["🪟 The window is open and you want to look out. What do you do?", "↩️ I stand back and ask a grown-up to be with me", "🧗 I climb on a chair and lean out", "🪟 I hang from the window ledge"],
      ["👃 There's a smell of gas. What do you do?", "🗣️ I tell a grown-up straight away", "🔥 I light a match", "🙈 Nothing"]],
    tf: [["We don't climb the balcony railing.", 1], ["Climbing a bookshelf is safe.", 0], ["If we smell gas, we tell a grown-up.", 1]],
    dd: [["↩️", "standing back from an open window", 1], ["🗣️", "telling about a smell of gas", 1], ["🧗", "climbing a shelf", 0], ["🔥", "playing next to the heater", 0]] },
  "health-sprout-3": {
    sc: [["🚸 You're at the side of the road. What do you do before crossing?", "👀 We stop, look and listen", "🏃 We run fast", "📱 We look at the phone"],
      ["🚦 The walking light is red. What do you do?", "🛑 I wait until it turns green", "🏃 I cross quickly", "⚽ I play ball"]],
    tf: [["We cross at the zebra crossing.", 1], ["We jump out from between parked cars.", 0], ["Before crossing, we look left and right.", 1]],
    dd: [["🦓", "crossing at the zebra", 1], ["🚦", "waiting for the green light", 1], ["🚙", "stepping out between parked cars", 0], ["🎧", "crossing with headphones, not paying attention", 0]] },
  "health-sprout-19": {
    sc: [["🚗 You get in the car. What do you do first?", "🔒 I fasten my seat belt", "🪟 I put my head out of the window", "🦘 I stand on the seat"],
      ["🏍️ Someone wants to take you on a motorbike without a helmet. What do you do?", "🙅 I don't get on", "🏍️ I get on", "🙈 I sit at the front"]],
    tf: [["Children sit in the back seat.", 1], ["We put our hand out of the car window.", 0], ["On a motorbike, a helmet is needed.", 1]],
    dd: [["🔒", "fastening the seat belt", 1], ["💺", "sitting in the back seat", 1], ["🪟", "putting your head out of the window", 0], ["👶", "sitting in front, on a grown-up's lap", 0]] },
  "health-sprout-4": {
    sc: [["🧍 You lost your grown-up in the bazaar. What do you do first?", "🧍 I stay where I am", "🚶 I set off home alone", "🙈 I hide"],
      ["🏪 Who do you ask for help?", "🏪 A shopkeeper in a shop", "🚗 Someone calling me from a car", "🚶 Nobody"]],
    tf: [["We know our grown-up's name and phone number.", 1], ["If we're lost, we go home alone.", 0], ["If we're lost, we breathe slowly.", 1]],
    dd: [["🧍", "staying where you are", 1], ["📞", "giving Mum's or Dad's number to the shopkeeper", 1], ["🚗", "getting into a stranger's car", 0], ["🚶", "setting off alone", 0]] },
  "health-sprout-20": {
    sc: [["🤔 Your friend says: “Let's climb over the balcony railing!” What do you do?", "🙅 I don't, and I tell a grown-up", "🧗 I climb too", "👀 I just watch"],
      ["⚽ Your ball went into the road. What do you do?", "🙋 I stay on the pavement and tell a grown-up", "🏃 I run after it", "🚗 I stand in front of the cars"]],
    tf: [["If we're not sure, we ask a grown-up.", 1], ["We take medicine ourselves.", 0], ["A seat belt in the car is safe.", 1]],
    dd: [["🙋", "asking a grown-up", 1], ["🔒", "fastening the seat belt", 1], ["⚽", "running after a ball in the road", 0], ["🪟", "leaning out of a window", 0]] },
  "health-sprout-21": {
    sc: [["🙅 Someone wants to touch your private parts. What do you do?", "🗣️ I say “No!” firmly, move away and tell my grown-up", "🤐 I don't tell anyone", "😔 I think it's my fault"],
      ["🤫 Someone said: “Don't tell anyone.” What do you do?", "🗣️ I still tell my mum or dad", "🤐 I don't tell anyone", "🙈 I forget about it"]],
    tf: [["The parts that underwear covers are the private parts of the body.", 1], ["If someone touches us in an unsafe way, it's our fault.", 0], ["A doctor examines us while our mum or dad is with us.", 1]],
    dd: [["🤝", "shaking hands", 1], ["🙌", "a high five", 1], ["🤫", "keeping a secret that made us feel bad", 0], ["😶", "staying quiet when a touch made us feel bad", 0]] },
  "health-sprout-22": {
    sc: [["😢 One of the children makes fun of you every day. What do you do?", "🛑 I say “Stop it!” firmly, walk away and tell a grown-up", "🤐 I don't tell anyone", "👊 I hit them"],
      ["🧒 A child is alone and nobody lets them play. What do you do?", "👋 I invite them to play", "😂 I laugh at them", "😶 I don't look at them"]],
    tf: [["Being bullied is never the fault of the one who is bullied.", 1], ["When someone bothers us, we don't tell anyone.", 0], ["Teachers and parents help us.", 1]],
    dd: [["🗣️", "telling the teacher", 1], ["👋", "inviting a child who is alone to play", 1], ["😂", "laughing at someone", 0], ["👊", "hitting", 0]] },
  "health-sprout-23": {
    sc: [["💻 You want to look at something online. Who with?", "👩 With a grown-up next to me", "🧒 Alone in my room", "🌙 At night, secretly"],
      ["😟 You saw something on the phone that scared you. What do you do?", "🗣️ I tell my grown-up straight away", "🙈 I hide it", "📱 I look again"]],
    tf: [["Our home address is private.", 1], ["We send our photo to anyone online.", 0], ["The internet helps us see family who are far away.", 1]],
    dd: [["👩", "going online next to a grown-up", 1], ["🗣️", "telling a grown-up about something scary", 1], ["🏠", "saying your address in a game", 0], ["📷", "sending a photo to a stranger", 0]] },
  "health-sprout-24": {
    sc: [["🦵 You fell and grazed your knee. What do you do first?", "🗣️ I tell a grown-up", "🙈 I hide it", "🧹 I put dirt on it"],
      ["👃 Your nose is bleeding. What do you do?", "🙇 I sit, lean forward a little and pinch the soft part of my nose", "🙃 I tip my head back", "🏃 I run"]],
    tf: [["We wash a graze with clean water.", 1], ["For a nosebleed, we tip our head back.", 0], ["On a bump on the head, we put a cool cloth.", 1]],
    dd: [["💧", "washing a graze with clean water", 1], ["🩹", "a plaster on the graze", 1], ["🙃", "tipping your head back for a nosebleed", 0], ["🙈", "hiding a cut", 0]] },
  "health-sprout-25": {
    sc: [["☀️ It's a hot day and you want to play outside. What do you do?", "🧢 I wear a hat, drink water and play in the shade", "🏃 I run in the midday sun", "🚫 I don't drink any water"],
      ["💧 When do we drink water?", "💧 Before we get thirsty", "⏳ Only when we're very thirsty", "🚫 Never"]],
    tf: [["At midday, when the sun is hot, we rest in the shade.", 1], ["We don't need a hat in the heat.", 0], ["On hot days we drink lots of water.", 1]],
    dd: [["🧢", "a hat in the sun", 1], ["🌳", "playing in the shade", 1], ["☀️", "running in the hot midday sun", 0], ["🥤", "a fizzy drink instead of water", 0]] }
});

B.healthEveryLessonEn("sapling", 7, {
  "health-sapling-5": {
    sc: [["🤧 Your friend has a cold and is coughing. What stops germs spreading?", "💪 Coughing into the elbow and washing hands", "🤲 Coughing into the hand and shaking hands", "🥤 Drinking from the same cup"],
      ["🍎 You've brought fruit home from the market. What do we do before eating it?", "💧 We wash it with clean water", "🍎 We eat it as it is", "👕 We wipe it on our clothes"]],
    tf: [["Germs travel from one person to another on our hands.", 1], ["Germs are big enough to see with our eyes.", 0], ["Sneezes and coughs spread germs through the air.", 1]],
    dd: [["🧼", "washing hands with soap and water", 1], ["💪", "coughing into the elbow", 1], ["🤲", "sneezing into your hand and shaking hands", 0], ["🚰", "drinking dirty water", 0]] },
  "health-sapling-6": {
    sc: [["🍲 There's food left from lunch. What do we do with it?", "🧊 Put it in the fridge soon", "☀️ Leave it out until the evening", "🪟 Put it by a sunny window"],
      ["💧 On a trip, you're thirsty and next to a stream. What do you do?", "🥤 I drink from our own water bottle", "🏞️ I drink from the stream", "🙈 I stay thirsty and say nothing"]],
    tf: [["We cover food so dust and insects don't land on it.", 1], ["We drink river water without boiling it.", 0], ["We wash fruit and vegetables with clean water before eating.", 1]],
    dd: [["🧊", "leftovers in the fridge", 1], ["🍲", "covering food", 1], ["☀️", "leftovers out in the sun", 0], ["🍎", "eating unwashed fruit", 0]] },
  "health-sapling-7": {
    sc: [["🦷 Your milk tooth is wobbly. What do you do?", "🙂 I wait for it to fall out and tell a grown-up", "🔨 I pull it hard", "🍬 I chew a hard sweet"],
      ["🍫 You ate something sweet between meals. What do you do afterwards?", "💧 I drink water and rinse my mouth", "🍬 I eat another one", "😴 I go to sleep"]],
    tf: [["New teeth stay with us for life.", 1], ["We brush only the front of our teeth.", 0], ["We go to the dentist once or twice a year.", 1]],
    dd: [["🪥", "brushing every side of the teeth", 1], ["🧵", "flossing with a grown-up's help", 1], ["🍬", "eating sweets between meals", 0], ["🥤", "a fizzy drink before bed", 0]] },
  "health-sapling-8": {
    sc: [["🤒 You have a fever and a headache. What do you do?", "🗣️ I tell a grown-up, rest and drink water", "💊 I take pills from the cupboard myself", "🏃 I go out and run"],
      ["🥜 Your friend is allergic to peanuts. What do you do?", "🙅 I don't give them my peanut snack", "🎁 I offer it to them", "🤫 I secretly put it in their food"]],
    tf: [["Only a grown-up gives medicine, with its own measuring cup and the amount the doctor said.", 1], ["We take our friend's medicine too.", 0], ["When we're ill, we rest and drink water and other drinks.", 1]],
    dd: [["🛌", "resting when ill", 1], ["🗣️", "telling a grown-up", 1], ["💊", "taking someone else's medicine", 0], ["🥜", "offering food to a friend with an allergy", 0]] },
  "health-sapling-9": {
    sc: [["🍽️ When do you wash your hands?", "🧼 Before eating and after the toilet", "🌙 Only at night", "🚫 Never"],
      ["🧊 Which food stays safe?", "🧊 Leftovers we put in the fridge soon", "☀️ Food left out all day", "🪰 Food with no cover"]],
    tf: [["Safe water and clean hands stop germs.", 1], ["We use a paper tissue again after sneezing.", 0], ["Covering our mouth when we cough keeps others well.", 1]],
    dd: [["🧻", "throwing the tissue in the bin", 1], ["🧼", "washing hands before eating", 1], ["🪰", "food with no cover", 0], ["👃", "touching your nose, then the bread", 0]] },
  "health-sapling-10": {
    sc: [["🍽️ Lunch is rice and stew. What shall we add to make it complete?", "🥗 Salad and yoghurt", "🍟 Crisps", "🍫 Chocolate"],
      ["🌅 Which breakfast is better?", "🍞 Bread, cheese, walnuts and a glass of milk", "🍰 Cake and a fizzy drink", "🚫 No breakfast"]],
    tf: [["A good day has three meals and one or two snacks.", 1], ["Dinner should be the heaviest meal of the day.", 0], ["At each meal we eat from several food groups.", 1]],
    dd: [["🍞", "eating breakfast", 1], ["🍎", "fruit for a snack", 1], ["🍟", "crisps instead of lunch", 0], ["🚫", "skipping breakfast", 0]] },
  "health-sapling-11": {
    sc: [["🥤 You're thirsty. Which drink is better?", "💧 Water", "🥤 A fizzy drink", "🧃 Packaged juice"],
      ["🧃 How much sugar is in a small carton of packaged juice?", "🧊 About six sugar cubes", "🚫 No sugar", "1️⃣ Half a cube"]],
    tf: [["A can of fizzy drink has about eight sugar cubes in it.", 1], ["Packaged juice has no sugar.", 0], ["Milk with no added sugar is a good drink.", 1]],
    dd: [["💧", "water when thirsty", 1], ["🥛", "a glass of milk", 1], ["🥤", "a fizzy drink every day", 0], ["🧃", "several juice cartons a day", 0]] },
  "health-sapling-12": {
    sc: [["🍽️ Which is a light dinner?", "🥣 Ash soup, or an egg with bread and herbs", "🍰 Just cake", "🍟 Just chips"],
      ["🍎 Which is an afternoon snack?", "🍊 An orange, or bread and cheese", "🍭 A handful of jelly sweets", "🥤 A fizzy drink"]],
    tf: [["Milk and doogh are low-sugar drinks.", 1], ["Chocolate milk has no sugar.", 0], ["A good day has enough water too.", 1]],
    dd: [["🥗", "vegetables at every meal", 1], ["💧", "water through the day", 1], ["🍬", "a sweet treat after every meal", 0], ["🥤", "a fizzy drink with every meal", 0]] },
  "health-sapling-1": {
    sc: [["🌙 You have school tomorrow and it's bedtime. What do you do?", "😴 I turn off the screen and go to sleep", "🎮 I play until midnight", "📺 I watch a film"],
      ["⚽ You're tired after lots of play. What does your body want?", "🛋️ A little rest", "🏃 More running", "🍬 A sweet"]],
    tf: [["Children our age need 9 to 12 hours of sleep a night.", 1], ["Sleep doesn't help us learn at all.", 0], ["The body needs both moving and resting.", 1]],
    dd: [["⚽", "active play every day", 1], ["😴", "sleeping at the same time", 1], ["📱", "a phone in bed", 0], ["🛋️", "sitting all day", 0]] },
  "health-sapling-13": {
    sc: [["❤️ Which move makes the heart and lungs strong?", "🏃 Running", "🧘 Sitting quietly", "📺 Watching TV"],
      ["⚖️ Which move is for balance?", "🦩 Standing on one foot", "💪 Wall push-ups", "🐈 The cat move"]],
    tf: [["Wall push-ups make the muscles of the arms and shoulders strong.", 1], ["A stretch should hurt.", 0], ["Being fit has several parts: heart, strength, stretch and balance.", 1]],
    dd: [["🏃", "running for the heart", 1], ["🦩", "balance practice on one foot", 1], ["🏋️", "lifting a grown-up's heavy weights", 0], ["😖", "stretching until it hurts", 0]] },
  "health-sapling-14": {
    sc: [["⚽ You want to play football. What do you do before playing?", "🚶 March on the spot and do arm circles", "🏃 The hardest kick, without warming up", "😴 I go to sleep"],
      ["🏁 The game is over. What do you do now?", "🐢 I walk slowly, stretch and breathe slowly", "🛑 I sit down suddenly and don't move", "🏃 I run faster"]],
    tf: [["Warming up gets the body ready to play.", 1], ["We stretch fast, bouncing.", 0], ["After playing, we walk slowly until our breathing is calm.", 1]],
    dd: [["🚶", "warming up before playing", 1], ["😮‍💨", "calming down after playing", 1], ["⚡", "starting to play without warming up", 0], ["🥶", "stopping suddenly after a fast run", 0]] },
  "health-sapling-15": {
    sc: [["🎯 Throwing at a target: where do you look?", "🎯 At the middle of the target", "👟 At my shoes", "☁️ At the sky"],
      ["⚽ What ball do we play dodgeball with?", "🧽 A soft ball", "🏐 A hard, heavy ball", "🪨 A stone"]],
    tf: [["In dodgeball we never hit anyone's head.", 1], ["With a long rope, we turn it very fast from the start.", 0], ["We practise every move with both hands and both feet.", 1]],
    dd: [["🧽", "a soft ball for dodging", 1], ["🏀", "dribbling with one hand", 1], ["🎯", "aiming at someone's face", 0], ["🪢", "skipping next to the stairs", 0]] },
  "health-sapling-16": {
    sc: [["🙈 One of your teammates is cheating. What do you do?", "🗣️ I calmly say that's not the rule, and if they go on, I tell a grown-up", "😠 I shout and push them", "🙈 I cheat too"],
      ["🏆 Your team won. What do you do?", "🤝 I shake hands with the other team and say: “Good game!”", "😝 I make fun of them", "🏃 I leave without saying goodbye"]],
    tf: [["Before the game, we say the rules together.", 1], ["When someone plays well, we stay quiet.", 0], ["At the end, win or lose, we shake hands.", 1]],
    dd: [["👏", "cheering a teammate", 1], ["👋", "letting a newcomer play", 1], ["🙈", "cheating", 0], ["😤", "sulking after losing", 0]] },
  "health-sapling-17": {
    sc: [["🎒 How do you carry your bag?", "🎒 On both shoulders, with the straps tight", "👜 On one shoulder", "🧳 Full of toys"],
      ["🪑 How do you sit for homework?", "🪑 Feet on the floor and back against the chair", "🛋️ Slumped on the sofa", "🦵 Hunched, with one leg under me"]],
    tf: [["After sitting for a while, we get up and stretch.", 1], ["The heavier the bag, the better.", 0], ["When we work on a screen for a while, we look far away now and then.", 1]],
    dd: [["🎒", "a bag on both shoulders", 1], ["🙆", "stretching after sitting", 1], ["🧳", "a bag full of things we don't need", 0], ["📱", "sitting at a screen for hours", 0]] },
  "health-sapling-18": {
    sc: [["⏱️ What do we start the ten-minute workout with?", "🚶 Warming up", "🏋️ The hardest move", "😴 Sleep"],
      ["😖 Something hurts in the middle of the workout. What do you do?", "🛑 I stop and tell a grown-up", "💪 I carry on faster", "🙈 I don't tell anyone"]],
    tf: [["Each move has an easier and a harder version.", 1], ["We exercise in socks on a slippery floor.", 0], ["At the end we calm down and breathe slowly.", 1]],
    dd: [["👟", "exercising in shoes or bare feet", 1], ["🔁", "choosing the easier version when it's hard", 1], ["🧦", "jumping in socks on tiles", 0], ["🪑", "exercising next to the edge of a table", 0]] },
  "health-sapling-30": {
    sc: [["🔗 How do we start a movement chain?", "🧍 Straight and still, like a pencil", "🏃 With a fast run", "🛋️ On the sofa"],
      ["🪞 What do you do in the mirror game?", "🪞 I do the same move as my friend, like a mirror", "🙈 I close my eyes", "🏃 I run away"]],
    tf: [["A movement chain has a start, a few moves and a finish.", 1], ["We practise flips and somersaults alone at home.", 0], ["A chain can be done to music or in silence.", 1]],
    dd: [["⭐", "finishing with a still shape", 1], ["🛏️", "rolling only on a soft mattress", 1], ["🤸", "a handstand alone", 0], ["🪑", "jumping off a chair", 0]] },
  "health-sapling-2": {
    sc: [["😠 You're very angry and your hands are fists. What helps your body?", "🌷 I breathe slowly and deeply", "😤 I hold my breath", "👊 I punch something"],
      ["😢 You're sad and your throat feels heavy. What do you do?", "🗣️ I tell someone I love", "🤐 I don't tell anyone", "😠 I shout at the others"]],
    tf: [["When we're scared, our heart beats fast.", 1], ["Some feelings are bad and not allowed.", 0], ["Every feeling we have is normal.", 1]],
    dd: [["🌷", "slow breathing when a feeling is big", 1], ["🗣️", "telling someone we love how we feel", 1], ["👊", "hitting others when angry", 0], ["🤐", "hiding all our feelings", 0]] },
  "health-sapling-19": {
    sc: [["📏 A child laughs at your friend for being short. What do you do?", "🙋 I say that's not right and stand by my friend", "😂 I laugh too", "🙈 I pretend I didn't see"],
      ["🧑‍🦽 A new child in a wheelchair has joined the class. What do you do?", "👋 I say hello and ask what they would like to play together", "👀 I stare from far away", "🚫 I think they can't play"]],
    tf: [["Children grow at different speeds.", 1], ["Only one kind of body is good.", 0], ["We never make fun of anyone's body.", 1]],
    dd: [["👋", "playing with all the children", 1], ["💛", "saying kind things about my own body", 1], ["😂", "calling someone names about their body", 0], ["👀", "staring and whispering about someone's looks", 0]] },
  "health-sapling-3": {
    sc: [["🎁 You're keeping Mum's birthday present secret until tomorrow. What kind of secret is it?", "😊 A good secret: it's told soon and makes everyone happy", "😟 A bad secret", "🤐 A secret never to tell"],
      ["🗣️ You told a grown-up, but they didn't listen. What do you do now?", "🗣️ I tell another grown-up", "🤐 I never tell anyone again", "😔 I think it's my fault"]],
    tf: [["Nobody should touch your private parts.", 1], ["A secret that worries you should be kept.", 0], ["Whenever you tell, it's never too late.", 1]],
    dd: [["🗣️", "telling a trusted grown-up a bad secret", 1], ["🎁", "keeping a present secret until tomorrow", 1], ["🤐", "keeping a secret that worries me", 0], ["😶", "staying quiet because someone said “don't tell”", 0]] },
  "health-sapling-20": {
    sc: [["👀 You see some children making fun of a child. What do you do?", "🤝 I stand by them, we walk away together and tell a grown-up", "😂 I laugh too", "👊 I fight them"],
      ["🔁 Which one is bullying?", "🔁 Someone says nasty things to a child on purpose every day", "⚽ Two friends argue once about whose turn it is, and make up", "😄 Two friends joke together and both laugh"]],
    tf: [["Bullying is never the fault of the one who is bullied.", 1], ["Telling a grown-up is telling tales.", 0], ["Together, firmly and calmly, we say: “Stop it!”", 1]],
    dd: [["🤝", "standing by someone who is bullied", 1], ["🗣️", "telling the teacher", 1], ["😂", "laughing along with the bully", 0], ["👊", "fighting", 0]] },
  "health-sapling-4": {
    sc: [["💨 There's smoke under the ceiling at home. What do you do?", "🧎 Low down, under the smoke, I go out", "🛏️ I hide under the bed", "🧸 First I pick up my toys"],
      ["🛑 In a fire drill: if your clothes catch fire, what do we do?", "🛑 Stop, drop and roll", "🏃 Run", "💨 Blow on it"]],
    tf: [["Matches and lighters are for grown-ups, not for playing.", 1], ["In a fire, we hide under the bed.", 0], ["The fire service number is 125.", 1]],
    dd: [["↩️", "one big step away from the stove and samovar", 1], ["🙋", "telling a grown-up about matches", 1], ["🔥", "playing with a lighter", 0], ["🛏️", "hiding during a fire", 0]] },
  "health-sapling-21": {
    sc: [["🛣️ How do you cross a wide road?", "🌉 On the footbridge, with a grown-up", "🚧 Over the railing in the middle of the road", "🏃 Running between the cars"],
      ["🚌 You're waiting for the school bus. Where do you stand?", "🚸 On the pavement, away from the kerb", "🚗 At the edge of the road", "🛣️ In the middle of the road"]],
    tf: [["We get on and off only when the bus has fully stopped.", 1], ["We ride bikes on a busy road.", 0], ["In the school bus too, we fasten our seat belt.", 1]],
    dd: [["🌉", "crossing on the footbridge", 1], ["🪖", "a helmet on a bike", 1], ["🚌", "crossing in front of the school bus", 0], ["🚴", "cycling on a busy road", 0]] },
  "health-sapling-22": {
    sc: [["🏞️ It's a hot day and the children say: let's swim in the river! What do you do?", "🙅 I don't go in; river water pulls hard", "🏊 I jump into the water", "👀 First I check if it's deep, then I go in"],
      ["🛟 Your friend is tired in the pool and needs help. What do you do?", "📣 I call the lifeguard and throw them a ring", "🤽 I jump in myself", "🏃 I leave"]],
    tf: [["We swim only where a lifeguard or grown-up is watching.", 1], ["Behind a dam is safe for swimming.", 0], ["We learn to float on our back.", 1]],
    dd: [["🏊", "swimming in a pool with a lifeguard", 1], ["🛟", "throwing a ring to help", 1], ["🏞️", "swimming in a river", 0], ["🤽", "jumping in to rescue a friend", 0]] },
  "health-sapling-23": {
    sc: [["🌫️ The air is polluted today. What do you do?", "🏠 I stay in, shut the window and play quietly", "🏃 I go out and run", "🪟 I leave the window open"],
      ["❄️ It's snowing and you want to go out. What do you wear?", "🧥 Several warm layers and a hat", "👕 A thin T-shirt", "🩴 Flip-flops"]],
    tf: [["On hot days we drink lots of water and play in the shade.", 1], ["In polluted air we do hard exercise outside.", 0], ["Several thin layers are better than one thick one.", 1]],
    dd: [["🧢", "a hat in the sun", 1], ["🪟", "shutting the window when the air is polluted", 1], ["☀️", "running at midday in summer", 0], ["👕", "thin clothes in the snow", 0]] },
  "health-sapling-24": {
    sc: [["🎮 In a game, someone asks where you live. What do you do?", "🙅 I don't answer, I close the screen and tell a grown-up", "🏠 I type my address", "🤫 I answer but don't tell anyone"],
      ["📷 Someone says: “Send me your photo and don't tell anyone.” What do you do?", "🙋 I don't send it and I show a grown-up straight away", "📷 I send it", "🤐 I send it and keep it secret"]],
    tf: [["We never tell our password to any friend online.", 1], ["In the class group it's fine to make fun of someone.", 0], ["Before installing a new game, we ask a grown-up.", 1]],
    dd: [["👍", "sending a kind message", 1], ["🙋", "asking before installing", 1], ["🔑", "telling a friend your password", 0], ["📍", "writing where I am right now", 0]] },
  "health-sapling-25": {
    sc: [["🛣️ You want to take a new way to school. What do you do?", "🙋 First I ask a grown-up", "🚶 I go alone", "🤫 I don't tell anyone"],
      ["🔗 A strange link came in a message. What do you do?", "🙋 I don't open it and I show a grown-up", "👆 I open it", "🔁 I send it to my friends"]],
    tf: [["If we're not sure, we stop and ask a grown-up.", 1], ["Getting into a stranger's car is safe.", 0], ["Drinking water on a hot day is safe.", 1]],
    dd: [["🙋", "asking a grown-up", 1], ["💧", "drinking water in the heat", 1], ["🚗", "getting into a stranger's car", 0], ["🔗", "opening a strange link", 0]] },
  "health-sapling-26": {
    sc: [["🔥 The house is on fire. Which number do we call?", "🚒 125", "🚑 115", "🚓 110"],
      ["📞 You phoned the ambulance. What do you say?", "👧 Who I am, what happened and where we are", "🎵 A song", "🙊 Nothing; I hang up"]],
    tf: [["The ambulance number is 115.", 1], ["We call 115 as a joke.", 0], ["We don't hang up until they tell us to.", 1]],
    dd: [["🏠", "knowing your home address by heart", 1], ["👂", "listening and not hanging up", 1], ["😜", "a prank call to the ambulance", 0], ["😱", "screaming instead of saying the address", 0]] },
  "health-sapling-27": {
    sc: [["🎒 What goes in the emergency bag?", "💧 Water, a torch and a whistle", "🎮 A computer game", "🪴 A flower pot"],
      ["🌳 Where is the family meeting place?", "🌳 A safe place outside the house, like under the big tree in the park", "🛏️ Under the bed", "🚗 In a car in the street"]],
    tf: [["The family chooses a meeting place outside the house.", 1], ["The emergency bag is full of toys.", 0], ["The list of phone numbers goes in the emergency bag.", 1]],
    dd: [["📝", "a list of numbers in the bag", 1], ["🔦", "a torch in the bag", 1], ["🧸", "all the toys in the bag", 0], ["🙈", "not knowing the meeting place", 0]] },
  "health-sapling-28": {
    sc: [["🔥 Your hand touched a hot teapot and got a little burnt. What do you do?", "🚰 I hold it under cool running water for a long time and tell a grown-up", "🧊 I put ice on it", "🧈 I put butter or toothpaste on it"],
      ["🩸 You cut your finger a little. What do you do first?", "🧻 I press on it with a clean cloth", "🙈 I hide it", "🧹 I put dirt on it"]],
    tf: [["We don't put ice, butter or toothpaste on a burn.", 1], ["We fix a big cut that won't stop bleeding ourselves.", 0], ["We put a cool cloth on a bee sting.", 1]],
    dd: [["🚰", "cool water on a burn", 1], ["🩹", "a plaster on a washed cut", 1], ["🧊", "ice on a burn", 0], ["🧈", "butter on a burn", 0]] },
  "health-sapling-29": {
    sc: [["🐝 A bee stung your friend and now they find it hard to breathe. What do you do?", "📣 I call a grown-up straight away to phone 115", "🧻 I just put a cool cloth on it", "⏳ I wait"],
      ["👃 A nosebleed: what do we do first?", "🙇 We sit and lean forward a little", "🙃 We tip our head back", "🏃 We run"]],
    tf: [["Staying calm and getting a grown-up is the biggest help.", 1], ["We report a gas smell on 125.", 0], ["We can look after a small graze ourselves with first aid.", 1]],
    dd: [["🧰", "knowing where the first-aid box is", 1], ["🗣️", "getting a grown-up", 1], ["🙃", "tipping your head back for a nosebleed", 0], ["🧊", "ice straight on a burn", 0]] }
});
