import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import './EventNotification.css';
import { setStats } from 'state';
import { Tag } from 'antd';

const EventNotifications = () => {
  const dispatch = useDispatch();

  const recentEventsReadOnly = useSelector((state) => state.user.recentEvents);
  const recentEvents = _.cloneDeep(recentEventsReadOnly);

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // No need to set eventsList, use recentEvents directly
  }, [recentEvents]);

  const handleEventClick = (event) => {
    if (!event.isRead) {
      // Mark the event as read if it's unread
      const updatedEventsList = recentEvents.map((ev) =>
        ev.id === event.id ? { ...ev, isRead: true } : ev
      );
      dispatch(setStats({ recentEvents: updatedEventsList }));
    }
    setSelectedEvent(event);
  };

  const handleDeleteEvent = () => {
    // Delete the currently viewed recent event
    if (selectedEvent) {
      const updatedEventsList = recentEvents.filter((event) => event.id !== selectedEvent.id);
      dispatch(setStats({ recentEvents: updatedEventsList }));
      setSelectedEvent(null);
    }
  };

  const markAsUnread = () => {
    // Mark the currently viewed event as unread
    if (selectedEvent) {
      const updatedEventsList = recentEvents.map((event) => {
        if (event.id === selectedEvent.id) {
          return { ...event, isRead: false };
        }
        return event;
      });
      dispatch(setStats({ recentEvents: updatedEventsList }));
      setSelectedEvent({ ...selectedEvent, isRead: false });
    }
  };
  
  const markAllAsRead = () => {
    const updatedEventsList = recentEvents.map((event) => ({
      ...event,
      isRead: true,
    }));
    dispatch(setStats({ recentEvents: updatedEventsList }));
    setSelectedEvent(null);
  };

  const clearAll = () => {
    dispatch(setStats({ recentEvents: [] }));
    setSelectedEvent(null);
  };

  return (
    <div className="event-container">
      <div className="event-list">
        <div className="action-buttons">
        <Tag>{recentEvents.length} Messages</Tag>
        <Tag color="red">Unread: {recentEvents.filter((event) => !event.isRead).length}</Tag>
          <button onClick={markAllAsRead}>Mark All as Read</button>
          <button onClick={clearAll}>Clear All</button>
        </div>
        <ul  style={{maxHeight:'300px',minHeight:'300px', overflow:'auto'}}>
        {recentEvents.slice().reverse().map((event) => (
  <li
    key={event.id}
    onClick={() => handleEventClick(event)}
    className={event.isRead ? 'read' : 'unread'}
  >
    <div className="scrollable-title-box">
      <div>{event.title}</div> {/* Apply the scrollable-title class */}
    </div>
    {!event.isRead && <span className="dot" />}
  </li>
))}

</ul>
{/* style={{maxHeight:'100px', overflow:'hidden'}} */}

</div>
  {selectedEvent && (
    <div>
      <h2>{selectedEvent.title}</h2>
      {/* Use dangerouslySetInnerHTML to render line breaks */}
      <p dangerouslySetInnerHTML={{ __html: selectedEvent.description.replace(/\n/g, '<br>') }}></p>
      {!selectedEvent.isRead && (
        <button onClick={markAsUnread}>Mark as Unread</button>
      )}
      <button onClick={handleDeleteEvent}>Delete</button>
    </div>
  )}
</div>

  );
};

export default EventNotifications;
