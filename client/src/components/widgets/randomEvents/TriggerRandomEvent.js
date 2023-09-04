import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { setStats } from "state";
import _ from "lodash";

export default function TriggerRandomEvent() {
  const dispatch = useDispatch();
  const randomEvents = useSelector((state) => state.user.randomEvents);
  const readOnlyParticipants = useSelector((state) => state.user.participants);
  const stats = useSelector((state) => state.user.stats);
  const readOnlyCategories = useSelector((state) => state.user.categories);
  const readOnlyItems = useSelector((state) => state.user.items);
  const date = useSelector((state) => state.user.date);

  const [executeEvent, setExecuteEvent] = useState(true);

  const participants = _.cloneDeep(readOnlyParticipants);
  const categories = _.cloneDeep(readOnlyCategories);
  const items = _.cloneDeep(readOnlyItems);

  const executeRandomEvents = () => {
    randomEvents.forEach((event) => {
      let filteredParticipants = participants;

      //CHECKS
      if (event.selectedEventComponents.includes("stat")) {
        // Apply stat-related checks
        const selectedStatId = event.selectedStat;
        const selectedStatRange = event.statRange;

        // Find the selected stat by ID
        const selectedStat = stats.find((stat) => stat.id === selectedStatId);

        if (!selectedStat) {
          console.log("Selected stat not found");
          return; // Exit if the selected stat is not found
        }

        // Filter participants based on the selected stat and range
        const statFilter = (participant) => {
          const participantStat = participant.stats.find(
            (stat) => stat[selectedStat.statName] !== undefined
          );

          if (!participantStat) {
            return false; // Participant doesn't have the selected stat
          }

          const statValue = participantStat[selectedStat.statName];
          return (
            statValue >= selectedStatRange[0] &&
            statValue <= selectedStatRange[1]
          );
        };

        filteredParticipants = participants.filter(statFilter);
        console.log(filteredParticipants);
      }

      if (event.selectedEventComponents.includes("activity")) {
        // Apply activity-related checks
        const activityStatus = event.activityStatus; // 'active' or 'inactive'

        // Filter participants based on activity status
        const activityFilter = (participant) => {
          return participant.isActive === (activityStatus === "active");
        };

        filteredParticipants = filteredParticipants.filter(activityFilter);
        console.log(filteredParticipants);
      }

      if (event.selectedEventComponents.includes("item")) {
        // Apply item-related checks
        const itemRequirement = event.itemRequirement; // Array of required item IDs

        // Filter participants based on item requirement
        const itemFilter = (participant) => {
          // Check if the participant's ID is included in the itemRequirement array
          return itemRequirement.includes(participant.id);
        };

        filteredParticipants = filteredParticipants.filter(itemFilter);
        console.log(filteredParticipants);
      }

      if (event.selectedEventComponents.includes("category")) {
        // Apply category-related checks
        const selectedCategoriesByType = event.selectedCategoriesByType;
      
        // Filter participants based on selected categories
        const categoryFilter = (participant) => {
          // Iterate through categories and check if any of them includes the participant's ID
          for (const category of categories) {
            if (category.participants.includes(participant.id)) {
              // Check if the participant's type matches any selected type
              if (selectedCategoriesByType[category.type]) {
                // Check if the category is included in the selected categories for their type
                return selectedCategoriesByType[category.type].includes(category.id);
              }
            }
          }
          return false;
        };
        filteredParticipants = filteredParticipants.filter(categoryFilter);
        console.log(filteredParticipants);

      }
      

      //EXECUTIONS
      // Inside your generateEvent function
      const executeEventConsequences = (event) => {
        if (event.selectedConsequenceComponents.includes("statChange")) {
          const selectedStatChangeId = event.selectedStatChange;
          const statChangeAmount = event.statChangeAmount;

          // Find the corresponding stat in the stats array
          const selectedStat = stats.find(
            (stat) => stat.id === selectedStatChangeId
          );

          if (selectedStat) {
            filteredParticipants.forEach((participant) => {
              const participantStat = participant.stats.find((statObj) =>
                statObj.hasOwnProperty(selectedStat.statName)
              );

              // If the stat exists, modify it; otherwise, initialize it
              if (participantStat) {
                participantStat[selectedStat.statName] += statChangeAmount;
              } else {
                participant.stats.push({
                  [selectedStat.statName]: statChangeAmount,
                });
              }
            });
          }
        }

        // Inside your generateEvent function

        if (event.selectedConsequenceComponents.includes("activityChange")) {
          const activityChangeConsequence = event.activityChangeConsequence;

          filteredParticipants.forEach((participant) => {
            participant.isActive = activityChangeConsequence === "active";
          });
        }

        // Inside your generateEvent function

        if (event.selectedConsequenceComponents.includes("categoryChange")) {
          const selectedCategoryChangeByType =
            event.selectedCategoryChangeByType;
          const selectedNewCategories = event.selectedNewCategories;

          filteredParticipants.forEach((participant) => {
            const participantId = participant.id;

            // Remove participant from old categories
            Object.entries(selectedCategoryChangeByType).forEach(
              ([categoryType, categoryIds]) => {
                categoryIds.forEach((categoryId) => {
                  const category = categories.find(
                    (cat) => cat.id === categoryId
                  );
                  if (
                    category &&
                    category.participants.includes(participantId)
                  ) {
                    category.participants = category.participants.filter(
                      (id) => id !== participantId
                    );
                  }
                });
              }
            );

            // Add participant to new categories
            Object.entries(selectedNewCategories).forEach(
              ([categoryType, categoryIds]) => {
                categoryIds.forEach((categoryId) => {
                  const category = categories.find(
                    (cat) => cat.id === categoryId
                  );
                  if (
                    category &&
                    !category.participants.includes(participantId)
                  ) {
                    category.participants.push(participantId);
                  }
                });
              }
            );
            console.log(categories);
          });
        }

        // Apply Item Changes
        // Inside your generateEvent function

        if (event.selectedConsequenceComponents.includes("itemChange")) {
          const selectedItemChangeId = event.selectedItemChange;

          // Find the selected item by id
          const selectedItem = items.find(
            (item) => item.id === selectedItemChangeId
          );

          if (!selectedItem) {
            console.log("Selected item not found");
            return; // Exit if the selected item is not found
          }

          const selectedItemPercentile = event.selectedItemPercentile;

          // Calculate percentiles based on the 'relevance' stat
          participants.sort(
            (a, b) => b.stats[0].relevance - a.stats[0].relevance
          );

          const totalParticipants = participants.length;
          const top5PercentileIndex = Math.floor(totalParticipants * 0.05);
          const top40PercentileIndex = Math.floor(totalParticipants * 0.4);
          const bottom50PercentileIndex = Math.floor(totalParticipants * 0.5);

          let selectedParticipantId;

          if (selectedItemPercentile === "top5") {
            const top5RandomIndex = Math.floor(
              Math.random() * Math.floor(top5PercentileIndex) + 1
            );
            selectedParticipantId = participants[top5RandomIndex].id;
          } else if (selectedItemPercentile === "top40") {
            const top40RandomIndex = Math.floor(
              Math.random() * Math.floor(top40PercentileIndex) + 1
            );
            selectedParticipantId = participants[top40RandomIndex].id;
          } else if (selectedItemPercentile === "bottom50") {
            const bottom50RandomIndex = Math.floor(
              Math.random() * Math.floor(bottom50PercentileIndex) + 1
            );
            selectedParticipantId = participants[bottom50RandomIndex].id;
          } else if (selectedItemPercentile === "random") {
            const eligibleParticipants = participants.filter(
              (participant) =>
                !items.find((item) => item.holderId.includes(participant.id))
            );
            const randomIndex = Math.floor(
              Math.random() * eligibleParticipants.length
            );
            selectedParticipantId = eligibleParticipants[randomIndex].id;
          }

          if (!selectedItem.holderId.includes(selectedParticipantId)) {
            // Check if the selected participant is not already the holder

            if (selectedItem.pastHolders) {
              const currentDate = new Date();
              const pastHolder = {
                holderId: selectedItem.holderId[0],
                startDate: new Date(selectedItem.holderStartDate),
                endDate: currentDate.toISOString(), // Set the end date to the current date
              };

              selectedItem.pastHolders.push(pastHolder);
            }

            // Update the item's holderId
            selectedItem.holderId = [selectedParticipantId];
            selectedItem.holderStartDate = date;
            selectedItem.holderEndDate = "Present";
            console.log("items:", items);
          } else {
            console.log("Selected participant is already the holder");
          }
        }
      };

      if (event.selectedEventComponents.includes("date")) {
        // Check if the event's date falls within the selected date range
        const selectedDateRange = event.selectedDateRange;
        const currentDate = new Date(date);
        const startDate = new Date(selectedDateRange[0]);
        const endDate = new Date(selectedDateRange[1]);

        if (currentDate >= startDate && currentDate <= endDate) {
          console.log("Date range found");
          // Date range is valid, set executeEvent to true
          setExecuteEvent(true);
        } else {
          console.log("Date range NOT found");
          // Date range is not valid, set executeEvent to false to skip this event
          setExecuteEvent(false);
        }
      } else {
        // Event doesn't include date check, continue processing
        // Set executeEvent to true to execute this event
        setExecuteEvent(true);
      }

      // Now, execute the event's consequences based on the value of executeEvent
      if (executeEvent) {
        console.log("Event Executed");
        // Execute the event's consequences
        executeEventConsequences(event);
      }
    });

    // Dispatch the updated participants array if needed
    console.log(participants);
  };

  return (
    <div>
      <Button onClick={executeRandomEvents}>Execute Random Events</Button>
    </div>
  );
}
