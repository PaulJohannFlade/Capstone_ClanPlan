import Form from "@/components/Form";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import { useRouter } from "next/router";
import StyledBackLink from "@/components/StyledBackLink";

export default function EditPage({ onEditData, tasks, familyMembers }) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  return (
    <>
      <div>
        <StyledBackLink href={`/tasks/${id}`}>
          <BackArrow />
        </StyledBackLink>
        <Form
          onTaskSubmit={onEditData}
          title="Edit a task"
          isEdit
          value={task}
          familyMembers={familyMembers}
        />
      </div>
    </>
  );
}
