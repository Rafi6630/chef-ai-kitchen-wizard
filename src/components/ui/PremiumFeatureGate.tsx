
import { ReactNode } from "react";
import { usePremium } from "@/contexts/PremiumContext";
import PremiumFeatureOverlay from "../subscription/PremiumFeatureOverlay";

interface PremiumFeatureGateProps {
  feature: "nutrition" | "videoGuides" | "mealPlanning" | "aiFeatures" | "shoppingList";
  featureDisplay?: string;
  children: ReactNode;
}

export default function PremiumFeatureGate({ 
  feature,
  featureDisplay,
  children 
}: PremiumFeatureGateProps) {
  const { isPremium, premiumFeatures } = usePremium();
  
  const isPremiumFeature = premiumFeatures[feature];
  
  if (!isPremiumFeature) {
    // If the feature is not marked as premium, show it to everyone
    return <>{children}</>;
  }
  
  if (isPremiumFeature && isPremium) {
    // If it's a premium feature and user is premium, show it
    return <>{children}</>;
  }
  
  // If it's a premium feature and user is not premium, show overlay
  return (
    <div className="relative">
      {children}
      <PremiumFeatureOverlay feature={featureDisplay || feature} />
    </div>
  );
}
