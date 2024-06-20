import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import MemberProfile from "@/components/MemberProfile";
import { toast } from "react-toastify";
import { useData } from "@/context/dataContext";
import StyledError from "@/components/StyledError";

const StyledBackButton = styled.button`
  position: fixed;
  top: 0.7rem;
  left: 1rem;
  z-index: 2;
  border: none;

  @media (min-width: 900px) {
    left: calc(100px + 2rem);
  }
`;

const StyledMessage = styled.p`
  text-align: center;
  padding: 2rem 0;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 1rem;
`;

export default function MemberProfilePage() {
  const router = useRouter();
  const { id } = router.query;

  const { user, mutateUser, familyMember, mutateMember } = useData(null, id);

  if (!user || !familyMember) {
    return <StyledError />;
  }

  function handleGoBack() {
    router.back();
  }

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
      mutateMember();
      mutateUser();
    }
  }

  return (
    <>
      <StyledBackButton onClick={handleGoBack} aria-label="Back">
        <BackArrow role="img" aria-label="left arrow icon" />
      </StyledBackButton>
      <StyledHeading>Family Member Profile</StyledHeading>
      {familyMember ? (
        <MemberProfile
          familyMember={familyMember}
          user={user}
          onAddPhoto={handleAddPhoto}
          mutateUser={mutateUser}
          mutateMember={mutateMember}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
