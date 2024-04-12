import GlobalStyle from "../styles";
import initialTasks from "@/db/lib/tasks";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} tasks={tasks} />
    </>
  );
}
