const matchPlan=[

   {title: "Call the match",
    initialPrompt: "how dominant do you work the match?",
    option1text: "Squash",
    option1ResultDescription: "you did not give your opponent a chance to shine, completly squashing them",
    option1function: () => {
      // Handle option 1 functionality here
      console.log('squash');
    },
  

    option2text: "Rivalry",
    option2ResultDescription: "You and your opponent kept the crowd in suspense as to who would win",
    option2function: () => {
      // Handle option 2 functionality here
      console.log('Rivalry');
    },
    

    option3text: "Job",
    option3ResultDescription: "you made yourself look week, giving all the spotlight to your opponent",
    option3function: () => {
      // Handle option 1 functionality here
      console.log('Job');
    },

    championshipMatch:false,
    championship:{},

    
  },
]

export default matchPlan