import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions } from "chart.js";

function DoughnutChart() {
  const totalValueLocked = 609428342;
  const totalDeposit = 60113801;
  const totalCollateral = 2314474;
  const dataDoughnut = {
    labels: ["Total Deposit", "Total Collateral"],
    datasets: [
      {
        label: "Total Value Locked",
        data: [totalDeposit, totalCollateral],
        backgroundColor: ["rgb(75, 194, 216)", "rgb(238, 117, 156)"],
        hoverOffset: 4,
      },
    ],
  };

  const config: ChartOptions<"doughnut"> = {
    cutout: "90%",
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <>
      <div className="grid items-center h-full grid-cols-6">
        {/* Total Value Locked */}
        <div className="flex justify-between h-10 col-span-6">
          <span>Current Total Value Locked</span>
          <span className="text-2xl subpixel-antialiased font-medium">{totalValueLocked} UST</span>
        </div>

        {/* Doughnut */}
        <div className="col-span-3 ">
          <Doughnut data={dataDoughnut} options={config} width={200} height={300} />
        </div>

        {/* Stats */}
        <div className="col-span-3 justify-self-end ">
          <div>
            <div className="inline-block">$ {totalDeposit}</div>
          </div>

          <div>
            <div className="inline-block">$ {totalCollateral}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoughnutChart;
