import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Filter from "@/components/Filter";

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
  const filteredTasks = tasks.filter(
    (task) =>
      (!Number(filters.priority) || task.priority === filters.priority) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  return (
    <div>
      <StyledHeading>Family Task List</StyledHeading>

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
