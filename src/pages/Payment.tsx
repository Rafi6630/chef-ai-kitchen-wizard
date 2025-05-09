
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CreditCard, 
  Check, 
  CreditCard as PaypalIcon, 
  Apple, 
  Smartphone
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";
import { usePremium } from "@/contexts/PremiumContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PaymentMethodType = "card" | "paypal" | "apple" | "google";

export default function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setPremiumStatus } = usePremium();
  
  // Extract plan from query parameters
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get("plan") || "premium-monthly";
  
  const formatCardNumber = (value: string) => {
    // Remove any non-digit character
    const cleaned = value.replace(/\D/g, "");
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove any non-digit character
    const cleaned = value.replace(/\D/g, "");
    // Add / after first 2 digits
    if (cleaned.length > 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Activate premium status
      setPremiumStatus(true);
      
      // Show success toast and redirect to success page
      toast({
        title: "Payment Successful",
        description: "Your premium subscription has been activated.",
      });
      
      // Navigate to profile page or a success page
      navigate("/profile");
    }, 2000);
  };
  
  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="input-field pl-10 w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  required
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="input-field w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="input-field w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Security Code
                </label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  className="input-field w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case "paypal":
        return (
          <div className="py-6 text-center">
            <PaypalIcon size={48} className="mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You'll be redirected to PayPal to complete your payment.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Continue to PayPal
            </Button>
          </div>
        );
        
      case "apple":
        return (
          <div className="py-6 text-center">
            <Apple size={48} className="mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You'll be redirected to Apple Pay to complete your payment.
            </p>
            <Button className="w-full bg-black text-white">
              Continue to Apple Pay
            </Button>
          </div>
        );
        
      case "google":
        return (
          <div className="py-6 text-center">
            <Smartphone size={48} className="mx-auto mb-4 text-green-600" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You'll be redirected to Google Pay to complete your payment.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Continue to Google Pay
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <AppLayout showNavigation={false}>
      <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center mb-1">
          <Link to="/subscription" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold dark:text-white">Payment Details</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Almost there! Complete your subscription</p>
      </header>
      
      <main className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 mb-6">
          <h2 className="font-semibold text-lg dark:text-white">Order Summary</h2>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium dark:text-white">
                {planId === "premium-annual" ? "Premium Annual" : "Premium Monthly"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {planId === "premium-annual" 
                  ? "Billed annually, auto-renews after 1 year" 
                  : "Billed monthly, auto-renews after 1 month"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold dark:text-white">
                ${planId === "premium-annual" ? "99.99" : "9.99"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {planId === "premium-annual" ? "per year" : "per month"}
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-lg mb-4 dark:text-white">Payment Method</h2>
            
            <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as PaymentMethodType)}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="card">Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                <TabsTrigger value="google">Google Pay</TabsTrigger>
              </TabsList>
              
              <TabsContent value="card">{renderPaymentMethodContent()}</TabsContent>
              <TabsContent value="paypal">{renderPaymentMethodContent()}</TabsContent>
              <TabsContent value="apple">{renderPaymentMethodContent()}</TabsContent>
              <TabsContent value="google">{renderPaymentMethodContent()}</TabsContent>
            </Tabs>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-chef-primary"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing Payment...</>
            ) : (
              <>Complete Payment</>
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By completing this purchase, you agree to our{" "}
            <Link to="/terms" className="text-chef-primary">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-chef-primary">Privacy Policy</Link>
          </p>
        </form>
      </main>
    </AppLayout>
  );
}
