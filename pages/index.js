import styled from "styled-components";
import Link from "next/link";
import Plus from "@/public/assets/images/plus.svg";
import StyledButton from "@/components/StyledButton";
import Modal from "@/components/Modal";
import FilterWindow from "@/components/FilterWindow";
import FilterIcon from "@/public/assets/images/filter.svg";
import TasksList from "@/components/TasksList";
import { useState } from "react";

const StyledPlus = styled(Plus)`
  fill: grey;
  width: 1.5rem;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledLink = styled(Link)`
  margin: 1rem;
  color: black;
  font-weight: 700;
  background-color: white;
  padding: 0.5rem;
  width: 8rem;
  align-self: center;
  border-radius: 0.7rem;
  justify-self: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StyledSpan = styled.span`
  color: ${({ $redColor }) => ($redColor ? "red" : "var(--color-font)")};
  text-align: center;
  display: block;
`;

const StyledClearFilterButton = styled.button`
  color: white;
  font-weight: 700;
  background-color: var(--color-font);
  padding: 0.5rem;
  border-radius: 0.7rem;
`;

const Styledh3 = styled.h3`
  text-align: center;
`;

export default function HomePage({
  tasks,
  onCheckboxChange,
  setShowModal,
  showModal,
  familyMembers,
  categories,
}) {
  const [filters, setFilters] = useState({});

  function handleApplyFilters(formData) {
    setFilters(formData);
    setShowModal(false);
  }

  function handleDeleteFilterOption(key) {
    setFilters({ ...filters, [key]: "" });
  }

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
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  return (
    <>
      <StyledSection>
        <StyledLink href="/tasks?listType=missed">
          <StyledSpan $redColor={true}>
            Missed {`(${missedTasks.length})`}
          </StyledSpan>
        </StyledLink>
        <StyledLink href="/tasks?listType=notAssigned">
          <StyledSpan $redColor={true}>Not assigned</StyledSpan>
        </StyledLink>
        <StyledLink href="/tasks?listType=all">
          <StyledSpan>All tasks</StyledSpan>
        </StyledLink>
        <StyledLink href="/create">
          <StyledSpan>
            <StyledPlus />
          </StyledSpan>
        </StyledLink>
      </StyledSection>

      <Styledh3>{tasksAfterFiltering.length} Tasks for today</Styledh3>

      <>
        <StyledButton
          $width="4rem"
          $left="0.5rem"
          onClick={() => setShowModal(true)}
        >
          <FilterIcon />
        </StyledButton>

        {showModal && (
          <Modal $top="5rem" setShowModal={setShowModal}>
            <FilterWindow
              familyMembers={familyMembers}
              categories={categories}
              onApply={handleApplyFilters}
              filters={filters}
            />
          </Modal>
        )}

        <StyledList>
          {Object.keys(filters).map(
            (key) =>
              Number(filters[key]) !== 0 && (
                <StyledClearFilterButton
                  onClick={() => handleDeleteFilterOption(key)}
                  key={key}
                >
                  ❌ {key}:{" "}
                  {key === "member"
                    ? familyMembers.find((member) => member.id === filters[key])
                        .name
                    : key === "category"
                    ? categories.find(
                        (category) => category.id === filters[key]
                      ).category
                    : filters[key]}
                </StyledClearFilterButton>
              )
          )}
        </StyledList>
      </>

      {tasksAfterFiltering.length > 0 ? (
        <TasksList
          tasks={filteredTasks}
          onCheckboxChange={onCheckboxChange}
          categories={categories}
        />
      ) : (
        <StyledMessage>
          <span>Relax !!!!</span>
          <br />
          <span>No tasks for today</span>
        </StyledMessage>
      )}
    </>
  );
}
