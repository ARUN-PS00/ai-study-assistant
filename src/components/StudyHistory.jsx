function StudyHistory() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        Study Session History
      </h2>

      <div className="space-y-3">
        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
          DBMS Notes - 2 hours ago
        </div>

        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
          Operating Systems - Yesterday
        </div>

        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
          AI Unit 3 - 3 days ago
        </div>
      </div>
    </div>
  );
}

export default StudyHistory;