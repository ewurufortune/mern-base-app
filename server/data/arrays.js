const mainLogs = [];
const participants = [
  // SWF
  {
    id: "8/21/2052",
    name: "Tommy Long",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "2/7/2037",
    name: "Rodney Benson",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "10/15/2049",
    name: "Samuel Gomez",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "3/24/2044",
    name: "John Huff",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "4/24/2094",
    name: "Shawn Lawson",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "3/7/2109",
    name: "Anthony Nguyen",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "9/24/2093",
    name: "Landon French",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "2/5/2063",
    name: "Marc Tate",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 14 }],
  },
  {
    id: "3/27/2035",
    name: "Sophie West",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "5/15/2034",
    name: "Nettie Curry",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "5/31/2061",
    name: "Kyle Waters",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "10/1/2111",
    name: "Alfred Hubbard",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "3/11/2097",
    name: "Clarence Lowe",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 14 }],
  },
  {
    id: "10/14/2055",
    name: "Liu Wong",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "7/8/2024",
    name: "Rosa Schmidt",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "10/16/2029",
    name: "Masked One",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "7/30/2034",
    name: "Nancy Clayton",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "8/14/2088",
    name: "Jason Floyd",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "11/26/2091",
    name: "Tillie McDaniel",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "11/2/2102",
    name: "Eddie Burns",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "12/1/2113",
    name: "Lucile Daniels",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },

  //TCW
  {
    id: "4/16/2024",
    name: "Edward Mitchell",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "12/22/2033",
    name: "Lizzie Rogers",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "4/23/2093",
    name: "Linnie Pena",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "4/20/2078",
    name: "Chester Chandler",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "1/28/2057",
    name: "Luis Pittman",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "3/31/2065",
    name: "Rosetta Hampton",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "11/21/2036",
    name: "Steven Nichols",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "2/9/2026",
    name: "Elva Barker",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "2/24/2040",
    name: "Adrian Obrien",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "8/11/2069",
    name: "Russell Owens",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "11/20/2089",
    name: "Mittie Guzman",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "6/5/2081",
    name: "Lulu Rogers",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "10/31/2049",
    name: "Fanny Steele",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "9/1/2104",
    name: "Santiago El` Zoro",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "8/13/2065",
    name: "Nathaniel Dixon",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "11/21/2104",
    name: "Nellie Hicks",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "3/18/2040",
    name: "Susan Martinez",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "10/17/2104",
    name: "Phoebe Ferguson",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
  {
    id: "12/25/2048",
    name: "Hallie Andrews",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },

  {
    id: "4/9/2047",
    name: "Catherine Newton",
    isActive: true,
    image: "https://i.redd.it/bwciyi6pd4rb1.png",
    bio: "A talented wrestler",
    stats: [{ relevance: 1 }],
  },
];
const factions = [
  {
    name: "The Shield",
    relevance: 0,
    isActive: true,
    participants: ["7/8/2024"],
  },
  { name: "nWo", relevance: 0, isActive: true, participants: ["7/8/2024"] },
  {
    name: "Judgement Day",
    relevance: 0,
    isActive: true,
    participants: ["7/8/2024"],
  },
];

const categories = [
  {
    id: 1,
    name: "The Fall of Savitar",
    type: "Storyline",
    exclusive: true,
    participants: ["11/26/2091", "12/1/2113"],
    logs: [
      {
        description: "Savitar, decides to go to war",
        rating: 50,
        date: new Date(2023, 6, 10, 15, 30),
      },
    ],
  },
  {
    id: 2,
    name: "Great Escape",
    type: "Storyline",
    exclusive: true,
    participants: ["8/14/2088", "10/14/2055"],
    logs: [
      {
        description: "Savitar, decides to go to war",
        rating: 50,
        date: new Date(2023, 6, 10, 15, 30),
      },
    ],
  },
  {
    id: 3,
    name: "Mass Effect",
    type: "Storyline",
    exclusive: true,
    participants: ["7/8/2024", "8/14/2088", "10/16/2029"],
    logs: [
      {
        description: "There is a virus on the lose",
        rating: 50,
        date: new Date(2023, 6, 10, 15, 30),
      },
    ],
  },
  {
    id: 4,
    name: "MidWest",
    type: "Location",
    exclusive: true,
    participants: [
      "8/21/2052",
      "2/7/2037",
      "10/15/2049",
      "3/24/2044",
      "4/24/2094",
      "3/7/2109",
      "9/24/2093",
      "2/5/2063",
      "3/27/2035",
      "5/15/2034",
      "5/31/2061",
      "10/1/2111",
      "3/11/2097",
      "10/14/2055",
      "7/8/2024",
      "10/16/2029",
      "7/30/2034",
      "8/14/2088",
      "11/26/2091",
      "11/2/2102",
      "12/1/2113",
    ],
    logs: [
      {
        description:
          " States like Illinois, Ohio, Michigan, Wisconsin, and Minnesota are part of the Midwest. It is often referred to as the 'Heartland' of America and is known for its agricultural industry and friendly communities.",
        rating: 50,
        date: new Date(2023, 6, 10, 15, 30),
      },
    ],
  },
  {
    id: 5,
    name: "NorthEast",
    type: "Location",
    exclusive: true,
    participants: [
      "11/26/2091",
      "11/2/2102",
      "12/1/2113",
      "4/16/2024",
      "12/22/2033",
      "4/23/2093",
      "4/20/2078",
      "1/28/2057",
      "3/31/2065",
      "11/21/2036",
      "2/9/2026",
      "2/24/2040",
      "8/11/2069",
      "11/20/2089",
      "6/5/2081",
      "10/31/2049",
      "9/1/2104",
      "8/13/2065",
      "11/21/2104",
      "3/18/2040",
    ],
    logs: [
      {
        description:
          ": This includes states like New York, New Jersey, Pennsylvania, Connecticut, and Massachusetts. It is known for its diverse culture, historic cities, and beautiful landscapes.",
        rating: 50,
        date: new Date(2023, 6, 10, 15, 30),
      },
    ],
  },

  {
    id: 673,
    name: "Superstar Wrestling Entertainment (SWE)",
    type: "Promotion",
    exclusive: true,
    participants: [
      "8/21/2052",
      "2/7/2037",
      "10/15/2049",
      "3/24/2044",
      "4/24/2094",
      "3/7/2109",
      "9/24/2093",
      "2/5/2063",
      "3/27/2035",
      "5/15/2034",
      "5/31/2061",
      "10/1/2111",
      "3/11/2097",
      "10/14/2055",
      "7/8/2024",
      "10/16/2029",
      "7/30/2034",
      "8/14/2088",
      "11/26/2091",
      "11/2/2102",
      "12/1/2113",
    ],
    logs: [
      {
        description: "Where Legends Are Born and Drama Takes Center Stage!",
        rating: 50,
        date: new Date(1978, 7, 10, 15, 30),
      },
    ],
  },

  {
    id: 25,
    name: "Dynasty Wrestling Association (DWA)",
    type: "Promotion",
    exclusive: true,
    participants: [
      "4/16/2024",
      "12/22/2033",
      "4/23/2093",
      "4/20/2078",
      "1/28/2057",
      "3/31/2065",
      "11/21/2036",
      "2/9/2026",
      "2/24/2040",
      "8/11/2069",
      "11/20/2089",
      "6/5/2081",
      "10/31/2049",
      "9/1/2104",
      "8/13/2065",
      "11/21/2104",
      "3/18/2040",
      "10/17/2104",
      "12/25/2048",
      "4/9/2047",
    ],
    logs: [
      {
        description: "Unleash the Titans for High-Impact Action!",
        rating: 50,
        date: new Date(1959, 6, 10, 15, 30),
      },
    ],
  },

  {
    id: 25,
    name: "Eternal Wrestling Society (EWS)",
    type: "Promotion",
    exclusive: false,
    participants: [
      "4/16/2024",
      "12/22/2033",
      "4/23/2093",
      "4/20/2078",
      "8/21/2052",
      "2/7/2037",
      "10/15/2049",
      "3/24/2044",
    ],
    logs: [
      {
        description:
          "Wrestling Immortality Begins Here with Classic and Timeless Matches!",
        rating: 50,
        date: new Date(2012, 6, 10, 15, 30),
      },
    ],
  },
];

const randomEvents = [];

const relationships = [
  {
    id: 1,
    name: "Master - Student",
    participants: ["3/7/2109", "12/1/2113"],
    frequency: "week",
    relationshipStrength: 2,
    relationshipStrengthText: "Neutral",
  },
  {
    id: 1,
    name: "Rival",
    participants: ["10/15/2049", "3/24/2044"],
    frequency: "week",
    relationshipStrength: -3,
    relationshipStrengthText: "Neutral",
  },
  {
    id: 1,
    name: "Huband - Wife",
    participants: ["2/24/2040", "10/31/2049"],
    frequency: "week",
    relationshipStrength: -3,
    relationshipStrengthText: "Neutral",
  },
];
// {name, participants, frequency,relationshipStrength, relationshipStrengthText}
const recentEvents = [
  {
    id: "2bd6cb3d-c002-4717-b44f6-66c53ada8c74",
    eventTypeId: "1694197990275",
    title: "Welcome!",
    description:
      "Welcome To WorldBooker\n\n This is where you will recieve notifications of events happening in your world.",
  },

  {
    id: "2bd6cb3d-c002-4717-b44f6-66c53ada8c74",
    eventTypeId: "1694197990275",
    title: "A Note on Participant Images",
    description:
      "Participant images are set by using image links from anywhere on the internet, \n this means that there is no limit to to what you can choose!\n You can change a participants image by clicking  the 'Profile-Image' property (next to the 'Name' property) of the participant you want to change, delete the existing link and paste the image link of youre selection.\n\n PS: If your out of inspiration you can view other saves in the 'See what others have published and even grab a copy!",
  },
];
const items = [
  {
    id: 1,
    name: "DWA Grand Championship",
    style: "DWA Grand Champion",
    holderId: ["4/23/2093"],
    holderStartDate: Date(2023, 6, 10, 15, 30),
    holderEndDate: "Present",
    pastHolders: [
      {
        holderId: "1/28/2057",
        startDate: Date(2022, 6, 10, 15, 30),
        endDate: Date(2023, 6, 10, 15, 30),
      },
    ],
  },

  {
    id: 2,
    name: "SWE World Championship",
    style: "SWE World Champion",
    holderId: ["8/21/2052"],
    holderStartDate: Date(2023, 6, 10, 15, 30),
    holderEndDate: "Present",
    pastHolders: [
      {
        holderId: "8/21/2052",
        startDate: Date(2022, 6, 10, 15, 30),
        endDate: Date(2023, 6, 10, 15, 30),
      },
    ],
  },

  {
    id: 3,
    name: "EWS Eternal Championship",
    style: "EWS Eternal Championship",
    holderId: ["4/16/2024"],
    holderStartDate: Date(2023, 6, 10, 15, 30),
    holderEndDate: "Present",
    pastHolders: [
      {
        holderId: 2,
        startDate: Date(2022, 6, 10, 15, 30),
        endDate: Date(2023, 6, 10, 15, 30),
      },
    ],
  },
];

const stats = [
  {
    id: 1,
    statName: "overness",
    label: "Major Overness Success",
    change: 5,
    bio: "A Measure of Overness",
  },
  {
    id: 2,
    statName: "overness",
    label: "Major Overness Loss",
    change: -5,
    bio: "A Measure of Overness",
  },
  {
    id: 3,
    statName: "reputation",
    label: "Major Reputation Gain",
    change: 5,
    bio: "A Measure of Overness",
  },
  {
    id: 4,
    statName: "reputation",
    label: "Major Reputation Loss",
    change: -5,
    bio: "A Measure of Reputation",
  },
  {
    id: 5,
    statName: "morale",
    label: "Low Morale Impact",
    change: -3,
    bio: "A stat that reflects a wrestler's decreased morale due to disappointing events or setbacks.",
  },
  {
    id: 6,
    statName: "win",
    label: "Winning Streak",
    change: 1,
    bio: "A stat that increases when a wrestler achieves a series of consecutive victories, showcasing their skill and dominance.",
  },
  {
    id: 7,
    statName: "win",
    label: "Win",
    change: 5,
    bio: "A stat that increases when a wrestler achieves a series of consecutive victories, showcasing their skill and dominance.",
  },
  {
    id: 8,
    statName: "loss",
    label: "Losing Streak",
    change: -5,
    bio: "A stat that accumulates when a wrestler experiences a series of consecutive losses, indicating a decline in performance.",
  },
  {
    id: 9,
    statName: "loss",
    label: "Loss",
    change: -1,
    bio: "A stat that accumulates when a wrestler experiences a series of consecutive losses, indicating a decline in performance.",
  },
  {
    id: 10,
    statName: "skill",
    label: "Skill Enhancement",
    change: 3,
    bio: "A stat that represents the improvement in a wrestler's technical abilities and in-ring skills after focused training.",
  },
  {
    id: 11,
    statName: "skill",
    label: "Skill Regression",
    change: -3,
    bio: "A stat that decreases when a wrestler's in-ring performance deteriorates, signaling a need for improvement.",
  },
];

const arcs = [
  {
    id: 1,
    title: "Championship Match",
    type: ["individual"],
    description: `The Championship Match had the entire arena buzzing with anticipation as '{Challenger}' stepped into the ring to challenge the reigning champion, '{ChampionName}'.
    
    The match unfolded with a fierce exchange of powerful moves and near falls. The crowd was on the edge of their seats as '{Challenger}' displayed incredible resilience and determination.
    
    In the climactic ending, '{ChampionName}' executed a breathtaking finishing maneuver to retain the championship, but not without a valiant effort from '{Challenger}'. The fans erupted in cheers as the champion celebrated a hard-fought victory.`,
    numberOfParticipants: 2,
  },
  {
    id: 2,
    title: "Tag Team Match",
    type: ["individual"],
    description: `The Tag Team Match started with explosive energy as '{TeamName1}' showcased their raw strength. '{TeamName2}' countered with their agility and aerial maneuvers.

In the end, '{TeamName2}' secured a thrilling victory with a well-coordinated tag team finisher, leaving the crowd in awe.`,
    numberOfParticipants: 4,
  },
  {
    id: 3,
    title: "Normal Match",
    type: ["individual"],
    description: `The Normal Match took center stage as '{Wrestler1}' squared off against '{Wrestler2}' in a classic one-on-one showdown.

The match started with a feeling-out process, each wrestler testing the other's skills and resilience. '{Wrestler1}' and '{Wrestler2}' exchanged powerful strikes and technical maneuvers, showcasing their in-ring prowess.

As the match reached its climax, '{Wrestler1}' managed to execute a devastating finisher, securing a hard-fought victory over '{Wrestler2}' and leaving the audience in awe of their skills.`,
    numberOfParticipants: 2,
  },
  {
    id: 4,
    title: "Triple Threat Match",
    type: ["individual"],
    description: `The Triple Threat Match was a chaotic battle featuring '{Wrestler1}', '{Wrestler2}', and '{Wrestler3}'. It was a high-stakes showdown with no disqualifications and no count-outs.

The match kicked off with all three wrestlers going at it simultaneously. '{Wrestler1}' displayed power, '{Wrestler2}' exhibited speed, and '{Wrestler3}' brought cunning tactics into play.

In a heart-pounding finish, '{Wrestler1}' narrowly emerged victorious, but the match showcased the incredible athleticism of all three competitors.`,
    numberOfParticipants: 3,
  },
  {
    id: 5,
    title: "Promo",
    type: ["individual"],
    description: `In a backstage interview, '{Wrestler}' addressed the audience with fiery words. '{Wrestler}' talked about their upcoming match and promised to give it their all in the ring.

The intense promo left the fans excited and eager to see '{Wrestler}' in action.`,
    numberOfParticipants: 1,
  },
  {
    id: 6,
    title: "Promo Involving Champion",
    type: ["individual"],
    description: `The reigning champion, '{ChampionName}', delivered a passionate promo in the ring. '{ChampionName}' addressed the challengers and asserted their dominance.

As '{ChampionName}' held the championship belt high, tensions ran high among the contenders, setting the stage for an epic showdown.`,
    numberOfParticipants: 1,
  },
  {
    id: 7,
    title: "Beatdown Segment",
    type: ["individual"],
    description: `In a shocking turn of events, '{HeelWrestler}' and their allies launched an unrelenting beatdown on '{FaceWrestler}'. The heels, fueled by malice and vengeance, left '{FaceWrestler}' battered and bruised in the middle of the ring.

The arena erupted with boos and jeers as the dastardly heels reveled in their cruel actions.`,
    numberOfParticipants: 2,
  },

  {
    id: 8,
    title: "Heel Turn Segment",
    type: ["individual"],
    description: `The wrestling world was left in shock when '{Wrestler}' executed a stunning heel turn. After years of being a beloved face, '{Wrestler}' betrayed their fans, attacked their former allies, and aligned themselves with the most villainous faction in the promotion.

The audience's cheers turned into deafening boos as '{Wrestler}' embraced their new role as a despicable heel.`,
    numberOfParticipants: 1,
  },

  {
    id: 9,
    title: "Face Turn Segment",
    type: ["individual"],
    description: `In an emotional moment, '{Wrestler}' underwent a dramatic face turn. Fed up with the dirty tactics of their former allies, '{Wrestler}' decided to stand up for what's right and join the side of the faces.

The fans in attendance erupted in cheers as '{Wrestler}' made their heroic stance known.`,
    numberOfParticipants: 1,
  },

  {
    id: 10,
    title: "Betrayal Segment",
    type: ["individual"],
    description: `The tag team of '{TagTeamWrestler1}' and '{TagTeamWrestler2}' faced a shocking betrayal as '{BetrayingWrestler}' turned on their partner. In the midst of a crucial match, '{BetrayingWrestler}' attacked '{TagTeamWrestler1}', leaving their former ally stunned and defeated.

The betrayal left the wrestling world buzzing with anticipation for the upcoming rivalry between '{BetrayingWrestler}' and '{TagTeamWrestler1}'.`,
    numberOfParticipants: 3,
  },
  {
    id: 120,
    title: "Title Change Segment",
    type: ["individual"],
    description: `In a shocking turn of events, '{NewChampion}' defeated '{OldChampion}' to become the new champion. The arena erupted with cheers as the referee's hand came down for the final count, and the title changed hands.

This historic moment will be remembered as '{NewChampion}' begins their reign as the champion of the world.`,
    numberOfParticipants: 2,
  },
  {
    id: 11,
    title: "Contract Signing Segment",
    type: ["individual"],
    description: `Tensions reached a boiling point as '{Wrestler1}' and '{Wrestler2}' met in the ring to sign the contract for their upcoming match. Verbal jabs and threats were exchanged as the contract signing escalated into a chaotic brawl. Tables were overturned, and security struggled to maintain order.

The contract signing set the stage for an explosive showdown between '{Wrestler1}' and '{Wrestler2}' at the next pay-per-view event.`,
    numberOfParticipants: 2,
  },
  {
    id: 12,
    title: "In-Ring Promo",
    type: ["individual"],
    description: `'{Wrestler}' took center stage in the ring, microphone in hand, to address the live audience. With charisma and passion, they cut a scathing promo, calling out their upcoming opponent and promising victory.

The promo garnered intense reactions from the fans, further fueling anticipation for the upcoming match.`,
    numberOfParticipants: 1,
  },
  {
    id: 13,
    title: "Backstage Brawl Segment",
    type: ["individual"],
    description: `Tempers flared backstage as '{Wrestler1}' and '{Wrestler2}' engaged in a brutal backstage brawl. The chaos spilled through the backstage area, involving other wrestlers and crew members.

Security struggled to separate the warring parties, leaving a trail of destruction in their wake.`,
    numberOfParticipants: 2,
  },
  {
    id: 14,
    title: "Interference Segment",
    type: ["individual"],
    description: `In a critical match, '{Wrestler1}' was on the verge of victory when '{HeelManager}' interfered. '{HeelManager}' distracted the referee, allowing '{HeelWrestler}' to strike '{FaceWrestler}' with a foreign object.

The interference resulted in a controversial win for the heels, leaving the fans outraged and demanding justice.`,
    numberOfParticipants: 3,
  },
  {
    id: 15,
    title: "Retirement Announcement Segment",
    type: ["individual"],
    description: `In a heartfelt moment, '{Wrestler}' took to the ring to announce their retirement from professional wrestling. Tears were shed, and the fans showered '{Wrestler}' with applause and gratitude for their incredible career.

The retirement announcement marked the end of an era and left a lasting legacy in the wrestling world.`,
    numberOfParticipants: 1,
  },

  {
    id: 20,
    title: "Retirement of a Legendary Wrestler",
    type: ["individual"],
    description: `The wrestling world came to a standstill as the legendary {legendaryWrestler}, known for their iconic matches and unforgettable moments, announced their retirement from in-ring competition. Fans and fellow wrestlers paid tribute to the incredible career and legacy left behind by this beloved figure.`,
    numberOfParticipants: 1,
  },
  {
    id: 21,
    title: "Signing of a Major Free Agent",
    type: ["individual"],
    description: `Shockwaves reverberated through the wrestling community as a major free agent, {freeAgentName}, who had previously made a name for themselves in a rival promotion, signed a contract with {promotionName}. Speculation ran wild about potential dream matches and feuds that awaited this newcomer in their new home.`,
    numberOfParticipants: 1,
  },
  {
    id: 22,
    title: "Wrestling Promotion Going Public",
    type: ["individual"],
    description: `In a groundbreaking move, {promotionName}, a prominent wrestling promotion, announced that it was going public, allowing fans and investors to buy shares in the company. This development promised to reshape the landscape of professional wrestling and bring new opportunities for growth and expansion.`,
    numberOfParticipants: 1,
  },
  {
    id: 23,
    title: "Surprise Return from Injury or Retirement",
    type: ["individual"],
    description: `Fans were left in awe as a beloved wrestler, thought to be sidelined by injury or retirement, made a surprise return to the ring. The arena erupted in excitement as {returningWrestler} defied the odds and stepped back into the squared circle.`,
    numberOfParticipants: 1,
  },
  {
    id: 24,
    title: "Induction into the Hall of Fame",
    type: ["individual"],
    description: `A wrestling legend, {hallOfFameInductee}, received the ultimate honor by being inducted into the Hall of Fame. Fellow wrestlers, fans, and colleagues celebrated the career achievements and contributions of this iconic figure, whose legacy would forever be enshrined in wrestling history.`,
    numberOfParticipants: 1,
  },
  {
    id: 25,
    title: "Change of Ownership for a Wrestling Promotion",
    type: ["individual"],
    description: `In a surprising turn of events, {promotionName}, a wrestling promotion with a storied history, announced a change of ownership. Wrestling insiders and fans speculated about the potential impact of this ownership shift on the promotion's future direction and roster.`,
    numberOfParticipants: 1,
  },
  {
    id: 26,
    title: "New Wrestling Show Announcement",
    type: ["individual"],
    description: `Excitement filled the air as {promotionName} unveiled plans for a brand-new wrestling show. Wrestling enthusiasts eagerly awaited details about the format, talent roster, and potential surprises that this new show would bring to the world of professional wrestling.`,
    numberOfParticipants: 1,
  },
  {
    id: 27,
    title: "Injury Forces Last-Minute Match Change",
    type: ["individual"],
    description: `Just hours before a highly anticipated event, {injuredWrestler}, scheduled to compete in a marquee match, suffered a serious injury, forcing wrestling promoters to make a last-minute match change. Fans anxiously awaited updates on the replacement match and the injured wrestler's recovery.`,
    numberOfParticipants: 1,
  },
  {
    id: 28,
    title: "Unexpected Championship Victory",
    type: ["individual"],
    description: `The wrestling world was left in shock as {unexpectedChampion} pulled off a stunning upset to capture the championship. This underdog story captured the hearts of fans, and the new champion celebrated their remarkable achievement.`,
    numberOfParticipants: 1,
  },
  {
    id: 29,
    title: "Wrestler's Emotional Farewell",
    type: ["individual"],
    description: `Tears flowed in the ring as {farewellWrestler} bid an emotional farewell to professional wrestling. Their retirement match was filled with heartfelt moments, and both fans and fellow wrestlers joined in showing appreciation for the contributions of this beloved figure.`,
    numberOfParticipants: 1,
  },
  {
    id: 30,
    title: "Record-Breaking Pay-Per-View",
    type: ["individual"],
    description: `History was made at the {promotionName} pay-per-view event as it shattered attendance and buyrate records. The electric atmosphere in the arena and the overwhelming demand from fans at home marked this event as a historic moment in professional wrestling.`,
    numberOfParticipants: 1,
  },
  {
    id: 31,
    title: "Wrestler Turned Backstage Role",
    type: ["individual"],
    description: `A wrestling icon, {wrestlerTurnedBackstage}, decided to hang up their boots and transition to a backstage role within {promotionName}. Fans and wrestlers alike looked forward to seeing how this legendary figure would contribute to the promotion in their new capacity.`,
    numberOfParticipants: 1,
  },
  {
    id: 32,
    title: "Launch of New Championship Title",
    type: ["individual"],
    description: `The anticipation was palpable as {promotionName} unveiled a brand-new championship title. Wrestling enthusiasts speculated about the inaugural champion and the exciting rivalries that would center around this prestigious championship.`,
    numberOfParticipants: 1,
  },
  {
    id: 33,
    title: "Debut of a New Wrestling Promotion",
    type: ["individual"],
    description: `A new era in professional wrestling began as {newPromotionName}, founded by a former wrestling legend or celebrity, held its inaugural event. Wrestling fans and industry insiders watched closely to see how this upstart promotion would carve its niche in the wrestling world.`,
    numberOfParticipants: 1,
  },
  {
    id: 34,
    title: "Major Controversy Rocks Wrestling",
    type: ["individual"],
    description: `Scandal and controversy engulfed the wrestling world as {controversyDetails} involving a prominent wrestler or wrestling promotion came to light. Fans, wrestlers, and pundits debated the fallout and potential consequences of this explosive revelation.`,
    numberOfParticipants: 1,
  },
  {
    id: 35,
    title: "Wrestler Opens Up About Mental Health",
    type: ["individual"],
    description: `In a candid and brave move, {wrestlerMentalHealth} opened up about their struggles with mental health in a heartfelt interview. Their willingness to share their journey resonated with fans and shed light on the importance of mental health awareness in wrestling.`,
    numberOfParticipants: 1,
  },
  {
    id: 36,
    title: "Wrestler Ventures into Politics",
    type: ["individual"],
    description: `A wrestling superstar, {wrestlerPolitics}, announced their candidacy for a political office or embarked on a career in another field outside of wrestling. This surprising career shift garnered attention and sparked discussions about their future endeavors.`,
    numberOfParticipants: 1,
  },
  {
    id: 37,
    title: "Wrestling Convention Extravaganza",
    type: ["individual"],
    description: `Wrestling fans rejoiced as the annual {conventionName} convention or fan event rolled into town, featuring appearances by top wrestling stars and legends. Attendees had the opportunity to meet their idols and immerse themselves in all things wrestling.`,
    numberOfParticipants: 1,
  },
  {
    id: 38,
    title: "Tell-All Autobiography Released",
    type: ["individual"],
    description: `A wrestling legend, {autobiographyAuthor}, released a highly anticipated tell-all autobiography, providing fans with an intimate look into their storied career and the behind-the-scenes drama of professional wrestling.`,
    numberOfParticipants: 1,
  },
  {
    id: 39,
    title: "Wrestlers Unite for Charity",
    type: ["individual"],
    description: `Wrestling's biggest hearts were on display as a group of wrestlers organized a charity event to support a worthy cause. This heartwarming gesture showcased the compassion and generosity within the wrestling community.`,
    numberOfParticipants: 1,
  },
  {
    id: 40,
    title: "New Wrestling-Themed Reality TV Show",
    type: ["individual"],
    description: `Television screens lit up with the premiere of a new wrestling-themed reality TV show, {realityShowName}. Wrestling fans tuned in to watch their favorite stars navigate challenges both in and out of the ring.`,
    numberOfParticipants: 1,
  },
  {
    id: 41,
    title: "Wrestling Promotion's Unique Partnership",
    type: ["individual"],
    description: `In an unexpected twist, {promotionName} formed a groundbreaking partnership with a mainstream brand or celebrity. This collaboration promised to bring wrestling to new audiences and create exciting opportunities for cross-promotion.`,
    numberOfParticipants: 1,
  },
  {
    id: 42,
    title: "Wrestler's Philanthropic Recognition",
    type: ["individual"],
    description: `A wrestler, {philanthropicWrestler}, received well-deserved recognition for their philanthropic efforts. Their contributions to charitable causes outside of wrestling were celebrated, highlighting the positive impact wrestlers can have on their communities.`,
    numberOfParticipants: 1,
  },
  {
    id: 43,
    title: "Wrestler Honored with Sports Award",
    type: ["individual"],
    description: `A wrestler, {awardWinner}, achieved a significant milestone by winning a major sports award or accolade unrelated to wrestling. This recognition underscored the athleticism and versatility of wrestling superstars.`,
    numberOfParticipants: 1,
  },
  {
    id: 44,
    title: "Revisiting a Legendary Rivalry",
    type: ["individual"],
    description: `The wrestling world buzzed with excitement as a legendary rivalry or feud from the past was revisited for a special one-off event. Fans relished the opportunity to see iconic rivals square off once more, creating an unforgettable spectacle.`,
    numberOfParticipants: 1,
  },
];
const statPerception = [
  {
    statName: "overness",
    top1: "Mainstream",
    top5Percentile: "Hot",
    top10Percentile: "Hot",
    top20Percentile: "Hot",
    top40Percentile: "Neutral",
    top80Percentile: "Chilly",
    top20Percentile: "Cold",
  },
  {
    statName: "popularity",
    top1: "Icon",
    top5Percentile: "MegaStar",
    top10Percentile: "Superstar",
    top20Percentile: "Fan Favorite",
    top40Percentile: "Respected",
    top80Percentile: "Known",
  },
  {
    statName: "relevance",
    top1: "Legend",
    top5Percentile: "Irreplaceable",
    top10Percentile: "Important",
    top20Percentile: "Significant",
    top40Percentile: "Relevant",
    top80Percentile: "Marginal",
  },
  {
    statName: "morale",
    top1: "Euphoric",
    top5Percentile: "Very Happy",
    top10Percentile: "Happy",
    top20Percentile: "Content",
    top40Percentile: "Neutral",
    top80Percentile: "Frustrated",
  },
  {
    statName: "wins",
    top1: "Invincible",
    top5Percentile: "Dominant",
    top10Percentile: "Winning Streak",
    top20Percentile: "Successful",
    top40Percentile: "Competent",
    top80Percentile: "Average",
  },
  {
    statName: "loss",
    top1: "Invulnerable",
    top5Percentile: "Resilient",
    top10Percentile: "Tough Competitor",
    top20Percentile: "Steadfast",
    top40Percentile: "Competent",
    top80Percentile: "Average",
  },
];
// const date = new Date(2023, 6, 10, 15, 30);
const date = new Date();

export {
  mainLogs,
  participants,
  factions,
  date,
  categories,
  items,
  stats,
  randomEvents,
  relationships,
  recentEvents,
  arcs,
  statPerception,
};
