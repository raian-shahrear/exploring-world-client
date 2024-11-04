type TTooltipProps = {
  active?: boolean;
  payload?: any;
};

export const PieChartTooltip = ({ active, payload }: TTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-2 py-1 text-xs border rounded">
        {payload.map((entry: any) => {
          return (
            <div
              key={`tooltip-item-${entry.name}`}
              className="flex items-center gap-1"
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: `${entry.payload.fill}` }}
              />
              <span>{`${entry.name}: ${entry.value}%`}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
