import { useState, useRef, useEffect } from "react";
import { askAI } from "../services/aiService";
import { auth } from "../firebase/firebase";
import { saveChat } from "../services/chatService";

function ChatBoxNew({ theme, documentText }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "ai",
      text: "Welcome to AI Study Assistant! Upload a PDF document to get started. You can ask questions, generate summaries, create quizzes, and more.",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Study tool templates
  const studyTools = [
    {
      label: "Summarize",
      prompt: "Create a detailed summary of the study material with key points and main concepts.",
    },
    {
      label: "Generate Quiz",
      prompt: "Generate 10 multiple choice questions (MCQs) from the study material. Format: Q1. Question?\nA) Option\nB) Option\nC) Option\nD) Option\nCorrect: A",
    },
    {
      label: "Flashcards",
      prompt: "Generate 10 flashcards from the study material. Format each as:\nQ: Question\nA: Answer",
    },
    {
      label: "Viva Questions",
      prompt: "Generate 10 viva/interview questions from the study material with brief expected answers.",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (prompt = userInput) => {
    if (!prompt.trim()) {
      setError("Please enter a message or select a study tool.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Add user message to chat UI immediately
    const userMessageId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        type: "user",
        text: prompt,
      },
    ]);

    setUserInput("");

    try {
      // Local dictionary to capture casual small talk without burning API tokens
      const casualResponses = {
        hi: "👋 Hi! Upload a PDF and I'll help you study it.",
        hai: "👋 Hi! Upload a PDF and let's get started.",
        hello: "👋 Hello! Ready to study?",
        hey: "👋 Hey there!",
        thanks: "😊 You're welcome!",
        "thank you": "😊 Happy to help!",
        great: "🎉 Glad it helped!",
        awesome: "🚀 Awesome!",
        ok: "👍 Okay!",
        okay: "👍 Okay!",
        cool: "😎 Cool!",
        nice: "😊 Nice!",
        good: "👍 Great!",
        wow: "🤩 Glad you liked it!",
        bye: "👋 Bye! See you later!",
        goodbye: "👋 Goodbye!",
        help: "📚 Upload a PDF and ask questions about it.",
      };

      const normalized = prompt.toLowerCase().trim();

      // OPTIMIZATION: Intercept casual messaging BEFORE demanding a document load state
      if (casualResponses[normalized]) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "ai",
            text: casualResponses[normalized],
          },
        ]);
        setIsLoading(false);
        return;
      }

      // Check document text availability if it requires deep AI generation
      if (!documentText || !documentText.trim()) {
        setError("Please upload a PDF document first.");
        setIsLoading(false);
        return;
      }

      console.log("Sending to Gemini - Document length:", documentText.length);
      console.log("User prompt:", prompt);

      // System rules injected tightly onto target document context
      const fullPrompt = `
You are an AI Study Assistant.

RULES:
1. Answer ONLY using the uploaded document.
2. If the answer is not found in the document, reply exactly:
   "Information not found in uploaded notes."
3. Keep answers concise and focused.
4. Use bullet points where appropriate.
5. Do not make up information.
6. Do not use outside knowledge.
7. For summaries, provide key points and important concepts.
8. For quizzes, generate MCQs strictly from the document.
9. For flashcards, create Q&A pairs from the document.
10. For viva questions, provide short model answers.

DOCUMENT:
${documentText}

QUESTION:
${prompt}
`;

      const aiResponse = await askAI(fullPrompt);

      // Save chat history securely to Firestore if user is logged in
      if (auth?.currentUser) {
        await saveChat(
          auth.currentUser.uid,
          prompt,
          aiResponse
        );
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "ai",
          text: aiResponse,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err?.message || "Failed to get response from AI. Please try again.");

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "error",
          text: `Error: ${err?.message || "Unable to process your request."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (toolPrompt) => {
    if (!documentText || !documentText.trim()) {
      setError("Please upload a PDF document first.");
      return;
    }
    handleSendMessage(toolPrompt);
  };

  const containerClass =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 p-6 rounded-xl shadow"
      : "bg-white text-slate-900 p-6 rounded-xl shadow";

  const messagesContainerClass =
    theme === "dark"
      ? "bg-slate-950 border border-slate-700"
      : "bg-slate-50 border border-slate-200";

  const inputClass =
    theme === "dark"
      ? "flex-1 rounded-lg border border-slate-600 bg-slate-950 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
      : "flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30";

  const buttonClass =
    theme === "dark"
      ? "bg-slate-700 hover:bg-slate-600 text-slate-100"
      : "bg-slate-200 hover:bg-slate-300 text-slate-900";

  const userMessageClass =
    theme === "dark"
      ? "bg-sky-600 text-white"
      : "bg-sky-500 text-white";

  const aiMessageClass =
    theme === "dark"
      ? "bg-slate-700 text-slate-100"
      : "bg-slate-200 text-slate-900";

  const errorMessageClass = "bg-red-600 text-white";

  return (
    <div className={containerClass}>
      <h2 className="text-2xl font-bold mb-4">🤖 AI Study Assistant</h2>

      {/* Quick Action Buttons */}
      <div className="mb-4">
        <p className="text-sm font-semibold mb-2 opacity-75">Quick Actions:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {studyTools.map((tool, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(tool.prompt)}
              disabled={isLoading || !documentText}
              className={`px-3 py-2 text-sm rounded-lg transition ${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Chat Messages */}
      <div
        className={`${messagesContainerClass} rounded-lg p-4 mb-4 flex flex-col gap-3 overflow-y-auto`}
        style={{ minHeight: "400px", maxHeight: "500px" }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-4 break-words ${
                msg.type === "user"
                  ? userMessageClass
                  : msg.type === "error"
                  ? errorMessageClass
                  : aiMessageClass
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className={`rounded-lg p-4 ${aiMessageClass}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                <p className="text-sm">AI is thinking...</p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Document Status */}
      <div className="mb-4 text-xs opacity-60">
        {documentText ? (
          <p>📄 Document loaded ({documentText.length} characters)</p>
        ) : (
          <p>📄 No document uploaded - upload a PDF to ask questions</p>
        )}
      </div>

      {/* Input Area */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Ask a question about your document..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
          className={inputClass}
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !documentText}
          className="rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-slate-500 px-6 py-2 text-white font-medium transition disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBoxNew;