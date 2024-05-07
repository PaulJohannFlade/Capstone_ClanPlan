import styled from "styled-components";
import StyledTrash from "./StyledTrash";
import Pen from "@/public/assets/images/edit-pen-icon.svg";
import Modal from "./Modal";
import Link from "next/link";
import DeleteConfirmBox from "./DeleteConfirmBox";
import { useRouter } from "next/router";

const StyledLink = styled(Link)`
  position: absolute;
  top: 1.1rem;
  right: 5rem;
`;

const StyledPen = styled(Pen)`
  width: 1.5rem;
`;

const StyledSection = styled.section`
  position: relative;
  background-color: white;
  margin: 6rem 0.5rem 5rem 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 0.6rem;
  transition: background-color 0.5s ease, color 0.5s ease, opacity 0.5s ease;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  ${({ $isDone }) =>
    $isDone &&
    `
      background-color: lightgray;
      opacity: 0.5;
      color: gray;
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
const StyledParagraphContent = styled.p`
  font-size: larger;
  font-weight: 600;
`;

const StyledSpan = styled.span`
  color: ${({ $isMissed }) => $isMissed && "var(--color-alert)"};
`;

export default function TaskDetails({
  task,
  showModal,
  setShowModal,
  onCheckboxChange,
}) {
  const {
    title,
    category,
    priority,
    dueDate,
    _id: id,
    isDone,
    assignedTo,
  } = task;
  const router = useRouter();

  const today = new Date();
  const isToday =
    dueDate && today.toDateString() === new Date(dueDate).toDateString();
  const isMissed =
    dueDate &&
    new Date(task.dueDate).toISOString().substring(0, 10) <
      today.toISOString().substring(0, 10);

  async function handleDeleteTask(id) {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      setShowModal(false);
    }
  }

  return (
    <>
      {showModal && (
        <Modal $top="13.5rem" setShowModal={setShowModal}>
          <DeleteConfirmBox
            setShowModal={setShowModal}
            onConfirm={() => handleDeleteTask(id)}
            id={id}
            message="Are you sure you want to delete this task?"
          />
        </Modal>
      )}
      <StyledSection $isDone={isDone}>
        <StyledTrash onClick={() => setShowModal(true)} />
        <StyledLink href={`/tasks/${id}/edit`}>
          <StyledPen />
        </StyledLink>
        <p> What is to do?</p>
        <StyledParagraphContent>{title}</StyledParagraphContent>
        <p>Category: </p>
        <StyledParagraphContent>
          {category?.title || "-"}
        </StyledParagraphContent>
        <p>Priority: </p>
        <h2>{"🔥".repeat(Number(priority))}</h2>
        <p>Due Date:</p>
        <StyledParagraphContent $isMissed={isMissed}>
          <StyledSpan $isMissed={isMissed}>
            {isToday ? "Today" : dueDate || "-"}
          </StyledSpan>
        </StyledParagraphContent>
        <p>Assigned to:</p>
        <StyledParagraphContent>
          {assignedTo.map((member) => member.name).join(", ") || "-"}
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
