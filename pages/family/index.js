import FamilyMembersList from "@/components/FamilyMembersList";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";
import StyledPlus from "@/components/StyledPlus";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";
import StyledPen from "@/components/StyledPen";
import FamilyRegisterForm from "@/components/FamilyRegisterForm";

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
  box-shadow: 1px 0px 14px 10px #e8e8e8 inset;
  padding: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 400px) {
    max-width: 230px;
  }

  @media (min-width: 400px) {
    max-width: 300px;
  }
  @media (min-width: 500px) {
    max-width: 350px;
  }

  @media (min-width: 600px) {
    max-width: 400px;
  }
  @media (min-width: 700px) {
    max-width: 450px;
  }
  @media (min-width: 800px) {
    max-width: 500px;
  }
  @media (min-width: 900px) {
    max-width: 100%;
  }
`;

const StyledPenUpdated = styled(StyledPen)`
  right: -0.75rem;
  top: -0.5rem;
`;

const StyledContainer = styled.div`
  position: relative;
`;

export default function FamilyPage() {
  const { familyMembers, mutateMembers, user, mutateUser } = useData();
  const form = useRef();
  const { showModal, openModal, closeModal } = useModal();
  const [modalMode, setModalMode] = useState("");

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
        .sendForm("service_tcxz2ti", "template_uc0996j", form.current, {
          publicKey: "jjcfLQQIHPYS7TXeC",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  }

  return (
    <>
      <StyledMenu>
        <StyledPlus onClick={handleAddFamilyMember} $right={true} />
        <StyledContainer>
          <StyledHeading>Family: {user?.family?.name}</StyledHeading>
          <StyledPenUpdated onClick={handleEditFamilyName} />
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
            form={form}
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
