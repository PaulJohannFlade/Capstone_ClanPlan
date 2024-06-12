import checkForMissedDate from "./checkForMissedDate";

export default function getTasksCount(tasks) {
  const missedTasks = tasks.filter(
    (task) => task?.dueDate && checkForMissedDate(task.dueDate) && !task.isDone
  );

  const activeTasks = tasks.filter(
    (task) =>
      !task.isDone && !(task?.dueDate && checkForMissedDate(task.dueDate))
  );

  const completedTasks = tasks.filter((task) => task.isDone);

  return { missedTasks, activeTasks, completedTasks };
}
