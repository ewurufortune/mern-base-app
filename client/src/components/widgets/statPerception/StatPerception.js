import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Input, Button, Select } from "antd";
import { setStats } from "state";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export default function StatPerception() {
  const dispatch = useDispatch();

  const statsReadOnly = useSelector((state) => state.user.stats);
  const statPerceptionReadOnly = useSelector((state) => state.user.statPerception);

  const statPerception = _.cloneDeep(statPerceptionReadOnly);
  const stats = _.cloneDeep(statsReadOnly);

  function initializeMissingStatPerception(stats, statPerception) {
    // Create a set of existing stat names in statPerception
    const existingStatNames = new Set(statPerception.map((perception) => perception.statName));

    // Iterate through the stats array and add missing stat perception entries
    for (const stat of stats) {
      if (!existingStatNames.has(stat.statName)) {
        // Initialize the missing stat perception entry
        const missingStatPerception = {
          statName: stat.statName,
          top1: "Elite",
          top5Percentile: "Exceptional",
          top10Percentile: "Outstanding",
          top20Percentile: "Above Average",
          top40Percentile: "Average",
          top80Percentile: "Below Average",
          top100Percentile: "Poor",
        };

        // Add the missing stat perception entry to the statPerception array
        statPerception.push(missingStatPerception);

        // Add the stat name to the set of existing stat names
        existingStatNames.add(stat.statName);
      }
    }

    return statPerception;
  }

  useEffect(() => {
    // This code will run when the component is first loaded
    const updatedStatPerception = initializeMissingStatPerception(stats, statPerception);
    console.log(updatedStatPerception);
    dispatch(setStats({ statPerception: updatedStatPerception }));
  }, []); // The empty dependency array ensures this runs only once, like componentDidMount

  const handlRefreshPerceptions = () => {
    const updatedStatPerception = initializeMissingStatPerception(stats, statPerception);
    dispatch(setStats({ statPerception: updatedStatPerception }));
    console.log(updatedStatPerception);
  };

  return (
    <>
    {/* <Button onClick={handlRefreshPerceptions}>Update Stat Perceptions</Button> */}

    </>
  );
}
