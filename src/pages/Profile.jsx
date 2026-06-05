function Profile() {
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

        </div>

      </div>
    </div>
  );
}

export default Profile;