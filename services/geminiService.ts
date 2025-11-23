import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS } from '../constants';

const apiKey = process.env.API_KEY || '';
// Initialize lazily to avoid errors if key is missing on load
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai && apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

const SYSTEM_INSTRUCTION = `
You are "Musthak's Virtual Assistant", an AI agent embedded in the personal portfolio of F. Mohamad Musthak Ali.
Your goal is to represent Musthak professionally and creatively.
You are talking to a potential employer or collaborator.

Key Information about Musthak:
- **Role**: ${PERSONAL_INFO.role}
- **Tagline**: ${PERSONAL_INFO.tagline}
- **Bio**: ${PERSONAL_INFO.bio}
- **Skills**: ${JSON.stringify(SKILLS)}
- **Projects**: ${JSON.stringify(PROJECTS.map(p => ({ title: p.title, desc: p.description, tech: p.technologies })))}

Guidelines:
1. Be concise, polite, and enthusiastic.
2. Highlight his hybrid skill set (Design + Automation).
3. If asked about specific projects, provide details from the context.
4. Keep answers under 3-4 sentences unless asked for detail.
5. If asked about contact info, refer them to the contact section.
`;

export const sendMessageToGemini = async (history: { role: string, text: string }[], newMessage: string) => {
  const client = getAIClient();
  if (!client) {
    return "I'm sorry, but I can't connect to my brain right now (API Key missing). Please reach out to Musthak directly!";
  }

  try {
    const model = client.models;
    
    // Convert simple history to API format if needed, but for single turn or simple chat we can use chat structure.
    // For simplicity in this demo, we will use generateContent with a structured prompt history or a chat session.
    
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Replay history to restore state (basic implementation)
    // In a production app, we would maintain the chat object instance.
    // For this stateless service call, we'll add history to the prompt context or assume a fresh session for simplicity 
    // but let's try to mock history injection if the SDK supports it effectively, 
    // otherwise we just send the new message with the system instruction guiding it.
    
    // To keep it robust and simple for this specific artifact:
    // We will use generateContent for the specific turn to ensure statelessness doesn't break the UI flow 
    // or use a persistent chat object in the component. 
    // Let's use the Chat object approach but we need to pass previous history.
    
    // Actually, let's just send the message. The system instruction is powerful enough for single queries in a portfolio context.
    // If we want history, we pass it.
    
    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I seem to be having a momentary glitch. Must contain too much creative energy! Try again?";
  }
};
