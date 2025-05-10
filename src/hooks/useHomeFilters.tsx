
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category, CuisineFilter, MealTypeFilter, DietaryFilter, DifficultyFilter, PantryItem } from "@/types";
import { subcategories } from "@/data/mockData";

// Filter options
const cuisineOptions: CuisineFilter[] = ["italian", "mexican", "chinese", "indian", "japanese", "thai", "turkish", "syrian", "iraqi", "yemeni", "american", "moroccan", "lebanese", "german"];
const dietaryOptions: DietaryFilter[] = ["vegetarian", "vegan", "glutenFree", "dairyFree", "keto", "lowCarb"];
const difficultyOptions: DifficultyFilter[] = ["easy", "medium", "hard"];
const mealTypeOptions: MealTypeFilter[] = ["any", "breakfast", "lunch", "dinner", "dessert", "snack"];

// Sample pantry data - in a real app, this would come from a database or context
const initialPantryItems: PantryItem[] = [
  { id: "1", name: "Eggs", quantity: 6, unit: "pieces", category: "Dairy & Eggs", addedDate: new Date() },
  { id: "2", name: "Milk", quantity: 1, unit: "liter", category: "Dairy & Eggs", addedDate: new Date() },
  { id: "3", name: "Chicken Breast", quantity: 500, unit: "grams", category: "Meat & Seafood", addedDate: new Date() },
  { id: "4", name: "Potatoes", quantity: 2, unit: "kg", category: "Vegetables", addedDate: new Date() },
  { id: "5", name: "Rice", quantity: 1.5, unit: "kg", category: "Grains & Pasta", addedDate: new Date() },
  { id: "6", name: "Olive Oil", quantity: 500, unit: "ml", category: "Oils & Condiments", addedDate: new Date() },
  { id: "7", name: "Garlic", quantity: 5, unit: "pieces", category: "Vegetables", addedDate: new Date() },
  { id: "8", name: "Onions", quantity: 3, unit: "pieces", category: "Vegetables", addedDate: new Date() },
  { id: "9", name: "Tomatoes", quantity: 4, unit: "pieces", category: "Vegetables", addedDate: new Date() },
  { id: "10", name: "Ground Beef", quantity: 500, unit: "grams", category: "Meat & Seafood", addedDate: new Date() }
];

export function useHomeFilters() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [pantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [isPantryDialogOpen, setIsPantryDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState<Record<string, boolean>>({
    cuisine: false,
    dietary: false,
    difficulty: false,
    mealType: false
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    cuisine: null as CuisineFilter | null,
    dietary: [] as DietaryFilter[],
    difficulty: null as DifficultyFilter | null,
    mealType: null as MealTypeFilter | null
  });
  
  const navigate = useNavigate();
  
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );

  const handleSelectSubcategory = (id: string) => {
    setSelectedSubcategory(id);
  };
  
  // Toggle filter dropdown
  const toggleFilter = (filterName: string) => {
    setIsFilterOpen(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };
  
  // Handle filter selection
  const handleFilterSelect = (type: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    
    // Auto close the dropdown after selection
    setIsFilterOpen(prev => ({
      ...prev,
      [type]: false
    }));
  };

  // Toggle dietary filter since it's multi-select
  const toggleDietaryFilter = (filter: DietaryFilter) => {
    setFilters(prev => {
      const dietary = prev.dietary.includes(filter) 
        ? prev.dietary.filter(f => f !== filter)
        : [...prev.dietary, filter];
      
      return {
        ...prev,
        dietary
      };
    });
  };
  
  const findRecipes = () => {
    // Build query params for filtering
    const params = new URLSearchParams();
    
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedSubcategory) params.append('subcategory', selectedSubcategory);
    if (filters.cuisine) params.append('cuisine', filters.cuisine);
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.mealType) params.append('mealType', filters.mealType);
    if (filters.dietary.length > 0) params.append('dietary', filters.dietary.join(','));
    if (selectedIngredients.length > 0) params.append('ingredients', selectedIngredients.join(','));
    
    navigate(`/browse?${params.toString()}`);
  };

  return {
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
  };
}
