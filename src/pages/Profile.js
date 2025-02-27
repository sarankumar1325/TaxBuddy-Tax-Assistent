import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaFileAlt, FaEdit, FaDownload, FaSave, FaTimes, FaBuilding, FaMapMarker, FaPlus, FaChartLine, FaMoneyBillAlt, FaBriefcase } from 'react-icons/fa';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../styles/Profile.css';

const defaultUserData = {
  name: 'Not set',
  email: 'Not set',
  phone: 'Not set',
  business_email: 'Not set',
  company_name: 'Not set',
  address: 'Not set',
  ssn: 'Not set',
  created_at: new Date().toISOString(),
  last_login: new Date().toISOString(),
  account_status: 'inactive',
  avatar: 'https://via.placeholder.com/150',
  tax_reports: [
    {
      id: 'TR001',
      year: '2023',
      status: 'Pending',
      amount: '₹0',
      date: new Date().toISOString(),
      description: 'Annual Tax Filing'
    }
  ],
  annual_income: 'Not set',
  salary: 'Not set',
  income_currency: 'INR',
  income_type: 'Salaried', // or 'Self-Employed', 'Business'
  last_updated: new Date().toISOString()
};

const Profile = () => {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(defaultUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState(null);
  const [editedReport, setEditedReport] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          console.log("No user logged in");
          return;
        }

        console.log("Current User UID:", currentUser.uid); // Debug log

        const userDocRef = doc(db, "Users", currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          console.log("Fetched user data:", userData); // Debug log

          setUser({
            ...defaultUserData,
            ...userData,
            joinDate: new Date(userData.created_at).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })
          });
        } else {
          console.log("No user document found");
          setUser(defaultUserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(defaultUserData);
      } finally {
        setLoading(false);
      }
    };

    // Add auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setUser(defaultUserData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      const updateData = {
        ...editedUser,
        updated_at: new Date().toISOString()
      };

      // Remove undefined or null values
      Object.keys(updateData).forEach(key => 
        (updateData[key] === undefined || updateData[key] === null) && delete updateData[key]
      );

      await updateDoc(doc(db, "Users", auth.currentUser.uid), updateData);

      setUser(prev => ({
        ...prev,
        ...updateData
      }));
      setIsEditing(false);
      setErrors({});
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: 'Failed to update profile' });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result;
        try {
          // Update Firestore with the new image
          await updateDoc(doc(db, "Users", auth.currentUser.uid), {
            avatar: imageData
          });
          
          // Update local state
          setUser(prev => ({
            ...prev,
            avatar: imageData
          }));
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
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

      case 'annual_income':
      case 'salary':
        const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
        if (isNaN(numValue)) return 'Please enter a valid number';
        if (numValue < 0) return 'Amount cannot be negative';
        return '';
      
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

  const handleEditReport = (report) => {
    setEditingReport(report.id);
    setEditedReport({ ...report });
  };

  const handleSaveReport = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !editedReport) return;

      const updatedReports = user.tax_reports.map(report => 
        report.id === editingReport ? editedReport : report
      );

      await updateDoc(doc(db, "Users", currentUser.uid), {
        tax_reports: updatedReports
      });

      setUser(prev => ({
        ...prev,
        tax_reports: updatedReports
      }));
      setEditingReport(null);
      setEditedReport(null);
    } catch (error) {
      console.error("Error updating tax report:", error);
    }
  };

  const handleAddReport = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const newReport = {
        id: `TR${Date.now()}`,
        year: new Date().getFullYear().toString(),
        status: 'Pending',
        amount: '₹0',
        date: new Date().toISOString(),
        description: 'New Tax Report'
      };

      const updatedReports = [...(user.tax_reports || []), newReport];

      // Update Firestore
      await updateDoc(doc(db, "Users", currentUser.uid), {
        tax_reports: updatedReports
      });

      // Update local state
      setUser(prev => ({
        ...prev,
        tax_reports: updatedReports
      }));

      // Start editing the new report
      setEditingReport(newReport.id);
      setEditedReport(newReport);
    } catch (error) {
      console.error("Error adding new tax report:", error);
    }
  };

  const formatCurrency = (value) => {
    if (!value || value === 'Not set') return 'Not set';
    const number = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(number)) return value;
    return `₹${number.toLocaleString('en-IN')}`;
  };

  const renderPersonalInfo = () => (
    <section className="profile-section">
      <div className="section-header">
        <h2><FaUser /> Personal Information</h2>
        {!isEditing && (
          <button className="section-edit-button" onClick={handleEditClick}>
            <FaEdit /> Edit
          </button>
        )}
      </div>
      <div className="info-grid">
        {loading ? (
          <div>Loading user information...</div>
        ) : isEditing ? (
          <>
            {/* Edit mode - show all input fields */}
            {['name', 'email', 'phone', 'business_email', 'company_name', 'address', 'ssn'].map(field => (
              <div key={field} className="info-item">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}</label>
                <input
                  type={field === 'email' || field === 'business_email' ? 'email' : 'text'}
                  id={field}
                  value={editedUser[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className={`edit-input ${errors[field] ? 'error' : ''}`}
                />
                {errors[field] && <span className="error-message">{errors[field]}</span>}
              </div>
            ))}

            {/* New income fields */}
            <div className="info-item">
              <label htmlFor="annual_income">Annual Income</label>
              <input
                type="text"
                id="annual_income"
                value={editedUser.annual_income || ''}
                onChange={(e) => handleInputChange('annual_income', e.target.value)}
                className={`edit-input ${errors.annual_income ? 'error' : ''}`}
                placeholder="Enter annual income"
              />
              {errors.annual_income && <span className="error-message">{errors.annual_income}</span>}
            </div>

            <div className="info-item">
              <label htmlFor="salary">Monthly Salary</label>
              <input
                type="text"
                id="salary"
                value={editedUser.salary || ''}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className={`edit-input ${errors.salary ? 'error' : ''}`}
                placeholder="Enter monthly salary"
              />
              {errors.salary && <span className="error-message">{errors.salary}</span>}
            </div>

            <div className="info-item">
              <label htmlFor="income_type">Income Type</label>
              <select
                id="income_type"
                value={editedUser.income_type || 'Salaried'}
                onChange={(e) => handleInputChange('income_type', e.target.value)}
                className="edit-input"
              >
                <option value="Salaried">Salaried</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Business">Business</option>
              </select>
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
            {/* View mode - show all fields */}
            {[
              { label: 'Name', value: user.name, icon: <FaUser /> },
              { label: 'Email', value: user.email, icon: <FaEnvelope /> },
              { label: 'Phone', value: user.phone, icon: <FaPhone /> },
              { label: 'Business Email', value: user.business_email, icon: <FaEnvelope /> },
              { label: 'Company Name', value: user.company_name, icon: <FaBuilding /> },
              { label: 'Address', value: user.address, icon: <FaMapMarker /> },
              { label: 'SSN', value: user.ssn, icon: <FaIdCard /> }
            ].map(item => (
              <div key={item.label} className="info-item">
                <label>{item.label}</label>
                <div className="info-value">
                  {item.icon}
                  {item.value || 'Not set'}
                </div>
              </div>
            ))}

            {/* New income fields in view mode */}
            <div className="info-item">
              <label>Annual Income</label>
              <div className="info-value">
                <FaChartLine />
                {formatCurrency(user.annual_income)}
              </div>
            </div>

            <div className="info-item">
              <label>Monthly Salary</label>
              <div className="info-value">
                <FaMoneyBillAlt />
                {formatCurrency(user.salary)}
              </div>
            </div>

            <div className="info-item">
              <label>Income Type</label>
              <div className="info-value">
                <FaBriefcase />
                {user.income_type || 'Not set'}
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
        <FaFileAlt /> Recent Tax Reports
        <button className="add-report-btn" onClick={() => handleAddReport()}>
          <FaPlus /> Add Report
        </button>
      </h2>
      <div className="tax-reports">
        {user.tax_reports?.map(report => (
          <div key={report.id} className="tax-report-card">
            {editingReport === report.id ? (
              // Edit mode for report
              <div className="report-edit-form">
                <input
                  type="text"
                  value={editedReport.year}
                  onChange={(e) => setEditedReport({...editedReport, year: e.target.value})}
                  placeholder="Year"
                />
                <select
                  value={editedReport.status}
                  onChange={(e) => setEditedReport({...editedReport, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Filed">Filed</option>
                  <option value="Completed">Completed</option>
                </select>
                <input
                  type="text"
                  value={editedReport.amount}
                  onChange={(e) => setEditedReport({...editedReport, amount: e.target.value})}
                  placeholder="Amount"
                />
                <div className="edit-actions">
                  <button onClick={handleSaveReport} className="save-button">
                    <FaSave /> Save
                  </button>
                  <button onClick={() => setEditingReport(null)} className="cancel-button">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <>
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
                <div className="report-actions">
                  <button onClick={() => handleEditReport(report)} className="edit-button">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDownload(report)} className="download-button">
                    <FaDownload /> Download
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar-section">
          <div className="profile-avatar-container">
            <img 
              src={user.avatar || defaultUserData.avatar} 
              alt={user.name || 'Profile'} 
              className="profile-avatar" 
            />
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
            <h1>{user.name || 'Not set'}</h1>
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
