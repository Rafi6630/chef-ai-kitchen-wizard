
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Send, Mic, Paperclip, Image, User, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { Message } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { recipes } from "@/data/mockData";
import ChatMessage from "@/components/chat/ChatMessage";
import { usePremium } from "@/contexts/PremiumContext";
import PremiumFeatureOverlay from "@/components/subscription/PremiumFeatureOverlay";

export default function AIAssistant() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "food";
  const subcategory = searchParams.get("subcategory");
  const usePantry = searchParams.get("use_pantry") === "true";
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: usePantry 
        ? "I've loaded your pantry ingredients. What would you like to make with them?"
        : `Hi! I'm your Chef AI assistant. Tell me what ingredients you have for ${category}${subcategory ? ` (${subcategory})` : ""}, and I'll help you find recipes.`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasIngredients, setHasIngredients] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isPremium } = usePremium();

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
    
    // If this is the first user message with ingredients, set the flag
    if (!hasIngredients && !input.toLowerCase().startsWith("can you") && !input.toLowerCase().startsWith("how")) {
      setHasIngredients(true);
    }
    
    // Simulate AI response
    setTimeout(() => {
      let botResponse;
      
      // Check if the message contains certain ingredients or the user has already provided ingredients
      const lowerInput = input.toLowerCase();
      
      if (hasIngredients && (lowerInput.includes("yes") || lowerInput.includes("show") || lowerInput.includes("ok"))) {
        // User wants to see recipe after confirming
        botResponse = {
          id: Date.now().toString(),
          content: "Great! Here's a recipe I found for you:",
          isBot: true,
          timestamp: new Date(),
        };
        
        setTimeout(() => {
          // Select appropriate recipe based on category
          let recipeId;
          if (category === "desserts") {
            recipeId = "chocolate-lava-cake";
          } else if (category === "drinks") {
            recipeId = "strawberry-mojito";
          } else {
            recipeId = "pasta-primavera";
          }
          
          const recipeMessage = {
            id: Date.now().toString(),
            content: JSON.stringify(recipes.find(r => r.id === recipeId)),
            isBot: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, recipeMessage]);
          
          // Add follow-up question
          setTimeout(() => {
            const followUpMessage = {
              id: Date.now().toString(),
              content: "Would you like to see more recipes or do you want to refine your ingredients?",
              isBot: true,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, followUpMessage]);
          }, 1000);
        }, 1000);
      }
      else if (lowerInput.includes("pasta") || lowerInput.includes("tomato") || usePantry) {
        setHasIngredients(true);
        botResponse = {
          id: Date.now().toString(),
          content: `I've identified these ingredients: ${usePantry ? "chicken, rice, tomatoes, onions, olive oil" : "pasta, tomatoes, garlic, olive oil"}. Would you like me to find a recipe using these?`,
          isBot: true,
          timestamp: new Date(),
        };
      } else if (lowerInput.includes("chocolate") || lowerInput.includes("cake")) {
        setHasIngredients(true);
        botResponse = {
          id: Date.now().toString(),
          content: "I've identified these ingredients: chocolate, butter, sugar, eggs, flour. Would you like me to suggest a chocolate dessert recipe?",
          isBot: true,
          timestamp: new Date(),
        };
      } else if (lowerInput.includes("strawberry") || lowerInput.includes("mojito")) {
        setHasIngredients(true);
        botResponse = {
          id: Date.now().toString(),
          content: "I've identified these ingredients: strawberries, mint, rum, lime, sugar. Would you like me to mix up a strawberry mojito recipe?",
          isBot: true,
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: Date.now().toString(),
          content: "I need to know what ingredients you have. Please list them or tell me what kind of dish you'd like to make.",
          isBot: true,
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleVoiceInput = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Voice input is available in the premium version!",
      });
      return;
    }
    
    toast({
      title: "Voice Input",
      description: "Voice input activated. Please speak clearly.",
    });
  };
  
  const handleFileUpload = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Image upload is available in the premium version!",
      });
      return;
    }
    
    toast({
      title: "Image Upload",
      description: "Please select an image of your ingredients.",
    });
  };

  if (!isPremium) {
    return (
      <AppLayout>
        <PremiumFeatureOverlay 
          title="AI Assistant" 
          description="Get personalized recipe recommendations from our AI chef. Upload photos of ingredients, use voice commands, and more!"
          featureList={[
            "Advanced ingredient recognition",
            "Voice command support",
            "Upload photos of your ingredients",
            "Personalized recipe suggestions",
            "Nutritional guidance"
          ]}
          buttonText="Upgrade to Premium"
          buttonLink="/subscription"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100dvh-5rem)]">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-200 flex items-center bg-white dark:bg-gray-900">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold capitalize">AI Assistant</h1>
            {subcategory && (
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {subcategory.replace("-", " ")}
              </p>
            )}
          </div>
        </header>
        
        {/* Instructions */}
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <p>Tell me what ingredients you have, and I'll suggest recipes. You can also ask cooking questions!</p>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-2"
              >
                {message.isBot ? (
                  <div className="w-8 h-8 rounded-full bg-chef-primary text-white flex items-center justify-center flex-shrink-0">
                    <ChefHat size={16} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
                <ChatMessage message={message} />
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-chef-primary text-white flex items-center justify-center flex-shrink-0">
                  <ChefHat size={16} />
                </div>
                <div className="chatbot-bubble bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
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
            <Button
              type="button"
              variant="ghost"
              className="rounded-full p-2"
              onClick={handleFileUpload}
            >
              <Image size={18} />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={hasIngredients ? "Ask about your recipe..." : "Enter your ingredients..."}
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
