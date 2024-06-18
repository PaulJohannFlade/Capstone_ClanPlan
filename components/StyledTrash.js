import styled from "styled-components";
import Trash from "@/public/assets/images/trash-icon.svg";

const StyledTrash = styled(Trash)`
  fill: var(--color-font);
  width: ${({ $small }) => ($small ? "1rem" : "1.5rem")};
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
    transition: all 500ms linear;
  }
`;

export default StyledTrash;
