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
  const [myTasksSelection, setMyTasksSelection] = useState(true);

  function handleSetDetailsBackLinkRef(link) {
    setDetailsBackLinkRef(link);
  }

  function handleHomePageButtonClick(listType) {
    setListType(listType);
    setFilters({});
  }

  function handleMyTasksSelection() {
    if (
      (listType === "notAssigned" && !myTasksSelection) ||
      (listType === "progress" && myTasksSelection)
    ) {
      setListType("today");
    }
    setMyTasksSelection(!myTasksSelection);
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
                  myTasksSelection={myTasksSelection}
                  onMyTasksSelection={handleMyTasksSelection}
                />
              </AuthGate>
            </ModalProvider>
          </Layout>
        </ThemeProvider>
      </DataProvider>
    </SessionProvider>
  );
}
