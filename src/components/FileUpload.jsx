import { useState } from "react";

function FileUpload(props) {
  const theme = props.theme || "light";
  const setDocumentCount = props.setDocumentCount;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

   const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    setFile(selectedFile);
    setDocumentCount((count) => count + 1);
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
      }
    }, 200);
  }
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
          <div className="mt-4">
  <p className="mb-2">Uploading... {progress}%</p>

  <div className="w-full bg-slate-300 rounded-full h-4">
    <div
      className="bg-green-500 h-4 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
</div>

          <p>
            Size: {(file.size / 1024).toFixed(2)} KB
          </p>

          <p>
            Type: {file.type}
          </p>

          <button
            onClick={() => {
  setFile(null);
  setProgress(0);
}}
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