import { useWeb3React } from "@web3-react/core";
import { ChartOptions } from "chart.js";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import Linechart from "../components/Dashboard/Linechart";
import Staking from "../components/Dividends/Staking";
import { Unstaking } from "../components/Dividends/Unstaking";
import Proposals from "../components/Governance/Proposals";
import qntfiABI from "../components/abi/qntfi.json";
import Spinner from "../components/animations/Spinner";
import Notification, { NotificationContent } from "../components/Notification";
import { timeout } from "../components/utils/timeout";

// our-domain.com/governance
function GovernancePage() {
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationContent["status"]>("info");
  const [totalStakedWeight, setTotalStakedWeight] = useState<number>();
  const [totalStakedWeightPercentage, setTotalStakedWeightPercentage] = useState<number>();
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationTitle, setNotificationTitle] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("deposit");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const [outputValue, setOutputValue] = useState<string>();
  const [swapButtonText, setSwapButtonText] = useState<string>("Loading...");
  const [lockUpDays, setLockUpDays] = useState<number>(0);
  const { library, chainId, account, active, error, setError, connector } = useWeb3React();
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

  const QNTFI = new ethers.Contract(
    "0x0781B099a57B1ebCaF1c1D72A2dC72Aa5773d3B5",
    qntfiABI,
    library
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
    if (!account) return;
    try {
      setQntfiInfo({
        address: QNTFI.address,
        tokenName: "QNTFI",
        qntfiBalance: await QNTFI.balanceOf(account),
        numStakes: await QNTFI.numStakes(account),
        qntfiStaked: await QNTFI.tokensStaked(account),
        totalQntfiStaked: await QNTFI.getTotalStakes(),
      });
    } catch (error) {
      console.error("Couldn't set QNTFI contract info: " + error);
    } finally {
      setLoading(false);
    }
  }

  async function stakeQNTFI(amount: number, days: number) {
    if (!amount) return;
    if (!account) return;

    const QNTFIConnect = QNTFI.connect(library.getSigner());
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
    if (!account) return;
    const QNTFIConnect = QNTFI.connect(library.getSigner());
    try {
      setNotificationShow(true);
      // Request unstake
      const tx = await QNTFIConnect.unstakeTokens(arrIndex);
      // In progress
      changeNotificationContent("In progress", "Unstaking Requested", "loading");
      setNotificationShow(true);
      await tx.wait();
      // Complete
      _setContractInfo();
      changeNotificationContent("Complete", "Unstaked", "success");
      await timeout(2000);
      setNotificationShow(false);
    } catch (error: any) {
      changeNotificationContent("Failed", "Unstaking Failed", "error");
      setNotificationShow(true);
      console.error("Couldn't unstake QNTFI: " + error.message);
    }
  }

  // account change -> contract info update
  useEffect(() => {
    if (!account) return;
    _setContractInfo();
  }, [account, active]);

  // Calculate staked weight value
  useEffect(() => {
    if (!qntfiInfo.qntfiStaked) return;
    if (!totalStakedWeight) return;
    const total =
    totalStakedWeight / qntfiInfo.totalQntfiStaked
    setTotalStakedWeightPercentage(total * 100);
  }, [totalStakedWeight]);

  // Line chart stuff
  const labels = new Array(7).fill(0).map((_, i) => `Day ${i + 1}`);
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
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

  const dividendsContent = {
    title: "Dividends",
    QNTFIToken: [
      { title: "Current Price", value: "2.57 USDT", type: "statistic" },
      { title: "Total Staked", value: "12%", type: "statistic" },
      {
        title: "Price History",
        value: <Linechart data={lineChartData} config={lineChartConfig} />,
        type: "chart",
      },
    ],
    YourDividends: [
      { title: "Next Dividend", value: "20220824T000000+0200", type: "date" },
      { title: "Claimable Dividends", value: "0.00 USDT", type: "statistic" },
      { title: "Claim", value: true, type: "toggle" },
    ],
    NextDividend: [
      {
        title: "Current Period",
        value: { from: "20220701T000000+0200", until: "20220930T000000+0200" },
        type: "date",
      },
      { title: "Fees Collected", value: "25 USDT", type: "statistic" },
      { title: "Dividend Ex-Date", value: "20220616T000000+0200", type: "date" },
      { title: "Claimable After", value: "20220414T000000+0200", type: "date" },
    ],
    DividendHistory: [],
  };

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
                    <a href="#">Buy QNTFI on Pancakeswap</a>
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
      <div className="pt-12 bg-gray-50 sm:pt-16">
        <Staking
          balance={qntfiInfo.qntfiBalance.sub(qntfiInfo.qntfiStaked)}
          stake={stakeQNTFI}
          amount={inputValue}
          lockUpDays={lockUpDays}
        />

        {/* Title  */}
        <div className="px-4 pt-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Your staked QNTFI
            </h2>
          </div>
        </div>
        {/* Table and Info */}
        <div className="pb-12 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-2xl px-2 mx-auto sm:px-0">
                <dl className="bg-white rounded-lg shadow-md sm:grid sm:grid-cols-2 sm:shadow-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                      Total QNTFI staked
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                      {loading ? (
                        <Spinner />
                      ) : (
                        (+ethers.utils.formatUnits(qntfiInfo.qntfiStaked,18)).toFixed(2) + " " + qntfiInfo.tokenName
                      )}
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                      Your Staked Weight
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-indigo-600">
                      {loading || totalStakedWeightPercentage === undefined ? (
                        <Spinner />
                      ) : (
                        totalStakedWeightPercentage?.toFixed(3) + "%"
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-center w-full">
                <div className="w-full max-w-2xl">
                  <Unstaking
                    totalStakes={qntfiInfo.numStakes.toNumber()}
                    getStake={QNTFI.stakes}
                    setTotalStakedWeight={setTotalStakedWeight}
                    unstakeQNTFI={unstakeQNTFI}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Proposals */}
        <div className="flex justify-center pb-4 bg-white">
          <div className="w-full max-w-2xl pb-6 text-center">
            <h2
              id="proposals"
              className="mb-4 text-4xl font-bold tracking-tight text-gray-900 -scroll-mt-60 sm:text-5xl"
            >
              Proposals
            </h2>
            <Proposals />
          </div>
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
