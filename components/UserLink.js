import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import User from "@/public/assets/images/user.svg";
import { useSession } from "next-auth/react";
import { useData } from "@/context/dataContext";

const StyledLink = styled(Link)`
  position: fixed;
  height: 4.5rem;
  top: 0;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 6;
  max-width: 6rem;
`;

const StyledUser = styled(User)`
  width: 100%;
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
  text-shadow: none;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

export default function UserLink() {
  const { data: session } = useSession();
  const { user } = useData();

  return (
    <>
      {session && (
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
      )}
    </>
  );
}
