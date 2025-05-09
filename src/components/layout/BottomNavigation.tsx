
import { Home, Search, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bottom-nav fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-gray-900/50 h-16 grid grid-cols-4 items-center z-50">
      <Link to="/" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/browse" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/browse') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <Search size={20} />
        <span className="text-xs mt-1">Browse</span>
      </Link>
      <Link to="/pantry" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/pantry') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <BookOpen size={20} />
        <span className="text-xs mt-1">Pantry</span>
      </Link>
      <Link to="/profile" className={`bottom-nav-item flex flex-col items-center justify-center h-full ${isActive('/profile') ? 'text-chef-primary' : 'text-gray-500 dark:text-gray-400'}`}>
        <User size={20} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
}
