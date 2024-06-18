import styled from "styled-components";
import StyledButton from "@/components/StyledButton";
import { useState } from "react";

const StyledHeading = styled.h2`
  align-self: center;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
`;

const StyledSpan = styled.span`
  font-size: 1rem;
  color: red;
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledSelect = styled.select`
  padding: 0.3rem;
`;

export default function FamilyRegisterForm({ onAddFamily, value, isEdit }) {
  const [isValidName, setIsValidName] = useState(true);
  const [isValidRole, setIsValidRole] = useState(true);
  const [enteredName, setEnteredName] = useState(isEdit ? value?.name : "");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.name.trim()) {
      setIsValidName(false);
      event.target.name.focus();
      return;
    }

    if (!isEdit && !data.role) {
      setIsValidRole(false);
      event.target.role.focus();
      return;
    }

    if (isEdit && value?.name === data.name.trim()) {
      alert("Nothing changed to update!");
      return;
    }

    isEdit
      ? onAddFamily({ _id: value?._id, name: data.name.trim() })
      : onAddFamily({ ...data, name: data.name.trim() });
  }

  function handleChange(event) {
    setEnteredName(event.target.value);
    setIsValidName(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>{isEdit ? "Edit family" : "Add family"}</StyledHeading>
      <StyledLabel htmlFor="name">
        <StyledSpan $left={true}>*</StyledSpan>Family Name:
        {!isValidName && (
          <StyledSpan>Please enter valid family name!</StyledSpan>
        )}
      </StyledLabel>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        maxLength={50}
        defaultValue={value?.name}
      />
      <StyledSpan>{50 - enteredName?.length} characters left</StyledSpan>
      {!isEdit && (
        <>
          <StyledLabel htmlFor="role">
            <StyledSpan $left={true}>*</StyledSpan>Your Role
            {!isValidRole && <StyledSpan>Please select a role!</StyledSpan>}
          </StyledLabel>
          <StyledSelect
            name="role"
            id="role"
            onChange={() => setIsValidRole(true)}
          >
            <option value="">Please select a role</option>
            <option value="Parent">Parent</option>
            <option value="Child">Child</option>
            <option value="Caregiver">Caregiver</option>
          </StyledSelect>
        </>
      )}

      <StyledButton>{isEdit ? "Update" : "Add"}</StyledButton>
    </StyledForm>
  );
}
