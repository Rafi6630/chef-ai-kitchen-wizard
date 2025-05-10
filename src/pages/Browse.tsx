
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { BrowseHeader } from "@/components/browse/BrowseHeader";
import { FilterSection } from "@/components/browse/FilterSection";
import { RecipeList } from "@/components/browse/RecipeList";
import { ShareRecipeCard } from "@/components/browse/ShareRecipeCard";
import { useBrowseFilters } from "@/hooks/useBrowseFilters";

export default function Browse() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedCuisine,
    selectedMealType,
    searchTerm,
    setSearchTerm,
    filteredSubcategories,
    selectedSubcategoryInfo,
    filteredRecipes,
    handleSelectSubcategory,
    handleSelectCuisine,
    handleSelectMealType,
    applyFilters,
    clearFilters
  } = useBrowseFilters();
  
  return (
    <AppLayout>
      <BrowseHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubcategory={setSelectedSubcategory}
      />
      
      <FilterSection
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        selectedCuisine={selectedCuisine}
        selectedMealType={selectedMealType}
        filteredSubcategories={filteredSubcategories}
        handleSelectSubcategory={handleSelectSubcategory}
        handleSelectCuisine={handleSelectCuisine}
        handleSelectMealType={handleSelectMealType}
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
      
      <RecipeList
        recipes={filteredRecipes}
        selectedSubcategoryInfo={selectedSubcategoryInfo}
        selectedCuisine={selectedCuisine}
        selectedMealType={selectedMealType}
        clearFilters={clearFilters}
      />
      
      <div className="px-6 pb-6">
        <ShareRecipeCard />
      </div>
    </AppLayout>
  );
}
