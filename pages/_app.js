import { useState } from "react";
import GlobalStyle from "@/styles";
import Layout from "@/components/Layout";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import AuthGate from "@/components/AuthGate";
import { ModalProvider } from "@/context/modalContext";
import { DataProvider } from "@/context/dataContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [filters, setFilters] = useState({});
  const [listType, setListType] = useState("today");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  /* const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const {
    data: familyMembers,
    isLoading: isFamilyLoading,
    mutate: mutateMembers,
  } = useSWR("/api/members", fetcher);
  const { data: tasks, isLoading: isTasksLoading } = useSWR(
    "/api/tasks",
    fetcher
  );
  const {
    data: user,
    isLoading: isUserLoading,
    mutate: mutateUser,
  } = useSWR(`/api/members/auth`, fetcher);

  if (isTasksLoading) {
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

  if (isUserLoading) {
    return <StyledLoadingAnimation />;
  }
  if (!user) {
    return;
  } */

  /* const isDarkTheme = user
    ? user.isDarkTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches; */

  function handleSetDetailsBackLinkRef(link) {
    setDetailsBackLinkRef(link);
  }

  function handleHomePageButtonClick(listType) {
    setListType(listType);
    setFilters({});
  }

  return (
    <SessionProvider session={session}>
      <DataProvider setTheme={setIsDarkTheme}>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <Layout>
            <GlobalStyle />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDarkTheme ? "dark" : "light"}
            />
            <ModalProvider>
              <AuthGate>
                <Component
                  {...pageProps}
                  detailsBackLinkRef={detailsBackLinkRef}
                  onSetDetailsBackLinkRef={handleSetDetailsBackLinkRef}
                  filters={filters}
                  setFilters={setFilters}
                  onButtonClick={handleHomePageButtonClick}
                  listType={listType}
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  currentView={currentView}
                  setCurrentView={setCurrentView}
                  isDarkTheme={isDarkTheme}
                />
              </AuthGate>
            </ModalProvider>
          </Layout>
        </ThemeProvider>
      </DataProvider>
    </SessionProvider>
  );
}
