type TLegendProps = {
  payload?: any;
  chartData: any;
};

export const PieChartLegend = ({ payload, chartData }: TLegendProps) => {
  return (
    <ul className="flex gap-5 text-xs p-0">
      {payload.map((entry: any, index: number) => (
        <li
          key={`legend-item-${index}`}
          className="list-none flex items-center gap-1"
        >
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: `${entry.color}` }}
          />
          {`${entry.value}: ${chartData[index].count}`}
        </li>
      ))}
    </ul>
  );
};
