import Header from "@/components/Header";
import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import Link from "next/link";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";

const StyledLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
`;

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function DetailsPage({ tasks }) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  return (
    <>
      <Header />
      <StyledLink href="/">
        <BackArrow />
      </StyledLink>

      {task ? (
        <TaskDetails task={task} />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
