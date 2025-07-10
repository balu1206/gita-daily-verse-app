
import { Link, useLocation } from "react-router-dom";
import { BookOpen, History, User, ShoppingBag, Settings } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/app' && location.pathname === '/app') return true;
    if (path !== '/app' && location.pathname.includes(path)) return true;
    return false;
  };

  const navItems = [
    { path: '/app', icon: BookOpen, label: 'Daily' },
    { path: '/app/history', icon: History, label: 'History' },
    { path: '/app/profile', icon: User, label: 'Profile' },
    { path: '/app/store', icon: ShoppingBag, label: 'Store' },
    { path: '/app/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'text-orange-600 bg-orange-50'
                : 'text-orange-400 hover:text-orange-600'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
