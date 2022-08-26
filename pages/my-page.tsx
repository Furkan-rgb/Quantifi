import { useState } from "react";

function MyPage() {
  const [currentTab, setCurrentTab] = useState<string>("withdrawal");

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  function changeTab(tab: string) {
    setCurrentTab(tab);
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center w-full px-4 my-10 sm:flex-row">
          {/* Holdings */}
          <div className="w-full max-w-lg min-h-full px-6 py-4 my-3 overflow-hidden text-gray-900 rounded-lg shadow-lg mx-7 bg-neutral-100 ">
            {/* Title */}
            <div className="mb-2 text-xl font-bold">My Holdings</div>

            <div>
              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Tokens
                </span>
                <span className="text-right">QIT</span>
              </div>

              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Value
                </span>
                <span className="text-right">USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Change
                </span>
                <span className="text-right">12%</span>
              </div>
            </div>
          </div>

          {/* Withdrawals */}
          <div className="w-full max-w-lg min-h-full px-6 py-4 my-3 overflow-hidden text-gray-900 rounded-lg shadow-lg mx-7 bg-neutral-100 ">
            {/* Title */}
            <div className="mb-2 text-xl font-bold">My Withdrawals</div>

            <div>
              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Withdrawal Lockup Ends
                </span>
                <span className="text-right">21 May 2022 11:48 AM</span>
              </div>

              <div className="flex justify-between">
                <span className="block py-1 mb-2 mr-2 text-base font-semibold text-gray-700 rounded-full">
                  Pending Withdrawals
                </span>
                <span className="text-right">0 QIT</span>
              </div>
            </div>
          </div>
        </div>
        {/* Swap */}
        <div className="flex flex-col items-start justify-center w-full px-4 mt-10 text-black min-h-90vh sm:flex-row">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2 ">
                <button
                  onClick={() => {
                    setCurrentTab("withdrawal");
                  }}
                  className={classNames(
                    currentTab == "withdrawal"
                      ? "text-gray-100 border-gray-100 inline-block p-4  border-b-2  rounded-t-lg active"
                      : "inline-block p-4 rounded-t-lg active transition-all ease-in duration-100"
                  )}
                >
                  Withdrawal
                </button>
              </li>
              <li className="mr-2 ">
                <button
                  onClick={() => {
                    setCurrentTab("deposit");
                  }}
                  className={classNames(
                    currentTab == "deposit"
                      ? " text-gray-100 border-gray-100 inline-block p-4  border-b-2  rounded-t-lg active"
                      : "inline-block p-4 rounded-t-lg active transition-all ease-in duration-100 "
                  )}
                  aria-current="page"
                >
                  Deposit
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;

// {
//   classNames(
//     item.current ? " text-white" : "text-gray-300 bg-gradient-to-r hover:text-white ",
//     "px-3 py-2 rounded-md text-sm font-medium"
//   );
// }
