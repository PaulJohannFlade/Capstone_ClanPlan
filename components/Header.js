import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-background);
  color: var(--color-font);
  box-shadow: 0px 1px 10px -1px var(--color-font);
  text-shadow: 1px 1px 3px var(--color-font);
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0.7rem;
  z-index: 5;
  width: 100vw;
  min-width: 330px;

  @media (min-width: 900px) {
    left: 99px;
    box-shadow: 0px 7px 7px -7px var(--color-font);
    width: calc(100% - 99px);
  }
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
