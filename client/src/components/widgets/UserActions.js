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
  Typography,
  Tag,
  Input,
  ConfigProvider,
  theme,
  message,
} from "antd";
import { CaretDownFilled, FileDoneOutlined, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TabComponent from "./tabsComponent/TabsComponent";
import { setStats, setLastDate } from "state";
import _ from "lodash";

const { TextArea } = Input;

export default function UserActions({ clientId }) {
  const user = useSelector((state) => state.user);




  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);



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

      <Card
        bordered={false}
        // theme={isDarkMode ? "Light" : "Dark"}
        style={{
          width: "100vw",
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
    if (segmentKeys.length < 10) {
      setSegmentKeys((prevSegmentKeys) => [...prevSegmentKeys, Date.now()]);
    } else {
      // You can display an error message or take other actions when the limit is reached
      console.log('Segment limit reached. Cannot add more segments.');
    }
  };
  

  const removeSegment = (index) => {
    const updatedSegmentKeys = segmentKeys.filter((_, i) => i !== index);
    setSegmentKeys(updatedSegmentKeys);
  };

  
    const [isAdded, setIsAdded] = useState(true);

  const toggleSegment = () => {
    setIsAdded(!isAdded);
    // Add your logic to handle adding or removing the segment here
  };

  const buttonStyle = {
    border: '2px solid limegreen', // Bright green outline
    borderRadius: '5px', // Rounded corners
    padding: '20px 40px', // Increase padding to make the button larger
    cursor: 'pointer', // Change cursor to pointer on hover
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth:50,
    minHeight:300,
    lineHeight: '1', // Set line-height to 1
  };
  
  const iconStyle = {
    fontSize: '24px', // Adjust the icon font size
    marginTop: '0', // Add space between text and icon
  };
  

  return (
    <div style={{ display: "flex", overflowX: "auto" }}>
       <Button style={buttonStyle} onClick={addSegment} size="large">
      Add Event
      <div style={iconStyle}>
        <PlusOutlined />
      </div>
    </Button>
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
            style={{ marginRight: "0", marginLeft: "10px" }}
          >
            <div>
              <Segment removeSegment={() => removeSegment(index)} />

<div style={{marginLeft:0, marginTop:0, marginBottom:50}}>
<button
  onClick={() => removeSegment(index)}
  style={{
    zIndex: 2, // Increase the z-index
    padding: '10px 20px', // Increase padding to make it bigger
    fontSize: '18px', // Increase font size
  }}
>
  <DeleteTwoTone />
</button>
</div>
              
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

  const [messageApi, contextHolder] = message.useMessage();         

  const replaceUser = async (user) => {
    const bodyData = {
      id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    impressions: user.impressions,
    mainLogs: user.mainLogs,
    participants: user.participants,
    items: user.items,
    stats: user.stats,
    relationships: user.relationships,
    recentEvents: user.recentEvents,
    statPerception: user.statPerception,
    arcs: user.arcs,
    date: user.date,
    randomEvents: user.randomEvents,
    categories:user.categories,

    };
  
    try {
      // Display loading message
      messageApi.loading({ content: 'Replacing data...', key: 'replaceUserMessage',  duration: 0, });
  
      const response = await fetch("https://bookboard-app.onrender.com/auth/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      const data = await response.json();
  
      // Display success message

      messageApi.success({ content: 'Data replaced successfully!', key: 'replaceUserMessage' });
      setTimeout(messageApi.destroy,2000);

      console.log(data);
    } catch (error) {
      // Display error message   

      messageApi.error({ content: 'Failed to replace data!', key: 'replaceUserMessage' });
      setTimeout(messageApi.destroy,2000);

      console.error("Error replacing user:", error);
    }
  };

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

    console.log("Deccription", description);
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
   
    replaceUser(user)
  
  
  console.log(user);};
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

 
  useEffect(() => {
    const  clonedParticipants=_.cloneDeep(participants)

    // Initialize the 'relevance' property for each participant
    clonedParticipants.forEach((participant) => {
      if (!Array.isArray(participant.stats)) {
        participant.stats = [];
      }

      if (
        !participant.stats.some((stat) =>
          stat.hasOwnProperty('relevance')
        )
      ) {
        // If 'relevance' is not present in the 'stats' array, initialize it with 0
        participant.stats.push({ relevance: 0 });
      }
    });

 dispatch(setStats({ participants: clonedParticipants }));
  }, []);


  const applySelectedStats = () => {
    transferItem();
    let regexDescription = description;

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
    color: "lightgreen", // Light white color
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
        width: "90vw",
        marginTop: "-40px",
        marginLeft: 0,
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
              width: "70%",
              border: "0.5px solid red",
              borderRadius: "10px",
              margin: "10px",
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
                  {contextHolder}

            {categoryTypes.map((type) => (
              <div
                key={type}
                style={{ marginTop: "0", marginBottom: "10px" }}
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
              <Select.Option value="None">Sort Participants</Select.Option>
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
        <Row gutter={16} style={{ marginTop: '20px' }}>

  <Col span={8}>
    <div
      className=""
      style={{
        maxHeight: "150px",
        overflow: "auto",
        width: "90%",
        border: "0.5px solid red",
        borderRadius: "10px",
        margin: "10px",

        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
      }}
    >
      {/* Render filtered participants */}
      {filteredParticipants
        .filter((participant) => participant.isActive)
        .map((participant) => (
          <button
            key={participant.id}
            onMouseEnter={() => setHoveredParticipant(participant)}
            // onMouseLeave={() => setHoveredParticipant(null)} // Reset the hover effect on mouse leave
            onClick={() => toggleParticipant(participant.id)}
            style={{
              background: selectedParticipants.includes(participant.id)
                ? "lightblue"
                : observers.includes(participant.id)
                ? "green"
                : "white",
              transition: "background-color 0.3s", // Add a smooth transition
              ":hover": { background: "red" }, // Define the hover effect
            }}
          >
            {participant.name}
          </button>
        ))}
    </div>
  </Col>
  <Col span={12}>
    {hoveredParticipant && (
      <div
        className="participant-tooltip"
        style={{
          display: "flex",
          alignItems: "center",
          maxHeight: "150px",
          paddingTop:'5%',
          
          overflow: "auto",
        }}
      >
        <img
          src={hoveredParticipant.image}
          alt={`${hoveredParticipant.name}`}
          width={120}
          height={120}
          style={{ verticalAlign: "middle", margin: "5px" }}
        />
        <span
          style={{
            marginTop: "20px", // Adjust the marginTop value to position the name higher
            fontWeight: "bold",
            fontSize: "18px",
            verticalAlign: "middle",
            fontFamily: "cursive, sans-serif", // Specify a stylish font family
          }}
        >
          {`${hoveredParticipant.name}`}
        </span>

        <div style={{ marginLeft: "100px", marginTop: 100 }}>
          {statPerception.map((perception) => (
            <div key={perception.statName} style={{ marginBottom: "8px" }}>
              <Tag color="purple">
                {`${perception.statName
                  .charAt(0)
                  .toUpperCase()}${perception.statName.slice(1)} (${
                  hoveredParticipant.stats.find((stat) =>
                    stat.hasOwnProperty(perception.statName)
                  )
                    ? hoveredParticipant.stats.find((stat) =>
                        stat.hasOwnProperty(perception.statName)
                      )[perception.statName]
                    : ""
                })`}
              </Tag>

              <Typography.Text style={{ opacity: 0.8 }}>
                {calculatePercentileCategory(
                  hoveredParticipant,
                  participants,
                  perception.statName,
                  statPerception
                )}
              </Typography.Text>
            </div>
          ))}
          {categoryTypes.map((type) => (
            <div key={type} style={{ marginBottom: "8px" }}>
              <Tag color="blue">{`${type
                .charAt(0)
                .toUpperCase()}${type.slice(1)}s`}</Tag>
              <Typography.Text style={{ opacity: 0.8 }}>
                {categories
                  .filter(
                    (cat) =>
                      cat.type === type &&
                      cat.participants.includes(hoveredParticipant.id)
                  )
                  .map((cat) => cat.name)
                  .join(", ")}
              </Typography.Text>
            </div>
          ))}

          <div style={{ marginBottom: "8px" }}>
            <Tag color="green">Items</Tag>
            <Typography.Text style={{ opacity: 0.8 }}>
              {items
                .filter((item) =>
                  item.holderId.includes(hoveredParticipant.id)
                )
                .map((item) => item.name)
                .join(", ")}
            </Typography.Text>
          </div>

          <div>
            <Tag color="yellow">Biography</Tag>

            {hoveredParticipant.bio}
          </div>
        </div>
      </div>
    )}
  </Col>
</Row>
        <div
          className=""
          style={{
            maxHeight: "300px",
            overflow: "auto",
            width: "90%",
            // border: "0.5px solid red",
            borderRadius: "10px",
            margin: "10px",

            // display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {selectedParticipants.length > 0 && (
            <>
              <h3>Selected Players:</h3>
              <p>
                {selectedParticipants.map((participantId, index) => {
                  const participantName = participants.find(
                    (p) => p.id === participantId
                  )?.name;
                  return (
                    <React.Fragment key={participantId}>
                      {participantName}
                      {index < selectedParticipants.length - 1 ? ", " : ""}
                      {index === selectedParticipants.length - 2 ? " and " : ""}
                    </React.Fragment>
                  );
                })}
              </p>
            </>
          )}
          {observers.length > 0 && (
            <>
              <h3>Selected Observers:</h3>
              <p>
                {observers.map((participantId, index) => {
                  const participantName = participants.find(
                    (p) => p.id === participantId
                  )?.name;
                  return (
                    <React.Fragment key={participantId}>
                      {participantName}
                      {index < observers.length - 1 ? ", " : ""}
                      {index === observers.length - 2 ? " & " : ""}
                    </React.Fragment>
                  );
                })}
              </p>
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px" /* Add spacing between elements */,
            margin: "20px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Select
              placeholder="Select an arc"
              onChange={handleArcSelect}
              suffixIcon={<CaretDownFilled style={customCaretIconStyle} />}
            >
              {arcs.map((arc, index) => (
                <Select.Option key={index} value={index}>
                  {arc.title}
                </Select.Option>
              ))}
            </Select>

            <div>
              <Input
                placeholder="Title"
                type="text"
                value={title}
                allowClear
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(""); // Clear the error when input changes
                }}
                style={{
                  borderColor: "#CCCCCC",
                  borderWidth: "1px",
                  color: "#CCCCCC",
                }}
                className="custom-input" // Add a custom class for styling
              />

              {titleError && (
                <Typography.Text className="error-message" type="danger">
                  {titleError}
                </Typography.Text>
              )}
            </div>
          </div>
          {/* Description textarea */}
          <div style={{ minWidth: '70%', minHeight: 200 }}>
            <TextArea
              placeholder="Tap here to start writing"
              showCount
              maxLength={5000}
              style={{ minWidth: '100%', minHeight: 200, fontSize: "18px" }} // Adjust the fontSize value as needed
              autoSize
              value={description}
              bordered={true}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(""); // Clear the error when input changes
              }}
              className="custom-textarea" // Add a custom class for styling
            />

            {descriptionError && (
              <p className="error-message" style={{ color: "red" }}>
                {descriptionError}
              </p>
            )}
          </div>
        </div>
        <div className="participant-grid">
          {selectedParticipants.map((participantId) => {
            const participant = participants.find(
              (p) => p.id === participantId
            );
            if (!participant) {
              return null; // Skip rendering if participant is not found
            }
            return (
              <div key={participant.id} className="rotating-border">
                <p>{participant.name}</p>
                <Select
                  placeholder="Specify Stat Changes"
                  style={{
                    minWidth: 200,
                  }}
                  suffixIcon={<CaretDownFilled style={customCaretIconStyle} />}
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
        <div
          style={{
            marginTop: 50,
            flexDirection: "column", // Stack child divs vertically

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Select
              placeholder={
                filteredItems.length === 0
                  ? "No Item holder selected"
                  : "Select Item to Transfer"
              }
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
                    } 
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "200px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 40,
                marginBottom: 30,
              }}
            >
              <span style={{ marginRight: "10px" }}>Advance Date by:</span>
              <InputNumber
                min={-100000}
                max={1000000}
                size="small"
                value={dateChangeValue}
                onChange={(value) => setDateChangeValue(value)}
              />
              <Select
                value={dateChangeUnit}
                suffixIcon={<CaretDownFilled style={customCaretIconStyle} />}
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
            </div>
          </div>
        </div>
        {showNumberRating && (
          <div>
            <h3>Number Rating: {calculateNumberRating()}</h3>
          </div>
        )}
        {/* End Segment Button */}
        <Button
          type="primary"
          size="large"
          icon={<FileDoneOutlined />}
          onClick={() => handleEndSegment()}
        >
          End Event
        </Button>{" "}
      </div>
    </Card>
  );
}
