import styled from "styled-components";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

export default function TaskPreview({ task }) {
  const { title, category, priority, dueDate } = task;

  return (
    <StyledSection>
      <h3>{title}</h3>
      <StyledParagraph>{"🔥".repeat(priority)}</StyledParagraph>
      <p>{category}</p>
      <p>{dueDate}</p>
    </StyledSection>
  );
}
