import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.localStorage.getItem("theme") || "light";
  });
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

 return (
  <>
    <Navbar
      theme={theme}
      onToggleTheme={toggleTheme}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />

    {currentPage === "home" && (
      <Home
        theme={theme}
        onToggleTheme={toggleTheme}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    )}

    {currentPage === "profile" && <Profile />}

    {currentPage === "settings" && <Settings />}
  </>
);
}

export default App;