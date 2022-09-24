import Barchart from "../components/Dashboard/Barchart";
import Doughnut from "../components/Dashboard/Doughnut";
import Linechart from "../components/Dashboard/Linechart";

// our-domain.com/dashboard
function Dashboard() {
  const stats = [
    { name: "Number of Investors", stat: "21,348,64" },
    { name: "Avg. Investment into Fund", stat: "5,276,13 UST" },
  ];
  return (
    <div className="flex justify-center py-4 text-black">
      <div className="grid self-center max-w-5xl min-h-screen grid-cols-2 gap-4 p-4 text-black">
        <div className="col-span-2 bg-white rounded-lg dark:bg-slate-100 sm:col-span-1">
          <Doughnut></Doughnut>
        </div>
        <div className="col-span-2 p-3 bg-white rounded-lg dark:bg-slate-100 sm:col-span-1">
          <Barchart></Barchart>
        </div>
        <div className="col-span-2 p-3 bg-white rounded-lg dark:bg-slate-100">
          <Linechart></Linechart>
        </div>

        {stats.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center justify-center w-full col-span-1 px-4 py-5 overflow-hidden text-center bg-white rounded-lg shadow dark:bg-slate-100 sm:flex sm:flex-col sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 text-clip">{item.name}</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {item.stat}
            </dd>
          </div>
        ))}

        <div className="col-span-2 p-3 bg-white rounded-lg dark:bg-slate-100">
          <Linechart></Linechart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
