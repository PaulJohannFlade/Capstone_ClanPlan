import { useState } from "react";
import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";
import styled from "styled-components";

const StyledLoadingAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height according to your UI */
`;

const StyledLoadingSpinner = styled.div`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  border: 4px solid rgba(0, 0, 0, 0.245);
  border-left-color: #729290;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
`;

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [filters, setFilters] = useState({});
  const [listType, setListType] = useState("today");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const isFilterSet =
    (filters.priority !== "0" || filters.priority == true) &&
    filters.category == true &&
    filters.member == true;

  const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const { data: familyMembers, isLoading: isFamilyLoading } = useSWR(
    "/api/members",
    fetcher
  );
  const { data: tasks, isLoading } = useSWR("/api/tasks", fetcher);

  function handleAddCategory(data) {
    setCategories([...categories, { ...data, id: uid() }]);
    setShowModal(false);
  }

  function handleEditCategory(data) {
    setCategories(
      categories.map((category) => (category.id === data.id ? data : category))
    );
    setTasks(
      tasks.map((task) =>
        !task.isDone &&
        task.category === data.id &&
        !task.assignedTo.every((memberId) =>
          data.selectedMembers.includes(memberId)
        )
          ? { ...task, assignedTo: [] }
          : task
      )
    );
    setShowModal(false);
  }

  if (isLoading) {
    return (
      <StyledLoadingAnimation>
        <StyledLoadingSpinner />
      </StyledLoadingAnimation>
    );
  }

  if (!tasks) {
    return;
  }

  if (isCategoryLoading) {
    return <h1>Loading...</h1>;
  }
  if (!categories) {
    return;
  }

  if (isFamilyLoading) {
    return <h1>Loading...</h1>;
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
    <Layout>
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
          isFilterSet={isFilterSet}
          onButtonClick={handleHomePageButtonClick}
          listType={listType}
          onEditCategory={handleEditCategory}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </SWRConfig>
    </Layout>
  );
}
