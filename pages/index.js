import Header from "@/components/Header";
import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Link from "next/link";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

const StyledLink = styled(Link)`
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

  &:hover {
    cursor: ponter;
  }
`;

export default function HomePage({ tasks }) {
  return (
    <div>
      <Header />
      <StyledHeading>Family Task List</StyledHeading>
      {!tasks.length && <StyledMessage>No Tasks to display.</StyledMessage>}
      <TasksList tasks={tasks} />
      <StyledLink href="/create" $right={true}>
        ➕
      </StyledLink>
      <StyledLink href="/family" $left={true}>
        🧑‍🧑‍🧒‍🧒
      </StyledLink>
    </div>
  );
}

export { StyledLink, StyledMessage };
