import { ChartOptions } from "chart.js";
import React from "react";
import Linechart from "../components/Dashboard/Linechart";

function DividendsPage() {
  const stats = [
    { name: "Total Subscribers", stat: "71,897" },
    { name: "Avg. Open Rate", stat: "58.16%" },
    { name: "Avg. Click Rate", stat: "24.57%" },
  ];

  const labels = new Array(7).fill(0).map((_, i) => `Day ${i + 1}`);
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const lineChartConfig: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
  };

  return (
    <div className="flex justify-center p-6 ">
      <div className="w-full min-h-screen sm:max-w-7xl">
        <div className="pb-8">
          <h3 className="text-xl font-medium leading-6 text-gray-100">QNTFI Token</h3>
          <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
            <Linechart data={lineChartData} config={lineChartConfig} />
          </div>
        </div>
        <div className="pb-8">
          <h3 className="text-lg font-medium leading-6 text-gray-100">Your Dividends</h3>
          <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="pb-8">
          <h3 className="text-lg font-medium leading-6 text-gray-100">Next Dividend</h3>
          <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="pb-8">
          <h3 className="text-lg font-medium leading-6 text-gray-100">Dividend History</h3>
          <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default DividendsPage;
