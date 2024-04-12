import styled from "styled-components";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

function showPriority(priority) {
  let priorityArray = "";
  for (let i = 0; i < priority; i++) {
    priorityArray += "🔥";
  }
  return priorityArray;
}

export default function TaskPreview({ task }) {
  const { title, category, priority, dueDate } = task;

  return (
    <StyledSection>
      <h3>{title}</h3>
      <StyledParagraph>{showPriority(priority)}</StyledParagraph>
      <p>{category}</p>
      <p>{dueDate}</p>
    </StyledSection>
  );
}
