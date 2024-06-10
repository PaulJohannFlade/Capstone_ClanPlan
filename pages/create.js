import Form from "@/components/Form";
import { useData } from "@/context/dataContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function CreatePage() {
  const router = useRouter();
  const { mutateTasks } = useData();

  async function handleAddTask(newTaskData) {
    const response = await toast.promise(
      fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskData),
      }),
      newTaskData?.repeat === "Monthly" ||
        newTaskData?.repeat === "Weekly" ||
        newTaskData?.repeat === "Daily"
        ? {
            pending: "Recurring Tasks adding is pending",
            success: "Recurring Tasks added successfully",
            error: "Recurring Tasks not added",
          }
        : {
            pending: "Task adding is pending",
            success: "Task added successfully",
            error: "Task not added",
          }
    );
    if (response.ok) {
      router.push("/");
      mutateTasks();
    }
  }

  return (
    <div>
      <Form onTaskSubmit={handleAddTask} title="Add a task" />
    </div>
  );
}
