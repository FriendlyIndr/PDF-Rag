"use client";
import * as React from "react";
import { Upload } from "lucide-react";

const FileUploadComponent: React.FC = () => {
  const handleFileUploadButtonClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.addEventListener("change", (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
      }
    });
    el.click();
  };

  return (
    <>
      <div className="bg-slate-900 text-white shadow-2xl flex items-center justify-center p-4 rounded-lg border-white border-2">
        <div
          onClick={handleFileUploadButtonClick}
          className="flex items-center justify-center flex-col"
        >
          <h3>Upload PDF File</h3>
          <Upload />
        </div>
      </div>
    </>
  );
};

export default FileUploadComponent;
