import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 2rem;
  color: white;
  font-weight: 700;
  background-color: var(--color-font);
  padding: 0.5rem;
  width: 6rem;
  align-self: center;
  border-radius: 0.7rem;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default StyledButton;
