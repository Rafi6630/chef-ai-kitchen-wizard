
import { Badge } from "@/components/ui/badge";
import { DifficultyFilter } from "@/types";

interface DifficultyBadgeProps {
  difficulty: DifficultyFilter;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function DifficultyBadge({ 
  difficulty, 
  showLabel = true,
  size = "md" 
}: DifficultyBadgeProps) {
  const getColorClass = () => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "hard":
        return "bg-rose-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-xs px-1.5 py-0.5";
      case "lg":
        return "text-sm px-3 py-1";
      default:
        return "text-xs px-2 py-0.5";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`${getColorClass()} ${getSizeClass()} font-medium rounded-full`}
    >
      {showLabel ? (
        <>
          <span className="inline-block mr-1">●</span>
          <span className="capitalize">{difficulty}</span>
        </>
      ) : (
        <span>●</span>
      )}
    </Badge>
  );
}
