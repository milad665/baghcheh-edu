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
          { caption: "We turn on the tap and wet our hands." },
          { caption: "We rub soap on our hands." },
          { caption: "We rub the palms together. We rub the backs of our hands too." },
          { caption: "We wash between our fingers and under our nails too. We count slowly to twenty." },
          { caption: "We rinse the soap off with water." },
          { caption: "We dry them with a clean towel. Our hands are clean!" }
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
          { caption: "In the morning, after breakfast, we brush our teeth." },
          { caption: "At night, before bed, we brush our teeth too." },
          { caption: "A little toothpaste, the size of a pea, is enough." },
          { caption: "We brush all our teeth gently in circles: the front, the back and the top." },
          { caption: "We spit out the toothpaste. Our teeth are clean!" }
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
          { caption: "We hold things with our hands. We walk and run with our feet." }
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
          { caption: "Colourful food gives our bodies energy to play and grow." },
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

    // ---------------- Sprout ----------------
    "health-sprout-1": { title: "Sneezes and coughs", steps: [
      { prompt: "Look at what we do",
        scenes: [
          { caption: "Aida feels a sneeze coming." },
          { caption: "Aida holds a tissue over the mouth and nose, and sneezes." },
          { caption: "Aida throws the tissue in the bin." },
          { caption: "If there is no tissue, Aida sneezes or coughs into the elbow." },
          { caption: "Then Aida washes the hands with soap and water. Now the germs will not reach other people." }
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
          { caption: "Medicine is not food, even if it looks like candy. Only grown-ups give us medicine." },
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
          { caption: "In a car, we put on a seat belt and sit in the back." }
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

    // ---------------- Sapling ----------------
    "health-sapling-1": { title: "Sleep, play and exercise", steps: [
      { prompt: "A good day",
        scenes: [
          { caption: "Our bodies need to play and move every day: running, jumping, playing ball." },
          { caption: "After playing, our bodies need a little rest too." },
          { caption: "At night, good sleep helps our bodies grow and helps us remember what we learned today." },
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
          { caption: "Every feeling we have is normal. When a feeling is very big, we breathe slowly and tell someone we love." }
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

    // ---------------- For every garden ----------------
    "health-all-1": { title: "My body is mine", steps: [
      { prompt: "Look at the story",
        scenes: [
          { caption: "This is your body. Your body belongs to you." },
          { caption: "If you do not want a hug or a kiss, you can say kindly: “No, thank you.” You can shake hands or give a high five instead." },
          { caption: "The parts of your body that underwear covers are your private parts." },
          { caption: "Nobody should touch your private parts or ask to see them." },
          { caption: "Only when it is needed: Mum or Dad helping you in the bath, or a doctor when Mum or Dad is with you." },
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
    ] }
  });
})();
