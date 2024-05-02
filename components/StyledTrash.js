import styled from "styled-components";
import Trash from "@/public/assets/images/trash-icon.svg";

const StyledTrash = styled(Trash)`
  width: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1.3rem;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default StyledTrash;
