import { useEffect, useState } from "react";
import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [filters, setFilters] = useState({});
  const [listType, setListType] = useState("today");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [isDarkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    // Set the initial theme based on user preference or default to light
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkTheme(prefersDark);
  }, []);

  function handleToggleTheme() {
    setDarkTheme(!isDarkTheme);
  }

  const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const { data: familyMembers, isLoading: isFamilyLoading } = useSWR(
    "/api/members",
    fetcher
  );
  const { data: tasks, isLoading } = useSWR("/api/tasks", fetcher);

  if (isLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!tasks) {
    return;
  }

  if (isCategoryLoading) {
    return <StyledLoadingAnimation />;
  }
  if (!categories) {
    return;
  }

  if (isFamilyLoading) {
    return <StyledLoadingAnimation />;
  }
  if (!familyMembers) {
    return;
  }

  function handleApplyFilters(formData) {
    setFilters(formData);
    setShowModal(false);
  }

  function handleDeleteFilterOption(key) {
    setFilters({ ...filters, [key]: "" });
  }

  function handleHomePageButtonClick(listType) {
    setListType(listType);
    setFilters({});
  }

  // Sorting the task in chronological order of date
  const tasksAfterSorting = tasks.sort(
    (a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)
  );

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Layout isDarkTheme={isDarkTheme} onToggleTheme={handleToggleTheme}>
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            tasks={tasksAfterSorting}
            familyMembers={familyMembers}
            setShowModal={setShowModal}
            showModal={showModal}
            categories={categories}
            detailsBackLinkRef={detailsBackLinkRef}
            setDetailsBackLinkRef={setDetailsBackLinkRef}
            onApplyFilters={handleApplyFilters}
            onDeleteFilterOption={handleDeleteFilterOption}
            filters={filters}
            setFilters={setFilters}
            // isFilterSet={isFilterSet}
            onButtonClick={handleHomePageButtonClick}
            listType={listType}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </SWRConfig>
      </Layout>
    </ThemeProvider>
  );
}
