import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import SummaryBox from "../components/SummaryBox";
import ChatBox from "../components/ChatBox";

function Home({ theme, onToggleTheme }) {
  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-slate-100 text-slate-900"
      }
    >
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold">AI Study Assistant</h2>

          <p className={theme === "dark" ? "text-slate-300 mt-2" : "text-slate-600 mt-2"}>
            Upload your notes and learn interactively with AI.
          </p>
        </div>

        <FileUpload theme={theme} />
        <SummaryBox theme={theme} />
        <ChatBox theme={theme} />
      </div>
    </div>
  );
}

export default Home;
