import React, { useState } from 'react';
import { FaBell, FaCheck, FaTrash } from 'react-icons/fa';
import { auth } from '../firebase';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Tax Return Reminder",
      message: "Your tax return deadline is approaching in 2 weeks.",
      date: "2024-03-15",
      read: false,
      type: "reminder"
    },
    {
      id: 2,
      title: "New Tax Law Update",
      message: "Important changes to tax deductions for 2024.",
      date: "2024-03-10",
      read: false,
      type: "update"
    },
    {
      id: 3,
      title: "Document Upload Success",
      message: "Your W-2 form was successfully uploaded.",
      date: "2024-03-08",
      read: true,
      type: "success"
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1><FaBell /> Notifications</h1>
        {auth.currentUser && (
          <button onClick={markAllAsRead} className="mark-all-button">
            Mark all as read
          </button>
        )}
      </div>

      <div className="notifications-list">
        {!auth.currentUser || notifications.length === 0 ? (
          <div className="no-notifications">
            <FaBell size={40} />
            <p>No notifications at this time</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="action-button read-button"
                  >
                    <FaCheck />
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notification.id)}
                  className="action-button delete-button"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;