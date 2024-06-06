import styled from "styled-components";
import StyledPen from "./StyledPen";
import StyledTrash from "./StyledTrash";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import ConfirmBox from "./ConfirmBox";
import CommentForm from "./CommentForm";
import formatCommentDate from "@/utils/formatCommentDate";
import { useModal } from "@/context/modalContext";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const StyledListItems = styled.li`
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  grid-template-columns: 3fr 1fr;
  background-color: var(--color-background);
  transition: background-color 0.5s ease;
  position: relative;
`;

const StyledDate = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export default function Comments({
  comments,
  onUpdateComment,
  modalMode,
  onChangeModalMode,
  taskId,
}) {
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const { showModal, openModal, closeModal } = useModal();

  function handlePenClick(comment) {
    setCommentToEdit(comment);
  }

  function handleCancelEditComment() {
    setCommentToEdit(null);
  }

  function handleChangeCommentToEdit(comment) {
    setCommentToEdit(comment);
  }

  function handleCommentTrashClick(commentId) {
    onChangeModalMode("delete-comment");
    openModal();
    setCommentIdToDelete(commentId);
  }

  async function handleDeleteComment(commentId) {
    const response = await toast.promise(
      fetch("/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, taskId }),
      }),
      {
        pending: "Comment deletion is pending",
        success: "Comment deleted successfully",
        error: "Comment not deleted",
      }
    );
    if (response.ok) {
      onUpdateComment();
      closeModal();
    }
  }

  return (
    <>
      <StyledList>
        {comments?.map((comment) => (
          <StyledListItems key={comment._id}>
            <StyledPen $small={true} onClick={() => handlePenClick(comment)} />
            <StyledTrash
              $small={true}
              onClick={() => handleCommentTrashClick(comment._id)}
            />
            <StyledDate>
              {comment.updatedDate
                ? `Updated: ${formatCommentDate(comment.updatedDate)}`
                : formatCommentDate(comment.date)}
            </StyledDate>
            {commentToEdit?._id !== comment._id && <p>{comment.message}</p>}
            {commentToEdit?._id === comment._id && (
              <CommentForm
                commentToEdit={commentToEdit}
                onCancelEditComment={handleCancelEditComment}
                onChangeCommentToEdit={handleChangeCommentToEdit}
                onUpdateComment={onUpdateComment}
              />
            )}
          </StyledListItems>
        ))}
      </StyledList>
      <Modal $top="12rem" $open={showModal && modalMode === "delete-comment"}>
        {showModal && modalMode === "delete-comment" && (
          <ConfirmBox
            onConfirm={() => handleDeleteComment(commentIdToDelete)}
            message="Are you sure you want to delete this comment?"
          />
        )}
      </Modal>
    </>
  );
}
