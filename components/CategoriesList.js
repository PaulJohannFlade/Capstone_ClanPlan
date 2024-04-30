import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";
import StyledTrash from "./StyledTrash";

const StyledList = styled.ul`
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
  list-style: none;
  margin-bottom: 6rem;
`;

const StyledListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  border-radius: 2rem;
  padding: 1rem 2rem;
  border: none;
`;

const StyledListOfMembers = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledMemberItem = styled.li`
  text-align: left;
`;

const StyleHeading = styled.h3`
  max-width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledUpArrow = styled(UpArrow)`
  margin: auto;
`;

const StyledDownArrow = styled(DownArrow)`
  margin: auto;
`;

export default function CategoriesList({ categories, familyMembers }) {
  const [selected, setSelected] = useState(null);

  function handleExpand(index) {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
  }
  return (
    <StyledList>
      {categories.map((category, index) => (
        <StyledListItem key={category.id} onClick={() => handleExpand(index)}>
          <StyledTrash onClick={() => setShowModal(true)} />
          <StyleHeading title={category.title}>
            <strong>{category.title}</strong>
          </StyleHeading>
          {selected === index && (
            <StyledListOfMembers>
              {category.selectedMembers.map((memberId) => (
                <StyledMemberItem key={memberId}>
                  {familyMembers.find((member) => member.id === memberId)?.name}
                </StyledMemberItem>
              ))}
            </StyledListOfMembers>
          )}
          {selected === index ? <StyledUpArrow /> : <StyledDownArrow />}
        </StyledListItem>
      ))}
    </StyledList>
  );
}
