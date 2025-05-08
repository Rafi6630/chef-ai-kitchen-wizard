import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Heart, Clock, ChefHat, Share2, User, Bookmark, PlayCircle } from "lucide-react";
import { recipes } from "@/data/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PremiumFeatureGate from "@/components/ui/PremiumFeatureGate";
import { usePremium } from "@/contexts/PremiumContext";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite || false);
  const [showVideo, setShowVideo] = useState(false);
  const [usageCount, setUsageCount] = useState(recipe?.usageCount || Math.floor(Math.random() * 100) + 50);
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  
  if (!recipe) {
    return (
      <AppLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">Recipe not found</h2>
          <Link to="/browse" className="text-chef-primary mt-4 block">
            Back to Browse
          </Link>
        </div>
      </AppLayout>
    );
  }
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${recipe.title} was removed from your favorites.` 
        : `${recipe.title} was added to your favorites.`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Recipe",
      description: "Share feature coming soon!",
    });
  };

  const handleUseCooking = () => {
    setUsageCount(prevCount => prevCount + 1);
    setCookingMode(true);
    setCurrentStep(0);
    toast({
      title: "Recipe in Use",
      description: "Step-by-step cooking mode activated!",
    });
  };

  const handleNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      // Last step completed
      setCookingMode(false);
      toast({
        title: "Cooking Complete!",
        description: "You've completed all the steps. Enjoy your meal!",
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleExitCookingMode = () => {
    setCookingMode(false);
  };

  const renderCookingMode = () => {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{recipe.title}</h1>
            <Button variant="ghost" onClick={handleExitCookingMode}>
              <ArrowLeft size={20} className="mr-2" />
              Exit
            </Button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Step {currentStep + 1} of {recipe.instructions.length}</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6">
              <p className="text-xl">{recipe.instructions[currentStep]}</p>
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={handlePreviousStep} 
                disabled={currentStep === 0}
                variant="outline"
              >
                Previous Step
              </Button>
              
              <Button onClick={handleNextStep}>
                {currentStep < recipe.instructions.length - 1 ? 'Next Step' : 'Finish Cooking'}
              </Button>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <ul className="grid grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-6 h-6 bg-chef-primary/10 text-chef-primary rounded-full flex items-center justify-center text-xs mr-3">
                    •
                  </span>
                  <span>
                    {ingredient.quantity && (
                      <span className="font-medium">{ingredient.quantity} {ingredient.unit} </span>
                    )}
                    {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <AppLayout>
      {cookingMode ? (
        renderCookingMode()
      ) : (
        <div className="relative">
          {/* Image */}
          <div className="relative h-64">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <Link to="/browse">
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0 bg-white/80 text-chef-dark">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
            </div>
            
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <Button 
                variant="ghost" 
                className={`rounded-full w-10 h-10 p-0 ${isFavorite ? 'bg-chef-primary text-white' : 'bg-white/80 text-chef-dark'}`}
                onClick={handleToggleFavorite}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </Button>
              <Button 
                variant="ghost" 
                className="rounded-full w-10 h-10 p-0 bg-white/80 text-chef-dark"
                onClick={handleShare}
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>
          
          {/* Title and Info */}
          <div className="p-6">
            <h1 className="text-2xl font-bold">{recipe.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center">
                <Clock size={18} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="text-sm">
                  {recipe.prepTime + recipe.cookTime} mins
                </span>
              </div>
              <div className="flex items-center">
                <ChefHat size={18} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="text-sm capitalize">{recipe.difficulty}</span>
              </div>
              <div className="flex items-center">
                <Bookmark size={18} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="text-sm">{recipe.cuisine}</span>
              </div>
              <div className="flex items-center">
                <User size={18} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Used {usageCount} times by Chef AI users</span>
            </div>
            
            {/* Video Preview (Premium Feature) */}
            <PremiumFeatureGate feature="videoGuides" featureDisplay="Video Guides">
              <div className="mt-6">
                <button 
                  className="w-full rounded-xl bg-gray-100 dark:bg-gray-800 h-36 flex flex-col items-center justify-center relative overflow-hidden"
                  onClick={() => setShowVideo(!showVideo)}
                >
                  {showVideo && isPremium ? (
                    <video 
                      className="w-full h-full object-cover" 
                      controls 
                      autoPlay
                      src="https://example.com/recipe-video.mp4"
                    ></video>
                  ) : (
                    <>
                      <PlayCircle size={40} className="text-chef-primary mb-2" />
                      <p className="text-gray-700 dark:text-gray-200 font-medium">Watch Cooking Video</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">See how to make this recipe step-by-step</p>
                    </>
                  )}
                </button>
              </div>
            </PremiumFeatureGate>

            {/* Start Cooking Button */}
            <Button 
              className="w-full mt-6 bg-chef-primary text-white" 
              onClick={handleUseCooking}
            >
              <ChefHat size={18} className="mr-2" />
              Cook This
            </Button>
            
            {/* Ingredients */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-6 h-6 bg-chef-primary/10 text-chef-primary rounded-full flex items-center justify-center text-xs mr-3">
                      •
                    </span>
                    <span>
                      {ingredient.quantity && (
                        <span className="font-medium">{ingredient.quantity} {ingredient.unit} </span>
                      )}
                      {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Instructions (Now a Premium Feature) */}
            <PremiumFeatureGate feature="nutrition" featureDisplay="Detailed Instructions">
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="w-6 h-6 bg-chef-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </PremiumFeatureGate>
            
            {/* Nutrition */}
            <PremiumFeatureGate feature="nutrition" featureDisplay="Detailed Nutrition Information">
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Nutrition</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Calories</p>
                    <p className="font-semibold">{recipe.nutritionalInfo.calories}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Protein</p>
                    <p className="font-semibold">{recipe.nutritionalInfo.protein}g</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Carbs</p>
                    <p className="font-semibold">{recipe.nutritionalInfo.carbs}g</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Fat</p>
                    <p className="font-semibold">{recipe.nutritionalInfo.fat}g</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Fiber</p>
                    <p className="font-semibold">3g</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Sugar</p>
                    <p className="font-semibold">12g</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Sodium</p>
                    <p className="font-semibold">450mg</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 shadow-sm p-3 rounded-lg text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-xs">Potassium</p>
                    <p className="font-semibold">340mg</p>
                  </div>
                </div>
              </div>
            </PremiumFeatureGate>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
