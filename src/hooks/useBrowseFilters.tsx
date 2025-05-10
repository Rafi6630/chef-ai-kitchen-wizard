
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Category, CuisineFilter, MealTypeFilter } from "@/types";
import { subcategories, recipes } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export function useBrowseFilters() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineFilter | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealTypeFilter>("any");
  const [searchTerm, setSearchTerm] = useState("");
  
  const location = useLocation();
  const { toast } = useToast();

  // Filter subcategories based on selected main category
  const filteredSubcategories = subcategories.filter(
    subcategory => subcategory.category === selectedCategory
  );
  
  // Get the selected subcategory info
  const selectedSubcategoryInfo = subcategories.find(
    subcategory => subcategory.id === selectedSubcategory
  );
  
  // Apply all filters to recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || recipe.subcategory === selectedSubcategory;
    const matchesCuisine = !selectedCuisine || recipe.cuisine.toLowerCase() === selectedCuisine;
    // Using 'any' as the default case
    const matchesMealType = !selectedMealType || selectedMealType === "any";
    const matchesSearch = !searchTerm || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesCuisine && matchesMealType && matchesSearch;
  });
  
  // Handle query params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Set filters from URL parameters
    const categoryParam = params.get('category');
    const subcategoryParam = params.get('subcategory');
    const cuisineParam = params.get('cuisine');
    const mealTypeParam = params.get('mealType');
    const searchParam = params.get('search');
    
    if (categoryParam && ['food', 'desserts', 'drinks'].includes(categoryParam)) {
      setSelectedCategory(categoryParam as Category);
    }
    
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam);
    }
    
    if (cuisineParam && cuisineParam !== 'all') {
      setSelectedCuisine(cuisineParam as CuisineFilter);
    }
    
    if (mealTypeParam && mealTypeParam !== 'any') {
      setSelectedMealType(mealTypeParam as MealTypeFilter);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  const handleSelectSubcategory = (subcategory: any) => {
    setSelectedSubcategory(subcategory.id);
  };
  
  const handleSelectCuisine = (cuisine: CuisineFilter) => {
    setSelectedCuisine(cuisine === selectedCuisine ? null : cuisine);
  };
  
  const handleSelectMealType = (mealType: MealTypeFilter) => {
    setSelectedMealType(mealType === selectedMealType ? "any" : mealType);
  };
  
  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Showing recipes matching your filters",
    });
  };
  
  const clearFilters = () => {
    setSelectedSubcategory(null);
    setSelectedCuisine(null);
    setSelectedMealType("any");
    setSearchTerm("");
    
    toast({
      title: "Filters Cleared",
      description: "Showing all recipes",
    });
  };

  return {
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
  };
}
