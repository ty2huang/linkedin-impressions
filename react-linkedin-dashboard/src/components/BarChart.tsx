import { useEffect, useState } from "react";
import { TableDataType } from "../types/DatasetResponse";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BarChartProps {
  tableData: TableDataType | null;
}

export function BarChart({ tableData }: BarChartProps) {
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Viewer Demographics (%)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    
    // Extract the data from the tableData object
    const labels = tableData ? tableData.data.map((field) => field["dimension"]) : [];
    const values = tableData ? tableData.data.map((field) => field["percent_of_users"]) : [];

    // Define the data for the chart
    setData({
      labels: labels,
      datasets: [
        {
          label: 'Viewer Demographics (%)',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });

  }, [tableData]);

  // Define options for the chart
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'start' as const,
        align: 'end' as const,
        formatter: (value: number) => `${(100*value).toFixed(1)}%`,
        color: '#000',
        font: {
          weight: 'bold' as const,
        },
      },
    },
  };

  return (
    <Bar data={data} options={options} plugins={[ChartDataLabels]} 
      style={{ maxWidth: '1000px', width: '100%', maxHeight: '500px' }} 
    />
  )
}