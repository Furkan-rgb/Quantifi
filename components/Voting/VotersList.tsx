import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { truncateAddress } from "../utils";

const voters = [
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
  {
    address: "0x1f0...8cEE",
    option: "2",
    stake: "0",
  },
];

interface voters {
  address: string;
  option: string;
  stake: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VotersList({ proposalId }: { proposalId: string }) {
  const [loading, setLoading] = useState(false);
  const [votersData, setVotersData] = useState<[]>();

  async function getProposals() {
    if (!proposalId) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `https://rgtestnet.pythonanywhere.com/api/v1/qit/votes/${proposalId}`,
        {}
      );
      const data = await res.json();
      setVotersData(data.votes);
      console.log("Voters data:", data.votes);
      setLoading(false);
      console.log(votersData);
    } catch (err) {
      console.error("Vote Error:", (err as any).data?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProposals();
  }, [proposalId]);

  return (
    <div className="px-4 pt-6 bg-gray-200 sm:rounded-lg sm:px-6 sm:shadow-lg lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Voters</h1>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Option
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Stake (QNTFI)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {votersData?.map((voter, voterIdx) => (
                    <tr key={voterIdx}>
                      <td
                        className={classNames(
                          voterIdx !== voters.length - 1 ? "border-b border-gray-200" : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        {truncateAddress(voter[0])}
                      </td>
                      <td
                        className={classNames(
                          voterIdx !== voters.length - 1 ? "border-b border-gray-200" : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        )}
                      >
                        {voter[2]}
                      </td>
                      <td
                        className={classNames(
                          voterIdx !== voters.length - 1 ? "border-b border-gray-200" : "",
                          "hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell"
                        )}
                      >
                        {+ethers.utils.formatUnits(voter[1], "wei")}
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
  );
}
