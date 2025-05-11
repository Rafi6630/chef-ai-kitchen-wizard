
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Category, CuisineFilter, MealTypeFilter } from "@/types";
import CategoryCarousel from "@/components/ui/CategoryCarousel";
import CuisineSelector from "@/components/ui/CuisineSelector";
import MealTypeSelector from "@/components/ui/MealTypeSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Filter, Utensils, GripHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterSectionProps {
  selectedCategory: Category;
  selectedSubcategory: string | null;
  selectedCuisine: CuisineFilter | null;
  selectedMealType: MealTypeFilter;
  filteredSubcategories: any[];
  handleSelectSubcategory: (subcategory: any) => void;
  handleSelectCuisine: (cuisine: CuisineFilter) => void;
  handleSelectMealType: (mealType: MealTypeFilter) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

export function FilterSection({
  selectedCategory,
  selectedSubcategory,
  selectedCuisine,
  selectedMealType,
  filteredSubcategories,
  handleSelectSubcategory,
  handleSelectCuisine,
  handleSelectMealType,
  clearFilters,
  applyFilters
}: FilterSectionProps) {
  const [activeTab, setActiveTab] = useState<"filters" | "ingredients">("filters");
  const isMobile = useIsMobile();

  return (
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
      <Tabs defaultValue="filters" className="w-full mb-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger 
            value="filters" 
            onClick={() => setActiveTab("filters")}
            className="flex gap-2 items-center"
          >
            <Filter size={16} />
            <span>Recipe Filters</span>
          </TabsTrigger>
          <TabsTrigger 
            value="ingredients"
            onClick={() => setActiveTab("ingredients")}
            className="flex gap-2 items-center"
          >
            <Utensils size={16} />
            <span>Ingredients</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "filters" ? (
        <div className="space-y-4">
          <Accordion type="single" collapsible defaultValue="subcategory" className="w-full">
            <AccordionItem value="subcategory" className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  <GripHorizontal className="mr-2 h-4 w-4" />
                  <span>Select Subcategory</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CategoryCarousel 
                  subcategories={filteredSubcategories}
                  onSelectSubcategory={handleSelectSubcategory}
                  selectedSubcategoryId={selectedSubcategory || undefined}
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="cuisine" className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-chef-primary rounded-full mr-2"></span>
                  <span>Choose Cuisine</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CuisineSelector 
                  onSelectCuisine={handleSelectCuisine} 
                  selectedCuisine={selectedCuisine || undefined}
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="mealType" className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-chef-primary rounded-full mr-2"></span>
                  <span>Meal Type</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <MealTypeSelector 
                  onSelectMealType={handleSelectMealType}
                  selectedMealType={selectedMealType}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={clearFilters} size={isMobile ? "sm" : "default"}>
              Clear Filters
            </Button>
            <Button className="bg-chef-primary" onClick={applyFilters} size={isMobile ? "sm" : "default"}>
              Apply Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 py-2">
            Switch to the Ingredients tab to select ingredients
          </p>
          <Button 
            className="w-full bg-chef-primary/90 hover:bg-chef-primary mt-2"
            onClick={() => setActiveTab("filters")}
          >
            Back to Filters
          </Button>
        </div>
      )}
    </div>
  );
}
