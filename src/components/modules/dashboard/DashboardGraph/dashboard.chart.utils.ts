import { TDisplayPost, TUser } from "@/types";
import { ChartDataItem } from "./DashboardPostChartSection";

// generate year's array
export const generateYear = (currentYear: number) => {
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );

  return years;
};

// generate post data for bar chart
export const generatePostChartData = (
  month: string,
  year: number,
  posts: any
): ChartDataItem[] => {
  const selectedMonthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const daysInMonth = new Date(year, selectedMonthIndex + 1, 0).getDate();
  const monthlyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: (i + 1).toString(),
    totalPosts: 0,
  }));
  const dailyPostCounts: Record<string, number> = {};
  posts.data.forEach((post: TDisplayPost) => {
    const postDate = new Date(post.createdAt);
    const postMonth = postDate.toLocaleString("default", { month: "long" });
    const postYear = postDate.getFullYear();
    if (postMonth === month && postYear === year) {
      const dayKey = postDate.getDate().toString();
      dailyPostCounts[dayKey] = (dailyPostCounts[dayKey] || 0) + 1;
    }
  });
  return monthlyData.map((dayData) => ({
    day: dayData.day,
    totalPosts: dailyPostCounts[dayData.day] || 0,
  }));
};

// generate verify-user data for pie chart
export const getUserVerificationChartData = (allUsers: any) => {
  const totalUsers = allUsers?.data?.length || 0;
  const verifiedUsersCount =
    allUsers?.data?.filter((user: TUser) => user.isVerified === "verified")
      .length || 0;
  const nonVerifiedUsersCount = totalUsers - verifiedUsersCount;
  // Calculate percentage
  const verifiedPercentage = ((verifiedUsersCount / totalUsers) * 100).toFixed(
    1
  );
  const nonVerifiedPercentage = (
    (nonVerifiedUsersCount / totalUsers) *
    100
  ).toFixed(1);
  return [
    {
      name: "Verified Users",
      value: Number(verifiedPercentage),
      count: verifiedUsersCount,
    },
    {
      name: "Non-Verified Users",
      value: Number(nonVerifiedPercentage),
      count: nonVerifiedUsersCount,
    },
  ];
};
