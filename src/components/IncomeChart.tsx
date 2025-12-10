import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeChart = ({ income, expense }: { income: number; expense: number }) => {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [income, Math.abs(expense)], // Ensure expense is positive for the chart
        backgroundColor: ['#00ff7f', '#ff4b4b'], // Green for income, Red for expense
        borderColor: ['#00c857', '#ff0000'], // Matching border colors
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default IncomeChart;
