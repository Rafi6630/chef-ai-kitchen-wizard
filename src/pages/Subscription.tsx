
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

interface PlanFeature {
  name: string;
  includedIn: string[];
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: "0",
    period: "forever",
    description: "Basic features for casual users",
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
    highlighted: false
  },
  {
    id: "premium-monthly",
    name: "Premium",
    price: "9.99",
    period: "month",
    description: "Full access to all features",
    buttonText: "Select",
    buttonVariant: "default" as const,
    highlighted: true
  },
  {
    id: "premium-annual",
    name: "Premium Annual",
    price: "99.99",
    period: "year",
    description: "Save 16% with annual billing",
    buttonText: "Select",
    buttonVariant: "default" as const,
    highlighted: false
  }
];

const features: PlanFeature[] = [
  { name: "Basic recipes", includedIn: ["free", "premium-monthly", "premium-annual"] },
  { name: "Cooking history", includedIn: ["free", "premium-monthly", "premium-annual"] },
  { name: "Smart pantry (basic)", includedIn: ["free", "premium-monthly", "premium-annual"] },
  { name: "Smart pantry (unlimited items)", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "Detailed nutritional info", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "Video-guided cooking", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "Premium recipes", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "Ad-free experience", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "AI meal planning", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "Shopping list generation", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "AI voice & image recognition", includedIn: ["premium-monthly", "premium-annual"] },
  { name: "Priority support", includedIn: ["premium-annual"] }
];

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("free");
  const { toast } = useToast();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    if (planId !== "free") {
      // In a real app, navigate to payment screen with the selected plan
      window.location.href = `/payment?plan=${planId}`;
    } else {
      toast({
        title: "Free Plan Selected",
        description: "You are currently on the free plan."
      });
    }
  };

  return (
    <AppLayout showNavigation={false}>
      <header className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
        </div>
        <p className="text-gray-600 text-sm">Choose the plan that works for you</p>
      </header>

      <main className="p-6">
        <div className="grid gap-6 mb-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-xl p-5 border ${
                plan.highlighted 
                  ? 'border-chef-primary shadow-md' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.period}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant={plan.buttonVariant}
                className={`w-full ${
                  plan.highlighted && plan.buttonVariant === "default"
                    ? 'bg-chef-primary hover:bg-chef-primary/90' 
                    : ''
                }`}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={plan.id === selectedPlan}
              >
                {plan.id === selectedPlan ? 'Current Plan' : plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <h3 className="font-bold mb-4">Plan Features</h3>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  {!feature.includedIn.includes("free") && (
                    <Lock size={14} className="text-chef-primary mr-2" />
                  )}
                  {feature.name}
                </span>
                <div className="flex space-x-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="w-16 text-center">
                      {feature.includedIn.includes(plan.id) ? (
                        <Check 
                          size={16} 
                          className={`mx-auto ${
                            plan.id === 'premium-monthly' || plan.id === 'premium-annual' 
                              ? 'text-chef-primary' 
                              : 'text-gray-400'
                          }`}
                        />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-500 text-center">
          <p>Cancel anytime. No refunds for partial subscription periods.</p>
          <p className="mt-1">
            By subscribing, you agree to our{" "}
            <Link to="/terms" className="text-chef-primary">Terms of Service</Link>
          </p>
        </div>
      </main>
    </AppLayout>
  );
}
