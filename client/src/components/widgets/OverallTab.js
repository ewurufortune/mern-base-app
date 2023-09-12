import React from "react";
import { Tabs, Badge } from "antd";
import TabComponent from "./tabsComponent/TabsComponent";
import { setStats } from "state";
import { useSelector, useDispatch } from "react-redux";
import UserActions from "./UserActions";
import Editor from "./Editor/Editor";
import MainLogs from "./mainLogs/MainLogs";
import RandomEvents from "./randomEvents/RelationshipEvents";
import EventGenerator from "./randomEvents/EventGenerator";
import TriggerRandomEvent from "./randomEvents/TriggerRandomEvent";
import EventNotifications from "./randomEvents/EventNotification";
import RelationshipEvents from "./randomEvents/RelationshipEvents";
import CreatePost from "components/feed/CreatePost";
import Feed from "components/feed/ViewPosts";

const onChange = (key) => {};

const playerInformation = [
  {
    key: "7",
    label: `CREATE Posts`,
    children: (
      <>
        <CreatePost />
      </>
    ),
  },
  {
    key: "8",
    label: `Feed`,
    children: (
      <>
        <Feed />
      </>
    ),
  },
  {
    key: "1",
    label: `Tab 1`,
    children: (
      <>
        <TriggerRandomEvent />

        <UserActions />
      </>
    ),
  },
  {
    key: "2",
    label: `Player`,
    children: <MainLogs />,
  },
  {
    key: "3",
    label: `Editor`,
    children: <Editor />,
  },
  {
    key: "4",
    label: `Random Events`,
    children: (
      <>
        <RandomEvents />
        <EventGenerator />
      </>
    ),
  },
  {
    key: "5",
    label: (
      <span>
        Events <Badge count={5} /> {/* You can set the count dynamically */}
      </span>
    ),
    children: (
      <>
        <TriggerRandomEvent />
        <EventNotifications />
      </>
    ),
  },
  {
    key: "6",
    label: `relationship  Events`,
    children: (
      <>
        <RelationshipEvents />
      </>
    ),
  },
];

export default function OverallTab() {
  const activeTab = useSelector((state) => state.activeTab);

  return (
    <Tabs
      defaultActiveKey="1"
      items={playerInformation}
      onChange={onChange}
      activeKey={activeTab}
    />
  );
}

// make tab 1 disabled. put a button in tab 1 that when pressed will take the user to tab one and disable others . then in my Game component add a done button that reverses the process. and takes me back to tab 3 . with the remaining tabs being enabled and tab 1 being disabled.
