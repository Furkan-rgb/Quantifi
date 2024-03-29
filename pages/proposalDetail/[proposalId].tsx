import { ArrowUpIcon, CalendarIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import VotersList from "../../components/Voting/VotersList";
import {
  returnProposalState,
  returnProposalLabel,
  Proposal,
} from "../../components/utils/proposalUtils";
import { VotingSection } from "../../components/Voting/VotingSection";

export default function proposalDetail() {
  const router = useRouter();
  const query = router.query;
  const [proposalState, setProposalState] = useState<Proposal["state"]>();
  const [voted, setVoted] = useState<boolean>();
  const [proposalId, setProposalId] = useState<Proposal["id"]>();

  useEffect(() => {
    if (query === undefined) return;
    console.log(router.query);
    setProposalState(
      returnProposalState(
        query.startime as Proposal["startime"],
        query.deadline as Proposal["deadline"]
      )
    );
    setProposalId(+query?.proposalId!);
    console.log(proposalState);
  }, [router, proposalState]);

  return (
    <div className="flex min-h-screen justify-center bg-white">
      <div className="grid w-full max-w-7xl grid-flow-row auto-rows-max grid-cols-2 gap-4 pt-4 pb-8 sm:px-8">
        {/* Top section */}
        <div className="col-span-2 h-max p-4 sm:pl-0">
          <div className=" lg:w-1/2 xl:pr-16">
            <div className="flex cursor-pointer items-center text-black">
              <ChevronLeftIcon className="inline-block h-5 w-5 sm:h-6 sm:w-6" />{" "}
              <Link href="/governance#proposals">
                <span className="hover:underline sm:text-sm md:text-base">Back to Proposals</span>
              </Link>
            </div>

            <div className="mt-6">{returnProposalLabel(proposalState)}</div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">{query.title}</span>
            </h1>
            <span className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              {query.description}
            </span>
            <div className="mt-2 flex">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  Deadline:{" "}
                  <time>
                    {new Date(query?.deadline as string).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
              </div>
              {/* Start time */}
              <div className="flex items-center text-sm text-gray-500">
                <ArrowUpIcon
                  className="mr-0.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p>
                  Start Date:{" "}
                  <time>
                    {new Date(query?.startime as string).toLocaleDateString(undefined, {
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
        <div className="col-span-2 h-max bg-clip-padding sm:col-span-1 sm:rounded-lg sm:shadow-lg">
          <div className="bg-gray-200 px-6 py-6 sm:flex sm:items-center sm:rounded-t-lg">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
            </div>
          </div>
          <div className="w-full px-6">
            {proposalId === undefined ? (
              <div className="flex justify-center">
                <p>Loading...</p>
              </div>
            ) : (
              <VotingSection proposalState={proposalState} proposalId={proposalId} />
            )}
          </div>
        </div>
        {/* Section 3 */}
        <div className="col-span-2 bg-white sm:col-span-1">
          {proposalId === undefined ? (
            <div className="flex justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <VotersList proposalId={proposalId?.toString()} />
          )}
        </div>
      </div>
    </div>
  );
}
