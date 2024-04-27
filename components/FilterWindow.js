import styled from "styled-components";
import StyledButton from "./StyledButton";

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

export default function FilterWindow({
  onApply,
  familyMembers,
  filters,
  categories,
  setIsFilterSet,
}) {
  function handleApplyFilter(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onApply(data);
    if (data.priority === "0" && data.category === "" && data.member === "") {
      setIsFilterSet(false);
    } else {
      setIsFilterSet(true);
    }
  }

  function handleReset(event) {
    event.preventDefault();
    event.target.reset();
    event.target.elements.priority.value = "0";
    event.target.elements.category.value = "";
    event.target.elements.member.value = "";
    setIsFilterSet(false);
  }

  return (
    <StyledForm onSubmit={handleApplyFilter} onReset={handleReset}>
      <StyledHeading>Filter</StyledHeading>
      <StyledButton $clear type="reset">
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
        defaultValue={filters.priority || "0"}
      ></input>
      <StyledLabel htmlFor="category">Category:</StyledLabel>
      <StyledSelect
        id="category"
        name="category"
        defaultValue={filters.category}
      >
        <option value="">Choose a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category}
          </option>
        ))}
      </StyledSelect>
      <StyledLabel htmlFor="member">Assigned member:</StyledLabel>
      <StyledSelect id="member" name="member" defaultValue={filters.member}>
        <option value="">Choose a member</option>
        {familyMembers.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </StyledSelect>
      <StyledButton type="submit">Apply</StyledButton>
    </StyledForm>
  );
}
