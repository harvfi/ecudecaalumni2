import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MOCK_ALUMNI, MOCK_EVENTS, MOCK_NEWS } from "../constants";

// Construct a system context string from our mock data so the AI knows what's happening
const APP_CONTEXT = `
You are the "DECA Connect Assistant", a helpful AI for the East Carolina University (ECU) DECA Alumni network.
Your tone is professional, encouraging, and spirited (Go Pirates!).
You have access to the following data about the alumni network:

ALUMNI SPOTLIGHTS:
${JSON.stringify(MOCK_ALUMNI)}

UPCOMING EVENTS:
${JSON.stringify(MOCK_EVENTS)}

LATEST NEWS:
${JSON.stringify(MOCK_NEWS)}

If a user asks about events, list them clearly.
If a user asks about alumni achievements, mention the people in the spotlight.
If a user asks general DECA questions, answer them based on general DECA knowledge (Prepare, Emerging Leaders, etc.).
Keep answers concise (under 100 words unless asked for more).
`;

let aiClient: GoogleGenAI | null = null;

export const getAIClient = () => {
  if (!aiClient) {
    // Ideally process.env.API_KEY is available.
    // If not, we might fail gracefully or the call will throw.
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const ai = getAIClient();
    
    // We use a stateless request here for simplicity, but injecting history would be better for a full chat.
    // For this implementation, we just send the system prompt + user message.
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: APP_CONTEXT,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the DECA network right now. Please check your API key or try again later.";
  }
};
