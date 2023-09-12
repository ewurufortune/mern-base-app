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

  const markAsRead = () => {
    // Mark the currently viewed event as read
    if (selectedEvent) {
      const updatedEventsList = recentEvents.map((event) => {
        if (event.id === selectedEvent.id) {
          return { ...event, isRead: true };
        }
        return event;
      });
      dispatch(setStats({ recentEvents: updatedEventsList }));
      setSelectedEvent({ ...selectedEvent, isRead: true });
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
  {recentEvents.map((event) => (
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
      <div style={{maxHeight:'350px',minHeight:'350px', overflow:'auto'}} className="event-description">
        {selectedEvent && (
          <div >
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            {!selectedEvent.isRead && (
              <button onClick={markAsRead}>Mark as Read</button>
            )}
            <button onClick={handleDeleteEvent}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventNotifications;
