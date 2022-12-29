import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useState } from "react";
import { VoteResults } from "./VoteResults";
import govABI from "../../components/abi/governor.json";
import Notification, { NotificationContent } from "../../components/Notification";
import { timeout } from "../../components/utils/timeout";
import Spinner from "../animations/Spinner";
import { LinkIcon } from "@heroicons/react/24/outline";

// If proposal is open or closed,
// show voting options or results
export function VoteAction({
  votingOptions,
  proposalState,
  voted,
  proposalId,
}: {
  votingOptions: any;
  proposalState: string;
  voted: boolean;
  proposalId: number;
}) {
  const [voteOption, setVoteOption] = useState();
  const [showNotification, setNotificationShow] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationTitle, setNotificationTitle] = useState<string>("");
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationContent["status"]>("info");
  const [loading, setLoading] = useState(false);
  const totalVotes = votingOptions.reduce((a: any, b: { votes: any }) => a + (b.votes || 0), 0);
  const { library, account } = useWeb3React();

  const GOV = new ethers.Contract("0xb9bb7147fcd291c876e96205f3559eda3ac366ea", govABI, library);

  function changeNotificationContent(
    title: NotificationContent["title"],
    message: NotificationContent["message"],
    status: NotificationContent["status"]
  ) {
    setNotificationTitle(title);
    setNotificationMessage(message);
    setNotificationStatus(status);
  }

  async function vote(voteOption: number) {
    console.log("voteOnProposal");
    console.log(proposalId);
    console.log(voteOption);

    if (!account) return;

    const GOVConnect = GOV.connect(library.getSigner());
    try {
      setLoading(true);
      changeNotificationContent("In progress", "Submitting Vote", "loading");
      setNotificationShow(true);
      const tx = await GOVConnect.voteOnProposal(proposalId, voteOption);
      await tx.wait();
      changeNotificationContent("Success", "Vote Submitted", "success");
      await timeout(2000);
      setNotificationShow(false);
      setLoading(false);
    } catch (error) {
      changeNotificationContent("Error", "Vote not submitted", "error");
      setNotificationShow(true);
      setLoading(false);
      console.error(error);
      await timeout(2000);
      setNotificationShow(false);
    }
  }

  // If proposal is closed, show results
  if (proposalState === "closed") {
    return <VoteResults votingOptions={votingOptions} totalVotes={totalVotes} />;
  }

  if (voted) {
    return <VoteResults votingOptions={votingOptions} totalVotes={totalVotes} />;
  }

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64 bg-white">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <LinkIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">
          Please connect your wallet to vote
        </h3>
      </div>
    );
  }

  // If proposal is open, show voting options
  if (proposalState === "open") {
    // If user has not voted, show voting options
    return (
      <>
        <div>
          {votingOptions.map((option: any) => (
            <div key={option.id}>
              <div
                onClick={() => {
                  setVoteOption(option.id);
                }}
                className={`${
                  option.id === voteOption ? "bg-indigo-300" : ""
                } relative my-4 cursor-pointer overflow-hidden rounded-lg border border-gray-200 p-4 hover:border-indigo-500`}
              >
                <div className="absolute inset-0 w-full origin-left bg-opacity-50"></div>
                <div className="relative text-black z-100 ">
                  <div className="font-medium">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center w-full bg-white">
            <button
              onClick={() => {
                if (!voteOption) return;
                vote(voteOption);
              }}
              type="button"
              disabled={!voteOption || loading}
              className="inline-flex items-center px-6 py-2 mb-4 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
            >
              {loading ? <Spinner /> : "Vote"}
            </button>
          </div>
        </div>
        <Notification
          title={notificationTitle}
          message={notificationMessage}
          show={showNotification}
          status={notificationStatus}
          setNotificationShow={setNotificationShow}
        />
      </>
    );
  }
  return null;
}
