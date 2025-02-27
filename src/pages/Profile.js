import React, { useState, useRef } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaFileAlt, FaEdit, FaDownload, FaSave, FaTimes } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    ssn: "XXX-XX-1234",
    avatar: "https://via.placeholder.com/150",
    occupation: "Software Engineer",
    address: "123 Tax Street, Finance City, FC 12345",
    joinDate: "January 2024"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [errors, setErrors] = useState({});

  const [taxReports] = useState([
    {
      year: "2023",
      status: "Filed",
      amount: "$2,500",
      date: "2024-01-15",
      id: "TX2023001"
    },
    {
      year: "2022",
      status: "Completed",
      amount: "$1,800",
      date: "2023-03-20",
      id: "TX2022001"
    }
  ]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value && emailRegex.test(value) ? '' : 'Invalid email address';
      
      case 'phone':
        // Remove all non-digit characters and check length
        const digits = value.replace(/\D/g, '');
        if (!value) return 'Phone number is required';
        if (digits.length !== 10) return 'Phone number must be exactly 10 digits';
        // Format as XXX-XXX-XXXX if valid
        if (digits.length === 10) {
          const formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
          // Update the formatted value in editedUser
          setTimeout(() => {
            setEditedUser(prev => ({
              ...prev,
              phone: formatted
            }));
          }, 0);
          return '';
        }
        return 'Invalid phone format';
      
      case 'ssn':
        const ssnRegex = /^XXX-XX-\d{4}$/;
        return value && ssnRegex.test(value) ? '' : 'Invalid SSN format: XXX-XX-XXXX';
      
      case 'address':
        return value ? '' : 'Address is required';
      
      default:
        return '';
    }
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, value)
    }));
  };

  const handleSave = () => {
    const newErrors = {};
    ['email', 'phone', 'ssn', 'address'].forEach(field => {
      const error = validateField(field, editedUser[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUser(editedUser);
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({});
  };

  const handleDownload = (report) => {
    // Create report content
    const reportContent = {
      id: report.id,
      year: report.year,
      amount: report.amount,
      dateFiled: report.date,
      status: report.status,
      taxpayerInfo: {
        name: user.name,
        ssn: user.ssn,
        email: user.email
      }
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(reportContent, null, 2);
    
    // Create blob
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Set filename for desktop
    link.download = `tax-report-${report.year}-${report.id}.json`;
    
    // Append to body, click, and cleanup
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const renderPersonalInfo = () => (
    <section className="profile-section">
      <h2>
        <FaUser />
        Personal Information
      </h2>
      <div className="info-grid">
        {isEditing ? (
          <>
            <div className="info-item">
              <label>Email</label>
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`edit-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="info-item">
              <label>Phone</label>
              <input
                type="tel"
                value={editedUser.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`edit-input ${errors.phone ? 'error' : ''}`}
                placeholder="(XXX) XXX-XXXX"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="info-item">
              <label>SSN</label>
              <input
                type="text"
                value={editedUser.ssn}
                onChange={(e) => handleInputChange('ssn', e.target.value)}
                className={`edit-input ${errors.ssn ? 'error' : ''}`}
                placeholder="XXX-XX-XXXX"
              />
              {errors.ssn && <span className="error-message">{errors.ssn}</span>}
            </div>
            <div className="info-item">
              <label>Address</label>
              <input
                type="text"
                value={editedUser.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`edit-input ${errors.address ? 'error' : ''}`}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            <div className="edit-actions">
              <button className="save-button" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="info-item">
              <label>Email</label>
              <div className="info-value">
                <FaEnvelope />
                {user.email}
              </div>
            </div>
            <div className="info-item">
              <label>Phone</label>
              <div className="info-value">
                <FaPhone />
                {user.phone}
              </div>
            </div>
            <div className="info-item">
              <label>SSN</label>
              <div className="info-value">
                <FaIdCard />
                {user.ssn}
              </div>
            </div>
            <div className="info-item">
              <label>Address</label>
              <div className="info-value">
                {user.address}
              </div>
            </div>
            <button className="edit-button" onClick={handleEditClick}>
              <FaEdit /> Edit Information
            </button>
          </>
        )}
      </div>
    </section>
  );

  const renderTaxReports = () => (
    <section className="profile-section">
      <h2>
        <FaFileAlt />
        Recent Tax Reports
      </h2>
      <div className="tax-reports">
        {taxReports.map(report => (
          <div key={report.id} className="tax-report-card">
            <div className="report-header">
              <span className="year">{report.year}</span>
              <span className={`status ${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </div>
            <div className="report-details">
              <div className="report-info">
                <label>Amount</label>
                <span>{report.amount}</span>
              </div>
              <div className="report-info">
                <label>Date Filed</label>
                <span>{new Date(report.date).toLocaleDateString()}</span>
              </div>
              <div className="report-info">
                <label>Report ID</label>
                <span>{report.id}</span>
              </div>
            </div>
            <button 
              className="download-button"
              onClick={() => handleDownload(report)}
              title="Download to Desktop"
            >
              <FaDownload /> Download Report
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <div className="profile-edit-overlay" onClick={handleAvatarClick}>
              <FaEdit size={16} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <div className="profile-title">
            <h1>{user.name}</h1>
            <p className="join-date">Member since {user.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-grid">
          {renderPersonalInfo()}
          {renderTaxReports()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
