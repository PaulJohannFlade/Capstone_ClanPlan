import Plus from "@/public/assets/images/plus.svg";
import styled from "styled-components";

const StyledPlus = styled(Plus)`
  position: absolute;
  top: 5rem;
  left: 1rem;
  width: 3rem;
  fill: var(--color-background);
  cursor: pointer;
  stroke: var(--color-font);
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }

  @media (min-width: 900px) {
    left: 10rem;
  }

  @media (min-width: 1200px) {
    left: 10rem;
  }
`;

export default StyledPlus;
