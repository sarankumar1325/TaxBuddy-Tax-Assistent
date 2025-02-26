import React, { useState } from 'react';
import { FaBook, FaVideo, FaQuestionCircle, FaCertificate, FaChartLine, FaFileAlt, FaLightbulb, FaUserTie } from 'react-icons/fa';
import '../styles/Learn.css';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('tutorials');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const tutorials = [
    {
      id: 1,
      title: "Tax Fundamentals",
      description: "Essential concepts for understanding taxation",
      duration: "45 mins",
      level: "Beginner",
      icon: <FaLightbulb />,
      topics: ["Basic tax terms", "Filing requirements", "Tax brackets"]
    },
    {
      id: 2,
      title: "Income Tax Mastery",
      description: "Comprehensive guide to income tax calculation",
      duration: "60 mins",
      level: "Intermediate",
      icon: <FaChartLine />,
      topics: ["Salary income", "Business income", "Capital gains"]
    },
    {
      id: 3,
      title: "Deductions & Credits",
      description: "Maximize your tax savings",
      duration: "50 mins",
      level: "Intermediate",
      icon: <FaFileAlt />,
      topics: ["Standard deductions", "Itemized deductions", "Tax credits"]
    },
    {
      id: 4,
      title: "Business Taxation",
      description: "Tax strategies for business owners",
      duration: "75 mins",
      level: "Advanced",
      icon: <FaUserTie />,
      topics: ["Business structures", "Expenses", "Quarterly taxes"]
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Tax Course 2024",
      modules: 12,
      duration: "8 hours",
      level: "All Levels",
      highlights: [
        "Personal & Business Tax",
        "Investment Income",
        "International Tax",
        "Real-world Case Studies"
      ],
      price: "$99"
    },
    {
      id: 2,
      title: "Business Tax Masterclass",
      modules: 8,
      duration: "4 hours",
      level: "Advanced"
    }
  ];

  const quizCategories = [
    {
      title: "Basic Tax Knowledge",
      questions: 20,
      time: "30 mins",
      topics: ["Tax Basics", "Filing Status", "Deductions"]
    },
    {
      title: "Advanced Tax Scenarios",
      questions: 15,
      time: "45 mins",
      topics: ["Business Tax", "Investments", "Foreign Income"]
    }
  ];

  const pathways = [
    {
      title: "Personal Tax Expert",
      duration: "3 months",
      modules: [
        "Tax Fundamentals",
        "Income Tax Mastery",
        "Deductions & Credits",
        "Final Certification"
      ]
    },
    {
      title: "Business Tax Specialist",
      duration: "4 months",
      modules: [
        "Business Structures",
        "Corporate Taxation",
        "International Tax",
        "Advanced Certification"
      ]
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Tax Basics Quiz",
      description: "Test your knowledge of fundamental tax concepts",
      questions: 20,
      duration: "30 mins",
      difficulty: "Beginner",
      topics: ["Income Tax", "Deductions", "Filing Status"]
    },
    {
      id: 2,
      title: "Business Tax Quiz",
      description: "Challenge yourself with business taxation scenarios",
      questions: 15,
      duration: "25 mins",
      difficulty: "Intermediate",
      topics: ["Corporate Tax", "Business Deductions", "Quarterly Taxes"]
    },
    {
      id: 3,
      title: "Advanced Tax Concepts",
      description: "Expert level questions on complex tax situations",
      questions: 25,
      duration: "45 mins",
      difficulty: "Advanced",
      topics: ["International Tax", "Investment Income", "Estate Planning"]
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Tax Fundamentals",
      status: "Completed",
      completedDate: "2024-01-15",
      score: "95%",
      badge: "🏆"
    },
    {
      id: 2,
      title: "Business Tax Specialist",
      status: "In Progress",
      progress: "65%",
      badge: "🎯"
    },
    {
      id: 3,
      title: "Advanced Tax Planning",
      status: "Not Started",
      badge: "🎓"
    }
  ];

  return (
    <div className="learn-container">
      <div className="learn-header">
        <h1>Learning Center</h1>
        <p>Enhance your tax knowledge with our comprehensive learning resources</p>
      </div>

      <div className="learning-paths-section">
        <h2>Learning Paths</h2>
        <div className="paths-grid">
          {pathways.map((path, index) => (
            <div key={index} className="path-card">
              <h3>{path.title}</h3>
              <span className="duration">{path.duration}</span>
              <ul className="path-modules">
                {path.modules.map((module, i) => (
                  <li key={i}>{module}</li>
                ))}
              </ul>
              <button className="start-path-button">Begin Path</button>
            </div>
          ))}
        </div>
      </div>

      <div className="learn-tabs">
        <button 
          className={`tab-button ${activeTab === 'tutorials' ? 'active' : ''}`}
          onClick={() => setActiveTab('tutorials')}
        >
          <FaBook /> Tutorials
        </button>
        <button 
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <FaVideo /> Courses
        </button>
        <button 
          className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <FaQuestionCircle /> Practice Quiz
        </button>
        <button 
          className={`tab-button ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          <FaCertificate /> Certificates
        </button>
      </div>

      <div className="learn-content">
        {activeTab === 'tutorials' && (
          <>
            <div className="tutorials-grid">
              {tutorials.map(tutorial => (
                <div key={tutorial.id} className="tutorial-card">
                  <div className="card-icon">{tutorial.icon}</div>
                  <h3>{tutorial.title}</h3>
                  <p>{tutorial.description}</p>
                  <div className="tutorial-meta">
                    <span className="duration">{tutorial.duration}</span>
                    <span className="level">{tutorial.level}</span>
                  </div>
                  <div className="topics-list">
                    {tutorial.topics.map((topic, i) => (
                      <span key={i} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                  <button className="start-button">Start Learning</button>
                </div>
              ))}
            </div>
            <div className="progress-tracker">
              <h3>Your Progress</h3>
              <div className="progress-bar">
                <div className="progress" style={{width: '35%'}}></div>
              </div>
              <p>35% Complete</p>
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <div className="course-meta">
                  <span>{course.modules} Modules</span>
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                <button className="enroll-button">Enroll Now</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="quiz-section">
            <h2>Practice Quizzes</h2>
            <p>Test your knowledge and track your progress</p>
            <div className="quiz-grid">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="quiz-card">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.description}</p>
                  <div className="quiz-meta">
                    <span>{quiz.questions} Questions</span>
                    <span>{quiz.duration}</span>
                    <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div className="topics-list">
                    {quiz.topics.map((topic, i) => (
                      <span key={i} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                  <button className="start-quiz-button">Start Quiz</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="certificates-section">
            <h2>Your Certificates</h2>
            <p>Track your learning achievements</p>
            <div className="certificates-grid">
              {certificates.map(cert => (
                <div key={cert.id} className="certificate-card">
                  <div className="certificate-badge">{cert.badge}</div>
                  <h3>{cert.title}</h3>
                  <div className="certificate-meta">
                    <div className={`status ${cert.status.toLowerCase().replace(' ', '-')}`}>
                      {cert.status}
                    </div>
                    {cert.completedDate && (
                      <div className="completion-date">
                        Completed: {new Date(cert.completedDate).toLocaleDateString()}
                      </div>
                    )}
                    {cert.score && <div className="score">Score: {cert.score}</div>}
                    {cert.progress && (
                      <div className="progress-bar">
                        <div className="progress" style={{ width: cert.progress }}></div>
                        <span>{cert.progress}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="certificate-action-button"
                    disabled={cert.status === 'Completed'}
                  >
                    {cert.status === 'Completed' ? 'View Certificate' : 
                     cert.status === 'In Progress' ? 'Continue' : 'Start Course'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;