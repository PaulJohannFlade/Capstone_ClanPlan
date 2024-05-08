import Form from "@/components/Form";
import { useRouter } from "next/router";

export default function CreatePage({ categories, familyMembers }) {
  const router = useRouter();

  async function handleAddTask(newTaskData) {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskData),
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <div>
      <Form
        onTaskSubmit={handleAddTask}
        title="Add a task"
        categories={categories}
        familyMembers={familyMembers}
      />
    </div>
  );
}
