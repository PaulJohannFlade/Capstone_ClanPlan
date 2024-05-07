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

const StyledSpan = styled.span`
  color: ${({ $isMissed }) => $isMissed && "var(--color-alert)"};
`;

const StyledParagraphContent = styled.p`
  font-size: larger;
  font-weight: 600;
`;

export default function TaskPreview({
  task,
  onCheckboxChange,
  setDetailsBackLinkRef,
}) {
  const { title, category, priority, dueDate, _id: id, isDone } = task;
  const today = new Date();
  const isToday =
    dueDate && today.toDateString() === new Date(dueDate).toDateString();
  const isMissed =
    dueDate &&
    new Date(task.dueDate).toISOString().substring(0, 10) <
      today.toISOString().substring(0, 10);
  return (
    <StyledSection>
      <StyledCheckbox
        type="checkbox"
        checked={isDone}
        onChange={(event) => onCheckboxChange(task, event)}
      />
      <StyledLink
        href={`/tasks/${id}`}
        onClick={() => setDetailsBackLinkRef("/")}
      >
        <StyledParagraphContent>{title}</StyledParagraphContent>
        <StyledParagraph>{"🔥".repeat(Number(priority))}</StyledParagraph>
        <p>{category?.title}</p>
        <StyledParagraph>
          <StyledSpan $isMissed={isMissed}>
            {isToday ? "Today" : dueDate}
          </StyledSpan>
        </StyledParagraph>
      </StyledLink>
    </StyledSection>
  );
}
