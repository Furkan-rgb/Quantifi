import React, { Fragment, useContext, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import ErrorMessage from "../ErrorMessage";
import { ethers } from "ethers";
import { toHex, truncateAddress } from "../utils";
import { networkParams } from "../utils/networks";
import SelectWalletModal from "../Modal";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function WalletConnectButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const { library, active, account, activate, deactivate, chainId, connector, error, setError } =
    useWeb3React();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  const changeNetwork = async ({ networkName }: { networkName: string }) => {
    try {
      if (!library.provider) {
        console.error("No provider available");
      }

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
    setError(error!);
    await changeNetwork({ networkName });
    const _error = await error;
    console.error("Network switch error " + _error);
    // window.location.reload();
  };

  const networkChanged = (chainId: number) => {
    console.log({ chainId });
  };

  useEffect(() => {
    if (!library) {
      return;
    }

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

  const connectWalletOnPageLoad = async () => {
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
  }, [active]);

  function ConnectButtonContent() {
    if (!active) {
      return <span className="relative block rounded-md sm:inline">Connect Wallet</span>;
    }

    if (typeof chainId !== undefined) {
      if (connector?.supportedChainIds?.includes(chainId!) == true) {
        return <span className="block">{truncateAddress(account)}</span>;
      }
    }

    if (isUnsupportedChainIdError) {
      return <span className="block">Wrong Network</span>;
    }

    return <span className="block">Temp</span>;
  }
  useEffect(() => {
    if (!library) {
      return;
    }
    library.provider.on("chainChanged", networkChanged, ConnectButtonContent());
  }, [account, chainId]);

  return (
    <>
      <span>Chainid {chainId}</span>
      <button
        onClick={() => {
          toggleModal();
        }}
        className="text-base relative inline-flex items-center justify-center p-0.5 mb-2 sm:mr-2 font-medium rounded-lg group bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] group-hover:from-[#4FC0FF] group-hover:via-[#6977EE] group-hover:to-[#FF6098] hover:text-white dark:text-white focus:ring-4 focus:outline-none "
      >
        {/* Inner button content */}
        <span className="transition-all ease-in duration-100 sm:inline block relative sm:px-5 sm:py-2.5 px-2 py-2 text-sm sm:text-base rounded-md bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
          <ConnectButtonContent />
        </span>
      </button>
      <SelectWalletModal modalOpen={modalOpen} toggleModal={toggleModal} />
      {/* Modal for unsupported chain id */}
      <Transition.Root show={isUnsupportedChainIdError} as={Fragment}>
        <Dialog as="div" className="absolute z-20" onClose={setOpen}>
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
                    onClick={() => handleNetworkSwitch("tbsc")}
                  >
                    Switch network
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 pt-2 mt-1 text-base font-medium text-black bg-transparent border rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                      setOpen(false), disconnect();
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
