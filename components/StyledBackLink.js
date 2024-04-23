import styled from "styled-components";
import Link from "next/link";

const StyledBackLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
  z-index: 2;
`;

export default StyledBackLink;
