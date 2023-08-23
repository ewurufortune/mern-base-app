import React, { useState } from 'react';
import { Select, Button, Form, Input, Slider, DatePicker, Radio, InputNumber } from 'antd';
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select;

const eventComponents = [
  { key: 'stat', label: 'Stat Range' },
  { key: 'date', label: 'Add Date Range' },
  { key: 'activity', label: 'Activity Status' },
  { key: 'item', label: 'Item Requirement' },
  { key: 'category', label: 'Select Category' },
];

const consequenceComponents = [
  { key: 'statChange', label: 'Stat Change' },
  { key: 'activityChange', label: 'Activity Change' },
  { key: 'itemChange', label: 'Item Change' },
  { key: 'categoryChange', label: 'Category Change' },
];

const statsData = [
    { id: 1, statName: 'Health' },
    { id: 2, statName: 'Strength' },
    { id: 3, statName: 'Agility' },
    // Add more stats as needed
  ];
function EventGenerator() {

     const categories = useSelector((state) => state.user.categories);
     const items = useSelector((state) => state.user.items);
     

  const [selectedEventComponents, setSelectedEventComponents] = useState([]);
  const [selectedConsequenceComponents, setSelectedConsequenceComponents] = useState([]);

  // State variables for recording selected options
  const [statRange, setStatRange] = useState([0, 100]);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [activityStatus, setActivityStatus] = useState('active');
  const [itemRequirement, setItemRequirement] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [statChangeValue, setStatChangeValue] = useState('');
  const [activityChangeType, setActivityChangeType] = useState('');
  const [selectedItemChange, setSelectedItemChange] = useState('');
  const [selectedCategoryChange, setSelectedCategoryChange] = useState([]);

  // Description inputs
  const [eventDescription, setEventDescription] = useState('');
  const [consequenceDescription, setConsequenceDescription] = useState('');

    // State variables for recording selected options
    const [selectedStat, setSelectedStat] = useState('');
    const [selectedStatChange, setSelectedStatChange] = useState('');

    const [statChangeAmount, setStatChangeAmount] = useState(0);
  
  const handleEventComponentChange = (selectedComponents) => {
    setSelectedEventComponents(selectedComponents);
  };

  const handleConsequenceComponentChange = (selectedComponents) => {
    setSelectedConsequenceComponents(selectedComponents);
  };


  const generateEvent = () => {
    const generatedEvent = {
      selectedEventComponents,
      selectedConsequenceComponents,
      statRange,
      selectedStat,
      selectedStatChange,
statChangeAmount,
      selectedDateRange,
      activityStatus,
      itemRequirement,
      selectedCategories,
      statChangeValue,
      activityChangeType,
      selectedItemChange,
      selectedCategoryChange,
      eventDescription,
      consequenceDescription,
    };

    console.log('Generated Event:', generatedEvent);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Event Generator</h1>
      <Form>
        <Form.Item label="Select Event Components">
          <Select
            mode="multiple"
            placeholder="Select event components"
            onChange={handleEventComponentChange}
            style={{ width: '100%' }}
          >
            {eventComponents.map((component) => (
              <Option key={component.key} value={component.key}>
                {component.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedEventComponents.includes('stat') && (
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
        {selectedEventComponents.includes('date') && (
          <div>
            <p>Date Range:</p>
            <DatePicker.RangePicker
              value={selectedDateRange}
              onChange={setSelectedDateRange}
            />
          </div>
        )}
        {selectedEventComponents.includes('activity') && (
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
        {selectedEventComponents.includes('item') && (
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
        {selectedEventComponents.includes('category') && (
          <div>
            <p>Select Category:</p>
            
            <Select
              mode="multiple"
              placeholder="Select categories"
              value={selectedCategories}
              onChange={setSelectedCategories}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
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
            style={{ width: '100%' }}
          >
            {consequenceComponents.map((component) => (
              <Option key={component.key} value={component.key}>
                {component.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedConsequenceComponents.includes('statChange') && (
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
              style={{ width: '100%' }}
            />
          </div>
        )}
        {selectedConsequenceComponents.includes('activityChange') && (
          <div>
            <p>Activity Change:</p>
            <Radio.Group
              value={activityChangeType}
              onChange={(e) => setActivityChangeType(e.target.value)}
            >
              <Radio value="increase">Increase</Radio>
              <Radio value="decrease">Decrease</Radio>
            </Radio.Group>
          </div>
        )}
        {selectedConsequenceComponents.includes('itemChange') && (
          <div>
            <p>Item Change:</p>
            <Select
              placeholder="Select item"
              value={selectedItemChange}
              onChange={setSelectedItemChange}
            >
              {items.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        )}
        {selectedConsequenceComponents.includes('categoryChange') && (
          <div>
            <p>Category Change:</p>
            <Select
              mode="multiple"
              placeholder="Select categories"
              value={selectedCategoryChange}
              onChange={setSelectedCategoryChange}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
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
