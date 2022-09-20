import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Price of QIT",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
      backgroundColor: [
        "rgba(220, 218, 251)",
        "rgba(253, 147, 128)",
        "rgba(220, 218, 251)",
        "rgba(253, 147, 128)",
        "rgba(220, 218, 251)",
        "rgba(253, 147, 128)",
        "rgba(220, 218, 251)",
        "rgba(253, 147, 128)",
        "rgba(220, 218, 251)",
        "rgba(253, 147, 128)",
        "rgba(220, 218, 251)",
        "rgba(253, 147, 128)",
      ],
      borderWidth: 1,
    },
  ],
};

const config = {
  type: "bar",
  responsive: true,
  data: data,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Price of QIT",
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

function Barchart() {
  return (
    <>
      <Bar data={data} options={config} />
    </>
  );
}

export default Barchart;
