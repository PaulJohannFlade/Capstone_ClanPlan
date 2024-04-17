import { useState } from "react";
import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import { uid } from "uid";
import { useRouter } from "next/router";

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

  // Sorting the task in chronological order of date
  const tasksAfterSorting = tasks.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  );

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

  function handleAddMember(memberFormData) {
    setFamilyMembers([...familyMembers, { id: uid(), ...memberFormData }]);
    setShowModal(false);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        tasks={tasksAfterSorting}
        familyMembers={familyMembers}
        handleAddData={handleAddData}
        onAddMember={handleAddMember}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
}
