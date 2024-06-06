import { StyledMessage } from "..";
import Modal from "@/components/Modal";
import CategoriesList from "@/components/CategoriesList";
import CategoryForm from "@/components/CategoryForm";
import StyledPlus from "@/components/StyledPlus";
import useSWR from "swr";
import { useState } from "react";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { toast } from "react-toastify";
import { StyledMenu } from "../family";
import { useModal } from "@/context/modalContext";

export default function CategoriesPage({ familyMembers, user }) {
  const [modalMode, setModalMode] = useState("");

  const { data: categories, isLoading, mutate } = useSWR("/api/categories");

  const { showModal, openModal, closeModal } = useModal();

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!categories) {
    return;
  }

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
      mutate();
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
        mutate={mutate}
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
