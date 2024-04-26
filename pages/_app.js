import { useState } from "react";
import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import initialFamilyMembers from "@/db/lib/familyMembers";
import initialCategories from "@/db/lib/categories";
import { uid } from "uid";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  function handleAddTask(formData) {
    setTasks([
      ...tasks,
      {
        id: uid(),
        ...formData,
        isDone: false,
      },
    ]);
    router.push("/");
  }

  function handleEditTask(updatedData) {
    const id = updatedData.id;
    setTasks(tasks.map((task) => (task.id === id ? updatedData : task)));
    const { listType } = router.query;
    router.push(`/tasks/${id}?listType=${listType}`);
  }

  function handleAddMember(memberFormData) {
    setFamilyMembers([...familyMembers, { id: uid(), ...memberFormData }]);
    setShowModal(false);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowModal(false);
    const { listType } = router.query;
    router.push(`/tasks?listType=${listType}`);
  }
  function closeModalWindow() {
    setShowModal(false);
  }

  function handleCheckboxChange(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function handleAddCategory(data) {
    setCategories([...categories, { id: uid(), ...data }]);
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
        onCheckboxChange={handleCheckboxChange}
        categories={categories}
        onAddCategory={handleAddCategory}
      />
    </Layout>
  );
}
