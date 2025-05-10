
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ArrowRight } from "lucide-react";
import { PantryItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  pantryItems: PantryItem[];
  isPantryDialogOpen: boolean;
  setIsPantryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function IngredientSelector({
  selectedIngredients,
  setSelectedIngredients,
  pantryItems,
  isPantryDialogOpen,
  setIsPantryDialogOpen
}: IngredientSelectorProps) {
  const { toast } = useToast();
  
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };
  
  const handleAddPantryIngredients = (selected: string[]) => {
    setSelectedIngredients([...new Set([...selectedIngredients, ...selected])]);
    setIsPantryDialogOpen(false);
    
    toast({
      title: "Ingredients Added",
      description: `${selected.length} ingredients added from your pantry.`
    });
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold dark:text-white">Add Your Ingredients</h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <Dialog open={isPantryDialogOpen} onOpenChange={setIsPantryDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 mb-3">
              <Plus size={16} />
              <span>Select from Pantry</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Ingredients from Pantry</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Select ingredients from your pantry to use in recipes</p>
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                {/* Group by category */}
                {Object.entries(
                  pantryItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {} as Record<string, PantryItem[]>)
                ).map(([category, items]) => (
                  <div key={category} className="mb-3">
                    <h4 className="text-sm font-medium mb-1">{category}</h4>
                    <div className="space-y-1">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`pantry-${item.id}`} 
                            className="mr-2"
                            checked={selectedIngredients.includes(item.name)} 
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIngredients(prev => [...prev, item.name]);
                              } else {
                                setSelectedIngredients(prev => prev.filter(i => i !== item.name));
                              }
                            }}
                          />
                          <label htmlFor={`pantry-${item.id}`} className="text-sm flex-1">
                            {item.name} ({item.quantity} {item.unit})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={() => {
                    const selected = selectedIngredients.filter(ingredient => 
                      pantryItems.some(item => item.name === ingredient)
                    );
                    handleAddPantryIngredients(selected);
                  }}
                >
                  Add Selected Ingredients
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {selectedIngredients.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedIngredients.map((ingredient, index) => (
              <div key={index} className="bg-chef-primary/10 text-chef-primary px-3 py-1 rounded-full flex items-center">
                <span>{ingredient}</span>
                <button 
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-red-500"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-3">
            No ingredients selected yet
          </div>
        )}
        
        {/* Quick Add Popular Ingredients */}
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-2">Quick Add Popular Ingredients</h4>
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {["Chicken", "Rice", "Garlic", "Potato", "Tomato", "Beef", "Onion", "Carrots"].map(ingredient => (
              <Button
                key={ingredient}
                variant="outline"
                size="sm"
                className={`shrink-0 rounded-full ${
                  selectedIngredients.includes(ingredient) ? 'bg-chef-primary/20' : ''
                }`}
                onClick={() => {
                  if (!selectedIngredients.includes(ingredient)) {
                    setSelectedIngredients(prev => [...prev, ingredient])
                  }
                }}
              >
                {ingredient}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
