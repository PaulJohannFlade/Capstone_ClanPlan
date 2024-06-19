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
  padding: 0 0.5rem;
`;

const StyledGroupHeading = styled.h3`
  color: ${({ $red }) => $red && "var(--color-alert-font)"};
`;

const StyledUpArrow = styled(UpArrow)`
  stroke: var(--color-font);
  fill: var(--color-font);
  width: 2rem;
`;

const StyledDownArrow = styled(DownArrow)`
  stroke: var(--color-font);
  fill: var(--color-font);
  width: 2rem;
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
  onSetDetailsBackLinkRef,
  groupKey,
  onHideGroup,
  hideGroup,
  $red,
}) {
  return (
    <StyledSection>
      <StyledContainer
        onClick={() => onHideGroup(groupKey)}
        role="button"
        aria-label={
          hideGroup[groupKey] ? "Expand task group" : "Collapse task group"
        }
      >
        <StyledGroupHeading $red={$red}>
          {groupKey} ({tasks.length})
        </StyledGroupHeading>
        {hideGroup[groupKey] ? (
          <StyledDownArrow role="img" aria-label="arrow down icon" />
        ) : (
          <StyledUpArrow role="img" aria-label="arrow up icon" />
        )}
      </StyledContainer>
      <StyledDiv $isHide={hideGroup[groupKey]}>
        <StyledTasksList
          tasks={tasks}
          onSetDetailsBackLinkRef={onSetDetailsBackLinkRef}
          allTasks
        />
      </StyledDiv>
    </StyledSection>
  );
}
