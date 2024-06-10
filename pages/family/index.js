import FamilyMembersList from "@/components/FamilyMembersList";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";
import StyledPlus from "@/components/StyledPlus";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";

const StyledMenu = styled.menu`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  justify-content: center;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.7fr;
  }
`;

const StyledHeading = styled.h2`
  text-align: left;
`;

export default function FamilyPage() {
  const { familyMembers, mutateMembers, user } = useData();
  const form = useRef();
  const { showModal, openModal, closeModal } = useModal();

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
        <StyledPlus onClick={openModal} $right={true} />
        <StyledHeading>Family: {user?.family?.name}</StyledHeading>
      </StyledMenu>
      {!familyMembers.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <FamilyMembersList familyMembers={familyMembers} />

      <Modal $top="7rem" $open={showModal}>
        {showModal && (
          <MemberForm
            onAddMember={handleAddMember}
            familyMembers={familyMembers}
            user={user}
            form={form}
            heading={"Add new family member"}
          />
        )}
      </Modal>
    </>
  );
}

export { StyledMenu };
