// Array of WWE wrestler names
const wweWrestlerNames = [
    'John Cena',
    'Roman Reigns',
    'Seth Rollins',
    'Becky Lynch',
    'Charlotte Flair',
    'Randy Orton',
    'Drew McIntyre',
    'AJ Styles',
    'Brock Lesnar',
    'The Rock',
    'Triple H',
    'Daniel Bryan',
    'Braun Strowman',
    'Edge',
    'Undertaker',
    'Shawn Michaels',
    'CM Punk',
    'Sami Zayn',
    'Kevin Owens',
    'Finn Balor',
    // Add more male wrestler names as needed
  ];

  // Array of NJPW wrestler names
const njpwWrestlerNames = [
    'Kazuchika Okada',
    'Hiroshi Tanahashi',
    'Tetsuya Naito',
    'Kota Ibushi',
    'Jay White',
    'Will Ospreay',
    'Minoru Suzuki',
    'Tomohiro Ishii',
    'Sanada',
    'Evil',
    'Shingo Takagi',
    'Hiromu Takahashi',
    'Zack Sabre Jr.',
    'Taiji Ishimori',
    'Yuji Nagata',
    'Hirooki Goto',
    'Juice Robinson',
    'Taichi',
    'Yoh',
    'Sho',
  ];
  
  // Array of AEW wrestler names
  const aewWrestlerNames = [
    'Kenny Omega',
    'Jon Moxley',
    'Cody Rhodes',
    'Chris Jericho',
    'Hangman Adam Page',
    'The Young Bucks',
    'Brodie Lee',
    'MJF',
    'Darby Allin',
    'PAC',
    'Orange Cassidy',
    'Sammy Guevara',
    'Britt Baker',
    'Hikaru Shida',
    'Nyla Rose',
    'Thunder Rosa',
    'Ricky Starks',
    'Brian Cage',
    'Jake Hager',
    'Matt Hardy',
  ];
  
  // Array of Indie wrestler names
  const indieWrestlerNames = [
    'Kylie Rae',
    'Joey Janela',
    'Orange Cassidy',
    'Thunder Rosa',
    'Darby Allin',
    'Eddie Kingston',
    'Kris Statlander',
    'Sonny Kiss',
    'Scorpio Sky',
    'Penelope Ford',
    'Sami Callihan',
    'Rosemary',
    'Rich Swann',
    'Warhorse',
    'Jordynne Grace',
    'Joey Ryan',
    'Kip Sabian',
    'Emi Sakura',
    'Nick Gage',
    'Willie Mack',
  ];
  
  
  // Function to generate a random number within a range
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Function to create a wrestler object
  const createWrestler = (company, wrestlerNames) => {
    const id = Math.floor(Math.random() * 10000); // Generate a random ID
  
    // Random WWE wrestler name
    const randomIndex = Math.floor(Math.random() * wrestlerNames.length);
    const name = wrestlerNames[randomIndex];
    wrestlerNames.splice(randomIndex, 1); // Remove the chosen name from the array
  
    // Generate random values for the properties
    const charisma = Math.random() < 0.5 ? 'menacing' : 'comedic';
    const alignment = Math.random() < 0.5 ? 'face' : 'heel';
    const style = ['highflyer', 'brawler', 'technical'][getRandomNumber(0, 2)];
    const inRingSkill = getRandomNumber(1, 100);
    const popularity = getRandomNumber(1, 100);
    const age = getRandomNumber(16, 90);
    const isChampion = Math.random() < 0.1;
    const championshipHeld = isChampion ? 'WWE Championship' : '';
    const daysAsChampion = isChampion ? getRandomNumber(0, 400) : 0;
    const relationship = 2;
    const inTeam = Math.random() < 0.2;
    const teamName = inTeam ? 'The Shield' : '';
    const inFaction = Math.random() < 0.1;
    const factionName = inFaction ? 'nWo' : '';
    const factionRole = inFaction ? ['leader', 'deputy', 'heir', 'member', 'muscle', 'lackey', 'fodder'][getRandomNumber(0, 6)] : '';
    const ringPsycholgy = getRandomNumber(1, 100);
    const lifestyle = ['minimalist', 'moderate', 'rich', 'millionaire', 'billionaire'][getRandomNumber(0, 4)];
    const bodytype = ['muscular', 'athletic', 'fat', 'slim'][getRandomNumber(0, 3)];
    const gimmick = ['supernatural', 'monster', 'anti-establishment', 'superhero', 'showman'][getRandomNumber(0, 4)];
    const gender = Math.random() < 0.9 ? 'male' : 'female';
    const contract = Math.random() < 0.8 ? 'fullTime' : 'partTime';
    const personality = ['bully', 'professional', 'clown', 'intense', 'loner', 'egomaniac', 'honorable'][getRandomNumber(0, 6)];
    const role = ['authority', 'wrestler', 'manager', 'celebrity', 'non-wrestler'][getRandomNumber(0, 4)];
    const available = true; // New wrestlers are available by default
  const isFeuding=false;
    // Create the wrestler object
    const wrestler = {
      id,
      name,
      charisma,
      alignment,
      style,
      inRingSkill,
      popularity,
      age,
      isFeuding,
      isChampion,
      championshipHeld,
      daysAsChampion,
      relationship,
      inTeam,
      teamName,
      inFaction,
      factionName,
      factionRole,
      ringPsycholgy,
      lifestyle,
      bodytype,
      gimmick,
      gender,
      contract,
      company,
      personality,
      role,
      available,
    };
  
    return wrestler;
  };
  
  // Array to hold the wrestlers
  const wrestlers = [];
  
  // Generate and push 10 wrestlers to the array
  for (let i = 0; i < 20; i++) {
    const wrestler = createWrestler('WWE',wweWrestlerNames);
    wrestlers.push(wrestler);
  }
  
  for (let i = 0; i < 20; i++) {
    const wrestler = createWrestler('NJPW', njpwWrestlerNames);
    wrestlers.push(wrestler);
  }
  
  // Generate and push 20 AEW wrestlers to the array
  for (let i = 0; i < 20; i++) {
    const wrestler = createWrestler('AEW', aewWrestlerNames);
    wrestlers.push(wrestler);
  }
  
  // Generate and push 20 Indie wrestlers to the array
  for (let i = 0; i < 20; i++) {
    const wrestler = createWrestler('Indie', indieWrestlerNames);
    wrestlers.push(wrestler);
  }
 export const companies= [
    {
      id:1,
      name: "WWE",
      preferredCharisma: "comedic",
      inRingBenchmark: 3,
      popularityBenchmark: 2,
      bookerOpinion: 2,
    },
    {
      id:2,
      name: "AEW",
      preferredCharisma: "menacing",
      inRingBenchmark: 2,
      popularityBenchmark: 3,
      bookerOpinion: 7,
    },
    {
      id:3,
      name: "NJPW",
      preferredCharisma: "menacing",
      inRingBenchmark: 5,
      popularityBenchmark: 3,
      bookerOpinion: 7,
    },
    {
      id:4,
      name: "Indie",
      preferredCharisma: "comedic",
      inRingBenchmark: 5,
      popularityBenchmark: 3,
      bookerOpinion: 7,
    },
    // Add more companies here with their properties
    // ...
  ]
 
  
  export default wrestlers
  