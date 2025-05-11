
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles } from "lucide-react";
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
        className="w-full bg-chef-primary hover:bg-chef-primary/90 text-white py-6 rounded-xl shadow-md flex justify-center items-center gap-3 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        onClick={findRecipes}
        disabled={isLoading}
        size="lg"
      >
        {/* Background animation effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-chef-primary/80 to-chef-primary opacity-75"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array(6).fill(0).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              <span className="font-medium">Finding Smart Recipes...</span>
            </div>
          ) : (
            <>
              <Lightbulb size={isMobile ? 18 : 24} className="animate-pulse text-yellow-200" />
              <span className="font-medium text-base sm:text-lg">
                Find Recipes Using AI
              </span>
              <Sparkles size={isMobile ? 18 : 24} className="text-yellow-200" />
            </>
          )}
        </div>
      </Button>
      
      <div className="text-center mt-2 text-xs text-gray-500">
        Powered by AI to find the perfect recipe for your ingredients
      </div>
    </div>
  );
}
