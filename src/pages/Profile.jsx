import { useAuth } from "../context/AuthContext";

function Profile({ setCurrentPage }) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    console.log("handleLogout called");
    try {
      await logout();
      console.log("logout successful");
      if (setCurrentPage) setCurrentPage("login");
    } catch (err) {
      console.error("Logout failed", err);
      // show inline error instead of alert
      const el = document.getElementById("logout-error");
      if (el) el.textContent = "Logout failed. See console.";
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Profile
        </h1>

        <div className="space-y-3">

          <p className="text-slate-900 dark:text-white">
            Name: Elsa Jojo
          </p>

          <p className="text-slate-900 dark:text-white">
            Email: elsa@example.com
          </p>

          <p className="text-slate-900 dark:text-white">
            Documents Uploaded: 5
          </p>

          <p className="text-slate-900 dark:text-white">
            Summaries Generated: 12
          </p>

          <p className="text-slate-900 dark:text-white">
            Questions Asked: 34
          </p>

          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Log out
            </button>
            <p id="logout-error" className="text-sm text-red-500 mt-2" />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;