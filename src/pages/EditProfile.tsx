
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";

export default function EditProfile() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    language: "English"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
      </header>

      <main className="p-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-chef-primary/10 text-chef-primary rounded-full flex items-center justify-center font-bold text-3xl">
                {formData.name.charAt(0)}
              </div>
              <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-white shadow-sm">
                <Camera size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Tap to change profile picture</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <p className="text-xs text-gray-500">Optional for account recovery</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <select 
                id="language"
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="English">English</option>
                <option value="Arabic">العربية (Arabic)</option>
                <option value="Turkish">Türkçe (Turkish)</option>
                <option value="Spanish">Español (Spanish)</option>
                <option value="French">Français (French)</option>
              </select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-chef-primary"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
          
          <div className="space-y-4 mt-8">
            <h3 className="font-semibold text-lg">Account Settings</h3>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full justify-start text-left font-normal"
            >
              Change Password
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full justify-start text-left font-normal"
            >
              Linked Accounts
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full justify-start text-left font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </div>
        </form>
      </main>
    </AppLayout>
  );
}
