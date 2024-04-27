import TasksList from "@/components/TasksList";
import styled from "styled-components";
import Filter from "@/public/assets/images/filter.svg";
import StyledButton from "@/components/StyledButton";
import Modal from "@/components/Modal";
import FilterWindow from "@/components/FilterWindow";
import { useState } from "react";
import Link from "next/link";

const StyledHeading = styled.h2`
  text-align: center;
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledLink = styled(Link)`
  margin: 1rem;
  color: ${({ $redFont }) => ($redFont ? "red" : "var(--color-font)")};
  font-weight: 700;
  background-color: white;
  padding: 0.5rem;
  width: 8rem;
  align-self: center;
  border-radius: 0.7rem;
`;

export default function HomePage({ tasks }) {
  return (
    <div>
      {/* <StyledLink href="/calendar">📅 Calendar</StyledLink> */}
      <StyledSection>
        <StyledLink href={`/tasks?listType=missed`}>Missed</StyledLink>
        <StyledLink href={`/tasks?listType=notAssigned`}>
          Not Assigned
        </StyledLink>
        <StyledLink href={`/tasks?listType=all`}>All Tasks</StyledLink>
        <StyledLink href={`/create`}>Plus</StyledLink>
      </StyledSection>
    </div>
  );
}
