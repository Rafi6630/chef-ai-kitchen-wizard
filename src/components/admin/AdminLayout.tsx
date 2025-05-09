
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  BookOpen, 
  Database, 
  CreditCard, 
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // In a real app, this would call an API to logout
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "w-64 bg-white dark:bg-gray-800 shadow-lg fixed inset-y-0 left-0 z-40 transition-transform transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-chef-primary">Chef AI Admin</h1>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/dashboard") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <Home className="mr-2" size={18} />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/users") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <Users className="mr-2" size={18} />
                  Users
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/recipes" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/recipes") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <BookOpen className="mr-2" size={18} />
                  Recipes
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/ingredients" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/ingredients") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <Database className="mr-2" size={18} />
                  Ingredients
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/subscriptions" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/subscriptions") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <CreditCard className="mr-2" size={18} />
                  Subscriptions
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/analytics" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/analytics") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <BarChart2 className="mr-2" size={18} />
                  Analytics
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" onClick={() => setSidebarOpen(false)}>
                <Button 
                  variant={isActive("/admin/settings") ? "default" : "ghost"} 
                  className="w-full justify-start"
                >
                  <Settings className="mr-2" size={18} />
                  Settings
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
