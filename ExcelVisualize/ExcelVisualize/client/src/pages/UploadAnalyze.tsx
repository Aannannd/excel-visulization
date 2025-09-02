import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSelectedColumns } from "@/store/slices/dataSlice";
import { setChartType, set3D, setGenerating, addChart } from "@/store/slices/chartsSlice";
import FileUpload from "@/components/Upload/FileUpload";
import DataPreview from "@/components/Upload/DataPreview";
import ChartPreview from "@/components/Charts/ChartPreview";
import Chart3D from "@/components/Charts/Chart3D";
import { Chart } from "@shared/schema";

export default function UploadAnalyze() {
  const dispatch = useDispatch();
  const { currentFile, selectedColumns } = useSelector((state: RootState) => state.data);
  const { chartType, is3D, isGenerating } = useSelector((state: RootState) => state.charts);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [showAnalysis, setShowAnalysis] = useState(false);

  const chartTypes = [
    { type: 'line', icon: 'fas fa-chart-line', name: 'Line' },
    { type: 'bar', icon: 'fas fa-chart-bar', name: 'Bar' },
    { type: 'scatter', icon: 'fas fa-braille', name: 'Scatter' },
    { type: 'pie', icon: 'fas fa-chart-pie', name: 'Pie' },
  ];

  const handleFileUploaded = () => {
    setShowAnalysis(true);
  };

  const handleChartTypeChange = (type: string) => {
    dispatch(setChartType(type));
  };

  const handleAxisChange = (axis: 'xAxis' | 'yAxis', value: string) => {
    dispatch(setSelectedColumns({
      ...selectedColumns,
      [axis]: value
    }));
  };

  const handle3DToggle = (enabled: boolean) => {
    dispatch(set3D(enabled));
  };

  const handleGenerateChart = () => {
    if (!currentFile || !selectedColumns.xAxis || !selectedColumns.yAxis) return;

    dispatch(setGenerating(true));
    
    // Simulate chart generation
    setTimeout(() => {
      const newChart: Chart = {
        id: Date.now(),
        userId: user?.id || 1,
        fileId: currentFile.id,
        title: `${selectedColumns.yAxis} by ${selectedColumns.xAxis}`,
        description: `${chartType} chart showing ${selectedColumns.yAxis} trends`,
        chartType,
        xAxis: selectedColumns.xAxis,
        yAxis: selectedColumns.yAxis,
        config: { chartType, selectedColumns, is3D },
        is3D,
        createdAt: new Date(),
      };
      
      dispatch(addChart(newChart));
      dispatch(setGenerating(false));
    }, 2000);
  };

  return (
    <div className="max-w-6xl space-y-8">
      <FileUpload onFileUploaded={handleFileUploaded} />
      
      {showAnalysis && currentFile && (
        <>
          <DataPreview data={currentFile.data} columns={currentFile.columns} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Chart Configuration</h3>
                <p className="text-gray-600 mt-1">Configure your visualization</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Chart Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Chart Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {chartTypes.map((chart) => (
                      <button
                        key={chart.type}
                        onClick={() => handleChartTypeChange(chart.type)}
                        className={`p-3 border-2 rounded-lg text-center transition-colors ${
                          chartType === chart.type
                            ? 'border-primary bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <i className={`${chart.icon} ${
                          chartType === chart.type ? 'text-primary' : 'text-gray-600'
                        } mb-2`}></i>
                        <p className={`text-sm font-medium ${
                          chartType === chart.type ? 'text-primary' : 'text-gray-600'
                        }`}>
                          {chart.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Axis Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis</label>
                  <select
                    value={selectedColumns.xAxis}
                    onChange={(e) => handleAxisChange('xAxis', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select column...</option>
                    {currentFile.columns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis</label>
                  <select
                    value={selectedColumns.yAxis}
                    onChange={(e) => handleAxisChange('yAxis', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select column...</option>
                    {currentFile.columns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>

                {/* 3D Options */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={is3D}
                      onChange={(e) => handle3DToggle(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable 3D Visualization</span>
                  </label>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateChart}
                  disabled={!selectedColumns.xAxis || !selectedColumns.yAxis || isGenerating}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic mr-2"></i>
                      Generate Chart
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Chart Preview */}
            {selectedColumns.xAxis && selectedColumns.yAxis && (
              <>
                {is3D ? (
                  <Chart3D
                    data={currentFile.data}
                    xAxis={selectedColumns.xAxis}
                    yAxis={selectedColumns.yAxis}
                  />
                ) : (
                  <ChartPreview
                    data={currentFile.data}
                    chartType={chartType}
                    xAxis={selectedColumns.xAxis}
                    yAxis={selectedColumns.yAxis}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
