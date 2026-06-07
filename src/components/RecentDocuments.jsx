import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecentDocuments, deleteDocument } from "../services/documentservice";

function RecentDocuments({ theme }) {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!currentUser?.uid) return;
      
      try {
        setLoading(true);
        const latestDocs = await getRecentDocuments(currentUser.uid);
        setDocuments(latestDocs);
      } catch (err) {
        console.error("Error loading recent documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [currentUser]);

  // Handle document deletion inside the UI list
  const handleDelete = async (e, fileName) => {
    // Prevent clicking the delete button from firing parent container clicks
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      await deleteDocument(currentUser.uid, fileName);
      
      // Update state immediately to remove it from the screen
      setDocuments((prev) => prev.filter((doc) => doc.fileName !== fileName));
    } catch (err) {
      console.error("Failed to delete document:", err);
      alert("Error: Unable to remove document from database.");
    }
  };

  const containerClass = theme === "dark" 
    ? "bg-slate-900 text-slate-100 border-slate-700" 
    : "bg-white text-slate-900 border-slate-200";

  return (
    <div className={`p-6 rounded-xl shadow border ${containerClass}`}>
      <h3 className="text-lg font-bold mb-4">📅 Recent Documents</h3>
      
      {loading ? (
        <p className="text-sm opacity-60 animate-pulse">Loading files...</p>
      ) : documents.length === 0 ? (
        <p className="text-sm opacity-60">No documents uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="flex items-center justify-between p-2 rounded transition hover:bg-sky-500/10"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-lg">📄</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.fileName}</p>
                  <p className="text-xs opacity-50">
                    {((doc.fileSize || 0) / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {/* Delete Action Button */}
              <button
                onClick={(e) => handleDelete(e, doc.fileName)}
                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-500/10 transition ml-2 flex-shrink-0"
                title="Delete from history"
              >
                🗑️ 
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentDocuments;