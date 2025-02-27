import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Configure PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const PDF_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

export const cleanPDFText = (text) => {
  return text
    .replace(/\s+/g, ' ')      // Replace multiple spaces with single space
    .replace(/[\r\n]+/g, '\n') // Replace multiple line breaks with single line break
    .trim();                   // Remove leading/trailing whitespace
};

export const validatePDFFile = (file) => {
  if (!file) {
    throw new Error('No file selected');
  }

  if (!file.type.includes('pdf')) {
    throw new Error('Please upload a PDF file');
  }

  if (file.size > PDF_SIZE_LIMIT) {
    throw new Error('File size too large. Please upload a PDF smaller than 10MB');
  }

  return true;
};

export const splitTextIntoChunks = (text, maxChunkSize = 10000) => {
  const chunks = [];
  const sentences = text.split(/[.!?]+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += sentence + '. ';
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
};
