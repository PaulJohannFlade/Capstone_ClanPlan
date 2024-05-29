import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import MemberProfile from "@/components/MemberProfile";
import StyledBackLink from "@/components/StyledBackLink";
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
>>>>>>> f534e7e (Feature/user profile page (#76))

const StyledBackButton = styled.button`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
  z-index: 2;
  border: none;
<<<<<<< HEAD

  @media (min-width: 900px) {
    left: calc(100px + 2rem);
  }
=======
>>>>>>> f534e7e (Feature/user profile page (#76))
`;

const StyledMessage = styled.p`
  text-align: center;
  padding: 2rem 0;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 1rem;
`;

<<<<<<< HEAD
<<<<<<< HEAD
export default function MemberProfilePage({  
  user,
  mutateMembers,
}) {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: familyMember,
    isLoading,
    mutate,
  } = useSWR(`/api/members/${id}`);
=======
export default function MemberProfilePage({ isDarkTheme, setDarkTheme, user }) {
=======
export default function MemberProfilePage({ user }) {
>>>>>>> 5f64cdd (Feature/save mode in account (#80))
  const router = useRouter();
  const { id } = router.query;

  const { data: familyMember, isLoading } = useSWR(`/api/members/${id}`);
>>>>>>> f534e7e (Feature/user profile page (#76))

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!familyMember) {
    return;
  }

  function handleGoBack() {
    router.back();
  }

<<<<<<< HEAD
  async function handleAddPhoto(url) {
    const updatedMemberData = { ...familyMember, profilePhoto: url };
    const response = await toast.promise(
      fetch(`/api/members/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMemberData),
      }),
      {
        pending: "Photo updation is pending",
        success: "Photo updated successfully",
        error: "Photo not updated",
      }
    );
    if (response.ok) {
      mutate();
      mutateMembers();
    }
  }

=======
>>>>>>> f534e7e (Feature/user profile page (#76))
  return (
    <>
      {familyMember._id === user._id ? (
        <StyledBackButton onClick={handleGoBack}>
          <BackArrow />
        </StyledBackButton>
      ) : (
        <StyledBackLink href="/family">
          <BackArrow />
        </StyledBackLink>
      )}
      <StyledHeading>Family Member Profile</StyledHeading>
      {familyMember ? (
<<<<<<< HEAD
        <MemberProfile
<<<<<<< HEAD
          familyMember={familyMember}          
          user={user}
          onAddPhoto={handleAddPhoto}
=======
          familyMember={familyMember}
          isDarkTheme={isDarkTheme}
          setDarkTheme={setDarkTheme}
          user={user}
>>>>>>> f534e7e (Feature/user profile page (#76))
        />
=======
        <MemberProfile familyMember={familyMember} user={user} />
>>>>>>> 5f64cdd (Feature/save mode in account (#80))
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
