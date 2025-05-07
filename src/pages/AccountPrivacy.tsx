
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Eye, EyeOff, Lock, Shield, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AccountPrivacy() {
  const [shareUsageData, setShareUsageData] = useState(true);
  const [showProfileToOthers, setShowProfileToOthers] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  });
  
  const { toast } = useToast();
  
  const handleCookiePreferenceChange = (type: keyof typeof cookiePreferences) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    setCookiePreferences({
      ...cookiePreferences,
      [type]: !cookiePreferences[type]
    });
  };
  
  const handleSaveChanges = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved successfully."
    });
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/settings" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Privacy Settings</h1>
        </div>
        <p className="text-gray-600 text-sm">Control how your data is used and shared</p>
      </header>
      
      <main className="p-6">
        <div className="space-y-6">
          {/* Data Sharing */}
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2 flex items-center">
              <Shield size={18} className="mr-2" />
              Data Usage & Sharing
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="usage-data" className="text-base font-medium">Share Usage Data</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Help us improve Chef AI by sharing anonymous usage data
                </p>
              </div>
              <Switch 
                id="usage-data" 
                checked={shareUsageData} 
                onCheckedChange={setShareUsageData} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility" className="text-base font-medium">Profile Visibility</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Allow other users to view your public profile
                </p>
              </div>
              <Switch 
                id="profile-visibility" 
                checked={showProfileToOthers} 
                onCheckedChange={setShowProfileToOthers} 
              />
            </div>
          </div>
          
          {/* Communication Preferences */}
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2 flex items-center">
              <Bell size={18} className="mr-2" />
              Communication Preferences
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-marketing" className="text-base font-medium">Marketing Emails</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Receive emails about new features, promotions, and events
                </p>
              </div>
              <Switch 
                id="email-marketing" 
                checked={emailMarketing} 
                onCheckedChange={setEmailMarketing} 
              />
            </div>
          </div>
          
          {/* Security */}
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2 flex items-center">
              <Lock size={18} className="mr-2" />
              Security Settings
            </h2>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor-auth" className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500 mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch 
                id="two-factor-auth" 
                checked={twoFactorAuth} 
                onCheckedChange={setTwoFactorAuth} 
              />
            </div>
          </div>
          
          {/* Cookie Settings */}
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-lg mb-2 flex items-center">
              <Eye size={18} className="mr-2" />
              Cookie Preferences
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="essential-cookies" className="text-base font-medium">Essential Cookies</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Required for the app to function properly
                  </p>
                </div>
                <Switch 
                  id="essential-cookies" 
                  checked={cookiePreferences.essential} 
                  disabled
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="functional-cookies" className="text-base font-medium">Functional Cookies</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Remember your preferences and settings
                  </p>
                </div>
                <Switch 
                  id="functional-cookies" 
                  checked={cookiePreferences.functional} 
                  onCheckedChange={() => handleCookiePreferenceChange('functional')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics-cookies" className="text-base font-medium">Analytics Cookies</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Help us understand how users interact with the app
                  </p>
                </div>
                <Switch 
                  id="analytics-cookies" 
                  checked={cookiePreferences.analytics} 
                  onCheckedChange={() => handleCookiePreferenceChange('analytics')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-cookies" className="text-base font-medium">Marketing Cookies</Label>
                  <p className="text-sm text-gray-500 mt-1">
                    Enable personalized ads and promotions
                  </p>
                </div>
                <Switch 
                  id="marketing-cookies" 
                  checked={cookiePreferences.marketing} 
                  onCheckedChange={() => handleCookiePreferenceChange('marketing')}
                />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleSaveChanges}
            className="w-full bg-chef-primary"
          >
            Save Privacy Settings
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            <p>Your privacy is important to us. For more information, please read our</p>
            <Link to="/privacy" className="text-chef-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
