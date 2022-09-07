import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { ethers } from "ethers";
import { toHex, truncateAddress } from "../utils";
import { networkParams } from "../utils/networks";
import SelectWalletModal from "../Modal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";

function WalletConnectButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const { library, active, account, activate, deactivate, chainId } = useWeb3React();

  const changeNetwork = async ({
    networkName,
    setError,
  }: {
    networkName: string;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  }) => {
    try {
      if (!library.provider) throw new Error("No crypto wallet found");
      await library.provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networkParams[networkName],
          },
        ],
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleNetworkSwitch = async (networkName: string) => {
    setError(undefined);
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId: number) => {
    console.log({ chainId });
  };

  useEffect(() => {
    if (!library) return;
    library.provider.on("chainChanged", networkChanged);

    return () => {
      library.provider.removeListener("chainChanged", networkChanged);
    };
  }, []);

  function toggleModal() {
    if (modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.removeItem("provider");
    } catch (e) {
      console.log(e);
    }
  }

  // When reloading the page, connect to the last used wallet
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("provider") !== null) {
        try {
          await activate(connectors.injected);
          localStorage.setItem("provider", "injected");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

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
      <button
        onClick={() => {
          handleNetworkSwitch("polygon");
        }}
      >
        Polygon
      </button>
    </>
  );
}

export default WalletConnectButton;
