import React, { useState, useEffect } from 'react';
import Live from './Live';
const GameLogic = () => {

    
  const [timeToOpenSpot, setTimeToOpenSpot] = useState(5);
  const [week,setWeek]= useState(1)
  const [eventType,setEventType]= useState('')
    // Company object with the parameters
    const [companies, setCompanies] = useState([
        {
          name: 'WWE',
          preferredCharisma: 'comedic',
          inRingBenchmark: 3,
          popularityBenchmark: 4,
          bookerOpinion:7
        },
        // Add more companies here with their properties
        // ...
      ]);
  const [playerWrestler, setPlayerWrestler] = useState({
    name: 'Player',
    charisma: 'comedic',
    alignment: 'face',
    popularity: 5,
    inRingSkill: 5,
    currentPotentialFeud:{},
    activeFeud:{},
    currentCompany:companies[0]
  });


  const [wrestlers, setWrestlers] = useState([
    {
      id: 1,
      name: 'The Beast',
      charisma: 'menacing',
      alignment: 'heel',
      popularity: 6,
      inRingSkill: 8,
      company:'WWE',
      bookerRelationship:8,
    },
    {
      id: 2,
      name: 'The Jester',
      charisma: 'comedic',
      alignment: 'face',
      popularity: 4,
      inRingSkill: 6,
      company:'WWE',
      bookerRelationship:8,
    },
    // Add more wrestlers here with their properties
    // ...
  ]);

  const [feuds, setFeuds] = useState([
    {
      id: 1,
      name:'Mystery Attacker',
      opponent: [wrestlers[0]],
      ally:[],
      requirements: {
        alignment: 'heel',
        charisma: 'menacing',
      },
      length:2,
      multiplier: 1.2,
      isCurrentFeud: false,
    },
    {
      id: 2,
      name:'Betrayal and Revenge',
      opponent: [wrestlers[1],wrestlers[0]],
      ally:[],
      requirements: {
        alignment: 'face',
        charisma: 'comedic',
      },
      length:2,
      multiplier: 1.5,
      isCurrentFeud: false,
    },
    // Add more feuds here with their properties and wrestlers as opponents
    // ...
  ])

  const [story, setStory] = useState('Welcome to the Wrestling World!');
  const [isFeudActive, setIsFeudActive] = useState(false);

  // Function to get a random stat change for the player
  const getRandomStatChange = () => {
    const randomStat = ['popularity', 'inRingSkill', 'alignment', 'charisma'][
      Math.floor(Math.random() * 4)
    ];
    const randomChange = Math.random() > 0.5 ? 1 : -1;

    if (randomStat === 'alignment') {
      // Randomly change the player's alignment
      const newAlignment = Math.random() > 0.5 ? 'face' : 'heel';
      setPlayerWrestler((prevState) => ({
        ...prevState,
        alignment: newAlignment,
      }));
    } else if (randomStat === 'charisma') {
      // Randomly change the player's charisma
      const newCharisma = Math.random() > 0.5 ? 'comedic' : 'menacing';
      setPlayerWrestler((prevState) => ({
        ...prevState,
        charisma: newCharisma,
      }));
    } else {
      // Change the player's popularity or in-ring skill
      setPlayerWrestler((prevState) => ({
        ...prevState,
        [randomStat]: Math.min(10, Math.max(1, prevState[randomStat] + randomChange)),
      }));
    }
  };

  const updateCompanyBenchmarks = () => {
    const updatedCompanies = companies.map((company) => {
      const wrestlersInCompany = wrestlers.filter((wrestler) => wrestler.company === company.name);
      if (wrestlersInCompany.length === 0) {
        return company; // No wrestlers in the company, keep the benchmarks unchanged
      }

      // Calculate the average in-ring skill and popularity for wrestlers in the company
      const totalInRingSkill = wrestlersInCompany.reduce((sum, wrestler) => sum + wrestler.inRingSkill, 0);
      const totalPopularity = wrestlersInCompany.reduce((sum, wrestler) => sum + wrestler.popularity, 0);
      const averageInRingSkill = totalInRingSkill / wrestlersInCompany.length;
      const averagePopularity = totalPopularity / wrestlersInCompany.length;

      // Update the company's benchmarks
      return {
        ...company,
        inRingBenchmark: averageInRingSkill,
        popularityBenchmark: averagePopularity,
      };
    });

    setCompanies(updatedCompanies);
  };

  // Function to update multipliers for all potential feuds based on player stats
  const updateMultipliers = () => {
    const updatedFeuds = feuds.map((feud) => {
      const { requirements } = feud;
      let multiplier = 1;
  
      // Compare the player's stats with the feud's requirements and update the multiplier accordingly
      if (playerWrestler.alignment === requirements.alignment) {
        multiplier += 0.5;
      }
      if (playerWrestler.charisma === requirements.charisma) {
        multiplier += 0.3;
      }
  
      // Popularity-based adjustment
      const popularityDifference = playerWrestler.popularity - 5;
      if (popularityDifference > 0) {
        // Increase by 0.1 for every popularity point above 5
        multiplier += popularityDifference * 0.1;
      } else if (popularityDifference < 0) {
        // Decrease by 0.1 for every popularity point below 3
        multiplier -= Math.abs(popularityDifference) * 0.1;
      }
  
      // Add more requirements checks and adjustments as needed
  
      return { ...feud, multiplier };
    });
  
    setFeuds(updatedFeuds);
  };
  
  
  // Function to handle the "Next Week" button click
  const handleNextWeek = () => {
    if (week<4){
        setWeek((prevWeek) => prevWeek + 1);
        
    }else{
        setWeek(1)
    }
    if (week===4){
        setEventType('PPV')
    }else{
        setEventType('weeklyTV')
    }
    
    getRandomStatChange();
    updateMultipliers();
    updateCompanyBenchmarks();
    setTimeToOpenSpot((prevTime) => prevTime - 1);
    // Check if there is a current potential feud
    if (playerWrestler.currentPotentialFeud.name) {
      // Check if there are opponents and allies in the feud
      const { opponent, ally } = playerWrestler.currentPotentialFeud;
      const allInvolvedWrestlers = [...opponent, ...ally];
      const company = playerWrestler.currentCompany;
      
   // Calculate average booker opinion for all involved wrestlers
const totalBookerOpinion = allInvolvedWrestlers.reduce(
    (sum, wrestler) => sum + (wrestler.company === company.name ? (company.bookerOpinion || 0) : (wrestler.bookerRelationship || 0)),
    0
  );
  

  // Calculate average booker relationship for all involved wrestlers
  const totalBookerRelationship = allInvolvedWrestlers.reduce(
    (sum, wrestler) => sum + (wrestler.bookerRelationship || 0),
    0
  );
  const averageBookerOpinion = totalBookerOpinion +totalBookerRelationship
  const allInvolvedWrestlersAndPlayer=allInvolvedWrestlers.length+1
  const averageBookerRelationship = averageBookerOpinion / allInvolvedWrestlersAndPlayer;
  

      // Calculate the random value and the threshold based on the booker opinion and relationship
      const randomValue = Math.random() * 10; // Generates a random number between 0.0 and 9.99
      const threshold = averageBookerRelationship;

   
      if (timeToOpenSpot===0){
      // Check if the random value is below the threshold to activate the feud
      if (randomValue <= threshold) {
        if (!playerWrestler.activeFeud.name) {
        setPlayerWrestler((prevState) => ({
          ...prevState,
          currentPotentialFeud: {},
          activeFeud: { ...prevState.currentPotentialFeud,
         },
        }));
        setStory(
          `Congratulations! The booker picked up your feud with ${
            playerWrestler.currentPotentialFeud.opponent[0].name
          } and it has become an active feud.`
        );
        setIsFeudActive(true);
        // Reset the timeToOpenSpot counter to its initial value (e.g., 0) when the feud becomes active
        setTimeToOpenSpot(5);
      }
      } else {

        setStory(
          `The booker didn't choose any feud for this week. The next spot will be open in ${
            5 - timeToOpenSpot
          } weeks.`
        );
        setIsFeudActive(false);
      }
      setTimeToOpenSpot(5)
    }
    } else {
   
    }
       // If there is no current potential feud, proceed as usual without checking the counter
       const randomFeud = feuds[Math.floor(Math.random() * feuds.length)];
       const randomMultiplier = randomFeud.multiplier;
       const randomValue = Math.random() * 4; // Generates a random number between 0.0 and 3.99
 
       // Calculate additional weeks for feud length based on charisma comparison
       let additionalWeeks = 0;
       const playerCharisma = playerWrestler.charisma;
       const companyPreferredCharisma = playerWrestler.currentCompany.preferredCharisma;
       if (playerCharisma === companyPreferredCharisma) {
         additionalWeeks = 2; // If player's charisma matches company's preferred, add 2 weeks
       } else if (
         (playerCharisma === 'comedic' && companyPreferredCharisma === 'menacing') ||
         (playerCharisma === 'menacing' && companyPreferredCharisma === 'comedic')
       ) {
         additionalWeeks = 1; // If player's charisma is opposite to company's preferred, add 1 week
       }
 
       // Update the feud length with additional weeks
       randomFeud.length += additionalWeeks;
 
       console.log('chance ' + randomMultiplier);
       console.log(randomValue);
       if (randomValue <= randomMultiplier) {
         setPlayerWrestler((prevState) => ({
           ...prevState,
           currentPotentialFeud: randomFeud,
         }));
         setStory(`Congratulations! The booker picked up your feud with ${randomFeud.opponent[0].name}.`);
         setIsFeudActive(true);
       } else {
         setStory("The booker didn't choose any feud for this week.");
         setIsFeudActive(false);
       }
       if (playerWrestler.activeFeud.name) {
        // Subtract 1 from the length of the active feud each week
        setPlayerWrestler((prevState) => ({
          ...prevState,
          activeFeud: {
            ...prevState.activeFeud,
            length: Math.max(0, prevState.activeFeud.length - 1),
          },
        }));
    
        // Check if the active feud's length has reached 0
        if (playerWrestler.activeFeud.length === 0) {
          // Reset the active feud when its length is 0
          setPlayerWrestler((prevState) => ({
            ...prevState,
            activeFeud: {},
          }));
        }
      }
    
    if (timeToOpenSpot<= 0){
        setTimeToOpenSpot(5)
    }
  };


  // Use useEffect to update multipliers when player stats change
  useEffect(() => {
    updateMultipliers();
  }, [playerWrestler.alignment, playerWrestler.charisma]);

  return (
    <div>
    <p> week: {week}</p>
      <p>{story}</p>
      <h3>Player Wrestler</h3>
      <p>Name: {playerWrestler.name}</p>
      <p>Charisma: {playerWrestler.charisma}</p>
      <p>Alignment: {playerWrestler.alignment}</p>
      <p>Popularity: {playerWrestler.popularity}</p>
      <p>In-Ring Skill: {playerWrestler.inRingSkill}</p>
 {/* Display the active feud when isFeudActive is true */}
 { playerWrestler.activeFeud.name && (
      <div>
        <h3>Active Feud</h3>
        <p>Name: {playerWrestler.activeFeud.name}</p>
        {/* Display opponents */}
        <p>
          Opponents:{' '}
          {playerWrestler.activeFeud.opponent.map((opponent, index) => (
            <span key={opponent.id}>
              {index > 0 && index === playerWrestler.activeFeud.opponent.length - 1 ? ' and ' : ''}
              {opponent.name}
              {index < playerWrestler.activeFeud.opponent.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
        {/* Display other details of the active feud */}
        {/* ... (add more details here if available) */}
      </div>
    )}
      {playerWrestler.currentPotentialFeud.name && (
        <div>
          <h3>Current Potential Feud</h3>
          <p>Name: {playerWrestler.currentPotentialFeud.name}</p>
          {/* Display opponents */}
          <p>
            Opponents:{' '}
            {playerWrestler.currentPotentialFeud.opponent.map((opponent, index) => (
              <span key={opponent.id}>
                {index > 0 && index === playerWrestler.currentPotentialFeud.opponent.length - 1 ? ' and ' : ''}
                {opponent.name}
                {index < playerWrestler.currentPotentialFeud.opponent.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
          {/* Display other details of the current potential feud */}
        </div>
      )}
<p>{timeToOpenSpot}</p>

      <button onClick={handleNextWeek}>Next Week</button>
      <Live activeFeud={playerWrestler.activeFeud} eventType={eventType}  />
    </div>
  );
};

export default GameLogic;
