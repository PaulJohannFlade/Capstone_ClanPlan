import Form from "@/components/Form";
import Header from "@/components/Header";
import Link from "next/link";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";

const StyledLink = styled(Link)`
  position: fixed;
  top: 0.7rem;
  left: calc(50% - 170px);
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export default function CreatePage({ handleAddData }) {
  return (
    <div>
      <Header />
      <StyledLink href="/">
        <BackArrow />
      </StyledLink>
      <Form handleAddData={handleAddData} />
    </div>
  );
}
