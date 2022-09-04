import React, { useEffect, useState } from "react";
import myPageAbi from "../components/abi/QIT.json";
import erc20ABI from "../components/abi/erc20.json";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";

function MyPage() {
  const [currentTab, setCurrentTab] = useState<string>("deposit");
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>();
  const [swapButtonText, setSwapButtonText] = useState<string>("Loading...");
  const [holdingValue, setHoldingValue] = useState<string>("0");
  const [contractInfo, setContractInfo] = useState<{
    address: ethers.Contract["address"];
    tokenName: string;
    qitbalance: ethers.BigNumber;
    allowance: ethers.BigNumber;
    lockupEnds: number;
    pendingWithdrawals: ethers.BigNumber;
  }>({
    address: "-",
    tokenName: "QIT",
    qitbalance: BigNumber.from(0),
    allowance: BigNumber.from(0),
    lockupEnds: 0,
    pendingWithdrawals: BigNumber.from(0),
  });
  const minDeposit = 1000; // this will be updated to actual value in initiateContract()

  const { library, chainId, account, active } = useWeb3React();
  const QIT = new ethers.Contract("0x4C4470D0B9c0dD92B25Be1D2fB5181cdA7e6E3f7", myPageAbi, library);
  const ERC20 = new ethers.Contract(
    "0xEcAD8721BA48dBdc0eac431D68A0b140F07c0801",
    erc20ABI,
    library
  );
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  async function getHoldingValue(_address: string) {
    const _holdingValue = await QIT.getHoldingValue(_address);

    setHoldingValue(_holdingValue.toString());
  }

  async function getDepositValue(value: string) {
    const number = parseInt(value, 10);
    if (value !== "" || number == 0) {
      if (number >= minDeposit) {
        const n = ethers.utils.parseEther(value);
        const deposit = await QIT.getDepositReturn(n);
        setOutputValue(ethers.utils.formatUnits(deposit, 6));
      } else {
        //TODO: Change to red and show Min Deposit = $x
        console.log("Input is less than minDeposit");
      }
    }
  }

  // Logic to determine if user can swap or needs approval first
  async function swapOrApprove() {
    // DEPOSITS
    if (currentTab == "deposit" && inputValue !== "") {
      if (contractInfo.allowance.toBigInt() < ethers.utils.parseEther(inputValue).toBigInt()) {
        const ERC20connect = ERC20.connect(library.getSigner());
        await ERC20connect.approve(QIT.address, ethers.utils.parseEther("10000000000000"), {
          gasLimit: 100000,
        });
        // update after completion
      } else {
        const QITconnect = QIT.connect(library.getSigner());
        await QITconnect.depositToFund(ethers.utils.parseEther(inputValue));
        console.log("Execute Swap");
      }
    }

    // WITHDRAWALS
    if (currentTab == "withdraw") {
      console.log("Execute Withdrawal");
    }
  }

  // Initiates the contract values
  async function initiateContract() {
    setContractInfo({
      address: QIT.address,
      tokenName: "QIT",
      qitbalance: await QIT.balanceOf(account),
      allowance: await ERC20.allowance(account, QIT.address),
      lockupEnds: await QIT.withdrawalLockTime(account),
      pendingWithdrawals: await QIT.pendingWithdrawals(account),
    });
    if (account != null || account !== undefined) {
      await getHoldingValue(account!);
      console.log(account);
    } else {
      console.log("No account");
    }
  }

  // Updates contract values
  // TODO: Change initiateContract() naming so we don't need this duplicate of it
  async function basicUpdate() {
    setContractInfo({
      address: contractInfo.address,
      tokenName: contractInfo.tokenName,
      qitbalance: await QIT.balanceOf(account),
      allowance: await ERC20.allowance(account, QIT.address),
      lockupEnds: await QIT.withdrawalLockTime(account),
    });
    if (account !== null || account !== undefined) {
      getHoldingValue(account!);
    } else {
      console.log("No account");
    }
  }

  // If there is a provider, but no account then initiateContract(). Keeps track of 'active' value changes
  useEffect(() => {
    if (active && contractInfo.address === "-") {
      initiateContract();
    }
  }, [active]);

  // Monitor and log transactions
  // TODO: Not working yet...
  useEffect(() => {
    if (contractInfo.address !== "-") {
      QIT.on("Transfer", (from, to, amount, event) => {
        console.log(from, to, amount, event);
      });
    }
  }, [contractInfo.address]);

  // Trigger when qit balance changes and call update of values
  useEffect(() => {
    async function update() {
      await basicUpdate();
    }
    if (contractInfo.address !== "-") {
      update();
    }
  }, [contractInfo.qitbalance]);

  // Returns swap button with correct body text based on input value
  function changeSwapButtonText() {
    if (inputValue == "") {
      setSwapButtonText("Enter Amount");
    }
    if (inputValue !== "") {
      if (contractInfo.allowance.toBigInt() < ethers.utils.parseUnits(inputValue, 6).toBigInt()) {
        setSwapButtonText("Give permission to deposit USDT");
      }
      if (contractInfo.allowance.toBigInt() >= ethers.utils.parseUnits(inputValue, 6).toBigInt()) {
        setSwapButtonText("Swap");
      }
    }
  }

  useEffect(() => {
    changeSwapButtonText();
  }, [inputValue]);

  return (
    <>
      <span>Account: {account}</span>
      <br />
      <span>Network ID: {chainId}</span>

      {/* Exchange */}
      <div className="min-h-screen">
        {/* Stats */}
        <div className="flex flex-col items-center justify-center w-full px-4 my-10 sm:flex-row">
          {/* Holdings */}
          <div className="w-full max-w-lg min-h-full px-6 py-4 my-3 overflow-hidden text-gray-900 rounded-lg shadow-lg mx-7 bg-neutral-100 ">
            {/* Title */}
            <div className="mb-2 text-xl font-bold">My Holdings</div>

            <div>
              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Tokens
                </span>
                <span className="text-right">
                  {(+ethers.utils.formatUnits(contractInfo.qitbalance, 6)).toFixed(2)} QIT
                </span>
              </div>

              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Value
                </span>
                <span className="text-right">{(+ethers.utils.formatEther(holdingValue)).toFixed(2)} USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Change
                </span>
                <span className="text-right">12%</span>
              </div>
            </div>
          </div>
          {/* Withdrawals */}
          <div className="w-full max-w-lg min-h-full px-6 py-4 my-3 overflow-hidden text-gray-900 rounded-lg shadow-lg mx-7 bg-neutral-100 ">
            {/* Title */}
            <div className="mb-2 text-xl font-bold">My Withdrawals</div>

            <div>
              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Withdrawal Lockup Ends
                </span>
                <span className="text-right">{new Date(contractInfo.lockupEnds*1000).toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Pending Withdrawals
                </span>
                <span className="text-right">0 QIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swap */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-start w-full max-w-md px-4 mt-10 text-black min-h-90vh">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2 ">
                  <button
                    onClick={() => {
                      setCurrentTab("withdrawal");
                    }}
                    className={classNames(
                      currentTab == "withdrawal"
                        ? "text-gray-100 border-gray-100 inline-block p-4  border-b-2  rounded-t-lg active"
                        : "inline-block p-4 rounded-t-lg active transition-all ease-in duration-100"
                    )}
                  >
                    Withdrawal
                  </button>
                </li>
                <li className="mr-2 ">
                  <button
                    onClick={() => {
                      setCurrentTab("deposit");
                    }}
                    className={classNames(
                      currentTab == "deposit"
                        ? " text-gray-100 border-gray-100 inline-block p-4  border-b-2  rounded-t-lg active"
                        : "inline-block p-4 rounded-t-lg active transition-all ease-in duration-100 "
                    )}
                    aria-current="page"
                  >
                    Deposit
                  </button>
                </li>
              </ul>
            </div>

            {/* Input */}
            <div className="w-full mt-5">
              <form>
                <div className="relative z-0 flex w-full mb-6 group">
                  <input
                    onChange={(e) => {
                      setInputValue(e.target.value), getDepositValue(e.target.value);
                      // changeSwapButtonText();
                    }}
                    type="number"
                    name="floating_input"
                    id="floating_input"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_input"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    From
                  </label>
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                    {currentTab == "withdrawal" ? contractInfo?.tokenName : "USDT"}
                  </span>
                </div>
                <div className="relative z-0 flex w-full mb-6 group">
                  <input
                    type="number"
                    name="floating_output"
                    id="floating_output"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    disabled
                  />
                  <label
                    htmlFor="floating_output"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    To {outputValue}
                  </label>
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                    {currentTab == "deposit" ? "QIT" : "USDT"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    swapOrApprove();
                  }}
                  type="button"
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  {swapButtonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
