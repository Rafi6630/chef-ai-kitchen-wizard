
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types";

interface CategoryTabsProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

export function CategoryTabs({ selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  return (
    <Tabs 
      defaultValue="food" 
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value as Category)}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-6 h-14 border-2 border-chef-primary/20 rounded-xl shadow-md">
        <TabsTrigger 
          value="food" 
          className="font-medium text-lg data-[state=active]:bg-chef-primary data-[state=active]:text-white relative overflow-hidden"
        >
          Food
          {selectedCategory === "food" && (
            <span className="absolute bottom-0 left-0 h-1 bg-chef-primary w-full"></span>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="desserts" 
          className="font-medium text-lg data-[state=active]:bg-chef-primary data-[state=active]:text-white relative overflow-hidden"
        >
          Desserts
          {selectedCategory === "desserts" && (
            <span className="absolute bottom-0 left-0 h-1 bg-chef-primary w-full"></span>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="drinks" 
          className="font-medium text-lg data-[state=active]:bg-chef-primary data-[state=active]:text-white relative overflow-hidden"
        >
          Drinks
          {selectedCategory === "drinks" && (
            <span className="absolute bottom-0 left-0 h-1 bg-chef-primary w-full"></span>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
