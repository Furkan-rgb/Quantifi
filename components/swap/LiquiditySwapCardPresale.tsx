import { ArrowDownIcon } from "@heroicons/react/24/outline";
import React from "react";
// import USDTIcon from "../icons/USDTIcon";
import Image from "next/image";
import Spinner from "../animations/Spinner";

function SwapCard({
  loading,
  currentTab,
  setCurrentTab,
  inputValue,
  setInputValue,
  resetOutputValue,
  outputValue,
  getDepositValue,
  swapOrApprove,
  swapButtonText,
  USDTBalance,
}: {
  loading: boolean;
  currentTab: string;
  setCurrentTab: Function;
  inputValue: string | undefined;
  setInputValue: Function;
  resetOutputValue: Function;
  outputValue: string | undefined;
  getDepositValue: Function;
  swapOrApprove: Function;
  swapButtonText: string;
  USDTBalance: number | string;
}) {
  return (
    <div className="my-10 flex w-full max-w-md flex-col items-center justify-start bg-gray-800 px-4 text-black sm:rounded-md">
      {/* Header */}
      <div className="prose w-full">
        <h3 className="mt-4 mb-0 flex w-full items-center justify-start text-gray-50">
          {currentTab === "deposit" ? "Invest Into the QuantiFi Seed Funding Round" : "Exit the Fund"}
        </h3>
        <p className="flex w-full items-center justify-start text-gray-50">
          {currentTab === "deposit"
            ? "Swap USDT for Vested QNTFI Tokens"
            : "Swap Quantifi Investor Fund Tokens for USDT"}
        </p>
      </div>
      {/* End Header */}
      <div className="mt-3 w-full border-b-2 border-slate-400 opacity-50"></div>
      {/* Tab Section */}
      <div className="mt-3 grid grid-cols-2 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
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
        </div>
      </div>
      {/* End Tab Section */}

      {/* Input */}
      <div className="my-5 w-full">
        <form>
          {/* Top section */}
          {/* From */}
          <div className="-mb-1 flex justify-between rounded-t-md bg-gray-600 p-2 pb-1">
            <label className="text-sm text-gray-300 ">From</label>
            <label className="text-sm text-gray-300 ">
              Balance: <span>{USDTBalance}</span>
            </label>
          </div>
          <div className="group relative z-0 mb-4 flex w-full rounded-b-md bg-gray-600">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
                currentTab === "deposit"
                  ? getDepositValue(e.target.value)
                  : 0;
              }}
              type="number"
              min={10}
              max={USDTBalance
                             }
              name="floating_input"
              id="floating_input"
              className="peer block w-full appearance-none items-center border-0 border-b-0 border-gray-300 bg-transparent py-2.5 px-0 pl-2 text-sm text-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={inputValue}
            />

            <span className="peer inline-flex appearance-none items-center whitespace-nowrap border-0 border-b-0 border-gray-300 px-3 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
              <button
                className="mr-2 text-sm opacity-50 hover:opacity-100"
                type="button"
                onClick={() => {
                  currentTab === "deposit" ? setInputValue(USDTBalance) : setInputValue(0);
                  currentTab === "deposit"
                    ? getDepositValue(USDTBalance)
                    : 0;
                }}
              >
                Max
              </button>
              {currentTab == "withdrawal" ? (
                <Image
                  quality={100}
                  src="/quantifi_icon.png"
                  width={19}
                  height={23}
                  loading="eager"
                  layout="fixed"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="26px"
                  height="26px"
                >
                  <circle cx="24" cy="24" r="20" fill="#26a69a" />
                  <rect width="18" height="5" x="15" y="13" fill="#fff" />
                  <path
                    fill="#fff"
                    d="M24,21c-4.457,0-12,0.737-12,3.5S19.543,28,24,28s12-0.737,12-3.5S28.457,21,24,21z M24,26 c-5.523,0-10-0.895-10-2c0-1.105,4.477-2,10-2s10,0.895,10,2C34,25.105,29.523,26,24,26z"
                  />
                  <path
                    fill="#fff"
                    d="M24,24c1.095,0,2.093-0.037,3-0.098V13h-6v10.902C21.907,23.963,22.905,24,24,24z"
                  />
                  <path
                    fill="#fff"
                    d="M25.723,25.968c-0.111,0.004-0.223,0.007-0.336,0.01C24.932,25.991,24.472,26,24,26 s-0.932-0.009-1.387-0.021c-0.113-0.003-0.225-0.006-0.336-0.01c-0.435-0.015-0.863-0.034-1.277-0.06V36h6V25.908 C26.586,25.934,26.158,25.953,25.723,25.968z"
                  />
                </svg>
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
            <ArrowDownIcon className="h-7 w-7 rounded-full bg-gray-50 p-1 text-black" />
          </div>

          {/* Output */}
          <div className="mt-4 -mb-1 flex justify-between rounded-t-md bg-gray-600 p-2 pb-1">
            <label className="text-sm text-gray-300 ">To</label>
          </div>
          <div className="group relative z-0 mb-6 flex w-full rounded-b-md bg-gray-600">
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

            <span className="peer inline-flex appearance-none items-center whitespace-nowrap border-0 border-b-0 border-gray-300 px-3 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-50">
              {currentTab == "deposit" ? (
                <Image
                  quality={100}
                  src="/quantifi_icon.png"
                  width={19}
                  height={23}
                  loading="eager"
                  layout="fixed"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="26px"
                  height="26px"
                >
                  <circle cx="24" cy="24" r="20" fill="#26a69a" />
                  <rect width="18" height="5" x="15" y="13" fill="#fff" />
                  <path
                    fill="#fff"
                    d="M24,21c-4.457,0-12,0.737-12,3.5S19.543,28,24,28s12-0.737,12-3.5S28.457,21,24,21z M24,26 c-5.523,0-10-0.895-10-2c0-1.105,4.477-2,10-2s10,0.895,10,2C34,25.105,29.523,26,24,26z"
                  />
                  <path
                    fill="#fff"
                    d="M24,24c1.095,0,2.093-0.037,3-0.098V13h-6v10.902C21.907,23.963,22.905,24,24,24z"
                  />
                  <path
                    fill="#fff"
                    d="M25.723,25.968c-0.111,0.004-0.223,0.007-0.336,0.01C24.932,25.991,24.472,26,24,26 s-0.932-0.009-1.387-0.021c-0.113-0.003-0.225-0.006-0.336-0.01c-0.435-0.015-0.863-0.034-1.277-0.06V36h6V25.908 C26.586,25.934,26.158,25.953,25.723,25.968z"
                  />
                </svg>
              )}
              <span className="ml-1">{currentTab == "deposit" ? "QNTFI" : "USDT"}</span>
            </span>
          </div>
          <button
            disabled={loading}
            onClick={() => {
              swapOrApprove();
            }}
            type="button"
            className="flex w-full justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? <Spinner height={20} width={20} /> : swapButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SwapCard;
