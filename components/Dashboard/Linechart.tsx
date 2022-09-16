import { Line } from "react-chartjs-3";

function Linechart() {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const dataLineChart = {
    labels: labels,
    datasets: [
      {
        label: "UST",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const configLineChart = {
    type: "line",
    dataLineChart,
    options: {},
  };

  return (
    <div>
      <div className="px-5 py-3">Fund Profits</div>
      <Line data={dataLineChart} options={configLineChart}></Line>
    </div>
  );
}

export default Linechart;
