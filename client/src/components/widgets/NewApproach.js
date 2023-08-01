import React, { useState } from 'react';
import { isEqual } from 'lodash';
import { getDifferencesAndParameters, calculateStatChange} from './gameFunctions/GameFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {setMessages,setEventType,setDecisionButtonClicked, setActiveFeud, setTags,setFirstName,setCurrentCompany,setCompanies, setAlignment,setPopularity,setActiveTab, setWrestlers, setInRingSkill} from 'state'
import { setStats } from 'state';



const Game = () => {


    const dispatch = useDispatch();
  
const currentCompanyName = useSelector((state) => state.user.currentCompany.name);
const baseWrestlers = useSelector((state) => state.user.savegame.wrestlers);
const activeFeud = useSelector((state) => state.user.activeFeud);
const player = useSelector((state) => state.user);
const playerTags = useSelector((state) => state.user.tags);

console.log(activeFeud);


  const wrestlers = baseWrestlers.filter((wrestler) => wrestler.company !== currentCompanyName);

const messages = useSelector((state) => state.messages);
const eventType = useSelector((state) => state.eventType);
const decisionButtonClicked = useSelector((state) => state.decisionButtonClicked);


 
  
  const toggleEventType = () => {
    setEventType(prevEventType => (prevEventType === 'weeklyTv' ? 'PPV' : 'weeklyTv'));
   
  };


// Function to check if a value is lower than a specified threshold
function isLower(value, threshold) {
  return value < threshold;
}





    function removePlayerTag(tagToRemove) {
      const mirrorTags = [...playerTags];
      const updatedMirrorTags = mirrorTags.filter((tag) => !isEqual(tag, tagToRemove));
      dispatch(setTags(updatedMirrorTags));
      }
      
      function removeActiveFeudTag(tagToRemove) {
        const mirrorActiveFeud = { ...activeFeud };
        const updatedTags = mirrorActiveFeud.tags.filter((tag) => !isEqual(tag, tagToRemove));
        mirrorActiveFeud.tags = updatedTags;
    
        // Dispatch the setActiveFeud action to update the original activeFeud object
        dispatch(setActiveFeud(mirrorActiveFeud));
      }

    
    






const handleAngle = (action) => {
  setMessages([]);

  // Define player stats object with default values
  const playerStats = {
    playerPopularity: player.popularity, // affected by 'Get Over'/'Put Over'
    feudMultiplier: activeFeud.multiplier, // affected by 'Bad Ass','Mysterious','Egomaniac','Business Minded','Political Schemer','Inspiring','Lone Wolf','Protege','Prodigy','Authority','Lover Boy','Veteran','Heroic','Unstable'
    opponentRelationship: activeFeud.opponent[0].relationship, // 'Dominant', 'Underdog'
    opponentPopularity:  activeFeud.opponent[0].popularity,
    feudLength: activeFeud.length, // affected by 'face'/ 'heel'
    inRingSkill: activeFeud.requirements.inRingSkill, // affected by 'highflyer', 'brawler', 'technical'
    bookerRelationship:player.currentCompany.bookerOpinion,
    lockerroomRelationshipChange:0,
  };

    const requirements = Object.values(activeFeud.requirements);
  const storylineTags = activeFeud.storyline.role;
  const checks = [
    ...activeFeud.format,
    ...storylineTags,
    ...requirements,
    ...activeFeud.aim,
    ...player.activeFeud?.tags,
    ...player.tags,
  ];
console.log(requirements);
  // Helper function to update player stats based on the presence of tags and checks
  const updateStatsForTag = (tag) => {
    if (action.tags.includes(tag)) {

      
      // If the tag is present in action.tags, increase the related stat by 1
      if (tag === 'Get Over' ) {
        playerStats.playerPopularity = (playerStats.playerPopularity || 0) + 1;
      } 
      if (tag === 'Burial' ) {
        playerStats.lockerroomRelationshipChange = (playerStats.lockerroomRelationshipChange || 0) -3;
        playerStats.playerPopularity=(playerStats.playerPopularity||0)-5
      } 
        if ( tag === 'Put Over') {
        playerStats.playerPopularity = (playerStats.playerPopularity || 0) - 1;
        playerStats.opponentRelationship = (playerStats.opponentRelationship || 0) + 1;

      } 
       if (['Bad Ass', 'Mysterious', 'Egomaniac', 'Business Minded', 'Political Schemer', 'Inspiring', 'Lone Wolf', 'Protege', 'Prodigy', 'Authority', 'Lover Boy', 'Veteran', 'Heroic', 'Unstable'].includes(tag)) {
        playerStats.feudMultiplier = (playerStats.feudMultiplier || 0) + 1;
      } 
       if (['Dominant', 'Underdog'].includes(tag)) {
        playerStats.opponentRelationship = (playerStats.opponentRelationship || 0) + 1;
      } 

      // check for matching and  mismatched alignments
       if (tag === 'face' && player.alignment === 'face') {
        playerStats.feudLength = (playerStats.feudLength || 0) + 1;
      } 
        if (tag === 'heel' && player.alignment === 'heel') {
        playerStats.feudLength = (playerStats.feudLength || 0) + 1;
      } 
        if (tag === 'face' && player.alignment === 'heel') {
        playerStats.feudLength = (playerStats.feudLength || 0) + 1;
      } 
        if (tag === 'heel' && player.alignment === 'face') {
        playerStats.feudLength = (playerStats.feudLength || 0) + 1;
      } 
       if (['highflyer', 'brawler', 'technical'].includes(tag)) {
        if (tag === player.Style) {
          playerStats.inRingSkill = (playerStats.inRingSkill || 0) + 1;
        } else {
          playerStats.inRingSkill = (playerStats.inRingSkill || 0) -1;

        }
      }
    }

    if (action.tags.includes(tag) && checks.includes(tag)) {
      // If the tag is present in both action.tags and checks, increase the related stat by 5
      if (['Bad Ass', 'Mysterious', 'Egomaniac', 'Business Minded', 'Political Schemer', 'Inspiring', 'Lone Wolf', 'Protege', 'Prodigy', 'Authority', 'Lover Boy', 'Veteran', 'Heroic', 'Unstable'].includes(tag)) {
        playerStats.feudMultiplier = (playerStats.feudMultiplier || 0) + 5;
      }
      if (['Dominant', 'Underdog', ].includes(tag)) {
        playerStats.feudMultiplier = (playerStats.feudMultiplier || 0) + 1;
      }
    }


    if (!action.tags.includes(tag) && checks.includes(tag)) {
      // If the tag is in checks but not in action.tags, decrease the related stat by 2
      if (['Get Over', 'Put Over'].includes(tag)) {
        playerStats.playerPopularity = (playerStats.playerPopularity || 0) - 2;
      } 
       if (['Bad Ass', 'Mysterious', 'Egomaniac', 'Business Minded', 'Political Schemer', 'Inspiring', 'Lone Wolf', 'Protege', 'Prodigy', 'Authority', 'Lover Boy', 'Veteran', 'Heroic', 'Unstable'].includes(tag)) {
        playerStats.feudMultiplier = (playerStats.feudMultiplier || 0) - 2;
      } 
       if (['Dominant', 'Underdog'].includes(tag)) {
        playerStats.opponentRelationship = (playerStats.opponentRelationship || 0) - 2;
      } 
       if (['face', 'heel'].includes(tag)) {
        playerStats.feudLength = (playerStats.feudLength || 0) - 2;
      } 
       if (['highflyer', 'brawler', 'technical'].includes(tag)) {
        playerStats.inRingSkill = (playerStats.inRingSkill || 0) - 2;
      }
    }
  };

  // Check each angleAction's tags and update player stats accordingly
  angleActions.forEach((action) => {
    action.tags.forEach((tag) => {
      updateStatsForTag(tag);
    });
  });

  // Dispatch the updated player stats to your state management system
   const{
    playerPopularity,
    feudMultiplier, 
    feudLength,
    bookerRelationship,
    inRingSkill,
    opponentRelationship,
    lockerroomRelationshipChange
  }= playerStats


  const newCompany = { ...player.currentCompany };

  // Update the bookerOpinion property in the mirror
  newCompany.bookerOpinion += bookerRelationship; // Create a mirror of the wrestlers array and find the opponent mirror by ID
  dispatch(setCurrentCompany(newCompany));

// Create a mirror of player.savegame.companies
const newCompanies = player.savegame.companies.map((company) =>
  company.id === newCompany.id ? newCompany : company
);



 dispatch(setCompanies(newCompanies));

 
  const mirroredWrestlers = wrestlers.map(wrestler => {
  if (wrestler.id === activeFeud.opponent[0]?.id) {
    return {
      ...wrestler,
      relationship: opponentRelationship
    };
  }
  return wrestler;
});
const updatedWrestlers = mirroredWrestlers.map((wrestler) => ({
  ...wrestler,
  relationship: wrestler.relationship + lockerroomRelationshipChange,
}));

const intensity =
feudMultiplier < 20
  ? 'stale'
  : feudMultiplier < 40
  ? 'cold'
  : feudMultiplier < 50
  ? 'tepid'
  : feudMultiplier < 60
  ? 'warm'
  : feudMultiplier < 70
  ? 'hot'
  : feudMultiplier < 80
  ? 'boiling'
  : feudMultiplier < 90
  ? 'mainstream'
  : 'volcanic';

  const activeFeudMirror = {
    ...player.activeFeud,
    length:feudLength,
    multiplier: feudMultiplier,
    intensity:intensity
  };
  dispatch(setWrestlers(updatedWrestlers))
  dispatch(setStats({popularity:playerPopularity,activeFeud:activeFeudMirror,inRingSkill:inRingSkill},))
  // Continue with the rest of y,r handleAngle function
  dispatch(setDecisionButtonClicked(true));
};




  // Step 4: Define the actions the player can take with filter based on tags
  const angleActions = [
    {
      text: 'Use worker\'s private dirt',
      action: 'useWorkersPrivateDirt',
      tags:['Egomaniac','Business Minded','Lone Wolf','Get Over'],
      show: true,
      decision:'You air your target dirty laundry.',
      question: 'You have a chance to expose your opponent by using their private dirt. Will you take advantage of this opportunity?'
    },
    {
      text: 'Use worker\'s private dirt',
      action: 'useWorkersPrivateDirt',
      tags:['Egomaniac','Business Minded','Lone Wolf','Get Over'],
      show: activeFeud.storyline.title==='Sacrifice for a Cause',
      decision:'You air your target dirty laundry.',
      question: 'You have a chance to expose your opponent by using their private dirt. Will you take advantage of this opportunity?'
    },
    {
      text: 'Try to Dominate target',
      action: 'overshadowWorker',
      tags:['Egomaniac','Business Minded',],
      show: eventType === 'weeklyTv', // Set show to true if eventType is 'weeklyTv'
      question: 'You can try to overshadow your opponent and gain more attention. How do you plan to do it?',
    },
    {
      text: 'Befriend worker',
      action: 'befriendWorker',
      tags:['Egomaniac','Business Minded',],
      show: player.tags?.some(tag => 'storyline' && 'storyline2'),
      question: 'Your fan-favorite status and high-flying abilities could help you befriend the worker. How will you approach them?'
    },
    {
      text: 'Throw promo attack on worker',
      action: 'throwPromoAttack',
      tags:['Egomaniac','Business Minded',],
      show: activeFeud.tags?.some(tag => 'storyline3'),
      question: 'Your storyline as an underdog opens an opportunity to throw a promo attack. How will you cut your promo?'
    },
    {
      text: 'Form tag team with worker',
      action: 'formTagTeam',
      tags:['Egomaniac','Business Minded',],
      show: activeFeud.tags?.some(tag => tag === 'The Dominators'),
      question: 'Your rivalry with The Dominators presents a chance to form a tag team with the worker. Will you take this path?'
    },
    {
      text: 'Challenge worker to a match',
      action: 'challengeWorker',
      tags:['Egomaniac','Business Minded',],
      show: activeFeud.tags?.some(tag => tag?.championship === 'Heavy Weight' || tag.billing === 'main event'),
      question: 'Your opportunity for a Heavy Weight Championship match or main event billing allows you to challenge the worker. Will you do it?'
    }
    // Add more actions as needed
  ];

  const handleEndGame = () => {
     dispatch(setActiveTab(undefined));
    console.log('send to tab 1 and disable this tab');
  }


  return (
    <div>
      <h1>Text-Based Game</h1>
      {/* Display player information */}
      <h2>Player</h2>
      <p>Name: {player.firstName}</p>
      <p>Alignment: {player.alignment}</p>
      <p>Popularity: {player.popularity}</p>
      <p>Tags:</p>
      <ul>
        {player.tags?.map((tag, index) => (
          <li key={index}>{JSON.stringify(tag)}</li>
        ))}
      </ul>
  
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message.replace(/target/g, activeFeud?.opponent?.[0]?.name || 'opponent')}</p>
        ))}
      </div>
      <h2>Choose How to Handle the Angle Personally:</h2>
      {!decisionButtonClicked &&
        angleActions.filter(actionItem => actionItem.show).map((actionItem, index) => (
          <div key={index}>
            <p>{actionItem.question}</p>
            <button
              onClick={() => handleAngle(actionItem)}
            >
              {actionItem.text.replace('target', activeFeud?.opponent?.[0]?.name || 'opponent')}
            </button>
          </div>
        ))}
  
      {decisionButtonClicked && (
        <div>
          <p>Game Over! You have reached the end of the game.</p>
          <button onClick={handleEndGame}>End Game</button>
        </div>
      )}
      <button onClick={toggleEventType}>
        Toggle Event Type ({eventType === 'weeklyTv' ? 'Weekly TV' : 'PPV'})
      </button>
  
      {/* Display current storyline information */}
      <h2>Current Storyline</h2>
      {Object.keys(activeFeud).length > 0 ? ( // Add a check to see if activeFeud has been set
        <>
          <p>Title: {activeFeud.name}</p>
          <p>Length: {activeFeud.length}</p>
          <p>Opponents:</p>
          <ul>
            {activeFeud.opponent?.map((opponent, index) => (
              <li key={index}>
                Name: {opponent.name}, Relationship: {opponent.relationship}
              </li>
            ))}
          </ul>
          <p>Intensity: {activeFeud.multiplier}</p>
          <p>Tags:</p>
          <ul>
            {activeFeud.tags?.map((tag, index) => (
              <li key={index}>{JSON.stringify(tag)}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No active feud currently available.</p>
      )}
    </div>
  );
};

export default Game;
