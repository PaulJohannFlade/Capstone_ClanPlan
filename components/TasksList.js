import TaskPreview from "./TaskPreview";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useData } from "@/context/dataContext";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  @media (min-width: 1536px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledListItems = styled.li`
  border-radius: 2rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  background-color: ${({ $isDone }) =>
    $isDone ? "#d3d3d3" : "var(--color-background)"};
  opacity: ${({ $isDone }) => $isDone && "0.5"};
  padding: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  margin: 0.5rem;
  transition: background-color 0.5s ease;
`;

export default function TasksList({
  tasks,
  onSetDetailsBackLinkRef,
  allTasks,
}) {
  const { mutateTasks } = useData();

  async function handleCheckboxChange(task, event) {
    const updatedTaskData = { ...task, isDone: event.target.checked };
    const response = await toast.promise(
      fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      }),
      {
        pending: "Task updation is pending",
        success: "Task updated successfully",
        error: "Task not updated",
      }
    );
    if (response.ok) {
      mutateTasks();
    }
  }

  return (
    <StyledList $allTasks={allTasks}>
      {tasks.map((task) => (
        <StyledListItems key={task._id} $isDone={task.isDone}>
          <TaskPreview
            task={task}
            onCheckboxChange={handleCheckboxChange}
            onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
          />
        </StyledListItems>
      ))}
    </StyledList>
  );
}
