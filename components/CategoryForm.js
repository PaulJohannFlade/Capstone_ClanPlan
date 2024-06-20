import { useState } from "react";
import styled from "styled-components";
import StyledButton from "@/components/StyledButton";
import Multiselect from "multiselect-react-dropdown";
import MultiselectContainer from "@/components/MultiselectContainer";
import { useData } from "@/context/dataContext";

const StyledHeading = styled.h2`
  align-self: center;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
`;

const StyledSpan = styled.span`
  font-size: 1rem;
  color: var(--color-alert-font);
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
`;

export default function CategoryForm({
  onSubmitCategory,
  categories,
  formHeading,
  value,
  user,
}) {
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [isUniqueCategory, setIsUniqueCategory] = useState(true);
  const [enteredCategory, setEnteredCategory] = useState(value?.title || "");

  const [selectedMembers, setSelectedMembers] = useState(
    value?.selectedMembers || []
  );
  const [isMemberSelected, setIsMemberSelected] = useState(true);

  const { familyMembers } = useData();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (value) {
      const selectedMembersIds = selectedMembers.map((member) => member._id);
      if (
        data.title.trim() === value.title &&
        selectedMembers.length === value.selectedMembers.length &&
        value.selectedMembers.every((member) =>
          selectedMembersIds.includes(member._id)
        )
      ) {
        alert("No changes were made to the form.");
        return;
      }
    }

    if (!data.title.trim()) {
      setIsValidCategory(false);
      event.target.title.focus();
      return;
    } else {
      setIsValidCategory(true);
      const uniqueCategoryCheck =
        data.title.trim() === value?.title.trim() ||
        !categories.find(
          (category) =>
            category.title.trim().toUpperCase() ===
            data.title.trim().toUpperCase()
        );

      if (!uniqueCategoryCheck) {
        setIsUniqueCategory(uniqueCategoryCheck);
        return;
      }
    }

    if (!selectedMembers.length > 0) {
      setIsMemberSelected(false);
      return;
    } else {
      setIsMemberSelected(true);
    }
    onSubmitCategory({
      title: data.title.trim(),
      selectedMembers,
      id: value?._id,
      family: value?.family || user.family._id,
    });
  }

  function handleChange(event) {
    setEnteredCategory(event.target.value);
    setIsUniqueCategory(true);
    setIsValidCategory(true);
  }

  function onSelect(selectedList) {
    setSelectedMembers(selectedList);
  }

  function onRemove(_selectedList, removedItem) {
    setSelectedMembers(
      selectedMembers.filter((member) => member._id !== removedItem._id)
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit} aria-labelledby="category-form">
      <StyledHeading id="category-form">{formHeading}</StyledHeading>
      <StyledLabel htmlFor="title">
        <StyledSpan $left={true}>*</StyledSpan>Title:
        {!isValidCategory && (
          <StyledSpan id="title-error" aria-live="polite">
            Please enter valid category!
          </StyledSpan>
        )}
        {!isUniqueCategory && (
          <StyledSpan id="title-unique-error" aria-live="polite">
            Category already exists. Please choose another name.
          </StyledSpan>
        )}
      </StyledLabel>
      <input
        type="text"
        name="title"
        id="title"
        onChange={handleChange}
        maxLength={50}
        defaultValue={value?.title}
        aria-invalid={!isValidCategory || !isUniqueCategory}
        aria-describedby={
          (!isValidCategory && "title-error") ||
          (!isUniqueCategory && "title-unique-error")
        }
      />
      <StyledSpan aria-live="polite">
        {50 - enteredCategory.length} characters left
      </StyledSpan>

      <StyledLabel htmlFor="members">
        <StyledSpan $left={true}>*</StyledSpan>
        Members
        {!isMemberSelected && <StyledSpan>Please select a member!</StyledSpan>}
      </StyledLabel>
      <MultiselectContainer>
        <Multiselect
          options={familyMembers}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue="name"
          showCheckbox={true}
          keepSearchTerm={true}
          emptyRecordMsg="No members found"
          placeholder="Please select a member"
          avoidHighlightFirstOption={true}
          selectedValues={selectedMembers}
          style={{
            searchBox: {
              paddingRight: "25px",
            },
          }}
        />
      </MultiselectContainer>
      <StyledButton>{value ? "Update" : "Add"}</StyledButton>
    </StyledForm>
  );
}
