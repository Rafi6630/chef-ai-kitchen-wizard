
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowRight, Search, X, List, CheckCircle } from "lucide-react";
import { PantryItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [quickAddVisible, setQuickAddVisible] = useState(true);
  
  // Filter pantry items based on search
  const filteredPantryItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group pantry items by category
  const groupedPantryItems = filteredPantryItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PantryItem[]>);
  
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
        description: `${formattedIngredient} has been added to your list.`,
        duration: 2000,
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
    
    toast({
      title: "Ingredient Removed",
      description: `${ingredient} has been removed from your list.`,
      variant: "destructive",
      duration: 2000,
    });
  };
  
  // Toggle ingredient selection from pantry
  const togglePantryIngredient = (item: PantryItem) => {
    const formattedIngredient = `${item.name} (${item.quantity} ${item.unit})`;
    
    if (selectedIngredients.includes(formattedIngredient)) {
      setSelectedIngredients(prev => prev.filter(ing => ing !== formattedIngredient));
    } else {
      setSelectedIngredients(prev => [...prev, formattedIngredient]);
      
      toast({
        title: "Ingredient Added",
        description: `${item.name} has been added from your pantry.`,
        duration: 2000,
      });
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newIngredient) {
      e.preventDefault();
      addIngredient();
    }
  };
  
  // Animation utilities
  const getIngredientAnimation = (index: number) => {
    return {
      animation: `fade-in 0.3s ease-out ${index * 0.05}s both`
    };
  };
  
  return (
    <div className="mb-6 animate-scale-in">
      <h2 className="text-lg font-semibold mb-2 dark:text-white flex items-center">
        <span className="bg-chef-primary text-white p-1 rounded-md mr-2 flex items-center justify-center">
          <List size={18} />
        </span>
        Add Your Ingredients
      </h2>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <TabsTrigger value="manual" className="text-sm py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-md">
              <Plus size={16} className="mr-2" />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="pantry" className="text-sm py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-md">
              <List size={16} className="mr-2" />
              My Pantry
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-2">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Add ingredient..."
                      value={newIngredient}
                      onChange={(e) => handleIngredientInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full pr-10 border-2 hover:border-chef-primary/50 focus:border-chef-primary"
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
                    <div className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-md mt-1 border-2 border-gray-200 dark:border-gray-700 w-full max-w-md">
                      <ul className="max-h-48 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm flex items-center"
                            onClick={() => selectSuggestion(suggestion)}
                          >
                            <Plus size={14} className="mr-2 text-chef-primary" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="w-full sm:w-20">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                    className="w-full border-2 hover:border-chef-primary/50 focus:border-chef-primary"
                  />
                </div>
                
                <div className="w-full sm:w-24">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="input-field w-full h-10 text-sm border-2 hover:border-chef-primary/50 focus:border-chef-primary rounded-md"
                  >
                    {units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={addIngredient} 
                disabled={!newIngredient} 
                className="bg-chef-primary hover:bg-chef-primary/90 transition-all duration-300 hover:scale-[1.02] py-6 flex items-center justify-center"
              >
                <Plus size={18} className="mr-2" />
                Add Ingredient
              </Button>
            </div>
            
            {/* Quick Add Popular Ingredients */}
            <Accordion 
              type="single" 
              collapsible 
              value={quickAddVisible ? "quick-add" : ""} 
              onValueChange={(val) => setQuickAddVisible(val === "quick-add")}
              className="border rounded-lg border-gray-200 dark:border-gray-700"
            >
              <AccordionItem value="quick-add">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <span className="flex items-center">
                    <ArrowRight size={16} className="mr-2 text-chef-primary" />
                    Quick Add Common Ingredients
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {commonIngredients.slice(0, isMobile ? 10 : 16).map((ingredient, idx) => (
                      <Button
                        key={ingredient}
                        variant="outline"
                        size="sm"
                        className={`shrink-0 rounded-full text-xs flex items-center ${
                          selectedIngredients.some(item => item.startsWith(ingredient)) 
                            ? 'bg-chef-primary text-white hover:bg-chef-primary/80' 
                            : 'hover:bg-chef-primary/10'
                        }`}
                        onClick={() => {
                          const formattedIngredient = `${ingredient} (${quantity} ${unit})`;
                          if (!selectedIngredients.includes(formattedIngredient)) {
                            setSelectedIngredients(prev => [...prev, formattedIngredient]);
                            
                            toast({
                              title: "Ingredient Added",
                              description: `${ingredient} has been added to your list.`,
                              duration: 2000,
                            });
                          }
                        }}
                        style={{
                          animation: `fade-in 0.3s ease-out ${idx * 0.05}s both`,
                          transitionDelay: `${idx * 50}ms`
                        }}
                      >
                        <Plus size={14} className="mr-1" />
                        {ingredient}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          
          <TabsContent value="pantry">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search your pantry..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 hover:border-chef-primary/50 focus:border-chef-primary"
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {Object.keys(groupedPantryItems).length > 0 ? (
                  <Accordion type="multiple" className="w-full">
                    {Object.entries(groupedPantryItems).map(([category, items]) => (
                      <AccordionItem key={category} value={category} className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="py-2 px-1 text-sm font-medium">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-chef-primary rounded-full mr-2"></span>
                            {category} ({items.length})
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pl-4">
                            {items.map((item, idx) => {
                              const formattedIngredient = `${item.name} (${item.quantity} ${item.unit})`;
                              const isSelected = selectedIngredients.includes(formattedIngredient);
                              
                              return (
                                <div 
                                  key={item.id} 
                                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 ${
                                    isSelected 
                                      ? 'bg-chef-primary/10 border border-chef-primary/30' 
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                                  }`}
                                  onClick={() => togglePantryIngredient(item)}
                                  style={getIngredientAnimation(idx)}
                                >
                                  <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                                      isSelected ? 'bg-chef-primary text-white' : 'border border-gray-300'
                                    }`}>
                                      {isSelected && <CheckCircle size={14} />}
                                    </div>
                                    <span className="text-sm">{item.name}</span>
                                  </div>
                                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                    {item.quantity} {item.unit}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-6 text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Search size={24} className="mx-auto mb-2 opacity-50" />
                    {searchTerm ? "No matching items found" : "Your pantry is empty"}
                    <p className="text-xs mt-1 text-gray-400">Try adding some ingredients</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Selected Ingredients */}
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <span className="bg-chef-primary/20 text-chef-primary p-1 rounded-full flex items-center justify-center mr-2">
              <CheckCircle size={14} />
            </span>
            Selected Ingredients ({selectedIngredients.length})
          </h4>
          
          {selectedIngredients.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3 max-h-32 overflow-y-auto custom-scrollbar">
              {selectedIngredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className="ingredient-tag animate-gentle-pulse"
                  style={getIngredientAnimation(index)}
                >
                  <span className="truncate max-w-32">{ingredient}</span>
                  <button 
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 text-chef-primary hover:text-red-500 flex-shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mb-3 py-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <List size={24} className="mx-auto mb-2 opacity-50" />
              No ingredients selected yet
              <p className="text-xs mt-1 text-gray-400">Add ingredients to find matching recipes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
