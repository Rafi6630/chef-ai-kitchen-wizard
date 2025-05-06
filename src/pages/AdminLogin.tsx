
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, authenticate against an admin-specific service
    setTimeout(() => {
      setIsLoading(false);
      if (email === "admin@chefai.com" && password === "adminpassword") {
        // Simulate successful login
        toast({
          title: "Login successful",
          description: "Welcome to Chef AI Admin Panel!",
        });
        window.location.href = "/admin/dashboard";
      } else {
        toast({
          title: "Login failed",
          description: "Invalid admin credentials.",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-chef-primary">Chef AI Admin</h1>
          <p className="text-gray-500 mt-2">Content management system</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input 
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-chef-primary text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This admin panel is for authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
