
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Send, Mic, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { Message } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { recipes } from "@/data/mockData";

export default function Chatbot() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "food";
  const subcategory = searchParams.get("subcategory");
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hi! I'm your Chef AI assistant. Tell me what ingredients you have for ${category}${subcategory ? ` (${subcategory})` : ""}, and I'll help you find recipes.`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse;
      
      // Check if the message contains certain ingredients
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("pasta") || lowerInput.includes("tomato")) {
        botResponse = {
          id: Date.now().toString(),
          content: "I found a great pasta recipe for you! Would you like to see it?",
          isBot: true,
          timestamp: new Date(),
        };
        
        setTimeout(() => {
          const recipeMessage = {
            id: Date.now().toString(),
            content: JSON.stringify(recipes.find(r => r.id === "pasta-primavera")),
            isBot: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, recipeMessage]);
        }, 1500);
      } else if (lowerInput.includes("chocolate") || lowerInput.includes("cake")) {
        botResponse = {
          id: Date.now().toString(),
          content: "How about a delicious chocolate lava cake?",
          isBot: true,
          timestamp: new Date(),
        };
        
        setTimeout(() => {
          const recipeMessage = {
            id: Date.now().toString(),
            content: JSON.stringify(recipes.find(r => r.id === "chocolate-lava-cake")),
            isBot: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, recipeMessage]);
        }, 1500);
      } else if (lowerInput.includes("strawberry") || lowerInput.includes("mojito")) {
        botResponse = {
          id: Date.now().toString(),
          content: "I have a refreshing strawberry mojito recipe for you!",
          isBot: true,
          timestamp: new Date(),
        };
        
        setTimeout(() => {
          const recipeMessage = {
            id: Date.now().toString(),
            content: JSON.stringify(recipes.find(r => r.id === "strawberry-mojito")),
            isBot: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, recipeMessage]);
        }, 1500);
      } else {
        botResponse = {
          id: Date.now().toString(),
          content: "I see you have these ingredients! Let me find some recipes for you. What type of dish would you like to make?",
          isBot: true,
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };
  
  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon in the premium version!",
    });
  };
  
  const handleFileUpload = () => {
    toast({
      title: "Image Upload",
      description: "Image upload feature coming soon in the premium version!",
    });
  };

  const renderMessage = (message: Message) => {
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
        return message.content;
      }
    }
    
    return message.content;
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-200 flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft />
          </Link>
          <div>
            <h1 className="text-xl font-bold capitalize">{category} AI Chatbot</h1>
            {subcategory && (
              <p className="text-sm text-gray-600 capitalize">
                {subcategory.replace("-", " ")}
              </p>
            )}
          </div>
        </header>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-bubble ${message.isBot ? "bot" : "user"}`}
              >
                {renderMessage(message)}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-bubble bot">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full p-2"
              onClick={handleFileUpload}
            >
              <Paperclip size={18} />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your ingredients..."
              className="input-field"
            />
            <Button
              type="button"
              variant="ghost"
              className="rounded-full p-2"
              onClick={handleVoiceInput}
            >
              <Mic size={18} />
            </Button>
            <Button
              type="submit"
              className="rounded-full p-2 bg-chef-primary text-white hover:bg-opacity-90"
              disabled={!input.trim() || isTyping}
            >
              <Send size={18} />
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
