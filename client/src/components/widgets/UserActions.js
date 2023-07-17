import React from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setName, setFirstname, setSavegame } from "state";

const UserActions = ({ clientId }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const firstname = useSelector((state) => state.user.firstName);
  const savegame = useSelector((state) => state.user.savegame);
  const dispatch = useDispatch();

  const handleClick = async () => {
    await replace(clientId, "mooney");
  };

  const replace = async (id, firstName) => {
    const bodyData = {
      id: id,
      firstName: firstName,
    };

    const loggedInResponse = await fetch("http://localhost:3001/auth/replace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    dispatch(setFirstname({ firstName: firstName }));
  };

  const savewrestlers = async () => {
    // Get a random index from the savegame array
    const randomIndex = Math.floor(Math.random() * savegame.length);

    // Create a copy of the savegame array
    const updatedSavegame = [...savegame];

    // Create a copy of the selected object
    const updatedObject = { ...updatedSavegame[randomIndex] };

    // Increase the reputation of the random object by 1
    updatedObject.popularity += 1;

    // Update the object in the copied savegame array
    updatedSavegame[randomIndex] = updatedObject;

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
      <button onClick={() => dispatch(setName())}>+</button>
      <button onClick={handleClick}>Inject</button>
      <Button onClick={savewrestlers}>Increase Random popularity</Button>

      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <Box m="2rem 0" />
        </Box>
      )}
    </Box>
  );
};

export default UserActions;
