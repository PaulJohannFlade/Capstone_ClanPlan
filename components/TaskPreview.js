import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

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

export default function TaskPreview({
  task,
  onCheckboxChange,
  categories,
  setDetailsBackLinkRef,
}) {
  const { title, category: categoryId, priority, dueDate, id, isDone } = task;
  const router = useRouter();
  const { listType } = router.query;

  return (
    <StyledSection>
      <StyledCheckbox
        type="checkbox"
        checked={isDone}
        onChange={() => onCheckboxChange(id)}
      />
      <StyledLink
        href={`/tasks/${id}?listType=${listType}`}
        onClick={() => setDetailsBackLinkRef("/")}
      >
        <h3>{title}</h3>
        <StyledParagraph>{"🔥".repeat(Number(priority))}</StyledParagraph>
        <p>
          {categories.find((category) => category.id === categoryId)?.category}
        </p>
        <p>{dueDate}</p>
      </StyledLink>
    </StyledSection>
  );
}
