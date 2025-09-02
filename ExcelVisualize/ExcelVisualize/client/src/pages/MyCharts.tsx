import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChartService } from "@/services/chartService";

export default function MyCharts() {
  const { charts } = useSelector((state: RootState) => state.charts);

  const handleDownload = (chart: any) => {
    // In a real app, you'd regenerate the chart and download it
    console.log('Downloading chart:', chart.title);
  };

  const handleEdit = (chart: any) => {
    console.log('Editing chart:', chart.title);
  };

  const handleShare = (chart: any) => {
    console.log('Sharing chart:', chart.title);
  };

  if (charts.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-chart-bar text-gray-300 text-6xl mb-4"></i>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">No charts yet</h3>
        <p className="text-gray-500 mb-6">Create your first chart by uploading an Excel file</p>
        <a
          href="/upload"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Create Chart
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {charts.map((chart) => (
        <div key={chart.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
          {/* Chart placeholder - in a real app, you'd render the actual chart */}
          <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <div className="text-center text-white">
              <i className={`${ChartService.getChartTypeIcon(chart.chartType)} text-4xl mb-2`}></i>
              <p className="text-sm font-medium">{chart.chartType.toUpperCase()} CHART</p>
              {chart.is3D && <p className="text-xs">3D Enabled</p>}
            </div>
          </div>
          
          <div className="p-4">
            <h4 className="font-semibold text-gray-900">{chart.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{chart.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <i className="fas fa-calendar"></i>
                <span>{chart.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload(chart)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                  title="Download"
                >
                  <i className="fas fa-download"></i>
                </button>
                <button
                  onClick={() => handleEdit(chart)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleShare(chart)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                  title="Share"
                >
                  <i className="fas fa-share"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
