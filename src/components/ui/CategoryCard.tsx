
import { Link } from "react-router-dom";
import { SubcategoryInfo } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  subcategory: SubcategoryInfo;
  onClick?: () => void;
  showBadge?: boolean;
  isSelected?: boolean;
}

export default function CategoryCard({ 
  subcategory, 
  onClick, 
  showBadge = false,
  isSelected = false
}: CategoryCardProps) {
  return (
    <div 
      className={`transition-all duration-200 ${onClick ? 'cursor-pointer transform hover:scale-105' : ''} ${
        isSelected ? 'ring-2 ring-chef-primary ring-offset-2 dark:ring-offset-gray-900' : ''
      }`}
      onClick={onClick}
    >
      {onClick ? (
        <div className="category-card border border-gray-200 dark:border-gray-700">
          <div className="aspect-square overflow-hidden rounded-lg relative shadow-sm">
            <img 
              src={subcategory.imageUrl} 
              alt={subcategory.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            {showBadge && subcategory.premium && (
              <Badge 
                variant="default" 
                className="absolute top-2 right-2 bg-gradient-to-r from-chef-primary to-accent text-white"
              >
                Premium
              </Badge>
            )}
            <h3 className="text-sm font-medium text-center absolute bottom-2 left-0 right-0 text-white">{subcategory.name}</h3>
          </div>
        </div>
      ) : (
        <Link 
          to={`/browse?category=${subcategory.category}&subcategory=${subcategory.id}`}
          className="category-card block border border-gray-200 dark:border-gray-700"
        >
          <div className="aspect-square overflow-hidden rounded-lg relative shadow-sm">
            <img 
              src={subcategory.imageUrl} 
              alt={subcategory.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            {showBadge && subcategory.premium && (
              <Badge 
                variant="default" 
                className="absolute top-2 right-2 bg-gradient-to-r from-chef-primary to-accent text-white"
              >
                Premium
              </Badge>
            )}
            <h3 className="text-sm font-medium text-center absolute bottom-2 left-0 right-0 text-white">{subcategory.name}</h3>
          </div>
        </Link>
      )}
    </div>
  );
}
