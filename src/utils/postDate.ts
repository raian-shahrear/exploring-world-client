import { format, differenceInMinutes, differenceInHours } from "date-fns";

export const formatPostDate = (date: string | Date): string => {
  const postDate = new Date(date);
  const now = new Date();

  const minutesAgo = differenceInMinutes(now, postDate);
  const hoursAgo = differenceInHours(now, postDate);

  // less than 1 minute ago
  if (minutesAgo < 1) {
    return "Now";
  }

  // ess than 1 hour ago,
  if (minutesAgo < 60) {
    if (minutesAgo > 1) {
      return `${minutesAgo} minutes`;
    } else {
      return `${minutesAgo} minute`;
    }
  }

  // less than 24 hours ago
  if (hoursAgo < 24) {
    if (hoursAgo > 1) {
      return `${hoursAgo} hours`;
    } else {
      return `${hoursAgo} hour`;
    }
  }

  // more than 24 hours ago, full date and time
  return format(postDate, "EEE do MMM yyyy 'at' p");
};
