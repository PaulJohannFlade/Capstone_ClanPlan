import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import User from "@/public/assets/images/user.svg";
import FileUploadForm from "./FileUploadForm";
import { signOut } from "next-auth/react";
import StyledButton from "./StyledButton";

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 1rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  align-items: center;
`;

const StyledContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 80vw;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 1rem;
  border: 0.5px solid var(--color-font);
  @media (min-width: 900px) {
    max-width: 50vw;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 1rem;
`;

const StyledUser = styled(User)`
  width: 60%;
  min-width: 50px;
  max-width: 400px;
  align-self: center;
`;

const UserInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  @media (min-width: 900px) {
    flex-direction: column;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
`;

const StyledContent = styled.span`
  font-size: large;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const StyledHeading = styled.h3`
  text-align: center;
  font-family: var(--font-handlee);
  font-size: 1.4rem;
`;

const StyledSignButton = styled(StyledButton)`
  margin: 0;
  align-self: flex-end;
`;

export default function MemberProfile({
  familyMember,
  user,
  onAddPhoto,
  mutateUser,
}) {
  const { _id, name, role, profilePhoto } = familyMember;

  return (
    <>
      <StyledSection>
        {_id === user._id && (
          <StyledSignButton onClick={() => signOut()}>Log out</StyledSignButton>
        )}
        <UserInfoContainer>
          <StyledParagraph>
            Name: <StyledContent>{name}</StyledContent>
          </StyledParagraph>
          <StyledParagraph>
            Role: <StyledContent>{role}</StyledContent>
          </StyledParagraph>
        </UserInfoContainer>
        <StyledContainer>
          {profilePhoto ? (
            <ImageContainer>
              <StyledImage
                src={profilePhoto}
                alt="user profile image"
                sizes="80vw"
                fill
                priority={true}
              />
            </ImageContainer>
          ) : (
            <StyledUser />
          )}

          {_id === user._id && <FileUploadForm onAddPhoto={onAddPhoto} />}
        </StyledContainer>
      </StyledSection>
      {_id === user._id && (
        <StyledSection $settings={true}>
          <StyledHeading>Settings</StyledHeading>
          <ThemeToggle familyMember={familyMember} mutateUser={mutateUser} />
        </StyledSection>
      )}
    </>
  );
}
