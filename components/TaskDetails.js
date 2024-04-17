import styled from "styled-components";
import StyledButton from "./StyledButton";
import Trash from "@/public/assets/images/trash-icon.svg";
import Modal from "./Modal";

const StyledTrash = styled(Trash)`
  width: 1.5rem;
`;

const StyledSection = styled.section`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  padding: 2rem;
  gap: 1rem;
  margin-bottom: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const DeleteConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
`;

const StyledPragraph = styled.p`
  text-align: center;
`;

export default function TaskDetails({
  task,
  showModal,
  setShowModal,
  onDelete,
  onCancel,
}) {
  const { title, category, priority, dueDate, id } = task;

  return (
    <StyledSection>
      <StyledTrash onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <DeleteConfirmBox>
            <StyledPragraph>
              Are you sure your want to delete this task?
            </StyledPragraph>
            <ButtonContainer>
              <StyledButton onClick={onCancel}>No</StyledButton>
              <StyledButton onClick={() => onDelete(id)}>Yes</StyledButton>
            </ButtonContainer>
          </DeleteConfirmBox>
        </Modal>
      )}
      <p> What is to do?</p>
      <h2>{title}</h2>
      <p>Category: </p>
      <h2>{category}</h2>
      <p>Priority: </p>
      <h2>{"🔥".repeat(priority)}</h2>
      <p>Due Date:</p>
      <h3>{dueDate}</h3>
    </StyledSection>
  );
}
