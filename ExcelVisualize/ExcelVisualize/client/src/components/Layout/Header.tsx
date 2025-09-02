interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden text-gray-600"
            onClick={onMenuClick}
          >
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="search" 
              placeholder="Search charts, data..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="relative text-gray-600 hover:text-gray-800">
            <i className="fas fa-bell"></i>
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
        </div>
      </div>
    </header>
  );
}
