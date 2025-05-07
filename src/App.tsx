
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
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import Pantry from "./pages/Pantry";
import SavedRecipes from "./pages/SavedRecipes";
import CookingHistory from "./pages/CookingHistory";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import MealPlanning from "./pages/MealPlanning";
import DietaryPreferences from "./pages/DietaryPreferences";
import HealthInfo from "./pages/HealthInfo";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
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
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/cooking-history" element={<CookingHistory />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/dietary-preferences" element={<DietaryPreferences />} />
          <Route path="/health-info" element={<HealthInfo />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
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
