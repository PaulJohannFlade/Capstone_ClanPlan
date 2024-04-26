import TasksList from "@/components/TasksList";
import styled from "styled-components";
import FilterIcon from "@/public/assets/images/filter.svg";
import StyledButton from "@/components/StyledButton";
import Modal from "@/components/Modal";
import FilterWindow from "@/components/FilterWindow";
import { useState } from "react";
import StyledBackLink from "./StyledBackLink";
import BackArrow from "@/public/assets/images/back-arrow.svg";

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

const StyledClearFilterButton = styled.button`
  color: white;
  font-weight: 700;
  background-color: var(--color-font);
  padding: 0.5rem;
  border-radius: 0.7rem;
`;

export default function Tasks({
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

  const filteredTasks = tasks.filter(
    (task) =>
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.category || task.category === filters.category) &&
      (!filters.member || task.assignedTo.includes(filters.member))
  );

  return (
    <>
      <StyledBackLink href="/">
        <BackArrow />
      </StyledBackLink>
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
                  ? categories.find((category) => category.id === filters[key])
                      .category
                  : filters[key]}
              </StyledClearFilterButton>
            )
        )}
      </StyledList>
      {tasks.length ? (
        <>
          {!filteredTasks.length && (
            <StyledMessage>No tasks with this search criteria.</StyledMessage>
          )}
          <TasksList
            tasks={filteredTasks}
            onCheckboxChange={onCheckboxChange}
            categories={categories}
          />
        </>
      ) : (
        <StyledMessage>No tasks to display.</StyledMessage>
      )}
    </>
  );
}

export { StyledMessage };
