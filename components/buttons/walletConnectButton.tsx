import React, { Fragment, useContext, useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { ethers } from "ethers";
import { toHex, truncateAddress } from "../utils";
import { networkParams } from "../utils/networks";
import SelectWalletModal from "../Modal";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { ConnectButton } from "@rainbow-me/rainbowkit";

function ConnectButtonContent({
  hover,
  active,
  chainId,
  account,
  connector,
  wrongChain,
}: {
  hover: boolean;
  active: boolean;
  chainId: number | undefined;
  account: string | null | undefined;
  connector: any;
  wrongChain: boolean;
}) {
  if (hover && active) {
    return <span className="block">Disconnect</span>;
  }

  if (!active) {
    return <span className="relative block rounded-md sm:inline">Connect Wallet</span>;
  }

  if (typeof chainId !== undefined) {
    if (connector?.supportedChainIds?.includes(chainId!) == true) {
      return <span className="block">{truncateAddress(account)}</span>;
    }
  }

  if (wrongChain) {
    return <span className="block">Wrong Network</span>;
  }

  return <span className="block">Undefined</span>;
}

function WalletConnectButton() {
  const router = useRouter();
  const [connectedBtnHover, setConnectedBtnHover] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [wrongChain, setWrongChain] = useState(false);

  const { library, active, account, activate, deactivate, chainId, connector, error, setError } =
    useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  async function changeNetwork() {
    console.log("Chain id is: " + chainId);
    if (library) {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          // params: [{ chainId: "0x38" }],
          params: [{ chainId: "0x61" }],
        });
      } catch (err: any) {
        console.log(err);
        setError(err.message);
        if (err.code === 4902) {
          console.log("Adding network");
          try {
            await library?.provider?.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  ...networkParams["tbsc"],
                },
              ],
            });
          } catch (err: any) {
            console.log(err);
            setError(err.message);
          }
        }
        setWrongChain(false);
      }
    }
  }

  function handleNetworkSwitch() {
    console.log("Current Chain Id: ", chainId);
    // 56 mainnnet 97 testnet
    if (chainId !== 97) {
      setWrongChain(true);
      return;
    }
    setWrongChain(false);
  }

  function toggleModal() {
    console.log("button click");
    // If theres no web3 wallet connected, open the modal
    if (!active) {
      // If the modal is already open, close it
      if (connectModalOpen) {
        setConnectModalOpen(false);
      } else {
        setConnectModalOpen(true);
      }
      // If theres a web3 wallet connected, disconnect it
    } else if (active) {
      console.log("disconnecting");
      disconnect();
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.removeItem("provider");
    } catch (e) {
      console.log("Error disconnecting: ", e);
    }
  }

  const connectWalletOnPageLoad = async () => {
    console.log("Provider is:", localStorage?.getItem("provider"));
    if (router.route === "/") {
      return;
    }
    if (localStorage?.getItem("provider") !== null) {
      try {
        await activate(connectors.injected);
        localStorage.setItem("provider", "injected");
      } catch (error: any) {
        setError(error);
      }
    }
  };

  // When reloading the page, connect to the last used wallet
  useEffect(() => {
    connectWalletOnPageLoad();
  }, [active, chainId, account]);

  useEffect(() => {
    if (!library) {
      console.log("can't find library");
      return;
    }
    handleNetworkSwitch();
    connectWalletOnPageLoad();
  }, [account, chainId, active, library]);

  return (
    // Rainbowkit ConnectButton
    <ConnectButton />
  );
}

export default WalletConnectButton;
