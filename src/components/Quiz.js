import React, { useState } from 'react';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/Quiz.css';

const Quiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the standard deduction for individual taxpayers in India for FY 2023-24?",
      options: ["₹40,000", "₹50,000", "₹75,000", "₹1,00,000"],
      correct: 1
    },
    {
      id: 2,
      question: "Under Section 80C, what is the maximum deduction limit?",
      options: ["₹1,00,000", "₹1,50,000", "₹2,00,000", "₹2,50,000"],
      correct: 1
    },
    {
      id: 3,
      question: "What is the maximum deduction allowed under Section 80D for health insurance premium?",
      options: ["₹25,000", "₹50,000", "₹75,000", "₹1,00,000"],
      correct: 1
    },
    {
      id: 4,
      question: "Which income slab attracts 20% tax rate in the new tax regime?",
      options: ["₹6-9 lakhs", "₹9-12 lakhs", "₹12-15 lakhs", "₹15+ lakhs"],
      correct: 1
    },
    {
      id: 5,
      question: "What is the tax exemption limit for interest earned on savings account under Section 80TTA?",
      options: ["₹5,000", "₹10,000", "₹15,000", "₹20,000"],
      correct: 1
    },
    {
      id: 6,
      question: "Maximum deduction allowed under Section 80CCD(1B) for NPS contribution?",
      options: ["₹25,000", "₹50,000", "₹75,000", "₹1,00,000"],
      correct: 1
    },
    {
      id: 7,
      question: "What is the threshold limit for TDS on salary?",
      options: ["₹2,50,000", "₹3,00,000", "₹5,00,000", "₹7,50,000"],
      correct: 0
    },
    {
      id: 8,
      question: "Maximum exemption for House Rent Allowance (HRA) in metro cities?",
      options: ["40% of salary", "50% of salary", "60% of salary", "70% of salary"],
      correct: 1
    },
    {
      id: 9,
      question: "What is the maximum deduction under Section 80EEA for first-time home buyers?",
      options: ["₹1,00,000", "₹1,50,000", "₹2,00,000", "₹2,50,000"],
      correct: 1
    },
    {
      id: 10,
      question: "GST registration is mandatory if turnover exceeds?",
      options: ["₹20 lakhs", "₹40 lakhs", "₹50 lakhs", "₹75 lakhs"],
      correct: 0
    },
    {
      id: 11,
      question: "Maximum deduction for interest on education loan under Section 80E?",
      options: ["No limit", "₹50,000", "₹1,00,000", "₹2,00,000"],
      correct: 0
    },
    {
      id: 12,
      question: "What is the penalty for late filing of ITR after due date?",
      options: ["₹1,000", "₹5,000", "₹10,000", "₹20,000"],
      correct: 1
    },
    {
      id: 13,
      question: "Tax rate for domestic companies under new regime?",
      options: ["15%", "22%", "25%", "30%"],
      correct: 1
    },
    {
      id: 14,
      question: "Minimum balance required for PPF account?",
      options: ["₹100", "₹500", "₹1,000", "₹5,000"],
      correct: 1
    },
    {
      id: 15,
      question: "Maximum investment allowed in ELSS for tax benefit?",
      options: ["₹50,000", "₹1,00,000", "₹1,50,000", "₹2,00,000"],
      correct: 2
    },
    {
      id: 16,
      question: "TDS rate on rent payment exceeding monthly?",
      options: ["₹10,000", "₹20,000", "₹50,000", "₹1,00,000"],
      correct: 2
    },
    {
      id: 17,
      question: "Maximum deduction under Section 80G for charitable donations?",
      options: ["25% of income", "50% of income", "75% of income", "100% of income"],
      correct: 1
    },
    {
      id: 18,
      question: "Minimum alternative tax (MAT) rate for companies?",
      options: ["10%", "15%", "18%", "20%"],
      correct: 1
    },
    {
      id: 19,
      question: "Tax audit is mandatory if turnover exceeds?",
      options: ["₹50 lakhs", "₹1 crore", "₹5 crores", "₹10 crores"],
      correct: 2
    },
    {
      id: 20,
      question: "Maximum limit for cash transactions in a day?",
      options: ["₹1,00,000", "₹2,00,000", "₹5,00,000", "₹10,00,000"],
      correct: 1
    }
  ];

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    return (correct / questions.length) * 100;
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-container">
        <button className="quiz-close-btn" onClick={onClose}>
          <FaArrowLeft /> Back
        </button>

        {!showResults ? (
          <>
            <div className="quiz-progress">
              <div 
                className="quiz-progress-fill"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="quiz-content">
              <h2>Question {currentQuestion + 1} of {questions.length}</h2>
              <p className="quiz-question">{questions[currentQuestion].question}</p>

              <div className="quiz-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option ${answers[questions[currentQuestion].id] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="quiz-navigation">
                <button
                  className="quiz-nav-btn"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                >
                  Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button 
                    className="quiz-submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="quiz-nav-btn"
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="quiz-results">
            <h2>Quiz Results</h2>
            <div className="score-circle">
              <span className="score-number">{Math.round(calculateScore())}%</span>
            </div>
            <div className="results-breakdown">
              {questions.map((q, index) => (
                <div key={index} className="result-item">
                  <div className="result-question">
                    {answers[q.id] === q.correct ? (
                      <FaCheck className="correct" />
                    ) : (
                      <FaTimes className="incorrect" />
                    )}
                    <span>{q.question}</span>
                  </div>
                  <div className="result-answer">
                    Your answer: {q.options[answers[q.id]]}
                    {answers[q.id] !== q.correct && (
                      <div className="correct-answer">
                        Correct answer: {q.options[q.correct]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="quiz-retry-btn" onClick={onClose}>
              Back to Quizzes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
