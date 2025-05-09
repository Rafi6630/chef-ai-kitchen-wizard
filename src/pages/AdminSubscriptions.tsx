
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, BarChart, CreditCard, Users } from "lucide-react";

// Mock subscription data
const mockSubscriptions = [
  { 
    id: "sub_001", 
    user: "John Doe", 
    email: "john@example.com", 
    plan: "Premium", 
    status: "Active", 
    startDate: "2023-04-01", 
    nextBilling: "2023-05-01",
    amount: "$9.99"
  },
  { 
    id: "sub_002", 
    user: "Jane Smith", 
    email: "jane@example.com", 
    plan: "Premium", 
    status: "Active", 
    startDate: "2023-03-15", 
    nextBilling: "2023-04-15",
    amount: "$9.99"
  },
  { 
    id: "sub_003", 
    user: "Bob Johnson", 
    email: "bob@example.com", 
    plan: "Premium", 
    status: "Canceled", 
    startDate: "2023-02-10", 
    nextBilling: "N/A",
    amount: "$9.99"
  },
  { 
    id: "sub_004", 
    user: "Sarah Williams", 
    email: "sarah@example.com", 
    plan: "Premium+", 
    status: "Active", 
    startDate: "2023-04-05", 
    nextBilling: "2023-05-05",
    amount: "$14.99"
  },
  { 
    id: "sub_005", 
    user: "Mike Brown", 
    email: "mike@example.com", 
    plan: "Premium+", 
    status: "Past Due", 
    startDate: "2023-03-20", 
    nextBilling: "2023-04-20",
    amount: "$14.99"
  },
];

export default function AdminSubscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSubscriptions = mockSubscriptions.filter(subscription => 
    subscription.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate summary stats
  const activeSubscriptions = mockSubscriptions.filter(sub => sub.status === "Active").length;
  const totalRevenue = mockSubscriptions
    .filter(sub => sub.status === "Active")
    .reduce((sum, sub) => sum + parseFloat(sub.amount.replace('$', '')), 0);
  
  return (
    <AdminLayout title="Subscription Management">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Subscriptions</p>
                <h3 className="text-2xl font-bold mt-1">{activeSubscriptions}</h3>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <Users size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</p>
                <h3 className="text-2xl font-bold mt-1">${totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <CreditCard size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Retention</p>
                <h3 className="text-2xl font-bold mt-1">3.2 months</h3>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <BarChart size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search subscriptions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button>
          <Plus size={16} className="mr-2" />
          Add Subscription
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">{subscription.id}</TableCell>
                  <TableCell>{subscription.user}</TableCell>
                  <TableCell>{subscription.email}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      subscription.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                      subscription.status === "Canceled" ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" :
                      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.nextBilling}</TableCell>
                  <TableCell>{subscription.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AdminLayout>
  );
}
