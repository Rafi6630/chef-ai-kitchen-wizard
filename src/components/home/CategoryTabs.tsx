
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryTabsProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

export function CategoryTabs({ selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  const isMobile = useIsMobile();

  return (
    <Tabs 
      defaultValue="food" 
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value as Category)}
      className="w-full"
    >
      <TabsList className={`grid grid-cols-3 mb-6 ${isMobile ? 'h-12' : 'h-14'} border-2 border-chef-primary/20 rounded-xl shadow-md tabs-list`}>
        <TabsTrigger 
          value="food" 
          className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} data-[state=active]:bg-chef-primary data-[state=active]:text-white relative overflow-hidden tabs-trigger`}
        >
          Food
          {selectedCategory === "food" && (
            <span className="absolute bottom-0 left-0 h-1 bg-chef-primary w-full"></span>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="desserts" 
          className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} data-[state=active]:bg-chef-primary data-[state=active]:text-white relative overflow-hidden tabs-trigger`}
        >
          Desserts
          {selectedCategory === "desserts" && (
            <span className="absolute bottom-0 left-0 h-1 bg-chef-primary w-full"></span>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="drinks" 
          className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} data-[state=active]:bg-chef-primary data-[state=active]:text-white relative overflow-hidden tabs-trigger`}
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
