
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, Search, ChefHat } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RecipeFinderProps {
  findRecipes: () => void;
  isLoading?: boolean;
}

export function RecipeFinder({ findRecipes, isLoading = false }: RecipeFinderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full mt-4">
      <Button 
        className="w-full bg-gradient-to-r from-chef-primary to-chef-primary/80 hover:from-chef-primary/90 hover:to-chef-primary 
                  text-white py-6 rounded-xl shadow-lg flex justify-center items-center gap-3 relative overflow-hidden 
                  transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-white/20 animate-gentle-pulse"
        onClick={findRecipes}
        disabled={isLoading}
        size="lg"
      >
        {/* Background animation effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-chef-primary/80 to-chef-primary opacity-75"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array(10).fill(0).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span className="font-medium text-base sm:text-lg">Finding Smart Recipes...</span>
            </div>
          ) : (
            <>
              <ChefHat size={isMobile ? 20 : 24} className="text-yellow-200" />
              <span className="font-medium text-base sm:text-lg">
                Find Recipes Using AI
              </span>
              <Sparkles size={isMobile ? 20 : 24} className="text-yellow-200" />
            </>
          )}
        </div>
      </Button>
      
      <div className="text-center mt-2 text-xs text-gray-500 flex items-center justify-center">
        <Lightbulb size={14} className="mr-1 text-chef-primary" />
        Our AI will prioritize recipes that use most of your available ingredients
      </div>
    </div>
  );
}
