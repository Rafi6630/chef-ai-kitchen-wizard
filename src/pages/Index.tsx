
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Select a Category</h2>
          <p className="text-gray-600 text-sm">
            Choose a specific category or use the AI chatbot for personalized recipes
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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
