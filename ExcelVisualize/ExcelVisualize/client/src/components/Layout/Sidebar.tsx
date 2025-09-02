import { Link, useLocation } from "wouter";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [location] = useLocation();
  const { user, isAdmin } = useSelector((state: RootState) => state.auth);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'fas fa-tachometer-alt' },
    { name: 'Upload & Analyze', href: '/upload', icon: 'fas fa-upload' },
    { name: 'Analysis History', href: '/history', icon: 'fas fa-history' },
    { name: 'My Charts', href: '/charts', icon: 'fas fa-chart-bar' },
  ];

  const adminNavigation = [
    { name: 'User Management', href: '/admin/users', icon: 'fas fa-users-cog' },
    { name: 'Platform Analytics', href: '/admin/analytics', icon: 'fas fa-analytics' },
  ];

  return (
    <aside className={`w-64 bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static h-full z-40`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-chart-line text-white text-lg"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">DataViz Pro</h1>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-6 py-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
        </div>
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href} className={`flex items-center px-6 py-3 ${
              isActive 
                ? 'text-gray-700 bg-blue-50 border-r-2 border-primary' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
            }`}>
              <i className={`${item.icon} w-5`}></i>
              <span className="ml-3">{item.name}</span>
            </Link>
          );
        })}
        
        {isAdmin && (
          <>
            <div className="px-6 py-2 mt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
            </div>
            {adminNavigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href} className={`flex items-center px-6 py-3 ${
                  isActive 
                    ? 'text-gray-700 bg-blue-50 border-r-2 border-primary' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700'
                }`}>
                  <i className={`${item.icon} w-5`}></i>
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
            alt="User avatar" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{user?.username || 'John Smith'}</p>
            <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Administrator' : 'Data Analyst'}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </aside>
  );
}
