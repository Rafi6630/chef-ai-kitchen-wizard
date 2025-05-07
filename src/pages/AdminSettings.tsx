
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [apiKey, setApiKey] = useState("sk_test_1234567890abcdef");
  const [appName, setAppName] = useState("Chef AI");
  const { toast } = useToast();

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Email notification settings have been updated.",
    });
  };

  const handleSaveAPI = () => {
    toast({
      title: "API Settings Saved",
      description: "API configuration has been updated.",
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </header>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API & Integrations</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="appName">Application Name</Label>
                  <Input 
                    id="appName" 
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="max-w-md"
                  />
                </div>
                
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <Label htmlFor="recipeApproval" className="text-base">Recipe Approval Required</Label>
                    <p className="text-sm text-gray-500">
                      When enabled, all user-submitted recipes must be approved by an admin
                    </p>
                  </div>
                  <Switch 
                    id="recipeApproval"
                    checked={approvalRequired}
                    onCheckedChange={setApprovalRequired}
                  />
                </div>
                
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <Label htmlFor="emailNotifs" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Send admins email notifications for new recipe submissions
                    </p>
                  </div>
                  <Switch 
                    id="emailNotifs"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="emailRecipients">Notification Recipients</Label>
                  <Input 
                    id="emailRecipients" 
                    placeholder="admin@example.com, moderator@example.com" 
                    className="max-w-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated list of email addresses
                  </p>
                </div>
                
                <Button onClick={handleSaveNotifications}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="relative max-w-md">
                    <Input 
                      id="apiKey" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      type="password"
                      className="pr-20"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute right-1 top-1"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        toast({
                          title: "API Key Copied",
                          description: "The API key has been copied to clipboard.",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use this key to authenticate API requests
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-2">Connected Services</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Stripe</p>
                        <p className="text-sm text-gray-500">Payment processing</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mailchimp</p>
                        <p className="text-sm text-gray-500">Email marketing</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveAPI}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="branding">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Branding Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="logoUpload">Logo</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Logo" className="max-w-full max-h-full" />
                    </div>
                    <Button variant="outline">Upload New Logo</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input type="color" id="primaryColor" defaultValue="#FF5733" className="w-16 h-10" />
                    <Input defaultValue="#FF5733" className="max-w-xs" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input type="color" id="secondaryColor" defaultValue="#33FF57" className="w-16 h-10" />
                    <Input defaultValue="#33FF57" className="max-w-xs" />
                  </div>
                </div>
                
                <Button>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
