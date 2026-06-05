import { useState } from "react";

function SummaryBox({ theme, setSummaryCount }) {
  const [summary, setSummary] = useState("");

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
  onClick={() => {
    setSummary(
      "This document discusses important concepts and key topics for study."
    );

    setSummaryCount((count) => count + 1);
  }}
  className="bg-green-600 text-white px-4 py-2 rounded mb-4"
>
  Generate Summary
</button>

      <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
        {summary || "Summary will appear here..."}
      </p>
    </div>
  );
}

export default SummaryBox;