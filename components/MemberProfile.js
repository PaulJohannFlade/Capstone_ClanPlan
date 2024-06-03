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

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 1rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  align-items: center;
  ${({ $settings }) =>
    !$settings &&
    `@media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-evenly;
  }`}
`;

const StyledContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 80vw;

  @media (min-width: 900px) {
    max-width: 50vw;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 80vw;
  aspect-ratio: 1;
  overflow: hidden;

  @media (min-width: 900px) {
    max-width: 50vw;
  }
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

const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 3rem 2.5rem 2rem 2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #808080;
  @media (min-width: 900px) {
    flex-direction: column;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
`;

const StyledContent = styled.span`
  font-size: large;
  font-weight: 600;
  margin-left: 0.5rem;
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
  top: 1.5rem;
  right: 1.5rem;
`;

const StyledEditButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(color-background);
  position: absolute;
  top: 12vw;
  left: 68vw;
  transform: translate(-50%, -50%);
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
  @media (min-width: 900px) {
    top: 7vw;
    left: 42.5vw;
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
            <FileUploadForm
              onAddPhoto={onAddPhoto}
              setIsPhotoEditMode={setIsPhotoEditMode}
            />
          )}
        </StyledContainer>
        <UserInfoContainer>
          <StyledInfoPen
            onClick={() => {
              setShowModal(true);
              setIsInfoEditMode(true);
            }}
          />
          <StyledParagraph>
            Name: <StyledContent>{name}</StyledContent>
          </StyledParagraph>
          <StyledParagraph>
            Role: <StyledContent>{role}</StyledContent>
          </StyledParagraph>
        </UserInfoContainer>
      </StyledSection>
      {_id === user._id && (
        <StyledSection $settings={true}>
          <StyledHeading>Settings</StyledHeading>
          <ThemeToggle familyMember={familyMember} mutateUser={mutateUser} />
        </StyledSection>
      )}
      <Modal $top="8rem" setShowModal={setShowModal} $open={showModal}>
        {showModal && (
          <MemberForm
            onAddMember={handleEditMember}
            familyMembers={familyMembers}
            user={user}
            isInfoEditMode={isInfoEditMode}
            heading={"Edit family member"}
          />
        )}
      </Modal>
    </>
  );
}
