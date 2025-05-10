
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface RecipeFinderProps {
  findRecipes: () => void;
}

export function RecipeFinder({ findRecipes }: RecipeFinderProps) {
  return (
    <Button 
      className="w-full mt-4 bg-chef-primary hover:bg-chef-primary/90 text-white py-3 rounded-xl shadow-md flex justify-center items-center gap-2"
      onClick={findRecipes}
    >
      <Search size={18} />
      <span className="font-medium">Find Recipes</span>
    </Button>
  );
}
