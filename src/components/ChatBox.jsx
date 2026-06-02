function ChatBox({ theme }) {
  const containerClass =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 p-6 rounded-xl shadow"
      : "bg-white text-slate-900 p-6 rounded-xl shadow";

  const panelClass =
    theme === "dark"
      ? "h-60 rounded-lg p-3 mb-4 border border-slate-700 bg-slate-950 text-slate-100"
      : "h-60 rounded-lg p-3 mb-4 border border-slate-200 bg-slate-50 text-slate-900";

  const inputClass =
    theme === "dark"
      ? "flex-1 rounded-lg p-2 border border-slate-700 bg-slate-950 text-slate-100"
      : "flex-1 rounded-lg p-2 border border-slate-200 bg-white text-slate-900";

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-semibold mb-4">
        Chat Assistant
      </h2>

      <div className={panelClass}>
        AI: Welcome! Upload a document to begin.
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask a question..."
          className={inputClass}
        />

        <button className="bg-blue-600 text-white px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;