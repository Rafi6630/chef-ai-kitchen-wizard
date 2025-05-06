
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { Search, Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PantryItem } from "@/types";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockPantryItems: PantryItem[] = [
  {
    id: "1",
    name: "Chicken Breast",
    quantity: 500,
    unit: "g",
    category: "Protein",
    expirationDate: new Date(2025, 4, 15),
    addedDate: new Date(2025, 4, 1)
  },
  {
    id: "2",
    name: "Rice",
    quantity: 2,
    unit: "kg",
    category: "Grains",
    addedDate: new Date(2025, 3, 10)
  },
  {
    id: "3",
    name: "Olive Oil",
    quantity: 750,
    unit: "ml",
    category: "Oils",
    addedDate: new Date(2025, 2, 20)
  },
  {
    id: "4",
    name: "Tomatoes",
    quantity: 6,
    unit: "pc",
    category: "Vegetables",
    expirationDate: new Date(2025, 4, 10),
    addedDate: new Date(2025, 4, 3)
  },
  {
    id: "5",
    name: "Onions",
    quantity: 1,
    unit: "kg",
    category: "Vegetables",
    addedDate: new Date(2025, 4, 2)
  }
];

const categories = ["All", "Vegetables", "Fruits", "Protein", "Dairy", "Grains", "Oils", "Spices", "Other"];

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(mockPantryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();

  const filteredItems = pantryItems.filter(item => {
    // Filter by search term
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDeleteItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your pantry.",
    });
  };

  const handleEditItem = (id: string) => {
    // In a real app, this would open an edit modal
    toast({
      title: "Edit item",
      description: "Item editing functionality coming soon!",
    });
  };

  const handleAddItem = () => {
    // In a real app, this would open an add modal
    toast({
      title: "Add new item",
      description: "Item addition functionality coming soon!",
    });
  };

  const handleFindRecipes = () => {
    // Navigate to chatbot with pantry ingredients
    window.location.href = "/chatbot?use_pantry=true";
  };

  const formatDate = (date?: Date) => {
    if (!date) return "No expiration";
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const isExpiringSoon = (date?: Date) => {
    if (!date) return false;
    
    const today = new Date();
    const daysUntilExpiry = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
  };

  return (
    <AppLayout>
      <div className="p-6">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Smart Pantry</h1>
            <Button onClick={handleAddItem} size="sm" className="bg-chef-primary">
              <Plus size={16} className="mr-1" />
              Add Item
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search ingredients..." 
              className="pl-10 input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <Tabs defaultValue="All" className="mb-6">
          <TabsList className="mb-4 overflow-x-auto flex flex-nowrap pb-1" style={{ maxWidth: '100%' }}>
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            {filteredItems.length > 0 ? (
              <div className="space-y-3">
                {filteredItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="text-sm text-gray-600">
                        {item.quantity} {item.unit} · {item.category}
                      </div>
                      {item.expirationDate && (
                        <div className={`text-xs mt-1 ${isExpiringSoon(item.expirationDate) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          Expires: {formatDate(item.expirationDate)}
                          {isExpiringSoon(item.expirationDate) && " (Soon)"}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditItem(item.id)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No ingredients found in your pantry for this category.</p>
                <Button onClick={handleAddItem} variant="outline">
                  Add Your First Ingredient
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {filteredItems.length > 0 && (
          <div className="mt-6">
            <Button 
              onClick={handleFindRecipes} 
              className="w-full bg-chef-primary"
            >
              Find Recipes With These Ingredients
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
