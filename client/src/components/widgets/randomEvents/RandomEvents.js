import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Input, Button, Select } from "antd";
import { setStats } from "state";
import _ from "lodash";

export default function RandomEvents() {
  const relationships = useSelector((state) => state.user.relationships);
  const stats = useSelector((state) => state.user.stats);
  const participants = useSelector((state) => state.user.participants);
  const date = useSelector((state) => state.user.date);
  const [previousDate, setPreviousDate] = useState(date);
  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7; 
    const dispatch = useDispatch();
  
  // Function to simulate a random event
  const simulateRelationships = () => {
    const updatedParticipants = _.cloneDeep(participants);
    const updatedRelationships = _.cloneDeep(relationships);

    // Iterate through relationships
    updatedRelationships.forEach((relationship) => {
      // Calculate probability (2/10)
      if (Math.random() < 1.9) {
        const [participant1Id, participant2Id] = relationship.participants;
        const participant1 = updatedParticipants.find(
          (participant) => participant.id === participant1Id
        );
        const participant2 = updatedParticipants.find(
          (participant) => participant.id === participant2Id
        );

        if (participant1 && participant2) {
          relationship.affectedStats.forEach((statId) => {
            const selectedStat = stats.find((stat) => stat.id === statId);
            if (!selectedStat) {
              // Handle the case when the selected stat is not found
              return;
            }
            const statName = selectedStat.statName.toLowerCase();
        
            const participant1StatIndex = participant1.stats.findIndex(
              (stat) => stat[statName] !== undefined
            );
        
            const participant2StatIndex = participant2.stats.findIndex(
              (stat) => stat[statName] !== undefined
            );
        
            if (participant1StatIndex !== -1 && participant2StatIndex !== -1) {
              const transferAmount = Math.ceil(
                (participant1.stats[participant1StatIndex][statName] * 5) / 100
              );
        
              participant1.stats[participant1StatIndex][statName] -= transferAmount;
              participant2.stats[participant2StatIndex][statName] += transferAmount;
        
              console.log(participant1.name + " lost", participant1.stats[participant1StatIndex]);
              console.log(participant1.name + " new value:", participant1.stats[participant1StatIndex]);
              console.log(participant2.name + " got", participant1.stats[participant2StatIndex]);
              console.log(participant2.name + " new value:", participant2.stats[participant2StatIndex]);
            } else {
              if (participant1StatIndex === -1) {
                const transferAmount = Math.ceil(5 * 0.05); // Assuming it's 5% of the base value
                const newStat = { [statName]: transferAmount };
                participant1.stats.push(newStat);
              }
        
              if (participant2StatIndex === -1) {
                const transferAmount = Math.ceil(5 * 0.05); // Assuming it's 5% of the base value
                const newStat = { [statName]: transferAmount };
                participant2.stats.push(newStat);
              }
            }
          });
        }
        
      }
    });

    console.log(updatedParticipants);
    // Update participants and relationships in the state
    // You would dispatch an action to update the state here
    dispatch(setStats({ participants: updatedParticipants }));
    // dispatch(setStats({ relationships: updatedRelationships }));
  };



  useEffect(() => {
    // Calculate the time difference and the number of times to run the function
    const currentDate = new Date(date);
    const previousDateObj = new Date(previousDate);

    const timeDifferenceMilliseconds = currentDate - previousDateObj;
    const timeDifferenceWeeks = timeDifferenceMilliseconds / millisecondsPerWeek;

    console.log("Time difference:", timeDifferenceWeeks, "weeks");

    // Calculate the number of times to run the function based on the time difference
    const numberOfTimesToRun = Math.floor(timeDifferenceWeeks);

    // Update the previous date
    setPreviousDate(date);

    // Run the simulateRelationships function multiple times
    for (let i = 0; i < numberOfTimesToRun; i++) {
      simulateRelationships();
    }
  }, [date]);
  return <div>RandomEvents</div>;
}


// Check:stat range, date,inactivity, item posesion ,category.  consequences: increase/decrease Stat, active/inactive, item Change,category change