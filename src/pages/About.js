import React from 'react';
import { FaShieldAlt, FaLightbulb, FaHandshake, FaRocket, FaChartLine } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const coreValues = [
    {
      icon: <FaShieldAlt />,
      title: "Trust & Security",
      description: "Your financial data security is our top priority. We employ state-of-the-art encryption and security measures."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to revolutionize tax management and planning."
    },
    {
      icon: <FaHandshake />,
      title: "Customer First",
      description: "Dedicated to providing exceptional support and guidance throughout your tax journey."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Foundation",
      description: "TaxBuddy was founded with a vision to simplify tax management using AI technology."
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched our advanced AI-powered tax assistant, revolutionizing tax consultation."
    },
    {
      year: "2024",
      title: "Expansion",
      description: "Reached 100,000+ users and expanded our services to include comprehensive tax education."
    }
  ];

  const stats = [
    { number: "100K+", label: "Active Users" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "AI Support" },
    { number: "$10M+", label: "Tax Savings" }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About TaxBuddy</h1>
        <p>
          Empowering individuals and businesses with intelligent tax solutions. 
          We combine artificial intelligence with tax expertise to make tax management 
          simple, efficient, and accurate.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At TaxBuddy, we're on a mission to democratize tax knowledge and make 
          professional tax assistance accessible to everyone. Our AI-powered platform 
          provides personalized guidance, ensuring you never miss a deduction or deadline.
        </p>
      </section>

      <section className="about-section">
        <h2>Core Values</h2>
        <div className="values-grid">
          {coreValues.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-year">{milestone.year}</div>
              <div className="timeline-content">
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Why Choose TaxBuddy?</h2>
        <div className="features-grid">
          <div className="feature">
            <FaRocket className="feature-icon" />
            <h3>Fast & Efficient</h3>
            <p>Get instant answers to your tax questions and quick analysis of your tax situation.</p>
          </div>
          <div className="feature">
            <FaChartLine className="feature-icon" />
            <h3>Data-Driven Insights</h3>
            <p>Make informed decisions with AI-powered analysis and recommendations.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
