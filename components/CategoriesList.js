import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";
import StyledTrash from "./StyledTrash";
import Modal from "./Modal";
import CategoryForm from "./CategoryForm";
import StyledLoadingAnimation from "./StyledLoadingAnimation";
import { toast } from "react-toastify";
import StyledPen from "./StyledPen";
import ConfirmBox from "./ConfirmBox";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";

const StyledList = styled.ul`
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
  list-style: none;
`;

const StyledListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  box-shadow: 1px 1px 10px -1px var(--color-font);
  border-radius: 2rem;
  padding: 0.7rem 2rem 0.4rem 2rem;
  border: none;
  transition: background-color 0.5s ease;
`;

const StyledListOfMembers = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledMemberItem = styled.li`
  text-align: left;
`;

const StyleHeading = styled.h3`
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledUpArrow = styled(UpArrow)`
  margin: auto;
  stroke: var(--color-font);
  fill: var(--color-font);
  width: 2rem;
`;

const StyledDownArrow = styled(DownArrow)`
  margin: auto;
  stroke: var(--color-font);
  fill: var(--color-font);
  width: 2rem;
`;

export default function CategoriesList({
  modalMode,
  setModalMode,
  familyMembers,
  categories,
  mutateCategories,
}) {
  const [selected, setSelected] = useState(null);
  const [categoryToHandle, setCategoryToHandle] = useState(null);
  const { showModal, openModal, closeModal } = useModal();
  const { tasks } = useData();

  const categoryIsUsed =
    categoryToHandle &&
    tasks.filter(
      (task) => !task.isDone && task.category?._id === categoryToHandle?._id
    ).length > 0;

  function handleTrashClick(category, event) {
    setCategoryToHandle(category);
    setModalMode("delete");
    openModal();
    event.stopPropagation();
  }

  async function handleDeleteCategory(id) {
    const response = await toast.promise(
      fetch(`/api/categories/${id}`, {
        method: "DELETE",
      }),
      {
        pending: "Category deletion is pending",
        success: "Category deleted successfully",
        error: "Category not deleted",
      }
    );
    if (response.ok) {
      closeModal();
      mutateCategories();
    }
  }

  async function handleEditCategory(updatedCategory) {
    const response = await toast.promise(
      fetch(`/api/categories/${updatedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      }),
      {
        pending: "Category updation is pending",
        success: "Category updated successfully",
        error: "Category not updated",
      }
    );

    if (response.ok) {
      closeModal();
      mutateCategories();
    }
  }

  function handlePenClick(category, event) {
    setCategoryToHandle(category);
    const categoryIsUsed =
      category &&
      tasks.filter(
        (task) => !task.isDone && task.category?._id === category._id
      ).length > 0;
    if (categoryIsUsed) {
      setModalMode("confirm-edit");
      openModal();
    } else {
      setModalMode("edit");
      openModal();
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
          <StyledListItem
            key={category._id}
            onClick={() => handleExpand(index)}
          >
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
      <Modal $top="12rem" $open={showModal && modalMode === "delete"}>
        {showModal && modalMode === "delete" && (
          <ConfirmBox
            message={
              categoryIsUsed
                ? `Category "${categoryToHandle.title}" is used in active tasks. Are you sure you want to delete "${categoryToHandle.title}"?`
                : `Are you sure you want to delete "${categoryToHandle.title}"?`
            }
            onConfirm={() => handleDeleteCategory(categoryToHandle._id)}
          />
        )}
      </Modal>
      <Modal
        $top="13rem"
        $open={showModal && modalMode === "confirm-edit" && categoryIsUsed}
      >
        {showModal && modalMode === "confirm-edit" && categoryIsUsed && (
          <ConfirmBox
            message={`Category "${categoryToHandle.title}" is used in active tasks. Are you sure you want to edit "${categoryToHandle.title}"?`}
            onConfirm={() => setModalMode("edit")}
          />
        )}
      </Modal>
      <Modal $top="8rem" $open={showModal && modalMode === "edit"}>
        {showModal && modalMode === "edit" && (
          <CategoryForm
            formHeading="Edit a category"
            onSubmitCategory={handleEditCategory}
            categories={categories}
            value={categoryToHandle}
            familyMembers={familyMembers}
          />
        )}
      </Modal>
    </>
  );
}
