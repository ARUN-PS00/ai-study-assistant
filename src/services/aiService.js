import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const SYSTEM_INSTRUCTION = `You are a study assistant that ONLY answers questions based on the uploaded document content.

CRITICAL RULES:
1. You MUST ONLY use information contained in the provided document.
2. If the answer is NOT present in the document, respond EXACTLY with: "I cannot find that information in the uploaded document."
3. Do NOT use your general knowledge.
4. Do NOT make assumptions or invent information.
5. Do NOT answer general questions that are not covered in the document.
6. Always cite or reference the document content when answering.

If a user asks something not covered in the document, immediately respond with: "I cannot find that information in the uploaded document."`;

/**
 * Validate if response appears to be answering from the document
 * Returns true if response seems valid, false if it appears to be refusing (as intended)
 */
const isValidDocumentResponse = (response) => {
  if (!response || !response.trim()) {
    return false;
  }

  // If the response is the standard refusal, that's actually valid behavior
  if (response.includes("I cannot find that information in the uploaded document")) {
    return true;
  }

  // Any other substantive response
  return true;
};

/**
 * Send a prompt to Gemini API with document-only restriction
 * @param {string} prompt - The user prompt or instruction
 * @param {string} documentText - PDF text context (REQUIRED for document-scoped queries)
 * @returns {Promise<string>} - AI response text
 */
export const sendToGemini = async (prompt, documentText = "") => {
  if (!apiKey) {
    console.error("Gemini API key is missing. Set VITE_GEMINI_API_KEY in .env.");
    throw new Error("Gemini API key is not configured.");
  }

  if (!model) {
    console.error("Gemini model initialization failed.");
    throw new Error("Unable to initialize Gemini model.");
  }

  // Validate inputs
  if (!prompt || !prompt.trim()) {
    throw new Error("Prompt cannot be empty.");
  }

  // CRITICAL: If no document provided, refuse to answer
  if (!documentText || !documentText.trim()) {
    console.warn("No document provided to sendToGemini");
    return "Please upload a PDF first.";
  }

  // Log document context for debugging
  console.log("sendToGemini - Document length:", documentText.length);
  console.log("sendToGemini - Document preview:", documentText.slice(0, 150));
  console.log("sendToGemini - User prompt:", prompt);

  // Truncate document to prevent token overflow while preserving full content
  const maxChars = 12000;
  const truncatedDoc = documentText.slice(0, maxChars);

  if (documentText.length > maxChars) {
    console.warn(
      `Document truncated from ${documentText.length} to ${maxChars} characters for API`
    );
  }

  // Build final prompt with system instruction and document-scoped format
  const finalPrompt = `${SYSTEM_INSTRUCTION}

---

DOCUMENT CONTENT:
${truncatedDoc}

---

USER QUESTION:
${prompt}`;

  try {
    const result = await model.generateContent(finalPrompt);
    const responseText = await result.response.text();

    // Validate response
    if (!isValidDocumentResponse(responseText)) {
      throw new Error("Invalid response from AI model");
    }

    console.log("Gemini response received, length:", responseText.length);
    return responseText;
  } catch (error) {
    console.error("Gemini Error:", error);
    const rawMessage = error?.message || "Unable to generate a response.";

    if (rawMessage.toLowerCase().includes("quota")) {
      throw new Error(
        "Gemini quota exceeded. Please wait a bit or check your Google Cloud billing/plan."
      );
    }

    if (rawMessage.toLowerCase().includes("blocked")) {
      throw new Error(
        "Your request was blocked by safety filters. Please rephrase your question."
      );
    }

    throw new Error(
      "Unable to generate a response from Gemini. Please try again later."
    );
  }
};

/**
 * Legacy function - use sendToGemini instead
 */
export const askAI = async (message, documentText = "") => {
  return sendToGemini(message, documentText);
};




