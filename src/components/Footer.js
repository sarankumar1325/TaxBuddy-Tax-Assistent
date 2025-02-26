import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  // Get theme from parent app
  const theme = document.querySelector('.app')?.classList.contains('dark') ? 'dark' : 'light';
  
  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>TaxBuddy</h3>
          <p>Your trusted tax calculation companion</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
            <a href="#" className="social-icon"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TaxBuddy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
