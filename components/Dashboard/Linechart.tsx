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

function Linechart() {
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
        label: "UST",
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
      <div className="flex flex-row justify-between py-3">
        <div>Fund Profits</div>
        <div>
          <button className="px-2 border rounded-md border-slate-400">Week</button>
          <button className="px-2">Month</button>
          <button className="px-2">3 Months</button>
          <button className="px-2">Year</button>
          <button className="px-2">Lifetime</button>
        </div>
      </div>

      <Line data={dataLineChart} ref={chartRef} options={configLineChart}></Line>
    </div>
  );
}

export default Linechart;
