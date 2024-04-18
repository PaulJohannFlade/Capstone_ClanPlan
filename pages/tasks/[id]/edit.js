import Form from "@/components/Form";
import Link from "next/link";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
`;

export default function EditPage({ onEditData, tasks }) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  return (
    <>
      <div>
        <StyledLink href={`/tasks/${id}`}>
          <BackArrow />
        </StyledLink>
        <Form
          onTaskSubmit={onEditData}
          title="Edit a task"
          isEdit
          value={task}
        />
      </div>
    </>
  );
}
