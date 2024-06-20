import styled from "styled-components";
import StyledTrash from "@/components/StyledTrash";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import Modal from "@/components/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import checkForToday from "@/utils/checkForToday";
import checkForMissedDate from "@/utils/checkForMissedDate";
import { toast } from "react-toastify";
import Flame from "@/public/assets/images/flame.svg";
import ConfirmBox from "@/components/ConfirmBox";
import formatTasksDate from "@/utils/formatTasksDate";
import { useModal } from "@/context/modalContext";
import { useData } from "@/context/dataContext";

const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 3fr 4fr;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 1.1rem;
  right: 4.5rem;
`;

const StyledPen = styled(Pen)`
  width: 1.5rem;
  fill: var(--color-font);
`;

const StyledSection = styled.section`
  position: relative;
  background-color: var(--color-background);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 0.6rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  ${({ $isDone }) =>
    $isDone &&
    `
      background-color: #d3d3d3;
      opacity: 0.5;
      color: #808080;
    `};
`;

const StyledCheckbox = styled.input`
  margin-left: 2rem;
  display: inline;
  width: 1.5rem;
  height: 1.5rem;
  &:checked {
    filter: hue-rotate(180deg);
  }
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
`;

const StyledParagraphContent = styled.p`
  font-size: large;
  font-weight: 600;
`;

const StyledFlame = styled(Flame)`
  display: inline-block;
  width: 1rem;
  margin: 0 0.2rem;
`;

const StyledSpan = styled.span`
  color: ${({ $isMissed }) => $isMissed && "var(--color-alert-font)"};
`;

export default function TaskDetails({
  task,
  onCheckboxChange,
  detailsBackLinkRef,
  modalMode,
  onChangeModalMode,
}) {
  const {
    title,
    category,
    priority,
    dueDate,
    _id: id,
    isDone,
    assignedTo,
    groupId,
    repeat,
    endDate,
  } = task;
  const router = useRouter();
  const { showModal, openModal, closeModal } = useModal();
  const { mutateTasks } = useData();
  const isToday = dueDate && checkForToday(dueDate);
  const isMissed = dueDate && checkForMissedDate(dueDate);
  const isRepeat =
    repeat &&
    (repeat === "Monthly" || repeat === "Weekly" || repeat === "Daily")
      ? true
      : false;

  async function handleDeleteTask(id) {
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?deleteRequest=single`, {
        method: "DELETE",
      }),
      {
        pending: "Task deletion is pending",
        success: "Task deleted successfully",
        error: "Task not deleted",
      }
    );
    if (response.ok) {
      router.push(detailsBackLinkRef);
      closeModal();
      mutateTasks();
    }
  }

  async function handleDeleteTasks(actionObject) {
    const { id, action } = actionObject;
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?deleteRequest=${action}`, {
        method: "DELETE",
      }),
      {
        pending: "Recurring Tasks deletion is pending",
        success: "Recurring Tasks deleted successfully",
        error: "Recurring Tasks not deleted",
      }
    );
    if (response.ok) {
      router.push(detailsBackLinkRef);
      closeModal();
      mutateTasks();
    }
  }

  function handleTaskTrashClick() {
    onChangeModalMode("delete-task");
    openModal();
    mutateTasks();
  }
  return (
    <>
      <Modal $top="13.5rem" $open={showModal && modalMode === "delete-task"}>
        {showModal && modalMode === "delete-task" && (
          <ConfirmBox
            onConfirm={() => handleDeleteTask(id)}
            onConfirmFurtherTasks={() =>
              handleDeleteTasks({ id, action: "future" })
            }
            onConfirmAllTasks={() => handleDeleteTasks({ id, action: "all" })}
            groupId={groupId}
            message={
              groupId
                ? `Are you sure you want to delete repeating task "${title}"?`
                : `Are you sure you want to delete task "${title}"?`
            }
          />
        )}
      </Modal>
      <StyledSection $isDone={isDone}>
        <StyledTrash
          onClick={handleTaskTrashClick}
          role="button"
          tabIndex={0}
          aria-label="Delete task"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handleTaskTrashClick();
            }
          }}
        />
        <StyledLink href={`/tasks/${id}/edit`} aria-label="Edit task">
          <StyledPen role="img" aria-label="pen icon" />
        </StyledLink>
        <StyledParagraph> What is to do?</StyledParagraph>
        <StyledParagraphContent>{title}</StyledParagraphContent>
        <StyledParagraph>Category: </StyledParagraph>
        <StyledParagraphContent>
          {category?.title || "-"}
        </StyledParagraphContent>
        <StyledParagraph>Priority: </StyledParagraph>
        <p>
          {priority &&
            [...Array(Number(priority))].map((_element, index) => (
              <StyledFlame key={index} role="img" aria-label="flame icon" />
            ))}
        </p>
        <p>Due Date:</p>
        <StyledParagraphContent>
          <StyledSpan $isMissed={isMissed}>
            {isToday ? "Today" : formatTasksDate(dueDate) || "-"}
          </StyledSpan>
        </StyledParagraphContent>
        {isRepeat && (
          <StyledArticle>
            <p>Repeat:</p>
            <p>End Date:</p>
            <StyledParagraphContent>{repeat || "None"}</StyledParagraphContent>
            <StyledParagraphContent>
              {formatTasksDate(endDate) || "-"}
            </StyledParagraphContent>
          </StyledArticle>
        )}
        <p>Assigned to:</p>
        <StyledParagraphContent>
          {assignedTo?.map((member) => member.name).join(", ") || "-"}
        </StyledParagraphContent>
        <label htmlFor="checkbox">
          Done:
          <StyledCheckbox
            type="checkbox"
            id="checkbox"
            checked={isDone}
            onChange={(event) => onCheckboxChange(task, event)}
          />
        </label>
      </StyledSection>
    </>
  );
}
