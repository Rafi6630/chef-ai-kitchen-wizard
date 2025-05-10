
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, Search, Filter, Share } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Category, CuisineFilter, MealTypeFilter } from "@/types";
import { recipes, subcategories } from "@/data/mockData";
import CategoryCarousel from "@/components/ui/CategoryCarousel";
import CuisineSelector from "@/components/ui/CuisineSelector";
import MealTypeSelector from "@/components/ui/MealTypeSelector";
import { useToast } from "@/hooks/use-toast";

export default function Browse() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineFilter | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealTypeFilter>("any");
  const [searchTerm, setSearchTerm] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter subcategories based on selected main category
  const filteredSubcategories = subcategories.filter(
    subcategory => subcategory.category === selectedCategory
  );
  
  // Get the selected subcategory info
  const selectedSubcategoryInfo = subcategories.find(
    subcategory => subcategory.id === selectedSubcategory
  );
  
  // Apply all filters to recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || recipe.subcategory === selectedSubcategory;
    const matchesCuisine = !selectedCuisine || recipe.cuisine.toLowerCase() === selectedCuisine;
    // Fix: replace mealType with a field that actually exists on Recipe, or add it to the type
    const matchesMealType = !selectedMealType || selectedMealType === "any";
    const matchesSearch = !searchTerm || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesCuisine && matchesMealType && matchesSearch;
  });
  
  // Handle query params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Set filters from URL parameters
    const categoryParam = params.get('category');
    const subcategoryParam = params.get('subcategory');
    const cuisineParam = params.get('cuisine');
    const mealTypeParam = params.get('mealType');
    const searchParam = params.get('search');
    
    if (categoryParam && ['food', 'desserts', 'drinks'].includes(categoryParam)) {
      setSelectedCategory(categoryParam as Category);
    }
    
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam);
    }
    
    if (cuisineParam && cuisineParam !== 'all') {
      setSelectedCuisine(cuisineParam as CuisineFilter);
    }
    
    if (mealTypeParam && mealTypeParam !== 'any') {
      setSelectedMealType(mealTypeParam as MealTypeFilter);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);
  
  const handleSelectSubcategory = (subcategory: any) => {
    setSelectedSubcategory(subcategory.id);
  };
  
  const handleSelectCuisine = (cuisine: CuisineFilter) => {
    setSelectedCuisine(cuisine === selectedCuisine ? null : cuisine);
  };
  
  const handleSelectMealType = (mealType: MealTypeFilter) => {
    setSelectedMealType(mealType === selectedMealType ? "any" : mealType);
  };
  
  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Showing recipes matching your filters",
    });
  };
  
  const clearFilters = () => {
    setSelectedSubcategory(null);
    setSelectedCuisine(null);
    setSelectedMealType("any");
    setSearchTerm("");
    
    toast({
      title: "Filters Cleared",
      description: "Showing all recipes",
    });
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold mb-1">Global Cuisine</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Browse recipes from around the world</p>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search recipes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="rounded-lg p-2">
            <Filter size={20} />
          </Button>
        </div>
        
        {/* Category tabs */}
        <Tabs 
          defaultValue="food" 
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value as Category);
            setSelectedSubcategory(null); // Reset subcategory when changing main category
          }}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="drinks">Drinks</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="mb-4">
          <h2 className="font-medium text-sm mb-2">Select Subcategory</h2>
          <CategoryCarousel 
            subcategories={filteredSubcategories}
            onSelectSubcategory={handleSelectSubcategory}
            selectedSubcategoryId={selectedSubcategory || undefined}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-medium text-sm mb-2">Choose Cuisine</h2>
            <CuisineSelector 
              onSelectCuisine={handleSelectCuisine} 
              selectedCuisine={selectedCuisine || undefined}
            />
          </div>
          
          <div>
            <h2 className="font-medium text-sm mb-2">Meal Type</h2>
            <MealTypeSelector 
              onSelectMealType={handleSelectMealType}
              selectedMealType={selectedMealType}
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button className="bg-chef-primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          {selectedSubcategoryInfo ? selectedSubcategoryInfo.name : "All Recipes"}
          {selectedCuisine && ` • ${selectedCuisine}`}
          {selectedMealType !== "any" && ` • ${selectedMealType}`}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {filteredRecipes.length} recipes found
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="relative aspect-video">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                    {recipe.isPremiumOnly && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-chef-primary to-chef-accent text-white text-xs px-2 py-0.5 rounded-full">
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-base">{recipe.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2">
                      {recipe.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex gap-2">
                        <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{recipe.difficulty}</span>
                      </div>
                      <span className="capitalize">{recipe.cuisine}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 mb-4">No recipes found matching your criteria</p>
              <Button variant="outline" onClick={clearFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
        
        {/* Share Your Culinary Creation */}
        <div className="mt-8 bg-gradient-to-r from-chef-secondary/10 to-chef-accent/10 dark:from-chef-secondary/30 dark:to-chef-accent/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
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
      </div>
    </AppLayout>
  );
}
