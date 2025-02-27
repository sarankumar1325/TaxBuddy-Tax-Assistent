import React, { useState } from 'react';
import { 
  FaUser, FaBell, FaShieldAlt, FaFileAlt, FaPalette, FaDatabase, FaHeadset, FaBook, FaQuestionCircle
} from 'react-icons/fa';
import '../styles/Setting.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('tax');
  const [settings, setSettings] = useState({
    taxPreferences: {
      filingStatus: 'single',
      incomeSources: ['salary'],
      taxSavingGoals: ['maximize_deductions'],
      filingMethod: 'assisted',
      region: 'IN'
    },
    notifications: {
      filingReminders: true,
      lawUpdates: true,
      refundAlerts: true
    },
    display: {
      theme: 'light',
      language: 'English'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30'
    },
    privacy: {
      dataRetention: '12months',
      dataSharing: false
    }
  });

  const tabs = [
    { id: 'tax', icon: <FaFileAlt />, label: 'Tax Preferences' },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications' },
    { id: 'display', icon: <FaPalette />, label: 'Display' },
    { id: 'security', icon: <FaShieldAlt />, label: 'Security' },
    { id: 'privacy', icon: <FaDatabase />, label: 'Privacy' },
    { id: 'help', icon: <FaHeadset />, label: 'Help & Support' }
  ];

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const renderTaxPreferences = () => (
    <div className="settings-section">
      <h3>Tax Filing Preferences</h3>
      <div className="settings-options">
        <div className="settings-option">
          <label>Filing Status</label>
          <select
            value={settings.taxPreferences.filingStatus}
            onChange={(e) => handleSettingChange('taxPreferences', 'filingStatus', e.target.value)}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="business">Business</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>

        <div className="settings-option">
          <label>Income Sources</label>
          <div className="checkbox-group">
            {['Salary', 'Freelance', 'Investments', 'Rental'].map(source => (
              <label key={source} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.taxPreferences.incomeSources.includes(source.toLowerCase())}
                  onChange={(e) => {
                    const newSources = e.target.checked
                      ? [...settings.taxPreferences.incomeSources, source.toLowerCase()]
                      : settings.taxPreferences.incomeSources.filter(s => s !== source.toLowerCase());
                    handleSettingChange('taxPreferences', 'incomeSources', newSources);
                  }}
                />
                {source}
              </label>
            ))}
          </div>
        </div>

        <div className="settings-option">
          <label>Tax Saving Goals</label>
          <select
            value={settings.taxPreferences.taxSavingGoals}
            onChange={(e) => handleSettingChange('taxPreferences', 'taxSavingGoals', e.target.value)}
          >
            <option value="maximize_deductions">Maximize Deductions</option>
            <option value="optimize_refunds">Optimize Refunds</option>
            <option value="minimize_liability">Minimize Tax Liability</option>
          </select>
        </div>

        <div className="settings-option">
          <label>Filing Method</label>
          <select
            value={settings.taxPreferences.filingMethod}
            onChange={(e) => handleSettingChange('taxPreferences', 'filingMethod', e.target.value)}
          >
            <option value="manual">Manual Filing</option>
            <option value="assisted">Assisted Filing</option>
            <option value="automated">Automated Filing</option>
          </select>
        </div>

        <div className="settings-option">
          <label>Region</label>
          <select
            value={settings.taxPreferences.region}
            onChange={(e) => handleSettingChange('taxPreferences', 'region', e.target.value)}
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="CN">China</option>
            <option value="BR">Brazil</option>
            <option value="others">Others</option>
          </select>
          {settings.taxPreferences.region === 'others' && (
            <input
              type="text"
              placeholder="Enter your region"
              value={settings.taxPreferences.customRegion || ''}
              onChange={(e) => handleSettingChange('taxPreferences', 'customRegion', e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="settings-section">
      <h3>Notification Preferences</h3>
      <div className="settings-options">
        <div className="settings-option">
          <label>Tax Filing Reminders</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.notifications.filingReminders}
              onChange={(e) => handleSettingChange('notifications', 'filingReminders', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-option">
          <label>Tax Law Updates</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.notifications.lawUpdates}
              onChange={(e) => handleSettingChange('notifications', 'lawUpdates', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-option">
          <label>Refund Status Alerts</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.notifications.refundAlerts}
              onChange={(e) => handleSettingChange('notifications', 'refundAlerts', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDisplay = () => (
    <div className="settings-section">
      <h3>Display Settings</h3>
      <div className="settings-options">
        <div className="settings-option">
          <label>Theme</label>
          <select
            value={settings.display.theme}
            onChange={(e) => handleSettingChange('display', 'theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="settings-option">
          <label>Language</label>
          <select
            value={settings.display.language}
            onChange={(e) => handleSettingChange('display', 'language', e.target.value)}
          >
            <option value="English">English</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="settings-section">
      <h3>Security Settings</h3>
      <div className="settings-options">
        <div className="settings-option">
          <label>Two-Factor Authentication</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-option">
          <label>Session Timeout (minutes)</label>
          <select
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="settings-section">
      <h3>Privacy Settings</h3>
      <div className="settings-options">
        <div className="settings-option">
          <label>Data Retention Period</label>
          <select
            value={settings.privacy.dataRetention}
            onChange={(e) => handleSettingChange('privacy', 'dataRetention', e.target.value)}
          >
            <option value="3months">3 Months</option>
            <option value="6months">6 Months</option>
            <option value="12months">12 Months</option>
            <option value="forever">Forever</option>
          </select>
        </div>
        <div className="settings-option">
          <label>Data Sharing</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.privacy.dataSharing}
              onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="settings-section">
      <h3>Help & Support</h3>
      <div className="help-grid">
        <div className="help-card">
          <FaHeadset className="help-icon" />
          <h4>Contact Support</h4>
          <p>Get assistance from our dedicated support team 24/7</p>
          <button className="help-button primary">
            <FaHeadset />
            <span>Chat with Support</span>
          </button>
          <button className="help-button secondary">
            <FaUser />
            <span>Schedule a Call</span>
          </button>
        </div>
        <div className="help-card">
          <FaBook className="help-icon" />
          <h4>Documentation</h4>
          <p>Learn about tax filing processes and best practices</p>
          <button className="help-button primary">
            <FaBook />
            <span>Read Guides</span>
          </button>
          <button className="help-button secondary">
            <FaFileAlt />
            <span>View Tutorials</span>
          </button>
        </div>
        <div className="help-card">
          <FaQuestionCircle className="help-icon" />
          <h4>FAQs</h4>
          <p>Quick answers to common tax-related questions</p>
          <button className="help-button primary">
            <FaQuestionCircle />
            <span>Browse FAQs</span>
          </button>
          <button className="help-button secondary">
            <FaDatabase />
            <span>Knowledge Base</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <h1>Settings</h1>
        <p className="settings-description">Manage your tax assistant preferences and account settings</p>
        
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
          {activeTab === 'tax' && renderTaxPreferences()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'display' && renderDisplay()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'privacy' && renderPrivacy()}
          {activeTab === 'help' && renderHelp()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
