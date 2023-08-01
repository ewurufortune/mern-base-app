import React from 'react';
import { Tabs } from 'antd';
import { PlayerStats } from "components/playerStats/PlayerStats";
import TabComponent from './tabsComponent/TabsComponent';
import Game from './NewApproach';
import { setActiveTab } from 'state';
import { useSelector, useDispatch } from "react-redux";

const onChange = (key) => {
};


const playerInformation = [
  {
    key: '1',
    label: `Tab 1`,
    children: <Game />,
  },
  {
    key: '2',
    label: `Player`,
    children: <TabComponent />,
  },
  {
    key: '3',
    label: `Schedule Activities`,
    children: `schedule activities with available wrestler`,
  },
  {
    key: '4',
    label: `Other Companies`,
    children: `collapse of current wrestler table & popularity, along with their active feuds & champions, also add a joinCompany offer`,
  },
  {
    key: '5',
    label: `Awards & Rankings`,
    children: `selectable list of award winners by year, `,
  },
];


export default function OverallTab() {
  const activeTab = useSelector((state) => state.activeTab);
  
  return (
    <Tabs defaultActiveKey="1" items={playerInformation} onChange={onChange} activeKey={activeTab} /> )
}



// make tab 1 disabled. put a button in tab 1 that when pressed will take the user to tab one and disable others . then in my Game component add a done button that reverses the process. and takes me back to tab 3 . with the remaining tabs being enabled and tab 1 being disabled.