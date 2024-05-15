import { useState } from "react";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import { toast } from "react-toastify";

const StyledLabel = styled.label`
  font-size: 0.9rem;
`;

const StyledSpan = styled.span`
  font-size: 0.9rem;
  color: red;
  float: ${({ $left }) => ($left ? "left" : "right")};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  transition: background-color 0.5s ease;
`;

const StyledSendButton = styled(StyledButton)`
  align-self: flex-end;
  margin-top: 0.5rem;
`;

export default function CommentForm({ taskId, onAddComment }) {
  const [isValidMessage, setIsValidMessage] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const commentData = { message: data.message.trim(), date: new Date() };

    if (!data.message.trim()) {
      setIsValidMessage(false);
      event.target.message.focus();
      return;
    } else {
      setIsValidMessage(true);
    }
    const response = await toast.promise(
      fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentData, taskId }),
      }),
      {
        pending: "Comment addition is pending",
        success: "Comment added successfully",
        error: "Comment not added",
      }
    );
    if (response.ok) {
      onAddComment();
      event.target.reset();
      event.target.message.focus();
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="message">
        <StyledSpan $left={true}>*</StyledSpan>Your message:
        {!isValidMessage && <StyledSpan>Please enter your message!</StyledSpan>}
      </StyledLabel>
      <textarea
        name="message"
        id="message"
        rows="2"
        cols="50"
        maxLength="200"
      ></textarea>
      <StyledSendButton>Send</StyledSendButton>
    </StyledForm>
  );
}
