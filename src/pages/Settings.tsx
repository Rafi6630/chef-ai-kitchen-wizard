
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Globe, Bell, Moon, Volume2, Shield, Database, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/auth/LanguageSelector";

export default function Settings() {
  const [language, setLanguage] = useState("english");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const { toast } = useToast();
  
  // Effect to apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      toast({
        title: "Dark Mode Enabled",
        description: "The application is now in dark mode."
      });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode, toast]);
  
  // Load dark mode setting from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);
  
  return (
    <AppLayout>
      <div className="p-6">
        <header className="mb-6">
          <div className="flex items-center mb-4">
            <Link to="/profile" className="mr-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </header>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Globe size={18} />
              Language
            </h2>
            
            <LanguageSelector />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2">App Preferences</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon size={18} />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch 
                id="dark-mode" 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell size={18} />
                <Label htmlFor="notifications">Push Notifications</Label>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 size={18} />
                <Label htmlFor="sounds">App Sounds</Label>
              </div>
              <Switch 
                id="sounds" 
                checked={sounds} 
                onCheckedChange={setSounds} 
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2">Account</h2>
            
            <Link to="/account/change-password" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Change Password
            </Link>
            
            <Link to="/account/privacy" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Shield className="mr-2" size={18} />
                <span>Privacy Settings</span>
              </div>
            </Link>
            
            <Link to="/account/data" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Database className="mr-2" size={18} />
                <span>Manage Your Data</span>
              </div>
            </Link>
            
            <Link to="/payment-methods" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <CreditCard className="mr-2" size={18} />
                <span>Payment Methods</span>
              </div>
            </Link>
            
            <Button 
              variant="destructive" 
              className="w-full mt-2"
            >
              Delete Account
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-lg mb-2">About</h2>
            
            <Link to="/about" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              About Chef AI
            </Link>
            
            <Link to="/terms" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Terms of Service
            </Link>
            
            <Link to="/privacy" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              Privacy Policy
            </Link>
            
            <div className="text-center mt-4 text-gray-500 dark:text-gray-400 text-sm">
              <p>Chef AI v1.0.0</p>
              <p>© 2025 Chef AI Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
