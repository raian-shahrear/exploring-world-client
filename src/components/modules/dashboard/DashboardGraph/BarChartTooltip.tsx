import { MdOutlineDateRange } from "react-icons/md";

export const BarChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border p-2 rounded shadow-sm">
        <p className="grid grid-cols-[8px_auto] items-center gap-2">
          <span>
            <MdOutlineDateRange />
          </span>
          {`Day ${payload[0].payload.day}`}
        </p>
        <p className="grid grid-cols-[8px_auto] items-center gap-2 ms-[2px]">
          <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
          {`Total Posts: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};
