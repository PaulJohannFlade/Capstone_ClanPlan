import TaskDetails from "@/components/TaskDetails";
import { useRouter } from "next/router";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import styled from "styled-components";
import StyledBackButton from "@/components/StyledBackButton";

const StyledMessage = styled.p`
  text-align: center;
  padding-top: 4rem;
`;

export default function DetailsPage({
  tasks,
  showModal,
  setShowModal,
  onDelete,
  onCancel,
  onCheckboxChange,
  familyMembers,
  categories,
}) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  function handleGoBack() {
    const pathName = router.pathname;
    const pathArray = pathName.split("/");
    const backRoute = `/${pathName.split("/")[pathArray.length - 2]}` || "/";
    const { listType } = router.query;
    router.push(`${backRoute}?listType=${listType}`);
  }

  return (
    <>
      <StyledBackButton onClick={handleGoBack}>
        <BackArrow />
      </StyledBackButton>

      {task ? (
        <TaskDetails
          task={task}
          showModal={showModal}
          setShowModal={setShowModal}
          onDelete={onDelete}
          onCancel={onCancel}
          onCheckboxChange={onCheckboxChange}
          familyMembers={familyMembers}
          categories={categories}
        />
      ) : (
        <StyledMessage>Page not found!</StyledMessage>
      )}
    </>
  );
}
