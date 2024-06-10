import checkForMissedDate from "@/utils/checkForMissedDate";
import getTasksForUser from "@/utils/getTasksForUser";
import { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import styled from "styled-components";

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

function renderActiveShape(props) {
  const {
    cx,
    cy,
    payload,
    percent,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="var(--color-font)">
        {payload.name} {`(${(percent * 100).toFixed(2)}%)`}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
}

export default function ProgressPieChart({ tasks, user }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const usersTasks = getTasksForUser(tasks, user);

  const missedTasks = usersTasks.filter(
    (task) => task?.dueDate && checkForMissedDate(task.dueDate) && !task.isDone
  );

  const activeTasks = usersTasks.filter(
    (task) =>
      !task.isDone && !(task?.dueDate && checkForMissedDate(task.dueDate))
  );

  const completedTasks = usersTasks.filter((task) => task.isDone);

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
  );
}
