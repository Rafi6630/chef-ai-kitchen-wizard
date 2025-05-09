
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChefHat, Clock, Star, Globe, Utensils, ArrowRight, ArrowLeft, Plus } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import CategoryCard from "@/components/ui/CategoryCard";
import { subcategories } from "@/data/mockData";
import { Category, MealTypeFilter, CuisineFilter, DietaryFilter, DifficultyFilter } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import QuickIngredientSelector from "@/components/recipe/QuickIngredientSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { PantryItem } from "@/types";

// Sample pantry data - in a real app, this would come from a database or context
const initialPantryItems: PantryItem[] = [
  { id: "1", name: "Eggs", quantity: 6, unit: "pieces", category: "Dairy & Eggs", addedDate: new Date() },
  { id: "2", name: "Milk", quantity: 1, unit: "liter", category: "Dairy & Eggs", addedDate: new Date() },
  { id: "3", name: "Chicken Breast", quantity: 500, unit: "grams", category: "Meat & Seafood", addedDate: new Date() },
  { id: "4", name: "Potatoes", quantity: 2, unit: "kg", category: "Vegetables", addedDate: new Date() },
  { id: "5", name: "Rice", quantity: 1.5, unit: "kg", category: "Grains & Pasta", addedDate: new Date() },
  { id: "6", name: "Olive Oil", quantity: 500, unit: "ml", category: "Oils & Condiments", addedDate: new Date() },
  { id: "7", name: "Garlic", quantity: 5, unit: "pieces", category: "Vegetables", addedDate: new Date() },
  { id: "8", name: "Onions", quantity: 3, unit: "pieces", category: "Vegetables", addedDate: new Date() },
  { id: "9", name: "Tomatoes", quantity: 4, unit: "pieces", category: "Vegetables", addedDate: new Date() },
  { id: "10", name: "Ground Beef", quantity: 500, unit: "grams", category: "Meat & Seafood", addedDate: new Date() }
];

// Filter options
const cuisineOptions: CuisineFilter[] = ["italian", "mexican", "chinese", "indian", "japanese", "thai", "turkish", "syrian", "iraqi", "yemeni", "american", "moroccan", "lebanese", "german"];
const dietaryOptions: DietaryFilter[] = ["vegetarian", "vegan", "glutenFree", "dairyFree", "keto", "lowCarb"];
const difficultyOptions: DifficultyFilter[] = ["easy", "medium", "hard"];
const mealTypeOptions: MealTypeFilter[] = ["any", "breakfast", "lunch", "dinner", "dessert", "snack"];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [step, setStep] = useState<"subcategory" | "ingredients" | "confirm">("subcategory");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [pantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [isPantryDialogOpen, setIsPantryDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState<Record<string, boolean>>({
    cuisine: false,
    dietary: false,
    difficulty: false,
    mealType: false
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    cuisine: null as CuisineFilter | null,
    dietary: [] as DietaryFilter[],
    difficulty: null as DifficultyFilter | null,
    mealType: null as MealTypeFilter | null
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );

  const handleSelectSubcategory = (id: string) => {
    setSelectedSubcategory(id);
  };

  const handleAddPantryIngredients = (selected: string[]) => {
    setSelectedIngredients([...new Set([...selectedIngredients, ...selected])]);
    setIsPantryDialogOpen(false);
    
    toast({
      title: "Ingredients Added",
      description: `${selected.length} ingredients added from your pantry.`
    });
  };
  
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };
  
  const findRecipes = () => {
    // Build query params for filtering
    const params = new URLSearchParams();
    
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedSubcategory) params.append('subcategory', selectedSubcategory);
    if (filters.cuisine) params.append('cuisine', filters.cuisine);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.mealType) params.append('mealType', filters.mealType);
    if (filters.dietary.length > 0) params.append('dietary', filters.dietary.join(','));
    if (selectedIngredients.length > 0) params.append('ingredients', selectedIngredients.join(','));
    
    navigate(`/browse?${params.toString()}`);
  };
  
  // Toggle filter dropdown
  const toggleFilter = (filterName: string) => {
    setIsFilterOpen(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };
  
  // Handle filter selection
  const handleFilterSelect = (type: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    
    // Auto close the dropdown after selection
    setIsFilterOpen(prev => ({
      ...prev,
      [type]: false
    }));
  };

  // Toggle dietary filter since it's multi-select
  const toggleDietaryFilter = (filter: DietaryFilter) => {
    setFilters(prev => {
      const dietary = prev.dietary.includes(filter) 
        ? prev.dietary.filter(f => f !== filter)
        : [...prev.dietary, filter];
      
      return {
        ...prev,
        dietary
      };
    });
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-chef-dark dark:text-white">Chef AI</h1>
            <p className="text-gray-500 dark:text-gray-400">AI-Powered Recipe Finder</p>
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
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Select a Subcategory</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Choose a specific category to find recipes
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
          {filteredSubcategories.map((subcategory) => (
            <div 
              key={subcategory.id} 
              className="cursor-pointer"
              onClick={() => handleSelectSubcategory(subcategory.id)}
            >
              <CategoryCard 
                subcategory={subcategory}
                isSelected={selectedSubcategory === subcategory.id}
              />
            </div>
          ))}
        </div>
        
        {selectedSubcategory && (
          <>
            {/* Filters Section */}
            <div className="mb-5">
              <h3 className="font-medium mb-2">Filters</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Cuisine Filter */}
                <div className="relative">
                  <DropdownMenu open={isFilterOpen.cuisine} onOpenChange={(open) => setIsFilterOpen(prev => ({ ...prev, cuisine: open }))}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant={filters.cuisine ? "default" : "outline"}
                        size="sm" 
                        className="rounded-full"
                        onClick={() => toggleFilter('cuisine')}
                      >
                        {filters.cuisine ? `Cuisine: ${filters.cuisine}` : 'Cuisine'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 max-h-60 overflow-y-auto">
                      {cuisineOptions.map(cuisine => (
                        <DropdownMenuItem 
                          key={cuisine}
                          className="capitalize"
                          onClick={() => handleFilterSelect('cuisine', cuisine)}
                        >
                          {cuisine}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Meal Type Filter */}
                <div className="relative">
                  <DropdownMenu open={isFilterOpen.mealType} onOpenChange={(open) => setIsFilterOpen(prev => ({ ...prev, mealType: open }))}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant={filters.mealType ? "default" : "outline"}
                        size="sm" 
                        className="rounded-full"
                        onClick={() => toggleFilter('mealType')}
                      >
                        {filters.mealType ? `Meal: ${filters.mealType}` : 'Meal Type'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {mealTypeOptions.map(mealType => (
                        <DropdownMenuItem 
                          key={mealType}
                          className="capitalize"
                          onClick={() => handleFilterSelect('mealType', mealType)}
                        >
                          {mealType === 'any' ? 'Any Meal' : mealType}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Difficulty Filter */}
                <div className="relative">
                  <DropdownMenu open={isFilterOpen.difficulty} onOpenChange={(open) => setIsFilterOpen(prev => ({ ...prev, difficulty: open }))}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant={filters.difficulty ? "default" : "outline"}
                        size="sm" 
                        className="rounded-full"
                        onClick={() => toggleFilter('difficulty')}
                      >
                        {filters.difficulty ? `Difficulty: ${filters.difficulty}` : 'Difficulty'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {difficultyOptions.map(difficulty => (
                        <DropdownMenuItem 
                          key={difficulty}
                          className="capitalize"
                          onClick={() => handleFilterSelect('difficulty', difficulty)}
                        >
                          {difficulty}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Dietary Preferences Filter */}
                <div className="relative">
                  <DropdownMenu open={isFilterOpen.dietary} onOpenChange={(open) => setIsFilterOpen(prev => ({ ...prev, dietary: open }))}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant={filters.dietary.length > 0 ? "default" : "outline"}
                        size="sm" 
                        className="rounded-full"
                        onClick={() => toggleFilter('dietary')}
                      >
                        {filters.dietary.length > 0 ? `Dietary: ${filters.dietary.length}` : 'Dietary'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {dietaryOptions.map(diet => (
                        <DropdownMenuItem 
                          key={diet}
                          className="flex items-center capitalize"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleDietaryFilter(diet);
                          }}
                        >
                          <input 
                            type="checkbox" 
                            checked={filters.dietary.includes(diet)} 
                            onChange={() => {}} 
                            className="mr-2"
                          />
                          {diet}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            {/* Add Ingredients Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold dark:text-white">Add Your Ingredients</h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <Dialog open={isPantryDialogOpen} onOpenChange={setIsPantryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 mb-3">
                      <Plus size={16} />
                      <span>Select from Pantry</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select Ingredients from Pantry</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Select ingredients from your pantry to use in recipes</p>
                      </div>
                      
                      <div className="max-h-60 overflow-y-auto">
                        {/* Group by category */}
                        {Object.entries(
                          pantryItems.reduce((acc, item) => {
                            if (!acc[item.category]) acc[item.category] = [];
                            acc[item.category].push(item);
                            return acc;
                          }, {} as Record<string, PantryItem[]>)
                        ).map(([category, items]) => (
                          <div key={category} className="mb-3">
                            <h4 className="text-sm font-medium mb-1">{category}</h4>
                            <div className="space-y-1">
                              {items.map(item => (
                                <div key={item.id} className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    id={`pantry-${item.id}`} 
                                    className="mr-2"
                                    checked={selectedIngredients.includes(item.name)} 
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedIngredients(prev => [...prev, item.name]);
                                      } else {
                                        setSelectedIngredients(prev => prev.filter(i => i !== item.name));
                                      }
                                    }}
                                  />
                                  <label htmlFor={`pantry-${item.id}`} className="text-sm flex-1">
                                    {item.name} ({item.quantity} {item.unit})
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          onClick={() => {
                            const selected = selectedIngredients.filter(ingredient => 
                              pantryItems.some(item => item.name === ingredient)
                            );
                            handleAddPantryIngredients(selected);
                          }}
                        >
                          Add Selected Ingredients
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {selectedIngredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedIngredients.map((ingredient, index) => (
                      <div key={index} className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center">
                        <span>{ingredient}</span>
                        <button 
                          onClick={() => removeIngredient(ingredient)}
                          className="ml-2 hover:text-red-500"
                        >
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 mb-3">
                    No ingredients selected yet
                  </div>
                )}
                
                {/* Quick Add Popular Ingredients */}
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-2">Quick Add Popular Ingredients</h4>
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                    {["Chicken", "Rice", "Garlic", "Potato", "Tomato", "Beef", "Onion", "Carrots"].map(ingredient => (
                      <Button
                        key={ingredient}
                        variant="outline"
                        size="sm"
                        className={`shrink-0 rounded-full ${
                          selectedIngredients.includes(ingredient) ? 'bg-chef-primary/20' : ''
                        }`}
                        onClick={() => {
                          if (!selectedIngredients.includes(ingredient)) {
                            setSelectedIngredients(prev => [...prev, ingredient])
                          }
                        }}
                      >
                        {ingredient}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Find Recipes Button */}
                <Button 
                  className="w-full mt-4 bg-chef-primary hover:bg-chef-primary/90 text-white py-3 rounded-xl shadow-md flex justify-center items-center gap-2"
                  onClick={findRecipes}
                >
                  <Search size={18} />
                  <span className="font-medium">Find Recipes</span>
                </Button>
              </div>
            </div>
          </>
        )}
        
        {/* Quick Filter Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold dark:text-white">Quick Links</h2>
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
      </main>
    </AppLayout>
  );
}
