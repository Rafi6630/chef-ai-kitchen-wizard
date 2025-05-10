
import React from "react";
import { SubcategoryInfo } from "@/types";
import CategoryCard from "@/components/ui/CategoryCard";

interface SubcategoryGridProps {
  subcategories: SubcategoryInfo[];
  selectedSubcategory: string | null;
  onSelectSubcategory: (id: string) => void;
}

export function SubcategoryGrid({ subcategories, selectedSubcategory, onSelectSubcategory }: SubcategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
      {subcategories.map((subcategory) => (
        <div 
          key={subcategory.id} 
          className="cursor-pointer"
          onClick={() => onSelectSubcategory(subcategory.id)}
        >
          <CategoryCard 
            subcategory={subcategory}
            isSelected={selectedSubcategory === subcategory.id}
          />
        </div>
      ))}
    </div>
  );
}
