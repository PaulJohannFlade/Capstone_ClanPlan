import styled from "styled-components";
import Close from "@/public/assets/images/close-icon.svg";
import { useModal } from "@/context/modalContext";

const StyledClose = styled(Close)`
  width: 2rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  stroke: var(--color-alert);
`;

export default function CloseButton() {
  const { closeModal } = useModal();

  return <StyledClose onClick={closeModal} />;
}
