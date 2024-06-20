import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: ${({ $top }) => ($top ? $top : "1rem")};
  color: var(--color-font);
  font-weight: 700;
  border: 0.5px solid var(--color-font);
  border-bottom-width: 2px;
  background-color: ${({ $red }) =>
    $red ? "var(--color-alert)" : "var(--color-button)"};
  padding: 0.4rem;
  width: ${({ $width }) => ($width ? $width : "6rem")};
  align-self: center;
  border-radius: 0.5rem;
  ${({ $absolute }) =>
    $absolute &&
    `position: absolute;
  top: 0.5rem;
  right: 0.5rem;`}
  &:disabled {
    background-color: #808080;
    opacity: 0.5;
  }
`;

export default StyledButton;
