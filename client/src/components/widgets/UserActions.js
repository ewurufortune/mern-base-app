import serialize from "serialize-javascript";
import React, { useState } from "react";
import { Box, useMediaQuery, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TabComponent from "./tabsComponent/TabsComponent";
import OverallTab from "./OverallTab";

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
  setUser,
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
  setActionTarget,
  setActiveFeudLength,
  setActiveFeudMultiplier,
  setActiveTab,
  setDecisionButtonClicked,
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
  const wrestlers = useSelector((state) => state.user.savegame.wrestlers);
  const decisionButtonClicked = useSelector(
    (state) => state.decisionButtonClicked
  );

  const [selectedCompany, setSelectedCompany] = useState(
    playerWrestler.currentCompany.name
  );
  const [selectedCharisma, setSelectedCharisma] = useState("all");
  const [selectedAlignment, setSelectedAlignment] = useState("all");

  const uniqueCompanies = [
    ...new Set(wrestlers.map((wrestler) => wrestler.company)),
  ];
  const uniqueCharisma = [
    ...new Set(wrestlers.map((wrestler) => wrestler.charisma)),
  ];
  const uniqueAlignments = [
    ...new Set(wrestlers.map((wrestler) => wrestler.alignment)),
  ];

  const [optionsPresent, setOptionsPresent] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
      dispatch(setActionTarget(selectedWrestler));
      const isOptions = options ? true : false;

      dispatch(setShowOptions({ showOptions: isOptions }));
      dispatch(setShowDescription({ showDescription: true }));
      dispatch(setShowDecisionText({ showDecisionText: false }));
      // Send the option string to UserResponseButton
      dispatch(setActionDescription({ actionDescription: description }));
      if (isOptions===true){
        dispatch(setButton2TextValue({ button2TextValue: value2 }));
        dispatch(setButton1TextValue({ buttonTextValue: value1 }));
        dispatch(setButton1Text({ buttonText: text1 }));
        dispatch(setButton2Text({ button2Text: text2 }));
      }
   
      dispatch(setDecisionText1({ decisionText1: decisionText1 }));
      dispatch(setDecisionText2({ decisionText2: decisionText2 }));
      if (options === false) {
        console.log("options are absent");
        setOptionsPresent(false);
        dispatch(setResponseRecieved({ responseRecieved: true }));
        console.log(responseRecieved);
      } else {
        console.log("options are present");
        setOptionsPresent(true);
      }
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
  const alignment = useSelector((state) => state.user.alignment);
  const savegame = useSelector((state) => state.user.savegame);
  const player = useSelector((state) => state.user);
  const activeTab = useSelector((state) => state.activeTab);

  const [matchLog, setMatchLog] = useState([]);
  const [matchLogWWE, setMatchLogWWE] = useState([]);
  const [matchLogAEW, setMatchLogAEW] = useState([]);
  const activeFeud = useSelector((state) => state.user.activeFeud);
  const allWrestlers = useSelector((state) => state.user.savegame.wrestlers);

  const playerCompanyName = useSelector(
    (state) => state.user.currentCompany.name
  );
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

  const createFeud = (opponent) => {
    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(opponent);
    // const sameCompanyOpponents = wrestlers.filter((wrestler) => !wrestler.isFeuding && wrestler.company === player.company);
    // const opponent = sameCompanyOpponents[Math.floor(Math.random() * sameCompanyOpponents.length)];

    if (!opponent) {
      console.log("No available opponents for feud");
      return;
    }
    const format = ["Dominant", "Underdog"][getRandomNumber(0, 1)];
    const aim = ["Get Over", "Put Over"][getRandomNumber(0, 1)];
    const storyline = [
      {
        title: "Trial of Redemption",
        description:
          "A wrestler must choose between loyalty to their friends or their career.",
        role: [
          "Bad Ass",
          "Mysterious",
          "Egomaniac",
          "Business Minded",
          "Political Schemer",
          "Inspiring",
          "Lone Wolf",
          "Protege",
          "Prodigy",
          "Authority",
          "Lover Boy",
          "Veteran",
          "Heroic",
          "Unstable",
        ][getRandomNumber(0, 13)],
      },
      {
        title: "Social and Cultural Commentary",
        description:
          " Use wrestling to address real-world issues and societal themes.",
        role: [
          "Egomaniac",
          "Business Minded",
          "Political Schemer",
          "Inspiring",
          "Authority",
          "Veteran",
          "Heroic",
          "Unstable",
        ][getRandomNumber(0, 7)],
      },
      {
        title: "Sacrifice for a Cause",
        description:
          "Follow a wrestler's selfless journey, sacrificing personal gain for a greater cause..",
        role: [
          "Political Schemer",
          "Inspiring",
          "Lone Wolf",
          "Protege",
          "Prodigy",
          "Authority",
          "Heroic",
          "Unstable",
        ][getRandomNumber(0, 7)],
      },
      {
        title: "Feud over Leadership",
        description: "Power struggles to determine the leader.",
        role: [
          "Bad Ass",
          "Mysterious",
          "Egomaniac",
          "Business Minded",
          "Political Schemer",
          "Inspiring",
          "Authority",
          "Lover Boy",
          "Veteran",
          "Heroic",
          "Unstable",
        ][getRandomNumber(0, 10)],
      },
      {
        title: "Feud Over Authority",
        description:
          "Centered on wrestlers challenging the authority figures in the promotion.",
        role: [
          "Bad Ass",
          "Mysterious",
          "Business Minded",
          "Political Schemer",
          "Inspiring",
          "Lone Wolf",
          "Prodigy",
          "Authority",
          "Heroic",
        ][getRandomNumber(0, 8)],
      },
      {
        title: "Conquering a Personal Demon",
        description:
          " a wrestler's struggle to overcome inner demons or fears..",
        role: [
          "Inspiring",
          "Lone Wolf",
          "Protege",
          "Prodigy",
          "Heroic",
          "Unstable",
        ][getRandomNumber(0, 14)],
      },
      {
        title: "Mystery Whodunit",
        description:
          "A storyline with a mystery component, where the audience must guess the culprit.",
        role: [
          "Bad Ass",
          "Mysterious",
          "Egomaniac",
          "Business Minded",
          "Political Schemer",
          "Lone Wolf",
          "Protege",
          "Prodigy",
          "Authority",
          "Lover Boy",
        ][getRandomNumber(0, 14)],
      },
    ][getRandomNumber(0, 6)];
    const length = 2; // Default length of the feud
    const opponentPopularity = opponent.popularity;
    const playerPopularity = player.popularity;
    const defaultMultiplier = (opponentPopularity + playerPopularity) / 2;
    const multiplier = defaultMultiplier; // Default multiplier based on average popularity
    const intensity =
      multiplier < 20
        ? "stale"
        : multiplier < 40
        ? "cold"
        : multiplier < 50
        ? "tepid"
        : multiplier < 60
        ? "warm"
        : multiplier < 70
        ? "hot"
        : multiplier < 80
        ? "boiling"
        : multiplier < 90
        ? "mainstream"
        : "volcanic";

    const title = storyline.title;
    // Generate random values for the requirements
    const requirements = {
      alignment: opponent.alignment,
      style: opponent.style,
      relationshipOpponentRelationship: getRandomNumber(6, 10), // Random number between 6 and 10
      inTeam: false,
      inFaction: false,
      championshipFeud: opponent.isChampion || Math.random() < 0.2, // 20% chance if opponent is not champion
      championshipName: opponent.isChampion ? opponent.championshipHeld : "",
      role: "wrestler",
      gimmick: [
        "supernatural",
        "monster",
        "anti-establishment",
        "superhero",
        "showman",
      ][getRandomNumber(0, 4)],
      gender: opponent.gender,
      bodytype: ["muscular", "athletic", "fat", "slim"][getRandomNumber(0, 3)],
      inRingSkill:
        aim === "Get Over"
          ? opponent.inRingSkill - getRandomNumber(5, 15)
          : opponent.inRingSkill + getRandomNumber(5, 15),
      ringPsycholgy: opponent.ringPsycholgy,
      popularity:
        aim === "Put Over"
          ? opponent.popularity - getRandomNumber(5, 15)
          : opponent.popularity + getRandomNumber(5, 15),
      age:
        aim === "Get Over"
          ? opponent.age - getRandomNumber(5, 15)
          : opponent.age + getRandomNumber(5, 15),
    };

    // Use opponent's company and contract
    const company = opponent.company;
    const contract = opponent.contract;

    // Create the feud object
    const feudObject = {
      id: feuds.length + 1,
      name: `Feud with ${opponent.name}`,
      title,
      opponent: [opponent],
      format,
      length,
      aim,
      multiplier,
      intensity,
      requirements,
      company,
      storyline,
      contract,
      isCurrentFeud: false,
      tags: [],
      ally: [],
    };

    // Mark the opponent as feuding
    // Create a copy of the opponent object and mark them as feuding
    const mirrorOpponent = { ...opponent, isFeuding: true };

    // Replace the original opponent with the modified one in the wrestlers array
    const updatedWrestlers = wrestlers.map((wrestler) =>
      wrestler.id === opponent.id ? mirrorOpponent : wrestler
    );
    console.log(opponent);
    // Call setWrestlers with the updated array

    dispatch(setWrestlers(updatedWrestlers));
    dispatch(addFeud(feudObject));
    return feudObject;
  };

  // Add the new feud to the feuds array

  // return newFeud;
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
      console.log(opponent);

      let multiplier = 1;
      console.log(feud);
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
      console.log(opponent);
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
  const createOtherFeuds = () => {
    // Check if the 'feuds' array is empty or if the only feud has 'opponent.length' > 0
    if (feuds.length === 0 || feuds[0].name === "") {
      console.log(
        "Feuds array is empty or feud has no name. Cannot create otherFeuds."
      );
      return;
    }

    // Filter feuds to exclude feuds with no opponent or where the opponent's length is zero
    const filteredFeuds = feuds.filter((feud) => feud.opponent.length > 0);

    // Choose a random feud from the filtered list
    const randomFeudIndex = Math.floor(Math.random() * filteredFeuds.length);
    const randomFeud = filteredFeuds[randomFeudIndex];

    const updatedFeuds = filteredFeuds.filter(
      (feud, index) => index !== randomFeudIndex
    );

    // Update the feuds array with the filtered array
    dispatch(setFeud(updatedFeuds));
    // Check the alignment of the selected feud's opponent
    const { alignment } = randomFeud.opponent[0];
    const { company } = randomFeud;

    // Filter wrestlers array to get a random wrestler with the opposite alignment and not currently feuding
    const opposingAlignment = alignment === "face" ? "heel" : "face";
    const availableWrestlers = user.savegame.wrestlers.filter(
      (wrestler) =>
        wrestler.alignment === opposingAlignment &&
        wrestler.company === randomFeud.company &&
        !wrestler.isFeuding
    );
    console.log(company);
    console.log(availableWrestlers);
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

    let totalPopularity = 0;
    let totalWrestlers = 0;

    if (randomFeud.opponent && randomFeud.opponent.length > 0) {
      randomFeud.opponent.forEach((wrestler) => {
        if (wrestler.popularity) {
          totalPopularity += wrestler.popularity;
          totalWrestlers++;
        }
      });
    }

    // Add the popularity of the randomWrestler to the totalPopularity
    if (randomWrestler.popularity) {
      totalPopularity += randomWrestler.popularity;
      totalWrestlers++;
    }

    // Calculate the average popularity (ranging from 0 to 10)
    const averagePopularity =
      totalWrestlers > 0
        ? Math.min(10, Math.ceil(totalPopularity / totalWrestlers))
        : 0;

    // Set the length property of the otherFeud based on the average popularity
    const maxLength = 10; // Maximum length is 10
    const minLength = 1; // Minimum length is 1

    // Scale the averagePopularity to the range of minLength to maxLength
    const length =
      minLength +
      Math.round((maxLength - minLength) * (averagePopularity / 10));
    const multiplier =
      minLength +
      Math.round((maxLength - minLength) * (averagePopularity / 100));

    let intensity = "";
    if (averagePopularity > 9) {
      intensity = "Volcanic";
    }
    if (averagePopularity > 8) {
      intensity = "Boiling";
    }
    if (averagePopularity > 7) {
      intensity = "Mainstream";
    } else if (averagePopularity > 6) {
      intensity = "hot";
    } else if (averagePopularity > 5) {
      intensity = "warm";
    } else {
      intensity = "stale";
    }
    console.log(length);
    console.log(multiplier);
    // Create the otherFeuds object
    const newOtherFeud = {
      id: randomFeud.id, // You can use the feud's ID or assign a new ID here
      name: randomFeud.name,
      face: alignment === "face" ? randomFeud.opponent : [randomWrestler],
      heel: alignment === "heel" ? randomFeud.opponent : [randomWrestler],
      championshipFeud: randomFeud.championshipFeud,
      championship: randomFeud.championship || {},
      company: company,
      multiplier,
      intensity,
      length,
    };

    // Update the isFeuding property for the wrestlers involved in the feud
    const updatedWrestlers = user.savegame.wrestlers.map((wrestler) => {
      if (
        newOtherFeud.face.some((w) => w.id === wrestler.id) ||
        newOtherFeud.heel.some((w) => w.id === wrestler.id)
      ) {
        return {
          ...wrestler,
          isFeuding: true,
        };
      } else {
        return wrestler;
      }
    });

    dispatch(setWrestlers(updatedWrestlers));

    const updatedOtherFeuds = [...otherFeuds, newOtherFeud];
    dispatch(setOtherFeuds(updatedOtherFeuds));
    console.log(otherFeuds);
  };

  const updateAndEliminateOtherFeuds = () => {
    if (
      otherFeuds.length === 0 ||
      (otherFeuds.length === 1 && otherFeuds[0].name === "")
    ) {
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
            if (
              updatedFeud.face.some(
                (wrestlerObject) => wrestler.id === wrestlerObject.id
              )
            ) {
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
            if (
              updatedFeud.heel.some(
                (wrestlerObject) => wrestler.id === wrestlerObject.id
              )
            ) {
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
    const filteredOtherFeuds = updatedOtherFeuds.filter(
      (feud) => feud.length > 0
    );

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

      console.log(updatedWrestlers);
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
      value1: {
        traits: ["menacing", "technical", "face", "athletic"],
        stats: [
          {
            check: "experience",
            value: "isLower",
            increasePlayer: [["popularity",5], ["inRingSkill",1]],
            decreasePlayer: [["ringPyschology",1], ["popularity",1]],
            increaseTarget: [ ["relationship",1]],
            decreaseTarget: [["popularity",1], ["inRingSkill",1]],
          },
        ],
      },

      value2: {
        traits: ["menacing", "technical", "face", "athletic"],
        stats: [
          {
            check: "experience",
            value: "isLower",
            increasePlayer: [["popularity",5], ["inRingSkill",1]],
            decreasePlayer: [["ringPyschology",1], ["popularity",1]],
            increaseTarget: [ ["relationship",1]],
            decreaseTarget: [["popularity",1], ["inRingSkill",1]],
          },
        ],
      },
      label: "Help Wrestler",
      show: true,
      actionText: "Gave target some tips for improvement",
    },

    {
      options: false,
      description: "you have a chance to do something",
      decisionText1: "you chose to do this",
      decisionText2: "you followed an alternate route",
      text1: "Scold",
      text2: "Motivate",
      value1: {
        traits: [
          "menacing",
          "comedic",
          "highflyer",
          "brawler",
          "technical",
          "face",
          "heel",
          "muscular",
          "athletic",
          "fat",
          "slim",
        ],
        stats: [
          {
            check: "experience",
            value: "isHigher",
            increasePlayer: [["popularity",1], ["inRingSkill",1]],
            decreasePlayer: [["ringPyschology",1], ["popularity",1]],
            increaseTarget: [ ["relationship",1]],
            decreaseTarget: [["popularity",1], ["inRingSkill",1]],
          },
        ],
      },
      value2: {
        check: [],
        traits: [],
        stats: [],
      },
      label: "Meet Wrestler",
      show: true,
      actionText: "Gave target some tips for improvement",
    },
  ];

  const makeDecision = (action, targetWrestlersArray) => {
    const playerMirror = { ...player };
    console.log(targetWrestlersArray[0][0]);
    const targetWrestler ={ ...targetWrestlersArray[0][0]}
    
    const { value1 } = action;
    if (action.options === false) {
      // Extract the data from value1
      const { traits, stats } = value1;

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

      console.log(value1);

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
  };




  

  const wrestlerButtons = wrestlers
    .filter((wrestler) => {
      // Filter by selected company
      if (selectedCompany !== "all") {
        return wrestler.company === selectedCompany;
      }
      return true;
    })
    .filter((wrestler) => {
      // Filter by selected charisma
      if (selectedCharisma !== "all") {
        return wrestler.charisma === selectedCharisma;
      }
      return true;
    })
    .filter((wrestler) => {
      // Filter by selected alignment
      if (selectedAlignment !== "all") {
        return wrestler.alignment === selectedAlignment;
      }
      return true;
    })
    .map((wrestler) => (
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

    const actionButtons = actions
      .filter((action) => action.show) // Filter actions based on the 'show' property
      .map((action) => (
        <button
          key={action.label}
          onClick={() => handleActionSelection(action, [selectedWrestler])}
        >
          {action.label}
        </button>
      ));

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
      // Show the Snackbar when the API call succeeds
      setErrorMessage("");
      setSuccessMessage("Data replaced successfully!");
      setSnackbarOpen(true);
      console.log(data);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to replace data!");
      setSnackbarOpen(true);
      console.error("Error replacing user:", error);
      // Show the Snackbar when the API call fails
    }
  };

  const triggerActionFunctions = async () => {
    const handleNextWeek = () => {
      function increaseBookerOpinion() {
        console.log(companies);
        const companyIndex = companies.findIndex(
          (company) => company.id === playerWrestler.currentCompany.id
        );
        // If playerWrestler.currentCompany is found in the companies array
        if (companyIndex !== -1) {
          // Create a copy of playerWrestler.currentCompany to avoid modifying the original object directly
          const updatedCurrentCompany = { ...playerWrestler.currentCompany };

          // Increase the bookerOpinion by 0.1
          updatedCurrentCompany.bookerOpinion += 0.1;

          // Update the companies array with the updatedCurrentCompany
          const updatedCompanies = [...companies];
          updatedCompanies[companyIndex] = updatedCurrentCompany;

          // Now you can dispatch the updatedCompanies or update the state with it
          dispatch(setCompanies(updatedCompanies));
          dispatch(setCurrentCompany(updatedCurrentCompany)); // If using Redux
          // setCompanies(updatedCompanies); // If using React state
        }
      }
      increaseBookerOpinion();
      const playerCompanyFeuds = otherFeuds.filter(
        (feud) => feud.company === playerCompany.name
      );
      const numberOfCompanyFeuds = playerCompanyFeuds.length;

      updateAndEliminateOtherFeuds();

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

      dispatch(setTimeToOpenSpot({ timeToOpenSpot: numberOfCompanyFeuds }));

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

              const requiredTrust = 5;

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
              const playerCurrentPotentialFeud = {
                ...playerWrestler.currentPotentialFeud,
              };
              playerCurrentPotentialFeud.length =
                playerCurrentPotentialFeud.length + currentFeudLength;

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
          dispatch(setTimeToOpenSpot({ timeToOpenSpot: numberOfCompanyFeuds }));
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
        console.log(randomFeud);
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

      const maxOtherFeud = 10 - otherFeuds.length;

      // Check if the feuds array has less than 3 feuds and create a new feud
      for (let i = 0; i < maxOtherFeud; i++) {
        createOtherFeuds();
      }
    };

    if (responseRecieved === true) {
      handleNextWeek();
      dispatch(setShowNextWeekButton({ showNextWeekButton: false }));
      if (activities.length > 0) {
        const [firstActivity, ...remainingActivities] = activities;

        // Execute the action function for the first activity only if it is the first time the "Next Week" button is pressed
        if (remainingActivities.length === activities.length - 1) {
          const { action, selectedWrestler } = firstActivity;
          if ( action.options===false) {
            console.log('HERE')
            makeDecision(action,[[selectedWrestler]]);
          }

          handleSendButton(action, selectedWrestler);
        } else {
          const { action, selectedWrestler } = firstActivity;
          console.log('HERE TWO')
          if (action.options===false) {
            makeDecision(action,[selectedWrestler]);
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
        if (activeFeud.hasOwnProperty("length")) {
          dispatch(setDecisionButtonClicked(false));
          dispatch(setActiveTab("1"));
        }

        await replaceUser(user);
      } else {
        if (optionsPresent === false) {
          console.log("its false");
          dispatch(setResponseRecieved({ responseRecieved: true }));

        } else {
          dispatch(setResponseRecieved({ responseRecieved: false }));
        }
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
          if ( action.options===false) {
            console.log('HERE 3');
            makeDecision(action,[[selectedWrestler]]);
          }
          dispatch(setResponseRecieved({ responseRecieved: false }));

          handleSendButton(action, selectedWrestler);
        } else {
          const { action, selectedWrestler } = firstActivity;
          console.log('HERE 4');

          if ( action.options===false) {
            makeDecision(action,[selectedWrestler]);
          }
          dispatch(setResponseRecieved({ responseRecieved: false }));

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
        if (activeFeud.hasOwnProperty("length")) {
          dispatch(setDecisionButtonClicked(false));
          dispatch(setActiveTab("1"));
        }

        dispatch(setShowNextWeekButton({ showNextWeekButton: true }));
      }
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
      <div>
        <h1>ComponentA</h1>
        <UserResponseButton
          initialButtonText="Click Me"
          onResponse={"handleSendText"}
        />
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
      </div>

      <div>
        <h2>Wrestler Selection:</h2>
        {/* Filter buttons for Company */}
        <label>Filter by Company:</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value={"all"}>All Companies</option>
          {uniqueCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        {/* Filter buttons for Charisma */}
        <label>Filter by Charisma:</label>
        <select
          value={selectedCharisma}
          onChange={(e) => setSelectedCharisma(e.target.value)}
        >
          <option value="all">All Charisma</option>
          {uniqueCharisma.map((charisma) => (
            <option key={charisma} value={charisma}>
              {charisma}
            </option>
          ))}
        </select>

        {/* Filter buttons for Alignment */}
        <label>Filter by Alignment:</label>
        <select
          value={selectedAlignment}
          onChange={(e) => setSelectedAlignment(e.target.value)}
        >
          <option value="all">All Alignments</option>
          {uniqueAlignments.map((alignment) => (
            <option key={alignment} value={alignment}>
              {alignment}
            </option>
          ))}
        </select>

        {wrestlerButtons}
      </div>

      <br />
      {renderActionButtons()}
      {selectedWrestler && selectedAction && !isConfirmed && (
        <button
          onClick={() => addToActivities(selectedAction, selectedWrestler)}
        >
          Confirm
        </button>
      )}
      <h2>Activities:</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.action.actionText.replace(
              /target/gi,
              activity.selectedWrestler.name
            )}
            <button onClick={() => deleteActivity(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={errorMessage ? "error" : "success"}
          >
            {errorMessage || successMessage}
          </MuiAlert>
        </Snackbar>
        {/* Your content here */}
      </div>

      {renderNextButton()}
      {showNextWeekButton && (
        <button onClick={triggerActionFunctions}>Next Week</button>
      )}

      <OverallTab />
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <Box m="2rem 0" />
        </Box>
      )}
    </Box>
  );
};

export default UserActions;
