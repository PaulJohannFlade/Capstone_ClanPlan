import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
`;

const StyledListItems = styled.li`
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  margin: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default function FamilyMembersList({ familyMembers }) {
  return (
    <section>
      <StyledList>
        {familyMembers.map((member) => (
          <StyledListItems key={member.id}>
            <p>
              <strong>{member.name}</strong>
            </p>
            <p>{member.role}</p>
          </StyledListItems>
        ))}
      </StyledList>
    </section>
  );
}
