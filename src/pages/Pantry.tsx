
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PantryItem } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Sample pantry data
const initialPantryItems: PantryItem[] = [
  {
    id: "1",
    name: "Eggs",
    quantity: 6,
    unit: "pieces",
    category: "Dairy & Eggs",
    addedDate: new Date(),
    expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
  {
    id: "2",
    name: "Milk",
    quantity: 1,
    unit: "liter",
    category: "Dairy & Eggs",
    addedDate: new Date(),
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    id: "3",
    name: "Chicken Breast",
    quantity: 500,
    unit: "grams",
    category: "Meat & Seafood",
    addedDate: new Date(),
    expirationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    id: "4",
    name: "Potatoes",
    quantity: 2,
    unit: "kg",
    category: "Vegetables",
    addedDate: new Date(),
    expirationDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
  },
  {
    id: "5",
    name: "Rice",
    quantity: 1.5,
    unit: "kg",
    category: "Grains & Pasta",
    addedDate: new Date(),
  },
  {
    id: "6",
    name: "Olive Oil",
    quantity: 500,
    unit: "ml",
    category: "Oils & Condiments",
    addedDate: new Date(),
  }
];

// Array of categories for dropdown
const categories = [
  "Vegetables",
  "Fruits",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Grains & Pasta",
  "Canned Goods",
  "Baking",
  "Oils & Condiments",
  "Spices & Herbs",
  "Snacks",
  "Beverages",
  "Other"
];

// Array of common units for dropdown
const units = [
  "pieces",
  "grams",
  "kg",
  "ml",
  "liter",
  "tbsp",
  "tsp",
  "cup",
  "oz",
  "lb",
  "bunch"
];

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(initialPantryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<Omit<PantryItem, 'id' | 'addedDate'>>({
    name: "",
    quantity: 1,
    unit: "pieces",
    category: "Other"
  });
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();
  
  // Filter pantry items based on search term
  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PantryItem[]>);
  
  // Handle selecting items
  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };
  
  // Add new item
  const handleAddItem = () => {
    const newPantryItem: PantryItem = {
      id: Math.random().toString(36).substring(2, 9), // Generate random ID
      ...newItem,
      addedDate: new Date()
    };
    
    setPantryItems(prev => [...prev, newPantryItem]);
    setNewItem({
      name: "",
      quantity: 1,
      unit: "pieces",
      category: "Other"
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Item Added",
      description: `${newPantryItem.name} has been added to your pantry.`
    });
  };
  
  // Delete item
  const handleDeleteItem = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your pantry."
    });
  };
  
  // Edit item
  const handleEditItem = (id: string) => {
    const itemToEdit = pantryItems.find(item => item.id === id);
    if (!itemToEdit) return;
    
    setNewItem({
      name: itemToEdit.name,
      quantity: itemToEdit.quantity,
      unit: itemToEdit.unit,
      category: itemToEdit.category,
      expirationDate: itemToEdit.expirationDate
    });
    
    setIsEditingId(id);
    setIsDialogOpen(true);
  };
  
  // Save edited item
  const handleSaveEdit = () => {
    if (!isEditingId) return;
    
    setPantryItems(prev => prev.map(item => 
      item.id === isEditingId 
        ? { ...item, ...newItem }
        : item
    ));
    
    setIsEditingId(null);
    setIsDialogOpen(false);
    
    toast({
      title: "Item Updated",
      description: `${newItem.name} has been updated in your pantry.`
    });
  };
  
  // Find recipes with selected items
  const handleFindRecipes = () => {
    const selectedItemNames = pantryItems
      .filter(item => selectedItems.includes(item.id))
      .map(item => item.name);
    
    if (selectedItemNames.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one ingredient to find recipes.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Finding Recipes",
      description: `Searching for recipes with ${selectedItemNames.join(", ")}`
    });
    
    // Navigate to chatbot or recipe search page with selected items
    // In a real app, you'd use router navigation with the selected items
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2">Smart Pantry</h1>
        <p className="text-gray-600 text-sm">Track and manage your ingredients</p>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search ingredients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-chef-primary">
                <Plus size={18} className="mr-1" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditingId ? "Edit Item" : "Add New Item"}</DialogTitle>
              </DialogHeader>
              <form 
                className="space-y-4 mt-2" 
                onSubmit={(e) => {
                  e.preventDefault();
                  isEditingId ? handleSaveEdit() : handleAddItem();
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input 
                    id="name" 
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="e.g., Tomatoes"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select 
                      id="unit" 
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      required
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration Date (optional)</Label>
                  <Input 
                    id="expiration" 
                    type="date"
                    value={newItem.expirationDate ? new Date(newItem.expirationDate).toISOString().split('T')[0] : ""}
                    onChange={(e) => setNewItem({
                      ...newItem, 
                      expirationDate: e.target.value ? new Date(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditingId ? "Save Changes" : "Add Item"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {selectedItems.length > 0 && (
          <div className="bg-chef-primary/10 rounded-lg p-4 mb-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{selectedItems.length} item(s) selected</p>
              <p className="text-xs text-gray-600">Find recipes with these ingredients</p>
            </div>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedItems([])}
              >
                Clear
              </Button>
              <Button 
                className="bg-chef-primary"
                size="sm"
                onClick={handleFindRecipes}
              >
                Find Recipes
              </Button>
            </div>
          </div>
        )}
        
        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 mb-4">No items found in your pantry</p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-chef-primary"
            >
              <Plus size={18} className="mr-1" />
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                  <h3 className="font-medium">{category}</h3>
                </div>
                
                <ul className="divide-y divide-gray-100">
                  {items.map(item => (
                    <li key={item.id} className="flex items-center p-4">
                      <div className="flex items-center mr-3">
                        <input 
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                          className="w-5 h-5 text-chef-primary border-gray-300 rounded"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center">
                          <p className="text-sm text-gray-600">
                            {item.quantity} {item.unit}
                          </p>
                          {item.expirationDate && (
                            <p className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                              new Date(item.expirationDate) < new Date() 
                                ? 'bg-red-100 text-red-800' 
                                : new Date(item.expirationDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {new Date(item.expirationDate) < new Date() 
                                ? 'Expired' 
                                : `Expires ${new Date(item.expirationDate).toLocaleDateString()}`}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditItem(item.id)}
                          className="h-8 w-8"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </AppLayout>
  );
}
