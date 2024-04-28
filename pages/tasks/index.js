import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Filter from "@/components/Filter";
import StyledBackLink from "@/components/StyledBackLink";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import { useRouter } from "next/router";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function TasksPage({
  tasks,
  onCheckboxChange,
  setShowModal,
  showModal,
  familyMembers,
  setDetailsBackLinkRef,
  categories,
  filters,
  setFilters,
  onApplyFilters,
  onDeleteFilterOption,
  isFilterSet,
  setIsFilterSet,
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

  const filteredTasks = tasksAfterFiltering.filter(
    (task) =>
      (!Number(filters.priority) || task.priority === filters.priority) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  return (
    <div>
      <StyledBackLink href="/">
        <BackArrow />
      </StyledBackLink>
      <StyledHeading>
        {listType === "missed"
          ? "Missed - "
          : listType === "notAssigned"
          ? "Not assigned - "
          : ""}
        Family Task List
      </StyledHeading>

      <Filter
        showModal={showModal}
        setShowModal={setShowModal}
        familyMembers={familyMembers}
        onApplyFilters={onApplyFilters}
        filters={filters}
        categories={categories}
        onDeleteFilterOption={onDeleteFilterOption}
        setFilters={setFilters}
        isFilterSet={isFilterSet}
        setIsFilterSet={setIsFilterSet}
      />
      {!tasks.length && !isFilterSet && (
        <StyledMessage>No tasks to display.</StyledMessage>
      )}
      {!filteredTasks.length && isFilterSet && (
        <StyledMessage>No tasks with this search criteria.</StyledMessage>
      )}

      <TasksList
        tasks={filteredTasks}
        onCheckboxChange={onCheckboxChange}
        setDetailsBackLinkRef={setDetailsBackLinkRef}
        categories={categories}
      />
    </div>
  );
}

export { StyledMessage };
