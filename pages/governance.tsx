import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
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
            {/* Swap Card */}
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                <div className="px-4 py-8 sm:px-10">
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center justify-start w-full max-w-md px-4 my-10 text-black ">
                      {/* Tab Section */}
                      <div className="grid grid-cols-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <div className="col-span-1">
                          <button
                            onClick={() => {
                              setCurrentTab("deposit");
                              resetOutputValue("deposit");
                            }}
                            className={`${
                              currentTab == "deposit"
                                ? "active inline-block  rounded-t border-b-2  border-gray-900 p-4 text-gray-900"
                                : "inline-block rounded-t  p-4 "
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
                                ? "active inline-block  rounded-t-lg  border-b-2  border-gray-900 p-4 text-gray-900"
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

                      {/* Input */}
                      <div className="w-full my-5">
                        <form>
                          <div className="relative z-0 flex w-full mb-6 group">
                            <input
                              type="number"
                              name="floating_input"
                              id="floating_input"
                              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="floating_input"
                              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-900 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                            >
                              From
                            </label>

                            <span className="inline-flex items-center px-3 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none peer focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                              {currentTab == "withdrawal" ? "QNTFI" : "QIT"}
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
                              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
                              placeholder=" "
                              disabled
                            />
                            <label
                              htmlFor="floating_output"
                              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-900 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
                            >
                              To {outputValue}
                            </label>

                            <span className="inline-flex items-center px-3 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none peer focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                              {currentTab == "deposit" ? "QNTFI" : "QIT"}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              // swapOrApprove();
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
            </div>
          </div>
        </div>
      </main>
      <div className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your staked QNTFI
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat
              laudantium.
            </p>
          </div>
        </div>
        {/* Section 2 */}
        <div className="pb-12 mt-10 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="bg-white rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                      Your staked QNTFI
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
                  {/* Buttons */}
                  <div className="flex content-center justify-center p-6 text-center border-t border-gray-100 sm:border-0 sm:border-l">
                    <div className="flex flex-col content-center w-full max-w-md">
                      {/* Stake button */}
                      <button className="relative mb-3 w-full rounded-lg  bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white   focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <div className="absolute inset-0 w-full rounded-lg  bg-gradient-to-r  from-green-500 to-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white opacity-0 transition duration-200 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-300 ">
                          Stake
                        </div>
                        Stake
                      </button>
                      {/* Unstake button */}
                      <button
                        type="button"
                        className="relative w-full rounded-lg bg-blue-700 bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-center text-sm font-medium text-white"
                      >
                        <div className="absolute inset-0 w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500  px-5 py-2.5 text-center text-sm font-medium text-white opacity-0 transition duration-200 hover:bg-blue-800 hover:from-pink-500 hover:to-yellow-500 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          Unstake
                        </div>
                        Unstake
                      </button>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-4 bg-white">
          <div className="w-full max-w-6xl pb-6 text-center">
            <h2 className="mt-1 mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
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
