import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import StopMessage from "@/components/StopMessage";
import { useSession, signOut } from "next-auth/react";
import StyledButton from "./StyledButton";
import styled from "styled-components";
import Modal from "./Modal";
import FamilyRegisterForm from "./FamilyRegisterForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";

const StyledSignButton = styled(StyledButton)`
  width: 6rem;
  padding: 0.3rem;
  margin: 0;
  position: absolute;
  top: 7rem;
  right: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMessage = styled.p`
  font-size: 1.3rem;
  text-align: center;
  padding-top: 5rem;
  font-weight: 700;
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
  text-shadow: none;
  position: absolute;
  right: 4%;
`;

export default function AuthGate({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showModal, openModal, closeModal } = useModal();
  const { user, mutateUser } = useData();

  async function handleAddFamily(newFamily) {
    const response = await toast.promise(
      fetch("/api/family", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFamily),
      }),
      {
        pending: "Family addition is pending",
        success: "Family added successfully",
        error: "Family not added",
      }
    );

    if (response.ok) {
      closeModal();
      mutateUser();
      router.push("/");
    }
  }

  if (status === "loading") {
    return <StyledLoadingAnimation />;
  }

  if (!session) {
    return <StopMessage />;
  }
  if (user?.status === "Member not found") {
    return (
      <>
        <StyledParagraph>{session.user.name}</StyledParagraph>
        <StyledSignButton onClick={() => signOut()}>Log out</StyledSignButton>
        <StyledMessage>
          Please create a family to proceed further ! <br />
          <StyledButton $width="10rem" onClick={openModal}>
            Click here
          </StyledButton>
        </StyledMessage>
        <Modal $top="7rem" $open={showModal}>
          {showModal && <FamilyRegisterForm onAddFamily={handleAddFamily} />}
        </Modal>
      </>
    );
  }

  return children;
}
