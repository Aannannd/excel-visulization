import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location] = useLocation();

  const getPageTitle = (path: string): string => {
    const titles: Record<string, string> = {
      '/': 'Dashboard',
      '/upload': 'Upload & Analyze',
      '/history': 'Analysis History',
      '/charts': 'My Charts',
      '/admin/users': 'User Management',
      '/admin/analytics': 'Platform Analytics',
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 overflow-hidden">
        <Header 
          title={getPageTitle(location)}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className="p-6 overflow-y-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
