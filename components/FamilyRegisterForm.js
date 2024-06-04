import styled from "styled-components";
import StyledButton from "./StyledButton";
import { useSession } from "next-auth/react";
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

export default function FamilyRegisterForm({ onAddFamily }) {
  const [isValidName, setIsValidName] = useState(true);
  const [isValidRole, setIsValidRole] = useState(true);
  const [enteredName, setEnteredName] = useState("");
  const { data: session, status } = useSession();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.name.trim()) {
      setIsValidName(false);
      event.target.name.focus();
      return;
    }

    if (!data.role) {
      setIsValidRole(false);
      event.target.role.focus();
      return;
    }

    onAddFamily(data);
  }

  function handleChange(event) {
    setEnteredName(event.target.value);
    setIsValidName(true);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeading>Add family</StyledHeading>
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
      />
      <StyledSpan>{50 - enteredName.length} characters left</StyledSpan>

      <StyledLabel htmlFor="role">
        <StyledSpan $left={true}>*</StyledSpan>Your Role
        {!isValidRole && <StyledSpan>Please select a role!</StyledSpan>}
      </StyledLabel>
      <StyledSelect name="role" id="role">
        <option value="">Please select a role</option>
        <option value="Parent">Parent</option>
        <option value="Child">Child</option>
        <option value="Caregiver">Caregiver</option>
      </StyledSelect>

      <StyledButton>Add</StyledButton>
    </StyledForm>
  );
}
