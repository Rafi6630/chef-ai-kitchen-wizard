
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { Category } from "@/types";

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
  return (
    <header className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <h1 className="text-2xl font-bold mb-1">Global Cuisine</h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Browse recipes from around the world</p>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search recipes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="rounded-lg p-2">
          <Filter size={20} />
        </Button>
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
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}
