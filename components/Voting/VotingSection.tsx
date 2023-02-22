import { CalendarIcon } from "@heroicons/react/24/outline";
import { useWeb3React } from "@web3-react/core";
import { VoteAction } from "./VoteAction";

const votingOptions = [
  {
    id: 1,
    name: "Yes",
    description: "I support this proposal",
  },
  {
    id: 2,
    name: "No",
    description: "I do not support this proposal",
  },
];

export function VotingSection({
  proposalState,
  proposalId,
}: {
  proposalState: string | undefined;
  proposalId: number;
}) {
  if (proposalState === "upcoming") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64 bg-white">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <CalendarIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">Voting has not started yet</h3>
      </div>
    );
  }
  if (proposalState === "open" || proposalState === "closed") {
    console.log("Voting Action has pId: ", proposalId);
    return (
      <VoteAction
        votingOptions={votingOptions}
        proposalState={proposalState}
        proposalId={proposalId}
      />
    );
  }
  return null;
}
