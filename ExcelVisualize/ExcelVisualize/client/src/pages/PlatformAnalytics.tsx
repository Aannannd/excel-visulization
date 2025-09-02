import { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export default function PlatformAnalytics() {
  const usageChartRef = useRef<HTMLCanvasElement>(null);
  const chartTypeChartRef = useRef<HTMLCanvasElement>(null);
  const processingChartRef = useRef<HTMLCanvasElement>(null);

  const processingMetrics = {
    successRate: "98.5%",
    avgProcessingTime: "2.3s",
    errorRate: "1.5%"
  };

  useEffect(() => {
    // Usage Trends Chart
    if (usageChartRef.current) {
      const ctx = usageChartRef.current.getContext('2d');
      if (ctx) {
        new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Active Users',
              data: [120, 135, 148, 156, 162, 174],
              borderColor: 'hsl(207, 90%, 54%)',
              backgroundColor: 'hsla(207, 90%, 54%, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'hsl(0, 0%, 90%)',
                },
              },
              x: {
                grid: {
                  color: 'hsl(0, 0%, 90%)',
                },
              },
            },
          }
        });
      }
    }

    // Chart Type Distribution
    if (chartTypeChartRef.current) {
      const ctx = chartTypeChartRef.current.getContext('2d');
      if (ctx) {
        new ChartJS(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Line', 'Bar', 'Pie', 'Scatter', '3D'],
            datasets: [{
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                'hsl(207, 90%, 54%)',
                'hsl(24, 70%, 56%)',
                'hsl(142, 76%, 47%)',
                'hsl(38, 92%, 50%)',
                'hsl(271, 76%, 53%)'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right' as const,
              },
            },
          }
        });
      }
    }

    // Processing Metrics Chart
    if (processingChartRef.current) {
      const ctx = processingChartRef.current.getContext('2d');
      if (ctx) {
        new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: ['Success', 'Warnings', 'Errors'],
            datasets: [{
              label: 'Processing Results',
              data: [847, 23, 12],
              backgroundColor: [
                'hsl(142, 76%, 47%)',
                'hsl(38, 92%, 50%)',
                'hsl(0, 84%, 60%)'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'hsl(0, 0%, 90%)',
                },
              },
              x: {
                grid: {
                  color: 'hsl(0, 0%, 90%)',
                },
              },
            },
          }
        });
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Usage Trends</h3>
            <p className="text-gray-600 mt-1">Platform usage over time</p>
          </div>
          <div className="p-6">
            <div className="relative h-64">
              <canvas ref={usageChartRef}></canvas>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Chart Type Distribution</h3>
            <p className="text-gray-600 mt-1">Most popular chart types</p>
          </div>
          <div className="p-6">
            <div className="relative h-64">
              <canvas ref={chartTypeChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* File Types & Data Processing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Data Processing Metrics</h3>
          <p className="text-gray-600 mt-1">File processing and error rates</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success">{processingMetrics.successRate}</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{processingMetrics.avgProcessingTime}</div>
              <div className="text-sm text-gray-600">Avg Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">{processingMetrics.errorRate}</div>
              <div className="text-sm text-gray-600">Error Rate</div>
            </div>
          </div>
          <div className="relative h-64">
            <canvas ref={processingChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
