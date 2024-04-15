import { useState } from "react";
import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);

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

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        tasks={tasksAfterSorting}
        handleAddData={handleAddData}
      />
    </>
  );
}
