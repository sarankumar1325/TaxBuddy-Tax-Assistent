import React, { useState } from 'react';
import { FaUser, FaBell, FaShieldAlt, FaFileAlt, FaCreditCard, FaLanguage } from 'react-icons/fa';
import '../styles/Setting.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState({
    notifications: {
      taxDeadlines: true,
      documentReminders: true,
      lawUpdates: true,
      marketingEmails: false
    },
    privacy: {
      dataSharing: false,
      automaticBackup: true,
      twoFactorAuth: false
    },
    taxPreferences: {
      filingStatus: 'single',
      taxYear: '2024',
      stateFilings: ['CA']
    },
    displayPreferences: {
      language: 'English',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const tabs = [
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'tax', icon: <FaFileAlt />, label: 'Tax Preferences' },
    { id: 'privacy', icon: <FaShieldAlt />, label: 'Privacy & Security' },
    { id: 'display', icon: <FaUser />, label: 'Display' }
  ];

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <div className="settings-options">
              <div className="settings-option">
                <label>Tax Deadlines Alerts</label>
                <input
                  type="checkbox"
                  checked={settings.notifications.taxDeadlines}
                  onChange={(e) => handleSettingChange('notifications', 'taxDeadlines', e.target.checked)}
                />
              </div>
              <div className="settings-option">
                <label>Document Submission Reminders</label>
                <input
                  type="checkbox"
                  checked={settings.notifications.documentReminders}
                  onChange={(e) => handleSettingChange('notifications', 'documentReminders', e.target.checked)}
                />
              </div>
              <div className="settings-option">
                <label>Tax Law Updates</label>
                <input
                  type="checkbox"
                  checked={settings.notifications.lawUpdates}
                  onChange={(e) => handleSettingChange('notifications', 'lawUpdates', e.target.checked)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div className="settings-section">
            <div className="settings-options">
              <div className="settings-option">
                <label>Filing Status</label>
                <select
                  value={settings.taxPreferences.filingStatus}
                  onChange={(e) => handleSettingChange('taxPreferences', 'filingStatus', e.target.value)}
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="marriedSeparate">Married Filing Separately</option>
                  <option value="headOfHousehold">Head of Household</option>
                </select>
              </div>
              <div className="settings-option">
                <label>Tax Year</label>
                <select
                  value={settings.taxPreferences.taxYear}
                  onChange={(e) => handleSettingChange('taxPreferences', 'taxYear', e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="settings-section">
            <div className="settings-options">
              <div className="settings-option">
                <label>Two-Factor Authentication</label>
                <input
                  type="checkbox"
                  checked={settings.privacy.twoFactorAuth}
                  onChange={(e) => handleSettingChange('privacy', 'twoFactorAuth', e.target.checked)}
                />
              </div>
              <div className="settings-option">
                <label>Automatic Data Backup</label>
                <input
                  type="checkbox"
                  checked={settings.privacy.automaticBackup}
                  onChange={(e) => handleSettingChange('privacy', 'automaticBackup', e.target.checked)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'display' && (
          <div className="settings-section">
            <div className="settings-options">
              <div className="settings-option">
                <label>Language</label>
                <select
                  value={settings.displayPreferences.language}
                  onChange={(e) => handleSettingChange('displayPreferences', 'language', e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
              <div className="settings-option">
                <label>Date Format</label>
                <select
                  value={settings.displayPreferences.dateFormat}
                  onChange={(e) => handleSettingChange('displayPreferences', 'dateFormat', e.target.value)}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
