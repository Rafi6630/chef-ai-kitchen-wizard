
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { HomeHeader } from "@/components/home/HomeHeader";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { SubcategoryGrid } from "@/components/home/SubcategoryGrid";
import { FilterDropdowns } from "@/components/home/FilterDropdowns";
import { IngredientSelector } from "@/components/home/IngredientSelector";
import { RecipeFinder } from "@/components/home/RecipeFinder";
import { QuickLinks } from "@/components/home/QuickLinks";
import { useHomeFilters } from "@/hooks/useHomeFilters";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Utensils, List } from "lucide-react";

export default function Index() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    handleSelectSubcategory,
    filteredSubcategories,
    selectedIngredients,
    setSelectedIngredients,
    pantryItems,
    isPantryDialogOpen,
    setIsPantryDialogOpen,
    filters,
    isFilterOpen,
    toggleFilter,
    handleFilterSelect,
    toggleDietaryFilter,
    findRecipes,
    cuisineOptions,
    dietaryOptions,
    difficultyOptions,
    mealTypeOptions
  } = useHomeFilters();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFindRecipes = () => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      findRecipes();
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <HomeHeader />
        
        {/* Category tabs */}
        <CategoryTabs 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </header>
      
      <main className="px-6 pb-24"> {/* Added padding to bottom to make room for the new navigation */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Select a Subcategory</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Choose a specific category to find recipes
          </p>
        </div>
        
        <SubcategoryGrid
          subcategories={filteredSubcategories}
          selectedSubcategory={selectedSubcategory}
          onSelectSubcategory={handleSelectSubcategory}
        />
        
        {selectedSubcategory && (
          <>
            {/* Filters Section */}
            <FilterDropdowns 
              filters={filters}
              isFilterOpen={isFilterOpen}
              toggleFilter={toggleFilter}
              handleFilterSelect={handleFilterSelect}
              toggleDietaryFilter={toggleDietaryFilter}
              cuisineOptions={cuisineOptions}
              mealTypeOptions={mealTypeOptions}
              difficultyOptions={difficultyOptions}
              dietaryOptions={dietaryOptions}
            />
            
            {/* Add Ingredients Section */}
            <IngredientSelector
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              pantryItems={pantryItems}
              isPantryDialogOpen={isPantryDialogOpen}
              setIsPantryDialogOpen={setIsPantryDialogOpen}
            />
            
            <RecipeFinder findRecipes={handleFindRecipes} isLoading={isLoading} />
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Our AI will prioritize recipes that use most of your available ingredients
            </div>
          </>
        )}
        
        {/* Quick Filter Section */}
        <QuickLinks />
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3 flex justify-around z-20">
          <Link to="/saved-recipes">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2">
              <Heart size={20} />
              <span className="text-xs">Saved Recipes</span>
            </Button>
          </Link>
          
          <Link to="/pantry">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2">
              <Utensils size={20} />
              <span className="text-xs">Smart Pantry</span>
            </Button>
          </Link>
          
          <Link to="/browse">
            <Button variant="ghost" className="flex flex-col items-center gap-1 h-auto py-2">
              <List size={20} />
              <span className="text-xs">Global Recipes</span>
            </Button>
          </Link>
        </div>
      </main>
    </AppLayout>
  );
}
