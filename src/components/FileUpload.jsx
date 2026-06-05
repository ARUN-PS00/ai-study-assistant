import { useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

const basePath =
  import.meta.env.BASE_URL ||
  (typeof window !== "undefined"
    ? window.location.pathname.replace(/\/[^/]*$/, "/")
    : "/ai-study-assistant/");
const workerSrc =
  typeof window !== "undefined"
    ? `${window.location.origin}${basePath}pdf.worker.js`
    : `${basePath}pdf.worker.js`;

console.log("pdf worker src:", workerSrc);
GlobalWorkerOptions.workerSrc = workerSrc;

function FileUpload(props) {
  const theme = props.theme || "light";
  const setDocumentCount = props.setDocumentCount;
  const setDocumentText = props.setDocumentText || (() => {});
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setDocumentCount((count) => count + 1);
      setDocumentText("");
      setError("");
      setProgress(15);

      let isDone = false;
      let value = 15;
      const interval = setInterval(() => {
        if (isDone) {
          return;
        }
        value += 10;
        setProgress(Math.min(value, 90));
      }, 200);

      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        setProgress(40);
        const loadingTask = getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        const pageCount = Math.min(pdf.numPages, 5);
        let extractedText = "";

        for (let i = 1; i <= pageCount; i += 1) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item) => item.str || item.unicode || "")
            .join(" ");
          extractedText += `${pageText}\n\n`;
        }

        setDocumentText(extractedText.trim());
        isDone = true;
        setProgress(100);
      } catch (parseError) {
        console.error("PDF parse error:", parseError);
        setError(
          `Unable to read the uploaded PDF. ${parseError?.message || "Please try another file."}`
        );
        setProgress(0);
      } finally {
        clearInterval(interval);
      }
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
          <p className="mt-4 text-green-600">Selected: {file.name}</p>
          <div className="mt-4">
            <p className="mb-2">Uploading... {progress}%</p>
            <div className="w-full bg-slate-300 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {error && <p className="mt-3 text-red-500">{error}</p>}

          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>

          <button
            onClick={() => {
              setFile(null);
              setProgress(0);
              setError("");
              setDocumentText("");
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