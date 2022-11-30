const staking = [
  {
    id: 1,
    amount: "12 QNTFI",
    locked_date: "23 September 2023",
    locked_time: "22:14",
  },
  {
    id: 2,
    amount: "3 QNTFI",
    locked_date: "27 September 2023",
    locked_time: "14:40",
  },
];

export function Unstaking() {
  return (
    <div className="w-full">
      <div className="mt-8 -mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
              >
                Amount
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Locked Date
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:block"
              >
                Locked Time
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                <span className="sr-only">Unstake</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staking.map((stake) => (
              <tr key={stake.id}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6 lg:pl-8">
                  {stake.amount}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {stake.locked_date}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 whitespace-nowrap md:block ">
                  {stake.locked_time}
                </td>
                <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6 lg:pr-8">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Unstake<span className="sr-only">, {stake.amount}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
