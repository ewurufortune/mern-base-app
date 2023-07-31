import React, { useState } from 'react';
import { isEqual } from 'lodash';
import { getDifferencesAndParameters, calculateStatChange} from './gameFunctions/GameFunctions';
import { useDispatch, useSelector } from 'react-redux';






const Game = () => {
const wrestlers = useSelector((state) => state.user.savegame.wrestlers);



  const [messages, setMessages] = useState([]);
  const [eventType, setEventType] = useState('weeklyTv');
    // Create a state variable to track if a button has been clicked
    const [buttonClicked, setButtonClicked] = useState(false);
  const toggleEventType = () => {
    setEventType(prevEventType => (prevEventType === 'weeklyTv' ? 'PPV' : 'weeklyTv'));
    setButtonClicked(prevCicked=>prevCicked===true?false:true)
  };


// Function to check if a value is lower than a specified threshold
function isLower(value, threshold) {
  return value < threshold;
}





    function removePlayerTag(tagToRemove) {
        setPlayer(prevPlayer => ({
          ...prevPlayer,
          tags: prevPlayer.tags.filter(tag => !isEqual(tag, tagToRemove)),
        }));
      }
      
      function removeCurrentStorylineTag(tagToRemove) {
        setCurrentStoryline(prevStoryline => ({
          ...prevStoryline,
          tags: prevStoryline.tags.filter(tag => !isEqual(tag, tagToRemove)),
        }));
      }

 function updateStats(stat, change, modifier, isPlayerStat = true) {
  // Check if the stat represents a tag
  const isTagStat = typeof stat === 'object' && stat !== null;

  // Apply the modifier based on the isPlayerStat parameter
  const totalChange = isPlayerStat ? change + modifier : change - modifier;

  if (isPlayerStat) {
    console.log(`Player's ${stat} updated by ${totalChange}.`);
    // Add logic to update the player's stat in the state or wherever it's stored

    // For example, if stat is 'name', update player's name directly
    if (stat === 'name') {
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        [stat]: totalChange,
      }));
    }

    // If it's a tag stat and the change is true (add tag)
    else if (isTagStat && change) {
        addPlayerTag(stat);
    }

    // If it's a tag stat and the change is false (remove tag)
    else if (isTagStat && !change) {
      removePlayerTag(stat);
    }

    // Update alignment stat
    else if (stat === 'alignment') {
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        alignment: totalChange,
      }));
    }

    // Update popularity stat
    else if (stat === 'popularity') {
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        popularity: prevPlayer.popularity + totalChange,
      }));
    }
    // Add more numeric stats as needed
  } else {
    console.log(`Current storyline ${stat} updated by ${totalChange}.`);
    // Update the current storyline state

    // If it's a tag stat and the change is true (add tag)
    if (isTagStat && change) {
      addCurrentStorylineTag(stat);
    }

    // If it's a tag stat and the change is false (remove tag)
    else if (isTagStat && !change) {
      removeCurrentStorylineTag(stat);
    }

    else {
      setCurrentStoryline(prevStoryline => ({
        ...prevStoryline,
        [stat]: prevStoryline[stat] + totalChange,
      }));
    }
  }
}

      // Function to add a tag to player's tags array
      function addPlayerTag(tag) {
        setPlayer(prevPlayer => ({
          ...prevPlayer,
          tags: [...prevPlayer.tags, tag],
        }));
      }
    
    
      // Function to add a tag to current storyline's tags array
      function addCurrentStorylineTag(tag) {
        setCurrentStoryline(prevStoryline => ({
          ...prevStoryline,
          tags: [...prevStoryline.tags, tag],
        }));
      }
    
    
    
  // Step 1: Create a player object
  const [player, setPlayer] = useState({
    name: 'Aiden',
    alignment: 'face',
    popularity:6,
    inRingSkill:5,
    tags: [
      { lockerroomRep: 'loved' },
      { bookerRelationship: 'good' },
      { fanFavorite: true },
      { highFlyer: true }
      // Add more tags as needed
    ],
    deletedTags: [] 
  });

  const handlePlayerTagChange = () => {
    const { tags, deletedTags } = player;
    if (deletedTags.length > 0 && Math.random() < 0.5) {
      // Restore a previously deleted tag
      const restoredTag = deletedTags.pop();
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        tags: [...tags, restoredTag],
        deletedTags: [...deletedTags]
      }));
    } else {
      // Randomly delete a tag and add it to the deletedTags array
      const tagIndexToDelete = Math.floor(Math.random() * tags.length);
      const deletedTag = tags.splice(tagIndexToDelete, 1)[0];
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        tags: [...tags],
        deletedTags: [...deletedTags, deletedTag]
      }));
    }
  };

  const [currentStoryline, setCurrentStoryline] = useState({
    title: 'Feud with Haiden',
    length: 10,
    opponent: [
      { name: 'Haiden', relationship: 10 }
      // Add more opponents as needed
    ],
    intensity: 40,
    tags: [
      { championship: 'Heavy Weight' },
      { plan: 'long term' },
      { billing: 'main event' },
      { rivalTagTeam: 'The Dominators' },
      { underdogStory: true },
  
    ], 
     deletedTags: [] 
  });

  const handleStorylineTagChange = () => {
    const { tags, deletedTags } = currentStoryline;
    if (deletedTags.length > 0 && Math.random() < 0.5) {
      // Restore a previously deleted tag
      const restoredTag = deletedTags.pop();
      setCurrentStoryline(prevStoryline => ({
        ...prevStoryline,
        tags: [...tags, restoredTag],
        deletedTags: [...deletedTags]
      }));
    } else {
      // Randomly delete a tag and add it to the deletedTags array
      const tagIndexToDelete = Math.floor(Math.random() * tags.length);
      const deletedTag = tags.splice(tagIndexToDelete, 1)[0];
      setCurrentStoryline(prevStoryline => ({
        ...prevStoryline,
        tags: [...tags],
        deletedTags: [...deletedTags, deletedTag]
      }));
    }
  };

  // Step 3: Create the handleAngle function
  const handleAngle = (action) => {
    setMessages([])
    const differencesAndParameters = getDifferencesAndParameters(player, currentStoryline, wrestlers);


    switch (action) {
      case 'useWorkersPrivateDirt':

      const popularityChange = calculateStatChange(differencesAndParameters, 'popularity', 4, -4, true);
      const inRingSkillChange = calculateStatChange(differencesAndParameters, 'inRingSkill', 5, -9, true);
      const decisionText = angleActions.find(actionItem => actionItem.action === 'useWorkersPrivateDirt').decision;
      setMessages(prevMessages => [...prevMessages, decisionText]);
        setMessages(prevMessages => [...prevMessages, popularityChange.message,inRingSkillChange.message]);

        // Implement logic for this action
        const loadUseDirt = [
          { stat: 'popularity', change: popularityChange.statChange, modifier: 2 },
           { stat: 'inRingSkill', change: inRingSkillChange.statChange, modifier: 2 },
          { stat: { fanFavorite: true }, change: true },
          { stat: { highFlyer: false }, change: false }, 
        ];
        loadUseDirt.forEach(load => {
          updateStats(load.stat, load.change, load.modifier);
        });
        break;
      case 'overshadowWorker':
        // Implement logic for this action
        const loadOvershadow = [
        //   { stat: 'popularity', change: 3, modifier: 1 },
        //   { stat: { underdogStory: true }, change: true }, // Add the 'underdogStory' tag
          { stat: { highFlyer: false }, change: true },
        ];
        loadOvershadow.forEach(load => {
          updateStats(load.stat, load.change, load.modifier);
        });
        break;
      case 'befriendWorker':
        // Implement logic for this action
        const loadBefriend = [
          { stat: 'popularity', change: 10, modifier: 5 },
          { stat: { fanFavorite: true, highFlyer: true }, change: true }, // Add the 'fanFavorite' and 'highFlyer' tags
        ];
        loadBefriend.forEach(load => {
          updateStats(load.stat, load.change, load.modifier);
        });
        break;
      // Add more cases for other actions as needed
      default:
        console.log('Unknown action.');
        break;
    }
    setButtonClicked(true);};
  



  // Step 4: Define the actions the player can take with filter based on tags
  const angleActions = [
    {
      text: 'Use worker\'s private dirt',
      action: 'useWorkersPrivateDirt',
      show: true,
      decision:'You air your target dirty laundry.',
      question: 'You have a chance to expose your opponent by using their private dirt. Will you take advantage of this opportunity?'
    },
    {
      text: 'Try to Dominate target',
      action: 'overshadowWorker',
      show: eventType === 'weeklyTv', // Set show to true if eventType is 'weeklyTv'
      question: 'You can try to overshadow your opponent and gain more attention. How do you plan to do it?',
    },
    {
      text: 'Befriend worker',
      action: 'befriendWorker',
      show: player.tags.some(tag => tag?.fanFavorite && tag?.highFlyer),
      question: 'Your fan-favorite status and high-flying abilities could help you befriend the worker. How will you approach them?'
    },
    {
      text: 'Throw promo attack on worker',
      action: 'throwPromoAttack',
      show: currentStoryline.tags.some(tag => tag?.underdogStory),
      question: 'Your storyline as an underdog opens an opportunity to throw a promo attack. How will you cut your promo?'
    },
    {
      text: 'Form tag team with worker',
      action: 'formTagTeam',
      show: currentStoryline.tags.some(tag => tag?.rivalTagTeam === 'The Dominators'),
      question: 'Your rivalry with The Dominators presents a chance to form a tag team with the worker. Will you take this path?'
    },
    {
      text: 'Challenge worker to a match',
      action: 'challengeWorker',
      show: currentStoryline.tags.some(tag => tag?.championship === 'Heavy Weight' || tag.billing === 'main event'),
      question: 'Your opportunity for a Heavy Weight Championship match or main event billing allows you to challenge the worker. Will you do it?'
    }
    // Add more actions as needed
  ];

  const handleEndGame = () => {
    console.log('send to tab 1 and disable this tab');
  }


  return (
    <div>
      <h1>Text-Based Game</h1>
      {/* Display player information */}
      <h2>Player</h2>
      <p>Name: {player.name}</p>
      <p>Alignment: {player.alignment}</p>
      <p>Popularity: {player.popularity}</p>
      <p>Tags:</p>
      <ul>
        {player.tags.map((tag, index) => (
          <li key={index}>{JSON.stringify(tag)}</li>
        ))}
      </ul>
      <button onClick={handlePlayerTagChange}>Change Player Tags</button>

      <div>
    
    {messages.map((message, index) => (
      <p key={index}>{message.replace(/target/g, currentStoryline.opponent[0]?.name || 'opponent')}</p>    ))}
  </div>
      <h2>Choose How to Handle the Angle Personally:</h2>
      {!buttonClicked &&
        angleActions.filter(actionItem => actionItem.show).map((actionItem, index) => (
          <div key={index}>
            <p>{actionItem.question}</p>
            <button
              onClick={() => handleAngle(actionItem.action)}
            >
              {actionItem.text.replace('target', currentStoryline.opponent[0]?.name || 'opponent')}
            </button>
          </div>
        ))}

        {buttonClicked && (
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
      <p>Title: {currentStoryline.title}</p>
      <p>Length: {currentStoryline.length}</p>
      <p>Opponents:</p>
      <ul>
        {currentStoryline.opponent.map((opponent, index) => (
          <li key={index}>
            Name: {opponent.name}, Relationship: {opponent.relationship}
          </li>
        ))}
      </ul>
      <p>Intensity: {currentStoryline.intensity}</p>
      <p>Tags:</p>
      <ul>
        {currentStoryline.tags.map((tag, index) => (
          <li key={index}>{JSON.stringify(tag)}</li>
        ))}
      </ul>
      <button onClick={handleStorylineTagChange}>Change Storyline Tags</button>

    </div>
  );
};

export default Game;
