function Settings() {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Settings
        </h1>

        <div className="space-y-3">

          <p className="text-slate-900 dark:text-white">
            Theme: Dark Mode
          </p>

          <p className="text-slate-900 dark:text-white">
            Notifications: On
          </p>

          <p className="text-slate-900 dark:text-white">
            Language: English
          </p>
s
        </div>

      </div>
    </div>
  );
}

export default Settings;