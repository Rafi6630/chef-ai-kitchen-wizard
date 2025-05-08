
import { Link } from "react-router-dom";
import { SubcategoryInfo } from "@/types";

interface CategoryCardProps {
  subcategory: SubcategoryInfo;
}

export default function CategoryCard({ subcategory }: CategoryCardProps) {
  return (
    <Link 
      to={`/chatbot?category=${subcategory.category}&subcategory=${subcategory.id}`}
      className="category-card"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img 
          src={subcategory.imageUrl} 
          alt={subcategory.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-1">
        <h3 className="text-xs font-medium text-center line-clamp-1">{subcategory.name}</h3>
      </div>
    </Link>
  );
}
