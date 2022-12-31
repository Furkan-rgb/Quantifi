import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart, ChartData, ChartDataset, ChartOptions } from "chart.js";
import { formatCurrency } from "../utils/formatter";

// Create our number formatter.
function DoughnutChart() {
  // Center of doughnut chart

  const vested = 85000000;
  const totalStaked = 15000000;
  const circulating = 100000000;
  const dataDoughnut = {
    labels: ["Vested", "Staked","Circulating"],
    datasets: [
      {
        label: "Total Value Locked",
        data: [vested, totalStaked,circulating],
        backgroundColor: ["rgb(59, 87, 155)", "rgb(135, 151, 199)","rgb(75, 187, 55)",],
        borderColor: ["rgb(78, 101, 166)", "rgb(159, 172, 213)"],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutLabelsLine = {
    id: "doughnutLabelsLine",
    afterDraw(chart: Chart<"doughnut">, args: any, options: ChartOptions) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;

      chart.data.datasets.forEach((dataset: any, i: number) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index: number) => {
          const { x, y } = datapoint.tooltipPosition();

          //draw line
          const halfHeight = height / 2;
          const halfWidth = width / 2;

          const xLine = x >= halfWidth ? x + 15 : x - 15;
          const yLine = y >= halfHeight ? y + 15 : y - 15;
          const extraLine = x >= halfWidth ? 15 : -15;

          //line
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(xLine, yLine);
          ctx.lineTo(xLine + extraLine, yLine);
          ctx.strokeStyle = dataset?.borderColor[index];
          ctx.stroke();

          //text
          const textWidth = ctx.measureText(dataset.data[index]).width;
          ctx.font = "12px Arial";

          //control the position
          const textXPosition = x >= halfWidth ? "left" : "right";
          const plusFivePx = x >= halfWidth ? 5 : -5;
          ctx.textAlign = textXPosition;
          ctx.textBaseline = "middle";
          ctx.fillStyle = dataset?.borderColor[index];
          ctx.fillText(
            formatCurrency(dataset.data[index], "USD"),
            xLine + extraLine + plusFivePx,
            yLine
          );
        });
      });
    },
  };

  const config: ChartOptions<"doughnut"> = {
    cutout: "90%",
    // responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 30,
        bottom: 15,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 25,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
        // borderRadius: 10,
      },
    },
  };

  return (
    <>
      <Doughnut data={dataDoughnut} options={config} plugins={[doughnutLabelsLine]} />
    </>
  );
}
export default DoughnutChart;
