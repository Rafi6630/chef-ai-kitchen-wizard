
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { 
  CuisineFilter, 
  DietaryFilter, 
  DifficultyFilter, 
  MealTypeFilter
} from "@/types";

type FiltersState = {
  cuisine: CuisineFilter | null;
  dietary: DietaryFilter[];
  difficulty: DifficultyFilter | null;
  mealType: MealTypeFilter | null;
  tools: string[];
}

export default function Filters() {
  const [filters, setFilters] = useState<FiltersState>({
    cuisine: null,
    dietary: [],
    difficulty: null,
    mealType: null,
    tools: []
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleDietaryFilter = (filter: DietaryFilter) => {
    if (filters.dietary.includes(filter)) {
      setFilters({
        ...filters,
        dietary: filters.dietary.filter(f => f !== filter)
      });
    } else {
      setFilters({
        ...filters,
        dietary: [...filters.dietary, filter]
      });
    }
  };
  
  const resetFilters = () => {
    setFilters({
      cuisine: null,
      dietary: [],
      difficulty: null,
      mealType: null,
      tools: []
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };
  
  const applyFilters = () => {
    // Count active filters
    const activeFilters = 
      (filters.cuisine ? 1 : 0) + 
      filters.dietary.length + 
      (filters.difficulty ? 1 : 0) + 
      (filters.mealType ? 1 : 0) + 
      filters.tools.length;
    
    toast({
      title: "Filters Applied",
      description: `${activeFilters} filters applied.`,
    });
    navigate('/browse', { 
      state: { filters } 
    });
  };
  
  return (
    <AppLayout showNavigation={false}>
      <header className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Filters</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={resetFilters} className="text-gray-500">
            Reset
          </Button>
          <Button onClick={applyFilters} className="btn-primary">
            Apply
          </Button>
        </div>
      </header>
      
      <div className="p-6 space-y-8">
        {/* Cuisine/Country */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Cuisine / Country</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "italian", name: "Italian" },
              { id: "mexican", name: "Mexican" },
              { id: "chinese", name: "Chinese" },
              { id: "indian", name: "Indian" },
              { id: "japanese", name: "Japanese" },
              { id: "thai", name: "Thai" },
              { id: "turkish", name: "Turkish" },
              { id: "syrian", name: "Syrian" },
              { id: "iraqi", name: "Iraqi" },
              { id: "yemeni", name: "Yemeni" },
              { id: "american", name: "American" },
              { id: "moroccan", name: "Moroccan" },
              { id: "lebanese", name: "Lebanese" },
              { id: "german", name: "German" }
            ].map(cuisine => (
              <div 
                key={cuisine.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filters.cuisine === cuisine.id ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => setFilters({
                  ...filters,
                  cuisine: filters.cuisine === cuisine.id as CuisineFilter ? null : cuisine.id as CuisineFilter
                })}
              >
                <Checkbox 
                  id={`cuisine-${cuisine.id}`} 
                  checked={filters.cuisine === cuisine.id}
                  className="mr-2"
                />
                <Label htmlFor={`cuisine-${cuisine.id}`} className="cursor-pointer w-full">
                  {cuisine.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dietary Preferences */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Dietary Preferences</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "vegetarian", name: "Vegetarian" },
              { id: "vegan", name: "Vegan" },
              { id: "glutenFree", name: "Gluten-Free" },
              { id: "dairyFree", name: "Dairy-Free" },
              { id: "keto", name: "Keto" },
              { id: "lowCarb", name: "Low-Carb" }
            ].map(diet => (
              <div 
                key={diet.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filters.dietary.includes(diet.id as DietaryFilter) ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => toggleDietaryFilter(diet.id as DietaryFilter)}
              >
                <Checkbox 
                  id={diet.id} 
                  checked={filters.dietary.includes(diet.id as DietaryFilter)}
                  className="mr-2"
                />
                <Label htmlFor={diet.id} className="cursor-pointer w-full">{diet.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Difficulty */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Difficulty</h2>
          <div className="space-y-2">
            {[
              { id: "easy", name: "Easy" },
              { id: "medium", name: "Medium" },
              { id: "hard", name: "Hard" }
            ].map(difficulty => (
              <div 
                key={difficulty.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filters.difficulty === difficulty.id ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => setFilters({
                  ...filters,
                  difficulty: filters.difficulty === difficulty.id as DifficultyFilter ? null : difficulty.id as DifficultyFilter
                })}
              >
                <RadioGroupItem 
                  id={difficulty.id} 
                  value={difficulty.id}
                  checked={filters.difficulty === difficulty.id}
                  className="mr-2"
                />
                <Label htmlFor={difficulty.id} className="cursor-pointer w-full">{difficulty.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Meal Type */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Meal Type</h2>
          <div className="space-y-2">
            {[
              { id: "any", name: "Any Meal" },
              { id: "breakfast", name: "Breakfast" },
              { id: "lunch", name: "Lunch" },
              { id: "dinner", name: "Dinner" },
              { id: "dessert", name: "Dessert" },
              { id: "snack", name: "Snack" }
            ].map(mealType => (
              <div 
                key={mealType.id} 
                className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                  filters.mealType === mealType.id ? 'border-chef-primary bg-chef-primary/10' : 'border-gray-200'
                }`}
                onClick={() => setFilters({
                  ...filters,
                  mealType: filters.mealType === mealType.id as MealTypeFilter ? null : mealType.id as MealTypeFilter
                })}
              >
                <RadioGroupItem 
                  id={mealType.id} 
                  value={mealType.id}
                  checked={filters.mealType === mealType.id}
                  className="mr-2"
                />
                <Label htmlFor={mealType.id} className="cursor-pointer w-full">{mealType.name}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button onClick={applyFilters} className="btn-primary w-full my-6">
          Apply Filters
        </Button>
      </div>
    </AppLayout>
  );
}
