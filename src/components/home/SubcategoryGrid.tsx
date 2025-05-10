
import React from "react";
import { SubcategoryInfo } from "@/types";
import CategoryCard from "@/components/ui/CategoryCard";

interface SubcategoryGridProps {
  subcategories: SubcategoryInfo[];
  selectedSubcategory: string | null;
  onSelectSubcategory: (id: string) => void;
}

export function SubcategoryGrid({ subcategories, selectedSubcategory, onSelectSubcategory }: SubcategoryGridProps) {
  // Map of subcategory IDs to descriptions
  const subcategoryDescriptions: Record<string, string> = {
    mainDishes: "Hearty main courses for any occasion",
    appetizers: "Delicious starters to begin your meal",
    pickles: "Preserved vegetables with tangy flavors",
    sauces: "Flavorful accompaniments for your dishes",
    soups: "Comforting bowls for any weather",
    salads: "Fresh and light vegetable dishes",
    traditional: "Classic dessert recipes from around the world",
    western: "Modern sweets from western cuisines",
    pastries: "Baked goods with flaky textures",
    iceCream: "Frozen treats for hot days",
    detox: "Healthy juice blends to refresh your body",
    cocktails: "Mixed drinks for social occasions",
    alcoholic: "Beverages with spirits and liquors",
    hotDrinks: "Warm beverages for cold days"
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      {subcategories.map((subcategory) => (
        <div 
          key={subcategory.id} 
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => onSelectSubcategory(subcategory.id)}
        >
          <CategoryCard 
            subcategory={subcategory}
            isSelected={selectedSubcategory === subcategory.id}
          />
          {subcategoryDescriptions[subcategory.id] && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              {subcategoryDescriptions[subcategory.id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
