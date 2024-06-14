import { StyledMessage } from "@/pages";
import Modal from "@/components/Modal";
import CategoriesList from "@/components/CategoriesList";
import CategoryForm from "@/components/CategoryForm";
import StyledPlus from "@/components/StyledPlus";
import { useState } from "react";
import { toast } from "react-toastify";
import { StyledMenu } from "@/pages/family";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";

export default function CategoriesPage() {
  const [modalMode, setModalMode] = useState("");

  const { user, familyMembers, categories, mutateCategories } = useData();

  const { showModal, openModal, closeModal } = useModal();

  async function handleAddCategory(newCategoryData) {
    const response = await toast.promise(
      fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategoryData),
      }),
      {
        pending: "Category addition is pending",
        success: "Category added successfully",
        error: "Category not added",
      }
    );
    if (response.ok) {
      closeModal();
      mutateCategories();
    }
  }

  return (
    <>
      <StyledMenu>
        <StyledPlus
          onClick={() => {
            setModalMode("add");
            openModal();
          }}
          $right={true}
        />
        <h2>Task Categories</h2>
      </StyledMenu>

      {!categories.length && (
        <StyledMessage>
          The list is empty. Add categories to begin!
        </StyledMessage>
      )}
      <CategoriesList
        familyMembers={familyMembers}
        modalMode={modalMode}
        setModalMode={setModalMode}
        categories={categories}
        mutateCategories={mutateCategories}
      />

      <Modal $top="7rem" $open={showModal && modalMode === "add"}>
        {showModal && modalMode === "add" && (
          <CategoryForm
            formHeading="Add a category"
            onSubmitCategory={handleAddCategory}
            familyMembers={familyMembers}
            categories={categories}
            user={user}
          />
        )}
      </Modal>
    </>
  );
}
