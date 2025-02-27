import React from 'react';
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
          {/* Chat interface will be implemented here */}
          <div className="chat-placeholder">
            <h2>Welcome to Tax Mentor</h2>
            <p>Start your conversation with our tax expert system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxMentor;