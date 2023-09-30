import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Input, Button, Select } from "antd";
import { setStats } from "state";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export default function RelationshipEvents() {
  const dispatch = useDispatch();

  const relationshipsReadOnly = useSelector(
    (state) => state.user.relationships
  );
  const statsReadOnly = useSelector((state) => state.user.stats);
  const participantsReadOnly = useSelector((state) => state.user.participants);
  const dateReadOnly = useSelector((state) => state.user.date);
  const itemsReadOnly = useSelector((state) => state.user.items);
  const categoriesReadOnly = useSelector((state) => state.user.categories);
  const recentEventsReadOnly = useSelector((state) => state.user.recentEvents);

  const relationships = _.cloneDeep(relationshipsReadOnly);
  const stats = _.cloneDeep(statsReadOnly);
  const participants = _.cloneDeep(participantsReadOnly);
  const date = _.cloneDeep(dateReadOnly);
  const items = _.cloneDeep(itemsReadOnly);
  const categories = _.cloneDeep(categoriesReadOnly);
  const recentEvents = _.cloneDeep(recentEventsReadOnly);

  // Define a function to handle relationship events
  const handleRelationshipEvent = (relationshipId, eventType, chosenRelationship) => {

    let randomEventStrength= chosenRelationship.relationshipStrength

    function modifyEventStrength(strength) {
      // Generate a random number between -1 and 1
      const randomChange = Math.floor(Math.random() * 3) - 1;
      
      // Add the random change to the current strength
      const newStrength = strength + randomChange;
      
      // Ensure the strength does not go below -5 or beyond 5
      return Math.min(5, Math.max(-5, newStrength));
    }
    
    // Example usage:
    const modifiedStrength = modifyEventStrength(randomEventStrength);
    let randomEventStrengthText= chosenRelationship.relationshipStrengthText

    const p1Id = chosenRelationship.participants[0];
    const p2Id = chosenRelationship.participants[1];
    
    // Find participant 1 in the participants array
    const participant1 = participants.find((participant) => participant.id === p1Id);
    
    // Find participant 2 in the participants array
    const participant2 = participants.find((participant) => participant.id === p2Id);
    
    // Check if both participants were found
    if (participant1 && participant2) {
      const p1Name = participant1.name;
      const p2Name = participant2.name;
      console.log(`Participant 1: ${p1Name}`);
      console.log(`Participant 2: ${p2Name}`);
    } else {
      console.log("One or both participants not found in participants array.");
    }
    

    // Find the relationship by ID
    const relationship = relationships.find((r) => r.id === relationshipId);
    const reclone=_.cloneDeep(relationship)
    const relationshipIndex = relationships.findIndex((r) => r.id === relationshipId);

    //change relationship strength text
if (relationship) {
  const strength = relationship.relationshipStrength;

  if (strength === -5) {
    reclone.relationshipStrengthText = "Toxic";
  } else if (strength === -4) {
    reclone.relationshipStrengthText = "Dysfunctional";
  } else if (strength === -3) {
    reclone.relationshipStrengthText = "Strained";
  } else if (strength === -2) {
    reclone.relationshipStrengthText = "Challenging";
  } else if (strength === -1) {
    reclone.relationshipStrengthText = "Tense";
  } else if (strength === 0) {
    reclone.relationshipStrengthText = "Neutral";
  } else if (strength === 1) {
    reclone.relationshipStrengthText = "Friendly";
  } else if (strength === 2) {
    reclone.relationshipStrengthText = "Close";
  } else if (strength === 3) {
    reclone.relationshipStrengthText = "Warm";
  } else if (strength === 4) {
    reclone.relationshipStrengthText = "Wholesome";
  } else if (strength === 5) {
    reclone.relationshipStrengthText = "Perfect";
  }
} else {
  console.log("Relationship not found.");
}
    reclone.relationshipStrength=modifiedStrength    
relationships[relationshipIndex]= reclone
console.log(modifiedStrength);
 dispatch(setStats({ relationships: relationships }));
    if (!relationship) {
      console.log("Relationship not found");
      return;
    }
    let title = "";
    let description = "";
    const rName = relationship.name;
    // Handle different relationship event types
    switch (eventType) {
      case "increaseOneStat":
        // Randomly select participant1 and participant2 from the relationship
        const participantsNum = relationship.participants.length;

        if (participantsNum >= 2) {
          const randomIndex1 = Math.floor(Math.random() * participantsNum);
          let randomIndex2;

          do {
            randomIndex2 = Math.floor(Math.random() * participantsNum);
          } while (randomIndex2 === randomIndex1);

          const participant1 = relationship.participants[randomIndex1];
          const participant2 = relationship.participants[randomIndex2];

          const participant1Name = participants.find(
            (participant) => participant.id === participant1
          )?.name;
          const participant2Name = participants.find(
            (participant) => participant.id === participant2
          )?.name;

          let selectedStatLabel;
          console.log(`Randomly selected participant 1 ID: ${participant1}`);
          console.log(`Randomly selected participant 2 ID: ${participant2}`);

          // Find participant2 in the participants array by id
          const foundParticipant2 = participants.find(
            (participant) => participant.id === participant2
          );

          if (foundParticipant2) {
            // Randomly select a stat from the stats array where change is greater than 1
            const eligibleStats = stats.filter((stat) => stat.change > 1);
            if (eligibleStats.length > 0) {
              const randomStatIndex = Math.floor(
                Math.random() * eligibleStats.length
              );
              const selectedStat = eligibleStats[randomStatIndex];
              selectedStatLabel = selectedStat.label;
              // Find the corresponding stat in participant2's stats array
              const participant2StatIndex = foundParticipant2.stats.findIndex(
                (statObj) => statObj.hasOwnProperty(selectedStat.statName)
              );

              if (participant2StatIndex !== -1) {
                // Increase the selected stat in participant2's stats array
                foundParticipant2.stats[participant2StatIndex][
                  selectedStat.statName
                ] += selectedStat.change;
                title = `${selectedStatLabel} for ${participant2Name}`;
                description = `the ${rName} between ${participant1Name} and ${participant2Name} has caused a ${selectedStatLabel} for ${participant1Name}`;
                console.log(
                  `Increased stat ${selectedStat.statName} for participant 2 (ID: ${participant2})`
                );
                console.log(foundParticipant2);
              } else {
                title = `${selectedStatLabel} for ${participant1Name}`;
                description = `the ${rName} relationship between ${participant1Name} and ${participant2Name} has caused a ${selectedStatLabel} for ${participant1Name}`;

                // Initialize the stat with the change value if not found
                foundParticipant2.stats.push({
                  [selectedStat.statName]: selectedStat.change,
                });
                console.log(
                  `Initialized stat ${selectedStat.statName} for participant 2 (ID: ${participant2}) with a value of ${selectedStat.change}`
                );
              }
            } else {
              console.log(
                "No eligible stats with change greater than 1 found."
              );
            }
          } else {
            console.log(
              `Participant 2 (ID: ${participant2}) not found in participants array.`
            );
          }
        } else {
          console.log(
            "Not enough participants in the relationship to perform this action."
          );
        }

        break;

      case "decreaseOneStat":
        // Randomly select participant1 and participant2 from the relationship
        const participantsNums = relationship.participants.length;

        if (participantsNums >= 2) {
          const randomIndex1 = Math.floor(Math.random() * participantsNums);
          let randomIndex2;

          do {
            randomIndex2 = Math.floor(Math.random() * participantsNums);
          } while (randomIndex2 === randomIndex1);

          const participant1 = relationship.participants[randomIndex1];
          const participant2 = relationship.participants[randomIndex2];

          const participant1Name = participants.find(
            (participant) => participant.id === participant1
          )?.name;
          const participant2Name = participants.find(
            (participant) => participant.id === participant2
          )?.name;
          console.log(`Randomly selected participant 1 ID: ${participant1}`);
          console.log(`Randomly selected participant 2 ID: ${participant2}`);

          // Find participant2 in the participants array by id
          const foundParticipant2 = participants.find(
            (participant) => participant.id === participant2
          );

          if (foundParticipant2) {
            // Randomly select a stat from the stats array where change is less than than 0
            const eligibleStats = stats.filter((stat) => stat.change < 0);
            if (eligibleStats.length > 0) {
              const randomStatIndex = Math.floor(
                Math.random() * eligibleStats.length
              );
              const selectedStat = eligibleStats[randomStatIndex];
              const selectedStatLabel = selectedStat.label;

              // Find the corresponding stat in participant2's stats array
              const participant2StatIndex = foundParticipant2.stats.findIndex(
                (statObj) => statObj.hasOwnProperty(selectedStat.statName)
              );

              if (participant2StatIndex !== -1) {
                // Increase the selected stat in participant2's stats array
                foundParticipant2.stats[participant2StatIndex][
                  selectedStat.statName
                ] += selectedStat.change;
                title = `${selectedStatLabel} for ${participant2Name}`;
                description = `the ${rName} between ${participant1Name} and ${participant2Name} has caused a ${selectedStatLabel} for ${participant1Name}`;

                console.log(
                  `Decreased stat ${selectedStat.statName} for participant 2 (ID: ${participant2})`
                );
              } else {
                // Initialize the stat with the change value if not found
                foundParticipant2.stats.push({
                  [selectedStat.statName]: selectedStat.change,
                });
                title = `${selectedStatLabel} for ${participant2Name}`;
                description = `the ${rName} relationship between ${participant1Name} and ${participant2Name} has caused a ${selectedStatLabel} for ${participant1Name}`;

                console.log(
                  `Initialized stat ${selectedStat.statName} for participant 2 (ID: ${participant2}) with a value of ${selectedStat.change}`
                );
              }
            } else {
              console.log(
                "No eligible stats with change greater than 1 found."
              );
            }
          } else {
            console.log(
              `Participant 2 (ID: ${participant2}) not found in participants array.`
            );
          }
        } else {
          console.log(
            "Not enough participants in the relationship to perform this action."
          );
        }
        break;

      case "increaseAll":
        // Check if there are participants in the relationship
        const participantsArrayCount = relationship.participants.length;

        if (participantsArrayCount > 0) {
          // Randomly select a stat from the stats array where change is greater than 1
          const eligibleStats = stats.filter((stat) => stat.change > 0);

          if (eligibleStats.length > 0) {
            const randomStatIndex = Math.floor(
              Math.random() * eligibleStats.length
            );
            const selectedStat = eligibleStats[randomStatIndex];
            const selectedStatLabel = selectedStat.label;

            // Iterate through all participants in the relationship
            relationship.participants.forEach((participantId) => {
              // Find the participant in the participants array by id
              const foundParticipant = participants.find(
                (participant) => participant.id === participantId
              );
              title = selectedStatLabel + " for ";
              if (foundParticipant) {
                // Find the corresponding stat in the participant's stats array
                const participantStatIndex = foundParticipant.stats.findIndex(
                  (statObj) => statObj.hasOwnProperty(selectedStat.statName)
                );

                if (participantStatIndex !== -1) {
                  // Increase the selected stat in the participant's stats array
                  foundParticipant.stats[participantStatIndex][
                    selectedStat.statName
                  ] += selectedStat.change;
                  title += foundParticipant.name + " and others.";
                  description +=
                    foundParticipant.name +
                    " experienced a " +
                    selectedStatLabel +
                    ". ";

                  console.log(
                    `Increased stat ${selectedStat.statName} for participant (ID: ${participantId})`
                  );
                } else {
                  // Initialize the stat with the change value if not found
                  foundParticipant.stats.push({
                    [selectedStat.statName]: selectedStat.change,
                  });
                  title += foundParticipant.name + ", and others";
                  description +=
                    foundParticipant.name +
                    " experienced a " +
                    selectedStatLabel +
                    ". ";

                  console.log(
                    `Initialized stat ${selectedStat.statName} for participant (ID: ${participantId}) with a value of ${selectedStat.change}`
                  );
                }
              } else {
                console.log(
                  `Participant (ID: ${participantId}) not found in participants array.`
                );
              }
            });
          } else {
            console.log("No eligible stats with change greater than 1 found.");
          }
        } else {
          console.log("No participants in the relationship.");
        }
        break;

      case "decreaseAll":
        // Check if there are participants in the relationship
        const relationshipsParticipantsCount = relationship.participants.length;

        if (relationshipsParticipantsCount > 0) {
          // Randomly select a stat from the stats array where change is less than 1
          const eligibleStats = stats.filter((stat) => stat.change < 0);

          if (eligibleStats.length > 0) {
            const randomStatIndex = Math.floor(
              Math.random() * eligibleStats.length
            );
            const selectedStat = eligibleStats[randomStatIndex];
            const selectedStatLabel = selectedStat.label;
            title = selectedStatLabel + " for";

            // Iterate through all participants in the relationship
            relationship.participants.forEach((participantId) => {
              // Find the participant in the participants array by id
              const foundParticipant = participants.find(
                (participant) => participant.id === participantId
              );

              if (foundParticipant) {
                // Find the corresponding stat in the participant's stats array
                const participantStatIndex = foundParticipant.stats.findIndex(
                  (statObj) => statObj.hasOwnProperty(selectedStat.statName)
                );

                if (participantStatIndex !== -1) {
                  // Decrease the selected stat in the participant's stats array
                  foundParticipant.stats[participantStatIndex][
                    selectedStat.statName
                  ] += selectedStat.change;
                  title += foundParticipant.name + ",";
                  description +=
                    foundParticipant.name +
                    " experienced a " +
                    selectedStatLabel +
                    ".";

                  console.log(
                    `Increased stat ${selectedStat.statName} for participant (ID: ${participantId})`
                  );
                } else {
                  // Initialize the stat with the change value if not found
                  foundParticipant.stats.push({
                    [selectedStat.statName]: selectedStat.change,
                  });
                  title += foundParticipant.name + ",";

                  description +=
                    foundParticipant.name +
                    " experienced a " +
                    selectedStatLabel +
                    ".";
                  console.log(
                    `Initialized stat ${selectedStat.statName} for participant (ID: ${participantId}) with a value of ${selectedStat.change}`
                  );
                }
              } else {
                console.log(
                  `Participant (ID: ${participantId}) not found in participants array.`
                );
              }
            });
          } else {
            console.log("No eligible stats with change greater than 1 found.");
          }
        } else {
          console.log("No participants in the relationship.");
        }
        break;

        case "changeActivity":
          // Randomly select two participants from the list, ensuring they are not the same
          const participantsLength = relationship.participants.length;
        
          if (participantsLength >= 2) {
            const randomIndex1 = Math.floor(Math.random() * participantsLength);
            let randomIndex2;
        
            do {
              randomIndex2 = Math.floor(Math.random() * participantsLength);
            } while (randomIndex2 === randomIndex1);
        
            const participant1 = relationship.participants[randomIndex1];
            const participant2 = relationship.participants[randomIndex2];
        
            const participant1Name = participants.find(
              (participant) => participant.id === participant1
            )?.name;
            const participant2Name = participants.find(
              (participant) => participant.id === participant2
            )?.name;
        
            console.log(`Randomly selected participant 1 ID: ${participant1}`);
            console.log(`Randomly selected participant 2 ID: ${participant2}`);
        
            // Find participant2 in the participants array and toggle their isActive status
            const foundParticipant2 = participants.find(
              (participant) => participant.id === participant2
            );
        
            if (foundParticipant2) {
              // Toggle the isActive status of participant2
              foundParticipant2.isActive = !foundParticipant2.isActive;
        
              // Set the title and description
              title = `Activity Change for ${participant2Name}`;
              description = `Due to the ${relationship.name} relationship between  ${participant2Name} and  ${participant1Name},  ${participant2Name} has been rendered ${
                foundParticipant2.isActive ? "active" : "inactive"
              }.`;
        
              // Iterate through the other participants in the relationship
              const otherParticipants = relationship.participants.filter(
                (participantId) => participantId !== participant2
              );
        
              if (otherParticipants.length > 0) {
              
                description += " and the following participants had something to say: ";
                description += otherParticipants
                  .map((participantId) => {
                    const otherParticipant = participants.find(
                      (participant) => participant.id === participantId
                    );
                    return otherParticipant ? otherParticipant.name : "";
                  })
                  .filter((name) => name !== "")
                  .join(", ");
              }
        
              console.log(
                `Toggled activity status for participant 2 (ID: ${participant2})`
              );
            } else {
              console.log(
                `Participant 2 (ID: ${participant2}) not found in participants array.`
              );
            }
          } else {
            console.log(
              "Not enough participants in the relationship to perform this action."
            );
          }
          break;
        
          case "increaseParticipant1DecreaseRest":
            // Check if there are participants in the relationship
            const participantsCountLength = relationship.participants.length;
          
            if (participantsCountLength > 0) {
              // Randomly select a stat from the stats array where change is greater than 1
              const eligibleStats = stats.filter((stat) => stat.change > 1);
              const eligibleStatsForDecrease = stats.filter((stat) => stat.change < 1);

              if (eligibleStats.length > 0 && eligibleStatsForDecrease.length < 0) {
                const randomStatIndex = Math.floor(
                  Math.random() * eligibleStats.length
                );
                const selectedStat = eligibleStats[randomStatIndex];
                const selectedStatLabel = selectedStat.label;

          
                  const randomStatIndexForDecrease = Math.floor(
                    Math.random() * eligibleStatsForDecrease.length
                  );
                  const selectedStatForDecrease = eligibleStatsForDecrease[randomStatIndexForDecrease];
                  const selectedStatLabelForDecrease = selectedStatForDecrease.label;
          
                // Find participant 1 in the participants array
                const participant1 = participants.find(
                  (participant) => participant.id === 1
                );
          
                if (participant1) {
                  // Increase the selected stat in participant 1's stats array
                  const participant1StatIndex = participant1.stats.findIndex(
                    (statObj) => statObj.hasOwnProperty(selectedStat.statName)
                  );
          
                  if (participant1StatIndex !== -1) {
                    // Increase the selected stat in participant 1's stats array
                    participant1.stats[participant1StatIndex][
                      selectedStat.statName
                    ] += selectedStat.change;
                    console.log(
                      `Increased stat ${selectedStat.statName} for participant 1 (ID: 1)`
                    );
          
                    // Set the title and description for participant 1
                    title = ` ${participant1.name} ${selectedStatLabel}`;
                    description = `Due to the ${relationship.name} relationship, ${participant1.name} experienced an increase in ${selectedStatLabel}.`;
                  } else {
                    // Initialize the stat with the change value if not found
                    participant1.stats.push({
                      [selectedStat.statName]: selectedStat.change,
                    });
                    console.log(
                      `Initialized stat ${selectedStat.statName} for participant 1 (ID: 1) with a value of ${selectedStat.change}`
                    );
          
                    // Set the title and description for participant 1
                    title = `Stat Initialization for ${participant1.name}`;
                    description = `Due to the ${relationship.name} relationship, ${participant1.name} gained a ${selectedStatLabel}.`;
                  }
          
                  // Iterate through all other participants in the relationship and decrease their stats
                  relationship.participants.forEach((participantId) => {
                    if (participantId !== 1) {
                      // Find the participant in the participants array by id
                      const foundParticipant = participants.find(
                        (participant) => participant.id === participantId
                      );
          
                      if (foundParticipant) {
                        // Find the corresponding stat in the participant's stats array
                        const participantStatIndex =
                          foundParticipant.stats.findIndex((statObj) =>
                            statObj.hasOwnProperty(selectedStat.statName)
                          );
          
                        if (participantStatIndex !== -1) {
                          // Decrease the selected stat in the participant's stats array
                          foundParticipant.stats[participantStatIndex][
                            selectedStatForDecrease.statName
                          ] -= selectedStatForDecrease.change;
                          console.log(
                            `Decreased stat ${selectedStatForDecrease.statName} for participant (ID: ${participantId})`
                          );
          
                          // Set the title and description for other participants
                          const otherParticipantName = foundParticipant.name;
                          title += ` Stat Decrease for ${otherParticipantName}. `;
                          description += `Due to the ${relationship.name} relationship, ${otherParticipantName} experienced a decrease in ${selectedStatLabelForDecrease}. `;
                        } else {
                          console.log(
                            `Stat ${selectedStatForDecrease.statName} not found for participant (ID: ${participantId})`
                          );
                        }
                      } else {
                        console.log(
                          `Participant (ID: ${participantId}) not found in participants array.`
                        );
                      }
                    }
                  });
                } else {
                  console.log("Participant 1 not found in participants array.");
                }
              } else {
                console.log("No eligible stats with change greater than 1 found.");
              }
            } else {
              console.log("No participants in the relationship.");
            }
            break;
          
            case "decreaseParticipant1IncreaseRest":
              // Check if there are participants in the relationship
              const participantsLen = relationship.participants.length;
            
              if (participantsLen > 0) {
                 // Randomly select a stat from the stats array where change is greater than 1
                 const eligibleStats = stats.filter((stat) => stat.change < 1);
                 const eligibleStatsForIncrease = stats.filter((stat) => stat.change > 1);
   
                 if (eligibleStats.length > 0 && eligibleStatsForIncrease.length < 0) {
                   const randomStatIndex = Math.floor(
                     Math.random() * eligibleStats.length
                   );
                   const selectedStat = eligibleStats[randomStatIndex];
                   const selectedStatLabel = selectedStat.label;
   
             
                     const randomStatIndexForIncrease = Math.floor(
                       Math.random() * eligibleStatsForIncrease.length
                     );
                     const selectedStatForIncrease = eligibleStatsForIncrease[randomStatIndexForIncrease];
                     const selectedStatLabelForIncrease = selectedStatForIncrease.label;
                  // Find participant 1 in the participants array
                  const participant1 = participants.find(
                    (participant) => participant.id === 1
                  );
            
                  if (participant1) {
                    // Decrease the selected stat in participant 1's stats array
                    const participant1StatIndex = participant1.stats.findIndex(
                      (statObj) => statObj.hasOwnProperty(selectedStat.statName)
                    );
            
                    if (participant1StatIndex !== -1) {
                      // Decrease the selected stat in participant 1's stats array
                      participant1.stats[participant1StatIndex][
                        selectedStat.statName
                      ] -= selectedStat.change;
                      console.log(
                        `Decreased stat ${selectedStat.statName} for participant 1 (ID: 1)`
                      );
            
                      // Set the title and description for participant 1
                      title = `${selectedStatLabel} Decrease for ${participant1.name}`;
                      description = `Due to the ${relationship.name} relationship, ${participant1.name} experienced a decrease in ${selectedStatLabel}.`;
                    } else {
                      console.log(
                        `Stat ${selectedStat.statName} not found for participant 1 (ID: 1)`
                      );
                    }
            
                    // Iterate through all other participants in the relationship and increase their stats
                    relationship.participants.forEach((participantId) => {
                      if (participantId !== 1) {
                        // Find the participant in the participants array by id
                        const foundParticipant = participants.find(
                          (participant) => participant.id === participantId
                        );
            
                        if (foundParticipant) {
                          // Find the corresponding stat in the participant's stats array
                          const participantStatIndex =
                            foundParticipant.stats.findIndex((statObj) =>
                              statObj.hasOwnProperty(selectedStat.statName)
                            );
            
                          if (participantStatIndex !== -1) {
                            // Increase the selected stat in the participant's stats array
                            foundParticipant.stats[participantStatIndex][
                              selectedStatForIncrease.statName
                            ] += selectedStatForIncrease.change;
                            console.log(
                              `Increased stat ${selectedStatForIncrease.statName} for participant (ID: ${participantId})`
        
                              );
            
                            // Set the title and description for other participants
                            const otherParticipantName = foundParticipant.name;
                            title += ` ${selectedStatLabelForIncrease} Increase for ${otherParticipantName}`;
                            description += `Due to the ${relationship.name} relationship, ${otherParticipantName} experienced an increase in ${selectedStatLabel}. `;
                          } else {
                            // Initialize the stat with the change value if not found
                            foundParticipant.stats.push({
                              [selectedStatForIncrease.statName]: selectedStatForIncrease.change,
                            });
                            console.log(
                              `Initialized stat ${selectedStatForIncrease.statName} for participant (ID: ${participantId}) with a value of ${selectedStatForIncrease.change}`
                            );
                          }
                        } else {
                          console.log(
                            `Participant (ID: ${participantId}) not found in participants array.`
                          );
                        }
                      }
                    });
                  } else {
                    console.log("Participant 1 not found in participants array.");
                  }
                } else {
                  console.log("No eligible stats with change greater than 1 found.");
                }
              } else {
                console.log("No participants in the relationship.");
              }
              break;
            
              case "joinCategory":
                // Randomly select two participants from the list, ensuring they are not the same
                const participantsCounts = relationship.participants.length;
              
                if (participantsCounts >= 2) {
                  const randomIndex1 = Math.floor(Math.random() * participantsCounts);
                  let randomIndex2;
              
                  do {
                    randomIndex2 = Math.floor(Math.random() * participantsCounts);
                  } while (randomIndex2 === randomIndex1);
              
                  const participant1 = relationship.participants[randomIndex1];
                  const participant2 = relationship.participants[randomIndex2];
              
                  const participant1Name = participants.find(
                    (participant) => participant.id === participant1
                  )?.name;
                  const participant2Name = participants.find(
                    (participant) => participant.id === participant2
                  )?.name;
              
                  console.log(`Randomly selected participant 1 ID: ${participant1}`);
                  console.log(`Randomly selected participant 2 ID: ${participant2}`);
              
                  const filteredCategories = categories.filter((cat) => {
                    const lowercaseType = cat.type.toLowerCase();
                    return !lowercaseType.includes('gender') && !lowercaseType.includes('sex');
                  });
                  
                  // Now, you can find a category that includes participant1 but not participant2
                  const category = filteredCategories.find(
                    (cat) =>
                      cat.participants.includes(participant1) &&
                      !cat.participants.includes(participant2)
                  );
                  
              
                  if (category) {
                    console.log(
                      `Found a category (ID: ${category.id}) with participant 1 but not participant 2.`
                    );
              
                    // Get the type of the new category
                    const categoryType = category.type;
              
                    // Add participant2 to the category
                    category.participants.push(participant2);
                    console.log(
                      `Added participant 2 (ID: ${participant2}) to the category.`
                    );
              
                    // Remove participant2 from other categories with the same type
                    categories.forEach((otherCategory) => {
                      if (
                        otherCategory.type === categoryType &&
                        otherCategory.id !== category.id
                      ) {
                        otherCategory.participants = otherCategory.participants.filter(
                          (participantId) => participantId !== participant2
                        );
                        console.log(
                          `Removed participant 2 (ID: ${participant2}) from category (ID: ${otherCategory.id}).`
                        );
                      }
                    });
              
                    // Set the title and description for the action
                    title = `${categoryType} Welcomes New Participant.`;
                    description = `${participant2Name} has entered this ${categoryType},\n ${participant1Name} is rumored to have a strong influence in making it happen.`;
                  } else {
                    console.log(
                      "No category found with participant 1 but not participant 2."
                    );
                  }
                } else {
                  console.log(
                    "Not enough participants in the relationship to perform this action."
                  );
                }
                break;
              
                case "leaveCategory":
                  // Randomly select two participants from the list, ensuring they are not the same
                  const participantsCounter = relationship.participants.length;
                
                  if (participantsCounter >= 2) {
                    const randomIndex1 = Math.floor(Math.random() * participantsCounter);
                    let randomIndex2;
                
                    do {
                      randomIndex2 = Math.floor(Math.random() * participantsCounter);
                    } while (randomIndex2 === randomIndex1);
                
                    const participant1 = relationship.participants[randomIndex1];
                    const participant2 = relationship.participants[randomIndex2];
                    const participant1Name = participants.find(
                      (participant) => participant.id === participant1
                    )?.name;
                    const participant2Name = participants.find(
                      (participant) => participant.id === participant2
                    )?.name;
                
                    console.log(`Randomly selected participant 1 ID: ${participant1}`);
                    console.log(`Randomly selected participant 2 ID: ${participant2}`);
                
                    // Find a category that includes both participant1 and participant2
                    const category = categories.find(
                      (cat) =>
                        cat.participants.includes(participant1) &&
                        cat.participants.includes(participant2)
                    );
                
                    if (category) {
                      console.log(
                        `Found a category (ID: ${category.id}) with both participants.`
                      );
                
                      // Randomly select one of the participants to remove
                      const participantsInCategory = category.participants;
                      const randomParticipantId = participantsInCategory.splice(
                        Math.floor(Math.random() * participantsInCategory.length),
                        1
                      )[0];
                
                      // Update the category's participants
                      category.participants = participantsInCategory;
                
                      console.log(
                        `Removed participant ID ${randomParticipantId} from the category.`
                      );
                
                      // Set the title and description for the action
                      title = `Category Left: ${category.type}`;
                      description = `${participant1Name} and ${participant2Name} have both left ${category.name}.`;
                    } else {
                      console.log("No category found with both participants.");
                    }
                  } else {
                    console.log(
                      "Not enough participants in the relationship to perform this action."
                    );
                  }
                  break;
                
                  case "transferItemOwnership":
                    // Randomly select a participant from the list
                    const participantsCount = relationship.participants.length;
                    if (participantsCount > 0) {
                      const randomIndex1 = Math.floor(Math.random() * participantsCount);
                      const participant1 = relationship.participants[randomIndex1];
                      const participant1Name = participants.find(
                        (participant) => participant.id === participant1
                      )?.name;
                      console.log(`Randomly selected participant ID: ${participant1}`);
                  
                      // Find an item whose holderId includes participant1
                      const itemToTransfer = items.find((item) =>
                        item.holderId.includes(participant1)
                      );
                  
                      if (itemToTransfer) {
                        console.log(
                          `Found an item (ID: ${itemToTransfer.id}) held by participant ${participant1}`
                        );
                  
                        // Randomly select another participant who is not the same as participant1
                        let randomIndex2;
                        do {
                          randomIndex2 = Math.floor(Math.random() * participantsCount);
                        } while (randomIndex2 === randomIndex1);
                  
                        const participant2 = relationship.participants[randomIndex2];
                        const participant2Name = participants.find(
                          (participant) => participant.id === participant2
                        )?.name;
                        console.log(
                          `Randomly selected another participant ID: ${participant2}`
                        );
                  
                        // Eject participant1 and add participant2 to the item's holderId
                        itemToTransfer.holderId = itemToTransfer.holderId.filter(
                          (id) => id !== participant1
                        );
                        itemToTransfer.holderId.push(participant2);
                  
                        // Update the item's holderStartDate and holderEndDate if needed
                        itemToTransfer.holderStartDate = new Date();
                        itemToTransfer.holderEndDate = "Present";
                  
                        // If there were past holders, add participant1 as a past holder
                        if (!itemToTransfer.pastHolders) {
                          itemToTransfer.pastHolders = [];
                        }
                  
                        const currentDate = new Date();
                        const pastHolder = {
                          holderId: participant1,
                          startDate: itemToTransfer.holderStartDate.toISOString(),
                          endDate: currentDate.toISOString(),
                        };
                  
                        itemToTransfer.pastHolders.push(pastHolder);
                  
                        // Set the title and description for the action
                        title = ` ${itemToTransfer.name}, To New Owner`;
                        description = `The ${itemToTransfer.name} has been ${randomEventStrengthText}ly transferred from ${participant1Name} to ${participant2Name}.`;
                  
                        // Log the item transfer
                        console.log(
                          `Item ${itemToTransfer.id} transferred from participant ${participant1} to participant ${participant2}`
                        );
                      } else {
                        console.log(`No item found held by participant ${participant1}`);
                      }
                    } else {
                      console.log("No participants in the relationship.");
                    }
                    break;
                  
      case "createRelationship":
        // Create a new relationship (if needed)
        // This event might depend on certain conditions or criteria

        break;
        case "createNewParticipant":
          // Generate a new UUID for the participant
          const newParticipantId = uuidv4();
          const participantsCounting = relationship.participants.length;
        
          const participant1Id = relationship.participants[Math.floor(Math.random() * participantsCounting)];
          console.log(participant1Id);
        
          // Find the participant in the participants array by ID
          const participant1 = participants.find((participant) => participant.id === participant1Id);
        
          if (!participant1) {
            console.log(`Participant 1 not found.`);
            break;
          }
        
          // Define an array of first names
          const firstNames = [
            "John", "Mary", "Michael", "Jennifer", "William", "Susan", "David", "Linda", "James", "Karen",
            "Robert", "Patricia", "Joseph", "Elizabeth", "Charles", "Nancy", "Thomas", "Deborah", "Daniel", "Lisa",
            "Richard", "Sandra", "Kenneth", "Helen", "Steven", "Donna", "Edward", "Carol", "Brian", "Ruth",
            "Mark", "Sharon", "Ronald", "Michelle", "Anthony", "Laura", "Kevin", "Sarah", "Jason", "Kimberly",
            "Matthew", "Angela", "Gary", "Cynthia", "Timothy", "Amy", "Jose", "Donna", "Larry", "Kathleen",
            "Jeffrey", "Pamela", "Frank", "Shirley", "Scott", "Betty", "Eric", "Dorothy", "Stephen", "Frances",
            "Andrew", "Joan", "Raymond", "Evelyn", "Gregory", "Martha", "Joshua", "Virginia", "Jerry", "Catherine",
            "Dennis", "Ann", "Walter", "Gloria", "Patrick", "Teresa", "Peter", "Diane", "Henry", "Julie",
            "Douglas", "Joyce", "Carl", "Alice", "Arthur", "Jean", "Ryan", "Madison", "Ethan", "Olivia",
            "Brian", "Sophia", "Nathan", "Ava", "Justin", "Mia", "Brandon", "Emily", "Samuel", "Natalie",
            "Muhammad", "Sofia", "Ahmed", "Aisha", "Ali", "Fatima", "Amir", "Layla", "Hassan", "Yasmin",
            "Omar", "Leila", "Abdullah", "Zara", "Ibrahim", "Nour", "Mustafa", "Rania", "Youssef", "Lina",
            "Mohamed", "Malak", "Kareem", "Noor", "Karim", "Rima", "Samir", "Salma", "Tariq", "Leila",
            "Jawad", "Zeinab", "Rayan", "Sana", "Saif", "Hana", "Adam", "Dalal", "Bassem", "Maha",
            "Bilal", "Nada", "Aliyah", "Rami", "Mariam", "Ziad", "Layan", "Hamza", "Yasmeen", "Nasser",
            "Lila", "Raed", "Amina", "Yasser", "Yara", "Bilal", "Lana", "Karim", "Hiba", "Sami", "Amal",
            "Fadi", "Lamis", "Tarek", "Maya", "Khaled", "Dalal", "Faisal", "Nadia", "Haitham", "Saida",
            "Jamal", "Zeina", "Sami", "Rasha", "Yousef", "Dina", "Walid", "Amina", "Zaid", "Yasmine",
            "Nabil", "Manal", "Kareem", "Abeer", "Fawzi", "Rana", "Ayman", "Amira", "Tamer", "Nadine",
            "Hisham", "Rula", "Talal", "Sawsan", "Maher", "Noura", "Fahad", "Laila", "Adel"
          ];
                  
          // Randomly select a first name from the array
          const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        
          // Split the name string into first name and surname
          const nameComponents = participant1.name.split(' ');
        
          if (nameComponents.length === 1) {
            // Participant1 has only one name, generate a name with a random suffix
            const nameSuffixes = ["lia", "son", "ly", "ton"]; // Add more suffixes as needed
            const randomSuffix = nameSuffixes[Math.floor(Math.random() * nameSuffixes.length)];
            const newName = `${participant1.name}${randomSuffix}`;
            
            // Define default values for the participant
            const defaultParticipant = {
              name: newName,
              isActive: true, // Default isActive status
              bio: "No bio available", // Default bio
              stats: [
                {
                  relevance: 0, // Default relevance
                },
              ],
            };
        
            // Create a new participant by merging the defaults with custom values
            const newParticipant = {
              id: newParticipantId,
              ...defaultParticipant,
              // You can set custom values here if needed
            };
        
            participants.push(newParticipant);
        
            // Set the title and description for the action
            title = `${newParticipant.name} To Debuts`;
            description = `${newParticipant.name} a prodigy of ${participant1.name}, is debuting soon.  `;
          } else if (nameComponents.length >= 2) {
            // Participant1 has at least two names, extract the surname
            const surname = nameComponents.slice(1).join(' '); // Join the remaining components as the surname
        
            // Define default values for the participant
            const defaultParticipant = {
              name: `${randomFirstName} ${surname}`, // Use the extracted surname
              isActive: true, // Default isActive status
              bio: "No bio available", // Default bio
              stats: [
                {
                  relevance: 0, // Default relevance
                },
              ],
            };
        
            // Create a new participant by merging the defaults with custom values
            const newParticipant = {
              id: newParticipantId,
              ...defaultParticipant,
              // You can set custom values here if needed
            };
        
            participants.push(newParticipant);
        
            // Set the title and description for the action
            title = `New Participant Created: ${newParticipant.name}`;
            description = `A new participant named ${newParticipant.name} has been created.`;
          } else {
            console.log(`Invalid name format for participant 1: ${participant1.name}`);
          }
        
          break;
                            
      case "endRelationship":
        // End the relationship and remove it from the relationships array
        const updatedRelationships = relationships.filter(
          (r) => r.id !== relationshipId
        );

        // Update the relationships in the Redux state or dispatch an action to do so
        dispatch(setStats({ relationships: updatedRelationships }));
        break;

      default:
        console.log("Unsupported event type");
    }
   const relationshipLog = {
  id: uuidv4(), // Generate a unique ID
  title,
  description,
};

// Check if title or description is empty
if (title.trim() !== '' || description.trim() !== '') {
  // Push the relationship log object to recentEvents
  recentEvents.push(relationshipLog);

  // Check if recentEvents has more than 30 logs, and remove older logs if needed
  if (recentEvents.length > 30) {
    // Remove older logs to maintain a maximum of 30 logs
    recentEvents.splice(0, recentEvents.length - 30);
  }
} else {
  console.log('Title or description is empty, relationship log not added.');
}


    // Update the relationships in the Redux state or dispatch an action to do so
    dispatch(
      setStats({
        recentEvents: recentEvents,
        items: items,
        relationships: relationships,
        participants: participants,
        stats: stats,
        categories: categories,
      })
    );
  };

  function getRandomEvent() {
    const relationshipCount = relationships.length;

    if (relationshipCount > 0) {
      const randomRelationshipIndex = Math.floor(
        Math.random() * relationshipCount
      );
      const randomRelationship = relationships[randomRelationshipIndex];
      const relationshipStrength = randomRelationship.relationshipStrength;



   const eventStrings = [];

// Define the logic for each specific value of relationshipStrength and push to eventStrings for random picking
if (relationshipStrength === -5) {
  eventStrings.push(
    "decreaseAll",
    "endRelationship",
    "createNewParticipant",
    "decreaseOneStat",
    "increaseParticipant1DecreaseRest",
    "transferItemOwnership",
    "changeActivity",
    "joinCategory",
    "leaveCategory"
  );
} else if (relationshipStrength === -4) {
  eventStrings.push(
    "decreaseAll",
    "decreaseOneStat",
    "increaseParticipant1DecreaseRest",
    "transferItemOwnership",
    "transferItemOwnership",
    "leaveCategory",
    "joinCategory"
  );
} else if (relationshipStrength === -3) {
  eventStrings.push(
    "decreaseAll",
    "decreaseOneStat",
    "increaseParticipant1DecreaseRest"
  );
} else if (relationshipStrength === -2) {
  eventStrings.push(
    "increaseAll",
    "decreaseOneStat",
    "increaseParticipant1DecreaseRest"
  );
} else if (relationshipStrength === -1) {
  eventStrings.push("increaseAll");
} else if (relationshipStrength === 0) {
  eventStrings.push("increaseAll");
} else if (relationshipStrength === 1) {
  eventStrings.push("increaseAll");
} else if (relationshipStrength === 2) {
  eventStrings.push(
    "increaseAll",
    "increaseOneStat",
    "decreaseParticipant1IncreaseRest"
  );
} else if (relationshipStrength === 3) {
  eventStrings.push(
    "increaseAll",
    "increaseOneStat",
    "decreaseParticipant1IncreaseRest"
  );
} else if (relationshipStrength === 4) {
  eventStrings.push(
    "increaseAll",
    "increaseOneStat",
    "decreaseParticipant1IncreaseRest",
    "transferItemOwnership",
    "transferItemOwnership",
    "joinCategory",
    "leaveCategory"
  );
} else if (relationshipStrength === 5) {
  eventStrings.push(
    "increaseAll",
    "increaseOneStat",
    "createNewParticipant",
    "decreaseParticipant1IncreaseRest",
    "transferItemOwnership",
    "changeActivity",
    "joinCategory",
    "leaveCategory"
  );
}

console.log(eventStrings);


      // Randomly select an event string from the available options
      const randomIndex = Math.floor(Math.random() * eventStrings.length);
      const randomEvent = eventStrings[randomIndex];

      // Return both the random event string and the relationship ID
      return { relationshipId: randomRelationship.id, event: randomEvent,chosenRelationship: randomRelationship };
    }

    return null; // Return null if there are no relationships
  }

  const [randomEventCount, setRandomEventCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);


  const handleRandomEventClick = () => {
    const randomEvent = getRandomEvent();
    if (randomEvent) {
      console.log(
        `Random Event: ${randomEvent.event}, Relationship ID: ${randomEvent.relationshipId}`
      );
      // Call handleRelationshipEvent with the selected random event and relationship ID
      handleRelationshipEvent(randomEvent.relationshipId, randomEvent.event,randomEvent.chosenRelationship);
    } else {
      console.log("No relationships available to generate an event.");
    }
  };
  const isInitialMount = useRef(true); // Create a ref to track the initial mount


  // Use useEffect to listen for changes in yourState
  useEffect(() => {
    // This effect will run whenever date changes
    if (!isInitialMount.current) {
      if (randomEventCount < 3) {
        handleRandomEventClick();
        setRandomEventCount(randomEventCount + 1);
      } else {
        // Component has now mounted
        setHasMounted(true);
      }
    } else {
      // Set the ref to false after the initial render
      isInitialMount.current = false;
    }
  }, [dateReadOnly, randomEventCount, hasMounted]);

  return (
    <div>
      {/* Render UI elements to trigger the getRandomEvent function */}
      {/* <button onClick={handleRandomEventClick}>Generate Random Event</button> */}
    </div>
  );
}
