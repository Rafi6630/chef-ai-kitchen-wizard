
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { recipes } from "@/data/mockData";

// Filter only favorite recipes
const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);

export default function SavedRecipes() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredRecipes = favoriteRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center mb-3">
          <Link to="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Saved Recipes</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search saved recipes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          <Link to="/filters">
            <Button variant="outline" className="rounded-lg p-2">
              <Filter size={20} />
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="p-6">
        <div className="space-y-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="block">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="relative aspect-video">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                    {recipe.isPremiumOnly && (
                      <div className="absolute top-2 right-2 bg-chef-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{recipe.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{recipe.description}</p>
                    <div className="flex items-center text-xs text-gray-500 justify-between">
                      <div className="flex gap-2">
                        <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
                        <span>|</span>
                        <span>👨‍🍳 {recipe.difficulty}</span>
                      </div>
                      <span className="text-xs font-medium">{recipe.cuisine}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-3">You haven't saved any recipes yet.</p>
              <Link to="/browse">
                <Button variant="outline">Browse Recipes</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
}
