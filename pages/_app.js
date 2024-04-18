import { useState } from "react";
import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import { uid } from "uid";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const initialFamilyMembers = [
  {
    id: 999,
    name: "Swetha",
    role: "Parent",
  },
  {
    id: 998,
    name: "Lokesh",
    role: "Parent",
  },
];

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  function handleAddTask(formData) {
    setTasks([
      ...tasks,
      {
        id: uid(),
        ...formData,
      },
    ]);
    router.push("/");
  }

  function handleEditTask(updatedData) {
    const id = updatedData.id;
    setTasks(tasks.map((task) => (task.id === id ? updatedData : task)));
    router.push(`/tasks/${id}`);
  }

  function handleAddMember(memberFormData) {
    setFamilyMembers([...familyMembers, { id: uid(), ...memberFormData }]);
    setShowModal(false);
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
        onAddTask={handleAddTask}
        onEditData={handleEditTask}
        familyMembers={familyMembers}
        onAddMember={handleAddMember}
        setShowModal={setShowModal}
        showModal={showModal}
        onDelete={handleDeleteTask}
        onCancel={closeModalWindow}
      />
    </Layout>
  );
}
