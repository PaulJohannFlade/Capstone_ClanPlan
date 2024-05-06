import styled from "styled-components";
import Link from "next/link";
import Home from "@/public/assets/images/home.svg";
import Plus from "@/public/assets/images/plus.svg";
import Family from "@/public/assets/images/family.svg";
import Category from "@/public/assets/images/category.svg";
import CalendarIcon from "@/public/assets/images/calendar.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledFooter = styled.footer`
  background-color: var(--color-font-light);
  box-shadow: -1px -6px 15px 0px #7d7d7d;
  color: var(--color-font);
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  max-width: 375px;
  margin: auto;
`;

const StyledPlus = styled(Plus)`
  width: 3rem;
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-icon)"};
`;

const StyledHome = styled(Home)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-icon)"};
`;

const StyledFamily = styled(Family)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-icon)"};
`;

const StyledCategory = styled(Category)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-icon)"};
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  stroke: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-icon)"};
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
  gap: 5px;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.6rem;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-font)" : "var(--color-icon)"};
`;
const StyledCreateItem = styled.li`
  position: fixed;
  left: calc(100vw / 2 - 2rem);
  bottom: 0.6rem;
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
            <StyledLink href="/">
              <StyledHome $isActive={currentPage === "/"} />
              <StyledSpan $isActive={currentPage === "/"}>Home</StyledSpan>
            </StyledLink>
          </li>
          <li>
            <StyledLink href="/family">
              <StyledFamily $isActive={currentPage === "/family"} />
              <StyledSpan $isActive={currentPage === "/family"}>
                Family
              </StyledSpan>
            </StyledLink>
          </li>
          <StyledCreateItem>
            <StyledLink href="/create">
              <StyledPlus $isActive={currentPage === "/create"} />
              <StyledSpan $isActive={currentPage === "/create"}>
                Create
              </StyledSpan>
            </StyledLink>
          </StyledCreateItem>

          <li>
            <StyledLink href="/categories">
              <StyledCategory $isActive={currentPage === "/categories"} />
              <StyledSpan $isActive={currentPage === "/categories"}>
                Category
              </StyledSpan>
            </StyledLink>
          </li>
          <li>
            <StyledLink href="/calendar">
              <StyledCalendarIcon $isActive={currentPage === "/calendar"} />
              <StyledSpan $isActive={currentPage === "/calendar"}>
                Calendar
              </StyledSpan>
            </StyledLink>
          </li>
        </StyledList>
      </nav>
    </StyledFooter>
  );
}
