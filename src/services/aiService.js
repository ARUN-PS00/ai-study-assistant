import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const defaultModel =
  import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

const fallbackModel = "gemini-2.5-flash";

if (!apiKey) {
  console.error("Gemini API key is missing. Set VITE_GEMINI_API_KEY in .env.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const getModel = (modelName) => {
  if (!genAI) {
    throw new Error("Gemini API key is required to create a model.");
  }
  return genAI.getGenerativeModel({ model: modelName });
};

const formatErrorMessage = (error) => {
  const message = error?.message || "Unable to reach Gemini.";
  
  // Handle temporary high-demand/overloaded server states
  if (error?.status === 503) {
    return "AI is busy right now. Please try again in a few seconds.";
  }
  
  // Handle rate limits and quotas
  if (error?.status === 429) {
    return `Sorry, I couldn't generate a response due to API quota limits. ${message}`;
  }
  
  return `Sorry, I couldn't generate a response. ${message}`;
};

const tryGenerate = async (modelName, message) => {
  const model = getModel(modelName);
  const result = await model.generateContent(message);
  return result.response.text();
};

export const askAI = async (message) => {
  if (!apiKey) {
    return "The Gemini API key is not configured.";
  }

  try {
    return await tryGenerate(defaultModel, message);
  } catch (error) {
    console.error("Gemini Error:", error);

    // If default model hits rate limits, try the fallback model configuration
    if (error?.status === 429 && fallbackModel !== defaultModel) {
      try {
        console.warn(`Retrying Gemini call with fallback model ${fallbackModel}`);
        return await tryGenerate(fallbackModel, message);
      } catch (fallbackError) {
        console.error("Gemini fallback error:", fallbackError);
        return formatErrorMessage(fallbackError);
      }
    }

    if (error?.message?.includes("404")) {
      return "Gemini model configuration is invalid. Check VITE_GEMINI_MODEL.";
    }

    return formatErrorMessage(error);
  }
};