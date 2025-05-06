
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  BookOpen, 
  Database, 
  CreditCard, 
  BarChart2,
  Settings,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-chef-primary">Chef AI Admin</h1>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2" size={18} />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2" size={18} />
                  Users
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/recipes">
                <Button variant="ghost" className="w-full justify-start">
                  <BookOpen className="mr-2" size={18} />
                  Recipes
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/ingredients">
                <Button variant="ghost" className="w-full justify-start">
                  <Database className="mr-2" size={18} />
                  Ingredients
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/subscriptions">
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2" size={18} />
                  Subscriptions
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/analytics">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart2 className="mr-2" size={18} />
                  Analytics
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/admin/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2" size={18} />
                  Settings
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200">
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
