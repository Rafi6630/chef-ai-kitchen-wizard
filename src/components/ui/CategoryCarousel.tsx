
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { SubcategoryInfo } from "@/types";
import CategoryCard from "./CategoryCard";

interface CategoryCarouselProps {
  subcategories: SubcategoryInfo[];
  onSelectSubcategory?: (subcategory: SubcategoryInfo) => void;
  selectedSubcategoryId?: string;
}

export default function CategoryCarousel({ 
  subcategories, 
  onSelectSubcategory,
  selectedSubcategoryId
}: CategoryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        // Fix: Remove the incorrect onSelect prop that expects a number but receives an event
      >
        <CarouselContent>
          {subcategories.map((subcategory) => (
            <CarouselItem key={subcategory.id} className="md:basis-1/4 lg:basis-1/5">
              <CategoryCard 
                subcategory={subcategory}
                onClick={onSelectSubcategory ? () => onSelectSubcategory(subcategory) : undefined}
                showBadge={true}
                isSelected={selectedSubcategoryId === subcategory.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="relative static left-auto transform-none" />
          <CarouselNext className="relative static right-auto transform-none" />
        </div>
      </Carousel>
    </div>
  );
}
