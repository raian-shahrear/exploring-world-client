"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TDisplayPost } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type TProps = {
  posts: any;
  postLoading: boolean;
};
type ChartDataItem = {
  day: string;
  totalPosts: number;
};

const DashboardPostChartSection = ({ posts, postLoading }: TProps) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const generateChartData = (month: string, year: number): ChartDataItem[] => {
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

  useEffect(() => {
    if (posts?.data) {
      setChartData(generateChartData(selectedMonth, selectedYear));
    }
  }, [selectedMonth, selectedYear, posts?.data]);

  const chartConfig = {
    totalPosts: {
      label: "Total Posts",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );

  const hasData = chartData.some((data) => data.totalPosts > 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Total post per day</h2>
      <div className="lg:w-8/12 border p-3 rounded-lg">
        {postLoading ? (
          <div>
            <div className="flex items-center gap-4 mb-3">
              <Skeleton className="h-8 w-28"></Skeleton>
              <Skeleton className="h-8 w-28"></Skeleton>
            </div>
            <Skeleton className="h-[40vh] w-full rounded-lg"></Skeleton>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-4">
              <label className="text-sm font-semibold mr-2">
                Select Month:
              </label>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="border p-1 rounded text-sm"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <label className="text-sm font-semibold mr-2">Select Year:</label>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="border p-1 rounded text-sm"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] max-h-[40vh] w-full"
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval={0}
                />
                {hasData && (
                  <YAxis dataKey="totalPosts" tickLine={false} width={10} />
                )}
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="totalPosts"
                  fill="var(--color-totalPosts)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPostChartSection;
