import { useEffect, useRef, useState } from "react";
import { askAI } from "../services/aiService";

function ChatBox({ theme, setQuestionCount, documentText }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const messagesEndRef = useRef(null);

  const containerClass =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 p-6 rounded-xl shadow"
      : "bg-white text-slate-900 p-6 rounded-xl shadow";

  const panelClass =
    theme === "dark"
      ? "rounded-lg p-3 mb-4 border border-slate-700 bg-slate-950 text-slate-100"
      : "rounded-lg p-3 mb-4 border border-slate-200 bg-slate-50 text-slate-900";

  const inputClass =
    theme === "dark"
      ? "w-full min-w-0 rounded-xl border border-slate-600 bg-slate-950/70 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
      : "w-full min-w-0 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30";

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingDots((prev) => {
        if (!isLoading) return "";
        if (prev.length >= 3) return "";
        return `${prev}.`;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setMessage("");
    setQuestionCount((count) => count + 1);
    setIsLoading(true);
    setTypingDots("");

    const prompt = documentText
      ? `Use the following uploaded document as context. If the answer is not contained in the document, answer based on your knowledge.\n\nDocument content:\n${documentText}\n\nQuestion: ${userMessage}`
      : userMessage;

    const aiText = await askAI(prompt);
    setMessages((prev) => [...prev, `AI: ${aiText}`]);
    setIsLoading(false);
  };

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-semibold mb-4">
         🤖Chat Assistant
      </h2>

      <div className={`${panelClass} flex flex-col justify-between`} style={{ minHeight: '500px' }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="rounded-xl bg-slate-800/40 p-4 text-slate-300">
            AI: Welcome! Upload a document to begin.
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.startsWith("AI:") ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`rounded-xl p-3 text-white max-w-[80%] ${msg.startsWith("AI:") ? "bg-slate-700" : "bg-sky-600"}`}
              >
                {msg}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-xl p-3 bg-slate-700 text-slate-200 max-w-[80%] animate-pulse">
                AI is typing{typingDots}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-slate-700/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className={inputClass}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !message.trim()}
              className="rounded-full bg-sky-600 px-5 py-2 text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {isLoading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;