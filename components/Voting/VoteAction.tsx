import { useEffect, useState } from "react";
import { VoteResults } from "./VoteResults";
import Notification, { NotificationContent } from "../../components/Notification";
import { timeout } from "../../components/utils/timeout";

import Spinner from "../animations/Spinner";
import { LinkIcon } from "@heroicons/react/24/outline";

// Web3
import { ethers } from "ethers";
import govABI from "../../components/abi/governor.json";
import { fetchSigner } from "@wagmi/core";
import { useAccount, useProvider, useSigner } from "wagmi";

// If proposal is open or closed,
// show voting options or results
export function VoteAction({
  votingOptions,
  proposalState,
  proposalId,
}: {
  votingOptions: any;
  proposalState: string;
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
  const [voted, setVoted] = useState<boolean | null | undefined>();

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const provider = useProvider();
  const GOV = new ethers.Contract("0x506abE228305e35e24b0019C69728f0A5c32A206", govABI, provider);

  function changeNotificationContent(
    title: NotificationContent["title"],
    message: NotificationContent["message"],
    status: NotificationContent["status"]
  ) {
    setNotificationTitle(title);
    setNotificationMessage(message);
    setNotificationStatus(status);
  }

  async function checkIfVoted() {
    if (isDisconnected || isConnecting) return;

    const signer = await fetchSigner();
    if (!signer) return;

    const GOVConnect = GOV.connect(signer);
    const hasVoted = await GOVConnect.hasVoted(proposalId, address);
    setVoted(hasVoted);
  }

  useEffect(() => {
    console.info("Checking if voted function call");
    checkIfVoted();
    console.log("Proposal Id is here", proposalId);
  }, [address, proposalId]);

  async function vote(voteOption: number) {
    console.log("voteOnProposal");
    console.log(proposalId);
    console.log(voteOption);

    if (isDisconnected || isConnecting) return;

    const signer = await fetchSigner();
    if (!signer) return;

    const GOVConnect = GOV.connect(signer);
    try {
      setLoading(true);
      changeNotificationContent("In progress", "Submitting Vote", "loading");
      setNotificationShow(true);
      const tx = await GOVConnect.voteOnProposal(proposalId, voteOption);
      await tx.wait();
      changeNotificationContent("Success", "Vote Submitted", "success");
    } catch (error) {
      changeNotificationContent("Error", "Vote not submitted", "error");
      setNotificationShow(true);
      setLoading(false);
      console.error(error);
      await timeout(2000);
      setNotificationShow(false);
    } finally {
      await timeout(2000);
      setNotificationShow(false);
      setLoading(false);
      checkIfVoted();
    }
  }

  // If proposal is closed, show results
  if (proposalState === "closed") {
    return <VoteResults votingOptions={votingOptions} proposalId={proposalId.toString()} />;
  }

  // If user has voted, show results
  if (voted) {
    return <VoteResults votingOptions={votingOptions} proposalId={proposalId.toString()} />;
  }

  // If checking whether user has voted, show loading
  if (voted === undefined && address) {
    console.log("Voted or not:", voted);
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center bg-white">
        <span className="mb-2">Checking vote status...</span>
        <Spinner height={64} width={64} />
      </div>
    );
  }

  // If no account, show connect wallet message
  if (isDisconnected || isConnecting) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center bg-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <LinkIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">
          Please connect your wallet to vote
        </h3>
      </div>
    );
  }

  // If proposal is open, show voting options
  if (proposalState === "open") {
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
                <div className="z-100 relative text-black ">
                  <div className="font-medium">{option.description}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex w-full flex-col items-center justify-center bg-white">
            <button
              onClick={() => {
                if (!voteOption) return;
                vote(voteOption);
              }}
              type="button"
              disabled={!voteOption || loading}
              className="mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
            >
              {loading ? <Spinner height={16} width={16} /> : "Vote"}
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
