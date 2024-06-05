import useSWR from "swr";
import StyledLoadingAnimation from "./StyledLoadingAnimation";

export default function FetchFamilyName({ user }) {
  const familyId = user?.status === "Member not found" ? null : user?.family;

  const { data: familyName, isLoading: isFamilyNameLoading } = useSWR(
    `/api/family?family=${familyId}`
  );

  if (isFamilyNameLoading) {
    return <StyledLoadingAnimation />;
  }

  if (!familyName) {
    return;
  }

  return <h2>{`Welcome to ${familyName?.name} family !`}</h2>;
}
