import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export const getAiResponse = async (prompt: string, lang: 'EN' | 'NE' | 'MAI') => {
  try {
    const systemInstruction = `
      You are "Utsav AI Pandit", a friendly cultural advisor and event assistant for Utsavnagar.
      Your tone is helpful, traditional yet modern, and slightly informal like a close family friend.
      
      CRITICAL RULES:
      1. Responses MUST be short (max 2-3 sentences).
      2. Keep information specific to Utsavnagar, Morang, and Nepalese/Maithili culture.
      3. If asked about "Sait", mention that Mangsir is a good month but consulting a local pandit is best.
      4. Support three languages: English, Nepali, and Maithili.
      5. Respond in the language specified: ${lang}.
      6. Mention features of the "utsav" app if relevant (QR invites, Galli maps, Digital Salami).
      7. Be exact and direct.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The stars are currently misaligned. Please check your connection and try again.";
  }
};
