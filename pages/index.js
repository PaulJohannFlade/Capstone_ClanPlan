import Header from "@/components/Header";
import TasksList from "@/components/TasksList";
import styled from "styled-components";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function HomePage({ tasks }) {
  return (
    <div>
      <Header />
      <StyledHeading>Family Task List</StyledHeading>
      {!tasks.length && <StyledMessage>No Tasks to display.</StyledMessage>}
      <TasksList tasks={tasks} />
    </div>
  );
}
