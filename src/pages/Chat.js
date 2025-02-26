import React, { useState, useRef } from 'react';
import { FaPlus, FaPaperPlane, FaFile, FaEdit, FaTrash, FaBars, FaTimes, FaSync } from 'react-icons/fa';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, 
        { type: 'user', content: inputMessage },
        { type: 'bot', content: 'Thank you for your question. I am processing your request...' }
      ]);
      setInputMessage('');
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className={`chat-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn">
            <FaPlus /> New Chat
          </button>
        </div>
        <div className="chat-history">
          {/* Chat history items */}
          <div className="history-item">Previous Tax Calculation</div>
          <div className="history-item">Deduction Analysis</div>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h2>Tax Analysis Chat</h2>
          <button className="refresh-btn">
            <FaSync />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.content}
              </div>
              {message.type === 'user' && (
                <div className="message-actions">
                  <button className="action-btn"><FaEdit /></button>
                  <button className="action-btn"><FaTrash /></button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              rows="1"
            />
            <div className="input-actions">
              <button className="action-icon">
                <FaFile />
              </button>
              <button 
                className="action-icon"
                onClick={handleSend}
                disabled={!inputMessage.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
