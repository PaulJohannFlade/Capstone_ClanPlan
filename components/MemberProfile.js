import styled from "styled-components";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import User from "@/public/assets/images/user.svg";
import FileUploadForm from "@/components/FileUploadForm";
import { signOut } from "next-auth/react";
import StyledButton from "@/components/StyledButton";
import { useState } from "react";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import Modal from "@/components/Modal";
import MemberForm from "@/components/MemberForm";
import { toast } from "react-toastify";
import ConfirmBox from "@/components/ConfirmBox";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";
import { useRouter } from "next/router";

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
    padding-bottom: 5rem;
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
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 3rem 2rem 2rem 2rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #808080;
  max-width: 100%;
  align-self: stretch;

  @media (min-width: 600px) {
    align-items: flex-start;
    margin-top: 1rem;
    max-width: calc(75vw - 300px);
    align-items: flex-start;
    align-self: flex-start;
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
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
`;

const StyledHeading = styled.h3`
  text-align: center;
  font-family: var(--font-handlee);
  font-size: 1.4rem;
`;

const StyledSignButton = styled(StyledButton)`
  margin: 0;
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
  right: 11vw;
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

const StyledDeleteAccountButton = styled(StyledButton)`
  margin: 0;
  position: absolute;
  bottom: 1.3rem;
  right: 1.3rem;
`;

export default function MemberProfile({
  familyMember,
  mutateMember,
  user,
  onAddPhoto,
  mutateUser,
}) {
  const { _id, name, role, profilePhoto, email } = familyMember;
  const {
    categories,
    familyMembers,
    mutateMembers,
    mutateCategories,
    mutateTasks,
  } = useData(null, _id);
  const [isPhotoEditMode, setIsPhotoEditMode] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const { showModal, openModal, closeModal } = useModal();
  const router = useRouter();

  const isOnlyMember = familyMembers.length === 1 && user._id === _id;
  const categoriesWithOnlyThisMember = categories.filter(
    (categorie) =>
      categorie.selectedMembers.length === 1 &&
      categorie.selectedMembers[0]._id === _id
  );
  const categoriesIdsWithOnlyThisMember = categoriesWithOnlyThisMember.map(
    (categorie) => categorie._id
  );

  const deleteAccountMessage =
    "Are you sure you want to delete the account?" +
    (isOnlyMember
      ? " You are the only member from your family. If you delete your account, all associated tasks, family data, and categories will be permanently deleted from the database."
      : categoriesWithOnlyThisMember.length > 0
      ? " If you delete the account, all categories associated only with it will be permanently deleted from the database."
      : " Your account will be permanently deleted from the database.");

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
        pending: "Member updation is pending",
        success: "Member updated successfully",
        error: "Member not updated",
      }
    );

    if (response.ok) {
      closeModal();
      setModalMode("");
      await mutateMember();
      await mutateUser();
      await mutateMembers();
    }
  }

  function handleEditInfoButtonClick() {
    openModal();
    setModalMode("edit-info");
  }

  function handleDeleteImageButtonClick() {
    openModal();
    setModalMode("delete-image");
  }

  function handleDeleteAccountButtonClick() {
    openModal();
    setModalMode("delete-account");
  }

  async function handleDeleteImage() {
    try {
      const cloudinaryResponse = await fetch("/api/deleteImage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePhoto }),
      });

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to delete image from Cloudinary");
      }

      const updatedMemberData = { ...familyMember, profilePhoto: "" };
      const memberResponse = await fetch(`/api/members/${_id}`, {
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
      closeModal();
      setIsPhotoEditMode(false);
      await mutateMember();
      await mutateUser();
    } catch (error) {
      toast.error(error.message || "Failed to delete photo");
    }
  }

  async function handleDeleteAccount() {
    try {
      if (profilePhoto) {
        const cloudinaryResponse = await fetch("/api/deleteImage", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePhoto }),
        });

        if (!cloudinaryResponse.ok) {
          throw new Error("Failed to delete image from Cloudinary");
        }
      }
      const memberResponse = await toast.promise(
        fetch(`/api/members/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isOnlyMember,
            categoriesIdsWithOnlyThisMember,
          }),
        }),
        {
          pending: "Member deletion is pending",
          success: "Member deleted successfully",
          error: "Failed to delete member",
        }
      );
      if (!memberResponse.ok) {
        throw new Error("Failed to delete member data");
      }
      closeModal();
      await mutateMembers();
      await mutateCategories();
      await mutateTasks();
      if (user._id === _id) {
        await mutateUser();
        router.push("/");
      } else {
        router.push("/family");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
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
                sizes="75vw"
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
                onClick={handleDeleteImageButtonClick}
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
            <StyledInfoPen onClick={handleEditInfoButtonClick} />
          )}
          <StyledParagraph>Name:</StyledParagraph>
          <StyledContent>{name}</StyledContent>
          <StyledParagraph>Role:</StyledParagraph>
          <StyledContent>{role}</StyledContent>
          <StyledParagraph>Email:</StyledParagraph>
          <StyledContent>{email}</StyledContent>
        </UserInfoContainer>
        {(user.role === "Parent" || user.role === "Caregiver") && (
          <StyledDeleteAccountButton
            $red={true}
            $width={"auto"}
            onClick={handleDeleteAccountButtonClick}
          >
            Delete account
          </StyledDeleteAccountButton>
        )}
      </StyledSection>
      {_id === user._id && (
        <StyledSection $settings={true}>
          <StyledHeading>Settings</StyledHeading>
          <ThemeToggle familyMember={familyMember} mutateUser={mutateUser} />
        </StyledSection>
      )}
      <Modal $top="8rem" $open={showModal && modalMode === "edit-info"}>
        {showModal && modalMode === "edit-info" && (
          <MemberForm
            onAddMember={handleEditMember}
            familyMembers={familyMembers}
            user={user}
            isInfoEditMode={modalMode === "edit-info"}
            heading={"Edit family member"}
          />
        )}
      </Modal>
      <Modal $top="13.5rem" $open={showModal && modalMode === "delete-image"}>
        {showModal && modalMode === "delete-image" && (
          <ConfirmBox
            onConfirm={handleDeleteImage}
            message="Are you sure you want to delete profile image?"
          />
        )}
      </Modal>
      <Modal $top="13.5rem" $open={showModal && modalMode === "delete-account"}>
        {showModal && modalMode === "delete-account" && (
          <ConfirmBox
            onConfirm={handleDeleteAccount}
            message={deleteAccountMessage}
          />
        )}
      </Modal>
    </>
  );
}
