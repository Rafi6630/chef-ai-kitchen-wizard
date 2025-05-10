
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";

interface RecipeFinderProps {
  findRecipes: () => void;
  isLoading?: boolean;
}

export function RecipeFinder({ findRecipes, isLoading = false }: RecipeFinderProps) {
  return (
    <Button 
      className="w-full mt-4 bg-chef-primary hover:bg-chef-primary/90 text-white py-6 rounded-xl shadow-md flex justify-center items-center gap-3"
      onClick={findRecipes}
      disabled={isLoading}
      size="lg"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
          <span className="font-medium">Finding Recipes...</span>
        </div>
      ) : (
        <>
          <Sparkles size={20} />
          <span className="font-medium text-lg">Find Recipe Using Artificial Intelligence</span>
          <Search size={20} />
        </>
      )}
    </Button>
  );
}
