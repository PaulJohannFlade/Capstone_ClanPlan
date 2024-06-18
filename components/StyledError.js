import styled from "styled-components";

const StyledErrorContainer = styled.div`
  position: absolute;
  line-height: 48px;
  top: 50%;
  transform: translateY(-50%);
  @media (min-width: 410px) {
    margin: auto;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledErrorNumber = styled.h2`
  display: inline-block;
  padding-right: 0.5rem;
  font-size: 24px;
  font-weight: 800;
  vertical-align: top;
  border-right: 1px solid var(--color-error-border);
  margin: 0 0.5rem 0 0;
  @media (max-width: 409px) {
    margin-left: 6rem;
  }
`;

const StyledErrorMessage = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
`;

const StyledDiv = styled.div`
  display: inline-block;
`;

export default function StyledError() {
  return (
    <StyledErrorContainer>
      <StyledErrorNumber>404</StyledErrorNumber>
      <StyledDiv>
        <StyledErrorMessage>This page could not be found.</StyledErrorMessage>
      </StyledDiv>
    </StyledErrorContainer>
  );
}
