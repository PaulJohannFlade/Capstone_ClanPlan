import styled from "styled-components";
import CloseButton from "@/components/CloseButton";
import { useModal } from "@/context/modalContext";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  z-index: 9;
  opacity: ${({ $open }) => ($open ? 0.7 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.5s ease;
`;

const StyledSection = styled.section`
  background-color: var(--color-background);
  border-radius: 2rem;
  position: fixed;
  top: ${({ $top, $open }) => ($open ? $top : "-100%")};
  right: calc(50% - 190px);
  padding: 15px;
  left: 50%;
  width: 30rem;
  transform: translateX(-50%);
  z-index: 10;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: top 0.5s ease, opacity 0.5s ease, background-color 0.5s ease;
  max-width: 95vw;
`;

export default function Modal({ children, $top, $open }) {
  const { closeModal } = useModal();

  return (
    <>
      <Overlay $open={$open} onClick={closeModal} />
      <StyledSection
        $top={$top}
        $open={$open}
        role="dialog"
        aria-modal="true"
        aria-hidden={!$open}
      >
        <CloseButton />
        {children}
      </StyledSection>
    </>
  );
}
