import React from 'react';
import '../styles/Chat.css';

const Chat = () => {
  return (
    <div className="page chat-page">
      <div className="chat-sidebar">
        <h3>Recent Chats</h3>
        <ul className="chat-list">
          <li>Tax Expert 1</li>
          <li>Tax Expert 2</li>
        </ul>
      </div>
      <div className="chat-messages">
        <div className="message received">
          <p>Hello! How can I help you today?</p>
        </div>
        <div className="message sent">
          <p>I need help with my tax calculations</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
