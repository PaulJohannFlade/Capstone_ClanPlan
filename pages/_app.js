import { useEffect, useState } from "react";
import GlobalStyle from "../styles";
import { uid } from "uid";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  const [detailsBackLinkRef, setDetailsBackLinkRef] = useState("/");
  const [filters, setFilters] = useState({});
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [listType, setListType] = useState("today");

  const router = useRouter();

  const { data: categories, isLoading: isCategoryLoading } = useSWR(
    "/api/categories",
    fetcher
  );
  const { data: familyMembers, isLoading: isFamilyLoading } = useSWR(
    "/api/members",
    fetcher
  );
  const { data: tasks, isLoading } = useSWR("/api/tasks", fetcher);

  useEffect(() => {
    if (
      filters.priority === "0" &&
      filters.category === "" &&
      filters.member === ""
    ) {
      setIsFilterSet(false);
    }
  }, [filters.category, filters.member, filters.priority]);

  if (isLoading) {
    return <h1>Loading...</h1>;
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

  function closeModalWindow() {
    setShowModal(false);
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
          onCancel={closeModalWindow}
          categories={categories}
          detailsBackLinkRef={detailsBackLinkRef}
          setDetailsBackLinkRef={setDetailsBackLinkRef}
          onApplyFilters={handleApplyFilters}
          onDeleteFilterOption={handleDeleteFilterOption}
          filters={filters}
          setFilters={setFilters}
          setIsFilterSet={setIsFilterSet}
          isFilterSet={isFilterSet}
          onButtonClick={handleHomePageButtonClick}
          listType={listType}
        />
      </SWRConfig>
    </Layout>
  );
}
