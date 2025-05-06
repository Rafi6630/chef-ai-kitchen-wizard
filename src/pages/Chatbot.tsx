
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Send, Mic, Paperclip, Image, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Message } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { recipes } from "@/data/mockData";
import ChatMessage from "@/components/chat/ChatMessage";

export default function Chatbot() {
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

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-200 flex items-center bg-white">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
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
        
        {/* Instructions */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 text-sm text-gray-600">
          <p>Tell me what ingredients you have, and I'll suggest recipes. You can also ask cooking questions!</p>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-2"
              >
                {message.isBot ? (
                  <div className="w-8 h-8 rounded-full bg-chef-primary text-white flex items-center justify-center flex-shrink-0">
                    <ChefHatIcon size={16} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
                <ChatMessage message={message} />
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-chef-primary text-white flex items-center justify-center flex-shrink-0">
                  <ChefHatIcon size={16} />
                </div>
                <div className="chatbot-bubble bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
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

// Custom chef hat icon
function ChefHatIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12C3.79086 12 2 10.2091 2 8C2 5.79086 3.79086 4 6 4C6.28673 4 6.56534 4.03464 6.8325 4.10038C7.38842 2.85506 8.66046 2 10.1195 2C10.7262 2 11.3364 2.15568 11.8631 2.45547C12.2487 2.16851 12.7198 2 13.2292 2C13.8497 2 14.4153 2.23444 14.8399 2.62284C15.8561 2.22077 16.8711 2 17.8243 2C19.4348 2 21 2.67282 21 4.16327V13.1633C21 14.6537 19.4348 15.3265 17.8243 15.3265C16.3153 15.3265 14.7924 14.7322 13.8399 13.7772C13.4153 14.1656 12.8497 14.4 12.2292 14.4C11.9068 14.4 11.6016 14.3314 11.3256 14.2074C11.301 14.2726 11.2701 14.334 11.2333 14.3904C10.7952 15.0368 10.0179 15.3265 9.07535 15.3265C7.63629 15.3265 6.06473 14.4804 5.3637 13.1166C5.25115 13.1388 5.13541 13.1542 5.01722 13.1623C4.77829 13.1782 4.53455 13.1428 4.31092 13.0626C3.48874 12.7646 3 12.0501 3 11.2V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 19L7 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 19L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 19L17 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 16H20V19H4V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
