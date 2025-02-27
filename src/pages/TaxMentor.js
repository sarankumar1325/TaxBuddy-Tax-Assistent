import React, { useEffect } from 'react';
import '../styles/TaxMentor.css';
import { FaUserGraduate, FaChartLine, FaFileAlt } from 'react-icons/fa';

const TaxMentor = () => {
  return (
    <div className="tax-mentor-page">
      <header className="mentor-header">
        <div className="mentor-header-content">
          <div className="header-icon-container">
            <FaUserGraduate className="mentor-icon" />
          </div>
          <h1>Welcome to Tax Mentor</h1>
          <p className="header-description">Your personal AI tax assistant is here to help you navigate through complex tax matters</p>
          <div className="feature-badges">
            <div className="badge">
              <FaChartLine />
              <span>Smart Analysis</span>
            </div>
            <div className="badge">
              <FaFileAlt />
              <span>Tax Guidance</span>
            </div>
            <div className="badge">
              <FaUserGraduate />
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mentor-content">
        <div className="mentor-chat-interface">
          <iframe
            src="https://app.vectorshift.ai/chatbots/embedded/67bfecd26c05da5fcc3f95d5?openChatbot=true"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
            allow="clipboard-read; clipboard-write; microphone"
          />
        </div>
      </div>
    </div>
  );
};

export default TaxMentor;