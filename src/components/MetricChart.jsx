import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MetricChart({ metricData }) {
  const [activeMetric, setActiveMetric] = useState('glucose'); // 'glucose', 'bloodPressure', 'weight'
  const [chartType, setChartType] = useState('line'); // 'line', 'bar'
  const [timeRange, setTimeRange] = useState('30days'); // '7days', '30days', '6months'

  // Extract labels and dataset values based on selections
  const selectedData = metricData[activeMetric][timeRange];
  const labels = selectedData.labels;
  
  // Build chart datasets
  const getDatasets = () => {
    if (activeMetric === 'bloodPressure') {
      // Blood pressure has two datasets: Systolic and Diastolic
      return [
        {
          label: 'Systolic (mmHg)',
          data: selectedData.systolic,
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          borderWidth: 3,
          tension: 0.35,
          fill: chartType === 'line',
          pointBackgroundColor: '#f43f5e',
          pointHoverRadius: 7,
        },
        {
          label: 'Diastolic (mmHg)',
          data: selectedData.diastolic,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderWidth: 3,
          tension: 0.35,
          fill: chartType === 'line',
          pointBackgroundColor: '#06b6d4',
          pointHoverRadius: 7,
        }
      ];
    }

    // Single value datasets: Glucose or Weight
    const isGlucose = activeMetric === 'glucose';
    const label = isGlucose ? 'Glucose (mg/dL)' : 'Weight (kg)';
    const color = isGlucose ? '#0d9488' : '#fb7185';
    const bgGradient = isGlucose ? 'rgba(13, 148, 136, 0.1)' : 'rgba(251, 113, 133, 0.1)';

    return [
      {
        label: label,
        data: selectedData.values,
        borderColor: color,
        backgroundColor: bgGradient,
        borderWidth: 3,
        tension: 0.35,
        fill: chartType === 'line',
        pointBackgroundColor: color,
        pointHoverRadius: 7,
      }
    ];
  };

  const data = {
    labels: labels,
    datasets: getDatasets(),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Inter',
            size: 11,
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'Inter',
            size: 11,
          }
        }
      }
    }
  };

  return (
    <div className="card glass-card">
      <div className="card-header border-bottom border-white border-opacity-10 bg-transparent p-3">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setActiveMetric('glucose')}
              className={`btn btn-sm ${activeMetric === 'glucose' ? 'btn-teal text-white' : 'btn-outline-light border-opacity-10'}`}
              style={activeMetric === 'glucose' ? { backgroundColor: '#0d9488' } : {}}
            >
              Glucose
            </button>
            <button
              onClick={() => setActiveMetric('bloodPressure')}
              className={`btn btn-sm ${activeMetric === 'bloodPressure' ? 'btn-teal text-white' : 'btn-outline-light border-opacity-10'}`}
              style={activeMetric === 'bloodPressure' ? { backgroundColor: '#0d9488' } : {}}
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setActiveMetric('weight')}
              className={`btn btn-sm ${activeMetric === 'weight' ? 'btn-teal text-white' : 'btn-outline-light border-opacity-10'}`}
              style={activeMetric === 'weight' ? { backgroundColor: '#0d9488' } : {}}
            >
              Weight
            </button>
          </div>

          <div className="d-flex align-items-center gap-2 self-align-end">
            {/* Chart Type Toggle */}
            <div className="btn-group btn-group-sm">
              <button
                onClick={() => setChartType('line')}
                className={`btn btn-outline-light border-opacity-10 ${chartType === 'line' ? 'active' : ''}`}
                title="Line Chart"
              >
                <i className="bi bi-graph-up"></i>
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`btn btn-outline-light border-opacity-10 ${chartType === 'bar' ? 'active' : ''}`}
                title="Bar Chart"
              >
                <i className="bi bi-bar-chart"></i>
              </button>
            </div>

            {/* Time Range Selector */}
            <select
              className="form-select form-select-sm bg-dark border-white border-opacity-10 text-white"
              style={{ width: '120px', backgroundColor: '#0f172a' }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7days">7 Days</option>
              <option value="30days">30 Days</option>
              <option value="6months">6 Months</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <div className="chart-container-large">
          {chartType === 'line' ? (
            <Line data={data} options={options} />
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
}
