
import { Link } from "react-router-dom";
import { Subcategory } from "@/types";

interface CategoryCardProps {
  subcategory: Subcategory;
}

export default function CategoryCard({ subcategory }: CategoryCardProps) {
  return (
    <Link 
      to={`/chatbot?category=${subcategory.category}&subcategory=${subcategory.id}`}
      className="category-card aspect-square"
    >
      <img 
        src={subcategory.imageUrl} 
        alt={subcategory.name} 
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="category-card-content">
        <h3 className="text-xs font-bold line-clamp-1">{subcategory.name}</h3>
      </div>
    </Link>
  );
}
