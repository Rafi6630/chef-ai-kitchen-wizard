
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CuisineFilter, MealTypeFilter, DietaryFilter, DifficultyFilter } from "@/types";

interface FilterDropdownsProps {
  filters: {
    cuisine: CuisineFilter | null;
    dietary: DietaryFilter[];
    difficulty: DifficultyFilter | null;
    mealType: MealTypeFilter | null;
  };
  isFilterOpen: Record<string, boolean>;
  toggleFilter: (filterName: string) => void;
  handleFilterSelect: (type: string, value: string | string[]) => void;
  toggleDietaryFilter: (filter: DietaryFilter) => void;
  cuisineOptions: CuisineFilter[];
  mealTypeOptions: MealTypeFilter[];
  difficultyOptions: DifficultyFilter[];
  dietaryOptions: DietaryFilter[];
}

export function FilterDropdowns({
  filters,
  isFilterOpen,
  toggleFilter,
  handleFilterSelect,
  toggleDietaryFilter,
  cuisineOptions,
  mealTypeOptions,
  difficultyOptions,
  dietaryOptions
}: FilterDropdownsProps) {
  return (
    <div className="mb-5">
      <h3 className="font-medium mb-2">Filters</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Cuisine Filter */}
        <div className="relative">
          <DropdownMenu open={isFilterOpen.cuisine} onOpenChange={(open) => toggleFilter('cuisine')}>
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
          <DropdownMenu open={isFilterOpen.mealType} onOpenChange={(open) => toggleFilter('mealType')}>
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
          <DropdownMenu open={isFilterOpen.difficulty} onOpenChange={(open) => toggleFilter('difficulty')}>
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
          <DropdownMenu open={isFilterOpen.dietary} onOpenChange={(open) => toggleFilter('dietary')}>
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
  );
}
