import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import weeklyAntics from './arrays/weeklyAntics';
import matchPlan from './arrays/matchPlan';

import { setName, setFirstname, setSavegame, setTraits,setButton1Text, setUserResponse,setButton2Text,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setShowNextWeekButton,setResponseRecieved,setEventType,setIsFeudActive,setStory,setWeek, setTimeToOpenSpot,setCurrentMatchPlan,setCurrentWeeklyAntic,setOptionDescription,setSelectedOption,setShowActions,setShowChampionship,setShowEndDayButton,} from "state";


const Live = ({ activeFeud, eventType, week }) => {

const dispatch = useDispatch();

const selectedOption = useSelector((state) => state.selectedOption);
const optionDescription = useSelector((state) => state.optionDescription);
const showActions = useSelector((state) => state.showActions);
const showEndDayButton = useSelector((state) => state.showEndDayButton);
const currentWeeklyAntic = useSelector((state) => state.currentWeeklyAntic);
const currentMatchPlan = useSelector((state) => state.currentMatchPlan);
const showChampionship = useSelector((state) => state.showChampionship);



useEffect(() => {

  //come back to this
  dispatch(setShowChampionship(matchPlan[0].championshipMatch));
  ;
  // Generate a random index to select a weekly antic
  const randomIndex = Math.floor(Math.random() * weeklyAntics.length);
  const randomIndexPPV = Math.floor(Math.random() * matchPlan.length);
  // Set the currentWeeklyAntic to the randomly selected antic
   dispatch(setCurrentWeeklyAntic(weeklyAntics[0]));
   dispatch(setCurrentMatchPlan(matchPlan[randomIndexPPV]));

}, [week]);

// Function to generate victory/defeat message for championship feud
const getChampionshipResultDescription = (optionResultDescription, opponentName, championshipName, isVictory) => {
if (isVictory) {
  const updateTitles=()=>{

  }
  return optionResultDescription + `\n \n You defeated ${opponentName} to win the ${championshipName}!`;
} else {
  return optionResultDescription + ` \n \nYou fought valiantly against ${opponentName}, but unfortunately, you lost the ${championshipName}.`;
}
};

// Function to handle the selected option for PPV
const deserializedCurrentMatchPlan = { ...currentMatchPlan }; // Create a shallow copy of the object

// Deserialize optionfunction and assign the deserialized function back to the object
deserializedCurrentMatchPlan.option1function = eval('(' + currentMatchPlan.option1function + ')');
deserializedCurrentMatchPlan.option2function = eval('(' + currentMatchPlan.option2function + ')');
deserializedCurrentMatchPlan.option3function = eval('(' + currentMatchPlan.option3function + ')');

const handlePPVOptionSelect = (option, currentMatchPlan, activeFeud) => {
const options = ['option1', 'option2', 'option3'];
const selectedOptionIndex = options.indexOf(option);
if (selectedOptionIndex !== -1) {
  const optionResultDescription = currentMatchPlan[`option${selectedOptionIndex + 1}ResultDescription`];
   dispatch(setOptionDescription(optionResultDescription));
  ;

  if (activeFeud.championshipFeud) {
    const randomValue = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    const isVictory = randomValue < 5;
    const opponentName = activeFeud.opponent[0].name;
    const championshipName = activeFeud.championshipTitle.name;
   const getChampionshipResultDescriptionStore= getChampionshipResultDescription(optionResultDescription, opponentName, championshipName, isVictory)
    dispatch(setOptionDescription (getChampionshipResultDescriptionStore));
 ;
  }

  currentMatchPlan[`option${selectedOptionIndex + 1}function`]();
} else {
  dispatch(setOptionDescription (''));

}
};

const deserialisedCurrentWeeklyAntic = { ...currentWeeklyAntic }; // Create a shallow copy of the object

// Deserialize optionfunction and assign the deserialized function back to the object
deserialisedCurrentWeeklyAntic.option1function = eval('(' + currentWeeklyAntic.option1function + ')');
deserialisedCurrentWeeklyAntic.option2function = eval('(' + currentWeeklyAntic.option2function + ')');
deserialisedCurrentWeeklyAntic.option3function = eval('(' + currentWeeklyAntic.option3function + ')');


const handleOptionSelect = (option) => {
   dispatch(setSelectedOption(option));
  // Handle the selected option based on eventType and option
if (eventType === 'weeklyTV') {
  if (option === 'option1') {
    dispatch(setOptionDescription (currentWeeklyAntic.option1ResultDescription));

console.log(deserialisedCurrentWeeklyAntic);
    deserialisedCurrentWeeklyAntic.option1function();
  } else if (option === 'option2') {
    dispatch(setOptionDescription (currentWeeklyAntic.option2ResultDescription));
    deserialisedCurrentWeeklyAntic.option2function();
  }
} else if (eventType === 'PPV') {
  console.log(currentMatchPlan);
  // Modify this section based on how you handle PPV actions
  switch (option) {
    case 'option1':
    case 'option2':
    case 'option3':
      handlePPVOptionSelect(option, deserializedCurrentMatchPlan, activeFeud);
      console.log(deserializedCurrentMatchPlan);
      break;
    default:
      dispatch(setOptionDescription (''));
      break;
  }
}


  // Hide the action buttons and show the "End Day" button
  dispatch(setShowActions(false));
  dispatch(setShowEndDayButton(true));
};

const handleEndDay = () => {
  // Reset the selected option and option description
  dispatch(setSelectedOption(''));
  dispatch(setOptionDescription(''));

  // Show the action buttons and hide the "End Day" button
  dispatch(setShowActions(true));
  dispatch(setShowEndDayButton(false));

};

return (
  <div>
    {Object.keys(activeFeud).length === 0 ? (
      <p>No actions today.</p>
    ) : (
      <div>
      <h2>Live Feud: {activeFeud.name}</h2>
        {eventType === "weeklyTV" && (
          <div>
            <p>Event Type: Weekly TV</p>
            <p>Choose an Action:</p>
            <p>{currentWeeklyAntic.initialPrompt}</p>
            {showActions && (
              <>
                <button onClick={() => handleOptionSelect("option1")}>
                  1. {currentWeeklyAntic.option1text}
                </button>
                <button onClick={() => handleOptionSelect("option2")}>
                  2. {currentWeeklyAntic.option2text}
                </button>
              </>
            )}
            <p>{optionDescription}</p>
          </div>
        )}
        {eventType === 'PPV' && (
          <div>
          {showChampionship && (
<div>
  <h2>Championship Match</h2>
  {/* Display additional championship match information here */}
  {/* You can access the championship details from `matchPlan[0].championship` */}
</div>
)}
            <p>Event Type: PPV</p>
            <p>Opponent Description: {activeFeud.opponent[0].name}</p>
            <p>Choose an Action:</p>
            <p>{currentMatchPlan.initialPrompt}</p>
            {showActions && (
              <>
                <button onClick={() => handleOptionSelect('option1')}>1. {currentMatchPlan.option1text}</button>
                <button onClick={() => handleOptionSelect('option2')}>2. {currentMatchPlan.option2text}</button>
                <button onClick={() => handleOptionSelect('option3')}>3. {currentMatchPlan.option3text}</button>
              </>
            )}
            <p>{optionDescription}</p>
          </div>
        )}
        {showEndDayButton && <button onClick={handleEndDay}>End Day</button>}
      </div>
    )}
  </div>
);
};

export default Live;
