const mainLogs = [];
  const participants = [
    {
      id: 1,
      name: "Savital",
      isActive: true,
      bio: "One of the First People in this Universe.",
      stats: [{ relevance: 10 }],
    },
    {
      id: 2,
      name: "Roman Reigns",
      isActive: true,
      bio: "One of the First People in this Universe.",
      stats: [{ relevance: 11 }, { reputation: 10 }],
    },
    {
      id: 3,
      name: "Dan Race",
      isActive: true,
      bio: "One of the First People in this Universe.",
      stats: [{ relevance: 9 }, { overness: 10 }],
    },
    {
      id: 4,
      name: "Tello Roberts",
      isActive: true,
      bio: "One of the First People in this Universe.",
      stats: [{ relevance: 14 }],
    },
  ];
  const factions = [
    { name: "The Shield", relevance: 0, isActive: true, participants: [1, 2] },
    { name: "nWo", relevance: 0, isActive: true, participants: [3, 4] },
    { name: "Judgement Day", relevance: 0, isActive: true, participants: [] },
  ];

  const categories = [
    {
      id:1,
      name: "The Fall of Savitar",
      type: "Storyline",
      exclusive:true,
      participants: [1, 4],
      logs: [
        {
          description: "Savitar, decides to go to war",
          rating: 50,
          date: new Date(2023, 6, 10, 15, 30),
        },
      ],
    },
    {
      id:2 ,
      name: "Great Escape",
      type: "Storyline",
      exclusive:true,
      participants: [1, 2],
      logs: [
        {
          description: "Savitar, decides to go to war",
          rating: 50,
          date: new Date(2023, 6, 10, 15, 30),
        },
      ],
    },
    {
      id:3 ,
      name: "Mass Effect",
      type: "Storyline",
      exclusive:true,
      participants: [1, 3, 2],
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
      name: "Westeros",
      type: "Location",
      exclusive:true,
      participants: [1, 4],
      logs: [
        {
          description: "Land of the seven Kingdoms",
          rating: 50,
          date: new Date(2023, 6, 10, 15, 30),
        },
      ],
    },
    {
      id: 5,
      name: "Ba Sing Se",
      type: "Location",
      exclusive:true,
      participants: [1, 3, 4],
      logs: [
        {
          description: "The Earth bending capital",
          rating: 50,
          date: new Date(2023, 6, 10, 15, 30),
        },
      ],
    },
  ];

  const randomEvents=[
 
  ]

  const relationships = [
    {id:1, name:'Master Student', participants:[1,2], frequency:'week',relationshipStrength:0, relationshipStrengthText:'Neutral'}
  ];
// {name, participants, frequency,relationshipStrength, relationshipStrengthText}
const recentEvents=[
  {
    id: "2bd6cb3d-c002-4717-b44f6-66c53ada8c74",
    eventTypeId: "1694197990275",
    title: "The First stand",
    description: "The Last stant - the begining"
},
{
  id: "2bd6cb3d-c002-4717-5b4f6-66c53ada8c74",
  eventTypeId: "1694197990275",
  title: "The Middle stand",
  description: "The Last stant - the begining"
},
{
  id: "2bd6cb3d-c002-471767-b4f6-66c53ada8c74",
  eventTypeId: "1694197990275",
  title: "The Last stand",
  description: "The Last stant - the begining"
},

]
  const items = [
    {
      id:1,
      name: "World Heavyweight Championship",
      style: "World Heavyweight Champion",
      holderId: [1],
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
    {id:1, statName: "overness", label: "Major Overness Success", change: 5 ,bio:'Astat that changes',},
    {id:2, statName: "overness", label: "Major Overness Loss", change: -5 ,bio:'Astat that changes'},
    {id:3, statName: "reputation", label: "Major Reputation Gain", change: 5 ,bio:'Astat that changes'},
    {id:4, statName: "reputation", label: "Major Reputation Loss", change: -5 ,bio:'Astat that changes'},
  ];

 
  const arcs = [
    {
      id:1 ,
      title: "Match",
      type: ["faction", "individual"],
      description: "A generic match between {1:} and {2:}",
      numberOfParticipants: 2,
    },
    {
      id:2 ,
      title: "Duel",
      type: ["faction", "individual"],
      description: "A generic duel between {1:} and {2:}",
      numberOfParticipants: 2,
    },
  ];
const statPerception=[
{  statName:'overness',top1:'Legend',top5Percentile:'Maineventer',top10Percentile:'Upper MidCard', top20Percentile:'MidCard',top40Percentile:'Lower MidCard', top80Percentile:'jobbers',top20Percentile:'jabaronis'},
{  statName:'relevance',top1:'Legend',top5Percentile:'Maineventer',top10Percentile:'Upper MidCard', top20Percentile:'MidCard',top40Percentile:'Lower MidCard', top80Percentile:'jobbers',top20Percentile:'jabaronis'},
]
  const date = new Date(2023, 6, 10, 15, 30);

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
    statPerception
  };

  
  
  
  
  
  