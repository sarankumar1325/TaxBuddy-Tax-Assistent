import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="page home-page">
      <div className="hero-section">
        <h1>Welcome to TaxBuddy</h1>
        <p>Your trusted tax calculation companion</p>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Easy Calculations</h3>
          <p>Simple and accurate tax calculations</p>
        </div>
        <div className="feature-card">
          <h3>Expert Support</h3>
          <p>Get help from tax professionals</p>
        </div>
        <div className="feature-card">
          <h3>Secure Platform</h3>
          <p>Your data is safe with us</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
