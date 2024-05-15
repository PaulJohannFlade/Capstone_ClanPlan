import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";
import sortTaskAscendingOrder from "@/utils/sortTaskAscendingOrder";

export default async function handler(request, response) {
  await dbConnect();
  const { id, deleteAll, updateAll } = request.query;

  if (request.method === "GET") {
    const task = await Task.findById(id)
      .populate("category")
      .populate("assignedTo");

    if (!task) {
      return response.status(404).json({ status: "Task not found" });
    }

    response.status(200).json(task);
  }

  if (request.method === "PUT") {
    const updatedTask = request.body;

    if (updateAll === "true") {
      const endDate = new Date(updatedTask.endDate);
      const startDate = new Date(updatedTask.dueDate);

      const task = await Task.findById(id);
      const groupId = task?.groupId;
      await Task.deleteMany({ groupId: groupId });

      if (updatedTask.repeat === "monthly") {
        const nextMonth = new Date(
          startDate.getFullYear(),
          startDate.getMonth()
        );
        const currentDay = new Date(updatedTask.dueDate).getDate();
        while (nextMonth <= endDate) {
          const dayInMonth = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth() + 1,
            0
          ).getDate();
          if (currentDay <= dayInMonth) {
            updatedTask.dueDate = new Date(
              nextMonth.getFullYear(),
              nextMonth.getMonth(),
              currentDay + 1
            )
              .toISOString()
              .substring(0, 10);
            await Task.create(updatedTask);
          }
          nextMonth.setMonth(nextMonth.getMonth() + 1);
        }
      } else if (updatedTask.repeat === "weekly") {
        const nextWeek = new Date(updatedTask.dueDate);
        while (nextWeek <= endDate) {
          updatedTask.dueDate = nextWeek.toISOString().substring(0, 10);
          updatedTask.groupId = groupId;
          await Task.create(updatedTask);
          nextWeek.setDate(nextWeek.getDate() + 7);
        }
      } else if (updatedTask.repeat === "daily") {
        const nextDay = new Date(updatedTask.dueDate);
        while (nextDay <= endDate) {
          updatedTask.dueDate = nextDay.toISOString().substring(0, 10);
          updatedTask.groupId = groupId;
          await Task.create(updatedTask);
          nextDay.setDate(nextDay.getDate() + 1);
        }
      }
    } else {
      await Task.findByIdAndUpdate(id, updatedTask);
    }
    response.status(200).json({ status: "Task updated successfully." });
  }

  if (request.method === "PATCH") {
    const updatedTask = request.body;
    await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    response.status(200).json({ status: "Task updated successfully." });
  }

  if (request.method === "DELETE") {
    if (deleteAll === "true") {
      const task = await Task.findById(id);
      const groupId = task?.groupId;
      await Task.deleteMany({ groupId: groupId });
    } else {
      await Task.findByIdAndDelete(id);
    }
    response.status(200).json({ status: "Product deleted successfully." });
  }
}
