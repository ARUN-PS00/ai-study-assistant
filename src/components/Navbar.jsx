export default function Navbar({ theme, onToggleTheme }) {
  const buttonClasses =
    theme === "dark"
      ? "theme-switcher inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      : "theme-switcher inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400";

  const navClasses =
    theme === "dark"
      ? "navbar flex items-center justify-between px-6 py-4 border-b border-slate-700/40 bg-slate-950 text-slate-100"
      : "navbar flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white text-slate-900";

  return (
    <nav className={navClasses}>
      <h1 className="text-xl font-semibold">AI Study Assistant</h1>
      <button
        type="button"
        onClick={onToggleTheme}
        className={buttonClasses}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
