import convertDateToString from "@/utils/convertDateToString";

export default function checkForMissedDate(dueDate) {
  const isMissed =
    convertDateToString(new Date(dueDate)) < convertDateToString(new Date());
  return isMissed;
}
