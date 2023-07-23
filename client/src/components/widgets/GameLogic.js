import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Live from './Live';
import { setName, setFirstname, setSavegame, setTraits,setButton1Text, setUserResponse,setButton2Text,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setShowNextWeekButton,setResponseRecieved,setEventType,setIsFeudActive,setStory,setWeek, setTimeToOpenSpot,setPlayerWrestler,setCurrentMatchPlan,setCompanies,addFeud,setFeud,setStats,setCharisma, setAlignment, setPopularity, setInRingSkill, setCurrentPotentialFeud, setActiveFeud, setPastFeuds, setIsChampion, setCurrentChampionshipHeld, setTitleReigns, setCurrentCompany, setTags,setActiveFeudLength,setActiveFeudMultiplier} from "state";




const GameLogic = () => {
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const firstName = useSelector((state) => state.user.firstName);

  const charisma = useSelector((state) => state.user.charisma);
  const wealth = useSelector((state) => state.user.wealth);
  const user = useSelector((state) => state.user);
  const popularity = useSelector((state) => state.user.popularity);
  const alignment = useSelector((state) => state.user.alignment);
  const inRingSkill = useSelector((state) => state.user.inRingSkill);
  const currentPotentialFeud = useSelector((state) => state.user.currentPotentialFeud);
  const pastFeuds = useSelector((state) => state.user.pastFeuds);
  const activeFeud = useSelector((state) => state.user.activeFeud);
  const isChampion = useSelector((state) => state.user.isChampion);
  const currentChampionshipHeld = useSelector((state) => state.user.currentChampionshipHeld);
  const titleReigns = useSelector((state) => state.user.titleReigns);
  const currentCompany = useSelector((state) => state.user.currentCompany);
  const tags = useSelector((state) => state.user.tags);
  const savegame = useSelector((state) => state.user.savegame);
  const showNextActivityButton = useSelector((state) => state.showNextActivityButton);
  const showNextWeekButton = useSelector((state) => state.showNextWeekButton);
  const responseRecieved = useSelector((state) => state.responseRecieved);
  const companies = useSelector((state) => state.user.savegame.companies);
  const championships = useSelector((state) => state.user.savegame.championships);
  const wrestlers = useSelector((state) => state.user.savegame.wrestlers);
  const feuds = useSelector((state) => state.user.savegame.feuds);
  const playerWrestler = useSelector((state) => state.user);
  
const timeToOpenSpot = useSelector((state) => state.timeToOpenSpot);
const week = useSelector((state) => state.week);
const story = useSelector((state) => state.story);
const eventType = useSelector((state) => state.eventType);




  

 
  // Function to create a feud around a wrestler with requirements based on alignment and same charisma
  const createFeud = (wrestler) => {
    const alignmentRequirement = wrestler.alignment === 'face' ? 'heel' : 'face';
    const charismaRequirement = wrestler.charisma;

    const newFeud = {
      id: feuds.length + 1, // Assign a unique ID for the new feud
      name: `Feud with ${wrestler.name}`,
      opponent: [wrestler],
      ally: [],
      requirements: {
        alignment: alignmentRequirement,
        charisma: charismaRequirement,
      },
      length: 2, // You can set the initial length as needed
      tags: [], // Add tags if needed
      multiplier: 1.2, // Set the initial multiplier as needed
      isCurrentFeud: false,
    };
 // Check if the opponent wrestler is a champion
 if (wrestler.isChampion) {
  newFeud.championshipFeud = true;
  newFeud.championshipTitle = wrestler.championshipHeld;
}else if (playerWrestler.champion===true){
  newFeud.championshipFeud = true;
  newFeud.championshipTitle = playerWrestler.currentChampionshipHeld;
}
 else {
  newFeud.championshipFeud = false;
  newFeud.championshipTitle = {};
}
console.log(newFeud);
    // Add the new feud to the feuds array
    dispatch(addFeud(newFeud));
    
    return newFeud;
  };
  
  
   

  


  // Function to get a random stat change for the player
  const getRandomStatChange = () => {
    const randomStat = ['popularity', 'inRingSkill', 'alignment', 'charisma'][
      Math.floor(Math.random() * 4)
    ];
    const randomChange = Math.random() > 0.5 ? 1 : -1;

    if (randomStat === 'alignment') {
      // Randomly change the player's alignment
      const newAlignment = Math.random() > 0.5 ? 'face' : 'heel';
      dispatch(setAlignment(newAlignment))
    } else if (randomStat === 'charisma') {
      // Randomly change the player's charisma
      const newCharisma = Math.random() > 0.5 ? 'comedic' : 'menacing';
      dispatch(setCharisma(newCharisma))
    } else {
      if (randomStat === 'popularity') {
        dispatch(setPopularity(randomChange));
      } else if (randomStat === 'inRingSkill') {
        dispatch(setInRingSkill(randomChange));
      }
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

     dispatch(setCompanies(updatedCompanies));
  
  };

  // Function to update multipliers for all potential feuds based on player stats
  const updateMultipliers = () => {
    const updatedFeuds = feuds.map((feud) => {
      const { requirements, opponent, ally } = feud;
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
  
      // Calculate average relationship value for all involved wrestlers
      const allInvolvedWrestlers = [...opponent, ...ally, playerWrestler];
      const totalRelationship = allInvolvedWrestlers.reduce(
        (sum, wrestler) => sum + (wrestler.relationship || 0),
        0
      );
      const averageRelationship = totalRelationship / allInvolvedWrestlers.length;
  
      // Adjust the multiplier based on the average relationship value
      multiplier += averageRelationship * 0.05; // For example, add 0.05 for every point of average relationship
  
      // Add more requirements checks and adjustments as needed
  
      return { ...feud, multiplier };
    });
   dispatch(setFeud(updatedFeuds));
  
  };
  
 
  const updateActiveFeudMultiplier = () => {
    // Check if there is an active feud
    if (!playerWrestler.activeFeud.name || playerWrestler.activeFeud.name ==='Higgins') {
      if(playerWrestler.activeFeud.name ==='Higgins'){
         dispatch(setActiveFeud({}));
          dispatch(setCurrentPotentialFeud({}));
      }
      return; // No active feud, no need to update multipliers
    }
  
    const { opponent, ally } = playerWrestler.activeFeud;
  
    // Calculate the existing multiplier (if any) from the active feud
    let activeFeudMultiplier = playerWrestler.activeFeud.multiplier || 1;
  
    // Compare the player's stats with the active feud's requirements and update the multipliers accordingly
    if (playerWrestler.alignment === playerWrestler.activeFeud.requirements.alignment) {
      activeFeudMultiplier += 0.5;
    }
    if (playerWrestler.charisma === playerWrestler.activeFeud.requirements.charisma) {
      activeFeudMultiplier += 0.3;
    }
  
    // Popularity-based adjustment for opponents
    const popularityDifference = playerWrestler.popularity - 5;
    if (popularityDifference > 0) {
      // Increase by 0.1 for every popularity point above 5
      activeFeudMultiplier += popularityDifference * 0.1;
    } else if (popularityDifference < 0) {
      // Decrease by 0.1 for every popularity point below 3
      activeFeudMultiplier -= Math.abs(popularityDifference) * 0.1;
    }
  
    // Calculate average relationship value for opponents
    if (opponent.length > 0) {
      const totalOpponentRelationship = opponent.reduce(
        (sum, wrestler) => sum + (wrestler.relationship || 0),
        0
      );
      const averageOpponentRelationship = totalOpponentRelationship / opponent.length;
  
      // Adjust the activeFeudMultiplier based on the average relationship value for opponents
      if (averageOpponentRelationship < 0) {
        activeFeudMultiplier += Math.abs(averageOpponentRelationship) * 0.05; // Add 0.05 for every point of average negative relationship
      }
    }
  
    // Calculate average relationship value for allies
    if (ally.length > 0) {
      const totalAllyRelationship = ally.reduce(
        (sum, wrestler) => sum + (wrestler.relationship || 0),
        0
      );
      const averageAllyRelationship = totalAllyRelationship / ally.length;
  
      // Adjust the activeFeudMultiplier based on the average relationship value for allies
      if (averageAllyRelationship < 0) {
        activeFeudMultiplier += Math.abs(averageAllyRelationship) * 0.05;
      }
    }
 
    // Update the active feud's multiplier
    dispatch(setActiveFeudMultiplier(activeFeudMultiplier));
  
  };
  



  // Function to handle the "Next Week" button click
  const handleNextWeek = () => {
    updateMultipliers();
      // Check if the feuds array has less than 3 feuds and create a new feud
  if (feuds.length < 5) {
    const randomWrestler = wrestlers[Math.floor(Math.random() * wrestlers.length)];
    createFeud(randomWrestler);
  
  }

    if (week<4){
      const prevWeek=week+1
       dispatch(setWeek({ week: prevWeek  }));
 
        
    }else{
      dispatch(setWeek({ week:1 }));
    }
    if (week===4){
       dispatch(setEventType({ eventType: 'PPV' }));
   
    }else{
       dispatch(setEventType({ eventType: 'weeklyTV' }));
    
    }
    
    getRandomStatChange();
  
    updateActiveFeudMultiplier()
    updateCompanyBenchmarks();
const openSpot=timeToOpenSpot-1

     dispatch(setTimeToOpenSpot({ timeToOpenSpot: openSpot }));
   
    // Check if there is a current potential feud
    if (playerWrestler.currentPotentialFeud.name) {
      if (playerWrestler.currentPotentialFeud.name==='Higgins') {  dispatch(setCurrentPotentialFeud({}));}
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
          if (playerWrestler.currentPotentialFeud.name) {
            // Find and remove the current potential feud from the feuds array
            const updatedFeuds = feuds.filter((feud) => feud.id !== playerWrestler.currentPotentialFeud.id);
            dispatch(setFeud(updatedFeuds));
          }

          dispatch(setActiveFeud(playerWrestler.currentPotentialFeud))
          dispatch(setCurrentPotentialFeud({}));
         dispatch(setStory({ story:  `Congratulations! The booker picked up your feud with ${
          playerWrestler.currentPotentialFeud.opponent[0].name
        } and it has become an active feud.` }));
     

         dispatch(setIsFeudActive({ isFeudActive: true }));
       
        // Reset the timeToOpenSpot counter to its initial value (e.g., 0) when the feud becomes active
      
         dispatch(setTimeToOpenSpot({ timeToOpenSpot: 5 }));
      }
      } else {

        dispatch(setStory({ story:  `The booker didn't choose any feud for this week. The next spot will be open in ${
          5 - timeToOpenSpot
        } weeks.`}));
      
        setIsFeudActive(false);
      }
      dispatch(setTimeToOpenSpot({ timeToOpenSpot: 5 }));
    }
    } else {
   
    }
    if(feuds[0].opponent.length!==0){
   
      // If there is no current potential feud.
      const randomFeud = feuds[Math.floor(Math.random() * feuds.length)];
      const randomMultiplier = randomFeud.multiplier;
      const randomValue = Math.random() * 4; // Generates a random number between 0.0 and 3.99

      // Calculate additional weeks for feud length based on charisma comparison
      let additionalWeeks = 0;
      const playerCharisma = playerWrestler.charisma;
      const companyPreferredCharisma = playerWrestler.currentCompany.preferredCharisma;
      if (playerCharisma === companyPreferredCharisma) {
        additionalWeeks = 6; // If player's charisma matches company's preferred, add 6 weeks
        updateFeudLengthWithAdditionalWeeks(randomFeud,additionalWeeks)

      } else if (
        (playerCharisma === 'comedic' && companyPreferredCharisma === 'menacing') ||
        (playerCharisma === 'menacing' && companyPreferredCharisma === 'comedic')
      ) {
        additionalWeeks = 4; // If player's charisma is opposite to company's preferred, add 4 week
        updateFeudLengthWithAdditionalWeeks(randomFeud,additionalWeeks)
      }

      function updateFeudLengthWithAdditionalWeeks( randomFeud, additionalWeeks) {
        // Create a copy of the feuds array
        const updatedFeuds = [...feuds];
      
        // Find the index of the randomFeud object in the updatedFeuds array
        const randomFeudIndex = updatedFeuds.findIndex((feud) => feud.id === randomFeud.id);
      
        // Create a copy of the randomFeud object and update its length property
        const updatedRandomFeud = { ...randomFeud, length: additionalWeeks };
      
        // Update the updatedFeuds array with the updatedRandomFeud object at the randomFeudIndex
        updatedFeuds[randomFeudIndex] = updatedRandomFeud;
        // dispatch(setFeud(updatedFeuds));
        // Return the updated feuds array
        return updatedFeuds;
      }
      console.log('chance ' + randomMultiplier);
      console.log(randomValue);
      if (randomValue <= randomMultiplier) {
         dispatch(setCurrentPotentialFeud(randomFeud));
      
        dispatch(setStory({ story: `The booker is considering a feud against ${randomFeud.opponent[0].name}`}));
        setIsFeudActive(true);
      } else {
       dispatch(setStory({ story: "The booker didn't choose any feud for this week."}));
        setIsFeudActive(false);
      }
      if (playerWrestler.activeFeud.name) {
       // Subtract 1 from the length of the active feud each week
       dispatch(setActiveFeudLength());
      
   
       // Check if the active feud's length has reached 0
       if (playerWrestler.activeFeud.length === 0) {
         // Reset the active feud when its length is 0
         dispatch(setPastFeuds([...user.pastFeuds, playerWrestler.activeFeud]));
         dispatch(setActiveFeud({}));
       }
     }
    }else{
      const updatedFeuds = [...feuds.slice(1)];
      const randomWrestler = wrestlers[Math.floor(Math.random() * wrestlers.length)];
     
      dispatch(setFeud(updatedFeuds));
      createFeud(randomWrestler);
console.log(feuds);
    }
       
    
    if (timeToOpenSpot<= 0){
      dispatch(setTimeToOpenSpot({ timeToOpenSpot: 5 }));
    }
  };


  // Use useEffect to update multipliers when player stats change
  useEffect(() => {
    updateActiveFeudMultiplier()
  }, [playerWrestler.alignment, playerWrestler.charisma,]);

  return (
    <div>
    <p> week: {week}</p>
      <p>{story}</p>
      <h3>Player Wrestler</h3>
      <p>Name: {playerWrestler.firstName}</p>
      <p>Charisma: {playerWrestler.charisma}</p>
      <p>Alignment: {playerWrestler.alignment}</p>
      <p>Popularity: {playerWrestler.popularity}</p>
      <p>In-Ring Skill: {playerWrestler.inRingSkill}</p>
 {/* Display the active feud when isFeudActive is true */}
 { playerWrestler.activeFeud.name && (
      <div>
        <h3>Active Feud</h3>
        <p>Name: {playerWrestler.activeFeud.name}</p>
        <p>intensity: {playerWrestler.activeFeud.multiplier}</p>
        <p>Weeks Remaining: {playerWrestler.activeFeud.length}</p>
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
      <Live activeFeud={playerWrestler.activeFeud} eventType={eventType} week={week}  />
    </div>
  );
};

export default GameLogic;
