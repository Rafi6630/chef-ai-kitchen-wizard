
import React from "react";
import { Button } from "@/components/ui/button";
import { Category, CuisineFilter, MealTypeFilter } from "@/types";
import CategoryCarousel from "@/components/ui/CategoryCarousel";
import CuisineSelector from "@/components/ui/CuisineSelector";
import MealTypeSelector from "@/components/ui/MealTypeSelector";

interface FilterSectionProps {
  selectedCategory: Category;
  selectedSubcategory: string | null;
  selectedCuisine: CuisineFilter | null;
  selectedMealType: MealTypeFilter;
  filteredSubcategories: any[];
  handleSelectSubcategory: (subcategory: any) => void;
  handleSelectCuisine: (cuisine: CuisineFilter) => void;
  handleSelectMealType: (mealType: MealTypeFilter) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

export function FilterSection({
  selectedCategory,
  selectedSubcategory,
  selectedCuisine,
  selectedMealType,
  filteredSubcategories,
  handleSelectSubcategory,
  handleSelectCuisine,
  handleSelectMealType,
  clearFilters,
  applyFilters
}: FilterSectionProps) {
  return (
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
  );
}
