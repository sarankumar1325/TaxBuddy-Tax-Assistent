import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDK6UnLax_KiEJ2cqcHjA4G3vqf4N4I7lg';

export const genAI = new GoogleGenerativeAI(API_KEY);

export const MODEL_NAME = 'models/gemini-1.5-flash-001';

export const generateSystemPrompt = () => `
You are a helpful assistant that provides accurate answers based on PDF content.
Follow these rules:
- Only use information from the provided content
- Be clear and concise
- If information is not in the content, say so
- Maintain high accuracy
`;
