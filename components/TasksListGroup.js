import styled from "styled-components";
import TasksList from "./TasksList";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";

const StyledSection = styled.section`
  margin: 0.5rem;
  padding: 0.5rem 0;
  background-color: var(--color-background);
  box-shadow: 1px 1px 15px -5px var(--color-font);
  transition: background-color 0.5s ease;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const StyledMissedHeading = styled.h3`
  ${({ $red }) => $red && `color: red;`}
`;

const StyledUpArrow = styled(UpArrow)`
  stroke: var(--color-font);
  fill: var(--color-font);
`;

const StyledDownArrow = styled(DownArrow)`
  stroke: var(--color-font);
  fill: var(--color-font);
`;

const StyledDiv = styled.div`
  max-height: ${({ $isHide }) => ($isHide ? "0" : "500px")};
  overflow: scroll;
  transition: max-height 0.5s ease;
`;

const StyledTasksList = styled(TasksList)`
  margin-bottom: 0;
`;

export default function TasksListGroup({
  tasks,
  setDetailsBackLinkRef,
  groupKey,
  groupTitle,
  onHideGroup,
  hideGroup,
  $red,
}) {
  return (
    <StyledSection>
      <StyledContainer onClick={() => onHideGroup(groupKey)}>
        <StyledMissedHeading $red={$red}>
          {groupTitle} ({tasks.length})
        </StyledMissedHeading>
        {hideGroup[groupKey] ? <StyledDownArrow /> : <StyledUpArrow />}
      </StyledContainer>
      <StyledDiv $isHide={hideGroup[groupKey]}>
        <StyledTasksList
          tasks={tasks}
          setDetailsBackLinkRef={setDetailsBackLinkRef}
        />
      </StyledDiv>
    </StyledSection>
  );
}
