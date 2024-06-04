import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import User from "@/public/assets/images/user.svg";
import { signIn, useSession } from "next-auth/react";
import StyledButton from "./StyledButton";

const StyledHeader = styled.header`
  background-color: var(--color-background);
  color: var(--color-font);
  box-shadow: -1px 6px 15px 0px #7d7d7d;
  text-shadow: 2px 3px 3px #bccbd4;
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  padding: 0.7rem;
  z-index: 1;
  max-width: 375px;

  @media (min-width: 900px) {
    max-width: 100vw;
    left: 100px;
    box-shadow: -1px 6px 15px 0px #7d7d7d;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  padding: 0.5rem;
  top: 0;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledUser = styled(User)`
  width: 35px;
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
  text-shadow: none;
`;

const StyledH1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 0.3px solid var(--color-font);
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

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
`;

export default function Header({ user }) {
  const { data: session } = useSession();

  function handleSignIn() {
    signIn(null, { callbackUrl: "/" });
  }

  return (
    <StyledHeader>
      <StyledH1>ClanPlan</StyledH1>
      {session ? (
        <StyledLink href={`/family/${user._id}`}>
          {user?.profilePhoto ? (
            <ImageContainer>
              <StyledImage
                src={user.profilePhoto}
                alt="user profile image"
                fill={true}
                sizes="20vw"
                priority={true}
              />
            </ImageContainer>
          ) : user?.status === "Member not found" ? (
            ""
          ) : (
            <StyledUser />
          )}

          <StyledParagraph>{user?.name}</StyledParagraph>
        </StyledLink>
      ) : (
        <StyledSignButton onClick={handleSignIn}>Log in</StyledSignButton>
      )}
    </StyledHeader>
  );
}
