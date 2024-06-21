import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import User from "@/public/assets/images/user.svg";
import { signIn, useSession } from "next-auth/react";
import StyledButton from "@/components/StyledButton";
import { useData } from "@/context/dataContext";

const StyledHeader = styled.header`
  background-color: var(--color-background);
  color: var(--color-font);
  box-shadow: 0px 1px 10px -1px var(--color-font);
  text-shadow: 1px 1px 3px var(--color-font);
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0.7rem;
  z-index: 5;
  width: 100vw;
  min-width: 330px;

  @media (min-width: 900px) {
    left: 99px;
    box-shadow: 0px 7px 7px -7px var(--color-font);
    width: calc(100% - 99px);
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  padding: 0.6rem;
  top: 0;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledUser = styled(User)`
  width: 100%;
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
  text-shadow: none;
  max-width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledH1 = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  border: 0.3px solid var(--color-font);
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

export default function Header() {
  const { data: session } = useSession();
  const { user } = useData();

  return (
    <StyledHeader>
      <StyledH1>ClanPlan</StyledH1>
      {session ? (
        <StyledLink href={`/family/${user?._id}`}>
          {!(user?.status === "Member not found") && (
            <ImageContainer>
              {user?.profilePhoto ? (
                <StyledImage
                  src={user.profilePhoto}
                  alt="user profile image"
                  fill={true}
                  sizes="20vw"
                  priority={true}
                />
              ) : (
                <StyledUser role="img" aria-label="default user avatar" />
              )}
            </ImageContainer>
          )}
          <StyledParagraph>{user?.name}</StyledParagraph>
        </StyledLink>
      ) : (
        <StyledSignButton onClick={() => signIn(null, { callbackUrl: "/" })}>
          Log in
        </StyledSignButton>
      )}
    </StyledHeader>
  );
}
