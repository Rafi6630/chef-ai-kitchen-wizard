
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChefHat, Clock, Star, Globe, Utensils } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import CategoryCard from "@/components/ui/CategoryCard";
import { subcategories } from "@/data/mockData";
import { Category } from "@/types";
import { Link } from "react-router-dom";
import { usePremium } from "@/contexts/PremiumContext";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("food");
  const [step, setStep] = useState<"category" | "subcategory" | "filters">("category");
  const { isPremium } = usePremium();
  
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.category === selectedCategory
  );

  // Reset the step to subcategory when category changes
  useEffect(() => {
    setStep("subcategory");
  }, [selectedCategory]);
  
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
        {/* Step 2: Select a Subcategory */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Select a Subcategory</h2>
          <p className="text-gray-600 text-sm">
            Choose a specific category or use the AI chatbot for personalized recipes
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          {filteredSubcategories.map((subcategory) => (
            <CategoryCard key={subcategory.id} subcategory={subcategory} />
          ))}
        </div>
        
        {/* Quick Filter Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Quick Filters</h2>
            <Link to="/filters">
              <Button variant="ghost" size="sm" className="text-chef-primary">
                All Filters
              </Button>
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
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

        {/* Add Your Recipe - New Button */}
        <div className="mb-6 bg-gradient-to-r from-accent/10 to-chef-primary/10 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent text-white p-2 rounded-full">
              <ChefHat size={20} />
            </div>
            <h2 className="text-lg font-semibold">Share Your Culinary Creation</h2>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Have a recipe you love? Share it with the Chef AI community!
          </p>
          <Link to="/add-recipe">
            <Button className="w-full bg-accent text-accent-foreground">
              Add Your Recipe
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 mb-10 text-center">
          <h3 className="text-lg font-semibold mb-2">Need personalized suggestions?</h3>
          <p className="text-gray-600 mb-4">
            Tell our AI what ingredients you have and get recipe recommendations
          </p>
          <Link to={`/chatbot?category=${selectedCategory}`}>
            <Button className="btn-primary">
              Use AI Chatbot {!isPremium && "(Basic)"}
            </Button>
          </Link>
          {!isPremium && (
            <div className="mt-2">
              <Link to="/subscription">
                <Button variant="outline" size="sm" className="text-xs">
                  Upgrade for AI Voice & Image Recognition
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
}
