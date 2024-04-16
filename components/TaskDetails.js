import styled from "styled-components";
import Link from "next/link";

const StyledSection = styled.section`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 1rem;
`;

export default function TaskDetails({ task }) {
  const { title, category, priority, dueDate, id } = task;

  return (
    <StyledSection>
      <p> What is to do?</p>
      <h2>{title}</h2>
      <p>Category: </p>
      <h2>{category}</h2>
      <p>Priority: </p>
      <h2>{"🔥".repeat(priority)}</h2>
      <p>Due Date:</p>
      <h3>{dueDate}</h3>
    </StyledSection>
  );
}
