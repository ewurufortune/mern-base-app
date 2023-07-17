import React, { useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setName, setFirstname, setSavegame, setTraits } from "state";

const UserActions = ({ clientId }) => {
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
  const dispatch = useDispatch();

  const [selectedWrestler, setSelectedWrestler] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activities, setActivities] = useState([]);

  const actions = [
    { label: "Help Wrestler", value: "help" },
    { label: "Pander to Wrestler", value: "pander" },
    // Add more actions based on your requirements
  ];

  const wrestlers = savegame.wrestlers;

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
    // Perform the desired action based on the selected wrestler and action
    // Add your own logic here

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

  const addToActivities = (action,selectedWrestler) => {
    if (activities.length >= 7) {
      console.log("Schedule is full. Cannot add more activities.");
      return;
    }
handleConfirm()
    setActivities((prevActivities) => [...prevActivities, {action,selectedWrestler}]);
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
    // Get a random index from the wrestlers array
    const randomIndex = Math.floor(Math.random() * savegame.wrestlers.length);

    // Create a copy of the wrestlers array
    const updatedWrestlers = [...savegame.wrestlers];

    // Create a copy of the selected object
    const updatedObject = { ...updatedWrestlers[randomIndex] };

    // Increase the popularity of the random object by 1
    updatedObject.popularity += 1;

    // Update the object in the copied wrestlers array
    updatedWrestlers[randomIndex] = updatedObject;

    // Update the savegame with the modified wrestlers array
    const updatedSavegame = { ...savegame, wrestlers: updatedWrestlers };

    // Update the state with the updated savegame
    dispatch(setSavegame({ savegame: updatedSavegame }));

    // Prepare the data to send to the server
    const bodyData = {
      id: _id,
      savegame: updatedSavegame,
    };

    try {
      // Send the updated savegame to the server
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

  return (
    <Box>
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
      <br></br>
      {renderActionButtons()}
      {selectedWrestler && selectedAction && !isConfirmed && (
        <button onClick={() => addToActivities(selectedAction,selectedWrestler)}>
          Confirm
        </button>
      )}
      <h2>Activities:</h2>
  
      <ul>
  {activities.map((activity, index) => (
    <li key={index}>
      {activity.action.label} - {activity.selectedWrestler.name}
      <button onClick={() => deleteActivity(index)}>Delete</button>
    </li>
  ))}
</ul>

      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <Box m="2rem 0" />
        </Box>
      )}
    </Box>
  );
};

export default UserActions;





