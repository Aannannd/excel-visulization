import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  filesUploaded: number;
  lastActive: string;
  status: string;
  avatar: string;
}

export default function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Analyst",
      filesUploaded: 47,
      lastActive: "2 hours ago",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@company.com",
      role: "Manager",
      filesUploaded: 89,
      lastActive: "1 day ago",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "e.rodriguez@company.com",
      role: "Analyst",
      filesUploaded: 23,
      lastActive: "3 hours ago",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    }
  ]);

  const adminStats = {
    totalUsers: 1247,
    storageUsed: "2.4TB",
    apiCalls: "15.2K",
    uptime: "99.9%"
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      Admin: "bg-red-100 text-red-800",
      Manager: "bg-purple-100 text-purple-800",
      Analyst: "bg-blue-100 text-blue-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const handleEditUser = (userId: number) => {
    console.log('Editing user:', userId);
  };

  const handleDisableUser = (userId: number) => {
    console.log('Disabling user:', userId);
  };

  return (
    <div className="space-y-8">
      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">User Management</h3>
            <p className="text-gray-600 mt-1">Manage platform users and permissions</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <i className="fas fa-plus mr-2"></i>Add User
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Files Uploaded</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Last Active</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={user.avatar} 
                          alt="User avatar" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-gray-900">{user.filesUploaded}</td>
                    <td className="py-4 px-2 text-gray-600">{user.lastActive}</td>
                    <td className="py-4 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditUser(user.id)}
                          className="p-1 text-gray-600 hover:text-gray-800" 
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDisableUser(user.id)}
                          className="p-1 text-gray-600 hover:text-gray-800" 
                          title="Disable"
                        >
                          <i className="fas fa-ban"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-primary text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.storageUsed}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-hdd text-accent text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Calls (Monthly)</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.apiCalls}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-plug text-success text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Server Uptime</p>
              <p className="text-3xl font-bold text-gray-900">{adminStats.uptime}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-server text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
