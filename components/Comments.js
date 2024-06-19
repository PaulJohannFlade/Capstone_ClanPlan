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
import Image from "next/image";
import User from "@/public/assets/images/user.svg";
import Link from "next/link";
import { useData } from "@/context/dataContext";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const StyledListItem = styled.li`
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 1px 1px 10px -1px var(--color-font);
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  transition: background-color 0.5s ease;
  position: relative;
  gap: 0.5rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: flex-end;
  ${({ $disabled }) =>
    $disabled &&
    `
      pointer-events: none;
    `}
`;

const StyledUser = styled(User)`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  border: 0.3px solid var(--color-font);
`;

const StyledParagraph = styled.p`
  font-size: 0.9rem;
  text-shadow: none;
  max-width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDate = styled.p`
  font-size: 0.9rem;
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
  const { user } = useData();

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
          <StyledListItem key={comment._id}>
            <StyledLink
              href={`/family/${comment.member?._id}`}
              $disabled={!comment.member}
            >
              <ImageContainer>
                {comment.member?.profilePhoto ? (
                  <StyledImage
                    src={comment.member?.profilePhoto}
                    alt="user profile image"
                    fill={true}
                    sizes="20vw"
                    priority={true}
                  />
                ) : (
                  <StyledUser role="img" aria-label="default user avatar" />
                )}
              </ImageContainer>
              <StyledParagraph>
                {comment.member?.name || "anonymous"}
              </StyledParagraph>
            </StyledLink>
            {user._id === comment.member?._id && (
              <>
                <StyledPen
                  $small={true}
                  onClick={() => handlePenClick(comment)}
                  role="button"
                  aria-label="pen icon"
                />
                <StyledTrash
                  $small={true}
                  onClick={() => handleCommentTrashClick(comment._id)}
                  role="button"
                  aria-label="trash icon"
                />
              </>
            )}
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
          </StyledListItem>
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
