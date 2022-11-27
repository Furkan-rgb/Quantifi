import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import Linechart from "../components/Dashboard/Linechart";
import Staking from "../components/Dividends/Staking";
import Proposals from "../components/Governance/Proposals";

// our-domain.com/governance
function GovernancePage() {
  const [currentTab, setCurrentTab] = useState<string>("deposit");
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>();
  const [swapButtonText, setSwapButtonText] = useState<string>("Loading...");
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  // Returns swap button with correct body text based on input value
  function changeSwapButtonText() {
    if (inputValue == "") {
      setSwapButtonText("Enter Amount");
    }
    if (inputValue !== "") {
      if (currentTab === "withdrawal") {
        setSwapButtonText("Swap QIT for QNTFI");
      } else if (currentTab === "deposit") {
        setSwapButtonText("Give permission to deposit QIT");
      } else {
        setSwapButtonText("Swap QNTFI for QIT");
      }
    }
  }

  function resetOutputValue(_currentTab: string) {
    if (_currentTab === currentTab) {
      return;
    }
    setOutputValue("");
  }

  // Keeps track of input value to update swap button text
  useEffect(() => {
    changeSwapButtonText();
  }, [inputValue]);

  // Line chart stuff
  const labels = new Array(7).fill(0).map((_, i) => `Day ${i + 1}`);
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const lineChartConfig: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: false,
          color: "white",
        },
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
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
        font: {
          weight: "medium",
        },
        color: "white",
        display: true,
        text: "QNTFI Price History",
      },
    },
  };

  const dividendsContent = {
    title: "Dividends",
    QNTFIToken: [
      { title: "Current Price", value: "2.57 USDT", type: "statistic" },
      { title: "Total Staked", value: "12%", type: "statistic" },
      {
        title: "Price History",
        value: <Linechart data={lineChartData} config={lineChartConfig} />,
        type: "chart",
      },
    ],
    YourDividends: [
      { title: "Next Dividend", value: "20220824T000000+0200", type: "date" },
      { title: "Claimable Dividends", value: "0.00 USDT", type: "statistic" },
      { title: "Claim", value: true, type: "toggle" },
    ],
    NextDividend: [
      {
        title: "Current Period",
        value: { from: "20220701T000000+0200", until: "20220930T000000+0200" },
        type: "date",
      },
      { title: "Fees Collected", value: "25 USDT", type: "statistic" },
      { title: "Dividend Ex-Date", value: "20220616T000000+0200", type: "date" },
      { title: "Claimable After", value: "20220414T000000+0200", type: "date" },
    ],
    DividendHistory: [],
  };

  return (
    <>
      <main className="mt-16 sm:my-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  QNTFI is the governance token
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-xl xl:text-2xl">
                  of the Quantifi Decentralized Investment Fund
                </p>
                <div className="flex justify-start sm:justify-center lg:justify-start">
                  <button className="mt-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] px-8 py-3 text-base font-medium text-white transition-all duration-75 ease-in hover:opacity-80 md:py-4 md:px-10 md:text-lg">
                    <a href="#">Get started</a>
                  </button>
                </div>
              </div>
            </div>
            {/* Linechart */}
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <div className="px-4 pb-4 sm:mx-auto sm:w-full sm:max-w-lg sm:overflow-hidden">
                <Linechart data={lineChartData} config={lineChartConfig} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your staked QNTFI
            </h2>
          </div>
        </div>
        {/* Section 2 */}
        <div className="pb-12 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="bg-white rounded-lg shadow-lg sm:grid sm:grid-cols-2">
                  <div className="flex flex-col p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                      Total QNTFI staked
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                      12 QNTFI
                    </dd>
                  </div>
                  <div className="flex flex-col p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                      Your Staked Weight
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                      0.75%
                    </dd>
                  </div>
                </dl>
              </div>
              <Staking />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-4 bg-white">
          <div className="w-full max-w-6xl pb-6 text-center">
            <h2
              id="proposals"
              className="mt-1 mb-4 text-4xl font-bold tracking-tight text-gray-900 -scroll-mt-60 sm:text-5xl"
            >
              Proposals
            </h2>
            <Proposals />
          </div>
        </div>
      </div>
    </>
  );
}

export default GovernancePage;
