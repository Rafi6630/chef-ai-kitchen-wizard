
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
        isSelected ? 'ring-2 ring-chef-primary ring-offset-2' : ''
      }`}
      onClick={onClick}
    >
      {onClick ? (
        <div className="category-card">
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <img 
              src={subcategory.imageUrl} 
              alt={subcategory.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            {showBadge && subcategory.premium && (
              <Badge 
                variant="default" 
                className="absolute top-2 right-2 bg-gradient-to-r from-chef-primary to-accent text-white"
              >
                Premium
              </Badge>
            )}
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-medium text-center line-clamp-1">{subcategory.name}</h3>
          </div>
        </div>
      ) : (
        <Link 
          to={`/chatbot?category=${subcategory.category}&subcategory=${subcategory.id}`}
          className="category-card block"
        >
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <img 
              src={subcategory.imageUrl} 
              alt={subcategory.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            {showBadge && subcategory.premium && (
              <Badge 
                variant="default" 
                className="absolute top-2 right-2 bg-gradient-to-r from-chef-primary to-accent text-white"
              >
                Premium
              </Badge>
            )}
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-medium text-center line-clamp-1">{subcategory.name}</h3>
          </div>
        </Link>
      )}
    </div>
  );
}
