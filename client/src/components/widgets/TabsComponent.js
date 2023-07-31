import React from 'react';
import { Tabs } from 'antd';
import { PlayerStats } from "components/playerStats/PlayerStats";


const onChange = (key) => {
  console.log(key);
};
const playerInformation = [
  {
    key: '1',
    label: `Tab 1`,
    children: <PlayerStats />,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];
const TabComponent = () => <Tabs defaultActiveKey="1" items={playerInformation} onChange={onChange} />;
export default TabComponent;