
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Search, X, List } from "lucide-react";
import { PantryItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  pantryItems: PantryItem[];
  isPantryDialogOpen: boolean;
  setIsPantryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Common ingredients for quick selection
const commonIngredients = [
  "Chicken", "Rice", "Garlic", "Potato", "Tomato", "Beef", "Onion", "Carrots",
  "Eggs", "Milk", "Flour", "Butter", "Cheese", "Olive Oil", "Salt", "Pepper"
];

// Units for ingredient measurements
const units = ["pieces", "grams", "kg", "ml", "liter", "tbsp", "tsp", "cup", "oz"];

export function IngredientSelector({
  selectedIngredients,
  setSelectedIngredients,
  pantryItems,
  isPantryDialogOpen,
  setIsPantryDialogOpen
}: IngredientSelectorProps) {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [activeTab, setActiveTab] = useState("manual");
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState<string>("pieces");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Filter pantry items based on search
  const filteredPantryItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Generate ingredient suggestions
  const handleIngredientInput = (input: string) => {
    setNewIngredient(input);
    
    if (input.length > 1) {
      const matches = commonIngredients.filter(ingredient => 
        ingredient.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };
  
  // Add new ingredient manually
  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    
    const formattedIngredient = `${newIngredient} (${quantity} ${unit})`;
    
    if (!selectedIngredients.includes(formattedIngredient)) {
      setSelectedIngredients(prev => [...prev, formattedIngredient]);
      setNewIngredient("");
      setQuantity(1);
      setSuggestions([]);
      
      toast({
        title: "Ingredient Added",
        description: `${formattedIngredient} has been added to your list.`
      });
    }
  };
  
  // Select suggestion
  const selectSuggestion = (suggestion: string) => {
    setNewIngredient(suggestion);
    setSuggestions([]);
  };
  
  // Remove ingredient from list
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };
  
  // Add items from pantry
  const handleAddPantryIngredients = (selected: string[]) => {
    const formattedIngredients = selected.map(name => {
      const pantryItem = pantryItems.find(item => item.name === name);
      return pantryItem ? `${name} (${pantryItem.quantity} ${pantryItem.unit})` : name;
    });
    
    setSelectedIngredients(prev => [...new Set([...prev, ...formattedIngredients])]);
    setIsPantryDialogOpen(false);
    
    toast({
      title: "Ingredients Added",
      description: `${selected.length} ingredients added from your pantry.`
    });
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 dark:text-white">Add Your Ingredients</h2>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="manual" className="text-sm">Manual Entry</TabsTrigger>
            <TabsTrigger value="pantry" className="text-sm">
              <List size={14} className="mr-1" />
              My Pantry
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Add ingredient..."
                      value={newIngredient}
                      onChange={(e) => handleIngredientInput(e.target.value)}
                      className="w-full pr-10"
                    />
                    {newIngredient && (
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setNewIngredient("")}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  
                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1 border border-gray-200 dark:border-gray-700 w-full max-w-md">
                      <ul>
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                            onClick={() => selectSuggestion(suggestion)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="w-20">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="w-24">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="input-field w-full h-10 text-sm"
                  >
                    {units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Button onClick={addIngredient} disabled={!newIngredient} className="bg-chef-primary hover:bg-chef-primary/90">
                <Plus size={16} className="mr-1" />
                Add Ingredient
              </Button>
            </div>
            
            {/* Quick Add Popular Ingredients */}
            <div>
              <h4 className="text-sm font-medium mb-2">Quick Add Popular Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.slice(0, isMobile ? 8 : 12).map(ingredient => (
                  <Button
                    key={ingredient}
                    variant="outline"
                    size="sm"
                    className={`shrink-0 rounded-full text-xs ${
                      selectedIngredients.some(item => item.startsWith(ingredient)) ? 'bg-chef-primary/20' : ''
                    }`}
                    onClick={() => {
                      const formattedIngredient = `${ingredient} (${quantity} ${unit})`;
                      if (!selectedIngredients.includes(formattedIngredient)) {
                        setSelectedIngredients(prev => [...prev, formattedIngredient]);
                      }
                    }}
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pantry">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search your pantry..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto pr-1">
                {/* Group by category */}
                {Object.entries(
                  filteredPantryItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {} as Record<string, PantryItem[]>)
                ).map(([category, items]) => (
                  <div key={category} className="mb-3">
                    <h4 className="text-sm font-medium mb-1">{category}</h4>
                    <div className="space-y-1">
                      {items.map(item => {
                        const formattedIngredient = `${item.name} (${item.quantity} ${item.unit})`;
                        const isSelected = selectedIngredients.includes(formattedIngredient);
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                              isSelected ? 'bg-chef-primary/10 border border-chef-primary/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                removeIngredient(formattedIngredient);
                              } else {
                                setSelectedIngredients(prev => [...prev, formattedIngredient]);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={isSelected}
                                onChange={() => {}}
                                className="mr-2"
                              />
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {filteredPantryItems.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No pantry items found
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Selected Ingredients */}
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-medium mb-2">Selected Ingredients ({selectedIngredients.length})</h4>
          
          {selectedIngredients.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3 max-h-32 overflow-y-auto">
              {selectedIngredients.map((ingredient, index) => (
                <div key={index} className="ingredient-tag">
                  <span className="truncate max-w-32">{ingredient}</span>
                  <button 
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-1 hover:text-red-500 flex-shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mb-3 py-4">
              No ingredients selected yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
