function RecentDocuments() {
  const documents = [
    "DBMS.pdf",
    "MEMC016.pdf",
    "OS Notes.pdf",
  ];

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Recent Documents
      </h2>

      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="p-3 rounded bg-slate-800/50 text-white"
          >
            📄 {doc}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentDocuments;