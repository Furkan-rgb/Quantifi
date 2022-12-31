import { LockClosedIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface Stake {
  stakeDate: ethers.BigNumber;
  unlockDate: ethers.BigNumber;
  numTokens: ethers.BigNumber;
  weight: ethers.BigNumber;
}

export function Unstaking({
  totalStakes,
  getStake,
  setTotalStakedWeight,
  unstakeQNTFI,
}: {
  totalStakes: number;
  getStake: (account: string, idx: number) => Promise<Stake>;
  setTotalStakedWeight: (totalStakedWeight: number) => void;
  unstakeQNTFI: (id: number) => void;
}) {
  const [allStakes, setAllStakes] = useState<Stake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>("Loading stakes");
  const { account } = useWeb3React();

  // Get stake details
  useEffect(() => {
    if (!account) return;
    if (totalStakes === 0) return;
    // Reset stakes to empty array
    setAllStakes([]);
    const fetchStakes = async () => {
      let stakes = [];
      let totalWeight = 0;
      setLoading(true);
      // Loop through all stakes
      for (let i = 0; i < totalStakes; i++) {
        setLoadingText(`Loading stake ${i + 1} of ${totalStakes}`);
        const stake = await getStake(account, i);
        stakes.push(stake);
        totalWeight += parseFloat(stake?.weight?.toString());
      }
      setAllStakes(stakes);
      setTotalStakedWeight(totalWeight);
      setLoading(false);
    };
    fetchStakes();
  }, [totalStakes, getStake, account]);

  return (
    <div className="w-full">
      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Amount <span className="text-gray-500">QNTFI</span>
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Weight
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Locked Date
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Unlocked Date
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Unstake</span>
              </th>
            </tr>
          </thead>
          {account && (
            <tbody className="bg-white divide-y divide-gray-200">
              {allStakes.map((stake, idx) => (
                <tr key={idx}>
                  <td className="w-full py-4 pl-4 pr-3 text-sm font-medium text-gray-900 max-w-0 sm:w-auto sm:max-w-none sm:pl-6">
                    {(+ethers.utils.formatUnits(stake.numTokens, 18)).toFixed(2)}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Weight</dt>
                      <dd className="mt-1 text-gray-700 truncate">
                        <ScaleIcon className="inline w-5 h-5 mr-1 text-gray-400" />
                      </dd>
                      <dt className="sr-only sm:hidden">Locked Date</dt>
                      <dd className="mt-1 text-gray-500 truncate sm:hidden">
                        <LockClosedIcon className="inline w-5 h-5 mr-1 text-gray-400" />
                        {new Date(stake?.stakeDate.toNumber() * 1000).toLocaleDateString(
                          undefined,
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {(+ethers.utils.formatUnits(stake.weight, 18)).toFixed(2)}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {new Date(stake?.stakeDate.toNumber() * 1000).toLocaleDateString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {new Date(stake?.unlockDate.toNumber() * 1000).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                    <button
                      onClick={() => unstakeQNTFI(idx)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Unstake<span className="sr-only"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && (
          <div className="w-full py-2 font-sans antialiased text-center text-slate-600">
            {loadingText}
          </div>
        )}
        {!loading && allStakes.length === 0 && (
          <div className="w-full py-2 font-sans antialiased text-center text-slate-600">
            No stakes found
          </div>
        )}
        {!account && (
          <div className="w-full py-2 font-sans antialiased text-center text-slate-600">
            Connect your wallet to view your stakes
          </div>
        )}
      </div>
    </div>
  );
}
