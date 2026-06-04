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
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
  📚 Documents Uploaded
</h3>
    <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
  0
</p>
  </div>

  <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
      📝 Summaries Generated
    </h3>
    <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
  0
</p>
  </div>

  <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
  💬 Questions Asked
</h3>
    <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
  0
</p>
  </div>
</section> 
        <FileUpload theme={theme} />
        <SummaryBox theme={theme} />
        <ChatBox theme={theme} />
      </div>
    </div>
  );
}

export default Home;
