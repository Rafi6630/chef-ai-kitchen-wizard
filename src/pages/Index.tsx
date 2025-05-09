import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChefHat, Clock, Star, Globe, Utensils, ArrowRight, ArrowLeft, Plus, Share } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import CategoryCard from "@/components/ui/CategoryCard";
import { subcategories } from "@/data/mockData";
import { Category, MealTypeFilter } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import QuickIngredientSelector from "@/components/recipe/QuickIngredientSelector";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [step, setStep] = useState<"category" | "subcategory" | "cuisine" | "filters" | "ingredients">("category");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  const navigate = useNavigate();
  
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );

  // Reset the step to subcategory when category changes
  useEffect(() => {
    setStep("subcategory");
  }, [selectedCategory]);

  const handleSelectSubcategory = (id: string) => {
    setSelectedSubcategory(id);
    setStep("cuisine");
  };

  const handleSelectCuisine = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    setStep("ingredients");
  };

  const handleAddIngredients = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    // Navigate to home page after adding ingredients
    setStep("subcategory");
  };

  const skipIngredients = () => {
    // Navigate back to home page without ingredients
    setStep("subcategory");
  };
  
  const findRecipes = () => {
    // Navigate to browse page with filters
    navigate(`/browse?category=${selectedCategory}&subcategory=${selectedSubcategory}&cuisine=${selectedCuisine}&ingredients=${selectedIngredients.join(',')}`);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case "subcategory":
        return (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select a Subcategory</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Choose a specific category or explore by cuisine
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
              {filteredSubcategories.map((subcategory) => (
                <div 
                  key={subcategory.id} 
                  className="cursor-pointer"
                  onClick={() => handleSelectSubcategory(subcategory.id)}
                >
                  <CategoryCard subcategory={subcategory} />
                </div>
              ))}
            </div>
          </>
        );
        
      case "cuisine":
        return (
          <>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => setStep("subcategory")}
                >
                  <ArrowLeft size={16} />
                </Button>
                <h2 className="text-xl font-semibold">Select a Cuisine</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Choose a cuisine type for your recipe
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              {["Italian", "Mexican", "Asian", "American", "Indian", "Mediterranean", "French", "All Cuisines"].map((cuisine) => (
                <div 
                  key={cuisine} 
                  className={`cursor-pointer border rounded-lg p-4 text-center hover:bg-chef-primary/10 transition-colors ${
                    selectedCuisine === cuisine ? 'bg-chef-primary text-white' : 'bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700'
                  }`}
                  onClick={() => handleSelectCuisine(cuisine)}
                >
                  <p className="font-medium">{cuisine}</p>
                </div>
              ))}
            </div>
          </>
        );
        
      case "ingredients":
        return (
          <>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => setStep("cuisine")}
                >
                  <ArrowLeft size={16} />
                </Button>
                <h2 className="text-xl font-semibold">Add Your Ingredients</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Select ingredients you have or want to use in your recipe
              </p>
            </div>
            
            <QuickIngredientSelector onAddIngredients={handleAddIngredients} />
            
            <div className="mt-4 text-center">
              <Button 
                variant="outline"
                onClick={skipIngredients}
              >
                Skip this step
              </Button>
            </div>
          </>
        );
        
      default: // category
        return (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select a Category</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Choose what type of recipe you're looking for
              </p>
            </div>

            {/* Category selection tabs */}
            <Tabs 
              defaultValue="food" 
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as Category)}
              className="w-full mb-6"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="food" className="font-medium">Food</TabsTrigger>
                <TabsTrigger value="desserts" className="font-medium">Desserts</TabsTrigger>
                <TabsTrigger value="drinks" className="font-medium">Drinks</TabsTrigger>
              </TabsList>
            </Tabs>
          </>
        );
    }
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-chef-dark dark:text-white">Chef AI</h1>
            <p className="text-gray-500 dark:text-gray-400">What would you like to cook today?</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-gray-200 dark:border-gray-700">
              <Search size={18} />
            </Button>
            <Link to="/filters">
              <Button variant="outline" className="rounded-full w-10 h-10 p-0 border-gray-200 dark:border-gray-700">
                <Filter size={18} />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Category tabs */}
        <Tabs 
          defaultValue="food" 
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as Category)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="food" className="font-medium">Food</TabsTrigger>
            <TabsTrigger value="desserts" className="font-medium">Desserts</TabsTrigger>
            <TabsTrigger value="drinks" className="font-medium">Drinks</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      
      <main className="px-6">
        {renderStepContent()}
        
        {step === "subcategory" && (
          <>
            {/* Add Ingredients Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold dark:text-white">Add Ingredients</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-chef-primary"
                  onClick={() => setStep("ingredients")}
                >
                  See All
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-hide">
                  {["Chicken", "Rice", "Garlic", "Potato", "Tomato", "Beef", "Onion", "Carrots"].map(ingredient => (
                    <Button
                      key={ingredient}
                      variant="outline"
                      size="sm"
                      className="shrink-0 rounded-full border-gray-200 dark:border-gray-700"
                      onClick={() => setSelectedIngredients(prev => [...prev, ingredient])}
                    >
                      {ingredient}
                    </Button>
                  ))}
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setStep("ingredients")}
                >
                  <Plus size={16} />
                  <span>Add Your Ingredients</span>
                </Button>
              </div>
            </div>
            
            {/* Find Recipes Button */}
            <div className="mb-6">
              <Button 
                className="w-full bg-chef-primary hover:bg-chef-primary/90 text-white py-3 rounded-xl shadow-md flex justify-center items-center gap-2"
                onClick={findRecipes}
                disabled={!selectedSubcategory && selectedIngredients.length === 0}
              >
                <Search size={18} />
                <span className="font-medium">Find Recipes</span>
              </Button>
            </div>
            
            {/* Quick Filter Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold dark:text-white">Quick Filters</h2>
                <Link to="/filters">
                  <Button variant="ghost" size="sm" className="text-chef-primary">
                    All Filters
                  </Button>
                </Link>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Link to="/saved-recipes" className="flex-shrink-0">
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 rounded-full flex items-center gap-1">
                    <Star size={15} />
                    <span>Saved Recipes</span>
                  </Button>
                </Link>
                <Link to="/cooking-history" className="flex-shrink-0">
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 rounded-full flex items-center gap-1">
                    <Clock size={15} />
                    <span>History</span>
                  </Button>
                </Link>
                <Link to="/browse" className="flex-shrink-0">
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 rounded-full flex items-center gap-1">
                    <Globe size={15} />
                    <span>Global Cuisine</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Share Your Culinary Creation */}
            <div className="mb-6 bg-gradient-to-r from-chef-secondary/10 to-chef-accent/10 dark:from-chef-secondary/30 dark:to-chef-accent/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-chef-secondary text-white p-2 rounded-full">
                  <Share size={20} />
                </div>
                <h2 className="text-lg font-semibold dark:text-white">Share Your Culinary Creation</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Share your recipes, get feedback, and inspire others with your cooking skills.
              </p>
              <Link to="/add-recipe">
                <Button className="w-full bg-chef-secondary hover:bg-chef-secondary/90 text-white">
                  Create and Share Recipe
                </Button>
              </Link>
            </div>

            {/* Cook With What You Have */}
            <div className="mb-6 bg-gradient-to-r from-chef-primary/10 to-chef-secondary/10 dark:from-chef-primary/30 dark:to-chef-secondary/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-chef-primary text-white p-2 rounded-full">
                  <Utensils size={20} />
                </div>
                <h2 className="text-lg font-semibold dark:text-white">Cook With What You Have</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Select ingredients from your pantry and find recipes you can make right now.
              </p>
              <Link to="/pantry">
                <Button className="w-full bg-chef-primary hover:bg-chef-primary/90 text-white">
                  Find Recipes With Your Ingredients
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
    </AppLayout>
  );
}
