
import { ReactNode } from "react";
import { usePremium } from "@/contexts/PremiumContext";
import PremiumFeatureOverlay from "../subscription/PremiumFeatureOverlay";

interface PremiumFeatureGateProps {
  feature: "nutrition" | "videoGuides" | "mealPlanning" | "aiFeatures" | "shoppingList";
  featureDisplay?: string;
  children: ReactNode;
  allowOneFreeUse?: boolean;
  // Add optional props to pass through
  title?: string;
  description?: string;
  featureList?: string[];
  buttonText?: string;
  buttonLink?: string;
}

export default function PremiumFeatureGate({ 
  feature,
  featureDisplay,
  children,
  allowOneFreeUse = false,
  title,
  description,
  featureList,
  buttonText,
  buttonLink
}: PremiumFeatureGateProps) {
  const { isPremium, premiumFeatures, checkDailyUsage } = usePremium();
  
  const isPremiumFeature = premiumFeatures[feature];
  
  if (!isPremiumFeature) {
    // If the feature is not marked as premium, show it to everyone
    return <>{children}</>;
  }
  
  if (isPremiumFeature && isPremium) {
    // If it's a premium feature and user is premium, show it
    return <>{children}</>;
  }
  
  if (allowOneFreeUse && checkDailyUsage(feature)) {
    // If one free use is allowed and user hasn't used their daily access yet
    return <>{children}</>;
  }
  
  // If it's a premium feature and user is not premium, show overlay
  return (
    <div className="relative">
      {children}
      <PremiumFeatureOverlay 
        feature={featureDisplay || feature}
        allowOneFreeUse={allowOneFreeUse}
        title={title}
        description={description}
        featureList={featureList}
        buttonText={buttonText}
        buttonLink={buttonLink}
      />
    </div>
  );
}
