import { useData } from "@/context/dataContext";
import convertDateToString from "@/utils/convertDateToString";
import formatDate from "@/utils/formatDate";
import getTasksCount from "@/utils/getTasksCount";
import getTasksForCurrentWeek from "@/utils/getTasksForCurrentWeek";
import getTasksForUser from "@/utils/getTasksForUser";
import getWeekRange from "@/utils/getWeekRange";
import { useCallback, useState } from "react";
import { PieChart, Pie } from "recharts";
import styled from "styled-components";
import renderActiveShape from "@/utils/renderActiveShape";

const StyledInnerContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

const StyledOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
`;

const StyledHeading = styled.h2`
  margin-top: 1rem;
  text-align: center;
`;

const StyledContent = styled.p`
  text-align: center;
  font-weight: 700;
`;

export default function ProgressPieChart() {
  const { tasks, user } = useData();
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const usersTasks = getTasksForUser(tasks, user);
  const startOfWeek = getWeekRange(convertDateToString(new Date())).startOfWeek;
  const endOfWeek = getWeekRange(convertDateToString(new Date())).endOfWeek;

  const tasksForCurrentWeek = getTasksForCurrentWeek(
    usersTasks,
    startOfWeek,
    endOfWeek
  );

  const missedTasks = getTasksCount(tasksForCurrentWeek).missedTasks;
  const activeTasks = getTasksCount(tasksForCurrentWeek).activeTasks;
  const completedTasks = getTasksCount(tasksForCurrentWeek).completedTasks;

  const data = [
    {
      name: "Missed",
      value: missedTasks.length,
      fill: "var(--color-progress-missed)",
    },
    {
      name: "Active",
      value: activeTasks.length,
      fill: "var(--color-progress-active)",
    },
    {
      name: "Done",
      value: completedTasks.length,
      fill: "var(--color-progress-done)",
    },
  ];

  return (
    <>
      <StyledHeading>Your Progress for the current week</StyledHeading>
      <StyledContent>{`(${formatDate(startOfWeek)} - ${formatDate(
        endOfWeek
      )})`}</StyledContent>
      <br />
      <StyledOuterContainer>
        <StyledInnerContainer>
          {data.map((element) => (
            <StyledSection key={element.name}>
              <span> {element.name}</span>{" "}
              <span>
                : {element.value}
                {element.value === 1 ? " task" : " tasks"}
              </span>
            </StyledSection>
          ))}
        </StyledInnerContainer>
        <PieChart width={375} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={200}
            cy={150}
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </StyledOuterContainer>
    </>
  );
}
