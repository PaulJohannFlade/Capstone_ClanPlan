export default function getTasksForUser(tasks, user) {
  return tasks.slice().filter((task) => {
    const tasksAssignedMembers = task.assignedTo;
    if (tasksAssignedMembers.join(",").includes(user?._id)) {
      return task;
    }
  });
}
