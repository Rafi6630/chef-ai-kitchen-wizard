
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChefHat, Clock, Star, Globe, Utensils } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import CategoryCard from "@/components/ui/CategoryCard";
import { subcategories } from "@/data/mockData";
import { Category } from "@/types";
import { Link } from "react-router-dom";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );
  
  return (
    <AppLayout>
      <header className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-chef-dark">Chef AI</h1>
            <p className="text-gray-500">What would you like to cook today?</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="rounded-full w-10 h-10 p-0">
              <Search size={18} />
            </Button>
            <Link to="/filters">
              <Button variant="outline" className="rounded-full w-10 h-10 p-0">
                <Filter size={18} />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Category tabs */}
        <Tabs 
          defaultValue="food" 
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as Category)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="food" className="font-medium">Food</TabsTrigger>
            <TabsTrigger value="desserts" className="font-medium">Desserts</TabsTrigger>
            <TabsTrigger value="drinks" className="font-medium">Drinks</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      
      <main className="px-6">
        {/* Quick access buttons */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <Link to="/saved-recipes" className="flex-shrink-0">
            <Button variant="outline" size="sm" className="border-gray-200 rounded-full flex items-center gap-1">
              <Star size={15} />
              <span>Saved Recipes</span>
            </Button>
          </Link>
          <Link to="/cooking-history" className="flex-shrink-0">
            <Button variant="outline" size="sm" className="border-gray-200 rounded-full flex items-center gap-1">
              <Clock size={15} />
              <span>History</span>
            </Button>
          </Link>
          <Link to="/browse" className="flex-shrink-0">
            <Button variant="outline" size="sm" className="border-gray-200 rounded-full flex items-center gap-1">
              <Globe size={15} />
              <span>Global Cuisine</span>
            </Button>
          </Link>
        </div>
        
        {/* Find recipes with pantry ingredients */}
        <div className="mb-6 bg-gradient-to-r from-chef-primary/10 to-chef-secondary/10 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-chef-primary text-white p-2 rounded-full">
              <Utensils size={20} />
            </div>
            <h2 className="text-lg font-semibold">Cook With What You Have</h2>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Select ingredients from your pantry and find recipes you can make right now.
          </p>
          <Link to="/pantry">
            <Button className="w-full bg-chef-primary">
              Find Recipes With Your Ingredients
            </Button>
          </Link>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Select a Category</h2>
          <p className="text-gray-600 text-sm">
            Choose a specific category or use the AI chatbot for personalized recipes
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {filteredSubcategories.map((subcategory) => (
            <CategoryCard key={subcategory.id} subcategory={subcategory} />
          ))}
        </div>
        
        <div className="mt-8 mb-10 text-center">
          <h3 className="text-lg font-semibold mb-2">Need personalized suggestions?</h3>
          <p className="text-gray-600 mb-4">
            Tell our AI what ingredients you have and get recipe recommendations
          </p>
          <Link to={`/chatbot?category=${selectedCategory}`}>
            <Button className="btn-primary">
              Use AI Chatbot
            </Button>
          </Link>
        </div>
      </main>
    </AppLayout>
  );
}
