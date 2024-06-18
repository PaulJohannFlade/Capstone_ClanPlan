import Form from "@/components/Form";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import { useRouter } from "next/router";
import StyledBackLink from "@/components/StyledBackLink";
import { toast } from "react-toastify";
import { useData } from "@/context/dataContext";
import StyledError from "@/components/StyledError";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const { task, categories, mutateTask, mutateTasks } = useData(id);
  if (!task || !categories) {
    return <StyledError />;
  }

  const allocatedMembersList = categories.find(
    (category) => category._id === task?.category?._id
  )?.selectedMembers;

  async function handleEditTaskData(updatedTask) {
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?updateAll=false`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }),
      {
        pending: "Task updation is pending",
        success: "Task updated successfully",
        error: "Task not updated",
      }
    );

    if (response.ok) {
      router.push(`/tasks/${id}`);
      mutateTask();
      mutateTasks();
    }
  }

  async function handleEditTasksData(updatedTask, action) {
    const response = await toast.promise(
      fetch(`/api/tasks/${id}?updateRequest=${action}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }),
      {
        pending: "Recurring Tasks updation is pending",
        success: "Recurring Tasks updated successfully",
        error: "Recurring Tasks not updated",
      }
    );

    if (response.ok) {
      router.push(`/tasks/${id}`);
      mutateTask();
      mutateTasks();
    }
  }

  return (
    <>
      <div>
        <StyledBackLink href={`/tasks/${id}`}>
          <BackArrow />
        </StyledBackLink>
        <Form
          onTaskSubmit={handleEditTaskData}
          onTasksSubmit={handleEditTasksData}
          title="Edit a task"
          isEdit
          value={task}
          allocatedMembersList={allocatedMembersList}
        />
      </div>
    </>
  );
}
