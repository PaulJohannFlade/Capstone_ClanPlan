import styled from "styled-components";
import StyledButton from "./StyledButton";
import StyledPen from "./StyledPen";
import StyledTrash from "./StyledTrash";
import { useState } from "react";
import { toast } from "react-toastify";

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

const StyledMessage = styled.p`
  font-size: 1.2rem;
`;

const StyledSpan = styled.span`
  font-size: 0.9rem;
  color: red;
`;

export default function Comments({ comments, onEditComment }) {
  // const [isEditMode, setIsEditMode] = useState(false);
  const [isValidMessage, setIsValidMessage] = useState(true);
  const [commentIdToEdit, setCommentIdToEdit] = useState("");

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

  function handlePenClick(commentId) {
    setIsValidMessage(true);
    setCommentIdToEdit(commentId);
  }

  function handleCancelEdit() {
    setCommentIdToEdit("");
  }

  async function handleSubmit(event, comment) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const commentData = {
      ...comment,
      message: data.message.trim(),
      updatedDate: new Date(),
    };
    if (!data.message.trim()) {
      setIsValidMessage(false);
      event.target.message.focus();
      return;
    } else {
      setIsValidMessage(true);
    }

    if (data.message.trim() === comment.message) {
      alert("No changes were made to the form.");
      return;
    }

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
      setCommentIdToEdit("");
      onEditComment();
    }
  }

  return (
    <StyledList>
      {comments?.map((comment) => (
        <StyledListItems key={comment._id}>
          <StyledPen
            $small={true}
            onClick={() => handlePenClick(comment._id)}
          />
          <StyledTrash
            $small={true}
            onClick={() => handleTrashClick(comment._id)}
          />
          <StyledDate>
            {comment.updatedDate
              ? `Updated: ${formatDate(comment.updatedDate)}`
              : formatDate(comment.date)}
          </StyledDate>
          {commentIdToEdit !== comment._id && (
            <StyledMessage>{comment.message}</StyledMessage>
          )}
          {commentIdToEdit === comment._id && (
            <form onSubmit={() => handleSubmit(event, comment)}>
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
            </form>
          )}
        </StyledListItems>
      ))}
    </StyledList>
  );
}
