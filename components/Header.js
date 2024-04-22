import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-font);
  color: var(--color-font-light);
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 375px;
  margin: auto;
  padding: 0.7rem;
  z-index: 1;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>ClanPlan</h1>
    </StyledHeader>
  );
}
