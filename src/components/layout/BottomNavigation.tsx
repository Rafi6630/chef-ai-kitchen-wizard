
import { Home, Search, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link to="/browse" className={`bottom-nav-item ${isActive('/browse') ? 'active' : ''}`}>
        <Search size={20} />
        <span>Browse</span>
      </Link>
      <Link to="/pantry" className={`bottom-nav-item ${isActive('/pantry') ? 'active' : ''}`}>
        <BookOpen size={20} />
        <span>Pantry</span>
      </Link>
      <Link to="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <User size={20} />
        <span>Profile</span>
      </Link>
    </div>
  );
}
