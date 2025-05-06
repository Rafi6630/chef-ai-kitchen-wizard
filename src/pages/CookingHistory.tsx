
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CookingHistoryItem } from "@/types";

// Mock cooking history data
const mockHistory: CookingHistoryItem[] = [
  {
    id: "1",
    recipeId: "pasta-primavera",
    recipeTitle: "Pasta Primavera",
    recipeImage: "https://source.unsplash.com/featured/?pasta",
    date: new Date(2025, 4, 5),
    notes: "Added extra garlic. Family loved it!"
  },
  {
    id: "2",
    recipeId: "chocolate-lava-cake",
    recipeTitle: "Chocolate Lava Cake",
    recipeImage: "https://source.unsplash.com/featured/?chocolate,cake",
    date: new Date(2025, 4, 3)
  },
  {
    id: "3",
    recipeId: "strawberry-mojito",
    recipeTitle: "Strawberry Mojito",
    recipeImage: "https://source.unsplash.com/featured/?mojito",
    date: new Date(2025, 4, 1),
    notes: "Used brown sugar instead of white."
  },
  {
    id: "4",
    recipeId: "chicken-curry",
    recipeTitle: "Chicken Curry",
    recipeImage: "https://source.unsplash.com/featured/?curry",
    date: new Date(2025, 3, 28),
    notes: "Reduced the spice level."
  }
];

export default function CookingHistory() {
  const [history, setHistory] = useState<CookingHistoryItem[]>(mockHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredHistory = history.filter(item => 
    item.recipeTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
    toast({
      title: "Entry removed",
      description: "The history entry has been removed.",
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center mb-3">
          <Link to="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Cooking History</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 input-field"
          />
        </div>
      </header>
      
      <main className="p-6">
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map(item => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.recipeImage} 
                      alt={item.recipeTitle} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/recipe/${item.recipeId}`}>
                          <h3 className="font-semibold text-base">{item.recipeTitle}</h3>
                        </Link>
                        <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 text-gray-400"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                    {item.notes && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {item.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-3">No cooking history found.</p>
              <Link to="/browse">
                <Button variant="outline">Find Recipes to Cook</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
}
