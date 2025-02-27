import React, { useState } from 'react';
import { FaVideo, FaQuestionCircle, FaCertificate, FaGraduationCap, FaArrowLeft, FaCheck, FaLock, FaPlay, FaFile, FaBook, FaLightbulb, FaTrophy } from 'react-icons/fa';
import { auth } from '../firebase';
import '../styles/Learn.css';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Tax Fundamentals 2024",
      description: "Master the basics of personal and business taxation",
      duration: "4 weeks",
      level: "Beginner",
      progress: 0,
      modules: ["Tax Basics", "Filing Requirements", "Deductions", "Credits"],
      icon: <FaGraduationCap />
    },
    {
      id: 2,
      title: "Advanced Tax Planning",
      description: "Strategic tax optimization techniques for professionals",
      duration: "6 weeks",
      level: "Advanced",
      progress: 35,
      modules: ["Investment Tax", "Estate Planning", "International Tax", "Business Tax"],
      icon: <FaVideo />
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Tax Essentials Quiz",
      description: "Test your understanding of fundamental tax concepts",
      questions: 20,
      duration: "30 mins",
      difficulty: "Beginner",
      topics: ["Basic Tax", "Deductions", "Credits"]
    },
    {
      id: 2,
      title: "Advanced Tax Concepts",
      description: "Challenge yourself with complex tax scenarios",
      questions: 25,
      duration: "45 mins",
      difficulty: "Advanced",
      topics: ["Business Tax", "Investments", "International"]
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Tax Professional Certificate",
      status: "In Progress",
      progress: "65%",
      validUntil: "2025",
      badge: "🏆"
    },
    {
      id: 2,
      title: "Advanced Tax Planning",
      status: "Not Started",
      badge: "🎯",
      requirements: ["Complete Course", "Pass Final Exam", "Submit Project"]
    }
  ];

  const courseContent = {
    1: {
      title: "Tax Fundamentals 2024",
      modules: [
        {
          id: 1,
          title: "Tax Basics",
          completed: false,
          locked: false,
          content: [
            { type: 'video', title: 'Introduction to Taxation', duration: '15:00', completed: false },
            { type: 'reading', title: 'Understanding Tax Terms', duration: '10 mins', completed: false },
            { type: 'practice', title: 'Basic Tax Calculations', duration: '20 mins', completed: false },
            { type: 'reading', title: 'Tax Filing Status Guide', duration: '15 mins', completed: false },
            { type: 'video', title: 'Income Types & Classification', duration: '20:00', completed: false },
            { type: 'quiz', title: 'Basic Tax Concepts Quiz', questions: 10, completed: false }
          ]
        },
        {
          id: 2,
          title: "Filing Requirements",
          completed: false,
          locked: true,
          content: [
            { type: 'video', title: 'Tax Filing Process Overview', duration: '20:00', completed: false },
            { type: 'reading', title: 'Required Documents Checklist', duration: '15 mins', completed: false },
            { type: 'practice', title: 'Form 1040 Walkthrough', duration: '30 mins', completed: false },
            { type: 'video', title: 'Common Filing Mistakes', duration: '25:00', completed: false },
            { type: 'worksheet', title: 'Document Organization', duration: '20 mins', completed: false },
            { type: 'quiz', title: 'Filing Requirements Test', questions: 15, completed: false }
          ]
        },
        {
          id: 3,
          title: "Deductions & Credits",
          completed: false,
          locked: true,
          content: [
            { type: 'video', title: 'Standard vs Itemized Deductions', duration: '25:00', completed: false },
            { type: 'reading', title: 'Popular Tax Deductions Guide', duration: '20 mins', completed: false },
            { type: 'practice', title: 'Deduction Calculator Workshop', duration: '30 mins', completed: false },
            { type: 'video', title: 'Tax Credits Explained', duration: '22:00', completed: false },
            { type: 'case-study', title: 'Real-world Deduction Examples', duration: '25 mins', completed: false },
            { type: 'assessment', title: 'Deduction Scenarios', questions: 5, completed: false }
          ]
        },
        {
          id: 4,
          title: "Income Reporting",
          completed: false,
          locked: true,
          content: [
            { type: 'video', title: 'Types of Income', duration: '18:00', completed: false },
            { type: 'reading', title: 'W-2 and 1099 Forms Guide', duration: '15 mins', completed: false },
            { type: 'practice', title: 'Income Reporting Workshop', duration: '25 mins', completed: false },
            { type: 'video', title: 'Self-Employment Income', duration: '20:00', completed: false },
            { type: 'worksheet', title: 'Income Classification Tool', duration: '15 mins', completed: false },
            { type: 'quiz', title: 'Income Reporting Test', questions: 12, completed: false }
          ]
        }
      ]
    },
    2: {
      title: "Advanced Tax Planning",
      modules: [
        {
          id: 1,
          title: "Investment Tax Strategies",
          completed: true,
          locked: false,
          content: [
            { type: 'video', title: 'Investment Income Types', duration: '30:00', completed: true },
            { type: 'reading', title: 'Capital Gains Guide', duration: '25 mins', completed: true },
            { type: 'practice', title: 'Capital Gains Calculator', duration: '45 mins', completed: true },
            { type: 'video', title: 'Tax-Efficient Investing', duration: '35:00', completed: true },
            { type: 'case-study', title: 'Investment Portfolio Analysis', duration: '40 mins', completed: true },
            { type: 'assessment', title: 'Investment Scenarios', questions: 8, completed: true }
          ]
        },
        {
          id: 2,
          title: "Estate Planning",
          completed: false,
          locked: false,
          content: [
            { type: 'video', title: 'Estate Tax Fundamentals', duration: '35:00', completed: false },
            { type: 'reading', title: 'Estate Planning Basics', duration: '30 mins', completed: false },
            { type: 'practice', title: 'Estate Tax Calculator', duration: '40 mins', completed: false },
            { type: 'video', title: 'Trust Planning Strategies', duration: '45:00', completed: false },
            { type: 'worksheet', title: 'Estate Planning Tools', duration: '40 mins', completed: false },
            { type: 'quiz', title: 'Estate Tax Assessment', questions: 12, completed: false }
          ]
        },
        {
          id: 3,
          title: "International Taxation",
          completed: false,
          locked: true,
          content: [
            { type: 'video', title: 'International Tax Basics', duration: '40:00', completed: false },
            { type: 'reading', title: 'Foreign Income Guide', duration: '35 mins', completed: false },
            { type: 'practice', title: 'FBAR Reporting Workshop', duration: '50 mins', completed: false },
            { type: 'video', title: 'Treaty Benefits Overview', duration: '30:00', completed: false },
            { type: 'case-study', title: 'International Tax Scenarios', duration: '45 mins', completed: false },
            { type: 'assessment', title: 'Global Tax Quiz', questions: 15, completed: false }
          ]
        },
        {
          id: 4,
          title: "Business Tax Planning",
          completed: false,
          locked: true,
          content: [
            { type: 'video', title: 'Business Structure & Taxation', duration: '45:00', completed: false },
            { type: 'reading', title: 'Business Deductions Guide', duration: '40 mins', completed: false },
            { type: 'practice', title: 'Business Expense Tracking', duration: '35 mins', completed: false },
            { type: 'video', title: 'Tax Credits for Businesses', duration: '30:00', completed: false },
            { type: 'worksheet', title: 'Business Tax Planning', duration: '50 mins', completed: false },
            { type: 'final-quiz', title: 'Business Tax Mastery', questions: 20, completed: false }
          ]
        }
      ]
    }
  };

  const handleStartCourse = (courseId) => {
    setSelectedCourse(courseId);
    setActiveModule(1);
  };

  const getContentIcon = (type) => {
    switch(type) {
      case 'video': return <FaPlay />;
      case 'reading': return <FaBook />;
      case 'quiz': return <FaQuestionCircle />;
      case 'practice': return <FaFile />;
      default: return <FaFile />;
    }
  };

  const stats = [
    { number: "24", label: "Courses", icon: <FaGraduationCap /> },
    { number: "120+", label: "Lessons", icon: <FaBook /> },
    { number: "5K+", label: "Students", icon: <FaLightbulb /> },
    { number: "98%", label: "Success Rate", icon: <FaTrophy /> }
  ];

  if (selectedCourse) {
    const course = courseContent[selectedCourse];
    return (
      <div className="course-view fade-in">
        <button 
          className="back-button"
          onClick={() => setSelectedCourse(null)}
        >
          <FaArrowLeft /> Back to Courses
        </button>

        <h2 className="course-title">{course.title}</h2>
        
        <div className="course-layout">
          <div className="modules-sidebar">
            {course.modules.map(module => (
              <div 
                key={module.id}
                className={`module-item ${module.locked ? 'locked' : ''} ${module.completed ? 'completed' : ''} ${activeModule === module.id ? 'active' : ''}`}
                onClick={() => !module.locked && setActiveModule(module.id)}
              >
                <div className="module-header">
                  {module.completed ? <FaCheck className="module-icon" /> : 
                   module.locked ? <FaLock className="module-icon" /> : 
                   <span className="module-number">{module.id}</span>}
                  <span className="module-title">{module.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="module-content">
            {course.modules.find(m => m.id === activeModule)?.content.map((item, index) => (
              <div key={index} className="content-item">
                {getContentIcon(item.type)}
                <div className="content-info">
                  <h4>{item.title}</h4>
                  <span className="content-meta">
                    {item.duration || `${item.questions} questions`}
                  </span>
                </div>
                <button className={`content-button ${item.completed ? 'completed' : ''}`}>
                  {item.completed ? 'Review' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-container fade-in">
      <div className="learn-header">
        <h1>Learn Tax Management</h1>
        <p>Master tax fundamentals and advanced strategies through our comprehensive courses</p>
      </div>

      {/* Learning sections with lock effect */}
      <div className={`learning-content ${!auth.currentUser ? 'locked' : ''}`}>
        <div className="learn-navigation">
          <div className="tabs-wrapper">
            {[
              { id: 'courses', icon: <FaVideo />, label: 'Courses' },
              { id: 'quiz', icon: <FaQuestionCircle />, label: 'Practice Quiz' },
              { id: 'certificates', icon: <FaCertificate />, label: 'Certificates' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="learn-content">
          {activeTab === 'courses' && (
            <div className="courses-grid">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="course-card slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="course-icon">{course.icon}</div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="duration">{course.duration}</span>
                    <span className={`level ${course.level.toLowerCase()}`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="modules-list">
                    {course.modules.map((module, i) => (
                      <div key={i} className="module-item">
                        <span className="module-dot"></span>
                        {module}
                      </div>
                    ))}
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  <button className="start-course-btn glow" onClick={() => handleStartCourse(course.id)}>
                    {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="quiz-grid">
              {quizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="quiz-card slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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
                  <button className="start-quiz-button glow">Take Quiz</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="certificates-grid">
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className="certificate-card slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="certificate-badge">{cert.badge}</div>
                  <h3>{cert.title}</h3>
                  <div className="certificate-meta">
                    <div className={`status ${cert.status.toLowerCase().replace(' ', '-')}`}>
                      {cert.status}
                    </div>
                    {cert.progress && (
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: cert.progress }}></div>
                        <span>{cert.progress}</span>
                      </div>
                    )}
                    {cert.validUntil && (
                      <div className="valid-until">Valid until: {cert.validUntil}</div>
                    )}
                  </div>
                  {cert.requirements && (
                    <div className="requirements-list">
                      {cert.requirements.map((req, i) => (
                        <div key={i} className="requirement-item">
                          <span className="requirement-dot"></span>
                          {req}
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="certificate-action-button glow">
                    {cert.status === 'Completed' ? 'View Certificate' : 
                     cert.status === 'In Progress' ? 'Continue' : 'Start Certification'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {!auth.currentUser && (
          <div className="lock-overlay">
            <FaLock className="lock-icon" />
            <p>Sign in to access learning resources</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;