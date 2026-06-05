import { useState } from "react";
import { askAI } from "../services/aiService";

function SummaryBox({ theme, setSummaryCount, documentText }) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const containerClass =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 p-6 rounded-xl shadow"
      : "bg-white text-slate-900 p-6 rounded-xl shadow";

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-semibold mb-4">
        📝 Summary
      </h2>

      <button
        onClick={async () => {
          if (!documentText) {
            setError("Upload a document first to generate a summary.");
            return;
          }

          setError("");
          setSummary("Generating summary...");
          setIsLoading(true);

          const textToSummarize = documentText.slice(0, 12000);
          const prompt = `Summarize the following study document into a concise overview with key points and main concepts. Do not include markdown headings.\n\n${textToSummarize}`;
          const aiSummary = await askAI(prompt);

          setSummary(aiSummary);
          setSummaryCount((count) => count + 1);
          setIsLoading(false);
        }}
        disabled={isLoading}
        className="bg-green-600 disabled:bg-slate-500 text-white px-4 py-2 rounded mb-4"
      >
        {isLoading ? "Generating..." : "Generate Summary"}
      </button>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
        {summary || "Summary will appear here..."}
      </p>
    </div>
  );
}

export default SummaryBox;