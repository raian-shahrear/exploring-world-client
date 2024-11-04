"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChartTooltip } from "./PieChartTooltip";
import { PieChartLegend } from "./PieChartLegend";
import { getUserVerificationChartData } from "./dashboard.chart.utils";
import { COLORS } from "./dashboard.chart.const";

type TProps = {
  allUsers: any;
  allUserLoading: boolean;
};

const DashboardUserVerificationChart = ({
  allUsers,
  allUserLoading,
}: TProps) => {
  const chartData = getUserVerificationChartData(allUsers);

  return (
    <div>
      <h2 className="text-base font-semibold mb-3">User Verification Status</h2>
      <div className="w-full border p-3 rounded-lg">
        {allUserLoading ? (
          <div className="h-[300px] 2xl:h-[442px] w-full flex justify-center items-center">
            <div>
              <Skeleton className="w-[200px] h-[200px] rounded-full" />
              <div className="flex items-center justify-center gap-2 mt-4">
                <Skeleton className="h-4 w-28"></Skeleton>
                <Skeleton className="h-4 w-28"></Skeleton>
              </div>
            </div>
          </div>
        ) : (
          <PieChart width={300} height={420} className="mx-auto">
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<PieChartTooltip />} />
            <Legend content={<PieChartLegend chartData={chartData} />} />
          </PieChart>
        )}
      </div>
    </div>
  );
};

export default DashboardUserVerificationChart;
