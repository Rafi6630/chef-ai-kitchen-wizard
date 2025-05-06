
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ChevronRight, Star, Clock, Settings, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    isPremium: false,
  });
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };
  
  return (
    <AppLayout>
      <div className="p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Link to="/settings">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <Settings size={20} />
              </Button>
            </Link>
          </div>
        </header>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-chef-primary/10 text-chef-primary rounded-full flex items-center justify-center font-bold text-xl">
              {user.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
        
        {!user.isPremium && (
          <div className="bg-gradient-to-r from-chef-primary to-chef-tertiary rounded-xl p-6 text-white mb-6">
            <h3 className="font-bold text-lg mb-2">Upgrade to Premium</h3>
            <p className="text-white/90 text-sm mb-4">
              Get access to exclusive recipes, detailed nutritional info, and more!
            </p>
            <Link to="/subscription">
              <Button className="bg-white text-chef-primary hover:bg-white/90">
                View Plans
              </Button>
            </Link>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Account</h3>
            <div className="bg-white rounded-xl divide-y divide-gray-100 shadow-sm overflow-hidden">
              <Link to="/saved-recipes" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Star size={20} className="text-gray-500 mr-3" />
                  <span>Saved Recipes</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
              <Link to="/cooking-history" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-500 mr-3" />
                  <span>Cooking History</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
              <Link to="/pantry" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-3">
                    <path d="M21 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.1"></path><path d="M18 3h2v4"></path><path d="M15 7V3"></path>
                  </svg>
                  <span>Smart Pantry</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
              <Link to="/subscription" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <CreditCard size={20} className="text-gray-500 mr-3" />
                  <span>Subscription</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">About</h3>
            <div className="bg-white rounded-xl divide-y divide-gray-100 shadow-sm overflow-hidden">
              <Link to="/about" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <span>About Chef AI</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
              <Link to="/privacy" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
              <Link to="/terms" className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <span>Terms of Service</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-red-500 text-red-500 hover:bg-red-50"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
