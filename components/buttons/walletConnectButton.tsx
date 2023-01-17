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
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  ...networkParams["bsc"],
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
    console.log(chainId);
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
      console.log(e);
    }
  }

  const connectWalletOnPageLoad = async () => {
    console.log("Route: " + router.route);
    console.log(localStorage?.getItem("provider"));
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
    console.log("useEffect");
    connectWalletOnPageLoad();
  }, [active, chainId, account]);

  useEffect(() => {
    if (!library) {
      console.log("can't find library");
      return;
    }
    console.log(library);
    handleNetworkSwitch();
    connectWalletOnPageLoad();
  }, [account, chainId, active, library]);

  return (
    <>
      <button
        onClick={() => {
          toggleModal();
        }}
        onMouseOver={() => {
          if (active) {
            setConnectedBtnHover(true);
          }
        }}
        onMouseLeave={() => {
          if (active) {
            setConnectedBtnHover(false);
          }
        }}
        className="group relative mb-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] p-0.5 text-base font-medium transition-all duration-100 ease-in hover:text-white focus:outline-none focus:ring-4 group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] dark:text-white sm:mr-2"
      >
        {/* Inner button content */}
        <span className="relative block px-2 py-2 text-sm transition-all duration-100 ease-in bg-white rounded-md group-hover:bg-opacity-0 dark:bg-gray-900 sm:inline sm:px-4 sm:py-2 sm:text-base">
          <ConnectButtonContent
            hover={connectedBtnHover}
            active={active}
            chainId={chainId}
            account={account}
            connector={connector}
            wrongChain={wrongChain}
          />
        </span>
      </button>
      <SelectWalletModal modalOpen={connectModalOpen} toggleModal={toggleModal} />
      {/* Modal for unsupported chain id */}
      <Transition.Root show={wrongChain && router.pathname !== "/" && active}>
        <Dialog as="div" className="absolute z-20" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                      <XMarkIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Unsupported Chain
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Currently this page is only supported on the BNB Smart Chain.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 mb-3 sm:mt-6">
                    <div className="p-4 rounded-md bg-yellow-50">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationTriangleIcon
                            className="w-5 h-5 text-yellow-400"
                            aria-hidden="true"
                          />
                        </div>
                        {/* Please switch to continue section  */}
                        <div className="ml-3">
                          <div className="text-sm text-yellow-700 ">
                            <p>Please switch your network to continue.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 pt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => changeNetwork()}
                  >
                    Switch network
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 pt-2 mt-1 text-base font-medium text-black bg-transparent border rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                      disconnect();
                    }}
                  >
                    Disconnect
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default WalletConnectButton;
