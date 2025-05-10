
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { HomeHeader } from "@/components/home/HomeHeader";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { SubcategoryGrid } from "@/components/home/SubcategoryGrid";
import { FilterDropdowns } from "@/components/home/FilterDropdowns";
import { IngredientSelector } from "@/components/home/IngredientSelector";
import { RecipeFinder } from "@/components/home/RecipeFinder";
import { QuickLinks } from "@/components/home/QuickLinks";
import { useHomeFilters } from "@/hooks/useHomeFilters";

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
  
  return (
    <AppLayout>
      <header className="px-6 py-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-800">
        <HomeHeader />
        
        {/* Category tabs */}
        <CategoryTabs 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </header>
      
      <main className="px-6">
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
            
            <RecipeFinder findRecipes={findRecipes} />
          </>
        )}
        
        {/* Quick Filter Section */}
        <QuickLinks />
      </main>
    </AppLayout>
  );
}
