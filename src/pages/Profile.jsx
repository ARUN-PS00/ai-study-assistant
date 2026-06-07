import { useAuth } from "../context/AuthContext";

function Profile({ setCurrentPage }) {
  const { currentUser, logout } = useAuth();

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
            Name: {currentUser?.displayName || "User"}
          </p>

          <p className="text-slate-900 dark:text-white">
            Email: {currentUser?.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

  <div className="bg-slate-700 p-4 rounded-lg text-center">
    <h3 className="text-2xl font-bold text-white">5</h3>
    <p className="text-white">Documents</p>
  </div>

  <div className="bg-slate-700 p-4 rounded-lg text-center">
    <h3 className="text-2xl font-bold text-white">12</h3>
    <p className="text-white">Summaries</p>
  </div>

  <div className="bg-slate-700 p-4 rounded-lg text-center">
    <h3 className="text-2xl font-bold text-white">34</h3>
    <p className="text-white">Questions</p>
  </div>

</div>

          <div className="mt-6 flex justify-end">
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