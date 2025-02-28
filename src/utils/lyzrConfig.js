const LYZR_API_KEY = 'sk-default-6wSSyJrvP07A6C7X0oR2lls3NbO28SIU';
const LYZR_API_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';

export const createLyzrCompletion = async (prompt, pdfContent) => {
  try {
    const response = await fetch(LYZR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LYZR_API_KEY
      },
      body: JSON.stringify({
        user_id: "ganeshponnar005@gmail.com",
        agent_id: "67c0b5e50606a0f240480445",
        session_id: "67c0b5e50606a0f240480445",
        message: `Context from PDF: ${pdfContent}\n\nQuestion: ${prompt}`
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || 'No response from the agent';
  } catch (error) {
    console.error('Lyzr API Error:', error);
    throw new Error(error.message || 'Failed to get response from Lyzr AI');
  }
};
