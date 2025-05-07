
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Plus, Calendar as CalendarIcon, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Recipe } from "@/types";
import { recipes } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import PremiumFeatureOverlay from "@/components/subscription/PremiumFeatureOverlay";

export default function MealPlanning() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [mealPlan, setMealPlan] = useState<{
    [key: string]: { breakfast?: Recipe; lunch?: Recipe; dinner?: Recipe }
  }>({});
  const [isPremium, setIsPremium] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Format date to use as key in mealPlan object
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  // Get the current meal plan for the selected date
  const currentDayPlan = selectedDate ? mealPlan[formatDate(selectedDate)] || {} : {};

  const handleAddMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    // In a real app, this would navigate to a recipe selection screen
    // For now, we'll just add a random recipe
    if (!selectedDate) return;
    
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const dateKey = formatDate(selectedDate);
    
    setMealPlan(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [mealType]: randomRecipe
      }
    }));
    
    toast({
      title: "Meal Added",
      description: `${randomRecipe.title} has been added to your ${mealType}.`,
    });
  };

  const handleChangeMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (!selectedDate) return;
    handleAddMeal(mealType);
  };

  const handleGenerateShoppingList = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Shopping list generation is a premium feature. Please upgrade to access it.",
      });
      return;
    }
    setShowShoppingList(true);
  };
  
  const handleViewShoppingList = () => {
    navigate('/shopping-list');
  };

  const allIngredients = Object.values(mealPlan).flatMap(dayPlan => {
    const ingredients: {name: string, quantity?: string, unit?: string}[] = [];
    if (dayPlan.breakfast) {
      ingredients.push(...dayPlan.breakfast.ingredients);
    }
    if (dayPlan.lunch) {
      ingredients.push(...dayPlan.lunch.ingredients);
    }
    if (dayPlan.dinner) {
      ingredients.push(...dayPlan.dinner.ingredients);
    }
    return ingredients;
  });

  // Combine similar ingredients
  const combinedIngredients: {[key: string]: {quantity: number, unit: string}} = {};
  allIngredients.forEach(ing => {
    const quantity = parseInt(ing.quantity || "1");
    if (combinedIngredients[ing.name]) {
      combinedIngredients[ing.name].quantity += quantity;
    } else {
      combinedIngredients[ing.name] = {
        quantity,
        unit: ing.unit || ""
      };
    }
  });

  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Meal Planning</h1>
        </div>
        <p className="text-gray-600 text-sm">Plan your meals for the week</p>
      </header>

      <main className="p-6">
        {!isPremium && <PremiumFeatureOverlay feature="meal planning" />}
        
        {!showShoppingList ? (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Select a Date</h2>
                <div className="p-2 bg-chef-primary/10 rounded-full">
                  <CalendarIcon size={20} className="text-chef-primary" />
                </div>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-lg p-3 bg-white"
              />
            </div>
            
            {selectedDate && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Meals for {selectedDate.toLocaleDateString()}</h2>
                
                {/* Breakfast */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold mb-2">Breakfast</h3>
                  {currentDayPlan.breakfast ? (
                    <div className="flex items-center">
                      <img 
                        src={currentDayPlan.breakfast.imageUrl} 
                        alt={currentDayPlan.breakfast.title} 
                        className="w-16 h-16 rounded-lg object-cover mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{currentDayPlan.breakfast.title}</p>
                        <p className="text-xs text-gray-500">{currentDayPlan.breakfast.prepTime + currentDayPlan.breakfast.cookTime} mins</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleChangeMeal('breakfast')}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleAddMeal('breakfast')} className="w-full" variant="outline">
                      <Plus size={16} className="mr-2" />
                      Add Breakfast
                    </Button>
                  )}
                </div>
                
                {/* Lunch */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold mb-2">Lunch</h3>
                  {currentDayPlan.lunch ? (
                    <div className="flex items-center">
                      <img 
                        src={currentDayPlan.lunch.imageUrl} 
                        alt={currentDayPlan.lunch.title} 
                        className="w-16 h-16 rounded-lg object-cover mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{currentDayPlan.lunch.title}</p>
                        <p className="text-xs text-gray-500">{currentDayPlan.lunch.prepTime + currentDayPlan.lunch.cookTime} mins</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleChangeMeal('lunch')}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleAddMeal('lunch')} className="w-full" variant="outline">
                      <Plus size={16} className="mr-2" />
                      Add Lunch
                    </Button>
                  )}
                </div>
                
                {/* Dinner */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold mb-2">Dinner</h3>
                  {currentDayPlan.dinner ? (
                    <div className="flex items-center">
                      <img 
                        src={currentDayPlan.dinner.imageUrl} 
                        alt={currentDayPlan.dinner.title} 
                        className="w-16 h-16 rounded-lg object-cover mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{currentDayPlan.dinner.title}</p>
                        <p className="text-xs text-gray-500">{currentDayPlan.dinner.prepTime + currentDayPlan.dinner.cookTime} mins</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleChangeMeal('dinner')}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleAddMeal('dinner')} className="w-full" variant="outline">
                      <Plus size={16} className="mr-2" />
                      Add Dinner
                    </Button>
                  )}
                </div>
                
                <Button 
                  className="w-full bg-chef-primary" 
                  onClick={handleViewShoppingList}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  View Shopping List
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Shopping List</h2>
              <Button variant="outline" onClick={() => setShowShoppingList(false)}>
                Back to Meal Plan
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold mb-4">Items to Buy</h3>
              <ul className="space-y-3">
                {Object.entries(combinedIngredients).map(([name, details]) => (
                  <li key={name} className="flex items-center">
                    <div className="w-6 h-6 mr-3 rounded-full bg-gray-100 flex items-center justify-center">
                      <input type="checkbox" className="rounded-full" />
                    </div>
                    <span>{details.quantity} {details.unit} {name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Export List
              </Button>
              <Button variant="outline" className="flex-1">
                Share List
              </Button>
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
