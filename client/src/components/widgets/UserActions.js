import React, { useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setName, setFirstname, setSavegame, setTraits,setButton1Text, setUserResponse,setButton2Text,setButton1TextValue,setButton2TextValue,setActionDescription} from "state";
//button2Text is represented as buttonText2 in the reducer Slice


export function UserResponseButton({ initialButtonText, onResponse }) {
  const dispatch=useDispatch()
  const [showButton, setShowButton] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const button1Text = useSelector((state) => state.buttonText);
  const button1Value = useSelector((state) => state.buttonTextValue);
  const button2Value = useSelector((state) => state.buttonText2Value);
  const button2Text = useSelector((state) => state.buttonText2);
  const userResponse = useSelector((state) => state.userResponse);

  const handleClick = (value) => {
    setShowButton(false);
    setShowInput(true);
    dispatch(setUserResponse({ userResponse: button1Value }));
    // Perform some action with the user response
    console.log(value);
    // onResponse(userResponse);
  };

  return (
    <div>
      {showButton ? (
        <div>
          <button onClick={() => handleClick(button1Value)}>{button1Text}</button>
          <button onClick={() => handleClick(button2Value)}>{button2Text}</button>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
    </div>
  );
}


const UserActions = ({ clientId }) => {
  const userResponse = useSelector((state) => state.userResponse);
  const actionDescription = useSelector((state) => state.actionDescription);
  const button1Text = useSelector((state) => state.buttonText);
 


  const handleSendText = (text) => {
    // Perform some action with the text received from UserResponseButton
    // Update the result state
   console.log('massive');
  
   
  

  };

  const handleSendButton = (option) => {
  const {text1,text2,value1,value2}=option
    // Send the option string to UserResponseButton
    dispatch(setButton1Text({ buttonText: text1 }));
    dispatch(setButton1TextValue({ buttonTextValue: value1 }));
     dispatch(setButton2Text({ button2Text: text2 }));
     dispatch(setButton2TextValue({ button2TextValue: value2 }));
   
  };




  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const firstname = useSelector((state) => state.user.firstName);

  const charisma = useSelector((state) => state.user.charisma);
  const wealth = useSelector((state) => state.user.wealth);
  const user = useSelector((state) => state.user);
  const popularity = useSelector((state) => state.user.popularity);
  const allignment = useSelector((state) => state.user.allignment);
  const savegame = useSelector((state) => state.user.savegame);
  const [showNextActivityButton, setShowNextActivityButton] = useState(false);
  const [showNextWeekButton, setShowNextWeekButton] = useState(true);
  const dispatch = useDispatch();

  const [selectedWrestler, setSelectedWrestler] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activities, setActivities] = useState([]);


  const wrestlers = savegame.wrestlers;


  const actions = [
    {
      label: "Help Wrestler",
      value: {
        actionText: "Gave target some tips for improvement",
        actionFunction: (wrestlerId) => {
          const selectedWrestler = wrestlers.find(
            (wrestler) => wrestler.id === wrestlerId
          );
          if (selectedWrestler) {
            const updatedName = `${selectedWrestler.name} Champion`;
            const updatedRelationship = selectedWrestler.relationship + 13;

            // Update the name and relationship in the selectedWrestler object
            const updatedWrestlers = wrestlers.map((wrestler) => {
              if (wrestler.id === wrestlerId) {
                return {
                  ...wrestler,
                  name: updatedName,
                  relationship: updatedRelationship,
                };
              }
              return wrestler;
            });

            // Update the savegame with the modified wrestlers array
            const updatedSavegame = { ...savegame, wrestlers: updatedWrestlers };

            // Dispatch an action to update the state with the updated savegame
            dispatch(setSavegame({ savegame: updatedSavegame }));

            // Perform some action here using the updatedName
            console.log(`Helping wrestler ${updatedName}...`);
          }
        },
      },
    },
    {
      label: "Pander to Wrestler",
      value: {
        actionText: "Gave target preferential Treatment",
        actionFunction: (wrestlerId) => {
          const selectedWrestler = wrestlers.find(
            (wrestler) => wrestler.id === wrestlerId
          );
          if (selectedWrestler) {
            const updatedName = `${selectedWrestler.name} Champion`;
            // Perform some action here using the updatedName
            console.log(`Helping wrestler ${updatedName}...`);
          }
        },
      },
    },
    // Add more actions based on your requirements
  ];

  const wrestlerButtons = wrestlers.map((wrestler) => (
    <button
      key={wrestler.id}
      onClick={() => setSelectedWrestler(wrestler)}
      disabled={selectedWrestler && selectedWrestler.id === wrestler.id}
    >
      {wrestler.name}
    </button>
  ));

  const handleActionSelection = (action) => {
    setSelectedAction(action);
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const renderActionButtons = () => {
    if (!selectedWrestler) return null;

    const wrestlerPopularity = selectedWrestler.popularity;

    if (wrestlerPopularity < 5) {
      return (
        <div>
          <h2>Actions:</h2>
          <button onClick={() => handleActionSelection(actions[0])}>
            {actions[0].label}
          </button>
        </div>
      );
    } else if (wrestlerPopularity >= 5) {
      return (
        <div>
          <h2>Actions:</h2>
          <button onClick={() => handleActionSelection(actions[1])}>
            {actions[1].label}
          </button>
        </div>
      );
    }

    return null;
  };

  const addToActivities = (action, selectedWrestler) => {
    if (activities.length >= 7) {
      console.log("Schedule is full. Cannot add more activities.");
      return;
    }
    handleConfirm();
    setActivities((prevActivities) => [
      ...prevActivities,
      { action, selectedWrestler },
    ]);
  };

  const deleteActivity = (index) => {
    setActivities((prevActivities) =>
      prevActivities.filter((_, i) => i !== index)
    );
  };

  const handleClick = async () => {
    const traits = {
      charisma: "menacing",
      wealth: 200000,
      popularity: 10,
      allignment: "face",
    };
    await replace(clientId, "mooney", traits);
  };

  const replace = async (id, firstName, traits) => {
    const bodyData = {
      id: id,
      firstName: firstName,
      traits: traits,
    };

    const loggedInResponse = await fetch("http://localhost:3001/auth/replace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    dispatch(setFirstname({ firstName: firstName }));
    dispatch(
      setTraits({
        charisma: traits.charisma,
        wealth: traits.wealth,
        popularity: traits.popularity,
        allignment: traits.allignment,
      })
    );
  };

  const savewrestlers = async () => {
    const randomIndex = Math.floor(Math.random() * savegame.wrestlers.length);
    const updatedWrestlers = [...savegame.wrestlers];
    const updatedObject = { ...updatedWrestlers[randomIndex] };
    updatedObject.popularity += 1;
    updatedWrestlers[randomIndex] = updatedObject;
    const updatedSavegame = { ...savegame, wrestlers: updatedWrestlers };
    dispatch(setSavegame({ savegame: updatedSavegame }));

    const bodyData = {
      id: _id,
      savegame: updatedSavegame,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/savewrestlers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        console.log("Savegame updated successfully");
      } else {
        console.error("Failed to update savegame");
      }
    } catch (error) {
      console.error("An error occurred while updating savegame", error);
    }
  };

  const triggerActionFunctions = async () => {
    setShowNextWeekButton(false);
    if (activities.length > 0) {
      const [firstActivity, ...remainingActivities] = activities;
  
      // Execute the action function for the first activity only if it is the first time the "Next Week" button is pressed
      if (remainingActivities.length === activities.length - 1) {
        const { action, selectedWrestler } = firstActivity;
        if (action.value && action.value.actionFunction) {
          action.value.actionFunction(selectedWrestler.id);
        }
      }
  
      // Update the activities array with the remaining activities
      setActivities(remainingActivities);
  
      // Show the "Next Activity" button if there are remaining activities
      setShowNextActivityButton(remainingActivities.length > 0);
  
      // Hide the "Next Week" button if there are remaining activities
   
      if (remainingActivities.length===0){
        
        setShowNextWeekButton(true);
      }
    } else {
      // No more activities, hide the "Next Activity" button and show the "Next Week" button
      setShowNextActivityButton(false);
      setShowNextWeekButton(true);
    }
  };
  
  

  const renderNextButton = () => {
    if (activities.length > 0 && showNextActivityButton) {
      return (
        <button onClick={triggerActionFunctions}>Next Activity</button>
      );
    }
    return null;
  };

  return (
    <Box>
      <div>
      <h1>ComponentA</h1>
      <UserResponseButton initialButtonText="Click Me" onResponse={handleSendText} />
      <p>Result Text:{actionDescription}</p>
      <p>Result value: {userResponse}</p>
      <button onClick={() => handleSendButton({text1:'help her',text2:'hinder them',value1:'good 1',value2:'bad 1'})}>Send Option 1</button>
      <button onClick={() => handleSendButton({text1:'kill her',text2:'resutaitate her',value1:'good 2',value2:'bad 2'})}>Send Option 2</button>
    </div>

    {/* DEMARCATE */}
      <h1>hellooo {firstname}</h1>
      <p>{allignment}</p>
      <button onClick={() => dispatch(setName())}>+</button>
      <Button onClick={handleClick}>Inject</Button>
      <Button onClick={savewrestlers}>Increase Random popularity</Button>
      <h2>Wrestler Names:</h2>
      <ul>
        {savegame.wrestlers.map((wrestler) => (
          <li key={wrestler.id}>
            {wrestler.name} {wrestler.popularity}
          </li>
        ))}
      </ul>

      <h2>Wrestler Selection:</h2>
      {wrestlerButtons}
      <br />
      {renderActionButtons()}
      {selectedWrestler && selectedAction && !isConfirmed && (
        <button onClick={() => addToActivities(selectedAction, selectedWrestler)}>
          Confirm
        </button>
      )}
      <h2>Activities:</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.action.value.actionText.replace(
              /target/gi,
              activity.selectedWrestler.name
            )}
            <button onClick={() => deleteActivity(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {renderNextButton()}
      {showNextWeekButton && (
        <button onClick={triggerActionFunctions}>Next Week</button>
      )}

      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <Box m="2rem 0" />
        </Box>
      )}
    </Box>
  );
};

export default UserActions;
