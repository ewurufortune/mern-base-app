import React from 'react';
import { Tabs } from 'antd';
import { PlayerStats } from "components/playerStats/PlayerStats";
import TabComponent from './TabsComponent';
import Game from './NewApproach';

const onChange = (key) => {
  console.log(key);
};
const playerInformation = [
  {
    key: '1',
    label: `Tab 1`,
    children: <Game />,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: <TabComponent />,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Overall Tab Pane 3`,
  },
];
const OverallTab = () => <Tabs defaultActiveKey="1" items={playerInformation} onChange={onChange} />;
export default OverallTab;

// make tab 1 disabled. put a button in tab 1 that when pressed will take the user to tab one and disable others . then in my Game component add a done button that reverses the process. and takes me back to tab 3 . with the remaining tabs being enabled and tab 1 being disabled.