import { useState } from "react";
import GlobalStyle from "@/styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";
import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import AuthGate from "@/components/AuthGate";
import { ModalProvider } from "@/context/modalContext";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [filters, setFilters] = useState({});
  const [listType, setListType] = useState("today");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const {
    data: familyMembers,
    isLoading: isFamilyLoading,
    mutate: mutateMembers,
  } = useSWR("/api/members", fetcher);
  const { data: tasks, isLoading: isTaskLoading } = useSWR(
    "/api/tasks",
    fetcher
  );
  const {
    data: user,
    isLoading: isUserLoading,
    mutate: mutateUser,
  } = useSWR(`/api/members/auth`, fetcher);

  if (isTaskLoading) {
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
  }

  const isDarkTheme = user
    ? user.isDarkTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  function handleSetDetailsBackLinkRef(link) {
    setDetailsBackLinkRef(link);
  }

  function handleHomePageButtonClick(listType) {
    setListType(listType);
    setFilters({});
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Layout user={user}>
          <GlobalStyle />
          <SWRConfig value={{ fetcher }}>
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
              <AuthGate user={user} mutateUser={mutateUser}>
                <Component
                  {...pageProps}
                  tasks={tasks}
                  familyMembers={familyMembers}
                  categories={categories}
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
                  user={user}
                  mutateUser={mutateUser}
                  mutateMembers={mutateMembers}
                />
              </AuthGate>
            </ModalProvider>
          </SWRConfig>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
