
import { useAuth } from "../context/AuthContext";

export default function Navbar({
  theme,
  onToggleTheme,
  currentPage,
  setCurrentPage,
}) {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage("login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
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
      <div className="flex items-center gap-4">
  <h1 className="text-xl font-semibold">AI Study Assistant</h1>
      <button
        onClick={() => setCurrentPage("home")}
        className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        Home
      </button>

      <button
        onClick={() => setCurrentPage("settings")}
        className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        Settings
      </button>

      {currentUser ? (
        <>
          <button
            onClick={() => setCurrentPage("profile")}
            className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-red-600"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setCurrentPage("login")}
            className="px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Login
          </button>
        </>
      )}
</div>
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
