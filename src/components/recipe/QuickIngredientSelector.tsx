
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Common pantry ingredients for quick selection
const COMMON_INGREDIENTS = [
  "Chicken", "Beef", "Pork", "Eggs", "Milk", 
  "Cheese", "Butter", "Garlic", "Onion", "Tomato", 
  "Potato", "Carrot", "Bell Pepper", "Rice", "Pasta",
  "Flour", "Sugar", "Olive Oil", "Salt", "Pepper"
];

interface QuickIngredientSelectorProps {
  onAddIngredients: (ingredients: string[]) => void;
}

export default function QuickIngredientSelector({ onAddIngredients }: QuickIngredientSelectorProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  const { toast } = useToast();

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
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
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => prev.filter(i => i !== ingredient));
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
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select Your Ingredients</h2>
      
      {/* Selected ingredients chips */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Selected ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No ingredients selected yet</p>
          ) : (
            selectedIngredients.map(ingredient => (
              <div key={ingredient} className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center">
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
        <Input 
          placeholder="Add your own ingredient..." 
          value={customIngredient}
          onChange={(e) => setCustomIngredient(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustomIngredient();
            }
          }}
        />
        <Button onClick={addCustomIngredient} variant="outline">
          <Plus size={16} />
        </Button>
      </div>
      
      {/* Common ingredients */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Common Ingredients</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COMMON_INGREDIENTS.map(ingredient => (
            <Button
              key={ingredient}
              variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
              className={selectedIngredients.includes(ingredient) ? "bg-chef-primary" : ""}
              onClick={() => toggleIngredient(ingredient)}
              size="sm"
            >
              {ingredient}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          className="bg-chef-primary"
        >
          Find Recipes with These Ingredients
        </Button>
      </div>
    </div>
  );
}
