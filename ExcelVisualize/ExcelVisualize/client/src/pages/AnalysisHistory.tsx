import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExcelService } from "@/services/excelService";

export default function AnalysisHistory() {
  const { files } = useSelector((state: RootState) => state.data);
  const { charts } = useSelector((state: RootState) => state.charts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const getChartsForFile = (fileId: number) => {
    return charts.filter(chart => chart.fileId === fileId);
  };

  const getChartTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      line: 'fas fa-chart-line',
      bar: 'fas fa-chart-bar',
      pie: 'fas fa-chart-pie',
      scatter: 'fas fa-braille',
    };
    return icons[type] || 'fas fa-chart-bar';
  };

  const filteredFiles = files.filter(file =>
    file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Analysis History</h3>
          <p className="text-gray-600 mt-1">Your previous uploads and generated charts</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Files</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-file-excel text-gray-300 text-4xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900">No files found</h3>
            <p className="text-gray-500 mt-1">Upload your first Excel file to get started</p>
          </div>
        ) : (
          filteredFiles.map((file) => {
            const fileCharts = getChartsForFile(file.id);
            return (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="fas fa-file-excel text-success"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{file.originalName}</h4>
                      <p className="text-sm text-gray-600">
                        {file.rowCount.toLocaleString()} rows • {file.columns.length} columns • {fileCharts.length} charts generated
                      </p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {file.createdAt.toLocaleDateString()} at {file.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Processed
                    </span>
                    <button className="p-2 text-gray-600 hover:text-gray-800" title="Download">
                      <i className="fas fa-download"></i>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800" title="View Charts">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                {fileCharts.length > 0 && (
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    {Object.entries(
                      fileCharts.reduce((acc, chart) => {
                        acc[chart.chartType] = (acc[chart.chartType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([type, count]) => (
                      <span key={type} className="flex items-center text-gray-600">
                        <i className={`${getChartTypeIcon(type)} mr-1`}></i>
                        {count} {type.charAt(0).toUpperCase() + type.slice(1)} Chart{count > 1 ? 's' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
