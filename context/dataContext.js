import StyledLoadingAnimation from "@/components/StyledLoadingAnimation";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((response) => {
    if (!response.ok) {
      const error = new Error("Data not found!");
      error.status = response.status;
      throw error;
    }
    return response.json();
  });

const DataContext = createContext();

export function DataProvider({ children, setTheme }) {
  const {
    data: categories,
    isLoading: isCategoryLoading,
    mutate: mutateCategories,
  } = useSWR("/api/categories", fetcher);

  const {
    data: familyMembers,
    isLoading: isFamilyLoading,
    mutate: mutateMembers,
  } = useSWR("/api/members", fetcher);

  const {
    data: tasks,
    isLoading: isTasksLoading,
    mutate: mutateTasks,
  } = useSWR("/api/tasks", fetcher);

  const {
    data: user,
    isLoading: isUserLoading,
    mutate: mutateUser,
  } = useSWR(`/api/members/auth`, fetcher);

  const [taskId, setTaskId] = useState(null);
  const [memberId, setMemberId] = useState(null);

  const {
    data: task,
    isLoading: isTaskLoading,
    mutate: mutateTask,
  } = useSWR(taskId ? `/api/tasks/${taskId}` : null, fetcher);

  const {
    data: familyMember,
    isLoading: isFamilyMemberLoading,
    mutate: mutateMember,
  } = useSWR(memberId ? `/api/members/${memberId}` : null, fetcher);

  useEffect(() => {
    const isDarkTheme = user
      ? user.isDarkTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDarkTheme);
  }, [user, setTheme]);

  if (
    isCategoryLoading ||
    isFamilyLoading ||
    isUserLoading ||
    isTasksLoading ||
    (taskId && isTaskLoading) ||
    (memberId && isFamilyMemberLoading)
  ) {
    return <StyledLoadingAnimation />;
  }

  return (
    <DataContext.Provider
      value={{
        tasks,
        task,
        categories,
        familyMembers,
        user,
        familyMember,
        mutateTasks,
        mutateTask,
        mutateCategories,
        mutateMembers,
        mutateUser,
        mutateMember,
        setTaskId,
        setMemberId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData(taskId = null, memberId = null) {
  const context = useContext(DataContext);
  useEffect(() => {
    if (taskId) {
      context.setTaskId(taskId);
    }
    if (memberId) {
      context.setMemberId(memberId);
    }
  }, [taskId, memberId, context]);

  return context;
}
