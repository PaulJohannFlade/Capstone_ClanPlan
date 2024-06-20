import { useState } from "react";
import StyledButton from "@/components/StyledButton";
import styled from "styled-components";
import Upload from "@/public/assets/images/upload.svg";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
`;

const PhotoLabel = styled.label`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const PhotoInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const StyledUpload = styled(Upload)`
  width: 2rem;
`;

const ImagePreview = styled.img`
  width: 6rem;
  height: auto;
`;

const StyledFileName = styled.p`
  font-size: 0.9rem;
`;

export default function FileUploadForm({ onAddPhoto, setIsPhotoEditMode }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileError(false);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setFileError(true);
      return;
    }

    const formData = new FormData(event.target);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();

    onAddPhoto(url);
    event.target.reset();
    setSelectedFile(null);
    setImagePreview(null);
    setIsPhotoEditMode(false);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <PhotoLabel htmlFor="profilePhoto">
        <StyledParagraph>Choose image:</StyledParagraph>
        <StyledUpload role="img" aria-label="file upload icon" />
      </PhotoLabel>
      {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}
      {fileError && <ErrorMessage>Please choose image</ErrorMessage>}
      {!fileError && (
        <StyledFileName>
          {selectedFile ? selectedFile.name : "No image chosen"}
        </StyledFileName>
      )}
      <PhotoInput
        type="file"
        id="profilePhoto"
        name="profilePhoto"
        onChange={handleFileChange}
        accept="image/*"
      />
      <StyledButton type="submit">Upload</StyledButton>
    </StyledForm>
  );
}
