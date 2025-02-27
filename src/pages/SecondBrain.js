import React, { useState, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { createLyzrCompletion } from '../utils/lyzrConfig';
import '../styles/SecondBrain.css';

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const SecondBrain = () => {
  const [pdfContent, setPdfContent] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .replace(/\s+/g, ' '); // Clean up whitespace
        fullText += pageText + '\n\n';
        setProgress((i / pdf.numPages) * 100);
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadError('File size too large. Please upload a PDF smaller than 10MB.');
      return;
    }

    setIsProcessing(true);
    setLoading(true);
    setFileName(file.name);
    setUploadError('');
    setProgress(0);
    setPdfContent('');

    try {
      setProgress(30);
      const text = await extractTextFromPDF(file);
      setProgress(70);
      
      if (!text.trim()) {
        throw new Error('No readable text found in PDF');
      }

      setPdfContent(text);
      setProgress(100);
      setResponse('PDF uploaded successfully! You can now ask questions about its content.');
    } catch (error) {
      console.error('PDF processing error:', error);
      setUploadError(error.message || 'Could not process PDF. Please try again.');
      setPdfContent('');
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  const askQuestion = async () => {
    if (!pdfContent) {
      setResponse('Please upload a PDF first.');
      return;
    }

    if (!question.trim()) {
      setResponse('Please enter a question.');
      return;
    }

    setLoading(true);
    try {
      const response = await createLyzrCompletion(question, pdfContent.substring(0, 15000));
      setResponse(response);
    } catch (error) {
      console.error('API error:', error);
      setResponse('Error: ' + (error.message || 'Could not get a response. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="second-brain-container">
      <div className="header">
        <h1>Tax Second Brain</h1>
        <p className="subtitle">Your Intelligent Tax Document Assistant</p>
        <div className="powered-by">
          Powered by <a href="https://lyzr.ai" target="_blank" rel="noopener noreferrer">Lyzr AI</a>
        </div>
      </div>
      
      <div className="upload-section">
        <div className="upload-box">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>{fileName || 'Drop your tax document here or click to upload'}</span>
            <p className="file-hint">Supports PDF format up to 10MB</p>
          </label>
          {isProcessing && (
            <div className="processing-indicator">
              <div className="loading-pulse"><div></div></div>
              <span>Processing your document: {Math.round(progress)}%</span>
            </div>
          )}
          {uploadError && <div className="error-message">{uploadError}</div>}
        </div>
      </div>

      <div className="chat-section">
        <div className="chat-input-container">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about your tax document..."
            className="question-input"
            disabled={!pdfContent}
          />
          <button 
            onClick={askQuestion}
            disabled={loading || !pdfContent}
            className="ask-button"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <i className="fas fa-robot"></i>
                Get Agent's Answer
              </>
            )}
          </button>
        </div>
      </div>

      {response && (
        <div className="response-section">
          <h3>
            <i className="fas fa-lightbulb"></i>
            AI Response
          </h3>
          <div className="response-content">
            {response}
          </div>
        </div>
      )}

      <div className="lyzr-badge">
        <img 
          src={process.env.PUBLIC_URL + '/dlyzrownload-removebg-preview.png'} 
          alt="Lyzr AI Logo" 
          className="lyzr-logo"
        />
        Powered by Lyzr AI
      </div>
    </div>
  );
};

export default SecondBrain;