import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import StyledBackLink from "@/components/StyledBackLink";
import { toast } from "react-toastify";
import CommentForm from "@/components/CommentForm";
import Comments from "@/components/Comments";
import { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";

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
  align-self: center;
  margin-top: 1rem;
`;

export default function DetailsPage({ detailsBackLinkRef }) {
  const [modalMode, setModalMode] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const { task, mutateTask, mutateTasks } = useData(id);

  useEffect(() => {
    if (id) {
      mutateTask(`/api/tasks/${id}`);
    }
  }, [id, mutateTask]);

  if (!task) {
    return <StyledLoadingAnimation />;
  }

  function handleChangeModalMode(mode) {
    setModalMode(mode);
  }

  async function handleUpdateComment() {
    mutateTask();
  }

  async function handleCheckboxChange(task, event) {
    const updatedTaskData = { ...task, isDone: event.target.checked };
    const response = await toast.promise(
      fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      }),
      {
        pending: "Task updation is pending",
        success: "Task updated successfully",
        error: "Task not updated",
      }
    );

    if (response.ok) {
      mutateTask();
      mutateTasks();
    }
  }

  return (
    <>
      <StyledBackLink href={detailsBackLinkRef}>
        <BackArrow />
      </StyledBackLink>
      {task ? (
        <>
          <TaskDetails
            task={task}
            onCheckboxChange={handleCheckboxChange}
            detailsBackLinkRef={detailsBackLinkRef}
            modalMode={modalMode}
            onChangeModalMode={handleChangeModalMode}
          />
          <StyledSection>
            <StyledHeading>Comments</StyledHeading>
            <CommentForm taskId={id} onUpdateComment={handleUpdateComment} />
            <Comments
              comments={task.comments}
              onUpdateComment={handleUpdateComment}
              modalMode={modalMode}
              onChangeModalMode={handleChangeModalMode}
              taskId={id}
            />
            {!task.comments?.length && (
              <StyledMessage>No comments added.</StyledMessage>
            )}
          </StyledSection>
        </>
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
