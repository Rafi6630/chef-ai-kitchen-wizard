
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, Check, Share2, Download, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import PremiumFeatureOverlay from "@/components/subscription/PremiumFeatureOverlay";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  isChecked: boolean;
  category: string;
}

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: "1", name: "Eggs", quantity: "12", unit: "", isChecked: false, category: "Dairy" },
    { id: "2", name: "Milk", quantity: "1", unit: "gallon", isChecked: false, category: "Dairy" },
    { id: "3", name: "Chicken Breast", quantity: "2", unit: "lbs", isChecked: false, category: "Meat" },
    { id: "4", name: "Onion", quantity: "3", unit: "", isChecked: false, category: "Produce" },
    { id: "5", name: "Garlic", quantity: "1", unit: "bulb", isChecked: false, category: "Produce" },
    { id: "6", name: "Olive Oil", quantity: "1", unit: "bottle", isChecked: false, category: "Pantry" },
    { id: "7", name: "Rice", quantity: "2", unit: "lbs", isChecked: false, category: "Pantry" },
  ]);
  
  const [isPremium] = useState(false); // In real app, this would come from user auth/subscription state
  const { toast } = useToast();
  const [newItem, setNewItem] = useState({ name: "", quantity: "1", unit: "", category: "Other" });
  const [showAddForm, setShowAddForm] = useState(false);
  
  const toggleItem = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  
  const clearCheckedItems = () => {
    setItems(items.filter(item => !item.isChecked));
    toast({
      title: "Items Removed",
      description: "Checked items have been removed from your shopping list."
    });
  };
  
  const shareList = () => {
    toast({
      title: "Share Feature",
      description: "Sharing feature coming soon!"
    });
  };
  
  const downloadList = () => {
    toast({
      title: "Download Feature",
      description: "Download feature coming soon!"
    });
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name.",
        variant: "destructive"
      });
      return;
    }
    
    const newItemObj: ShoppingItem = {
      id: `${Date.now()}`,
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      isChecked: false,
      category: newItem.category
    };
    
    setItems([...items, newItemObj]);
    setNewItem({ name: "", quantity: "1", unit: "", category: "Other" });
    setShowAddForm(false);
    
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to your shopping list.`
    });
  };
  
  // Group items by category
  const groupedItems: Record<string, ShoppingItem[]> = {};
  items.forEach(item => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/meal-planning" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Shopping List</h1>
        </div>
        <p className="text-gray-600 text-sm">Items to buy for your planned meals</p>
      </header>

      <main className="p-6 relative">
        {!isPremium && <PremiumFeatureOverlay feature="shopping list" />}
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">{items.length} items in your list</span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={14} className="mr-1" />
              Add Item
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCheckedItems} 
              disabled={!items.some(item => item.isChecked)}
            >
              <Trash2 size={14} className="mr-1" />
              Remove Checked
            </Button>
          </div>
        </div>
        
        {showAddForm && (
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
            <h3 className="font-semibold mb-3">Add New Item</h3>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-5">
                <Input 
                  placeholder="Item name" 
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Input 
                  placeholder="Qty" 
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                />
              </div>
              <div className="col-span-3">
                <Input 
                  placeholder="Unit (optional)" 
                  value={newItem.unit}
                  onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button onClick={handleAddItem}>Add</Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold mb-2">{category}</h2>
              <ul className="space-y-2">
                {categoryItems.map(item => (
                  <li 
                    key={item.id} 
                    className={`flex items-center p-3 border rounded-lg ${
                      item.isChecked ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
                      item.isChecked ? 'bg-chef-primary border-chef-primary' : 'border-gray-300'
                    }`}>
                      {item.isChecked && <Check size={14} className="text-white" />}
                    </div>
                    <span className="flex-1">
                      <span className={item.isChecked ? 'line-through text-gray-500' : ''}>
                        {item.name}
                      </span>
                    </span>
                    <span className="text-gray-600">
                      {item.quantity} {item.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={shareList} className="flex-1">
            <Share2 size={18} className="mr-2" />
            Share List
          </Button>
          <Button variant="outline" onClick={downloadList} className="flex-1">
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </main>
    </AppLayout>
  );
}
