import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Plus from "@/public/assets/images/plus.svg";
import Link from "next/link";
import Filter from "@/components/Filter";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

const StyledPlus = styled(Plus)`
  fill: var(--color-font);
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: space-around;
`;

const StyledLink = styled(Link)`
  margin: 1rem;
  color: ${({ $redFont }) => ($redFont ? "red" : "var(--color-font)")};
  font-weight: 700;
  background-color: white;
  padding: 0.5rem;
  width: 8rem;
  align-self: center;
  border-radius: 0.7rem;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
`;

const StyledSpan = styled.span`
  color: ${({ $redColor }) => ($redColor ? "red" : "var(--color-font)")};
  text-align: center;
  display: block;
`;

const StyledAnimation = styled.span`
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: blink 1s steps(1, end) infinite;
`;

export default function HomePage({
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
  const missedTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate).toISOString().substring(0, 10) <
        new Date().toISOString().substring(0, 10)
  );

  const tasksAfterFiltering = tasks.filter(
    (task) =>
      new Date(task?.dueDate).toDateString() === new Date().toDateString()
  );

  const filteredTasks = tasksAfterFiltering.filter(
    (task) =>
      (!Number(filters.priority) || task.priority === filters.priority) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );
  return (
    <div>
      <StyledSection>
        <StyledLink href="/tasks?listType=missed">
          <StyledSpan $redColor={true}>
            Missed{" "}
            {missedTasks.length && (
              <StyledAnimation>{`(${missedTasks.length})`}</StyledAnimation>
            )}
          </StyledSpan>
        </StyledLink>
        <StyledLink href="/tasks?listType=notAssigned">
          <StyledSpan $redColor={true}>Not assigned</StyledSpan>
        </StyledLink>
        <StyledLink href="/tasks?listType=all">
          <StyledSpan>All tasks</StyledSpan>
        </StyledLink>
        <StyledLink href="/create">
          <StyledPlus />
        </StyledLink>
      </StyledSection>

      <StyledHeading>
        {tasksAfterFiltering.length === 1
          ? `${tasksAfterFiltering.length} Task for today`
          : `${tasksAfterFiltering.length} Tasks for today`}
      </StyledHeading>
      {tasksAfterFiltering.length > 0 && (
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
      )}

      {!tasksAfterFiltering.length && !isFilterSet && (
        <StyledMessage>
          <span>Relax !!!!</span>
          <br />
          <span>No tasks for today</span>
        </StyledMessage>
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
