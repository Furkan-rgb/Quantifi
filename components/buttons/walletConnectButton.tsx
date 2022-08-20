import React from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

function WalletConnectButton() {
  const providerOptions = {};

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      console.log(web3ModalProvider); // This is the provider
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={connectWallet}
      className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
    >
      <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
        Connect {""}
        <span className="sm:inline block relative rounded-md">Wallet</span>
      </span>
    </button>
  );
}

export default WalletConnectButton;
