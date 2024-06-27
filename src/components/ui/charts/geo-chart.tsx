import { Chart } from "react-google-charts";

interface GeoChartProps {
  data: [string, number | string][];
}
export default function GeoChart({ data }: GeoChartProps) {
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
          },
        },
      ]}
      options={{ colors: ["#ea580c"] }}
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={data}
    />
  );
}
