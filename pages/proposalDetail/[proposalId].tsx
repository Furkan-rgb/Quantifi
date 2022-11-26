import { CalendarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import VotersList from "../../components/Governance/VotersList";

export default function proposalDetail() {
  const router = useRouter();
  const query = router.query;
  const [percentage1, setPercentage1] = useState(12);
  const [percentage2, setPercentage2] = useState(35);

  useEffect(() => {
    console.log(router.query);
  }, [router]);

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="grid w-full grid-flow-row grid-cols-2 gap-4 py-8 max-w-7xl auto-rows-max">
        {/* Section 1 */}
        <div className="col-span-2 p-8 h-max">
          <div className=" lg:w-1/2 xl:pr-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">{query.title}</span>
            </h1>
            <p className="max-w-md mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Description
              {query.proposalId}
            </p>
            <div className="flex mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  Deadline:{" "}
                  <time dateTime={new Date().toTimeString()}>
                    {new Date().toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Results Card */}
        <div className="col-span-2 rounded-lg shadow-lg h-max bg-clip-padding sm:col-span-1">
          <div className="px-6 py-6 bg-gray-200 rounded-t-lg sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
            </div>
          </div>
          <div className="w-full px-6">
            {/* 1 */}
            <div className="relative p-4 my-4 overflow-hidden border border-gray-200 rounded-lg hover:border-indigo-500">
              <div
                className={`scale-x-[${percentage1}%] absolute inset-0 w-full origin-top-left bg-indigo-500 bg-opacity-50`}
              ></div>
              <div className="relative text-black z-100 dark:text-white">
                <div className="font-medium">0% burn, 2.5% revenue</div>
                <div className="text-sm">23 voters</div>
                <div className="text-sm">295.7513474746361 QNTFI ({percentage1}%)</div>
              </div>
            </div>
            {/* 2 */}
            <div className="relative p-4 my-4 overflow-hidden border border-gray-200 rounded-lg hover:border-indigo-500">
              <div className=" absolute inset-0 w-[35%] bg-indigo-500 bg-opacity-50"></div>
              <div className="relative text-black z-100 dark:text-white">
                <div className="font-medium">1.25% burn, 1.25% revenue</div>
                <div className="text-sm">13 voters</div>
                <div className="text-sm">55.06840416252212 QNTFI ({percentage2}%)</div>
              </div>
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="col-span-2 bg-white sm:col-span-1">
          <VotersList />
        </div>
      </div>
    </div>
  );
}
