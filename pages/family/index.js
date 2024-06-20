import FamilyMembersList from "@/components/FamilyMembersList";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";
import StyledPlus from "@/components/StyledPlus";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";
import StyledPen from "@/components/StyledPen";
import FamilyRegisterForm from "@/components/FamilyRegisterForm";
import StyledError from "@/components/StyledError";

const StyledMenu = styled.menu`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  justify-content: center;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.7fr 1fr;
  }
`;

const StyledHeading = styled.h2`
  text-align: center;
  box-shadow: inset 1px 0px 14px 10px #e8e8e880;
  padding: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60vw;
`;

const StyledPenUpdated = styled(StyledPen)`
  position: absolute;
  right: -0.75rem;
  top: -0.5rem;
`;

const StyledContainer = styled.div`
  position: relative;
`;

export default function FamilyPage() {
  const { familyMembers, mutateMembers, user, mutateUser } = useData();
  const { showModal, openModal, closeModal } = useModal();
  const [modalMode, setModalMode] = useState("");

  if (!familyMembers || !user) {
    return <StyledError />;
  }

  function handleAddFamilyMember() {
    openModal();
    setModalMode("add-member");
  }

  function handleEditFamilyName() {
    openModal();
    setModalMode("edit-family");
  }

  async function handleUpdateFamilyName(updatedFamilyName) {
    const response = await toast.promise(
      fetch("/api/family", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFamilyName),
      }),
      {
        pending: "Family Name updation is pending",
        success: "Family Name updated successfully",
        error: "Family Name not updated",
      }
    );
    if (response.ok) {
      closeModal();
      mutateUser();
    }
  }
  async function handleAddMember(newMemberData) {
    const response = await toast.promise(
      fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMemberData),
      }),
      {
        pending: "Member addition is pending",
        success: "Member added successfully",
        error: "Member not added",
      }
    );

    if (response.ok) {
      closeModal();
      mutateMembers();

      emailjs
        .send(
          "service_tcxz2ti",
          "template_uc0996j",
          { ...newMemberData, familyName: user.family.name },
          "jjcfLQQIHPYS7TXeC"
        )
        .then(
          () => {
            toast.success("Email sent successfully!");
          },
          (error) => {
            toast.error(`Email failed to send: ${error.text}`);
          }
        );
    }
  }

  return (
    <>
      <StyledMenu>
        <StyledPlus
          onClick={handleAddFamilyMember}
          $right={true}
          role="button"
          aria-label="Add member"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleAddFamilyMember();
            }
          }}
        />
        <StyledContainer>
          <StyledHeading>Family: {user?.family?.name}</StyledHeading>
          <StyledPenUpdated
            onClick={handleEditFamilyName}
            role="button"
            aria-label="Edit family"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleEditFamilyName();
              }
            }}
          />
        </StyledContainer>
      </StyledMenu>
      {!familyMembers.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <FamilyMembersList familyMembers={familyMembers} />

      <Modal $top="7rem" $open={modalMode === "add-member" && showModal}>
        {modalMode === "add-member" && showModal && (
          <MemberForm
            onAddMember={handleAddMember}
            familyMembers={familyMembers}
            user={user}
            heading={"Add new family member"}
          />
        )}
      </Modal>
      <Modal $top="7rem" $open={modalMode === "edit-family" && showModal}>
        {modalMode === "edit-family" && showModal && (
          <FamilyRegisterForm
            onAddFamily={handleUpdateFamilyName}
            value={user?.family}
            isEdit
            heading={"Edit family name"}
          />
        )}
      </Modal>
    </>
  );
}

export { StyledMenu };
