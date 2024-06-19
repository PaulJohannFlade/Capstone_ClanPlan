import { useModal } from "@/context/modalContext";
import FilterWindow from "./FilterWindow";
import Modal from "./Modal";
import StyledButton from "./StyledButton";
import FilterIcon from "@/public/assets/images/filter.svg";
import styled from "styled-components";
import { useData } from "@/context/dataContext";

const StyledFilterSection = styled.section`
  position: relative;
`;

const StyledFilterButton = styled(StyledButton)`
  position: absolute;
  left: 1rem;
  top: -3.3rem;
  padding: 0.1rem 0.4rem;
  @media (min-width: 600px) {
    width: 3.5rem;
    padding: 0.2rem 0.6rem;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StyledClearFilterButton = styled.button`
  font-size: 0.8rem;
  color: var(--color-font);
  font-weight: 700;
  background-color: var(--color-background);
  border: 0.5px solid var(--color-font);
  border-radius: 0.7rem;
  padding: 0.2rem 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 250px;
`;

export default function Filter({
  onApplyFilters,
  filters,
  onDeleteFilterOption,
  myTasksSelection,
}) {
  const { showModal, openModal } = useModal();
  const { familyMembers, categories } = useData();

  return (
    <StyledFilterSection>
      <Modal $top="6rem" $open={showModal}>
        {showModal && (
          <FilterWindow
            onApply={onApplyFilters}
            filters={filters}
            myTasksSelection={myTasksSelection}
          />
        )}
      </Modal>
      <StyledFilterButton $width="2.5rem" onClick={openModal}>
        <FilterIcon role="img" aria-label="filter icon" />
      </StyledFilterButton>

      <StyledList>
        {Object.keys(filters).map(
          (key) =>
            Number(filters[key]) !== 0 && (
              <StyledClearFilterButton
                onClick={() => onDeleteFilterOption(key)}
                key={key}
              >
                <span aria-label="close emoji" role="img">
                  ❌
                </span>{" "}
                {key}:{" "}
                {key === "member"
                  ? familyMembers.find((member) => member._id === filters[key])
                      .name
                  : key === "category"
                  ? categories.find((category) => category._id === filters[key])
                      .title
                  : filters[key]}
              </StyledClearFilterButton>
            )
        )}
      </StyledList>
    </StyledFilterSection>
  );
}
