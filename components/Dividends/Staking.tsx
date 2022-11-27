import { ArrowDownIcon } from "@heroicons/react/24/outline";
import React from "react";

function Staking() {
  const [currentTab, setCurrentTab] = React.useState<string>("stake");
  function resetOutputValue(_currentTab: string) {
    if (_currentTab === currentTab) {
      return;
    }
    setOutputValue("");
  }
  const [inputValue, setInputValue] = React.useState<string>("");
  const [outputValue, setOutputValue] = React.useState<string>();
  const [swapButtonText, setSwapButtonText] = React.useState<string>("Loading...");
  function depositOrWithdrawal() {
    if (currentTab === "deposit") {
      return "Deposit";
    } else {
      return "Withdrawal";
    }
  }

  const staking = [
    {
      amount: "12 QNTFI",
      locked_date: "23 September 2023",
      locked_time: "23:59:59",
    },
  ];

  return (
    <div>
      <div className="grid max-w-6xl grid-cols-3 gap-4">
        {/* Table */}
        <div className="col-span-3 lg:col-span-2">
          <div className="flex flex-col mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full min-h-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full min-h-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Locked Until
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Locked Time
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {staking.map((staking) => (
                        <tr key={staking.amount}>
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                            {staking.amount}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {staking.locked_date}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {staking.locked_time}
                          </td>
                          <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Edit<span className="sr-only">, {staking.amount}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Deposit/withdraw */}
        <div className="col-span-3 lg:col-span-1">
          <div className="flex flex-col items-center justify-start w-full p-4 px-4 mt-8 text-black bg-white md:rounded-lg md:shadow-md">
            {/* Tab Section */}
            <div className="grid grid-cols-2 text-sm font-medium text-center text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400">
              <div className="col-span-1">
                <button
                  onClick={() => {
                    setCurrentTab("stake");
                    resetOutputValue("stake");
                  }}
                  className={`${
                    currentTab == "stake"
                      ? "active inline-block  rounded-t-lg  border-b-2  border-black p-4 text-black"
                      : "inline-block rounded-t-lg  p-4 "
                  } w-full text-center font-normal transition duration-200 ease-in-out`}
                >
                  <div
                    className={`${
                      currentTab == "stake" ? "-translate-y-1" : ""
                    } transition duration-200 ease-in-out`}
                  >
                    Stake
                  </div>
                </button>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => {
                    setCurrentTab("unstake");
                    resetOutputValue("unstake");
                  }}
                  className={`${
                    currentTab == "unstake"
                      ? "active inline-block  rounded-t-lg  border-b-2  border-black p-4 text-black"
                      : "inline-block rounded-t-lg  p-4 "
                  } w-full text-center font-normal transition duration-200 ease-in-out`}
                >
                  <div
                    className={`${
                      currentTab == "unstake" ? "-translate-y-1" : ""
                    } transition duration-200 ease-in-out`}
                  >
                    Unstake
                  </div>
                </button>
              </div>
            </div>
            {/* End Tab Section */}

            {/* Input */}
            <div className="w-full my-5">
              <form>
                <div className="relative z-0 flex w-full mb-6 group">
                  <input
                    onChange={(e) => {
                      setInputValue(e.target.value),
                        currentTab === "deposit"
                          ? console.log(e.target.value)
                          : console.log(e.target.value);
                    }}
                    type="number"
                    name="floating_input"
                    id="floating_input"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-300 peer-focus:dark:text-blue-500"
                  >
                    Available: 10QNTFI
                  </label>

                  <span className="inline-flex items-center px-3 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none peer focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                    {currentTab == "stake" ? "QNTFI" : "USDT"}
                  </span>
                </div>
                <div className="flex justify-center">
                  <ArrowDownIcon className="w-5 h-5 text-gray-400" />
                </div>

                {/* Output */}
                <div className="relative z-0 flex w-full mb-6 group">
                  <input
                    type="number"
                    name="floating_output"
                    id="floating_output"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                    placeholder=" "
                    disabled
                  />
                  <label
                    htmlFor="floating_output"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-300 peer-focus:dark:text-blue-500"
                  >
                    To {outputValue}
                  </label>

                  <span className="inline-flex items-center px-3 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none peer focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                    {currentTab == "unstake" ? "QNTFI" : "USDT"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    depositOrWithdrawal();
                  }}
                  type="button"
                  className="w-full  rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  {swapButtonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staking;
