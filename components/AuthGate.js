import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import StopMessage from "@/components/StopMessage";
import { signIn, useSession } from "next-auth/react";
import StyledButton from "./StyledButton";
import styled from "styled-components";

const StyledSignButton = styled(StyledButton)`
  width: 4rem;
  padding: 0.3rem;
  margin: 0;
  position: absolute;
  top: 20px;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
`;

export default function AuthGate({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <StyledLoadingAnimation />;
  }

  if (!session) {
    return (
      <>
        <StyledSignButton onClick={() => signIn(null, { callbackUrl: "/" })}>
          Log in
        </StyledSignButton>
        <StopMessage />
      </>
    );
  }

  return children;
}
