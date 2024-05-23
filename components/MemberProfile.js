import styled from "styled-components";
import StyledTrash from "./StyledTrash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import StyledPen from "./StyledPen";
import ThemeToggle from "./ThemeToggle";

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
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
`;

const StyledParagraphContent = styled.p`
  font-size: large;
  font-weight: 600;
`;

const StyledHeading = styled.h3`
  text-align: center;
  font-family: var(--font-handlee);
  font-size: 1.4rem;
`;

export default function MemberProfile({
  familyMember,
  isDarkTheme,
  setDarkTheme,
}) {
  const { name, role } = familyMember;
  const router = useRouter();

  async function handleDeleteTask(id) {
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?deleteRequest=single`, {
        method: "DELETE",
      }),
      {
        pending: "Task deletion is pending",
        success: "Task deleted successfully",
        error: "Task not deleted",
      }
    );
    if (response.ok) {
      router.push(detailsBackLinkRef);
      setShowModal(false);
    }
  }

  return (
    <>
      <StyledSection>
        <StyledTrash />
        <StyledPen />
        <StyledParagraph> Name:</StyledParagraph>
        <StyledParagraphContent>{name}</StyledParagraphContent>
        <StyledParagraph>Role: </StyledParagraph>
        <StyledParagraphContent>{role}</StyledParagraphContent>
      </StyledSection>
      <StyledSection>
        <StyledHeading>Settings</StyledHeading>
        <ThemeToggle isDarkTheme={isDarkTheme} setDarkTheme={setDarkTheme} />
      </StyledSection>
    </>
  );
}
