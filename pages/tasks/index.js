import styled from "styled-components";
import Tasks from "@/components/Tasks";
import { useRouter } from "next/router";

const StyledHeading = styled.h2`
  text-align: center;
`;

export default function TasksPage({
  tasks,
  onCheckboxChange,
  setShowModal,
  showModal,
  familyMembers,
  categories,
}) {
  const router = useRouter();
  const { listType } = router.query;
  let tasksAfterFiltering = [];
  if (listType === "missed") {
    tasksAfterFiltering = tasks.filter(
      (task) =>
        new Date(task.dueDate)?.toISOString().substring(0, 10) <
        new Date().toISOString().substring(0, 10)
    );
  }
  if (listType === "all") {
    tasksAfterFiltering = tasks;
  }
  if (listType === "notAssigned") {
    tasksAfterFiltering = tasks.filter((task) => task.assignedTo === "");
  }

  return (
    <>
      <StyledHeading>
        {listType === "missed"
          ? "Missed - "
          : listType === "notAssigned"
          ? "Not assigned - "
          : ""}
        Family Task List
      </StyledHeading>
      <Tasks
        tasks={tasksAfterFiltering}
        onCheckboxChange={onCheckboxChange}
        setShowModal={setShowModal}
        showModal={showModal}
        familyMembers={familyMembers}
        categories={categories}
      />
    </>
  );
}
