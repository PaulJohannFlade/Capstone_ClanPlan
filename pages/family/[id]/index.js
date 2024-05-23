import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import StyledBackLink from "@/components/StyledBackLink";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { toast } from "react-toastify";
import CommentForm from "@/components/CommentForm";
import Comments from "@/components/Comments";
import { useState } from "react";
import MemberProfile from "@/components/MemberProfile";

const StyledMessage = styled.p`
  text-align: center;
  padding: 2rem 0;
`;

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  transition: background-color 0.5s ease;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 1rem;
`;

export default function MemberProfilePage({ showModal, setShowModal }) {
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
        <MemberProfile familyMember={familyMember} />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
