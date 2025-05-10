
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
      <TabsList className="grid grid-cols-3 mb-6 h-14">
        <TabsTrigger 
          value="food" 
          className="font-medium text-lg data-[state=active]:bg-chef-primary data-[state=active]:text-white"
        >
          Food
        </TabsTrigger>
        <TabsTrigger 
          value="desserts" 
          className="font-medium text-lg data-[state=active]:bg-chef-primary data-[state=active]:text-white"
        >
          Desserts
        </TabsTrigger>
        <TabsTrigger 
          value="drinks" 
          className="font-medium text-lg data-[state=active]:bg-chef-primary data-[state=active]:text-white"
        >
          Drinks
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
