import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toHex, truncateAddress } from "../utils";
import { networkParams } from "../networks";

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

let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });
}

function WalletConnectButton() {
  // web3Modal = provider
  const [provider, setProvider] = useState<Web3Modal>();
  const [library, setLibrary] = useState<ethers.providers.Web3Provider>();
  const [account, setAccount] = useState<string | null>();
  const [network, setNetwork] = useState<ethers.providers.Network>();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState<number | null>();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  async function connectWallet() {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();

      setProvider(provider);
      setLibrary(library);

      if (accounts) {
        setAccount(accounts[0]);
        setNetwork(network);
      }

      console.log(library);
      console.log("account: " + account); // This is the account
      console.log("chainId: " + network.chainId); // This is the network
    } catch (connectError: any) {
      setError(connectError.message);
    }
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  // Disconnect
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  // Refresh state
  const refreshState = () => {
    setAccount("");
    setChainId(null);
    setNetwork(undefined);
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  // useEffect(() => {
  //   if (provider?.on) {
  //     const handleAccountsChanged = (accounts: string[]) => {
  //       console.log("accountsChanged", accounts);
  //       if (accounts) setAccount(accounts[0]);
  //     };

  //     const handleChainChanged = (_hexChainId: number) => {
  //       setChainId(_hexChainId);
  //     };

  //     const handleDisconnect = () => {
  //       console.log("disconnect", error);
  //       disconnect();
  //     };

  //     provider.on("accountsChanged", handleAccountsChanged);
  //     provider.on("chainChanged", handleChainChanged);
  //     provider.on("disconnect", handleDisconnect);

  //     return () => {
  //       if (provider) {
  //         provider.removeListener("accountsChanged", handleAccountsChanged);
  //         provider.removeListener("chainChanged", handleChainChanged);
  //         provider.removeListener("disconnect", handleDisconnect);
  //       }
  //     };
  //   }
  // }, [provider]);

  // const switchNetwork = async () => {
  //   try {
  //     await library?.provider.request!({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: toHex(network!) }],
  //     });
  //   } catch (switchError: any) {
  //     if (switchError) return switchError.message;
  //     if (switchError!.code === 4902) {
  //       try {
  //         await library?.provider.request!({
  //           method: "wallet_addEthereumChain",
  //           params: [networkParams[toHex(network!)]],
  //         });
  //       } catch (error: string) {
  //         setError(error);
  //       }
  //     }
  //   }
  // };

  // if (!account) {
  //   return (
  //     <button
  //       onClick={connectWallet}
  //       className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
  //     >
  //       <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
  //         Connect {""}
  //         <span className="relative block rounded-md sm:inline">Wallet</span>
  //       </span>
  //     </button>
  //   );
  // } else if ((account && network?.name == "bnbt") || "bnb") {
  //   return (
  //     <button
  //       onClick={connectWallet}
  //       className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
  //     >
  //       <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
  //         {truncateAddress(account)}
  //         {/* <span className="block">{"chainId: " + network?.chainId}</span> */}
  //         <span className="block">{"Network " + network?.name}</span>
  //       </span>
  //     </button>
  //   );
  // } else {
  //   <button
  //     onClick={connectWallet}
  //     className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
  //   >
  //     <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
  //       Switch network
  //     </span>
  //   </button>;
  // }

  return (
    // Button to connect wallet
    <button
      onClick={connectWallet}
      className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
    >
      {/* Inner button content */}
      {!account ? (
        <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
          Connect {""}
          <span className="relative block rounded-md sm:inline">Wallet</span>
        </span>
      ) : (
        <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
          {truncateAddress(account)}
          {/* <span className="block">{"chainId: " + network?.chainId}</span> */}
          <span className="block">{"Network " + network?.name}</span>
        </span>
      )}
    </button>
  );
}

export default WalletConnectButton;
