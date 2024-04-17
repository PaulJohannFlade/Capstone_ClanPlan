import { useState } from "react";
import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import { uid } from "uid";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  function handleAddData(formData) {
    setTasks([
      ...tasks,
      {
        id: uid(),
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignedTo: formData.assignedTo,
      },
    ]);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowModal(false);
    router.push("/");
  }
  function closeModalWindow() {
    setShowModal(false);
  }

  // Sorting the task in chronological order of date
  const tasksAfterSorting = tasks.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  );

  return (
    <Layout>
      <GlobalStyle />
      <Component
        {...pageProps}
        tasks={tasksAfterSorting}
        handleAddData={handleAddData}
        setShowModal={setShowModal}
        showModal={showModal}
        onDelete={handleDeleteTask}
        onCancel={closeModalWindow}
      />
    </Layout>
  );
}
