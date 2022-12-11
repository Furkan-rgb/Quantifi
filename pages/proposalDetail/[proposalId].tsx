import { ArrowUpIcon, CalendarIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import VotersList from "../../components/Governance/VotersList";
import {
  returnProposalState,
  returnProposalLabel,
  Proposal,
} from "../../components/utils/proposalUtils";

const votingOptions = [
  {
    id: 1,
    name: "Yes",
    description: "I support this proposal",
    icon: ArrowUpIcon,
    iconColor: "text-green-500",
    votes: 23,
  },
  {
    id: 2,
    name: "No",
    description: "I do not support this proposal",
    icon: ArrowUpIcon,
    iconColor: "text-red-500",
    votes: 12,
  },
];

// Show voting options if open or else notify that voting hasn't started yet
function VotingResults(props: any) {
  if (props.proposalState === "upcoming") {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center bg-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <CalendarIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">Voting has not started yet</h3>
      </div>
    );
  }
  if (props.proposalState === "open" || props.proposalState === "closed") {
    return (
      <VotingOptions
        voted={props.voted}
        votingOptions={votingOptions}
        proposalState={props.proposalState}
      />
    );
  }
  return null;
}

// If proposal is open or closed, show voting options or results
function VotingOptions(props: any) {
  const totalVotes = props.votingOptions.reduce(
    (a: any, b: { votes: any }) => a + (b.votes || 0),
    0
  );
  console.log(totalVotes);
  if (props.proposalState === "closed") {
    return (
      <div>
        {props.votingOptions.map((option: any) => (
          <>
            <div className="relative my-4 overflow-hidden rounded-lg border border-gray-200 p-4 hover:border-indigo-500">
              <div
                style={{ transform: `scaleX(${option.votes / totalVotes})` }}
                className="absolute inset-0 w-full origin-left bg-indigo-500 bg-opacity-50"
              ></div>
              <div className="z-100 relative text-black">
                <div className="font-medium">{option.description}</div>
                <div className="text-sm">{option.votes} voters</div>
                <div className="text-sm">
                  295.7513474746361 QNTFI ({Math.round((option.votes / totalVotes) * 100)}%)
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    );
  }
  if (props.proposalState === "open") {
    if (!props.voted) {
      return (
        <div>
          {props.votingOptions.map((option: any) => (
            <div id={option.id}>
              <div className="relative my-4 cursor-pointer overflow-hidden rounded-lg border border-gray-200 p-4 hover:border-indigo-500">
                <div className="absolute inset-0 w-full origin-left bg-opacity-50"></div>
                <div className="z-100 relative text-black ">
                  <div className="font-medium">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex w-full flex-col items-center justify-center bg-white">
            <button
              type="button"
              className="mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Vote
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {props.votingOptions.map((option: any) => (
            <>
              <div className="relative my-4 overflow-hidden rounded-lg border border-gray-200 p-4 hover:border-indigo-500">
                <div
                  style={{ transform: `scaleX(${option.votes / totalVotes})` }}
                  className="absolute inset-0 w-full origin-left bg-indigo-500 bg-opacity-50"
                />
                <div className="z-100 relative text-black dark:text-white">
                  <div className="font-medium">{option.description}</div>
                  <div className="text-sm">{option.votes} voters</div>
                  <div className="text-sm">
                    295.7513474746361 QNTFI ({Math.round((option.votes / totalVotes) * 100)}%)
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      );
    }
  }
  return null;
}

export default function proposalDetail() {
  const router = useRouter();
  const query = router.query;
  const [proposalState, setProposalState] = useState<Proposal["state"]>();

  useEffect(() => {
    console.log(router.query);
    setProposalState(
      returnProposalState(
        query.startime as Proposal["startime"],
        query.deadline as Proposal["deadline"]
      )
    );
    console.log(proposalState);
  }, [router, proposalState]);

  return (
    <div className="flex min-h-screen justify-center bg-white">
      <div className="grid w-full max-w-7xl grid-flow-row auto-rows-max grid-cols-2 gap-4 py-8">
        {/* Section 1 */}
        <div className="col-span-2 h-max p-8 sm:pl-0">
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
            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              {query.description}
            </p>
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
            <VotingResults proposalState={proposalState} voted={false} />
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
