
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type PremiumFeatureKey = "nutrition" | "videoGuides" | "mealPlanning" | "aiFeatures" | "shoppingList" | "instructions";

type DailyFeatureUsage = {
  [K in PremiumFeatureKey]?: {
    lastUsed: string;
    count: number;
  };
};

type PremiumContextType = {
  isPremium: boolean;
  setPremiumStatus: (status: boolean) => void;
  checkPremiumStatus: () => boolean;
  premiumFeatures: {
    [K in PremiumFeatureKey]: boolean;
  };
  checkDailyUsage: (feature: PremiumFeatureKey) => boolean;
  recordFeatureUsage: (feature: PremiumFeatureKey) => void;
};

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [dailyUsage, setDailyUsage] = useState<DailyFeatureUsage>({});
  const { toast } = useToast();

  // Check localStorage on initial load for premium status and daily usage
  useEffect(() => {
    const storedPremiumStatus = localStorage.getItem("isPremiumUser");
    if (storedPremiumStatus === "true") {
      setIsPremium(true);
    }
    
    const storedDailyUsage = localStorage.getItem("dailyFeatureUsage");
    if (storedDailyUsage) {
      setDailyUsage(JSON.parse(storedDailyUsage));
    }
  }, []);

  // Set premium status and save to localStorage
  const setPremiumStatus = (status: boolean) => {
    setIsPremium(status);
    localStorage.setItem("isPremiumUser", status.toString());
    
    if (status) {
      toast({
        title: "Premium Activated",
        description: "Your premium features are now available. Enjoy!",
      });
    }
  };

  // Check if user is premium
  const checkPremiumStatus = () => {
    return isPremium;
  };
  
  // Check if a user can use a feature once per day
  const checkDailyUsage = (feature: PremiumFeatureKey): boolean => {
    const today = new Date().toDateString();
    const featureUsage = dailyUsage[feature];
    
    if (!featureUsage) {
      return true; // No usage yet, allow it
    }
    
    return featureUsage.lastUsed !== today;
  };
  
  // Record feature usage for free daily access
  const recordFeatureUsage = (feature: PremiumFeatureKey) => {
    const today = new Date().toDateString();
    const newUsage = {
      ...dailyUsage,
      [feature]: {
        lastUsed: today,
        count: (dailyUsage[feature]?.count || 0) + 1
      }
    };
    
    setDailyUsage(newUsage);
    localStorage.setItem("dailyFeatureUsage", JSON.stringify(newUsage));
    
    toast({
      title: "Free Access Used",
      description: `You've used your free daily access to ${feature}. Come back tomorrow for another free use, or upgrade to Premium for unlimited access.`,
    });
  };

  // Define which features require premium
  const premiumFeatures = {
    nutrition: true,
    videoGuides: true,
    mealPlanning: true,
    aiFeatures: true,
    shoppingList: true,
    instructions: true
  };

  const value = {
    isPremium,
    setPremiumStatus,
    checkPremiumStatus,
    premiumFeatures,
    checkDailyUsage,
    recordFeatureUsage
  };

  return <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>;
};

export const usePremium = (): PremiumContextType => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
};
