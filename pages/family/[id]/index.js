import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import StyledBackLink from "@/components/StyledBackLink";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import MemberProfile from "@/components/MemberProfile";

const StyledMessage = styled.p`
  text-align: center;
  padding: 2rem 0;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 1rem;
`;

export default function MemberProfilePage({
  isDarkTheme,
  setDarkTheme,
  showModal,
  setShowModal,
}) {
  const router = useRouter();
  const { id } = router.query;

  const { data: familyMember, isLoading } = useSWR(`/api/members/${id}`);

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!familyMember) {
    return;
  }

  return (
    <>
      <StyledBackLink href="/family/">
        <BackArrow />
      </StyledBackLink>
      <StyledHeading>Family Member Profile</StyledHeading>
      {familyMember ? (
        <MemberProfile
          familyMember={familyMember}
          isDarkTheme={isDarkTheme}
          setDarkTheme={setDarkTheme}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
