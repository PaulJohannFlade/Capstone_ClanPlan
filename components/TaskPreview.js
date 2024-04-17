import styled from "styled-components";
import Link from "next/link";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

export default function TaskPreview({ task }) {
  const { title, category, priority, dueDate, id } = task;

  return (
    <StyledSection>
      <Link href={`tasks/${id}`}>
        <h3>{title}</h3>
      </Link>
      <StyledParagraph>{"🔥".repeat(priority)}</StyledParagraph>
      <p>{category}</p>
      <p>{dueDate}</p>
    </StyledSection>
  );
}
