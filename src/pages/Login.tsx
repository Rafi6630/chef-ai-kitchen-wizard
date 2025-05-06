
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, you would authenticate with your backend here
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        // Simulate successful login
        toast({
          title: "Login successful",
          description: "Welcome back to Chef AI!",
        });
        window.location.href = "/";
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <AppLayout showNavigation={false} className="flex flex-col justify-center min-h-screen">
      <div className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-chef-primary animate-fade-in">Chef AI</h1>
          <p className="text-gray-600 mt-2">Your personal kitchen wizard</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4 animate-slide-up">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-chef-primary hover:underline">
                Forgot password?
              </Link>
            </div>
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
            className="w-full btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Or continue with</p>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="flex-1 border-gray-300">
              <svg width="20" height="20" fill="currentColor" className="mr-2">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="flex-1 border-gray-300">
              <svg width="20" height="20" fill="currentColor" className="mr-2">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Apple
            </Button>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-chef-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 flex items-center gap-1"
            >
              <Globe size={16} />
              <span>English</span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
