import serialize from "serialize-javascript";
import React, { useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import GameLogic from "./GameLogic";
import Testing from "components/testing";
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
  setCurrentWeeklyAntic,
  setOptionDescription,
  setSelectedOption,
  setShowActions,
  setShowChampionship,
  setShowEndDayButton,
  setPlayerWrestler,
  setCurrentMatchPlan,
  setCompanies,
  addFeud,
  setFeud,
  setWrestlers,
  setOtherFeuds,
  setStats,
  setCharisma,
  setAlignment,
  setPopularity,
  setInRingSkill,
  setCurrentPotentialFeud,
  setActiveFeud,
  setPastFeuds,
  setIsChampion,
  setCurrentChampionshipHeld,
  setTitleReigns,
  setCurrentCompany,
  setTags,
  setActiveFeudLength,
  setActiveFeudMultiplier,
} from "state";

//button2Text is represented as buttonText2 in the reducer Slice

import UserResponseButton from "./Options";

const UserActions = ({ clientId }) => {
  const userResponse = useSelector((state) => state.userResponse);
  const actionDescription = useSelector((state) => state.actionDescription);
  const button1Text = useSelector((state) => state.buttonText);
  const showDescription = useSelector((state) => state.showDescription);
  const showDecisionText = useSelector((state) => state.showDecisionText);
  const selectedDecision = useSelector((state) => state.selectedDecision);
  const playerWrestler = useSelector((state) => state.user);

  const handleSendButton = (option, selectedWrestler) => {
    if (responseRecieved === true) {
      console.log(selectedWrestler);

      const {
        options,
        description,
        decisionText1,
        decisionText2,
        text1,
        text2,
        value1,
        value2,
      } = option;
      const isOptions = options ? true : false;
      dispatch(setShowOptions({ showOptions: isOptions }));
      dispatch(setShowDescription({ showDescription: true }));
      dispatch(setShowDecisionText({ showDecisionText: false }));
      // Send the option string to UserResponseButton
      dispatch(setActionDescription({ actionDescription: description }));
      dispatch(setButton1Text({ buttonText: text1 }));
      dispatch(setButton1TextValue({ buttonTextValue: value1 }));
      dispatch(setButton2Text({ button2Text: text2 }));
      dispatch(setButton2TextValue({ button2TextValue: value2 }));
      dispatch(setDecisionText1({ decisionText1: decisionText1 }));
      dispatch(setDecisionText2({ decisionText2: decisionText2 }));
    } else {
      console.log("ERROR");
    }
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
  const player = useSelector((state) => state.user)

  const [matchLog, setMatchLog] = useState([]);
  const [matchLogWWE, setMatchLogWWE] = useState([]);
  const [matchLogAEW, setMatchLogAEW] = useState([]);
const   activeFeud=useSelector((state) => state.user.activeFeud);
const allWrestlers= useSelector((state) => state.user.savegame.wrestlers);
const playerCompanyName = useSelector((state) => state.user.currentCompany.name);
  const showNextActivityButton = useSelector(
    (state) => state.showNextActivityButton
  );
  const showNextWeekButton = useSelector((state) => state.showNextWeekButton);
  const responseRecieved = useSelector((state) => state.user.responseRecieved);

  const feuds = useSelector((state) => state.user.savegame.feuds);

  const timeToOpenSpot = useSelector((state) => state.timeToOpenSpot);
  const week = useSelector((state) => state.week);
  const story = useSelector((state) => state.story);
  const eventType = useSelector((state) => state.eventType);
  const companies = useSelector((state) => state.user.savegame.companies);
  const otherFeuds = useSelector((state) => state.user.savegame.otherFeuds);
  const playerCompany = useSelector((state) => state.user.currentCompany);
  const dispatch = useDispatch();

  const [selectedWrestler, setSelectedWrestler] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [activities, setActivities] = useState([]);

  const wrestlers = savegame.wrestlers;

  const createFeud = (wrestler) => {
    const alignmentRequirement =
      wrestler.alignment === "face" ? "heel" : "face";
    const charismaRequirement = wrestler.charisma;

    const newFeudCompany = wrestler.company;

    const newFeud = {
      id: feuds.length + 1, // Assign a unique ID for the new feud
      name: `Feud with ${wrestler.name}`,
      opponent: [wrestler],
      ally: [],
      requirements: {
        alignment: alignmentRequirement,
        charisma: charismaRequirement,
      },
      company: newFeudCompany,
      length: 2, // You can set the initial length as needed
      tags: [], // Add tags if needed
      multiplier: 1.2, // Set the initial multiplier as needed
      isCurrentFeud: false,
    };
    // Check if the opponent wrestler is a champion
    if (wrestler.isChampion) {
      newFeud.championshipFeud = true;
      newFeud.championshipTitle = wrestler.championshipHeld;
    } else if (playerWrestler.champion === true) {
      newFeud.championshipFeud = true;
      newFeud.championshipTitle = playerWrestler.currentChampionshipHeld;
    } else {
      newFeud.championshipFeud = false;
      newFeud.championshipTitle = {};
    }
   
    // Add the new feud to the feuds array
    dispatch(addFeud(newFeud));

    return newFeud;
  };

  const updateCompanyBenchmarks = () => {
    const updatedCompanies = companies.map((company) => {
      const wrestlersInCompany = wrestlers.filter(
        (wrestler) => wrestler.company === company.name
      );
      if (wrestlersInCompany.length === 0) {
        return company; // No wrestlers in the company, keep the benchmarks unchanged
      }

      // Calculate the average in-ring skill and popularity for wrestlers in the company
      const totalInRingSkill = wrestlersInCompany.reduce(
        (sum, wrestler) => sum + wrestler.inRingSkill,
        0
      );
      const totalPopularity = wrestlersInCompany.reduce(
        (sum, wrestler) => sum + wrestler.popularity,
        0
      );
      const averageInRingSkill = totalInRingSkill / wrestlersInCompany.length;
      const averagePopularity = totalPopularity / wrestlersInCompany.length;

      // Update the company's benchmarks
      return {
        ...company,
        inRingBenchmark: averageInRingSkill,
        popularityBenchmark: averagePopularity,
      };
    });

    dispatch(setCompanies(updatedCompanies));
  };

  const updateMultipliers = () => {
    const updatedFeuds = feuds.map((feud) => {
      const { requirements, opponent, ally } = feud;
      let multiplier = 1;

      // Compare the player's stats with the feud's requirements and update the multiplier accordingly
      if (playerWrestler.alignment === requirements.alignment) {
        multiplier += 0.5;
      }
      if (playerWrestler.charisma === requirements.charisma) {
        multiplier += 0.3;
      }

      // Popularity-based adjustment
      const popularityDifference = playerWrestler.popularity - 5;
      if (popularityDifference > 0) {
        // Increase by 0.1 for every popularity point above 5
        multiplier += popularityDifference * 0.1;
      } else if (popularityDifference < 0) {
        // Decrease by 0.1 for every popularity point below 3
        multiplier -= Math.abs(popularityDifference) * 0.1;
      }

      // Calculate average relationship value for all involved wrestlers
      const allInvolvedWrestlers = [...opponent, ...ally, playerWrestler];
      const totalRelationship = allInvolvedWrestlers.reduce(
        (sum, wrestler) => sum + (wrestler.relationship || 0),
        0
      );
      const averageRelationship =
        totalRelationship / allInvolvedWrestlers.length;

      // Adjust the multiplier based on the average relationship value
      multiplier += averageRelationship * 0.05; // For example, add 0.05 for every point of average relationship

      // Add more requirements checks and adjustments as needed

      return { ...feud, multiplier };
    });
    dispatch(setFeud(updatedFeuds));
  };

  const updateAndEliminateOtherFeuds = () => {
    if (otherFeuds.length === 0 || (otherFeuds.length === 1 && otherFeuds[0].name === "")) {
      console.log(user.savegame.wrestlers);
      console.log("No otherFeuds yet");
      return;
    }
  
    // Calculate the average popularity of the wrestlerObjects in the face and heel arrays
  const calculateAveragePopularity = (feud) => {
    let totalPopularity = 0;
    let totalWrestlers = 0;
  
    if (feud.face && feud.face.length > 0) {
      feud.face.forEach((wrestlerObject) => {
        if (wrestlerObject.popularity) {
          totalPopularity += wrestlerObject.popularity;
          totalWrestlers++;
        }
      });
    }
  
    if (feud.heel && feud.heel.length > 0) {
      feud.heel.forEach((wrestlerObject) => {
        if (wrestlerObject.popularity) {
          totalPopularity += wrestlerObject.popularity;
          totalWrestlers++;
        }
      });
    }
  
    // Calculate the average popularity (ranging from 0 to 10)
    return totalWrestlers > 0
      ? Math.min(10, Math.ceil(totalPopularity / totalWrestlers))
      : 0;
  };
  
    console.log(otherFeuds);
    const updatedOtherFeuds = otherFeuds.map((feud) => {
      const updatedFeud = { ...feud };
      updatedFeud.length--;
  
      // Calculate the average popularity for the updated feud
      const averagePopularity = calculateAveragePopularity(feud);
      updatedFeud.multiplier = 0.1 * averagePopularity;
  
      // Update the intensity based on the average popularity
      if (averagePopularity > 9) {
        updatedFeud.intensity = "volcanic";
      } else if (averagePopularity > 8) {
        updatedFeud.intensity = "boiling";
      } else if (averagePopularity > 7) {
        updatedFeud.intensity = "mainstream";
      } else if (averagePopularity > 6) {
        updatedFeud.intensity = "hot";
      } else if (averagePopularity > 5) {
        updatedFeud.intensity = "warm";
      } else {
        updatedFeud.intensity = "stale";
      }
  
    // Check if the length is greater than 0, if so, add the feud to the updatedOtherFeuds array
  if (updatedFeud.length > 0) {
    return updatedFeud;
  } else {
    // The feud's length has become zero or less, so it will be eliminated.
    // Before eliminating, push the feud into the pastFeuds of the corresponding wrestlerObjects
  
    const updatedWrestlers = user.savegame.wrestlers.map((wrestler) => {
      if (updatedFeud.face && updatedFeud.face.length > 0) {
        if (updatedFeud.face.some((wrestlerObject) => wrestler.id === wrestlerObject.id)) {
          // This wrestler is involved in the eliminated feud
          // Update the wrestler's past feuds
          return {
            ...wrestler,
            isFeuding: false,
            pastFeuds: [...(wrestler.pastFeuds || []), { ...updatedFeud }],
          };
        }
      }
  
      if (updatedFeud.heel && updatedFeud.heel.length > 0) {
        if (updatedFeud.heel.some((wrestlerObject) => wrestler.id === wrestlerObject.id)) {
          // This wrestler is involved in the eliminated feud
          // Update the wrestler's past feuds
          return {
            ...wrestler,
            isFeuding: false,
            pastFeuds: [...(wrestler.pastFeuds || []), { ...updatedFeud }],
          };
        }
      }
  
      return wrestler;
    });
  
    dispatch(setWrestlers(updatedWrestlers));
  
    // The feud's length is now 0, so we don't need to include it in the updatedOtherFeuds array
    return updatedFeud;
  }
  
  });
  
  // Remove feuds with length less than or equal to 0 from the updatedOtherFeuds array
    const filteredOtherFeuds = updatedOtherFeuds.filter((feud) => feud.length > 0);
  
    dispatch(setOtherFeuds(filteredOtherFeuds));
    console.log(updatedOtherFeuds);
    const updateWrestlersFeudingStatus = () => {
      // Create an array to store the IDs of wrestlers involved in any feud
      const feudingWrestlerIds = [];
    
      // Add wrestlers from otherFeuds to the feudingWrestlerIds array
      otherFeuds.forEach((feud) => {
        if (feud.face && feud.face.length > 0) {
          feud.face.forEach((wrestler) => {
            feudingWrestlerIds.push(wrestler.id);
          });
        }
    
        if (feud.heel && feud.heel.length > 0) {
          feud.heel.forEach((wrestler) => {
            feudingWrestlerIds.push(wrestler.id);
          });
        }
      });
    
      // Add wrestlers from activeFeud to the feudingWrestlerIds array
      if (activeFeud.opponent && activeFeud.opponent.length > 0) {
        activeFeud.opponent.forEach((wrestler) => {
          feudingWrestlerIds.push(wrestler.id);
        });
      }
    
      // Update the wrestlers array with the isFeuding property
      const updatedWrestlers = allWrestlers.map((wrestler) => {
        return {
          ...wrestler,
          isFeuding: feudingWrestlerIds.includes(wrestler.id),
        };
      });
    
    console.log( updatedWrestlers)
    };
    
    return updatedOtherFeuds;
  };
  const updateActiveFeudMultiplier = () => {
    // Check if there is an active feud
    if (
      !playerWrestler.activeFeud.name ||
      playerWrestler.activeFeud.name === "Higgins"
    ) {
      if (playerWrestler.activeFeud.name === "Higgins") {
        dispatch(setActiveFeud({}));
        dispatch(setCurrentPotentialFeud({}));
      }
      return; // No active feud, no need to update multipliers
    }

    const { opponent, ally } = playerWrestler.activeFeud;

    // Calculate the existing multiplier (if any) from the active feud
    let activeFeudMultiplier = playerWrestler.activeFeud.multiplier || 1;

    // Compare the player's stats with the active feud's requirements and update the multipliers accordingly
    if (
      playerWrestler.alignment ===
      playerWrestler.activeFeud.requirements.alignment
    ) {
      activeFeudMultiplier += 0.5;
    }
    if (
      playerWrestler.charisma ===
      playerWrestler.activeFeud.requirements.charisma
    ) {
      activeFeudMultiplier += 0.3;
    }

    // Popularity-based adjustment for opponents
    const popularityDifference = playerWrestler.popularity - 5;
    if (popularityDifference > 0) {
      // Increase by 0.1 for every popularity point above 5
      activeFeudMultiplier += popularityDifference * 0.1;
    } else if (popularityDifference < 0) {
      // Decrease by 0.1 for every popularity point below 3
      activeFeudMultiplier -= Math.abs(popularityDifference) * 0.1;
    }

    // Calculate average relationship value for opponents
    if (opponent.length > 0) {
      const totalOpponentRelationship = opponent.reduce(
        (sum, wrestler) => sum + (wrestler.relationship || 0),
        0
      );
      const averageOpponentRelationship =
        totalOpponentRelationship / opponent.length;

      // Adjust the activeFeudMultiplier based on the average relationship value for opponents
      if (averageOpponentRelationship < 0) {
        activeFeudMultiplier += Math.abs(averageOpponentRelationship) * 0.05; // Add 0.05 for every point of average negative relationship
      }
    }

    // Calculate average relationship value for allies
    if (ally.length > 0) {
      const totalAllyRelationship = ally.reduce(
        (sum, wrestler) => sum + (wrestler.relationship || 0),
        0
      );
      const averageAllyRelationship = totalAllyRelationship / ally.length;

      // Adjust the activeFeudMultiplier based on the average relationship value for allies
      if (averageAllyRelationship < 0) {
        activeFeudMultiplier += Math.abs(averageAllyRelationship) * 0.05;
      }
    }

    // Update the active feud's multiplier
    dispatch(setActiveFeudMultiplier(activeFeudMultiplier));
  };

  const actions = [
    {
      options: true,
      description: "you have a chance to do this",
      decisionText1: "this is what you decided to do",
      decisionText2: "you followed an unauthodox path",
      text1: "help her",
      text2: "hinder them",
      value1: serialize(function sayHello() {
        console.log("hello");
      }),
      value2: "bad 1",
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
            const updatedSavegame = {
              ...savegame,
              wrestlers: updatedWrestlers,
            };

            // Dispatch an action to update the state with the updated savegame
            dispatch(setSavegame(updatedSavegame));

            // Perform some action here using the updatedName
            console.log(`Helping wrestler ${updatedName}...`);
          }
        },
      },
    },
    {
      options: true,
      description: "you have a chance to do something",
      decisionText1: "you chose to do this",
      decisionText2: "you followed an alternate route",
      text1: "Scold",
      text2: "Motivate",
      value1: serialize(function sayHello() {
        console.log("hello");
      }),
      value2: "bad 1",
      label: "Meet Wrestler",
      value: {
        actionText: "A serious meeting with target",
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
            const updatedSavegame = {
              ...savegame,
              wrestlers: updatedWrestlers,
            };

            // Dispatch an action to update the state with the updated savegame
            dispatch(setSavegame(updatedSavegame));

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
    const wrestlerCharisma = selectedWrestler.charisma;
    const playerPopularity = playerWrestler.popularity;
    const playerCharisma = playerWrestler.charisma;

    const actionButtons = [];

    if (wrestlerPopularity < 5) {
      actionButtons.push(
        <button
          key={actions[0].label}
          onClick={() => handleActionSelection(actions[0])}
        >
          {actions[0].label}
        </button>
      );
    }

    if (wrestlerPopularity >= 5) {
      actionButtons.push(
        <button
          key={actions[1].label}
          onClick={() => handleActionSelection(actions[1])}
        >
          {actions[1].label}
        </button>
      );
    }

    // Add more conditions and buttons as needed

    return (
      <div>
        <h2>Actions:</h2>
        {actionButtons}
      </div>
    );
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

  const triggerActionFunctions = async () => {
    const handleNextWeek = () => {
      const playerCompanyFeuds = otherFeuds.filter((feud) => 
      feud.company === playerCompany.name);
      const numberOfCompanyFeuds = playerCompanyFeuds.length;

      updateAndEliminateOtherFeuds()
   
      const maxFeud = 4 - feuds.length;

      // Check if the feuds array has less than 3 feuds and create a new feud
      for (let i = 0; i < maxFeud; i++) {
        const randomWrestler =
          wrestlers[Math.floor(Math.random() * wrestlers.length)];
      }
      updateMultipliers();
      // Check if the feuds array has less than 3 feuds and create a new feud

      if (week < 4) {
        const prevWeek = week + 1;
        dispatch(setWeek({ week: prevWeek }));
      } else {
        dispatch(setWeek({ week: 1 }));
      }
      if (week === 4) {
        dispatch(setEventType({ eventType: "PPV" }));
      } else {
        dispatch(setEventType({ eventType: "weeklyTV" }));
      }

      updateActiveFeudMultiplier();
      updateCompanyBenchmarks();

      dispatch(setTimeToOpenSpot({ timeToOpenSpot:numberOfCompanyFeuds}));

      // Check if there is a current potential feud
      if (playerWrestler.currentPotentialFeud.name) {
        if (playerWrestler.currentPotentialFeud.name === "Higgins") {
          dispatch(setCurrentPotentialFeud({}));
        }
        // Check if there are opponents and allies in the feud
        const { opponent, ally } = playerWrestler.currentPotentialFeud;
        const allInvolvedWrestlers = [...opponent, ...ally];
        const company = playerWrestler.currentCompany;

        // Calculate average booker opinion for all involved wrestlers
        const totalBookerOpinion = allInvolvedWrestlers.reduce(
          (sum, wrestler) =>
            sum +
            (wrestler.company === company.name
              ? company.bookerOpinion || 0
              : wrestler.bookerRelationship || 0),
          0
        );

        // Calculate average booker relationship for all involved wrestlers
        const totalBookerRelationship = allInvolvedWrestlers.reduce(
          (sum, wrestler) => sum + (wrestler.bookerRelationship || 0),
          0
        );
        const averageBookerOpinion =
          totalBookerOpinion + totalBookerRelationship;
        const allInvolvedWrestlersAndPlayer = allInvolvedWrestlers.length + 1;
        const averageBookerRelationship =
          averageBookerOpinion / allInvolvedWrestlersAndPlayer;

        // Calculate the random value and the threshold based on the booker opinion and relationship
        const randomValue = Math.random() * 10; // Generates a random number between 0.0 and 9.99
        const threshold = averageBookerRelationship;

        if (timeToOpenSpot < 5) {
          // Check if the random value is below the threshold to activate the feud
          if (randomValue <= threshold) {
            if (!playerWrestler.activeFeud.name) {
              if (playerWrestler.currentPotentialFeud.name) {
                // Find and remove the current potential feud from the feuds array
                const updatedFeuds = feuds.filter(
                  (feud) => feud.id !== playerWrestler.currentPotentialFeud.id
                );
                dispatch(setFeud(updatedFeuds));
              }
              const {
                preferredCharisma,
                inRingBenchmark,
                popularityBenchmark,
                bookerOpinion,
              } = playerCompany;

              const minimumPopularity = popularityBenchmark + 1;
            const minimumInRingSkill = inRingBenchmark + 1;
          const requiredCharisma = preferredCharisma;
          
          const requiredTrust=5;


          // Calculate the playerWrestler's score based on how well they meet the criteria
const playerPopularity = playerWrestler.popularity;
const playerInRingSkill = playerWrestler.inRingSkill;
const playerCharisma = playerWrestler.charisma;
const playerTrust = playerWrestler.currentCompany.bookerOpinion;

          let playerScore = 0;

if (playerPopularity >= minimumPopularity) {
  playerScore += 1;
}

if (playerInRingSkill >= minimumInRingSkill) {
  playerScore += 1;
}

if (playerCharisma === requiredCharisma) {
  playerScore += 1;
}

if (playerTrust >= requiredTrust) {
  playerScore += 1;
}

// Determine the currentFeud.length based on the player's score
let currentFeudLength;

// Define a scale for feud length based on the player's score
const scoreToFeudLength = {
  0: 2, // If the player meets none of the criteria, the feud length is 0
  1: 4, // If the player meets one criterion, the feud length is 1 (you can adjust these values based on your desired scale)
  2: 6,
  3: 8,
  4: 10, // If the player meets all criteria, the feud length is 4 (maximum in this example)
};

currentFeudLength = scoreToFeudLength[playerScore];
const playerCurrentPotentialFeud = { ...playerWrestler.currentPotentialFeud };
playerCurrentPotentialFeud.length = playerCurrentPotentialFeud.length + currentFeudLength;

              dispatch(setActiveFeud(playerCurrentPotentialFeud));
              dispatch(setCurrentPotentialFeud({}));
              dispatch(
                setStory({
                  story: `Congratulations! The booker picked up your feud with ${playerWrestler.currentPotentialFeud.opponent[0].name} and it has become an active feud.`,
                })
              );

              dispatch(setIsFeudActive({ isFeudActive: true }));

              // Reset the timeToOpenSpot counter to its initial value (e.g., 0) when the feud becomes active

              dispatch(
                setTimeToOpenSpot({ timeToOpenSpot: numberOfCompanyFeuds })
              );
            }
          } else {
            dispatch(
              setStory({
                story: `The booker didn't choose any feud for this week. The next spot will be open in ${
                  5 - timeToOpenSpot
                } weeks.`,
              })
            );

            setIsFeudActive(false);
          }
          dispatch(setTimeToOpenSpot({ timeToOpenSpot:numberOfCompanyFeuds }));
        }
      } else {
      }
      if (feuds.length !== 0) {
        // If there is no current potential feud.
        const randomFeud = feuds.filter((feud) => {
          // Check if the opponent exists and has a company property
          if (
            feud.opponent &&
            feud.opponent.length > 0 &&
            feud.opponent[0].company
          ) {
            return feud.opponent[0].company !== playerCompany;
          }
          // If the opponent or company property is missing, exclude the feud from the selection
          return false;
        })[Math.floor(Math.random() * feuds.length)];
        const randomMultiplier = randomFeud.multiplier;
        const randomValue = Math.random() * 4; // Generates a random number between 0.0 and 3.99

        // Calculate additional weeks for feud length based on charisma comparison
        let additionalWeeks = 0;
        const playerCharisma = playerWrestler.charisma;
        const companyPreferredCharisma =
          playerWrestler.currentCompany.preferredCharisma;
        if (playerCharisma === companyPreferredCharisma) {
          additionalWeeks = 6; // If player's charisma matches company's preferred, add 6 weeks
          updateFeudLengthWithAdditionalWeeks(randomFeud, additionalWeeks);
        } else if (
          (playerCharisma === "comedic" &&
            companyPreferredCharisma === "menacing") ||
          (playerCharisma === "menacing" &&
            companyPreferredCharisma === "comedic")
        ) {
          additionalWeeks = 4; // If player's charisma is opposite to company's preferred, add 4 week
          updateFeudLengthWithAdditionalWeeks(randomFeud, additionalWeeks);
        }

        function updateFeudLengthWithAdditionalWeeks(
          randomFeud,
          additionalWeeks
        ) {
          // Create a copy of the feuds array
          const updatedFeuds = [...feuds];

          // Find the index of the randomFeud object in the updatedFeuds array
          const randomFeudIndex = updatedFeuds.findIndex(
            (feud) => feud.id === randomFeud.id
          );

          // Create a copy of the randomFeud object and update its length property
          const updatedRandomFeud = { ...randomFeud, length: additionalWeeks };

          // Update the updatedFeuds array with the updatedRandomFeud object at the randomFeudIndex
          updatedFeuds[randomFeudIndex] = updatedRandomFeud;
          // dispatch(setFeud(updatedFeuds));
          // Return the updated feuds array
          return updatedFeuds;
        }
        console.log("chance " + randomMultiplier);
        console.log(randomValue);
        if (randomValue <= randomMultiplier) {
          dispatch(setCurrentPotentialFeud(randomFeud));

          dispatch(
            setStory({
              story: `The booker is considering a feud against ${randomFeud.opponent[0].name}`,
            })
          );
          setIsFeudActive(true);
        } else {
          dispatch(
            setStory({
              story: "The booker didn't choose any feud for this week.",
            })
          );
          setIsFeudActive(false);
        }
        if (playerWrestler.activeFeud.name) {
          // Subtract 1 from the length of the active feud each week
          dispatch(setActiveFeudLength());

          // Check if the active feud's length has reached 0
          if (playerWrestler.activeFeud.length === 0) {
            // Reset the active feud when its length is 0
            dispatch(
              setPastFeuds([...user.pastFeuds, playerWrestler.activeFeud])
            );
            dispatch(setActiveFeud({}));
          }
        }
      } else {
        const updatedFeuds = [...feuds.slice(1)];
        const randomWrestler =
          wrestlers[Math.floor(Math.random() * wrestlers.length)];

        dispatch(setFeud(updatedFeuds));
        createFeud(randomWrestler);
      
      }

  

if (timeToOpenSpot <= 0) {
  dispatch(setTimeToOpenSpot({ timeToOpenSpot: numberOfCompanyFeuds }));
}

      const checkAndAddFeudsForCompany = (company, maxFeuds) => {
        const feudsForCompany = feuds.filter(
          (feud) => feud.company === company
        );
        const currentFeudCount = feudsForCompany.length;

        if (currentFeudCount < maxFeuds) {
          const wrestlersInCompany = wrestlers.filter(
            (wrestler) => wrestler.company === company
          );
          const availableWrestlers = wrestlersInCompany.filter((wrestler) => {
            return !feuds.some((feud) =>
              feud.opponent.some((opponent) => opponent.id === wrestler.id)
            );
          });

          const remainingFeudsNeeded = maxFeuds - currentFeudCount;
          const wrestlersToAdd = availableWrestlers.slice(
            0,
            remainingFeudsNeeded
          );

          wrestlersToAdd.forEach((wrestler) => {
            createFeud(wrestler);
          });
        }
      };

      const selectRandomWrestlers = () => {
        // Filter wrestlers with company 'AEW' and 'WWE'
        const aewWrestlers = wrestlers.filter(
          (wrestler) => wrestler.company === "AEW"
        );
        const wweWrestlers = wrestlers.filter(
          (wrestler) => wrestler.company === "WWE"
        );

        // Shuffle the arrays to get random order of wrestlers
        shuffleArray(aewWrestlers);
        shuffleArray(wweWrestlers);

        // Select the first four wrestlers from each shuffled array
        const selectedAEWWrestlers = aewWrestlers.slice(0, 4);
        const selectedWWEWrestlers = wweWrestlers.slice(0, 4);

        // Check and add feuds for each company to have exactly 4 feuds
        checkAndAddFeudsForCompany("AEW", 4);
        checkAndAddFeudsForCompany("WWE", 4);

      
      };

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      selectRandomWrestlers();
    };

    ///
    // dispatch(setResponseRecieved({ responseRecieved: true }));
   

    if (responseRecieved === true) {
      handleNextWeek();
      dispatch(setShowNextWeekButton({ showNextWeekButton: false }));
      if (activities.length > 0) {
        const [firstActivity, ...remainingActivities] = activities;

        // Execute the action function for the first activity only if it is the first time the "Next Week" button is pressed
        if (remainingActivities.length === activities.length - 1) {
          const { action, selectedWrestler } = firstActivity;
          if (action.value && action.value.actionFunction) {
            action.value.actionFunction(selectedWrestler.id);
          }
    
          handleSendButton(action, selectedWrestler);
        } else {
          const { action, selectedWrestler } = firstActivity;
          if (action.value && action.value.actionFunction) {
            action.value.actionFunction(selectedWrestler.id);
          }

          handleSendButton(action, selectedWrestler);
        }

        // Update the activities array with the remaining activities
        setActivities(remainingActivities);
        const remainSize = remainingActivities.length > 0;

        // Show the "Next Activity" button if there are remaining activities
        if (remainSize) {
          // There are remaining activities
          dispatch(setShowNextActivityButton({ showNextActivityButton: true }));
        } else {
          dispatch(
            setShowNextActivityButton({ showNextActivityButton: false })
          );
        }

        // Hide the "Next Week" button if there are remaining activities

        if (remainingActivities.length === 0) {
          dispatch(setShowNextWeekButton({ showNextWeekButton: true }));
        }
      } else {
        // No more activities, hide the "Next Activity" button and show the "Next Week" button
        dispatch(setShowNextActivityButton({ showNextActivityButton: false }));
        dispatch(setShowNextWeekButton({ showNextWeekButton: true }));
      }
      if (activities.length === 0) {
        dispatch(setResponseRecieved({ responseRecieved: true }));
        await replaceUser(user);
      } else {
        dispatch(setResponseRecieved({ responseRecieved: false }));
      }
    } else {
      console.log("COMPLETE ACTION FIRST");
    }
  };

  const triggerActionFunctions2 = async () => {
    if (responseRecieved === true) {
      dispatch(setShowNextWeekButton({ showNextWeekButton: false }));
      if (activities.length > 0) {
        const [firstActivity, ...remainingActivities] = activities;

        // Execute the action function for the first activity only if it is the first time the "Next Week" button is pressed
        if (remainingActivities.length === activities.length - 1) {
          const { action, selectedWrestler } = firstActivity;
          if (action.value && action.value.actionFunction) {
            action.value.actionFunction(selectedWrestler.id);
          }
        
          handleSendButton(action, selectedWrestler);
        } else {
          const { action, selectedWrestler } = firstActivity;
          if (action.value && action.value.actionFunction) {
            action.value.actionFunction(selectedWrestler.id);
          }

          handleSendButton(action, selectedWrestler);
        }

        // Update the activities array with the remaining activities
        setActivities(remainingActivities);
        const remainSize = remainingActivities.length > 0;

        // Show the "Next Activity" button if there are remaining activities
        if (remainSize) {
          // There are remaining activities
          dispatch(setShowNextActivityButton({ showNextActivityButton: true }));
        } else {
          dispatch(
            setShowNextActivityButton({ showNextActivityButton: false })
          );
        }

        // Hide the "Next Week" button if there are remaining activities

        if (remainingActivities.length === 0) {
          dispatch(setShowNextWeekButton({ showNextWeekButton: true }));
        }
      } else {
        // No more activities, hide the "Next Activity" button and show the "Next Week" button
        dispatch(setShowNextActivityButton({ showNextActivityButton: false }));
        dispatch(setShowNextWeekButton({ showNextWeekButton: true }));
      }
      dispatch(setResponseRecieved({ responseRecieved: false }));
    } else {
      console.log("COMPLETE ACTION FIRST");
    }
  };

  const renderNextButton = () => {
    if (activities.length > 0 && showNextActivityButton) {
      return <button onClick={triggerActionFunctions2}>Next Activity</button>;
    }
    return null;
  };

  return (
    <Box>
      <GameLogic />
      <Testing />
      {/* <div>
      <h1>ComponentA</h1>
      <UserResponseButton initialButtonText="Click Me" onResponse={'handleSendText'} />
    {showDescription && (
            <>
              <p>Result Text: {actionDescription}</p>
              <p>Result value: {userResponse}</p>
             
            </>
            
          )}
          {showDecisionText && (
            <>
             <p>Decision: {selectedDecision}</p>
        
            </>
          )}
       
    </div> */}

      {/* DEMARCATE */}
      {/* <h1>hellooo {firstname}</h1>
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
      </ul> */}

      {/* <h2>Wrestler Selection:</h2>
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
      </ul> */}

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
