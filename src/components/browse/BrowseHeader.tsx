
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X, ChefHat } from "lucide-react";
import { Category } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import QuickIngredientSelector from "@/components/recipe/QuickIngredientSelector";
import { useToast } from "@/hooks/use-toast";

interface BrowseHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  setSelectedSubcategory: (subcategory: string | null) => void;
}

export function BrowseHeader({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  setSelectedSubcategory
}: BrowseHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { toast } = useToast();

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleAddIngredients = (ingredients: string[]) => {
    toast({
      title: "Ingredients Added",
      description: `Added ${ingredients.length} ingredients to your search`,
    });
    // Here you would normally update your search with these ingredients
  };

  return (
    <header className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h1 className="text-2xl font-bold">Global Cuisine</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="outline" className="flex gap-1 items-center">
              <ChefHat size={16} className="text-chef-primary" />
              <span className="text-xs">Ingredients</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] pt-6 rounded-t-xl">
            <SheetHeader>
              <SheetTitle>Add Ingredients</SheetTitle>
              <SheetDescription>
                Select ingredients to find matching recipes
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <QuickIngredientSelector onAddIngredients={handleAddIngredients} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Browse recipes from around the world</p>
      
      <div className="flex items-center space-x-2 mb-4 relative">
        <div className={`relative flex-1 transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-chef-primary ring-opacity-50 rounded-lg' : ''}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search recipes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-8 border-2 hover:border-chef-primary/30 focus:border-chef-primary/60"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-lg p-2 aspect-square">
              <Filter size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
              <SheetDescription>
                Refine your recipe search
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'].map((diet) => (
                  <Button 
                    key={diet}
                    variant="outline" 
                    size="sm"
                    className="justify-start text-left"
                  >
                    {diet}
                  </Button>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-2">Difficulty Level</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <Button 
                    key={level}
                    variant="outline" 
                    size="sm"
                  >
                    {level}
                  </Button>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-2">Cooking Time</h3>
              <div className="grid grid-cols-3 gap-2">
                {['< 30 min', '30-60 min', '> 60 min'].map((time) => (
                  <Button 
                    key={time}
                    variant="outline" 
                    size="sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 mt-8">
              <Button variant="outline" className="flex-1">Reset</Button>
              <Button className="flex-1 bg-chef-primary">Apply</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Category tabs */}
      <Tabs 
        defaultValue="food" 
        value={selectedCategory}
        onValueChange={(value) => {
          setSelectedCategory(value as Category);
          setSelectedSubcategory(null); // Reset subcategory when changing main category
        }}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 shadow-sm rounded-lg h-12">
          <TabsTrigger 
            value="food"
            className="data-[state=active]:bg-chef-primary data-[state=active]:text-white"
          >
            Food
          </TabsTrigger>
          <TabsTrigger 
            value="desserts"
            className="data-[state=active]:bg-chef-primary data-[state=active]:text-white"
          >
            Desserts
          </TabsTrigger>
          <TabsTrigger 
            value="drinks"
            className="data-[state=active]:bg-chef-primary data-[state=active]:text-white"
          >
            Drinks
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}
