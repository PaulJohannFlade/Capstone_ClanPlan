import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";
import StyledTrash from "./StyledTrash";
import Modal from "./Modal";
import DeleteConfirmBox from "./DeleteConfirmBox";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import StyledButton from "./StyledButton";
import CategoryForm from "./CategoryForm";
import useSWR from "swr";

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

const StyledPen = styled(Pen)`
  width: 1.5rem;
  position: absolute;
  top: 15px;
  right: 60px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const StyleHeading = styled.h3`
  max-width: 230px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledPragraph = styled.p`
  text-align: center;
`;

export default function CategoriesList({
  showModal,
  setShowModal,
  modalMode,
  setModalMode,
  onEditCategory,
  familyMembers,
}) {
  const [selected, setSelected] = useState(null);
  const [categoryToHandle, setCategoryToHandle] = useState(null);

  const { data: categories, mutate } = useSWR("/api/categories");

  const { data: tasks } = useSWR("/api/tasks");

  const categoryIsUsed =
    categoryToHandle &&
    tasks.filter(
      (task) => !task.isDone && task.category?._id === categoryToHandle?._id
    ).length > 0;

  function handleTrashClick(category, event) {
    setCategoryToHandle(category);
    setModalMode("delete");
    setShowModal(true);
    event.stopPropagation();
  }

  async function handleDeleteCategory(id) {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setShowModal(false);
      mutate();
    }
  }

  /* setCategories(categories.filter((category) => category.id !== id));
    setTasks(
      tasks.map((task) =>
        task.category === id ? { ...task, category: "" } : task
      )
    );
    setShowModal(false); */

  function handlePenClick(category, event) {
    setCategoryToHandle(category);
    const categoryIsUsed =
      category &&
      tasks.filter((task) => !task.isDone && task.category === category.id)
        .length > 0;
    if (categoryIsUsed) {
      setModalMode("confirm-edit");
      setShowModal(true);
    } else {
      setModalMode("edit");
      setShowModal(true);
    }
    event.stopPropagation();
  }

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
            <StyledPen onClick={(event) => handlePenClick(category, event)} />
            <StyledTrash
              onClick={(event) => {
                handleTrashClick(category, event);
              }}
            />
            <StyleHeading title={category.title}>
              <strong>{category.title}</strong>
            </StyleHeading>
            {selected === index && (
              <StyledListOfMembers>
                {category.selectedMembers.map((member) => (
                  <StyledMemberItem key={member._id}>
                    {member.name}
                  </StyledMemberItem>
                ))}
              </StyledListOfMembers>
            )}
            {selected === index ? <StyledUpArrow /> : <StyledDownArrow />}
          </StyledListItem>
        ))}
      </StyledList>
      {showModal && modalMode === "delete" && (
        <Modal $top="12rem" setShowModal={setShowModal}>
          <DeleteConfirmBox
            message={
              categoryIsUsed
                ? `Category "${categoryToHandle.title}" is used in active tasks. Are you sure you want to delete "${categoryToHandle.title}"?`
                : `Are you sure you want to delete "${categoryToHandle.title}"?`
            }
            setShowModal={setShowModal}
            onConfirm={handleDeleteCategory}
            id={categoryToHandle._id}
          />
        </Modal>
      )}
      {showModal && modalMode === "confirm-edit" && categoryIsUsed && (
        <Modal $top="13rem" setShowModal={setShowModal}>
          <StyledSection>
            <StyledPragraph>{`Category "${categoryToHandle.title}" is used in active tasks. Are you sure you want to edit "${categoryToHandle.title}"?`}</StyledPragraph>
            <ButtonContainer>
              <StyledButton onClick={() => setShowModal(false)}>
                No
              </StyledButton>
              <StyledButton onClick={() => setModalMode("edit")}>
                Yes
              </StyledButton>
            </ButtonContainer>
          </StyledSection>
        </Modal>
      )}
      {showModal && modalMode === "edit" && (
        <Modal $top="8rem" setShowModal={setShowModal}>
          <CategoryForm
            formHeading="Edit a category"
            onSubmitCategory={onEditCategory}
            categories={categories}
            value={categoryToHandle}
            familyMembers={familyMembers}
          />
        </Modal>
      )}
    </>
  );
}
