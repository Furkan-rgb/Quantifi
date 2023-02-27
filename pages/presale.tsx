import { fetchSigner } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import LiquiditySwapCard2 from "../components/swap/LiquiditySwapCardPresale";
import { timeout } from "../components/utils/timeout";
import seedRoundABI from "../components/abi/seedRound.json";
import erc20ABI from "../components/abi/erc20.json";
import vestingABI from "../components/abi/vesting.json";
import { useAccount, useProvider } from "wagmi";
import Notification, { NotificationContent } from "../components/Notification";

function presale() {
  const [showNotification, setNotificationShow] = useState(false);
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationContent["status"]>("info");
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationTitle, setNotificationTitle] = useState<string>("");

  const [currentTab, setCurrentTab] = useState<string>("deposit");
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>();
  const [swapButtonText, setSwapButtonText] = useState<string>("Loading...");
  const [holdingValue, setHoldingValue] = useState<string>("0");
  const [contractInfo, setContractInfo] = useState<{
    address: ethers.Contract["address"];
    tokenName: string;
    qntfibalance: ethers.BigNumber;
    usdtallowed: ethers.BigNumber;
    usdtbalance: ethers.BigNumber;
    allowance: ethers.BigNumber;
  }>({
    address: "-",
    tokenName: "QNTFI",
    qntfibalance: BigNumber.from(0),
    usdtallowed: BigNumber.from(0),
    usdtbalance: BigNumber.from(0),
    allowance: BigNumber.from(0),
  });

  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const minDeposit = 1000; // this will be updated to actual value
  const minTopup = 1000; // this will be updated to actual value
  const [loading, setLoading] = useState<boolean>(false); // loading state for button

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const provider = useProvider();

  const VEST = new ethers.Contract(
    "0x75cbCF9D4FF9a699542599e29ad366f83C4c5E92",
    vestingABI,
    provider
  );

  const SEED = new ethers.Contract(
    "0x463eb27921b1372f3d09c822e44c22d41ff28a38",
    seedRoundABI,
    provider
  );

  const USDT = new ethers.Contract(
    "0x55d398326f99059ff775485246999027b3197955",
    erc20ABI,
    provider
  );

  async function getHoldingValue() {
    if (isConnecting) {
      console.log("Connecting...");
      return;
    }
    if (isDisconnected) {
      console.log("Disconnected");
      return;
    }
    if (isConnected) {
      console.log("Connected", address);
      try {
        const _holdingValue = await USDT.balanceOf(address);
        setHoldingValue(_holdingValue.toString());
      } catch (error) {
        console.error("Couldn't get holdingValue: " + error);
      }
    }
  }

  async function getDepositValue(value: string) {
    const number = parseInt(value, 10);
    const numQNTFI=number*20; // price is 5c
    if (value !== "" || number == 0) {
      if (number >= minDeposit) {
          setOutputValue(numQNTFI.toFixed(0));
      } else {
        setOutputValue("Min deposit is " + minDeposit);
      }
    } else {
      setOutputValue("0");
    }
  }

  function changeNotificationContent(
    title: NotificationContent["title"],
    message: NotificationContent["message"],
    status: NotificationContent["status"]
  ) {
    setNotificationTitle(title);
    setNotificationMessage(message);
    setNotificationStatus(status);
  }

  // Logic to determine if user can swap or needs approval first
  async function swapOrApprove() {
    const signer = await fetchSigner();
    // DEPOSITS
    if (currentTab == "deposit" && inputValue !== "" && signer) {
      if (contractInfo.allowance.toBigInt() < ethers.utils.parseEther(inputValue).toBigInt()) {
        const ERC20connect = USDT.connect(signer);
        try {
          setLoading(true);
          console.log("Approving");
          // Approving
          const transaction = await ERC20connect.approve(
            SEED.address,
            ethers.utils.parseEther("100000")
          );
          changeNotificationContent("In progress", "Approval Requested", "loading");
          setNotificationShow(true);
          const receipt = await transaction.wait();

          changeNotificationContent("Complete", "Approval was successful", "success");
          console.log(receipt);
          _setContractInfo();
          await timeout(2000);
          setNotificationShow(false);
        } catch (error) {
          changeNotificationContent("Failed", "Approval was rejected", "error");
          setNotificationShow(true);
          console.log("Wallet transaction did not complete");
        } finally {
          setLoading(false);
        }
        // update after completion
      } else {
        const SEEDconnect = SEED.connect(signer);
        try {
          setLoading(true);
          console.log("Depositing");
          // Depositing
          const transaction = await SEEDconnect.buyToken(ethers.utils.parseEther(inputValue));
          console.log("Transaction: ", transaction);
          changeNotificationContent("In progress", "Deposit Requested", "loading");
          setNotificationShow(true);
          const receipt = await transaction.wait();

          changeNotificationContent("Complete", "Deposit was successful", "success");
          console.log("Receipt: ", receipt);

          await timeout(2000);
          setNotificationShow(false);
          _setContractInfo();
        } catch (error) {
          changeNotificationContent("Failed", "Deposit was rejected", "error");
          setNotificationShow(true);
          console.log("Unable to complete Deposit");
        } finally {
          setLoading(false);
        }
      }
    } else {
      console.log("No signer");
    }
  }

  // Sets the contract values
  async function _setContractInfo() {
    setLoading(true);
    try {
      setContractInfo({
        address: QNTFI.address,
        tokenName: "QNTFI",
        qitbalance: await QNTFI.balanceOf(address),
        usdtallowed: await SEED.allowed(address),
        usdtbalance: await USDT.balanceOf(address),
        allowance: await USDT.allowance(address, SEED.address),
      });
      console.log("Contract Info: ", contractInfo);
    } catch (error) {
      console.error("Couldn't set QIT contract info: " + error);
    } finally {
      setLoading(false);
      console.log("Contract Info: ", contractInfo);
    }

    if (isConnected) {
      await getHoldingValue();
    } else if (isConnecting) {
      console.log("Connecting account");
    } else {
      console.log("Not connected");
    }
  }
  // account change -> contract info update
  useEffect(() => {
    if (address !== undefined) {
      _setContractInfo();
      getVestingInfo();
    }
  }, [address]);

  // Returns swap button with correct body text based on input value
  function changeSwapButtonText() {
    if (inputValue == "") {
      setSwapButtonText("Enter Amount");
    }
    if (inputValue !== "") {
      if (currentTab === "withdrawal") {
        setSwapButtonText("Swap QIT for USDT");
      } else if (
        contractInfo.allowance.toBigInt() < ethers.utils.parseUnits(inputValue, 6).toBigInt() &&
        currentTab === "deposit"
      ) {
        setSwapButtonText("Give permission to deposit USDT");
      } else if (
        contractInfo.allowance.toBigInt() >= ethers.utils.parseUnits(inputValue, 6).toBigInt()
      ) {
        setSwapButtonText("Swap USDT for QIT");
      }
    }
  }
  // Keeps track of input value to update swap button text
  useEffect(() => {
    changeSwapButtonText();
  }, [inputValue, contractInfo.allowance, currentTab]);

  function resetOutputValue(_currentTab: string) {
    if (_currentTab === currentTab) {
      return;
    }
    setOutputValue("");
  }

  const [vestInfo, setVestInfo] = useState({
    vestStart: 0,
    vestFinish: 0,
    amount: 0,
    claimed: 0,
  });
  function getVestingInfo() {
    console.log("Getting vesting info for: ", address);
    try {
      const vestingInfo = VEST.tokensVested(address);
      console.log("Vesting Info: ", vestingInfo);
      setVestInfo(vestingInfo);
    } catch (error) {
      console.log("Error getting vesting info: ", error);
    }
  }

  return (
    <div className="flex w-screen flex-col justify-center bg-black">
      <header className="flex w-full justify-center text-center">
        <div className="prose">
          <h1 className="text-slate-50">Presale</h1>
        </div>
      </header>
      <main className="flex w-full flex-col items-center justify-center">
        <div className="mt-4 rounded-md bg-white p-4">
          <h2>Vest Info</h2>
          <p>Vesting Started: {vestInfo.vestStart}</p>
          <p>Vesting Finished: {vestInfo.vestFinish}</p>
          <p>Vesting Amount: {vestInfo.amount}</p>
          <p>Vesting Claimed: {vestInfo.claimed}</p>
        </div>
        <LiquiditySwapCard2
          loading={loading}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          resetOutputValue={resetOutputValue}
          swapButtonText={swapButtonText}
          inputValue={inputValue}
          setInputValue={setInputValue}
          outputValue={outputValue}
          getDepositValue={getDepositValue}
          getWithdrawalValue={getWithdrawalValue}
          swapOrApprove={swapOrApprove}
          USDTBalance={(+ethers.utils.formatEther(contractInfo.usdtbalance)).toFixed(2)}
        />
      </main>
      {/* Notification */}
      <Notification
        title={notificationTitle}
        message={notificationMessage}
        show={showNotification}
        status={notificationStatus}
        setNotificationShow={setNotificationShow}
      />
    </div>
  );
}

export default presale;
