import Form from "@/components/Form";
import Link from "next/link";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";

const StyledLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
`;

export default function CreatePage({ onAddTask }) {
  return (
    <div>
      <StyledLink href="/">
        <BackArrow />
      </StyledLink>
      <Form onTaskSubmit={onAddTask} title="Add a task" value="" />
    </div>
  );
}
