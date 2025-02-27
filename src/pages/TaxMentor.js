import React, { useEffect } from 'react';
import '../styles/TaxMentor.css';
import { FaUserGraduate, FaChartLine, FaFileAlt } from 'react-icons/fa';

const TaxMentor = () => {
  return (
    <div className="tax-mentor-page">
      <header className="mentor-header">
        <div className="mentor-header-content">
          <FaUserGraduate className="mentor-icon" />
          <h1>Tax Mentor</h1>
          <p>Get personalized guidance from our expert tax mentoring system</p>
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