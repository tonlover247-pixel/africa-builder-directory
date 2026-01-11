
import { GoogleGenAI } from "@google/genai";
import { Builder } from "../types";

/**
 * Generates a comprehensive startup package using Gemini 3 Pro.
 * Reserved for Whale / Pro subscription tier.
 */
export const generateStartupPitch = async (builder: Builder) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    System Instruction: You are an elite YC Startup Partner and visionary venture capitalist.
    
    Task: Generate a high-conversion startup package for the following founder:
    
    Founder: ${builder.name}
    Project Name: ${builder.projectName}
    Bio: ${builder.bio}
    Primary Ecosystem: ${builder.ecosystem}
    
    Output Requirements:
    1. A visionary 1-sentence "X for Y" pitch.
    2. A YC-style "The Problem" and "Our Solution" breakdown.
    3. A strategic "Growth Roadmap" for the next 12 months in Africa.
    4. A production-ready README.md intro for the project.
    
    Style: Professional, bold, and investment-ready. Use Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        temperature: 0.7,
        topK: 40,
        topP: 0.95
      }
    });

    return response.text;
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      return "ERROR: API configuration mismatch. Please check your project settings.";
    }
    return "The AI engine is currently over capacity. Please try again in a moment.";
  }
};
