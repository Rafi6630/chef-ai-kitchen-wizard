
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Search, Plus, Edit, Trash } from "lucide-react";

// Mock ingredients data
const mockIngredients = [
  { id: 1, name: "Chicken", category: "Protein", popularity: "High", allergies: "None" },
  { id: 2, name: "Rice", category: "Grain", popularity: "High", allergies: "None" },
  { id: 3, name: "Potato", category: "Vegetable", popularity: "Medium", allergies: "None" },
  { id: 4, name: "Tomato", category: "Vegetable", popularity: "Medium", allergies: "None" },
  { id: 5, name: "Egg", category: "Protein", popularity: "High", allergies: "Yes" },
  { id: 6, name: "Milk", category: "Dairy", popularity: "High", allergies: "Yes" },
  { id: 7, name: "Wheat Flour", category: "Grain", popularity: "High", allergies: "Yes" },
  { id: 8, name: "Peanut", category: "Nuts", popularity: "Medium", allergies: "Yes" },
];

export default function AdminIngredients() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredIngredients = mockIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout title="Ingredients Management">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search ingredients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button>
          <Plus size={16} className="mr-2" />
          Add Ingredient
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Popularity</TableHead>
                <TableHead>Allergen</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.id}</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.category}</TableCell>
                  <TableCell>{ingredient.popularity}</TableCell>
                  <TableCell>{ingredient.allergies}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AdminLayout>
  );
}
