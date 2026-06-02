import { useState } from "react";

function FileUpload({ theme }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={`file-upload p-6 rounded-xl shadow ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <h2 className={`upload-title text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        Upload Document
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {file && (
        <>
          <p className="mt-4 text-green-600">
            Selected: {file.name}
          </p>

          <p>
            Size: {(file.size / 1024).toFixed(2)} KB
          </p>

          <p>
            Type: {file.type}
          </p>
        </>
      )}
    </div>
  );
}

export default FileUpload;