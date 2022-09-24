import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart, ChartData, ChartDataset, ChartOptions } from "chart.js";

// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function DoughnutChart() {
  // Center of doughnut chart
  const totalValueLocked = 609428342;

  const totalDeposit = 60113801;
  const totalCollateral = 2314474;
  const dataDoughnut = {
    labels: ["Total Deposit", "Total Collateral"],
    datasets: [
      {
        label: "Total Value Locked",
        data: [totalDeposit, totalCollateral],
        backgroundColor: ["rgb(135, 217, 233)", "rgb(230, 163, 183)"],
        borderColor: ["rgb(73, 208, 235)", "rgb(242, 121, 157)"],
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
          console.log(dataset);
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
          console.log(textWidth);
          ctx.font = "12px Arial";

          //control the position
          const textXPosition = x >= halfWidth ? "left" : "right";
          const plusFivePx = x >= halfWidth ? 5 : -5;
          ctx.textAlign = textXPosition;
          ctx.textBaseline = "middle";
          ctx.fillStyle = dataset?.borderColor[index];
          ctx.fillText(
            formatter.format(dataset.data[index]),
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
          padding: 20,
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
      <div className="grid items-center justify-center h-full grid-cols-6 p-4">
        {/* Total Value Locked */}
        <div className="flex flex-col justify-center h-10 col-span-6 ">
          <div className="text-center text-gray-500">Current Total Value Locked</div>
          <div className="text-2xl subpixel-antialiased font-medium text-center">
            {formatter.format(totalValueLocked)} UST
          </div>
        </div>

        {/* Doughnut */}
        <div className="flex justify-center col-span-6">
          <div>
            <Doughnut
              data={dataDoughnut}
              options={config}
              plugins={[doughnutLabelsLine]}
              height={300}
            />
          </div>
        </div>
        {/* Stats */}
        {/* <div className="col-span-2 text-right justify-self-end">
          <div>
            <div className="inline-block">$ {totalDeposit}</div>
          </div>

          <div>
            <div className="inline-block">$ {totalCollateral}</div>
          </div>
        </div> */}
      </div>
    </>
  );
}
export default DoughnutChart;
