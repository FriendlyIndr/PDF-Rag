import FileUploadComponent from "./components/file-upload";

export default function Home() {
  const handleFileUploadButtonClick = () => {
    const el = document.createElement("input");
    el.setAttribute("type", "file");
    el.setAttribute("accept", "application/pdf");
    el.click();
  };

  return (
    <div>
      <div className="min-h-screen w-screen border-red-400 flex">
        <div className="w-[30vw] p-4 flex items-center justify-center">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] border-l-2"></div>
      </div>
    </div>
  );
}
