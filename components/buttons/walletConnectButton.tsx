import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toHex, truncateAddress } from "../utils";
import { networkParams } from "../networks";
import SelectWalletModal from "../Modal";
import { useWeb3React } from "@web3-react/core";

function WalletConnectButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const { active, account } = useWeb3React();

  function toggleModal() {
    if (modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          // connectWallet(),
          toggleModal();
        }}
        className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
      >
        {/* Inner button content */}
        {!active ? (
          <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
            Connect {""}
            <span className="relative block rounded-md sm:inline">Wallet</span>
          </span>
        ) : (
          <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
            <span className="block">{truncateAddress(account)}</span>
          </span>
        )}
      </button>
      <SelectWalletModal modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
}

export default WalletConnectButton;
