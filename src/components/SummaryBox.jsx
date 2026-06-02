function SummaryBox({ theme }) {
  const containerClass =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 p-6 rounded-xl shadow"
      : "bg-white text-slate-900 p-6 rounded-xl shadow";

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-semibold mb-4">
        Summary
      </h2>

      <p className={theme === "dark" ? "text-slate-300" : "text-slate-600"}>
        Summary will appear here...
      </p>
    </div>
  );
}

export default SummaryBox;