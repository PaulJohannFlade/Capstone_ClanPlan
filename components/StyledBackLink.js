import styled from "styled-components";
import Link from "next/link";

const StyledBackLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default StyledBackLink;
