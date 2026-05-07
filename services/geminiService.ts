import { GoogleGenAI, Type } from "@google/genai";
import { LanguageName } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using standard responseMimeType and defining schema manually since SchemaType import might vary in versions,
// but relying on Type enum is safer as per instructions.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    code: {
      type: Type.STRING,
      description: "The generated code snippet.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, high-level explanation of how the code works.",
    },
    complexity: {
      type: Type.STRING,
      description: "A single word describing the algorithmic complexity (e.g., O(n), O(1)).",
    },
  },
  required: ["code", "explanation", "complexity"],
};

export const generateLuxuryCode = async (
  prompt: string, 
  language: LanguageName,
  isChaosMode: boolean
): Promise<{ code: string; explanation: string; complexity: string }> => {
  
  const systemInstruction = `
    You are OMNI-ARCHITECT, a supreme AI entity. 
    Your task is to generate code in the target language: ${language}.
    
    Mode: ${isChaosMode ? 'CHAOS / BRUTALIST' : 'ORDER / ELEGANT'}.
    
    If Mode is CHAOS: The explanation should be cryptic, slightly glitchy, and philosophical.
    If Mode is ORDER: The explanation should be professional, concise, and sophisticated.

    If the language is esoteric (like Malbolge or Brainfuck), allow the code to be simple (like Hello World or simple math) as complex logic is nearly impossible to generate accurately, but ensure it is syntactically valid if possible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: isChaosMode ? 1.2 : 0.7, // Higher temp for chaos
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    
    throw new Error("No content generated");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      code: "// Error connecting to the neural link.\n// Please check your connection or quota.",
      explanation: "Transmission Interrupted.",
      complexity: "N/A"
    };
  }
};