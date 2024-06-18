import Pen from "@/public/assets/images/edit-pen-icon.svg";
import styled from "styled-components";

const StyledPen = styled(Pen)`
  width: ${({ $small }) => ($small ? "1rem" : "1.5rem")};
  position: absolute;
  top: 1rem;
  right: ${({ $small }) => ($small ? "3.5rem" : "4.5rem")};
  fill: var(--color-font);
  &:hover {
    cursor: pointer;
    opacity: 0.5;
    transition: all 500ms linear;
  }
`;

export default StyledPen;
