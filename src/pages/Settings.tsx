
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Globe, Bell, Moon, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [language, setLanguage] = useState("english");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  
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
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Globe size={18} />
              Language
            </h2>
            
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                <SelectItem value="turkish">Türkçe (Turkish)</SelectItem>
                <SelectItem value="spanish">Español (Spanish)</SelectItem>
                <SelectItem value="french">Français (French)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
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
          
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2">Account</h2>
            
            <Link to="/account/change-password" className="block p-3 rounded-lg hover:bg-gray-50">
              Change Password
            </Link>
            
            <Link to="/account/privacy" className="block p-3 rounded-lg hover:bg-gray-50">
              Privacy Settings
            </Link>
            
            <Link to="/account/data" className="block p-3 rounded-lg hover:bg-gray-50">
              Manage Your Data
            </Link>
            
            <Button 
              variant="destructive" 
              className="w-full mt-2"
            >
              Delete Account
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-lg mb-2">About</h2>
            
            <Link to="/about" className="block p-3 rounded-lg hover:bg-gray-50">
              About Chef AI
            </Link>
            
            <Link to="/terms" className="block p-3 rounded-lg hover:bg-gray-50">
              Terms of Service
            </Link>
            
            <Link to="/privacy-policy" className="block p-3 rounded-lg hover:bg-gray-50">
              Privacy Policy
            </Link>
            
            <div className="text-center mt-4 text-gray-500 text-sm">
              <p>Chef AI v1.0.0</p>
              <p>© 2025 Chef AI Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
