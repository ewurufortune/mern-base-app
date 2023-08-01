import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import JoinCompanyButton from "./joinCompany";
import {
  setName,
  setFirstname,
  setSavegame,
  setTraits,
  setButton1Text,
  setUserResponse,
  setButton2Text,
  setButton1TextValue,
  setButton2TextValue,
  setActionDescription,
  setExecuteAction,
  setShowOptions,
  setShowDescription,
  setDecisionText1,
  setDecisionText2,
  setShowDecisionText,
  setSelectedDecision,
  setShowNextActivityButton,
  setShowNextWeekButton,
  setResponseRecieved,
  setEventType,
  setIsFeudActive,
  setStory,
  setWeek,
  setTimeToOpenSpot,
  setCurrentWeeklyAntic,
  setOptionDescription,
  setSelectedOption,
  setShowActions,
  setShowChampionship,
  setShowEndDayButton,
  setPlayerWrestler,
  setCurrentMatchPlan,
  setCompanies,
  addFeud,
  setWrestlers,
  setStats,
  setCharisma,
  setAlignment,
  setPopularity,
  setInRingSkill,
  setCurrentPotentialFeud,
  setActiveFeud,
  setPastFeuds,
  setIsChampion,
  setCurrentChampionshipHeld,
  setTitleReigns,
  setCurrentCompany,
  setTags,
  setActiveFeudLength,
  setActiveFeudMultiplier,
  setFeud,
  setOtherFeuds,
} from "state";

function Testing() {
  const user = useSelector((state) => state.user);
  const player = useSelector((state) => state.user)
  const otherFeuds = useSelector((state) => state.user.savegame.otherFeuds);
  const feuds = useSelector((state) => state.user.savegame.feuds);
  const [matchLog, setMatchLog] = useState([]);
  const [matchLogWWE, setMatchLogWWE] = useState([]);
  const [matchLogAEW, setMatchLogAEW] = useState([]);
const   activeFeud=useSelector((state) => state.user.activeFeud);
const allWrestlers= useSelector((state) => state.user.savegame.wrestlers);
const week = useSelector((state) => state.week);
const eventType = useSelector((state) => state.eventType);
const playerCompanyName = useSelector((state) => state.user.currentCompany.name);
const playerCompany = useSelector((state) => state.user.currentCompany);
const companies = useSelector((state) => state.user.savegame.companies);


  const createOtherFeuds = () => {
    // Check if the 'feuds' array is empty or if the only feud has 'opponent.length' > 0
    if (feuds.length === 0 || feuds[0].name === "") {
      console.log(
        "Feuds array is empty or feud has no name. Cannot create otherFeuds."
      );
      return;
    }

    // Filter feuds to exclude feuds with no opponent or where the opponent's length is zero
    const filteredFeuds = feuds.filter((feud) => feud.opponent.length > 0);

  // Choose a random feud from the filtered list
  const randomFeudIndex = Math.floor(Math.random() * filteredFeuds.length);
  const randomFeud = filteredFeuds[randomFeudIndex];

  const updatedFeuds = filteredFeuds.filter((feud, index) => index !== randomFeudIndex);

  // Update the feuds array with the filtered array
  dispatch(setFeud(updatedFeuds));
    // Check the alignment of the selected feud's opponent
    const { alignment } = randomFeud.opponent[0];
const{ company}=randomFeud

    // Filter wrestlers array to get a random wrestler with the opposite alignment and not currently feuding
    const opposingAlignment = alignment === "face" ? "heel" : "face";
    const availableWrestlers = user.savegame.wrestlers.filter(
      (wrestler) =>
        wrestler.alignment === opposingAlignment &&
        wrestler.company === randomFeud.company &&
        !wrestler.isFeuding
    );
    console.log(company);
    console.log(availableWrestlers);
    // If there are no available wrestlers with the opposite alignment, we can't create otherFeuds
    if (availableWrestlers.length === 0) {
      console.log(
        `No available wrestlers with ${opposingAlignment} alignment and not currently feuding. Cannot create otherFeuds.`
      );
      return;
    }

    // Select a random wrestler from the available wrestlers
    const randomWrestler =
      availableWrestlers[Math.floor(Math.random() * availableWrestlers.length)];

    let totalPopularity = 0;
    let totalWrestlers = 0;

    if (randomFeud.opponent && randomFeud.opponent.length > 0) {
      randomFeud.opponent.forEach((wrestler) => {
        if (wrestler.popularity) {
          totalPopularity += wrestler.popularity;
          totalWrestlers++;
        }
      });
    }

    // Add the popularity of the randomWrestler to the totalPopularity
    if (randomWrestler.popularity) {
      totalPopularity += randomWrestler.popularity;
      totalWrestlers++;
    }

    // Calculate the average popularity (ranging from 0 to 10)
    const averagePopularity =
      totalWrestlers > 0
        ? Math.min(10, Math.ceil(totalPopularity / totalWrestlers))
        : 0;

    // Set the length property of the otherFeud based on the average popularity
    const maxLength = 10; // Maximum length is 10
    const minLength = 1; // Minimum length is 1

    // Scale the averagePopularity to the range of minLength to maxLength
    const length =
      minLength +
      Math.round((maxLength - minLength) * (averagePopularity / 10));
    const multiplier =
      minLength +
      Math.round((maxLength - minLength) * (averagePopularity / 100));

    let intensity = "";
    if (averagePopularity > 9) {
      intensity = "Volcanic";
    }
    if (averagePopularity > 8) {
      intensity = "Boiling";
    }
    if (averagePopularity > 7) {
      intensity = "Mainstream";
    } else if (averagePopularity > 6) {
      intensity = "hot";
    } else if (averagePopularity > 5) {
      intensity = "warm";
    } else {
      intensity = "stale";
    }
    console.log(length);
    console.log(multiplier);
    // Create the otherFeuds object
    const newOtherFeud = {
      id: randomFeud.id, // You can use the feud's ID or assign a new ID here
      name: randomFeud.name,
      face: alignment === "face" ? randomFeud.opponent : [randomWrestler],
      heel: alignment === "heel" ? randomFeud.opponent : [randomWrestler],
      championshipFeud: randomFeud.championshipFeud,
      championship: randomFeud.championship || {},
      company:company,
      multiplier,
      intensity,
      length,
    };

      // Update the isFeuding property for the wrestlers involved in the feud
  const updatedWrestlers = user.savegame.wrestlers.map((wrestler) => {
    if (newOtherFeud.face.some((w) => w.id === wrestler.id) || newOtherFeud.heel.some((w) => w.id === wrestler.id)) {
      return {
        ...wrestler,
        isFeuding: true,
      };
    } else {
      return wrestler;
    }
  });

    dispatch(setWrestlers(updatedWrestlers));

    const updatedOtherFeuds = [...otherFeuds, newOtherFeud];
    dispatch(setOtherFeuds(updatedOtherFeuds));
    console.log(otherFeuds);
  };

  const dispatch = useDispatch();

  const handleCreateOtherFeuds = () => {
    createOtherFeuds();
  };
  const handleUpdateAndEliminate = () => {
    updateAndEliminateOtherFeuds();
  };

 const updateAndEliminateOtherFeuds = () => {
  if (otherFeuds.length === 0 || (otherFeuds.length === 1 && otherFeuds[0].name === "")) {
    console.log(user.savegame.wrestlers);
    console.log("No otherFeuds yet");
    return;
  }

  // Calculate the average popularity of the wrestlerObjects in the face and heel arrays
const calculateAveragePopularity = (feud) => {
  let totalPopularity = 0;
  let totalWrestlers = 0;

  if (feud.face && feud.face.length > 0) {
    feud.face.forEach((wrestlerObject) => {
      if (wrestlerObject.popularity) {
        totalPopularity += wrestlerObject.popularity;
        totalWrestlers++;
      }
    });
  }

  if (feud.heel && feud.heel.length > 0) {
    feud.heel.forEach((wrestlerObject) => {
      if (wrestlerObject.popularity) {
        totalPopularity += wrestlerObject.popularity;
        totalWrestlers++;
      }
    });
  }

  // Calculate the average popularity (ranging from 0 to 10)
  return totalWrestlers > 0
    ? Math.min(10, Math.ceil(totalPopularity / totalWrestlers))
    : 0;
};

  console.log(otherFeuds);
  const updatedOtherFeuds = otherFeuds.map((feud) => {
    const updatedFeud = { ...feud };
    updatedFeud.length--;

    // Calculate the average popularity for the updated feud
    const averagePopularity = calculateAveragePopularity(feud);
    updatedFeud.multiplier = 0.1 * averagePopularity;

    // Update the intensity based on the average popularity
    if (averagePopularity > 9) {
      updatedFeud.intensity = "volcanic";
    } else if (averagePopularity > 8) {
      updatedFeud.intensity = "boiling";
    } else if (averagePopularity > 7) {
      updatedFeud.intensity = "mainstream";
    } else if (averagePopularity > 6) {
      updatedFeud.intensity = "hot";
    } else if (averagePopularity > 5) {
      updatedFeud.intensity = "warm";
    } else {
      updatedFeud.intensity = "stale";
    }

  // Check if the length is greater than 0, if so, add the feud to the updatedOtherFeuds array
if (updatedFeud.length > 0) {
  return updatedFeud;
} else {
  // The feud's length has become zero or less, so it will be eliminated.
  // Before eliminating, push the feud into the pastFeuds of the corresponding wrestlerObjects

  const updatedWrestlers = user.savegame.wrestlers.map((wrestler) => {
    if (updatedFeud.face && updatedFeud.face.length > 0) {
      if (updatedFeud.face.some((wrestlerObject) => wrestler.id === wrestlerObject.id)) {
        // This wrestler is involved in the eliminated feud
        // Update the wrestler's past feuds
        return {
          ...wrestler,
          isFeuding: false,
          pastFeuds: [...(wrestler.pastFeuds || []), { ...updatedFeud }],
        };
      }
    }

    if (updatedFeud.heel && updatedFeud.heel.length > 0) {
      if (updatedFeud.heel.some((wrestlerObject) => wrestler.id === wrestlerObject.id)) {
        // This wrestler is involved in the eliminated feud
        // Update the wrestler's past feuds
        return {
          ...wrestler,
          isFeuding: false,
          pastFeuds: [...(wrestler.pastFeuds || []), { ...updatedFeud }],
        };
      }
    }

    return wrestler;
  });

  dispatch(setWrestlers(updatedWrestlers));

  // The feud's length is now 0, so we don't need to include it in the updatedOtherFeuds array
  return updatedFeud;
}

});

// Remove feuds with length less than or equal to 0 from the updatedOtherFeuds array
  const filteredOtherFeuds = updatedOtherFeuds.filter((feud) => feud.length > 0);

  dispatch(setOtherFeuds(filteredOtherFeuds));
  console.log(updatedOtherFeuds);
  const updateWrestlersFeudingStatus = () => {
    // Create an array to store the IDs of wrestlers involved in any feud
    const feudingWrestlerIds = [];
  
    // Add wrestlers from otherFeuds to the feudingWrestlerIds array
    otherFeuds.forEach((feud) => {
      if (feud.face && feud.face.length > 0) {
        feud.face.forEach((wrestler) => {
          feudingWrestlerIds.push(wrestler.id);
        });
      }
  
      if (feud.heel && feud.heel.length > 0) {
        feud.heel.forEach((wrestler) => {
          feudingWrestlerIds.push(wrestler.id);
        });
      }
    });
  
    // Add wrestlers from activeFeud to the feudingWrestlerIds array
    if (activeFeud.opponent && activeFeud.opponent.length > 0) {
      activeFeud.opponent.forEach((wrestler) => {
        feudingWrestlerIds.push(wrestler.id);
      });
    }
  
    // Update the wrestlers array with the isFeuding property
    const updatedWrestlers = allWrestlers.map((wrestler) => {
      return {
        ...wrestler,
        isFeuding: feudingWrestlerIds.includes(wrestler.id),
      };
    });
  
  console.log( updatedWrestlers)
  };
  
  return updatedOtherFeuds;
};




    const [eventLog, setEventLog] = useState([]); // Array to store event logs



  // Function to generate a random integer between min and max (inclusive)
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Array of possible stat changes along with descriptions
  const statChanges = [
    {
      stat: 'popularity',
      description: 'gained popularity after a thrilling match.',
    },
    {
      stat: 'inRingSkill',
      description: 'improved in-ring skills through intense training.',
    },
    {
      stat: 'charisma',
      description: 'took acting classes and is now more comedic.',
      value: 'comedic',
    },
    {
      stat: 'charisma',
      description: 'got a tattoo and is now more menacing.',
      value: 'menacing',
    },
    // Add more unique stat changes with descriptions as desired
  ];

  const rarityWeights = [4, 3, 2, 1]; // Weights for rarity selection


  const randomEvent = () => {
       // Select a random number of wrestlers between 1 and 4 based on rarity
       const numWrestlers = rarityWeights[getRandomInt(0, rarityWeights.length - 1)];

       // Select unique random wrestlers from the user's wrestlers array
       const selectedWrestlers = [];
       while (selectedWrestlers.length < numWrestlers) {
         const randomIndex = getRandomInt(0, user.savegame.wrestlers.length - 1);
         const selectedWrestler = user.savegame.wrestlers[randomIndex];
         if (!selectedWrestlers.includes(selectedWrestler)) {
           selectedWrestlers.push(selectedWrestler);
         }
       }
   
       // Randomly select a stat change from the mapping
       const selectedChange = statChanges[getRandomInt(0, statChanges.length - 1)];
   
       // Update the selected wrestler's stat and generate description
       const updatedWrestlers = user.savegame.wrestlers.map((wrestler) => {
         if (selectedWrestlers.includes(wrestler)) {
           return {
             ...wrestler,
             [selectedChange.stat]:
               selectedChange.value || Math.max(1, wrestler[selectedChange.stat]), // Ensure the stat is at least 1
           };
         }
         return wrestler;
       
       });
      
    dispatch(setWrestlers(updatedWrestlers));
       // Generate a text explaining the change
       const wrestlerNames = selectedWrestlers.map((wrestler) => wrestler.name);
       const formattedWrestlerNames =
       wrestlerNames.length > 1
         ? `${wrestlerNames.slice(0, -1).join(', ')} and ${wrestlerNames.slice(-1)}`
         : wrestlerNames[0];
   
     const changeText = `Random event occurred! Wrestlers ${formattedWrestlerNames} ${selectedChange.description}`;
   
   
       // Push the text explanation to the eventLog array
       setEventLog((prevEventLog) => {
         // Remove the oldest log entry if the event log has reached its maximum length (5)
         if (prevEventLog.length >= 5) {
           return [changeText, ...prevEventLog.slice(0, 4)];
         }
         return [changeText, ...prevEventLog];
       });
   
    // e.g., dispatch(setWrestlers(updatedWrestlers));
 
 
  };
  const getLogEntryStyle = (index) => {
    if (eventLog.length >= 5) {
      if (index < 3) return { color: 'blue' };
      else if (index >= eventLog.length - 3) return { color: 'red' };
    }
    return {}; // Default style, no special coloring
  };



  function otherFeudAction() {
    // Step 2: Create a matchLog state, which is an array
    const matchLog = [];
    const matchLogWWE = [];
    const matchLogAEW = [];
  
    // Step 3: Rearrange the otherFeuds array with the otherFeudsObject with the highest .multiplier at the top
    const sortedOtherFeuds = [...otherFeuds].sort((a, b) => b.multiplier - a.multiplier);
  
    // Step 4: Loop through each otherFeudsObject in the otherFeudsArray
    sortedOtherFeuds.forEach((otherFeud) => {
      // Step 5: Extract the wrestlerObjects from the face and heel arrays
      const faceWrestlers = otherFeud.face;
      const heelWrestlers = otherFeud.heel;
  
      // Step 6: Generate text based on eventType and length using wrestlerObjects in the Face and Heel arrays
      let text = '';
      if (eventType === 'weeklyTV') {
        // Generate text for weekly TV events based on segments
        text = generateWeeklyTVText(faceWrestlers, heelWrestlers, otherFeud.length, otherFeud.intensity);
      } else if (eventType === 'PPV') {
        if (faceWrestlers.length + heelWrestlers.length === 2) {
          // Generate text for one-on-one match for PPV events
          text = generateOneOnOneText(faceWrestlers, heelWrestlers, otherFeud.length, otherFeud.intensity);
        } else if (faceWrestlers.length + heelWrestlers.length === 4 && otherFeuds.length > 2) {
          // Generate text for gimmick match for PPV events with more than 2 otherFeudsObjects
          text = generateGimmickMatchText(faceWrestlers, heelWrestlers, otherFeud.length, otherFeud.intensity);
        } else {
          // Generate text for tag team match for PPV events
          text = generateTagTeamText(faceWrestlers, heelWrestlers, otherFeud.length, otherFeud.intensity);
        }
      }
  
      // Step 9: Put the generated text in the matchLog array
      matchLog.push(text);
  
      // Step 11: Determine the company name of the wrestlers involved in the feud
      const wrestlerCompany = faceWrestlers[0]?.company || heelWrestlers[0]?.company;
  
      // Step 12: Add the generated text to the respective matchLog state based on the wrestler's company
      if (wrestlerCompany?.toLowerCase() === 'wwe') {
        matchLogWWE.push(text);
      } else if (wrestlerCompany?.toLowerCase() === 'aew') {
        matchLogAEW.push(text);
      }
    });
  
    // Step 10: Display the matchLog array
    console.log(matchLog);
    setMatchLog(matchLog);
  
    // Step 13: Set the state for matchLogWWE and matchLogAEW
    setMatchLogWWE(matchLogWWE);
    setMatchLogAEW(matchLogAEW);
  }

// Helper functions to generate text for different event types
function generateWeeklyTVText(faceWrestlers, heelWrestlers, length,intensity) {
  // Generate text based on segments like brawling, interference, distraction, beatdown, etc.
  // Customize the text generation logic based on your requirements
  return `Weekly TV Event Text  ${faceWrestlers[0].name} vs ${heelWrestlers[0].name} is ${intensity}`;
}

function generateOneOnOneText(faceWrestlers, heelWrestlers, length,intensity) {
  // Generate text for one-on-one match for PPV events
  // Customize the text generation logic based on your requirements
  return `One-on-One Match Text for ${faceWrestlers[0].name} vs ${heelWrestlers[0].name} is ${intensity}`;
}

function generateGimmickMatchText(faceWrestlers, heelWrestlers, length,intensity) {
  // Generate text for gimmick match for PPV events with more than 2 otherFeudsObjects
  // Customize the text generation logic based on your requirements
  return `Gimmick Match Text for for ${faceWrestlers[0].name} vs ${heelWrestlers[0].name} is ${intensity}`;
}

function generateTagTeamText(faceWrestlers, heelWrestlers, length,intensity) {
  // Generate text for tag team match for PPV events
  // Customize the text generation logic based on your requirements
  return `Tag Team Match Text for for ${faceWrestlers[0].name} vs ${heelWrestlers[0].name} is ${intensity}`;
}


  const handleGenerateMatchLog = () => {
    otherFeudAction(); // Call the function to generate the match log
  };


  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 
// Function to create a feud object
const createFeudElement = (opponents) => {
  const sameCompanyOpponents = opponents.filter((wrestler) => !wrestler.isFeuding && wrestler.company === player.company);
  const opponent = sameCompanyOpponents[Math.floor(Math.random() * sameCompanyOpponents.length)];

  if (!opponent) {
    console.log('No available opponents for feud');
    return ; 
  }
const format=['getting over', 'putting over', 'rivalry'][getRandomNumber(0, 3)]
  const length = 2; // Default length of the feud
  const opponentPopularity = opponent.popularity;
  const playerPopularity = player.popularity;
  const defaultMultiplier = (opponentPopularity + playerPopularity) / 2;
  const multiplier = defaultMultiplier; // Default multiplier based on average popularity
  const intensity =
    multiplier < 20
      ? 'stale'
      : multiplier < 40
      ? 'cold'
      : multiplier < 50
      ? 'tepid'
      : multiplier < 60
      ? 'warm'
      : multiplier < 70
      ? 'hot'
      : multiplier < 80
      ? 'boiling'
      : multiplier < 90
      ? 'mainstream'
      : 'volcanic';


  // Generate random values for the requirements
  const requirements = {
    alignment: opponent.alignment,
    style: opponent.style,
    relationshipOpponentRelationship: getRandomNumber(6, 10), // Random number between 6 and 10
    inTeam: false,
    inFaction: false,
    championshipFeud: opponent.isChampion || Math.random() < 0.2, // 20% chance if opponent is not champion
    championshipName: opponent.isChampion ? opponent.championshipHeld : '',
    role: 'wrestler',
    gimmick: ['supernatural', 'monster', 'anti-establishment', 'superhero', 'showman'][getRandomNumber(0, 4)],
    gender: opponent.gender,
    bodytype: ['muscular', 'athletic', 'fat', 'slim'][getRandomNumber(0, 3)],
    inRingSkill: format === 'getting over' ? opponent.inRingSkill - getRandomNumber(5, 15) : opponent.inRingSkill + getRandomNumber(5, 15),
    ringPsycholgy: opponent.ringPsycholgy,
    popularity: format === 'getting over' ? opponent.popularity - getRandomNumber(5, 15) : opponent.popularity + getRandomNumber(5, 15),
    age: format === 'getting over' ? opponent.age - getRandomNumber(5, 15) : opponent.age + getRandomNumber(5, 15),
  };

  // Use opponent's company and contract
  const company = opponent.company;
  const contract = opponent.contract;

  // Create the feud object
  const feudObject = {
    id: feuds.length + 1, 
    name: `Feud with ${opponent.name}`,
    opponents: [opponent],
    format,
    length,
    multiplier,
    intensity,
    requirements,
    company,
    contract,
    isCurrentFeud: false,
  tags: [], 
  };

  // Mark the opponent as feuding
  opponent.isFeuding = true;
 dispatch(addFeud(feudObject));
  return feudObject;
};



  



  return (
    <div>
     <div>
      <button onClick={randomEvent}>Trigger Random Event</button>
      <div>
      <ul>
        {eventLog.map((entry, index) => (
          <li key={index} style={getLogEntryStyle(index)}>
            {entry}
          </li>
        ))}
      </ul>
      </div>
      <div>
      <button onClick={handleGenerateMatchLog}>Generate Match Log</button>
      <ul>
        {matchLog.map((log, index) => (
          <li key={index} style={{ color: index < 3 ? 'blue' : 'red' }}>
            {log}
          </li>
        ))}
      </ul>
      <ul>
      <h3>AEW</h3>
        {matchLogAEW.map((log, index) => (
          <li key={index} style={{ color: index < 3 ? 'blue' : 'red' }}>
            {log}
          </li>
        ))}
      </ul>
      <ul>
      <h3>WWE</h3>
        {matchLogWWE.map((log, index) => (
          <li key={index} style={{ color: index < 3 ? 'blue' : 'red' }}>
            {log}
          </li>
        ))}
      </ul>

      <div>
      {/* <JoinCompanyButton companies={companies} /> */}
      </div>
    </div>





    </div>
      {/* <button onClick={handleCreateOtherFeuds}>Create Other Feuds</button>
      <button onClick={handleUpdateAndEliminate}>UpdateFeuds</button> */}
    </div>
  );
}

export default Testing;
