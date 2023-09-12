import React, { useState, useEffect } from "react";
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
  const handleRelationshipEvent = (relationshipId, eventType) => {
    // Find the relationship by ID
    const relationship = relationships.find((r) => r.id === relationshipId);

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
                  title += foundParticipant.name + ",";
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
                  title += foundParticipant.name + ",";
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
          // Randomly select a stat from the stats array where change is greater than 1
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

          if (eligibleStats.length > 0) {
            const randomStatIndex = Math.floor(
              Math.random() * eligibleStats.length
            );
            const selectedStat = eligibleStats[randomStatIndex];
            const selectedStatLabel = selectedStat.label;

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
              } else {
                // Initialize the stat with the change value if not found
                participant1.stats.push({
                  [selectedStat.statName]: selectedStat.change,
                });
                console.log(
                  `Initialized stat ${selectedStat.statName} for participant 1 (ID: 1) with a value of ${selectedStat.change}`
                );
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
                        selectedStat.statName
                      ] -= selectedStat.change;
                      console.log(
                        `Decreased stat ${selectedStat.statName} for participant (ID: ${participantId})`
                      );
                    } else {
                      console.log(
                        `Stat ${selectedStat.statName} not found for participant (ID: ${participantId})`
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
          const eligibleStats = stats.filter((stat) => stat.change > 1);

          if (eligibleStats.length > 0) {
            const randomStatIndex = Math.floor(
              Math.random() * eligibleStats.length
            );
            const selectedStat = eligibleStats[randomStatIndex];
            const selectedStatLabel = selectedStat.label;

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
                        selectedStat.statName
                      ] += selectedStat.change;
                      console.log(
                        `Increased stat ${selectedStat.statName} for participant (ID: ${participantId})`
                      );
                    } else {
                      // Initialize the stat with the change value if not found
                      foundParticipant.stats.push({
                        [selectedStat.statName]: selectedStat.change,
                      });
                      console.log(
                        `Initialized stat ${selectedStat.statName} for participant (ID: ${participantId}) with a value of ${selectedStat.change}`
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

          // Find a category that includes participant1 but not participant2
          const category = categories.find(
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
              startDate: itemToTransfer.holderStartDate,
              endDate: currentDate.toISOString(),
            };

            itemToTransfer.pastHolders.push(pastHolder);

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

        // Define default values for the participant
        const defaultParticipant = {
          name: "New Participant", // Default name
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

    // Push the relationship log object to recentEvents
    recentEvents.push(relationshipLog);

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

      // Define event strings based on relationshipStrength
      const eventStrings = [];

      if (relationshipStrength <= -3) {
        eventStrings.push("increaseAll", "increaseAll");
      } else if (relationshipStrength >= 3) {
        eventStrings.push("increaseAll", "increaseAll");
      } else {
        eventStrings.push("increaseAll", "increaseAll");
      }

      // Randomly select an event string from the available options
      const randomIndex = Math.floor(Math.random() * eventStrings.length);
      const randomEvent = eventStrings[randomIndex];

      // Return both the random event string and the relationship ID
      return { relationshipId: randomRelationship.id, event: randomEvent };
    }

    return null; // Return null if there are no relationships
  }

  const handleRandomEventClick = () => {
    const randomEvent = getRandomEvent();

    if (randomEvent) {
      console.log(
        `Random Event: ${randomEvent.event}, Relationship ID: ${randomEvent.relationshipId}`
      );
      // Call handleRelationshipEvent with the selected random event and relationship ID
      handleRelationshipEvent(randomEvent.relationshipId, randomEvent.event);
    } else {
      console.log("No relationships available to generate an event.");
    }
  };

  return (
    <div>
      {/* Render UI elements to trigger the getRandomEvent function */}
      <button onClick={handleRandomEventClick}>Generate Random Event</button>
    </div>
  );
}
