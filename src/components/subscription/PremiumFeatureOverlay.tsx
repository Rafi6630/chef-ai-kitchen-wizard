
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";

interface PremiumFeatureOverlayProps {
  feature: string;
  allowOneFreeUse?: boolean;
}

export default function PremiumFeatureOverlay({ feature, allowOneFreeUse = false }: PremiumFeatureOverlayProps) {
  const { recordFeatureUsage } = usePremium();
  
  const handleUseFreeAccess = () => {
    recordFeatureUsage(feature as any);
  };
  
  return (
    <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 z-10 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-chef-primary/10 dark:bg-chef-primary/20 p-4 rounded-full mb-4">
        <Lock size={32} className="text-chef-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">Premium Feature</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {feature.charAt(0).toUpperCase() + feature.slice(1)} is available with our premium subscription.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link to="/subscription">
          <Button className="w-full bg-chef-primary hover:bg-chef-primary/90">
            Upgrade to Premium
          </Button>
        </Link>
        
        {allowOneFreeUse && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleUseFreeAccess}
          >
            Use Free Access (1/day)
          </Button>
        )}
      </div>
    </div>
  );
}
