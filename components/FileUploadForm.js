import { useState } from "react";

export default function FileUploadForm({ onAddPhoto }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();

    onAddPhoto(url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="profilePhoto">Choose a photo:</label>
      <input
        type="file"
        id="profilePhoto"
        name="profilePhoto"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}
