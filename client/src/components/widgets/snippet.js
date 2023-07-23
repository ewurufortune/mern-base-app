import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import weeklyAntics from './arrays/weeklyAntics';
import matchPlan from './arrays/matchPlan';

import { setName, setFirstname, setSavegame, setTraits,setButton1Text, setUserResponse,setButton2Text,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setShowNextWeekButton,setResponseRecieved,setEventType,setIsFeudActive,setStory,setWeek, setTimeToOpenSpot,setCurrentMatchPlan,setCurrentWeeklyAntic,setOptionDescription,setSelectedOption,setShowActions,setShowChampionship,setShowEndDayButton,} from "state";


const Live = ({ activeFeud, eventType, week }) => {

const dispatch = useDispatch();

const selectedOption = useSelector((state) => state.selectedOption);
const optionDescription = useSelector((state) => state.optionDescription);
const showActions = useSelector((state) => state.showActions);
const showEndDayButton = useSelector((state) => state.showEndDayButton);
const currentWeeklyAntic = useSelector((state) => state.currentWeeklyAntic);
const currentMatchPlan = useSelector((state) => state.currentMatchPlan);
const showChampionship = useSelector((state) => state.showChampionship);
}



////
const getRandomStatChange = () => {
    const randomStat = ['popularity', 'inRingSkill', 'alignment', 'charisma'][
      Math.floor(Math.random() * 4)
    ];
    const randomChange = Math.random() > 0.5 ? 1 : -1;

    if (randomStat === 'alignment') {
      // Randomly change the player's alignment
      const newAlignment = Math.random() > 0.5 ? 'face' : 'heel';
      
       dispatch(setPlayerWrestler({ alignment: newAlignment }));
   
    } else if (randomStat === 'charisma') {
      // Randomly change the player's charisma
      const newCharisma = Math.random() > 0.5 ? 'comedic' : 'menacing';
      dispatch(setPlayerWrestler({ alignment: newCharisma }));
    
    } else {
      // Change the player's popularity or in-ring skill
      setPlayerWrestler((prevState) => ({
        ...prevState,
        [randomStat]: Math.min(10, Math.max(1, prevState[randomStat] + randomChange)),
      }));
    }
  };
