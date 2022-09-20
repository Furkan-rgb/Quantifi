import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function DoughnutChart() {
  const totalValueLocked = 609428342;
  const tDeposit = 60113801;
  const tCollateral = 2314474;
  const dataDoughnut = {
    labels: ["Total Deposit", "Total Collateral"],
    datasets: [
      {
        label: "Total Value Locked",
        data: [tDeposit, tCollateral],
        backgroundColor: ["rgb(75, 194, 216)", "rgb(238, 117, 156)"],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    cutout: "90%",
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
            <div className="inline-block">$ {tDeposit}</div>
          </div>

          <div>
            <div className="inline-block">$ {tCollateral}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoughnutChart;
