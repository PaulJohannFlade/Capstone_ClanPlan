import convertDateToString from "@/utils/convertDateToString";

export default function getTasksForCurrentWeek(tasks, startOfWeek, endOfWeek) {
  const currentWeekTasks = tasks.filter(
    (task) =>
      convertDateToString(new Date(task.dueDate)) >=
        convertDateToString(startOfWeek) &&
      convertDateToString(new Date(task.dueDate)) <=
        convertDateToString(endOfWeek)
  );
  return currentWeekTasks;
}
