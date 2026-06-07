function StudyHistory() {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        Study Session History
      </h2>

      <div className="space-y-3">

        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            📄 DBMS Notes.pdf
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            📅 2 hours ago
          </p>

          <p className="text-sm text-green-500">
            📝 Summary Generated
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            📄 Operating Systems.pdf
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            📅 Yesterday
          </p>

          <p className="text-sm text-green-500">
            📝 5 Questions Asked
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            📄 AI Unit 3.pdf
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            📅 3 days ago
          </p>

          <p className="text-sm text-green-500">
            📝 Summary Generated
          </p>
        </div>

      </div>
    </div>
  );
}

export default StudyHistory;