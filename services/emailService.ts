import { GoogleGenAI } from "@google/genai";
import { Event } from "../types";

const EMAIL_DRAFT_PROMPT = (event: Event) => `
Draft a professional and highly engaging email announcement for the ECU DECA Alumni chapter.
The tone should be spirited (Go Pirates!), professional, and community-focused.

EVENT DETAILS:
Title: ${event.title}
Date: ${event.date}
Time: ${event.time}
Location: ${event.location}
Description: ${event.description}

STRUCTURE:
1. Subject line: Catchy and Pirate-themed.
2. Greeting: "Dear Pirate Family," or similar.
3. Hook: Mention why this event matters for the alumni chapter.
4. Details: List the logistics clearly.
5. CTA: Encourage them to RSVP on the network site.
6. Sign-off: "Go Pirates!", "The ECU DECA Alumni Board", and mention contact "ecudecaalumni@gmail.com".

Keep it under 200 words.
`;

export const draftAnnouncementEmail = async (event: Event): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: EMAIL_DRAFT_PROMPT(event),
    });

    return response.text || "New Event Updated! Log in to view details and RSVP.";
  } catch (error) {
    console.error("Gemini Email Drafting Error:", error);
    return `New event: ${event.title} is now live on the ECU DECA Alumni site. Check it out for details!`;
  }
};

export const simulateEmailDispatch = async (count: number): Promise<boolean> => {
  // Simulate network latency for bulk send
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Successfully dispatched mock emails to ${count} subscribers.`);
      resolve(true);
    }, 2000);
  });
};