
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from "./pages/Chatbot";
import Filters from "./pages/Filters";
import Browse from "./pages/Browse";
import RecipeDetail from "./pages/RecipeDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Pantry from "./pages/Pantry";
import SavedRecipes from "./pages/SavedRecipes";
import CookingHistory from "./pages/CookingHistory";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
// Admin routes
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User-facing routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/cooking-history" element={<CookingHistory />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<Payment />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
