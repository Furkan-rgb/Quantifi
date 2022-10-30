import { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import Barchart from "../components/Dashboard/Barchart";
import Doughnut from "../components/Dashboard/Doughnut";
import Linechart from "../components/Dashboard/Linechart";
import "chartjs-adapter-date-fns";

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
  const [qitData, setQitData] = useState<dashboardData>();
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
  }, [qitData]);

  const [chartDate, setChartDate] = useState(7);
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
      <div className="flex justify-center py-4 text-black">
        <div className="grid self-center max-w-5xl min-h-screen grid-cols-2 gap-4 p-4 text-black">
          <div className="col-span-2 bg-white rounded-lg dark:bg-slate-100 sm:col-span-1">
            <Doughnut></Doughnut>
          </div>
          <div className="col-span-2 p-3 bg-white rounded-lg dark:bg-slate-100 sm:col-span-1">
            <Barchart data={barData as ChartData<"bar">} config={config}></Barchart>
          </div>
          <div className="col-span-2 p-3 bg-white rounded-lg dark:bg-slate-100">
            <div>
              <button
                onClick={() => {
                  setChartDate(7);
                }}
                className={`rounded-md px-2 ${chartDate === 7 ? "border border-black" : ""}`}
              >
                Week
              </button>
              <button
                onClick={() => {
                  setChartDate(30);
                }}
                className={`rounded-md px-2 ${chartDate === 30 ? "border border-black" : ""}`}
              >
                Month
              </button>
              <button
                onClick={() => {
                  setChartDate(180);
                }}
                className={`rounded-md px-2 ${chartDate === 180 ? "border border-black" : ""}`}
              >
                3 Months
              </button>
              <button
                onClick={() => {
                  setChartDate(365);
                }}
                className={`rounded-md px-2 ${chartDate === 365 ? "border border-black" : ""}`}
              >
                Year
              </button>
              <button
                onClick={() => {
                  setChartDate(0);
                }}
                className={`rounded-md px-2 ${chartDate === 0 ? "border border-black" : ""}`}
              >
                Lifetime
              </button>
            </div>
            <Linechart title="Daily Prices" data={lineData} config={dailyPriceConfig}></Linechart>
          </div>

          {/* Nr of investors */}
          <div className="flex flex-col items-center justify-center w-full col-span-1 px-4 py-5 overflow-hidden text-center bg-white rounded-lg shadow dark:bg-slate-100 sm:flex sm:flex-col sm:p-6">
            <dt className="text-sm font-medium text-gray-500 text-clip">{"Number of Investors"}</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {qitData?.numInvestors}
            </dd>
          </div>

          {/* Avg investment into fund */}
          <div className="flex flex-col items-center justify-center w-full col-span-1 px-4 py-5 overflow-hidden text-center bg-white rounded-lg shadow dark:bg-slate-100 sm:flex sm:flex-col sm:p-6">
            <dt className="text-sm font-medium text-gray-500 text-clip">
              {"Avg. Investment into Fund"}
            </dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {qitData?.averageHolding}
            </dd>
          </div>

          <div className="col-span-2 p-3 bg-white rounded-lg dark:bg-slate-100">
            <Linechart data={lineData} config={dailyPriceConfig}></Linechart>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
