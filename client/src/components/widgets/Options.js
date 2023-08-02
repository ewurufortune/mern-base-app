import serialize from "serialize-javascript";
import React, { useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setName, setFirstname, setSavegame, setTraits,setButton1Text, setUserResponse,setButton2Text,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setShowNextWeekButton,setLastActivity,setResponseRecieved,setActionTarget,setWrestlers, setStats,setUser} from "state";
//button2Text is represented as buttonText2 in the reducer Slice


const replaceUser = async (user) => {
  const bodyData = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    alignment: user.alignment,
    popularity: user.popularity,
    wealth: user.wealth,
    friends: user.friends,
    savegame: user.savegame,
    charisma: user.charisma,
    isChampion: user.isChampion,
    pastFeuds: user.pastFeuds,
    inRingSkill: user.inRingSkill,
    currentPotentialFeud: user.currentPotentialFeud,
    activeFeud: user.activeFeud,
    currentChampionshipHeld: user.currentChampionshipHeld,
    titleReigns: user.titleReigns,
    tags: user.tags,
    currentCompany: user.currentCompany,
    location: user.location,
    viewedProfile: user.viewedProfile,
    impressions: user.impressions,
  };

  try {
    const response = await fetch("http://localhost:3001/auth/replace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error replacing user:", error);
  }
};


export default function UserResponseButton({ initialButtonText, onResponse }) {
  const dispatch=useDispatch()
  
  const [showInput, setShowInput] = useState(false);

  const button1Text = useSelector((state) => state.buttonText);
  const button1Value = useSelector((state) => state.buttonTextValue);
  const button2Value = useSelector((state) => state.buttonText2Value);
  const button2Text = useSelector((state) => state.buttonText2);
  const userResponse = useSelector((state) => state.userResponse);
const actionDescription = useSelector((state) => state.actionDescription);
const executeAction = useSelector((state) => state.executeAction);
const showOptions = useSelector((state) => state.showOptions);
const decisionText1 = useSelector((state) => state.decisionText1);
const decisionText2 = useSelector((state) => state.decisionText2);
const showDescription = useSelector((state) => state.showDescription);
const user = useSelector((state) => state.user);
const player = useSelector((state) => state.user);
const actionTarget = useSelector((state) => state.actionTarget);
const wrestlers = useSelector((state) => state.user.savegame.wrestlers);


const makeDecision = (value) => {
  console.log(value,actionTarget);

  const playerMirror = { ...player };
  const targetWrestler ={ ...actionTarget}
      // Extract the data from value1
    const { traits, stats } = value;

    // Helper function to handle trait updates
    const updateTrait = (newTrait, trait) => {
      // Ensure that the provided traitName is a valid property of playerMirror
      if (trait in playerMirror) {
        playerMirror[trait] = newTrait;
        console.log(`Player's ${trait} updated to: ${newTrait}`);
      } else {
        console.log(`Invalid trait: ${trait}`);
      }
    };

    // Handle traits
    traits.forEach((trait) => {
      switch (trait) {
        case "menacing":
        case "comedic":
          updateTrait(trait, "charisma");
          break;
        case "highflyer":
        case "brawler":
        case "technical":
          updateTrait(trait, "style");
          break;
        case "face":
        case "heel":
          updateTrait(trait, "alignment");
          break;
        case "muscular":
        case "athletic":
        case "fat":
        case "slim":
          updateTrait(trait, "bodytype");
          break;
        default:
          break;
      }
    });


   stats.forEach((stat) => {
      const {
        check,
        value,
        increasePlayer,
        decreasePlayer,
        increaseTarget,
        decreaseTarget,
      } = stat;
      const playerValue = playerMirror[check];
      const targetValue = targetWrestler[check];

      console.log(`Checking ${check} value...`);
      console.log(`Player's ${check}: ${playerValue}`);
      console.log(`Target Wrestler's ${check}: ${targetValue}`);

      if (
        (value === "isLower" && playerValue < targetValue) ||
        (value === "isHigher" && playerValue > targetValue)
      ) {
        console.log(`Condition met for ${value}...`);
        console.log("Performing actions...");

        // Perform actions based on the instructions provided
        increasePlayer.forEach(([property, amount]) => {
          console.log(increasePlayer);
          playerMirror[property] = (playerMirror[property] || 0) + amount;
          console.log(
            `Player's ${property} increased by ${amount} to: ${playerMirror[property]}`
          );
        });

        decreasePlayer.forEach(([property, amount]) => {
          playerMirror[property] = (playerMirror[property] || 0) - amount;
          console.log(
            `Player's ${property} decreased by ${amount} to: ${playerMirror[property]}`
          );
        });

        increaseTarget.forEach(([property, amount]) => {
          targetWrestler[property] = (targetWrestler[property] || 0) + amount;
          console.log(
            `Target Wrestler's ${property} increased by ${amount} to: ${targetWrestler[property]}`
          );
        });

        decreaseTarget.forEach(([property, amount]) => {
          targetWrestler[property] = (targetWrestler[property] || 0) - amount;
          console.log(
            `Target Wrestler's ${property} decreased by ${amount} to: ${targetWrestler[property]}`
          );
        });
      } else {
        console.log(
          `Condition not met for ${value}... No actions performed.`
        );
      }
    });

    const updatedWrestlers = wrestlers.map((wrestler) =>
  wrestler.id === targetWrestler.id ? targetWrestler : wrestler
);
  dispatch(setWrestlers(updatedWrestlers))
 dispatch(setUser(playerMirror));    
}


const handleClick = async (value, decisionText) => {
  dispatch(setShowOptions({ showOptions: false }));
  dispatch(setShowDescription({ showDescription: false }));
  setShowInput(true);

  console.log(value);

  makeDecision(value)
  // dispatch(setUserResponse({ userResponse: value }));
  dispatch(setSelectedDecision({ selectedDecision: decisionText }));
  dispatch(setShowDecisionText({ showDecisionText: true }));

  dispatch(setResponseRecieved({ responseRecieved: true }));
  await replaceUser(user);

 

};


  return (
    <div>
      {showOptions ? (
        <div>
       
        <p>title</p>
          <button onClick={() => handleClick(button1Value,decisionText1)}>{button1Text}</button>
          <button onClick={() => handleClick(button2Value,decisionText2)}>{button2Text}</button>
        </div>
      ) : (
        <p>Waiting for response...</p>
      )}
      <br/>
    </div>
  );
}

