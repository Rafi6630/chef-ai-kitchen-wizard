
import { MealTypeFilter } from "@/types";
import { Button } from "@/components/ui/button";

interface MealTypeSelectorProps {
  onSelectMealType: (mealType: MealTypeFilter) => void;
  selectedMealType: MealTypeFilter;
}

// Map of meal types to their time-based icons
const mealTypeIcons: Record<MealTypeFilter, { icon: string; label: string }> = {
  "any": { icon: "🍽️", label: "Any Meal" },
  "breakfast": { icon: "🌅", label: "Breakfast" },
  "lunch": { icon: "☀️", label: "Lunch" },
  "dinner": { icon: "🌙", label: "Dinner" },
  "dessert": { icon: "🍰", label: "Dessert" },
  "snack": { icon: "🥨", label: "Snack" }
};

export default function MealTypeSelector({ 
  onSelectMealType, 
  selectedMealType 
}: MealTypeSelectorProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {(Object.entries(mealTypeIcons) as [MealTypeFilter, typeof mealTypeIcons["any"]][]).map(([type, { icon, label }]) => (
          <Button
            key={type}
            variant={selectedMealType === type ? "default" : "outline"}
            className={`flex items-center justify-start gap-2 h-12 ${
              selectedMealType === type ? 'bg-chef-primary text-white' : ''
            }`}
            onClick={() => onSelectMealType(type)}
          >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
