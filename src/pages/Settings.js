import React, { useState } from 'react';
import { 
  FaUser, FaBell, FaShieldAlt, FaFileAlt, FaCreditCard, FaLanguage,
  FaWallet, FaMoon, FaDatabase, FaQuestionCircle, FaUserCog, FaChartBar,
  FaDownload, FaHeadset, FaGlobe, FaPalette, FaBook
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
      region: 'IN',
      taxYear: '2024'
    },
    notifications: {
      filingReminders: true,
      lawUpdates: true,
      refundAlerts: true,
      securityAlerts: true,
      monthlySummary: true
    },
    display: {
      theme: 'light',
      chartType: 'bar',
      fontSize: 'medium',
      currency: 'INR',
      language: 'English'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      dataBackup: true,
      loginAlerts: true
    },
    privacy: {
      dataRetention: '12months',
      dataSharing: false,
      newsletter: true,
      marketing: false
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

  // Handler for settings changes
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
            <option value="IN-KA">Karnataka</option>
            <option value="IN-MH">Maharashtra</option>
            <option value="IN-DL">Delhi</option>
          </select>
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
          <input
            type="checkbox"
            checked={settings.notifications.filingReminders}
            onChange={(e) => handleSettingChange('notifications', 'filingReminders', e.target.checked)}
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

        <div className="settings-option">
          <label>Refund Status Alerts</label>
          <input
            type="checkbox"
            checked={settings.notifications.refundAlerts}
            onChange={(e) => handleSettingChange('notifications', 'refundAlerts', e.target.checked)}
          />
        </div>

        <div className="settings-option">
          <label>Security Alerts</label>
          <input
            type="checkbox"
            checked={settings.notifications.securityAlerts}
            onChange={(e) => handleSettingChange('notifications', 'securityAlerts', e.target.checked)}
          />
        </div>

        <div className="settings-option">
          <label>Monthly Tax Summary</label>
          <input
            type="checkbox"
            checked={settings.notifications.monthlySummary}
            onChange={(e) => handleSettingChange('notifications', 'monthlySummary', e.target.checked)}
          />
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
          <label>Chart Type</label>
          <select
            value={settings.display.chartType}
            onChange={(e) => handleSettingChange('display', 'chartType', e.target.value)}
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>

        <div className="settings-option">
          <label>Font Size</label>
          <select
            value={settings.display.fontSize}
            onChange={(e) => handleSettingChange('display', 'fontSize', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="settings-option">
          <label>Language</label>
          <select
            value={settings.display.language}
            onChange={(e) => handleSettingChange('display', 'language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Kannada">Kannada</option>
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
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
          />
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

        <div className="settings-option">
          <label>Login Alerts</label>
          <input
            type="checkbox"
            checked={settings.security.loginAlerts}
            onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
          />
        </div>

        <div className="danger-zone">
          <h4>Danger Zone</h4>
          <button className="danger-button">Delete Account</button>
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
          <input
            type="checkbox"
            checked={settings.privacy.dataSharing}
            onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
          />
        </div>
        <div className="settings-option">
          <label>Newsletter Subscription</label>
          <input
            type="checkbox"
            checked={settings.privacy.newsletter}
            onChange={(e) => handleSettingChange('privacy', 'newsletter', e.target.checked)}
          />
        </div>
        <div className="danger-zone">
          <h4>Data Management</h4>
          <button className="danger-button">Download My Data</button>
          <button className="danger-button">Delete All Data</button>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="settings-section">
      <h3>Help & Support</h3>
      <div className="help-grid">
        <div className="help-card">
          <FaBook className="help-icon" />
          <h4>Documentation</h4>
          <p>Browse our comprehensive guides and tutorials</p>
          <button className="settings-button">View Docs</button>
        </div>
        <div className="help-card">
          <FaHeadset className="help-icon" />
          <h4>Contact Support</h4>
          <p>Get help from our support team</p>
          <button className="settings-button">Contact Us</button>
        </div>
        <div className="help-card">
          <FaQuestionCircle className="help-icon" />
          <h4>FAQs</h4>
          <p>Find answers to common questions</p>
          <button className="settings-button">View FAQs</button>
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
