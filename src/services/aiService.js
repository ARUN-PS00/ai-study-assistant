import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

//temp
console.log(import.meta.env.VITE_GEMINI_API_KEY);



export const askAI = async (message) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.error("Gemini API key is missing. Set VITE_GEMINI_API_KEY in .env.");
    return "The Gemini API key is not configured.";
  }

  try {
    const result = await model.generateContent(message);
    return await result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I couldn't generate a response.";
  }
};




