
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RecipeListProps {
  recipes: any[];
  selectedSubcategoryInfo: any;
  selectedCuisine: string | null;
  selectedMealType: string;
  clearFilters: () => void;
}

export function RecipeList({
  recipes,
  selectedSubcategoryInfo,
  selectedCuisine,
  selectedMealType,
  clearFilters
}: RecipeListProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">
        {selectedSubcategoryInfo ? selectedSubcategoryInfo.name : "All Recipes"}
        {selectedCuisine && ` • ${selectedCuisine}`}
        {selectedMealType !== "any" && ` • ${selectedMealType}`}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {recipes.length} recipes found
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
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
    </div>
  );
}
