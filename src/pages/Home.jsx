import StudyHistory from "../components/StudyHistory";
import FileUpload from "../components/FileUpload";
import SummaryBox from "../components/SummaryBox";
import ChatBox from "../components/ChatBox";
import { useState } from "react";



function Home({ theme }) {
  const [documentCount, setDocumentCount] = useState(0);
  const [summaryCount, setSummaryCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [documentText, setDocumentText] = useState("");
  const [showTools, setShowTools] = useState(false);
  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-slate-950 text-slate-100"
          : "min-h-screen bg-slate-100 text-slate-900"
      }
    >
      

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
  {documentCount}
</p>
  </div>

  <div className="bg-green-100 dark:bg-green-900 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
      📝 Summaries Generated
    </h3>
    <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
  {summaryCount}
</p>
  </div>

  <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
  💬 Questions Asked
</h3>
    <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
  {questionCount}
</p>
  </div>
</section> 
        <FileUpload
          theme={theme}
          setDocumentCount={setDocumentCount}
          setDocumentText={setDocumentText}
        />
        <SummaryBox
          theme={theme}
          setSummaryCount={setSummaryCount}
          documentText={documentText}
        />
        <ChatBox
          theme={theme}
          setQuestionCount={setQuestionCount}
          documentText={documentText}
        />
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mt-6 text-slate-900 dark:text-white">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
  Study Tools
</h2>

<div className="space-y-2">

  <button
  onClick={() => setShowTools(!showTools)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
>
  Study Tools
</button>
{showTools && (
  <div className="mt-4 space-y-2">

    
    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Generate Quiz
    </button>
      

    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Viva Questions
    </button>

    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Flashcards
    </button>

    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Revision Notes
    </button>

    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Key Topics
    </button>

    
    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Explain Difficult Concepts
    </button>

    <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-lg text-left hover:bg-slate-300 dark:hover:bg-slate-600 transition">
      Important Exam Questions
    </button>

  </div>
  
)}
<StudyHistory />

</div>
</div>
      
      </div>
    </div>
  );
}

export default Home;
