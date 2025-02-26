import React from 'react';
import '../styles/Setting.css';

const Settings = () => {
  return (
    <div className="page settings-page">
      <h1>Settings</h1>
      <div className="settings-grid">
        <div className="settings-section">
          <h3>Account Settings</h3>
          <div className="settings-option">
            <label>Email Notifications</label>
            <input type="checkbox" />
          </div>
          <div className="settings-option">
            <label>Two-Factor Authentication</label>
            <input type="checkbox" />
          </div>
        </div>
        <div className="settings-section">
          <h3>Privacy Settings</h3>
          <div className="settings-option">
            <label>Profile Visibility</label>
            <select>
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
