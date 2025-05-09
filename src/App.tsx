
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PremiumProvider } from "@/contexts/PremiumContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AIAssistant from "./pages/AIAssistant";
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
import PaymentMethods from "./pages/PaymentMethods";
import MealPlanning from "./pages/MealPlanning";
import DietaryPreferences from "./pages/DietaryPreferences";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AddRecipe from "./pages/AddRecipe";
import ShoppingList from "./pages/ShoppingList";
import AccountPrivacy from "./pages/AccountPrivacy";
import AccountData from "./pages/AccountData";
// Admin routes
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRecipes from "./pages/AdminRecipes";
import AdminUsers from "./pages/AdminUsers";
import AdminSettings from "./pages/AdminSettings";
import AdminIngredients from "./pages/AdminIngredients";
import AdminSubscriptions from "./pages/AdminSubscriptions";

const queryClient = new QueryClient();

// Admin auth check component
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PremiumProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* User-facing routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
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
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/account/privacy" element={<AccountPrivacy />} />
            <Route path="/account/data" element={<AccountData />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/dietary-preferences" element={<DietaryPreferences />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/recipes" element={
              <AdminRoute>
                <AdminRecipes />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } />
            <Route path="/admin/ingredients" element={
              <AdminRoute>
                <AdminIngredients />
              </AdminRoute>
            } />
            <Route path="/admin/subscriptions" element={
              <AdminRoute>
                <AdminSubscriptions />
              </AdminRoute>
            } />
            <Route path="/admin/analytics" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PremiumProvider>
  </QueryClientProvider>
);

export default App;
