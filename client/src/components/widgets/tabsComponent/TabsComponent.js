import React from 'react';
import { Tabs } from 'antd';


const onChange = (key) => {
  // console.log(key);
};
const playerInformation = [
  {
    key: '1',
    label: `Player Stats (include friends&enemies)`,
    children: 'Nothing some',
  },
  {
    key: '2',
    label: `Active Feuds`,
    children: `Contains Info on Active Feuds & other Feuds in the company`,
  },
  {
    key: '3',
    label: `Potential Storyline`,
    children: `Info on potential feuds & who the company is high on`,
  },
];
const TabComponent = () => <Tabs defaultActiveKey="1" items={playerInformation} onChange={onChange} />;
export default TabComponent;