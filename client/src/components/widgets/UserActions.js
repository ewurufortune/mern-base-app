import React from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setName, setFirstname, setSavegame, setTraits} from "state";

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


 console.log(user.allignment);

  const traits={charisma:'menacing',wealth:200000,popularity:10,allignment:'face'}
  console.log(allignment);
  const handleClick = async () => {
    await replace(clientId, "mooney",traits);
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
    dispatch(setTraits({ charisma: traits.charisma, wealth: traits.wealth, popularity: traits.popularity, allignment: traits.allignment }));
    
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
      <button onClick={handleClick}>Inject</button>
      <Button onClick={savewrestlers}>Increase Random popularity</Button>
      <h2>Wrestler Names:</h2>
      <ul>
        {savegame.wrestlers.map((wrestler) => (
          <li key={wrestler.id}>{wrestler.name} {wrestler.popularity}</li>
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
