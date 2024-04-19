import styled from "styled-components";
import StyledButton from "./StyledButton";
import { useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
`;

const StyledHeading = styled.h2`
  align-self: left;
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSelect = styled.select`
  padding: 0.3rem;
`;

export default function FilterWindow({ onApply, filters, familyMembers }) {
  const [selectedOptions, setSelectedOptions] = useState({
    priority: filters.priority || "0",
    category: filters.category || "",
    member: filters.member || "",
  });

  function handleClearFilter() {
    setSelectedOptions({
      priority: "0",
      category: "",
      member: "",
    });
  }

  function handleChange(field, value) {
    setSelectedOptions({
      ...selectedOptions,
      [field]: value,
    });
  }

  function handleApplyFilter(event) {
    event.preventDefault();
    onApply(selectedOptions);
  }

  return (
    <StyledForm onSubmit={handleApplyFilter}>
      <StyledHeading>Filter</StyledHeading>
      <StyledButton $clear onClick={handleClearFilter}>
        Clear all
      </StyledButton>
      <StyledLabel htmlFor="priority">Priority:</StyledLabel>
      <StyledDiv>
        <span>none</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </StyledDiv>
      <input
        type="range"
        id="priority"
        name="priority"
        min="0"
        max="3"
        value={selectedOptions.priority}
        onChange={(event) => handleChange("priority", event.target.value)}
      ></input>
      <StyledLabel htmlFor="category">Category:</StyledLabel>
      <StyledSelect
        id="category"
        name="category"
        value={selectedOptions.category}
        onChange={(event) => handleChange("category", event.target.value)}
      >
        <option value="">Choose a category</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Bills">Bills</option>
        <option value="Errands">Errands</option>
        <option value="School">School</option>
        <option value="Pets">Pets</option>
        <option value="Health">Health</option>
        <option value="Social">Social</option>
      </StyledSelect>
      <StyledLabel htmlFor="member">Assigned member:</StyledLabel>
      <StyledSelect
        id="member"
        name="member"
        value={selectedOptions.member}
        onChange={(event) => handleChange("member", event.target.value)}
      >
        <option value="">Choose a member</option>
        {familyMembers.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </StyledSelect>
      <StyledButton>Apply</StyledButton>
    </StyledForm>
  );
}
