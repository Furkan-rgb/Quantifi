import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import { getStakingMultiplier, StakingProps } from "../utils/stakingUtils";
import { BigNumber, ethers } from "ethers";
import Spinner from "../animations/Spinner";

function Staking({ balance, stake }: StakingProps) {
  const [stakeMultiplier, setStakeMultiplier] = useState<number>(0);
  const [stakeAmountQNTFI, setStakeAmountQNTFI] = useState<number | null>(null);
  const [stakeAmountDays, setStakeAmountDays] = useState<number | null>(null);
  const [swapButtonText, setSwapButtonText] = useState<string>("Stake");
  const [touched, setTouched] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.info("Balance: " + balance.toString());
  }, [balance]);

  async function handleStake() {
    if (stakeAmountQNTFI === null || stakeAmountDays === null) {
      console.log("stakeAmountQNTFI or stakeAmountDays is undefined");
      return;
    }
    if (stakeAmountQNTFI <= 0 || stakeAmountDays <= 0) {
      console.log("stakeAmountQNTFI or stakeAmountDays is <= 0");
      return;
    }
    if (stakeAmountQNTFI > +balance) {
      console.log("stakeAmountQNTFI > balance");
      return;
    }

    setLoading(true);
    try {
      console.log("sending stake request");
      await stake(stakeAmountQNTFI, stakeAmountDays);
    } catch (e) {
      console.log("error staking: ", e);
    } finally {
      console.log("done stake request");
      setStakeAmountDays(null);
      setStakeAmountQNTFI(null);
      setTouched(false);
      setLoading(false);
      console.log("loading", loading);
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Stake QNTFI
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Stake */}
        <div className="col-span-3 lg:col-span-3">
          <div className="flex w-full flex-col items-center justify-start bg-white p-4 text-black sm:mx-auto sm:max-w-md sm:px-4 md:rounded-lg md:shadow-md">
            {/* Input */}
            <div className="my-5 w-full">
              <form onSubmit={handleStake}>
                <div className="group relative z-0 mb-4 flex w-full">
                  <input
                    onChange={(e) => {
                      setStakeAmountQNTFI(e.target.valueAsNumber);
                    }}
                    value={stakeAmountQNTFI || ""}
                    type="number"
                    name="floating_input"
                    id="floating_input"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
                    required
                  />
                  <label
                    htmlFor="floating_input"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-300 peer-focus:dark:text-blue-500"
                  >
                    {balance.lt(0) ? (
                      "Loading..."
                    ) : (
                      <span>Available: {(+ethers.utils.formatUnits(balance, 18)).toFixed(2)}</span>
                    )}
                  </label>

                  <span className="peer inline-flex appearance-none items-center border-0 border-b-2 border-gray-300 px-3 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                    QNTFI
                  </span>
                </div>
                <div className="pb-2">
                  <div>
                    <div className="group relative z-0 mb-4 flex w-full">
                      <input
                        onChange={(e) => {
                          if (e.target.valueAsNumber >= 0) {
                            setStakeAmountDays(e.target.valueAsNumber);
                          } else {
                            setStakeAmountDays(null);
                          }
                          setTouched(true);
                        }}
                        type="number"
                        name="floating_input"
                        id="floating_input"
                        value={stakeAmountDays || ""}
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600  dark:focus:border-blue-500"
                        required
                      />{" "}
                      <label
                        htmlFor="floating_input"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-300 peer-focus:dark:text-blue-500"
                      >
                        Days to stake
                      </label>
                      <span className="peer inline-flex appearance-none items-center border-0 border-b-2 border-gray-300 px-3 text-sm text-black focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500">
                        Days
                      </span>
                    </div>
                    {touched && stakeAmountDays && stakeAmountDays < 7 && (
                      <p className="visible font-light text-red-700 peer-invalid:visible">
                        Minimum days to stake is: 7 Days
                      </p>
                    )}
                  </div>
                </div>
                {
                  <div className="mb-4">
                    Staking Multiplier: {stakeAmountDays && getStakingMultiplier(stakeAmountDays)}x
                  </div>
                }
                <button
                  type="submit"
                  disabled={loading || !stakeAmountDays || stakeAmountDays < 7}
                  onClick={() => {
                    handleStake();
                  }}
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white transition duration-200 ease-in-out  hover:bg-blue-800 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {loading ? <Spinner height={18} width={18} /> : swapButtonText}
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
