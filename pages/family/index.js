import FamilyMembersList from "@/components/FamilyMembersList";
import Header from "@/components/Header";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import StyledBackLink from "@/components/StyledBackLink";
import styled from "styled-components";
import { StyledMessage } from "..";
import MemberForm from "@/components/MemberForm";
import Modal from "@/components/Modal";
import Plus from "@/public/assets/images/plus.svg";

const StyledPlus = styled(Plus)`
  position: fixed;
  bottom: 4rem;
  right: calc(50% - 160px);
  width: 3rem;
  fill: grey;
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
      <StyledHeading>My Family</StyledHeading>
      <StyledBackLink href="/">
        <BackArrow />
      </StyledBackLink>
      {!familyMembers.length && (
        <StyledMessage>The list is empty. Add members to begin!</StyledMessage>
      )}
      <FamilyMembersList familyMembers={familyMembers} />

      <StyledPlus onClick={() => setShowModal(true)} $right={true} />

      {showModal && (
        <Modal setShowModal={setShowModal}>
          <MemberForm onAddMember={onAddMember} familyMembers={familyMembers} />
        </Modal>
      )}
    </>
  );
}
