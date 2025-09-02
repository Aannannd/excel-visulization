import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ChartConfiguration } from "chart.js/auto";
import { ChartService } from "@/services/chartService";

interface ChartPreviewProps {
  data: Record<string, any>[];
  chartType: string;
  xAxis: string;
  yAxis: string;
  title?: string;
}

export default function ChartPreview({ data, chartType, xAxis, yAxis, title }: ChartPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !data.length || !xAxis || !yAxis) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Generate chart configuration
    const config = ChartService.generateChartConfig(chartType, data, xAxis, yAxis);
    
    if (title) {
      config.options.plugins.title.text = title;
    }

    // Create new chart
    chartRef.current = new ChartJS(ctx, config as ChartConfiguration);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, chartType, xAxis, yAxis, title]);

  const handleDownload = () => {
    if (canvasRef.current) {
      ChartService.downloadChart(canvasRef.current, title || 'chart');
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Chart Preview</h3>
            <p className="text-gray-600 mt-1">Live preview of your visualization</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded" 
              title="Download PNG"
            >
              <i className="fas fa-download"></i>
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded" 
              title="Fullscreen"
            >
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="relative h-96">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{title || 'Chart'}</h3>
              <button 
                onClick={toggleFullscreen}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex-1 p-6">
              <div className="relative w-full h-full">
                <canvas ref={canvasRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
