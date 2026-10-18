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
        { caption: "When we are sad, our throat might feel tight and our body heavy." },
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
        { caption: "Then we can look around us." },
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
        { caption: "Aydin said, \"Sorry, I wasn't looking. Let's draw it again together.\"" },
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
  ] }
});
