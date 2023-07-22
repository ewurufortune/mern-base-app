  import React, { useState, useEffect } from 'react';
import weeklyAntics from './arrays/weeklyAntics';
import matchPlan from './arrays/matchPlan';



const Live = ({ activeFeud, eventType, week }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [optionDescription, setOptionDescription] = useState('');
  const [showActions, setShowActions] = useState(true);
  const [showEndDayButton, setShowEndDayButton] = useState(false);
  const [currentWeeklyAntic, setCurrentWeeklyAntic] = useState({});
  const [currentMatchPlan, setCurrentMatchPlan] = useState({});
  const [showChampionship, setShowChampionship] = useState(false);

  useEffect(() => {
    setShowChampionship(matchPlan[0].championshipMatch);
    // Generate a random index to select a weekly antic
    const randomIndex = Math.floor(Math.random() * weeklyAntics.length);
    const randomIndexPPV = Math.floor(Math.random() * matchPlan.length);
    // Set the currentWeeklyAntic to the randomly selected antic
    setCurrentWeeklyAntic(weeklyAntics[0]);
    setCurrentMatchPlan(matchPlan[randomIndexPPV])
  }, [week]);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Handle the selected option based on eventType and option
  if (eventType === 'weeklyTV') {
    if (option === 'option1') {
      setOptionDescription(currentWeeklyAntic.option1ResultDescription)   
      currentWeeklyAntic.option1function();
    } else if (option === 'option2') {
      setOptionDescription(currentWeeklyAntic.option2ResultDescription)
      currentWeeklyAntic.option2function();
    }
  } else if (eventType === 'PPV') {
    console.log(currentMatchPlan);
    // Modify this section based on how you handle PPV actions
    switch (option) {
    
      case 'option1':
        setOptionDescription(currentMatchPlan.option1ResultDescription);
        currentMatchPlan.option1function();
        break;
      case 'option2':
        setOptionDescription(currentMatchPlan.option2ResultDescription);
        currentMatchPlan.option2function();
        break;
      case 'option3':
        setOptionDescription(currentMatchPlan.option3ResultDescription);
        currentMatchPlan.option3function();
        break;
      default:
        setOptionDescription('');
        
        break;
    }
  }


    // Hide the action buttons and show the "End Day" button
    setShowActions(false);
    setShowEndDayButton(true);
  };

  const handleEndDay = () => {
    // Reset the selected option and option description
    setSelectedOption('');
    setOptionDescription('');

    // Show the action buttons and hide the "End Day" button
    setShowActions(true);
    setShowEndDayButton(false);
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
