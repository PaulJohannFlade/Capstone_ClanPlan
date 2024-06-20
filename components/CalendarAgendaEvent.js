import convertDateToString from "@/utils/convertDateToString";
import styled from "styled-components";
const StyledDiv = styled.div`
  ${({ $isDone, $isMissed }) =>
    $isDone
      ? `background-color: #808080;
       text-decoration: line-through;`
      : $isMissed &&
        `background-color: var(--color-alert-font);
       `}
  color: var(--color-font);
`;
export default function CalendarAgendaEvent({ event }) {
  const isMissed =
    convertDateToString(new Date(event.start)) <
    convertDateToString(new Date());

  return (
    <StyledDiv $isDone={event.isDone} $isMissed={isMissed}>
      <span>{event.title}</span>
    </StyledDiv>
  );
}
