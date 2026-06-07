import { useState } from "react";
function Settings() {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Settings
        </h1>
        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <span className="text-slate-900 dark:text-white">
              Theme
            </span>
            <span className="text-green-500 font-semibold">
              Dark Mode
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-900 dark:text-white">
              Notifications
            </span>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`px-4 py-1 rounded-lg text-white ${
                notifications ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notifications ? "On" : "Off"}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-900 dark:text-white">
              Language
            </span>
            <span className="text-green-500 font-semibold">
              English
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;