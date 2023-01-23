import { ArrowDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import USDTIcon from "../icons/USDTIcon";
import Image from "next/image";

function SwapCard({
  currentTab,
  setCurrentTab,
  setInputValue,
  resetOutputValue,
  outputValue,
  getDepositValue,
  getWithdrawalValue,
  swapOrApprove,
  swapButtonText,
  USDTBalance,
  QITBalance,
}: {
  currentTab: string;
  setCurrentTab: Function;
  setInputValue: Function;
  resetOutputValue: Function;
  outputValue: string | undefined;
  getDepositValue: Function;
  getWithdrawalValue: Function;
  swapOrApprove: Function;
  swapButtonText: string;
  USDTBalance: number | string;
  QITBalance: number | string;
}) {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-md px-4 my-10 text-black bg-gray-800 rounded-md">
      {/* Header */}
      <div className="w-full prose">
        <h3 className="flex items-center justify-start w-full mt-4 mb-0 text-gray-50">
          {currentTab === "deposit" ? "Enter the Fund" : "Exit the Fund"}
        </h3>
        <p className="flex items-center justify-start w-full text-gray-50">
          {currentTab === "deposit"
            ? "Swap USDT for Quantifi Investor Tokens"
            : "Swap Quantifi Investor Tokens for USDT"}
        </p>
      </div>
      {/* End Header */}
      <div className="w-full mt-3 border-b-2 opacity-50 border-slate-400"></div>
      {/* Tab Section */}
      <div className="grid grid-cols-2 mt-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <div className="col-span-1">
          <button
            onClick={() => {
              setCurrentTab("deposit");
              resetOutputValue("deposit");
            }}
            className={`${
              currentTab == "deposit"
                ? "active inline-block  rounded-t-lg  border-b-2  border-gray-100 p-4 text-gray-100"
                : "inline-block rounded-t-lg  p-4 "
            } w-full text-center font-normal transition duration-200 ease-in-out`}
          >
            <div
              className={`${
                currentTab == "deposit" ? "-translate-y-1" : ""
              } transition duration-200 ease-in-out`}
            >
              Deposit
            </div>
          </button>
        </div>
        <div className="col-span-1">
          <button
            onClick={() => {
              setCurrentTab("withdrawal");
              resetOutputValue("withdrawal");
            }}
            className={`${
              currentTab == "withdrawal"
                ? "active inline-block  rounded-t-lg  border-b-2  border-gray-100 p-4 text-gray-100"
                : "inline-block rounded-t-lg  p-4 "
            } w-full text-center font-normal transition duration-200 ease-in-out`}
          >
            <div
              className={`${
                currentTab == "withdrawal" ? "-translate-y-1" : ""
              } transition duration-200 ease-in-out`}
            >
              Withdrawal
            </div>
          </button>
        </div>
      </div>
      {/* End Tab Section */}

      {/* Input */}
      <div className="w-full my-5">
        <form>
          {/* Top section */}
          {/* From */}
          <div className="flex justify-between p-2 pb-0 bg-gray-600 rounded-t-md">
            <label className="text-sm text-gray-300 ">From</label>
            <label className="text-sm text-gray-300 ">
              Balance:{" "}
              <span>
                {currentTab === "deposit"
                  ? USDTBalance
                    ? USDTBalance
                    : 0
                  : QITBalance
                  ? QITBalance
                  : 0}
              </span>
            </label>
          </div>
          <div className="relative z-0 flex w-full mb-4 bg-gray-600 group rounded-b-md">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
                currentTab === "deposit"
                  ? getDepositValue(e.target.value)
                  : getWithdrawalValue(e.target.value);
              }}
              type="number"
              min={10}
              max={
                currentTab === "deposit"
                  ? USDTBalance
                    ? USDTBalance
                    : 0
                  : QITBalance
                  ? QITBalance
                  : 0
              }
              name="floating_input"
              id="floating_input"
              className="peer block w-full appearance-none items-center border-0 border-b-0 border-gray-300 bg-transparent py-2.5 px-0 pl-2 text-sm text-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />

            <span className="inline-flex items-center px-3 text-sm text-white border-0 border-b-0 border-gray-300 appearance-none peer whitespace-nowrap focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
              {currentTab == "withdrawal" ? (
                <Image src="/icons/quantifi_icon.png" width={24} height={29} />
              ) : (
                <USDTIcon width="22px" />
              )}
              {currentTab == "withdrawal" ? (
                <span className="ml-1">QIT</span>
              ) : (
                <span className="ml-1">USDT</span>
              )}
            </span>
          </div>

          {/* Arrow Down Icon */}
          <div className="flex justify-center">
            <ArrowDownIcon className="p-1 text-black rounded-full h-7 w-7 bg-gray-50" />
          </div>

          {/* Output */}
          <div className="flex justify-between p-2 pb-0 mt-4 bg-gray-600 rounded-t-md">
            <label className="text-sm text-gray-300 ">To</label>
          </div>
          <div className="relative z-0 flex w-full mb-6 bg-gray-600 group rounded-b-md">
            <input
              type="number"
              name="floating_output"
              id="floating_output"
              className="peer block w-full appearance-none border-0 border-b-0 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              disabled
            />
            <label
              htmlFor="floating_output"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform pl-2 text-sm text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-300 peer-focus:dark:text-blue-500"
            >
              {outputValue}
            </label>

            <span className="inline-flex items-center px-3 text-sm text-white border-0 border-b-0 border-gray-300 appearance-none peer whitespace-nowrap focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-50">
              {currentTab == "deposit" ? (
                <Image src="/icons/quantifi_icon.png" width={24} height={29} />
              ) : (
                <USDTIcon width="22px" />
              )}
              <span className="ml-1">{currentTab == "deposit" ? "QIT" : "USDT"}</span>
            </span>
          </div>
          <button
            onClick={() => {
              swapOrApprove();
            }}
            type="button"
            className="w-full  rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            {swapButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SwapCard;
