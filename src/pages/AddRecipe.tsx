
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Category } from "@/types";

interface RecipeFormData {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  category: Category;
  subcategory: string;
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export default function AddRecipe() {
  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', quantity: '', unit: '' }
  ]);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addIngredient = () => {
    setIngredients([
      ...ingredients, 
      { id: `${ingredients.length + 1}`, name: '', quantity: '', unit: '' }
    ]);
  };
  
  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };
  
  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(
      ingredients.map(ing => 
        ing.id === id ? { ...ing, [field]: value } : ing
      )
    );
  };
  
  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };
  
  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };
  
  const updateInstruction = (index: number, value: string) => {
    setInstructions(
      instructions.map((instruction, i) => 
        i === index ? value : instruction
      )
    );
  };
  
  const onSubmit = (data: RecipeFormData) => {
    // In a real app, this would upload the image and send the data to a backend
    // For now, just show a success message
    toast({
      title: "Recipe Submitted",
      description: "Your recipe has been submitted and is pending approval.",
    });
    
    // Log the combined data
    console.log({
      ...data,
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      instructions: instructions.filter(instr => instr.trim() !== ''),
      imageUrl: imagePreview // In a real app, this would be the uploaded image URL
    });
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add Your Recipe</h1>
        </div>
        <p className="text-gray-600 text-sm">Share your culinary creations with the community</p>
      </header>
      
      <main className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Recipe Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Recipe preview" 
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ) : (
                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
                  <Upload className="text-gray-400" size={24} />
                  <span className="text-xs text-gray-500 mt-1">Upload</span>
                  <input 
                    type="file" 
                    id="image" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              
              <div className="text-sm text-gray-500">
                <p>Upload a high-quality image of your recipe</p>
                <p>Max file size: 5MB</p>
              </div>
            </div>
          </div>
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input 
                id="title"
                placeholder="e.g., Homemade Chocolate Chip Cookies"
                {...register("title", { required: true })}
              />
              {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="A brief description of your recipe..."
                {...register("description", { required: true })}
              />
              {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(val: Category) => register("category").onChange({
                  target: { name: "category", value: val }
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input 
                  id="subcategory"
                  placeholder="e.g., Pasta, Salad, Soup"
                  {...register("subcategory", { required: true })}
                />
                {errors.subcategory && <p className="text-red-500 text-sm">Subcategory is required</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine</Label>
                <Input 
                  id="cuisine"
                  placeholder="e.g., Italian, Mexican, Thai"
                  {...register("cuisine", { required: true })}
                />
                {errors.cuisine && <p className="text-red-500 text-sm">Cuisine is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select onValueChange={(val) => register("difficulty").onChange({
                  target: { name: "difficulty", value: val }
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && <p className="text-red-500 text-sm">Difficulty is required</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prepTime">Prep Time (mins)</Label>
                <Input 
                  id="prepTime"
                  type="number"
                  min="0"
                  {...register("prepTime", { required: true, valueAsNumber: true })}
                />
                {errors.prepTime && <p className="text-red-500 text-sm">Prep time is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cookTime">Cook Time (mins)</Label>
                <Input 
                  id="cookTime"
                  type="number"
                  min="0"
                  {...register("cookTime", { required: true, valueAsNumber: true })}
                />
                {errors.cookTime && <p className="text-red-500 text-sm">Cook time is required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="servings">Servings</Label>
                <Input 
                  id="servings"
                  type="number"
                  min="1"
                  {...register("servings", { required: true, valueAsNumber: true })}
                />
                {errors.servings && <p className="text-red-500 text-sm">Servings is required</p>}
              </div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Ingredients</h2>
            
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <Label htmlFor={`ingredient-name-${ingredient.id}`}>Name</Label>
                  <Input 
                    id={`ingredient-name-${ingredient.id}`}
                    placeholder="e.g., Sugar"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`ingredient-quantity-${ingredient.id}`}>Quantity</Label>
                  <Input 
                    id={`ingredient-quantity-${ingredient.id}`}
                    placeholder="e.g., 2"
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`ingredient-unit-${ingredient.id}`}>Unit</Label>
                  <Input 
                    id={`ingredient-unit-${ingredient.id}`}
                    placeholder="e.g., cups"
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button 
              type="button"
              variant="outline"
              className="w-full"
              onClick={addIngredient}
            >
              <Plus size={18} className="mr-2" />
              Add Ingredient
            </Button>
          </div>
          
          {/* Instructions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Instructions</h2>
            
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-2 bg-chef-primary/10 text-chef-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <Label htmlFor={`instruction-${index}`} className="sr-only">
                    Step {index + 1}
                  </Label>
                  <Textarea 
                    id={`instruction-${index}`}
                    placeholder={`Step ${index + 1}...`}
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                  />
                </div>
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full mt-1"
                  onClick={() => removeInstruction(index)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            
            <Button 
              type="button"
              variant="outline"
              className="w-full"
              onClick={addInstruction}
            >
              <Plus size={18} className="mr-2" />
              Add Step
            </Button>
          </div>
          
          {/* Nutritional Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Nutritional Information (per serving)</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input 
                  id="calories"
                  type="number"
                  placeholder="e.g., 250"
                  min="0"
                  {...register("nutritionalInfo.calories", { valueAsNumber: true })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input 
                  id="protein"
                  type="number"
                  placeholder="e.g., 15"
                  min="0"
                  {...register("nutritionalInfo.protein", { valueAsNumber: true })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbohydrates (g)</Label>
                <Input 
                  id="carbs"
                  type="number"
                  placeholder="e.g., 30"
                  min="0"
                  {...register("nutritionalInfo.carbs", { valueAsNumber: true })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input 
                  id="fat"
                  type="number"
                  placeholder="e.g., 10"
                  min="0"
                  {...register("nutritionalInfo.fat", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-chef-primary">
            Submit Recipe for Approval
          </Button>
        </form>
      </main>
    </AppLayout>
  );
}
