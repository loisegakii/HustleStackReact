
import { Line, Doughnut } from 'react-chartjs-2';
import { useRef } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

function Analytics() {
  const lineRef = useRef(null);
  const doughnutRef = useRef(null);

  const exportChartAsImage = async () => {
    const canvas = lineRef.current.canvas;
    const image = await html2canvas(canvas.parentNode);
    const link = document.createElement("a");
    link.download = "analytics.png";
    link.href = image.toDataURL("image/png");
    link.click();
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1500, 1000, 1800, 1600],
        borderColor: '#16a34a',
        backgroundColor: '#bbf7d0',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: [900, 1100, 950, 1200, 1400],
        borderColor: '#ef4444',
        backgroundColor: '#fecaca',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const categoryData = {
    labels: ['Rent', 'Groceries', 'Transport', 'Utilities', 'Entertainment'],
    datasets: [
      {
        label: 'Expense Distribution',
        data: [500, 300, 200, 150, 100],
        backgroundColor: ['#f97316', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
        <button
          onClick={exportChartAsImage}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-md"
        >
          Export as Image
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Income vs Expenses (Monthly)</h3>
          <Line ref={lineRef} data={monthlyData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Spending by Category</h3>
          <Doughnut ref={doughnutRef} data={categoryData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
