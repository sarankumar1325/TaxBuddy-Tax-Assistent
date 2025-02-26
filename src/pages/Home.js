import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaChartLine, FaBook, FaBell, FaArrowRight, FaHome, FaComments, FaGraduationCap, FaBuilding, FaCog, FaUser } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  const dashboardItems = [
    {
      icon: '📊',
      title: 'Activity Overview',
      description: 'Recent calculations & tax activities',
      content: {
        items: [
          { label: 'Last Tax Filing', value: 'April 15, 2024' },
          { label: 'Recent Deductions', value: '$2,500' },
          { label: 'Pending Tasks', value: '3' }
        ]
      }
    },
    {
      icon: '📈',
      title: 'Financial Summary',
      description: 'Income, deductions & tax savings',
      content: {
        items: [
          { label: 'Total Income', value: '$75,000' },
          { label: 'Tax Savings', value: '$4,200' },
          { label: 'Deductions', value: '$8,500' }
        ]
      }
    },
    {
      icon: '🔎',
      title: 'Important Updates',
      description: 'Tasks & upcoming deadlines',
      content: {
        items: [
          { label: 'Next Deadline', value: 'May 1, 2024' },
          { label: 'Documents Due', value: '2' },
          { label: 'Alerts', value: '1' }
        ]
      }
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to TaxBuddy</h1>
          <h2>Your AI-Powered Tax Assistant</h2>
          <p className="hero-subtitle">Smart, Fast & Hassle-Free Tax Management</p>
          <Link to="/chat" className="cta-button glow">
            Start Chatting <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <p className="intro-text">
          Say goodbye to tax season stress! TaxBuddy is your all-in-one platform for effortless tax analysis, 
          filing, and learning. Powered by advanced AI, our chatbot is ready to assist you 24/7 — making sure 
          you never miss a deduction or fall behind on compliance.
        </p>
      </section>

      {/* Dashboard Section */}
      <section className="dashboard-section fade-in">
        <h2>Your Tax Overview</h2>
        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <div key={index} className="dashboard-card">
              <div className="card-header">
                <span className="card-icon">{item.icon}</span>
                <div className="card-title">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="card-content">
                {item.content.items.map((contentItem, i) => (
                  <div key={i} className="content-item">
                    <span className="item-label">{contentItem.label}</span>
                    <span className="item-value">{contentItem.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>What Makes TaxBuddy Stand Out?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h3>AI-Powered Tax Analysis</h3>
            <p>Let our intelligent chatbot analyze your financial data and suggest personalized tax strategies.</p>
          </div>
          <div className="feature-card">
            <FaComments className="feature-icon" />
            <h3>Instant Help, Anytime</h3>
            <p>Got a tax question? Chat with our bot for quick, accurate answers.</p>
          </div>
          <div className="feature-card">
            <FaBook className="feature-icon" />
            <h3>Learn & Grow</h3>
            <p>Explore our curated library to understand tax concepts, laws, and best practices.</p>
          </div>
          <div className="feature-card">
            <FaBell className="feature-icon" />
            <h3>Stay Informed</h3>
            <p>Get real-time notifications on tax deadlines, policy changes, and more.</p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="navigation-section">
        <h2 className="nav-section-title">Your Tax Hub, All in One Place</h2>
        <div className="nav-grid">
          <Link to="/" className="nav-card">
            <FaHome className="nav-icon" />
            <h3>Home</h3>
            <p>Your dashboard for quick tax insights and updates.</p>
          </Link>
          <Link to="/profile" className="nav-card">
            <FaUser className="nav-icon" />
            <h3>Profile</h3>
            <p>Manage your account and personal information.</p>
          </Link>
          <Link to="/learn" className="nav-card">
            <FaGraduationCap className="nav-icon" />
            <h3>Learn</h3>
            <p>Access educational resources and guides.</p>
          </Link>
          <Link to="/about" className="nav-card">
            <FaBuilding className="nav-icon" />
            <h3>About</h3>
            <p>Discover more about TaxBuddy and our mission.</p>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Get Started & Take Control of Your Taxes</h2>
        <p>Whether you're a freelancer, business owner, or just want to maximize your refund, TaxBuddy is your trusted companion.</p>
        <Link to="/learn" className="cta-button">
          Start Learning <FaArrowRight />
        </Link>
      </section>
    </div>
  );
};

export default Home;
