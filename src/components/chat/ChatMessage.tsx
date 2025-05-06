
import { Message } from "@/types";
import { Link } from "react-router-dom";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  // Check if the message contains recipe data (JSON)
  const renderRecipeCard = () => {
    if (message.isBot && message.content.startsWith("{")) {
      try {
        const recipe = JSON.parse(message.content);
        return (
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <h3 className="font-semibold text-lg">{recipe.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{recipe.description}</p>
            <div className="flex items-center text-xs text-gray-500 gap-2 mb-2">
              <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
              <span>|</span>
              <span>👨‍🍳 {recipe.difficulty}</span>
              <span>|</span>
              <span>🍽️ {recipe.cuisine}</span>
            </div>
            <Link 
              to={`/recipe/${recipe.id}`} 
              className="block text-chef-primary font-semibold text-sm"
            >
              View Full Recipe →
            </Link>
          </div>
        );
      } catch (e) {
        return <p>{message.content}</p>;
      }
    }
    
    return <p>{message.content}</p>;
  };

  return (
    <div className={`chatbot-bubble ${message.isBot ? "bot" : "user"}`}>
      {renderRecipeCard()}
    </div>
  );
}
