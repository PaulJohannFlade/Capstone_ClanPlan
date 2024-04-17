import TasksList from "@/components/TasksList";
import styled from "styled-components";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function HomePage({ tasks, handleCheckboxChange }) {
  return (
    <div>
      <StyledHeading>Family Task List</StyledHeading>
      {!tasks.length && <StyledMessage>No Tasks to display.</StyledMessage>}
      <TasksList tasks={tasks} handleCheckboxChange={handleCheckboxChange} />
    </div>
  );
}
