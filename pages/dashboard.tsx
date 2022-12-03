import { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import Barchart from "../components/Dashboard/Barchart";
import Doughnut from "../components/Dashboard/Doughnut";
import Linechart from "../components/Dashboard/Linechart";
import "chartjs-adapter-date-fns";
import { formatCurrency } from "../components/utils/formatter";

type dashboardData = {
  averageHolding: number;
  dailyPriceDates: priceDate[];
  monthlyPriceDates: priceDate[];
  netDeposits: number;
  numInvestors: number;
  profits: object;
};

type priceDate = {
  date: string;
  price: number;
};

function Dashboard() {
  const totalValueLocked = 609428342;

  const [qitData, setQitData] = useState<dashboardData>();
  const [chartDate, setChartDate] = useState(7);
  const [lineData, setLineData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [barData, setBarData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  async function getQitData() {
    try {
      const res = await fetch(`https://rgtestnet.pythonanywhere.com/api/v1/qit`, {});
      const data = await res.json();
      // console.log(data);
      setQitData(data);
      console.log(qitData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getQitData();
  }, []);

  useEffect(() => {
    if (!qitData) {
      console.log("No dashboard data");
      return;
    }
    // Line chart
    setLineData({
      labels: qitData?.dailyPriceDates.map((item) => item.date).slice(-chartDate),
      datasets: [
        {
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "rgba(235,237,255,1)");
            gradient.addColorStop(1, "rgba(235,237,255,0)");
            return gradient;
          },
          label: "UST",
          fill: "start",
          borderColor: "#8E95DF",
          data: qitData.dailyPriceDates.map((item) => item.price).slice(-chartDate),
        },
      ],
    });

    // Barchart
    setBarData({
      labels: qitData?.monthlyPriceDates.map((item) => item.date),
      datasets: [
        {
          label: "Price of QIT",
          data: qitData?.monthlyPriceDates.map((i) => i.price),
          backgroundColor: [
            "rgba(220, 218, 251)",
            "rgba(253, 147, 128)",
            "rgba(220, 218, 251)",
            "rgba(253, 147, 128)",
            "rgba(220, 218, 251)",
            "rgba(253, 147, 128)",
            "rgba(220, 218, 251)",
            "rgba(253, 147, 128)",
            "rgba(220, 218, 251)",
            "rgba(253, 147, 128)",
            "rgba(220, 218, 251)",
            "rgba(253, 147, 128)",
          ],
          borderWidth: 1,
        },
      ],
    });
    console.log(barData);
  }, [qitData, chartDate]);

  const config: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Price of QIT",
      },
    },
  };
  const dailyPriceConfig: ChartOptions<"line"> = {
    responsive: true,
    elements: {
      line: {
        tension: 0.2,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      filler: {},
    },
  };

  return (
    <>
      <div className="flex justify-center w-screen h-screen text-black">
        <div className="grid self-center grid-cols-2 gap-4 p-3 text-black min-w-fit max-w-7xl">
          {/* Doughnut */}
          <div className="col-span-2 pt-2 bg-white rounded-lg dark:bg-slate-50 sm:col-span-1">
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
              {/* Title */}
              <div className="flex flex-col justify-center ">
                <div className="text-center text-gray-500">Current Total Value Locked</div>
                <div className="text-2xl subpixel-antialiased font-medium text-center">
                  {formatCurrency(totalValueLocked, "USD")} UST
                </div>
              </div>
              <Doughnut />
            </div>
          </div>
          {/* Barchart, stats */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex flex-col justify-between h-full">
              <div className="grid gap-3 ">
                <div className="p-4 bg-white rounded-lg h-fit dark:bg-slate-50">
                  {barData.datasets[0].data.length !== 0 ? (
                    <Barchart data={barData} config={config}></Barchart>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <svg
                        className="inline w-4 h-4 mr-1 -ml-1 text-black animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <p className="inline-block">Loading chart data...</p>
                    </div>
                  )}
                </div>
                {/* Nr of investors */}
                <div className="flex flex-col items-center justify-center w-full col-span-1 px-4 py-5 overflow-hidden text-center bg-white rounded-lg shadow h-fit dark:bg-slate-50 sm:flex sm:flex-col sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 text-clip">
                    {"Number of Investors"}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                    {qitData?.numInvestors}
                  </dd>
                </div>

                {/* Avg investment into fund */}
                <div className="flex flex-col items-center justify-center w-full col-span-1 px-4 py-5 overflow-hidden text-center bg-white rounded-lg shadow h-fit dark:bg-slate-50 sm:flex sm:flex-col sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 text-clip">
                    {"Avg. Investment into Fund"}
                  </dt>
                  <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                    {qitData?.averageHolding}
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Line chart card */}
          <div className="col-span-2 p-4 text-center bg-white rounded-lg dark:bg-slate-50">
            <div className="mb-2 text-xl font-medium tracking-tight text-gray-500">
              Daily QNTFI Prices
            </div>

            {/* Line chart filter buttons */}
            <div className="grid grid-cols-6 text-sm text-center border rounded-lg dark:border-gray-700">
              <div
                onClick={() => {
                  setChartDate(1);
                }}
                className={`${
                  chartDate === 1 ? "bg-gray-200" : ""
                } cursor-pointer rounded-l-lg border-r p-1 hover:bg-gray-100 hover:text-indigo-500 dark:border-gray-700 dark:hover:bg-gray-900`}
              >
                24h
              </div>
              <div
                onClick={() => {
                  setChartDate(7);
                }}
                className={`${
                  chartDate === 7 ? "bg-gray-200" : ""
                } cursor-pointer border-r p-1 hover:bg-gray-100 hover:text-indigo-500 dark:border-gray-700 dark:hover:bg-gray-900`}
              >
                7d
              </div>
              <div
                onClick={() => {
                  setChartDate(14);
                }}
                className={`${
                  chartDate === 14 ? "bg-gray-200" : ""
                } cursor-pointer border-r p-1 hover:bg-gray-100 hover:text-indigo-500 dark:border-gray-700 dark:hover:bg-gray-900`}
              >
                14d
              </div>
              <div
                onClick={() => {
                  setChartDate(30);
                }}
                className={`${
                  chartDate === 30 ? "bg-gray-200" : ""
                } cursor-pointer border-r p-1 hover:bg-gray-100 hover:text-indigo-500 dark:border-gray-700 dark:hover:bg-gray-900`}
              >
                30d
              </div>
              <div
                onClick={() => {
                  setChartDate(90);
                }}
                className={`${
                  chartDate === 90 ? "bg-gray-200" : ""
                } cursor-pointer border-r p-1 hover:bg-gray-100 hover:text-indigo-500 dark:border-gray-700 dark:hover:bg-gray-900`}
              >
                90d
              </div>
              <div
                onClick={() => {
                  setChartDate(180);
                }}
                className={`${
                  chartDate === 180 ? " bg-gray-200" : ""
                } cursor-pointer rounded-r-lg p-1 hover:bg-gray-100 hover:text-indigo-500 dark:border-gray-900 dark:hover:bg-gray-900`}
              >
                180d
              </div>
            </div>

            {lineData.datasets[0].data.length !== 0 ? (
              <Linechart data={lineData} config={dailyPriceConfig}></Linechart>
            ) : (
              <div className="flex items-center justify-center w-full h-full py-4">
                <svg
                  className="inline w-4 h-4 mr-1 -ml-1 text-black animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="inline-block">Loading chart data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
