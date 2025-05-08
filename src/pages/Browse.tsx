import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { Search, Filter, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { recipes } from "@/data/mockData";
import { Recipe } from "@/types";
import QuickIngredientSelector from "@/components/recipe/QuickIngredientSelector";

type MealType = 'all' | 'breakfast' | 'lunch' | 'dinner';
type CuisineType = 'all' | 'italian' | 'mexican' | 'asian' | 'american' | 'indian' | 'mediterranean';

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<MealType>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>('all');
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [step, setStep] = useState<"browse" | "category" | "cuisine" | "ingredients">("browse");
  
  const handleAddIngredients = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    setShowIngredientSelector(false);
  };

  // Filter recipes based on search term, meal type, cuisine, and ingredients
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMealType = selectedMealType === 'all' || recipe.category.toLowerCase() === selectedMealType;
    
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine.toLowerCase().includes(selectedCuisine);
    
    // If there are selected ingredients, check if recipe ingredients include them
    const matchesIngredients = selectedIngredients.length === 0 || 
      selectedIngredients.every(ingredient => 
        recipe.ingredients.some(ri => 
          ri.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    
    return matchesSearch && matchesMealType && matchesCuisine && matchesIngredients;
  });
  
  const renderStepContent = () => {
    switch(step) {
      case "category":
        return (
          <div>
            <div className="flex items-center mb-4">
              <Button
                variant="ghost" 
                onClick={() => setStep("browse")}
                className="mr-2"
              >
                <ArrowLeft size={18} />
              </Button>
              <h2 className="text-xl font-bold">Select Meal Type</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant={selectedMealType === 'all' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('all');
                  setStep("cuisine");
                }}
              >
                All Meals
              </Button>
              <Button 
                variant={selectedMealType === 'breakfast' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('breakfast');
                  setStep("cuisine");
                }}
              >
                Breakfast
              </Button>
              <Button 
                variant={selectedMealType === 'lunch' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('lunch');
                  setStep("cuisine");
                }}
              >
                Lunch
              </Button>
              <Button 
                variant={selectedMealType === 'dinner' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('dinner');
                  setStep("cuisine");
                }}
              >
                Dinner
              </Button>
            </div>
          </div>
        );
        
      case "cuisine":
        return (
          <div>
            <div className="flex items-center mb-4">
              <Button
                variant="ghost" 
                onClick={() => setStep("category")}
                className="mr-2"
              >
                <ArrowLeft size={18} />
              </Button>
              <h2 className="text-xl font-bold">Select Cuisine</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant={selectedCuisine === 'all' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('all');
                  setStep("ingredients");
                }}
              >
                All Cuisines
              </Button>
              <Button 
                variant={selectedCuisine === 'italian' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('italian');
                  setStep("ingredients");
                }}
              >
                Italian
              </Button>
              <Button 
                variant={selectedCuisine === 'mexican' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('mexican');
                  setStep("ingredients");
                }}
              >
                Mexican
              </Button>
              <Button 
                variant={selectedCuisine === 'asian' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('asian');
                  setStep("ingredients");
                }}
              >
                Asian
              </Button>
              <Button 
                variant={selectedCuisine === 'american' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('american');
                  setStep("ingredients");
                }}
              >
                American
              </Button>
              <Button 
                variant={selectedCuisine === 'indian' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('indian');
                  setStep("ingredients");
                }}
              >
                Indian
              </Button>
              <Button 
                variant={selectedCuisine === 'mediterranean' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('mediterranean');
                  setStep("ingredients");
                }}
              >
                Mediterranean
              </Button>
            </div>
          </div>
        );
        
      case "ingredients":
        return (
          <div>
            <div className="flex items-center mb-4">
              <Button
                variant="ghost" 
                onClick={() => setStep("cuisine")}
                className="mr-2"
              >
                <ArrowLeft size={18} />
              </Button>
              <h2 className="text-xl font-bold">Select Ingredients</h2>
            </div>
            <QuickIngredientSelector onAddIngredients={(ingredients) => {
              handleAddIngredients(ingredients);
              setStep("browse");
            }} />
            <div className="mt-4 text-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedIngredients([]);
                  setStep("browse");
                }}
              >
                Skip this step (show all recipes)
              </Button>
            </div>
          </div>
        );
        
      default: // browse
        return (
          <>
            <header className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div className="flex items-center mb-3">
                <Link to="/" className="mr-3">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft size={20} />
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold mb-0">Browse Recipes</h1>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search recipes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 input-field"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-lg p-2"
                  onClick={() => setStep("category")}
                >
                  <Filter size={20} />
                </Button>
              </div>
              
              {(selectedMealType !== 'all' || selectedCuisine !== 'all' || selectedIngredients.length > 0) && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedMealType !== 'all' && (
                      <div className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center text-sm">
                        <span>Meal: {selectedMealType}</span>
                        <button 
                          onClick={() => setSelectedMealType('all')}
                          className="ml-2 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {selectedCuisine !== 'all' && (
                      <div className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center text-sm">
                        <span>Cuisine: {selectedCuisine}</span>
                        <button 
                          onClick={() => setSelectedCuisine('all')}
                          className="ml-2 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {selectedIngredients.map(ingredient => (
                      <div key={ingredient} className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center text-sm">
                        <span>{ingredient}</span>
                        <button 
                          onClick={() => setSelectedIngredients(prev => prev.filter(i => i !== ingredient))}
                          className="ml-2 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    
                    {(selectedMealType !== 'all' || selectedCuisine !== 'all' || selectedIngredients.length > 0) && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setSelectedMealType('all');
                          setSelectedCuisine('all');
                          setSelectedIngredients([]);
                        }}
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </header>
            
            <main className="p-6">
              <div className="space-y-6">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No recipes found matching your search.</p>
                  </div>
                )}
              </div>
            </main>
          </>
        );
    }
  };
  
  return (
    <AppLayout>
      {renderStepContent()}
    </AppLayout>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative aspect-video">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          {recipe.isPremiumOnly && (
            <div className="absolute top-2 right-2 bg-chef-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              Premium
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg dark:text-white">{recipe.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{recipe.description}</p>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 justify-between">
            <div className="flex gap-2">
              <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
              <span>|</span>
              <span>👨‍🍳 {recipe.difficulty}</span>
            </div>
            <span className="text-xs font-medium">{recipe.cuisine}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
