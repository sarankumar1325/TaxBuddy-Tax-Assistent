import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaFileAlt, FaEdit, FaDownload } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    ssn: "XXX-XX-1234",
    avatar: "https://via.placeholder.com/150",
    occupation: "Software Engineer",
    address: "123 Tax Street, Finance City, FC 12345",
    joinDate: "January 2024"
  });

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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-avatar-section">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="profile-title">
            <h1>{user.name}</h1>
            <p className="join-date">Member since {user.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-grid">
          {/* Personal Information */}
          <section className="profile-section">
            <h2>
              <FaUser />
              Personal Information
            </h2>
            <div className="info-grid">
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
            </div>
            <button className="edit-button">
              <FaEdit /> Edit Information
            </button>
          </section>

          {/* Tax Reports */}
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
                  <button className="download-button">
                    <FaDownload /> Download Report
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
