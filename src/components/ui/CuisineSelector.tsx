
import { useState } from "react";
import { CuisineFilter } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CuisineSelectorProps {
  onSelectCuisine: (cuisine: CuisineFilter) => void;
  selectedCuisine?: CuisineFilter;
}

// Map of cuisine types to their flag emojis
const cuisineFlags: Record<CuisineFilter, string> = {
  "italian": "🇮🇹",
  "mexican": "🇲🇽",
  "chinese": "🇨🇳",
  "indian": "🇮🇳",
  "japanese": "🇯🇵",
  "thai": "🇹🇭",
  "turkish": "🇹🇷",
  "syrian": "🇸🇾",
  "iraqi": "🇮🇶",
  "yemeni": "🇾🇪",
  "american": "🇺🇸",
  "moroccan": "🇲🇦",
  "lebanese": "🇱🇧",
  "german": "🇩🇪"
};

export default function CuisineSelector({ onSelectCuisine, selectedCuisine }: CuisineSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCuisines = Object.keys(cuisineFlags).filter(cuisine => 
    cuisine.includes(searchTerm.toLowerCase())
  ) as CuisineFilter[];

  return (
    <div className="w-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search cuisines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chef-primary"
        />
      </div>
      
      <ScrollArea className="h-64">
        <div className="grid grid-cols-2 gap-2">
          {filteredCuisines.map((cuisine) => (
            <div 
              key={cuisine}
              onClick={() => onSelectCuisine(cuisine)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                selectedCuisine === cuisine 
                  ? 'bg-chef-primary text-white' 
                  : 'bg-white dark:bg-gray-800 border hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl mr-2">{cuisineFlags[cuisine]}</span>
              <span className="capitalize">{cuisine}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
