import React, {useState, useEffect} from "react";
import { Tabs, Badge, Button, message, theme, ConfigProvider, Card } from "antd";
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
import './OverallTab.css'
const onChange = (key) => {};

const playerInformation = [
  // {
  //   key: "7",
  //   label: `CREATE Posts`,
  //   children: (
  //     <>
  //       <CreatePost />
  //     </>
  //   ),
  // },
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
        <RelationshipEvents />

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


export default function OverallTab({isDarkMode}) {
  const activeTab = useSelector((state) => state.activeTab);
  const recentEvents = useSelector((state) => state.user.recentEvents);
  const user = useSelector((state) => state.user);



  const [unreadCount, setUnreadCount] = useState(0);
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
    };
  
    try {
      // Display loading message
      messageApi.loading({ content: 'Replacing data...', key: 'replaceUserMessage' });
  
      const response = await fetch("http://localhost:3001/auth/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      const data = await response.json();
  
      // Display success message
      messageApi.success({ content: 'Data replaced successfully!', key: 'replaceUserMessage' });
  
      console.log(data);
    } catch (error) {
      // Display error message
      messageApi.error({ content: 'Failed to replace data!', key: 'replaceUserMessage' });
      console.error("Error replacing user:", error);
    }
  };
  
  const operations = {
    right: <Button className="save-game-button" onClick={() => replaceUser(user)}>SAVE GAME</Button>,
  };
  
  
  useEffect(() => {
    // Calculate the number of unread events
    const countUnread = recentEvents.reduce((count, event) => {
      if (!event.isRead) {
        return count + 1;
      }
      return count;
    }, 0);

    // Update the unread count in state
    setUnreadCount(countUnread);
  }, [recentEvents]); // Re-run this effect whenever recentEvents changes

  // Create a dynamic entry for Events with the unread count
  const eventsEntry = {
    key: "5",
    label: (
      <span>
        Events <Badge count={unreadCount} />
      </span>
    ),
    children: (
      <>
        <TriggerRandomEvent />
        <EventNotifications />
      </>
    ),
  };

  // Replace the existing "Events" entry with the dynamic one
  const updatedPlayerInformation = playerInformation.map((entry) => {
    if (entry.key === "5") {
      return eventsEntry;
    }
    return entry;
  });

  return (
<ConfigProvider
      
    >
     <Card
        bordered={false}
        theme={isDarkMode ? "Light" : "Dark"}
        style={{
          width: "100vw",
          height:'100vw'
        }}
      >
  
    {contextHolder}
    <Tabs
  defaultActiveKey="1"
  items={updatedPlayerInformation}
  onChange={onChange}
  activeKey={activeTab}
  tabBarExtraContent={operations}
  style={{ height: '100vw', overflow: 'auto' }}
/>


    </Card>
    </ConfigProvider >
    
  );
}



