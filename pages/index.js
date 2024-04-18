import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Filter from "@/public/assets/images/filter.svg";
import StyledButton from "@/components/StyledButton";
import Modal from "@/components/Modal";
import FilterWindow from "@/components/FilterWindow";
import { useState } from "react";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function HomePage({
  tasks,
  onCheckboxChange,
  setShowModal,
  showModal,
  familyMembers,
}) {
  const [filters, setFilters] = useState({});

  function handleApplyFilters(selectedOptions) {
    setFilters(selectedOptions);
    setShowModal(false);
  }

  return (
    <div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <FilterWindow
            familyMembers={familyMembers}
            onApply={handleApplyFilters}
            filters={filters}
          />
        </Modal>
      )}
      <StyledHeading>Family Task List</StyledHeading>
      <StyledButton
        $width="4rem"
        $left="0.5rem"
        onClick={() => setShowModal(true)}
      >
        <Filter />
      </StyledButton>
      {!tasks.length && <StyledMessage>No Tasks to display.</StyledMessage>}
      <TasksList
        tasks={tasks.filter(
          (task) =>
            (!Number(filters.priority) ||
              task.priority === Number(filters.priority)) &&
            (!filters.category || task.category === filters.category) &&
            (!filters.member || task.assignedTo.includes(filters.member))
        )}
        onCheckboxChange={onCheckboxChange}
      />
    </div>
  );
}

export { StyledMessage };
