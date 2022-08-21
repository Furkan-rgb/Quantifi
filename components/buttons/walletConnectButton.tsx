import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

// All the wallets for the modal
const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "QuantiFi", // Required
      infuraId: "https://goerli.infura.io/v3/9401913c15a04b33adea88667cf79f6b", // Required
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.WALLETCONNECT_INFURA_ID,
    },
  },
};

function WalletConnectButton() {
  const [modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [library, setLibrary] = useState<ethers.providers.Web3Provider | null>(null);
  // const [web3Signer, setWeb3Signer] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<ethers.providers.Network | null>(null);

  async function connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider as any);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setWeb3Modal(web3Modal);
      setLibrary(library);
      if (accounts) {
        setAccount(accounts[0]);
        setNetwork(network);
      }
      console.log(library);
      console.log(account); // This is the account
      console.log(network.chainId); // This is the network
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // Button to connect wallet
    <button
      onClick={connectWallet}
      className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
    >
      {/* Inner button content */}
      {library == null ? (
        <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
          Connect {""}
          <span className="sm:inline block relative rounded-md">Wallet</span>
        </span>
      ) : (
        <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
          {account}
          <span className="block">{"chainId: " + network?.chainId}</span>
        </span>
      )}
    </button>
  );
}

export default WalletConnectButton;
