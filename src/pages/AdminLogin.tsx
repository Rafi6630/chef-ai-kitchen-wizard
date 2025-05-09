
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock admin authentication - in real app this would call an API
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        toast({
          title: "Login Successful",
          description: "Welcome to the Admin Dashboard",
        });
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div>
          <div className="w-20 h-20 bg-chef-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-2xl">CIA</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Admin Panel Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your credentials to access the Admin Dashboard
          </p>
        </div>
        
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Login Information</AlertTitle>
          <AlertDescription>
            Username: <span className="font-semibold">admin</span><br />
            Password: <span className="font-semibold">admin123</span>
          </AlertDescription>
        </Alert>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-t-md focus:outline-none focus:ring-chef-primary dark:focus:ring-chef-primary focus:border-chef-primary dark:focus:border-chef-primary focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 rounded-b-md focus:outline-none focus:ring-chef-primary dark:focus:ring-chef-primary focus:border-chef-primary dark:focus:border-chef-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-chef-primary hover:bg-chef-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chef-primary"
            >
              {isLoading ? "Logging in..." : "Sign in"}
            </Button>
          </div>
        </form>
        
        <div className="text-center">
          <Link to="/" className="text-sm text-chef-primary hover:text-chef-primary/80">
            Return to main site
          </Link>
        </div>
      </div>
    </div>
  );
}
