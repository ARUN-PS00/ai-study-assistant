function ChatBox({ theme }) {
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

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-semibold mb-4">
        Chat Assistant
      </h2>

      <div className={`${panelClass} flex flex-col justify-between`}
        style={{ minHeight: '500px' }}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="rounded-xl bg-slate-800/40 p-4 text-slate-300">
            AI: Welcome! Upload a document to begin.
          </div>
        </div>

        <div className="border-t border-slate-700/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              placeholder="Ask a question..."
              className={inputClass}
            />
            <button className="rounded-full bg-sky-600 px-5 py-2 text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;