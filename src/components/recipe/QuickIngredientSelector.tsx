
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Search, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Common pantry ingredients for quick selection, grouped by category
const COMMON_INGREDIENTS = {
  "Proteins": ["Chicken", "Beef", "Pork", "Eggs", "Tofu", "Salmon", "Shrimp", "Turkey"],
  "Dairy": ["Milk", "Cheese", "Butter", "Yogurt", "Cream", "Sour Cream"],
  "Vegetables": ["Garlic", "Onion", "Tomato", "Potato", "Carrot", "Bell Pepper", "Spinach", "Broccoli"],
  "Staples": ["Rice", "Pasta", "Flour", "Sugar", "Olive Oil", "Salt", "Pepper", "Bread"]
};

interface QuickIngredientSelectorProps {
  onAddIngredients: (ingredients: string[]) => void;
}

export default function QuickIngredientSelector({ onAddIngredients }: QuickIngredientSelectorProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filter ingredients based on search
  const filteredIngredients = searchTerm 
    ? Object.entries(COMMON_INGREDIENTS).reduce((acc, [category, items]) => {
        const filtered = items.filter(item => 
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {} as Record<string, string[]>)
    : COMMON_INGREDIENTS;

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
      
      toast({
        title: "Ingredient Added",
        description: `${ingredient} has been added to your selection.`,
        duration: 2000,
      });
    }
  };

  const addCustomIngredient = () => {
    if (!customIngredient.trim()) return;
    
    if (selectedIngredients.includes(customIngredient.trim())) {
      toast({
        title: "Ingredient already added",
        description: `${customIngredient.trim()} is already in your list.`
      });
      return;
    }
    
    setSelectedIngredients(prev => [...prev, customIngredient.trim()]);
    setCustomIngredient("");
    
    toast({
      title: "Custom Ingredient Added",
      description: `${customIngredient.trim()} has been added to your list.`,
      duration: 2000,
    });
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
    
    toast({
      title: "Ingredient Removed",
      description: `${ingredient} has been removed from your list.`,
      variant: "destructive",
      duration: 2000,
    });
  };

  const handleSubmit = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient."
      });
      return;
    }
    
    onAddIngredients(selectedIngredients);
    
    toast({
      title: "Finding Recipes",
      description: `Searching for recipes with ${selectedIngredients.length} ingredients.`,
      duration: 3000,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ChefHat size={24} className="mr-2 text-chef-primary" />
        Select Your Ingredients
      </h2>
      
      {/* Selected ingredients chips */}
      <div className="mb-4 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
          <span className="bg-chef-primary/20 text-chef-primary p-1 rounded-full flex items-center justify-center mr-2">
            <Plus size={14} />
          </span>
          Selected ingredients ({selectedIngredients.length}):
        </p>
        <div className="flex flex-wrap gap-2 min-h-[60px] max-h-32 overflow-y-auto custom-scrollbar p-1">
          {selectedIngredients.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 w-full text-center py-3">
              No ingredients selected yet
            </p>
          ) : (
            selectedIngredients.map((ingredient, idx) => (
              <div 
                key={ingredient} 
                className="ingredient-tag animate-gentle-pulse"
                style={{
                  animation: `fade-in 0.3s ease-out ${idx * 0.05}s both`
                }}
              >
                <span>{ingredient}</span>
                <button 
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Custom ingredient input */}
      <div className="flex mb-6 gap-2">
        <div className="flex-1 relative">
          <Input 
            placeholder="Add your own ingredient..." 
            value={customIngredient}
            onChange={(e) => setCustomIngredient(e.target.value)}
            className="w-full border-2 hover:border-chef-primary/50 focus:border-chef-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCustomIngredient();
              }
            }}
          />
          {customIngredient && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setCustomIngredient("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button 
          onClick={addCustomIngredient} 
          variant="outline"
          className="border-2 border-chef-primary/50 hover:bg-chef-primary hover:text-white transition-colors"
        >
          <Plus size={16} />
        </Button>
      </div>
      
      {/* Search ingredients */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input 
          placeholder="Search common ingredients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-2 hover:border-chef-primary/50 focus:border-chef-primary"
        />
      </div>
      
      {/* Common ingredients */}
      <div className="mb-6">
        <Accordion type="multiple" className="w-full">
          {Object.entries(filteredIngredients).map(([category, items]) => (
            <AccordionItem key={category} value={category} className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-chef-primary rounded-full mr-2"></span>
                  {category} ({items.length})
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-4">
                  {items.map((ingredient, idx) => (
                    <Button
                      key={ingredient}
                      variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                      className={`justify-start text-left ${
                        selectedIngredients.includes(ingredient) 
                          ? 'bg-chef-primary text-white' 
                          : 'hover:bg-chef-primary/10'
                      }`}
                      onClick={() => toggleIngredient(ingredient)}
                      size="sm"
                      style={{
                        animation: `fade-in 0.3s ease-out ${idx * 0.05}s both`
                      }}
                    >
                      {selectedIngredients.includes(ingredient) ? (
                        <X size={14} className="mr-1" />
                      ) : (
                        <Plus size={14} className="mr-1" />
                      )}
                      {ingredient}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Submit button */}
      <Button 
        onClick={handleSubmit} 
        className="w-full bg-gradient-to-r from-chef-primary to-chef-primary/80 hover:from-chef-primary/90 hover:to-chef-primary 
                 text-white py-6 rounded-xl shadow-md flex justify-center items-center gap-2 hover:shadow-lg transition-all duration-300"
        size="lg"
      >
        <Search size={18} className="mr-1" />
        Find Recipes with These Ingredients ({selectedIngredients.length})
      </Button>
    </div>
  );
}
