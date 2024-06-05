import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";

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

const StyledSelect = styled.select`
  padding: 0.3rem;
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

const StyledInput = styled.input`
  display: none;
`;

export default function MemberForm({
  onAddMember,
  familyMembers,
  user,
  form,
  isInfoEditMode,
  heading,
}) {
  const [isValidName, setIsValidName] = useState(true);
  const [isValidRole, setIsValidRole] = useState(true);
  const [isUniqueName, setIsUniqueName] = useState(true);
  const [enteredName, setEnteredName] = useState(
    isInfoEditMode ? user.name : ""
  );

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (isInfoEditMode) {
      if (data.name.trim() === user.name && data.role === user.role) {
        alert("No changes were made to the form.");
        return;
      }
    }

    if (!data.name.trim()) {
      setIsValidName(false);
      event.target.name.focus();
      return;
    } else {
      setIsValidName(true);
      const uniqueNameCheck = familyMembers.find(
        (member) =>
          member.name.trim().toUpperCase() === data.name.trim().toUpperCase()
      );

      if (uniqueNameCheck) {
        setIsUniqueName(!uniqueNameCheck);
        return;
      }
    }

    if (!data.role) {
      setIsValidRole(false);
      event.target.role.focus();
      return;
    }
    onAddMember({ ...data, family: user.family._id });
  }

  function handleChange(event) {
    setEnteredName(event.target.value);
    setIsUniqueName(true);
    setIsValidName(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit} ref={form}>
      <StyledHeading>{heading}</StyledHeading>
      <StyledLabel htmlFor="name">
        <StyledSpan $left={true}>*</StyledSpan>Name:
        {!isValidName && <StyledSpan>Please enter valid Name!</StyledSpan>}
        {!isUniqueName && (
          <StyledSpan>Member with this name already exists</StyledSpan>
        )}
      </StyledLabel>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        maxLength={50}
        defaultValue={isInfoEditMode && user.name}
      />
      <StyledSpan>{50 - enteredName.length} characters left</StyledSpan>

      <StyledLabel htmlFor="role">
        <StyledSpan $left={true}>*</StyledSpan>Role
        {!isValidRole && <StyledSpan>Please select a role!</StyledSpan>}
      </StyledLabel>

      <StyledSelect
        name="role"
        id="role"
        onChange={() => setIsValidRole(true)}
        defaultValue={isInfoEditMode && user.role}
      >
        <option value="">Please select a role</option>
        <option value="Parent">Parent</option>
        <option value="Child">Child</option>
        <option value="Caregiver">Caregiver</option>
      </StyledSelect>

      <StyledLabel htmlFor="email">
        <StyledSpan $left={true}>*</StyledSpan>Email
      </StyledLabel>
      <input
        type="email"
        id="email"
        name="email"
        required
        defaultValue={isInfoEditMode && user.email}
      />

      <StyledInput
        type="text"
        id="familyName"
        name="familyName"
        value={user.family.name}
        readOnly
      />

      <StyledButton>{isInfoEditMode ? "Update" : "Add"}</StyledButton>
    </StyledForm>
  );
}
