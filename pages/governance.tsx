import { useWeb3React } from "@web3-react/core";
import { ChartOptions } from "chart.js";
import { ethers, BigNumber } from "ethers";
import { Fragment, useEffect, useState } from "react";
import Linechart from "../components/Dashboard/Linechart";
import Staking from "../components/Dividends/Staking";
import { Unstaking } from "../components/Dividends/Unstaking";
import Proposals from "../components/Governance/Proposals";
import qntfiABI from "../components/abi/qntfi.json";
import Spinner from "../components/animations/Spinner";
import Notification, { NotificationContent } from "../components/Notification";
import { timeout } from "../components/utils/timeout";

import { useAccount, useProvider, useSigner } from "wagmi";
import { fetchSigner } from "@wagmi/core";

// our-domain.com/governance
function GovernancePage() {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const [notificationStatus, setNotificationStatus] =
    useState<NotificationContent["status"]>("info");
  const [totalStakedWeight, setTotalStakedWeight] = useState<number>(0);
  const [totalStakedWeightPercentage, setTotalStakedWeightPercentage] = useState<number>();
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationTitle, setNotificationTitle] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("deposit");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<string>();
  const [swapButtonText, setSwapButtonText] = useState<string>("Loading...");
  const [lockUpDays, setLockUpDays] = useState<number>(0);
  const { library, account, active } = useWeb3React();
  const [qntfiInfo, setQntfiInfo] = useState<{
    address: string;
    tokenName: string;
    qntfiBalance: ethers.BigNumber;
    numStakes: ethers.BigNumber;
    qntfiStaked: ethers.BigNumber;
    totalQntfiStaked: ethers.BigNumber;
  }>({
    address: "",
    tokenName: "QNTFI",
    qntfiBalance: ethers.BigNumber.from(0),
    numStakes: ethers.BigNumber.from(0),
    qntfiStaked: ethers.BigNumber.from(0),
    totalQntfiStaked: ethers.BigNumber.from(0),
  });

  const [QNTFIStaked, setQNTFIStaked] = useState<string>();
  const [stakedWeight, setStakedWeight] = useState<string>();

  const provider = useProvider();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const QNTFI = new ethers.Contract(
    "0xe003e68Ad41F1F45B946EFBc3E5C47Ad36359395",
    qntfiABI,
    provider
  );

  const [showNotification, setNotificationShow] = useState(false);
  function changeNotificationContent(
    title: NotificationContent["title"],
    message: NotificationContent["message"],
    status: NotificationContent["status"]
  ) {
    setNotificationTitle(title);
    setNotificationMessage(message);
    setNotificationStatus(status);
  }

  // Sets the contract values
  async function _setContractInfo() {
    setLoading(true);
    if (isDisconnected) return;
    try {
      setQntfiInfo({
        address: QNTFI.address,
        tokenName: "QNTFI",
        qntfiBalance: await QNTFI.balanceOf(address),
        numStakes: await QNTFI.numStakes(address),
        qntfiStaked: await QNTFI.tokensStaked(address),
        totalQntfiStaked: await QNTFI.getTotalStakes(),
      });
    } catch (error) {
      console.error("Couldn't set QNTFI contract info: " + error);
    } finally {
      setLoading(false);
      console.log(qntfiInfo);
    }
  }

  async function stakeQNTFI(amount: number, days: number) {
    if (!amount) return;
    if (!isConnected) return;

    const signer = await fetchSigner();
    const QNTFIConnect = QNTFI.connect(signer!);
    try {
      // Request stake
      const tx = await QNTFIConnect.stakeTokens(ethers.utils.parseEther(amount.toString()), days);
      // In progress
      changeNotificationContent("In progress", "Staking Requested", "loading");
      setNotificationShow(true);
      await tx.wait();
      // Complete
      _setContractInfo();
      changeNotificationContent("Complete", "Staked", "success");
      await timeout(2000);
      setNotificationShow(false);
    } catch (error) {
      changeNotificationContent("Failed", "Staking Failed", "error");
      console.error("Couldn't stake QNTFI: " + error);
    }
  }

  async function unstakeQNTFI(arrIndex: number) {
    if (isDisconnected) return;
    const signer = await fetchSigner();
    const QNTFIConnect = QNTFI.connect(signer!);
    try {
      changeNotificationContent("In progress", "Unstaking Requested", "loading");
      setNotificationShow(true);
      // Request unstake
      const tx = await QNTFIConnect.unstakeTokens(arrIndex);
      // In progress
      await tx.wait();
      // Complete
      _setContractInfo();
      changeNotificationContent("Complete", "Unstaked", "success");
      await timeout(2000);
      setNotificationShow(false);
    } catch (error: any) {
      if (error.message.includes("Unlock time not yet reached")) {
        changeNotificationContent("Failed", "Unlock time not yet reached", "error");
      } else changeNotificationContent("Failed", "Unstaking Failed", "error");
      setNotificationShow(true);
      console.error("Couldn't unstake QNTFI: " + error.message);
    }
  }

  // account change -> contract info update
  useEffect(() => {
    if (isDisconnected) return;
    if (isConnecting) return;

    _setContractInfo();
  }, [address, isConnected]);

  // Calculate staked weight value
  useEffect(() => {
    console.log("Contract info", qntfiInfo);
    if (!qntfiInfo.qntfiStaked) return;
    // if (!totalStakedWeight) return;
    if (!qntfiInfo.totalQntfiStaked || qntfiInfo.totalQntfiStaked.isZero()) return;
    setTotalStakedWeightPercentage((+qntfiInfo.qntfiStaked / +qntfiInfo.totalQntfiStaked) * 100);
    console.log("weight", stakedWeight);
  }, [totalStakedWeight, qntfiInfo]);

  // Line chart stuff
  const labels = new Array(7).fill(0).map((_, i) => `Day ${i + 1}`);
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "QNTFI Prices",
        data: [0.5,0.5,0.5,0.5,0.5,0.5,0.5],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const lineChartConfig: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: false,
          color: "white",
        },
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      title: {
        font: {
          weight: "medium",
        },
        color: "white",
        display: true,
        text: "QNTFI Price History",
      },
    },
  };

  function TotalQNTFIStaked() {
    setQNTFIStaked(
      (+ethers.utils.formatUnits(qntfiInfo.qntfiStaked, 18)).toLocaleString(undefined, {
        minimumFractionDigits: 3,
      })
    );
  }

  async function updateTotalStakes() {
    if (isDisconnected) return;
    try {
      setQntfiInfo({
        ...qntfiInfo,
        totalQntfiStaked: await QNTFI.getTotalStakes(),
      });
    } catch (error) {
      console.error("Couldn't update total stakes: " + error);
    }
  }

  function StakedWeight() {
    setStakedWeight(totalStakedWeightPercentage?.toFixed(3) + "%");
  }

  useEffect(() => {
    TotalQNTFIStaked();
    StakedWeight();
  }, [qntfiInfo, loading, isConnected, isDisconnected, totalStakedWeightPercentage]);

  return (
    <>
      <main className="mt-16 sm:my-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  QNTFI: The QuantiFi Governance Token
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-xl xl:text-2xl">
                  Stake, Vote and Earn
                </p>
                <div className="flex justify-start sm:justify-center lg:justify-start">
                  <button className="mt-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] px-8 py-3 text-base font-medium text-white transition-all duration-75 ease-in hover:opacity-80 md:py-4 md:px-10 md:text-lg">
                    <a href="#">Buy QNTFI on Pancakeswap (pending)</a>
                  </button>
                </div>
              </div>
            </div>
            {/* Linechart */}
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <div className="px-4 pb-4 sm:mx-auto sm:w-full sm:max-w-lg sm:overflow-hidden">
                <Linechart data={lineChartData} config={lineChartConfig} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {ready && isConnected ? (
        <div className="bg-gray-50 pt-12 sm:pt-16 ">
          <Staking
            balance={qntfiInfo.qntfiBalance.sub(qntfiInfo.qntfiStaked)}
            stake={stakeQNTFI}
            amount={inputValue}
            lockUpDays={lockUpDays}
          />

          {/* Title  */}
          <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Your staked QNTFI
              </h2>
            </div>
          </div>
          {/* Table and Info */}
          <div className="bg-white pb-12 sm:pb-16">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-gray-50" />
              <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl px-2 sm:px-0">
                  <dl className="rounded-lg bg-white shadow-md sm:grid sm:grid-cols-2 sm:shadow-lg">
                    <div className="flex flex-col items-center justify-center border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                      <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                        {!loading && totalStakedWeight > 0 && "Your staked QNTFI"}
                        {!loading && totalStakedWeight === 0 && "No staked QNTFI"}
                        {loading && "Loading your staked weight..."}
                      </dt>
                      <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                        {loading && <Spinner height={32} width={32} />}
                        {!loading && stakedWeight !== "undefined%" && QNTFIStaked?.toLocaleString()}
                        {!loading && stakedWeight === "undefined%" && ""}
                      </dd>
                    </div>
                    <div className="flex flex-col items-center justify-center border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                        {!loading && totalStakedWeight > 0 && "Your staked weight"}
                        {!loading && totalStakedWeight === 0 && "No staked weight"}
                        {loading && "Loading your staked weight..."}
                      </dt>
                      <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                        {loading && <Spinner height={32} width={32} />}
                        {!loading && stakedWeight !== "undefined%" && stakedWeight}
                        {!loading && stakedWeight === "undefined%" && ""}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex w-full justify-center">
                  <div className="w-full max-w-2xl">
                    <Unstaking
                      loadingAcc={loading}
                      totalStakes={+qntfiInfo.numStakes}
                      updateTotalStakes={updateTotalStakes}
                      getStake={QNTFI.stakes}
                      setTotalStakedWeight={setTotalStakedWeight}
                      unstakeQNTFI={unstakeQNTFI}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl bg-gray-100 px-4 py-16 sm:rounded-md sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="pb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Connect your wallet to stake QNTFI
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Proposals */}
      <div className="flex justify-center bg-white pb-4">
        <div className="w-full max-w-2xl pb-6 text-center">
          <h2
            id="proposals"
            className="mb-4 -scroll-mt-60 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Proposals
          </h2>
          <Proposals />
        </div>
      </div>

      {/* Notification */}
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

export default GovernancePage;
