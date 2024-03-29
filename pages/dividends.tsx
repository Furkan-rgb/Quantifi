import { ChartOptions } from "chart.js";
import React, { useEffect } from "react";
import Linechart from "../components/Dashboard/Linechart";
import { XMarkIcon } from "@heroicons/react/24/solid";

function DividendsPage() {
  const [showBanner, toggleBanner] = React.useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("hideBanner") === "true") {
        toggleBanner(false);
        return;
      }
      if (localStorage.getItem("hideBanner") === "false") {
        toggleBanner(true);
        return;
      }
      localStorage.setItem("hideBanner", "false");
    }
  }, [showBanner]);

  return (
    <>
      <div className={`${showBanner ? "" : "hidden"} relative bg-gray-800`}>
        <div
          className={`${
            showBanner ? "" : "hidden"
          } absolute top-0 right-0 mt-2 mr-4 cursor-pointer text-white`}
          onClick={() => {
            toggleBanner(false);
            localStorage.setItem("hideBanner", "true");
          }}
        >
          <XMarkIcon className="h-6 w-6" />
        </div>
        <div className="sm:py-18 mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:flex lg:justify-between lg:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl lg:text-2xl">
              About Dividends
            </h1>
            <p className="text-md my-5 text-gray-400 sm:text-lg">
              The Quantifi Investor Fund offers dividends to all stakers. Stakers of the QNTFI token
              are elligible to receive dividends from fees collected by Quantifi's products. Staking
              can be done through the Governance page.
            </p>
            <a href="/governance" className="text-xl text-gray-300 hover:text-white">
              Go to Governance
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white p-6">
        <div className="grid min-h-screen w-full grid-cols-12 gap-4 text-center sm:max-w-7xl">
          <h1 className="col-span-12 mt-0 mb-6 text-start text-3xl font-semibold">
            Upcoming Dividends
          </h1>
          <p>There are currently no scheduled dividends</p>
        </div>
      </div>
    </>
  );
}

export default DividendsPage;
