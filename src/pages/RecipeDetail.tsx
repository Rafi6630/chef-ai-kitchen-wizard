
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Heart, Clock, ChefHat, Share2, User, Bookmark } from "lucide-react";
import { recipes } from "@/data/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite || false);
  const { toast } = useToast();
  
  if (!recipe) {
    return (
      <AppLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">Recipe not found</h2>
          <Link to="/browse" className="text-chef-primary mt-4 block">
            Back to Browse
          </Link>
        </div>
      </AppLayout>
    );
  }
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${recipe.title} was removed from your favorites.` 
        : `${recipe.title} was added to your favorites.`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Recipe",
      description: "Share feature coming soon!",
    });
  };
  
  return (
    <AppLayout>
      <div className="relative">
        {/* Image */}
        <div className="relative h-64">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Link to="/browse">
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0 bg-white/80 text-chef-dark">
                <ArrowLeft size={20} />
              </Button>
            </Link>
          </div>
          
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <Button 
              variant="ghost" 
              className={`rounded-full w-10 h-10 p-0 ${isFavorite ? 'bg-chef-primary text-white' : 'bg-white/80 text-chef-dark'}`}
              onClick={handleToggleFavorite}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            <Button 
              variant="ghost" 
              className="rounded-full w-10 h-10 p-0 bg-white/80 text-chef-dark"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </Button>
          </div>
        </div>
        
        {/* Title and Info */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p className="text-gray-600 mt-1">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <Clock size={18} className="text-gray-500 mr-1" />
              <span className="text-sm">
                {recipe.prepTime + recipe.cookTime} mins
              </span>
            </div>
            <div className="flex items-center">
              <ChefHat size={18} className="text-gray-500 mr-1" />
              <span className="text-sm capitalize">{recipe.difficulty}</span>
            </div>
            <div className="flex items-center">
              <Bookmark size={18} className="text-gray-500 mr-1" />
              <span className="text-sm">{recipe.cuisine}</span>
            </div>
            <div className="flex items-center">
              <User size={18} className="text-gray-500 mr-1" />
              <span className="text-sm">{recipe.servings} servings</span>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-6 h-6 bg-chef-primary/10 text-chef-primary rounded-full flex items-center justify-center text-xs mr-3">
                    •
                  </span>
                  <span>
                    {ingredient.quantity && (
                      <span className="font-medium">{ingredient.quantity} {ingredient.unit} </span>
                    )}
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="w-6 h-6 bg-chef-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Nutrition */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Nutrition</h2>
            {recipe.isPremiumOnly ? (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-2">
                  Detailed nutritional information is available in the premium version.
                </p>
                <Button className="btn-primary mt-2">
                  Upgrade to Premium
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-600 text-xs">Calories</p>
                  <p className="font-semibold">{recipe.nutritionalInfo.calories}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-600 text-xs">Protein</p>
                  <p className="font-semibold">{recipe.nutritionalInfo.protein}g</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-600 text-xs">Carbs</p>
                  <p className="font-semibold">{recipe.nutritionalInfo.carbs}g</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <p className="text-gray-600 text-xs">Fat</p>
                  <p className="font-semibold">{recipe.nutritionalInfo.fat}g</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
