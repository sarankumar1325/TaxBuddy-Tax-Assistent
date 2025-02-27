import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaBrain, FaArrowRight, FaLock } from 'react-icons/fa';
import { auth } from '../firebase';
import '../styles/Chat.css';

const Chat = () => {
  return (
    <div className="chat-page">
      <section className={`chat-navigation ${!auth.currentUser ? 'locked' : ''}`}>
        <div className="nav-boxes">
          {/* Tax Mentor Box */}
          <Link to="/tax-mentor" className="nav-box mentor">
            <FaUserGraduate className="nav-box-icon" />
            <h2>Tax Mentor</h2>
            <p>Get personalized tax guidance and learn from our expert tax mentoring system.</p>
            <FaArrowRight className="nav-arrow" />
          </Link>

          {/* Second Brain Box */}
          <Link to="/second-brain" className="nav-box brain">
            <FaBrain className="nav-box-icon" />
            <h2>Second Brain</h2>
            <p>Access our AI knowledge base for instant answers to all your tax queries.</p>
            <FaArrowRight className="nav-arrow" />
          </Link>
        </div>
        {!auth.currentUser && (
          <div className="lock-overlay">
            <FaLock className="lock-icon" />
            <p>Sign in to access chat features</p>
          </div>
        )}
      </section>

      {/* Rest of the chat interface */}
      {/* ...existing code... */}
    </div>
  );
};

export default Chat;
