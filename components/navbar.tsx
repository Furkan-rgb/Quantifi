import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Fragment } from "react";
import WalletConnectButton from "./buttons/walletConnectButton";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/", current: router.pathname == "/" ? true : false },
    {
      name: "Dashboard",
      href: "/dashboard",
      current: router.pathname == "/dashboard" ? true : false,
    },
    { name: "QIT Fund", href: "/qit-fund", current: router.pathname == "/qit-fund" ? true : false },
    {
      name: "Governance",
      href: "/governance",
      current: router.pathname == "/governance" ? true : false,
    },
    {
      name: "Docs",
      href: "Https://joel-lowe.gitbook.io/quantifi",
      current: router.pathname == "Https://joel-lowe.gitbook.io/quantifi" ? true : false,
    },
  ];

  return (
    <Disclosure as="nav" className="border-indigo-500 rounded-bl-lg rounded-br-lg">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto sm:px-10 lg:px-12">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img className="block w-auto h-8 lg:hidden" src="/logo.svg" alt="QuantifiLogo" />
                  <img className="hidden w-auto h-8 lg:block" src="/logo.svg" alt="QuantifiLogo" />
                </div>

                {/* Map through nav items */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? " text-white" : "text-gray-300  hover:text-white ",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <div className="absolute inset-y-0 right-0 flex items-center pt-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <WalletConnectButton></WalletConnectButton>
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Disclosure.Panel className="absolute inset-x-0 z-10 p-2 transition origin-top-right transform top-14 md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 overflow-hidden bg-gray-900 rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? " text-white" : "text-gray-300  hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
