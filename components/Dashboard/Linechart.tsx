import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
  ChartOptions,
  ChartData,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LinechartData {
  title?: string;
  data: ChartData<"line">;
  config: ChartOptions<"line">;
}

function Linechart(props: LinechartData) {
  const chartRef = useRef<ChartJS<"line", number[], string>>(null);
  const labels = ["January", "February", "March", "April", "May", "June"];

  const dataLineChart = {
    labels: labels,
    datasets: [
      {
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 600);
          gradient.addColorStop(0, "rgba(235,237,255,1)");
          gradient.addColorStop(1, "rgba(235,237,255,0)");
          return gradient;
        },
        label: "USD",
        fill: "start",
        borderColor: "#8E95DF",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const configLineChart: ChartOptions<"line"> = {
    responsive: true,
    elements: {
      line: {
        tension: 0.35,
      },
    },
    plugins: {
      filler: {},
    },
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        {props.title ? <div>{props.title}</div> : null}
      </div>

      <Line data={props.data} ref={chartRef} options={props.config}></Line>
    </div>
  );
}

export default Linechart;
