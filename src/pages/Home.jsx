import RecentDocuments from "../components/RecentDocuments";
import FileUpload from "../components/FileUpload";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

function Home({ theme }) {
  const [documentText, setDocumentText] = useState("");

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-slate-100 text-slate-900"
      }
    >
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            AI Study Assistant 📚
          </h1>
          <p
            className={
              theme === "dark"
                ? "text-slate-300 mt-3"
                : "text-slate-600 mt-3"
            }
          >
            Upload a PDF and ask AI to summarize, quiz, or explain any content.
          </p>
        </div>

        {/* File Upload Section */}
        <FileUpload
          theme={theme}
          setDocumentCount={() => {}}
          setDocumentText={setDocumentText}
        />
<RecentDocuments />
        {/* Chat Interface */}
        <ChatBox theme={theme} documentText={documentText} />
      </div>
    </div>
  );
}

export default Home;
