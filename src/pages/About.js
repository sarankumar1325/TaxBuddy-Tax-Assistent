import React, { useState } from 'react';
import { 
  FaShieldAlt, 
  FaLightbulb, 
  FaHandshake, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaPhone,
  FaUserTie, // Professional user icon
  FaChartLine, // Growth chart icon
  FaStar, // Star for ratings
  FaRobot, // AI/Robot icon
  FaMoneyCheckAlt, // Money/Finance icon
  FaHeadset, // Customer service icon
  FaCogs, // Settings/Technology icon
  FaUserShield // Security/Trust icon
} from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const coreValues = [
    {
      icon: <FaUserShield className="value-icon" />,
      title: "Trust & Security",
      description: "Your financial data security is our top priority. We employ state-of-the-art encryption and security measures."
    },
    {
      icon: <FaCogs className="value-icon" />,
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to revolutionize tax management and planning."
    },
    {
      icon: <FaHeadset className="value-icon" />,
      title: "Customer First",
      description: "Dedicated to providing exceptional support and guidance throughout your tax journey."
    }
  ];

  const impactStats = [
    {
      number: "100K+",
      label: "Active Users",
      description: "Trusted by individuals and businesses",
      icon: <FaUserTie className="stat-icon" />,
      color: "#3B82F6"
    },
    {
      number: "₹50M+",
      label: "Tax Savings",
      description: "Saved for our clients in 2023",
      icon: <FaMoneyCheckAlt className="stat-icon" />,
      color: "#10B981"
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      description: "From our verified users",
      icon: <FaStar className="stat-icon" />,
      color: "#F59E0B"
    },
    {
      number: "24/7",
      label: "AI Support",
      description: "Always here to help you",
      icon: <FaRobot className="stat-icon" />,
      color: "#8B5CF6"
    }
  ];

  const teamMembers = [
    {
      name: "Saran kumar S",
      role: "Gen AI Developer",
      image: "./team/saran.jpg",
      social: {
        linkedin: "https://linkedin.com/in/akash-patel",
        github: "https://github.com/akashp",
        email: "akash@taxbuddy.com"
      }
    },
    {
      name: "Gobika R",
      role: "Gen AI Developer",
      image: "./team/gopika.jpg",
      social: {
        linkedin: "https://linkedin.com/in/priya-sharma",
        github: "https://github.com/priyas",
        email: "priya@taxbuddy.com"
      }
    },
    {
      name: "Murugan B",
      role: "Full stack Developer",
      image: "./team/Murugan.jpg",
      social: {
        linkedin: "https://linkedin.com/in/raj-kumar",
        github: "https://github.com/rajk",
        email: "raj@taxbuddy.com"
      }
    },
    {
      name: "Sathya S",
      role: "Full stack Developer",
      image: "./team/sathya.jpg",
      social: {
        linkedin: "https://linkedin.com/in/neha-singh",
        github: "https://github.com/nehas",
        email: "neha@taxbuddy.com"
      }
    }
  ];

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    } else if (contactForm.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        // Add your form submission logic here
        console.log('Form submitted:', contactForm);
        // Reset form after successful submission
        setContactForm({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

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

      <section className="about-section impact-section">
        <h2 className="impact-title">Our Impact</h2>
        <p className="impact-subtitle">Making a difference in tax management, one user at a time</p>
        
        <div className="impact-grid">
          {impactStats.map((stat, index) => (
            <div 
              key={index} 
              className="impact-card"
              style={{ '--card-color': stat.color }}
            >
              <div className="impact-icon-wrapper">
                {stat.icon}
              </div>
              <div className="impact-number">{stat.number}</div>
              <div className="impact-label">{stat.label}</div>
              <div className="impact-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section team-section">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="team-card"
                style={{ '--index': index }}
              >
                <div className="team-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <div className="member-social">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href={`mailto:${member.social.email}`}>
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section contact-section">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-method">
              <FaPhone /> <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-method">
              <FaEnvelope /> <span>support@taxbuddy.com</span>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleInputChange}
                className={formErrors.name ? 'error' : ''}
                required
              />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleInputChange}
                className={formErrors.email ? 'error' : ''}
                required
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={contactForm.message}
                onChange={handleInputChange}
                className={formErrors.message ? 'error' : ''}
                required
                rows={5}
              />
              {formErrors.message && <span className="error-message">{formErrors.message}</span>}
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;
