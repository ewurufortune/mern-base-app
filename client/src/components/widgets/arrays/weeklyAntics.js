const weeklyAntics = [
  {
    title: "After Match Attack",
    initialPrompt: "You've just won the match, what do you do?",
    option1text: "Attack your opponent with a chair",
    option1ResultDescription: "You attacked your opponent with a chair and showed no mercy.",
    option1function: () => {
      // Handle option 1 functionality here
      console.log('working');
    },
    option1description: "You attack your opponent with a chair and show no mercy.",
    option2text: "Shake hands with your opponent",
    option2ResultDescription: "You showed respect to your opponent and shook hands after the match.",
    option2function: () => {
      // Handle option 2 functionality here
      console.log('working 2');
    },
    option2description: "You show respect to your opponent and shake hands after the match.",
  },
  {
    title: "Interference",
    initialPrompt: "Another wrestler is getting beaten down, what do you do?",
    option1text: "Run to the ring and attack the aggressor",
    option1ResultDescription: "You ran to the ring and saved the wrestler in distress.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You run to the ring and save the wrestler in distress.",
    option2text: "Stay backstage and watch",
    option2ResultDescription: "You decided not to get involved and watched the situation from backstage.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You decide not to get involved and watch the situation from backstage.",
  },
  {
    title: "Brawl",
    initialPrompt: "You encounter a fellow wrestler backstage, and tensions rise. What do you do?",
    option1text: "Engage in a heated brawl",
    option1ResultDescription: "You engaged in a heated brawl with the other wrestler, and chaos ensued backstage.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You engage in a heated brawl with the other wrestler, and chaos ensues backstage.",
    option2text: "Walk away and de-escalate the situation",
    option2ResultDescription: "You chose to walk away and de-escalate the situation, avoiding a confrontation.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You choose to walk away and de-escalate the situation, avoiding a confrontation.",
  },
  {
    title: "Catchphrase Promo Battle",
    initialPrompt: "You are given the mic to cut a promo. How do you handle it?",
    option1text: "Deliver an intense and captivating promo",
    option1ResultDescription: "You delivered an intense and captivating promo, hyping up the audience and your upcoming match.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You deliver an intense and captivating promo, hyping up the audience and your upcoming match.",
    option2text: "Give a lighthearted and humorous promo",
    option2ResultDescription: "You gave a lighthearted and humorous promo, entertaining the audience and showing your comedic side.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You give a lighthearted and humorous promo, entertaining the audience and showing your comedic side.",
  },
  {
    title: "Contract Signing",
    initialPrompt: "It's time for the contract signing. How do you handle it?",
    option1text: "Sign the contract confidently",
    option1ResultDescription: "You signed the contract confidently, ready to face your opponent at the upcoming event.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You sign the contract confidently, ready to face your opponent at the upcoming event.",
    option2text: "Trash talk your opponent while signing",
    option2ResultDescription: "You trash talk your opponent while signing the contract, adding more fuel to the rivalry.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You trash talk your opponent while signing the contract, adding more fuel to the rivalry.",
  },
  {
    title: "Confrontations",
    initialPrompt: "You encounter your opponent backstage. How do you react?",
    option1text: "Confront your opponent face-to-face",
    option1ResultDescription: "You confronted your opponent face-to-face, exchanging intense words before your match.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You confront your opponent face-to-face, exchanging intense words before your match.",
    option2text: "Ignore your opponent and walk away",
    option2ResultDescription: "You chose to ignore your opponent and walk away, keeping your focus on the upcoming battle.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You choose to ignore your opponent and walk away, keeping your focus on the upcoming battle.",
  },
  {
    title: "Prop Destruction",
    initialPrompt: "During your match, there are various props around the ring. How do you use them?",
    option1text: "Incorporate props into your offense",
    option1ResultDescription: "You creatively used the props as part of your offense, entertaining the audience.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You creatively use the props as part of your offense, entertaining the audience.",
    option2text: "Leave the props untouched",
    option2ResultDescription: "You focused solely on your in-ring skills and decided not to use the props during the match.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You focus solely on your in-ring skills and decide not to use the props during the match.",
  },
  {
    title: "Staredown",
    initialPrompt: "You and your opponent come face-to-face in the ring before the match. What do you do?",
    option1text: "Intensely stare down your opponent",
    option1ResultDescription: "You intensely stared down your opponent, sending a clear message of your determination.",
    option1function: () => {
      // Handle option 1 functionality here
    },
    option1description: "You intensely stare down your opponent, sending a clear message of your determination.",
    option2text: "Break the stare and taunt your opponent",
    option2ResultDescription: "You broke the stare and taunted your opponent, trying to get into their head before the match.",
    option2function: () => {
      // Handle option 2 functionality here
    },
    option2description: "You break the stare and taunt your opponent, trying to get into their head before the match.",
  },
];

export default weeklyAntics;
