
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || "premium-monthly";
  
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const planDetails = {
    "premium-monthly": {
      name: "Premium Monthly",
      price: "$9.99",
      period: "month",
    },
    "premium-annual": {
      name: "Premium Annual",
      price: "$99.99",
      period: "year",
    },
  }[planId] || {
    name: "Premium",
    price: "$9.99",
    period: "month",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, process payment with a payment gateway
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Payment Successful",
        description: `You've successfully subscribed to the ${planDetails.name} plan.`,
      });
      // Redirect to profile after successful payment
      window.location.href = "/profile";
    }, 1500);
  };

  return (
    <AppLayout showNavigation={false}>
      <header className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center mb-1">
          <Link to="/subscription" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Payment</h1>
        </div>
        <p className="text-gray-600 text-sm">Complete your subscription</p>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <h3 className="font-bold mb-2">Order Summary</h3>
          <div className="flex justify-between items-center text-lg">
            <span>{planDetails.name}</span>
            <span className="font-semibold">{planDetails.price}/{planDetails.period}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You will be charged {planDetails.price} every {planDetails.period}. Cancel anytime.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <h3 className="font-bold mb-4">Select Payment Method</h3>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-3">
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">Credit / Debit Card</Label>
              <div className="flex space-x-1">
                <div className="w-8 h-5 bg-blue-600 rounded"></div>
                <div className="w-8 h-5 bg-red-500 rounded"></div>
                <div className="w-8 h-5 bg-yellow-400 rounded"></div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-3">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
              <div className="w-8 h-5 bg-blue-700 rounded"></div>
            </div>
            
            <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-3">
              <RadioGroupItem value="apple" id="apple" />
              <Label htmlFor="apple" className="flex-1 cursor-pointer">Apple Pay</Label>
              <div className="w-8 h-5 bg-black rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.0625 12.2063C17.0344 9.5969 19.2 8.3 19.25 8.25C17.9375 6.4219 15.9063 6.175 15.1719 6.1563C13.4846 5.9752 11.8429 7.1695 10.9875 7.1695C10.1125 7.1695 8.775 6.1752 7.3125 6.2127C5.4 6.25 3.6125 7.3875 2.6625 9.1375C0.7 12.7 2.1875 18.0938 4.075 20.8563C5.0125 22.2063 6.1125 23.7188 7.5625 23.6625C8.9813 23.6063 9.5063 22.7688 11.2125 22.7688C12.9 22.7688 13.3938 23.6625 14.8625 23.6313C16.3688 23.6063 17.3313 22.2563 18.2375 20.8938C19.3125 19.3 19.7344 17.7376 19.75 17.6813C19.7188 17.6626 17.0938 16.6938 17.0625 14.1063V12.2063ZM14.3438 4.8125C15.125 3.8875 15.6563 2.6 15.5125 1.3125C14.4063 1.3625 13.0625 2.0688 12.25 2.975C11.5313 3.7813 10.8875 5.1125 11.05 6.35C12.2875 6.4438 13.5313 5.7188 14.3438 4.8125Z" />
                </svg>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        {paymentMethod === "card" && (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-5 border border-gray-200 mb-6">
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardExpiry">Expiry Date</Label>
                <Input
                  id="cardExpiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cardCvc">CVC</Label>
                <Input
                  id="cardCvc"
                  placeholder="123"
                  type="password"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                  required
                />
              </div>
            </div>
          </form>
        )}
        
        <Button
          className="w-full bg-chef-primary hover:bg-chef-primary/90"
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : `Pay ${planDetails.price}`}
        </Button>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>Your payment information is encrypted and secure.</p>
          <p className="mt-1">
            By subscribing, you agree to our{" "}
            <Link to="/terms" className="text-chef-primary">Terms of Service</Link>
          </p>
        </div>
      </main>
    </AppLayout>
  );
}
