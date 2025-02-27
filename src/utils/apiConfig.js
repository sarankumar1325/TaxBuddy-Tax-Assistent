export const API_KEY = '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';
export const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const createCompletion = async (prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'TaxBuddy PDF Assistant'
      },
      body: JSON.stringify({
        model: 'google/gemini-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that answers questions about PDF documents. Only use information from the provided context to answer questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Failed to get response from AI');
  }
};
