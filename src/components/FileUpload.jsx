function FileUpload({ theme }) {
  const containerClass =
    theme === "dark"
      ? "bg-slate-900 text-slate-100 p-6 rounded-xl shadow"
      : "bg-white text-slate-900 p-6 rounded-xl shadow";

  return (
    <div className={containerClass}>
      <h2 className="text-xl font-semibold mb-4">
        Upload Document
      </h2>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg"> drag and drop or
        Upload PDF
      </button>
    </div>
  );
}

export default FileUpload;