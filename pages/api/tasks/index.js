import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";
import { uid } from "uid";
import convertDateToString from "@/utils/convertDateToString";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Member from "@/db/models/Member";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "GET") {
    try {
       const user = await Member.findOne({ email: session.user.email });
    if (!user || !user.family) {
      return response.status(200).json([]);
    }
    const familyId = user?.family;
    const tasks = await Task.find({ family: familyId })
      .populate("category")
      .sort({ dueDate: 1 });
    return response.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const taskData = request.body;
      const groupId = taskData.repeat !== "none" ? uid() : null;

      const startDate = new Date(taskData.dueDate);
      const endDate = new Date(taskData.endDate);

      if (taskData.repeat === "Monthly") {
        const nextMonthDueDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth()
        );
        const currentDay = startDate.getDate();
        while (nextMonthDueDate <= endDate) {
          const dayInMonth = new Date(
            nextMonthDueDate.getFullYear(),
            nextMonthDueDate.getMonth() + 1,
            0
          ).getDate();
          if (
            currentDay <= dayInMonth &&
            new Date(
              nextMonthDueDate.getFullYear(),
              nextMonthDueDate.getMonth(),
              currentDay
            ) <= endDate
          ) {
            taskData.dueDate = convertDateToString(
              new Date(
                nextMonthDueDate.getFullYear(),
                nextMonthDueDate.getMonth(),
                currentDay
              )
            );
          } else if (
            new Date(
              nextMonthDueDate.getFullYear(),
              nextMonthDueDate.getMonth(),
              currentDay
            ) <= endDate
          ) {
            taskData.dueDate = convertDateToString(
              new Date(
                nextMonthDueDate.getFullYear(),
                nextMonthDueDate.getMonth(),
                dayInMonth
              )
            );
          }
          taskData.groupId = groupId;
          await Task.create({ ...taskData, owner: session.user.email });
          nextMonthDueDate.setMonth(nextMonthDueDate.getMonth() + 1);
        }
        return response
          .status(201)
          .json({ status: "Tasks successfully created." });
      } else if (taskData.repeat === "Weekly") {
        const nextWeekDueDate = startDate;
        while (nextWeekDueDate <= endDate) {
          taskData.dueDate = convertDateToString(nextWeekDueDate);
          taskData.groupId = groupId;
          await Task.create({ ...taskData, owner: session.user.email });
          nextWeekDueDate.setDate(nextWeekDueDate.getDate() + 7);
        }
        return response
          .status(201)
          .json({ status: "Tasks successfully created." });
      } else if (taskData.repeat === "Daily") {
        const nextDayDueDate = startDate;
        while (nextDayDueDate <= endDate) {
          taskData.dueDate = convertDateToString(nextDayDueDate);
          taskData.groupId = groupId;
          await Task.create({ ...taskData, owner: session.user.email });
          nextDayDueDate.setDate(nextDayDueDate.getDate() + 1);
        }
        return response
          .status(201)
          .json({ status: "Tasks successfully created." });
      } else {
        await Task.create({ ...taskData, owner: session.user.email });
        return response
          .status(201)
          .json({ status: "Task successfully created." });
      }
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
