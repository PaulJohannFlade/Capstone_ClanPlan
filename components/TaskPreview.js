import styled from "styled-components";
import Link from "next/link";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 1rem;
`;

const StyledCheckbox = styled.input`
  &:checked {
    filter: hue-rotate(180deg);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledParagraphContent = styled.p`
  font-size: larger;
  font-weight: 600;
`;

export default function TaskPreview({
  task,
  onCheckboxChange,
  categories,
  setDetailsBackLinkRef,
}) {
  const { title, category: categoryId, priority, dueDate, id, isDone } = task;

  return (
    <StyledSection>
      <StyledCheckbox
        type="checkbox"
        checked={isDone}
        onChange={() => onCheckboxChange(id)}
      />
      <StyledLink
        href={`/tasks/${id}`}
        onClick={() => setDetailsBackLinkRef("/")}
      >
        <StyledParagraphContent>{title}</StyledParagraphContent>
        <StyledParagraph>{"🔥".repeat(Number(priority))}</StyledParagraph>
        <p>
          {categories.find((category) => category.id === categoryId)?.title}
        </p>
        <p>{dueDate}</p>
      </StyledLink>
    </StyledSection>
  );
}
