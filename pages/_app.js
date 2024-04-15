import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);

  // Sorting the task in chronological order of date
  const tasksAfterSorting = tasks.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  );

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} tasks={tasksAfterSorting} />
    </>
  );
}
