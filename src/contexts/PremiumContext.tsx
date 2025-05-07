
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type PremiumContextType = {
  isPremium: boolean;
  setPremiumStatus: (status: boolean) => void;
  checkPremiumStatus: () => boolean;
  premiumFeatures: {
    nutrition: boolean;
    videoGuides: boolean;
    mealPlanning: boolean;
    aiFeatures: boolean;
    shoppingList: boolean;
  };
};

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const { toast } = useToast();

  // Check localStorage on initial load for premium status
  useEffect(() => {
    const storedPremiumStatus = localStorage.getItem("isPremiumUser");
    if (storedPremiumStatus === "true") {
      setIsPremium(true);
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

  // Define which features require premium
  const premiumFeatures = {
    nutrition: true,
    videoGuides: true,
    mealPlanning: true,
    aiFeatures: true,
    shoppingList: true
  };

  const value = {
    isPremium,
    setPremiumStatus,
    checkPremiumStatus,
    premiumFeatures
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
