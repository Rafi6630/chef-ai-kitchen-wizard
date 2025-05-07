
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, CreditCard, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";
import { PaymentMethod } from "@/types";

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      details: "Visa •••• 4242",
      isDefault: true,
      expiryDate: "05/25"
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: ""
  });
  const { toast } = useToast();
  
  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated."
    });
  };
  
  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed successfully."
    });
  };
  
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    const last4 = newCardDetails.number.slice(-4);
    const newMethod: PaymentMethod = {
      id: `card_${Date.now()}`,
      type: "card",
      details: `Visa •••• ${last4}`,
      isDefault: paymentMethods.length === 0,
      expiryDate: newCardDetails.expiry
    };
    
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewCardDetails({
      name: "",
      number: "",
      expiry: "",
      cvc: ""
    });
    setShowAddForm(false);
    
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully."
    });
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/profile" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
        </div>
        <p className="text-gray-600 text-sm">Manage your payment methods</p>
      </header>
      
      <main className="p-6">
        {paymentMethods.length > 0 ? (
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold">Saved Payment Methods</h2>
            
            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                className={`bg-white rounded-xl p-4 border ${
                  method.isDefault ? 'border-chef-primary' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="font-medium">{method.details}</p>
                      <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                    </div>
                  </div>
                  <div>
                    {method.isDefault ? (
                      <span className="text-xs font-medium text-chef-primary px-2 py-1 bg-chef-primary/10 rounded-full">
                        Default
                      </span>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                  </div>
                </div>
                
                {!method.isDefault && (
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(method.id)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-4">
            <CreditCard size={40} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-lg font-semibold mb-2">No Payment Methods</h2>
            <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
          </div>
        )}
        
        {showAddForm ? (
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Add New Card</h2>
            
            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={newCardDetails.name}
                  onChange={(e) => setNewCardDetails({...newCardDetails, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newCardDetails.number}
                  onChange={(e) => setNewCardDetails({...newCardDetails, number: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input
                    id="cardExpiry"
                    placeholder="MM/YY"
                    value={newCardDetails.expiry}
                    onChange={(e) => setNewCardDetails({...newCardDetails, expiry: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardCvc">CVC</Label>
                  <Input
                    id="cardCvc"
                    placeholder="123"
                    type="password"
                    value={newCardDetails.cvc}
                    onChange={(e) => setNewCardDetails({...newCardDetails, cvc: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Add Card
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="w-full"
            variant="outline"
          >
            <CreditCard size={18} className="mr-2" />
            Add New Payment Method
          </Button>
        )}
      </main>
    </AppLayout>
  );
}
