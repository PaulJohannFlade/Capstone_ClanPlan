import FamilyMembersList from "@/components/FamilyMembersList";
import Header from "@/components/Header";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import StyledBackLink from "@/components/StyledBackLink";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";

const StyledButton = styled.button`
  text-decoration: none;
  text-align: center;
  position: fixed;
  bottom: 1.5rem;
  left: ${({ $left }) => $left && "calc(50% - 160px)"};
  right: ${({ $right }) => $right && "calc(50% - 160px)"};
  padding: 0.5rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 1rem;
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
`;

const StyledHeading = styled.h2`
  text-align: center;
`;

export default function FamilyPage({
  familyMembers,
  onAddMember,
  showModal,
  setShowModal,
}) {
  return (
    <>
      <Header />
      <StyledHeading>My Family</StyledHeading>
      <StyledBackLink href="/">
        <BackArrow />
      </StyledBackLink>
      {!familyMembers.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <FamilyMembersList familyMembers={familyMembers} />

      <StyledButton onClick={() => setShowModal(true)} $right={true}>
        ➕
      </StyledButton>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <MemberForm onAddMember={onAddMember} familyMembers={familyMembers} />
        </Modal>
      )}
    </>
  );
}
{
  /* <StyledDiv onClick={() => setModal(false)}></StyledDiv>
          <StyledSection>
            <MemberForm
              onAddMember={onAddMember}
              familyMembers={familyMembers}
            />
          </StyledSection> */
}
