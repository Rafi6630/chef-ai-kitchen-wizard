
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { Search, Filter, ArrowLeft, X, Globe } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { recipes, subcategories } from "@/data/mockData";
import { Recipe, Category, SubcategoryInfo } from "@/types";
import CategoryCarousel from "@/components/ui/CategoryCarousel";
import MealTypeSelector from "@/components/ui/MealTypeSelector";
import { MealTypeFilter } from "@/types";

export default function Browse() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSubcategory = searchParams.get("subcategory");
  const urlCuisine = searchParams.get("cuisine");
  const urlIngredients = searchParams.get("ingredients");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<MealTypeFilter>("any");
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [step, setStep] = useState<"browse" | "category" | "cuisine">("browse");
  const [selectedCategory, setSelectedCategory] = useState<Category>(urlCategory as Category || "food");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(urlSubcategory || null);
  
  // Set initial state from URL parameters
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory as Category);
    }
    
    if (urlSubcategory) {
      setSelectedSubcategory(urlSubcategory);
    }
    
    if (urlCuisine) {
      setSelectedCuisine(urlCuisine.toLowerCase());
    }
    
    if (urlIngredients) {
      setSelectedIngredients(urlIngredients.split(','));
    }
  }, [urlCategory, urlSubcategory, urlCuisine, urlIngredients]);

  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );

  // Filter recipes based on search term, meal type, cuisine, ingredients, and categories
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      searchTerm === "" || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMealType = selectedMealType === 'any' || recipe.category.toLowerCase() === selectedMealType;
    
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine.toLowerCase() === selectedCuisine;
    
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    
    const matchesSubcategory = selectedSubcategory ? recipe.subcategory === selectedSubcategory : true;
    
    // If there are selected ingredients, check if recipe ingredients include them
    const matchesIngredients = selectedIngredients.length === 0 || 
      selectedIngredients.every(ingredient => 
        recipe.ingredients.some(ri => 
          ri.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    
    return matchesSearch && matchesMealType && matchesCuisine && matchesIngredients && matchesCategory && matchesSubcategory;
  });

  const handleSelectSubcategory = (subcategory: SubcategoryInfo) => {
    setSelectedSubcategory(selectedSubcategory === subcategory.id ? null : subcategory.id);
  };
  
  const renderStepContent = () => {
    switch(step) {
      case "category":
        return (
          <div className="p-6">
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
                variant={selectedMealType === 'any' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('any');
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
              <Button 
                variant={selectedMealType === 'dessert' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('dessert');
                  setStep("cuisine");
                }}
              >
                Dessert
              </Button>
              <Button 
                variant={selectedMealType === 'snack' ? 'default' : 'outline'}
                className="justify-start h-16 text-lg"
                onClick={() => {
                  setSelectedMealType('snack');
                  setStep("cuisine");
                }}
              >
                Snack
              </Button>
            </div>
          </div>
        );
        
      case "cuisine":
        return (
          <div className="p-6">
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
                  setStep("browse");
                }}
              >
                All Cuisines
              </Button>
              <Button 
                variant={selectedCuisine === 'italian' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('italian');
                  setStep("browse");
                }}
              >
                Italian
              </Button>
              <Button 
                variant={selectedCuisine === 'mexican' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('mexican');
                  setStep("browse");
                }}
              >
                Mexican
              </Button>
              <Button 
                variant={selectedCuisine === 'asian' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('asian');
                  setStep("browse");
                }}
              >
                Asian
              </Button>
              <Button 
                variant={selectedCuisine === 'american' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('american');
                  setStep("browse");
                }}
              >
                American
              </Button>
              <Button 
                variant={selectedCuisine === 'indian' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('indian');
                  setStep("browse");
                }}
              >
                Indian
              </Button>
              <Button 
                variant={selectedCuisine === 'mediterranean' ? 'default' : 'outline'}
                className="justify-start h-12"
                onClick={() => {
                  setSelectedCuisine('mediterranean');
                  setStep("browse");
                }}
              >
                Mediterranean
              </Button>
            </div>
          </div>
        );
                
      default: // browse
        return (
          <>
            <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div className="flex items-center mb-3">
                <Link to="/" className="mr-3">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft size={20} />
                  </Button>
                </Link>
                <h1 className="text-2xl font-bold mb-0 flex items-center">
                  <Globe className="mr-2" /> Global Cuisine
                </h1>
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
              
              {/* Category filters */}
              <div className="mt-4">
                <Tabs 
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as Category)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="food" className="font-medium">Food</TabsTrigger>
                    <TabsTrigger value="desserts" className="font-medium">Desserts</TabsTrigger>
                    <TabsTrigger value="drinks" className="font-medium">Drinks</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* Subcategory carousel */}
                <div className="mb-4">
                  <CategoryCarousel 
                    subcategories={filteredSubcategories}
                    onSelectSubcategory={handleSelectSubcategory}
                    selectedSubcategoryId={selectedSubcategory || undefined}
                  />
                </div>
                
                {/* Meal Type selector */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Meal Type</h3>
                  <MealTypeSelector 
                    onSelectMealType={setSelectedMealType}
                    selectedMealType={selectedMealType}
                  />
                </div>
              </div>
              
              {/* Applied filters */}
              {(selectedMealType !== 'any' || selectedCuisine !== 'all' || 
                selectedIngredients.length > 0 || selectedSubcategory) && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedMealType !== 'any' && (
                      <div className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center text-sm">
                        <span>Meal: {selectedMealType}</span>
                        <button 
                          onClick={() => setSelectedMealType('any')}
                          className="ml-2 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {selectedSubcategory && (
                      <div className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center text-sm">
                        <span>
                          Subcategory: {subcategories.find(s => s.id === selectedSubcategory)?.name || selectedSubcategory}
                        </span>
                        <button 
                          onClick={() => setSelectedSubcategory(null)}
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
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setSelectedMealType('any');
                        setSelectedCuisine('all');
                        setSelectedIngredients([]);
                        setSelectedSubcategory(null);
                      }}
                    >
                      Clear All
                    </Button>
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
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-[1.02]">
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
