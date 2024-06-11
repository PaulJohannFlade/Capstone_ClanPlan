import Filter from "@/components/Filter";
import TasksList from "@/components/TasksList";
import TasksListGroups from "@/components/TasksListGroups";
import styled from "styled-components";
import checkForMissedDate from "@/utils/checkForMissedDate";
import checkForToday from "@/utils/checkForToday";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";
import ProgressPieChart from "@/components/ProgressPieChart";
import getTasksForUser from "@/utils/getTasksForUser";

const StyledSection = styled.section`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 900px) {
    justify-content: flex-start;
  }
`;

const StyledSpan = styled.span`
  color: ${({ $redColor }) =>
    $redColor ? "var(--color-alert)" : "var(--color-font)"};
  text-align: center;
  display: block;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--color-button-active)" : "var(--color-button)"};
  margin-top: 1rem;
  color: var(--color-font);
  font-weight: 700;
  padding: 0.5rem 1rem;
  align-self: center;
  border-radius: 1rem;
  color: var(--color-font);
  border: none;
`;

const StyledHeading = styled.h2`
  margin-top: 1rem;
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

const StyledGreetings = styled.h2`
  text-align: center;
  cursor: pointer;
  margin-top: 8rem;
`;

const StyledTabs = styled.div`
  position: absolute;
  top: 4.5rem;
  width: 100%;
  background-color: var(--color-button);
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledTabButton = styled.button`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--color-button-active)" : "var(--color-button)"};
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.7rem 2rem;
  transition: 0.3s;
  font-weight: 700;
`;

export default function HomePage({
  onSetDetailsBackLinkRef,
  filters,
  setFilters,
  onButtonClick,
  listType,
  onMyTasksSelection,
  myTasksSelection,
}) {
  const { closeModal } = useModal();
  const { tasks, user } = useData();

  const tasksToDisplay = myTasksSelection
    ? getTasksForUser(tasks, user)
    : tasks;

  const isFilterSet =
    (filters.priority !== "0" && filters.priority) ||
    filters.category ||
    filters.member
      ? true
      : false;

  const missedTasks = tasksToDisplay.filter(
    (task) => task?.dueDate && checkForMissedDate(task.dueDate) && !task.isDone
  );

  const todaysTasks = tasksToDisplay.filter(
    (task) => task?.dueDate && checkForToday(task.dueDate) && !task.isDone
  );

  const notAssignedTasks = tasksToDisplay.filter(
    (task) => !task?.assignedTo.length && !task.isDone
  );

  const completedTasks = tasksToDisplay.filter((task) => task.isDone);

  let tasksAfterListTypeSelection = tasksToDisplay;
  if (listType === "today") {
    tasksAfterListTypeSelection = todaysTasks;
  } else if (listType === "missed") {
    tasksAfterListTypeSelection = missedTasks;
  } else if (listType === "done") {
    tasksAfterListTypeSelection = completedTasks;
  } else if (listType === "notAssigned") {
    tasksAfterListTypeSelection = notAssignedTasks;
  }

  const filteredTasks = tasksAfterListTypeSelection.filter(
    (task) =>
      (!Number(filters.priority) || task.priority === filters.priority) &&
      (!filters.category || task.category?._id === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  function handleApplyFilters(formData) {
    setFilters(formData);
    closeModal();
  }

  function handleDeleteFilterOption(key) {
    setFilters({ ...filters, [key]: "" });
  }

  return (
    <>
      <StyledTabs>
        <StyledTabButton
          $isActive={myTasksSelection}
          onClick={onMyTasksSelection}
        >
          My Tasks
        </StyledTabButton>
        <StyledTabButton
          $isActive={!myTasksSelection}
          onClick={onMyTasksSelection}
        >
          Family Tasks
        </StyledTabButton>
      </StyledTabs>
      <StyledGreetings>
        {myTasksSelection
          ? `Hello ${user?.name}`
          : `Hello "${user?.family?.name}" family`}
      </StyledGreetings>
      <StyledSection>
        <StyledButton
          onClick={() => onButtonClick("today")}
          $isActive={listType === "today"}
        >
          <StyledSpan>Today</StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("all")}
          $isActive={listType === "all"}
        >
          <StyledSpan>All Tasks</StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("done")}
          $isActive={listType === "done"}
        >
          <StyledSpan>Done</StyledSpan>
        </StyledButton>
        <StyledButton
          onClick={() => onButtonClick("missed")}
          $isActive={listType === "missed"}
        >
          <StyledSpan $redColor={missedTasks.length}>
            Missed {missedTasks.length}
          </StyledSpan>
        </StyledButton>
        {myTasksSelection ? (
          <StyledButton
            onClick={() => onButtonClick("progress")}
            $isActive={listType === "progress"}
          >
            <StyledSpan>Progress</StyledSpan>
          </StyledButton>
        ) : (
          <StyledButton
            onClick={() => onButtonClick("notAssigned")}
            $isActive={listType === "notAssigned"}
          >
            <StyledSpan $redColor={notAssignedTasks.length}>
              Not assigned {notAssignedTasks.length}
            </StyledSpan>
          </StyledButton>
        )}
      </StyledSection>
      {listType === "today" && (
        <StyledHeading>
          {todaysTasks.length === 1
            ? `${todaysTasks.length} Task for today`
            : `${todaysTasks.length} Tasks for today`}
        </StyledHeading>
      )}
      {listType === "all" && <StyledHeading>My Family Tasks</StyledHeading>}
      {listType === "done" && <StyledHeading>Completed Tasks </StyledHeading>}
      {listType === "notAssigned" && (
        <StyledHeading>Not assigned Tasks </StyledHeading>
      )}
      {listType === "missed" && (
        <StyledHeading>
          You have missed {missedTasks.length}
          {missedTasks.length === 1 ? " Task" : " Tasks"}
        </StyledHeading>
      )}

      {listType !== "progress" && tasksAfterListTypeSelection.length > 0 && (
        <Filter
          onApplyFilters={handleApplyFilters}
          filters={filters}
          onDeleteFilterOption={handleDeleteFilterOption}
          setFilters={setFilters}
          myTasksSelection={myTasksSelection}
        />
      )}
      {!filteredTasks.length &&
        !isFilterSet &&
        listType !== "today" &&
        listType !== "progress" && (
          <StyledMessage>No tasks to display.</StyledMessage>
        )}
      {!filteredTasks.length && !isFilterSet && listType === "today" && (
        <StyledMessage>
          <span>Relax!</span>
          <br />
          <span>No tasks for today.</span>
        </StyledMessage>
      )}
      {!filteredTasks.length && isFilterSet && (
        <StyledMessage>No tasks with this search criteria.</StyledMessage>
      )}
      {listType !== "all" && listType !== "progress" && (
        <TasksList
          tasks={filteredTasks}
          onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
        />
      )}
      {listType === "all" && (
        <TasksListGroups
          tasks={filteredTasks}
          onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
        />
      )}
      {listType === "progress" && <ProgressPieChart />}
    </>
  );
}

export { StyledMessage, StyledTabs, StyledTabButton };
