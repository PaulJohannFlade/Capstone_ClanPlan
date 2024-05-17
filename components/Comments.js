import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledPen from "./StyledPen";
import StyledTrash from "./StyledTrash";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import DeleteConfirmBox from "./DeleteConfirmBox";
import CommentForm from "./CommentForm";

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
  showModal,
  setShowModal,
  modalMode,
  onChangeModalMode,
  taskId,
}) {
  const [isValidMessage, setIsValidMessage] = useState(true);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("us-US", options);
  }

  function handlePenClick(comment) {
    setIsValidMessage(true);
    setCommentToEdit(comment);
  }

  function handleCancelEditComment() {
    setCommentToEdit(null);
  }

  function handleChangeCommentToEdit(comment) {
    setCommentToEdit(comment);
  }

  /* async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (!data.message.trim()) {
      setIsValidMessage(false);
      event.target.message.focus();
      return;
    } else {
      setIsValidMessage(true);
    }

    if (data.message.trim() === commentToEdit.message) {
      alert("No changes were made to the form.");
      return;
    }

    const commentData = {
      ...commentToEdit,
      message: data.message.trim(),
      updatedDate: new Date(),
    };

    const response = await toast.promise(
      fetch("/api/comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }),
      {
        pending: "Comment updating is pending",
        success: "Comment updated successfully",
        error: "Comment not updated",
      }
    );
    if (response.ok) {
      setCommentToEdit(null);
      onUpdateComment();
    }
  } */

  function handleCommentTrashClick(commentId) {
    onChangeModalMode("delete-comment");
    setShowModal(true);
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
      setShowModal(false);
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
                ? `Updated: ${formatDate(comment.updatedDate)}`
                : formatDate(comment.date)}
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
      <Modal
        $top="12rem"
        setShowModal={setShowModal}
        $open={showModal && modalMode === "delete-comment"}
      >
        {showModal && modalMode === "delete-comment" && (
          <DeleteConfirmBox
            setShowModal={setShowModal}
            onConfirm={handleDeleteComment}
            id={commentIdToDelete}
            message="Are you sure you want to delete this comment?"
          />
        )}
      </Modal>
    </>
  );
}

{
  /* <form onSubmit={handleSubmit}>
                {!isValidMessage && (
                  <StyledSpan>Please enter your message!</StyledSpan>
                )}
                <textarea
                  aria-label="message"
                  name="message"
                  maxLength={200}
                  defaultValue={comment.message}
                  rows={Math.ceil(comment.message.length / 28)}
                  cols="28"
                ></textarea>
                <StyledButton type="button" onClick={handleCancelEdit}>
                  Cancel
                </StyledButton>
                <StyledButton type="submit">Update</StyledButton>
              </form> */
}
