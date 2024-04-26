import Form from "@/components/Form";
import BackArrow from "@/public/assets/images/back-arrow.svg";
import { useRouter } from "next/router";
import StyledBackLink from "@/components/StyledBackLink";
import StyledBackButton from "@/components/StyledBackButton";

export default function EditPage({
  onEditData,
  tasks,
  familyMembers,
  categories,
}) {
  const router = useRouter();
  const { id } = router.query;

  const task = tasks.find((task) => task.id === id);

  const allocatedMembersId = categories.find(
    (category) => category.id === task?.category
  )?.selectedMembers;

  const allocatedMembersList = allocatedMembersId?.map((memberId) => ({
    id: memberId,
    name: familyMembers.find((member) => member.id === memberId).name,
  }));

  function handleGoBack() {
    const pathName = router.pathname;
    const pathArray = pathName.split("/");
    const backRoute = `/${pathName.split("/")[pathArray.length - 2]}` || "/";
    const { listType } = router.query;
    router.push(`${backRoute}?listType=${listType}`);
  }

  return (
    <>
      <div>
        <StyledBackButton onClick={handleGoBack}>
          <BackArrow />
        </StyledBackButton>
        <Form
          onTaskSubmit={onEditData}
          title="Edit a task"
          isEdit
          value={task}
          familyMembers={familyMembers}
          categories={categories}
          allocatedMembersList={allocatedMembersList}
        />
      </div>
    </>
  );
}
