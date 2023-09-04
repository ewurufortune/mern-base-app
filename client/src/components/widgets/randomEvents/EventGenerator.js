import React, { useState } from "react";
import {
  Select,
  Button,
  Form,
  Input,
  Slider,
  DatePicker,
  Radio,
  InputNumber,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setStats } from "state";
import _ from "lodash";

const { Option } = Select;

const eventComponents = [
  { key: "stat", label: "Stat Range" },
  { key: "date", label: "Add Date Range" },
  { key: "activity", label: "Activity Status" },
  { key: "item", label: "Item Requirement" },
  { key: "category", label: "Select Category" },
];

const consequenceComponents = [
  { key: "statChange", label: "Stat Change" },
  { key: "activityChange", label: "Activity Change" },
  { key: "itemChange", label: "Item Change" },
  { key: "categoryChange", label: "Category Change" },
];

function EventGenerator() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.user.categories);
  const uniqueTypes = [...new Set(categories.map((category) => category.type))];
  const stats = useSelector((state) => state.user.stats);
  function getUniqueStatNames(data) {
    const uniqueStatNames = [];
    const statNamesSet = new Set();

    for (const stat of data) {
      const lowerCaseStatName = stat.statName.toLowerCase();
      if (!statNamesSet.has(lowerCaseStatName)) {
        uniqueStatNames.push(stat);
        statNamesSet.add(lowerCaseStatName);
      }
    }

    return uniqueStatNames;
  }

  // Use the function to get unique stat names
  const statsData = getUniqueStatNames(stats);
  const items = useSelector((state) => state.user.items);
  const randomEvents = useSelector((state) => state.user.randomEvents);

  const [selectedEventComponents, setSelectedEventComponents] = useState([]);
  const [selectedConsequenceComponents, setSelectedConsequenceComponents] =
    useState([]);

  // State variables for recording selected options
  const [statRange, setStatRange] = useState([0, 100]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [activityStatus, setActivityStatus] = useState("active");
  const [itemRequirement, setItemRequirement] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesByType, setSelectedCategoriesByType] = useState({});
  const [selectedCategoryChangeByType, setSelectedCategoryChangeByType] =
    useState({});
  const [selectedNewCategories, setSelectedNewCategories] = useState({});

  const [statChangeValue, setStatChangeValue] = useState("");
  const [activityChangeConsequence, setActivityChangeConsequence] =
    useState("");
  const [selectedItemChange, setSelectedItemChange] = useState("");
  const [selectedItemPercentile, setSelectedItemPercentile] = useState(null);

  const [selectedCategoryChange, setSelectedCategoryChange] = useState([]);

  const [selectedSelectionMode, setSelectedSelectionMode] = useState(null);
  const [selectedPercentile, setSelectedPercentile] = useState(null);

  // Description inputs
  const [eventDescription, setEventDescription] = useState("");
  const [consequenceDescription, setConsequenceDescription] = useState("");

  // State variables for recording selected options
  const [selectedStat, setSelectedStat] = useState("");
  const [selectedStatChange, setSelectedStatChange] = useState("");

  const [statChangeAmount, setStatChangeAmount] = useState(0);
  const [eventTitle, setEventTitle] = useState("");
  const [titleCharCount, setTitleCharCount] = useState(0);

  const [eventRarity, setEventRarity] = useState("common");

  const handleEventComponentChange = (selectedComponents) => {
    setSelectedEventComponents(selectedComponents);
  };

  const handleConsequenceComponentChange = (selectedComponents) => {
    setSelectedConsequenceComponents(selectedComponents);
  };

  const resetState = () => {
    setEventTitle("")
    setEventRarity("common")
    setSelectedEventComponents([]);
    setSelectedConsequenceComponents([]);
    setStatRange([0, 100]);
    setSelectedDateRange([]);
    setActivityStatus("active");
    setItemRequirement(null);
    setSelectedCategories([]);
    setSelectedCategoriesByType({});
    setSelectedCategoryChangeByType({});
    setSelectedNewCategories({});
    setStatChangeValue("");
    setActivityChangeConsequence("");
    setSelectedItemChange("");
    setSelectedItemPercentile(null);
    setSelectedCategoryChange([]);
    setSelectedSelectionMode('single');
    setSelectedPercentile(null);
    setEventDescription("");
    setConsequenceDescription("");
    setSelectedStat("");
    setSelectedStatChange("");
    setStatChangeAmount(0);
  };

  const generateEvent = () => {
    if (!eventTitle) {
      alert("Event title is required."); // Display an alert message
      return; // Exit the function if no title is provided
    }
    const generatedEvent = {
      eventTitle,
      eventRarity,
      selectedEventComponents,
      selectedConsequenceComponents,
      selectedSelectionMode,
      selectedPercentile,
      statRange,
      selectedStat,
      selectedStatChange,
      statChangeAmount,
      selectedDateRange: selectedDateRange.map((date) => date.toISOString()), // Serialize dates      activityStatus,
      itemRequirement,
      selectedCategoriesByType,
      // selectedCategories,
      selectedNewCategories,
      statChangeValue,
      activityChangeConsequence,
      selectedItemChange,
      selectedItemPercentile,
      // selectedCategoryChange,
      selectedCategoryChangeByType,
      eventDescription,
      consequenceDescription,
    };

    const updatedRandomEvents = _.cloneDeep(randomEvents);
    console.log(updatedRandomEvents);

    // Add the generatedEvent to the cloned array
    const newRandomEvents = [...updatedRandomEvents, generatedEvent];
    console.log("New Random Events:", newRandomEvents);

    dispatch(setStats({ randomEvents: newRandomEvents }));
    console.log("Updated Random Events:", randomEvents);
    resetState();
    setEventTitle("");
    setTitleCharCount(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Event Generator</h1>
      <div>
        <p>Event Title:</p>
        <Input
          placeholder="Enter event title"
          value={eventTitle}
          onChange={(e) => {
            const inputText = e.target.value;
            if (inputText.length <= 50) {
              setEventTitle(inputText);
              setTitleCharCount(inputText.length);
            }
          }}
        />

        <p>
          Character Limit: {titleCharCount}/{50}
        </p>
      </div>
      <Form>
        <Form.Item label="Select Event Rarity">
          <Select
            placeholder="Select event rarity"
            value={eventRarity}
            onChange={setEventRarity}
          >
            <Option value="common">Common</Option>
            <Option value="uncommon">Uncommon</Option>
            <Option value="rare">Rare</Option>
            <Option value="very-rare">Very Rare</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Select Mode">
          <Radio.Group
            value={selectedSelectionMode}
            onChange={(e) => {
              setSelectedSelectionMode(e.target.value);
              setSelectedPercentile(null); // Reset percentile selection
            }}
          >
            <Radio value="single">Single</Radio>
            <Radio value="multiple">Multiple</Radio>
          </Radio.Group>
        </Form.Item>

        {selectedSelectionMode === "multiple" && (
          <div>
            <p>Select Percentile:</p>
            <Radio.Group
              value={selectedPercentile}
              onChange={(e) => setSelectedPercentile(e.target.value)}
            >
              <Radio value="top5">Top 5%</Radio>
              <Radio value="top40">Top 40%</Radio>
              <Radio value="bottom50">Bottom 50%</Radio>
              <Radio value="random">Random</Radio>
            </Radio.Group>
          </div>
        )}

        <Form.Item label="Select Event Components">
          <Select
            mode="multiple"
            placeholder="Select event components"
            onChange={handleEventComponentChange}
            style={{ width: "100%" }}
          >
            {eventComponents.map((component) => (
              <Option key={component.key} value={component.key}>
                {component.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedEventComponents.includes("stat") && (
          <div>
            <p>Select Stat Check</p>
            <Select
              placeholder="Select stat to change"
              value={selectedStat}
              onChange={setSelectedStat}
            >
              {statsData.map((stat) => (
                <Option key={stat.id} value={stat.id}>
                  {stat.statName}
                </Option>
              ))}
            </Select>
            <p>Stat Range:</p>
            <Slider
              range
              min={0}
              max={100}
              value={statRange}
              onChange={setStatRange}
            />
          </div>
        )}
        {selectedEventComponents.includes("date") && (
          <div>
            <p>Date Range:</p>
            <DatePicker.RangePicker
              value={selectedDateRange}
              onChange={setSelectedDateRange}
            />
          </div>
        )}
        {selectedEventComponents.includes("activity") && (
          <div>
            <p>Activity Status:</p>
            <Radio.Group
              value={activityStatus}
              onChange={(e) => setActivityStatus(e.target.value)}
            >
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </div>
        )}
        {selectedEventComponents.includes("item") && (
          <div>
            <p>Item Requirement:</p>
            <Select
              mode="multiple"
              placeholder="Select items"
              value={itemRequirement}
              onChange={setItemRequirement}
            >
              {items.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        )}
        {selectedEventComponents.includes("category") && (
          <div>
            <p>Select Categories:</p>
            {uniqueTypes.map((type) => (
              <div key={type}>
                <p>{type}</p>
                <Select
                  mode="multiple"
                  placeholder={`Select ${type} categories`}
                  value={selectedCategoriesByType[type] || []}
                  onChange={(selected) =>
                    setSelectedCategoriesByType({
                      ...selectedCategoriesByType,
                      [type]: selected,
                    })
                  }
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {categories
                    .filter((category) => category.type === type)
                    .map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
              </div>
            ))}
          </div>
        )}
        {/* Description input for event */}
        <div>
          <p>Event Description:</p>
          <Input
            placeholder="Enter event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>

        <Form.Item label="Select Consequence Components">
          <Select
            mode="multiple"
            placeholder="Select consequence components"
            onChange={handleConsequenceComponentChange}
            style={{ width: "100%" }}
          >
            {consequenceComponents.map((component) => (
              <Option key={component.key} value={component.key}>
                {component.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedConsequenceComponents.includes("statChange") && (
          <div>
            <Select
              placeholder="Stat to be change"
              value={selectedStatChange}
              onChange={setSelectedStatChange}
            >
              {statsData.map((stat) => (
                <Option key={stat.id} value={stat.id}>
                  {stat.statName}
                </Option>
              ))}
            </Select>
            <p>Change Amount:</p>
            <InputNumber
              value={statChangeAmount}
              onChange={setStatChangeAmount}
              style={{ width: "100%" }}
            />
          </div>
        )}
        {selectedConsequenceComponents.includes("activityChange") && (
          <div>
            <p>Activity Change:</p>
            <Radio.Group
              value={activityChangeConsequence}
              onChange={(e) => setActivityChangeConsequence(e.target.value)}
            >
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </div>
        )}
        {selectedConsequenceComponents.includes("itemChange") && (
          <div>
            <p>Item Change:</p>
            <Select
              placeholder="Select item"
              value={selectedItemChange}
              onChange={(value) => {
                setSelectedItemChange(value);
                setSelectedItemPercentile(null); // Reset percentile selection
              }}
            >
              {items.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>

            {selectedItemChange && (
              <div>
                <p>Select Item Percentile:</p>
                <Radio.Group
                  value={selectedItemPercentile}
                  onChange={(e) => setSelectedItemPercentile(e.target.value)}
                >
                  <Radio value="top5">Top 5%</Radio>
                  <Radio value="top40">Top 40%</Radio>
                  <Radio value="bottom50">Bottom 50%</Radio>
                  <Radio value="random">Random</Radio>
                  {selectedSelectionMode === "multiple" && (
                    <Radio value="subject">Subject</Radio>
                  )}
                </Radio.Group>
              </div>
            )}
          </div>
        )}

        {selectedConsequenceComponents.includes("categoryChange") && (
          <div>
            <p>Category Change:</p>
            remove:
            {uniqueTypes.map((type) => (
              <div key={type}>
                <p>{type}</p>
                <Select
                  mode="multiple"
                  placeholder={`Select ${type} categories`}
                  value={selectedCategoryChangeByType[type] || []}
                  onChange={(selected) =>
                    setSelectedCategoryChangeByType({
                      ...selectedCategoryChangeByType,
                      [type]: selected,
                    })
                  }
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {categories
                    .filter((category) => category.type === type)
                    .map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>

                {selectedCategoryChangeByType[type] &&
                  selectedCategoryChangeByType[type].length > 0 && (
                    <div>
                      <p>Add:</p>
                      <Select
                        mode="multiple"
                        placeholder={`Select ${type} categories`}
                        options={categories
                          .filter((category) => category.type === type)
                          .map((category) => ({
                            label: category.name,
                            value: category.id,
                          }))
                          .filter(
                            (category) =>
                              !selectedCategoryChangeByType[type].includes(
                                category.value
                              )
                          )}
                        value={selectedNewCategories[type] || []}
                        onChange={(selected) => {
                          setSelectedNewCategories({
                            ...selectedNewCategories,
                            [type]: selected,
                          });
                        }}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      />
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        {/* Description input for consequence */}
        <div>
          <p>Consequence Description:</p>
          <Input
            placeholder="Enter consequence description"
            value={consequenceDescription}
            onChange={(e) => setConsequenceDescription(e.target.value)}
          />
        </div>

        <Button type="primary" onClick={generateEvent}>
          Generate Event
        </Button>
      </Form>
    </div>
  );
}

export default EventGenerator;
