import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Input,Button,Select } from "antd";
import { setStats } from "state";

export default function MainLogs() {
  const mainLogs = useSelector((state) => state.user.mainLogs);
  const participants = useSelector((state) => state.user.participants);
  const categories = useSelector((state) => state.user.categories);

  const dispatch = useDispatch();

 

  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [editingLogIndex, setEditingLogIndex] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState(null);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState({});
  const [selectedCategoryNames, setSelectedCategoryNames] = useState({});

  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId);
    return participant ? participant.name : "Unknown Participant";
  };

  const handleEditDescription = (logIndex) => {
    // Set the editing index and store the initial description
    setEditingLogIndex(logIndex);
    setEditedDescriptions((prevState) => ({
      ...prevState,
      [logIndex]: mainLogs[logIndex].description,
    }));
  };

 

  const handleSaveDescription = (logIndex) => {
    // Handle saving the edited description to your state/store
    // You can dispatch an action or use any appropriate method
    // based on your application's logic
    // For example:
    const updatedMainLogs = mainLogs.map((log, i) =>
      i === logIndex
        ? { ...log, description: editedDescriptions[logIndex] }
        : log
    );
    // Dispatch the updatedMainLogs or update the state as needed
    // For instance, if you're using Redux:
 dispatch(setStats({ mainLogs: updatedMainLogs }));  
    setEditedDescriptions((prevState) => ({
      ...prevState,
      [logIndex]: undefined,
    }));
    setEditingLogIndex(null);
  };

  

  const categoryTypes = Array.from(new Set(categories.map((category) => category.type)));
  
  const filteredLogs = mainLogs
    .filter((log) =>
      selectedParticipants.length === 0 || selectedParticipants.every((participantId) =>
        log.participants.includes(participantId)
      )
    )
    .filter((log) =>
      Object.entries(selectedCategoryNames).every(([categoryType, categoryName]) =>
        !categoryName || log.categories.includes(categoryName)
      )
    );

console.log(filteredLogs); // Output the filtered logs to the console for monitoring


const [activeKey, setActiveKey] = useState([]);
const [allPanelsOpen, setAllPanelsOpen] = useState(false);

const handleOpenAll = () => {
  setActiveKey(filteredLogs.map((_, index) => `${index}`));
  setAllPanelsOpen(true);
};

const handleCloseAll = () => {
  setActiveKey([]);
  setAllPanelsOpen(false);
};

  return (
    <div>
      <h2>Main Logs</h2>
      <div>
        {participants.map((participant) => (
          <Button
            key={participant.id}
            onClick={() =>
              setSelectedParticipants((prevSelected) =>
                prevSelected.includes(participant.id)
                  ? prevSelected.filter((id) => id !== participant.id)
                  : [...prevSelected, participant.id]
              )
            }
            type={
              selectedParticipants.includes(participant.id)
                ? "primary"
                : "default"
            }
          >
            {participant.name}
          </Button>
        ))}
      </div>
      <div>
        {categoryTypes.map((categoryType) => (
          <div key={categoryType} style={{ marginBottom: "16px" }}>
            <h3>{categoryType} Category</h3>
            <Select
              placeholder={`Select ${categoryType} Category`}
              value={selectedCategoryNames[categoryType] || null}
              onChange={(value) =>
                setSelectedCategoryNames((prevState) => ({
                  ...prevState,
                  [categoryType]: value,
                }))
              }
              style={{ width: "200px" }}
            >
              <Select.Option value={null}>All</Select.Option>
              {categories
                .filter((category) => category.type === categoryType)
                .map((category) => (
                  <Select.Option key={category.name} value={category.name}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        ))}
      </div>
      <div>
        {/* Open All button */}
        <Button onClick={handleOpenAll}>Open All</Button>
        {/* Close All button */}
        <Button onClick={handleCloseAll}>Close All</Button>
      </div>
      <Collapse bordered={false} activeKey={activeKey} onChange={setActiveKey}>
        {filteredLogs.map((log, logIndex) => (
          <Collapse.Panel header={log.title} key={logIndex}>
            <div>
              <strong>Date Start: </strong>
              {new Date(log.dateStart).toLocaleString()}
            </div>
            <div>
              <strong>Date End: </strong>
              {new Date(log.dateEnd).toLocaleString()}
            </div>
            <div>
              <strong>Participants: </strong>
              {log.participants.map((participantId) => (
                <span key={participantId}>
                  {getParticipantName(participantId)},{" "}
                </span>
              ))}
            </div>
            <div>
              <strong>Categories: </strong>
              {log.categories.join(", ")}
            </div>
            <div>
              <strong>Segment Rating: </strong>
              {log.segmentRating}
            </div>
            
            {/* Moved the inner loop for log descriptions outside of Collapse.Panel */}
            <div key={logIndex}>
              <h3>{log.title}</h3>
              {editingLogIndex === logIndex ? (
                <textarea
                  value={editedDescriptions[logIndex] || ""}
                  onChange={(e) =>
                    setEditedDescriptions((prevState) => ({
                      ...prevState,
                      [logIndex]: e.target.value,
                    }))
                  }
                  onBlur={() => handleSaveDescription(logIndex)}
                  rows={5}
                />
              ) : (
                <div>
                  {log.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: log.description.replace(/\n/g, "<br />"),
                      }}
                    />
                  )}
                </div>
              )}
              {editingLogIndex !== logIndex && (
                <button onClick={() => handleEditDescription(logIndex)}>
                  Edit Description
                </button>
              )}
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}
