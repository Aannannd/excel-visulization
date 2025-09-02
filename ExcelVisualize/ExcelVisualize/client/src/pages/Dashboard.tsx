import { Link } from "wouter";

export default function Dashboard() {
  const stats = {
    totalUploads: 847,
    chartsCreated: 2341,
    dataProcessed: "45.2GB",
    activeUsers: 156
  };

  const recentActivity = [
    {
      id: 1,
      description: "Created line chart from sales_data.xlsx",
      timestamp: "2 hours ago",
      icon: "fas fa-chart-line",
      iconColor: "text-primary",
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      description: "Uploaded customer_analysis.xlsx",
      timestamp: "5 hours ago",
      icon: "fas fa-upload",
      iconColor: "text-success",
      bgColor: "bg-green-100"
    },
    {
      id: 3,
      description: "Generated 3D visualization",
      timestamp: "1 day ago",
      icon: "fas fa-cube",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Uploads</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUploads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-file-excel text-primary text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-success text-sm font-medium">+12%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Charts Created</p>
              <p className="text-3xl font-bold text-gray-900">{stats.chartsCreated}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-bar text-accent text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-success text-sm font-medium">+8%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Processed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.dataProcessed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-database text-success text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-success text-sm font-medium">+24%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-purple-600 text-xl"></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-success text-sm font-medium">+3%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <div className="p-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 mb-4 last:mb-0">
                <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                  <i className={`${activity.icon} ${activity.iconColor}`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <Link href="/upload">
              <a className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <i className="fas fa-plus"></i>
                <span>New Analysis</span>
              </a>
            </Link>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <i className="fas fa-folder-open"></i>
              <span>Browse Files</span>
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <i className="fas fa-download"></i>
              <span>Export Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
