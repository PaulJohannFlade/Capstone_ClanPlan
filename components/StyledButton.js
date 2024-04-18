import styled from "styled-components";

const StyledButton = styled.button`
  ${({ $left }) => $left && `margin-left: ${$left};`}
  margin-top: 2rem;
  color: white;
  font-weight: 700;
  background-color: ${({ $red }) => ($red ? "red" : "var(--color-font)")};
  padding: 0.5rem;
  width: ${({ $width }) => ($width ? $width : "6rem")};
  align-self: center;
  border-radius: 0.7rem;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default StyledButton;
