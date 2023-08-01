import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import weeklyAntics from "./arrays/weeklyAntics";
import matchPlan from "./arrays/matchPlan";

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
  setCurrentMatchPlan,
  setCurrentWeeklyAntic,
  setOptionDescription,
  setSelectedOption,
  setShowActions,
  setShowChampionship,
  setShowEndDayButton,
  setOtherFeuds,
  setWrestlers,
} from "state";

const Live = ({ activeFeud, eventType, week }) => {
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const firstname = useSelector((state) => state.user.firstName);

  const charisma = useSelector((state) => state.user.charisma);
  const wealth = useSelector((state) => state.user.wealth);
  const user = useSelector((state) => state.user);
  const popularity = useSelector((state) => state.user.popularity);
  const alignment = useSelector((state) => state.user.alignment);
  const savegame = useSelector((state) => state.user.savegame);
  const showNextActivityButton = useSelector(
    (state) => state.showNextActivityButton
  );
  const showNextWeekButton = useSelector((state) => state.showNextWeekButton);
  const responseRecieved = useSelector((state) => state.user.responseRecieved);

  const selectedOption = useSelector((state) => state.selectedOption);
  const optionDescription = useSelector((state) => state.optionDescription);
  const showActions = useSelector((state) => state.showActions);
  const showEndDayButton = useSelector((state) => state.showEndDayButton);
  const currentWeeklyAntic = useSelector((state) => state.currentWeeklyAntic);
  const currentMatchPlan = useSelector((state) => state.currentMatchPlan);
  const showChampionship = useSelector((state) => state.showChampionship);
  const otherFeuds = useSelector((state) => state.user.savegame.otherFeuds);
  const wrestlers = useSelector((state) => state.user.savegame.wrestlers);
  const feuds = useSelector((state) => state.user.savegame.feuds);

  const chooseRandomFeudAndCreateOtherFeuds = () => {
    // Check if the 'feuds' array is empty or if the only feud has 'opponent.length' > 0
    if (
      feuds.length === 0 ||
      (feuds.length === 1 && feuds[0].opponent.length > 0)
    ) {
      console.log(feuds);
      console.log(
        "Feuds array is empty or the only feud has opponent(s). Cannot create otherFeuds."
      );
      return;
    }

    // Filter feuds to exclude feuds with no opponent or where the opponent's length is zero
    const filteredFeuds = feuds.filter((feud) => feud.opponent.length > 0);

    // Choose a random feud from the filtered list
    const randomFeudIndex = Math.floor(Math.random() * filteredFeuds.length);
    const randomFeud = filteredFeuds[randomFeudIndex];

    // Check the alignment of the selected feud's opponent
    const { alignment } = randomFeud.opponent[0];

    // Filter wrestlers array to get a random wrestler with the opposite alignment and not currently feuding
    const opposingAlignment = alignment === "face" ? "heel" : "face";
    const availableWrestlers = wrestlers.filter(
      (wrestler) =>
        wrestler.alignment === opposingAlignment && !wrestler.isFeuding
    );

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

    // Create the newOtherFeud object
    const newOtherFeud = {
      id: randomFeud.id, // You can use the feud's ID or assign a new ID here
      name: randomFeud.name,
      face: alignment === "face" ? randomFeud.opponent : [randomWrestler],
      heel: alignment === "heel" ? randomFeud.opponent : [randomWrestler],
      isChampionship: randomFeud.championshipFeud,
      championship: randomFeud.championship || {},
      multiplier: 0.3, // Default value
      intensity: "stale", // Default value
      length: 4,
    };

    // Remove the selected randomFeud from the feuds array
    const updatedFeuds = feuds.filter(
      (feud, index) => index !== randomFeudIndex
    );

    // Add the newly created otherFeuds object to the otherFeuds array
    const updatedOtherFeuds = [...otherFeuds, newOtherFeud];

    // Now you have the updatedFeuds and updatedOtherFeuds arrays, and you can do whatever you want with them (e.g., save them to the state or use them in your application).

    console.log("Updated feuds array:", updatedFeuds);
    console.log("Updated otherFeuds array:", updatedOtherFeuds);
  };

  const updateAndEliminateOtherFeuds = () => {
    const updatedOtherFeuds = [];
    
    const updatedWrestlers = [...wrestlers];

    otherFeuds.forEach((feud) => {
      // Reduce the length property of the feud by 1
      console.log(feud);
      feud.length--;

      // Check if the length is greater than 0, if so, add the feud to the updatedOtherFeuds array
      if (feud.length > 0) {
        updatedOtherFeuds.push(feud);
      } else {
        // The feud's length has become zero, so it will be eliminated.
        // Before eliminating, push the feud into the pastFeuds of the corresponding wrestlerObject
        if (feud.alignment === "face" && feud.Face && feud.Face.length > 0) {
          const wrestlerObject = feud.Face[0]; // Assuming only one wrestler in the Face array
          wrestlerObject.pastFeuds = wrestlerObject.pastFeuds || [];
          wrestlerObject.pastFeuds.push(feud);

          // Create a mirror wrestler with updated inRingSkill (mirror wrestler has the same attributes as the original wrestler)
          const mirrorWrestler = {
            ...wrestlerObject,
            inRingSkill: feud.multiplier,
          };

          // Find the index of the old wrestler in the wrestlers array
          const wrestlerIndex = updatedWrestlers.findIndex(
            (wrestler) => wrestler.id === wrestlerObject.id
          );

          // Replace the old wrestler with the mirror wrestler in the wrestlers array
          if (wrestlerIndex !== -1) {
            updatedWrestlers[wrestlerIndex] = mirrorWrestler;
          }
        } else if (
          feud.alignment === "heel" &&
          feud.Heel &&
          feud.Heel.length > 0
        ) {
          const wrestlerObject = feud.Heel[0]; // Assuming only one wrestler in the Heel array
          wrestlerObject.pastFeuds = wrestlerObject.pastFeuds || [];
          wrestlerObject.pastFeuds.push(feud);

          // Create a mirror wrestler with updated inRingSkill (mirror wrestler has the same attributes as the original wrestler)
          const mirrorWrestler = {
            ...wrestlerObject,
            inRingSkill: feud.multiplier,
          };

          // Find the index of the old wrestler in the wrestlers array
          const wrestlerIndex = updatedWrestlers.findIndex(
            (wrestler) => wrestler.id === wrestlerObject.id
          );

          // Replace the old wrestler with the mirror wrestler in the wrestlers array
          if (wrestlerIndex !== -1) {
            updatedWrestlers[wrestlerIndex] = mirrorWrestler;
          }
        }

        // Calculate the average inRingSkill of the wrestlerObjects in the Face and Heel arrays
        let totalInRingSkill = 0;
        let totalWrestlers = 0;

        if (feud.Face && feud.Face.length > 0) {
          feud.Face.forEach((wrestlerObject) => {
            if (wrestlerObject.inRingSkill) {
              totalInRingSkill += wrestlerObject.inRingSkill;
              totalWrestlers++;
            }
          });
        }

        if (feud.Heel && feud.Heel.length > 0) {
          feud.Heel.forEach((wrestlerObject) => {
            if (wrestlerObject.inRingSkill) {
              totalInRingSkill += wrestlerObject.inRingSkill;
              totalWrestlers++;
            }
          });
        }

        // Calculate the average inRingSkill
        const averageInRingSkill =
          totalWrestlers > 0 ? totalInRingSkill / totalWrestlers : 0;

        // Set the multiplier to the averageInRingSkill
        feud.multiplier = averageInRingSkill;
      }
    });
    dispatch(setOtherFeuds(updatedOtherFeuds));
    dispatch(setWrestlers(updatedWrestlers));

    return { updatedOtherFeuds, updatedWrestlers };
  };

  useEffect(() => {
    //come back to this
    dispatch(setShowChampionship(matchPlan[0].championshipMatch));
    // Generate a random index to select a weekly antic
    const randomIndex = Math.floor(Math.random() * weeklyAntics.length);
    const randomIndexPPV = Math.floor(Math.random() * matchPlan.length);
    // Set the currentWeeklyAntic to the randomly selected antic
    dispatch(setCurrentWeeklyAntic(weeklyAntics[0]));
    dispatch(setCurrentMatchPlan(matchPlan[randomIndexPPV]));
  }, [week]);

  // Function to generate victory/defeat message for championship feud
  const getChampionshipResultDescription = (
    optionResultDescription,
    opponentName,
    championshipName,
    isVictory
  ) => {
    if (isVictory) {
      const updateTitles = () => {};
      return (
        optionResultDescription +
        `\n \n You defeated ${opponentName} to win the ${championshipName}!`
      );
    } else {
      return (
        optionResultDescription +
        ` \n \nYou fought valiantly against ${opponentName}, but unfortunately, you lost the ${championshipName}.`
      );
    }
  };

  // Function to handle the selected option for PPV
  const deserializedCurrentMatchPlan = { ...currentMatchPlan }; // Create a shallow copy of the object

  // Deserialize optionfunction and assign the deserialized function back to the object
  deserializedCurrentMatchPlan.option1function = eval(
    "(" + currentMatchPlan.option1function + ")"
  );
  deserializedCurrentMatchPlan.option2function = eval(
    "(" + currentMatchPlan.option2function + ")"
  );
  deserializedCurrentMatchPlan.option3function = eval(
    "(" + currentMatchPlan.option3function + ")"
  );

  const handlePPVOptionSelect = (option, currentMatchPlan, activeFeud) => {
    const options = ["option1", "option2", "option3"];
    const selectedOptionIndex = options.indexOf(option);
    if (selectedOptionIndex !== -1) {
      const optionResultDescription =
        currentMatchPlan[`option${selectedOptionIndex + 1}ResultDescription`];
      dispatch(setOptionDescription(optionResultDescription));
      if (activeFeud.championshipFeud) {
        const randomValue = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
        const isVictory = randomValue < 5;
        const opponentName = activeFeud.opponent[0].name;
        const championshipName = activeFeud.championshipTitle.name;
        const getChampionshipResultDescriptionStore =
          getChampionshipResultDescription(
            optionResultDescription,
            opponentName,
            championshipName,
            isVictory
          );
        dispatch(setOptionDescription(getChampionshipResultDescriptionStore));
      }

      currentMatchPlan[`option${selectedOptionIndex + 1}function`]();
    } else {
      dispatch(setOptionDescription(""));
    }
  };

  const deserialisedCurrentWeeklyAntic = { ...currentWeeklyAntic }; // Create a shallow copy of the object

  // Deserialize optionfunction and assign the deserialized function back to the object
  deserialisedCurrentWeeklyAntic.option1function = eval(
    "(" + currentWeeklyAntic.option1function + ")"
  );
  deserialisedCurrentWeeklyAntic.option2function = eval(
    "(" + currentWeeklyAntic.option2function + ")"
  );
  deserialisedCurrentWeeklyAntic.option3function = eval(
    "(" + currentWeeklyAntic.option3function + ")"
  );

  const handleOptionSelect = (option) => {
    const randomOtherFeuds = chooseRandomFeudAndCreateOtherFeuds();
    // updateAndEliminateOtherFeuds()

    dispatch(setSelectedOption(option));
    // Handle the selected option based on eventType and option
    if (eventType === "weeklyTV") {
      if (option === "option1") {
        dispatch(
          setOptionDescription(currentWeeklyAntic.option1ResultDescription)
        );

        console.log(deserialisedCurrentWeeklyAntic);
        deserialisedCurrentWeeklyAntic.option1function();
      } else if (option === "option2") {
        dispatch(
          setOptionDescription(currentWeeklyAntic.option2ResultDescription)
        );
        deserialisedCurrentWeeklyAntic.option2function();
      }
    } else if (eventType === "PPV") {
      console.log(currentMatchPlan);
      // Modify this section based on how you handle PPV actions
      switch (option) {
        case "option1":
        case "option2":
        case "option3":
          handlePPVOptionSelect(
            option,
            deserializedCurrentMatchPlan,
            activeFeud
          );
          console.log(deserializedCurrentMatchPlan);
          break;
        default:
          dispatch(setOptionDescription(""));
          break;
      }
    }

    // Hide the action buttons and show the "End Day" button
    dispatch(setShowActions(false));
    dispatch(setShowEndDayButton(true));
  };

  const handleEndDay = () => {
    // Reset the selected option and option description
    dispatch(setSelectedOption(""));
    dispatch(setOptionDescription(""));

    // Show the action buttons and hide the "End Day" button
    dispatch(setShowActions(true));
    dispatch(setShowEndDayButton(false));
  };

  return (
    <div>
    
    </div>
  );
};

export default Live;
