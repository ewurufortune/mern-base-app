import React from 'react';
import { Collapse } from 'antd';
const guide = (
  <div  className="tabContent" style={{ padding: '0 0%' }}>
    <h1 style={{ color: '#9EDDFF' }}>User Guide</h1>
    <h2>Booking Segments</h2>
    <p>
      Events can be booked in the 'Book Event' Tab, which is the first place the game takes you when you log in. By default, there is an already-open segment card.
    </p>
    <p>
      'Date' indicates the current date in your save.
    </p>
    <p>
      Select the participants involved by clicking on them. You can search, sort, and filter participants based on various selections of your own making (via the Editor) and choosing. These filters also serve to categorize your stories so that they can easily be organized, rowdiness removed, and events involving them can be followed.
    </p>
    <p>
      Enter the Title for the event and creatively write out its description.
    </p>
    <p>
     Select how each participant is affected by the described events by specfying stat changes.
    </p>
    <p>
      Transfer Items/Titles between participants when a Holder is a selected participant.
    </p>
    <p>
      Indicate the duration of the events by using the time module.
    </p>
    <p>
      After the 'End Event' button is pressed, the segments panel will be removed, and you can choose to add another by clicking the 'Book Events' button, or you can check out the 'Reader Tab' to view your logs.
    </p>

    <h2>Reader Tab</h2>
    <p>
      The Reader tab is where you can read and review your events and those of others. Follow specific storylines based on the categories you have.
    </p>
    <p>
      Click on the 'See what others have published' header to reveal a panel that contains the top 10 in their respective categories. Click on one to see a preview.
    </p>
    <p>
      When previewing an option, tap on 'View Post,' and you will notice that your data (Participants, Items, Stat Perception, Main Logs, etc.) will temporarily be replaced by the post you review. This means that you can now read that poster's stories with a better understanding because of the access you have to their participants, items, categories, etc. It is easier to understand what's important in the context of the poster's story. You can then follow specific histories by filtering by categories and specific participants.
    </p>
    <p>
      NB: It is possible to copy the previewed save's category, participants, and items. This will permanently replace yours.
    </p>
    <p>
      You can, of course, publish and update your save by pushing the 'Publish My Save' button.
    </p>

    <h2>The Editor</h2>
    <p>
      The Editor Tab is where you can add, modify, and delete elements of the save. Double-tap on a cell to edit its value/name. Most changes will be reflected in your save immediately. Changes automatically save after you edit, but if you notice it doesn't, manually click the 'Save' button at the top right of the screen.
    </p>

    <h2>Random Events & The Event Generator</h2>
    <p>
      'Random Events' is a feature used to bring a tiny bit of life to the writer's world. If they interrupt too much or you find that they are not working, you can simply delete all the relationships and random events in the editor tab.
    </p>
    <p>
      Relationship Events as of now aren't currently modifiable, but you can create custom random events in the Event Generator Tab.
    </p>
    <p>
      <strong>USING THE EVENT GENERATOR:</strong> The event Generator is divided into two parts: 1. Requirements (conditions to be met before the event can occur) 2. Consequences (The Changes to the involved participant(s) when these events happen.)
    </p>
    <p>
      The event text (that indicates when an event has happened) will appear in the Notifications Tab. The body of the event text is generated by combining the: Event Description + Affected Participant (computer-selected) + Consequences Description.
    </p>
  </div>
);

const aim = (
  <div  className="tabContent" style={{ padding: '0 0%' }}>
    <h1 style={{ color: '#9EDDFF' }}>Work In Progress</h1>
    <p>
      Ultimately, I'm creating this web app to address my own pain points as a reader and wrestling aficionado. In the nearest future (I hope), it will serve as a platform for creating and reading fantasy bookings in a way that enables both the reader and creator to explore a wider range of stories in one place without the loss of context that long bookings often suffer from.
    </p>

    <h2>Features</h2>

<ul>
  <li>
    <h2>Custom Stats Tracking</h2>
    <p><strong>Pain Point:</strong> Wrestling with spreadsheets or trying to remember all the critical statistics and data for fantasy booking was a hassle.</p>
    <p><strong>Solution:</strong> WorldBooker allows you to effortlessly create, manage, and update custom statistics. No more data headaches – focus on your story, and it'll handle the stats for you. Plus, it's not just for fantasy booking – you can use it to plan and track storylines for your other favorite games too!</p>
  </li>

  <li>
    <h2>Flexible Sandbox Environment</h2>
  
    <p>WorldBooker aims to provide an extensive sandbox environment, preserving your creative freedom. You can shape your world the way you envision it while maintaining a logical structure for your narratives.</p>
  </li>

  <li>
    <h2>Tags for Storylines</h2>
    <p><strong>Pain Point:</strong> Keeping track of complex storylines can be challenging and confusing.</p>
    <p><strong>Solution:</strong> WorldBooker offers a tagging system that simplifies storyline management. Organize and label your storylines, making it easy to follow and track the intricate narratives you're weaving.</p>
  </li>

  <li>
    <h2>Inspiration Hub</h2>
    <p><strong>Pain Point:</strong> Struggling to find inspiration for your next storyline?</p>
    <p><strong>Solution:</strong> Explore the worlds crafted by others, and in turn, share your creations to inspire fellow enthusiasts. WorldBooker serves as a wellspring of creativity, ensuring you're never short on imaginative ideas.</p>
  </li>

 
</ul>

<p>
  WorldBooker came to life because I was tired of the restrictions on other platforms. I just wanted a simple space where everyone could let their creativity flow and work together. Now, I'm thrilled to share that space with you.
</p>

    <p style={{ color: '#9EDDFF' }}>Still Growing</p>
    <p>
      As a solo indie dev, I'm constantly tinkering under the hood. I'm listening to your feedback, adding cool new features, and fine-tuning everything. But, I'll keep this ship sailing only if you see potential in what I'm doing. If you do think I'm onto something and wish to contribute to its growth, consider buying me a coffee. Your support ensures that we can keep making WorldBooker the best it can be.
    </p>

    <p>Thanks for being part of this indie adventure. Buckle up, my friend, because we're about to embark on some incredible storytelling journeys together.</p>
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