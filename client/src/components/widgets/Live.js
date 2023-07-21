import React, { useState } from 'react';

const Live = ({ activeFeud, eventType }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [optionDescription, setOptionDescription] = useState('');
  const [showActions, setShowActions] = useState(true);
  const [showEndDayButton, setShowEndDayButton] = useState(false);


  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    // Set the option description based on the selected option and eventType
    if (eventType === 'weeklyTV') {
      switch (option) {
        case 'aggressive':
          setOptionDescription('You have chosen to be aggressive.');
          break;
        case 'meek':
          setOptionDescription('You have chosen to be meek.');
          break;
        default:
          setOptionDescription('');
          break;
      }
    } else if (eventType === 'PPV') {
      switch (option) {
        case 'squash':
          setOptionDescription('You have chosen to squash your opponent.');
          break;
        case 'rival':
          setOptionDescription('You have chosen to treat your opponent as a rival.');
          break;
        case 'job':
          setOptionDescription('You have chosen to put your opponent over.');
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
          {eventType === 'weeklyTV' && (
            <div>
              <p>Event Type: Weekly TV</p>
              <p>Choose an Action:</p>
              {showActions && (
                <>
                  <button onClick={() => handleOptionSelect('aggressive')}>1. Be Aggressive</button>
                  <button onClick={() => handleOptionSelect('meek')}>2. Be Meek</button>
                </>
              )}
              <p>{optionDescription}</p>
            </div>
          )}
          {eventType === 'PPV' && (
            <div>
              <p>Event Type: PPV</p>
              <p>Opponent Description: {activeFeud.opponent[0].name}</p>
              <p>Choose an Action:</p>
              {showActions && (
                <>
                  <button onClick={() => handleOptionSelect('squash')}>1. Squash</button>
                  <button onClick={() => handleOptionSelect('rival')}>2. Rival</button>
                  <button onClick={() => handleOptionSelect('job')}>3. Job</button>
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
