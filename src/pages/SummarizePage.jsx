import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function SummarizePage() {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState(""); // ✅ Optional topic input
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return alert("Upload a PDF first!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("topic", topic); // ✅ Send topic to backend
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/summarize",
        formData,
        { responseType: "blob" }
      );

      const fileName = file.name.replace(".pdf", "") + "_summary.pdf";
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Summary failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="text-center p-6">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300">
          Upload PDF to Generate Summary
        </h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <br />

        <input
          type="text"
          placeholder="Optional: Enter a topic (e.g. Machine Learning)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mb-4 p-2 rounded border border-gray-400 w-full max-w-md"
        />

        <br />

        <button
          onClick={handleSubmit}
          className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

        {loading && (
          <p className="mt-4 text-sm text-gray-500">
            Your summary PDF will be downloaded shortly...
          </p>
        )}
      </div>
    </Layout>
  );
}
