import serialize from "serialize-javascript";
import React, { useState, useEffect } from "react";
import {
  Select,
  Space,
  InputNumber,
  Card,
  Button,
  Col,
  Row,
  Checkbox,
  ConfigProvider,
  theme,
} from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TabComponent from "./tabsComponent/TabsComponent";
import { setStats, setLastDate } from "state";
import _ from "lodash";

export default function UserActions({ clientId }) {
  const user = useSelector((state) => state.user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const replaceUser = async (user) => {
    const bodyData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
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

  const [currentEvent, setCurrentEvent] = useState(null);
  const [showArcSelect, setShowArcSelect] = useState(null);
  const [selectedArc, setSelectedArc] = useState("");
  const [participantType, setParticipantType] = useState(null);
  const [showParticipantSelect, setShowParticipantSelect] = useState(null);
  const [showFactionSelect, setShowFactionSelect] = useState(null);

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <>
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

      <Card
        bordered={false}
        // theme={isDarkMode ? "Light" : "Dark"}
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            // cursor: isDragging ? 'grabbing' : 'grab',
            width: "100vw",
            height: "100vh",
            // overflow: 'hidden',
            // userSelect: 'none', // Disable text selection during dragging
          }}
          // onMouseDown={handleMouseDown}
        >
          <NewSegment initialSegment={["Initial Segment"]} />
        </div>
      </Card>
    </>
  );
}

function NewSegment({ initialSegment }) {
  const user = useSelector((state) => state.user);

  const [segmentKeys, setSegmentKeys] = useState(
    initialSegment.map(() => Date.now())
  );
  const { participants, categories } = user;

  const addSegment = () => {
    setSegmentKeys((prevSegmentKeys) => [...prevSegmentKeys, Date.now()]);
  };

  const removeSegment = (index) => {
    const updatedSegmentKeys = segmentKeys.filter((_, i) => i !== index);
    setSegmentKeys(updatedSegmentKeys);
  };

  return (
    <div style={{ display: "flex", overflowX: "auto" }}>
      <button onClick={addSegment}>+</button>
      <div
        style={{
          display: "flex",
          marginRight: "20px",
          justifyContent: segmentKeys.length === 1 ? "center" : "flex-start",
        }}
      >
        {segmentKeys.map((segmentKey, index) => (
          <div
            key={segmentKey}
            style={{ marginRight: "100px", marginLeft: "10px" }}
          >
            <div>
              <Segment removeSegment={() => removeSegment(index)} />

              <button onClick={() => removeSegment(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Segment({ removeSegment }) {
  const user = useSelector((state) => state.user);
  const mainLogs = useSelector((state) => state.user.mainLogs);

  const dispatch = useDispatch();

  const {
    participants,
    categories,
    factions,
    stats,
    items,
    date,
    arcs,
    statPerception,
  } = user;

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [observers, setObservers] = useState([]);
  const [isObserver, setIsObserver] = useState(false);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState({});
  const [hoveredParticipant, setHoveredParticipant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStat, setSelectedStat] = useState(null); // Initialize selectedStat here
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tempSelectedStats, setTempSelectedStats] = useState([]);
  const [selectedArc, setSelectedArc] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [transferToParticipantId, setTransferToParticipantId] = useState(null);
  const [showNumberRating, setShowNumberRating] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateChangeValue, setDateChangeValue] = useState(0);
  const [dateChangeUnit, setDateChangeUnit] = useState("seconds"); // Default unit

  const [detailedAccount, setDetailedAccount] = useState({
    title: "",
    dateStart: "",
    dateEnd: "",
    description: "",
    participants: [],
    categories: [],
    segmentRating: "",
  });

  const handleEndSegment = () => {
    // Check for title and description
    if (title.trim() === "") {
      setTitleError("Title cannot be blank");
      return;
    }
    if (description.trim() === "") {
      setDescriptionError("Description cannot be blank");
      return;
    }
    const regexDescription = applySelectedStats();

    // Calculate the segment rating
    const segmentRating = calculateNumberRating();

    // Parse the date into a Date object if needed
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    dispatch(setLastDate(parsedDate.toISOString()));

    const newDateEnd = updateDate(parsedDate, dateChangeValue, dateChangeUnit);

    // Prepare detailed account information
    const accountInfo = {
      title: title,
      dateStart: parsedDate.toISOString(),
      dateEnd: newDateEnd,
      description: regexDescription,
      participants: selectedParticipants,
      categories: Object.values(selectedCategoryTypes),
      segmentRating: segmentRating.toFixed(2) || 0.0, // Convert to fixed decimals
    };

    // Set the detailed account information
    setDetailedAccount(accountInfo);

    // Append the accountInfo to mainLogs
    const updatedMainLogs = [...mainLogs, accountInfo];
    console.log(updatedMainLogs);
    dispatch(setStats({ mainLogs: updatedMainLogs }));
    const updatedCategories = _.cloneDeep(categories);

    // Iterate over each selected category
    Object.keys(selectedCategoryTypes).forEach((type) => {
      const selectedCategory = selectedCategoryTypes[type];

      if (selectedCategory && selectedCategory !== "None") {
        // Find the selected category in the categories array
        const categoryIndex = updatedCategories.findIndex(
          (cat) => cat.name === selectedCategory
        );

        if (categoryIndex !== -1) {
          // Add the segment description to the log property
          updatedCategories[categoryIndex].logs.push(accountInfo);
        }
      }
    });

    dispatch(setStats({ categories: updatedCategories }));

    // Update the local state with the new mainLogs array
    console.log(accountInfo);
    // Apply selected stats and show segment rating
    // setTimeout(() => {
    // }, 0);

    handleShowSegmentRating();
    removeSegment();
    dispatch(setStats({ date: newDateEnd }));
  };
  const handleDeselectAll = () => {
    setSelectedParticipants([]);
  };

  const calculatePercentileCategory = (
    participant,
    participants,
    statName,
    statPerception
  ) => {
    const statValue = participant.stats.find(
      (stat) => Object.keys(stat)[0] === statName
    );

    if (!statValue) {
      return "Unclear";
    }

    const sortedStats = participants
      .map((p) => {
        const pStat = p.stats.find((s) => Object.keys(s)[0] === statName);
        return pStat ? Object.values(pStat)[0] : null;
      })
      .filter((value) => value !== null)
      .sort((a, b) => b - a);

    const participantValue = Object.values(statValue)[0];
    const percentile =
      (sortedStats.indexOf(participantValue) / (sortedStats.length - 1)) * 100;

    if (percentile <= 1) {
      return (
        statPerception.find((s) => s.statName === statName)?.top1 || "Unclear"
      );
    } else if (percentile <= 5) {
      return (
        statPerception.find((s) => s.statName === statName)?.top5Percentile ||
        "Unclear"
      );
    } else if (percentile <= 10) {
      return (
        statPerception.find((s) => s.statName === statName)?.top10Percentile ||
        "Unclear"
      );
    } else if (percentile <= 20) {
      return (
        statPerception.find((s) => s.statName === statName)?.top20Percentile ||
        "Unclear"
      );
    } else if (percentile <= 40) {
      return (
        statPerception.find((s) => s.statName === statName)?.top40Percentile ||
        "Unclear"
      );
    } else {
      return (
        statPerception.find((s) => s.statName === statName)?.top80Percentile ||
        "Unclear"
      );
    }
  };

  const applySelectedStats = () => {
    transferItem();
    let regexDescription;

    setSelectedParticipants((prevSelectedParticipants) => {
      const updatedParticipants = prevSelectedParticipants.map(
        (participantId) => {
          console.log(tempSelectedStats);
          const matchingEntries = tempSelectedStats.filter(
            (entry) => entry.participantId === participantId
          );

          if (!matchingEntries.length) {
            return participantId;
          }

          const participantIndex = participants.findIndex(
            (p) => p.id === participantId
          );

          if (participantIndex === -1) {
            return participantId;
          }

          const updatedParticipant = _.cloneDeep(
            participants[participantIndex]
          );

          matchingEntries.forEach((tempEntry) => {
            const selectedStatInfo = stats.find(
              (stat) => stat.label === tempEntry.selectedStat
            );

            if (!selectedStatInfo) {
              return; // Move to the next matching entry
            }

            const statName = selectedStatInfo.statName.toLowerCase();
            const existingStat = updatedParticipant.stats.find(
              (stat) => stat[statName] !== undefined
            );
            const existingRelevance = updatedParticipant.stats.find(
              (stat) => stat["relevance"] !== undefined
            );

            if (existingRelevance) {
              existingRelevance["relevance"] += 1;
            }

            if (existingStat) {
              existingStat[statName] += selectedStatInfo.change;
            } else {
              updatedParticipant.stats.push({
                [statName]: selectedStatInfo.change,
              });
            }
          });

          return updatedParticipant;
        }
      );

      const clonedParticipants = _.cloneDeep(participants);

      // Update the participants array with the modified participants
      const updatedParticipantsArray = updatedParticipants.map(
        (updatedParticipant, participantIndex) => {
          console.log(
            `Updated participant at index ${participantIndex}:`,
            updatedParticipant
          );
          return updatedParticipant;
        }
      );

      const selectedParticipantsNames = selectedParticipants.map(
        (participantId) =>
          participants.find((p) => p.id === participantId)?.name || ""
      );

      const observerNames = observers.map(
        (participantId) =>
          participants.find((p) => p.id === participantId)?.name || ""
      );

      ///

      // Function to find and replace participant by ID
      const updateParticipantById = (participants, updatedParticipant) => {
        const participantIndex = participants.findIndex(
          (p) => p.id === updatedParticipant.id
        );

        if (participantIndex !== -1) {
          participants[participantIndex] = updatedParticipant;
        }
      };

      // Loop through updated participants and update in cloned array
      updatedParticipants.forEach((updatedParticipant) => {
        updateParticipantById(clonedParticipants, updatedParticipant);
      });
      dispatch(setStats({ participants: clonedParticipants }));

      regexDescription = logDescription(
        description,
        selectedParticipantsNames,
        observerNames
      );
      setDescription(regexDescription);
      setTempSelectedStats([]); // Clear tempSelectedStats after applying changes
      return updatedParticipantsArray;
    });

    return regexDescription;
  };
  function updateDate(currentDate, changeValue, changeUnit) {
    const newDate = new Date(currentDate);
    switch (changeUnit) {
      case "seconds":
        newDate.setSeconds(newDate.getSeconds() + parseInt(changeValue));
        break;
      case "minutes":
        newDate.setMinutes(newDate.getMinutes() + parseInt(changeValue));
        break;
      case "hours":
        newDate.setHours(newDate.getHours() + parseInt(changeValue));
        break;
      case "days":
        newDate.setDate(newDate.getDate() + parseInt(changeValue));
        break;
      case "weeks":
        newDate.setDate(newDate.getDate() + 7 * parseInt(changeValue));
        break;
      case "months":
        newDate.setMonth(newDate.getMonth() + parseInt(changeValue));
        break;
      case "years":
        newDate.setFullYear(newDate.getFullYear() + parseInt(changeValue));
        break;
      default:
        break;
    }

    return newDate.toISOString();
  }

  const transferItem = () => {
    if (selectedItem && transferToParticipantId) {
      const updatedItems = items.map((item) => {
        if (item === selectedItem) {
          const updatedPastHolders = [
            ...item.pastHolders,
            {
              holderId: item.holderId[0],
              startDate: item.holderStartDate,
              endDate: date,
            },
          ];
          return {
            ...item,
            holderId: [transferToParticipantId],
            holderStartDate: date,
            holderEndDate: "Present", // Set holderEndDate to null for the new holder
            pastHolders: updatedPastHolders,
          };
        }
        return item;
      });

      // Update the items state
      dispatch(setStats({ items: updatedItems }));

      // Clear the transfer state
      setSelectedItem("");
      setTransferToParticipantId("");
    }
  };

  const filteredItems = items.filter((item) => {
    return selectedParticipants.some((participantId) =>
      item.holderId.includes(participantId)
    );
  });

  const handleArcSelect = (arcIndex) => {
    if (arcIndex !== null) {
      setSelectedArc(arcs[arcIndex]);
      setTitle(arcs[arcIndex].title);
      setDescription(arcs[arcIndex].description);
    } else {
      setSelectedArc(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleMultipleStatChange = (participantId, values) => {
    setTempSelectedStats((prevSelectedStats) => {
      const updatedSelectedStats = prevSelectedStats.filter(
        (entry) => entry.participantId !== participantId
      );

      for (const value of values) {
        const selectedStatInfo = stats.find((stat) => stat.label === value);
        if (selectedStatInfo) {
          updatedSelectedStats.push({
            participantId,
            selectedStat: value,
            statChange: selectedStatInfo.change,
          });
        }
      }

      return updatedSelectedStats;
    });
  };

  const logDescription = (
    description,
    selectedParticipantsNames,
    observerNames
  ) => {
    let replacedDescription = description;

    // Replace "mc names" with actual participant names or "someone"
    for (let i = 0; i < selectedParticipantsNames.length; i++) {
      const name = selectedParticipantsNames[i];
      const mc = `mc${i + 1}`;
      const regex = new RegExp(mc, "gi"); // 'gi' for global and case-insensitive
      replacedDescription = replacedDescription.replace(
        regex,
        name || "someone"
      );
    }
    // Replace "observer names" with actual observer names or "observer"
    for (let i = 0; i < observerNames.length; i++) {
      const name = observerNames[i];
      const observer = `ob${i + 1}`;
      const regex = new RegExp(observer, "gi"); // 'gi' for global and case-insensitive
      replacedDescription = replacedDescription.replace(
        regex,
        name || "observer"
      );
    }
    setDescription(replacedDescription);
    console.log("Replaced Description:", replacedDescription);
    return replacedDescription;
  };

  const calculateNumberRating = () => {
    const allParticipants = selectedParticipants.concat(observers);
    const selectedStats = tempSelectedStats.filter((entry) =>
      allParticipants.includes(entry.participantId)
    );

    const totalStats = {};

    selectedStats.forEach((entry) => {
      const { selectedStat, statChange } = entry;
      if (!totalStats[selectedStat]) {
        totalStats[selectedStat] = 0;
      }
      totalStats[selectedStat] += statChange;
    });

    let highestValue = 0;

    for (const stat in totalStats) {
      if (totalStats[stat] > highestValue) {
        highestValue = totalStats[stat];
      }
    }

    const numberRating = highestValue / allParticipants.length;

    return numberRating;
  };

  const handleShowSegmentRating = () => {
    setShowNumberRating(true); // Show the number rating when the end segment button is pressed
  };

  const statNames = [
    ...new Set(stats.map((stat) => stat.statName.toLowerCase())),
  ];

  const toggleParticipant = (participantId) => {
    if (isObserver) {
      setSelectedParticipants((prevSelected) =>
        prevSelected.filter((id) => id !== participantId)
      );

      setObservers((prevObservers) =>
        prevObservers.includes(participantId)
          ? prevObservers.filter((id) => id !== participantId)
          : [...prevObservers, participantId]
      );
    } else {
      setObservers((prevObservers) =>
        prevObservers.filter((id) => id !== participantId)
      );

      setSelectedParticipants((prevSelected) =>
        prevSelected.includes(participantId)
          ? prevSelected.filter((id) => id !== participantId)
          : [...prevSelected, participantId]
      );
    }
  };

  const sortParticipants = (participants) => {
    if (selectedStat) {
      return participants.slice().sort((a, b) => {
        const statName = selectedStat.toLowerCase();
        const statA = a.stats.find((stat) => Object.keys(stat)[0] === statName);
        const statB = b.stats.find((stat) => Object.keys(stat)[0] === statName);
        if (statA && statB) {
          return statB[statName] - statA[statName];
        } else if (statA) {
          return -1;
        } else if (statB) {
          return 1;
        }
        return 0;
      });
    }
    return participants;
  };

  // Define a custom CSS class for the caret icon
  const customCaretIconStyle = {
    color: "rgba(255, 255, 255, 0.85)", // Light white color
  };

  const filteredParticipants = sortParticipants(
    participants.filter((participant) => {
      if (!participant.isActive) {
        return false; // Skip inactive participants
      }

      const selectedCategoryParticipants = {};
      for (const type of Object.keys(selectedCategoryTypes)) {
        selectedCategoryParticipants[type] =
          selectedCategoryTypes[type] !== "None"
            ? categories.find(
                (cat) =>
                  cat.type === type && cat.name === selectedCategoryTypes[type]
              )?.participants
            : participants.map((p) => p.id);
      }

      const participantTypeMatches = Object.keys(
        selectedCategoryParticipants
      ).every((type) =>
        selectedCategoryParticipants[type].includes(participant.id)
      );

      return (
        participantTypeMatches &&
        participant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
  );

  const categoryTypes = [...new Set(categories.map((cat) => cat.type))];

  return (
    <Card
      style={{
        minWidth: "920px",
        marginLeft: 190,
        // display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div>
        <p>Date: {new Date(date).toDateString()}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="category-filter"
            style={{
              maxHeight: "50px",
              overflow: "auto",
              width: "90%",
              border: "1px solid red",
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            {categoryTypes.map((type) => (
              <div
                key={type}
                style={{ marginTop: "5px", marginBottom: "10px" }}
              >
                <Select
                  bordered={true}
                  style={{ marginLeft: "5px" }}
                  suffixIcon={<CaretDownFilled style={customCaretIconStyle} />} // Use the suffixIcon prop to add the caret
                  // value={selectedCategoryTypes[type] || `None`}
                  placeholder={`Select ${type}`}
                  onChange={(value) =>
                    setSelectedCategoryTypes((prev) => ({
                      ...prev,
                      [type]: value,
                    }))
                  }
                >
                  <Select.Option value="None">None</Select.Option>
                  {categories
                    .filter((cat) => cat.type === type)
                    .map((cat) => (
                      <Select.Option key={cat.name} value={cat.name}>
                        {cat.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            ))}
          </div>
          <div style={{ marginLeft: "20px" }}>
            <Select
              bordered={true}
              style={{ marginLeft: "5px" }}
              value={selectedStat || "None"}
              onChange={(value) => setSelectedStat(value)}
              suffixIcon={<CaretDownFilled style={customCaretIconStyle} />} // Use the suffixIcon prop to add the caret
            >
              <Select.Option value="None">Sort By </Select.Option>
              {statNames.map((statName) => (
                <Select.Option key={statName} value={statName}>
                  {statName}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search participants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "10px" }} // Add margin to the input
          />
          <Button onClick={handleDeselectAll} style={{ marginRight: "10px" }}>
            Deselect All
          </Button>
          <Checkbox
            checked={isObserver}
            onChange={(e) => setIsObserver(e.target.checked)}
          >
            Is Observer
          </Checkbox>
        </div>

        <div
          className=""
          style={{
            maxHeight: "50px",
            overflow: "auto",
            width: "90%",
            border: "1px solid red",
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {filteredParticipants
            .filter((participant) => participant.isActive) // Filter out inactive participants
            .map((participant) => (
              <button
                key={participant.id}
                className="participant-button"
                onMouseEnter={() => setHoveredParticipant(participant)}
                onClick={() => toggleParticipant(participant.id)}
                style={{
                  background: selectedParticipants.includes(participant.id)
                    ? "lightblue"
                    : observers.includes(participant.id)
                    ? "green"
                    : "white",
                }}
              >
                {participant.name}
              </button>
            ))}
        </div>

        {hoveredParticipant && (
          <div
            className="participant-tooltip"
            style={{ maxHeight: "150px", overflow: "auto" }}
          >
            <img
              src={hoveredParticipant.image}
              alt={`${hoveredParticipant.name}`}
              width={120}
              height={120}
              style={{ verticalAlign: "middle" }} // Add this style
            />
     <span
  style={{
    marginTop: "100px",
    fontWeight: "bold",
    fontSize: "18px",
    verticalAlign: "middle",
    fontFamily: "cursive, sans-serif", // Specify a stylish font family
  }}
>
  {`${hoveredParticipant.name}`}
</span>

            {categoryTypes.map((type) => (
              <p key={type}>{`${type}s: ${categories
                .filter(
                  (cat) =>
                    cat.type === type &&
                    cat.participants.includes(hoveredParticipant.id)
                )
                .map((cat) => cat.name)
                .join(", ")}`}</p>
            ))}
            <p>{`Items: ${items
              .filter((item) => item.holderId.includes(hoveredParticipant.id))
              .map((item) => item.name)
              .join(", ")}`}</p>
            <p>{`Factions: ${factions
              .filter((faction) =>
                faction.participants.includes(hoveredParticipant.id)
              )
              .map((faction) => faction.name)
              .join(", ")}`}</p>
            {statPerception.map((perception) => (
              <p key={perception.statName}>{`${
                perception.statName
              }: ${calculatePercentileCategory(
                hoveredParticipant,
                participants,
                perception.statName,
                statPerception
              )}`}</p>
            ))}
          </div>
        )}

        <div>
          <h3>Selected Players:</h3>
          <p>
            {selectedParticipants
              .map(
                (participantId) =>
                  participants.find((p) => p.id === participantId)?.name
              )
              .join(", ")}
          </p>
          <h3>Selected Observers:</h3>
          <p>
            {observers
              .map(
                (participantId) =>
                  participants.find((p) => p.id === participantId)?.name
              )
              .join(", ")}
          </p>
        </div>

        <div style={{ maxWidth: "300px" }}>
          <Select
            suffixIcon={<CaretDownFilled style={customCaretIconStyle} />} // Use the suffixIcon prop to add the caret
            placeholder="Select an arc"
            onChange={handleArcSelect}
          >
            {arcs.map((arc, index) => (
              <Select.Option key={index} value={index}>
                {arc.title}
              </Select.Option>
            ))}
          </Select>

          <div>
            <span>Title:</span>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(""); // Clear the error when input changes
              }}
            />
            {titleError && (
              <p className="error-message" style={{ color: "red" }}>
                {titleError}
              </p>
            )}
          </div>

          {/* Description textarea */}
          <div>
            <span>Description:</span>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(""); // Clear the error when input changes
              }}
            />
            {descriptionError && (
              <p className="error-message" style={{ color: "red" }}>
                {descriptionError}
              </p>
            )}
          </div>
        </div>
        <div>
          <h3>Selected Players:</h3>
          {selectedParticipants.map((participantId) => {
            const participant = participants.find(
              (p) => p.id === participantId
            );
            if (!participant) {
              return null; // Skip rendering if participant is not found
            }
            return (
              <div key={participant.id}>
                <p>{participant.name}</p>
                <Select
                  placeholder="Select Participant"
                  style={{
                    minWidth: 200,
                  }}
                  suffixIcon={<CaretDownFilled style={customCaretIconStyle} />} // Use the suffixIcon prop to add the caret
                  mode="multiple"
                  value={tempSelectedStats
                    .filter((entry) => entry.participantId === participant.id)
                    .map((entry) => entry.selectedStat)}
                  onChange={(values) =>
                    handleMultipleStatChange(participant.id, values)
                  }
                >
                  {stats.map((stat) => (
                    <Select.Option key={stat.label} value={stat.label}>
                      {stat.label}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            );
          })}
        </div>

        <div>
          <div>
            <span>Items:</span>
            <Select
              placeholder="Select Item to Transfer"
              suffixIcon={<CaretDownFilled style={customCaretIconStyle} />} // Use the suffixIcon prop to add the caret
              value={selectedItem ? selectedItem.name : undefined}
              onChange={(value) => {
                const selected = items.find((item) => item.name === value);
                setSelectedItem(selected);
              }}
            >
              {filteredItems.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            {selectedItem && (
              <div>
                <p>
                  Current Holder:{" "}
                  {
                    participants.find((p) =>
                      selectedItem.holderId.includes(p.id)
                    )?.name
                  }
                </p>
                <Space>
                  <Select
                    suffixIcon={
                      <CaretDownFilled style={customCaretIconStyle} />
                    } // Use the suffixIcon prop to add the caret
                    placeholder="Transfer Item"
                    value={transferToParticipantId || undefined}
                    onChange={(value) => setTransferToParticipantId(value)}
                  >
                    <Select.Option value={""}>Transfer to...</Select.Option>
                    {selectedParticipants
                      .filter(
                        (participantId) =>
                          !selectedItem.holderId.includes(participantId)
                      )
                      .map((participantId) => (
                        <Select.Option
                          key={participantId}
                          value={participantId}
                        >
                          {
                            participants.find((p) => p.id === participantId)
                              ?.name
                          }
                        </Select.Option>
                      ))}
                  </Select>
                </Space>
              </div>
            )}
          </div>
          {selectedItem && (
            <p>
              Current Holder:{" "}
              {
                participants.find((p) => selectedItem.holderId.includes(p.id))
                  ?.name
              }
            </p>
          )}
        </div>
        <div style={{ maxWidth: "200px" }}>
          <h3>Date Change</h3>
          <div>
            <span>Change by:</span>
            <InputNumber
              min={-100000}
              max={1000000}
              size="small"
              value={dateChangeValue}
              onChange={(value) => setDateChangeValue(value)}
            />
            <Space>
              <Select
                value={dateChangeUnit}
                suffixIcon={<CaretDownFilled style={customCaretIconStyle} />} // Use the suffixIcon prop to add the caret
                onChange={(value) => setDateChangeUnit(value)}
              >
                <Select.Option value="seconds">Seconds</Select.Option>
                <Select.Option value="minutes">Minutes</Select.Option>
                <Select.Option value="hours">Hours</Select.Option>
                <Select.Option value="days">Days</Select.Option>
                <Select.Option value="weeks">Weeks</Select.Option>
                <Select.Option value="months">Months</Select.Option>
                <Select.Option value="years">Years</Select.Option>
              </Select>
            </Space>
          </div>
        </div>
        {showNumberRating && (
          <div>
            <h3>Number Rating: {calculateNumberRating()}</h3>
          </div>
        )}
        {/* End Segment Button */}
        <button onClick={() => handleEndSegment()}>End Segment</button>
      </div>
    </Card>
  );
}
