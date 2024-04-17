import TaskPreview from "./TaskPreview";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const StyledListItems = styled.li`
  border-radius: 2rem;
  background-color: ${({ $current }) => ($current ? "#f1afaffc" : "white")};
  padding: 1rem;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  margin: 0.5rem;
`;

export default function TasksList({ tasks }) {
  function handleCurrentTask(dueDate) {
    const today = new Date();
    return today.toDateString() === new Date(dueDate).toDateString();
  }
  return (
    <StyledList>
      {tasks.map((task) => (
        <StyledListItems
          key={task.id}
          $current={handleCurrentTask(task.dueDate)}
        >
          <TaskPreview task={task} />
        </StyledListItems>
      ))}
    </StyledList>
  );
}
