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
  gap: 0.5rem;

  @media (max-width: 900px) {
    display: flex;
  }
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

const StyledSection = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ $background }) => $background};
  padding: 0.3rem 0.5rem;
  gap: 0.2rem;
  @media (max-width: 350px) {
    flex-direction: column;
  }
`;

const StyledHeading = styled.h2`
  margin-top: 1rem;
  text-align: center;
`;

const StyledContent = styled.p`
  text-align: center;
  font-weight: 700;
`;

const StyledNoProgressMessage = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 500;
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

  const listOfZeroTasks = data.filter((element) => element.value === 0);
  const noProgressToShow = listOfZeroTasks.length === data.length;

  return (
    <>
      <StyledHeading>Your Progress for the current week</StyledHeading>
      <StyledContent>{`(${formatDate(startOfWeek)} - ${formatDate(
        endOfWeek
      )})`}</StyledContent>
      <StyledOuterContainer>
        <StyledInnerContainer>
          {data.map((element) => (
            <StyledSection key={element.name} $background={element.fill}>
              <li> {element.name}:</li>
              <li>{element.value}</li>
            </StyledSection>
          ))}
        </StyledInnerContainer>
        {noProgressToShow && (
          <StyledNoProgressMessage>
            No progress chart to display
          </StyledNoProgressMessage>
        )}
        <PieChart width={360} height={240}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={180}
            cy={120}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </StyledOuterContainer>
    </>
  );
}
