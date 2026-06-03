import { useState } from "react";

function FileUpload(props) {
  const theme = props.theme || "light";
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={`file-upload p-6 rounded-xl shadow ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <h2 className={`upload-title text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
         📄Upload Document
      </h2>

      <input
        type="file"
        id="pdf-upload"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <label
        htmlFor="pdf-upload"
        className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        Browse Files
      </label>
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

          <button
            onClick={() => setFile(null)}
            className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove File
          </button>
        </>
      )}
    </div>
  );
}

export default FileUpload;