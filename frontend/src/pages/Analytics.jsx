import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Analytics() {
  const data = {
    labels: ["Users", "Admins"],
    datasets: [
      {
        label: "System Overview",
        data: [10, 1]
      }
    ]
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Analytics</h1>
      <Bar data={data} />
    </div>
  );
}

export default Analytics;
