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
  background-color: var(--color-background);
  box-shadow: 0px 1px 10px -1px var(--color-font);
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  margin: 0;
  min-width: 330px;
  z-index: 5;
  padding: 0.5rem;

  @media (min-width: 900px) {
    top: 0;
    min-height: 100vh;
    width: 100px;
    box-shadow: 1px 0px 10px -1px var(--color-font);
    min-width: 100px;
    z-index: auto;
  }
`;

const StyledPlus = styled(Plus)`
  width: 3rem;
`;

const StyledList = styled.ul`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  list-style: none;
  padding: 0;

  @media (min-width: 900px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 100vh;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  transition: all 250ms linear;
  opacity: ${({ $isActive }) => !$isActive && "0.6"};
  font-size: 0.8rem;
  font-weight: ${({ $isActive }) => $isActive && "700"};
  &:hover {
    opacity: 1;
  }
`;

const StyledCreateDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.6rem;
  @media (min-width: 900px) {
    position: static;
    transform: translateX(0);
  }
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
            <StyledLink
              href="/"
              $isActive={currentPage === "/"}
              aria-current={currentPage === "/" ? "page" : undefined}
            >
              <Home />
              <span>Home</span>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              href="/family"
              $isActive={currentPage === "/family"}
              aria-current={currentPage === "/family" ? "page" : undefined}
            >
              <Family />
              <span>Family</span>
            </StyledLink>
          </li>
          <li>
            <StyledCreateDiv>
              <StyledLink
                href="/create"
                $isActive={currentPage === "/create"}
                aria-current={currentPage === "/create" ? "page" : undefined}
              >
                <StyledPlus />
                <span>Create</span>
              </StyledLink>
            </StyledCreateDiv>
          </li>
          <li>
            <StyledLink
              href="/categories"
              $isActive={currentPage === "/categories"}
              aria-current={currentPage === "/categories" ? "page" : undefined}
            >
              <Category />
              <span>Category</span>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              href="/calendar"
              $isActive={currentPage === "/calendar"}
              aria-current={currentPage === "/calendar" ? "page" : undefined}
            >
              <CalendarIcon />
              <span>Calendar</span>
            </StyledLink>
          </li>
        </StyledList>
      </nav>
    </StyledFooter>
  );
}
