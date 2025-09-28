import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetChart({ budgetData }) {
  if (!budgetData || budgetData.length === 0) {
    return <div>No budget data available</div>;
  }

  const data = {
    labels: budgetData.map(item => item.title),
    datasets: [
      {
        label: 'Budget',
        data: budgetData.map(item => item.budget),
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19'
        ],
        borderColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Budget Breakdown',
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default BudgetChart;
