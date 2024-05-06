import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-font-light);
  box-shadow: -1px 6px 15px 0px #7d7d7d;
  color: var(--color-font);
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

const StyledH1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>ClanPlan</StyledH1>
    </StyledHeader>
  );
}
