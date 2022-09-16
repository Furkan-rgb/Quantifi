import { Doughnut } from "react-chartjs-3";

function DoughnutChart() {
  const dataDoughnut = {
    labels: ["Total Deposit", "Total Collateral"],
    datasets: [
      {
        label: "Total Value Locked",
        data: [700, 50],
        backgroundColor: ["rgb(133, 105, 241)", "rgb(164, 101, 241)"],
        hoverOffset: 4,
      },
    ],
  };

  const configDoughnut = {
    type: "doughnut",
    data: dataDoughnut,
    options: {},
  };

  return (
    <>
      <div className="grid items-start h-full grid-cols-6 grid-rows-5">
        {/* Total Value Locked */}
        <div className="flex justify-between h-10 col-span-6 bg-purple-200 row-span-auto">
          <span>Current Total Value Locked</span>
          <span>609,428,342 UST</span>
        </div>

        {/* Doughnut */}
        <div className="col-span-3 row-span-4">
          <Doughnut data={dataDoughnut} options={configDoughnut} />
        </div>

        {/* Stats */}
        <div className="justify-between col-span-3">
          <div className="inline-block">Total Deposit</div>
          <div className="inline-block">$ 607,113,801</div>

          <div className="inline-block">Total Collateral</div>
          <div className="inline-block">$ 2,314,474</div>
        </div>
      </div>
    </>
  );
}
export default DoughnutChart;
