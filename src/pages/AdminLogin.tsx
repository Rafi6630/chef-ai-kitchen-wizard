
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChefHat, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // In a real app, you would authenticate with your backend here
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purpose, use admin/admin123 as credentials
      if (username === "admin" && password === "admin123") {
        toast({
          title: "Login successful",
          description: "Welcome to Chef AI Admin Panel",
        });
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-chef-primary text-white rounded-2xl flex items-center justify-center">
              <ChefHat size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-chef-primary">Chef AI Admin</h1>
          <p className="text-gray-600 mt-2">Manage your application</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Admin Login</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-chef-primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Protected area. Authorized personnel only.</p>
          <p className="mt-1">
            Need help? Contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
