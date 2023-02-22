import { useEffect, useState } from "react";
import { VoteResult } from "./VoteType";

export function VoteResults({
  votingOptions,
  proposalId,
}: {
  votingOptions: any[];
  proposalId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [votersData, setVotersData] = useState<[]>();
  const [voteResults, setVoteResults] = useState<VoteResult>();

  async function getProposals() {
    if (!proposalId) return;

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
      console.log("Voters data results", votersData);
    } catch (err) {
      console.error("Vote Error:", (err as any).data?.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    getProposals();
  }, [proposalId]);

  function calculateVotes() {
    if (!votersData) return;
    console.log("Voters Data Length", votersData.length);
    let yesVotes = 0;
    let noVotes = 0;
    for (let voter of votersData) {
      console.log("Voter[2] ", voter[2]);
      if (voter[2] == "1") {
        yesVotes += 1;
      }
      if (voter[2] == "2") {
        noVotes += 1;
      }
    }
    console.log("Total Votes:", votersData.length);
    console.log("Yes Votes:", yesVotes);
    console.log("No Votes:", noVotes);
    return [yesVotes, noVotes];
  }

  useEffect(() => {
    const _voteResults = calculateVotes();
    if (!_voteResults) return;
    setVoteResults({ yes: _voteResults[0], no: _voteResults[1] });
    console.log("Vote Results", voteResults);
  }, [votersData]);

  return (
    <div>
      {voteResults &&
        votersData &&
        votingOptions.map((option: any, idx: any) => (
          <div key={option.id}>
            <div className="relative p-4 my-4 overflow-hidden border border-gray-200 rounded-lg hover:border-indigo-500">
              {votersData && (
                <div
                  style={{
                    transform: `scaleX(${
                      (idx == 0 ? voteResults.yes : voteResults.no) / votersData.length
                    })`,
                  }}
                  className="absolute inset-0 w-full origin-left bg-indigo-500 bg-opacity-50"
                ></div>
              )}
              <div className="relative text-black z-100">
                <div className="font-medium">{option.description}</div>
                <div className="text-sm">{idx == 0 ? voteResults.yes : voteResults.no} votes</div>
                <div className="text-sm">
                  (
                  {(Math.round(idx == 0 ? voteResults.yes : voteResults.no) / votersData.length) *
                    100}
                  %)
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
