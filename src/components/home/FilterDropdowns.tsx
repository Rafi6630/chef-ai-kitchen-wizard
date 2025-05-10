
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CuisineFilter, MealTypeFilter, DietaryFilter, DifficultyFilter } from "@/types";
import { Filter, ChevronDown } from "lucide-react";

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
  // Group cuisines by region for better organization
  const cuisineGroups = {
    "Levant & Middle East": ["turkish", "syrian", "iraqi", "yemeni", "lebanese"],
    "Maghreb & North Africa": ["moroccan"],
    "Europe": ["italian", "german"],
    "Americas": ["american", "mexican"],
    "Asia": ["chinese", "indian", "japanese", "thai"]
  };

  return (
    <div className="mb-5 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Filter size={18} />
        Recipe Filters
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Cuisine Filter */}
        <div className="relative">
          <DropdownMenu open={isFilterOpen.cuisine} onOpenChange={(open) => toggleFilter('cuisine')}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={filters.cuisine ? "default" : "outline"}
                size="sm" 
                className="rounded-full flex items-center gap-1"
                onClick={() => toggleFilter('cuisine')}
              >
                {filters.cuisine ? `Cuisine: ${filters.cuisine}` : 'Cuisine/Country'}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 max-h-80 overflow-y-auto">
              {Object.entries(cuisineGroups).map(([groupName, cuisines]) => (
                <div key={groupName} className="px-2 py-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">{groupName}</p>
                  {cuisines.filter(cuisine => cuisineOptions.includes(cuisine as CuisineFilter)).map(cuisine => (
                    <DropdownMenuItem 
                      key={cuisine}
                      className="capitalize"
                      onClick={() => handleFilterSelect('cuisine', cuisine as CuisineFilter)}
                    >
                      {cuisine}
                    </DropdownMenuItem>
                  ))}
                </div>
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
                className="rounded-full flex items-center gap-1"
                onClick={() => toggleFilter('mealType')}
              >
                {filters.mealType ? `Meal: ${filters.mealType}` : 'Meal Type'}
                <ChevronDown size={16} />
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
                className="rounded-full flex items-center gap-1"
                onClick={() => toggleFilter('difficulty')}
              >
                {filters.difficulty ? `Difficulty: ${filters.difficulty}` : 'Difficulty'}
                <ChevronDown size={16} />
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
                className="rounded-full flex items-center gap-1"
                onClick={() => toggleFilter('dietary')}
              >
                {filters.dietary.length > 0 ? `Dietary: ${filters.dietary.length}` : 'Dietary Needs'}
                <ChevronDown size={16} />
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
