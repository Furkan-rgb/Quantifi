import Barchart from "../components/Dashboard/Barchart";
import Doughnut from "../components/Dashboard/Doughnut";
import Linechart from "../components/Dashboard/Linechart";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// our-domain.com/dashboard
function Dashboard() {
  const stats = [
    { name: "Total Subscribers", stat: "71,897" },
    { name: "Avg. Open Rate", stat: "58.16%" },
    { name: "Avg. Click Rate", stat: "24.57%" },
  ];
  return (
    <>
      <div className="grid min-h-screen grid-cols-2 gap-4 p-4 bg-slate-100">
        <div className="p-3 bg-white">
          <Doughnut></Doughnut>
        </div>
        <div className="p-3 bg-white">
          <Barchart></Barchart>
        </div>
        <div className="col-span-2 p-3 bg-white">
          <Linechart></Linechart>
        </div>
        <div className="p-3 shadow-lg">
          <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.name}
                className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
              >
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="col-span-2 p-3 bg-white">
          <Linechart></Linechart>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
