import styled from "styled-components";
import { useState } from "react";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";

const StyledSection = styled.section`
  display: flex;
  padding: 0;
  flex-direction: column;
  gap: 1rem;
  margin: 0.5rem;
`;

const StyledButton = styled.button`
  display: flex;
  background-color: inherit;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 15px 5px rgba(112, 107, 91, 0.83);
  border-radius: 2rem;
  padding: 1rem;
  border: none;
`;

export default function CategoriesList({ categories }) {
  const [selected, setSelected] = useState(null);

  function handleExpand(index) {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
  }
  return (
    <StyledSection>
      {categories.map((category, index) => (
        <>
          <StyledButton key={category.id} onClick={() => handleExpand(index)}>
            <span>
              <strong>{category.category}</strong>
            </span>
            {selected === index ? <UpArrow /> : <DownArrow />}
          </StyledButton>
          {selected === index && (
            <ul>
              {category.selectedMembers.map((member) => (
                <li key={member.id}>{member.name}</li>
              ))}
            </ul>
          )}
        </>
      ))}
    </StyledSection>
  );
}
