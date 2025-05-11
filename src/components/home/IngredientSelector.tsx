
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, X, Filter, ChevronDown, Database } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PantryItem } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
  pantryItems: PantryItem[];
  isPantryDialogOpen: boolean;
  setIsPantryDialogOpen: (open: boolean) => void;
}

export function IngredientSelector({
  selectedIngredients,
  setSelectedIngredients,
  pantryItems,
  isPantryDialogOpen,
  setIsPantryDialogOpen
}: IngredientSelectorProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const isMobile = useIsMobile();
  
  // Common ingredients for suggestions
  const commonIngredients = [
    "Chicken", "Beef", "Rice", "Pasta", "Tomatoes", "Onions", "Garlic",
    "Olive Oil", "Salt", "Pepper", "Eggs", "Milk", "Cheese", "Flour",
    "Sugar", "Potatoes", "Carrots", "Lettuce", "Lemon", "Butter"
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Filter suggestions based on input
    if (value.trim()) {
      const filtered = commonIngredients.filter(item => 
        item.toLowerCase().includes(value.toLowerCase()) && 
        !selectedIngredients.includes(item)
      );
      setSuggestions(filtered.slice(0, 5)); // Show at most 5 suggestions
    } else {
      setSuggestions([]);
    }
  };
  
  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setInputValue("");
      setSuggestions([]);
    }
  };
  
  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };
  
  const addFromPantry = (item: PantryItem) => {
    if (!selectedIngredients.includes(item.name)) {
      setSelectedIngredients([...selectedIngredients, item.name]);
    }
  };
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Filter size={isMobile ? 18 : 20} className="mr-2 text-chef-primary" />
          Add Ingredients
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Enter ingredients you want to use in your recipes
        </p>
        
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="manual" className="text-sm">Manual Entry</TabsTrigger>
            <TabsTrigger value="pantry" className="text-sm">From Pantry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <div className="relative mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Type an ingredient..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="pl-10 pr-3 py-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputValue) {
                        addIngredient(inputValue);
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={() => addIngredient(inputValue)}
                  className="bg-chef-primary"
                  disabled={!inputValue.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              {/* Autocomplete suggestions */}
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => addIngredient(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Add:</h3>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.slice(0, 8).map((ingredient) => (
                  <Button
                    key={ingredient}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => addIngredient(ingredient)}
                    disabled={selectedIngredients.includes(ingredient)}
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pantry">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Pantry Items:</h3>
                <Sheet open={isPantryDialogOpen} onOpenChange={setIsPantryDialogOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                      <Database size={12} />
                      Manage Pantry
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6">
                    <SheetHeader>
                      <SheetTitle>Your Smart Pantry</SheetTitle>
                      <SheetDescription>
                        Select ingredients from your pantry to use in recipes
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <div className="grid grid-cols-1 gap-2">
                        {pantryItems.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => {
                              addFromPantry(item);
                              setIsPantryDialogOpen(false);
                            }}
                          >
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.quantity} {item.unit}</p>
                            </div>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Plus size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pantryItems.slice(0, 6).map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    onClick={() => addFromPantry(item)}
                  >
                    <span>{item.name}</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      disabled={selectedIngredients.includes(item.name)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Selected ingredients */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Ingredients ({selectedIngredients.length}):</h3>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No ingredients selected</p>
            ) : (
              selectedIngredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="ingredient-tag flex items-center animate-gentle-pulse"
                >
                  <span>{ingredient}</span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-1 p-0.5 hover:bg-chef-primary/20 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
