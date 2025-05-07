
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";

interface PendingRecipe {
  id: string;
  title: string;
  author: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  thumbnail: string;
}

export default function AdminRecipes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingRecipes, setPendingRecipes] = useState<PendingRecipe[]>([
    {
      id: "1",
      title: "Homemade Pizza",
      author: "john.doe@example.com",
      submittedDate: "2023-05-01",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: "2",
      title: "Vegetable Stir Fry",
      author: "jane.smith@example.com",
      submittedDate: "2023-05-02",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&h=100"
    },
    {
      id: "3",
      title: "Chocolate Cake",
      author: "baker@example.com",
      submittedDate: "2023-05-03",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=100&h=100"
    }
  ]);
  const { toast } = useToast();

  const handleApproveRecipe = (id: string) => {
    setPendingRecipes(
      pendingRecipes.map(recipe => 
        recipe.id === id ? { ...recipe, status: "approved" as const } : recipe
      )
    );
    toast({
      title: "Recipe Approved",
      description: "The recipe has been approved and is now visible to users.",
    });
  };

  const handleRejectRecipe = (id: string) => {
    setPendingRecipes(
      pendingRecipes.map(recipe => 
        recipe.id === id ? { ...recipe, status: "rejected" as const } : recipe
      )
    );
    toast({
      title: "Recipe Rejected",
      description: "The recipe has been rejected and will not be published.",
    });
  };

  const filteredRecipes = pendingRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Recipe Management">
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Recipe Management</h1>
          <p className="text-gray-600">Review and manage user-submitted recipes</p>
        </header>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search recipes by title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-x-2">
            <Button variant="outline">Export</Button>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Thumbnail</TableHead>
                <TableHead>Recipe</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <img src={recipe.thumbnail} alt={recipe.title} className="w-10 h-10 object-cover rounded" />
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/recipes/${recipe.id}`} className="font-medium hover:underline">
                      {recipe.title}
                    </Link>
                  </TableCell>
                  <TableCell>{recipe.author}</TableCell>
                  <TableCell>{recipe.submittedDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${recipe.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        recipe.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`
                    }>
                      {recipe.status.charAt(0).toUpperCase() + recipe.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {recipe.status === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleApproveRecipe(recipe.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRejectRecipe(recipe.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle size={18} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
