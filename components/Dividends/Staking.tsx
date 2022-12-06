import { ArrowDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import DatePicker from "../DatePicker";
import { getStakingMultiplier } from "../../components/utils/stakingUtils";

function Staking() {
  const [stakeMultiplier, setStakeMultiplier] = React.useState<number>(0);
  const [stakeAmountQNTFI, setStakeAmountQNTFI] = React.useState<number>(0);
  const [stakeAmountDays, setStakeAmountDays] = React.useState<number>(0);
  const [swapButtonText, setSwapButtonText] = React.useState<string>("Stake");
  const [touched, setTouched] = React.useState<boolean>(false);

  return (
    <div>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Stake QNTFI
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Stake */}
        <div className="col-span-3 lg:col-span-3">
          <div className="flex flex-col items-center justify-start w-full p-4 text-black bg-white sm:mx-auto sm:max-w-sm sm:px-4 md:rounded-lg md:shadow-md">
            {/* Input */}
            <div className="w-full max-w-sm my-5">
              <form>
                <div className="relative z-0 flex w-full mb-4 group">
                  <input
                    onChange={(e) => {
                      setStakeAmountQNTFI(e.target.valueAsNumber);
                    }}
                    type="number"
                    name="floating_input"
                    id="floating_input"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
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
                    QNTFI
                  </span>
                </div>
                <div className="pb-2">
                  <div>
                    <div className="relative z-0 flex w-full mb-4 group">
                      <input
                        onChange={(e) => {
                          setStakeAmountDays(e.target.valueAsNumber), setTouched(true);
                        }}
                        type="number"
                        name="floating_input"
                        id="floating_input"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
                        placeholder=" "
                        required
                        min={7}
                      />{" "}
                      <label
                        htmlFor="floating_input"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-300 peer-focus:dark:text-blue-500"
                      >
                        Days to stake
                      </label>
                      <span className="inline-flex items-center px-3 text-sm text-black border-0 border-b-2 border-gray-300 appearance-none peer focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                        Days
                      </span>
                    </div>
                    {touched && stakeAmountDays < 7 && (
                      <p className="visible font-light text-red-700 peer-invalid:visible">
                        Minimum days to stake is: 7 Days
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  Staking Multiplier: {getStakingMultiplier(stakeAmountDays)}x
                </div>
                <button
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
