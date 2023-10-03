import React from 'react';
import { Collapse } from 'antd';
const guide = (
<div style={{ padding: '0 0%' }}>
  <h1 style={{ color: '#9EDDFF' }}>Lorem Ipsum</h1>
  <p style={{ color: '#9EDDFF' }}>Booking Segments</p>
  <p style={{ paddingLeft: 24 }}>
    Events can be booked in the 'Book Event' Tab, which is the first place the game takes you when you log in.
    By default, there is an already-open segment card.
  </p>
  <p style={{ paddingLeft: 24 }}>
    'Date' indicates the current date in your save.
  </p>
  <p style={{ paddingLeft: 24 }}>
    Select the participants involved by clicking on them. You can search, sort, and filter participants based on various selections of your own making (via the Editor) and choosing. These filters also serve to categorize your stories so that they can easily be organized, rowdiness removed, and events involving them can be followed.
  </p>
  <p style={{ paddingLeft: 24 }}>
    Enter the Title for the event and creatively write out its description.
  </p>
  <p style={{ paddingLeft: 24 }}>
    Transfer Items/Titles between participants when a Holder is a selected participant.
  </p>
  <p style={{ paddingLeft: 24 }}>
    Indicate the duration of the events by using the time module.
  </p>
  <p style={{ paddingLeft: 24 }}>
    After the 'End Event' button is pressed, the segments panel will be removed, and you can choose to add another by clicking the 'Book Events' button, or you can check out the 'Reader Tab' to view your logs.
  </p>
  <p style={{ color: '#9EDDFF' }}>Reader Tab</p>
  <p style={{ paddingLeft: 24 }}>
    The Reader tab is where you can read and review your events and those of others. Follow specific storylines based on the categories you have.
  </p>
  <p style={{ paddingLeft: 24 }}>
    Click on the 'See what others have published' header to reveal a panel that contains the top 10 in their respective categories. Click on one to see a preview.
  </p>
  <p style={{ paddingLeft: 24 }}>
    When previewing an option, tap on 'View Post,' and you will notice that your data (Participants, Items, Stat Perception, Main Logs, etc.) will temporarily be replaced by the post you review. This means that you can now read that poster's stories with a better understanding because of the access you have to their participants, items, categories, etc. It is easier to understand what's important in the context of the poster's story. You can then follow specific histories by filtering by categories and specific participants.
  </p>
  <p style={{ paddingLeft: 24 }}>
    NB: It is possible to copy the previewed save's category, participants, and items. This will permanently replace yours.
  </p>
  <p style={{ paddingLeft: 24 }}>
    You can, of course, publish and update your save by pushing the 'Publish My Save' button.
  </p>
  <p style={{ color: '#9EDDFF' }}>The Editor</p>
  <p style={{ paddingLeft: 24 }}>
    The Editor Tab is where you can add, modify, and delete elements of the save. Double-tap on a cell to edit its value/name. Most changes will be reflected in your save immediately. Changes automatically save after you edit, but if you notice it doesn't, manually click the 'Save' button at the top right of the screen.
  </p>
  <p style={{ color: '#9EDDFF' }}>Random Events & The Event Generator</p>
  <p style={{ paddingLeft: 24 }}>
    'Random Events' is a feature used to bring a tiny bit of life to the writer's world. If they interrupt too much or you find that they are not working, you can simply delete all the relationships and random events in the editor tab.
  </p>
  <p style={{ paddingLeft: 24 }}>
    Relationship Events as of now aren't currently modifiable, but you can create custom random events in the Event Generator Tab.
  </p>
  <p style={{ paddingLeft: 24 }}>
    USING THE EVENT GENERATOR:
    The event Generator is divided into two parts:
    1. Requirements (conditions to be met before the event can occur)
    2. Consequences (The Changes to the involved participant(s) when these events happen.)
  </p>
  <p style={{ paddingLeft: 24 }}>
    The event text (that indicates when an event has happened) will appear in the Notifications Tab. The body of the event text is generated by combining the: Event Description + Affected Participant (computer-selected) + Consequences Description.
  </p>
</div>
 );
  

 const aim = (
  <div style={{ padding: '0 0%' }}>
    <h1 style={{ color: '#9EDDFF' }}>Lorem Ipsum</h1>
    <p style={{ color: '#9EDDFF' }}>Booking Segments</p>
    <p style={{ paddingLeft: 24 }}>
    Ultimately i'm creating this web app to --in the nearest future (i hope)- serve a platform to create and read fantasy bookings, in a way that enables both the reader and creator explore a wider range of storylines in one place. 
    </p>

  </div>
   );
    
  const items = [
    {
      key: '1',
      label: <h2>Guide</h2>,
      children: <div style={{ padding: '0 10%' }}>{guide}</div>,
    },
    {
      key: '2',
      label: <h2>The Ultimate Aim of BookBoard</h2>,
      children: <div style={{ padding: '0 10%' }}>{aim}</div>,
    },
  ];
  
  const About = () => (
    <div style={{ padding: '0 20%' }}>
      <Collapse items={items} bordered={false} />
    </div>
  );
  
export default About;