import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRobot, FaChartLine, FaBook, FaBell, FaArrowRight, 
  FaBrain, FaGraduationCap, // Add these icons
  FaHome, FaComments, FaBuilding, FaCog, FaUser 
} from 'react-icons/fa';
import { Line, Doughnut, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import '../styles/Home.css';
import FAQ from '../components/FAQ';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,  // Add this
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  const chartData = React.useMemo(() => ({
    savings: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      }]
    },
    deductions: {
      labels: ['Home Office', 'Healthcare', 'Education', 'Retirement', 'Charitable'],
      datasets: [{
        label: 'Your Deductions',
        data: [2500, 1800, 3200, 4500, 1000].map(val => val * 80), // Converting to approximate rupees
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#6366F1',
          '#8B5CF6',
          '#EC4899'
        ],
        borderWidth: 0,
      }]
    },
    income: {
      labels: ['Salary', 'Investments', 'Side Business', 'Other'],
      datasets: [{
        label: 'Your Income Sources',
        data: [65000, 5000, 3000, 2000].map(val => val * 80), // Converting to approximate rupees
        backgroundColor: [
          '#60A5FA',
          '#34D399',
          '#F472B6',
          '#FBBF24'
        ],
        borderWidth: 0,
      }]
    },
    taxComparison: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Your Tax Liability',
          data: [4125, 4125, 4125, 4125],
          backgroundColor: '#F472B6',
        },
        {
          label: 'Amount Paid',
          data: [4125, 4125, 4125, 0],
          backgroundColor: '#60A5FA',
        }
      ]
    }
  }), []);

  const chartOptions = React.useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }), []);

  const heroStyle = {
    backgroundImage: "url('/hero.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100%',
    minHeight: '100vh',
  };

  const summaryCards = React.useMemo(() => [
    {
      icon: '👤',
      title: 'Personal Overview',
      bgColor: 'var(--card-accent-1)',
      items: [
        { label: 'Tax ID', value: 'XXXXX1234' },
        { label: 'Filing Status', value: 'Individual' },
        { label: 'Tax Year', value: '2024' }
      ]
    },
    {
      icon: '💰',
      title: 'Tax Summary',
      bgColor: 'var(--card-accent-2)',
      items: [
        { label: 'Annual Income', value: '₹75,00,000' },
        { label: 'Tax Rate', value: '22%' },
        { label: 'Est. Tax Due', value: '₹16,50,000' }
      ]
    }
  ], []);

  const features = React.useMemo(() => [
    {
      icon: <FaRobot className="feature-icon" />,
      title: "AI-Powered Tax Analysis",
      description: "Let our intelligent chatbot analyze your financial data and suggest personalized tax strategies.",
      color: "#10B981",
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))"
    },
    {
      icon: <FaComments className="feature-icon" />,
      title: "Instant Help, Anytime",
      description: "Got a tax question? Chat with our bot for quick, accurate answers.",
      color: "#3B82F6",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))"
    },
    {
      icon: <FaBook className="feature-icon" />,
      title: "Learn & Grow",
      description: "Explore our curated library to understand tax concepts, laws, and best practices.",
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))"
    },
    {
      icon: <FaBell className="feature-icon" />,
      title: "Stay Informed",
      description: "Get real-time notifications on tax deadlines, policy changes, and more.",
      color: "#EC4899",
      gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05))"
    }
  ], []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={heroStyle}>
        <div className="hero-content">
          <h1>Welcome to TaxBuddy</h1>
          <h2>Your AI-Powered Tax Assistant</h2>
          <p className="hero-subtitle">Smart, Fast & Hassle-Free Tax Management</p>
          <Link to="/chat" className="cta-button glow">
            Start Chatting <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Modified Overview Section - Charts Only */}
      <section className="overview-section fade-in">
        <h2>Your Personal Tax Dashboard</h2>
        <div className="charts-scroll-container">
          <div className="charts-scroll-grid">
            {/* Charts Only - Remove Info Cards */}
            <div className="chart-card">
              <h3>Your Tax Savings Growth</h3>
              <div className="chart-container">
                <Line data={chartData.savings} options={chartOptions} />
              </div>
            </div>
            <div className="chart-card">
              <h3>Your Deductions Breakdown</h3>
              <div className="chart-container">
                <Doughnut data={chartData.deductions} options={chartOptions} />
              </div>
            </div>
            <div className="chart-card">
              <h3>Your Income Sources</h3>
              <div className="chart-container">
                <Pie data={chartData.income} options={chartOptions} />
              </div>
            </div>
            <div className="chart-card">
              <h3>Your Tax Payment Status</h3>
              <div className="chart-container">
                <Bar data={chartData.taxComparison} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Summary Section with Title */}
      <section className="summary-section fade-in">
        <h2 className="summary-title">Your Tax Profile Overview</h2>
        <div className="summary-container">
          {summaryCards.map((card, index) => (
            <div key={index} className="summary-card" style={{ background: card.bgColor }}>
              <div className="summary-header">
                <span className="summary-icon">{card.icon}</span>
                <h3>{card.title}</h3>
              </div>
              <div className="summary-content">
                {card.items.map((item, i) => (
                  <div key={i} className="summary-item">
                    <span className="summary-label">{item.label}</span>
                    <span className="summary-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="features-section">
        <h2 className="features-title">What Makes TaxBuddy Stand Out?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              style={{ background: feature.gradient }}
            >
              <div className="feature-icon-wrapper" style={{ color: feature.color }}>
                {feature.icon}
                <div className="feature-icon-bg" style={{ borderColor: feature.color }}></div>
              </div>
              <h3 style={{ color: feature.color }}>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Add FAQ Section */}
      <FAQ />

    </div>
  );
};

export default Home;
