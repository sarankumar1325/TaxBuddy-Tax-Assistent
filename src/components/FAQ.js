import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/FAQ.css';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [activeAccordions, setActiveAccordions] = useState({});

  const faqData = {
    general: {
      title: 'General Questions',
      icon: '🤔',
      questions: [
        {
          question: 'What is the Tax Assistant?',
          answer: 'The Tax Assistant is a digital tool that helps users manage taxes by providing expert advice, document analysis, tax summaries, and personal tax insights.'
        },
        {
          question: 'Who can use this Tax Assistant?',
          answer: 'Anyone, including individuals, freelancers, and small business owners, can use the Tax Assistant to simplify their tax processes.'
        },
        {
          question: 'Do I need to create an account to use the Tax Assistant?',
          answer: 'Yes, creating an account allows you to securely store and access your tax data.'
        },
        {
          question: 'How accurate is the Tax Assistant\'s advice?',
          answer: 'The assistant provides guidance based on tax regulations and best practices, but you should consult a tax professional for complex tax situations.'
        },
        {
          question: 'Is the Tax Assistant available 24/7?',
          answer: 'Yes, you can access the assistant anytime to get tax-related insights.'
        },
        {
          question: 'Does the Tax Assistant support different tax laws in various countries?',
          answer: 'Currently, it supports tax laws for selected regions. Check the settings to see if your country is supported.'
        },
        {
          question: 'Can I use the Tax Assistant for business tax filing?',
          answer: 'Yes, but the tool is mainly designed for individuals and freelancers. Business users may need additional services.'
        },
        {
          question: 'Does the assistant provide real-time tax updates?',
          answer: 'Yes, it stays updated with the latest tax regulations and changes.'
        },
        {
          question: 'Is there a limit to how many questions I can ask?',
          answer: 'No, you can ask as many questions as needed. However, some advanced features may require a subscription.'
        },
        {
          question: 'Can I integrate this Tax Assistant with other financial tools?',
          answer: 'Currently, integration options are limited, but future updates may include connections with accounting software.'
        }
      ]
    },
    advice: {
      title: 'Get Advice Feature',
      icon: '💡',
      questions: [
        {
          question: 'How can I ask tax-related questions?',
          answer: 'You can type your question into the chat, and the assistant will provide relevant tax advice.'
        },
        {
          question: 'What types of advice does the Tax Assistant offer?',
          answer: 'It can guide tax deductions, filing procedures, investment-related tax benefits, and more.'
        },
        {
          question: 'Can the assistant help me choose the right tax form?',
          answer: 'Yes, it can suggest which tax forms are required based on your income and filing status.'
        },
        {
          question: 'Does the assistant help with tax-saving strategies?',
          answer: 'Absolutely! It provides recommendations to optimize deductions and reduce tax liability.'
        },
        {
          question: 'Can I get state-specific tax advice?',
          answer: 'Yes, the assistant provides region-based tax guidance where applicable.'
        }
      ]
    },
    pdf: {
      title: 'PDF Upload Feature',
      icon: '📄',
      questions: [
        {
          question: 'What type of tax documents can I upload?',
          answer: 'You can upload W-2s, 1099s, tax returns, receipts, and other financial documents in PDF format.'
        },
        {
          question: 'How does the PDF upload feature work?',
          answer: 'Simply upload your document, and the assistant will extract key details and provide a summary.'
        },
        {
          question: 'Is my uploaded document stored permanently?',
          answer: 'No, documents are stored temporarily for processing and deleted after a specified period.'
        },
        {
          question: 'How secure is my uploaded data?',
          answer: 'All documents are encrypted and protected using industry-standard security measures.'
        },
        {
          question: 'Can I upload multiple documents at once?',
          answer: 'Yes, you can upload multiple PDFs, and the assistant will analyze each file separately.'
        }
      ]
    },
    summary: {
      title: 'Tax Summary & Analysis',
      icon: '📊',
      questions: [
        {
          question: 'What does the tax summary include?',
          answer: 'The summary provides a breakdown of taxable income, deductions, and estimated tax liabilities.'
        },
        {
          question: 'How accurate is the tax summary?',
          answer: 'It is based on the provided data, but you should verify it before filing your taxes.'
        },
        {
          question: 'Can I view a detailed breakdown of my taxes?',
          answer: 'Yes, the assistant provides an itemized view of your income, deductions, and tax calculations.'
        },
        {
          question: 'Does the assistant provide tax refund estimates?',
          answer: 'Yes, based on your income and deductions, it can estimate your potential refund.'
        },
        {
          question: 'Can I compare my tax summary with previous years?',
          answer: 'Yes, you can upload past tax records for comparison.'
        }
      ]
    },
    technical: {
      title: 'Technical & Security',
      icon: '🔒',
      questions: [
        {
          question: 'Is my tax data encrypted?',
          answer: 'Yes, all data is encrypted to ensure security and privacy.'
        },
        {
          question: 'Can I delete my tax history from the assistant?',
          answer: 'Yes, you can manually delete your data anytime.'
        },
        {
          question: 'How do I reset my password if I forget it?',
          answer: 'Use the "Forgot Password" option to reset it via email verification.'
        },
        {
          question: 'Can I use the Tax Assistant on my mobile phone?',
          answer: 'Yes, it is accessible via a web app and mobile-friendly interface.'
        },
        {
          question: 'What happens if I experience a technical issue?',
          answer: 'Contact customer support for assistance.'
        }
      ]
    }
  };

  const toggleAccordion = (section, index) => {
    setActiveAccordions(prev => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`]
    }));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      
      <div className="faq-tabs">
        {Object.entries(faqData).map(([key, { title, icon }]) => (
          <button
            key={key}
            className={`faq-tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <span className="tab-icon">{icon}</span>
            <span className="tab-text">{title}</span>
          </button>
        ))}
      </div>

      <div className="faq-content">
        {Object.entries(faqData).map(([key, { questions }]) => (
          <div
            key={key}
            className={`faq-section-content ${activeTab === key ? 'active' : ''}`}
          >
            <div className="accordion-container">
              {questions.map((item, index) => (
                <div 
                  key={index}
                  className={`accordion-item ${
                    activeAccordions[`${key}-${index}`] ? 'active' : ''
                  }`}
                >
                  <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(key, index)}
                  >
                    <span className="accordion-title">{item.question}</span>
                    {activeAccordions[`${key}-${index}`] ? 
                      <FaChevronUp className="accordion-icon" /> : 
                      <FaChevronDown className="accordion-icon" />
                    }
                  </button>
                  <div className="accordion-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;