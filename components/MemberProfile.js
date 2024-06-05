import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import User from "@/public/assets/images/user.svg";
import FileUploadForm from "./FileUploadForm";
import { signOut } from "next-auth/react";
import StyledButton from "./StyledButton";
import { useState } from "react";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import Modal from "./Modal";
import MemberForm from "./MemberForm";
import { toast } from "react-toastify";
import ConfirmBox from "./ConfirmBox";

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 1.8rem;
  gap: 2rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  align-items: center;
  ${({ $settings }) =>
    !$settings &&
    `
    padding-top: 4.3rem;
    @media (min-width: 600px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: start;
  }`}
`;

const StyledContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 70vw;

  @media (min-width: 600px) {
    max-width: 300px;
  }

  @media (min-width: 900px) {
    max-width: 350px;
  }

  @media (min-width: 1200px) {
    max-width: 400px;
  }
  @media (min-width: 1536px) {
    max-width: 450px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 70vw;
  aspect-ratio: 1;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  border: 0.5px solid var(--color-font);
`;

const StyledUser = styled(User)`
  width: 100%;
  align-self: center;
`;

const StyledEditContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 3rem 2.5rem 2rem 2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #808080;
  max-width: 100%;

  @media (max-width: 450px) {
    flex-direction: column;
    min-width: 70vw;
  }

  @media (min-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;
  }
  @media (min-width: 600px) {
    flex-direction: column;
    max-width: calc(75vw - 300px);
    align-items: flex-start;
  }

  @media (min-width: 900px) {
    max-width: calc(75vw - 350px);
  }
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
`;

const StyledContent = styled.p`
  font-size: large;
  font-weight: 600;
  max-width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;

  @media (min-width: 600px), (max-width: 450px) {
    max-width: 100%;
  }
`;

const StyledHeading = styled.h3`
  text-align: center;
  font-family: var(--font-handlee);
  font-size: 1.4rem;
`;

const StyledSignButton = styled(StyledButton)`
  margin: 0;
  align-self: flex-end;
  position: absolute;
  top: 1.3rem;
  right: 1.3rem;
`;

const StyledEditButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(color-background);
  position: absolute;
  top: 12vw;
  right: 9vw;
  transform: translate(50%, -50%);
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  @media (min-width: 600px) {
    top: 45px;
    right: 40px;
  }

  @media (min-width: 900px) {
    top: 55px;
    right: 45px;
  }

  @media (min-width: 1200px) {
    top: 75px;
    right: 45px;
  }
  @media (min-width: 1536px) {
    top: 85px;
    right: 50px;
  }
`;

const StyledImagePen = styled(Pen)`
  width: 1.5rem;
  fill: var(--color-font);
`;

const StyledInfoPen = styled(Pen)`
  width: 1.5rem;
  fill: var(--color-font);
  position: absolute;
  top: 1rem;
  right: 1rem;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default function MemberProfile({
  familyMember,
  user,
  onAddPhoto,
  mutateUser,
  familyMembers,
  showModal,
  setShowModal,
  mutate,
  mutateMembers,
}) {
  const { _id, name, role, profilePhoto } = familyMember;
  const [isPhotoEditMode, setIsPhotoEditMode] = useState(false);
  const [isInfoEditMode, setIsInfoEditMode] = useState(false);

  async function handleEditMember(updatedMemberData) {
    const response = await toast.promise(
      fetch(`/api/members/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMemberData),
      }),
      {
        pending: "Member addition is pending",
        success: "Member added successfully",
        error: "Member not added",
      }
    );

    if (response.ok) {
      setShowModal(false);
      setIsInfoEditMode(false);
      await mutate();
      await mutateUser();
      await mutateMembers();
    }
  }

  function handleDeleteButtonClick() {
    setShowModal(true);
    setIsInfoEditMode(false);
  }

  async function handleDeleteImage(id, imageUrl) {
    try {
      const cloudinaryResponse = await fetch("/api/deleteImage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to delete image from Cloudinary");
      }

      const updatedMemberData = { ...familyMember, profilePhoto: "" };
      const memberResponse = await fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMemberData),
      });

      if (!memberResponse.ok) {
        throw new Error("Failed to update member data");
      }

      toast.success("Photo deleted successfully");
      setShowModal(false);
      setIsPhotoEditMode(false);
      await mutate();
      await mutateUser();
    } catch (error) {
      toast.error(error.message || "Failed to delete photo");
    }
  }

  return (
    <>
      <StyledSection>
        {_id === user._id && (
          <>
            <StyledSignButton onClick={() => signOut()}>
              Log out
            </StyledSignButton>
          </>
        )}
        <StyledContainer>
          <ImageContainer>
            {profilePhoto ? (
              <StyledImage
                src={profilePhoto}
                alt="user profile image"
                sizes="80vw"
                fill
                priority={true}
              />
            ) : (
              <StyledUser />
            )}
            {_id === user._id && (
              <StyledEditButton
                onClick={() => setIsPhotoEditMode(!isPhotoEditMode)}
              >
                <StyledImagePen />
              </StyledEditButton>
            )}
          </ImageContainer>
          {_id === user._id && isPhotoEditMode && (
            <StyledEditContainer>
              <StyledButton
                $red
                $top={"0"}
                $width={"8rem"}
                onClick={handleDeleteButtonClick}
                disabled={!profilePhoto}
              >
                Delete image
              </StyledButton>
              <FileUploadForm
                onAddPhoto={onAddPhoto}
                setIsPhotoEditMode={setIsPhotoEditMode}
              />
            </StyledEditContainer>
          )}
        </StyledContainer>
        <UserInfoContainer>
          {_id === user._id && (
            <StyledInfoPen
              onClick={() => {
                setShowModal(true);
                setIsInfoEditMode(true);
              }}
            />
          )}
          <StyledParagraph>Name:</StyledParagraph>
          <StyledContent>{name}</StyledContent>
          <StyledParagraph>Role:</StyledParagraph>
          <StyledContent>{role}</StyledContent>
        </UserInfoContainer>
      </StyledSection>
      {_id === user._id && (
        <StyledSection $settings={true}>
          <StyledHeading>Settings</StyledHeading>
          <ThemeToggle familyMember={familyMember} mutateUser={mutateUser} />
        </StyledSection>
      )}
      <Modal
        $top="8rem"
        setShowModal={setShowModal}
        $open={showModal && isInfoEditMode}
      >
        {showModal && isInfoEditMode && (
          <MemberForm
            onAddMember={handleEditMember}
            familyMembers={familyMembers}
            user={user}
            isInfoEditMode={isInfoEditMode}
            heading={"Edit family member"}
          />
        )}
      </Modal>
      <Modal
        $top="13.5rem"
        setShowModal={setShowModal}
        $open={showModal && !isInfoEditMode}
      >
        {showModal && !isInfoEditMode && (
          <ConfirmBox
            setShowModal={setShowModal}
            onConfirm={() => handleDeleteImage(_id, profilePhoto)}
            message="Are you sure you want to delete profile image?"
          />
        )}
      </Modal>
    </>
  );
}
