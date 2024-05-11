import { useState } from "react";
import TasksListGroup from "./TasksListGroup";

export default function TasksListGroups({ tasks, setDetailsBackLinkRef }) {
  const [hideGroup, setHideGroup] = useState({});

  function handleHideGroup(key) {
    setHideGroup({ ...hideGroup, [key]: !hideGroup[key] });
  }

  const missedTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      task.dueDate &&
      new Date(task.dueDate).toISOString().substring(0, 10) <
        new Date().toISOString().substring(0, 10)
  );

  const todaysTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      new Date(task?.dueDate).toDateString() === new Date().toDateString()
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowsTasks = tasks.filter(
    (task) =>
      !task.isDone &&
      new Date(task?.dueDate).toDateString() === tomorrow.toDateString()
  );

  const today = new Date();
  const thirdDay = new Date();
  thirdDay.setDate(thirdDay.getDate() + 2);
  const sunday = new Date();
  sunday.setDate(today.getDate() - today.getDay() + 7);

  const thisWeekTasks =
    today.getDay() >= 6
      ? []
      : tasks.filter(
          (task) =>
            !task.isDone &&
            task?.dueDate >= thirdDay.toISOString().substring(0, 10) &&
            task?.dueDate <= sunday.toISOString().substring(0, 10)
        );

  const nextMonday = new Date();
  nextMonday.setDate(sunday.getDate() + 1);
  const nextTuesday = new Date();
  nextTuesday.setDate(sunday.getDate() + 2);
  const nextSunday = new Date();
  nextSunday.setDate(sunday.getDate() + 7);

  const nextWeekTasks =
    today.getDay() === 7
      ? tasks.filter(
          (task) =>
            !task.isDone &&
            task?.dueDate >= nextTuesday.toISOString().substring(0, 10) &&
            task?.dueDate <= nextSunday.toISOString().substring(0, 10)
        )
      : tasks.filter(
          (task) =>
            !task.isDone &&
            task?.dueDate >= nextMonday.toISOString().substring(0, 10) &&
            task?.dueDate <= nextSunday.toISOString().substring(0, 10)
        );

  const completedTasks = tasks.filter((task) => task.isDone);

  return (
    <>
      {missedTasks.length > 0 && (
        <TasksListGroup
          tasks={missedTasks}
          groupKey="missed"
          groupTitle="Missed"
          onHideGroup={handleHideGroup}
          hideGroup={hideGroup}
          $red
        />
      )}
      {todaysTasks.length > 0 && (
        <TasksListGroup
          tasks={todaysTasks}
          groupKey="today"
          groupTitle="Today"
          onHideGroup={handleHideGroup}
          hideGroup={hideGroup}
        />
      )}
      {tomorrowsTasks.length > 0 && (
        <TasksListGroup
          tasks={tomorrowsTasks}
          groupKey="tomorrow"
          groupTitle="Tomorrow"
          onHideGroup={handleHideGroup}
          hideGroup={hideGroup}
        />
      )}
      {thisWeekTasks.length > 0 && (
        <TasksListGroup
          tasks={thisWeekTasks}
          groupKey="thisWeek"
          groupTitle="This week"
          onHideGroup={handleHideGroup}
          hideGroup={hideGroup}
        />
      )}
      {nextWeekTasks.length > 0 && (
        <TasksListGroup
          tasks={nextWeekTasks}
          groupKey="nextWeek"
          groupTitle="Next week"
          onHideGroup={handleHideGroup}
          hideGroup={hideGroup}
        />
      )}
      {completedTasks.length > 0 && (
        <TasksListGroup
          tasks={completedTasks}
          groupKey="completed"
          groupTitle="Completed"
          onHideGroup={handleHideGroup}
          hideGroup={hideGroup}
        />
      )}
    </>
  );
}
