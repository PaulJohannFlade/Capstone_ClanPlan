import styled from "styled-components";
import Link from "next/link";
import Home from "@/public/assets/images/home.svg";
import Plus from "@/public/assets/images/plus.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledFooter = styled.footer`
  background-color: var(--color-font);
  color: var(--color-font-light);
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 375px;
  margin: auto;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.7rem;
  background-color: ${({ $isActive }) => ($isActive ? "gray" : "")};
`;

export default function Footer() {
  const [currentPage, setCurrentPage] = useState("/");
  const router = useRouter();

  useEffect(() => {
    setCurrentPage(router.pathname);
  }, [router.pathname]);

  return (
    <StyledFooter>
      <nav>
        <StyledList>
          <li>
            <StyledLink $isActive={currentPage === "/"} href="/">
              <Home />
            </StyledLink>
          </li>
          <li>
            <StyledLink $isActive={currentPage === "/create"} href="/create">
              <Plus />
            </StyledLink>
          </li>
        </StyledList>
      </nav>
    </StyledFooter>
  );
}
