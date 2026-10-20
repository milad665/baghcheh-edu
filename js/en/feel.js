/* باغچه — احساس‌های من (me and my feelings) in English. See js/english-mode.js.
   Steps are matched by position with js/lessons/feel.js; {} leaves a step as it is. Keep the words calm and plain. */
var B = window.B || {};
window.B = B;
B.EN = B.EN || {};

Object.assign(B.EN, {
  "feel-1": { title: "Smell the flower, blow the candle" },

  "feel-2": { title: "Names for feelings", steps: [
    { prompt: "Every feeling has a name",
      scenes: [
        { caption: "Grandma has come to Yasaman's house. Yasaman is happy." },
        { caption: "The wind took Arash's balloon away. Arash is sad." },
        { caption: "Yasaman's little brother knocked down her tower. Yasaman is angry." },
        { caption: "Tomorrow is the first day of school. Arash is worried." },
        { caption: "The kitten saw a big dog. The kitten was scared." },
        { caption: "The dog went away. In the afternoon, Yasaman reads a book next to the kitten. Yasaman is calm." },
        { caption: "All these feelings are normal. Every feeling has a name, and it passes." }
      ] },
    { prompt: "Match each face with the name of its feeling. Tap the names to hear them.",
      pairs: [
        [null, { label: "happy", say: "happy" }],
        [null, { label: "sad", say: "sad" }],
        [null, { label: "angry", say: "angry" }],
        [null, { label: "worried", say: "worried" }],
        [null, { label: "scared", say: "scared" }],
        [null, { label: "calm", say: "calm" }]
      ] },
    { caption: "When do you feel happy? When do you feel sad?",
      tips: [
        "Accept whatever your child says. There is no right or wrong feeling.",
        "Give the feeling a name: \"It sounds like you felt sad when your balloon flew away.\"",
        "Talk about your own feelings too: \"I feel happy when I see you.\"",
        "If your child doesn't want to talk, don't push. Ask again another time."
      ] },
    {}
  ] },

  "feel-3": { title: "Feelings in my body", steps: [
    { prompt: "Our body feels our feelings too",
      scenes: [
        { caption: "When we are happy, we might want to jump and run." },
        { caption: "When we are worried, our tummy might feel funny." },
        { caption: "When we are angry, our face might get hot and our hands might make fists." },
        { caption: "When we are sad, we might cry, and our body might feel heavy." },
        { caption: "Everyone feels feelings in their own places. All of it is right." }
      ] },
    { prompt: "When you are happy, where in your body do you feel it?" },
    { prompt: "When you are worried, where in your body do you feel it?",
      notes: { tummy: "Your tummy. Lots of children get a funny tummy when they are worried.", chest: "Your chest. Maybe your heart beats faster." } },
    { prompt: "When you are angry, where in your body do you feel it?",
      notes: { head: "Your head. Maybe your face gets hot.", hands: "Your hands. Maybe you want to make fists." } },
    {}
  ] },

  "feel-4": { title: "Box breathing", steps: [
    { prompt: "A square has four sides",
      scenes: [
        { caption: "Today we breathe with a square. A square has four sides." },
        { caption: "Side one: breathe in slowly through your nose and count to four." },
        { caption: "Side two: hold your breath and count to four." },
        { caption: "Side three: breathe out slowly through your mouth and count to four." },
        { caption: "Side four: wait again and count to four. Then start again." }
      ] },
    {},
    {}
  ] },

  "feel-5": { title: "Five things I can see", steps: [
    { prompt: "Our senses bring us back to right here",
      scenes: [
        { caption: "Sometimes our head gets full of thoughts, like a busy cloud." },
        { caption: "Then we can look around us.", wait: { hint: "Now it's your turn: tap each thing you can see." } },
        { caption: "We can listen." },
        { caption: "We can touch things and smell them." },
        { caption: "And take one slow breath. Now we are right here." }
      ] },
    {},
    {}
  ] },

  "feel-6": { title: "When I'm worried", steps: [
    { prompt: "Fandogh is worried",
      scenes: [
        { caption: "This is Fandogh the squirrel. Tomorrow is Fandogh's first day of school." },
        { caption: "At night, Fandogh can't sleep. Fandogh's tummy feels funny. Fandogh is worried." },
        { caption: "Fandogh goes to Mum and says, \"I'm worried.\"" },
        { caption: "Mum gives Fandogh a hug and says, \"Thank you for telling me.\"" },
        { caption: "They breathe together: smell the flower, blow the candle." },
        { caption: "Mum says, \"Worry is like a cloud. It comes and it goes.\" Slowly, the cloud gets smaller." },
        { caption: "In the morning, Fandogh went to school and made a new friend." }
      ] },
    { caption: "When do you feel worried? When you are worried, what helps you? Who do you tell?",
      tips: [
        "Listen and say back what you heard: \"So you're worried you won't find a friend tomorrow.\"",
        "Instead of \"Don't be scared, it's nothing\", say: \"I can see you're worried. I'm here with you.\"",
        "Think together about what helps: slow breathing, a hug, talking, drawing a picture.",
        "If your child doesn't want to talk, don't push. Just say you'll listen whenever they want."
      ] },
    {},
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Remember: when you are worried, you can tell a grown-up you love.",
      tips: [
        "Worry is a normal feeling. Most of the time it gets smaller with time, a daily routine and having you close.",
        "Don't make light of your child's worry or laugh at it. Name it and stay close.",
        "Regular times for sleep, meals and play help a child feel safe.",
        "If your child's worry or fear goes on for several weeks, gets stronger, upsets their sleep, eating or play, or if they talk about hurting themselves, talk to a doctor, the school counsellor or a child psychologist."
      ] }
  ] },

  "feel-7": { title: "The anger thermometer", steps: [
    { prompt: "Anger goes up and down, like a thermometer",
      scenes: [
        { caption: "Kian built a tall tower. His little sister bumped into it and it fell down." },
        { caption: "Kian got angry. His face got hot. His anger went up like a thermometer." },
        { caption: "It's okay to feel angry. But hitting and shouting upset other people. Kian stopped." },
        { caption: "Kian breathed slowly: he smelled the flower and blew the candle. Slowly his anger came down." },
        { caption: "Then he said, \"I felt upset when my tower fell.\" His sister said, \"Sorry.\"" },
        { caption: "Together they built a new tower." }
      ] },
    { prompt: "Think of the last time you were angry. How big was your anger?",
      replies: [
        "A small anger can be said in words: \"I feel upset.\"",
        "A small anger can be said in words: \"I feel upset.\"",
        "When anger gets bigger, stop for a moment and breathe slowly.",
        "When anger is big, first stop and breathe slowly. Then ask a grown-up for help.",
        "When anger is very big, first stop and breathe slowly. Then ask a grown-up for help."
      ] },
    { prompt: "When we are angry, which things help? Tap each one to hear it.",
      baskets: [{ label: "helps" }, { label: "someone gets upset" }],
      items: [
        { label: "slow breath", say: "breathing slowly" },
        { label: "saying it", say: "saying: I'm angry" },
        { label: "walking away", say: "walking away a little to calm down" },
        { label: "hugging a toy", say: "hugging a toy or a pillow" },
        { label: "hitting", say: "hitting" },
        { label: "throwing", say: "throwing things" }
      ] },
    {}
  ] },

  "feel-8": { title: "Friendship and kindness", steps: [
    { prompt: "Aydin and Shirin in the yard",
      scenes: [
        { caption: "Aydin is playing ball in the yard. Shirin is sitting alone, watching." },
        { caption: "Aydin says, \"Hello! Let's play together.\"" },
        { caption: "After playing, Aydin cuts his apple in half: \"Here you are, half is for you.\" Shirin says, \"Thank you!\"" },
        { caption: "Without looking, Aydin stepped on Shirin's chalk drawing. The drawing got smudged." },
        { caption: "Aydin said, \"Sorry, I wasn't looking. Let's draw it again together.\"", wait: { hint: "Now it's your turn: move your finger or the mouse left and right over the drawing to help them draw it again!" } },
        { caption: "A good friend plays together, shares, and says sorry after a mistake." }
      ] },
    { prompt: "Match each moment with its kind words. Tap each card to hear it.",
      pairs: [
        [{ say: "You see your friend" }, { label: "Hello", say: "Hello" }],
        [{ say: "Someone gives you something" }, { label: "Thank you", say: "Thank you" }],
        [{ say: "You want to share something" }, { label: "Here you are", say: "Here you are" }],
        [{ say: "You broke something by accident" }, { label: "Sorry", say: "Sorry" }]
      ] },
    { caption: "How can you be kind to someone today? What has a friend done that made you happy?",
      tips: [
        "Notice your child's small kind acts and name them: \"I saw you gave your toy to your brother. That was kind.\"",
        "Don't force a \"sorry\". Help your child see how the other person feels, then find a way to make it right together.",
        "When you make a mistake, say \"sorry\" to your child too. Children learn from you."
      ] }
  ] },

  "feel-9": { title: "When there's a quarrel", steps: [
    { prompt: "One swing and two children",
      scenes: [
        { caption: "Mina and Sam are at the park. They both want to go on the swing first." },
        { caption: "They both get angry and their voices get loud." },
        { caption: "First: we stop." },
        { caption: "Second: we breathe slowly." },
        { caption: "Third: we say how we feel. Mina: \"I really love the swing too.\"" },
        { caption: "Fourth: we find a way together. Sam: \"Let's take turns! You swing ten times, then me.\"" },
        { caption: "Now they are both happy." }
      ] },
    { prompt: "Put the steps for a quarrel in order. Tap each card to hear it.",
      items: [
        { label: "Stop", say: "Stop" },
        { label: "Breathe", say: "Breathe" },
        { label: "Say how you feel", say: "Say how you feel" },
        { label: "Find a way", say: "Find a way" }
      ] },
    { caption: "When have you had a quarrel with someone? What did you do then? What will you do next time?",
      tips: [
        "When children quarrel, first help them calm down, then talk about a solution.",
        "Ask both children how they feel and what they want. Don't be the judge; help them find a way themselves.",
        "Practise simple ways together: taking turns, playing together, or choosing another game."
      ] }
  ] },

  "feel-10": { title: "Calm sleep", steps: [
    { prompt: "Put the things we do before bed in order. Tap each card to hear it.",
      items: [
        { label: "Dinner", say: "Dinner" },
        { label: "Brush teeth", say: "Brush teeth" },
        { label: "Pyjamas", say: "Pyjamas" },
        { label: "Story", say: "Story" },
        { label: "Sleep", say: "Sleep" }
      ] },
    { prompt: "In bed, we help our body relax: first we squeeze each part, then we let go.",
      parts: [
        { tense: "Make fists with your hands, tight, as if you are squeezing a lemon.", release: "Now let go. Your hands are soft and calm." },
        { tense: "Like a turtle, lift your shoulders up close to your ears.", release: "Now let your shoulders drop. They are calm." },
        { tense: "Scrunch up your face, like a mouse wrinkling its nose.", release: "Now let your face go. It is soft and calm." },
        { tense: "Curl your toes and make your legs straight and tight.", release: "Now let go. Your legs are heavy and calm." }
      ] },
    {}
  ] },

  "feel-11": { title: "Three good things today", steps: [
    { prompt: "Shirin's three good things",
      scenes: [
        { caption: "At night, at dinner, Shirin tells three good things from her day." },
        { caption: "One: Grandma phoned and we laughed together." },
        { caption: "Two: I played ball with Aydin." },
        { caption: "Three: I ate fresh, warm bread." },
        { caption: "Good things are sometimes very small. When we remember them, our heart feels warm." }
      ] },
    { caption: "What were your three good things today? Something you saw, something you did, or someone who was kind to you.",
      tips: [
        "If your child can't think of anything, help: \"Do you remember when we had tea together today?\"",
        "Small things count too: a tasty meal, a game, a blue sky.",
        "Tell your three good things of the day too."
      ] },
    { text: "Tonight at dinner, ask everyone to tell three good things from their day. You go first!" }
  ] },

  "feel-15": { title: "I shake my body", steps: [
    { prompt: "We shake our body",
      scenes: [
        { caption: "Sometimes when we are worried or upset, our body gets tight: our shoulders go up and our hands make fists." },
        { caption: "The kitten is wet. She shakes herself so the water falls off. We shake our hands like the kitten: shake, shake, shake!" },
        { caption: "Now we stretch tall like a tree: arms up, up, up, then slowly down again." },
        { caption: "The butterfly hug: cross your arms over your chest and tap slowly, one side, then the other." },
        { caption: "And one slow breath. Now our body is soft and calm." }
      ] },
    { text: "Now you try! Do it together with your grown-up:",
      list: ["Shake your hands like a wet kitten: shake, shake, shake!", "Stretch tall like a tree, arms up high. Then slowly bring them down.",
        "Butterfly hug: cross your arms over your chest and tap slowly, one side at a time, ten times."] },
    {},
    {},
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Whenever your body feels tight, you can shake it, stretch tall or give yourself a hug.",
      tips: [
        "Do these moves next to your child first. Children learn to calm down from grown-ups.",
        "The best time to practise is when your child is calm; then it is easier to remember in hard moments.",
        "The butterfly hug is slow and steady. If your child doesn't like it, or doesn't like touching themselves, don't push: shaking and stretching do the same job.",
        "If your child is tight, restless or sleepless most days for several weeks, talk to a doctor or a child psychologist."
      ] }
  ] },

  "feel-13": { title: "My calm place", steps: [
    { prompt: "A calm place in our mind",
      scenes: [
        { caption: "Yasaman wants to calm down. She closes her eyes and breathes slowly." },
        { caption: "In her mind she goes to a calm place: Grandma's garden." },
        { caption: "What does she see there? Flowers, a tree and a little pool of water." },
        { caption: "What does she hear? A sparrow singing and the sound of water." },
        { caption: "What can she smell? The lovely smell of the flowers." },
        { caption: "This calm place is always in Yasaman's mind. Whenever she wants, she goes there with a few slow breaths." },
        { caption: "Then she slowly opens her eyes. Now she feels calmer." }
      ] },
    { prompt: "Before we go to our calm place, we make our body soft: first we squeeze each part, then we let go.",
      parts: [
        { tense: "Make fists with your hands, tight, as if you are squeezing a lemon.", release: "Now let go. Your hands are soft and calm." },
        { tense: "Like a turtle, lift your shoulders up close to your ears.", release: "Now let your shoulders drop. They are calm." },
        { tense: "Scrunch up your face, like a mouse wrinkling its nose.", release: "Now let your face go. It is soft and calm." }
      ] },
    { caption: "Close your eyes and think of a calm place. What do you see there? What can you hear? What can you smell?",
      tips: [
        "Speak slowly and softly, and wait a few breaths between questions.",
        "The calm place can be real (a garden, Grandma's room, the seaside) or made up (a soft cloud, a forest full of flowers). Any place your child chooses is right.",
        "If your child can't find a place, or thinking about it upsets them, don't push. You can make up a new place together, or just breathe slowly.",
        "If your child doesn't want to close their eyes, that's fine. They can look at one spot."
      ] },
    {},
    { text: "Draw your calm place on paper. Whenever you like, look at your drawing and take a few slow breaths." },
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Your calm place is always in your mind. Whenever you want, you can go there.",
      tips: [
        "Repeat this exercise a few times on calm days so your child can go to their calm place easily. Then they will remember it in unsettled moments.",
        "For a child who has lost a home or a place, a real place may bring sadness. Suggest making up an imaginary place, or let being next to you be their safe place.",
        "Put the drawing of the calm place where your child can see it, for example by their bed.",
        "If your child often feels unsafe, has nightmares or can't calm down, and this goes on for several weeks, talk to a doctor or a child psychologist."
      ] }
  ] },

  "feel-14": { title: "My helpers", steps: [
    { prompt: "People who help us",
      scenes: [
        { caption: "When we need help, there are people who help us. Shirin counts them on the fingers of her hand." },
        { caption: "One: Mum. Two: Dad. Three: Grandma." },
        { caption: "Four: Auntie. Five: her teacher. Five people on five fingers!" },
        { caption: "Grandma lives in another city. She is far away, but they talk on the phone. Grandma still thinks of Shirin and loves her." },
        { caption: "Shirin wants her teddy, but the shelf is high. She says to Mum, \"Can you help me, please?\"" },
        { caption: "Mum says, \"Of course!\" and gives her the teddy. Shirin says, \"Thank you!\"" }
      ] },
    { caption: "Who do you count on your fingers? When you need help, who do you tell?",
      tips: [
        "Count five grown-ups on your child's five fingers: people both you and your child trust, at least one outside the home (a teacher, a neighbour, an aunt).",
        "Someone far away can be a helper too: a grandparent or an aunt who talks on the phone.",
        "If someone in the family is far away or no longer with you, say gently that they are still in our hearts, and also count the people who are close now.",
        "Tell your child that if one person doesn't listen, they should tell the next one."
      ] },
    { caption: "Play with your grown-up: you say \"Can you help me, please?\" and they answer. Now swap!",
      tips: [
        "Act out a few simple moments together: a lid that won't open, tying a shoelace, a toy you can't find.",
        "Every time your child asks for help, answer warmly: \"I'm glad you asked me.\"",
        "Say that asking for help is a good thing. Grown-ups ask each other for help too."
      ] },
    { text: "Put your hand on a sheet of paper and ask your grown-up to draw around it. On each finger, draw one of your helpers or write their name together." },
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Remember: lots of people love you, and you can ask them for help.",
      tips: [
        "Put the drawing of the helping hand where your child sees it every day. Write the phone numbers of helpers who are far away next to it.",
        "For a child who is far from their family or has lost someone, this lesson may bring sadness. Stay close and let them talk or stay quiet.",
        "If your child can't find anyone to ask for help, or is afraid of telling grown-ups, calmly ask why, and if you are worried, talk to a counsellor or a child psychologist."
      ] }
  ] },

  "feel-12": { title: "When I miss someone", steps: [
    { prompt: "Arash misses his friend",
      scenes: [
        { caption: "Arash's friend Sam has moved to another city. Arash misses him." },
        { caption: "Arash is sad and starts to cry. It's okay to cry." },
        { caption: "Mum comes and gives him a hug. Together they look at Sam's photo." },
        { caption: "Then Arash draws a picture for Sam: himself and Sam, with a heart." },
        { caption: "Then he talks to Sam on the phone. Sam is happy too. They are still friends." },
        { caption: "When we miss someone, a hug, a photo, a drawing and talking all help. Being sad is nobody's fault." }
      ] },
    { caption: "Who do you miss? When you miss someone, what helps you?",
      tips: [
        "Accept whatever your child says. They may miss a friend, a relative who is far away, their old home, school or even a toy.",
        "Say: \"It's natural to miss them. It means they matter to you.\"",
        "If your child cries, stay close. You don't need to stop the crying quickly.",
        "Find a small thing to do together: a drawing, a call, looking at a photo, or a happy memory.",
        "If your child doesn't want to talk, don't push. Say you'll listen whenever they want."
      ] },
    { text: "Draw a picture for someone you miss. You can send it to them, or keep it until you see them." },
    {},
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Feeling sad and missing someone is natural and nobody's fault. You can ask for a hug or talk about it.",
      tips: [
        "Don't make light of it (\"That's nothing to be sad about\") or quickly distract your child. First name the feeling and stay close.",
        "Children sometimes think other people's sadness is their fault. Say clearly: \"It's not your fault.\"",
        "If the person your child misses is far away, find ways to stay in touch together: video calls, letters, drawings, photos.",
        "This lesson is about missing someone, not about losing someone forever. If your child has lost someone, watch this lesson together and answer their words and questions simply and truthfully.",
        "If your child's sadness lasts several weeks, upsets their sleep, eating or play, or if they talk about hurting themselves, talk to a doctor, the school counsellor or a child psychologist."
      ] }
  ] },

  "feel-16": { title: "After hard days", steps: [
    { prompt: "When the days have been hard",
      scenes: [
        { caption: "After hard days, sometimes our body and our heart get tired too. Fandogh is tired these days." },
        { caption: "Maybe he can't fall asleep at night." },
        { caption: "Maybe his tummy hurts." },
        { caption: "Maybe he wants to stay close to his mum all the time." },
        { caption: "Maybe he gets angry more quickly than usual." },
        { caption: "Lots of children feel like this after hard days. It's natural, and little by little it gets better." },
        { caption: "Things that help: slow breathing with Mum, and hugs from the people who love us." },
        { caption: "Everyday things help too: breakfast, play and sleep, each at its usual time. Little by little, Fandogh feels calmer." }
      ] },
    { caption: "When you feel tired or unsettled, what makes you feel better? Who would you like to have next to you?",
      tips: [
        "Don't ask about what happened, and don't make your child tell about it. This talk is about the things that help.",
        "If your child tells you something, listen calmly and say: \"Thank you for telling me. Now we're here together.\"",
        "Count the things that help together: smell the flower and blow the candle, a hug, a soft toy, a bedtime story, play, the everyday routine.",
        "Say: \"Lots of children and grown-ups feel like this after hard days. Little by little it gets better, and I'm here with you.\""
      ] },
    {},
    {},
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Whenever you don't feel well, you can breathe slowly and tell someone you love.",
      tips: [
        "After hard days these reactions are common in children: sleeping badly or nightmares, tummy aches and headaches, clinging to you, getting upset or angry easily, wetting again or acting younger. Most of them ease little by little with calm, a daily routine and having you close.",
        "Regular times for sleep, meals, play and lessons help a child feel safe. When you can, tell your child what will happen next.",
        "Don't make your child tell about what happened. If they want to tell you, listen, believe them and say it's not their fault.",
        "Keep frightening news and pictures out of your child's sight and hearing.",
        "Look after yourself too. Your child learns calm from you, and you have a right to get help as well.",
        "If these signs last several weeks or get stronger, or your child stops playing and eating, or talks about hurting themselves, talk to a doctor, the school counsellor or a child psychologist."
      ] }
  ] },

  "feel-seed-1": { title: "How do I feel today?", steps: [
    { prompt: "A day with the little rabbit",
      scenes: [
        { caption: "It's morning. The little rabbit is having breakfast. She is happy." },
        { caption: "Then she played with her ball. The ball rolled away. The little rabbit felt sad." },
        { caption: "Mum came. They looked together and found the ball. The little rabbit was happy again." },
        { caption: "Night came. The little rabbit is in her bed. She is calm." },
        { caption: "In one day, feelings come and go: happy, sad, happy again, calm." }
      ] },
    { prompt: "Match each of the rabbit's faces with what happened then. Tap each card to hear it.",
      pairs: [
        [{ say: "happy" }, { say: "breakfast with Mum" }],
        [{ say: "sad" }, { say: "her ball rolled away" }],
        [{ say: "calm" }, { say: "at night, in bed" }]
      ] },
    { caption: "How did you feel this morning? When were you happy today? When were you sad?",
      tips: [
        "Go over your child's day together: breakfast, play, going out, an afternoon nap.",
        "Name the feelings for them: \"When your ice cream fell, you were sad. Then I hugged you and you felt calm.\"",
        "Say that feelings change: \"You were sad, and now you're happy.\"",
        "Accept whatever your child says. There is no right or wrong feeling."
      ] },
    { caption: "Now it's the grown-up's turn: what feelings did you have today?",
      tips: [
        "Tell your child about your own day, simply and briefly: \"I was tired this morning. When we had breakfast together, I felt happy.\"",
        "Mention hard feelings too, and what helped: \"I was a little worried. I took a slow breath and felt better.\"",
        "Hearing your feelings teaches children that every feeling can be said."
      ] },
    {}
  ] },

  "feel-seed-2": { title: "The calm turtle", steps: [
    { prompt: "The little turtle",
      scenes: [
        { caption: "The little turtle is playing with her ball. The rabbit took the ball away. The turtle got angry." },
        { caption: "The turtle stops. She pulls her head, arms and legs into her shell." },
        { caption: "Inside her shell she takes three slow breaths: one, two, three." },
        { caption: "Then she slowly comes out and says, \"I'm angry. I want my ball.\"" },
        { caption: "The rabbit says, \"Sorry,\" and gives the ball back. Now they are both calm." },
        { caption: "You can be a turtle too: wrap your arms around yourself, put your head down and take three slow breaths." },
        { caption: "Then come out and say how you feel: \"I was angry. Now I'm calmer.\"" }
      ] },
    { text: "Play turtle with your grown-up:",
      list: ["Stop.", "Go into your shell: wrap your arms around yourself and put your head down.", "Take three slow breaths: one, two, three.", "Come out and say how you feel."] },
    {},
    { text: "At home, whenever someone is angry or upset, say \"Turtle!\" and everyone goes into their shell together. Grown-ups first!" },
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "When a feeling gets very big, you can stop like a turtle, breathe, and then say how you feel.",
      tips: [
        "Play turtle a few times together first, when your child is calm. In the middle of anger a small child won't remember it alone; say \"turtle\" calmly and do it yourself too.",
        "Being angry is okay. The aim is not to hide the feeling; it is to stop, calm down, and then say it.",
        "When your child comes out and says how they feel, listen and say the feeling back: \"You got angry because he took your ball.\" Then find a way together.",
        "Never use the turtle as a punishment (like \"go and sit in the corner\"). It is a way to calm down, next to you."
      ] }
  ] },

  "feel-seed-3": { title: "My turn, your turn", steps: [
    { prompt: "One swing for two",
      scenes: [
        { caption: "There is a swing in the park. Shirin and Aydin both want to play on it." },
        { caption: "Shirin says, \"Me first, then you?\" Aydin says, \"Okay!\"" },
        { caption: "Shirin gets on first. Aydin waits and counts the swings: one, two, three, four, five." },
        { caption: "Now it's Aydin's turn. Shirin gets off and Aydin gets on." },
        { caption: "Shirin pushes the swing. Aydin says, \"Thank you!\" They are both happy." }
      ] },
    { prompt: "Put taking turns in order. Tap each card to hear it.",
      items: [
        { label: "I ask", say: "I ask: when is my turn?" },
        { label: "I wait", say: "I wait and count" },
        { label: "My turn", say: "It's my turn and I play" },
        { label: "My friend's turn", say: "Then it's my friend's turn" }
      ] },
    { prompt: "Taking turns at home",
      scenes: [
        { caption: "Shirin and Aydin build a tower with blocks: Shirin puts one on, then Aydin." },
        { caption: "Then they play ball: one throws, one catches." },
        { caption: "When it's our friend's turn, we can count, sing, or clap and cheer for them." }
      ] },
    { caption: "Who do you take turns with? When you are waiting for your turn, what do you do?",
      tips: [
        "Waiting is hard for a small child. Notice when they wait and name it: \"You waited so well!\"",
        "Make waiting short and easy to see: \"Five swings, then it's your turn.\" Count together.",
        "Find things to do while waiting together: counting, singing, clapping, watching your friend play."
      ] },
    { text: "Play a turn-taking game with your grown-up: roll a ball to each other and each time say \"My turn!\", \"Your turn!\"" }
  ] },

  "feel-seed-4": { title: "How does he feel?", steps: [
    { prompt: "We can tell from their face",
      scenes: [
        { caption: "Aydin's tower fell down. Look at his face: Aydin is sad." },
        { caption: "Shirin sees Aydin's face and says, \"Let me help you.\" Together they build the tower again." },
        { caption: "Mina got a present. Look at her face: Mina is happy." },
        { caption: "Sam's apple fell out of his hand. Look at his face: Sam is sad." },
        { caption: "Mina cuts her apple in half and gives half to Sam. Sam says, \"Thank you!\"" },
        { caption: "When we look at someone's face, we can tell how they feel. Then we can do something kind." }
      ] },
    { prompt: "Match each face with what happened. Tap each card to hear it.",
      pairs: [
        [{ say: "sad" }, { say: "his tower fell down" }],
        [{ say: "happy" }, { say: "she got a present" }],
        [{ say: "angry" }, { say: "someone took his car" }],
        [{ say: "scared" }, { say: "she saw a big dog" }]
      ] },
    { prompt: "When someone feels like this, what kind thing can you do? Match them.",
      pairs: [
        [{ say: "his tower fell down" }, { say: "help him build it again" }],
        [{ say: "his apple fell" }, { say: "share my apple with him" }],
        [{ say: "she misses her mum" }, { say: "give her a hug" }]
      ] },
    { caption: "If your friend was sad, what would you do? What if they were angry?",
      tips: [
        "Look at people's faces together in picture books or at home and ask: \"How do you think they feel? How can you tell?\"",
        "Accept whatever your child says and help them find a kind thing to do: helping, a hug, sharing, or telling a grown-up.",
        "Notice your child's kind acts and name them: \"You saw your sister was sad and you hugged her. That was kind.\""
      ] },
    { caption: "The face game: the grown-up shows a feeling with their face and you guess. Then swap!",
      tips: [
        "Start with simple feelings: happy, sad, angry, scared, surprised.",
        "After each guess, ask: \"What might make someone feel like this?\"",
        "Show scared faces gently and briefly, and end the game with a happy face."
      ] }
  ] },

  "feel-seed-5": { title: "A little help", steps: [
    { prompt: "Yasaman helps",
      scenes: [
        { caption: "It's dinner time. Yasaman helps Mum and takes the plates to the sofreh." },
        { caption: "Mum says, \"Thank you for helping me!\" Mum is happy. Yasaman is happy too." },
        { caption: "The next morning, Yasaman waters the plant. The plant drinks the water and grows." },
        { caption: "Then she puts the shoes in pairs and puts them away." },
        { caption: "Dad sees and smiles. Helping makes everyone's heart feel warm." }
      ] },
    { prompt: "Which jobs can you do, and which are for grown-ups? Tap each job to hear it.",
      baskets: [{ label: "my job" }, { label: "grown-ups' job" }],
      items: [
        { label: "setting the sofreh", say: "taking the plates to the sofreh" },
        { label: "watering plants", say: "watering the plant" },
        { label: "pairing shoes", say: "putting the shoes in pairs" },
        { label: "tidying toys", say: "tidying up the toys" },
        { label: "lighting the stove", say: "lighting the gas stove" },
        { label: "using a knife", say: "cutting with a knife" },
        { label: "pouring hot tea", say: "pouring hot tea" }
      ] },
    { caption: "When Yasaman helped, how did Mum feel? How did Yasaman feel? Who do you help at home?",
      tips: [
        "Notice your child's small help and say how you feel: \"When you put the shoes in pairs, I felt happy.\"",
        "Ask how they felt. Helping others makes a child feel good too.",
        "Don't expect the job to be perfect. Their effort is what matters."
      ] },
    { text: "Choose one small way to help and do it right now:",
      list: ["Tidy up your toys.", "Put the shoes in pairs.", "Water a plant (with your grown-up's help).", "Take a plate or a spoon to the sofreh."] },
    { guideLabel: "Feelings in the parents' guide",
      text: "Your little help makes everyone's heart feel warm.",
      tips: [
        "Give your child one small, regular job (setting out the spoons, watering a plant) to do every day. They will feel important at home.",
        "Do the job together and make it easy: unbreakable dishes, a small watering can.",
        "Praise the job, not the child: \"The shoes look so tidy!\" and say how others feel: \"Dad was happy.\"",
        "Dangerous jobs (the stove, knives, hot water, medicines) are always for grown-ups."
      ] }
  ] },

  "feel-seed-6": { title: "Goodbye, and hello again", steps: [
    { prompt: "Arash and Mum say goodbye",
      scenes: [
        { caption: "It's morning. Mum has to go to work. Today Arash is staying with Grandma." },
        { caption: "Arash and Mum have their own special goodbye. First, a big hug." },
        { caption: "Then they wave and Mum says, \"See you this evening!\" Mum goes out of the door." },
        { caption: "Arash misses Mum. It's okay to miss her. Grandma is next to him." },
        { caption: "He builds a tower and plays with Grandma." },
        { caption: "It's evening. The door opens. Mum is back! Arash says, \"Hello again!\"" }
      ] },
    { prompt: "Put Arash and Mum's goodbye in order. Tap each card to hear it.",
      items: [
        { label: "Hug", say: "A big hug" },
        { label: "Wave", say: "Waving" },
        { label: "See you this evening!", say: "See you this evening!" },
        { label: "Play", say: "Playing with Grandma" },
        { label: "Hello again!", say: "Mum is back. Hello again!" }
      ] },
    { caption: "How do you feel when your grown-up goes out? When you miss them, what do you do?",
      tips: [
        "Accept your child's missing you: \"I know you miss me. I miss you too.\"",
        "Say when you'll be back in a way your child understands: \"After lunch and your nap.\"",
        "Don't slip away. A short, warm goodbye that is always the same helps a child feel safe.",
        "When you come back, greet them warmly and say: \"See? I said I'd come back.\""
      ] },
    { text: "Make your own special goodbye with your grown-up: a hug, a wave and a sentence that is just yours. Now practise it once!" },
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "When your grown-up goes out, it's okay to miss them. Your special goodbye reminds you that they are thinking of you.",
      tips: [
        "Finding it hard to separate is natural at this age, and it may get stronger after stressful days. Be patient and don't scold your child for clinging to you.",
        "Keep goodbyes short and predictable; long goodbyes make letting go harder. Keep the promise you make (\"I'll be back this evening\").",
        "A small thing of yours (a handkerchief, a photo, a little drawing on their hand) can help your child.",
        "If the family has been separated or someone can't come back, watch this lesson together and change the words to fit your situation. For a child who has been through a hard separation, ask a child psychologist for advice.",
        "If separating gets harder every day, or fear of separation upsets your child's sleep and play for several weeks, talk to a doctor or a child psychologist."
      ] }
  ] },

  "feel-seed-7": { title: "I can do it myself", steps: [
    { prompt: "Shirin does it herself",
      scenes: [
        { caption: "Shirin washes her hands by herself." },
        { caption: "Then she picks up her plate herself and takes it to the kitchen." },
        { caption: "Now she wants to put her shoes on by herself. It's hard. It didn't work!" },
        { caption: "She takes a slow breath and tries again. It's still hard." },
        { caption: "She asks Dad for help: \"Can you help me, please?\" Dad shows her how." },
        { caption: "This time she put her shoes on by herself! \"I did it myself!\"" }
      ] },
    { caption: "What things do you do by yourself? What is still hard for you?",
      tips: [
        "Count the things your child does by themselves together and be delighted: \"You washed your hands by yourself!\"",
        "Add \"yet\" to hard things: \"Doing up buttons is still hard for you. We'll practise.\"",
        "Give your child time. If you quickly finish the job yourself, you take away their chance to say \"I did it myself.\""
      ] },
    { text: "Do one of these by yourself right now:",
      list: ["Wash your hands.", "Put on your shoes or slippers.", "Take your plate or cup back to its place.", "Put your toys in the box."] },
    { text: "Choose something hard (like putting on socks). Try it. If it doesn't work, take a slow breath and try again. If it still doesn't work, say: \"Can you help me, please?\"" },
    { guideLabel: "Feelings in the parents' guide",
      text: "You can do lots of things by yourself. When it's hard, try again or ask for help.",
      tips: [
        "Make the job smaller: pull the sock halfway on and let your child pull the rest. Little by little, let them do more.",
        "Praise the effort, not the result: \"I saw you try again!\" (we don't call children \"clever\").",
        "Encourage asking for help too. \"I did it myself\" and \"Can you help me, please?\" are both good.",
        "If after a hard time your child stops doing things they could already do (like eating or using the toilet), this is common in young children. Help them patiently, and if it lasts several weeks, talk to a doctor."
      ] }
  ] },

  "feel-seed-8": { title: "The feelings game", steps: [
    { prompt: "Match each face with what happened. Tap each card to hear it.",
      pairs: [
        [{ say: "happy" }, { say: "a birthday party" }],
        [{ say: "sad" }, { say: "her balloon flew away" }],
        [{ say: "angry" }, { say: "someone knocked down his tower" }],
        [{ say: "worried" }, { say: "tomorrow is the first day of school" }],
        [{ say: "calm" }, { say: "a bedtime story in bed" }]
      ] },
    { prompt: "Which things are kind? Tap each one to hear it.",
      baskets: [{ label: "kind" }, { label: "someone gets upset" }],
      items: [
        { label: "a hug", say: "hugging a sad friend" },
        { label: "helping", say: "helping to build a tower" },
        { label: "sharing", say: "sharing an apple" },
        { label: "waiting", say: "waiting for my turn" },
        { label: "leaving out", say: "not letting a child play" },
        { label: "grabbing", say: "grabbing a toy from someone" }
      ] },
    { prompt: "Put the turtle's steps in order. Tap each card to hear it.",
      items: [
        { label: "Stop", say: "Stop" },
        { label: "Into your shell", say: "Go into your shell" },
        { label: "Three slow breaths", say: "Take three slow breaths" },
        { label: "Come out and say it", say: "Come out and say how you feel" }
      ] },
    { prompt: "When your friend feels like this, what kind thing do you do? Match them.",
      pairs: [
        [{ say: "my friend is sad" }, { say: "I give them a hug" }],
        [{ say: "his tower fell down" }, { say: "I help him" }],
        [{ say: "she has no snack" }, { say: "I share my snack with her" }]
      ] },
    {}
  ] },

  "feel-sprout-1": { title: "New feelings", steps: [
    { prompt: "New names for feelings",
      scenes: [
        { caption: "Mina has to say a poem in front of the class. Her face gets hot and she looks down. Mina feels shy." },
        { caption: "Tomorrow Arash and his family are going on a trip to the seaside. Arash can't wait! Arash feels excited." },
        { caption: "Shirin wanted to go to the park, but it started to rain. Shirin feels disappointed." },
        { caption: "Mum keeps holding the little baby. Aydin wishes Mum were just his. Aydin feels jealous." },
        { caption: "Yasaman drew a picture and worked very hard on it. Yasaman feels proud." },
        { caption: "Kian's friend has moved to another city. Kian looks at his photo. Kian misses him." },
        { caption: "Sam has nothing to do and is waiting. Time goes slowly. Sam feels bored." },
        { caption: "These are feelings too, and each one has a name: shy, excited, disappointed, jealous, proud, missing someone, bored. They are all normal." }
      ] },
    { prompt: "Match each little story with the name of its feeling. Tap each card to hear it.",
      pairs: [
        [{ say: "has to say a poem in front of the class" }, { label: "shy", say: "shy" }],
        [{ say: "is going on a trip tomorrow" }, { label: "excited", say: "excited" }],
        [{ say: "wanted to go to the park, but it started to rain" }, { label: "disappointed", say: "disappointed" }],
        [{ say: "Mum keeps holding the little baby" }, { label: "jealous", say: "jealous" }],
        [{ say: "worked hard and finished a drawing" }, { label: "proud", say: "proud" }],
        [{ say: "a friend has moved to another city" }, { label: "missing someone", say: "missing someone" }],
        [{ say: "has nothing to do and is waiting" }, { label: "bored", say: "bored" }]
      ] },
    { caption: "When did you feel shy? When were you excited? When were you disappointed? When did you feel proud?",
      tips: [
        "Accept whatever your child says. All these feelings are normal, even jealousy.",
        "Give the exact name of the feeling: \"It sounds like you were disappointed, because you were looking forward to the park.\"",
        "Give examples of your own feelings too: \"When I was little, I felt shy in front of the class too.\"",
        "If your child feels jealous, don't scold. Say: \"I understand. You want more time with me,\" and make time for them."
      ] },
    { caption: "Charades: one person shows one of these feelings with their face and body, and the others guess.",
      tips: [
        "Act out the new feelings: shy (head down), excited (jumping up and down), bored (a yawn), proud (chest out).",
        "After each guess, ask: \"What might make someone feel like this?\"",
        "Take turns so your child both guesses and shows."
      ] },
    {}
  ] },

  "feel-sprout-2": { title: "Big feelings, small feelings", steps: [
    { prompt: "Feelings have sizes",
      scenes: [
        { caption: "Feelings have sizes: small or big. From one to five." },
        { caption: "Kian lost his pencil. He felt a little upset: size one." },
        { caption: "For a small feeling, saying it is enough: \"Where's my pencil?\" Kian looks for it and finds it." },
        { caption: "Then his sister scribbled on Kian's drawing. Kian got very angry: size four." },
        { caption: "For a big feeling, first we stop and breathe slowly." },
        { caption: "Then he asks a grown-up for help: \"Mum, my drawing got scribbled on.\" Mum helps." },
        { caption: "Feelings slowly get smaller. Now Kian is calm, and he draws a new picture." }
      ] },
    { prompt: "Think of a feeling you had today. How big was it?",
      replies: [
        "That's a small feeling. You can say it and carry on.",
        "That's a small feeling. Saying it helps.",
        "That's a middle-sized feeling. A slow breath and saying it help.",
        "That's a big feeling. First stop and breathe slowly, then ask a grown-up for help.",
        "That's a very big feeling. First stop and breathe slowly, then ask a grown-up for help. Little by little it gets smaller."
      ] },
    { prompt: "Which things are good for a small feeling, and which for a big feeling? Tap each one to hear it.",
      baskets: [{ label: "small feeling" }, { label: "big feeling" }],
      items: [
        { label: "saying it", say: "saying it in one sentence" },
        { label: "carrying on", say: "carrying on with what I'm doing" },
        { label: "looking for it", say: "looking for my pencil" },
        { label: "stopping", say: "stopping and taking a few slow breaths" },
        { label: "asking for help", say: "asking a grown-up for help" },
        { label: "a quiet place", say: "going to a quiet place and hugging a soft toy" }
      ] },
    {},
    {}
  ] },

  "feel-sprout-3": { title: "Not yet!", steps: [
    { prompt: "Nika learns to ride a bike",
      scenes: [
        { caption: "Nika has a bike and wants to learn to ride it. Dad is next to her." },
        { caption: "She pedals. The bike wobbles one way and the other... and Nika falls over, onto the grass." },
        { caption: "Nika sits on the grass. She is upset and says, \"I can't do it! I'll never learn.\"" },
        { caption: "Dad comes over and says, \"You can't do it yet. Yet! With practice you will learn.\"" },
        { caption: "Nika tries again. This time Dad holds the back of the bike." },
        { caption: "She practises every day: one day, two days, three days... With every bit of practice, our brain learns new things." },
        { caption: "One day Dad lets go of the bike and Nika rides by herself! \"I did it!\"" }
      ] },
    { caption: "What can't you do \"yet\"? What couldn't you do before, that you have learned with practice?",
      tips: [
        "Add \"yet\" to your child's sentence: \"I can't tie my shoelaces\" becomes \"I can't tie them yet.\"",
        "Talk about things they learned with practice: walking, talking, holding a spoon.",
        "Praise their effort and practice, not how \"clever\" they are: \"You tried so many times until it worked!\""
      ] },
    { prompt: "Which words help when something is hard? Tap each one to hear it.",
      baskets: [{ label: "helps" }, { label: "makes me give up" }],
      items: [
        { label: "not yet", say: "I can't do it yet, but I'll learn." },
        { label: "again", say: "I'll try again." },
        { label: "help", say: "Can you help me, please?" },
        { label: "slowly", say: "I'll practise slowly." },
        { label: "never", say: "I'll never learn." },
        { label: "forget it", say: "I can't do it, forget it." }
      ] },
    { caption: "Make a \"yet\" list with your grown-up: three things you can't do yet and want to practise.",
      tips: [
        "Write or draw the list on paper and put it on the wall. Each time your child learns one, draw a star next to it.",
        "Choose small, doable things: hopping on one foot, doing up a button, counting to twenty.",
        "Say one of your own \"yet\" things and practise it too."
      ] },
    { guideLabel: "Feelings in the parents' guide",
      text: "When something is hard, say: \"I can't do it yet.\" With practice, you will learn.",
      tips: [
        "A child who hears \"yet\" sees mistakes as part of learning and doesn't give up so quickly.",
        "When your child is discouraged, first accept the feeling: \"It's hard, I know.\" Then help them make the task smaller.",
        "Help, but don't do it for them. Like Nika's dad: hold on first, then slowly let go.",
        "Say your own mistakes out loud too, and show that you try again."
      ] }
  ] },

  "feel-sprout-4": { title: "Everyone feels it differently", steps: [
    { prompt: "One thing, two feelings",
      scenes: [
        { caption: "It's raining. Mina is happy and jumps up and down. Sam is a little scared and wants to go home quickly." },
        { caption: "A friendly dog comes along. Aydin is delighted. Shirin is scared and goes behind Dad." },
        { caption: "At the party the music is loud. Yasaman dances. Arash puts his hands over his ears; the sound is too much for him." },
        { caption: "Neither one is right or wrong. Everyone feels things in their own way, and we accept other people's feelings." }
      ] },
    { prompt: "In the story, who liked what, and who didn't? Tap each card to hear it.",
      baskets: [{ label: "liked it" }, { label: "didn't like it" }],
      items: [
        { label: "Mina and the rain", say: "Mina and the rain" },
        { label: "Sam and the rain", say: "Sam and the rain" },
        { label: "Aydin and the dog", say: "Aydin and the dog" },
        { label: "Shirin and the dog", say: "Shirin and the dog" },
        { label: "Yasaman and the loud music", say: "Yasaman and the loud music" },
        { label: "Arash and the loud music", say: "Arash and the loud music" }
      ] },
    { caption: "Do you like the rain? What about dogs? Loud noises? Do you know someone who feels differently from you?",
      tips: [
        "Accept whatever your child says. They don't have to like something that scares them.",
        "Say: \"You love the rain, your brother doesn't. Both are fine.\"",
        "Help them take another person's feeling seriously: \"Loud noises bother Sam. What can we do so he feels okay too?\""
      ] },
    { text: "Ask everyone in your family: \"Do you like the rain? What about dogs? Loud noises?\" See how each person feels. How many were like you?" },
    {}
  ] },

  "feel-sprout-5": { title: "I listen well", steps: [
    { prompt: "Aydin listens",
      scenes: [
        { caption: "Shirin wants to tell Aydin about her day. Aydin wriggles around and looks somewhere else. Shirin feels upset." },
        { caption: "Listening well means: we look at the person with our eyes." },
        { caption: "We hear them with our ears." },
        { caption: "Our body is calm and still." },
        { caption: "We wait until they finish. Then it's our turn to talk. Shirin is happy: Aydin listened well." }
      ] },
    { text: "Now you listen well! Your grown-up tells you something short, and you:",
      list: ["Look at them with your eyes.", "Hear them with your ears.", "Keep your body calm and still.", "Wait until they finish. Then it's your turn."] },
    { text: "The \"What did I say?\" game: one person says three things about their day. The next person repeats one of them. Then swap!" },
    { text: "The sounds game: close your eyes and listen for one minute. How many sounds did you hear? What made them?" },
    { guideLabel: "Feelings in the parents' guide",
      text: "When you listen well, your friend feels they matter to you.",
      tips: [
        "Children learn listening from you. When your child talks, put your phone down, get down to their height and look at them.",
        "Keeping still is hard for a small child. Practise for short times and notice their effort: \"You looked at me so well!\"",
        "Play \"What did I say?\" again at meals or before bed.",
        "If your child often seems not to hear, ask a doctor about checking their hearing."
      ] }
  ] },

  "feel-sprout-6": { title: "Let's play together", steps: [
    { prompt: "Arash wants to play",
      scenes: [
        { caption: "Mina and Sam are playing ball. Arash wants to play too." },
        { caption: "Arash goes up and asks, \"Can I play too?\" Sam says, \"Yes, come on!\"" },
        { caption: "Another day, Mina and Sam say, \"Not now. Our game is for two.\" Arash feels sad." },
        { caption: "Arash finds another game. Shirin is sitting alone. Arash says, \"Let's play together!\"" },
        { caption: "If someone keeps leaving you out again and again, tell a grown-up, like your teacher." }
      ] },
    { caption: "When you want to play with other children, what do you say? If a child was alone, what would you do?",
      tips: [
        "Practise simple sentences together: \"Can I play too?\", \"Come and play with us.\"",
        "Say that children sometimes say \"no\", and it doesn't always mean they don't like you. You can ask again later.",
        "Ask your child if they have ever seen someone alone, and what could have been done for them."
      ] },
    { prompt: "When someone says \"no\", which things help? Tap each one to hear it.",
      baskets: [{ label: "helps" }, { label: "doesn't help" }],
      items: [
        { label: "another game", say: "find another game" },
        { label: "another friend", say: "ask another friend" },
        { label: "later", say: "ask again later" },
        { label: "telling a grown-up", say: "tell a grown-up if it keeps happening" },
        { label: "shouting", say: "shout at them" },
        { label: "spoiling the game", say: "spoil their game" }
      ] },
    { caption: "Has anyone ever said \"no\" to you? How did you feel? What did you do then?",
      tips: [
        "Accept your child's feeling: \"You were upset that they didn't let you play. That's fair.\"",
        "Look for ways together: another game, another friend, ask again later.",
        "If your child says they are left out again and again, listen calmly and talk to their teacher."
      ] },
    { text: "Act it out with your grown-up: one person plays, the other asks \"Can I play too?\". Once answer \"Yes\" and once \"Not now\". Then swap." }
  ] },

  "feel-sprout-7": { title: "I say it with \"I\"", steps: [
    { prompt: "Yasaman says it with \"I\"",
      scenes: [
        { caption: "Yasaman is drawing with her crayons. Her brother takes the crayons without asking and walks off." },
        { caption: "Yasaman is angry. First she takes a slow breath." },
        { caption: "Then she says it with \"I\": \"I felt upset...\"" },
        { caption: "\"...when you took my crayons without asking...\"" },
        { caption: "\"...I want you to ask me first.\"" },
        { caption: "Her brother says, \"Sorry. Can I draw with them too?\" Yasaman says, \"Yes, together!\"" }
      ] },
    { prompt: "Put Yasaman's sentence in order. Tap each card to hear it.",
      items: [
        { label: "I felt upset", say: "I felt upset" },
        { label: "when you took them", say: "when you took my crayons without asking" },
        { label: "I want you to ask", say: "I want you to ask me first" }
      ] },
    { prompt: "Put this sentence in order too.",
      items: [
        { label: "I felt angry", say: "I felt angry" },
        { label: "when you knocked my tower", say: "when you knocked down my tower" },
        { label: "I want you to be careful", say: "I want you to be careful" }
      ] },
    { caption: "Make your own \"I\" sentence: \"I felt ..., when you ..., I want ...\"",
      tips: [
        "Choose a simple moment from your child's life (a brother who took a toy, a friend who pushed in the queue) and help them say the three parts.",
        "If they get stuck, say the first part together: \"I felt ...\" and let them find the name of the feeling.",
        "\"I\" sentences instead of \"You're bad!\" make quarrels smaller, because they say the feeling and the wish instead of blaming."
      ] },
    { caption: "When someone tells you how they feel with \"I\", what do you do?",
      tips: [
        "Practise listening and saying back what the other person said: \"You were upset because...\"",
        "Use \"I\" sentences at home yourself: \"I was worried when you came back late. I want you to let me know.\"",
        "Praise your child's \"I\" sentences and take what they say seriously."
      ] }
  ] },

  "feel-sprout-8": { title: "First I think", steps: [
    { prompt: "Sam thinks first",
      scenes: [
        { caption: "Sam is drawing. Suddenly his pencil breaks! Arash's pencil is on the table." },
        { caption: "Sam stops and thinks: what should I do?" },
        { caption: "If he takes Arash's pencil without asking, what will happen? Arash will be upset." },
        { caption: "If he asks, what will happen? Arash will be happy and say, \"Here you are!\"" },
        { caption: "Sam chooses to ask: \"Can I borrow your pencil?\" Arash says, \"Here you are!\" They are both happy." }
      ] },
    { prompt: "Put the three steps before choosing in order. Tap each card to hear it.",
      items: [
        { label: "I stop", say: "I stop" },
        { label: "I think", say: "I think: what will happen next?" },
        { label: "I choose", say: "I choose" }
      ] },
    { prompt: "What happens after each thing? Tap each one to hear it.",
      baskets: [{ label: "it goes well" }, { label: "someone gets upset" }],
      items: [
        { label: "asking first", say: "asking before taking a friend's pencil" },
        { label: "taking without asking", say: "taking a friend's pencil without asking" },
        { label: "staying close to Mum", say: "staying close to Mum at the market" },
        { label: "running off", say: "running away from Mum at the market" },
        { label: "waiting in the queue", say: "waiting in the queue" },
        { label: "pushing", say: "pushing in the queue" }
      ] },
    { caption: "Remember a time you stopped and thought before doing something. What did you choose? What happened next?",
      tips: [
        "Don't use past mistakes to scold. Ask: \"What else could you do next time?\"",
        "When you see your child stop and think before doing something, name it: \"I saw you thought first. Good thinking!\"",
        "Ask \"What will happen next?\" in everyday moments."
      ] },
    { caption: "The \"What happens next?\" game: the grown-up says something someone does, and you guess what happens next.",
      tips: [
        "Say simple things: \"If we don't tidy the toys...\", \"If you help your friend...\", \"If you go out in the hot sun without a hat...\".",
        "Say both good choices and mistakes, without frightening your child.",
        "Then it's your child's turn to say something and you guess."
      ] }
  ] },

  "feel-sprout-9": { title: "We are all different", steps: [
    { prompt: "The children in our class",
      scenes: [
        { caption: "The children in our class come from different parts of Iran." },
        { caption: "At home, Aydin speaks Turkish, Shirin speaks Kurdish and Mina speaks Arabic. Sam speaks Persian at home. At school they all speak Persian together." },
        { caption: "Each one likes something: Aydin likes football, Shirin drawing, Mina books and Sam music." },
        { caption: "Our height, hair and faces are different too. Nobody is just like anyone else." },
        { caption: "But we all have feelings: we are all sometimes happy, sometimes sad and sometimes worried. And we all like people to be kind to us." },
        { caption: "We are fair and kind to everyone: we let everyone play and we give everyone a turn." }
      ] },
    { prompt: "What did each child like? Match them. Tap each card to hear it.",
      pairs: [
        [{ say: "football" }, { label: "Aydin", say: "Aydin" }],
        [{ say: "drawing" }, { label: "Shirin", say: "Shirin" }],
        [{ say: "books" }, { label: "Mina", say: "Mina" }],
        [{ say: "music" }, { label: "Sam", say: "Sam" }]
      ] },
    { caption: "What language do you speak at home? What do you like that your friend doesn't?",
      tips: [
        "If you speak a language other than Persian at home, be proud of it and teach your child some words.",
        "Talk about differences with curiosity, not mockery: foods, games, clothes, celebrations.",
        "If your child says something that puts someone down, say calmly: \"People are different. We respect everyone.\""
      ] },
    { caption: "In what ways are we the same? How can we be fair to everyone?",
      tips: [
        "Help your child find what we share: we all love to play, we all have feelings, we all like someone to listen to us.",
        "Explain fairness with examples: let everyone play, give everyone a turn, don't leave anyone out because of their language or how they look.",
        "Use books and stories with children from different places."
      ] },
    { text: "Ask a grown-up (a grandmother, grandfather or neighbour): \"When you were little, where did you live and what games did you play?\" You might learn a new game!" }
  ] },

  "feel-sprout-10": { title: "The friendship game", steps: [
    { prompt: "Match each little story with the name of its feeling. Tap each card to hear it.",
      pairs: [
        [{ say: "everyone is looking at her and her face is hot" }, { label: "shy", say: "shy" }],
        [{ say: "tomorrow is his birthday party" }, { label: "excited", say: "excited" }],
        [{ say: "the park trip was called off because of the rain" }, { label: "disappointed", say: "disappointed" }],
        [{ say: "she finished the puzzle all by herself" }, { label: "proud", say: "proud" }],
        [{ say: "his grandpa lives in another city" }, { label: "missing someone", say: "missing someone" }],
        [{ say: "he has nothing to do and time goes slowly" }, { label: "bored", say: "bored" }]
      ] },
    { prompt: "Put the \"I\" sentence in order. Tap each card to hear it.",
      items: [
        { label: "I felt disappointed", say: "I felt disappointed" },
        { label: "when we didn't go to the park", say: "when we didn't go to the park because of the rain" },
        { label: "I want to go tomorrow", say: "I want to go tomorrow" }
      ] },
    { prompt: "Which is a good way to join a game or to invite someone? Tap each card to hear it.",
      baskets: [{ label: "a good way" }, { label: "someone gets upset" }],
      items: [
        { label: "asking", say: "Can I play too?" },
        { label: "inviting", say: "Come and play with us!" },
        { label: "waiting", say: "I'll wait until this round is over." },
        { label: "jumping in", say: "jumping into the game and grabbing the ball" },
        { label: "keeping out", say: "You can't play with us!" }
      ] },
    { prompt: "What happens after each thing? Tap each card to hear it.",
      baskets: [{ label: "it goes well" }, { label: "someone gets upset" }],
      items: [
        { label: "sharing", say: "sharing a snack with a friend" },
        { label: "saying it with \"I\"", say: "saying: I felt upset" },
        { label: "tidying up", say: "tidying up the toys after playing" },
        { label: "making fun", say: "making fun of a child" },
        { label: "knocking down", say: "knocking down a friend's tower" }
      ] },
    { prompt: "For each feeling, what helps? Match them.",
      pairs: [
        [{ label: "disappointed", say: "disappointed" }, { say: "a new plan for tomorrow" }],
        [{ label: "shy", say: "shy" }, { say: "a slow breath and a friend's smile" }],
        [{ label: "bored", say: "bored" }, { say: "finding a new game" }],
        [{ label: "missing someone", say: "missing someone" }, { say: "a call or a drawing for them" }],
        [{ label: "jealous", say: "jealous" }, { say: "telling Mum: I want a hug too" }]
      ] }
  ] },

  "feel-sapling-1": { title: "Two feelings at once", steps: [
    { prompt: "Two feelings, together",
      scenes: [
        { caption: "Today is Arash's first day at a new school." },
        { caption: "Arash feels excited: maybe he'll make new friends!" },
        { caption: "And at the same time he feels a little worried: what if he doesn't know anyone?" },
        { caption: "Both feelings are fine together. Arash takes a slow breath and walks towards the school." },
        { caption: "Shirin's cousin Kian stayed with them for a few days. Now he is going back to his own city." },
        { caption: "Shirin is happy that they played together, and sad that Kian is leaving." },
        { caption: "We can have two feelings at the same time. Both are true." }
      ] },
    { prompt: "Match each moment with the two feelings that come together. Tap each card to hear it.",
      pairs: [
        [{ say: "the first day at a new school" }, { label: "excited and worried", say: "excited and worried" }],
        [{ say: "a guest who is leaving" }, { label: "happy and sad", say: "happy about the good days, sad that they're leaving" }],
        [{ say: "riding a big Ferris wheel" }, { label: "scared and excited", say: "a little scared and very excited" }],
        [{ say: "my friend won the race and I didn't" }, { label: "happy and disappointed", say: "happy for my friend, disappointed for me" }]
      ] },
    { caption: "Have you ever had two feelings at once? When was it? Say the names of both feelings.",
      tips: [
        "Tell your child that two feelings at once is completely normal, and one doesn't cancel out the other.",
        "Give an example of your own: \"When we moved house, I was happy and I also missed our old home.\"",
        "If your child talks about a big change (a move, a goodbye), take both feelings seriously and don't say \"Don't be sad, it'll be fun.\""
      ] },
    { text: "Draw a big heart on paper and split it in two. Colour each half in the colour of one of the two feelings you had together, and tell your grown-up which colour is which feeling." },
    {}
  ] },

  "feel-sapling-2": { title: "Thought, feeling, action", steps: [
    { prompt: "A thought, a feeling, an action",
      scenes: [
        { caption: "In the school yard, Mina waves at Shirin. Shirin doesn't wave back and walks past." },
        { caption: "If Mina thinks, \"She doesn't like me\"..." },
        { caption: "...she feels sad and stands alone in a corner." },
        { caption: "But if she thinks, \"Maybe she didn't see me\"..." },
        { caption: "...she stays calm, goes over and says, \"Hi Shirin!\" Shirin says, \"Hi! I didn't see you at all!\"" },
        { caption: "Our thoughts change how we feel, and our feelings change what we do. We can find a kinder, truer thought." }
      ] },
    { prompt: "What comes first? Put them in order. Tap each card to hear it.",
      items: [
        { label: "a thought", say: "A thought: maybe she didn't see me" },
        { label: "a feeling", say: "A feeling: I stay calm" },
        { label: "an action", say: "An action: I go over and say hello" }
      ] },
    { prompt: "Which thought helps, and which makes me feel worse? Tap each thought to hear it.",
      baskets: [{ label: "helps" }, { label: "makes me feel worse" }],
      items: [
        { label: "maybe she didn't see me", say: "My friend didn't wave. Maybe she didn't see me." },
        { label: "she doesn't like me", say: "My friend didn't wave. She must not like me." },
        { label: "next time I'll practise", say: "My drawing didn't turn out well. Next time I'll practise more." },
        { label: "I can't do anything", say: "My drawing didn't turn out well. I can't do anything." },
        { label: "maybe he laughed at something else", say: "Someone laughed. Maybe they were laughing at something else." },
        { label: "everyone laughs at me", say: "Someone laughed. Everyone laughs at me." }
      ] },
    { caption: "Remember a time you felt upset. What did you think? What could another, kinder and truer thought have been?",
      tips: [
        "Don't push for a forced \"good\" or \"positive\" thought; look for one that is truer and kinder.",
        "Helpful questions: \"How do you know?\", \"What else could the reason be?\", \"What would you say to a friend in this situation?\"",
        "Don't change or deny your child's feeling. First say \"I understand you were upset\", then look at the thoughts together."
      ] },
    { caption: "The \"another thought\" game: the grown-up says an unhelpful thought and you find a helpful one instead.",
      tips: [
        "Say simple thoughts: \"It rained, my day is ruined\", \"The teacher didn't call on me, so she doesn't like me\", \"I lost this game, I'm no good at games\".",
        "Accept any sensible answer. There are several helpful thoughts for each situation.",
        "Then swap so your child says an unhelpful thought for you."
      ] }
  ] },

  "feel-sapling-3": { title: "My calm toolbox", steps: [
    {},
    {},
    {},
    { prompt: "Squeeze and let go: first you squeeze each part of your body, then you let go.",
      parts: [
        { tense: "Make fists with your hands, tight, as if you are squeezing a lemon.", release: "Now let go. Your hands are soft and calm." },
        { tense: "Like a turtle, lift your shoulders up close to your ears.", release: "Now let your shoulders drop. They are calm." },
        { tense: "Curl your toes and make your legs straight and tight.", release: "Now let go. Your legs are heavy and calm." }
      ] },
    { text: "Now write or draw your own calm plan on paper: when I feel a certain way, which tool helps me, and who I can ask for help. You can add other tools too: shaking your body, your calm place, hugging a soft toy, drinking some water.",
      example: "When I'm angry, I can smell the flower and blow the candle.\nWhen I'm worried, I can play \"five things I can see\".\nI can ask Mum or my aunt for help.",
      check: ["Did they write or draw at least two feelings?", "Did they choose one tool for each feeling?", "Did they write the name of at least one grown-up to ask for help?"],
      note: "Read the plan together and put it up where your child can see it. If your child doesn't like a tool, it doesn't need to be in the plan." },
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Now you have your own calm toolbox. Whenever you need it, choose one.",
      tips: [
        "Every child likes different tools. Let your child choose and practise on calm days.",
        "When you see your child is unsettled, ask gently: \"Which of your tools would help right now?\" and do it with them.",
        "Go over the plan together every now and then, and change it if your child wants.",
        "If no tool helps and your child stays unsettled for several weeks, talk to a doctor, the school counsellor or a child psychologist."
      ] }
  ] },

  "feel-sapling-4": { title: "My strengths", steps: [
    { prompt: "Everyone has strengths",
      scenes: [
        { caption: "A strength isn't only a good mark. Everyone has strengths of their own." },
        { caption: "Kian is patient and takes good care of plants. He waters his plant every day and it grows." },
        { caption: "Mina is funny. She tells funny stories and her friends laugh." },
        { caption: "Aydin is kind. He carries Grandma's heavy bag for her." },
        { caption: "Shirin is brave. Even though she was a little scared, she spoke in front of the class." },
        { caption: "What strengths do you have?" }
      ] },
    { prompt: "Match each strength with its picture. Tap each card to hear it.",
      pairs: [
        [{ label: "patient", say: "patient" }, { say: "takes care of a plant" }],
        [{ label: "funny", say: "funny" }, { say: "makes everyone laugh" }],
        [{ label: "kind", say: "kind" }, { say: "helps other people" }],
        [{ label: "brave", say: "brave" }, { say: "tries even when scared" }],
        [{ label: "careful", say: "careful" }, { say: "notices small things" }]
      ] },
    { caption: "What are you good at? What do you like about yourself?",
      tips: [
        "If your child can't think of anything, help with an example: \"Remember how you helped your brother? You're kind.\"",
        "Praise qualities and effort, not being \"clever\" or marks.",
        "Small strengths count too: listening well, drawing cats, fixing a toy."
      ] },
    { text: "Write or draw three of your strengths on paper. Then write one strength of someone in your family too.",
      example: "I am kind.\nI am good at drawing.\nI am patient.\nDad is good at telling stories.",
      check: ["Did they write or draw three of their own strengths?", "Did they write one strength for someone in the family?"],
      note: "If writing is hard, your child can say it and you write. Accept everything and don't correct it." },
    { caption: "Now tell someone in your family one of their strengths. Then they say one of yours.",
      tips: [
        "At dinner or before bed, each person says one strength of the person next to them.",
        "Make it specific: instead of \"You're good\", say \"When I'm upset you hug me; you're kind.\"",
        "Don't compare strengths. Everyone has their own."
      ] }
  ] },

  "feel-sapling-5": { title: "My small goal", steps: [
    { prompt: "Mina's small goal",
      scenes: [
        { caption: "Mina has a small goal: she wants to read a storybook by herself by the end of the week." },
        { caption: "She breaks her goal into small steps: two pages every day." },
        { caption: "Day one and day two: she reads and puts a star each time." },
        { caption: "On day three she is tired and the words are hard. Mina feels disappointed." },
        { caption: "She rests a little. Then she asks Mum for help, and they read those two pages together." },
        { caption: "She keeps going on days four and five. At the end of the week the book is finished! Mina feels proud." }
      ] },
    { prompt: "Put the steps to reach a goal in order. Tap each card to hear it.",
      items: [
        { label: "Choose a goal", say: "Choose a small goal" },
        { label: "Small steps", say: "Break it into small steps" },
        { label: "One step a day", say: "Take one step every day" },
        { label: "Add a star", say: "Put a star for every step" },
        { label: "You did it!", say: "You reached your goal!" }
      ] },
    { caption: "What small goal do you have? Can you break it into a few small steps?",
      tips: [
        "Keep the goal small and doable: one week, not one year. \"Learning to tie my shoelaces\" is better than \"doing everything myself\".",
        "Let your child choose the goal, not you. You help make it doable and clear.",
        "Count the steps together and write one for each day."
      ] },
    { text: "Write your small goal on paper. Underneath, write the steps for each day, and leave a space for a star next to each one.",
      example: "My goal: learning to tie my shoelaces\nDay 1: watch Dad ☆\nDay 2: make one loop ☆\nDay 3: make two loops ☆\nDay 4: pull it tight ☆",
      check: ["Did they write a small, clear goal?", "Did they write at least three steps for it?", "Did they leave a space for a star next to each step?"],
      note: "Put the paper on the wall or the fridge. Each day your child takes a step, let them draw the star themselves." },
    { caption: "When it gets hard halfway, what do you do?",
      tips: [
        "Count the ways together: a short rest, asking for help, making the step smaller, remembering how far you've come.",
        "Missing a day isn't failing. We carry on tomorrow.",
        "At the end, celebrate reaching the goal, even simply: a hug, a big star, an extra story."
      ] }
  ] },

  "feel-sapling-6": { title: "In their shoes", steps: [
    { prompt: "Three steps: I notice, I imagine, I help",
      scenes: [
        { caption: "A new girl has come to the class. Her name is Nika. She stands alone and doesn't talk to anyone." },
        { caption: "Step one: we notice. Shirin sees that Nika is alone." },
        { caption: "Step two: we put ourselves in her place. Shirin thinks, \"If I were her, how would I feel? Alone, and a little sad.\"" },
        { caption: "Step three: we help. Shirin goes over and says, \"Hi! I'm Shirin. Do you want to play with us?\"" },
        { caption: "At home, Arash's little brother lost a game and is crying. Arash sees and thinks, \"Losing is hard.\"" },
        { caption: "Arash goes over, puts his hand on his shoulder and says, \"I understand you're upset. Let's play again together.\"" }
      ] },
    { prompt: "Put the three steps of standing in someone's shoes in order. Tap each card to hear it.",
      items: [
        { label: "I notice", say: "I notice: how do they feel?" },
        { label: "I imagine", say: "I put myself in their place" },
        { label: "I help", say: "I help" }
      ] },
    { prompt: "Which things show we've put ourselves in their shoes? Tap each one to hear it.",
      baskets: [{ label: "in their shoes" }, { label: "they feel worse" }],
      items: [
        { label: "asking how they are", say: "asking: are you okay?" },
        { label: "helping to pick up", say: "helping to pick up spilled pencils" },
        { label: "\"I know it's hard\"", say: "saying: I know it's hard" },
        { label: "inviting to play", say: "inviting the new child to play" },
        { label: "laughing at the loser", say: "laughing at someone who lost" },
        { label: "ignoring", say: "carrying on with my game and not looking at them" }
      ] },
    { caption: "Remember a time someone was upset. If you were them, how would you have felt? What would have helped them?",
      tips: [
        "Practise these three steps with stories and cartoons too: \"How do you think they feel now? What would you want if you were them?\"",
        "Help doesn't have to be big: a question, a smile, sitting next to someone.",
        "When your child shows empathy, name it: \"You saw your brother was upset and went over to him. That's empathy.\""
      ] },
    { caption: "If a new child came to your class or your street, what would you do so they felt better?",
      tips: [
        "Find a few sentences to start with together: \"Hi, my name is ... What's your name?\", \"Do you want to play with us?\"",
        "Remind your child that a new child may have a different language or customs, and that this is a chance to learn."
      ] }
  ] },

  "feel-sapling-7": { title: "No to bullying!", steps: [
    { prompt: "A joke or bullying?",
      scenes: [
        { caption: "Aydin and Sam are joking with each other and they both laugh. This is a joke: both of them enjoy it." },
        { caption: "But some children laugh at Kian every day and won't let him play. Kian is upset, and they keep doing it." },
        { caption: "This is bullying: something done again and again, on purpose, to upset someone." },
        { caption: "Kian says firmly and calmly, \"Stop it!\" and walks away." },
        { caption: "Mina has seen it. She goes over to Kian and stays with him." },
        { caption: "Then they tell the teacher together. If it happens again, they will tell again." }
      ] },
    { prompt: "Is it a joke or bullying? Tap each card to hear it.",
      baskets: [{ label: "a joke" }, { label: "bullying" }],
      items: [
        { label: "both laugh", say: "Two friends joke with each other and both laugh." },
        { label: "said stop, it stopped", say: "When my friend said \"I didn't like that\", I stopped the joke." },
        { label: "a bad name every day", say: "Every day they call a child a bad name." },
        { label: "always left out", say: "They always leave a child out of the game, on purpose." },
        { label: "hiding things", say: "Again and again they hide his things to upset him." }
      ] },
    { prompt: "If bullying happens to me or to someone I see, which things help?",
      baskets: [{ label: "helps" }, { label: "doesn't help" }],
      items: [
        { label: "\"Stop it!\"", say: "saying firmly and calmly: Stop it!" },
        { label: "walking away", say: "walking away" },
        { label: "staying with them", say: "going over and staying with the child who is being bullied" },
        { label: "telling a grown-up", say: "telling a grown-up, and telling again if it happens again" },
        { label: "staying quiet", say: "not telling anyone" },
        { label: "laughing along", say: "laughing with the others" }
      ] },
    { caption: "If someone bothers you again and again, who will you tell? If you see someone being bullied, what will you do?",
      tips: [
        "Listen calmly and believe your child. Don't say \"Just ignore them\" or \"Hit them back\".",
        "Tell your child that telling a grown-up isn't \"telling tales\"; it's asking for help.",
        "Don't call the children who bully \"bad kids\". Say \"It's a bad thing to do\" and focus on the behaviour.",
        "Practise with your child saying \"Stop it!\" in a firm, calm voice and walking away."
      ] },
    { guideLabel: "When a child is worried or unsettled, in the parents' guide",
      text: "Nobody has the right to bother you again and again. You can say \"Stop it\", walk away and tell a grown-up.",
      tips: [
        "Signs that a child may be bullied: not wanting to go to school, lost or broken things, tummy aches in the morning, withdrawing, sleeping badly.",
        "If your child says they are being bullied, thank them, stay calm and talk to the teacher or head teacher. Follow up until you are sure it has stopped.",
        "If your child has bullied someone, talk calmly, ask what happened, and help them make it right. Humiliation and harsh punishment don't help.",
        "If after being bullied your child stays upset, scared or withdrawn, or talks about hurting themselves, talk to the school counsellor or a child psychologist."
      ] }
  ] },

  "feel-sapling-8": { title: "The traffic light", steps: [
    { prompt: "Solving problems with a traffic light",
      scenes: [
        { caption: "Aydin and Mina both want the same ball. They both pull it and get angry." },
        { caption: "Red light: we stop and calm down." },
        { caption: "Yellow light: we say the problem: \"There are two of us and one ball.\" Then we think of ways: taking turns, playing together, or another game." },
        { caption: "Green light: we choose one way and try it. They play ball together." },
        { caption: "Then we see how it went: they're both happy. If it hadn't worked, they would have tried another way." }
      ] },
    { prompt: "Put the traffic-light steps in order. Tap each card to hear it.",
      items: [
        { label: "Stop and calm down", say: "Red: stop and calm down" },
        { label: "Say the problem", say: "Yellow: say the problem" },
        { label: "Think of ways", say: "Yellow: think of ways" },
        { label: "Choose and try", say: "Green: choose one and try it" },
        { label: "See how it went", say: "Green: see how it went" }
      ] },
    { prompt: "Mina's pencil is lost. Put her steps in order.",
      items: [
        { label: "A slow breath", say: "First she takes a slow breath" },
        { label: "\"My pencil is lost\"", say: "She says: my pencil is lost and I need it now" },
        { label: "Ways", say: "She thinks: I could look, ask, or borrow one" },
        { label: "She borrows one", say: "She borrows a pencil from her friend" },
        { label: "It worked!", say: "She looks: it worked! After class she looks for her pencil too" }
      ] },
    { caption: "Tell a small problem from this week. With the traffic light, what ways can you find?",
      tips: [
        "Choose small, real problems: arguing over the TV remote, forgetting homework, whose turn it is in the bath.",
        "At yellow, write down every idea, even the funny ones. Then see together which are doable and fair.",
        "If the chosen way doesn't work, say: \"That's okay. Let's go back to yellow.\""
      ] },
    { caption: "Next time there's a problem at home, someone says \"Red light!\" and everyone goes through the steps together.",
      tips: [
        "Draw a paper traffic light and put it on the fridge.",
        "Use it yourself in grown-up disagreements too, and think out loud so your child sees."
      ] }
  ] },

  "feel-sapling-9": { title: "Making up", steps: [
    { prompt: "A real apology",
      scenes: [
        { caption: "Without looking, Sam spilled the cup of paint water over Arash's drawing. Arash felt upset." },
        { caption: "First Sam takes a slow breath. Then he makes a real apology." },
        { caption: "He says what he did: \"Sorry I spilled the water on your drawing.\"" },
        { caption: "He says how Arash feels: \"I know you're upset; you worked really hard on it.\"" },
        { caption: "He makes it right: \"Let me help you draw a new picture. I'll give you some paper too.\"" },
        { caption: "Arash says, \"Okay, I accept.\" They draw a new picture together and make up." }
      ] },
    { prompt: "Put the steps of a real apology in order. Tap each card to hear it.",
      items: [
        { label: "Saying what I did", say: "I say what I did: sorry I spilled the water" },
        { label: "Saying how they feel", say: "I say how they feel: I know you're upset" },
        { label: "Making it right", say: "I make it right: let me help you" },
        { label: "Making up", say: "They accept and we make up" }
      ] },
    { prompt: "Without looking, Yasaman tore her friend's book. Put her apology in order.",
      items: [
        { label: "\"I tore your book\"", say: "Sorry, I tore your book." },
        { label: "\"You're upset\"", say: "I know you're upset. It was your favourite book." },
        { label: "\"Let's tape it\"", say: "Let's fix it together with tape." },
        { label: "Making up", say: "Her friend says: okay. And they make up." }
      ] },
    { caption: "Have you ever made up with someone? What did you say? What helped you become friends again?",
      tips: [
        "Don't force a \"sorry\". Help your child calm down first and see the other person's feeling; a real apology comes from the heart.",
        "Help with the three parts: what I did, how they feel, how I'll make it right.",
        "When you make a mistake, apologise to your child like this too."
      ] },
    { caption: "When someone apologises to you, what do you say? What if you're still upset?",
      tips: [
        "Accepting an apology means \"Okay, thanks for saying it.\" Your child doesn't have to pretend they're not upset at all any more.",
        "If they're still upset, they can say: \"Thanks. I'm still a bit upset, but we'll play later.\"",
        "If someone bothers them again and again and only says \"sorry\" each time, it's no longer a joke or a mistake; tell a grown-up."
      ] }
  ] },

  "feel-sapling-10": { title: "We work together", steps: [
    { prompt: "Three people, one job",
      scenes: [
        { caption: "Kian, Shirin and Mina want to build a house out of blocks together." },
        { caption: "Everyone has an idea: Kian wants a tall tower, Shirin a house with a window, and Mina a garden." },
        { caption: "They listen to everyone. Every idea is heard." },
        { caption: "They decide together: a house with a tower next to it and a garden! Everyone agrees." },
        { caption: "They share the jobs: Shirin builds the walls of the house, Kian the tower, and Mina the garden." },
        { caption: "Together they made something lovely. Everyone did a part, and everyone is happy." }
      ] },
    { text: "Make something together with your family: a block house, a craft or a simple dish. First everyone says their idea, then share the jobs." },
    { text: "If the ideas don't fit together, try one of these:",
      list: ["Mix the ideas, like the house with a tower and a garden.", "Take turns: this time one person's idea, next time another's.", "Vote, with one vote each."] },
    { text: "At the end, tidy up together. Then say: whose work helped with what?" },
    { guideLabel: "Feelings in the parents' guide",
      text: "When we work together, we listen to everyone, share the jobs and decide together.",
      tips: [
        "In family group work, let your child give ideas and really use them.",
        "Instead of settling arguments yourself, ask: \"How could we have both ideas?\"",
        "Notice each person's work and name it: \"You built the walls, your brother built the tower.\"",
        "Group games with no winner or loser (building, cooking, gardening) are best for practising working together."
      ] }
  ] },

  "feel-sapling-11": { title: "I tell the truth", steps: [
    { prompt: "Telling the truth and keeping promises",
      scenes: [
        { caption: "Aydin was playing ball at home. The ball hit the vase, and the vase fell and broke." },
        { caption: "Aydin was scared. He thought, \"If I tell, maybe I'll get told off.\"" },
        { caption: "But he told Mum the truth: \"Sorry, my ball hit the vase and it broke.\"" },
        { caption: "Mum was upset, but she said, \"Thank you for telling me the truth. I'll pick up the pieces myself; don't touch them.\"" },
        { caption: "Shirin had promised Mina she would bring her book back the next day. She remembered and brought it." },
        { caption: "When we tell the truth and keep our promises, other people trust us." }
      ] },
    { prompt: "Which things build trust, and which take it away? Tap each card to hear it.",
      baskets: [{ label: "builds trust" }, { label: "takes trust away" }],
      items: [
        { label: "telling the truth", say: "saying that I broke the vase" },
        { label: "keeping a promise", say: "bringing my friend's book back on the day I promised" },
        { label: "giving back", say: "giving back something I borrowed" },
        { label: "forgot, made it right", say: "I forgot my promise; I said sorry and made it right the next day" },
        { label: "hiding it", say: "hiding the broken pieces" },
        { label: "\"It wasn't me\"", say: "saying \"It wasn't me\" when it was" }
      ] },
    { caption: "When was telling the truth hard for you? What helped you tell the truth?",
      tips: [
        "When your child tells the truth, thank them first and then talk about what happened. If telling the truth brings harsh punishment, next time they'll hide it.",
        "Separate the act from the child: \"The vase broke\", not \"You're careless\".",
        "Tell the truth yourself when you make a mistake."
      ] },
    { caption: "Have you made a promise to someone? How do you remember to keep it?",
      tips: [
        "Make and ask for small, doable promises. A promise that can't be kept takes trust away.",
        "If your child forgets a promise, help them apologise and make it right.",
        "Keep your own promises to your child too; they learn trust from you."
      ] },
    { guideLabel: "Feelings in the parents' guide",
      text: "Telling the truth is sometimes hard, but it builds trust. Grown-ups are glad when you tell the truth.",
      tips: [
        "Children this age sometimes lie out of fear. Stay calm and make telling the truth safe.",
        "Instead of \"Why did you lie?\" ask: \"What happened? Let's fix it together.\"",
        "Harsh punishment and humiliation lead to more lying; a small, sensible consequence (helping to make it right) helps more.",
        "Keep breakable and dangerous things out of reach and pick up broken pieces yourself."
      ] }
  ] },

  "feel-sapling-12": { title: "The problem-solving game", steps: [
    { prompt: "Two children and one swing. Put the traffic-light steps in order.",
      items: [
        { label: "Stop and calm down", say: "Red: we stop and calm down" },
        { label: "\"Two of us, one swing\"", say: "Yellow: we say the problem: two of us and one swing" },
        { label: "Ways", say: "Yellow: taking turns, pushing each other, or another game" },
        { label: "Taking turns", say: "Green: we try taking turns" },
        { label: "See how it went", say: "Green: we see how it went" }
      ] },
    { prompt: "Which thought helps? Tap each thought to hear it.",
      baskets: [{ label: "helps" }, { label: "makes me feel worse" }],
      items: [
        { label: "next time will be better", say: "I lost the race. Next time will be better." },
        { label: "I always lose", say: "I lost the race. I always lose." },
        { label: "maybe she was busy", say: "My friend didn't answer. Maybe she was busy." },
        { label: "nobody likes me", say: "My friend didn't answer. Nobody likes me." }
      ] },
    { prompt: "Is it a joke or bullying? Tap each card to hear it.",
      baskets: [{ label: "a joke" }, { label: "bullying" }],
      items: [
        { label: "both laugh", say: "We joke together and we're both happy." },
        { label: "mocked every day", say: "Every day they make fun of his clothes to upset him." },
        { label: "always left out", say: "On purpose, they always leave her out of the group." },
        { label: "said stop, it stopped", say: "When he said \"I don't like it\", we didn't do it again." }
      ] },
    { prompt: "Without looking, Kian knocked down his friend's tower. Put his apology in order.",
      items: [
        { label: "\"I knocked your tower down\"", say: "Sorry, I knocked your tower down." },
        { label: "\"You're upset\"", say: "I know you're upset." },
        { label: "\"Let's build it together\"", say: "Let's build it again together." },
        { label: "Making up", say: "His friend accepts and they make up." }
      ] },
    { prompt: "Match each problem with a good way to solve it.",
      pairs: [
        [{ say: "two children and one ball" }, { say: "let's take turns" }],
        [{ say: "my pencil is lost" }, { say: "borrow one from my friend" }],
        [{ say: "I knocked down my friend's tower" }, { say: "say sorry and build it together" }],
        [{ say: "a child is alone" }, { say: "invite them to play with us" }]
      ] }
  ] }
});

/* Practice generators (js/practice/feel.js): the same keys as their Persian words. */
Object.assign(B.EN, {
  "feel-any-p1": { title: "Today I feel…", words: {
    replies: {
      happy: "That's great! Thank you for telling me.",
      calm: "How nice that you feel calm. Thank you for telling me.",
      sad: "Thank you for telling me. It's okay to feel sad. Maybe a hug, or talking to someone you love, will help.",
      angry: "Thank you for telling me. It's okay to feel angry. First, let's breathe slowly.",
      worried: "Thank you for telling me. Worry is a hard feeling. You can tell a grown-up you love.",
      scared: "Thank you for telling me. You're not alone. Tell a grown-up you love.",
      unsure: "That's okay. Sometimes we don't know how we feel."
    }
  } },

  "feel-any-p2": { title: "A calm minute", words: {
    ask: "Which one would you like? Choose one.",
    names: { flower: "Flower and candle breathing", box: "Box breathing", ground: "Five things I can see", shake: "Shaking my body", place: "My calm place", relax: "Squeeze and let go", tell: "Telling a grown-up" },
    relax: "Squeeze and let go: first you squeeze each part of your body, then you let go.",
    parts: [
      { tense: "Make fists with your hands, tight, as if you are squeezing a lemon.", release: "Now let go. Your hands are soft and calm." },
      { tense: "Like a turtle, lift your shoulders up close to your ears.", release: "Now let your shoulders drop. They are calm." },
      { tense: "Scrunch up your face, like a mouse wrinkling its nose.", release: "Now let your face go. It is soft and calm." }
    ],
    shake: "Shake your body:",
    shakeList: ["Shake your hands like a wet kitten: shake, shake, shake!", "Stretch tall like a tree, then slowly come down.", "Butterfly hug: cross your arms over your chest and tap slowly, one side at a time, ten times."],
    place: "Close your eyes and go to your calm place. What do you see there? What can you hear? What can you smell? Take three slow breaths, then open your eyes.",
    tell: "Go to a grown-up you love and tell them how you feel. You can say: \"Can you stay with me for a bit?\""
  } },

  "feel-any-p3": { title: "I want to feel calm", words: {
    ask: "Which one would you like? Choose one.",
    names: { flower: "Flower and candle breathing", box: "Box breathing", ground: "Five things I can see", shake: "Shaking my body", place: "My calm place", relax: "Squeeze and let go", tell: "Telling a grown-up" },
    relax: "Squeeze and let go: first you squeeze each part of your body, then you let go.",
    parts: [
      { tense: "Make fists with your hands, tight, as if you are squeezing a lemon.", release: "Now let go. Your hands are soft and calm." },
      { tense: "Like a turtle, lift your shoulders up close to your ears.", release: "Now let your shoulders drop. They are calm." },
      { tense: "Scrunch up your face, like a mouse wrinkling its nose.", release: "Now let your face go. It is soft and calm." }
    ],
    shake: "Shake your body:",
    shakeList: ["Shake your hands like a wet kitten: shake, shake, shake!", "Stretch tall like a tree, then slowly come down.", "Butterfly hug: cross your arms over your chest and tap slowly, one side at a time, ten times."],
    place: "Close your eyes and go to your calm place. What do you see there? What can you hear? What can you smell? Take three slow breaths, then open your eyes.",
    tell: "Go to a grown-up you love and tell them how you feel. You can say: \"Can you stay with me for a bit?\""
  } },

  "feel-seed-p1": { title: "Faces and stories", words: {
    pairsAsk: "Match each face with what happened. Tap each card to hear it.",
    sortAsk: "Which things are kind? Tap each one to hear it.",
    kind: "kind", hurt: "someone gets upset",
    faces: { "😊": "happy", "😢": "sad", "😠": "angry", "😟": "worried", "😨": "scared", "😌": "calm" },
    sits: {
      cake: "it's their birthday party", gift: "they got a present", park: "they went to the park", grandma: "Grandma came to visit",
      balloon: "their balloon flew away", icecream: "their ice cream fell", friendgone: "their friend went home",
      tower: "someone knocked down their tower", toytaken: "someone took their car", school: "tomorrow is the first day of school", lostbear: "they can't find their teddy",
      thunder: "there was a loud clap of thunder", bigdog: "they saw a big dog", story: "a bedtime story in bed", bath: "a warm bath", helped: "they helped Mum and Mum said \"Thank you\""
    },
    acts: { hug: "hugging a sad friend", help: "helping to build a tower", share: "sharing a snack", wait: "waiting for my turn",
      invite: "inviting a child who is alone to play", sorry: "saying \"sorry\" when I made a mistake",
      grab: "grabbing a toy from someone", leaveout: "not letting a child play", laugh: "laughing at someone who is crying", push: "pushing in the queue" }
  } },

  "feel-sprout-p1": { title: "Feeling words", words: {
    ask: "Match each little story with the name of its feeling. Tap each card to hear it.",
    names: { happy: "happy", sad: "sad", angry: "angry", worried: "worried", scared: "scared", calm: "calm", shy: "shy", excited: "excited",
      disappointed: "disappointed", jealous: "jealous", proud: "proud", missing: "missing someone", bored: "bored" },
    sits: {
      w1: "it's their birthday party", w2: "they're playing with a friend in the park", w3: "the wind took their balloon", w4: "their ice cream fell",
      w5: "someone knocked down their tower", w6: "their brother scribbled on their drawing", w7: "tomorrow is the first day of school", w8: "they can't find their teddy",
      w9: "there was a loud clap of thunder", w10: "a big dog came close", w11: "Mum is reading them a story", w12: "they're smelling flowers in the garden",
      w13: "they have to say a poem in front of everyone", w14: "they're in a new class and don't know anyone", w15: "tomorrow they're going on a trip", w16: "they're waiting to open a present",
      w17: "they wanted to go to the park, but it rained", w18: "they practised a lot, but didn't win the race", w19: "Mum keeps holding the little baby", w20: "their friend has a new bike and they don't",
      w21: "they worked hard and finished a drawing", w22: "they did the puzzle all by themselves",
      w23: "their friend moved to another city", w24: "they haven't seen Grandpa for a long time", w25: "they have nothing to do and time goes slowly", w26: "they've been at home all day with nothing to do"
    }
  } },

  "feel-sprout-p2": { title: "What could I do?", words: {
    help: "helps", nohelp: "doesn't help", good: "it goes well", hurt: "someone gets upset",
    choiceAsk: "What happens after each thing? Tap each card to hear it.",
    sits: {
      tower: "Your tower fell and you're very upset. Which things help?", lost: "Your pencil is lost. Which things help?",
      rain: "You wanted to go to the park, but it rained. Which things help?", leftout: "The children said \"Not now\". Which things help?",
      hard: "The puzzle is very hard. Which things help?"
    },
    acts: { breathe: "a few slow breaths", sayIt: "saying my feeling in words", rebuild: "building it again", askHelp: "asking a grown-up for help",
      throw: "throwing things", shout: "shouting", look: "looking carefully", ask: "asking other people", borrow: "borrowing one from a friend",
      cry: "screaming and not looking", grabOther: "taking someone else's pencil without asking", indoorGame: "finding a game at home",
      planTomorrow: "making a plan for tomorrow", kick: "kicking the door", sulk: "sulking with everyone", otherGame: "another game",
      otherFriend: "playing with another friend", askLater: "asking again later", spoil: "spoiling their game",
      tryAgain: "trying again", giveUp: "saying \"I'll never be able to\" and giving up",
      askBorrow: "asking before taking a friend's pencil", takePencil: "taking a friend's pencil without asking", stayClose: "staying close to Mum at the market",
      runOff: "running away from Mum at the market", waitLine: "waiting in the queue", pushLine: "pushing in the queue", tidy: "tidying up the toys", mock: "making fun of a child" }
  } },

  "feel-sapling-p1": { title: "Another thought", words: {
    help: "helps", worse: "makes me feel worse",
    sits: { wave: "Your friend didn't wave back. Which thought helps?", drawing: "Your drawing didn't turn out the way you wanted. Which thought helps?",
      laugh: "When you came into the classroom, someone laughed. Which thought helps?", race: "You came second to last in the race. Which thought helps?",
      teacher: "The teacher didn't call on you today. Which thought helps?", rainday: "It rained and the plan to go out was cancelled. Which thought helps?" },
    thoughts: {
      t1: "Maybe she didn't see me.", t2: "I'll go and say hello myself.", t3: "She must not like me.", t4: "Nobody is my friend.",
      t5: "Next time I'll practise more.", t6: "I like some parts of it.", t7: "I can't do anything.", t8: "I always ruin everything.",
      t9: "Maybe they laughed at something else.", t10: "I can ask what happened.", t11: "Everyone laughs at me.", t12: "I don't want to come to class any more.",
      t13: "If I practise, next time will be better.", t14: "I love running, even if I don't win.", t15: "I always lose.", t16: "I'll never race again.",
      t17: "There wasn't much time today; maybe tomorrow.", t18: "I can put my hand up and ask.", t19: "The teacher doesn't like me.", t20: "What I say doesn't matter.",
      t21: "We'll find a good game at home.", t22: "We'll go tomorrow.", t23: "My day is completely ruined.", t24: "I'm always unlucky."
    }
  } },

  "feel-sapling-p2": { title: "Problems", words: {
    ask: "{p} Put the traffic-light steps in order.",
    sorryAsk: "{p} Put the apology in order.",
    red: "Stop and calm down", see: "See how it went",
    probs: {
      ball: ["Two children and one ball.", "\"There are two of us and one ball.\"", "Take turns, play together, or another game", "They play together"],
      pencil: ["Your pencil is lost.", "\"My pencil is lost and I need it.\"", "Look, ask, or borrow one", "I borrow one from my friend"],
      swing: ["Two children and one swing.", "\"There are two of us and one swing.\"", "Take turns, push each other, or another game", "We take turns on it"],
      tv: ["You and your sister want two different programmes.", "\"We each want a different programme.\"", "Take turns, one today and one tomorrow, or play together", "Her programme today, mine tomorrow"],
      promise: ["Your friend forgot a promise.", "\"You promised and you forgot. I felt upset.\"", "Ask what happened, choose another day", "We make a new plan"],
      game: ["You both want to choose the game.", "\"We each want a different game.\"", "Vote, take turns, or two games one after the other", "First her game, then mine"]
    },
    sorries: {
      spill: ["You spilled water on your friend's drawing.", "\"Sorry, I spilled water on your drawing.\"", "\"I know you're upset.\"", "\"Let me help you draw it again.\""],
      tower: ["Without looking, you knocked down your brother's tower.", "\"Sorry, I knocked down your tower.\"", "\"I know you worked hard on it.\"", "\"Let's build it again together.\""],
      book: ["You tore your friend's book.", "\"Sorry, I tore your book.\"", "\"I know it was your favourite book.\"", "\"Let's fix it with tape.\""],
      late: ["You forgot a play date with your friend.", "\"Sorry, I forgot our play date.\"", "\"I know you were waiting for me.\"", "\"I'll come early tomorrow.\""]
    },
    makeUp: "Making up"
  } }
});

/* Practice generators made from shared data (feel-seed-p3…, js/practice/feel.js). */
Object.assign(B.EN, {
 "feel-seed-p3": {
  "title": "Step by step",
  "words": {
   "turtle.v0": "The rabbit got angry because someone took his ball. Put the turtle's steps in order.",
   "turtle.v1": "The kitten got angry because her tower fell. Put the turtle's steps in order.",
   "turtle.v2": "Arash got upset because it wasn't his turn. Put the turtle's steps in order.",
   "turtle.s0": "Stop",
   "turtle.s1": "Go into your shell",
   "turtle.s2": "Three slow breaths",
   "turtle.s3": "Come out and say how you feel",
   "turn.v0": "One swing and two children. Put taking turns in order.",
   "turn.v1": "One ball and two children. Put taking turns in order.",
   "turn.v2": "One toy car and two children. Put taking turns in order.",
   "turn.s0": "I ask: when is my turn?",
   "turn.s1": "I wait and count",
   "turn.s2": "It's my turn and I play",
   "turn.s3": "Then I give it to my friend",
   "bye.v0": "Mum is going to work. Put the goodbye in order.",
   "bye.v1": "Dad is going shopping. Put the goodbye in order.",
   "bye.v2": "Grandma is going back home. Put the goodbye in order.",
   "bye.s0": "A hug",
   "bye.s1": "Waving",
   "bye.s2": "\"See you later!\"",
   "bye.s3": "Playing until they come back",
   "again.v0": "Shirin wants to put her shoes on by herself. Put what she does in order.",
   "again.v1": "Aydin wants to do up his button by himself. Put what he does in order.",
   "again.v2": "Mina wants to put her socks on by herself. Put what she does in order.",
   "again.s0": "Tries",
   "again.s1": "It's hard. It didn't work!",
   "again.s2": "Takes a slow breath",
   "again.s3": "Tries again or asks for help",
   "again.s4": "\"I did it myself!\""
  }
 },
 "feel-seed-p4": {
  "title": "What helps?",
  "words": {
   "angry.ask": "When we are angry, which things help? Tap each one to hear it.",
   "angry.b0": "helps",
   "angry.b1": "someone gets upset",
   "angry.i0": "stopping like a turtle",
   "angry.i1": "three slow breaths",
   "angry.i2": "saying \"I'm angry\"",
   "angry.i3": "hugging a soft toy",
   "angry.i4": "hitting",
   "angry.i5": "throwing things",
   "angry.i6": "shouting",
   "wait.ask": "When I'm waiting for my turn, which things are good? Tap each one to hear it.",
   "wait.b0": "a good thing",
   "wait.b1": "someone gets upset",
   "wait.i0": "counting",
   "wait.i1": "singing",
   "wait.i2": "clapping for my friend",
   "wait.i3": "asking \"When is my turn?\"",
   "wait.i4": "grabbing the toy",
   "wait.i5": "pushing my friend",
   "friend.ask": "Your friend is sad. Which things are kind? Tap each one to hear it.",
   "friend.b0": "kind",
   "friend.b1": "makes them sadder",
   "friend.i0": "giving a hug",
   "friend.i1": "helping",
   "friend.i2": "sharing my snack",
   "friend.i3": "asking \"What happened?\"",
   "friend.i4": "laughing at them",
   "friend.i5": "ignoring them",
   "jobs.ask": "Which jobs can you do, and which are for grown-ups? Tap each one to hear it.",
   "jobs.b0": "my job",
   "jobs.b1": "grown-ups' job",
   "jobs.i0": "taking the spoons to the sofreh",
   "jobs.i1": "watering a plant",
   "jobs.i2": "pairing the shoes",
   "jobs.i3": "tidying the toys",
   "jobs.i4": "putting socks in the basket",
   "jobs.i5": "lighting the stove",
   "jobs.i6": "cutting with a knife",
   "jobs.i7": "pouring hot tea",
   "jobs.i8": "giving medicine",
   "miss.ask": "When you miss Mum, which things help? Tap each one to hear it.",
   "miss.b0": "helps",
   "miss.b1": "doesn't help",
   "miss.i0": "playing with Grandma",
   "miss.i1": "drawing a picture for Mum",
   "miss.i2": "saying \"I miss her\"",
   "miss.i3": "a slow breath",
   "miss.i4": "hiding and not talking",
   "miss.i5": "breaking toys",
   "hard.ask": "When something is hard, which things help? Tap each one to hear it.",
   "hard.b0": "helps",
   "hard.b1": "doesn't help",
   "hard.i0": "trying again",
   "hard.i1": "a slow breath",
   "hard.i2": "saying \"Can you help me, please?\"",
   "hard.i3": "going slowly",
   "hard.i4": "throwing things",
   "hard.i5": "giving up: \"I'll never be able to\""
  }
 },
 "feel-seed-p5": {
  "title": "What do I say?",
  "words": {
   "names.ask": "Match each face with the name of its feeling. Tap each card to hear it.",
   "names.a0": "happy",
   "names.z0": "happy",
   "names.a1": "sad",
   "names.z1": "sad",
   "names.a2": "angry",
   "names.z2": "angry",
   "names.a3": "worried",
   "names.z3": "worried",
   "names.a4": "scared",
   "names.z4": "scared",
   "names.a5": "calm",
   "names.z5": "calm",
   "say.ask": "What can we say in each moment? Match them. Tap each card to hear it.",
   "say.a0": "when you are angry",
   "say.z0": "\"I'm angry.\"",
   "say.a1": "when you want a turn",
   "say.z1": "\"When is my turn?\"",
   "say.a2": "when your friend's tower fell",
   "say.z2": "\"Let me help you.\"",
   "say.a3": "when someone helped you",
   "say.z3": "\"Thank you for helping me.\"",
   "say.a4": "when Mum goes to work",
   "say.z4": "\"See you this evening!\"",
   "say.a5": "when something is hard",
   "say.z5": "\"Can you help me, please?\"",
   "say.a6": "when you finished something yourself",
   "say.z6": "\"I did it myself!\"",
   "say.a7": "when you broke something by accident",
   "say.z7": "\"Sorry.\""
  }
 },
 "feel-sprout-p3": {
  "title": "What do I say?",
  "words": {
   "help.ask": "For each feeling, what helps? Match them. Tap each card to hear it.",
   "help.a0": "disappointed",
   "help.z0": "a new plan for tomorrow",
   "help.a1": "shy",
   "help.z1": "a slow breath and a friend's smile",
   "help.a2": "bored",
   "help.z2": "finding a new game",
   "help.a3": "missing someone",
   "help.z3": "a call or a drawing for them",
   "help.a4": "jealous",
   "help.z4": "saying \"I want a hug too\"",
   "help.a5": "excited",
   "help.z5": "a few slow breaths so I can wait",
   "say.ask": "What can we say in each moment? Match them. Tap each card to hear it.",
   "say.a0": "your pencil is lost and you're a little upset",
   "say.z0": "\"Have you seen my pencil?\"",
   "say.a1": "you can't ride a bike yet",
   "say.z1": "\"I can't yet. I'll practise.\"",
   "say.a2": "your friend doesn't like the rain and you do",
   "say.z2": "\"That's okay. Everyone is different.\"",
   "say.a3": "your friend is talking",
   "say.z3": "\"Go on, I'm listening.\"",
   "say.a4": "you want to join a game",
   "say.z4": "\"Can I play too?\"",
   "say.a5": "a child is standing alone",
   "say.z5": "\"Come and play with us!\"",
   "say.a6": "you need your friend's pencil",
   "say.z6": "\"Can I borrow it?\"",
   "say.a7": "a new child came from another city",
   "say.z7": "\"Hi! My name is … What's your name?\""
  }
 },
 "feel-sprout-p4": {
  "title": "Step by step",
  "words": {
   "big.v0": "Your brother scribbled on your drawing and you're very angry. Put the steps in order.",
   "big.v1": "Your friend broke your toy and you're very upset. Put the steps in order.",
   "big.s0": "I stop",
   "big.s1": "I take a few slow breaths",
   "big.s2": "I ask a grown-up for help",
   "big.s3": "My feeling slowly gets smaller",
   "yet.v0": "Nika is learning to ride a bike. Put it in order.",
   "yet.v1": "Kian is learning to swim. Put it in order.",
   "yet.v2": "Mina is learning to tie her shoelaces. Put it in order.",
   "yet.s0": "Tries",
   "yet.s1": "It doesn't work",
   "yet.s2": "Says \"I can't yet\"",
   "yet.s3": "Practises every day",
   "yet.s4": "Learns it!",
   "listen.v0": "Shirin is telling about her day. Put listening well in order.",
   "listen.v1": "Grandma is telling a story. Put listening well in order.",
   "listen.s0": "I look at them",
   "listen.s1": "I listen",
   "listen.s2": "I keep my body still",
   "listen.s3": "I wait until they finish",
   "listen.s4": "Now it's my turn",
   "join.v0": "The children are playing ball and you want to play too. Put it in order.",
   "join.v1": "The children are building a block tower and you want to play too. Put it in order.",
   "join.s0": "I watch what game it is",
   "join.s1": "I ask \"Can I play too?\"",
   "join.s2": "I listen to their answer",
   "join.s3": "If they say no, I find another game",
   "i.v0": "Your brother took your crayons without asking. Put the \"I\" sentence in order.",
   "i.v0.s0": "I felt upset",
   "i.v0.s1": "when you took my crayons without asking",
   "i.v0.s2": "I want you to ask me first",
   "i.v1": "Your friend pushed you in the queue. Put the \"I\" sentence in order.",
   "i.v1.s0": "I felt angry",
   "i.v1.s1": "when you pushed me in the queue",
   "i.v1.s2": "I want you to be careful",
   "i.v2": "Your friend came late to play. Put the \"I\" sentence in order.",
   "i.v2.s0": "I felt disappointed",
   "i.v2.s1": "when you came late",
   "i.v2.s2": "I want you to come on time next time",
   "i.v3": "Your sister interrupted you. Put the \"I\" sentence in order.",
   "i.v3.s0": "I felt upset",
   "i.v3.s1": "when you talked while I was talking",
   "i.v3.s2": "I want you to wait until I finish",
   "think.v0": "Sam's pencil broke and Arash's pencil is on the table. Put it in order.",
   "think.v1": "At the market Mina sees a toy, and her mum is over there. Put it in order.",
   "think.s0": "I stop",
   "think.s1": "I think: what will happen next?",
   "think.s2": "I choose the good thing",
   "think.s3": "Afterwards everyone is happy"
  }
 },
 "feel-sprout-p5": {
  "title": "Everyone is different",
  "words": {
   "same.ask": "In this story, who liked it and who didn't? Tap each card to hear it.",
   "same.b0": "liked it",
   "same.b1": "didn't like it",
   "same.i0": "Mina jumped in the rain and laughed",
   "same.i1": "In the rain, Sam wanted to go home quickly",
   "same.i2": "Aydin stroked the dog",
   "same.i3": "Shirin went behind Dad",
   "same.i4": "Yasaman danced to the loud music",
   "same.i5": "Arash covered his ears",
   "same.i6": "Kian happily ate the spicy food",
   "same.i7": "Nika didn't eat the spicy food",
   "same.i8": "Sam rode the big wheel and laughed",
   "same.i9": "Mina preferred to stay down",
   "share.ask": "Which things are the same in all of us, and which are different? Tap each card to hear it.",
   "share.b0": "the same in all of us",
   "share.b1": "different between us",
   "share.i0": "we all have feelings",
   "share.i1": "we all like to play",
   "share.i2": "we all like people to be kind to us",
   "share.i3": "the language we speak at home",
   "share.i4": "our favourite food",
   "share.i5": "how tall we are",
   "share.i6": "what we like doing most"
  }
 },
 "feel-sprout-p6": {
  "title": "Kind words",
  "words": {
   "feel.ask": "Your friend is scared of dogs. Which words are kind? Tap each card to hear it.",
   "feel.b0": "kind",
   "feel.b1": "upsets them",
   "feel.i0": "\"That's okay. Let's go this way together.\"",
   "feel.i1": "\"Hold my hand.\"",
   "feel.i2": "\"Scaredy-cat!\"",
   "feel.i3": "\"That's nothing to be scared of!\"",
   "listen.ask": "Which things mean I'm listening well? Tap each card to hear it.",
   "listen.b0": "listening well",
   "listen.b1": "not listening",
   "listen.i0": "looking at the person talking",
   "listen.i1": "waiting until they finish",
   "listen.i2": "asking \"What happened next?\"",
   "listen.i3": "watching TV",
   "listen.i4": "talking while they talk",
   "listen.i5": "jumping around",
   "join.ask": "Which words bring someone into the game, and which leave them out? Tap each card to hear it.",
   "join.b0": "brings them in",
   "join.b1": "leaves them out",
   "join.i0": "\"Come and play with us!\"",
   "join.i1": "\"When this round ends, you come too.\"",
   "join.i2": "\"Do you want to go first?\"",
   "join.i3": "\"You can't come.\"",
   "join.i4": "pretending we didn't see them",
   "i.ask": "Which sentences use \"I\", and which blame? Tap each card to hear it.",
   "i.b0": "with \"I\"",
   "i.b1": "blaming",
   "i.i0": "\"I felt upset when you knocked down my tower.\"",
   "i.i1": "\"I want you to ask me first.\"",
   "i.i2": "\"I felt disappointed when you came late.\"",
   "i.i3": "\"You're bad!\"",
   "i.i4": "\"You always ruin everything!\"",
   "fair.ask": "Which things are fair? Tap each card to hear it.",
   "fair.b0": "fair",
   "fair.b1": "unfair",
   "fair.i0": "giving everyone a turn",
   "fair.i1": "letting the new child play",
   "fair.i2": "listening to someone who speaks another language too",
   "fair.i3": "laughing at someone's accent",
   "fair.i4": "not letting someone play because they look different"
  }
 },
 "feel-sapling-p3": {
  "title": "In their place",
  "words": {
   "two.ask": "Match each moment with the two feelings that come together. Tap each card to hear it.",
   "two.a0": "the first day at a new school",
   "two.z0": "excited and worried",
   "two.a1": "a guest who is leaving",
   "two.z1": "happy and sad",
   "two.a2": "riding a big wheel",
   "two.z2": "scared and excited",
   "two.a3": "my friend won and I didn't",
   "two.z3": "happy and disappointed",
   "two.a4": "moving to a new home",
   "two.z4": "excited and missing the old one",
   "two.a5": "a little sister being born",
   "two.z5": "happy and a little jealous",
   "strong.ask": "Match each strength with an example of it. Tap each card to hear it.",
   "strong.a0": "patient",
   "strong.z0": "waters his plant every day until it grows",
   "strong.a1": "funny",
   "strong.z1": "tells a story and everyone laughs",
   "strong.a2": "kind",
   "strong.z2": "carries Grandma's bag for her",
   "strong.a3": "brave",
   "strong.z3": "speaks in front of the class though scared",
   "strong.a4": "careful",
   "strong.z4": "notices small things others miss",
   "strong.a5": "a good listener",
   "strong.z5": "listens well when a friend is upset",
   "place.ask": "If you were them, how would you feel? Match them. Tap each card to hear it.",
   "place.a0": "a new child who knows nobody",
   "place.z0": "lonely and a little worried",
   "place.a1": "a little brother who lost a game",
   "place.z1": "disappointed and sad",
   "place.a2": "a friend whose drawing was ruined",
   "place.z2": "upset",
   "place.a3": "a friend who got a present",
   "place.z3": "happy",
   "place.a4": "a child who dropped all their pencils",
   "place.z4": "flustered and a little embarrassed"
  }
 },
 "feel-sapling-p4": {
  "title": "Which group?",
  "words": {
   "calm.ask": "Which things calm me down? Tap each card to hear it.",
   "calm.b0": "calms me",
   "calm.b1": "makes me more upset",
   "calm.i0": "flower and candle breathing",
   "calm.i1": "box breathing",
   "calm.i2": "five things I can see",
   "calm.i3": "squeeze and let go",
   "calm.i4": "talking to a grown-up",
   "calm.i5": "shouting at everyone",
   "calm.i6": "slamming the door",
   "calm.i7": "throwing things",
   "strong.ask": "Which is a strength, and which is just something we have? Tap each card to hear it.",
   "strong.b0": "a strength",
   "strong.b1": "something I have",
   "strong.i0": "being kind",
   "strong.i1": "being brave",
   "strong.i2": "being patient",
   "strong.i3": "listening well",
   "strong.i4": "new shoes",
   "strong.i5": "a tablet",
   "strong.i6": "lots of toys",
   "goal.ask": "When reaching my goal gets hard, which things help? Tap each card to hear it.",
   "goal.b0": "helps",
   "goal.b1": "doesn't help",
   "goal.i0": "a short rest",
   "goal.i1": "asking for help",
   "goal.i2": "making the step smaller",
   "goal.i3": "looking at the stars I've earned",
   "goal.i4": "giving up on everything",
   "goal.i5": "saying \"I'll never be able to\"",
   "empathy.ask": "Which things show we've put ourselves in their place? Tap each card to hear it.",
   "empathy.b0": "in their place",
   "empathy.b1": "makes them feel worse",
   "empathy.i0": "asking \"Are you okay?\"",
   "empathy.i1": "helping pick up spilled pencils",
   "empathy.i2": "saying \"I know it's hard\"",
   "empathy.i3": "laughing at someone who lost",
   "empathy.i4": "not looking and carrying on with my game",
   "bully.ask": "Is it a joke or bullying? Tap each card to hear it.",
   "bully.b0": "a joke",
   "bully.b1": "bullying",
   "bully.i0": "we both laugh and we're happy",
   "bully.i1": "he said \"I don't like it\" and we stopped",
   "bully.i2": "every day they call him a bad name",
   "bully.i3": "on purpose they always leave her out",
   "bully.i4": "again and again they hide his things to upset him",
   "light.ask": "Which light does each step belong to: red or green? Tap each card to hear it.",
   "light.b0": "red: stop and calm down",
   "light.b1": "green: choose and try",
   "light.i0": "stopping",
   "light.i1": "a few slow breaths",
   "light.i2": "waiting a bit until I'm calm",
   "light.i3": "choosing a way",
   "light.i4": "trying it",
   "light.i5": "seeing how it went",
   "sorry.ask": "Which is a real apology? Tap each card to hear it.",
   "sorry.b0": "a real apology",
   "sorry.b1": "not a real apology",
   "sorry.i0": "\"Sorry I spilled water on your drawing.\"",
   "sorry.i1": "\"Sorry. Let me help you draw it again.\"",
   "sorry.i2": "\"I know you're upset. I'm sorry.\"",
   "sorry.i3": "\"Sorry, okay? Drop it!\"",
   "sorry.i4": "\"It was your own fault.\"",
   "team.ask": "Which things are good for working in a group? Tap each card to hear it.",
   "team.b0": "good teamwork",
   "team.b1": "makes teamwork hard",
   "team.i0": "listening to everyone's idea",
   "team.i1": "mixing the ideas",
   "team.i2": "voting when we disagree",
   "team.i3": "sharing the jobs",
   "team.i4": "only my own idea",
   "team.i5": "not listening to the others",
   "trust.ask": "Which things build trust? Tap each card to hear it.",
   "trust.b0": "builds trust",
   "trust.b1": "takes trust away",
   "trust.i0": "saying \"I broke the vase\"",
   "trust.i1": "keeping my promise",
   "trust.i2": "giving back what I borrowed",
   "trust.i3": "hiding the broken pieces",
   "trust.i4": "saying \"It wasn't me\" when it was"
  }
 },
 "feel-sapling-p5": {
  "title": "Step by step",
  "words": {
   "tfa.v0": "Your friend didn't wave. Put it in order.",
   "tfa.v0.s0": "Thought: \"Maybe she didn't see me\"",
   "tfa.v0.s1": "Feeling: I stay calm",
   "tfa.v0.s2": "Action: I go over and say hello",
   "tfa.v1": "Your drawing didn't turn out well. Put it in order.",
   "tfa.v1.s0": "Thought: \"Next time I'll practise\"",
   "tfa.v1.s1": "Feeling: a little disappointed, but hopeful",
   "tfa.v1.s2": "Action: I start a new drawing",
   "tfa.v2": "The teacher didn't call on you. Put it in order.",
   "tfa.v2.s0": "Thought: \"There wasn't much time today\"",
   "tfa.v2.s1": "Feeling: calm",
   "tfa.v2.s2": "Action: tomorrow I put my hand up",
   "plan.v0": "When you are worried, put your calm plan in order.",
   "plan.v1": "When you are angry, put your calm plan in order.",
   "plan.s0": "I notice how I feel",
   "plan.s1": "I choose one of my tools",
   "plan.s2": "I use it",
   "plan.s3": "If I need to, I ask a grown-up for help",
   "goal.v0": "Aydin's goal: learning to tie his shoelaces. Put it in order.",
   "goal.v1": "Mina's goal: reading a storybook in a week. Put it in order.",
   "goal.v2": "Kian's goal: learning to count to a hundred. Put it in order.",
   "goal.s0": "Chooses a small goal",
   "goal.s1": "Breaks it into small steps",
   "goal.s2": "Takes one step every day",
   "goal.s3": "Puts a star for each step",
   "goal.s4": "Reaches the goal",
   "empathy.v0": "A new child is standing alone. Put it in order.",
   "empathy.v0.s0": "I notice they're alone",
   "empathy.v0.s1": "I think: if it were me, I'd feel lonely and worried",
   "empathy.v0.s2": "I invite them to play with us",
   "empathy.v1": "Your little brother lost a game and is crying. Put it in order.",
   "empathy.v1.s0": "I notice he is crying",
   "empathy.v1.s1": "I think: losing is hard",
   "empathy.v1.s2": "I go to him and say \"Let's play again\"",
   "empathy.v2": "Your friend's pencils fell on the floor. Put it in order.",
   "empathy.v2.s0": "I notice the pencils fell",
   "empathy.v2.s1": "I think: if it were me, I'd feel flustered",
   "empathy.v2.s2": "I help pick them up",
   "bully.v0": "Every day some children make fun of Kian. Put what Kian does in order.",
   "bully.v1": "Again and again some children hide Mina's things. Put what Mina does in order.",
   "bully.s0": "Says firmly and calmly \"Stop it!\"",
   "bully.s1": "Walks away",
   "bully.s2": "Tells a grown-up",
   "bully.s3": "If it happens again, tells again",
   "team.v0": "Three friends want to build a house of blocks. Put it in order.",
   "team.v1": "A family wants to make a craft together. Put it in order.",
   "team.s0": "Everyone says their idea",
   "team.s1": "They listen to everyone",
   "team.s2": "They decide together",
   "team.s3": "They share the jobs",
   "team.s4": "They build it together",
   "truth.v0": "Aydin's ball hit the vase and it broke. Put it in order.",
   "truth.v1": "Without looking, Shirin got her friend's book wet. Put it in order.",
   "truth.s0": "Takes a slow breath",
   "truth.s1": "Tells the truth",
   "truth.s2": "Says sorry",
   "truth.s3": "Helps to make it right"
  }
 },
 "feel-sapling-p6": {
  "title": "What do I say?",
  "words": {
   "say.ask": "What can we say in each moment? Match them. Tap each card to hear it.",
   "say.a0": "your cousin is leaving",
   "say.z0": "\"I'm glad you came and sad you're going.\"",
   "say.a1": "your friend didn't wave",
   "say.z1": "\"Maybe she didn't see me. I'll say hello.\"",
   "say.a2": "you're very worried",
   "say.z2": "\"I'll do box breathing now.\"",
   "say.a3": "you want to say something nice to your sister",
   "say.z3": "\"You're really patient.\"",
   "say.a4": "you got tired halfway to your goal",
   "say.z4": "\"I'll rest a bit, then the next step.\"",
   "say.a5": "someone keeps making fun of you",
   "say.z5": "\"Stop it!\" and I tell a grown-up",
   "say.a6": "there are two of you and one ball",
   "say.z6": "\"There are two of us and one ball. What shall we do?\"",
   "say.a7": "you spilled water on your friend's drawing",
   "say.z7": "\"Sorry. Let me help you draw it again.\"",
   "say.a8": "your friend apologised to you",
   "say.z8": "\"Okay, thanks for saying it.\"",
   "say.a9": "in a group the ideas don't fit together",
   "say.z9": "\"Let's mix our ideas.\"",
   "say.a10": "you broke something",
   "say.z10": "\"I broke it. I'm sorry.\"",
   "say.a11": "your friend won the race and you didn't",
   "say.z11": "\"Well done! I'm a bit disappointed, but I'm happy for you.\"",
   "say.a12": "tomorrow is your first day at a new school",
   "say.z12": "\"I'm excited and a little worried too.\"",
   "say.a13": "someone laughed when you came into class",
   "say.z13": "\"Maybe they laughed at something else.\""
  }
 }
});
