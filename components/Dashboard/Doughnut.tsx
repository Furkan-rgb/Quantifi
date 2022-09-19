import { Doughnut } from "react-chartjs-3";

function DoughnutChart() {
  const dataDoughnut = {
    labels: ["Total Deposit", "Total Collateral"],
    datasets: [
      {
        label: "Total Value Locked",
        data: [700, 50],
        backgroundColor: ["rgb(75, 194, 216)", "rgb(238, 117, 156)"],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const configDoughnut = {
    type: "doughnut",
    data: dataDoughnut,
    legend: {
      display: true,
      position: "right",
      labels: {
        usePointStyle: true,
        boxWidth: 6,
      },
    },
    cutoutPercentage: 90,
  };

  return (
    <>
      <div className="grid items-start h-full grid-cols-6">
        {/* Total Value Locked */}
        <div className="flex justify-between h-10 col-span-6">
          <span>Current Total Value Locked</span>
          <span className="text-2xl subpixel-antialiased font-medium">609,428,342 UST</span>
        </div>

        {/* Doughnut */}
        <div className="col-span-3 ">
          <Doughnut data={dataDoughnut} options={configDoughnut} width={200} height={300} />
        </div>

        {/* Stats */}
        <div className="justify-between col-span-3">
          <div>
            <div className="inline-block">Total Deposit</div>
            <div className="inline-block">$ 607,113,801</div>
          </div>

          <div>
            <div className="inline-block">Total Collateral</div>
            <div className="inline-block">$ 2,314,474</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoughnutChart;
