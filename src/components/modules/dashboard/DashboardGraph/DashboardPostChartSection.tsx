"use client";
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChartTooltip } from "./BarChartTooltip";
import { months } from "./dashboard.chart.const";
import { generatePostChartData, generateYear } from "./dashboard.chart.utils";

type TProps = {
  posts: any;
  postLoading: boolean;
};
export type ChartDataItem = {
  day: string;
  totalPosts: number;
};
const chartConfig = {
  totalPosts: {
    label: "Total Posts",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const DashboardPostChartSection = ({ posts, postLoading }: TProps) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  // set chart data based on selected month/year
  useEffect(() => {
    if (posts) {
      setChartData(generatePostChartData(selectedMonth, selectedYear, posts));
    }
  }, [selectedMonth, selectedYear, posts]);

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const hasData = chartData.some((data) => data.totalPosts > 0);

  return (
    <div>
      <h2 className="text-base font-semibold mb-3">Total post per day</h2>
      <div className="w-full border p-3 rounded-lg">
        {postLoading ? (
          <div>
            <div className="flex items-center gap-4 mb-3">
              <Skeleton className="h-8 w-28"></Skeleton>
              <Skeleton className="h-8 w-28"></Skeleton>
            </div>
            <Skeleton className="h-[40vh] 2xl:h-[400px] w-full rounded-lg"></Skeleton>
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
                {generateYear(currentYear).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] max-h-[40vh] 2xl:min-h-[376px] 2xl:max-h-[376px] w-full"
            >
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval={0}
                  height={50}
                >
                  <Label value="Days" position="bottom" offset={-10} />
                </XAxis>
                {hasData && (
                  <YAxis dataKey="totalPosts" tickLine={false} width={30}>
                    <Label
                      value="Total Posts"
                      angle={-90}
                      position="left"
                      offset={0}
                    />
                  </YAxis>
                )}
                <ChartTooltip content={<BarChartTooltip />} />
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
