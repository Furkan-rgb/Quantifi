import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../components/utils/connectors";

export default function SelectWalletModal(props: any) {
  const { activate } = useWeb3React();

  const setProvider = (type: any) => {
    window.localStorage.setItem("provider", type);
  };

  return (
    <Transition.Root show={props.modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          props.toggleModal();
        }}
      >
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
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        activate(connectors.injected);
                        setProvider("injected");
                        props.toggleModal();
                      }}
                      className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-black border rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      <img
                        className="mr-1"
                        src="/mm.png"
                        alt="Coinbase Wallet Logo"
                        width={25}
                        height={25}
                        border-radius="3px"
                      />
                      <span className="self-center">MetaMask</span>
                    </button>

                    <div className="mt-2 ">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-center text-black border rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => {
                          activate(connectors.coinbaseWallet);
                          setProvider("coinbaseWallet");
                          props.toggleModal();
                        }}
                      >
                        <img
                          className="mr-1"
                          src="/cbw.png"
                          alt="Coinbase Wallet Logo"
                          width={25}
                          height={25}
                          border-radius="3px"
                        />
                        <span className="self-center">Coinbase Wallet</span>
                      </button>
                    </div>

                    <div className="mt-2">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-black border rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => {
                          activate(connectors.walletConnect);
                          setProvider("walletConnect");
                          props.toggleModal();
                        }}
                      >
                        <img
                          className="mr-1"
                          src="/wc.png"
                          alt="Coinbase Wallet Logo"
                          width={25}
                          height={25}
                          border-radius="3px"
                        />
                        <span className="self-center">Wallet Connect</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => props.toggleModal()}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
