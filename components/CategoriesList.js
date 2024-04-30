import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";
import StyledTrash from "./StyledTrash";
import Modal from "./Modal";
import DeleteConfirmBox from "./DeleteConfirmBox";

const StyledList = styled.ul`
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
  list-style: none;
  margin-bottom: 6rem;
`;

const StyledListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  border-radius: 2rem;
  padding: 1rem 2rem;
  border: none;
`;

const StyledListOfMembers = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledMemberItem = styled.li`
  text-align: left;
`;

const StyleHeading = styled.h3`
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledUpArrow = styled(UpArrow)`
  margin: auto;
`;

const StyledDownArrow = styled(DownArrow)`
  margin: auto;
`;

export default function CategoriesList({
  categories,
  familyMembers,
  showModal,
  setShowModal,
  modalMode,
  setModalMode,
  onDeleteCategory,
}) {
  const [selected, setSelected] = useState(null);
  const [categoryToDelete, setCategoryItemToDelete] = useState(null);

  function handleExpand(index) {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
  }
  return (
    <>
      <StyledList>
        {categories.map((category, index) => (
          <StyledListItem key={category.id} onClick={() => handleExpand(index)}>
            <StyledTrash
              onClick={() => {
                setCategoryItemToDelete(category);
                setModalMode("delete");
                setShowModal(true);
              }}
            />
            <StyleHeading title={category.title}>
              <strong>{category.title}</strong>
            </StyleHeading>
            {selected === index && (
              <StyledListOfMembers>
                {category.selectedMembers.map((memberId) => (
                  <StyledMemberItem key={memberId}>
                    {
                      familyMembers.find((member) => member.id === memberId)
                        ?.name
                    }
                  </StyledMemberItem>
                ))}
              </StyledListOfMembers>
            )}
            {selected === index ? <StyledUpArrow /> : <StyledDownArrow />}
          </StyledListItem>
        ))}
      </StyledList>
      {showModal && modalMode === "delete" && (
        <Modal $top="7rem" setShowModal={setShowModal}>
          <DeleteConfirmBox
            message={`Are you sure you want to delete ${categoryToDelete.title}?`}
            setShowModal={setShowModal}
            onDelete={onDeleteCategory}
            id={categoryToDelete.id}
          />
        </Modal>
      )}
    </>
  );
}
